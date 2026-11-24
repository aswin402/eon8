import type { ServicePageData } from '../types';

export const seoServicesFunnelData: ServicePageData = {
  slug: 'seo-services-funnel',
  theme: 'brand',
  title: 'SEO Services Funnel | Full-Funnel Organic Search Growth – Eon8',
  metaDesc:
    'Dominate Page-1 Google rankings and convert high-intent organic searchers into qualified pipeline with EON8’s full-funnel SEO services.',
  noIndex: true,
  hero: {
    badge: 'Full-Funnel Organic Search Engine',
    heading: 'Turn High-Intent Google Searches Into Predictable Revenue',
    subheading: 'Full-Funnel Technical SEO, Topical Authority & Conversion Optimization',
    paragraphs: [
      [
        'Rankings without conversions are vanity metrics. EON8’s SEO Services Funnel aligns technical crawlability, commercial-intent keyword clusters, authoritative link acquisition, and conversion-focused landing pages to drive compounding organic ROI.',
      ],
    ],
    bullets: [
      'Technical Core Web Vitals & Crawl Architecture',
      'Bottom-of-Funnel Commercial Keyword Dominance',
      'High-DR Digital PR & Editorial Backlinks',
      'AI Search (GEO) & Local Map Pack Visibility',
    ],
    actions: [
      {
        label: 'Claim Free SEO Funnel Audit',
        href: '/contact',
        opensModal: true,
        external: false,
        variant: 'primary',
      },
      {
        label: 'View SEO Packages',
        href: '/seo-packages',
        opensModal: false,
        external: false,
        variant: 'secondary',
      },
    ],
    layout: 'split-form',
    formHeading: 'Get Your Free Website & Keyword Audit',
    formSubmitLabel: 'Request Free Audit',
  },
  sections: [
    {
      type: 'callback-banner',
      heading: '5 Minutes Call Back — Speak With an EON8 Lead SEO Architect',
      submitLabel: 'Send',
    },
    {
      type: 'stats',
      heading: 'Proven Organic Search Impact',
      stats: [
        { value: '500+', label: 'SEO Projects Delivered' },
        { value: '95%', label: 'Page-1 Keyword Retention' },
        { value: '12+', label: 'Years of Search Expertise' },
        { value: '3.4×', label: 'Average Organic Pipeline Lift' },
      ],
    },
    {
      type: 'feature-grid',
      heading: 'Full-Funnel SEO Capabilities That Capture Every Buyer Stage',
      subheading:
        'From problem-aware informational queries to high-intent transactional comparisons, we own the entire search journey.',
      columns: 3,
      cards: [
        {
          title: 'Technical SEO & Core Web Vitals',
          description:
            'Site speed optimization, crawl budget engineering, clean indexation, canonical governance, and rich JSON-LD schema.',
          iconSrc: '/wp-content/uploads/2022/09/sro-funnel.svg',
          iconAlt: 'Technical SEO',
        },
        {
          title: 'Local SEO & Google Business Profile',
          description:
            'Four out of five buyers search locally — we dominate Google Maps 3-Pack rankings, local citations, and city landing pages.',
          iconSrc: '/wp-content/uploads/2022/09/local-seo-funnel.svg',
          iconAlt: 'Local SEO',
        },
        {
          title: 'Commercial Content & Topic Clusters',
          description:
            'Search-intent mapped pillar pages, comparison guides, and solution pages engineered to rank and convert.',
          iconSrc: '/wp-content/uploads/2022/09/content-funnel.svg',
          iconAlt: 'Content Optimization',
        },
        {
          title: 'eCommerce & Catalog SEO',
          description:
            'Category architecture, faceted navigation control, and product schema for Shopify, WooCommerce, and custom stores.',
          iconSrc: '/wp-content/uploads/2022/09/ecommerce-funnel.svg',
          iconAlt: 'eCommerce SEO',
        },
        {
          title: 'Conversion Rate Optimization (CRO)',
          description:
            'Heatmap diagnostics, CTA restructuring, and lead-capture experiments so organic traffic converts at maximum efficiency.',
          iconSrc: '/wp-content/uploads/2022/09/message-funnel.svg',
          iconAlt: 'CRO',
        },
        {
          title: 'Authority Link Building & ORM',
          description:
            'White-hat editorial backlinks and positive SERP reputation management to strengthen domain trust.',
          iconSrc: '/wp-content/uploads/2022/09/orm-funnel.svg',
          iconAlt: 'Authority & ORM',
        },
      ],
    },
    {
      type: 'process',
      heading: 'Our 4-Stage SEO Funnel Execution Roadmap',
      steps: [
        {
          step: '01',
          title: 'Deep Technical & Competitor Gap Audit',
          description:
            '200-point technical crawl, Core Web Vitals benchmark, and competitor keyword/backlink gap analysis.',
        },
        {
          step: '02',
          title: 'Intent-Mapped Keyword & On-Page Architecture',
          description:
            'Structuring TOFU, MOFU, and BOFU landing pages with optimized metadata, internal linking, and schema.',
        },
        {
          step: '03',
          title: 'Editorial Content & High-Authority Link Velocity',
          description:
            'Publishing expert content clusters paired with contextual placements on authoritative industry publications.',
        },
        {
          step: '04',
          title: 'Rank, Traffic & Revenue Attribution',
          description:
            'Transparent GA4 + Search Console monthly reporting tracking keyword movement, qualified leads, and ROI.',
        },
      ],
    },
    {
      type: 'faq',
      heading: 'SEO Funnel Frequently Asked Questions',
      faqs: [
        {
          question: 'How quickly does full-funnel SEO generate qualified leads?',
          answerParagraphs: [
            [
              'Technical fixes and bottom-of-funnel commercial page optimizations typically lift impressions and early conversions within 45–60 days, with compounding Page-1 dominance across months 3–6.',
            ],
          ],
        },
        {
          question: 'Do you optimize for AI search engines (ChatGPT, Gemini, Google AI Overviews)?',
          answerParagraphs: [
            [
              'Yes — every EON8 SEO funnel incorporates entity structured data, direct-answer formatting, and brand citation authority for Generative Engine Optimization (GEO).',
            ],
          ],
        },
        {
          question: 'Are there any long-term lock-in contracts?',
          answerParagraphs: [
            [
              'No lock-in contracts. You receive a dedicated SEO manager, weekly/monthly transparent reporting, and clear milestone deliverables every cycle.',
            ],
          ],
        },
      ],
    },
  ],
};
