import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { SectionDivider } from "@/components/SectionDivider";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Snail Welfare Alliance mission, our three-layer brand, and our honesty policy: we state what the science shows and what it does not.",
};

const BRAND_LAYERS = [
  {
    layer: "Parent organisation",
    name: ORG.name,
    note: "The coalition itself. All formal and legal references. Solidarity across species.",
  },
  {
    layer: "Flagship campaign",
    name: `“${ORG.campaign}”`,
    note: "Our awareness campaign on lethal Tyrian-purple dye — the clearest, most winnable front.",
  },
  {
    layer: "Merch line",
    name: `“${ORG.merchBrand}”`,
    note: "The apparel sub-brand. Every sale funds the work; the line lives on product copy only.",
  },
];

export default async function AboutPage() {
  const { html } = await getContent("about", { stripTitle: true });

  return (
    <div className="pb-16">
      <PageHeader
        eyebrow="About"
        title="One unnecessary practice. One specific molecule."
        lede="Snail Welfare Alliance is an open coalition working the clearest, most immediately winnable front in invertebrate welfare — and saying out loud exactly what we do and don't know."
      />
      <SectionDivider />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Prose html={html} />
      </div>

      {/* Three-layer brand hierarchy */}
      <div className="mx-auto mt-16 max-w-3xl px-5 sm:px-8">
        <p className="eyebrow mb-2">How the brand is built</p>
        <h2 className="font-display text-2xl sm:text-3xl">Three layers, one mission</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-engravers/15 bg-engravers/15">
          {BRAND_LAYERS.map((l) => (
            <div key={l.name} className="bg-vellum p-5 sm:flex sm:items-baseline sm:gap-6">
              <div className="sm:w-44 shrink-0">
                <p className="stat-label">{l.layer}</p>
                <p className="font-display text-xl text-tyrian">{l.name}</p>
              </div>
              <p className="mt-1 text-engravers/80 sm:mt-0">{l.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
