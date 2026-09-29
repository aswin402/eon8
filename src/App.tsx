import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';

const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AIAgentPage = lazy(() => import('@/pages/AIAgentPage').then(m => ({ default: m.AIAgentPage })));
const CryptoServicePage = lazy(() => import('@/pages/crypto/CryptoServicePage').then(m => ({ default: m.CryptoServicePage })));
const InfluencerServicePage = lazy(() => import('@/pages/influencer/InfluencerServicePage').then(m => ({ default: m.InfluencerServicePage })));
const NftServicePage = lazy(() => import('@/pages/nft/NftServicePage').then(m => ({ default: m.NftServicePage })));
const DigitalServicePage = lazy(() => import('@/pages/digital/DigitalServicePage').then(m => ({ default: m.DigitalServicePage })));
const PolicyPage = lazy(() => import('@/pages/policy/PolicyPage').then(m => ({ default: m.PolicyPage })));
const BlogListPage = lazy(() => import('@/pages/blog/BlogListPage').then(m => ({ default: m.BlogListPage })));
const BlogPostPage = lazy(() => import('@/pages/blog/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'ai-agent-development-services',
        element: <AIAgentPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'about-us',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'search-engine-optimization-services-seo',
        element: <DigitalServicePage type="search-engine-optimization-services-seo" />,
      },
      {
        path: 'local-seo-agency',
        element: <DigitalServicePage type="local-seo-agency" />,
      },
      {
        path: 'ecommerce-seo-services',
        element: <DigitalServicePage type="ecommerce-seo-services" />,
      },
      {
        path: 'mobile-seo-agency-eon8-seo-services',
        element: <DigitalServicePage type="mobile-seo-agency-eon8-seo-services" />,
      },
      {
        path: 'small-business-seo-services',
        element: <DigitalServicePage type="small-business-seo-services" />,
      },
      {
        path: 'link-building-services-for-high-rankings',
        element: <DigitalServicePage type="link-building-services-for-high-rankings" />,
      },
      {
        path: 'game-marketing-agency-video-mobile-gaming',
        element: <DigitalServicePage type="game-marketing-agency-video-mobile-gaming" />,
      },
      {
        path: 'ecommerce-website-development-services',
        element: <DigitalServicePage type="ecommerce-website-development-services" />,
      },
      {
        path: 'web-design-development-services-chennai',
        element: <DigitalServicePage type="web-design-development-services-chennai" />,
      },
      {
        path: 'social-media-brand-management-agency-chennai',
        element: <DigitalServicePage type="social-media-brand-management-agency-chennai" />,
      },
      {
        path: 'social-media-management-agency-chennai',
        element: <DigitalServicePage type="social-media-management-agency-chennai" />,
      },
      {
        path: 'facebook-marketing-agency-in-chennai',
        element: <DigitalServicePage type="facebook-marketing-agency-in-chennai" />,
      },
      {
        path: 'twitter-marketing-agency-in-chennai-marketing',
        element: <DigitalServicePage type="twitter-marketing-agency-in-chennai-marketing" />,
      },
      {
        path: 'instagram-marketing-agency-services-instagram',
        element: <DigitalServicePage type="instagram-marketing-agency-services-instagram" />,
      },
      {
        path: 'linkedin-marketing-agency-chennai-services',
        element: <DigitalServicePage type="linkedin-marketing-agency-chennai-services" />,
      },
      {
        path: 'youtube-marketing-company-chennai-eon8',
        element: <DigitalServicePage type="youtube-marketing-company-chennai-eon8" />,
      },
      {
        path: 'reputation-management-services',
        element: <DigitalServicePage type="reputation-management-services" />,
      },
      {
        path: 'online-reputation-management-agency',
        element: <DigitalServicePage type="online-reputation-management-agency" />,
      },
      {
        path: 'clean-negative-search-results',
        element: <DigitalServicePage type="clean-negative-search-results" />,
      },
      {
        path: 'google-complaint-removal',
        element: <DigitalServicePage type="google-complaint-removal" />,
      },
      {
        path: 'complaints-board-removal',
        element: <DigitalServicePage type="complaints-board-removal" />,
      },
      {
        path: 'consumer-complaints-removal',
        element: <DigitalServicePage type="consumer-complaints-removal" />,
      },
      {
        path: 'search-advertising-company',
        element: <DigitalServicePage type="search-advertising-company" />,
      },
      {
        path: 'display-advertising-agency',
        element: <DigitalServicePage type="display-advertising-agency" />,
      },
      {
        path: 'best-remarketing-ad-agency',
        element: <DigitalServicePage type="best-remarketing-ad-agency" />,
      },
      {
        path: 'product-listing-ads-agency',
        element: <DigitalServicePage type="product-listing-ads-agency" />,
      },
      {
        path: 'android-apps-marketing-services-marketing',
        element: <DigitalServicePage type="android-apps-marketing-services-marketing" />,
      },
      {
        path: 'apple-app-store-optimization-services-ios',
        element: <DigitalServicePage type="apple-app-store-optimization-services-ios" />,
      },
      {
        path: 'android-game-marketing-services-eon8-marketing',
        element: <DigitalServicePage type="android-game-marketing-services-eon8-marketing" />,
      },
      {
        path: 'immersive-vr-marketing',
        element: <DigitalServicePage type="immersive-vr-marketing" />,
      },
      {
        path: 'augmented-reality-agency',
        element: <DigitalServicePage type="augmented-reality-agency" />,
      },
      {
        path: 'social-ar-solutions',
        element: <DigitalServicePage type="social-ar-solutions" />,
      },
      {
        path: 'vr-product-marketing',
        element: <DigitalServicePage type="vr-product-marketing" />,
      },
      {
        path: 'metaverse',
        element: <DigitalServicePage type="metaverse" />,
      },
      {
        path: 'crypto-pr-services',
        element: <CryptoServicePage type="crypto-pr-services" />,
      },
      {
        path: 'crypto-influencer-marketing',
        element: <CryptoServicePage type="crypto-influencer-marketing" />,
      },
      {
        path: 'crypto-telegram-marketing',
        element: <CryptoServicePage type="crypto-telegram-marketing" />,
      },
      {
        path: 'crypto-community-marketing',
        element: <CryptoServicePage type="crypto-community-marketing" />,
      },
      {
        path: 'crypto-video-creation-marketing',
        element: <CryptoServicePage type="crypto-video-creation-marketing" />,
      },
      {
        path: 'crypto-twitter-influencer-marketing',
        element: <CryptoServicePage type="crypto-twitter-influencer-marketing" />,
      },
      {
        path: 'ico-marketing-agency',
        element: <CryptoServicePage type="ico-marketing-agency" />,
      },
      {
        path: 'ido-marketing-agency',
        element: <CryptoServicePage type="ido-marketing-agency" />,
      },
      {
        path: 'ieo-marketing-agency',
        element: <CryptoServicePage type="ieo-marketing-agency" />,
      },
      {
        path: 'crypto-kol-agency',
        element: <CryptoServicePage type="crypto-kol-agency" />,
      },
      {
        path: 'sto-marketing-agency',
        element: <CryptoServicePage type="sto-marketing-agency" />,
      },
      {
        path: 'ico-listing-services',
        element: <CryptoServicePage type="ico-listing-services" />,
      },
      {
        path: 'ieo-listing-services',
        element: <CryptoServicePage type="ieo-listing-services" />,
      },
      {
        path: 'influencer-marketing-agency',
        element: <InfluencerServicePage type="influencer-marketing-agency" />,
      },
      {
        path: 'instagram-influencer-marketing-agency',
        element: <InfluencerServicePage type="instagram-influencer-marketing-agency" />,
      },
      {
        path: 'tiktok-influencer-marketing',
        element: <InfluencerServicePage type="tiktok-influencer-marketing" />,
      },
      {
        path: 'youtube-influencer-services',
        element: <InfluencerServicePage type="youtube-influencer-services" />,
      },
      {
        path: 'twitter-influencer-marketing',
        element: <InfluencerServicePage type="twitter-influencer-marketing" />,
      },
      {
        path: 'nft-marketing-services',
        element: <NftServicePage type="nft-marketing-services" />,
      },
      {
        path: 'nft-art-agency',
        element: <NftServicePage type="nft-art-agency" />,
      },
      {
        path: 'nft-collection-marketing',
        element: <NftServicePage type="nft-collection-marketing" />,
      },
      {
        path: 'nft-community-marketing',
        element: <NftServicePage type="nft-community-marketing" />,
      },
      {
        path: 'nft-game-marketing-services',
        element: <NftServicePage type="nft-game-marketing-services" />,
      },
      {
        path: 'nft-social-media-marketing',
        element: <NftServicePage type="nft-social-media-marketing" />,
      },
      {
        path: 'nft-pr-services',
        element: <NftServicePage type="nft-pr-services" />,
      },
      {
        path: 'nft-telegram-marketing',
        element: <NftServicePage type="nft-telegram-marketing" />,
      },
      {
        path: 'nft-twitter-marketing',
        element: <NftServicePage type="nft-twitter-marketing" />,
      },
      {
        path: 'nft-youtube-marketing',
        element: <NftServicePage type="nft-youtube-marketing" />,
      },
      {
        path: 'nft-reddit-marketing',
        element: <NftServicePage type="nft-reddit-marketing" />,
      },
      {
        path: 'nft-game-discord-marketing',
        element: <NftServicePage type="nft-game-discord-marketing" />,
      },
      {
        path: 'discord-marketing-agency',
        element: <NftServicePage type="discord-marketing-agency" />,
      },
      {
        path: 'discord-game-marketing-agency',
        element: <NftServicePage type="discord-game-marketing-agency" />,
      },
      {
        path: 'discord-server-marketing',
        element: <NftServicePage type="discord-server-marketing" />,
      },
      {
        path: 'discord-moderation-services',
        element: <NftServicePage type="discord-moderation-services" />,
      },
      {
        path: 'reddit-community-marketing-agency',
        element: <NftServicePage type="reddit-community-marketing-agency" />,
      },
      {
        path: 'discord-community-building-services',
        element: <NftServicePage type="discord-community-building-services" />,
      },
      {
        path: 'nft-game-reddit-marketing',
        element: <NftServicePage type="nft-game-reddit-marketing" />,
      },
      {
        path: 'pr-marketing-agency',
        element: <NftServicePage type="pr-marketing-agency" />,
      },
      {
        path: 'nft-free-consultation',
        element: <NftServicePage type="nft-free-consultation" />,
      },
      {
        path: 'crptocurrency-marketing-agency',
        element: <CryptoServicePage type="crptocurrency-marketing-agency" />,
      },
      {
        path: 'crypto-marketing-agency',
        element: <CryptoServicePage type="crypto-marketing-agency" />,
      },
      {
        path: 'digital-marketing-agency-in-chennai',
        element: <DigitalServicePage type="digital-marketing-agency-in-chennai" />,
      },
      {
        path: 'ppc-company-chennai',
        element: <DigitalServicePage type="ppc-company-chennai" />,
      },
      {
        path: 'social-media-marketing-company-chennai',
        element: <DigitalServicePage type="social-media-marketing-company-chennai" />,
      },
      {
        path: 'whatsapp-marketing-services',
        element: <DigitalServicePage type="whatsapp-marketing-services" />,
      },
      {
        path: 'privacy-policy-2',
        element: <PolicyPage slug="privacy-policy-2" />,
      },
      {
        path: 'privacy-policy',
        element: <PolicyPage slug="privacy-policy-2" />,
      },
      {
        path: 'terms-and-conditions',
        element: <PolicyPage slug="terms-and-conditions" />,
      },
      {
        path: 'refund-policy',
        element: <PolicyPage slug="refund-policy" />,
      },
      {
        path: 'delivery-policy',
        element: <PolicyPage slug="delivery-policy" />,
      },
      {
        path: 'blog',
        element: <BlogListPage />,
      },
      {
        path: 'digital-marketing-blog',
        element: <BlogListPage />,
      },
      {
        path: 'blog/:slug',
        element: <BlogPostPage />,
      },
      {
        path: 'operations-monitoring-agent',
        element: <BlogPostPage slug="operations-monitoring-agent" />,
      },
      {
        path: 'financial-assistant-agent-2026',
        element: <BlogPostPage slug="financial-assistant-agent-2026" />,
      },
      {
        path: 'health-and-wellness-coach-ai-agent',
        element: <BlogPostPage slug="health-and-wellness-coach-ai-agent" />,
      },
      {
        path: 'customer-support-ai-agent',
        element: <BlogPostPage slug="customer-support-ai-agent" />,
      },
      {
        path: 'content-operations-agent-ai-workflows-2026',
        element: <BlogPostPage slug="content-operations-agent-ai-workflows-2026" />,
      },
      {
        path: 'business-operations-agent-enterprise-automation',
        element: <BlogPostPage slug="business-operations-agent-enterprise-automation" />,
      },
      {
        path: 'sales-and-lead-generation-agent',
        element: <BlogPostPage slug="sales-and-lead-generation-agent" />,
      },
      {
        path: 'personalized-ai-agent',
        element: <BlogPostPage slug="personalized-ai-agent" />,
      },
      {
        path: 'data-loss-by-ai-lessons-and-prevention',
        element: <BlogPostPage slug="data-loss-by-ai-lessons-and-prevention" />,
      },
      {
        path: 'product-marketing-agency-using-ai',
        element: <BlogPostPage slug="product-marketing-agency-using-ai" />,
      },
      {
        path: 'performance-marketing-vs-traditional-marketing',
        element: <BlogPostPage slug="performance-marketing-vs-traditional-marketing" />,
      },
      {
        path: 'crm-software-development-trends-2026',
        element: <BlogPostPage slug="crm-software-development-trends-2026" />,
      },
      {
        path: 'erp-software-development',
        element: <BlogPostPage slug="erp-software-development" />,
      },
      {
        path: 'top-seo-agency-south-india',
        element: <BlogPostPage slug="top-seo-agency-south-india" />,
      },
      {
        path: 'seo-agency-south-india',
        element: <BlogPostPage slug="seo-agency-south-india" />,
      },
      {
        path: 'digital-marketing-agency-south-india',
        element: <BlogPostPage slug="digital-marketing-agency-south-india" />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;



