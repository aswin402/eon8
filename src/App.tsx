import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { AIAgentPage } from '@/pages/AIAgentPage';
import { CryptoServicePage } from '@/pages/crypto/CryptoServicePage';
import { InfluencerServicePage } from '@/pages/influencer/InfluencerServicePage';
import { NftServicePage } from '@/pages/nft/NftServicePage';
import { DigitalServicePage } from '@/pages/digital/DigitalServicePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
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



