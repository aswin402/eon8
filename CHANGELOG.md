# Changelog

All notable changes to the **Eon8 Website** (`eon8website`) React + TypeScript application are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
