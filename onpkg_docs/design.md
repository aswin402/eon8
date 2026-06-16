# Design & UI Specification Document 🎨

## 1. Aesthetic Direction: Futuristic Growth Tech (UI/UX Pro Max)

We reject standard, flat template designs. The modernized Eon8 clone follows a **Futuristic Growth Tech** aesthetic. It bridges luxury agency styling with high-performance Web3/AI visual aesthetics.

- **Vibe**: Liquid glass layouts, deep space backgrounds offset by high-contrast neon highlights, and buttery-smooth kinetic responses.
- **Visual Features**:
  - **Glassmorphism**: Translucent cards using `backdrop-filter: blur(16px)` and thin semi-transparent white borders.
  - **Neomorphic Gradients**: Glowing backdrops under critical CTAs and achievement cards.
  - **Kinetic Elements**: Splitting header titles into characters that stagger-reveal using GSAP on scroll.
  - **Smooth Transitions**: Dark/Light mode color interpolation that transitions all background/foreground colors over 400ms.

---

## 2. Color System & Tokens (Tailwind CSS v4)

Our color palette balances the agency's traditional branding colors (Orange and Blue) with a highly refined dark mode and clean high-contrast light mode.

```css
:root {
  /* Brand Accents */
  --color-brand-orange: #ff5a00;
  --color-brand-blue: #0066ff;
  --color-brand-orange-rgb: 255, 90, 0;
  --color-brand-blue-rgb: 0, 102, 255;

  /* Theme: Light Mode Base */
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f1f5f9;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-light: rgba(0, 102, 255, 0.15);
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.4);
  --glass-shadow: rgba(15, 23, 42, 0.05);

  /* Theme: Dark Mode Base */
  --dark-bg-primary: #090f1d;
  --dark-bg-secondary: #111b2d;
  --dark-bg-tertiary: #1b263b;
  --dark-text-primary: #f8fafc;
  --dark-text-secondary: #cbd5e1;
  --dark-border-light: rgba(255, 90, 0, 0.15);
  --dark-glass-bg: rgba(17, 27, 45, 0.65);
  --dark-glass-border: rgba(255, 255, 255, 0.08);
  --dark-glass-shadow: rgba(0, 0, 0, 0.4);
}
```

---

## 3. Typography Scale

Pairing a high-personality display font for headings with a highly legible sans-serif for body copy.

- **Primary Display Font**: **Outfit** (imported via `@fontsource/outfit` or Google Fonts). Offers a geometric, futuristic, yet premium editorial weight.
- **Secondary Body Font**: **Inter** (imported via `@fontsource-variable/inter`). Standard for crisp legibility on high-density displays.

### Text Weights and Sizes:
- **Hero Title**: `text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none`
- **Section Heading**: `text-3xl md:text-5xl font-bold tracking-tight text-balance`
- **Card Title**: `text-xl md:text-2xl font-semibold tracking-wide`
- **Body Text**: `text-sm md:text-base font-normal leading-relaxed`
- **Button Labels**: `text-xs md:text-sm font-semibold uppercase tracking-wider`

---

## 4. Layout & Layout Transitions

### 4.1. Capsule Navigation Bar Behavior
- **Default State (floating)**:
  - Top margin: `24px`
  - Max-width: `1280px`
  - Border radius: `9999px`
  - Background: Blur glass (`backdrop-blur-md background: var(--glass-bg)`)
  - Border: `1px solid var(--glass-border)` with outer glow.
- **Scrolled State (fixed top)**:
  - Fixed to `top-0 left-0 right-0`
  - Width: `100%`
  - Border radius: `0px`
  - Background: Solid `var(--bg-secondary)` with subtle `shadow-md`
  - Border: Bottom `1px solid var(--border-light)`

### 4.2. Offcanvas Mobile Drawer
- Slides in from `right-0` (Framer motion transition: `x: [100%, 0%]`, ease: `easeInOut`).
- Full height backdrop overlay (`backdrop-blur-sm bg-black/60`).

---

## 5. Visual Element Styles

### 5.1. Glassmorphism Standard Card
```css
.card-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 var(--glass-shadow);
  border-radius: 16px;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
}
.card-glass:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px 0 rgba(var(--color-brand-blue-rgb), 0.15);
  border-color: rgba(var(--color-brand-blue-rgb), 0.4);
}
```

### 5.2. Orange-Blue Border-Glow Effect
Critical CTA components or card containers use a CSS border-image or multiple background clipping trick to show a glowing linear-gradient (`orange` to `blue`) that shifts angle using keyframe animations on hover.

### 5.3. Process Workflow Icon Styles
Operating process card icons are rendered inside an orange backdrop container (`bg-orange-500/10`) with transition filters giving a premium hover reaction state.

---

## 6. Kinetic Motion & Animations

We utilize a three-tiered animation model:

1. **Lenis Scroll (Structural)**: Smooth scroll interpolation to remove abrupt step-scrolling.
   - Frequency: `1.2`
   - Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
2. **GSAP & ScrollTrigger (Contextual)**:
   - **Hero Text Reveal**: Letters split into spans, staggered upwards (`y: 100` to `y: 0`, delay `0.03s` per char).
   - **Achievement Counters**: Triggers counter integers to count up from `0` to target value when the section reaches `top 80%` of screen.
   - **Alternate Parallax Rows**: Images translation `y: [-40px, 40px]` matching screen scroll offset.
   - **Dynamic Reveal Staggers**: Grids on About, Crypto, and Influencer pages fade in staggered from below (`y: 40` to `y: 0`) when scrolled into view.
3. **Framer Motion (Micro-interactions)**:
   - Hamburger drawer overlay open/close.
   - Capture Modal spring scale-up.
   - Theme Toggle Sun/Moon rotate animation.
   - **FAQ Accordion Open/Close**: Handles smooth height collapses using `<AnimatePresence>` dynamic scale transitions.
