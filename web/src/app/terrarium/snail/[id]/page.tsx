import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { assertTerrariumEnabled } from "@/lib/terrarium/guard";
import * as svc from "@/lib/terrarium/service";
import { SnailArt } from "@/components/terrarium/SnailArt";
import { LineageTree } from "@/components/terrarium/LineageTree";
import { ProfileActions } from "@/components/terrarium/ProfileActions";
import { describeGenome, isPurpleMorph } from "@/lib/terrarium/genetics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "A snail",
  robots: { index: false, follow: false },
};

export default async function SnailProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  assertTerrariumEnabled();
  const { id } = await params;

  const data = await svc.getPublicSnail(id);
  if (!data) notFound();
  const { snail, keeperName, diary } = data;

  const [lineage, session] = await Promise.all([svc.getLineage(id), auth()]);

  const viewerId = session?.user?.id ?? null;
  const isSelf = viewerId === snail.ownerId;
  let mySnailId: string | null = null;
  let initialFollowing = false;
  if (viewerId && !isSelf) {
    const [garden, following] = await Promise.all([
      svc.getGarden(viewerId),
      svc.isFollowing(viewerId, snail.ownerId),
    ]);
    mySnailId = garden.snails[0]?.id ?? null;
    initialFollowing = following;
  }

  const traits = describeGenome(snail.genome);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <Link href="/terrarium/garden" className="text-sm text-engravers/60 hover:text-tyrian">
        ← The Garden
      </Link>

      <div className="mt-6 grid gap-6 sm:grid-cols-[200px_1fr] sm:items-center">
        <div className="flex items-center justify-center rounded-sm border border-engravers/15 bg-vellum p-3">
          <SnailArt genome={snail.genome} size={200} state={snail.status} />
        </div>
        <div>
          <h1 className="font-display text-3xl">{snail.name}</h1>
          <p className="mt-1 text-engravers/70">
            kept by {keeperName ?? "a keeper"} · gen {snail.generation}
          </p>
          <p className="mt-2 text-sm text-engravers/70">
            {traits.join(" · ")}
            {isPurpleMorph(snail.genome) && (
              <span className="ml-1 text-tyrian">· rare Tyrian morph</span>
            )}
          </p>
          {viewerId ? (
            <div className="mt-4">
              <ProfileActions
                targetUserId={snail.ownerId}
                targetSnailId={snail.id}
                mySnailId={mySnailId}
                isSelf={isSelf}
                initialFollowing={initialFollowing}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm text-engravers/55">
              <Link href="/terrarium" className="text-tyrian hover:underline">
                Sign in
              </Link>{" "}
              to follow this keeper or request to pair.
            </p>
          )}
        </div>
      </div>

      {/* Lineage */}
      <section className="mt-12">
        <h2 className="stat-label mb-5 text-center">Lineage</h2>
        <LineageTree
          self={{ name: snail.name, generation: snail.generation }}
          ancestors={lineage.ancestors}
          descendants={lineage.descendants}
        />
      </section>

      {/* Diary */}
      <section className="mt-12">
        <h2 className="stat-label mb-4">Diary</h2>
        {diary.length === 0 ? (
          <p className="text-engravers/60">Nothing written yet.</p>
        ) : (
          <ul className="space-y-2.5 border-l border-engravers/15">
            {diary.map((d) => (
              <li key={d.id} className="pl-4 text-engravers/85">
                {d.message}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
