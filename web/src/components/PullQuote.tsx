import type { ReactNode } from "react";

type PullQuoteProps = {
  /** The large figure or phrase, e.g. "10,000 snails. One gram." */
  children: ReactNode;
  /** Optional attribution / context line. */
  cite?: string;
};

/** An editorial pull-quote block in Tyrian purple for key stats. */
export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <aside className="my-10 border-l-2 border-tyrian pl-6">
      <p className="font-display text-3xl leading-[1.15] text-tyrian sm:text-4xl">
        {children}
      </p>
      {cite && <p className="stat-label mt-3">{cite}</p>}
    </aside>
  );
}
