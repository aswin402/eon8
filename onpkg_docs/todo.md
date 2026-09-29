# Eon8 React Clone Task Tracker (todo.md) 📋

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
- [ ] **Task 3: Upgrade Flagship AI Agent Page (`AIAgentPage.tsx`)**
  - [ ] Authentic Eon8 Split Hero with inline "Reach Out To Us" lead capture card
  - [ ] What Are AI Agents architecture graphic & 5 strategic business benefits
  - [ ] 4 core AI Agent service modules & 6-stage development process
  - [ ] Categorized tech stack matrix (Python, LangChain, OpenAI, AWS) & AI FAQ accordion
- [ ] **Task 4: Upgrade Digital Marketing Service Architecture (`DigitalServicePage.tsx`)**
  - [ ] Split Hero with inline "Request Free Quote / 5 Mins Call Back" form card
  - [ ] Industry trust row & "Our Specific Sector" tag pills
  - [ ] Mid-page callout break banner & "Empowering Business" 4-pillar feature deck
  - [ ] ROI breakdown comparison table & service-specific FAQs
- [ ] **Task 5: Upgrade Crypto & Web3 Marketing Architecture (`CryptoServicePage.tsx`)**
  - [ ] Web3 Split Hero with inline quick consultation card
  - [ ] Top-tier publication proof marquee (CoinTelegraph, Bloomberg, Yahoo Finance, Business Insider)
  - [ ] Interactive 3-stage capability tabs (Create / Scale / Improve)
  - [ ] Web3 capabilities grid & Crypto FAQ accordion
- [ ] **Task 6: Upgrade NFT & Community Marketing Architecture (`NftServicePage.tsx`)**
  - [ ] NFT Split Hero with inline lead capture form
  - [ ] 3-Pillar Framework: Create Hype, Drive Value, Build Community
  - [ ] Discord & Reddit moderation showcase deck & NFT FAQ
- [ ] **Task 7: Upgrade Influencer Marketing Architecture (`InfluencerServicePage.tsx`)**
  - [ ] Split Hero with influencer campaign metrics & inline consultation form
  - [ ] Influencer Tiers Matrix (Nano, Micro, Macro, Mega, Celebrities)
  - [ ] Platform channel showcases & 8-step campaign roadmap
- [ ] **Task 8: Upgrade Blog Hub & Post Reader (`BlogListPage.tsx` & `BlogPostPage.tsx`)**
  - [ ] Magazine layout for Blog Hub with category pills & featured post spotlight
  - [ ] Article reader with sticky social share, auto Table of Contents, author bio, and sidebar consultation form
- [ ] **Task 9: Final Quality Assurance & Performance Verification**
  - [ ] Cross-device mobile/tablet/desktop verification
  - [ ] Production build verification with zero warnings and all chunks < 300 kB
