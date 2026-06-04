import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { assertTerrariumEnabled } from "@/lib/terrarium/guard";
import * as svc from "@/lib/terrarium/service";
import { SnailArt } from "@/components/terrarium/SnailArt";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Garden",
  description: "A calm, shared garden of kept snails. Follow keepers; never compete.",
  robots: { index: false, follow: false },
};

function relativeTime(d: Date): string {
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

export default async function GardenPage() {
  assertTerrariumEnabled();
  const session = await auth();
  if (!session?.user?.id) redirect("/terrarium");
  const uid = session.user.id;

  const [feed, discover, boards] = await Promise.all([
    svc.getFeed(uid),
    svc.discoverSnails(),
    svc.getLeaderboards(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">The Garden</p>
          <h1 className="font-display text-3xl sm:text-4xl">A slow, shared garden</h1>
        </div>
        <Link href="/terrarium" className="btn-outline text-sm">
          ← Your terrarium
        </Link>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {/* Feed */}
          <section>
            <h2 className="stat-label mb-4">From keepers you follow</h2>
            {feed.length === 0 ? (
              <p className="text-engravers/65">
                Quiet for now. Follow a keeper below and their snails&rsquo; gentle
                news will gather here.
              </p>
            ) : (
              <ul className="space-y-3 border-l border-engravers/15">
                {feed.map((e) => (
                  <li key={e.id} className="pl-4 text-engravers/85">
                    <Link
                      href={`/terrarium/snail/${e.snailId}`}
                      className="font-medium hover:text-tyrian"
                    >
                      {e.snailName}
                    </Link>{" "}
                    {e.message}{" "}
                    <span className="text-xs text-engravers/45">
                      · {relativeTime(e.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Discover */}
          <section className="mt-12">
            <h2 className="stat-label mb-4">Discover</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {discover.map((s) => (
                <Link
                  key={s.id}
                  href={`/terrarium/snail/${s.id}`}
                  className="rounded-sm border border-engravers/15 bg-bone/30 p-3 transition-colors hover:border-tyrian/40"
                >
                  <div className="flex items-center justify-center bg-vellum">
                    <SnailArt genome={s.genome} size={150} state={s.status} />
                  </div>
                  <p className="mt-2 truncate font-display text-lg">{s.name}</p>
                  <p className="text-xs text-engravers/55">gen {s.generation}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Leaderboards — care, never conquest */}
        <aside>
          <h2 className="stat-label mb-4">Care leaderboards</h2>
          <p className="mb-5 text-sm text-engravers/60">
            We celebrate care, not conquest. No winning, no PvP — just keepers
            doing right by their snails.
          </p>
          <Board title="Oldest living" rows={boards.oldest.map((r) => ({ id: r.id, name: r.name, value: `${r.ageDays}d` }))} />
          <Board title="Most generations" rows={boards.mostGenerations.map((r) => ({ id: r.id, name: r.name, value: `gen ${r.generation}` }))} />
          <Board title="Longest slime-trail" rows={boards.longestTrail.map((r) => ({ id: r.id, name: r.name, value: r.trailLength.toFixed(1) }))} />
        </aside>
      </div>
    </div>
  );
}

function Board({
  title,
  rows,
}: {
  title: string;
  rows: { id: string; name: string; value: string }[];
}) {
  return (
    <div className="mb-7">
      <h3 className="mb-2 font-display text-lg">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-engravers/50">No entries yet.</p>
      ) : (
        <ol className="space-y-1.5 text-sm">
          {rows.map((r, i) => (
            <li key={r.id} className="flex items-baseline justify-between gap-2">
              <span className="truncate">
                <span className="mr-2 text-engravers/40">{i + 1}</span>
                <Link href={`/terrarium/snail/${r.id}`} className="hover:text-tyrian">
                  {r.name}
                </Link>
              </span>
              <span className="shrink-0 text-engravers/60">{r.value}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
