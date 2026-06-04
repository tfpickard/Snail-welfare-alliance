import { z } from "zod";

/* ── Validation schemas ──────────────────────────────────────────────── */

/** Shared honeypot field — must be empty (bots fill hidden fields). */
const honeypot = z.string().max(0, "Rejected.").optional().or(z.literal(""));

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  // Honeypot: real users never see or fill this.
  company: honeypot,
});

export const contactSchema = z.object({
  name: z.string().min(1, "Please tell us your name.").max(120),
  email: z.string().email("Please enter a valid email address."),
  message: z
    .string()
    .min(10, "A little more detail, please (10+ characters).")
    .max(5000, "That's longer than our inbox can take (5000 char max)."),
  company: honeypot,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

/* ── Naive in-memory rate limiter ────────────────────────────────────── */
/*
  Sufficient for a low-traffic campaign site and a single serverless instance.
  TODO(owner): for production scale, back this with Upstash Redis / Vercel KV so
  the window is shared across instances.
*/
const HITS = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): boolean {
  const now = Date.now();
  const recent = (HITS.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  HITS.set(key, recent);
  return recent.length <= limit;
}

/** Best-effort client IP from forwarded headers. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

/* ── Provider-agnostic delivery ──────────────────────────────────────── */
/*
  Newsletter / contact submissions are handed to whatever provider is configured
  via env vars. When none is set we DO NOT silently drop: we validate, log a
  warning, and return a friendly "pending" result so the user gets honest
  feedback and the owner sees the submission in logs.
*/

export type DeliveryResult = { ok: true; pending: boolean };

export async function deliverNewsletter(
  input: NewsletterInput,
): Promise<DeliveryResult> {
  const provider = process.env.NEWSLETTER_PROVIDER;
  const apiUrl = process.env.NEWSLETTER_API_URL;
  const apiKey = process.env.NEWSLETTER_API_KEY;

  if (!provider || !apiUrl) {
    console.warn(
      `[newsletter] No provider configured (NEWSLETTER_PROVIDER/NEWSLETTER_API_URL). ` +
        `Pending subscription for: ${input.email}`,
    );
    return { ok: true, pending: true };
  }

  // TODO(owner): map this to your provider's subscribe endpoint shape.
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({ email: input.email }),
  });
  if (!res.ok) {
    throw new Error(`Newsletter provider responded ${res.status}`);
  }
  return { ok: true, pending: false };
}

export async function deliverContact(
  input: ContactInput,
): Promise<DeliveryResult> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      `[contact] No CONTACT_WEBHOOK_URL configured. Pending message from ` +
        `${input.name} <${input.email}>: ${input.message.slice(0, 140)}`,
    );
    return { ok: true, pending: true };
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`Contact webhook responded ${res.status}`);
  }
  return { ok: true, pending: false };
}
