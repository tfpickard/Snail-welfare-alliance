import { NextResponse } from "next/server";
import {
  newsletterSchema,
  deliverNewsletter,
  rateLimit,
  clientIp,
} from "@/lib/forms";

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (!rateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 60_000 })) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  // Honeypot tripped → pretend success, drop silently for the bot only.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, pending: true });
  }

  try {
    const result = await deliverNewsletter(parsed.data);
    return NextResponse.json({
      ok: true,
      pending: result.pending,
      message: result.pending
        ? "You’re on the list (pending). We’ll confirm once our mailer is live."
        : "You’re subscribed. We write only when there’s something to say.",
    });
  } catch (err) {
    console.error("[newsletter] delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 502 },
    );
  }
}
