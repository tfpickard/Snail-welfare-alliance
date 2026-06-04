import { NextResponse } from "next/server";
import { dbConfigured } from "@/db";
import * as svc from "@/lib/terrarium/service";

export const dynamic = "force-dynamic";

/**
 * Vercel Cron entry point for the Terrarium's discrete world events. Idempotent:
 * each job only acts on rows that are genuinely due. Authorized via CRON_SECRET
 * (Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  if (!dbConfigured) {
    return NextResponse.json(
      { ok: false, error: "Terrarium database not configured." },
      { status: 503 },
    );
  }

  const now = new Date();
  const [breeding, hatched, retired] = await Promise.all([
    svc.resolveBreedingEvents(now),
    svc.hatchClutches(now),
    svc.ageAndRetire(now),
  ]);
  const diaried = await svc.dailyDiary();

  return NextResponse.json({
    ok: true,
    ranAt: now.toISOString(),
    breedingResolved: breeding,
    clutchesHatched: hatched,
    retired,
    diaried,
  });
}
