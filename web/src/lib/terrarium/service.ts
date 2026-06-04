/**
 * Terrarium service layer — all database access for the game. Runs only at
 * request time, behind authentication and the feature flag. Pure simulation
 * logic lives in sim.ts / genetics.ts; this module persists and orchestrates.
 */
import "server-only";
import { and, desc, eq, ne, or, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  snails,
  terrariums,
  diaryEvents,
  follows,
  breedingEvents,
  clutches,
  memorials,
  reports,
  users,
} from "@/db/schema";
import { deriveState, type Habitat, type PersistedSnail } from "./sim";
import { randomGenome, breedGenomes, type Genome } from "./genetics";
import { randomSeed } from "./rng";
import { diaryMessage, type DiaryKind, type DiaryContext } from "./events";

type SnailRow = typeof snails.$inferSelect;
type TerrariumRow = typeof terrariums.$inferSelect;

const DEFAULT_HABITAT: Habitat = { humidity: 0.6, temperature: 0.5 };

function habitatOf(t: TerrariumRow | undefined): Habitat {
  if (!t) return DEFAULT_HABITAT;
  return { humidity: t.humidity, temperature: t.temperature };
}

function persisted(row: SnailRow): PersistedSnail {
  return {
    bornAt: row.bornAt,
    lastTick: row.lastTick,
    health: row.health,
    hunger: row.hunger,
    mood: row.mood,
    status: row.status,
    positionX: row.positionX,
    positionY: row.positionY,
    genome: row.genome,
  };
}

/** A snail row joined with its freshly-derived live state. */
export type LiveSnail = SnailRow & {
  derived: ReturnType<typeof deriveState>;
};

function withDerived(row: SnailRow, habitat: Habitat, now: Date): LiveSnail {
  return { ...row, derived: deriveState(persisted(row), habitat, now) };
}

async function addDiary(snailId: string, kind: DiaryKind, ctx?: DiaryContext) {
  await db.insert(diaryEvents).values({
    snailId,
    kind,
    message: diaryMessage(kind, ctx),
  });
}

/* ── Terrarium + adoption ────────────────────────────────────────────── */

export async function getOrCreateTerrarium(userId: string): Promise<TerrariumRow> {
  const existing = await db
    .select()
    .from(terrariums)
    .where(eq(terrariums.ownerId, userId))
    .limit(1);
  if (existing[0]) return existing[0];
  const created = await db
    .insert(terrariums)
    .values({ ownerId: userId })
    .returning();
  return created[0];
}

/** All of a keeper's living snails, with live state derived on read. */
export async function getGarden(userId: string): Promise<{
  terrarium: TerrariumRow;
  snails: LiveSnail[];
}> {
  const terrarium = await getOrCreateTerrarium(userId);
  const habitat = habitatOf(terrarium);
  const now = new Date();
  const rows = await db
    .select()
    .from(snails)
    .where(and(eq(snails.ownerId, userId), ne(snails.status, "deceased")))
    .orderBy(desc(snails.bornAt));
  return { terrarium, snails: rows.map((r) => withDerived(r, habitat, now)) };
}

const FOUNDER_NAMES = [
  "Murex",
  "Pansa",
  "Bromine",
  "Indigo",
  "Mauve",
  "Whorl",
  "Wisteria",
];

export async function adoptFounder(
  userId: string,
  name: string,
): Promise<SnailRow> {
  await getOrCreateTerrarium(userId);
  const genome = randomGenome(randomSeed());
  const created = await db
    .insert(snails)
    .values({ ownerId: userId, name, genome, generation: 1 })
    .returning();
  const snail = created[0];
  await addDiary(snail.id, "hatched");
  return snail;
}

export function suggestFounderName(): string {
  return FOUNDER_NAMES[Math.floor(Math.random() * FOUNDER_NAMES.length)];
}

/* ── Care actions ────────────────────────────────────────────────────── */

async function loadOwnedSnail(
  userId: string,
  snailId: string,
): Promise<{ row: SnailRow; habitat: Habitat } | null> {
  const rows = await db
    .select()
    .from(snails)
    .where(and(eq(snails.id, snailId), eq(snails.ownerId, userId)))
    .limit(1);
  if (!rows[0]) return null;
  const terrarium = await getOrCreateTerrarium(userId);
  return { row: rows[0], habitat: habitatOf(terrarium) };
}

/** Persist the current derived state back to the row (advancing lastTick). */
async function commitState(row: SnailRow, habitat: Habitat, now: Date) {
  const d = deriveState(persisted(row), habitat, now);
  await db
    .update(snails)
    .set({
      health: d.health,
      hunger: d.hunger,
      mood: d.mood,
      status: d.status,
      positionX: d.position.x,
      positionY: d.position.y,
      trailLength: row.trailLength + (d.status === "active" ? 0.05 : 0),
      lastTick: now,
      ...(d.diedOfOldAge ? { deceasedAt: now } : {}),
    })
    .where(eq(snails.id, row.id));
  if (d.diedOfOldAge) await retire(row, now);
  return d;
}

