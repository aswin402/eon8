import type { CSSProperties } from 'react';

export const OUR_SERVICES_SLUGS = [
  // Digital Marketing & Development (10)
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

export type OurServiceSlug = (typeof OUR_SERVICES_SLUGS)[number];

export type ServiceHtmlTag =
  | 'div'
  | 'section'
  | 'p'
  | 'span'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'ul'
  | 'ol'
  | 'li'
  | 'a'
  | 'button'
  | 'img'
  | 'video'
  | 'source'
  | 'figure'
  | 'figcaption'
  | 'strong'
  | 'b'
  | 'em'
  | 'i'
  | 'br'
  | 'hr'
  | 'label'
  | 'table'
  | 'thead'
  | 'tbody'
  | 'tr'
  | 'th'
  | 'td'
  | 'svg'
  | 'path'
  | 'circle'
  | 'rect';

export interface ServiceElementProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  src?: string;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  type?: string;
  role?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  colSpan?: number;
  rowSpan?: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  // SVG attributes
  xmlns?: string;
  viewBox?: string;
  fill?: string;
  fillRule?: 'nonzero' | 'evenodd' | 'inherit';
  clipRule?: 'nonzero' | 'evenodd' | 'inherit';
  stroke?: string;
  strokeWidth?: string | number;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
  d?: string;
  cx?: string | number;
  cy?: string | number;
  r?: string | number;
  x?: string | number;
  y?: string | number;
  rx?: string | number;
  ry?: string | number;
  // Scoped Elementor attributes for CSS selector parity
  dataElementorType?: string;
  dataElementorId?: string;
  dataElementType?: string;
  dataWidgetType?: string;
  dataId?: string;
}

export interface ServiceTextNode {
  kind: 'text';
  value: string;
}

export interface ServiceElementNode {
  kind: 'element';
  tag: ServiceHtmlTag;
  props?: ServiceElementProps;
  children?: ServiceNode[];
}

export interface ServiceFormNode {
  kind: 'form';
  variant: 'proposal-5' | 'callback-3' | 'phone-callback';
  innerId?: 'responsive-form' | 'nft-form';
  heading?: string;
  headingTag?: 'h3' | 'h4';
  submitLabel: string;
  phonePlaceholder?: string;
}

export interface ServiceElementorAccordionItem {
  title: string;
  content: ServiceNode[];
  defaultOpen?: boolean;
}

export interface ServiceElementorAccordionNode {
  kind: 'elementor-accordion';
  className?: string;
  items: ServiceElementorAccordionItem[];
}

export interface ServiceBootstrapAccordionItem {
  id: string;
  title: string;
  content: ServiceNode[];
  defaultOpen?: boolean;
}

export interface ServiceBootstrapAccordionNode {
  kind: 'bootstrap-accordion';
  id?: string;
  className?: string;
  items: ServiceBootstrapAccordionItem[];
}

export interface ServiceCustomFaqItemNode {
  kind: 'custom-faq-item';
  wrapperClass: string;
  defaultOpen?: boolean;
  questionTag: 'button' | 'div' | 'h3' | 'h4';
  questionProps?: ServiceElementProps;
  questionNodes: ServiceNode[];
  toggleSignClass?: string;
  answerProps?: ServiceElementProps;
  answerNodes: ServiceNode[];
}

export interface ServiceLegacyFaqItemNode {
  kind: 'legacy-faq-item';
  wrapperProps?: ServiceElementProps;
  questionProps?: ServiceElementProps;
  questionText: string;
  answerProps?: ServiceElementProps;
  answerNodes: ServiceNode[];
  defaultOpen?: boolean;
}

export interface ServiceTestimonialQuotesNode {
  kind: 'testimonial-quotes';
  wrapperProps?: ServiceElementProps;
  quoteProps?: ServiceElementProps;
  quotes: string[];
}

export interface ServiceCarouselCard {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}

export interface ServiceCardsCarouselNode {
  kind: 'cards-carousel';
  cards: ServiceCarouselCard[];
}

export interface ServiceLogoMarqueeNode {
  kind: 'logo-marquee';
  logos: { src: string; alt: string }[];
}

export interface ServiceCounterNode {
  kind: 'counter';
  tag: 'span' | 'h3' | 'div';
  props?: ServiceElementProps;
  displayValue: string;
}

export type ServiceNode =
  | ServiceTextNode
  | ServiceElementNode
  | ServiceFormNode
  | ServiceElementorAccordionNode
  | ServiceBootstrapAccordionNode
  | ServiceCustomFaqItemNode
  | ServiceLegacyFaqItemNode
  | ServiceTestimonialQuotesNode
  | ServiceCardsCarouselNode
  | ServiceLogoMarqueeNode
  | ServiceCounterNode;

export interface ServicePageData {
  slug: OurServiceSlug;
  title: string;
  metaDesc: string;
  nodes: ServiceNode[];
}
