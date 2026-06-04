/**
 * Gentle, auto-generated diary events. Pure: given a kind (+ optional context
 * and seed) it returns a calm life-event line. No urgency, no guilt — the tone
 * of a nature journal, not a notification feed.
 */
import { makeRng, pick, randomSeed } from "./rng";

export type DiaryKind =
  | "hatched"
  | "fed"
  | "estivated"
  | "woke"
  | "explored"
  | "grew"
  | "paired"
  | "laid_eggs"
  | "passed";

const TEMPLATES: Record<DiaryKind, string[]> = {
  hatched: [
    "emerged from the clutch, no bigger than a lentil",
    "uncurled into the world for the first time",
  ],
  fed: [
    "grazed a leaf down to its veins",
    "found the cuttlebone and rasped at it contentedly",
  ],
  estivated: [
    "sealed the shell and settled in to wait out the dry spell",
    "drew the door closed and went quietly to rest",
  ],
  woke: [
    "broke the seal and stretched back into the damp morning",
    "woke, unhurried, and tested the air",
  ],
  explored: [
    "reached the top of the fern after three patient days",
    "left a long silver trail across the glass",
    "spent the afternoon mapping a single stone",
  ],
  grew: [
    "added a new whorl to the spiral",
    "grew into the next turn of its shell",
  ],
  paired: ["met {partner} among the moss", "pressed close to {partner} a while"],
  laid_eggs: [
    "tucked a small clutch of eggs into the substrate",
    "laid {count} eggs in a quiet corner",
  ],
  passed: [
    "drew the shell closed for the last time, after a long life",
    "came to the end of a long, unhurried life",
  ],
};

export type DiaryContext = { partner?: string; count?: number };

export function diaryMessage(
  kind: DiaryKind,
  ctx: DiaryContext = {},
  seed: number = randomSeed(),
): string {
  const rng = makeRng(seed);
  const template = pick(rng, TEMPLATES[kind]);
  return template
    .replace("{partner}", ctx.partner ?? "another keeper's snail")
    .replace("{count}", String(ctx.count ?? "a few"));
}
