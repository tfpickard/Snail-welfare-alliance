# Cowork Build Prompt — Snail Campaign Asset Scaffolding

**Project: Asset scaffolding for a snail-welfare awareness campaign (working name TBD — see Section 0)**

You’re helping me set up the visual and content assets for an awareness website and merch line. This session is **asset generation and organization only** — we are NOT building the website yet (that comes later in Claude Code). Your job is to create a clean, organized folder of art, logos, copy, and data files that a web build can later draw from.

-----

## 0. First, set up the workspace

Create this folder structure in my working directory:

```
snail-campaign/
├── brand/
│   ├── logos/           (logo family — SVG + PNG)
│   ├── wordmarks/
│   └── brand-guide.md   (colors, fonts, voice, usage)
├── merch/
│   └── tshirt-designs/  (print-ready art)
├── web-assets/
│   ├── hero/
│   ├── icons/
│   └── illustrations/
├── copy/
│   ├── homepage.md
│   ├── the-facts.md
│   ├── about.md
│   ├── donate.md
│   ├── newsletter.md
│   └── faq.md
├── data/
│   └── research-dossier.md   (the source-of-truth facts below)
└── README.md          (index of everything + status checklist)
```

-----

## 1. Brand direction (READ FIRST)

- **Aesthetic: line art, full stop.** Clean single-weight line illustration — spiny murex shells, snail silhouettes, the spiral of a shell. Think elegant natural-history engraving meets modern minimalist tattoo. NOT cartoonish, NOT clip-art, NOT gross/gory. Beauty and restraint are the point: the animal is lovely and alive.
- **Tone:** serious cause, delivered with intelligence and the occasional disarming wink. We provoke a strong, non-neutral reaction. We never preach, and we never show gore — the *imagination* does the heavy lifting (a mound of empty shells says more than any wound).
- **Color:** Tyrian purple is the obvious hero color (a deep reddish-purple, roughly `#66023C` / `#4B0082` range — make a small palette and define it in `brand-guide.md`). Pair with off-white/bone and a near-black ink for line work.
- Generate art as **SVG where possible** (scalable for web + print), with PNG exports at print resolution (300 DPI, large) for the t-shirts.

-----

## 2. Logo family (in `brand/logos/` and `brand/wordmarks/`)

Produce a cohesive family, not one logo:

- A primary **mark** (icon-only): a line-art murex shell or snail spiral that reads at small sizes (favicon) and large (shirt back).
- A **horizontal lockup** (mark + wordmark) and a **stacked lockup**.
- 2–3 **alternate marks** exploring different motifs: (a) the spiny *Bolinus brandaris* shell in profile, (b) a simple spiral/shell abstraction, (c) a whole snail with antennae, gentle and characterful.
- Monochrome (black), reversed (white), and purple versions of each.
- **[If we decide here:]** render the family for the top 2–3 candidate names so I can compare. Otherwise use the placeholder wordmark “SAVE THE SNAILS” and keep wordmarks on their own layer/file so the name can be swapped easily.

-----

## 3. T-shirt designs (in `merch/tshirt-designs/`) — I’m serious about these, make them genuinely wearable

Design **4–6 distinct shirt graphics**, print-ready, that someone would actually want to wear:

- At least one **corny-good** rhyming piece (“Save the Snails” energy — the kind of thing that makes people smile).
- At least one **stark/serious** piece built around a statistic (e.g., the kill ratio) or an empty-shell motif.
- At least one **typographic** piece (strong type + minimal line element).
- At least one **beautiful natural-history** piece (a gorgeous murex line drawing, the cause implied not stated).
- Provide each as large 300-DPI PNG with transparent background, plus an SVG master, sized for standard front-chest and full-back placements. Include a one-line note per design suggesting shirt color (we’ll lean toward bone, black, and one purple).
- Add a short `merch/print-notes.md` with placement/sizing guidance for a print-on-demand service.

-----

## 4. Web illustrations & icons (in `web-assets/`)

