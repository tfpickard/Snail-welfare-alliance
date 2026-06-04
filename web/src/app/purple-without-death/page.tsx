import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Purple Without Death",
  description:
    "On the coast of Oaxaca, Mixtec dyers have made Tyrian purple for three thousand years without killing a single snail. The living proof that purple never required death.",
};

export default function PurpleWithoutDeathPage() {
  return (
    <div className="pb-20">
      <section className="mx-auto max-w-3xl px-5 pt-20 text-center sm:px-8 sm:pt-28">
        <Reveal>
          <p className="eyebrow mb-5">Purple without death</p>
          <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.04]">
            It has a name.
            <br />
            <span className="text-tyrian">It has a thousand names.</span>
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto mt-14 max-w-2xl px-5 sm:px-8">
        <Reveal>
          <div className="prose-swa max-w-none">
            <p>
              On the Pacific coast of Oaxaca, in the Mixtec town of Pinotepa de
              Don Luis, the dye is still made the way it has been made for{" "}
              <strong>roughly three thousand years</strong>. A dyer walks the
              rocks at low tide, lifts a living <em>Purpura pansa</em>, and
              breathes or presses gently until the snail releases its milky
              secretion directly onto a waiting skein of cotton. The thread
              blushes green, then blue, then violet in the sea air. And then the
              snail — unhurt, unbroken — is set back on its rock to recover and to
              be found again another season.
            </p>
            <p>
              Nothing is cracked. Nothing is killed. The same legendary color,
              the same molecule the emperors prized, drawn from an animal that
              crawls away afterward.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <figure className="my-14 text-center">
            <Image
              src="/images/illustrations/spot-murex-detail.svg"
              alt="A living dye-snail rendered in line art, intact and whole — the non-lethal tradition."
              width={360}
              height={300}
              className="mx-auto h-auto w-full max-w-xs"
            />
            <figcaption className="stat-label mt-4">
              The snail is returned to the rocks, alive
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <div className="prose-swa max-w-none">
            <p>
              This is the most important fact on this whole website, so we will
              say it as simply as we can:{" "}
              <strong>purple has never required death.</strong> The lethal method
              is not the ancient or the authentic one — it is an industrial
              shortcut. The truly old tradition, the unbroken one, is the gentle
              one.
            </p>
            <p>
              It is also fragile. Only <strong>thirteen to fifteen</strong>{" "}
              elderly licensed dyers remain. In the early 1980s the snails were
              nearly wiped out when an outside firm paid untrained harvesters by
              volume, and they killed to work faster; recovery took decades and
              the protection of Mexican law, in place since 1988. The
              non-lethal tradition is the hero of this story. It is not our
              target, and it never will be — it is our proof, and our debt.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <blockquote className="my-12 border-l-2 border-tyrian pl-6 font-display text-2xl italic leading-snug text-imperial sm:text-3xl">
            The thread remembers the color. The snail remembers nothing, because
            it lived.
          </blockquote>
        </Reveal>

        <Reveal>
          <div className="prose-swa max-w-none">
            <p>
              When the modern alternative arrived — synthetic since 1904,
              fermented since 2023 — it did not invent purple-without-death. It
              simply gave the rest of the world the thing Pinotepa never lost.
              The flask and the tidepool agree. Only the killing is optional.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-3 text-center">
            <Link href="/take-action" className="btn-tyrian">
              Stand with the living snail →
            </Link>
            <Link href="/where-are-the-snails" className="btn-outline">
              Read the campaign
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
