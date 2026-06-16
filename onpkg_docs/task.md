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

---

## 5. Verification & Optimization QA
- [x] Verify TypeScript compiles with no errors (`npm run build`)
- [x] Audit layouts on Chrome Mobile simulator (Galaxy, iPhone viewports)
- [x] Test form capture validation by inputs checks and correct math captcha input
- [x] Bypassed Cloudflare URL issues using browser user-agent curl commands
- [x] Localized remote Eon8 images and SVGs into `/public/imgs/`