- 1 **hero illustration**: the emotional centerpiece — my favorite concept from the research is the *contrast pair*: a single drop of purple welling from an **intact, living** snail on a rock (Mexico’s non-lethal method) versus a **mound of empty cracked shells** (Sidon’s “Murex Hill”). Life vs. discard. Render this as elegant line art.
- A set of simple line **icons** for the argument pillars: “unnecessary” (lab flask), “identical molecule,” “luxury/gold,” “sentience/precaution,” “scale.”
- 3–4 supporting **spot illustrations** for section breaks.

-----

## 5. Copy (in `copy/`) — write all of it, web-ready

Draft real copy for each page using the facts in Section 7. Voice = intelligent, vivid, non-preachy, occasionally wry. Key rules: **lead with “unnecessary + gratuitous luxury + an identical synthetic already exists”** (this lands without any contested claim); **state the precautionary-pain premise openly but NEVER claim snail pain is scientifically proven**; and **explicitly carve out and celebrate the Mexican non-lethal “milking” tradition** rather than condemning it — it’s our proof that purple does NOT require death.

- `homepage.md`: hero headline + subhead, the one-paragraph “what this is,” 3–5 punchy stat callouts, a section-by-section skeleton, CTAs.
- `the-facts.md`: the full evidence case, organized for scanning, with the numbers and (public-domain) names.
- `about.md`: mission, why snails, why now, our scope (“snails broadly; Tyrian purple is our opening front, not our limit”), our honesty policy (we don’t overclaim).
- `donate.md` and `newsletter.md`: short, warm, compelling conversion copy.
- `faq.md`: pre-empt the objections (scale, sentience uncertainty, the Mexican exception, religious/heritage use, “why not target factory farming instead”).
- Give me 8–10 candidate **headlines/taglines** in a `copy/taglines.md` for me to pick from.

-----

## 6. Wrap up

- Fill `README.md` with an index of every asset and a status checklist (done / needs my review / placeholder).
- Flag anything you couldn’t generate and what you’d need from me.

-----

## 7. SOURCE-OF-TRUTH RESEARCH (paste into `data/research-dossier.md` and use for all copy)

**The hook (our “call to arms”):** Tyrian purple — the legendary “color of emperors” — is still made today by cracking open live predatory sea snails and extracting a gland, roughly **10,000 snails per single gram** of dye. It sells for **~€2,500–$4,000 per gram**. And it is **completely unnecessary**: the exact same molecule (6,6’-dibromoindigo) can be synthesized in a lab or grown by fermentation with zero snails. People still kill the snails because they believe the natural version “looks better” — a claim that doesn’t survive scrutiny, because it’s the identical molecule.

**The big-picture mission:** Snail production at large operates with essentially **no ethical standards or welfare oversight**. Tyrian purple is the absurd, vivid tip of the spear; the broader cause is invertebrate/snail welfare. (Cf. the Shrimp Welfare Project — this is the snail-welfare analogue, though we won’t necessarily name it that.)

### Producers (public domain only — these names are all in published press)

- **Tunisia — Mohamed Ghassen Nouira:** the central living figure; spent ~14 years reverse-engineering the Phoenician method; buys murex at La Goulette port, cracks shells by hand, has produced only “several dozen grams” in his career; sells at ~$2,500/g. **Method is lethal.** (Note: a “British Museum display” claim circulates but is unverified — do not assert it as fact.)
- **Israel — Ptil Tekhelet** (Kfar Adumim; co-founder Baruch Sterman): largest organized producer; processes **~400,000 snail glands/year**, makes ~20,000 ritual *tzitzit* sets/year (**~30 snails per set**), 270,000+ sets to date; uses *Hexaplex trunculus*, partly as food-industry byproduct. Lethal. (Handle respectfully — religious use.)
- **Mexico — Mixtec dyers of Pinotepa de Don Luis, Oaxaca (NON-LETHAL — our hero example):** “milk” *Purpura pansa* by pressing it to release its secretion, then return it alive to the rocks; ~13–15 elderly licensed dyers left; ~3,000-year tradition; regulated since 1988. Nearly wiped out in the early 1980s by a Japanese firm (Imperial Purple Inc.) using volume-paid untrained harvesters. **Purple without death.**
- **Japan — Masakazu Akiyama (Aya studio)** and researcher **Takako Terada**: revived “shellfish purple”; lethal gland extraction; dyed items presented to the Empress.

