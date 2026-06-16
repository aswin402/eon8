# Product Requirements Document (PRD) 🚀

## Document Metadata
- **Project Name**: Eon8 Website Modernization & React Clone
- **Active Stack**: React 19 + Vite 8 + Tailwind CSS v4 + GSAP + Framer Motion + Lenis
- **Target Release**: v1.0.0
- **Author**: Antigravity (AI Coding Assistant)

---

## 1. Project Overview & Background
[Eon8](https://www.eon8.com/) is a fast-growing 360-degree digital marketing and growth marketing agency specializing in traditional digital campaigns, Web3/Crypto marketing, and AI agent development services. 

The goal of this project is to create an **ultra-premium, pixel-perfect, fully responsive React-based clone** of the Eon8 landing page. By moving from a heavy WordPress architecture to a modern React SPA powered by Vite, we will drastically improve the performance, page speed (reducing LCP and INP), and interactive experience.

We will elevate the original site's visual language by applying the **UI/UX Pro Max** approach: incorporating glassmorphism, dynamic glowing gradients, kinetic scroll-driven animations with **GSAP**, smooth scrolling with **Lenis**, and custom-tailored interactive states.

---

## 2. Core Objectives
1. **Visual Excellence (WOW Factor)**: Exceed standard template aesthetics with customized typography (Outfit + Inter), premium grid structures, and interactive feedback (hover tilt, glowing outlines, micro-animations).
2. **Kinetic Motion & Smooth Scroll**: Integrate Lenis for high-performance scroll interpolation and GSAP/ScrollTrigger for text reveals, staggered grids, and parallax backgrounds.
3. **Responsive for All Devices**: Perfect layout adaptation across all standard viewports (Mobile `< 640px`, Tablet `640px - 1024px`, Desktop `1024px - 1440px`, and Ultra-Wide `> 1440px`).
4. **Interactive Lead Capture**: Build a functional contact form with a dynamic math quiz captcha and a sliding floating quick-contact widget.
5. **SEO & Performance Best Practices**: Retain Eon8's strong search signals (meta tags, clean hierarchy, schema markup, semantic HTML) while aiming for 95+ PageSpeed scores.

---

## 3. Core Features & Scope

### 3.1. Floating Capsule Navigation Bar
- **Default State**: Translucent, capsule-shaped bar with a gradient border (`orange` to `blue`) floating in the center-top of the viewport.
- **Scrolled State**: Transition smoothly (scale, border-radius, background padding) into a fixed, solid-white/dark-slate full-width top bar.
- **Menu Items**:
  - `AI-Agent` (dropdown)
  - `Crypto` (dropdown)
  - `Influencer` (dropdown)
  - `NFT` (dropdown)
  - `Our Services` (mega dropdown)
  - `Blog`, `About Us`, `Contact Us`
- **Mobile Menu**: Responsive hamburger button opening a smooth sliding side drawer (Offcanvas navigation).

### 3.2. Cinematic Hero Section
- **Background**: Autoplay, loop, muted background video demonstrating digital globe grid animations (with a static optimized fallback image for slow connections or battery-saver modes).
- **Foreground Content**:
  - Staggered GSAP reveal of headings: `"We Build Brands That Win"` (italic) -> `"That Win"` (bold display) -> `"Attention, Traffic & Revenue"`.
  - Right-aligned bulleted value propositions that fade in sequence.
- **Scroll Indicator**: A subtle mouse-scroll micro-animation prompting users to scroll down.

### 3.3. Achievement & Counter Section
- **Visuals**: A grid of glassmorphic cards (Projects Completed, Happy Clients, Years of Experience, Development Experts) placed on top of a subtle parallax background.
- **Interactive Counters**: Numerical statistics that start at 0 and count up dynamically to target values (e.g., 1250, 548, 12, 250) when the section becomes visible in the viewport (ScrollTrigger integration).

### 3.4. Interactive Service Grids
- **Grid Layout**: 3-column responsive layout showcasing Eon8's primary services (Digital, SEO, Performance, Social Media, Content/AI, Brand Design).
- **Kinetic Effects**: Hover-triggered card lift, color-shifting borders, and icon rotations.

### 3.5. Alternate Row Web3 & AI Marketing Verticals
- Showcase core expertise (NFT, Crypto, AI, Conversion Optimization) in alternating rows.
- Each row contains descriptive copy, lists, call-to-action (CTA) buttons, and corresponding 3D-like images (positioned with scroll-driven parallax movements).

### 3.6. Brand & Client Logo Marquees
- Infinite horizontal scrolling marquee for client logos (TVS, Shell, Apollo, IBM, etc.) that pauses on hover.
- Certification badges (Google Partner, Clutch, etc.) showcased in a distinct row.

### 3.7. Sliding Quick-Contact Widget & Form Modal
- **Floating Contact Panel**: Clean, vertical sidebar fixed on the right screen edge. Clicking opens a slide-out drawer containing a contact form.
- **Quick Contact Modal**: Accessible via CTA buttons, featuring a fields validation check, and a **Math Captcha** (e.g., "12 + 3 = ?") to prevent spam.
- **WhatsApp Shortcut**: Floating green badge on the bottom left for instant communication.

---

## 4. Non-Functional & Quality Requirements

### 4.1. Responsiveness Matrix

| Device Category | Width Breakpoint | Nav Menu Behavior | Grid Layouts | Spacing & Padding |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile** | `< 640px` | Hamburger menu only | 1-Column stack | Compact (`16px`), smaller headers |
| **Tablet** | `640px - 1024px` | Hamburger menu | 2-Column grid | Moderate (`32px`) |
| **Desktop** | `1024px - 1440px` | Full navbar, dropdowns | 3-Column grid | Spacious (`64px`) |
| **Ultra-Wide** | `> 1440px` | Full navbar, centered capsule | 3-Column / Max-width | Constrained to `1440px` max container |

### 4.2. Performance Targets
- **Largest Contentful Paint (LCP)**: Under 2.0s (achieved via responsive image formats, lazy loading, and priority prefetching of hero banners).
- **Interaction to Next Paint (INP)**: Under 150ms (optimized through lightweight state updates and debounced scroll listeners).
- **Accessibility (A11y)**: WCAG 2.1 AA compliant color contrast, screen-reader friendly aria-labels, and keyboard tabbable navbar dropdowns.

---

## 5. Success Metrics
- **Aesthetic Score**: High-fidelity matching of Eon8 assets combined with modern visual overlays (shadows, blurred backdrops).
- **Conversion Readiness**: Zero-error form submissions with responsive captcha feedback.
- **Technical Integrity**: Clean typescript compilation, zero console errors during hydration, and responsive layout fidelity on Safari (iOS), Chrome, and Firefox.

---

## 6. Out of Scope for Phase 1
- Full backend integration (submissions will print mock API payloads to client logger).
- Admin dashboard for editing blog posts.
- Complete localized versions of all sub-service landing pages (they will redirect to a generic modernized contact page or anchor sections).
