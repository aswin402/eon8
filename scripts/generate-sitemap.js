import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://www.eon8.com';
const today = new Date().toISOString().split('T')[0];

const routes = [
  // Homepage
  { path: '', priority: '1.0', changefreq: 'daily' },

  // Flagship & Core
  { path: 'ai-agent-development-services', priority: '0.9', changefreq: 'weekly' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'about-us', priority: '0.8', changefreq: 'monthly' },
  { path: 'contact', priority: '0.8', changefreq: 'monthly' },
  { path: 'crptocurrency-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'crypto-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: 'digital-marketing-agency-in-chennai', priority: '0.9', changefreq: 'weekly' },
  { path: 'ppc-company-chennai', priority: '0.8', changefreq: 'weekly' },
  { path: 'social-media-marketing-company-chennai', priority: '0.8', changefreq: 'weekly' },
  { path: 'whatsapp-marketing-services', priority: '0.8', changefreq: 'weekly' },

  // Blog Hubs
  { path: 'blog', priority: '0.9', changefreq: 'daily' },
  { path: 'digital-marketing-blog', priority: '0.8', changefreq: 'daily' },

  // Digital Marketing Services
  { path: 'search-engine-optimization-services-seo', priority: '0.8', changefreq: 'weekly' },
  { path: 'local-seo-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'ecommerce-seo-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'mobile-seo-agency-eon8-seo-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'small-business-seo-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'link-building-services-for-high-rankings', priority: '0.8', changefreq: 'weekly' },
  { path: 'game-marketing-agency-video-mobile-gaming', priority: '0.8', changefreq: 'weekly' },
  { path: 'ecommerce-website-development-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'web-design-development-services-chennai', priority: '0.8', changefreq: 'weekly' },
  { path: 'social-media-brand-management-agency-chennai', priority: '0.8', changefreq: 'weekly' },
  { path: 'social-media-management-agency-chennai', priority: '0.8', changefreq: 'weekly' },
  { path: 'facebook-marketing-agency-in-chennai', priority: '0.8', changefreq: 'weekly' },
  { path: 'twitter-marketing-agency-in-chennai-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'instagram-marketing-agency-services-instagram', priority: '0.8', changefreq: 'weekly' },
  { path: 'linkedin-marketing-agency-chennai-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'youtube-marketing-company-chennai-eon8', priority: '0.8', changefreq: 'weekly' },
  { path: 'reputation-management-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'online-reputation-management-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'clean-negative-search-results', priority: '0.8', changefreq: 'weekly' },
  { path: 'google-complaint-removal', priority: '0.8', changefreq: 'weekly' },
  { path: 'complaints-board-removal', priority: '0.8', changefreq: 'weekly' },
  { path: 'consumer-complaints-removal', priority: '0.8', changefreq: 'weekly' },
  { path: 'search-advertising-company', priority: '0.8', changefreq: 'weekly' },
  { path: 'display-advertising-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'best-remarketing-ad-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'product-listing-ads-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'android-apps-marketing-services-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'apple-app-store-optimization-services-ios', priority: '0.8', changefreq: 'weekly' },
  { path: 'android-game-marketing-services-eon8-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'immersive-vr-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'augmented-reality-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'social-ar-solutions', priority: '0.8', changefreq: 'weekly' },
  { path: 'vr-product-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'metaverse', priority: '0.8', changefreq: 'weekly' },

  // Crypto / Web3 Services
  { path: 'crypto-pr-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'crypto-influencer-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'crypto-telegram-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'crypto-community-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'crypto-video-creation-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'crypto-twitter-influencer-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'ico-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'ido-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'ieo-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'crypto-kol-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'sto-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'ico-listing-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'ieo-listing-services', priority: '0.8', changefreq: 'weekly' },

  // Influencer Services
  { path: 'influencer-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'instagram-influencer-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'tiktok-influencer-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'youtube-influencer-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'twitter-influencer-marketing', priority: '0.8', changefreq: 'weekly' },

  // NFT Services
  { path: 'nft-marketing-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-art-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-collection-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-community-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-game-marketing-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-social-media-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-pr-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-telegram-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-twitter-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-youtube-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-reddit-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-game-discord-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'discord-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'discord-game-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'discord-server-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'discord-moderation-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'reddit-community-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'discord-community-building-services', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-game-reddit-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: 'pr-marketing-agency', priority: '0.8', changefreq: 'weekly' },
  { path: 'nft-free-consultation', priority: '0.8', changefreq: 'weekly' },

  // Legal & Policy
  { path: 'privacy-policy-2', priority: '0.5', changefreq: 'monthly' },
  { path: 'privacy-policy', priority: '0.5', changefreq: 'monthly' },
  { path: 'terms-and-conditions', priority: '0.5', changefreq: 'monthly' },
  { path: 'refund-policy', priority: '0.5', changefreq: 'monthly' },
  { path: 'delivery-policy', priority: '0.5', changefreq: 'monthly' },

  // Blog Articles
  { path: 'operations-monitoring-agent', priority: '0.7', changefreq: 'monthly' },
  { path: 'financial-assistant-agent-2026', priority: '0.7', changefreq: 'monthly' },
  { path: 'health-and-wellness-coach-ai-agent', priority: '0.7', changefreq: 'monthly' },
  { path: 'customer-support-ai-agent', priority: '0.7', changefreq: 'monthly' },
  { path: 'content-operations-agent-ai-workflows-2026', priority: '0.7', changefreq: 'monthly' },
  { path: 'business-operations-agent-enterprise-automation', priority: '0.7', changefreq: 'monthly' },
  { path: 'sales-and-lead-generation-agent', priority: '0.7', changefreq: 'monthly' },
  { path: 'personalized-ai-agent', priority: '0.7', changefreq: 'monthly' },
  { path: 'data-loss-by-ai-lessons-and-prevention', priority: '0.7', changefreq: 'monthly' },
  { path: 'product-marketing-agency-using-ai', priority: '0.7', changefreq: 'monthly' },
  { path: 'performance-marketing-vs-traditional-marketing', priority: '0.7', changefreq: 'monthly' },
  { path: 'crm-software-development-trends-2026', priority: '0.7', changefreq: 'monthly' },
  { path: 'erp-software-development', priority: '0.7', changefreq: 'monthly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}/${r.path ? r.path + '/' : ''}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml.trim() + '\n', 'utf-8');
console.log(`Generated sitemap.xml with ${routes.length} URLs at ${outputPath}`);
