import type { ServicePageData } from '../types';

export const d2cBrandingAndGrowthAgencyData: ServicePageData = {
  slug: 'd2c-branding-and-growth-agency',
  theme: 'brand',
  title: 'Expert D2C Branding & Growth Agency | Boost Your Online Sales',
  metaDesc:
    "Elevate your brand's online presence with our D2C branding and growth agency. We specialize in driving growth and visibility. Let's grow together!",
  hero: {
    badge: 'Direct-to-Consumer Growth Engine',
    heading: 'D2C Branding and Growth Agency',
    paragraphs: [
      [
        'Experience exponential growth with our tailored D2C branding and performance solutions. Let EON8 amplify your storefront visibility, repeat purchase rates, and profitable customer acquisition.',
      ],
    ],
    bullets: [
      'Scale Profitable Reach',
      'Lower Blended CAC',
      'Increase ROAS & AOV',
      'Optimize Storefront Conversion',
    ],
    actions: [
      {
        label: 'Talk with our Experts',
        href: '#',
        opensModal: true,
        external: false,
        variant: 'primary',
      },
      {
        label: 'Explore eCommerce Development',
        href: '/ecommerce-website-development-services',
        opensModal: false,
        external: false,
        variant: 'secondary',
      },
    ],
    layout: 'split-form',
    formHeading: 'Get Your Free D2C Growth Audit',
    formSubmitLabel: 'Request D2C Roadmap',
  },
  sections: [
    {
      type: 'split',
      heading: 'EON8: Engineer Success for Your D2C Brand',
      paragraphs: [
        [
          'EON8 specializes in propelling direct-to-consumer (D2C) brands into market leaders through full-funnel branding, creative storytelling, and performance acquisition. Our strategists combine buyer psychology with data-backed ad execution to ensure your products stand out in crowded categories.',
        ],
        [
          'We align your brand identity, storefront UX, paid social scaling, and lifecycle retention into one cohesive revenue engine — turning first-time shoppers into loyal brand advocates.',
        ],
      ],
      bullets: [
        'Category positioning & visual brand identity systems',
        'High-converting Shopify & custom D2C storefront UX',
        'UGC video creative studio & thumb-stopping ad hooks',
        'WhatsApp, email & SMS retention lifecycle flows',
      ],
      imageSrc: '/wp-content/uploads/2026/06/ecommerce.webp',
      imageAlt: 'D2C Branding and eCommerce Growth',
      actions: [
        {
          label: 'Schedule Strategy Call',
          href: '#consult-form',
          opensModal: false,
          external: false,
          variant: 'primary',
        },
      ],
    },
    {
      type: 'feature-grid',
      heading: 'Full-Funnel D2C Growth Capabilities',
      subheading:
        'Every lever required to launch, scale, and compound direct-to-consumer revenue profitably.',
      columns: 3,
      cards: [
        {
          title: 'Brand Positioning & Identity',
          description:
            'Craft a unmistakable brand story, packaging aesthetic, and tone of voice that commands premium pricing and trust.',
        },
        {
          title: 'Performance Paid Social & Search',
          description:
            'Scale Meta, Instagram Reels, YouTube, and Google Shopping campaigns with structured creative testing and ROAS guardrails.',
          href: '/performance-marketing-agency',
          ctaLabel: 'Explore Performance Ads',
        },
        {
          title: 'Conversion Rate Optimization (CRO)',
          description:
            'Eliminate checkout friction, optimize product detail pages, and lift Average Order Value (AOV) with smart bundling.',
          href: '/ecommerce-website-development-services',
          ctaLabel: 'View Storefront Solutions',
        },
        {
          title: 'Creator & UGC Seeding',
          description:
            'Partner with authentic niche creators to produce high-converting product demos, reviews, and social proof.',
          href: '/influencer-marketing-agency',
          ctaLabel: 'Creator Campaigns',
        },
        {
          title: 'Marketplace & Organic SEO',
          description:
            'Capture high-intent non-branded search demand across Google and Amazon product listings.',
          href: '/ecommerce-seo-services',
          ctaLabel: 'eCommerce SEO',
        },
        {
          title: 'Retention & WhatsApp Automation',
          description:
            'Recover abandoned carts, automate post-purchase upsells, and maximize Customer Lifetime Value (LTV).',
          href: '/whatsapp-marketing-services',
          ctaLabel: 'WhatsApp Flows',
        },
      ],
    },
    {
      type: 'process',
      heading: 'Our 4-Stage D2C Scaling Framework',
      subheading: 'Built for predictable unit economics from day one.',
      steps: [
        {
          step: '01',
          title: 'Unit Economics & Funnel Audit',
          description:
            'Analyze margins, AOV, CAC targets, landing page drop-offs, and competitor creative angles.',
        },
        {
          step: '02',
          title: 'Brand & Creative Sprint',
          description:
            'Develop high-converting ad creatives, UGC scripts, and storefront landing pages tailored to buyer personas.',
        },
        {
          step: '03',
          title: 'Omnichannel Media Scaling',
          description:
            'Launch structured Meta, Google Shopping, and creator campaigns with real-time attribution tracking.',
        },
        {
          step: '04',
          title: 'LTV & Retention Compounding',
          description:
            'Deploy automated WhatsApp, email, and loyalty sequences to drive repeat orders and profitable scale.',
        },
      ],
    },
    {
      type: 'faq',
      heading: 'D2C Branding & Growth FAQs',
      faqs: [
        {
          question: 'Which D2C categories does EON8 work with?',
          answerParagraphs: [
            [
              'We partner with ambitious D2C brands across beauty & personal care, fashion & apparel, food & gourmet, health & wellness, consumer electronics, and home lifestyle.',
            ],
          ],
        },
        {
          question: 'Do you handle both creative production and ad buying?',
          answerParagraphs: [
            [
              'Yes. Creative is the #1 targeting lever in modern D2C advertising, so our strategists, designers, AI video producers, and media buyers work in one integrated pod.',
            ],
          ],
        },
        {
          question: 'How do you measure D2C campaign success?',
          answerParagraphs: [
            [
              'Beyond platform ROAS, we track Marketing Efficiency Ratio (MER), blended CAC, conversion rate, Average Order Value (AOV), and 60/90-day repeat purchase rates.',
            ],
          ],
        },
      ],
    },
  ],
};
