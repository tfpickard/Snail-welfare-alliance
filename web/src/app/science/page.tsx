import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PullQuote } from "@/components/PullQuote";
import { SectionDivider } from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "The Science",
  description:
    "What is established about snail nociception and what is not. The precautionary case for caution — stated honestly, without claiming sentience is proven.",
};

export default function SciencePage() {
  return (
    <div className="pb-12">
      <PageHeader
        eyebrow="The Science"
        title="What we know, what we don’t, and why caution is free."
        lede="We will never tell you a snail’s pain is proven. It isn’t. Here is exactly what the biology shows, where it stops, and why — given the killing is needless — the honest response is precaution."
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* The honest two-column panel */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-engravers/15 bg-engravers/15 sm:grid-cols-2">
          <div className="bg-vellum p-6">
            <p className="stat-label mb-3 text-tyrian">What is established</p>
            <ul className="space-y-3 text-engravers/85">
              <li>
                Gastropods have <strong>nociceptors</strong> — sensory neurons
                functionally analogous to pain receptors.
              </li>
              <li>
                They have an endogenous <strong>opioid system</strong>, with a
                μ-opioid receptor about <strong>95% identical</strong> to the
                human one in structure.
              </li>
              <li>
                In <em>Aplysia californica</em>, a sea slug, long-term
                nociceptive <strong>sensitization</strong> has been documented —
                functionally similar to chronic pain.
              </li>
            </ul>
          </div>
          <div className="bg-vellum p-6">
            <p className="stat-label mb-3">What is not established</p>
            <ul className="space-y-3 text-engravers/85">
              <li>
                That <em>Bolinus brandaris</em>, <em>Hexaplex trunculus</em>, or{" "}
                <em>Purpura pansa</em> specifically are sentient.
              </li>
              <li>
                That they consciously <strong>feel</strong> or{" "}
                <strong>suffer</strong> pain in the way vertebrates do.
              </li>
              <li>
                No formal sentience assessment has been conducted for these dye
                and food species. The honest word is <strong>unknown</strong>.
              </li>
            </ul>
          </div>
        </div>

        <SectionDivider />

        <article className="prose-swa max-w-none">
          <h2>The comparative anchor</h2>
          <p>
            Snails are not a special case of the unknowable; they are an
            understudied one. Their close molluscan relatives the{" "}
            <strong>cephalopods</strong> — octopus, squid, cuttlefish — were
            judged, on the evidence, to be sentient, and are now legally
            recognised as such under the UK Animal Welfare (Sentience) Act 2022,
            alongside decapod crustaceans, with parallel recognition in EU
            frameworks. Gastropods were not ruled out. They were simply never put
            to the test.
          </p>

          <h2>Expert opinion, not proof</h2>
          <p>
            In 2024, the <strong>New York Declaration on Animal Consciousness</strong>
            , signed by leading consciousness researchers including Christof Koch,
            Anil Seth, and David Chalmers, affirmed a &ldquo;realistic
            possibility&rdquo; of conscious experience in many invertebrates. We
            cite this for exactly what it is — the considered opinion of experts,
            not a finding of fact. It lowers the bar for taking the question
            seriously. It does not settle it.
          </p>

          <h2>The precautionary premise</h2>
          <p>
            Put the pieces together and you do not get proof. You get a
            well-grounded reason not to assume the convenient answer.
          </p>
          <PullQuote>
            Assume a capacity for pain until proven otherwise — because pain is a
            primal survival mechanism, and the cost of being wrong is borne
            entirely by the snail.
          </PullQuote>
          <p>
            Precaution usually has a price: it asks us to forgo something to be
            safe. Here it asks for almost nothing. The killing under discussion —
            for a luxury dye whose identical synthetic has existed since 1904 — is{" "}
            <Link href="/the-case">needless to begin with</Link>. When the cost of
            caution rounds to zero, caution is simply the reasonable position.
          </p>

          <h2>What this does not argue</h2>
          <p>
            It does not argue that snails feel as you do, that all snail use is
            equivalent, or that medicine which genuinely needs them is wrong —
            cone-snail venom gave us a real painkiller, and that is a different
            conversation. It argues one modest thing: given what the biology
            already shows and what the killing already lacks, the burden has
            shifted. The question is no longer &ldquo;prove it suffers.&rdquo; It
            is &ldquo;why keep doing this at all?&rdquo;
          </p>
        </article>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/the-case" className="btn-tyrian">
            Read the full case →
          </Link>
          <Link href="/faq" className="btn-outline">
            Common objections, answered
          </Link>
        </div>
      </div>
    </div>
  );
}
