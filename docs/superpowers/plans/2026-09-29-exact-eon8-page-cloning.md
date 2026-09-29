# Exact Eon8 Website Page-by-Page UI Cloning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild and elevate all secondary pages (About Us, Contact Us, AI Agent Development, Digital Marketing, Crypto/Web3, NFT, Influencer, and Blog) into 1:1 exact visual and functional clones of the live Eon8 website (`https://www.eon8.com/`), matching the production quality, authentic section layouts, interactive lead capture cards, publication proof bars, and brand aesthetics already achieved on the Home page.

**Architecture:** Component-driven, config-backed architecture utilizing React 19, Tailwind CSS v4, Framer Motion, and GSAP ScrollTrigger. Each page will mirror the exact sections, typography, interactive tab systems, and inline lead generation forms present on the live site, backed by verified data models in TypeScript with client-side SPA routing.

**Tech Stack:** React 19, TypeScript 6, Vite, Tailwind CSS v4, Framer Motion, GSAP & ScrollTrigger, Lucide React, Zustand.

## Global Constraints
- **Zero External Link Fallbacks:** All navigation, breadcrumbs, card buttons, and CTAs must route internally using React Router `<Link>` components or open modals.
- **Brand Fidelity:** Match Eon8's authentic color palette (Navy slate `#0b1120`, Vibrant Orange `#ff6b00`, Royal Indigo `#4f46e5`, Pure White), typography (Outfit / Inter / Palanquin Dark), and subtle card borders.
- **Performance & Splitting:** Maintain lazy-loaded route chunking where every code chunk remains under 300 kB and zero Vite build warnings occur.
- **Form Interactivity:** All inline hero lead generation forms must include input validation, error handling, and captcha challenges matching Eon8's consultation capture workflow.
- **Zero Breakages:** Maintain 100% route parity across all 90+ URLs mapped in `src/App.tsx`.

---

## Page-by-Page Tasks

### Task 1: Rebuild About Us Page (`/about-us` & `/about`)

**Reference:** `https://www.eon8.com/about-us/`

**Files:**
- Modify: `src/pages/AboutPage.tsx`
- Inspect: `src/components/Footer.tsx`, `src/components/Navbar.tsx`

**Key Sections on Live Eon8 About Us:**
1. **Hero Header**: "About Us" with breadcrumbs (`Home / About Us`), geometric background pattern, and agency intro summary.
2. **"Why Do We Dominate The Web 3.0 Space?"**:
   - Left side: Interactive Tab System with 4 tabs:
     - *Our History*: Detailed founding narrative, 18+ years milestone, evolution into Web3.
     - *Our Mission*: Empowering businesses to maximize ROI with data-driven creative strategies.
     - *Our Vision*: Becoming the global benchmark for transformative digital and decentralized growth.
     - *Our Skills*: Interactive animated progress bars (SEO & Organic Growth 95%, Web3 & Crypto Strategy 92%, Social Media & PR 90%, Conversion Rate Optimization 88%).
   - Right side: Branded visual graphic / handshake illustration with floating experience badge ("18+ Years Experience").
3. **Scale Your Business Banner**:
   - Vibrant high-contrast gradient callout: *"Looking to Scale your Business on Digital Platform? We are the transformative agency partner you can trust upon!"* with immediate "Talk to Our Strategists" CTA button.
4. **"How Do We Operate?" 5-Step Interactive Roadmap**:
   - Subtitle: *"EON8 has over 18 years of experience in preparing Web 3.0 brands for unprecedented success, while ensuring 57% ROMI."*
   - Step 01: **Learn** - In-depth brand discovery, competitor research, and market gap identification.
   - Step 02: **Strategize** - Custom multidimensional marketing blueprint formulation.
   - Step 03: **Align** - Channel synchronization across SEO, content, PR, and paid campaigns.
   - Step 04: **Deploy** - Agile execution with real-time conversion tracking.
   - Step 05: **Iterate** - Continuous A/B testing, data analysis, and ROI compounding.
5. **Client Proof & Testimonial Carousel**: Authentic client testimonials with ratings, company names, and verified avatars.
6. **Bottom Consultation Ribbon**: Full-width contact bar with telephone number (+91 90422 94007) and inquiry modal trigger.

- [x] **Step 1:** Fetch and audit live content and assets from `https://www.eon8.com/about-us/`.
- [x] **Step 2:** Refactor `src/pages/AboutPage.tsx` with the 6 authentic sections, Framer Motion tab transitions, and animated skill bars.
- [x] **Step 3:** Run `npm run build` and verify zero TypeScript or layout warnings.
- [x] **Step 4:** Test on mobile and desktop viewports.
- [x] **Step 5:** Commit changes (`feat(about): rebuild About Us page to match live eon8.com/about-us UI`).

---

