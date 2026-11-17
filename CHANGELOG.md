# Changelog

All notable changes to the **Eon8 Website** (`eon8website`) React + TypeScript application are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
