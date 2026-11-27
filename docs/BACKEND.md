# EON8 backend: database, admin and APIs

The site is a React app served by a small Node server (`server/prodServer.ts`).
The same backend also runs inside the Vite dev server, so `npm run dev` gives you
the full admin locally.

## Local setup

1. Install Node 22.18 or newer and Docker Desktop.
2. Start PostgreSQL: `npm run db:up` (uses `docker-compose.yml`, port 5433).
3. Copy `.env.example` to `.env`. The default `DATABASE_URL` matches the Docker database.
4. Set `CMS_ADMIN_EMAIL` and `CMS_ADMIN_PASSWORD` (12+ characters, three of:
   lowercase, uppercase, numbers, symbols). On first start the server creates
   this admin account. Remove the password from `.env` afterwards.
5. `npm run dev` and open `/admin-dashboard` (or your `VITE_ADMIN_PATH`).

Database tables are created automatically on start from `server/migrations/*.sql`.
To change the schema, add a new numbered file (for example `002_add_x.sql`);
never edit a migration that has already run.

## Production

```
npm ci
npm run build
NODE_ENV=production DATABASE_URL=postgres://... npm start
```

Put Nginx or Cloudflare in front for HTTPS and set `TRUST_PROXY=1` so the
server sees real visitor IPs. Set `SITE_URL` to the public URL. Configure SMTP
(`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`) so leads are emailed;
without it they are still saved and visible in the admin.

Set `DATA_ENCRYPTION_KEY` (`openssl rand -hex 32`) so lead personal data is
encrypted at rest (see below), and keep a copy of the key in the company
password manager.

Back up the PostgreSQL database and `public/uploads/` daily
(`deploy/backup.sh`; set `BACKUP_PASSPHRASE` to encrypt the backup files).

## Lead data encryption at rest

When `DATA_ENCRYPTION_KEY` is set, the personal fields of every lead (name,
email, phone, country, website, message, preferred slot, notes, page URL,
referrer, user agent) are encrypted by the application before they reach
PostgreSQL (`server/lib/crypto.ts`, AES-256-GCM, a random IV per value, stored as
`enc:v1:<iv>:<tag>:<ciphertext>`). A database dump or a stolen disk therefore
shows no lead details. Plain columns: `source`, `status`, `utm`, `extra`, dates,
email status, and `ip_hash` (already a salted one-way hash).

- **Key:** 32 bytes as 64 hex characters (or base64). An invalid key stops the
  database start-up with a clear message in the log. Without a key everything
  works in plain text (development); in production the server logs a warning.
  The admin Site Settings page shows "Lead encryption: on/off"
  (`leadEncryption` in `GET /api/admin/system`).
- **Losing the key loses the lead details.** Keep it in the company password
  manager, never in git. Backups do not contain it.
- **Existing rows:** on every start a startup hook encrypts lead values still in
  plain text, in batches of 500, and logs how many rows it changed. It is
  idempotent (values already in `enc:v1:` form are skipped), so leads saved
  before the key was set are migrated on the first start with the key.
- **Key rotation:** set the new key as `DATA_ENCRYPTION_KEY`, the old one as
  `DATA_ENCRYPTION_KEY_OLD`, restart. Reads try both keys; the startup hook
  re-encrypts everything with the new key and logs when `DATA_ENCRYPTION_KEY_OLD`
  can be removed.
- **Search:** encrypted columns cannot be searched in SQL. The admin leads list
  filters status, form and dates in SQL, then decrypts and searches name, email,
  phone and message in memory over the newest 5,000 matching leads (totals and
  pagination are computed after the search). CSV export applies the same search
  to all matching rows.
- Notification emails to the sales team still contain the plain values; the
  activity log stores no lead contents (only status changes and counts).

## What the backend does

