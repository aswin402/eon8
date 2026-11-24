# EON8 Website — Native React 19, TypeScript & Node CMS Platform

Full-stack native React + TypeScript + Tailwind CSS v4 web application for **EON8 Digital Marketing Agency** (`https://www.eon8.com`), complete with 300+ static & dynamic routes, a built-in Blog Editorial CMS & Leads Inbox (`/admin-dashboard`), server-side HTML SEO/JSON-LD injection, real HTTP `301`/`404` routing, and live dynamic `/sitemap.xml`.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, React Router 7, Zustand, Framer Motion, GSAP, Lenis, Lucide React
- **Backend (`server/`)**: Zero-dependency Node.js `>= 22.18.0` TypeScript HTTP server (`server/prodServer.ts`) with:
  - **Blog CMS API (`server/cmsApi.ts`)** — `scrypt` password hashing, `HMAC-SHA256` `HttpOnly` + `Secure` sessions, IP rate limiting, magic-byte image upload validation, and atomic JSON persistence (`data/cms-content.json`).
  - **Leads Inbox API (`server/leadsApi.ts`)** — multi-layer anti-spam (honeypot, human timing guard, IP rate limiting), atomic persistence (`data/leads.json`), optional server-side webhook forwarding, and formula-safe CSV export.
  - **SEO & Edge Layer (`server/prodServer.ts` + `scripts/build-seo-manifest.ts`)** — raw HTML `<head>` SEO/OG/Twitter/JSON-LD injection, real HTTP `301` redirects & `404` responses, live dynamic `/sitemap.xml`, Brotli/Gzip compression, immutable asset caching, and security headers (`CSP`, `HSTS`, `X-Content-Type-Options`, `X-Frame-Options`).
- **Database Migration Ready**: Pre-hardened PostgreSQL schema with allowlisted RLS policies in `supabase/schema.sql`.

---

## Requirements

- **Node.js `>= 22.18.0`** (required for native TypeScript stripping on `scripts/*.ts` and `server/*.ts`)
- **npm `>= 10`**

---

## Quick Start (Local Development)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Set strong values in `.env`:
   - `CMS_ADMIN_EMAIL`: your administrator email
   - `CMS_ADMIN_PASSWORD`: strong password (`>= 10` characters, not a placeholder)
   - `CMS_SESSION_SECRET`: random 64-character hex string:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - *(Optional)* `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET` to forward enquiries to Slack, Zapier, Make, n8n, HubSpot, or an email service.

3. **Run development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173/` with both `/api/cms/*` and `/api/leads/*` active via Vite middleware.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server with live CMS & Leads APIs |
| `npm run lint` | Run ESLint across the entire repository |
| `npm run build` | Generate `public/sitemap.xml`, run `tsc -b`, build `dist/`, and generate `dist/seo-manifest.json` |
| `npm start` | Start hardened production server (`server/prodServer.ts`) on `PORT` (default `4173`) |
| `npm run sitemap` | Regenerate static `public/sitemap.xml` |
| `npm run seo-manifest` | Rebuild `dist/seo-manifest.json` |

---

## Admin Editorial Studio & Leads Inbox

Navigate to `/admin-dashboard` (or the custom path configured in `VITE_ADMIN_PATH`):
- **All Articles**: Rich-block visual editor, Markdown import/export, live EON8 preview, drafts/publish/featured toggles, SEO & SERP preview, and slug redirects.
- **Leads Inbox**: Review every website contact form, callback request, discovery call, floating drawer, and ChatGPT Ads enquiry with status pipeline (`New`, `Contacted`, `Qualified`, `Won`, `Archived`), internal sales notes, one-click WhatsApp/Email/Call actions, and CSV export.
- **Categories & Media Library**: Manage blog taxonomy and upload verified JPG/PNG/WebP/GIF/AVIF images.
- **Security & Account**: Rotate admin email/password live (invalidating older sessions) and export JSON backups.

---

## Production Deployment (VPS / Docker / PM2)

Because the built-in CMS and Leads Inbox persist runtime files to `data/` and `public/uploads/blog/`, deploy onto a persistent host (VPS / VM) or attach persistent volumes until migrating storage to Supabase (`supabase/schema.sql`):

### Option A — Docker Compose
```bash
# Ensure .env has strong CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD, and CMS_SESSION_SECRET
docker compose up -d --build
```
Mount `./data` and `./public/uploads` persistently (configured in `docker-compose.yml`).

### Option B — PM2 + Nginx
```bash
npm ci
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```
Use `deploy/nginx.conf` as your reverse-proxy template (TLS via Certbot, HTTP/2, gzip, edge rate limiting on `/api/cms/auth/login` and `/api/leads`, and `X-Forwarded-Proto` with `TRUST_PROXY=true`).

---

## Project Structure

```text
├── server/
│   ├── prodServer.ts       # Hardened Node HTTP server (SSR SEO, 301/404, dynamic sitemap, compression)
│   ├── cmsApi.ts           # Authenticated Blog CMS API + session/rate-limit/upload security
│   └── leadsApi.ts         # Public /api/leads capture (anti-spam) + authenticated Admin Leads Inbox API
├── scripts/
│   ├── generate-sitemap.ts # Build-time static public/sitemap.xml generator
│   └── build-seo-manifest.ts # Generates dist/seo-manifest.json for server-side HTML SEO injection
├── src/
│   ├── components/         # Shared Navbar, Footer, NeonCursor, CaptureModal, FloatingWidgets, sections/
│   ├── pages/              # Core, AI, ChatGPT Ads, Crypto, Influencer, NFT, Services, Policy, Blog, Admin
│   └── lib/                # CMS store/provider & unified leadSubmission helper
├── supabase/schema.sql     # PostgreSQL tables & allowlisted RLS policies for future Supabase cutover
├── deploy/nginx.conf       # Production Nginx reverse-proxy template
├── Dockerfile              # Multi-stage Node 22 Alpine production image
├── docker-compose.yml      # Persistent-volume compose setup
└── ecosystem.config.cjs    # PM2 process manager configuration
```
