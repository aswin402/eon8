import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { blogPostsBySlug } from '@/pages/blog/blogPostsData';
import { ALL_SERVICE_SLUGS } from '@/pages/services/types';

const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const AIAgentPage = lazy(() =>
  import('@/pages/AIAgentPage').then((m) => ({ default: m.AIAgentPage }))
);
const AIVideoPage = lazy(() =>
  import('@/pages/AIVideoPage').then((m) => ({ default: m.AIVideoPage }))
);
const ChatgptAdsAgencyPage = lazy(() => import('@/pages/chatgpt/ChatgptAdsAgencyPage'));
const ChatgptAdsSubPage = lazy(() => import('@/pages/chatgpt/ChatgptAdsSubPage'));
const PolicyPage = lazy(() =>
  import('@/pages/policy/PolicyPage').then((m) => ({ default: m.PolicyPage }))
);
const BlogListPage = lazy(() =>
  import('@/pages/blog/BlogListPage').then((m) => ({ default: m.BlogListPage }))
);
const BlogPostPage = lazy(() =>
  import('@/pages/blog/BlogPostPage').then((m) => ({ default: m.BlogPostPage }))
);
const CryptoMarketingAgencyPage = lazy(() => import('@/pages/crypto/CryptoMarketingAgencyPage'));
const IeoListingPage = lazy(() => import('@/pages/crypto/IeoListingPage'));
const CryptoServicePage = lazy(() => import('@/pages/crypto/CryptoServicePage'));
const InfluencerMarketingAgencyPage = lazy(
  () => import('@/pages/influencer/InfluencerMarketingAgencyPage')
);
const InstagramInfluencerPage = lazy(
  () => import('@/pages/influencer/InstagramInfluencerPage')
);
const ElementorInfluencerPage = lazy(
  () => import('@/pages/influencer/ElementorInfluencerPage')
);
const TwitterInfluencerPage = lazy(
  () => import('@/pages/influencer/TwitterInfluencerPage')
);
const NftServicePage = lazy(() => import('@/pages/nft/NftServicePage'));
const ElementorNftPage = lazy(() => import('@/pages/nft/ElementorNftPage'));
const OurServicesPage = lazy(() => import('@/pages/services/OurServicesPage'));
const WorksPage = lazy(() =>
  import('@/pages/PortfolioPages').then((m) => ({ default: m.WorksPage }))
);
const CaseStudyPage = lazy(() =>
  import('@/pages/PortfolioPages').then((m) => ({ default: m.CaseStudyPage }))
);
const ThankYouPage = lazy(() =>
  import('@/pages/ThankYouPage').then((m) => ({ default: m.ThankYouPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const CRYPTO_SERVICE_SLUGS = [
  'crypto-pr-services',
  'crypto-influencer-marketing',
  'crypto-telegram-marketing',
  'crypto-community-marketing',
  'crypto-video-creation-marketing',
  'crypto-twitter-influencer-marketing',
  'ico-marketing-agency',
  'ido-marketing-agency',
  'ieo-marketing-agency',
  'crypto-kol-agency',
  'sto-marketing-agency',
  'ico-listing-services',
] as const;

const cryptoServiceRoutes = CRYPTO_SERVICE_SLUGS.map((slug) => ({
  path: slug,
  element: <CryptoServicePage key={slug} slug={slug} />,
}));

const NFT_SERVICE_SLUGS = [
  'nft-marketing-services',
  'nft-art-agency',
  'nft-collection-marketing',
  'nft-community-marketing',
  'nft-game-marketing-services',
  'nft-game-marketing-agency',
  'nft-social-media-marketing',
  'nft-pr-services',
  'nft-telegram-marketing',
  'nft-twitter-marketing',
  'nft-youtube-marketing',
  'nft-reddit-marketing',
  'nft-game-discord-marketing',
  'discord-marketing-agency',
  'discord-game-marketing-agency',
  'discord-server-marketing',
  'discord-moderation-services',
  'nft-game-reddit-marketing',
  'pr-marketing-agency',
  'nft-free-consultation',
] as const;

const NFT_ELEMENTOR_SLUGS = [
  'reddit-community-marketing-agency',
  'discord-community-building-services',
] as const;

const nftServiceRoutes = NFT_SERVICE_SLUGS.map((slug) => ({
  path: slug,
  element: <NftServicePage key={slug} slug={slug} />,
}));

const nftElementorRoutes = NFT_ELEMENTOR_SLUGS.map((slug) => ({
  path: slug,
  element: <ElementorNftPage key={slug} slug={slug} />,
}));

const allServiceRoutes = ALL_SERVICE_SLUGS.map((slug) => ({
  path: slug,
  element: <OurServicesPage key={slug} slug={slug} />,
}));

const LEGACY_WP_REDIRECTS: readonly [string, string][] = [
  ['2020/08/26/orm-personal-branding-service-industry', '/blog/orm-personal-branding-service-industry'],
  ['2020/09/01/eon8-helps-in-removing-negative-reviews', '/blog/eon8-helps-in-removing-negative-reviews'],
  ['bring-your-brand-to-life-with-ai-avatars', '/blog/ai-avatar-video-agency'],
  ['digital-marketing-service-chennai', '/digital-marketing-agency-in-chennai'],
  ['fix-google-autofill-auto-suggests', '/clean-negative-search-results'],
  ['game-marketing-agency', '/game-marketing-agency-video-mobile-gaming'],
  ['how-do-the-negative-reviews-affect-your-company', '/blog/negative-reviews-affect-your-company'],
  ['instagram-marketing-agency', '/instagram-marketing-agency-services-instagram'],
  ['instagram-marketing-company-in-chennai', '/instagram-marketing-agency-services-instagram'],
  ['link-building-services', '/link-building-services-for-high-rankings'],
  ['linkedin-marketing-agency', '/linkedin-marketing-agency-chennai-services'],
  ['mobile-seo-agency', '/mobile-seo-agency-eon8-seo-services'],
  ['online-reputation-management-services', '/online-reputation-management-agency'],
  ['online-reputation-monitoring', '/online-reputation-management-agency'],
  ['orm', '/online-reputation-management-agency'],
  ['remove-complaints', '/google-complaint-removal'],
  ['remove-complaints-from-google-search-results', '/remove-complaints-from-google-search'],
  ['remove-negative-reviews', '/remove-negative-reviews-back'],
  ['remove-online-complaints', '/consumer-complaints-removal'],
  ['reputation-management', '/reputation-management-services'],
  ['safeguarding-repairing-reputation', '/reputation-management-services'],
  ['search-engine-marketing', '/search-engine-marketing-service-chennai'],
  ['search-engine-optimization', '/search-engine-optimization-services-seo'],
  ['search-engine-optimization-service-chennai', '/search-engine-optimization-services-chennai'],
  ['search-engine-optimization-services', '/search-engine-optimization-services-seo'],
  ['social-media-brand-management-agency', '/social-media-brand-management-agency-chennai'],
  ['social-media-management-agency', '/social-media-management-agency-chennai'],
  ['social-media-marketing', '/social-media-marketing-company-chennai'],
  ['social-media-marketing-agency-chennai', '/social-media-marketing-company-chennai'],
  ['web-design-development', '/web-design-development-services-chennai'],
  ['web-design-development-service-chennai', '/web-design-development-services-chennai'],
  ['what-are-negative-links-and-how-are-they-affecting-the-orm', '/blog/negative-links-in-orm'],
  ['youtube-marketing-company', '/youtube-marketing-company-chennai-eon8'],
  ['influencer-marketing-services-new', '/influencer-marketing-agency'],
  ['influencer-marketing-services-test', '/influencer-marketing-agency'],
  ['influencer-marketing-test', '/influencer-marketing-agency'],
  ['ecommerce-services-test', '/ecommerce-website-development-services'],
  ['nft-marketing-test', '/nft-marketing-services'],
  ['nft-test', '/nft-marketing-services'],
];

const legacyRedirectRoutes = LEGACY_WP_REDIRECTS.map(([from, to]) => ({
  path: from,
  element: <Navigate to={to} replace />,
}));

function DynamicSlugRoute() {
  const { slug } = useParams();
  if (slug && blogPostsBySlug[slug]) {
    return <BlogPostPage slug={slug} />;
  }
  return <NotFoundPage />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home-page', element: <HomePage /> },
      { path: 'new-home', element: <HomePage /> },
      { path: 'gallery', element: <HomePage /> },

      // Core Brand & AI Pages
      { path: 'about', element: <AboutPage /> },
      { path: 'about-us', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'thank-you', element: <ThankYouPage /> },
      { path: 'ai-agent-development-services', element: <AIAgentPage /> },
      { path: 'ai-video-creation', element: <AIVideoPage /> },
      { path: 'ai-video-agency', element: <AIVideoPage /> },
      { path: 'chatgpt-ads-agency', element: <ChatgptAdsAgencyPage /> },
      { path: 'chatgpt-ads-agency/blog', element: <ChatgptAdsSubPage mode="blog" /> },
      { path: 'chatgpt-ads-agency/blog.html', element: <ChatgptAdsSubPage mode="blog" /> },
      { path: 'chatgpt-ads-agency/education', element: <ChatgptAdsSubPage mode="education" /> },
      {
        path: 'chatgpt-ads-agency/education.html',
        element: <ChatgptAdsSubPage mode="education" />,
      },

      // Legal & Policy
      { path: 'privacy-policy-2', element: <PolicyPage slug="privacy-policy-2" /> },
      { path: 'privacy-policy', element: <PolicyPage slug="privacy-policy-2" /> },
      { path: 'terms-and-conditions', element: <PolicyPage slug="terms-and-conditions" /> },
      { path: 'refund-policy', element: <PolicyPage slug="refund-policy" /> },
      { path: 'delivery-policy', element: <PolicyPage slug="delivery-policy" /> },

      // Blog Archive, Pagination, Category Archives & Posts
      { path: 'blog', element: <BlogListPage /> },
      { path: 'blog/page/:pageNum', element: <BlogListPage /> },
      { path: 'digital-marketing-blog', element: <BlogListPage /> },
      { path: 'category/:categorySlug', element: <BlogListPage /> },
      { path: 'category/:categorySlug/page/:pageNum', element: <BlogListPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },

      // Native Pure-React Crypto Pages (14 menu pages + alias)
      {
        path: 'crypto-marketing-agency',
        element: <CryptoMarketingAgencyPage slug="crypto-marketing-agency" />,
      },
      {
        path: 'crptocurrency-marketing-agency',
        element: <CryptoMarketingAgencyPage slug="crptocurrency-marketing-agency" />,
      },
      { path: 'ieo-listing-services', element: <IeoListingPage /> },
      ...cryptoServiceRoutes,

      // Native Pure-React Influencer Pages (5 menu pages)
      { path: 'influencer-marketing-agency', element: <InfluencerMarketingAgencyPage /> },
      { path: 'instagram-influencer-marketing-agency', element: <InstagramInfluencerPage /> },
      {
        path: 'tiktok-influencer-marketing',
        element: (
          <ElementorInfluencerPage
            key="tiktok-influencer-marketing"
            slug="tiktok-influencer-marketing"
          />
        ),
      },
      {
        path: 'youtube-influencer-services',
        element: (
          <ElementorInfluencerPage
            key="youtube-influencer-services"
            slug="youtube-influencer-services"
          />
        ),
      },
      { path: 'twitter-influencer-marketing', element: <TwitterInfluencerPage /> },

      // Native Pure-React NFT, Discord & Community Pages (21 canonical menu routes + 1 alias)
      ...nftServiceRoutes,
      ...nftElementorRoutes,

      // Portfolio & Case Studies (4 dedicated native React routes)
      { path: 'works', element: <WorksPage /> },
      { path: 'case-study-poorvika', element: <CaseStudyPage slug="case-study-poorvika" /> },
      {
        path: 'case-study-cake-square-chennai',
        element: <CaseStudyPage slug="case-study-cake-square-chennai" />,
      },
      {
        path: 'case-study-hidden-secret',
        element: <CaseStudyPage slug="case-study-hidden-secret" />,
      },

      // Native Pure-React Services, ERP/CRM, Packages & Landing Pages (all 79 routes + aliases)
      ...allServiceRoutes,
      {
        path: 'web-development-services-company',
        element: (
          <OurServicesPage
            key="web-development-services-company"
            slug="web-design-development-services-chennai"
          />
        ),
      },
      {
        path: 'google-ads-management-ppc-agency',
        element: (
          <OurServicesPage
            key="google-ads-management-ppc-agency"
            slug="ppc-company-chennai"
          />
        ),
      },
      {
        path: 'digital-marketing-services-chennai',
        element: (
          <OurServicesPage
            key="digital-marketing-services-chennai"
            slug="digital-marketing-agency-in-chennai"
          />
        ),
      },

      // Legacy WordPress 301-Redirect Short Slugs (prevents 404s from older inline blog/service links)
      ...legacyRedirectRoutes,

      // Root-level Blog Post Slugs (169 WordPress posts) + 404 fallback
      { path: ':slug', element: <DynamicSlugRoute /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