### The numbers / per-customer framing

- ~10,000–12,000 snails per **gram**; ~12,000 per ancient **garment-trim** (“half a thimbleful” of dye); ~30 per **ritual fringe-set**.
- Global annual kill *specifically for dye*: **no exact figure exists**; defensible order-of-magnitude estimate is **under ~1 million/year** (label it clearly as an estimate).
- **Scale is orthogonal to ethics — use this framing:** food snails = **2.9–7.7 billion/year** (Rethink Priorities; usually boiled alive); shrimp = **trillions/year**; dye snails ≈ a **millionth** of the food-snail kill. We *concede* the scale is tiny and pivot: a needless act of killing a possibly-sentient animal for a luxury color is wrong on a per-act basis, and precisely *because* it’s tiny and unnecessary it’s the easiest needless harm to abolish.

### Economics

~€2,500–$4,000/g today; historically worth ~3× its weight in gold (Diocletian’s price edict, 301 CE). Market is a negligible collector/artist/ritual niche. German supplier **Kremer Pigmente** lists natural Tyrian purple at ~€2,562/g.

### The science (state precisely — do NOT overclaim)

- Snails/gastropods HAVE: nociceptors; an opioid system with a μ-opioid receptor ~**95% identical** to the human one; long-term nociceptive sensitization (in *Aplysia*) functionally similar to chronic pain.
- What’s NOT established: that they consciously *feel/suffer* pain — no formal sentience assessment exists for these sea snails specifically.
- **Comparative anchor:** cephalopods (octopus, cuttlefish) are ALSO mollusks and are now **legally recognized as sentient** (UK Animal Welfare (Sentience) Act 2022; EU). Decapod crustaceans too. Their snail cousins are simply understudied.
- **The 2024 New York Declaration on Animal Consciousness** (signatories incl. Christof Koch, Anil Seth, David Chalmers) affirms a “realistic possibility” of consciousness in many invertebrates.
- **Our stated premise:** assume a capacity for pain until proven otherwise — because pain is a primal survival mechanism, and the cost of being wrong is borne entirely by the snail.

### The “you can’t tell them apart” point

Natural and synthetic Tyrian purple are the **same molecule**, 6,6’-dibromoindigo. The Tekhelet tradition itself holds the dye is visually indistinguishable from indigo (“only God can tell them apart”). Any perceived difference comes from impurities/dye-bath composition — which is **fully engineerable** synthetically. The “natural is superior” claim does not hold.

### The alternatives that make killing pointless

A synthetic version of identical composition has existed since **1904**; multiple clean published syntheses exist; and in **2023 Conagen** announced the first commercial **fermentation**-based Tyrian purple (engineered microbes, no snails) — “democratizing a color once reserved for royalty.” The molecule is cheap and easy to make; what made natural purple expensive was always the snails and the labor, never the chemistry.

### Argument discipline (bake into all copy)

- **Bulletproof:** unnecessary; gratuitous luxury; identical synthetic exists; per-act wrongness.
- **Handle with care:** sentience is precautionary not proven; the Mexican method is non-lethal and Indigenous (exempt + celebrate it); religious/heritage use deserves respect (promote substitution, don’t attack practitioners); don’t equate this with industrial agriculture.
- **Target the demand** (collectors/buyers who want lethal “natural” purple), not the struggling artisan and not the worshipper.

-----

Work through the sections in order. Start by creating the folder structure and the README, then the brand guide, then logos, then iterate. Show me previews as you go and check in before finalizing the t-shirt set.