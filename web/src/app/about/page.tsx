import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { SectionDivider } from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Snail Welfare Alliance mission, our three-layer brand, and our honesty policy: we state what the science shows and what it does not.",
};

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
    </div>
  );
}
