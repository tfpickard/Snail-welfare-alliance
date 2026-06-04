import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PullQuote } from "@/components/PullQuote";
import { SectionDivider } from "@/components/SectionDivider";
import { StickyToc, type TocEntry } from "@/components/StickyToc";

export const metadata: Metadata = {
  title: "The Case",
  description:
    "The evidence, across four markets: the dye extreme, the food billions, the cosmetics boom, and the regulatory loophole that leaves snails almost entirely unprotected. Sourced and precautionary.",
};

const TOC: TocEntry[] = [
  { id: "dye", label: "The dye extreme" },
  { id: "food", label: "The food billions" },
  { id: "cosmetics", label: "The cosmetics boom" },
  { id: "medicine", label: "Medicine — the exception" },
  { id: "opacity", label: "Fraud & opacity" },
  { id: "loophole", label: "The regulatory loophole" },
  { id: "sources", label: "Sources" },
];

function SectionMark({ icon, alt }: { icon: string; alt: string }) {
  return (
    <Image
      src={`/images/icons/${icon}.svg`}
      alt={alt}
      width={48}
      height={48}
      className="mb-5 h-12 w-12"
    />
  );
}

export default function TheCasePage() {
  return (
    <div className="pb-12">
      <PageHeader
        eyebrow="The Case"
        title="Largely needless. Almost entirely unregulated."
        lede="Snails are exploited across four markets — most vividly for dye, most massively for food, most lucratively for cosmetics. The common thread is not scale. It is that almost no one is watching, and almost none of it has to happen."
      />

      <div className="mx-auto mt-12 max-w-6xl gap-12 px-5 sm:px-8 lg:grid lg:grid-cols-[220px_1fr]">
        {/* Sticky TOC */}
        <div className="mb-12 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <StickyToc entries={TOC} />
          </div>
        </div>

        {/* Long-read body */}
        <article className="prose-swa max-w-none">
          {/* ── §1 The dye extreme (sourced: research-dossier.md) ── */}
          <section id="dye" className="scroll-mt-24">
            <SectionMark
              icon="icon-luxury-gold"
              alt="Icon: a luxury coin marked with a shell."
            />
            <p className="eyebrow">The extreme</p>
            <h2>The dye that costs 10,000 lives a gram</h2>
            <p>
              Tyrian purple — the &ldquo;color of emperors,&rdquo; once worth
              three times its weight in gold — is still made today by cracking
              open live predatory sea snails and extracting a single gland. The
              yield is roughly <strong>10,000–12,000 snails per gram</strong> of
              dye. The retail price is about <strong>€2,500 per gram</strong>{" "}
              (Kremer Pigmente). The necessity is zero: the exact same molecule,
              6,6&prime;-dibromoindigo, has been synthesisable since 1904.
            </p>
            <PullQuote cite="Per gram of natural Tyrian purple dye">
              10,000 snails. One gram. No reason.
            </PullQuote>
            <p>
              The largest organised producer, Israel&rsquo;s Ptil Tekhelet,
              processes about <strong>400,000 snail glands a year</strong> to
              make ritual fringes — roughly thirty snails per set. We name it as
              a matter of public record, not blame: that work fulfils a sincere
              religious obligation, and the tradition itself holds the dye to be
              visually indistinguishable from indigo. Our position is narrow and
              the same everywhere — an identical synthetic exists and should be
              considered. We target the demand for lethal &ldquo;natural&rdquo;
              purple, never the worshipper or the artisan.
            </p>
            <p>
              The dye is the vivid, absurd tip of the spear: tiny in scale,
              maximal in needlessness. It is where the argument is clearest. But
              it is not where the numbers are.
            </p>
          </section>

          <SectionDivider />

          {/* ── §2 The food billions (sourced: dossier) ── */}
          <section id="food" className="scroll-mt-24">
            <SectionMark
              icon="icon-scale"
              alt="Icon: a balance scale weighing one snail against many."
            />
            <p className="eyebrow">The scale</p>
            <h2>The billions on the plate</h2>
            <p>
              Where the dye kills perhaps a million snails a year, food kills
              between <strong>2.9 and 7.7 billion</strong> annually (Rethink
              Priorities, 2023) — typically by boiling alive, with essentially no
              welfare standards and little public attention. This is the mass of
              the problem, and we will not pretend otherwise.
            </p>
            <PullQuote cite="Snails killed for food each year — Rethink Priorities, 2023">
              2.9–7.7 billion
            </PullQuote>
            <p>
              We hold two things at once. Scale is{" "}
              <strong>orthogonal to ethics</strong>: a needless act of killing a
              possibly-sentient animal is wrong on a per-act basis whether it
              happens once or a billion times. And scale is where the suffering
              compounds. We do not equate the dye with the food industry, and we
              do not lean on the food billions to inflate the dye case. We name
              the food scale honestly because an organisation about snail welfare
              cannot look away from where most snails actually die.
            </p>
            {/* TODO(owner): review copy — food-welfare standards research is
                ongoing; figures above are from the cited Rethink Priorities
                estimate and should be re-verified before any campaign use. */}
          </section>

          <SectionDivider />

          {/* ── §3 The cosmetics boom (new copy, modest) ── */}
          <section id="cosmetics" className="scroll-mt-24">
            <SectionMark
              icon="icon-luxury-gold"
              alt="Icon: a luxury coin, marking the cosmetics market."
            />
            <p className="eyebrow">The lucrative</p>
            <h2>The mucin boom</h2>
            <p>
              In the last decade, <strong>snail-secretion filtrate</strong> —
              &ldquo;snail mucin&rdquo; — has become one of the fastest-growing
              ingredients in skincare, anchoring a global market measured in the
              hundreds of millions of dollars. The slime is harvested from living
              snails farmed at scale. Methods range from gentle to stressful, and
              the industry is largely self-reported: there is no agreed welfare
              standard for how a snail should be made to produce mucus, and little
              independent oversight of how it is done.
            </p>
            <p>
              We do not claim the worst here. We claim what is true and damning
              enough on its own: a booming luxury market rests on a living animal
              we have decided, by default, not to think about.
            </p>
            {/* TODO(owner): review copy — cosmetics/mucin section is newly
                drafted for the four-market scope and is not yet sourced in
                research-dossier.md. Verify market figures and harvesting-method
                claims against primary sources before publication. */}
          </section>

          <SectionDivider />

          {/* ── §4 Medicine — the exception (honors guardrail #5) ── */}
          <section id="medicine" className="scroll-mt-24">
            <SectionMark
              icon="icon-unnecessary-flask"
              alt="Icon: a laboratory flask, here marking genuine medical use."
            />
            <p className="eyebrow">The exception</p>
            <h2>Medicine is not on trial</h2>
            <p>
              One use of snails is genuinely different. Venom from cone snails
              gave us <strong>ziconotide (Prialt)</strong>, a powerful
              non-opioid painkiller for people whose pain nothing else reaches.
              That is life-saving, not ornamental, and we will not lump it in
              with vanity uses to score a point. Distinguishing the two is the
              whole discipline of this campaign: we are against{" "}
              <strong>needless</strong> killing, not against snails being of use
              to medicine that genuinely needs them.
            </p>
            {/* TODO(owner): review copy — Prialt/ziconotide framing newly
                drafted; verify before publication. */}
          </section>

          <SectionDivider />

          {/* ── §5 Fraud & opacity (new copy, modest) ── */}
          <section id="opacity" className="scroll-mt-24">
            <SectionMark
              icon="icon-identical-molecule"
              alt="Icon: two identical molecules, marking the indistinguishability of natural and synthetic."
            />
            <p className="eyebrow">The opacity</p>
            <h2>You cannot tell, and that is the point</h2>
            <p>
              Because natural and synthetic Tyrian purple are the{" "}
              <strong>same molecule</strong>, no buyer can verify that a
              &ldquo;natural&rdquo; dye was made the lethal way — or that it was
              natural at all. Provenance rests on the seller&rsquo;s word. The
              connoisseur&rsquo;s claim to taste the difference between a snail
              and a flask is, chemically, a claim to tell a molecule from itself.
              Across food, cosmetics, and dye alike, the through-line is the same:
              opacity. We are asked to trust supply chains that no one is
              required to disclose.
            </p>
            {/* TODO(owner): review copy — fraud/opacity section newly drafted
                for the four-market scope; verify before publication. */}
          </section>

          <SectionDivider />

          {/* ── §6 The regulatory loophole (dossier-grounded) ── */}
          <section id="loophole" className="scroll-mt-24">
            <SectionMark
              icon="icon-sentience-precaution"
              alt="Icon: a snail enclosing a question mark, marking the precautionary case."
            />
            <p className="eyebrow">The loophole</p>
            <h2>The law recognises their cousins, not them</h2>
            <p>
              Invertebrate welfare law is nascent, and it stops just short of
              snails. The UK&rsquo;s Animal Welfare (Sentience) Act 2022 extended
              legal recognition to <strong>cephalopod molluscs</strong> — octopus,
              squid, cuttlefish — and to decapod crustaceans, on the strength of
              the evidence for their sentience. Gastropods, their molluscan
              relatives, were simply <strong>not studied</strong>, and so were
              left out. Not ruled out. Left out.
            </p>
            <p>
              That is the loophole this campaign lives in: a class of animals
              with nociceptors and a near-human opioid receptor, killed by the
              billion, with no welfare floor at all — because the science that
              would force the question has not been funded, and the law follows
              the science. We argue the precautionary case in the meantime:{" "}
              <Link href="/science">assume a capacity for pain until shown
              otherwise</Link>, because the cost of being wrong is borne entirely
              by the snail.
            </p>
          </section>

          <SectionDivider />

          {/* ── §7 Sources ── */}
          <section id="sources" className="scroll-mt-24">
            <p className="eyebrow">Sources &amp; honesty</p>
            <h2>Where these numbers come from</h2>
            <p>
              We state what the evidence supports and flag what it does not. Key
              figures and their origins:
            </p>
            <ul>
              <li>
                <strong>~10,000–12,000 snails / gram</strong> and{" "}
                <strong>~€2,562 / gram</strong> (Kremer Pigmente, 2024) — the
                dye extraction rate and retail price.
              </li>
              <li>
                <strong>~400,000 glands / year</strong>, ~30 snails per ritual
                set — Ptil Tekhelet&rsquo;s reported volume.
              </li>
              <li>
                <strong>2.9–7.7 billion</strong> food snails / year — Rethink
                Priorities (2023).
              </li>
              <li>
                <strong>Synthetic since 1904</strong>; first commercial
                fermentation Tyrian purple, Conagen (2023).
              </li>
              <li>
                <strong>~95% μ-opioid receptor identity</strong>, gastropod
                nociceptors, <em>Aplysia</em> sensitization, and the cephalopod
                sentience laws — detailed, with caveats, on the{" "}
                <Link href="/science">science page</Link>.
              </li>
            </ul>
            <p className="text-sm text-engravers/65">
              Order-of-magnitude estimates (such as the under-~1-million annual
              dye kill) are labelled as estimates. Newly drafted four-market
              sections are under owner review and will carry primary citations
              before any campaign use. If we get something wrong, we correct it.
            </p>
          </section>

          {/* ── CTA ── */}
          <div className="mt-14 rounded-sm border border-engravers/15 bg-bone/40 p-8">
            <h2 className="font-display text-2xl">The easiest harm to end</h2>
            <p className="mt-3 text-engravers/80">
              Small market, free alternative, real animal. That combination is
              rare — and it is exactly what makes this winnable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/take-action" className="btn-tyrian">
                Take action →
              </Link>
              <Link href="/purple-without-death" className="btn-outline">
                See the proof it&rsquo;s needless
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
