import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { ORG } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(ORG.url),
  title: {
    default: `${ORG.name} — The color of emperors. The cost of everything.`,
    template: `%s · ${ORG.name}`,
  },
  description:
    "Tyrian purple is still made by cracking open live sea snails — roughly 10,000 per gram — when an identical synthetic has existed since 1904. We argue it is needless, largely unregulated, and trivial to end.",
  applicationName: ORG.name,
  authors: [{ name: ORG.name }],
  keywords: [
    "Tyrian purple",
    "snail welfare",
    "invertebrate welfare",
    "murex",
    "6,6′-dibromoindigo",
    "precautionary sentience",
  ],
  openGraph: {
    type: "website",
    siteName: ORG.name,
    title: `${ORG.name} — The color of emperors. The cost of everything.`,
    description:
      "10,000 sea snails per gram of a dye that has been synthetic since 1904. The snail is lovely. The math is the indictment.",
    url: ORG.url,
    // og:image is provided by app/opengraph-image.tsx (generated 1200×630 PNG).
  },
  twitter: {
    card: "summary_large_image",
    title: `${ORG.name}`,
    description:
      "10,000 sea snails per gram of a dye that has been synthetic since 1904.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-vellum text-engravers">
        <script
          type="application/ld+json"
          // Organization structured data. No fabricated legal/registration claims.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: ORG.name,
              alternateName: ORG.short,
              url: ORG.url,
              email: ORG.email,
              slogan: ORG.tagline,
              description:
                "A coalition working to end the needless killing of sea snails — most vividly for Tyrian purple dye — through a precautionary, evidence-led case.",
              logo: `${ORG.url}/images/logos/mark-primary-purple.svg`,
            }),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-tyrian focus:px-4 focus:py-2 focus:text-vellum"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
