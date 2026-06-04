import Link from "next/link";
import { SnailArt } from "@/components/terrarium/SnailArt";
import { CareControls } from "@/components/terrarium/CareControls";
import { AdoptForm } from "@/components/terrarium/AdoptForm";
import { BreedRequests } from "@/components/terrarium/BreedRequests";
import { Meter } from "@/components/terrarium/Meter";
import { describeGenome, isPurpleMorph } from "@/lib/terrarium/genetics";
import type { LiveSnail } from "@/lib/terrarium/service";

type Props = {
  keeperName: string;
  snails: LiveSnail[];
  breedingRequests: { id: string; requesterSnailId: string }[];
  suggestedName: string;
};

const STATUS_LABEL: Record<string, string> = {
  active: "● active",
  estivating: "◌ estivating (resting safely)",
  deceased: "✶ at rest",
};

export function Dashboard({
  keeperName,
  snails,
  breedingRequests,
  suggestedName,
}: Props) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">The Terrarium</p>
          <h1 className="font-display text-3xl sm:text-4xl">
            {keeperName}&rsquo;s terrarium
          </h1>
        </div>
        <Link href="/terrarium/garden" className="btn-outline text-sm">
          The Garden →
        </Link>
      </div>

      {breedingRequests.length > 0 && (
        <div className="mt-6">
          <BreedRequests requests={breedingRequests} />
        </div>
      )}

      {snails.length === 0 ? (
        <div className="mt-10 rounded-sm border border-engravers/15 bg-bone/40 p-8 text-center">
          <h2 className="font-display text-2xl">Adopt your first snail</h2>
          <p className="mx-auto mt-2 max-w-md text-engravers/75">
            A founder with a procedurally-grown shell, all its own. Name it, and
            it&rsquo;s yours to keep — gently, for a long time.
          </p>
          <div className="mx-auto max-w-md">
            <AdoptForm suggestedName={suggestedName} />
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {snails.map((s) => {
            const d = s.derived;
            const traits = describeGenome(s.genome);
            return (
              <article
                key={s.id}
                className="grid gap-8 rounded-sm border border-engravers/15 bg-bone/30 p-6 md:grid-cols-[1.1fr_1fr]"
              >
                {/* Stage */}
                <div className="flex items-center justify-center rounded-sm bg-vellum p-4">
                  <SnailArt
                    genome={s.genome}
                    size={300}
                    animate
                    state={d.status}
                  />
                </div>

                {/* Stats + controls */}
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-2xl">
                      <Link href={`/terrarium/snail/${s.id}`} className="hover:text-tyrian">
                        {s.name}
                      </Link>
                    </h2>
                    <span className="stat-label">gen {s.generation}</span>
                  </div>
                  <p className="mt-1 text-sm text-engravers/70">
                    {traits.join(" · ")}
                    {isPurpleMorph(s.genome) && (
                      <span className="ml-1 text-tyrian">· rare Tyrian morph</span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-engravers/60">
                    {STATUS_LABEL[d.status]} · {Math.floor(d.ageDays)} days ·{" "}
                    {d.growthStage}
                  </p>

                  <div className="mt-5 space-y-3">
                    <Meter label="Health" value={d.health} />
                    <Meter
                      label="Hunger"
                      value={d.hunger}
                      caption={d.hunger > 0.7 ? "peckish" : "content"}
                    />
                    <Meter label="Mood" value={d.mood} />
                    <Meter
                      label="Life"
                      value={d.lifeFraction}
                      caption={d.growthStage}
                    />
                  </div>

                  <div className="mt-6">
                    <CareControls
                      snailId={s.id}
                      estivating={d.status === "estivating"}
                      currentName={s.name}
                    />
                  </div>

                  {d.status === "estivating" && (
                    <p className="mt-4 text-sm text-engravers/60">
                      Sealed and resting. Nothing is degrading; it will pick up
                      exactly where it left off whenever you return.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
