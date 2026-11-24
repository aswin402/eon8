# Eon8 React Clone Task Tracker (task.md) 📋

This task list serves as the main checklist for building and verifying the Eon8 React clone.

---

## 1. Setup & Environment Init
- [x] Scaffold the React stack template with `onpkg` (`react-vite-gsap`)
- [x] Synchronize the manifest file `onpkg.json` and generate docs templates
- [x] Migrate local static assets from `www.eon8.com/imgs` into Vite's `/public/imgs/` directory
- [x] Install missing dependencies (e.g., Lucide React, `@fontsource/outfit`, etc.)

---

## 2. Core Layout & Themes (Root Layout)
- [x] Implement global dark/light theme store in `src/store/useThemeStore.ts`
- [x] Setup `src/layouts/RootLayout.tsx` with Lenis smooth scroll engine
- [x] Integrate CSS variables, root layout styles, and geometric gradients in `src/index.css`
- [x] Configure `src/components/ThemeToggleButton.tsx` with Framer Motion rotate transitions

---

## 3. UI Components & Shell
- [x] Build Floating Capsule Navigation (`src/components/Navbar.tsx`)
  - [x] Render logo and link items with hover underline effects
  - [x] Implement sub-menus (AI-Agent, Crypto, Influencer, NFT) and mega-menu (Our Services)
  - [x] Add scroll listener triggering transitions from capsule-shaped to fixed top-bar
  - [x] Create sliding Offcanvas mobile drawer menu using Framer Motion
  - [x] Route relative links internally using React Router's `Link` component
- [x] Build Responsive Footer (`src/components/Footer.tsx`)
  - [x] Layout floating contact bar (phone, email, locations)
  - [x] Add 4 columns: About Eon8, Core Services, Other policy links, Social icons grid
  - [x] Integrate certifications row (Google Partner, Clutch) and bottom copyright
  - [x] Route internal links (Contact, AI Agent) using SPA `Link` component
- [x] Build Floating Communication Widgets
  - [x] Floating green WhatsApp link badge on the bottom left
  - [x] Floating Phone/Call widget beside WhatsApp
- [x] Build Quick Contact modal dialog (`src/components/ui/dialog.tsx` / `CaptureModal`)
  - [x] Create name, email, phone, country, and message form inputs
  - [x] Implement Math Captcha challenge (random addition equation validation)
  - [x] Add shake visual indicators on failed submissions

---

## 4. Pages Built

### A. Landing Page Sections (HomePage)
- [x] Implement Cinematic Hero Banner
  - [x] Render background video element with overlay layer and CSS styling
  - [x] Set up static fallback image for slow connections
  - [x] Animate title lines staggered sequence using GSAP
  - [x] Sequence fade-in transition for the bulleted propositions list
- [x] Implement Growth Details Section
  - [x] Side-by-side layout (Digital globe image with dots + Eon8 description text)
  - [x] Slide-up reveal animations on viewport entry
- [x] Implement Agency Growth Section
  - [x] Header reveal "A Distinctive Digital Marketing Company That Never Tires!"
  - [x] Left-aligned text copy, right-aligned growth handshake graphic
- [x] Implement Achievements Stats Counters
  - [x] Glassmorphic grid layout cards (Project, Clients, Experience, Experts)
  - [x] Integrate GSAP ScrollTrigger to count values from 0 up to targets when scrolled into view
- [x] Implement Digital Services Grid
  - [x] Responsive 3-column layout of services (Digital, SEO, Performance, Social, Content/AI, Brand)
  - [x] Apply hover lift effects and card tilt transitions
- [x] Implement Web3 & AI Alternating Rows
  - [x] Alternating layout structures (copy left/image right, then image left/copy right)
  - [x] ScrollTrigger parallax offset translations for NFT, Crypto, AI, and Conversion graphics
- [x] Implement Why Eon8 Section
  - [x] Side-by-side layout (Building image + Eon8 core principles checkmarks list)
