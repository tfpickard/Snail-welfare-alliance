import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/**
 * Privacy-respecting analytics, off by default. Set NEXT_PUBLIC_ANALYTICS=true
 * to enable Vercel Analytics (cookieless, no PII). Renders nothing otherwise.
 */
export function Analytics() {
  if (process.env.NEXT_PUBLIC_ANALYTICS !== "true") return null;
  return <VercelAnalytics />;
}
