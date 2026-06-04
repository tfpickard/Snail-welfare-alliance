/**
 * Genetics engine — pure and deterministic given an RNG seed.
 *
 * A genome is a small set of continuous + categorical traits. Inheritance is a
 * weighted blend of two parents with a low-probability mutation table. The rare
 * deep-Tyrian-purple shell morph — the very color the world kills snails for,
 * here cultivated at no cost to anyone — sits at the tail of the hue gene.
 */
import { makeRng, range, pick, type Rng } from "./rng";

export const GENOME_VERSION = 1 as const;

export const SHELL_SHAPES = ["globular", "spindle", "turreted", "conical"] as const;
export const SHELL_PATTERNS = ["banded", "flecked", "plain", "marbled"] as const;
export type ShellShape = (typeof SHELL_SHAPES)[number];
export type ShellPattern = (typeof SHELL_PATTERNS)[number];

export type Genome = {
  version: number;
  /** Shell hue, 0..1 around the murex range; >= PURPLE_MORPH_THRESHOLD is the rare Tyrian morph. */
  hue: number;
  /** Color saturation, 0..1. */
  saturation: number;
  /** Relative adult size, 0..1. */
  size: number;
  /** Tightness of the logarithmic spiral, 0..1. */
  spiralTightness: number;
  /** Number of whorls expressed (visual complexity), 0..1. */
  whorls: number;
  shape: ShellShape;
  pattern: ShellPattern;
  /** Hardiness — gentle influence on how serenely it weathers poor habitat. */
  hardiness: number;
};

/** Hue at/above this is the legendary deep-Tyrian-purple morph. */
export const PURPLE_MORPH_THRESHOLD = 0.93;
/** Per-trait chance a mutation perturbs an inherited value. */
export const MUTATION_RATE = 0.08;

export function isPurpleMorph(genome: Genome): boolean {
  return genome.hue >= PURPLE_MORPH_THRESHOLD;
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

/** A procedurally generated founder genome (no parents). */
export function randomGenome(seed: number): Genome {
  const rng = makeRng(seed);
  return {
    version: GENOME_VERSION,
    // Founders rarely roll the purple morph outright; it's mostly cultivated.
    hue: rollFounderHue(rng),
    saturation: range(rng, 0.45, 0.95),
    size: range(rng, 0.3, 0.7),
    spiralTightness: range(rng, 0.3, 0.8),
    whorls: range(rng, 0.3, 0.8),
    shape: pick(rng, SHELL_SHAPES),
    pattern: pick(rng, SHELL_PATTERNS),
    hardiness: range(rng, 0.3, 0.8),
  };
}

function rollFounderHue(rng: Rng): number {
  // Most founders land in the murex mid-range; a tiny tail reaches the morph.
  const r = rng();
  if (r > 0.98) return range(rng, PURPLE_MORPH_THRESHOLD, 1);
  return range(rng, 0.25, 0.85);
}

/**
 * Breed two genomes. Each gene is a weighted average of the parents (jittered),
 * with an independent mutation chance per gene. Hermaphroditic: order-independent.
 */
export function breedGenomes(a: Genome, b: Genome, seed: number): Genome {
  const rng = makeRng(seed);

  const blend = (x: number, y: number): number => {
    const w = range(rng, 0.35, 0.65); // weighted, not strictly 50/50
    let v = x * w + y * (1 - w);
    if (rng() < MUTATION_RATE) v += range(rng, -0.25, 0.25); // mutation
    return clamp01(v);
  };

  const inheritCat = <T,>(x: T, y: T, options: readonly T[]): T => {
    if (rng() < MUTATION_RATE) return pick(rng, options); // mutation
    return rng() < 0.5 ? x : y;
  };

  return {
    version: GENOME_VERSION,
    hue: blend(a.hue, b.hue),
    saturation: blend(a.saturation, b.saturation),
    size: blend(a.size, b.size),
    spiralTightness: blend(a.spiralTightness, b.spiralTightness),
    whorls: blend(a.whorls, b.whorls),
    shape: inheritCat(a.shape, b.shape, SHELL_SHAPES),
    pattern: inheritCat(a.pattern, b.pattern, SHELL_PATTERNS),
    hardiness: blend(a.hardiness, b.hardiness),
  };
}

/** Human-readable trait summary for profiles. */
export function describeGenome(g: Genome): string[] {
  const hueWord = isPurpleMorph(g)
    ? "deep Tyrian purple"
    : g.hue > 0.7
      ? "violet"
      : g.hue > 0.5
        ? "mauve"
        : g.hue > 0.35
          ? "rose"
          : "ivory";
  const sizeWord = g.size > 0.66 ? "large" : g.size > 0.4 ? "medium" : "petite";
  return [
    `${hueWord} shell`,
    `${g.pattern}`,
    `${g.shape}`,
    `${sizeWord}`,
    g.spiralTightness > 0.6 ? "tight spiral" : "open spiral",
  ];
}
