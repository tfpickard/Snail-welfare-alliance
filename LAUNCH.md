# LAUNCH.md — Snail Welfare Alliance

Everything you need to take the site from "shippable" to "fully operational,"
and an honest list of what is real versus stubbed.

---

## ✅ What is built and live-ready

The full marketing site builds clean (`npm run build`, `npm run lint`) and is
ready to deploy:

- **Home** (`/`) — cinematic hero, animated stat band, seven-beat scroll argument.
- **The Case** (`/the-case`) — four-market long-read with sticky TOC + sources.
- **The Science** (`/science`) — precautionary-sentience case, honest on uncertainty.
- **Where Are the Snails?** (`/where-are-the-snails`) — flagship campaign.
- **Purple Without Death** (`/purple-without-death`) — the Mixtec counterpoint.
- **About** (`/about`), **FAQ** (`/faq`) — three-layer brand + accessible accordion.
- **Take Action** (`/take-action`), **Newsletter** (`/newsletter`),
  **Contact** (`/contact`), **Merch** (`/merch`).
- **Privacy** (`/privacy`), **Terms** (`/terms`).
- SEO: per-page metadata, generated OG image, `sitemap.xml`, `robots.txt`,
  JSON-LD Organization. Redirects `/the-facts → /the-case`, `/donate → /take-action`.
- **The Terrarium** game is fully built and **flag-gated off** — adoption, lazy
  real-time simulation, estivation safety, procedural snail art, social feed,
  care leaderboards, consent breeding, lineage, memorials, and cron jobs. Pure
  engines are unit-tested (16 tests). It is dormant until you provision auth + DB
  (below); the public site is unaffected and never loads its code.

---

## 🚧 Stubbed, pending owner input (each marked `TODO(owner)` in code)

| Item | What's needed | Where |
| --- | --- | --- |
| **Donation provider** | Pick Every.org / Open Collective / Donorbox (or Stripe once registered); set `NEXT_PUBLIC_DONATE_PROVIDER` + `NEXT_PUBLIC_DONATE_URL` | `DonateWidget` |
| **Legal entity / EIN** | Register the entity; replace the EIN/501(c)(3) placeholder. **No tax-deductible claim is made anywhere until then.** | `Footer`, `/privacy`, `/terms` |
| **Custom domain** | Add domain in Vercel + DNS (below) | Vercel project |
| **Newsletter delivery** | Set `NEWSLETTER_PROVIDER` + `NEWSLETTER_API_URL` (+ key) | `lib/forms.ts` |
| **Contact delivery** | Set `CONTACT_WEBHOOK_URL` (email relay / serverless fn) | `lib/forms.ts` |
| **Merch storefront** | Set `NEXT_PUBLIC_MERCH_POD_URL` to your print-on-demand store | `/merch` |
| **Newly-drafted copy** | Four-market sections (cosmetics, medicine, fraud) need primary-source review | `/the-case` |
| **The Terrarium** | OAuth apps + Postgres; flag on (below) | see its section |

Forms never silently drop: with no provider configured they validate, log a
"pending" warning server-side, and tell the user they're on the list (pending).

---

## 🚀 Deploying to Vercel

The Next app is in **`web/`**, so the project's **Root Directory must be `web`**.

### Option A — Git integration (recommended, ongoing auto-deploys)
1. In Vercel: **Add New → Project → Import** `tfpickard/snail-welfare-alliance`.
2. Set **Root Directory = `web`** (Framework: Next.js, auto-detected).
3. Add env vars (see `.env.example`) under Project → Settings → Environment Variables.
4. Deploy. Every push to the branch creates a Preview; merging/promoting goes to Production.

### Option B — Vercel CLI (one-off)
```bash
cd web
vercel        # link/create project, set root dir = web
vercel --prod # promote to production
```
(Needs `vercel login` or a `VERCEL_TOKEN`.)

### Environment variables to set in Vercel
At minimum for a clean launch: none are required (safe placeholders). To activate
features, set the relevant vars from `.env.example`. Enable analytics with
`NEXT_PUBLIC_ANALYTICS=true`.

### Custom domain — `TODO(owner)`
1. Vercel → Project → **Settings → Domains → Add** your domain.
2. At your DNS provider, add the records Vercel shows — typically:
   - Apex `@` → **A** record to `76.76.21.21`, or an `ALIAS/ANAME` to `cname.vercel-dns.com`.
   - `www` → **CNAME** to `cname.vercel-dns.com`.
3. Wait for verification + automatic HTTPS.
4. Update `ORG.url` in `web/src/lib/site.ts` to the final domain (drives canonical
   URLs, sitemap, OG, JSON-LD).

---

## ✍️ Editing content

Copy lives in `web/content/*.md`. Edit the markdown and redeploy — pages render it
through the content pipeline. Brand assets are canonical (read-only) in
`snail-campaign/`; working copies are in `web/public/images/`.

To swap the **donation provider**: set the two `NEXT_PUBLIC_DONATE_*` env vars and
redeploy. No code change needed.

---

## 🐌 The Terrarium (optional game) — `TODO(owner)`

Ships **dormant and code-split**; the public site is unaffected. To turn it on in
production you must provision:

1. **Postgres** (Neon / Vercel Postgres) → `DATABASE_URL`.
2. **OAuth apps** (Google + GitHub), callback `https://<domain>/api/auth/callback/<provider>`
   → `AUTH_GOOGLE_ID/SECRET`, `AUTH_GITHUB_ID/SECRET`, plus `AUTH_SECRET`
   (`openssl rand -base64 32`).
3. Apply the schema: `npm run db:migrate` (initial migration is already generated
   at `web/drizzle/0000_*.sql`), then optionally `npm run db:seed` for demo snails.
4. Set `NEXT_PUBLIC_TERRARIUM_ENABLED=true` and `CRON_SECRET`; redeploy. The hourly
   Vercel Cron (`web/vercel.json` → `/api/cron`) then drives breeding, hatching,
   aging, and diary events.

Until then, `/terrarium` and its nav entry stay hidden.

---

## The three real-world items left to finalize

1. **Donation provider** (env vars).
2. **Legal entity / EIN** (then update footer + legal pages).
3. **Custom domain** (Vercel + DNS, then `ORG.url`).

Everything else is built, tested, and green.
