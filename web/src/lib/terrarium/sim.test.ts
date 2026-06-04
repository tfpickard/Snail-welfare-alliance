import { describe, it, expect } from "vitest";
import {
  deriveState,
  applyFeed,
  habitatComfort,
  SIM,
  type PersistedSnail,
  type Habitat,
} from "./sim";
import { randomGenome } from "./genetics";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

function makeSnail(overrides: Partial<PersistedSnail> = {}): PersistedSnail {
  const born = new Date("2026-01-01T00:00:00Z");
  return {
    bornAt: born,
    lastTick: born,
    health: 1,
    hunger: 0,
    mood: 0.7,
    status: "active",
    positionX: 0.5,
    positionY: 0.5,
    genome: randomGenome(1),
    ...overrides,
  };
}

const idealHabitat: Habitat = { humidity: 0.6, temperature: 0.5 };

describe("simulation", () => {
  it("ideal habitat reads as maximally comfortable", () => {
    expect(habitatComfort(idealHabitat)).toBeCloseTo(1, 5);
    expect(habitatComfort({ humidity: 0, temperature: 0 })).toBeLessThan(0.2);
  });

  it("hunger rises while active", () => {
    const snail = makeSnail();
    const later = new Date(snail.lastTick.getTime() + DAY);
    const s = deriveState(snail, idealHabitat, later);
    expect(s.hunger).toBeGreaterThan(0);
    expect(s.status).toBe("active");
  });

  it("SAFETY: long absence auto-estivates and never drops health below the floor", () => {
    const snail = makeSnail({ hunger: 0.9, health: 0.5 });
    // A month away.
    const later = new Date(snail.lastTick.getTime() + 30 * DAY);
    const s = deriveState(snail, idealHabitat, later);
    expect(s.status).toBe("estivating");
    expect(s.autoEstivated).toBe(true);
    expect(s.health).toBeGreaterThanOrEqual(SIM.healthFloor);
  });

  it("SAFETY: degradation is capped at the auto-estivation horizon", () => {
    const snail = makeSnail({ hunger: 0.2 });
    const capHours = SIM.autoEstivateAfterHours;
    const justBeyond = deriveState(
      snail,
      idealHabitat,
      new Date(snail.lastTick.getTime() + (capHours + 1) * HOUR),
    );
    const wayBeyond = deriveState(
      snail,
      idealHabitat,
      new Date(snail.lastTick.getTime() + 100 * DAY),
    );
    // Hunger accrued is identical past the cap — absence can't compound harm.
    expect(wayBeyond.hunger).toBeCloseTo(justBeyond.hunger, 5);
  });

  it("estivating snails are frozen (paused) — nothing degrades", () => {
    const snail = makeSnail({ status: "estivating", hunger: 0.3, health: 0.8 });
    const later = new Date(snail.lastTick.getTime() + 60 * DAY);
    const s = deriveState(snail, idealHabitat, later);
    expect(s.status).toBe("estivating");
    expect(s.hunger).toBe(0.3);
    expect(s.health).toBe(0.8);
  });

  it("ages through growth stages", () => {
    const snail = makeSnail();
    const at = (days: number) =>
      deriveState(
        { ...snail, status: "active" },
        idealHabitat,
        new Date(snail.bornAt.getTime() + days * DAY),
      ).growthStage;
    expect(at(1)).toBe("hatchling");
    expect(at(10)).toBe("juvenile");
    expect(at(50)).toBe("adult");
    expect(at(SIM.lifespanDays - 1)).toBe("elder");
  });

  it("dies only of old age, and only when active", () => {
    const snail = makeSnail();
    const past = new Date(snail.bornAt.getTime() + (SIM.lifespanDays + 5) * DAY);
    // An active snail that genuinely reached lifespan passes gently.
    const active = deriveState({ ...snail, lastTick: past }, idealHabitat, past);
    expect(active.diedOfOldAge).toBe(true);
    expect(active.status).toBe("deceased");
  });

  it("feeding leaves sates hunger; cuttlebone supports shell health", () => {
    expect(applyFeed({ hunger: 0.8, health: 0.5 }, "leaf").hunger).toBeLessThan(0.8);
    const cb = applyFeed({ hunger: 0.5, health: 0.5 }, "cuttlebone");
    expect(cb.health).toBeGreaterThan(0.5);
  });
});