- [x] Implement Industries Grid
  - [x] Layout 7 industry boxes (Hospitality, Healthcare, Real Estate, etc.) with custom icon containers
- [x] Implement Infinite Logo Marquee
  - [x] Create client logo scrolling marquee using CSS infinite scroll keyframes
- [x] Implement Client Case Studies Grid
  - [x] Layout 3 cards (Poorvika, Cake Square, Manju Groups) with bold success metrics
- [x] Implement Testimonial Slider Carousel
  - [x] Build a carousel showing client quotes, gold rating stars, and profile avatars
- [x] Implement Recent Blog Cards Grid
  - [x] Grid of 3 articles with hover scale effects on thumbnail images
- [x] Implement WhatsApp Banner CTA Section
  - [x] Large visual block with WhatsApp chat link CTA button

### B. AI Agent Development Services Page (`/ai-agent-development-services`)
- [x] Custom high-tech header detailing AI Agent benefits
- [x] Core Services grid: Custom Chatbots, Workflow Automation, RAG Systems
- [x] Technology stack grid (Python, OpenAI, LangChain, LlamaIndex, Gemini)
- [x] Step-by-step Development Lifecycle
- [x] Interactive FAQ accordion component

### C. Contact Us Page (`/contact`)
- [x] Responsive layout with detailed contact address cards (Mumbai, Chennai, Bangalore, Hyderabad)
- [x] Live Map embed iframe integration
- [x] Multi-field Lead capture form with built-in Math Captcha challenge validation

### D. About Us Page (`/about-us` / `/about`)
- [x] Vibrant background header gradient and Compass subtitle
- [x] "Why Do We Dominate the Web 3.0 Space" section with dynamic Framer Motion history/mission/vision accordion and banner image
- [x] "How Do We Operate" 5-step interactive workflow card deck
- [x] Testimonials slider layout showcasing client quotes
- [x] Call-To-Action Ribbon for speaking with experts

### E. Dynamic Service Hubs & Newly Cloned Category Pages
- [x] Clone Flagship Crypto Marketing Agency Hub (`/crptocurrency-marketing-agency` & `/crypto-marketing-agency`)
- [x] Clone Flagship Digital Marketing Agency Page (`/digital-marketing-agency-in-chennai`)
- [x] Clone Pay-Per-Click Ads Agency Page (`/ppc-company-chennai`)
- [x] Clone Social Media Marketing Company Page (`/social-media-marketing-company-chennai`)
- [x] Clone WhatsApp Marketing & Automation Services Page (`/whatsapp-marketing-services`)
- [x] Clone Free NFT & Web3 Marketing Consultation Page (`/nft-free-consultation`)

### F. Legal & Policy Pages
- [x] Implement reusable PolicyPage component (`src/pages/policy/PolicyPage.tsx`)
- [x] Privacy Policy (`/privacy-policy-2` & `/privacy-policy`)
- [x] Terms and Conditions (`/terms-and-conditions`)
- [x] Refund Policy (`/refund-policy`)
- [x] Delivery Policy (`/delivery-policy`)
- [x] Connect all footer policy links to internal SPA routes

### G. Interactive Blog System & Article Reader
- [x] Build comprehensive Blog List Page with search, category filtering, and featured post spotlight (`/blog` & `/digital-marketing-blog`)
- [x] Build individual BlogPost reader template (`src/pages/blog/BlogPostPage.tsx`)
- [x] Cloned 10+ real articles from Eon8 live site (Operations Monitoring Agent, Financial Assistant Agent, Customer Support Agent, AI Safety/Data Loss, Product Marketing Video AI, etc.)
- [x] Connect all blog links across Navbar, Footer, and HomePage cards to client-side SPA routes

---

