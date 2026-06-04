import { NextResponse } from "next/server";
import {
  contactSchema,
  deliverContact,
  rateLimit,
  clientIp,
} from "@/lib/forms";

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (!rateLimit(`contact:${ip}`, { limit: 4, windowMs: 60_000 })) {
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true, pending: true });
  }

  try {
    const result = await deliverContact(parsed.data);
    return NextResponse.json({
      ok: true,
      pending: result.pending,
      message: result.pending
        ? "Thanks — your message is logged (pending). We’ll wire up our inbox shortly."
        : "Thanks — your message is on its way. We’ll be in touch.",
    });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 502 },
    );
  }
}
