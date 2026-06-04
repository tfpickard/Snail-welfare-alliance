import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { DonateWidget } from "@/components/DonateWidget";

export const metadata: Metadata = {
  title: "Take Action",
  description:
    "Support the campaign and see what you can do. The ask is small: don’t buy lethal natural purple, share the case, and help fund the work.",
};

const ACTIONS = [
  {
    title: "Don’t buy lethal natural purple",
    body: "The whole ask, and it costs nothing. When a dye, pigment, or textile is sold as ‘natural’ Tyrian purple, an identical synthetic exists. Choose it, or ask.",
  },
  {
    title: "Share the case",
    body: "Most people have never been told where the color comes from. Send someone the campaign — that’s how a tiny, winnable cause actually wins.",
  },
  {
    title: "Subscribe",
    body: "We write only when there’s news worth your inbox. Monthly at most, usually less.",
    href: "/newsletter",
    cta: "Join the newsletter →",
  },
  {
    title: "Get the shirt",
    body: "Every sale under “Save the Snails” funds the work — and starts the conversation for you.",
    href: "/merch",
    cta: "See the merch →",
  },
];

export default function TakeActionPage() {
  return (
    <div className="pb-16">
      <PageHeader
        eyebrow="Take action"
        title="This is fixable. Help us fix it."
        lede="We’re not asking you to give anything up. We’re asking for one cost-free substitution, a share, and — if you can — a little fuel for the work."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Donate */}
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">Support the campaign</h2>
          <p className="mt-3 text-engravers/80">
            We&rsquo;re a small operation; every dollar goes to research,
            outreach, public awareness, and legal monitoring. No overhead
            theatre.
          </p>
          <div className="mt-6">
            <DonateWidget />
          </div>
          <p className="mt-4 text-sm text-engravers/60">
            10,000 snails die per gram of a dye that&rsquo;s been synthetic since
            1904. Your $25 helps end it.
          </p>
        </div>

        {/* What you can do */}
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">What you can do</h2>
          <ul className="mt-6 space-y-5">
            {ACTIONS.map((a) => (
              <li
                key={a.title}
                className="border-l-2 border-tyrian/40 pl-5"
              >
                <h3 className="font-display text-xl">{a.title}</h3>
                <p className="mt-1 text-engravers/80">{a.body}</p>
                {a.href && (
                  <Link
                    href={a.href}
                    className="mt-2 inline-block text-tyrian underline decoration-tyrian/40 underline-offset-2 hover:text-murex-bloom"
                  >
                    {a.cta}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
