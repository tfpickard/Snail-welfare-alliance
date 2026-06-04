import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { assertTerrariumEnabled } from "@/lib/terrarium/guard";
import * as svc from "@/lib/terrarium/service";
import { SnailArt } from "@/components/terrarium/SnailArt";
import { describeGenome } from "@/lib/terrarium/genetics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "In memory",
  robots: { index: false, follow: false },
};

function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function MemorialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  assertTerrariumEnabled();
  const { id } = await params;
  const m = await svc.getMemorial(id);
  if (!m) notFound();

  const days = Math.max(
    1,
    Math.round((m.diedAt.getTime() - m.bornAt.getTime()) / 86_400_000),
  );

  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
      <p className="eyebrow mb-6">In memory</p>
      <div className="mx-auto flex max-w-xs items-center justify-center">
        <SnailArt genome={m.genome} size={240} state="deceased" />
      </div>
      <h1 className="mt-6 font-display text-4xl">{m.name}</h1>
      <p className="mt-2 text-engravers/70">{describeGenome(m.genome).join(" · ")}</p>
      <p className="mt-4 text-engravers/65">
        {fmt(m.bornAt)} — {fmt(m.diedAt)} · a long life of {days} days
      </p>
      <p className="mx-auto mt-8 max-w-md text-engravers/80">
        {m.epitaph ??
          "Lived gently, and at length. Drew the shell closed for the last time, unhurried — and left a lineage behind."}
      </p>
      <div className="mt-10">
        <Link href="/terrarium" className="btn-outline">
          ← Back to the terrarium
        </Link>
      </div>
    </div>
  );
}
