/**
 * Central site configuration: org constants, navigation, and env-driven
 * config helpers. Single source of truth for the brand hierarchy.
 */

export const ORG = {
  name: "Snail Welfare Alliance",
  short: "SWA",
  tagline: "Solidarity across species.",
  campaign: "Where Are the Snails?",
  merchBrand: "Save the Snails",
  // TODO(owner): replace once a legal entity / domain exists.
  url: "https://snailwelfare.org",
  email: "hello@snailwelfare.org",
} as const;

export type NavLink = { href: string; label: string };

/** Primary navigation, in reading order. */
export const NAV_LINKS: NavLink[] = [
  { href: "/the-case", label: "The Case" },
  { href: "/science", label: "Science" },
  { href: "/where-are-the-snails", label: "Campaign" },
  { href: "/purple-without-death", label: "Purple Without Death" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
];

/** Footer link columns. */
export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "The Case",
    links: [
      { href: "/the-case", label: "The evidence" },
      { href: "/science", label: "The science" },
      { href: "/where-are-the-snails", label: "Where are the snails?" },
      { href: "/purple-without-death", label: "Purple without death" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { href: "/take-action", label: "Take action" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/merch", label: "Merch" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "The Project",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

/** Whether the Terrarium feature is enabled (flag-gated until owner provisions auth + DB). */
export const TERRARIUM_ENABLED =
  process.env.NEXT_PUBLIC_TERRARIUM_ENABLED === "true";

/** Donation provider config (placeholder-safe). No processor is hardcoded. */
export const DONATE = {
  provider: process.env.NEXT_PUBLIC_DONATE_PROVIDER ?? "placeholder",
  url: process.env.NEXT_PUBLIC_DONATE_URL ?? "",
} as const;

/** Print-on-demand base URL for merch (placeholder until owner sets it). */
export const MERCH_POD_URL = process.env.NEXT_PUBLIC_MERCH_POD_URL ?? "";