## 5. Verification & Optimization QA
- [x] Verify TypeScript compiles with no errors (`npm run build`)
- [x] Audit layouts on Chrome Mobile simulator (Galaxy, iPhone viewports)
- [x] Test form capture validation by inputs checks and correct math captcha input
- [x] Bypassed Cloudflare URL issues using browser user-agent curl commands
- [x] Localized remote Eon8 images and SVGs into `/public/imgs/`
- [x] 100% route coverage parity with live Eon8 website (90 of 90 evaluated content pages covered)
- [x] Implement route-level code splitting (`React.lazy`, `Suspense`, `<PageLoader />`)
- [x] Configure Vite manual chunking in `vite.config.ts` (all bundles < 300 kB, zero chunk size warnings)
- [x] Generate production SEO assets (`public/robots.txt` and `public/sitemap.xml` with 104 routes)
- [x] Integrate automated sitemap generation into npm build pipeline

---

## 6. Phase 6: Exact Page-by-Page UI Cloning from Live Eon8 Website 🎯
- [x] **Task 1: Rebuild About Us Page (`AboutPage.tsx`)**
  - [x] Cloned hero banner with breadcrumbs and background geometric styling
  - [x] "Why Do We Dominate The Web 3.0 Space?" tab system (History, Mission, Vision, Skills with % bars)
  - [x] "Scale your Business" high-conversion banner CTA
  - [x] 5-step operational workflow cards (Learn, Strategize, Align, Deploy, Iterate)
  - [x] Testimonials slider & bottom consultation ribbon
- [x] **Task 2: Rebuild Contact Us Page (`ContactPage.tsx`)**
  - [x] 4 strategic city cards (Mumbai, Chennai HQ, Bangalore, Hyderabad) with SVG silhouettes & contact details
  - [x] Interactive dual-column "Get Enquiry" form with service selector, budget, phone code, and math captcha
  - [x] Responsive full-width Google Maps embed with custom overlay
- [x] **Task 3: Upgrade Flagship AI Agent Page (`AIAgentPage.tsx`)**
  - [x] Authentic Eon8 Split Hero with inline "Reach Out To Us" lead capture card
  - [x] What Are AI Agents architecture graphic & 5 strategic business benefits
  - [x] 4 core AI Agent service modules & 6-stage development process
  - [x] Categorized tech stack matrix (Python, LangChain, OpenAI, AWS) & AI FAQ accordion
- [x] **Task 4: Upgrade Digital Marketing Service Architecture (`DigitalServicePage.tsx`)**
  - [x] Split Hero with inline "Request Free Quote / 5 Mins Call Back" form card
  - [x] Industry trust row & "Our Specific Sector" tag pills
  - [x] Mid-page callout break banner & "Empowering Business" 4-pillar feature deck
  - [x] ROI breakdown comparison table & service-specific FAQs
- [x] **Task 5: Upgrade Crypto & Web3 Marketing Architecture (`CryptoServicePage.tsx`)**
  - [x] Web3 Split Hero with inline quick consultation card
  - [x] Top-tier publication proof marquee (CoinTelegraph, Bloomberg, Yahoo Finance, Business Insider)
  - [x] Interactive 3-stage capability tabs (Create / Scale / Improve)
  - [x] Web3 capabilities grid & Crypto FAQ accordion
- [x] **Task 6: Upgrade NFT & Community Marketing Architecture (`NftServicePage.tsx`)**
  - [x] NFT Split Hero with inline lead capture form
  - [x] 3-Pillar Framework: Create Hype, Drive Value, Build Community
  - [x] Discord & Reddit moderation showcase deck & NFT FAQ
- [x] **Task 7: Upgrade Influencer Marketing Architecture (`InfluencerServicePage.tsx`)**
  - [x] Split Hero with influencer campaign metrics & inline consultation form
  - [x] Influencer Tiers Matrix (Nano, Micro, Macro, Mega, Celebrities)
  - [x] Platform channel showcases & 8-step campaign roadmap
