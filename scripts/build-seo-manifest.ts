import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ALL_SERVICE_SLUGS } from '../src/pages/services/types.ts';
import { BLOG_CATEGORIES_LIST, BLOG_POSTS_SUMMARIES } from '../src/pages/blog/blogIndexData.ts';
import { policyPagesData } from '../src/pages/policy/policyPagesData.ts';
import { cryptoMarketingAgencyData } from '../src/pages/crypto/data/cryptoMarketingAgencyData.ts';
import { ieoListingData } from '../src/pages/crypto/data/ieoListingData.ts';
import { influencerAgencyData } from '../src/pages/influencer/data/influencerAgencyData.ts';
import { instagramInfluencerData } from '../src/pages/influencer/data/instagramInfluencerData.ts';
import { twitterInfluencerData } from '../src/pages/influencer/data/twitterInfluencerData.ts';
import { tiktokInfluencerData, youtubeInfluencerData } from '../src/pages/influencer/data/creatorPlatformData.ts';

export interface ManifestPageSeo {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  noIndex?: boolean;
  inSitemap?: boolean;
  priority?: string;
  changefreq?: string;
}

export interface ManifestBlogPostSeo {
  id: number;
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  ogImage?: string;
  dateIso: string;
  author: string;
  category: string;
}

export interface SeoManifest {
  generatedAt: string;
  baseUrl: string;
  defaultOgImage: string;
  pages: Record<string, ManifestPageSeo>;
  blogPosts: Record<string, ManifestBlogPostSeo>;
  blogCategories: Record<string, string>;
  redirects: Record<string, string>;
}

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(currentDir, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const BASE_URL = 'https://www.eon8.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/wp-content/uploads/2026/03/Logo_bg-1.png`;

const EXCLUDED_SITEMAP_SLUGS = new Set<string>([
  'nft-marketing-services-testing',
  'ads-amazon-marketing-agency',
  'instagram-marketing-funnel',
  'seo-services-funnel',
]);

function slugifyCategory(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

/** Share images: pages show WebP copies, but some social networks only read JPG/PNG, so use the original. */
function shareableImage(p: string): string {
  if (!/\.webp$/i.test(p)) return p;
  for (const ext of ['.png', '.jpg', '.jpeg']) {
    const original = p.replace(/\.webp$/i, ext);
    try {
      if (fs.existsSync(path.join(PUBLIC_DIR, decodeURIComponent(original)))) return original;
    } catch {
      /* malformed path: keep the WebP */
    }
  }
  return p;
}

function normalizeImageUrl(img?: string): string | undefined {
  if (!img || !img.trim()) return undefined;
  const trimmed = img.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const local = shareableImage(trimmed.startsWith('/') ? trimmed : `/${trimmed}`);
  return `${BASE_URL}${local}`;
}

async function importFirstObjectExport(filePath: string): Promise<Record<string, unknown> | null> {
  const mod = (await import(pathToFileURL(filePath).href)) as Record<string, unknown>;
  for (const value of Object.values(mod)) {
    if (value && typeof value === 'object' && 'title' in value) {
      return value as Record<string, unknown>;
    }
  }
  return null;
}

async function buildManifest(): Promise<void> {
  const pages: Record<string, ManifestPageSeo> = {};

  const addPage = (routeKey: string, entry: ManifestPageSeo) => {
    const cleanKey = routeKey.replace(/^\/+|\/+$/g, '');
    pages[cleanKey] = entry;
  };

  // 1. Core Brand, AI, ChatGPT Ads, Portfolio, Blog Index & Utility Routes
  const homeSeo: ManifestPageSeo = {
    title: 'Digital Marketing Agency | AI, SEO & Web3 Services | EON8',
    description:
      'Partner with EON8 for AI-powered digital marketing, SEO, web development, performance marketing, branding, Web3 solutions, and business growth strategies.',
    canonicalPath: '/',
    inSitemap: true,
    priority: '1.0',
    changefreq: 'daily',
  };
  addPage('', homeSeo);
  addPage('home-page', { ...homeSeo, inSitemap: false });
  addPage('new-home', { ...homeSeo, inSitemap: false });
  addPage('gallery', { ...homeSeo, inSitemap: false });

  const aboutSeo: ManifestPageSeo = {
    title: 'About Eon8 Digital Marketing Agency',
    description:
      'At Eon8 you can get 360-degree Digital Marketing solution and online marketing services for brands and businesses to maintain digital presents.',
    canonicalPath: '/about-us',
    inSitemap: true,
    priority: '0.8',
    changefreq: 'monthly',
  };
  addPage('about-us', aboutSeo);
  addPage('about', { ...aboutSeo, inSitemap: false });

  addPage('contact', {
    title: "Contact Us | Let's Build Your Brand - Eon8",
    description:
      'At Eon8, we take your business to the next level with digital marketing and branding. Contact us & Get a Free Quote NOW.',
    canonicalPath: '/contact',
    inSitemap: true,
    priority: '0.8',
    changefreq: 'monthly',
  });

  addPage('thank-you', {
    title: 'Thank You | EON8 Digital Marketing Agency',
    description:
      'Thank you for reaching out to EON8. Our digital marketing and AI specialists will connect with you shortly.',
    canonicalPath: '/thank-you',
    noIndex: true,
    inSitemap: false,
  });

  addPage('ai-agent-development-services', {
    title: 'AI Agent Development Services for Business Growth',
    description:
      'Get advanced AI agent development services tailored to your business. Build scalable, personalized AI agents to automate tasks and boost productivity.',
    canonicalPath: '/ai-agent-development-services',
    inSitemap: true,
    priority: '0.9',
    changefreq: 'weekly',
  });

  const aiVideoSeo: ManifestPageSeo = {
    title: 'AI Video Creation Services | AI Video Production Company | EON8',
    description:
      'Create engaging AI-powered videos for your business with EON8. We deliver high-quality AI video creation services for marketing, branding, training, and promotions.',
    canonicalPath: '/ai-video-creation',
    inSitemap: true,
    priority: '0.9',
    changefreq: 'weekly',
  };
  addPage('ai-video-creation', aiVideoSeo);
  addPage('ai-video-agency', { ...aiVideoSeo, inSitemap: false });

  addPage('chatgpt-ads-agency', {
    title: 'ChatGPT Ads Agency in India | EON8',
    description:
      'EON8 is a ChatGPT Ads agency in India. We set up, run and optimise ChatGPT ads with AEO/GEO so your brand shows up in AI answers and ads.',
    canonicalPath: '/chatgpt-ads-agency',
    inSitemap: true,
    priority: '0.9',
    changefreq: 'weekly',
  });

  addPage('chatgpt-ads-agency/blog', {
    title: 'ChatGPT Ads & AI Search Playbook | EON8',
    description:
      'Research, playbooks, and insights on ChatGPT Ads, Answer Engine Optimisation (AEO), and Generative Engine Optimisation (GEO) by EON8.',
    canonicalPath: '/chatgpt-ads-agency/blog',
    inSitemap: true,
    priority: '0.8',
    changefreq: 'weekly',
  });

  addPage('chatgpt-ads-agency/education', {
    title: 'ChatGPT Ads Education Hub — AEO & GEO Guide | EON8',
    description:
      'Understand how ChatGPT Ads, AEO, and GEO work together to get Indian brands cited in AI answers and capture high-intent buyer enquiries.',
    canonicalPath: '/chatgpt-ads-agency/education',
    inSitemap: true,
    priority: '0.8',
    changefreq: 'monthly',
  });

  const blogListSeo: ManifestPageSeo = {
    title: 'Digital Marketing Blogs & Social Media Blogs Provider in Chennai',
    description:
      'Stay updated with the latest news, events, and other interesting information on Digital Marketing, Amazon Advertising, Web Development, ORM and much more!',
    canonicalPath: '/blog',
    inSitemap: true,
    priority: '0.9',
    changefreq: 'daily',
  };
  addPage('blog', blogListSeo);
  addPage('digital-marketing-blog', { ...blogListSeo, inSitemap: false });

  // Portfolio & Case Studies
  addPage('works', {
    title: 'Our Works, Portfolio & Case Study - Eon8',
    description:
      'Readout online marketing and branding case study for Poorvika, Cake Square, Ramraj, TVS, Chettinad Health City, NAC Jewelry.',
    canonicalPath: '/works',
    inSitemap: true,
    priority: '0.8',
    changefreq: 'monthly',
  });
  addPage('case-study-poorvika', {
    title: 'Poorvika Case Study: Digital Growth Strategy | Eon8',
    description:
      'Poorvika generated never before seen sales and revenue numbers by partnering with our marketing agency. We have compiled the practices in the case study.',
    canonicalPath: '/case-study-poorvika',
    ogImage: normalizeImageUrl('/wp-content/themes/eon8/assets/img/poorvika.jpg'),
    inSitemap: true,
    priority: '0.8',
    changefreq: 'monthly',
  });
  addPage('case-study-cake-square-chennai', {
    title: 'Case Study – Cake Square Chennai - Eon8',
    description:
      'We transformed a small business into a recognizable brand with personalized marketing strategies. Study the case study of Cake Square Chennai here.',
    canonicalPath: '/case-study-cake-square-chennai',
    ogImage: normalizeImageUrl('/wp-content/themes/eon8/assets/img/cake-square-baner.jpg'),
    inSitemap: true,
    priority: '0.8',
    changefreq: 'monthly',
  });
  addPage('case-study-hidden-secret', {
    title: 'Case Study Hidden Secret - Eon8',
    description:
      'Learn how the Hidden Secret Project generated 20x more revenue in less 2.5 months. Learn more about the campaign from our case study now.',
    canonicalPath: '/case-study-hidden-secret',
    inSitemap: true,
    priority: '0.8',
    changefreq: 'monthly',
  });

  // 2. Legal & Policy Pages
  for (const [slug, policy] of Object.entries(policyPagesData)) {
    addPage(slug, {
      title: policy.metaTitle,
      description: policy.metaDesc,
      canonicalPath: `/${slug}`,
      inSitemap: true,
      priority: '0.5',
      changefreq: 'monthly',
    });
  }
  addPage('privacy-policy', {
    title: policyPagesData['privacy-policy-2'].metaTitle,
    description: policyPagesData['privacy-policy-2'].metaDesc,
    canonicalPath: '/privacy-policy-2',
    inSitemap: false,
  });

  // 3. Crypto Pages (Agency + IEO Listing + 12 Crypto Services)
  const cryptoAgencySeo: ManifestPageSeo = {
    title: cryptoMarketingAgencyData.title,
    description: cryptoMarketingAgencyData.metaDesc,
    canonicalPath: '/crypto-marketing-agency',
    inSitemap: true,
    priority: '0.9',
    changefreq: 'weekly',
  };
  addPage('crypto-marketing-agency', cryptoAgencySeo);
  addPage('crptocurrency-marketing-agency', { ...cryptoAgencySeo, inSitemap: false });
  addPage('ieo-listing-services', {
    title: ieoListingData.title,
    description: ieoListingData.metaDesc,
    canonicalPath: '/ieo-listing-services',
    inSitemap: true,
    priority: '0.9',
    changefreq: 'weekly',
  });

  const cryptoServicesDir = path.join(ROOT_DIR, 'src/pages/crypto/data/services');
  for (const file of fs.readdirSync(cryptoServicesDir)) {
    if (!file.endsWith('.ts') || file === 'index.ts') continue;
    const slug = file.replace(/\.ts$/, '');
    const data = await importFirstObjectExport(path.join(cryptoServicesDir, file));
    if (!data) continue;
    addPage(slug, {
      title: String(data.title || `${slug} | EON8`),
      description: String(data.metaDesc || ''),
      canonicalPath: `/${slug}`,
      inSitemap: true,
      priority: '0.9',
      changefreq: 'weekly',
    });
  }

  // 4. Influencer Pages (5)
  for (const inf of [
    influencerAgencyData,
    instagramInfluencerData,
    tiktokInfluencerData,
    youtubeInfluencerData,
    twitterInfluencerData,
  ]) {
    addPage(inf.slug, {
      title: inf.title,
      description: inf.metaDesc,
      canonicalPath: `/${inf.slug}`,
      inSitemap: true,
      priority: '0.9',
      changefreq: 'weekly',
    });
  }

  // 5. NFT & Community Pages (22)
  const nftDirs = [
    path.join(ROOT_DIR, 'src/pages/nft/data/services'),
    path.join(ROOT_DIR, 'src/pages/nft/data/community'),
  ];
  for (const dir of nftDirs) {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.ts') || file === 'index.ts') continue;
      const slug = file.replace(/\.ts$/, '');
      const data = await importFirstObjectExport(path.join(dir, file));
      if (!data) continue;
      addPage(slug, {
        title: String(data.title || `${slug} | EON8`),
        description: String(data.metaDesc || ''),
        canonicalPath: `/${slug}`,
        inSitemap: true,
        priority: '0.9',
        changefreq: 'weekly',
      });
    }
  }
  if (pages['nft-game-marketing-services']) {
    addPage('nft-game-marketing-agency', {
      ...pages['nft-game-marketing-services'],
      canonicalPath: '/nft-game-marketing-services',
      inSitemap: false,
    });
  }

  // 6. All 83 Services, Packages & Funnels (`src/pages/services/data/*.ts`)
  const servicesDir = path.join(ROOT_DIR, 'src/pages/services/data');
  for (const slug of ALL_SERVICE_SLUGS) {
    const filePath = path.join(servicesDir, `${slug}.ts`);
    if (!fs.existsSync(filePath)) continue;
    const data = await importFirstObjectExport(filePath);
    if (!data) continue;
    const hero = data.hero as { image?: string } | undefined;
    const noIndex = Boolean(data.noIndex);
    addPage(slug, {
      title: String(data.title || `${slug} | EON8`),
      description: String(data.metaDesc || ''),
      canonicalPath: `/${slug}`,
      ogImage: normalizeImageUrl(hero?.image),
      noIndex,
      inSitemap: !noIndex && !EXCLUDED_SITEMAP_SLUGS.has(slug),
      priority: slug.endsWith('-packages') ? '0.8' : '0.9',
      changefreq: 'weekly',
    });
  }

  // Service route aliases from App.tsx
  const serviceAliases: Array<[string, string]> = [
    ['web-development-services-company', 'web-design-development-services-chennai'],
    ['google-ads-management-ppc-agency', 'ppc-company-chennai'],
    ['digital-marketing-services-chennai', 'digital-marketing-agency-in-chennai'],
  ];
  for (const [alias, target] of serviceAliases) {
    if (pages[target]) {
      addPage(alias, { ...pages[target], inSitemap: false });
    }
  }

  // 7. Blog Posts & Categories
  const blogPosts: Record<string, ManifestBlogPostSeo> = {};
  for (const post of BLOG_POSTS_SUMMARIES) {
    const metaTitle = post.seo?.metaTitle?.trim() || `${post.title} - Eon8`;
    const description = post.seo?.metaDescription?.trim() || post.excerpt;
    const ogImage = normalizeImageUrl(post.seo?.ogImage?.trim() || post.thumbnail);
    blogPosts[post.slug] = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      metaTitle,
      description,
      ogImage,
      dateIso: post.dateIso,
      author: post.author || 'EON8 Editorial Team',
      category: post.category,
    };
  }

  const blogCategories: Record<string, string> = {};
  for (const catName of BLOG_CATEGORIES_LIST) {
    const catSlug = slugifyCategory(catName);
    if (catSlug) blogCategories[catSlug] = catName;
  }

  // 8. Legacy WordPress Server-Side 301 Redirects (synced with App.tsx)
  const redirects: Record<string, string> = {
    '2020/08/26/orm-personal-branding-service-industry': '/blog/orm-personal-branding-service-industry',
    '2020/09/01/eon8-helps-in-removing-negative-reviews': '/blog/eon8-helps-in-removing-negative-reviews',
    'bring-your-brand-to-life-with-ai-avatars': '/blog/ai-avatar-video-agency',
    'digital-marketing-service-chennai': '/digital-marketing-agency-in-chennai',
    'fix-google-autofill-auto-suggests': '/clean-negative-search-results',
    'game-marketing-agency': '/game-marketing-agency-video-mobile-gaming',
    'how-do-the-negative-reviews-affect-your-company': '/blog/negative-reviews-affect-your-company',
    'instagram-marketing-agency': '/instagram-marketing-agency-services-instagram',
    'instagram-marketing-company-in-chennai': '/instagram-marketing-agency-services-instagram',
    'link-building-services': '/link-building-services-for-high-rankings',
    'linkedin-marketing-agency': '/linkedin-marketing-agency-chennai-services',
    'mobile-seo-agency': '/mobile-seo-agency-eon8-seo-services',
    'online-reputation-management-services': '/online-reputation-management-agency',
    'online-reputation-monitoring': '/online-reputation-management-agency',
    orm: '/online-reputation-management-agency',
    'remove-complaints': '/google-complaint-removal',
    'remove-complaints-from-google-search-results': '/remove-complaints-from-google-search',
    'remove-negative-reviews': '/remove-negative-reviews-back',
    'remove-online-complaints': '/consumer-complaints-removal',
    'reputation-management': '/reputation-management-services',
    'safeguarding-repairing-reputation': '/reputation-management-services',
    'search-engine-marketing': '/search-engine-marketing-service-chennai',
    'search-engine-optimization': '/search-engine-optimization-services-seo',
    'search-engine-optimization-service-chennai': '/search-engine-optimization-services-chennai',
    'search-engine-optimization-services': '/search-engine-optimization-services-seo',
    'social-media-brand-management-agency': '/social-media-brand-management-agency-chennai',
    'social-media-management-agency': '/social-media-management-agency-chennai',
    'social-media-marketing': '/social-media-marketing-company-chennai',
    'social-media-marketing-agency-chennai': '/social-media-marketing-company-chennai',
    'web-design-development': '/web-design-development-services-chennai',
    'web-design-development-service-chennai': '/web-design-development-services-chennai',
    'what-are-negative-links-and-how-are-they-affecting-the-orm': '/blog/negative-links-in-orm',
    'youtube-marketing-company': '/youtube-marketing-company-chennai-eon8',
    'influencer-marketing-services-new': '/influencer-marketing-agency',
    'influencer-marketing-services-test': '/influencer-marketing-agency',
    'influencer-marketing-test': '/influencer-marketing-agency',
    'ecommerce-services-test': '/ecommerce-website-development-services',
    'nft-marketing-test': '/nft-marketing-services',
    'nft-test': '/nft-marketing-services',
    'chatgpt-ads-agency/blog.html': '/chatgpt-ads-agency/blog',
    'chatgpt-ads-agency/education.html': '/chatgpt-ads-agency/education',
  };

  const manifest: SeoManifest = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    defaultOgImage: DEFAULT_OG_IMAGE,
    pages,
    blogPosts,
    blogCategories,
    redirects,
  };

  fs.mkdirSync(DIST_DIR, { recursive: true });
  const outPath = path.join(DIST_DIR, 'seo-manifest.json');
  fs.writeFileSync(outPath, `${JSON.stringify(manifest)}\n`, 'utf-8');
  console.log(
    `Generated SEO manifest at ${outPath} (${Object.keys(pages).length} pages, ${Object.keys(blogPosts).length} blog posts, ${Object.keys(redirects).length} redirects)`
  );
}

void buildManifest();
