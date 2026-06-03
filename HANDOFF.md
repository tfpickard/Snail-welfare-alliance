# Snail Campaign — Handoff to Claude Code

This document describes a Next.js website project for a snail welfare campaign. Read it fully before touching any files.

---

## 1. What This Is

A campaign website to raise awareness that Tyrian purple dye — still used in luxury textiles and Jewish ritual fringes (tzitzit) — is produced by cracking or boiling murex snails alive. A chemically identical synthetic has existed since 1904. The campaign argues this is unnecessary and targets demand, not practitioners.

Tone: intelligent, wry, unsentimental. Not a petition site. Not cute.

Working name: **SAVE THE SNAILS**. Tom has not yet selected the final campaign name — wordmark SVGs are swap-ready (the wordmark is on a named layer in every file). Top candidates: **"10,000 Snails"** (name) + **"The color of emperors. The cost of everything."** (tagline).

---

## 2. Repo Layout

```
snail-campain/               ← git root
├── LICENSE                  ← GPL-3.0-only stub
├── snail-campaign/          ← canonical brand assets (source of truth — do not edit)
│   ├── brand/
│   │   ├── brand-guide.md
│   │   ├── logos/           ← 10 SVG logo/lockup files
│   │   └── wordmarks/       ← 3 SVG wordmark files (NOT yet copied to web/)
│   ├── copy/                ← 7 markdown copy files (homepage, the-facts, about, donate, newsletter, faq, taglines)
│   ├── data/
│   │   └── research-dossier.md
│   ├── merch/
│   │   └── tshirt-designs/  ← 5 t-shirt SVGs
│   └── web-assets/
│       ├── hero/
│       │   └── hero-contrast-pair.svg   ← NOT yet copied to web/
│       ├── icons/           ← 5 argument pillar icon SVGs
│       └── illustrations/   ← 4 spot illustration SVGs
└── web/                     ← Next.js app (all dev work goes here)
    ├── content/             ← copy files mirrored from snail-campaign/copy/ + research-dossier
    ├── public/
    │   └── images/
    │       ├── logos/       ← 10 SVGs (logos + lockups)
    │       ├── illustrations/ ← 4 SVGs
    │       ├── tshirts/     ← 5 SVGs
    │       └── icons/       ← 5 SVGs
    └── src/app/             ← App Router pages (all stubs)
        ├── layout.tsx
        ├── page.tsx                ← /
        ├── the-facts/page.tsx      ← /the-facts
        ├── about/page.tsx          ← /about
        ├── donate/page.tsx         ← /donate
        ├── newsletter/page.tsx     ← /newsletter
        └── faq/page.tsx            ← /faq
```

**Two things not yet copied to `web/public/`:**
- `snail-campaign/web-assets/hero/hero-contrast-pair.svg` → needs to land at `web/public/images/hero-contrast-pair.svg`
- `snail-campaign/brand/wordmarks/*.svg` → copy to `web/public/images/wordmarks/`

---

## 3. Tech Stack

- **Next.js 16.2.7** with App Router
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4** (`@tailwindcss/postcss` plugin)
- No component library installed yet
- No MDX or content processing library yet

Dev: `cd web && npm run dev`

---

## 4. Brand

### Colors

| Token name (to configure) | Name | Hex |
|---|---|---|
| `tyrian` | Tyrian Purple | `#5C0A3A` |
| `imperial` | Imperial Dark | `#3A0025` |
| `murex-bloom` | Murex Bloom | `#8B1A5C` |
| `vellum` | Vellum | `#F5F0E8` |
| `bone` | Bone | `#EDE6D4` |
| `engravers` | Engraver's Black | `#1A1209` |
| `murex-ivory` | Murex Ivory | `#D4C5A0` |

Primary 4 for most work: `#5C0A3A · #F5F0E8 · #1A1209 · #D4C5A0`

All combinations above meet WCAG AAA contrast.

### Typography direction (typeface TBD — direction locked)

- **Headlines:** High-contrast serif, antiquarian feel. Reference: Cormorant Garamond, EB Garamond, Freight Display. Regular–SemiBold only. No heavy weights.
- **Body/UI:** Humanist sans. Reference: Inter, DM Sans, Instrument Sans. 16–18px / 1.6 line-height.
- **Accent:** Small caps or tracked caps for stat callouts and labels. Never condensed.

### Visual style

Single-weight line art throughout — natural-history engraving aesthetic. No fills except flat color washes behind line work. No gradients in print; subtle linear gradients OK in digital hero only. No drop shadows, bevels, or 3D. No cartoon proportions.

### Voice

Three gears:
1. **Facts (the-facts, homepage):** Precise, unsentimental, fully sourced. Build trust.
2. **Emotional (hero, merch):** Vivid, occasionally wry. The snail is beautiful. The act is unnecessary.
3. **Invite (donate, newsletter):** Warm, direct, no guilt. "Easy to fix, you can help."