export async function feedSnail(
  userId: string,
  snailId: string,
  food: "leaf" | "cuttlebone",
): Promise<void> {
  const owned = await loadOwnedSnail(userId, snailId);
  if (!owned) throw new Error("Snail not found.");
  const now = new Date();
  // Advance to now, then apply the feed on top.
  const d = deriveState(persisted(owned.row), owned.habitat, now);
  if (d.status === "deceased") return;
  const fed =
    food === "leaf"
      ? { hunger: Math.max(0, d.hunger - 0.4), health: d.health }
      : { hunger: Math.max(0, d.hunger - 0.1), health: Math.min(1, d.health + 0.08) };
  await db
    .update(snails)
    .set({
      hunger: fed.hunger,
      health: fed.health,
      // Feeding gently wakes an estivating snail.
      status: d.status === "estivating" ? "active" : d.status,
      lastTick: now,
    })
    .where(eq(snails.id, snailId));
  await addDiary(snailId, "fed");
}

export async function setEstivation(
  userId: string,
  snailId: string,
  estivating: boolean,
): Promise<void> {
  const owned = await loadOwnedSnail(userId, snailId);
  if (!owned) throw new Error("Snail not found.");
  if (owned.row.status === "deceased") return;
  const now = new Date();
  await db
    .update(snails)
    .set({ status: estivating ? "estivating" : "active", lastTick: now })
    .where(eq(snails.id, snailId));
  await addDiary(snailId, estivating ? "estivated" : "woke");
}

export async function renameSnail(
  userId: string,
  snailId: string,
  name: string,
): Promise<void> {
  await db
    .update(snails)
    .set({ name })
    .where(and(eq(snails.id, snailId), eq(snails.ownerId, userId)));
}

export async function refreshGarden(userId: string): Promise<void> {
  const { terrarium, snails: live } = await getGarden(userId);
  const now = new Date();
  for (const s of live) await commitState(s, habitatOf(terrarium), now);
}

/* ── Lifecycle: dignified retirement to a memorial ───────────────────── */

async function retire(row: SnailRow, now: Date): Promise<void> {
  await db.insert(memorials).values({
    snailId: row.id,
    ownerId: row.ownerId,
    name: row.name,
    genome: row.genome,
    bornAt: row.bornAt,
    diedAt: now,
  });
  await addDiary(row.id, "passed");
}

/* ── Public profiles, lineage, diary ─────────────────────────────────── */

export async function getPublicSnail(snailId: string): Promise<{
  snail: SnailRow;
  keeperName: string | null;
  diary: (typeof diaryEvents.$inferSelect)[];
} | null> {
  const rows = await db.select().from(snails).where(eq(snails.id, snailId)).limit(1);
  const snail = rows[0];
  if (!snail || !snail.isPublic) return null;
  const keeper = await db
    .select({ displayName: users.displayName, name: users.name })
    .from(users)
    .where(eq(users.id, snail.ownerId))
    .limit(1);
  const diary = await db
    .select()
    .from(diaryEvents)
    .where(eq(diaryEvents.snailId, snailId))
    .orderBy(desc(diaryEvents.createdAt))
    .limit(12);
  return {
    snail,
    keeperName: keeper[0]?.displayName ?? keeper[0]?.name ?? null,
    diary,
  };
}

export type LineageNode = { id: string; name: string; generation: number };

export async function getLineage(snailId: string): Promise<{
  ancestors: LineageNode[];
  descendants: LineageNode[];
}> {
  const rows = await db.select().from(snails).where(eq(snails.id, snailId)).limit(1);
  const snail = rows[0];
  if (!snail) return { ancestors: [], descendants: [] };

  const ancestors: LineageNode[] = [];
  const parentIds = [snail.parentAId, snail.parentBId].filter(
    (x): x is string => Boolean(x),
  );
  for (const pid of parentIds) {
    const p = await db.select().from(snails).where(eq(snails.id, pid)).limit(1);
    if (p[0]) ancestors.push({ id: p[0].id, name: p[0].name, generation: p[0].generation });
  }

  const kids = await db
    .select({ id: snails.id, name: snails.name, generation: snails.generation })
    .from(snails)
    .where(or(eq(snails.parentAId, snailId), eq(snails.parentBId, snailId)));

  return { ancestors, descendants: kids };
}

export async function getMemorial(
  id: string,
): Promise<typeof memorials.$inferSelect | null> {
  const rows = await db.select().from(memorials).where(eq(memorials.id, id)).limit(1);
  return rows[0] ?? null;
}

