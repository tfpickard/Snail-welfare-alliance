import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Accordion } from "@/components/Accordion";
import { getFaqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "The objections, answered directly: the scale question, sentience uncertainty, the Mexican tradition, religious use, ‘natural is better’, and more.",
};

export default async function FaqPage() {
  const items = await getFaqItems();

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="FAQ"
        title="The objections, answered."
        lede="Directly, without hedging or moralizing. If your question isn’t here, ask us."
      />
      <div className="mx-auto mt-10 max-w-3xl px-5 sm:px-8">
        <Accordion items={items} />
        <p className="mt-10 text-engravers/75">
          Still wondering something?{" "}
          <Link
            href="/contact"
            className="text-tyrian underline decoration-tyrian/40 underline-offset-2 hover:text-murex-bloom"
          >
            Write to us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
