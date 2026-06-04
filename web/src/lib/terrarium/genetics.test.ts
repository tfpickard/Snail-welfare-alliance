import { describe, it, expect } from "vitest";
import {
  randomGenome,
  breedGenomes,
  isPurpleMorph,
  describeGenome,
  PURPLE_MORPH_THRESHOLD,
  GENOME_VERSION,
  SHELL_SHAPES,
  SHELL_PATTERNS,
  type Genome,
} from "./genetics";

describe("genetics", () => {
  it("produces a valid, versioned founder genome", () => {
    const g = randomGenome(12345);
    expect(g.version).toBe(GENOME_VERSION);
    for (const k of ["hue", "saturation", "size", "spiralTightness", "whorls", "hardiness"] as const) {
      expect(g[k]).toBeGreaterThanOrEqual(0);
      expect(g[k]).toBeLessThanOrEqual(1);
    }
    expect(SHELL_SHAPES).toContain(g.shape);
    expect(SHELL_PATTERNS).toContain(g.pattern);
  });

  it("is deterministic given a seed", () => {
    expect(randomGenome(42)).toEqual(randomGenome(42));
    expect(randomGenome(1)).not.toEqual(randomGenome(2));
  });

  it("breeds order-independently for continuous traits (hermaphroditic)", () => {
    const a = randomGenome(7);
    const b = randomGenome(99);
    // Same seed → same blend regardless of parent order.
    const ab = breedGenomes(a, b, 555);
    const ba = breedGenomes(b, a, 555);
    expect(ab.hue).toBeCloseTo(ba.hue, 5);
    expect(ab.size).toBeCloseTo(ba.size, 5);
  });

  it("keeps all bred trait values within [0,1]", () => {
    const a = randomGenome(3);
    const b = randomGenome(4);
    for (let seed = 0; seed < 200; seed++) {
      const child = breedGenomes(a, b, seed);
      for (const k of ["hue", "saturation", "size", "spiralTightness", "whorls", "hardiness"] as const) {
        expect(child[k]).toBeGreaterThanOrEqual(0);
        expect(child[k]).toBeLessThanOrEqual(1);
      }
    }
  });

  it("flags the rare Tyrian purple morph at the hue tail", () => {
    const morph: Genome = { ...randomGenome(1), hue: PURPLE_MORPH_THRESHOLD };
    const plain: Genome = { ...randomGenome(1), hue: 0.5 };
    expect(isPurpleMorph(morph)).toBe(true);
    expect(isPurpleMorph(plain)).toBe(false);
  });

  it("keeps the purple morph RARE among random founders", () => {
    let morphs = 0;
    const N = 3000;
    for (let i = 0; i < N; i++) if (isPurpleMorph(randomGenome(i))) morphs++;
    // Should be a small tail, well under 5%.
    expect(morphs / N).toBeLessThan(0.05);
  });

  it("two purple parents can pass on the morph (cultivation works)", () => {
    const p: Genome = { ...randomGenome(1), hue: 0.99 };
    let inherited = 0;
    for (let seed = 0; seed < 500; seed++) {
      if (isPurpleMorph(breedGenomes(p, p, seed))) inherited++;
    }
    // Cultivating from two deep-purple parents should often (not always) hold.
    expect(inherited).toBeGreaterThan(100);
  });

  it("describes traits in human-readable terms", () => {
    const desc = describeGenome({ ...randomGenome(1), hue: 0.99 });
    expect(desc.join(" ")).toContain("Tyrian purple");
  });
});