/* ── Social: follow, feed, discover, leaderboards ────────────────────── */

export async function toggleFollow(
  followerId: string,
  followingId: string,
): Promise<boolean> {
  if (followerId === followingId) return false;
  const existing = await db
    .select()
    .from(follows)
    .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)))
    .limit(1);
  if (existing[0]) {
    await db
      .delete(follows)
      .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
    return false;
  }
  await db.insert(follows).values({ followerId, followingId });
  return true;
}

export async function isFollowing(
  followerId: string,
  followingId: string,
): Promise<boolean> {
  const rows = await db
    .select()
    .from(follows)
    .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)))
    .limit(1);
  return Boolean(rows[0]);
}

export async function getFeed(userId: string, limit = 25) {
  return db
    .select({
      id: diaryEvents.id,
      message: diaryEvents.message,
      createdAt: diaryEvents.createdAt,
      snailId: diaryEvents.snailId,
      snailName: snails.name,
    })
    .from(diaryEvents)
    .innerJoin(snails, eq(diaryEvents.snailId, snails.id))
    .innerJoin(follows, eq(follows.followingId, snails.ownerId))
    .where(and(eq(follows.followerId, userId), eq(snails.isPublic, true)))
    .orderBy(desc(diaryEvents.createdAt))
    .limit(limit);
}

export async function discoverSnails(limit = 18) {
  return db
    .select()
    .from(snails)
    .where(and(eq(snails.isPublic, true), ne(snails.status, "deceased")))
    .orderBy(desc(snails.bornAt))
    .limit(limit);
}

export type Leaderboards = {
  oldest: { name: string; id: string; ageDays: number }[];
  longestTrail: { name: string; id: string; trailLength: number }[];
  mostGenerations: { name: string; id: string; generation: number }[];
};

export async function getLeaderboards(): Promise<Leaderboards> {
  const now = Date.now();
  const oldestRows = await db
    .select({ id: snails.id, name: snails.name, bornAt: snails.bornAt })
    .from(snails)
    .where(and(eq(snails.isPublic, true), ne(snails.status, "deceased")))
    .orderBy(snails.bornAt)
    .limit(5);
  const trailRows = await db
    .select({ id: snails.id, name: snails.name, trailLength: snails.trailLength })
    .from(snails)
    .where(eq(snails.isPublic, true))
    .orderBy(desc(snails.trailLength))
    .limit(5);
  const genRows = await db
    .select({ id: snails.id, name: snails.name, generation: snails.generation })
    .from(snails)
    .where(eq(snails.isPublic, true))
    .orderBy(desc(snails.generation))
    .limit(5);
  return {
    oldest: oldestRows.map((r) => ({
      id: r.id,
      name: r.name,
      ageDays: Math.floor((now - r.bornAt.getTime()) / 86_400_000),
    })),
    longestTrail: trailRows,
    mostGenerations: genRows,
  };
}

/* ── Breeding: consent-based, both keepers receive a clutch ──────────── */

const CLUTCH_DELAY_MS = 1000 * 60 * 60 * 24; // hatch a day after laying
const BREED_RESOLVE_MS = 1000 * 60 * 30; // resolve 30 min after acceptance

export async function requestBreeding(
  requesterUserId: string,
  requesterSnailId: string,
  partnerSnailId: string,
): Promise<void> {
  const partner = await db
    .select()
    .from(snails)
    .where(eq(snails.id, partnerSnailId))
    .limit(1);
  if (!partner[0]) throw new Error("Partner snail not found.");
  if (partner[0].ownerId === requesterUserId)
    throw new Error("Pick a snail from another keeper.");
  await db.insert(breedingEvents).values({
    requesterUserId,
    requesterSnailId,
    partnerSnailId,
    partnerUserId: partner[0].ownerId,
    status: "requested",
  });
}

export async function getPendingBreedingRequests(userId: string) {
  return db
    .select()
    .from(breedingEvents)
    .where(
      and(
        eq(breedingEvents.partnerUserId, userId),
        eq(breedingEvents.status, "requested"),
      ),
    )
    .orderBy(desc(breedingEvents.createdAt));
}

export async function respondToBreeding(
  userId: string,
  eventId: string,
  accept: boolean,
): Promise<void> {
  const rows = await db
    .select()
    .from(breedingEvents)
    .where(and(eq(breedingEvents.id, eventId), eq(breedingEvents.partnerUserId, userId)))
    .limit(1);
  const ev = rows[0];
  if (!ev || ev.status !== "requested") return;
  await db
    .update(breedingEvents)
    .set({
      status: accept ? "accepted" : "declined",
      resolvesAt: accept ? new Date(Date.now() + BREED_RESOLVE_MS) : null,
    })
    .where(eq(breedingEvents.id, eventId));
}

