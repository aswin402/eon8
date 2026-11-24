# Changelog

All notable changes to the **Eon8 Website** (`eon8website`) React + TypeScript application are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [3.5.0] - 2026-11-24

### Security
- **Removed Hardcoded Credentials & Browser-Only Production Fallback (`server/cmsApi.ts`, `src/lib/cms/provider.ts`, `src/pages/admin/components/`)**:
  - Removed all hardcoded default admin credentials (`admin@eon8.com` / `Eon8Admin@2026`) from server and client code (`C01`), and removed `BrowserFallbackCmsProvider` so edits never silently fall back to browser `localStorage` (`C05`).
  - Enforced startup credential & session-secret validation (`validateCmsSecurityConfig`): `server/prodServer.ts` refuses to start if `CMS_ADMIN_EMAIL`, `CMS_ADMIN_PASSWORD` (`>= 10` chars, non-placeholder), or `CMS_SESSION_SECRET` (`>= 32` chars, non-placeholder) are missing or weak, and automatically rotates stored secrets & invalidates old tokens when `CMS_SESSION_SECRET` changes (`C02`).
  - Hardened login rate limiting (`C04`) to use `req.socket.remoteAddress` unless `TRUST_PROXY=true` and evict expired IP buckets; added `HttpOnly` + `Secure` cookies on HTTPS/production, strict `path.relative` directory containment checks (`C06`), binary magic-byte image signature validation on uploads (`C07`, `D05`), safe `decodeURIComponent` returning HTTP `400` instead of crashing (`C03`), and full security headers (`CSP`, `HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **Restricted Supabase RLS Policies (`supabase/schema.sql`)**:
  - Added an allowlisted `public.cms_admins` table + `public.is_cms_admin()` security-definer helper so only explicitly allowlisted admins/editors can write blog content (`C08`).

### Added
- **Server-Side SEO HTML Injection, Real HTTP `404`/`301`, Dynamic `/sitemap.xml` & Compression (`scripts/build-seo-manifest.ts`, `server/prodServer.ts`)**:
  - Added build-time `scripts/build-seo-manifest.ts` generating `dist/seo-manifest.json` across all 153 pages, 169 blog posts, and 41 legacy redirects.
  - Updated `server/prodServer.ts` to inject exact per-route `<title>`, `<meta name="description">`, canonical, `robots`, OpenGraph, Twitter Cards, and Schema.org JSON-LD directly into raw HTML (`C02 SEO`), emit true HTTP `301` redirects for legacy WordPress slugs, root blog slugs (`/<slug>` -> `/blog/<slug>`), `/feed/`, `/author/`, `/tag/`, and `/?p=` (`C01`/`C08 SEO`), return true HTTP `404` for unknown routes & `/wp-admin` probes (`C03 SEO`), serve live dynamic `/sitemap.xml` synced with CMS edits (`A17`), and enable Brotli/Gzip compression (`E03`) + 1-year `immutable` caching on hashed `/assets/*` (`F06`).
- **Synced 164 Live Rank Math Blog Titles & Meta Descriptions (`src/pages/blog/blogIndexData.ts`)**:
  - Populated exact live WordPress Rank Math `metaTitle` and `metaDescription` fields onto all 164 non-colliding blog post entries (`C06 SEO`), flowing automatically into `BlogPostPage.tsx`, the Admin SEO Studio, and server-side HTML injection.
- **Built-In Lead Capture Backend, Anti-Spam Protection & Admin Leads Inbox (`server/leadsApi.ts`, `src/lib/leadSubmission.ts`, `src/components/ui/SpamHoneypotField.tsx`, `src/pages/admin/components/AdminLeadsInbox.tsx`)**:
  - Added `/api/leads` (mounted in both `vite.config.ts` and `server/prodServer.ts`) persisting every website form submission atomically to gitignored `data/leads.json` with optional server-side `LEAD_WEBHOOK_URL` forwarding (`B01`, `C11`).
  - Added multi-layer anti-spam (`B02`) across all 6 website forms (`LeadCaptureCard`, `QuickCallbackBanner`, `CaptureModal`, `FloatingWidgets`, `DiscoveryCallSection`, and `ChatgptAdsAgencyPage`): off-screen honeypot trap (`companyFax`), minimum human timing check, per-IP rate limiting (10/15min), and strict field validation.
  - Added **Leads Inbox** inside `/admin-dashboard` (`A10`) with live unread badge, KPI metrics, search & status filters (`New`, `Contacted`, `Qualified`, `Won`, `Archived`), internal sales notes, one-click WhatsApp/Email/Call outreach, and formula-injection-safe CSV export (`/api/leads/admin/export.csv`), plus `public.leads` RLS schema in `supabase/schema.sql`.

---

## [3.4.0] - 2026-11-24

### Changed
- **ChatGPT Ads Agency Full EON8 Theme UI Rebuild (`src/pages/chatgpt/ChatgptAdsAgencyPage.tsx`, `src/pages/chatgpt/ChatgptAdsSubPage.tsx`)**:
  - Rebuilt `/chatgpt-ads-agency`, `/chatgpt-ads-agency/blog`, and `/chatgpt-ads-agency/education` in 100% native React TSX + Tailwind CSS v4 + Lucide React using EON8's `ai` navy/electric-blue + `#FD5900` orange design system, full Light + Dark mode support, and shared `Navbar`, `Footer`, `NeonCursor`, `FloatingWidgets`, and `CaptureModal` integration via `RootLayout.tsx`.
  - Retained the interactive 4-industry AI search/ad preview, expandable package work-scope cards, FAQ accordion, process roadmap, and accessible audit modal wired to `submitLeadEnquiry()`, eliminating all `768px` horizontal overflow and `<12px` mobile text (`C21`).
  - Removed standalone `src/styles/chatgpt-ads.css`.

### Fixed
- **Navbar `1024px`–`1280px` Overflow & Mega-Menu Viewport Clamping (`src/components/Navbar.tsx`, `src/components/Footer.tsx`)**:
  - Aligned Navbar and Footer containers to `max-w-7xl`, tightened `lg` (`1024px`–`1279px`) nav sizing/spacing so `Get Started` never overflows right, and anchored the `Our Services` mega-menu cleanly within header bounds (`C10`, `C18`, `C26`).
- **Invisible Cursor Bug & `NeonCursor` Performance (`src/components/NeonCursor.tsx`, `src/components/NeonCursor.css`, `src/layouts/RootLayout.tsx`)**:
  - Scoped `cursor: none !important` strictly to `html.neon-cursor-active` under `@media (pointer: fine) and (prefers-reduced-motion: no-preference)`, keeping native cursors visible on `/admin-dashboard`, touch/reduced-motion devices, and all text inputs (`input`, `textarea`, `select`) (`C09`).
  - Replaced React `useState` on `mousemove` with Framer Motion `useMotionValue` + `useSpring` (zero React re-renders per mouse move) and disabled `Lenis` smooth scrolling when `prefers-reduced-motion: reduce` is active (`C16`).
- **Z-Index Scale & Accessible `CaptureModal` (`src/components/CaptureModal.tsx`, `src/components/FloatingWidgets.tsx`, `src/components/Navbar.tsx`)**:
  - Standardized layering (`FloatingWidgets` `z-30`, `Navbar` `z-40`, `CaptureModal` `z-[60]`, `NeonCursor` `z-[99999+]`) and added `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, accessible close label, and `Escape` dismissal to `CaptureModal` (`C14`, `C15`).
- **Privacy Policy & Legal `320px` Layout Fixes (`src/pages/policy/PolicyPage.tsx`, `src/pages/policy/policyPagesData.ts`)**:
  - Added `break-words [overflow-wrap:anywhere]` to prevent `https://policies.google.com/technologies/ads` from overflowing at `320px`, replaced the `www.website.com` placeholder with `www.eon8.com`, and formatted CCPA/GDPR rights as structured bullet lists (`C20`).
- **Frontend SEO Structured Data, `og:image`, `noindex`, Robots/Sitemap & Blog Sidebar Form (`src/components/sections/PageSeo.tsx`, `src/pages/blog/BlogPostPage.tsx`, `src/pages/services/`, `public/robots.txt`, `scripts/generate-sitemap.ts`)**:
  - Restored Schema.org `@graph` JSON-LD (`Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, and `BlogPosting` on articles), default `og:image`, `og:site_name`, and Twitter Card tags across all routes.
  - Preserved live `noindex` directives on `/ads-amazon-marketing-agency`, `/instagram-marketing-funnel`, and `/seo-services-funnel`, excluded them (plus `nft-marketing-services-testing`) from `public/sitemap.xml` (`305` URLs), and disallowed `/admin-dashboard` & `/api/` in `public/robots.txt`.
  - Restored the sticky consultation enquiry form (`#blog-sidebar-enquiry`) in `BlogPostPage.tsx` (`B03`).
- **Case-Colliding Asset & Node Engine (`public/wp-content/uploads/2022/11/launch-influencer.svg`, `src/pages/influencer/data/influencerAgencyData.ts`, `package.json`)**:
  - Renamed `Launch.svg` -> `launch-influencer.svg` to eliminate the macOS/Windows case collision with `launch.svg` (`C23`) and declared `"engines": { "node": ">=22.18.0" }` (`C13`).

---

## [3.3.0] - 2026-11-18

### Added
- **Hidden Blog Editorial Admin Studio (`/admin-dashboard`)**:
  - Built a standalone, unlinked, `noindex` editorial CMS portal (`src/pages/admin/AdminDashboardPage.tsx`, configurable via `VITE_ADMIN_PATH`) protected by email & password authentication (`scrypt` + constant-time verification + `HMAC-SHA256` `HttpOnly` session cookies + login rate limiting), seeded from `.env` (`CMS_ADMIN_EMAIL` / `CMS_ADMIN_PASSWORD`) with live credential rotation inside **Security & Account**.
  - Added full CRUD across all 169 baseline blog articles and newly authored posts: **Visual Rich-Block Editor** (H2/H3/H4 headings, rich-text formatting bar for bold/italic/accent/links, bullet & numbered lists, interactive tables, blockquotes, CTA buttons, and inline images), one-click **Markdown Import/Export**, **Write / Split / Live Eon8 Preview** modes, **Draft vs Published** status, **Featured Editorial Picks** spotlight on `/blog`, **Category Manager**, **Media Library & Drag-and-Drop Image Uploader** (`public/uploads/blog/`), bulk actions, duplicate post, slug-rename redirects, and baseline post restore.
  - Added **SEO & SERP Suite** with custom URL slug conflict validation, custom meta title & description, OpenGraph image overrides, live Google SERP snippet preview, auto word-count/read-time calculation, and a 7-point SEO Readiness score.
  - Built self-contained Node API middleware (`server/cmsApi.ts` mounted in `vite.config.ts` for `npm run dev` / `npm run preview` and `server/prodServer.ts` for `npm start`) behind a provider adapter (`src/lib/cms/provider.ts`) with ready-to-run `supabase/schema.sql` for future Supabase migration.

### Fixed & Refactored
- **Wired ChatGPT Ads Agency Audit & Package Modal (`src/pages/chatgpt/ChatgptAdsAgencyPage.tsx`)**:
  - Connected `handleAuditSubmit` to `submitLeadEnquiry()` with email/WhatsApp capture plus instant webhook delivery, pre-filled WhatsApp/mailto handoff, and `/thank-you` link.
- **Removed Remaining Scraper `"Elementor"` Naming & Hex Widget IDs**:
  - Renamed `ElementorInfluencerPage.tsx` -> `CreatorPlatformPage.tsx` (`creatorPlatformData.ts`), `ElementorNftPage.tsx` -> `CommunityGrowthPage.tsx` (`src/pages/nft/data/community/`), and `'elementor-delivery'` -> `'split-delivery'` in `PolicyPage.tsx` / `policyPagesData.ts`, stripping all dead `elementorPageClass`, `widgetId`, `colId`, `headingWidgetId`, and `textWidgetId` scraper metadata.

---

## [3.2.0] - 2026-11-18

### Added
- **Unified Lead Delivery Utility (`src/lib/leadSubmission.ts`)**:
  - Wired `LeadCaptureCard`, `QuickCallbackBanner`, `CaptureModal`, `FloatingWidgets`, and `DiscoveryCallSection` through `submitLeadEnquiry()` with optional `VITE_LEAD_WEBHOOK_URL` / `VITE_API_URL` webhook delivery plus one-click WhatsApp, `mailto:`, and `/thank-you` confirmation links.
- **Canonical & OpenGraph Metadata + Hash-Aware Scroll (`src/components/sections/PageSeo.tsx`)**:
  - Added dynamic `<link rel="canonical">`, `og:title`, `og:description`, and `og:url` tags across all routes (including `HomePage`, `NotFoundPage`, `ChatgptAdsAgencyPage`, `ChatgptAdsSubPage`, and canonical `/blog/:slug` tags on `BlogPostPage`), plus automatic smooth scroll to `#hash` targets on cross-page navigation.

### Fixed
- **Repaired 100+ `#hash` & Relative CTA Buttons (`SmartActionButton.tsx` & `OurServicesPage.tsx`)**:
  - Mapped `#enquiry`, `#consult-form`, `#contact`, `#consultation`, and `#bottom-lead-form` to scroll smoothly to the active consultation form (falling back to opening `CaptureModal`), added `id="package"` on `<PricingMatrixSection />` for package CTAs, and converted 7 relative `"contact"` hrefs to SPA `"/contact"` links.
- **Canonical Blog Sitemap URLs (`scripts/generate-sitemap.ts` -> 309 URLs)**:
  - Emitted all 169 blog posts under `/blog/<slug>/` in `public/sitemap.xml`, resolving the 3 slug collisions (`crm-software-development`, `erp-software-development`, `whatsapp-marketing-services`) that were previously omitted.
- **UI, Accessibility & Content Fixes**:
  - Updated `RichText.tsx` with accessible default (`#0053C6` / `dark:text-sky-400`) vs `tone="on-dark"` (`text-amber-300`) link contrast across all vertical suites and blog articles.
  - Repaired all **45** scraper-affected service & package data modules (`src/pages/services/data/*.ts`): fixed all **7** shifted pricing tables (`seo-packages`, `ppc-packages`, `facebook-packages`, `instagram-packages`, `linkedin-packages`, `twitter-packages`, `nft-marketing-services-testing`) with proper tier header prices (`$199/mo`–`$7,999`), restored **10** Elementor stats counter strips (`1250+ / 548+ / 12+ / 250+` & `20k+`), converted **5** mis-scraped client/press sliders into native `logo-marquee` sections, populated all empty/truncated sections (`metaverse`, `social-ar-solutions`, `erp-software-development`, `ecommerce-website-development-services`, `performance-marketing-agency`, `link-building-services-for-high-rankings`, `home-new`, etc.), and replaced all generic `"Key Highlights"` / `"Overview & Capabilities"` placeholder headings.
  - Removed scraper-duplicated inline-link CTA buttons across 14 service data modules, expanded `d2c-branding-and-growth-agency.ts` and `top-digital-marketing-agency-malaysia.ts`, fixed duplicate Section 11 heading & `Manju Groups` showcase card (`HomePage.tsx` & `PortfolioPages.tsx`), wired 3 distinct local MP4 showreel videos in `AIVideoPage.tsx`, added resilient `onError` image handling in `BlogPostPage.tsx`, and fixed `"Get Start"` -> `"Get Started"` in `Navbar.tsx`.

### Removed
- **Purged ~117 MB of Legacy WordPress Snapshots, Orphaned Assets & Dead Template Code**:
  - Removed `www.eon8.com/` (110 scraped WP files), 972 unreferenced files in `public/wp-content/` & `public/imgs/` (including `public/wp-content/plugins/`, 84 unused WP/Elementor/CF7 `.css` files, and 111 unused icon font files), duplicate unimported `src/assets/` & `assets/` folders, dead `.wp-article-content` / `.uagb-*` CSS in `src/index.css`, 11 unimported template files in `src/`, and 8 unused npm packages.

---

## [3.1.0] - 2026-11-18

### Added
- **5 Newly Built & Routed Live Eon8 Pages (`src/pages/ThankYouPage.tsx` & `src/pages/services/data/`)**:
  - Built native React + Tailwind pages for `/whatsapp-marketing-services` (10-section WhatsApp Business API, AI Chatbot & CRM Automation suite), `/instagram-marketing-funnel`, `/seo-services-funnel`, `/ads-amazon-marketing-agency`, and `/thank-you` (`ThankYouPage.tsx`), expanding `ALL_SERVICE_SLUGS` to **83** routes and `public/sitemap.xml` to **305** canonical URLs.
  - Added 6 legacy WordPress `-test` / `-new` fallback redirects in `src/App.tsx` (`LEGACY_WP_REDIRECTS` = **39** redirects).

### Fixed
- **Completed Full ORM Body Sections Across 4 Legacy ORM Routes**:
  - Populated complete multi-section content, 5–6 step process roadmaps, local `/wp-content/uploads/2020/` imagery, and internal ORM cross-links for `/clean-negative-search-results-2`, `/quora-com-complaint-removal`, `/remove-complaints-from-google-search`, and `/remove-negative-reviews-back` (plus `1250+ / 548+ / 12+ / 250+` stats on `/performance-marketing-funnel`).

---

## [3.0.0] - 2026-11-17

### Added
- **Unified Native React + Tailwind CSS v4 Section Design System (`src/components/sections/`)**:
  - Created 12 reusable, strongly typed, Light/Dark-mode-aware React section primitives across 5 vertical palettes (`brand`, `ai`, `crypto`, `nft`, `influencer`): `ServiceHeroSection`, `LeadCaptureCard`, `QuickCallbackBanner`, `ClientLogoMarquee`, `StatsCounterStrip`, `FeatureGridSection`, `AlternatingSplitSection`, `InteractiveTabsSection`, `ProcessRoadmapSection`, `PricingMatrixSection`, `TestimonialsSection`, `FaqAccordionSection`, `DiscoveryCallSection`, `BottomCtaBanner`, `PageSeo`, and `SmartActionButton`.
  - Added `/ai-video-agency` route alias in `src/App.tsx` alongside `/ai-video-creation`, and created dedicated `PortfolioPages.tsx` (`WorksPage` + `CaseStudyPage`) for `/works`, `/case-study-poorvika`, `/case-study-cake-square-chennai`, and `/case-study-hidden-secret`.

### Changed
- **100% Pure React TSX + Tailwind CSS v4 Full-Site Rebuild (Zero WordPress DOM Replay)**:
  - Rebuilt `AIAgentPage.tsx`, `AIVideoPage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `PolicyPage.tsx`, the entire **Crypto** suite (15 routes), **Influencer** suite (5 routes), **NFT & Discord** suite (22 routes), **79 Service & Package** routes (`OurServicesPage.tsx` + semantic `ServicePageData` modules), and **Blog Hub + all 169 Blog Articles** (`BlogListPage.tsx`, `BlogPostPage.tsx`, and semantic `ArticleBlock[]` post modules) using clean Tailwind CSS v4 layouts and `lucide-react` icons while preserving all authentic Eon8 copy, metrics, pricing tables, and localized `/wp-content/` assets.

### Removed
- **Eliminated All Legacy WordPress DOM Renderers & 4.2 MB of Scraped CSS**:
  - Deleted `src/pages/services/components/` (`ServiceNodeRenderer.tsx`, `ServicesPageShell.tsx`, `ServicesAccordions.tsx`, `ServicesCarousels.tsx`, `ServicesFormWidget.tsx`, `ServicesSmartLink.tsx`), obsolete legacy Crypto/Influencer/NFT widget wrappers, and all 9 scraped WordPress/Elementor/Bootstrap stylesheets (`legacy-eon8.css`, `legacy-responsive-fixes.css`, `services-pages.css`, `core-packages-works-pages.css`, `nft-pages.css`, `crypto-pages.css`, `influencer-pages.css`, `ai-core-blog-pages.css`, `policy-pages.css`), leaving only `src/index.css` and standalone `src/styles/chatgpt-ads.css`.

---

## [2.4.0] - 2026-11-17

### Added
- **100% 1:1 Live Fidelity Completion Across All Remaining Core, Software, Portfolio, Case Study & Package Pages (`ALL_SERVICE_SLUGS` = 83 Routes)**:
  - Migrated `erp-software-development`, `crm-software-development`, `works`, `case-study-poorvika`, `case-study-cake-square-chennai`, `case-study-hidden-secret`, `seo-packages`, `ppc-packages`, `facebook-packages`, `instagram-packages`, `linkedin-packages`, and `twitter-packages` into pure TypeScript `ServicePageData` modules (`src/pages/services/data/*.ts`) with scoped CSS (`src/styles/core-packages-works-pages.css`).
  - Wired interactive React FAQ accordions, `<NftCalendlyWidget />` consultation booking, `#nft-form` / `#responsive-form` lead capture, and `#nft-client-slider` client logo marquee across the newly migrated pages.
  - Rewrote all **110 inline legacy WordPress 301-redirect links** across **50** blog post and service TypeScript modules directly to their canonical routes, and added 33 `<Navigate replace />` fallback redirect routes in `src/App.tsx` (plus aligned `/gallery` and `HomePage.tsx` metadata 1:1 with live `https://www.eon8.com/`).

### Removed
- Removed earlier non-1:1 Tailwind placeholder components (`src/pages/SoftwarePage.tsx`, `src/pages/WorksPage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/PackagesPage.tsx`, and `src/pages/packagesData.ts`).

---

## [2.3.0] - 2026-11-16

### Added
- **1:1 Pure-React Legal & Policy Footer Pages (`src/pages/policy/` & `src/styles/policy-pages.css`)**:
  - Rebuilt `src/pages/policy/PolicyPage.tsx` and `src/pages/policy/policyPagesData.ts` 1:1 with live `https://www.eon8.com/` in pure TypeScript & React TSX across `/privacy-policy-2` (and `/privacy-policy`), `/refund-policy`, `/terms-and-conditions`, and `/delivery-policy` (including the 2-column Elementor layout and localized hero/service imagery, with zero `dangerouslySetInnerHTML`).

### Changed
- **Live `.neo-footer` Alignment (`src/components/Footer.tsx`)**:
  - Aligned `Our Services` (`Digital Marketing`, `Social Media Marketing`) and `Other Links` (`Blog`, `Contact`, `Privacy Policy`, `Refund Policy`, `Terms And Conditions`, `Delivery Policy`), `2fr 1fr 1fr 1fr` column proportions, certification badges row, and floating contact bar 1:1 with live `https://www.eon8.com/`.

---

## [2.2.0] - 2026-11-16

### Added
- **`ChatGPT Ads Agency` Suite (`src/pages/chatgpt/`)**:
  - Added the `ChatGPT Ads Agency` menu item under `AI-Agent` in `src/components/Navbar.tsx` (desktop dropdown & mobile drawer).
  - Built 1:1 standalone pure-React TSX pages for `/chatgpt-ads-agency` (`ChatgptAdsAgencyPage.tsx`) and its `/chatgpt-ads-agency/blog` & `/chatgpt-ads-agency/education` sub-routes (`ChatgptAdsSubPage.tsx`) with scoped styles (`src/styles/chatgpt-ads.css`), interactive 4-industry AI answer/ad switcher (`Bakery`, `Interiors`, `Wedding venue`, `B2B software`), and interactive service & visibility audit dialog.
- **1:1 Live Fidelity Rebuilds for `AI-Agent`, `Blog`, `About Us` & `Contact Us`**:
  - Rebuilt `src/pages/AIAgentPage.tsx` (`/ai-agent-development-services`) 1:1 with live `https://www.eon8.com/ai-agent-development-services/` (royal-blue split hero, 19 tech stack badges, case study metrics, FAQ accordion, `<NftCalendlyWidget />`, and `#nft-form`).
  - Rebuilt `src/pages/AIVideoPage.tsx` (`/ai-video-creation`) 1:1 with live `https://www.eon8.com/ai-video-creation/` (equalizer player hero, sticky service showcase, interactive `Our Work` `<video>` slider, vector SVG icon set, single-open FAQ accordion, `<NftCalendlyWidget />`, and `#nft-form`).
  - Rebuilt `src/pages/blog/BlogListPage.tsx` (`/blog`, `/blog/page/:pageNum`, `/category/:categorySlug`) and `src/pages/blog/BlogPostPage.tsx` (`/blog/:slug`, `/:slug`) 1:1 with live `https://www.eon8.com/blog/` (`page_title_wrap` banner, 20-card `.bdpp-post-grid-wrap` 3-column archive with author `Aanya`, numbered pagination, `.sin_meta` post bar, and 22-category + 7-recent-post `.post-sidebar`).
  - Rebuilt `src/pages/AboutPage.tsx` (`/about-us`, `/about`) and `src/pages/ContactPage.tsx` (`/contact`) 1:1 with live `https://www.eon8.com/about-us/` and `https://www.eon8.com/contact/` (`src/styles/ai-core-blog-pages.css`), including `12 + 4 = 16` math-quiz validation and Google Maps embed.

---

## [2.1.0] - 2026-11-16

### Added
- **100% Pure TypeScript & React TSX Migration Across Entire Codebase**:
  - Migrated all **34 remaining WordPress & Elementor landing pages** (`best-seo-agency`, `d2c-branding-and-growth-agency`, `seo-by-industry`, `amazon-marketing-service-agency-chennai`, `amazon-seo-consultants`, `amazon-seo-consultant-service-chennai`, `nft-influencer-marketing-agency`, `nft-instagram-marketing-agency`, `performance-marketing-agency`, `performance-marketing-funnel`, `home-new`, industry SEO & ORM landing pages, etc.) into lazy-loaded, strongly typed TypeScript modules under `src/pages/services/data/` (`ALL_SERVICE_SLUGS` = **71 routes**) with scoped CSS in `src/styles/services-pages.css`.
  - Added interactive React widgets for `.elementor-tabs` (`ServicesElementorTabs`), `proposal-4` & `influencer-8` math-quiz forms (`ServicesFormWidget.tsx`), Calendly discovery slot booking (`NftCalendlyWidget`), and repaired the legacy broken shortcode on `/seo-by-industry` with a working React audit callback form.
  - Converted all **169 WordPress blog articles** and blog index metadata into strongly typed TypeScript modules (`src/pages/blog/posts/*.ts`, `src/pages/blog/posts/index.ts`, `src/pages/blog/blogIndexData.ts`) rendered as native React JSX via `<ServiceNodeList />` in `src/pages/blog/BlogPostPage.tsx`.
  - Converted `packagesData` (`src/pages/packagesData.ts`), `policyPagesData` (`src/pages/policy/policyPagesData.ts`), and the XML sitemap generator (`scripts/generate-sitemap.ts`) to strict TypeScript.

### Fixed
- **Broken Internal Links on `HomePage.tsx` & Route Aliases (`src/App.tsx`)**:
  - Updated 4 legacy links on `HomePage.tsx` to canonical routes (`/web-design-development-services-chennai`, `/ppc-company-chennai`, `/digital-marketing-agency-in-chennai`) and added route aliases for `/web-development-services-company`, `/google-ads-management-ppc-agency`, and `/digital-marketing-services-chennai`.

### Removed
- Removed `src/pages/LiveTemplatePage.tsx`, `src/data/` (all 113 raw HTML/CSS `livePages/*.json` blobs, `liveRoutes.json`, all 169 HTML `blogPosts/*.json` blobs, `blogIndex.json`), `scripts/generate-sitemap.js`, and every remaining `dangerouslySetInnerHTML` usage across `src/`.

---

## [2.0.0] - 2026-11-16

### Added
- **Pure-React `Our Services` Mega-Menu Suite (`src/pages/services/`)**:
  - Migrated all **37 WordPress & Elementor `Our Services` routes** into lazy-loaded, strongly typed pure React TSX pages (`OurServicesPage.tsx`, `ServiceNodeRenderer.tsx`, `ServicesFormWidget.tsx`, `ServicesAccordions.tsx`, `ServicesCarousels.tsx`, `ServicesSmartLink.tsx`, `ServicesPageShell.tsx`) alongside native `SoftwarePage.tsx` (`erp-software-development`, `crm-software-development`), `PackagesPage.tsx`, and `WorksPage.tsx`.
  - Covers all **7 mega-menu categories** (`Digital Marketing Agency`, `Social Media Marketing`, `ORM Services`, `Pay-Per-Click`, `App Marketing`, `AR/VR Brand Innovation`, and `Metaverse Solutions`).
  - Built slug-isolated stylesheet `src/styles/services-pages.css` with Elementor post CSS support, shared ASO/App Marketing layout rules, custom hero gradients, infinite logo marquees, interactive card & quote carousels, and responsive breakpoints (`375px`, `768px`, `1440px`).
- **Pure-React `NFT`, `Discord` & `Community` Suite (`src/pages/nft/`)**:
  - Migrated all **21 canonical NFT menu routes** (+ `nft-game-marketing-agency` alias) into pure React TSX components (`NftServicePage.tsx` for 19 WP service templates and `ElementorNftPage.tsx` for `reddit-community-marketing-agency` & `discord-community-building-services`).
  - Added interactive consultation modal (`NftConsultationModal.tsx`), `#nft-form` / `#responsive-form` lead forms (`NftForms.tsx`), Calendly booking widget (`NftCalendlyWidget.tsx`), testimonial slider, pricing matrices, roadmaps, and dual-theme FAQ accordions with scoped CSS (`src/styles/nft-pages.css`).
- **Pure-React `Influencer` Suite (`src/pages/influencer/`)**:
  - Built dedicated 1:1 pure React TSX pages for all **5 Influencer menu routes** (`InfluencerMarketingAgencyPage.tsx`, `InstagramInfluencerPage.tsx`, `ElementorInfluencerPage.tsx` for TikTok & YouTube, and `TwitterInfluencerPage.tsx`) with `src/styles/influencer-pages.css`.
- **Pure-React `Crypto` Suite (`src/pages/crypto/`)**:
  - Built dedicated 1:1 pure React TSX pages for all **14 Crypto menu routes** (+ `crptocurrency-marketing-agency` alias) via `CryptoMarketingAgencyPage.tsx`, `CryptoServicePage.tsx`, and `IeoListingPage.tsx` with `src/styles/crypto-pages.css`.
- **Core Brand, AI, Software, Portfolio, Packages & Blog Suite**:
  - Rebuilt 1:1 native React pages for `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `AIAgentPage.tsx`, `AIVideoPage.tsx`, `SoftwarePage.tsx` (CRM & ERP), `WorksPage.tsx`, `CaseStudyPage.tsx` (`poorvika`, `cake-square`, `hidden-secret`), `PackagesPage.tsx` (SEO, PPC, Facebook, Instagram, LinkedIn, Twitter), `PolicyPage.tsx`, `BlogListPage.tsx`, and `BlogPostPage.tsx` (169 WordPress blog posts).
  - Localized media assets under `public/wp-content/` and generated `public/sitemap.xml` covering all **301 canonical URLs**.

### Changed
- **Navigation (`src/components/Navbar.tsx` & `src/components/Footer.tsx`)**:
  - Aligned desktop mega-menus and mobile drawer navigation 1:1 with `https://www.eon8.com/` across `AI-Agent`, `Crypto`, `Influencer`, `NFT`, and `Our Services`, converting all internal links to React Router `<Link>` navigation.
- **Routing (`src/App.tsx` & `src/data/liveRoutes.json`)**:
  - Wired explicit code-split React routes for all primary navigation menus (`Crypto`, `Influencer`, `NFT`, `Our Services`, `AI-Agent`, `Blog`, `About Us`, `Contact Us`), retaining `LiveTemplatePage.tsx` only for remaining non-menu legacy landing slugs.

### Removed
- Removed obsolete placeholder data/page stubs (`src/pages/crypto/cryptoPagesData.ts`, `src/pages/influencer/InfluencerServicePage.tsx`, `src/pages/influencer/influencerPagesData.ts`, `src/pages/nft/nftPagesData.ts`, and `src/pages/digital/`) and unused `src/App.css`.

---

## [1.1.0] - 2026-09-29

### Added
- Initial multi-page Eon8 React Router architecture, Zustand theme/modal store, Blog hub & article reader, Legal policy suite, and automated XML sitemap generator (`scripts/generate-sitemap.js`).
