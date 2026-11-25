# EON8 Website — React 19, TypeScript, Node & PostgreSQL

Full-stack React + TypeScript + Tailwind CSS v4 web application for **EON8 Digital Marketing Agency** (`https://www.eon8.com`), with 300+ static & dynamic routes, an admin portal (`/admin-dashboard`) for blog, leads, redirects, page SEO, site settings and users, server-side HTML SEO/JSON-LD injection, real HTTP `301`/`404` routing, and a live `/sitemap.xml`.

More detail: [docs/BACKEND.md](docs/BACKEND.md) (API, data, security) and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) (server setup, Nginx, backups).

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, React Router 7, Zustand, Framer Motion, GSAP, Lenis, Lucide React
- **Backend (`server/`)**: Node.js `>= 22.18.0` TypeScript HTTP server (`server/prodServer.ts`) backed by **PostgreSQL** (`server/migrations/*.sql`, applied automatically on start):
  - **Blog CMS API (`server/cmsApi.ts`)** — posts, categories, media (images optimised with `sharp`), post revision history.
  - **Auth & users (`server/lib/auth.ts`, `server/usersApi.ts`)** — `scrypt` passwords, database-backed `HttpOnly` sessions, `admin` / `editor` roles, forced password change for new users, login rate limiting, audit log.
  - **Leads (`server/leadsApi.ts`)** — every website form is saved to the database, the sales team is emailed over SMTP (`nodemailer`), spam is filtered (honeypot field, bot-speed check, IP rate limit), CSV export/import.
  - **Redirects (`server/redirectsApi.ts`)** — admin-managed 301/302/307/308/410 redirects with Rank Math CSV import.
  - **SEO (`server/seoManifest.ts`, `server/seoApi.ts`, `scripts/build-seo-manifest.ts`)** — title/description/canonical/Open Graph/Twitter/JSON-LD written into the HTML for every route, admin per-page overrides, legacy WordPress 301s (`?p=`, `/feed/`, `/tag/`, `/author/`, `/<post>/` → `/blog/<post>/`), real 404 status, live sitemap, GTM / Google Ads / verification tags from Site Settings.
  - **Edge** — Brotli/Gzip, immutable asset caching, security headers (`CSP`, `HSTS`, `X-Content-Type-Options`, `X-Frame-Options`).

---

## Requirements

- **Node.js `>= 22.18.0`** (native TypeScript stripping for `scripts/*.ts` and `server/*.ts`)
- **npm `>= 10`**
- **PostgreSQL 14+** — locally via Docker (`npm run db:up`) or any Postgres server

---

## Quick Start (Local Development)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the local database**
   ```bash
   npm run db:up        # PostgreSQL on 127.0.0.1:5433 (docker-compose.yml)
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Set in `.env`:
   - `DATABASE_URL` (the default matches `npm run db:up`)
   - `CMS_ADMIN_EMAIL` / `CMS_ADMIN_PASSWORD`: creates the first admin on first start (12+ characters, three of lowercase/uppercase/numbers/symbols). Remove the password from `.env` afterwards.
   - *(Optional)* `SMTP_*`, `MAIL_FROM`, `LEAD_NOTIFY_EMAILS` for lead emails. Without SMTP, leads are still saved and shown in the admin.

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173/` with all `/api/*` routes and redirects active via Vite middleware.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server with the API |
| `npm run lint` | ESLint across the repository |
| `npm run typecheck` | TypeScript check (`tsc -b`) |
| `npm run build` | Generate `public/sitemap.xml` and the route manifest, type-check, build `dist/`, and generate `dist/seo-manifest.json` |
| `npm start` | Production server (`server/prodServer.ts`) on `PORT` (default `4173`) |
| `npm run test:e2e` | Backend end-to-end checks against a server with a **fresh test database** (see `tests/backend.e2e.mjs`) |
| `npm run test:urls -- <base-url>` | Checks all 308 old WordPress URLs against a running site (read-only) |
| `npm run db:up` / `npm run db:down` | Start / stop the local PostgreSQL container |
| `npm run db:backup` | Database + uploads backup (`deploy/backup.sh`) |
| `npm run sitemap` | Regenerate static `public/sitemap.xml` |
| `npm run seo-manifest` | Rebuild `dist/seo-manifest.json` |

---

## Admin Portal

Navigate to `/admin-dashboard` (or the path in `VITE_ADMIN_PATH`):
- **All Articles**: rich-block editor, Markdown import/export, preview, drafts/publish/featured, SEO & SERP preview, slug redirects, revision history with restore.
- **Leads**: every website form (contact, callback, discovery call, floating drawer, ChatGPT Ads audit) with status pipeline, notes, email delivery status and resend, CSV export/import.
- **Redirects**, **Page SEO**, **Site Settings** (contact details, social links, lead email recipients, tracking tags), **Users**, **Activity Log**.
- **Categories & Media Library**, **Security & Account**.

Editors can manage content and leads; only admins can manage users, site settings, and export/delete leads.

---

## Production Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). In short:

- **Docker:** `docker compose -f docker-compose.prod.yml up -d --build` (PostgreSQL + web, persistent volumes for the database and uploads).
- **PM2 + Nginx:** `npm ci && npm run build && pm2 start deploy/ecosystem.config.cjs`, with `deploy/nginx/eon8.conf` as the reverse proxy (set `TRUST_PROXY=1`).
- Staging uses `deploy/nginx/eon8-staging.conf` (noindex). Get the HTTPS certificate before enabling either Nginx file.
- Updates: `deploy/deploy.sh main` (backup, pull, rebuild, health check, automatic rollback). Checks: `deploy/smoke-test.sh <url>`.
- Back up the database and `public/uploads/` daily with `deploy/backup.sh`.

---

## Project Structure

```text
├── server/
│   ├── prodServer.ts        # Production HTTP server (SEO head, 301/404, sitemap, compression, CSP)
│   ├── api.ts               # API router
│   ├── cmsApi.ts            # Blog CMS + auth endpoints
│   ├── leadsApi.ts          # Public /api/leads + admin leads
│   ├── redirectsApi.ts      # Redirect manager
│   ├── seoApi.ts            # Per-page SEO overrides, <head> injection, live sitemap
│   ├── seoManifest.ts       # Manifest-based SEO defaults + legacy WordPress 301s
│   ├── settingsApi.ts       # Site settings
│   ├── usersApi.ts          # Admin users, audit log, system status
│   ├── routes.ts            # Known routes (real 404 status)
│   ├── lib/                 # db, auth, http, mailer, images, env helpers
│   └── migrations/          # SQL migrations
├── scripts/
│   ├── generate-sitemap.ts
│   ├── generate-route-manifest.ts
│   └── build-seo-manifest.ts
├── src/                     # React app (components, pages, lib)
├── tests/backend.e2e.mjs    # Backend end-to-end checks
├── deploy/                  # Nginx config, PM2 config, backup script
├── docs/                    # BACKEND.md, DEPLOYMENT.md
├── Dockerfile               # Multi-stage Node 24 Alpine image
├── docker-compose.yml       # Local PostgreSQL
└── docker-compose.prod.yml  # Production PostgreSQL + web
```
