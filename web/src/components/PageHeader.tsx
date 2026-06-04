import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
};

/** Consistent editorial page intro: eyebrow, serif H1, optional lede. */
export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl px-5 pt-16 pb-4 sm:px-8 sm:pt-24">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl">
        {title}
      </h1>
      {lede && (
        <p className="measure mt-6 text-lg text-engravers/75 sm:text-xl">
          {lede}
        </p>
      )}
    </header>
  );
}