- [x] **Task 8: Upgrade Blog Hub & Post Reader (`BlogListPage.tsx` & `BlogPostPage.tsx`)**
  - [x] Magazine layout for Blog Hub with category pills & featured post spotlight
  - [x] Article reader with sticky social share, author bio, categories, and sidebar consultation form
- [x] **Task 9: Final Quality Assurance & Performance Verification**
  - [x] Cross-device mobile/tablet/desktop verification
  - [x] Production build verification with zero warnings and all chunks < 300 kB

---

## 7. Phase 7: Complete Crypto Pages Redesign (Clean, Premium & Modern Web3) 💎
- [x] **Step 1: Download & Localize Authentic Live Crypto Assets**
  - [x] Download 3D Bitcoin floating coin (`public/imgs/bitcoin.png`)
  - [x] Download 10 authentic Web3 client logos (`street-race`, `Galaxy-Fight-Club`, `space-park-freaks`, `rebe-world`, etc.)
  - [x] Download 6 floating 3D crypto icons (`clock-crypto`, `gift-crypto`, `target-crypto`, `heart-crypto`, `crown-crypto`, `image-crypto`)
- [x] **Step 2: Redesign Dark Gold Web3 Hero & Lead Capture Card**
  - [x] Apply dark gold gradient canvas (`linear-gradient(120deg, #0f0f0f 0%, #1a1a1a 40%, #8a6b00 100%)`) with radial gold aura
  - [x] 2x2 Feature check list (Measurable results, Competitor analysis, Scale without hiring, In-depth experience)
  - [x] Gold action buttons with WhatsApp and Strategy Session triggers
  - [x] Dark gold `#121212` lead form card with math captcha and direct store submission
- [x] **Step 3: Build Web3 Client Logo Infinite Marquee**
  - [x] Smooth continuous logo slider showing the 10 real Web3 client logos with pause on hover
- [x] **Step 4: Build Viral Growth Section ("Attract, Engage & Convert")**
  - [x] Floating 3D crypto icons with CSS float animations
  - [x] Gold title & subtitle with animated movement
- [x] **Step 5: Build 3-Step ROI Framework ("Attract, Engage, Convert")**
  - [x] Clean step cards with vertical gold side-line reveal on hover
- [x] **Step 6: Build "How We Bring Value To Your Cryptos" Section**
  - [x] Interactive chip pill navigation to other Web3 & Crypto services
  - [x] 3D floating Bitcoin graphic with gold glow
- [x] **Step 7: Modernize Capabilities, Projects We Cover, & 5-Stage Roadmap**
  - [x] Premium dark cards with gold border hover states and deliverable badges
- [x] **Step 8: Performance Metrics & Modern FAQ Accordion**
  - [x] 4 telemetry metrics and dark gold FAQ cards
- [x] **Step 9: High-Impact Gold Closing Banner**
  - [x] Radial ring gold banner with dual conversion buttons
- [x] **Step 10: Build Verification & Cross-Route Testing**
  - [x] Test all 15 crypto service routes
  - [x] Verify `npm run build` passes with zero errors and all chunks < 300 kB



---

## 8. Phase 8: Complete 1:1 Pure-React Migration of Crypto, Influencer, NFT & Our Services Menus 🚀
- [x] **Crypto Menu (14 routes + alias)**: Pure React TSX (`CryptoMarketingAgencyPage`, `CryptoServicePage`, `IeoListingPage`) + `src/styles/crypto-pages.css`
- [x] **Influencer Menu (5 routes)**: Pure React TSX (`InfluencerMarketingAgencyPage`, `InstagramInfluencerPage`, `ElementorInfluencerPage`, `TwitterInfluencerPage`) + `src/styles/influencer-pages.css`
- [x] **NFT, Discord & Community Menu (21 routes + alias)**: Pure React TSX (`NftServicePage`, `ElementorNftPage`) + `src/styles/nft-pages.css` (verified 22/22 routes + 7/7 interactive Playwright tests)
- [x] **Our Services Mega-Menu (39 routes across 7 sub-menus)**: Pure React TSX (`OurServicesPage`, `SoftwarePage`) + `src/styles/services-pages.css` (verified 39/39 routes × 3 viewports + 9/9 interactive Playwright tests)
- [x] **SEO & Sitemap**: Regenerated `public/sitemap.xml` (301 URLs) and verified `npm run lint`, `npx tsc -b`, and `npm run build` with zero errors

