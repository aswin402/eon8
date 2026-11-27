import { SERVICES_DATA_LOADERS } from '@/pages/services/data';
import { OUR_SERVICES_SLUGS, PACKAGES_SLUGS } from '@/pages/services/types';
import { CRYPTO_SERVICE_LOADERS } from '@/pages/crypto/data/services';
import { NFT_SERVICE_LOADERS } from '@/pages/nft/data/services';
import { NFT_COMMUNITY_LOADERS } from '@/pages/nft/data/community';

/**
 * Every page that ships with the site and can be edited in Admin > Pages.
 * Loaded only by the admin. `load` returns the page's original content.
 */

export type PageTemplate =
  | 'service'
  | 'crypto-service'
  | 'crypto-agency'
  | 'ieo-listing'
  | 'nft-service'
  | 'nft-community'
  | 'influencer-agency'
  | 'instagram-influencer'
  | 'twitter-influencer'
  | 'creator-platform'
  | 'policy'
  | 'content';

export interface BuiltInPage {
  key: string;
  path: string;
  template: PageTemplate;
  group: string;
  label: string;
  /** Other URLs that show the same content. */
  aliases?: string[];
  load: () => Promise<Record<string, unknown>>;
}

export const TEMPLATE_LABELS: Record<PageTemplate, string> = {
  service: 'Landing page',
  'crypto-service': 'Crypto service page',
  'crypto-agency': 'Crypto agency page',
  'ieo-listing': 'IEO listing page',
  'nft-service': 'NFT service page',
  'nft-community': 'NFT community page',
  'influencer-agency': 'Influencer agency page',
  'instagram-influencer': 'Instagram influencer page',
  'twitter-influencer': 'Twitter influencer page',
  'creator-platform': 'Creator platform page',
  policy: 'Policy page',
  content: 'Simple page',
};

const humanize = (slug: string) =>
  slug
    .replace(/-/g, ' ')
    .replace(/\b(seo|ppc|nft|ai|vr|ar|erp|crm|ico|ido|ieo|sto|kol|pr|ios|d2c)\b/gi, (m) => m.toUpperCase())
    .replace(/\b\w/g, (c) => c.toUpperCase());

const asRecord = <T,>(p: Promise<T>) => p as unknown as Promise<Record<string, unknown>>;

const serviceGroup = (slug: string) => {
  if ((OUR_SERVICES_SLUGS as readonly string[]).includes(slug)) return 'Services';
  if ((PACKAGES_SLUGS as readonly string[]).includes(slug)) return 'Packages';
  return 'Landing pages';
};

const SERVICE_ALIASES: Record<string, string[]> = {
  'web-design-development-services-chennai': ['/web-development-services-company/'],
  'ppc-company-chennai': ['/google-ads-management-ppc-agency/'],
  'digital-marketing-agency-in-chennai': ['/digital-marketing-services-chennai/'],
};

