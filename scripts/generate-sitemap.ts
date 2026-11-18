import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_SERVICE_SLUGS } from '../src/pages/services/types.ts';
import { BLOG_POSTS_SUMMARIES } from '../src/pages/blog/blogIndexData.ts';

interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: string;
}

const currentFilePath = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(currentFilePath);

const baseUrl = 'https://www.eon8.com';
const today = new Date().toISOString().split('T')[0];

const tier1Routes: SitemapEntry[] = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'about-us', priority: '0.8', changefreq: 'monthly' },
  { path: 'contact', priority: '0.8', changefreq: 'monthly' },
  { path: 'ai-agent-development-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'ai-video-creation', priority: '0.9', changefreq: 'weekly' },
  { path: 'chatgpt-ads-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'chatgpt-ads-agency/blog', priority: '0.8', changefreq: 'weekly' },
  { path: 'chatgpt-ads-agency/education', priority: '0.8', changefreq: 'monthly' },
  { path: 'crm-software-development', priority: '0.9', changefreq: 'weekly' },
  { path: 'erp-software-development', priority: '0.9', changefreq: 'weekly' },
  { path: 'works', priority: '0.8', changefreq: 'monthly' },
  { path: 'case-study-poorvika', priority: '0.8', changefreq: 'monthly' },
  { path: 'case-study-cake-square-chennai', priority: '0.8', changefreq: 'monthly' },
  { path: 'case-study-hidden-secret', priority: '0.8', changefreq: 'monthly' },
  { path: 'seo-packages', priority: '0.8', changefreq: 'weekly' },
  { path: 'ppc-packages', priority: '0.8', changefreq: 'weekly' },
  { path: 'facebook-packages', priority: '0.8', changefreq: 'weekly' },
  { path: 'instagram-packages', priority: '0.8', changefreq: 'weekly' },
  { path: 'linkedin-packages', priority: '0.8', changefreq: 'weekly' },
  { path: 'twitter-packages', priority: '0.8', changefreq: 'weekly' },
  { path: 'privacy-policy-2', priority: '0.5', changefreq: 'monthly' },
  { path: 'terms-and-conditions', priority: '0.5', changefreq: 'monthly' },
  { path: 'refund-policy', priority: '0.5', changefreq: 'monthly' },
  { path: 'delivery-policy', priority: '0.5', changefreq: 'monthly' },
  { path: 'blog', priority: '0.9', changefreq: 'daily' },
  { path: 'crypto-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'crypto-pr-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'crypto-influencer-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'crypto-telegram-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'crypto-community-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'crypto-video-creation-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'crypto-twitter-influencer-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'ico-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'ido-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'ieo-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'crypto-kol-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'sto-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'ico-listing-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'ieo-listing-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'influencer-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'instagram-influencer-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'tiktok-influencer-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'youtube-influencer-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'twitter-influencer-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-marketing-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-art-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-collection-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-community-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-game-marketing-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-social-media-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-pr-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-telegram-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-twitter-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-youtube-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-reddit-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-game-discord-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'discord-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'discord-game-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'discord-server-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'discord-moderation-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'reddit-community-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'discord-community-building-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-game-reddit-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: 'pr-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'nft-free-consultation', priority: '0.9', changefreq: 'weekly' },
];

const seen = new Set<string>(tier1Routes.map((r) => r.path));
const routes: SitemapEntry[] = [...tier1Routes];

for (const slug of ALL_SERVICE_SLUGS) {
  if (!seen.has(slug)) {
    seen.add(slug);
    routes.push({ path: slug, priority: '0.9', changefreq: 'weekly' });
  }
}

for (const post of BLOG_POSTS_SUMMARIES) {
  const blogPath = `blog/${post.slug}`;
  if (post.slug && !seen.has(blogPath)) {
    seen.add(blogPath);
    routes.push({ path: blogPath, priority: '0.7', changefreq: 'monthly' });
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}/${r.path ? `${r.path}/` : ''}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(scriptsDir, '../public/sitemap.xml');
fs.writeFileSync(outputPath, `${xml.trim()}\n`, 'utf-8');
console.log(`Generated sitemap.xml with ${routes.length} URLs at ${outputPath}`);