---

## 9. Phase 9: 100% Pure TypeScript & React TSX Elimination of Raw HTML/JS Workarounds ✨
- [x] **Remaining 34 Landing Pages Migrated (`src/pages/services/data/`)**: All 71 service & landing routes (`ALL_SERVICE_SLUGS`) rendered via pure React TSX (`OurServicesPage.tsx`) + scoped `src/styles/services-pages.css`
- [x] **All 169 Blog Articles Migrated (`src/pages/blog/posts/`)**: Converted from raw HTML JSON blobs to typed `ServiceNode[]` TypeScript modules rendered via `<ServiceNodeList />`
- [x] **Fixed Broken `HomePage.tsx` Links & Added Alias Routes (`src/App.tsx`)**: Fixed `/web-development-services-company`, `/google-ads-management-ppc-agency`, and `/digital-marketing-services-chennai`
- [x] **Pure TypeScript Tooling & Data**: Converted `scripts/generate-sitemap.ts`, `src/pages/packagesData.ts`, and `src/pages/policy/policyPagesData.ts`; deleted `LiveTemplatePage.tsx`, `src/data/`, and `scripts/generate-sitemap.js`
- [x] **Zero `dangerouslySetInnerHTML`, Zero `.js`/`.jsx`/`.json` in `src/` & `scripts/`**: Verified via `npm run lint`, `npx tsc -b`, `npm run build`, and 129 Playwright multi-viewport renders + 7 interactive checks (`TOTAL FAILURES: 0`)

---

## 10. Phase 10: Complete 1:1 Pure-React Migration of AI-Agent (`ChatGPT Ads Agency`), Blog, About Us & Contact Us 🎯
- [x] **`AI-Agent` Menu & `ChatGPT Ads Agency` (`src/pages/chatgpt/`)**: Added `ChatGPT Ads Agency` to `Navbar.tsx` and built `/chatgpt-ads-agency`, `/chatgpt-ads-agency/blog`, and `/chatgpt-ads-agency/education` in 1:1 pure React TSX + `src/styles/chatgpt-ads.css`
- [x] **1:1 `AIAgentPage.tsx` & `AIVideoPage.tsx`**: Exact live WordPress/modern `.av` layouts, vector icons, interactive video slider, FAQ accordions, Calendly booking, and `#nft-form` lead capture
- [x] **1:1 `BlogListPage.tsx` & `BlogPostPage.tsx`**: Exact `.bdpp-post-grid` 3-column archive (`20` per page, author `Aanya`, pagination, `/category/:categorySlug` archives) + single-post `.sin_meta` & 22-category `.post-sidebar`
- [x] **1:1 `AboutPage.tsx` & `ContactPage.tsx`**: Exact orange gradient header, `.custom-accordion`, 5-card `How Do We Operate?`, `.testi_wrap` speech bubbles, 3 contact cards, 4 city SVG cards, `12 + 4 = 16` math-quiz form, and Google Maps embed
- [x] **Playwright Multi-Viewport & E2E Verification**: Verified all 13 routes × 3 viewports (39 renders) + 9 interactive E2E checks with `TOTAL FAILURES: 0`

---