/* ── Reporting ───────────────────────────────────────────────────────── */

export async function fileReport(
  reporterId: string,
  subjectType: "snail" | "user",
  subjectId: string,
  reason: string,
): Promise<void> {
  await db.insert(reports).values({ reporterId, subjectType, subjectId, reason });
}

/* ── Cron jobs (idempotent) ──────────────────────────────────────────── */

/** Resolve accepted breeding events into clutches for BOTH keepers. */
export async function resolveBreedingEvents(now = new Date()): Promise<number> {
  const ready = await db
    .select()
    .from(breedingEvents)
    .where(
      and(
        eq(breedingEvents.status, "accepted"),
        sql`${breedingEvents.resolvesAt} <= ${now}`,
      ),
    );
  for (const ev of ready) {
    const a = await db.select().from(snails).where(eq(snails.id, ev.requesterSnailId)).limit(1);
    const b = await db.select().from(snails).where(eq(snails.id, ev.partnerSnailId)).limit(1);
    if (!a[0] || !b[0]) {
      await db.update(breedingEvents).set({ status: "resolved" }).where(eq(breedingEvents.id, ev.id));
      continue;
    }
    const eggCount = 2 + Math.floor(Math.random() * 4);
    const hatchesAt = new Date(now.getTime() + CLUTCH_DELAY_MS);
    // Hermaphroditic: a clutch for each keeper.
    for (const ownerId of [ev.requesterUserId, ev.partnerUserId]) {
      await db.insert(clutches).values({
        breedingEventId: ev.id,
        ownerId,
        parentAId: a[0].id,
        parentBId: b[0].id,
        eggCount,
        hatchesAt,
      });
    }
    await addDiary(a[0].id, "paired", { partner: b[0].name });
    await addDiary(b[0].id, "paired", { partner: a[0].name });
    await addDiary(a[0].id, "laid_eggs", { count: eggCount });
    await db.update(breedingEvents).set({ status: "resolved" }).where(eq(breedingEvents.id, ev.id));
  }
  return ready.length;
}

/** Hatch due clutches into new, trait-blended snails. */
export async function hatchClutches(now = new Date()): Promise<number> {
  const due = await db
    .select()
    .from(clutches)
    .where(and(eq(clutches.hatched, false), sql`${clutches.hatchesAt} <= ${now}`));
  for (const clutch of due) {
    const a = await db.select().from(snails).where(eq(snails.id, clutch.parentAId)).limit(1);
    const b = await db.select().from(snails).where(eq(snails.id, clutch.parentBId)).limit(1);
    const genomeA: Genome = a[0]?.genome ?? randomGenome(randomSeed());
    const genomeB: Genome = b[0]?.genome ?? randomGenome(randomSeed());
    const generation =
      Math.max(a[0]?.generation ?? 1, b[0]?.generation ?? 1) + 1;
    // Hatch one keeper-facing offspring per clutch (siblings differ by seed).
    const genome = breedGenomes(genomeA, genomeB, randomSeed());
    const created = await db
      .insert(snails)
      .values({
        ownerId: clutch.ownerId,
        name: "Hatchling",
        genome,
        parentAId: clutch.parentAId,
        parentBId: clutch.parentBId,
        generation,
      })
      .returning();
    if (created[0]) await addDiary(created[0].id, "hatched");
    await db.update(clutches).set({ hatched: true }).where(eq(clutches.id, clutch.id));
  }
  return due.length;
}

/** Add a gentle daily diary line to active snails (a calm life, observed). */
export async function dailyDiary(): Promise<number> {
  const active = await db
    .select({ id: snails.id })
    .from(snails)
    .where(eq(snails.status, "active"))
    .limit(500);
  for (const s of active) {
    // Roughly half get a quiet note on any given day.
    if (Math.random() < 0.5) await addDiary(s.id, "explored");
  }
  return active.length;
}

/** Retire snails that have reached the end of a long, active life. */
export async function ageAndRetire(now = new Date()): Promise<number> {
  const active = await db
    .select()
    .from(snails)
    .where(eq(snails.status, "active"));
  let retired = 0;
  for (const row of active) {
    const terr = await db
      .select()
      .from(terrariums)
      .where(eq(terrariums.ownerId, row.ownerId))
      .limit(1);
    const d = deriveState(persisted(row), habitatOf(terr[0]), now);
    if (d.diedOfOldAge) {
      await db
        .update(snails)
        .set({ status: "deceased", deceasedAt: now, lastTick: now })
        .where(eq(snails.id, row.id));
      await retire(row, now);
      retired++;
    }
  }
  return retired;
}
