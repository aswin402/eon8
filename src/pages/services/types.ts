import type { ActionItem, PricingRowItem, TabPanelItem, VerticalTheme } from '../../components/sections/types';
import type { RichNode } from '../crypto/types';

export const OUR_SERVICES_SLUGS = [
  // Digital Marketing & Development (12)
  'digital-marketing-agency-in-chennai',
  'search-engine-optimization-services-seo',
  'local-seo-agency',
  'ecommerce-seo-services',
  'mobile-seo-agency-eon8-seo-services',
  'small-business-seo-services',
  'link-building-services-for-high-rankings',
  'game-marketing-agency-video-mobile-gaming',
  'ecommerce-website-development-services',
  'web-design-development-services-chennai',
  'erp-software-development',
  'crm-software-development',
  // Social Media Marketing (8)
  'social-media-marketing-company-chennai',
  'social-media-brand-management-agency-chennai',
  'social-media-management-agency-chennai',
  'facebook-marketing-agency-in-chennai',
  'twitter-marketing-agency-in-chennai-marketing',
  'instagram-marketing-agency-services-instagram',
  'linkedin-marketing-agency-chennai-services',
  'youtube-marketing-company-chennai-eon8',
  // ORM Services (6)
  'reputation-management-services',
  'online-reputation-management-agency',
  'clean-negative-search-results',
  'google-complaint-removal',
  'complaints-board-removal',
  'consumer-complaints-removal',
  // Pay-Per-Click (5)
  'ppc-company-chennai',
  'search-advertising-company',
  'display-advertising-agency',
  'best-remarketing-ad-agency',
  'product-listing-ads-agency',
  // App Marketing (3)
  'android-apps-marketing-services-marketing',
  'apple-app-store-optimization-services-ios',
  'android-game-marketing-services-eon8-marketing',
  // AR/VR & Metaverse (5)
  'immersive-vr-marketing',
  'augmented-reality-agency',
  'social-ar-solutions',
  'vr-product-marketing',
  'metaverse',
] as const;

export const PACKAGES_SLUGS = [
  'seo-packages',
  'ppc-packages',
  'facebook-packages',
  'instagram-packages',
  'linkedin-packages',
  'twitter-packages',
] as const;

export const ADDITIONAL_LANDING_SLUGS = [
  'ads-amazon-marketing-agency',
  'amazon-marketing-service-agency-chennai',
  'amazon-seo-consultant-service-chennai',
  'amazon-seo-consultants',
  'best-seo-agency',
  'clean-negative-search-results-2',
  'community-marketing-agency',
  'community-marketing-agency-2',
  'content-marketing-company-chennai',
  'd2c-branding-and-growth-agency',
  'digital-marketing-for-app-store',
  'digital-marketing-for-education',
  'digital-marketing-for-healthcare-industry',
  'digital-marketing-for-restaurants',
  'home-new',
  'instagram-marketing-funnel',
  'instagram-markting-agency',
  'instagram-reels-marketing-agency',
  'mobile-app-marketing-agency',
  'nft-influencer-marketing-agency',
  'nft-instagram-marketing-agency',
  'nft-marketing-services-testing',
  'performance-marketing-agency',
  'performance-marketing-funnel',
  'quora-com-complaint-removal',
  'quora-complaint-removal',
  'remove-complaints-from-google-search',
  'remove-negative-reviews-back',
  'search-engine-marketing-service-chennai',
  'search-engine-optimization-services-chennai',
  'seo-agency-in-bangalore',
  'seo-by-industry',
  'seo-services-funnel',
  'twitter-community-management-services',
  'twitter-trending-services',
  'twitter-verification-services',
  'video-creation-marketing-service-chennai',
  'whatsapp-marketing-services',
] as const;

export const ALL_SERVICE_SLUGS = [
  ...OUR_SERVICES_SLUGS,
  ...PACKAGES_SLUGS,
  ...ADDITIONAL_LANDING_SLUGS,
] as const;

export type OurServiceSlug = (typeof ALL_SERVICE_SLUGS)[number];

export interface SemanticHeroData {
  badge?: string;
  heading: string;
  subheading?: string;
  paragraphs: RichNode[][];
  bullets: string[];
  actions: ActionItem[];
  layout: 'split-form' | 'split-media' | 'centered';
  mediaSrc?: string;
  mediaAlt?: string;
  formHeading?: string;
  formSubmitLabel?: string;
}

export interface SemanticCardData {
  badge?: string;
  title: string;
  description?: string;
  bullets?: string[];
  iconSrc?: string;
  iconAlt?: string;
  href?: string;
  ctaLabel?: string;
}

export type SemanticServiceSection =
  | {
      type: 'callback-banner';
      heading: string;
      submitLabel?: string;
    }
  | {
      type: 'logo-marquee';
      heading?: string;
      logos: { src: string; alt: string }[];
    }
  | {
      type: 'stats';
      heading?: string;
      subheading?: string;
      stats: { value: string; label: string; iconSrc?: string }[];
    }
  | {
      type: 'tabs';
      heading: string;
      subheading?: string;
      tabs: TabPanelItem[];
    }
  | {
      type: 'pricing-matrix';
      heading: string;
      subheading?: string;
      tiers: {
        name: string;
        price?: string;
        subtitle?: string;
        highlighted?: boolean;
        ctaLabel?: string;
      }[];
      rows: PricingRowItem[];
      footnote?: string;
    }
  | {
      type: 'feature-grid';
      heading: string;
      subheading?: string;
      cards: SemanticCardData[];
      columns?: 2 | 3 | 4;
      actions?: ActionItem[];
    }
  | {
      type: 'process';
      heading: string;
      subheading?: string;
      steps: { step?: string; title: string; description: string; iconSrc?: string }[];
      actions?: ActionItem[];
    }
  | {
      type: 'split';
      heading: string;
      subheading?: string;
      paragraphs: RichNode[][];
      bullets?: string[];
      imageSrc?: string;
      imageAlt?: string;
      actions?: ActionItem[];
    }
  | {
      type: 'cta-banner';
      heading: string;
      subtext?: string;
      actions: ActionItem[];
    }
  | {
      type: 'testimonials';
      heading: string;
      quotes: string[];
    }
  | {
      type: 'blog-links';
      heading: string;
      posts: { title: string; href: string }[];
    }
  | {
      type: 'faq';
      heading: string;
      faqs: {
        question: string;
        answerParagraphs: RichNode[][];
        bullets?: string[];
      }[];
    }
  | {
      type: 'discovery-call';
      heading: string;
      subheading?: string;
    };

export interface ServicePageData {
  slug: OurServiceSlug;
  theme: VerticalTheme;
  title: string;
  metaDesc: string;
  noIndex?: boolean;
  hero: SemanticHeroData;
  sections: SemanticServiceSection[];
  disclaimer?: string;
}
