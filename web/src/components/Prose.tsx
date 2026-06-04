import type { ReactNode } from "react";

type ProseProps = {
  /** Rendered markdown HTML. Mutually exclusive with children. */
  html?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Editorial typographic wrapper. Styles for `.prose-swa` live in globals.css.
 * Pass `html` (from the content pipeline) or `children` (authored JSX).
 */
export function Prose({ html, children, className = "" }: ProseProps) {
  if (html != null) {
    return (
      <div
        className={`prose-swa measure ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <div className={`prose-swa measure ${className}`}>{children}</div>;
}
