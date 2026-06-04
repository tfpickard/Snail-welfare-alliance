import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data the Snail Welfare Alliance collects, why, and how it is handled. We collect the minimum and never sell it.",
};

export default function PrivacyPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Privacy"
        title="Privacy policy"
        lede="We collect as little as possible, use it only for what you asked, and never sell it. This page says exactly what that means."
      />
      <div className="mx-auto mt-10 max-w-3xl px-5 sm:px-8">
        <Prose>
          <p className="text-sm text-engravers/60">
            Last updated: June 2026. {ORG.name} is in early formation; this
            policy will be updated as the organisation and its tools mature.
            {/* TODO(owner): have counsel review before relying on this for a
                registered entity, and confirm GDPR/CCPA obligations by region. */}
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Newsletter:</strong> if you subscribe, we store the email
              address you give us, solely to send you the newsletter.
            </li>
            <li>
              <strong>Contact form:</strong> the name, email, and message you
              send, solely to read and reply.
            </li>
            <li>
              <strong>Analytics:</strong> if enabled, we use a privacy-respecting,
              cookieless analytics tool (Vercel Analytics) that records aggregate
              page views without identifying you or tracking you across sites.
            </li>
            <li>
              <strong>Server logs:</strong> standard, short-lived request logs
              (e.g. IP address) used to keep the site secure and rate-limit
              abuse.
            </li>
          </ul>

          <h2>What we do not do</h2>
          <ul>
            <li>We do not sell or rent your data to anyone.</li>
            <li>We do not use tracking pixels or cross-site advertising cookies.</li>
            <li>We do not collect more than we need for the thing you asked for.</li>
          </ul>

          <h2>Donations</h2>
          <p>
            We do not process payments ourselves. If you donate, you are handed
            off to a third-party donation processor, and your payment details are
            handled by that provider under their own privacy policy — we never see
            or store your card information. We may receive your name, email, and
            donation amount from the processor to acknowledge your gift.
          </p>

          <h2>Email providers</h2>
          <p>
            Newsletter delivery, when active, is handled by a third-party email
            provider that stores your address to send mail on our behalf. Every
            email includes a one-click unsubscribe, and unsubscribing removes you.
          </p>

          <h2>Accounts &amp; the Terrarium</h2>
          <p>
            If and when our optional game, the Terrarium, is enabled, signing in
            uses third-party OAuth providers (e.g. Google or GitHub). We receive a
            basic profile and email to create your account; we store your{" "}
            <strong>display name and game data</strong> (your snails and their
            history), and we never publish your real name or email — only the
            display name you choose. Because the game may attract younger users,
            we collect the minimum, do not offer open free-text chat, and moderate
            user-supplied text. You may request deletion of your account and data
            at any time.
          </p>

          <h2>Your choices</h2>
          <ul>
            <li>Unsubscribe from the newsletter at any time via the email link.</li>
            <li>
              Ask us to access or delete the data we hold about you by writing to{" "}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
            </li>
          </ul>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Email{" "}
            <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
          </p>
        </Prose>
      </div>
    </div>
  );
}
