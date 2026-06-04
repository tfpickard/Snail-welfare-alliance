import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms under which you use the Snail Welfare Alliance website and the optional Terrarium.",
};

export default function TermsPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Terms"
        title="Terms of use"
        lede="Plain terms for using this site and our optional game. Use it kindly; we’ll do the same."
      />
      <div className="mx-auto mt-10 max-w-3xl px-5 sm:px-8">
        <Prose>
          <p className="text-sm text-engravers/60">
            Last updated: June 2026. {ORG.name} is in early formation.
            {/* TODO(owner): have counsel review and finalise jurisdiction,
                liability, and entity details before relying on these terms. */}
          </p>

          <h2>Using this site</h2>
          <p>
            This website is provided for information and advocacy. You may read,
            link to, and share it freely. The site&rsquo;s source code is released
            under the GPL-3.0 licence; campaign copy and brand assets remain the
            property of {ORG.name} unless otherwise noted.
          </p>

          <h2>Accuracy &amp; honesty</h2>
          <p>
            We work hard to state facts precisely and to mark estimates as
            estimates. Nothing here is legal, medical, or professional advice. We
            do not claim that snail sentience is proven; we argue a precautionary
            case and say so plainly. If you believe something here is wrong, tell
            us and we will correct it.
          </p>

          <h2>Donations</h2>
          <p>
            Donations support our campaign work. {ORG.name} is{" "}
            <strong>not currently a registered 501(c)(3)</strong>, and donations
            are <strong>not tax-deductible</strong> at this time. Payments are
            handled by a third-party processor under their terms. We do not
            promise any specific outcome in exchange for a donation.
          </p>

          <h2>The Terrarium (optional game)</h2>
          <p>
            If you create an account to use the Terrarium, you agree to keep your
            display name and any text you submit appropriate and lawful. We may
            remove content or suspend accounts that are abusive, harmful, or break
            these terms. The game is offered as-is, for enjoyment; there is no
            real-world value to in-game items, and there is no way to harm a snail
            in it — by design.
          </p>

          <h2>No warranty</h2>
          <p>
            This site and the Terrarium are provided &ldquo;as is,&rdquo; without
            warranties of any kind. To the extent permitted by law, {ORG.name} is
            not liable for any loss arising from your use of the site.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
          </p>
        </Prose>
      </div>
    </div>
  );
}
