# Snail Welfare Alliance — website

The campaign site for the **Snail Welfare Alliance (SWA)**. Next.js 16 (App
Router), React 19, TypeScript (strict), Tailwind CSS v4. A calm, sourced,
guardrail-respecting case against the needless killing of sea snails — plus an
optional, flag-gated game (**The Terrarium**) where you cannot harm a snail.

## Quick start

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint (zero warnings expected)
```

> Node 20+ recommended. The repo root is one level up; all app code lives in `web/`.

## Project shape

```
web/
  content/            # markdown copy (gray-matter + remark pipeline)
  public/images/      # brand SVGs: logos, wordmarks, icons, illustrations, tshirts, hero
  src/
    app/              # App Router routes, API route handlers, sitemap/robots/og
    components/       # Logo, Nav, Footer, Prose, Reveal, StatCallout, Accordion, forms…
    lib/              # site config, content pipeline, form utils
```

Source assets are canonical in the repo-root `snail-campaign/` directory
(**read-only**); `web/public` holds working copies. Edit the source and re-copy.

## Design system

All theming is in `src/app/globals.css` under Tailwind v4 `@theme` — **there is no
`tailwind.config.ts`.** Brand tokens: `tyrian`, `imperial`, `murex-bloom`,
`vellum`, `bone`, `engravers`, `murex-ivory`. Vellum background (never white),
warm-ink text (never `#000`), Tyrian purple rationed to CTAs and emphasis.
Fonts (Cormorant Garamond + Inter) load via `next/font/google`. No dark mode by
design. Motion respects `prefers-reduced-motion`.

## Content

Pages read markdown from `content/*.md` via `src/lib/content.ts` (no CMS). To edit
copy, edit the markdown; the page re-renders it through `<Prose>`. The leading
`# H1` is auto-extracted so pages can render it via `<PageHeader>`.

## Environment variables

See [`.env.example`](./.env.example). Everything has a safe placeholder default;
nothing is required to build and run. Highlights:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_ANALYTICS` | `true` enables Vercel Analytics (cookieless) |
| `NEXT_PUBLIC_DONATE_PROVIDER` / `NEXT_PUBLIC_DONATE_URL` | Donation handoff |
| `NEXT_PUBLIC_MERCH_POD_URL` | Print-on-demand storefront base URL |
| `NEWSLETTER_*` / `CONTACT_WEBHOOK_URL` | Form delivery providers |
| `NEXT_PUBLIC_TERRARIUM_ENABLED` + `DATABASE_URL` + `AUTH_*` | The Terrarium (flag-gated) |

### Donations — recommended pre-501(c)(3) paths

SWA is **not yet a registered 501(c)(3)** and the site makes no tax-deductible
claims. Until an entity exists, the donate widget is a clearly-marked
placeholder. Recommended providers that support unregistered or fiscally-hosted
orgs, set via the two `NEXT_PUBLIC_DONATE_*` vars:

- **[Every.org](https://www.every.org/)** — can host a cause; donor-friendly.
- **[Open Collective](https://opencollective.com/)** — transparent fiscal hosting.
- **[Donorbox](https://donorbox.org/)** — simple hosted donation pages.
- **Stripe** — once a legal entity is registered.

The widget appends `?amount=NN` to `NEXT_PUBLIC_DONATE_URL` where supported.

## Deploying

Target is **Vercel**. The Next.js app lives in `web/`, so the Vercel project's
**Root Directory must be set to `web`**. See [`../LAUNCH.md`](../LAUNCH.md) for the
full step-by-step launch checklist (env vars, custom domain, donation provider,
and what is stubbed pending owner input).

## The Terrarium

An optional, code-split, **flag-gated** snail-keeping game (see `LAUNCH.md` /
`.env.example`). It ships dormant: `/terrarium` and its nav entry only appear when
`NEXT_PUBLIC_TERRARIUM_ENABLED=true` and the OAuth + Postgres env vars are set. The
public marketing site runs fully without any of it.

## License

Source code: **GPL-3.0** (see [`../LICENSE`](../LICENSE)). Campaign copy and brand
assets © Snail Welfare Alliance.
