import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { StatCallout } from "@/components/StatCallout";
import { SectionDivider } from "@/components/SectionDivider";

/* ── The five homepage stat callouts (from homepage.md) ──────────────── */
const STATS = [
  { value: "~10,000", label: "snails killed per gram", emphasis: true },
  { value: "€2,500", label: "retail price per gram" },
  { value: "1904", label: "year first synthesized" },
  { value: "~95%", label: "opioid-receptor identity" },
  { value: "3,000", label: "years of non-lethal dyeing" },
];

/* ── The narrative beats: animal → color → number → science → ───────────
   alternative → purple-without-death → act ───────────────────────────── */
type Beat = {
  n: string;
  eyebrow: string;
  title: string;
  body: React.ReactNode;
  art?: { src: string; alt: string; w: number; h: number };
  icon?: { src: string; alt: string };
  flip?: boolean;
};

const BEATS: Beat[] = [
  {
    n: "01",
    eyebrow: "The animal",
    title: "A predatory sea snail, lovely and alive.",
    body: (
      <>
        <em>Bolinus brandaris</em> and its murex kin have spiralled the
        Mediterranean for millions of years — spined, banded, unhurried. The
        shell is a logarithmic spiral, the same curve that orders galaxies and
        ferns. We begin here, with the animal, because everything that follows
        is a question of what we owe it.
      </>
    ),
    art: {
      src: "/images/illustrations/spot-murex-detail.svg",
      alt: "Line-art study of a living spiny dye-murex shell, drawn in the engraving style.",
      w: 360,
      h: 300,
    },
  },
  {
    n: "02",
    eyebrow: "The color",
    title: "They crack the shells by hand.",
    body: (
      <>
        To make Tyrian purple the old way, you break the living snail open and
        draw out a single gland. A few drops of clear fluid turn — in sunlight —
        from pale to violet to the deep, bruised purple emperors reserved for
        themselves. It is genuinely beautiful. It is also, today, a choice.
      </>
    ),
    flip: true,
    art: {
      src: "/images/illustrations/spot-empty-shell.svg",
      alt: "A single cracked, empty murex shell rendered in line art, its interior hollow.",
      w: 320,
      h: 260,
    },
  },
  {
    n: "03",
    eyebrow: "The number",
    title: "Ten thousand. One gram. No reason.",
    body: (
      <>
        Roughly <strong>10,000–12,000 snails</strong> die for a single gram of
        dye — about half a thimbleful trims one ancient garment. The scale is
        tiny next to the billions killed for food, and we say so plainly. Scale
        is not the argument. <strong>The needlessness is.</strong>
      </>
    ),
    icon: {
      src: "/images/icons/icon-scale.svg",
      alt: "Icon: a balance scale weighing a single snail against a tally of many.",
    },
  },
  {
    n: "04",
    eyebrow: "The science",
    title: "Assume a capacity for pain until shown otherwise.",
    body: (
      <>
        We don&rsquo;t claim these snails suffer — no one has proven it. We note
        what is established: gastropods have nociceptors and an opioid receptor
        roughly <strong>95% identical to ours</strong>; their molluscan cousins,
        the octopuses, are now legally recognised as sentient. The biology is
        suggestive. The cost of caution, here, is nothing.
      </>
    ),
    flip: true,
    icon: {
      src: "/images/icons/icon-sentience-precaution.svg",
      alt: "Icon: a snail enclosing a question mark, marking honest uncertainty about sentience.",
    },
  },
  {
    n: "05",
    eyebrow: "The alternative",
    title: "The same molecule, from a flask.",
    body: (
      <>
        Natural and synthetic Tyrian purple are one compound —
        6,6&prime;-dibromoindigo — synthesisable since <strong>1904</strong> and
        grown by fermentation since 2023. &ldquo;Natural looks better&rdquo;
        cannot survive the chemistry: it is the identical molecule. What made
        purple costly was never the dye. It was always the snails.
      </>
    ),
    icon: {
      src: "/images/icons/icon-identical-molecule.svg",
      alt: "Icon: two identical dibromoindigo molecules, natural and synthetic, side by side.",
    },
  },
  {
    n: "06",
    eyebrow: "Purple without death",
    title: "It has a name. It has a thousand names.",
    body: (
      <>
        On the Oaxacan coast, Mixtec dyers have made purple for{" "}
        <strong>three thousand years</strong> without killing a single snail —
        pressing <em>Purpura pansa</em> to the thread and returning it, alive, to
        the rocks. This is our proof, not our target. Purple never required
        death. It still doesn&rsquo;t.
      </>
    ),
    flip: true,
    art: {
      src: "/images/illustrations/spot-ten-thousand.svg",
      alt: "Line-art illustration evoking the multitude of snails behind a single gram of dye.",
      w: 320,
      h: 280,
    },
  },
  {
    n: "07",
    eyebrow: "What you can do",
    title: "We’re not asking you to give anything up.",
    body: (
      <>
        The whole ask is one cost-free substitution: don&rsquo;t buy lethal
        natural purple when an identical synthetic exists. Share the case.
        Support the work. The market is small, the alternative is already here —
        which makes this the easiest needless harm there is to end.
      </>
    ),
    icon: {
      src: "/images/icons/icon-unnecessary-flask.svg",
      alt: "Icon: a laboratory flask, standing for the needless and the easily-replaced.",
    },
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-8 sm:px-8 sm:pt-16">
          <Reveal>
            <Image
              src="/images/hero-contrast-pair.svg"
              alt="Left: a living Purpura pansa on a rock releasing a single luminous purple drop — the Mexican non-lethal method. Right: a mound of cracked, empty murex shells. The contrast at the heart of the campaign."
              width={900}
              height={480}
              priority
              className="mx-auto h-auto w-full max-w-3xl"
            />
          </Reveal>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <Reveal delay={80}>
              <h1 className="font-display text-[clamp(2.4rem,6.5vw,4.75rem)] leading-[1.04]">
                The color of emperors.
                <br />
                <span className="text-tyrian">The cost of everything.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="measure mx-auto mt-6 text-lg text-engravers/80 sm:text-xl">
                Tyrian purple — worn by Roman emperors, worth three times its
                weight in gold — is still made today by cracking open live sea
                snails. Ten thousand of them per gram. An identical synthetic has
                existed since 1904.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href="/the-case" className="btn-tyrian">
                  Here’s what’s still happening →
                </Link>
                <Link href="/purple-without-death" className="btn-outline">
                  Purple without death
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Stat band ─────────────────────────────────────────────── */}
      <section
        aria-label="Key figures"
        className="border-y border-engravers/15 bg-bone/40"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 gap-x-6 px-5 py-12 sm:px-8 md:grid-cols-5 md:py-14">
          {STATS.map((s) => (
            <StatCallout
              key={s.label}
              value={s.value}
              label={s.label}
              emphasis={s.emphasis}
            />
          ))}
        </div>
      </section>

      {/* ─── Narrative beats ───────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8">
        {BEATS.map((beat, i) => (
          <div key={beat.n}>
            <Reveal>
              <article
                className={`flex flex-col items-center gap-8 py-14 md:flex-row md:gap-14 md:py-20 ${
                  beat.flip ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Art / icon column */}
                <div className="flex w-full shrink-0 justify-center md:w-2/5">
                  {beat.art ? (
                    <Image
                      src={beat.art.src}
                      alt={beat.art.alt}
                      width={beat.art.w}
                      height={beat.art.h}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="h-auto w-full max-w-[280px]"
                    />
                  ) : beat.icon ? (
                    <Image
                      src={beat.icon.src}
                      alt={beat.icon.alt}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-28 w-28 sm:h-32 sm:w-32"
                    />
                  ) : null}
                </div>

                {/* Text column */}
                <div className="w-full md:w-3/5">
                  <p className="eyebrow mb-3">
                    <span className="mr-2 text-engravers/40">{beat.n}</span>
                    {beat.eyebrow}
                  </p>
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                    {beat.title}
                  </h2>
                  <p className="measure mt-4 text-lg text-engravers/80">
                    {beat.body}
                  </p>
                </div>
              </article>
            </Reveal>
            {i < BEATS.length - 1 && i % 2 === 1 && <SectionDivider />}
          </div>
        ))}
      </section>

      {/* ─── Closing CTAs ──────────────────────────────────────────── */}
      <section className="bg-imperial text-vellum">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <Reveal>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-murex-ivory">
              The snail is lovely. The math is the indictment.
            </p>
            <h2 className="font-display text-4xl leading-tight text-vellum sm:text-5xl">
              This is fixable. Help us fix it.
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/the-case"
                className="rounded-sm bg-vellum px-6 py-3 font-medium text-imperial transition-colors hover:bg-murex-ivory"
              >
                Read the full case →
              </Link>
              <Link
                href="/take-action"
                className="rounded-sm border border-vellum/40 px-6 py-3 font-medium text-vellum transition-colors hover:border-vellum hover:bg-vellum/10"
              >
                Support the campaign
              </Link>
              <Link
                href="/merch"
                className="rounded-sm border border-vellum/40 px-6 py-3 font-medium text-vellum transition-colors hover:border-vellum hover:bg-vellum/10"
              >
                Get the shirt
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
