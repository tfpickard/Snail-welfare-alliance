import Image from "next/image";
import Link from "next/link";
import { ORG } from "@/lib/site";

type LogoVariant =
  | "lockup-horizontal-black"
  | "lockup-horizontal-purple"
  | "lockup-horizontal-reversed"
  | "lockup-stacked-black"
  | "mark-primary-black"
  | "mark-primary-purple"
  | "mark-primary-white"
  | "mark-monogram-swa"
  | "mark-monogram-swa-purple"
  | "mark-monogram-swa-white";

const DIMENSIONS: Record<string, { w: number; h: number }> = {
  "lockup-horizontal": { w: 380, h: 80 },
  "lockup-stacked": { w: 200, h: 220 },
  "mark-primary": { w: 120, h: 120 },
  "mark-monogram": { w: 120, h: 120 },
};

function dimsFor(variant: LogoVariant) {
  const key = Object.keys(DIMENSIONS).find((k) => variant.startsWith(k));
  return key ? DIMENSIONS[key] : { w: 120, h: 120 };
}

type LogoProps = {
  variant?: LogoVariant;
  /** Rendered height in px; width scales to aspect ratio. */
  height?: number;
  /** When true, wraps the mark in a link to the homepage. */
  link?: boolean;
  className?: string;
  priority?: boolean;
};

/** Renders a brand SVG asset. The lockups already include the wordmark. */
export function Logo({
  variant = "lockup-horizontal-black",
  height = 44,
  link = false,
  className,
  priority = false,
}: LogoProps) {
  const { w, h } = dimsFor(variant);
  const width = Math.round((w / h) * height);

  const img = (
    <Image
      src={`/images/logos/${variant}.svg`}
      alt={`${ORG.name} logo`}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );

  if (link) {
    return (
      <Link href="/" aria-label={`${ORG.name} — home`} className="inline-flex">
        {img}
      </Link>
    );
  }
  return img;
}
