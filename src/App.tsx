import { lazy } from 'react';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
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
const SoftwarePage = lazy(() =>
  import('@/pages/SoftwarePage').then((m) => ({ default: m.SoftwarePage }))
);
const WorksPage = lazy(() => import('@/pages/WorksPage').then((m) => ({ default: m.WorksPage })));
const CaseStudyPage = lazy(() =>
  import('@/pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage }))
);
const PackagesPage = lazy(() =>
  import('@/pages/PackagesPage').then((m) => ({ default: m.PackagesPage }))
);
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

      // Core Brand & AI Pages
      { path: 'about', element: <AboutPage /> },
      { path: 'about-us', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'ai-agent-development-services', element: <AIAgentPage /> },
      { path: 'ai-video-creation', element: <AIVideoPage /> },
      { path: 'chatgpt-ads-agency', element: <ChatgptAdsAgencyPage /> },
      { path: 'chatgpt-ads-agency/blog', element: <ChatgptAdsSubPage mode="blog" /> },
      { path: 'chatgpt-ads-agency/blog.html', element: <ChatgptAdsSubPage mode="blog" /> },
      { path: 'chatgpt-ads-agency/education', element: <ChatgptAdsSubPage mode="education" /> },
      {
        path: 'chatgpt-ads-agency/education.html',
        element: <ChatgptAdsSubPage mode="education" />,
      },
      { path: 'crm-software-development', element: <SoftwarePage mode="crm" /> },
      { path: 'erp-software-development', element: <SoftwarePage mode="erp" /> },

      // Portfolio & Case Studies
      { path: 'works', element: <WorksPage /> },
      { path: 'gallery', element: <WorksPage /> },
      { path: 'case-study-poorvika', element: <CaseStudyPage slug="poorvika" /> },
      { path: 'case-study-cake-square-chennai', element: <CaseStudyPage slug="cake-square" /> },
      { path: 'case-study-hidden-secret', element: <CaseStudyPage slug="hidden-secret" /> },

      // Digital Marketing Packages
      { path: 'seo-packages', element: <PackagesPage slug="seo-packages" /> },
      { path: 'ppc-packages', element: <PackagesPage slug="ppc-packages" /> },
      { path: 'facebook-packages', element: <PackagesPage slug="facebook-packages" /> },
      { path: 'instagram-packages', element: <PackagesPage slug="instagram-packages" /> },
      { path: 'linkedin-packages', element: <PackagesPage slug="linkedin-packages" /> },
      { path: 'twitter-packages', element: <PackagesPage slug="twitter-packages" /> },

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

      // Native Pure-React Services & Landing Pages (all 71 Digital, SEO, Social, ORM, PPC, App, AR/VR, Metaverse, Amazon, D2C & Industry routes + aliases)
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
