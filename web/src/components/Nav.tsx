"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, ORG, TERRARIUM_ENABLED } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const links = [
    ...NAV_LINKS,
    ...(TERRARIUM_ENABLED
      ? [{ href: "/terrarium", label: "The Terrarium" }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-engravers/10 bg-vellum/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
        aria-label="Primary"
      >
        <Logo variant="lockup-horizontal-black" height={38} link priority />

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-5 text-sm">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`transition-colors hover:text-tyrian ${
                      active
                        ? "text-tyrian underline decoration-tyrian/40 underline-offset-4"
                        : "text-engravers/80"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/take-action" className="btn-tyrian text-sm">
            Support
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="text-2xl leading-none">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-engravers/10 bg-vellum lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block py-2.5 text-base ${
                      active ? "text-tyrian" : "text-engravers/85"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="py-3">
              <Link
                href="/take-action"
                onClick={() => setOpen(false)}
                className="btn-tyrian w-full justify-center"
              >
                Support {ORG.short}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
