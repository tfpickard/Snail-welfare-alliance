import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Where Are the Snails?",
  description:
    "The flagship campaign. Tyrian purple — the color of emperors — is still drawn from live sea snails at ten thousand a gram, for a dye that has been synthetic since 1904.",
};

export default function WhereAreTheSnailsPage() {
  return (
    <div className="pb-16">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="border-b border-engravers/10 bg-imperial text-vellum">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <Reveal>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-murex-ivory">
              The campaign
            </p>
            <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] text-vellum">
              Where are the snails?
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg text-vellum/80 sm:text-xl">
              You have seen the color. On a cardinal&rsquo;s robe, a Roman hem, a
              museum fragment two thousand years old and still vivid. You have
              never once been asked where it came from. Ask now.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Emotional descent ────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <div className="prose-swa max-w-none pt-16">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.75] first-letter:text-tyrian">
              It came from an animal. A spiny sea snail the length of your thumb,
              pulled living from the Mediterranean, its shell cracked open by hand
              so a single gland could be cut out. From that gland, a few drops of
              clear liquor that turn — in sunlight, over hours — pale green, then
              blue, then the deep bruised purple that emperors made it a crime for
              anyone else to wear.
            </p>
            <p>
              It is, genuinely, one of the most beautiful processes in the history
              of color. We want to say that plainly, because we are not here to
              make you flinch. We are here to make you count.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <figure className="my-14 text-center">
            <Image
              src="/images/illustrations/spot-ten-thousand.svg"
              alt="A line-art multitude of murex shells, standing for the ten thousand snails behind a single gram of dye."
              width={420}
              height={360}
              className="mx-auto h-auto w-full max-w-sm"
            />
            <figcaption className="stat-label mt-4">
              One gram of dye
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <div className="text-center">
            <p className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-none text-tyrian">
              10,000
            </p>
            <p className="mx-auto mt-4 max-w-xl text-lg text-engravers/80">
              snails for a single gram. Twelve thousand for the trim on one
              ancient garment — &ldquo;half a thimbleful.&rdquo; Each one alive
              when it began. Each one cracked open by hand.
            </p>
          </div>
        </Reveal>
      </section>

      <SectionDivider />

      {/* ─── The reveal ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <div className="prose-swa max-w-none">
            <p className="eyebrow">And here is the part that undoes it</p>
            <h2>None of it has been necessary since 1904.</h2>
            <p>
              The thing that makes the color is a molecule —
              6,6&prime;-dibromoindigo — and we learned to make that molecule in a
              flask <strong>over a century ago</strong>. Since 2023 we grow it
              with microbes, by the gram, snail-free. It is not a near-copy or a
              cheaper substitute. It is the <em>same compound</em>, atom for atom.
              The dye baths are indistinguishable; the tradition that prizes the
              color most says only God can tell them apart.
            </p>
            <p>
              So the ten thousand are not a tragic necessity. They are a habit. A
              connoisseur&rsquo;s belief that the killing makes the purple
              somehow truer — a belief that dissolves the instant you look at the
              chemistry. The snails are still dying for the <em>idea</em> of
              natural, long after nature stopped being needed.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <blockquote className="my-12 border-l-2 border-tyrian pl-6 font-display text-3xl italic leading-snug text-imperial sm:text-4xl">
            The snail is not the problem. The demand is.
          </blockquote>
        </Reveal>

        <Reveal>
          <div className="prose-swa max-w-none">
            <p>
              That is the whole campaign, and it is why we are oddly hopeful. The
              market is tiny — a handful of collectors, artists, and
              institutions. The fix asks nothing of anyone except a substitution
              that costs nothing and changes nothing visible. And the proof that
              purple never required death is not a hypothesis. It is three
              thousand years old, and it is still being practised on a beach in
              Oaxaca.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/purple-without-death" className="btn-tyrian">
              Purple without death →
            </Link>
            <Link href="/the-case" className="btn-outline">
              See the evidence
            </Link>
            <Link href="/take-action" className="btn-outline">
              Help end it
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
