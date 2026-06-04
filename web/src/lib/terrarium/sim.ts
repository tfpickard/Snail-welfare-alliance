/**
 * Simulation engine — pure and deterministic. Given a snail's persisted state,
 * its habitat, and the current time, it derives the snail's present state via
 * compute-on-read. No randomness, no clock reads inside (pass `now`).
 *
 * Design ethics, enforced here:
 *  - Estivation is the safety mechanic: absence seals & PAUSES the snail.
 *  - Neglect can NEVER harm: hunger/health degradation is capped at the point of
 *    auto-estivation, and health never drops below a safe floor.
 *  - There is no "game over." Death is only ever gentle old age.
 */
import type { Genome } from "./genetics";

export const SIM = {
  // TODO(owner): tune lifecycle pacing. Real snails live ~2–15 years; compressed.
  lifespanDays: 120, // dignified natural death after a long, active life
  growthDaysToAdult: 30,
  hungerPerDay: 0.55, // hunger accrues while active
  // Absence beyond this auto-seals the snail (and freezes all degradation).
  autoEstivateAfterHours: 48,
  healthFloor: 0.25, // neglect can never push health below this
  healthDrainPerDay: 0.15, // only when very hungry, and only down to the floor
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

export type GrowthStage = "hatchling" | "juvenile" | "adult" | "elder";
export type Status = "active" | "estivating" | "deceased";

export type PersistedSnail = {
  bornAt: Date;
  lastTick: Date;
  health: number;
  hunger: number;
  mood: number;
  status: Status;
  positionX: number;
  positionY: number;
  genome: Genome;
};

export type Habitat = {
  humidity: number; // 0..1, comfort peaks near 0.6
  temperature: number; // 0..1, comfort peaks near 0.5
};

export type DerivedState = {
  ageDays: number;
  growthStage: GrowthStage;
  /** 0..1 progress toward natural lifespan. */
  lifeFraction: number;
  health: number;
  hunger: number;
  mood: number;
  status: Status;
  position: { x: number; y: number };
  /** True only when the snail has reached the end of a long natural life. */
  diedOfOldAge: boolean;
  /** True when this read auto-sealed the snail due to absence. */
  autoEstivated: boolean;
};

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

/** Comfort of a habitat for a snail, 0..1 (1 = ideal). */
export function habitatComfort(h: Habitat): number {
  const hum = 1 - Math.abs(h.humidity - 0.6) / 0.6;
  const temp = 1 - Math.abs(h.temperature - 0.5) / 0.5;
  return clamp01((hum + temp) / 2);
}

function growthStageFor(ageDays: number): GrowthStage {
  if (ageDays < 3) return "hatchling";
  if (ageDays < SIM.growthDaysToAdult) return "juvenile";
  if (ageDays < SIM.lifespanDays * 0.7) return "adult";
  return "elder";
}

/**
 * Derive the snail's current state from persisted anchors + elapsed time.
 * Safe to call on every read; callers persist the result on interaction.
 */
export function deriveState(
  snail: PersistedSnail,
  habitat: Habitat,
  now: Date,
): DerivedState {
  const comfort = habitatComfort(habitat);

  // Deceased snails are frozen in time.
  if (snail.status === "deceased") {
    const ageDays = (snail.lastTick.getTime() - snail.bornAt.getTime()) / DAY_MS;
    return frozen(snail, ageDays, "deceased");
  }

  // Estivating snails are PAUSED — nothing degrades, nothing ages.
  if (snail.status === "estivating") {
    const ageDays = (snail.lastTick.getTime() - snail.bornAt.getTime()) / DAY_MS;
    return frozen(snail, ageDays, "estivating");
  }

  // ── Active: accrue, but cap elapsed at the auto-estivation horizon so a long
  // absence can never compound into harm. ──
  const rawElapsedMs = Math.max(0, now.getTime() - snail.lastTick.getTime());
  const capMs = SIM.autoEstivateAfterHours * 60 * 60 * 1000;
  const accruedMs = Math.min(rawElapsedMs, capMs);
  const accruedDays = accruedMs / DAY_MS;
  const autoEstivated = rawElapsedMs > capMs;

  const hunger = clamp01(snail.hunger + SIM.hungerPerDay * accruedDays);

  // Health only drains when quite hungry, only down to the floor, and recovers
  // gently in a comfortable habitat.
  const hungerStress = Math.max(0, hunger - 0.7);
  const drain = hungerStress * SIM.healthDrainPerDay * accruedDays;
  const recovery = comfort * 0.05 * accruedDays;
  const health = Math.max(
    SIM.healthFloor,
    clamp01(snail.health - drain + recovery),
  );

  const mood = clamp01(0.5 + comfort * 0.3 - hunger * 0.35 + (health - 0.5) * 0.2);

  const ageDays = (now.getTime() - snail.bornAt.getTime()) / DAY_MS;
  const diedOfOldAge = ageDays >= SIM.lifespanDays;

  const status: Status = diedOfOldAge
    ? "deceased"
    : autoEstivated
      ? "estivating"
      : "active";

  return {
    ageDays,
    growthStage: growthStageFor(ageDays),
    lifeFraction: clamp01(ageDays / SIM.lifespanDays),
    health,
    hunger,
    mood,
    status,
    position: driftPosition(snail, now),
    diedOfOldAge,
    autoEstivated,
  };
}

function frozen(
  snail: PersistedSnail,
  ageDays: number,
  status: Status,
): DerivedState {
  return {
    ageDays,
    growthStage: growthStageFor(ageDays),
    lifeFraction: clamp01(ageDays / SIM.lifespanDays),
    health: snail.health,
    hunger: snail.hunger,
    mood: snail.mood,
    status,
    position: { x: snail.positionX, y: snail.positionY },
    diedOfOldAge: status === "deceased",
    autoEstivated: false,
  };
}

/**
 * A subtle, deterministic crawl target derived from time — the renderer eases
 * toward it. Pausable / honored by prefers-reduced-motion in the component.
 */
function driftPosition(snail: PersistedSnail, now: Date): { x: number; y: number } {
  const t = now.getTime() / (1000 * 60 * 7); // a slow ~7-minute cycle
  const x = clamp01(snail.positionX + Math.sin(t) * 0.06);
  const y = clamp01(snail.positionY + Math.cos(t * 0.6) * 0.03);
  return { x, y };
}

/** Effect of feeding: leaves sate hunger; cuttlebone supports shell health. */
export function applyFeed(
  state: { hunger: number; health: number },
  food: "leaf" | "cuttlebone",
): { hunger: number; health: number } {
  if (food === "leaf") {
    return { hunger: clamp01(state.hunger - 0.4), health: state.health };
  }
  return {
    hunger: clamp01(state.hunger - 0.1),
    health: clamp01(state.health + 0.08),
  };
}
