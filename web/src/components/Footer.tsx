import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FOOTER_COLUMNS, ORG } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-engravers/15 bg-bone/50">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo variant="lockup-stacked-black" height={92} />
            <p className="mt-4 max-w-xs text-sm italic text-engravers/70">
              {ORG.tagline}
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="stat-label mb-3">{col.heading}</h2>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-engravers/75 transition-colors hover:text-tyrian"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-engravers/15 pt-6 text-sm text-engravers/65">
          {/* Honest transparency line — no fabricated legal/tax status. */}
          <p className="max-w-2xl">
            {ORG.name} is in early formation and is{" "}
            <strong className="font-medium">
              not yet a registered 501(c)(3)
            </strong>
            . Donations are not currently tax-deductible.{" "}
            {/* TODO(owner): replace with EIN + 501(c)(3) status once registered. */}
            <span className="opacity-70">
              EIN: pending registration.
            </span>
          </p>
          <p className="mt-3">
            © {year} {ORG.name}. Licensed under GPL-3.0. ·{" "}
            <Link href="/privacy" className="hover:text-tyrian">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-tyrian">
              Terms
            </Link>{" "}
            ·{" "}
            <Link href="/contact" className="hover:text-tyrian">
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