Hard rules: never claim sentience as *proven* (frame as precautionary); never attack practitioners by name; always celebrate the Mixtec non-lethal tradition; no gore; no preachy hedging.

---

## 5. Assets in `web/public/images/`

**logos/** (10 files):
- `mark-primary-black.svg`, `mark-primary-purple.svg`, `mark-primary-white.svg`
- `mark-alt-a-shell-profile.svg`, `mark-alt-b-spiral.svg`, `mark-alt-c-snail.svg`
- `lockup-horizontal-black.svg`, `lockup-horizontal-purple.svg`, `lockup-horizontal-reversed.svg`
- `lockup-stacked-black.svg`

**illustrations/** (4 files):
- `spot-empty-shell.svg` — mound of cracked empty shells
- `spot-murex-detail.svg` — close detail of murex shell
- `spot-spiral-divider.svg` — decorative logarithmic spiral divider
- `spot-ten-thousand.svg` — visual representing the 10,000 figure

**icons/** (5 files, argument pillars):
- `icon-identical-molecule.svg`
- `icon-luxury-gold.svg`
- `icon-scale.svg`
- `icon-sentience-precaution.svg`
- `icon-unnecessary-flask.svg`

**tshirts/** (5 files):
- `tshirt-01-corny-rhyme.svg`
- `tshirt-02-stark-statistic.svg`
- `tshirt-03-typographic.svg`
- `tshirt-04-natural-history.svg`
- `tshirt-05-same-molecule.svg`

---

## 6. Content Files

All page copy lives in `web/content/*.md`. These are currently **not wired into the pages** — all pages are stubs.

Files: `homepage.md`, `the-facts.md`, `about.md`, `donate.md`, `newsletter.md`, `faq.md`, `taglines.md`, `research-dossier.md`

**Recommended content strategy:** Install `gray-matter` + `remark` (or `next-mdx-remote` if you want JSX in markdown). Each page reads its corresponding `.md` file at build time via `fs` in a server component. Don't use a CMS — content is file-based.

**Top tagline candidates:**
1. **"10,000 Snails"** (name) + **"The color of emperors. The cost of everything."** (tagline) — recommended
2. **"Purple Without Death"** (name) — leads with the solution
3. **"Same Molecule"** (name) — cerebral, targets connoisseurs

---

## 7. Pending Decisions (need Tom before building)

1. **Campaign name/tagline** — pick from `web/content/taglines.md`
2. **T-shirt designs** — review 5 designs in `web/public/images/tshirts/`, flag any to cut or revise
3. **Legal entity details** — `web/content/donate.md` and `web/content/newsletter.md` have placeholders
4. **Hero illustration direction** — `hero-contrast-pair.svg` is currently pure monochrome line art; Tom to confirm whether to add selective Tyrian Purple wash to the dye-drop element

---

## 8. Suggested Build Order

Do these in order. Each one unblocks the next.

**1. Tailwind config**
Add brand colors as named utilities in `tailwind.config.ts` (or `globals.css` `@theme` block for Tailwind v4). Use the token names from the color table above.

**2. Root layout**
`web/src/app/layout.tsx` — nav with all 6 routes, site name/logo, footer. Use `lockup-horizontal-black.svg` as the nav logo. Background: `vellum`. Text: `engravers`.

**3. Copy the missing assets**
```bash
cp snail-campaign/web-assets/hero/hero-contrast-pair.svg web/public/images/
mkdir -p web/public/images/wordmarks
cp snail-campaign/brand/wordmarks/*.svg web/public/images/wordmarks/
```

**4. Homepage**
Hero section: `hero-contrast-pair.svg` full-width, tagline overlay (placeholder until Tom picks one). Stat callout: "10,000 snails per gram." CTA: link to `/the-facts`.

**5. Content wiring**
Pick one content strategy (suggest `gray-matter` + server component `fs` read) and implement it for `/the-facts` as the pattern. Then replicate to remaining pages.

**6. Logo component**
`web/src/components/Logo.tsx` — reusable SVG wrapper that accepts `variant` prop: `primary-black | primary-purple | primary-white | lockup-horizontal | lockup-stacked`. Renders the correct SVG from `public/images/logos/`.

---

## 9. Gotchas

- **GPL-3.0-only** — `LICENSE` file is a stub pointing to gnu.org. Full text should be pulled in before public launch.
- **`snail-campaign/` is the canonical asset source.** SVGs in `web/public/` are copies. If an SVG needs editing, edit the source in `snail-campaign/` and re-copy. Don't edit `web/public/` SVGs directly.
- **Git is initialized at repo root** (`snail-campain/`). `web/` does not have its own git repo. The `web/.gitignore` ignores `node_modules/` and `.next/`.
- **Tailwind v4** uses a different config format than v3. Config goes in `globals.css` via `@theme` or in `tailwind.config.ts`. PostCSS plugin is `@tailwindcss/postcss`.
- **No i18n configured.** If the Mexico / Mixtec content needs to be in Spanish eventually, plan for that before the routing structure is locked.
