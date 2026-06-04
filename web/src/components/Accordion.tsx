"use client";

import { useId, useState } from "react";

export type AccordionItem = {
  question: string;
  /** Rendered HTML answer (from the content pipeline) or plain text. */
  answerHtml?: string;
  answer?: string;
};

/**
 * Keyboard-accessible disclosure accordion. Uses native <button> semantics
 * with aria-expanded / aria-controls; the <details>-free implementation keeps
 * animation and styling under our control while staying screen-reader friendly.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-engravers/15 border-y border-engravers/15">
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg transition-colors hover:text-tyrian sm:text-xl"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={`shrink-0 text-tyrian transition-transform duration-300 ${
                    expanded ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="pb-6"
            >
              {item.answerHtml ? (
                <div
                  className="prose-swa measure"
                  dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                />
              ) : (
                <p className="measure text-engravers/85">{item.answer}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
