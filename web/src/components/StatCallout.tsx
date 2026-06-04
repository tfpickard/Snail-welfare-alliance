"use client";

import { useEffect, useRef, useState } from "react";

type StatCalloutProps = {
  /** The headline figure, e.g. "10,000" or "€2,500". */
  value: string;
  /** Small-caps label under the figure. */
  label: string;
  /** When true, the figure is rendered in Tyrian purple for emphasis. */
  emphasis?: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Parses a display string like "€2,500" or "~10,000" into its numeric part
 * plus the prefix/suffix so we can animate just the number.
 */
function parseValue(value: string) {
  const match = value.match(/([^\d]*)([\d,]+)(.*)/);
  if (!match) return { prefix: value, target: 0, suffix: "", group: false };
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    target: Number(digits.replace(/,/g, "")),
    suffix,
    group: digits.includes(","),
  };
}

export function StatCallout({ value, label, emphasis = false }: StatCalloutProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(value);
  const parsed = useRef(parseValue(value));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const { prefix, target, suffix, group } = parsed.current;

    if (target === 0 || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }

    // Start from the un-animated state so there's no flash of the final value.
    setDisplay(`${prefix}0${suffix}`);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round(target * eased);
            const formatted = group
              ? current.toLocaleString("en-US")
              : String(current);
            setDisplay(`${prefix}${formatted}${suffix}`);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div
        className={`font-display text-4xl leading-none sm:text-5xl ${
          emphasis ? "text-tyrian" : "text-engravers"
        }`}
      >
        {display}
      </div>
      <div className="stat-label mt-2.5">{label}</div>
    </div>
  );
}
