import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { MERCH_POD_URL, ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "“Save the Snails” — five shirts that carry the argument. Every sale funds the campaign.",
};

type Tee = { file: string; name: string; blurb: string; slug: string };

const TEES: Tee[] = [
  {
    file: "tshirt-02-stark-statistic",
    name: "Ten Thousand",
    slug: "ten-thousand",
    blurb: "The number that is the whole campaign in miniature. 10,000 — snails per gram.",
  },
  {
    file: "tshirt-05-same-molecule",
    name: "Same Molecule",
    slug: "same-molecule",
    blurb: "6,6′-dibromoindigo, natural and synthetic, side by side. For the chemist and the connoisseur.",
  },
  {
    file: "tshirt-04-natural-history",
    name: "Natural History",
    slug: "natural-history",
    blurb: "The murex in the antiquarian engraving style — beautiful, ancient, and alive.",
  },
  {
    file: "tshirt-01-corny-rhyme",
    name: "Corny Rhyme",
    slug: "corny-rhyme",
    blurb: "A little wry, a little disarming. The softest way to start the conversation.",
  },
  {
    file: "tshirt-03-typographic",
    name: "Typographic",
    slug: "typographic",
    blurb: "The argument set in type, clean and quiet. Lets the words do the work.",
  },
];

function buyHref(slug: string): string | null {
  if (!MERCH_POD_URL) return null;
  // TODO(owner): adjust to your print-on-demand product URL shape.
  return `${MERCH_POD_URL.replace(/\/$/, "")}/${slug}`;
}

export default function MerchPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow={ORG.merchBrand}
        title="Wear the argument."
        lede="Five shirts under our “Save the Snails” line. They carry the case for you — and every sale funds the work."
      />

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {TEES.map((tee) => {
          const href = buyHref(tee.slug);
          return (
            <article
              key={tee.slug}
              className="flex flex-col overflow-hidden rounded-sm border border-engravers/15 bg-bone/30"
            >
              <div className="flex aspect-[3/4] items-center justify-center bg-vellum p-6">
                <Image
                  src={`/images/tshirts/${tee.file}.svg`}
                  alt={`“${tee.name}” shirt design: ${tee.blurb}`}
                  width={600}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-xl">{tee.name}</h2>
                <p className="mt-1.5 flex-1 text-sm text-engravers/75">
                  {tee.blurb}
                </p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tyrian mt-4 justify-center text-sm"
                  >
                    Get this shirt →
                  </a>
                ) : (
                  <span className="mt-4 inline-flex justify-center rounded-sm border border-engravers/20 px-4 py-2.5 text-sm text-engravers/55">
                    Coming soon
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {!MERCH_POD_URL && (
        <p className="mx-auto mt-10 max-w-2xl px-5 text-center text-sm text-engravers/60 sm:px-8">
          {/* TODO(owner): set NEXT_PUBLIC_MERCH_POD_URL to your print-on-demand
              storefront to turn these into live products. */}
          Our print-on-demand store isn&rsquo;t live yet. These are the final
          designs — ordering opens soon.
        </p>
      )}
    </div>
  );
}