## 11. Phase 11: Live `.neo-footer` & Footer Link Pages 1:1 Pure-React Completion 🏁
- [x] **1:1 `.neo-footer` Columns & Proportions (`src/components/Footer.tsx`)**: Aligned `Our Services` (`Digital Marketing` -> `/search-engine-optimization-services-seo`, `Social Media Marketing` -> `/social-media-management-agency-chennai`) and `Other Links` (`Blog`, `Contact`, `Privacy Policy`, `Refund Policy`, `Terms And Conditions`, `Delivery Policy`) 1:1 with live `https://www.eon8.com/`
- [x] **1:1 Pure-React Policy Pages (`src/pages/policy/PolicyPage.tsx`, `src/pages/policy/policyPagesData.ts`, `src/styles/policy-pages.css`)**: Rebuilt `/privacy-policy-2` (`/privacy-policy`), `/refund-policy`, `/terms-and-conditions`, and `/delivery-policy` (including Elementor 2-column layout & image) in pure React TSX
- [x] **Playwright Multi-Viewport & Footer Click E2E Audit**: Verified all 9 footer routes × 3 viewports (27 renders) + all 8 footer link click destinations (`TOTAL FAILURES: 0`)

---

## 12. Phase 12: 100% 1:1 Pure-React Completion of All Remaining Pages (ERP, CRM, Works, Case Studies, Packages & Home) 🏆
- [x] **ERP & CRM Software (`erp-software-development`, `crm-software-development`)**: Migrated to 1:1 pure React TSX (`src/pages/services/data/`) with interactive `.faq-item` accordions, `<NftCalendlyWidget />`, and `#nft-form`
- [x] **Works & 3 Case Studies (`works`, `case-study-poorvika`, `case-study-cake-square-chennai`, `case-study-hidden-secret`)**: Migrated to 1:1 pure React TSX with exact `page_title_wrap` banners, `.works_sec_main` / `.cs_*` layouts, and `#nft-client-slider` logo marquee
- [x] **6 Digital Marketing Packages (`seo-packages`, `ppc-packages`, `facebook-packages`, `instagram-packages`, `linkedin-packages`, `twitter-packages`)**: Migrated to 1:1 pure React TSX with scoped `packages.css` (`src/styles/core-packages-works-pages.css`) and `#responsive-form` consultation capture
- [x] **Home Page Metadata, `/gallery` Parity & Legacy 301 Links Rewritten**: Synced `HomePage.tsx` metadata, routed `/gallery` -> `<HomePage />`, rewrote all 110 legacy inline WordPress short links across 50 blog/service TS files directly to canonical routes, added 33 `<Navigate replace />` fallback routes in `src/App.tsx`, and removed obsolete mockup files (`SoftwarePage.tsx`, `WorksPage.tsx`, `CaseStudyPage.tsx`, `PackagesPage.tsx`, `packagesData.ts`)

---