export const BUILT_IN_PAGES: BuiltInPage[] = [
  ...Object.entries(SERVICES_DATA_LOADERS).map(([slug, load]) => ({
    key: `service:${slug}`,
    path: `/${slug}/`,
    template: 'service' as const,
    group: serviceGroup(slug),
    label: humanize(slug),
    aliases: SERVICE_ALIASES[slug],
    load: () => asRecord(load()),
  })),
  {
    key: 'crypto-agency:crypto-marketing-agency',
    path: '/crypto-marketing-agency/',
    template: 'crypto-agency',
    group: 'Crypto',
    label: 'Crypto Marketing Agency',
    aliases: ['/crptocurrency-marketing-agency/'],
    load: () => asRecord(import('@/pages/crypto/data/cryptoMarketingAgencyData').then((m) => m.cryptoMarketingAgencyData)),
  },
  {
    key: 'ieo-listing:ieo-listing-services',
    path: '/ieo-listing-services/',
    template: 'ieo-listing',
    group: 'Crypto',
    label: 'IEO Listing Services',
    load: () => asRecord(import('@/pages/crypto/data/ieoListingData').then((m) => m.ieoListingData)),
  },
  ...Object.entries(CRYPTO_SERVICE_LOADERS).map(([slug, load]) => ({
    key: `crypto-service:${slug}`,
    path: `/${slug}/`,
    template: 'crypto-service' as const,
    group: 'Crypto',
    label: humanize(slug),
    load: () => asRecord(load()),
  })),
  ...Object.entries(NFT_SERVICE_LOADERS).map(([slug, load]) => ({
    key: `nft-service:${slug}`,
    path: `/${slug}/`,
    template: 'nft-service' as const,
    group: 'NFT & Discord',
    label: humanize(slug),
    load: () => asRecord(load()),
  })),
  ...Object.entries(NFT_COMMUNITY_LOADERS).map(([slug, load]) => ({
    key: `nft-community:${slug}`,
    path: `/${slug}/`,
    template: 'nft-community' as const,
    group: 'NFT & Discord',
    label: humanize(slug),
    load: () => asRecord(load()),
  })),
  {
    key: 'influencer-agency:influencer-marketing-agency',
    path: '/influencer-marketing-agency/',
    template: 'influencer-agency',
    group: 'Influencer',
    label: 'Influencer Marketing Agency',
    load: () => asRecord(import('@/pages/influencer/data/influencerAgencyData').then((m) => m.influencerAgencyData)),
  },
  {
    key: 'instagram-influencer:instagram-influencer-marketing-agency',
    path: '/instagram-influencer-marketing-agency/',
    template: 'instagram-influencer',
    group: 'Influencer',
    label: 'Instagram Influencer Marketing Agency',
    load: () => asRecord(import('@/pages/influencer/data/instagramInfluencerData').then((m) => m.instagramInfluencerData)),
  },
  {
    key: 'twitter-influencer:twitter-influencer-marketing',
    path: '/twitter-influencer-marketing/',
    template: 'twitter-influencer',
    group: 'Influencer',
    label: 'Twitter Influencer Marketing',
    load: () => asRecord(import('@/pages/influencer/data/twitterInfluencerData').then((m) => m.twitterInfluencerData)),
  },
  ...(['tiktok-influencer-marketing', 'youtube-influencer-services'] as const).map((slug) => ({
    key: `creator-platform:${slug}`,
    path: `/${slug}/`,
    template: 'creator-platform' as const,
    group: 'Influencer',
    label: humanize(slug),
    load: () =>
      asRecord(
        import('@/pages/influencer/data/creatorPlatformData').then((m) =>
          slug === 'tiktok-influencer-marketing' ? m.tiktokInfluencerData : m.youtubeInfluencerData
        )
      ),
  })),
  ...(['privacy-policy-2', 'terms-and-conditions', 'refund-policy', 'delivery-policy'] as const).map((slug) => ({
    key: `policy:${slug}`,
    path: `/${slug}/`,
    template: 'policy' as const,
    group: 'Policies',
    label: humanize(slug === 'privacy-policy-2' ? 'privacy-policy' : slug),
    aliases: slug === 'privacy-policy-2' ? ['/privacy-policy/'] : undefined,
    load: () => asRecord(import('@/pages/policy/policyPagesData').then((m) => m.policyPagesData[slug])),
  })),
];

/** Pages whose text is still written inside the page code (not yet editable here). */
export const CODE_ONLY_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/about-us/', label: 'About Us' },
  { path: '/contact/', label: 'Contact' },
  { path: '/ai-agent-development-services/', label: 'AI Agent Development' },
  { path: '/ai-video-creation/', label: 'AI Video Creation' },
  { path: '/chatgpt-ads-agency/', label: 'ChatGPT Ads Agency' },
  { path: '/works/', label: 'Works & case studies' },
  { path: '/thank-you/', label: 'Thank you' },
];