### Task 2: Rebuild Contact Us Page (`/contact`)

**Reference:** `https://www.eon8.com/contact/`

**Files:**
- Modify: `src/pages/ContactPage.tsx`

**Key Sections on Live Eon8 Contact:**
1. **Hero Header**: "Contact EON8 Digital Marketing Agency" with subtitle *"Partner with India's leading digital marketing and Web3 agency to accelerate your brand's growth."*
2. **4 Strategic Presence Locations**:
   - Dedicated glassmorphism cards for:
     - **Mumbai Office**: Landmark address, direct phone, and contact email.
     - **Chennai (Headquarters)**: Cathedral Road address, direct phone, and map shortcut.
     - **Bangalore Office**: Koramangala tech corridor address, direct phone.
     - **Hyderabad Office**: Hitec City address, direct phone.
   - Each card featuring its authentic location SVG silhouette badge.
3. **Interactive "Get Enquiry" Consultation Form**:
   - Dual-column layout:
     - Left: Value propositions, response guarantee (*"5 Mins Call Back"*), direct WhatsApp button, and operational hours.
     - Right: High-conversion enquiry card with Full Name, Email, Phone with country code selector, Service Category Dropdown (SEO, Crypto, Web3, Influencer, ORM, PPC), Project Budget range, Message, and Math Captcha challenge.
4. **Full-Width Interactive Google Maps Embed**: Embedded coordinates centered on Eon8 Chennai Headquarters with custom styled overlay.
5. **Global Contact Strip**: Quick-dial phone link and direct email link.

- [x] **Step 1:** Audit live form fields and location details from `https://www.eon8.com/contact/`.
- [x] **Step 2:** Refactor `src/pages/ContactPage.tsx` with the 4 city cards, interactive enquiry form, and responsive map layout.
- [x] **Step 3:** Run `npm run build` to verify clean build.
- [x] **Step 4:** Test form validation, math captcha challenge, and mobile responsive behavior.
- [x] **Step 5:** Commit changes (`feat(contact): rebuild Contact page with exact Eon8 4-city cards and inquiry form`).

---

### Task 3: Upgrade Flagship AI Agent Page (`/ai-agent-development-services`)

**Reference:** `https://www.eon8.com/ai-agent-development-services/`

**Files:**
- Modify: `src/pages/AIAgentPage.tsx`

**Key Sections on Live Eon8 AI Agent Page:**
1. **Signature Eon8 Split Hero**:
   - Left: Headline *"AI Agent Development Services: Powering the Future of Intelligent Business Automation"*, value bullet tags, and consultation triggers.
   - Right: Integrated floating *"Reach Out To Us"* quick inquiry form card with 5-minute callback promise.
2. **"What Are AI Agents?" Deep Dive**:
   - Side-by-side architecture diagram graphic and technical explanation of autonomous goal-driven agents.
3. **5 Strategic Business Benefits**:
   - Grid cards: 1. Cost-Effective Automation, 2. Real-Time Customer Support, 3. Scalable Intelligence, 4. Data-Driven Decisions, 5. Omnichannel Integration.
4. **4 Core AI Agent Offerings**:
   - Interactive cards: Customizable AI Agent Service, Personalised AI Agents, AI Chatbot & Voice Agent Development, Domain-Specific AI Agents.
5. **6-Stage Development Lifecycle**:
   - Requirement Analysis &rarr; AI Strategy Planning &rarr; Model Selection & Training &rarr; Custom UI/UX Design &rarr; Deployment &rarr; Monitoring & Maintenance.
6. **Categorized Tech Stack Matrix**:
   - Programming (Python, TypeScript), Frameworks (LangChain, LlamaIndex, AutoGen, CrewAI), LLMs (OpenAI GPT-4o, Gemini Pro, Claude 3.5), Cloud & Vector DBs (AWS, GCP, Pinecone, Qdrant).
7. **Interactive AI FAQ Accordion & Closing Conversion Banner**.

- [x] **Step 1:** Extract exact copy, layout specs, and diagram assets from `https://www.eon8.com/ai-agent-development-services/`.
- [x] **Step 2:** Update `src/pages/AIAgentPage.tsx` with the signature split-hero lead form and 6-stage lifecycle.
- [x] **Step 3:** Run `npm run build` to verify clean bundle and typing.
- [x] **Step 4:** Commit changes (`feat(ai-agent): upgrade AI Agent page to exact Eon8 split-hero and lifecycle layout`).

---

### Task 4: Upgrade Digital Marketing Service Architecture (`DigitalServicePage.tsx`)

**Reference:** `https://www.eon8.com/digital-marketing-agency-in-chennai/` & sub-services

**Files:**
- Modify: `src/pages/digital/DigitalServicePage.tsx`
- Modify: `src/pages/digital/digitalPagesData.ts`

