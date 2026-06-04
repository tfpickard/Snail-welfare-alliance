/**
 * Lightweight text moderation for user-supplied text (snail names, captions).
 * Uses `obscenity` for profanity matching. This is a first line of defense, not
 * a guarantee — paired with a report flow + admin review (see schema `reports`).
 */
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

// Control chars, DEL, zero-width spaces/joiners, bidi overrides, and BOM.
// Built from ASCII escapes to keep the source free of invisible characters.
const INVALID_CHARS = new RegExp(
  "[\\u0000-\\u001F\\u007F\\u200B-\\u200F\\u202A-\\u202E\\uFEFF]",
);

export type ModerationResult =
  | { ok: true; value: string }
  | { ok: false; reason: string };

/**
 * Validate + normalize a display string (snail name, terrarium caption).
 * Trims, length-checks, rejects profanity and control/invisible characters.
 */
export function moderateText(
  raw: string,
  { min = 1, max = 40, field = "text" }: { min?: number; max?: number; field?: string } = {},
): ModerationResult {
  const value = raw.replace(/\s+/g, " ").trim();

  if (value.length < min) return { ok: false, reason: `Please enter a ${field}.` };
  if (value.length > max)
    return { ok: false, reason: `That ${field} is too long (${max} max).` };
  if (INVALID_CHARS.test(value))
    return { ok: false, reason: `That ${field} has invalid characters.` };
  if (matcher.hasMatch(value))
    return { ok: false, reason: `Let's keep ${field}s kind. Try another.` };

  return { ok: true, value };
}
