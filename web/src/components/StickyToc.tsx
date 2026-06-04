"use client";

import { useEffect, useState } from "react";

export type TocEntry = { id: string; label: string };

/**
 * Sticky table of contents for long-reads. Scroll-spies the section headings
 * (by id) and highlights the active entry. Plain anchor links, so it degrades
 * gracefully and stays keyboard-accessible.
 */
export function StickyToc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (obsEntries) => {
        for (const entry of obsEntries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="stat-label mb-4">On this page</p>
      <ul className="space-y-2.5 border-l border-engravers/15">
        {entries.map((e) => {
          const isActive = active === e.id;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px block border-l-2 pl-4 transition-colors ${
                  isActive
                    ? "border-tyrian text-tyrian"
                    : "border-transparent text-engravers/65 hover:text-engravers"
                }`}
              >
                {e.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