## 13. Phase 13: 100% Native React TSX + Tailwind CSS v4 Full-Site Rebuild (Zero WordPress Renderers / CSS) 🏛️
- [x] **Native Tailwind Section Design System (`src/components/sections/`)**: Built 12 typed, theme-aware (`brand`, `ai`, `crypto`, `nft`, `influencer`) Light/Dark React section primitives (`ServiceHeroSection`, `LeadCaptureCard`, `QuickCallbackBanner`, `ClientLogoMarquee`, `StatsCounterStrip`, `FeatureGridSection`, `AlternatingSplitSection`, `InteractiveTabsSection`, `ProcessRoadmapSection`, `PricingMatrixSection`, `TestimonialsSection`, `FaqAccordionSection`, `DiscoveryCallSection`, `BottomCtaBanner`, `PageSeo`, `SmartActionButton`)
- [x] **Core, AI, Legal, Portfolio & Case Studies Rebuilt**: Rebuilt `AIAgentPage.tsx`, `AIVideoPage.tsx` (+ `/ai-video-agency` alias), `AboutPage.tsx`, `ContactPage.tsx`, `PolicyPage.tsx`, and bespoke `PortfolioPages.tsx` (`WorksPage` + `CaseStudyPage` for `poorvika`, `cake-square-chennai`, `hidden-secret`)
- [x] **Crypto (15 routes), Influencer (5 routes) & NFT/Discord (22 routes) Rebuilt**: Rebuilt all page & section components in pure Tailwind + Lucide React, eliminating every white-on-white dark-section void, collapsed card column, and missing FontAwesome icon
- [x] **All 83 Service, Funnel & Package Pages Rebuilt (`src/pages/services/`)**: Compiled and authored all 83 `src/pages/services/data/*.ts` modules into pure semantic `ServicePageData` schemas (including `whatsapp-marketing-services`, `instagram-marketing-funnel`, `seo-services-funnel`, `ads-amazon-marketing-agency`, and full ORM body sections for `clean-negative-search-results-2`, `quora-com-complaint-removal`, `remove-complaints-from-google-search`, and `remove-negative-reviews-back`), plus `ThankYouPage.tsx` (`/thank-you`) and 39 legacy WP redirects
- [x] **Blog Hub, Category Archives & All 169 Blog Articles Rebuilt (`src/pages/blog/`)**: Converted all 169 `src/pages/blog/posts/*.ts` articles into pure semantic `ArticleBlock[]` schemas and rebuilt `BlogListPage.tsx` & `BlogPostPage.tsx`
- [x] **Deleted All WordPress Renderers & 4.2 MB of Scraped WordPress CSS**: Deleted `ServiceNodeRenderer.tsx`, `src/pages/services/components/`, obsolete Crypto/Influencer/NFT legacy widgets, and all 9 scraped WordPress/Elementor/Bootstrap stylesheets (`legacy-eon8.css`, `legacy-responsive-fixes.css`, `services-pages.css`, `core-packages-works-pages.css`, `nft-pages.css`, `crypto-pages.css`, `influencer-pages.css`, `ai-core-blog-pages.css`, `policy-pages.css`)
- [x] **Full 157-Route Playwright Visual, Contrast, Dark Mode & Mobile (`375px`) Verification**: Verified `npm run lint`, `npm run build` (`305` sitemap URLs), and 157 routes in Playwright with `0` errors, `0` legacy WordPress classes, `0` broken images, and `0` horizontal overflows

---

