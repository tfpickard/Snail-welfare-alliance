import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Snail Welfare Alliance — researchers, designers, donors, advocates, and anyone who knows of an active producer or buyer we should know about.",
};

export default function ContactPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Contact"
        title="Tell us something."
        lede="If you work in art, textile, conservation, or law and want to get involved — or if you know of an active producer or buyer we should know about — write to us."
      />

      <div className="mx-auto mt-10 max-w-xl px-5 sm:px-8">
        <ContactForm />
        <p className="mt-5 text-sm text-engravers/65">
          {/* TODO(owner): replace with a real monitored inbox once set up. */}
          Prefer email? Reach us at{" "}
          <a
            href={`mailto:${ORG.email}`}
            className="text-tyrian underline decoration-tyrian/40 underline-offset-2 hover:text-murex-bloom"
          >
            {ORG.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
