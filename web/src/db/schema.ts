import {
  pgTable,
  text,
  timestamp,
  integer,
  real,
  jsonb,
  boolean,
  primaryKey,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { createId } from "@/lib/terrarium/id";
import type { Genome } from "@/lib/terrarium/genetics";

/* ─── Auth.js (NextAuth v5) adapter tables ───────────────────────────── */

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  // Public-facing handle; OAuth name/email are never shown publicly.
  displayName: text("displayName"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

/* ─── The Terrarium game tables ──────────────────────────────────────── */

export const snailStatus = pgEnum("snail_status", [
  "active",
  "estivating",
  "deceased",
]);

export const snails = pgTable(
  "snail",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    ownerId: text("ownerId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    // Versioned, structured genome (traits + rare morphs).
    genome: jsonb("genome").$type<Genome>().notNull(),

    bornAt: timestamp("bornAt", { mode: "date" }).defaultNow().notNull(),
    // Lazy simulation: derive current state from this anchor + elapsed time.
    lastTick: timestamp("lastTick", { mode: "date" }).defaultNow().notNull(),

    // Persisted state, updated on interaction (otherwise derived on read).
    health: real("health").notNull().default(1),
    hunger: real("hunger").notNull().default(0),
    mood: real("mood").notNull().default(0.7),
    positionX: real("positionX").notNull().default(0.5),
    positionY: real("positionY").notNull().default(0.5),
    status: snailStatus("status").notNull().default("active"),

    // Lineage. Founders have null parents.
    parentAId: text("parentAId"),
    parentBId: text("parentBId"),
    generation: integer("generation").notNull().default(1),

    // Care metrics for the leaderboards (valorize care, never conquest).
    trailLength: real("trailLength").notNull().default(0),

    deceasedAt: timestamp("deceasedAt", { mode: "date" }),
    isPublic: boolean("isPublic").notNull().default(true),
  },
  (t) => [
    index("snail_owner_idx").on(t.ownerId),
    index("snail_status_idx").on(t.status),
  ],
);

export const terrariums = pgTable("terrarium", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  // Habitat params influence health/mood/breeding-readiness.
  humidity: real("humidity").notNull().default(0.6),
  temperature: real("temperature").notNull().default(0.5),
  substrate: text("substrate").notNull().default("loam"),
  // Cosmetic-only items (the sole monetization, never gating care).
  cosmetics: jsonb("cosmetics").$type<string[]>().notNull().default([]),
});

export const breedingStatus = pgEnum("breeding_status", [
  "requested",
  "accepted",
  "declined",
  "resolved",
]);

export const breedingEvents = pgTable(
  "breeding_event",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    requesterSnailId: text("requesterSnailId").notNull(),
    partnerSnailId: text("partnerSnailId").notNull(),
    requesterUserId: text("requesterUserId").notNull(),
    partnerUserId: text("partnerUserId").notNull(),
    status: breedingStatus("status").notNull().default("requested"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    resolvesAt: timestamp("resolvesAt", { mode: "date" }),
  },
  (t) => [index("breeding_partner_idx").on(t.partnerUserId)],
);

export const clutches = pgTable("clutch", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  breedingEventId: text("breedingEventId").notNull(),
  // The keeper who will receive the hatchlings from this clutch.
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  parentAId: text("parentAId").notNull(),
  parentBId: text("parentBId").notNull(),
  eggCount: integer("eggCount").notNull(),
  laidAt: timestamp("laidAt", { mode: "date" }).defaultNow().notNull(),
  hatchesAt: timestamp("hatchesAt", { mode: "date" }).notNull(),
  hatched: boolean("hatched").notNull().default(false),
});

export const diaryEvents = pgTable(
  "diary_event",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    snailId: text("snailId")
      .notNull()
      .references(() => snails.id, { onDelete: "cascade" }),
    kind: text("kind").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [index("diary_snail_idx").on(t.snailId)],
);

export const follows = pgTable(
  "follow",
  {
    followerId: text("followerId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: text("followingId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.followerId, t.followingId] })],
);

export const memorials = pgTable("memorial", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  snailId: text("snailId").notNull(),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  genome: jsonb("genome").$type<Genome>().notNull(),
  bornAt: timestamp("bornAt", { mode: "date" }).notNull(),
  diedAt: timestamp("diedAt", { mode: "date" }).notNull(),
  epitaph: text("epitaph"),
});

export const reports = pgTable("report", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  reporterId: text("reporterId").notNull(),
  subjectType: text("subjectType").notNull(), // "snail" | "user"
  subjectId: text("subjectId").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  resolved: boolean("resolved").notNull().default(false),
});
