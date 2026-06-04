import type { Genome } from "@/lib/terrarium/genetics";
import { isPurpleMorph } from "@/lib/terrarium/genetics";

/**
 * Procedural line-art snail generated from its genome — antiquarian engraving
 * style, never a cartoon blob. Shell hue (incl. the rare deep-Tyrian morph),
 * spiral tightness, whorls, size, and pattern are all trait-driven. Single-weight
 * Engraver's-Black strokes over a flat color wash, per the brand language.
 *
 * Server-renderable. The optional gentle crawl/sway is pure CSS, so it is paused
 * automatically under prefers-reduced-motion (see globals.css).
 */

const INK = "#1A1209";

/** Map the hue gene to a wash color within the murex family. */
function shellWash(g: Genome): string {
  if (isPurpleMorph(g)) return "#5C0A3A"; // the legendary Tyrian morph
  const sat = Math.round((10 + g.hue * 70) * (0.5 + g.saturation * 0.5));
  const light = Math.round(86 - g.hue * 52);
  // Hue stays in the rose→violet murex band.
  const hueDeg = Math.round(330 - (1 - g.hue) * 25);
  return `hsl(${hueDeg} ${sat}% ${light}%)`;
}

/** Build a logarithmic-spiral path centered at (cx,cy). */
function spiralPath(cx: number, cy: number, g: Genome, maxR: number): string {
  const turns = 1.6 + g.whorls * 2.2; // number of visible whorls
  const tight = 0.18 + g.spiralTightness * 0.32; // growth rate b in r=a·e^{bθ}
  const thetaMax = turns * 2 * Math.PI;
  const a = maxR / Math.exp(tight * thetaMax);
  const steps = Math.max(40, Math.floor(turns * 36));
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * thetaMax;
    const r = a * Math.exp(tight * theta);
    // Spiral winds inward from the aperture; flip angle for a right-handed shell.
    const x = cx + Math.cos(-theta) * r;
    const y = cy + Math.sin(-theta) * r;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d.trim();
}

/** Pattern overlay strokes on the shell, driven by the pattern gene. */
function patternMarks(cx: number, cy: number, r: number, g: Genome) {
  const marks: React.ReactNode[] = [];
  if (g.pattern === "banded") {
    for (let i = 1; i <= 4; i++) {
      const rr = (r * i) / 5;
      marks.push(
        <circle
          key={`b${i}`}
          cx={cx}
          cy={cy}
          r={rr}
          fill="none"
          stroke={INK}
          strokeWidth={0.5}
          opacity={0.35}
        />,
      );
    }
  } else if (g.pattern === "flecked") {
    for (let i = 0; i < 14; i++) {
      const ang = (i / 14) * Math.PI * 2 * (1 + g.whorls);
      const rr = (r * (i % 5)) / 6 + 3;
      marks.push(
        <circle
          key={`f${i}`}
          cx={cx + Math.cos(ang) * rr}
          cy={cy + Math.sin(ang) * rr}
          r={0.9}
          fill={INK}
          opacity={0.45}
        />,
      );
    }
  } else if (g.pattern === "marbled") {
    for (let i = 0; i < 5; i++) {
      const a0 = (i / 5) * Math.PI * 2;
      marks.push(
        <path
          key={`m${i}`}
          d={`M${cx + Math.cos(a0) * r * 0.3} ${cy + Math.sin(a0) * r * 0.3} Q ${cx} ${cy} ${cx + Math.cos(a0 + 1) * r * 0.7} ${cy + Math.sin(a0 + 1) * r * 0.7}`}
          fill="none"
          stroke={INK}
          strokeWidth={0.5}
          opacity={0.3}
        />,
      );
    }
  }
  return marks;
}

type SnailArtProps = {
  genome: Genome;
  /** Pixel size (square-ish). */
  size?: number;
  /** Gentle crawl/sway; auto-paused under prefers-reduced-motion. */
  animate?: boolean;
  /** Visual cue for estivation (sealed) or death (faded). */
  state?: "active" | "estivating" | "deceased";
  className?: string;
};

export function SnailArt({
  genome,
  size = 200,
  animate = false,
  state = "active",
  className = "",
}: SnailArtProps) {
  const wash = shellWash(genome);
  // Size gene scales the shell within the viewBox.
  const shellR = 26 + genome.size * 16;
  const shellCx = 118;
  const shellCy = 62;
  const sealed = state === "estivating";
  const deceased = state === "deceased";

  return (
    <svg
      viewBox="0 0 200 140"
      width={size}
      height={(size * 140) / 200}
      className={`${animate && !sealed && !deceased ? "snail-crawl" : ""} ${className}`}
      role="img"
      aria-label={
        isPurpleMorph(genome)
          ? "A line-art snail with a rare deep Tyrian-purple shell."
          : "A line-art snail drawn in the engraving style."
      }
      style={deceased ? { opacity: 0.4 } : undefined}
    >
      <g
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Ground line */}
        <path d="M20 116 C 60 113, 140 113, 184 116" strokeWidth={0.7} opacity={0.3} />

        {/* Body: foot + head (only when not fully withdrawn) */}
        {!sealed && !deceased && (
          <g className="snail-body">
            {/* Foot */}
            <path d="M40 112 C 40 104, 52 100, 70 100 L 120 100 C 138 100, 150 104, 150 112 C 150 116, 120 117, 95 117 C 70 117, 40 116, 40 112 Z" />
            {/* Head rising at the front (left) */}
            <path d="M40 112 C 30 110, 24 102, 26 92 C 27 86, 32 82, 38 84" />
            {/* Eye stalks */}
            <path d="M30 92 C 26 84, 24 76, 27 70" />
            <circle cx="27.5" cy="69" r="2" fill={INK} />
            <path d="M37 88 C 35 80, 35 73, 38 68" />
            <circle cx="38.5" cy="67" r="2" fill={INK} />
          </g>
        )}

        {/* Shell — color wash behind the line work */}
        <circle cx={shellCx} cy={shellCy} r={shellR} fill={wash} fillOpacity={0.55} stroke="none" />
        {/* Shell outline */}
        <circle cx={shellCx} cy={shellCy} r={shellR} strokeWidth={1.6} />
        {/* The logarithmic spiral */}
        <path d={spiralPath(shellCx, shellCy, genome, shellR - 3)} strokeWidth={1.2} />
        {/* Pattern overlay */}
        {patternMarks(shellCx, shellCy, shellR, genome)}

        {/* Estivation seal across the aperture */}
        {sealed && (
          <g>
            <path
              d={`M${shellCx - shellR} ${shellCy} A ${shellR} ${shellR} 0 0 0 ${shellCx + shellR} ${shellCy}`}
              strokeWidth={0.8}
              opacity={0.5}
            />
            <path d="M70 110 C 90 106, 110 106, 130 110" strokeWidth={0.7} opacity={0.4} />
          </g>
        )}
      </g>
    </svg>
  );
}