**Key Architectural Enhancements:**
1. **Eon8 Signature Split Hero**:
   - Left: Dynamic service headline, category breadcrumb badge, and bullet points.
   - Right: Interactive inline *"Request Free Quote / 5 Mins Call Back"* lead capture form card.
2. **Client Proof & Industry Trust Row**: Partner badges (Google Premier Partner, Meta Business Partner, Clutch Top Agency).
3. **"Our Specific Sector" Industry Tags**: Horizontal pill badges highlighting domains (E-commerce, Healthcare, Real Estate, SaaS, FinTech, Education).
4. **List of Services We Cover**: High-impact grid with hover lift, accent borders, and structured deliverables.
5. **Mid-Page Callout Break Banner**: *"Let’s get started. Request for free Proposal today — Connect with us right now!"* with instant quote CTA.
6. **"Empowering Business With Tailor-Made Services" Feature Deck**: 4 core pillars with metrics.
7. **"Why Choose EON8" Comparison Table / ROI Breakdown**: Clear metrics proving 3.8x average traffic growth.
8. **Interactive FAQ Accordion** tailored per service type.

- [ ] **Step 1:** Audit `https://www.eon8.com/digital-marketing-agency-in-chennai/` and sub-pages.
- [ ] **Step 2:** Refactor `DigitalServicePage.tsx` to include the split-hero lead capture card, partner trust bar, and callout break banner.
- [ ] **Step 3:** Verify all 25+ digital service routes render without error.
- [ ] **Step 4:** Run `npm run build` to verify clean build.
- [ ] **Step 5:** Commit changes (`feat(digital): upgrade DigitalServicePage layout with authentic Eon8 split-hero and proof elements`).

---

### Task 5: Upgrade Crypto & Web3 Marketing Architecture (`CryptoServicePage.tsx`)

**Reference:** `https://www.eon8.com/crptocurrency-marketing-agency/` & `https://www.eon8.com/crypto-pr-services/`

**Files:**
- Modify: `src/pages/crypto/CryptoServicePage.tsx`
- Modify: `src/pages/crypto/cryptoPagesData.ts`

**Key Architectural Enhancements:**
1. **Web3 Split Hero**:
   - Left: Cyberpunk/Web3 themed headline, Token launch metrics, and PR propositions.
   - Right: Quick enquiry card *"Reach Out To Us — Speak With a Web3 Lead Strategist"*.
2. **Top Tier Media Publications Row**:
   - Authentic media outlet logos: CoinTelegraph, Bloomberg, Yahoo Finance, Business Insider, Bitcoinist, CoinDesk.
3. **Interactive 3-Phase Strategy Tabs (Create / Scale / Improve)**:
   - Phase 1 *Create*: Tokenomics design, whitepaper drafting, smart contract audit PR.
   - Phase 2 *Scale*: Influencer KOL pushes, Telegram/Discord community raids, exchange listing PR.
   - Phase 3 *Improve*: Post-TGE retention, liquidity market making support, sustained organic buzz.
4. **Capabilities Grid**: Full breakdown of services (ICO/IDO/IEO, KOLs, Community Shilling, PR Syndication).
5. **Callout Banner & Crypto FAQ Accordion**.

- [ ] **Step 1:** Audit live content from `https://www.eon8.com/crptocurrency-marketing-agency/` and `https://www.eon8.com/crypto-pr-services/`.
- [ ] **Step 2:** Refactor `CryptoServicePage.tsx` with the media publications row, 3-phase tabs, and Web3 enquiry card.
- [ ] **Step 3:** Run `npm run build` to verify clean build.
- [ ] **Step 4:** Commit changes (`feat(crypto): upgrade CryptoServicePage with media proof bar and 3-phase strategy tabs`).

---

### Task 6: Upgrade NFT & Community Marketing Architecture (`NftServicePage.tsx`)

**Reference:** `https://www.eon8.com/nft-marketing-services/` & Discord/Reddit services

**Files:**
- Modify: `src/pages/nft/NftServicePage.tsx`
- Modify: `src/pages/nft/nftPagesData.ts`

**Key Architectural Enhancements:**
1. **NFT Hero**: Signature split hero with NFT collection artwork showcase and instant consultation capture card.
2. **"Our NFT Marketing Approach" 3-Pillar Framework**:
   - Pillar 1: *Create Hype* (Pre-mint Twitter campaigns, whitelist giveaways, influencer alpha calls).
   - Pillar 2: *Drive Value* (Rarity curation, roadmap utility showcase, secondary market volume support).
   - Pillar 3: *Build Community* (Discord leveling, 24/7 moderation, Telegram engagement).
3. **Discord & Reddit Moderation Deck**:
   - Bot automation, anti-scam security verification, role structures, engagement contests.
