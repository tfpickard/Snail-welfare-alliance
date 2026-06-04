import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Stay in the loop. We write when we have something to say — a producer reached, a finding worth knowing, a regulatory opening, a win. Monthly at most.",
};

export default function NewsletterPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Newsletter"
        title="We write when we have something to say."
        lede="No content calendar. No growth-hacking. When there’s a development worth your inbox — you’ll hear about it."
      />

      <div className="mx-auto mt-10 max-w-xl px-5 sm:px-8">
        <NewsletterForm />
        <p className="mt-4 text-sm text-engravers/65">
          Monthly at most. Usually less. No tracking pixels, no data sales — we
          unsubscribe you the moment you ask.
        </p>

        <div className="mt-14 rounded-sm border border-engravers/15 bg-bone/40 p-6">
          <p className="stat-label mb-2">What you’re signing up for</p>
          <p className="text-engravers/80">
            The short version: Tyrian purple — the &ldquo;color of
            emperors&rdquo; — is still made by killing sea snails at roughly
            10,000 per gram, when the identical molecule has been synthesisable
            since 1904. We&rsquo;re here to close that gap, and we&rsquo;ll write
            when there&rsquo;s real news: a producer reached, a finding worth
            knowing, a regulatory opening, a win.
          </p>
        </div>
      </div>
    </div>
  );
}
