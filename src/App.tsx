import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { AIAgentPage } from '@/pages/AIAgentPage';
import { CryptoServicePage } from '@/pages/crypto/CryptoServicePage';
import { InfluencerServicePage } from '@/pages/influencer/InfluencerServicePage';
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