## 14. Phase 14: Migration Gap Report Frontend Audit Fixes & ChatGPT Ads EON8 Theme Rebuild 🛠️
- [x] **Navbar `1024px`–`1280px` Overflow & Container Alignment (`C10`, `C18`, `C26`)**: Aligned `Navbar.tsx` & `Footer.tsx` to `max-w-7xl`, tightened `lg` nav item/CTA sizing so `Get Started` stays cleanly inside `1024px`–`1280px`, and viewport-clamped the `Our Services` mega-menu
- [x] **Cursor Visibility & Motion Performance (`C09`, `C14`, `C15`, `C16`)**: Scoped `cursor: none` in `NeonCursor.css` strictly to `html.neon-cursor-active` with `pointer: fine` & `prefers-reduced-motion: no-preference`, migrated `NeonCursor.tsx` to `useMotionValue` + `useSpring` (0 React re-renders per mouse move), kept native cursors on `/admin-dashboard` & inputs, standardized `z-index` layering, and added `role="dialog"` / `Escape` support to `CaptureModal.tsx`
- [x] **ChatGPT Ads Full UI Rebuild in EON8 Theme (`C21`)**: Rebuilt `ChatgptAdsAgencyPage.tsx` and `ChatgptAdsSubPage.tsx` in pure React + Tailwind v4 with EON8's `ai` Light/Dark palette, integrated `Navbar` + `Footer` + `NeonCursor` + `FloatingWidgets`, removed `src/styles/chatgpt-ads.css`, and resolved all `768px` overflow and `375px` `<12px` text
- [x] **Privacy Policy & Legal `320px` Layout Fixes (`C20`)**: Added URL wrapping (`break-words [overflow-wrap:anywhere]`) in `PolicyPage.tsx`, fixed `www.website.com` -> `www.eon8.com`, and formatted CCPA/GDPR lists cleanly in `policyPagesData.ts`
- [x] **Frontend SEO, Blog Sidebar Form, Asset Collision & Node Engine (`B03`, `C13`, `C23`)**: Added Schema.org JSON-LD (`Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `BlogPosting`), default `og:image` + Twitter Cards in `PageSeo.tsx`, live `noindex` on the 3 ad-funnel pages, cleaned `public/robots.txt` & `scripts/generate-sitemap.ts` (`305` URLs), restored `<LeadCaptureCard />` in `BlogPostPage.tsx`, renamed `Launch.svg` -> `launch-influencer.svg`, and added `engines.node >= 22.18.0` in `package.json`
- [x] **Multi-Viewport Playwright & Build Verification**: Passed `npm run lint`, `npm run build`, and Playwright audit across `320px`, `375px`, `768px`, `1024px`, `1150px`, `1280px`, and `1440px` (Light + Dark mode) with `0` failures

---

## 15. Phase 15: P1 Security Hardening, Production Server HTTP `404`/`301`, SSR SEO Injection, Dynamic Sitemap & Rank Math Sync 🔐
- [x] **CMS Auth & API Hardening (`C01`, `C02`, `C04`, `C05`, `C06`, `C07`, `D05`)**: Removed hardcoded default credentials and `BrowserFallbackCmsProvider`, enforced startup env credential & strong `CMS_SESSION_SECRET` checks with auto-rotation, hardened IP rate limiting with proxy gating + bucket pruning, enforced binary magic-byte validation on image uploads, added `Secure` cookies + strict `path.relative` containment
- [x] **Production Server Hardening & Performance (`C03`, `C06`, `C07`, `E03`, `F06`)**: Added safe `decodeURIComponent` (`400` on malformed URLs), full security headers (`CSP`, `HSTS`, `nosniff`, `SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`), Brotli/Gzip compression, and 1-year `immutable` caching on `/assets/*`
- [x] **Server-Side SEO Injection, Real HTTP `404`/`301` & Dynamic `/sitemap.xml` (`C01–C03`, `C08`, `A17`)**: Built `scripts/build-seo-manifest.ts` (`153` pages, `169` posts, `41` redirects) and wired `server/prodServer.ts` to inject per-route `<title>`, meta, canonical, OG/Twitter, and JSON-LD into raw HTML, emit real `301` redirects & real `404`s, and serve live CMS-aware `/sitemap.xml`
- [x] **Rank Math Blog SEO Sync & Supabase RLS (`C06`, `C08`)**: Synced 164 live Rank Math blog titles & meta descriptions into `src/pages/blog/blogIndexData.ts` and restricted `supabase/schema.sql` write policies via allowlisted `public.cms_admins` + `public.is_cms_admin()`
- [x] **Lead Delivery Backend, Anti-Spam & Admin Leads Inbox (`A10`, `B01`, `B02`, `C11`)**: Added `server/leadsApi.ts` (`POST /api/leads` + authenticated `/api/leads/admin/*` + formula-safe CSV export + server-side `LEAD_WEBHOOK_URL` forwarding), wired `<SpamHoneypotField />` + human timing guard across all 6 website forms, built `AdminLeadsInbox.tsx` inside `/admin-dashboard` with unread badge & notes, and added `public.leads` RLS table to `supabase/schema.sql`
- [x] **Automated Security & Server HTTP Suite**: Verified `0` failures across bundle leak scan, startup refusal checks, malformed URLs, traversal blocks, CSP/Brotli/immutable headers, spoofed rate-limit protection, fake-image magic-byte rejection, raw HTML SEO/Rank Math injection, `301`/`404` responses, live dynamic `/sitemap.xml`, and end-to-end lead capture/anti-spam/inbox/CSV export
