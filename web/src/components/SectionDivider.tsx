import Image from "next/image";

type SectionDividerProps = {
  className?: string;
};

/**
 * The logarithmic-spiral shell ornament that punctuates major sections.
 * Decorative only — hidden from assistive tech.
 */
export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={`mx-auto my-16 flex w-full max-w-md items-center justify-center sm:my-20 ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/images/illustrations/spot-spiral-divider.svg"
        alt=""
        width={600}
        height={80}
        className="h-auto w-full opacity-80"
      />
    </div>
  );
}