4. **Mid-page Banner**: *"You Know How To Make NFTs, We Know How To Sell NFTs. Connect with us right now!"*
5. **NFT Specific FAQ Accordion**.

- [ ] **Step 1:** Audit live content from `https://www.eon8.com/nft-marketing-services/`.
- [ ] **Step 2:** Refactor `NftServicePage.tsx` with the 3-pillar framework, Discord deck, and consultation CTA.
- [ ] **Step 3:** Run `npm run build` to verify zero errors.
- [ ] **Step 4:** Commit changes (`feat(nft): upgrade NftServicePage with authentic 3-pillar framework and Discord deck`).

---

### Task 7: Upgrade Influencer Marketing Architecture (`InfluencerServicePage.tsx`)

**Reference:** `https://www.eon8.com/influencer-marketing-agency/` & sub-services

**Files:**
- Modify: `src/pages/influencer/InfluencerServicePage.tsx`
- Modify: `src/pages/influencer/influencerPagesData.ts`

**Key Architectural Enhancements:**
1. **Influencer Hero**: Conversion-focused headline, campaign metrics (*"500+ Campaigns Executed"*), and inline inquiry card.
2. **Influencer Tiers Matrix**:
   - Nano (1k-10k), Micro (10k-100k), Macro (100k-1M), Mega & Celebrities (1M+).
3. **Platform Channel Deck**:
   - Instagram Reels & Stories, TikTok Viral Trends, YouTube Long-form & Shorts, Twitter Alpha Calls.
4. **8-Step Campaign Roadmap**:
   - Brand Analysis &rarr; Influencer Discovery &rarr; Shortlisting &rarr; Proposal Submission &rarr; Campaign Finalization &rarr; Content Creation &rarr; Launch &rarr; Monitor.
5. **Influencer FAQ Accordion & Conversion Banner**.

- [ ] **Step 1:** Audit live content from `https://www.eon8.com/influencer-marketing-agency/`.
- [ ] **Step 2:** Refactor `InfluencerServicePage.tsx` with the tiers matrix, platform channels, and 8-step roadmap.
- [ ] **Step 3:** Run `npm run build` to verify clean build.
- [ ] **Step 4:** Commit changes (`feat(influencer): upgrade InfluencerServicePage with tiers matrix and 8-step roadmap`).

---

### Task 8: Upgrade Blog Hub & Post Reader (`BlogListPage.tsx` & `BlogPostPage.tsx`)

**Reference:** `https://www.eon8.com/digital-marketing-blog/` & real articles

**Files:**
- Modify: `src/pages/blog/BlogListPage.tsx`
- Modify: `src/pages/blog/BlogPostPage.tsx`
- Modify: `src/pages/blog/blogPostsData.ts`

**Key Architectural Enhancements:**
1. **Blog Hub Page**:
   - Hero header with instant search bar, category filter pills (All, AI Agents, Digital Marketing, Social Media, Web3/Crypto), and article counter.
   - Featured article spotlight card with full-bleed thumbnail, author avatar, date, and read time.
   - Magazine 3-column card grid with category tags, clean typography, and hover zoom.
2. **Blog Post Reader Page**:
   - Sticky breadcrumb header (`Home / Blog / Article Title`).
   - Sticky floating social share widget (LinkedIn, Twitter/X, WhatsApp, Copy Link).
   - Dynamic Table of Contents auto-generated from article headings.
   - Sidebar containing:
     - Author biography card with avatar and credentials.
     - Quick Consultation Form card (*"Need help implementing AI or Digital Marketing for your brand?"*).
     - Recent / Trending articles list.
   - Related articles grid at the bottom.

- [ ] **Step 1:** Audit live magazine layout from `https://www.eon8.com/digital-marketing-blog/`.
- [ ] **Step 2:** Upgrade `BlogListPage.tsx` and `BlogPostPage.tsx` with sticky social share, sidebar consultation form, and magazine typography.
- [ ] **Step 3:** Run `npm run build` to verify clean build.
- [ ] **Step 4:** Commit changes (`feat(blog): upgrade Blog hub and post reader with magazine layout and sidebar form`).

---

### Task 9: Final Cross-Device QA & Production Polish

**Files:**
- Review: All modified pages in `src/pages/`
- Build: `npm run build`

**Verification Criteria:**
- Every page loads without console errors or hydration mismatches.
- All inline consultation forms submit cleanly to the App Store lead capture pipeline.
- All routes match on mobile (375px), tablet (768px), and desktop (1280px+).
- All chunks remain under 300 kB with zero rollup warnings.

- [ ] **Step 1:** Run complete `npm run build` and verify bundle breakdown.
- [ ] **Step 2:** Audit on responsive mobile simulator.
- [ ] **Step 3:** Update project documentation (`onpkg_docs/todo.md` and `onpkg_docs/task.md`).
- [ ] **Step 4:** Final git commit and tag.