| Area | Endpoints | Notes |
|---|---|---|
| Blog CMS | `/api/cms/*` | Same API as before, now stored in PostgreSQL. `data/cms-content.json` is imported once on first start. |
| Website pages | `GET /api/pages/index`, `GET /api/pages/content?key=`, `/api/admin/pages*` | Admin > Pages. Edit the 128 pages that ship with the site (services, packages, landing, crypto, NFT, influencer and policy pages) or create new ones at `/<slug>/` ("Landing page" with sections, or "Simple page" with content blocks). An edit is stored as a copy of the page's content in `cms_pages` (key `<template>:<slug>`); published edits replace the built-in content, drafts do not, "Reset to original" deletes the copy. Last 20 versions kept per page. Script links are refused; a new page cannot take an existing page, blog post, redirect or reserved URL. Edited titles/descriptions are used in the server-side SEO tags; new pages are added to the sitemap. Home, About, Contact, AI Agent, AI Video, ChatGPT Ads and Works still have their text in the page code. |
| News & newsletters | same as Blog CMS | Each article has a content type (Blog post, News, Newsletter). News is served at `/news/` and `/news/<slug>/`, newsletters at `/newsletter/…`; opening one under the wrong section 301s to the right one. |
| Admin login | `/api/cms/auth/*` | Sessions in the database, HttpOnly cookie, login rate limits. No default password. |
| Leads | `POST /api/leads`, `/api/admin/leads*` | Every website form posts here (`src/lib/leadSubmission.ts`). Saved, emailed to the recipients in Site Settings, rate limited. Spam (hidden `<SpamHoneypotField />` filled in, or a form sent within 0.8 s of opening) is saved with status `spam` and not emailed. CSV export/import. |
| Redirects | `/api/admin/redirects*` | Real 301/302/307/308/410 responses from the server. CSV import accepts the Rank Math export. |
| Page SEO | `GET /api/seo`, `/api/admin/seo*` | Every route gets title, description, canonical (with trailing slash), Open Graph/Twitter tags and JSON-LD in the HTML from `dist/seo-manifest.json` (`scripts/build-seo-manifest.ts`, run by `npm run build`) plus live blog posts from the database (`server/seoManifest.ts`). Per-path overrides from the admin win over the manifest. |
| Legacy WordPress URLs | all page URLs | 301s for `?p=<id>`, `/feed/`, `/tag/*`, `/author/*`, renamed pages from the SEO manifest, and old `/<post-slug>/` URLs → `/blog/<post-slug>/` (`BLOG_ROOT_REDIRECT=false` turns that last one off). Admin redirects are checked first. |
| Site settings | `GET /api/settings`, `/api/admin/settings*` | Logos and favicon (header logo, footer logo, favicon, default share image; the favicon is written into each page by the server), contact details and social links (used by the footer), lead recipients, GTM / Google Ads / verification codes and the Tawk.to live chat (injected by the server into public pages, never into the admin). |
| Users | `/api/admin/users*` | Admin and editor roles, temporary passwords that must be changed, safeguards for the last admin. |
| Activity log | `/api/admin/audit` | Every admin change is recorded. |
| Sitemap | `/sitemap.xml` | Build-time sitemap plus posts published in the admin, minus hidden posts and noindex pages. Old WordPress sitemap URLs (`/sitemap_index.xml`, `/post-sitemap.xml`, `/post-sitemap2.xml`, `/page-sitemap.xml`, `/category-sitemap.xml`, `/post_tag-sitemap.xml`, `/author-sitemap.xml`, `/local-sitemap.xml`, `/wp-sitemap.xml`, `/wp-sitemap-*.xml`) 301 to `/sitemap.xml`; the old `/main-sitemap.xsl` stylesheet returns 404. |
| Revision history | `/api/cms/admin/posts/:id/revisions`, `/api/cms/admin/revisions/:id/restore` | The last 20 versions of each post; "History" button in the article editor. |
| Image uploads | `/api/cms/admin/media/upload` | Checked by file content, resized to max 2000px wide and recompressed (sharp). |
| 404 status | all page URLs | Unknown URLs get a real 404 status (the app still shows its not-found page). Known routes come from `public/route-manifest.json`, generated by `scripts/generate-route-manifest.ts` during `npm run build`, plus posts and categories in the database. |
| Health | `GET /api/health` | For uptime monitoring. |

Lead forms include a hidden spam-trap field (`<SpamHoneypotField />`) and pass `honeypot` and `formStartedAt` to `submitLeadEnquiry`; do the same in any new form. If the server rejects a form (validation or rate limit) the result has an `error` message to show the visitor.

When a lead is saved, the browser pushes a `generate_lead` event (with `lead_source` = form name and `page_path`) to the GTM data layer. Use it as the conversion trigger in Google Tag Manager; no personal details are sent.

## Tests

`npm run test:e2e` runs about 140 backend checks against a running server with a
**fresh test database** (it creates test data). Set `E2E_BASE_URL`,
`E2E_ADMIN_EMAIL` and `E2E_ADMIN_PASSWORD` (the first-admin values). The server
should run with a test `DATA_ENCRYPTION_KEY`; for a server without one set
`E2E_EXPECT_LEAD_ENCRYPTION=off`. CI
(`.github/workflows/ci.yml`) runs lint, build and these tests against PostgreSQL
on every push.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the VPS, Docker, Nginx, HTTPS, backup and
go-live steps.

### Roles

- **Editor:** blog posts, categories, media, leads (view and update), redirects, page SEO.
- **Admin:** everything above, plus site settings, users, activity log, lead export/import/delete.

## Security notes

- All state-changing API requests must come from the same site (Origin check).
- Uploaded images are checked by their file content, not only the declared type.
- Lead visitor IPs are stored only as salted hashes (`LEAD_IP_SALT`).
- Lead personal data is encrypted at rest with `DATA_ENCRYPTION_KEY` (see above);
  backups are encrypted with `BACKUP_PASSPHRASE`.
- The production server sends security headers and HSTS, compresses text files,
  and caches hashed build files for a year.
