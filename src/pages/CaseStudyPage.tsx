import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Quote } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export type CaseStudySlug = 'poorvika' | 'cake-square' | 'hidden-secret';

interface CaseStudyPageProps {
  slug: CaseStudySlug;
}

interface RetailStudyConfig {
  metaTitle: string;
  metaDesc: string;
  bannerTitle: string;
  logo: string;
  logoAlt: string;
  heroImage: string;
  heroAlt: string;
  brandHeading: string;
  brandCopy: string;
  websiteUrl?: string;
  agencyHeading: string;
  agencySubheading: string;
  agencyCopy: string;
  agencyImage: string;
  objectiveCopy: string;
  objectiveImage: string;
  objectiveImageFirst: boolean;
  backgroundCopy: string;
  backgroundImage: string;
  executionParagraphs: string[];
  executionImage?: string;
  resultsParagraphs: string[];
  resultsImage: string;
  metrics: { value: string; label: string }[];
}

const RETAIL_STUDIES: Record<'poorvika' | 'cake-square', RetailStudyConfig> = {
  poorvika: {
    metaTitle: 'Case Study - Poorvika - Eon8',
    metaDesc:
      'Discover how Eon8 transformed Poorvika Mobile Pvt Ltd into a social media powerhouse with 9,18,000+ Facebook likes and 1.1M+ campaign reach.',
    bannerTitle: 'Case Study – Poorvika',
    logo: '/wp-content/uploads/2019/09/poorvika.png',
    logoAlt: 'Poorvika Mobile Pvt Ltd Logo',
    heroImage: '/wp-content/themes/eon8/assets/img/poorvika.jpg',
    heroAlt: 'Poorvika Mobile Retail Showroom',
    brandHeading: 'BRAND – POORVIKA MOBILE PVT LTD',
    brandCopy:
      'Poorvika is a leading multi-brand retail chain that deals in mobile phones and connections, accessories, recharges and internet data cards.',
    agencyHeading: 'AGENCY',
    agencySubheading: 'S A EONSOFTTECH PVT LTD',
    agencyCopy:
      'EON is a digital marketing agency with a team of creative experts that help businesses produce efficient marketing activities. Through daily Facebook posts and rigorous activities on Twitter, EON helps its clients reach more people through social media.',
    agencyImage: '/wp-content/themes/eon8/assets/img/eon-softtech_3.jpg',
    objectiveCopy:
      'Poorvika aims at amalgamating the look, touch and feel of mobile outlets with the choice, convenience and elegance to its customers.',
    objectiveImage: '/wp-content/themes/eon8/assets/img/objective.png',
    objectiveImageFirst: true,
    backgroundCopy:
      'When Poorvika started its business, they did not have an active social media presence. This meant that there were no records of customer data and the company had no scope to study the nature of their prospective customers and grow in the industry.',
    backgroundImage: '/wp-content/themes/eon8/assets/img/poorvika_2.jpg',
    executionParagraphs: [
      'Traffic was directed to the website through Facebook campaigns and this meant more people were visiting their website. The marketing team at EON ran various aggressive “Facebook Ad Campaigns” for Poorvika. These campaigns were aimed at building a brand name and popularity for the company on social media by increasing the “number of followers” on their Facebook page and making their FB ads visible to more Facebook users. Using relevant hashtags on Facebook also helped in reaching the niche audience.',
    ],
    resultsParagraphs: [
      'Through all the Facebook campaigns, Poorvika established a strong fan base on social media. The brand name of Poorvika started to become more popular. Their Facebook page currently has 9,18,000 likes. The company brand reached 1.1 million people through a one-week Ad campaign for the promotion of Micromax. The efforts on Facebook slowly started to generate leads for Poorvika, and these leads were soon converted to actual customers that went to Poorvika’s showroom. Poorvika now has a huge fan base and many visitors on their site daily.',
    ],
    resultsImage: '/wp-content/themes/eon8/assets/img/poorvika_case_study.jpg',
    metrics: [
      { value: '9,18,000+', label: 'Facebook Page Likes' },
      { value: '1.1 Million', label: 'One-Week Ad Reach (Micromax)' },
      { value: 'Daily Footfall', label: 'Social Leads Converted In-Store' },
    ],
  },
  'cake-square': {
    metaTitle: 'Case Study – Cake Square Chennai - Eon8',
    metaDesc:
      'We transformed a small business into a recognizable brand with personalized marketing strategies. Study the case study of Cake Square Chennai here.',
    bannerTitle: 'Case Study – Cake Square Chennai',
    logo: '/wp-content/themes/eon8/assets/img/cake-square-logo.png',
    logoAlt: 'Cake Square Chennai Logo',
    heroImage: '/wp-content/themes/eon8/assets/img/cake-square-baner.jpg',
    heroAlt: 'Cake Square Chennai Custom Cakes Showcase',
    brandHeading: 'Cake Square',
    brandCopy:
      'Cake Square partnered with SA EON Softtech Pvt Ltd in order to build a brand name and become more visible on the internet. EON is a digital marketing agency with a team of creative experts that help businesses produce efficient marketing activities. Through daily Facebook posts and rigorous activities on Twitter, EON helps its clients reach more people through social media.',
    websiteUrl: 'https://cakesquarechennaionline.com/',
    agencyHeading: 'AGENCY',
    agencySubheading: 'S A EONSOFTTECH PVT LTD',
    agencyCopy:
      'Cake Square partnered with SA EON Softtech Pvt Ltd in order to build a brand name and become more visible on the internet. EON is a digital marketing agency with a team of creative experts that help businesses produce efficient marketing activities. Through daily Facebook posts and rigorous activities on Twitter, EON helps its clients reach more people through social media.',
    agencyImage: '/wp-content/themes/eon8/assets/img/cake-square.jpg',
    objectiveCopy:
      "Cake Square aims at providing exceptional customer service and excellent baking skills to its customers. They strive to go the extra mile to undertaking 'midnight cake delivery' and 'doorstep delivery' for special occasions.",
    objectiveImage: '/wp-content/themes/eon8/assets/img/cake-square-object.jpg',
    objectiveImageFirst: false,
    backgroundCopy:
      'Cake Square did not have any website or presence on social media platforms and was struggling to climb the ladder and increase their reach to people. They approached EON to boost their social media visibility and generate more leads and gain customers.',
    backgroundImage: '/wp-content/themes/eon8/assets/img/cake-square-execution.jpg',
    executionParagraphs: [
      'EON created a dynamic and interactive website for Cake Square and directed to the site which increased the number of customers. Through Facebook and Google Ad campaigns, traffic was directed to the Cake Square website. The marketing team at EON ran various aggressive “Facebook Ad Campaigns” for Cake Square. These campaigns were aimed at building a brand name and popularity for the company on social media by increasing the “number of followers” on their Facebook page and making their FB ads visible to more Facebook users.',
      'The creative and talented team of content writers and designers created the most intrinsic posts for their Facebook page. Including relevant hashtags increased the reach of each post.',
      'Seasonal campaigns were run for this client to generate more leads during festivals. During New Year, Diwali and Christmas, their customised products were promoted aggressively on social media and this brought more customers to Cake Square.',
      'When it came to “Google Ads”, EON ran multiple paid campaigns and bid at the most effective prices for as many keywords as possible.',
    ],
    executionImage: '/wp-content/themes/eon8/assets/img/cake-square-execution.jpg',
    resultsParagraphs: [
      'Through all the Facebook campaigns, Cake Square established a strong fan base on social media. The brand name of Cake Square started to become more. Their Facebook page currently has 1,60,000 likes. Twitter, Instagram and other social media platforms were created and traffic was generated to their pages. This improved their online value, reputation and reach to the public.',
      'The Google Ads run by EON for Cake Square helped in building a good brand name for them. Their website was pulled up first on searching for cakes and delivery in Chennai.',
      'The combined efforts on Facebook and Google slowly started to generate leads for the Cake Square website, and these leads were soon converted to actual customers. Through these Ad campaigns, Cake Square has now become a 30 lakhs generating business.',
    ],
    resultsImage: '/wp-content/themes/eon8/assets/img/cake-square-result.jpg',
    metrics: [
      { value: '1,60,000+', label: 'Facebook Page Likes' },
      { value: '#1 Search', label: 'Google Rank: Cakes & Delivery in Chennai' },
      { value: '30 Lakhs', label: 'Revenue-Generating Business Milestone' },
    ],
  },
};

const HIDDEN_SECRET_HIGHLIGHTS = [
  'TRUCK STUNT CAMPAIGN',
  '300+ PRESS RELEASES',
  '30+ INFLUENCER CAMPAIGNS ON THE SAME DAY',
];

const HIDDEN_SECRET_PROMISES = [
  {
    icon: '/wp-content/uploads/2022/11/discord.svg',
    text: 'Building an organic community in discord',
  },
  {
    icon: '/wp-content/uploads/2022/11/twitter.svg',
    text: '100 Twitter retweeting influencer campaigns',
  },
  {
    icon: '/wp-content/uploads/2022/11/campaign.svg',
    text: 'New York city truck campaign stunt',
  },
];

const HIDDEN_SECRET_TRICKS = [
  {
    title: 'Organic Discord Community Growth',
    body: "Our Discord community manager was able to implement a variety of strategies to establish a genuine community in the discord channels. These techniques comprised not just the daily freebie and contest tactics but also a great deal of helpful listing sites that attracted a sizable number of genuine NFT-minting crowds to our community.",
  },
  {
    title: 'Synchronized Twitter Influencer Push',
    body: "A massive Twitter influencer campaign was planned well ahead of the mint date and the execution even brought big surprises to the team. The influencers not only tweeted and retweeted but communicated creatively to their followers who in turn became potential NFT buyers. The top 100 influencers pinning the tweet on their respective pages during the project's mint day, made a huge difference by creating a 150% increase in the website’s mint landing page.",
  },
  {
    title: 'NYC Times Square Truck PR Stunt',
    body: 'We make dreams come true & from years of experience in advertising, we gained connections with some esteemed people who helped us execute this VIRAL PR STUNT without spending thousands of dollars and made the heads turn to our advertisement. We noticed a 124% increase in website traffic and engagement after the campaign. The truck went around NYC with the mint barcode that made people get their NFTs on the go.',
  },
];

const HIDDEN_SECRET_TEAM = [
  { avatar: '/wp-content/uploads/2022/11/profile-1.png', role: 'Project Manager' },
  { avatar: '/wp-content/uploads/2022/11/profile-2.png', role: 'Project Strategist' },
  { avatar: '/wp-content/uploads/2022/11/profile-3.png', role: 'Community Manager' },
  { avatar: '/wp-content/uploads/2022/11/profile-4.png', role: 'Community Moderator' },
  { avatar: '/wp-content/uploads/2022/11/profile-4.png', role: 'PR Manager' },
  { avatar: '/wp-content/uploads/2022/11/profile-3.png', role: 'Influencer Relationship Manager' },
  { avatar: '/wp-content/uploads/2022/11/profile-2.png', role: 'Content Writer' },
  { avatar: '/wp-content/uploads/2022/11/profile-1.png', role: 'Professional NFT Artist/Designer' },
];

const HIDDEN_SECRET_GALLERY = [
  '/wp-content/uploads/2022/11/hidden-4.jpeg',
  '/wp-content/uploads/2022/11/hidden-3.jpeg',
  '/wp-content/uploads/2022/11/hidden-2.jpeg',
  '/wp-content/uploads/2022/11/hidden-1.jpeg',
  '/wp-content/uploads/2022/11/02_Genie.png',
  '/wp-content/uploads/2022/11/01_Creative.png',
  '/wp-content/uploads/2022/11/09_MagicPotion.png',
  '/wp-content/uploads/2022/11/06_Boat.png',
];

const HIDDEN_SECRET_PRESS = [
  { src: '/wp-content/uploads/2022/11/nft-now.png', alt: 'nft now' },
  { src: '/wp-content/uploads/2022/11/cointelegraph.png', alt: 'Cointelegraph' },
  { src: '/wp-content/uploads/2022/11/OpenSea.png', alt: 'OpenSea' },
  { src: '/wp-content/uploads/2022/11/logoyahoo.png', alt: 'Yahoo' },
  { src: '/wp-content/uploads/2022/11/forbes.png', alt: 'Forbes' },
];

const HIDDEN_SECRET_METRICS = [
  { value: '150%', label: 'Increase in daily website visits' },
  { value: '2X', label: 'Return on AD spent' },
  { value: '90%', label: 'Mint rate on Mint Day' },
  { value: '5M+', label: 'Impressions from the truck campaign' },
];

function CaseStudyFooterStrip({ current }: { current: CaseStudySlug }) {
  const { setContactModalOpen } = useAppStore();
  const others = (
    [
      {
        slug: 'poorvika',
        title: 'Poorvika Mobile Pvt Ltd',
        path: '/case-study-poorvika',
        desc: '9,18,000+ Facebook likes & 1.1M+ campaign reach',
      },
      {
        slug: 'cake-square',
        title: 'Cake Square Chennai',
        path: '/case-study-cake-square-chennai',
        desc: '1,60,000+ followers & 30 Lakhs revenue growth',
      },
      {
        slug: 'hidden-secret',
        title: 'Hidden Secret — NYC Times Square',
        path: '/case-study-hidden-secret',
        desc: '2X ROAS, 90% mint-day sellout & 5M+ truck impressions',
      },
    ] as const
  ).filter((c) => c.slug !== current);

  return (
    <>
      <section className="py-14 px-5 sm:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1170px] mx-auto">
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mb-6">
            Explore More EON8 Case Studies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((item) => (
              <Link
                key={item.slug}
                to={item.path}
                className="group flex items-center justify-between p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#f7841d] transition-all"
              >
                <div>
                  <div className="text-lg font-heading font-bold text-slate-900 group-hover:text-[#f7841d] transition-colors">
                    {item.title}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#f7841d] shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-12 px-5 sm:px-8 bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(11, 27, 63, 0.9), rgba(245, 131, 34, 0.85)), url('/wp-content/uploads/2022/06/cta-banner.png')`,
        }}
      >
        <div className="max-w-[1170px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-heading font-light text-white">
              Ready to write your brand’s <strong className="font-bold">Success Story</strong>?
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              Partner with EON8 to launch high-ROI digital, AI, and Web3 growth campaigns.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="px-7 py-3.5 rounded-full bg-[#f58322] hover:bg-[#ea740f] text-white font-semibold text-sm shadow-lg transition-colors cursor-pointer"
            >
              Get Free Proposal
            </button>
            <Link
              to="/works"
              className="px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-sm transition-colors"
            >
              All Works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function RetailCaseStudyView({ slug }: { slug: 'poorvika' | 'cake-square' }) {
  const study = RETAIL_STUDIES[slug];

  useEffect(() => {
    document.title = study.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', study.metaDesc);
    }
    window.scrollTo(0, 0);
  }, [study]);

  return (
    <div className="bg-white text-slate-900 font-body overflow-x-clip">
      {/* Live EON8 Blue Graph Title Banner + Client Logo Badge */}
      <header
        className="relative w-full min-h-[220px] sm:min-h-[270px] flex items-center pt-20 pb-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(11, 27, 63, 0.85), rgba(0, 83, 198, 0.62)), url('/wp-content/uploads/2019/08/page_title_bg.jpg')`,
        }}
      >
        <div className="max-w-[1170px] mx-auto w-full px-5 sm:px-8 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="relative inline-block pl-4 sm:pl-5 py-1">
            <span
              aria-hidden="true"
              className="absolute left-0 -top-1 w-[56px] sm:w-[65px] h-[calc(100%+10px)] bg-[#f7821b] -z-10"
            />
            <h1 className="text-2xl sm:text-[38px] font-heading font-bold uppercase text-white m-0 tracking-wide">
              {study.bannerTitle}
            </h1>
          </div>

          <div className="inline-flex items-center justify-center bg-white rounded-md px-5 py-3 shadow-lg self-start sm:self-auto">
            <img
              src={study.logo}
              alt={study.logoAlt}
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>
        </div>
      </header>

      {/* Hero Client Showcase Photo */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14">
        <div className="overflow-hidden rounded-xl shadow-[0_3px_20px_rgba(0,0,0,0.18)] border border-slate-100">
          <img
            src={study.heroImage}
            alt={study.heroAlt}
            className="w-full h-auto max-h-[540px] object-cover block"
          />
        </div>
      </section>

      {/* Brand + Agency Section */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f7841d]">
              Client Profile
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
              {study.brandHeading}
            </h2>
            <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base">
              {study.brandCopy}
            </p>
            {study.websiteUrl && (
              <div className="pt-2">
                <a
                  href={study.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#f7841d] hover:bg-[#e57310] text-white font-semibold text-sm transition-colors shadow"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#f7841d]">
                  {study.agencyHeading}
                </h4>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  {study.agencySubheading}
                </h3>
                <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                  {study.agencyCopy}
                </p>
              </div>
              <div className="md:col-span-5">
                <img
                  src={study.agencyImage}
                  alt={study.agencySubheading}
                  loading="lazy"
                  className="w-full rounded-lg shadow-md object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objective + Background */}
      <section className="bg-slate-50/80 border-y border-slate-200 py-14 sm:py-20 px-5 sm:px-8">
        <div className="max-w-[1170px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl shadow-md border border-slate-200 bg-white">
              <img
                src={study.objectiveImage}
                alt="Campaign Objective"
                loading="lazy"
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-heading font-bold uppercase tracking-wide text-[#f7841d]">
                OBJECTIVE
              </h4>
              <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base">
                {study.objectiveCopy}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 border-r-0 lg:border-r-[12px] border-[#f7841d] lg:pr-6">
              <h4 className="text-lg font-heading font-bold uppercase tracking-wide text-[#f7841d]">
                BACKGROUND
              </h4>
              <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base">
                {study.backgroundCopy}
              </p>
            </div>
            <div className="overflow-hidden rounded-xl shadow-md border border-slate-200 bg-white">
              <img
                src={study.backgroundImage}
                alt="Client Background"
                loading="lazy"
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Execution & Results */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 py-14 sm:py-20 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className={study.executionImage ? 'lg:col-span-6 space-y-4' : 'lg:col-span-12 space-y-4 max-w-4xl'}>
            <span className="text-xs font-bold uppercase tracking-widest text-[#f7841d]">
              Strategy in Action
            </span>
            <h2 className="text-3xl font-heading font-bold text-slate-900 uppercase">EXECUTION</h2>
            <div className="space-y-4 text-slate-700 text-[15px] sm:text-base leading-relaxed">
              {study.executionParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
          {study.executionImage && (
            <div className="lg:col-span-6">
              <img
                src={study.executionImage}
                alt="Campaign Execution"
                loading="lazy"
                className="w-full rounded-xl shadow-lg border border-slate-100 object-cover"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <img
              src={study.resultsImage}
              alt="Campaign Results"
              loading="lazy"
              className="w-full rounded-xl shadow-lg border border-slate-100 object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f7841d]">
              Measurable Outcomes
            </span>
            <h2 className="text-3xl font-heading font-bold text-slate-900 uppercase">RESULTS</h2>
            <div className="space-y-4 text-slate-700 text-[15px] sm:text-base leading-relaxed">
              {study.resultsParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl bg-orange-50/70 border border-orange-200 p-4"
                >
                  <div className="text-xl sm:text-2xl font-heading font-black text-[#f7841d]">
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CaseStudyFooterStrip current={slug} />
    </div>
  );
}

function HiddenSecretCaseStudyView() {
  useEffect(() => {
    document.title = 'Case Study Hidden Secret - Eon8';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn how the Hidden Secret Project generated 20x more revenue in less 2.5 months. Learn more about the campaign from our case study now.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-slate-900 font-body overflow-x-clip">
      {/* Magenta -> Charcoal Hero Banner matching live .banner-inr-digital */}
      <section
        className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-5 sm:px-8 text-white overflow-hidden"
        style={{ background: 'linear-gradient(126deg, #191919 0%, #c22677 100%)' }}
      >
        <div className="max-w-[1170px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold uppercase tracking-widest">
              NFT &amp; Web3 Marketing Case Study
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-heading font-bold leading-tight text-white">
              For someone who believes in manifestation, our client wanted his project to be showcased in front of NYC times square in 3 months
            </h1>
            <div className="inline-block px-5 py-2.5 rounded-lg bg-[#f58322] text-white font-heading font-extrabold text-xl sm:text-2xl tracking-wide shadow-lg">
              WE DID IT IN 7 DAYS
            </div>

            <div className="pt-2 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-pink-200">
                Project Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HIDDEN_SECRET_HIGHLIGHTS.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-xl bg-black/35 backdrop-blur border border-white/15 p-3.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-white"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="/wp-content/uploads/2022/11/case-study-hidden-secret.png"
              alt="Hidden Secret NYC Times Square Case Study"
              className="w-full h-auto rounded-2xl object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* NYC Truck Campaign Photo */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="overflow-hidden rounded-2xl shadow-xl border border-slate-200">
          <img
            src="/wp-content/uploads/2022/11/truck-campaign-scaled.jpg"
            alt="New York City Truck Campaign Stunt"
            className="w-full h-auto max-h-[540px] object-cover block"
          />
        </div>
      </section>

      {/* The Magic We Promised To Stage */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
            The Magic We Promised To Stage
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIDDEN_SECRET_PROMISES.map((item) => (
            <div
              key={item.text}
              className="rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 text-center flex flex-col items-center justify-center gap-5"
            >
              <img
                src={item.icon}
                alt={item.text}
                loading="lazy"
                className="h-20 w-20 object-contain"
              />
              <p className="text-base font-semibold text-slate-800">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How The Trick Was Done */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-5 sm:px-8">
        <div className="max-w-[1170px] mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
              How The Trick Was Done
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HIDDEN_SECRET_TRICKS.map((trick, idx) => (
              <div
                key={trick.title}
                className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm space-y-3"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#c22677] text-white font-bold text-sm">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-heading font-bold text-slate-900">{trick.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{trick.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team That Accomplished The Goal */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 py-16 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
            The Team That Accomplished The Goal
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {HIDDEN_SECRET_TEAM.map((member) => (
            <div
              key={member.role}
              className="rounded-xl bg-white border border-slate-200 p-5 text-center shadow-sm flex flex-col items-center gap-3"
            >
              <img
                src={member.avatar}
                alt={member.role}
                loading="lazy"
                className="w-16 h-16 rounded-full object-contain"
              />
              <h4 className="text-sm font-bold text-slate-800">{member.role}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Proof of Work */}
      <section className="bg-slate-950 text-white py-16 px-5 sm:px-8">
        <div className="max-w-[1170px] mx-auto space-y-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">Proof of work</h2>
          <img
            src="/wp-content/uploads/2022/11/Proof-of-work.png"
            alt="Hidden Secret Campaign Proof of Work"
            loading="lazy"
            className="w-full rounded-2xl border border-white/10 shadow-2xl mx-auto"
          />
        </div>
      </section>

      {/* Some of Our Best Design Work */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 py-16 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
            Some of our best design work
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {HIDDEN_SECRET_GALLERY.map((imgSrc, i) => (
            <div
              key={imgSrc}
              className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-50 aspect-square"
            >
              <img
                src={imgSrc}
                alt={`Hidden Secret NFT Artwork ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Publications */}
      <section className="bg-slate-50 border-y border-slate-200 py-14 px-5 sm:px-8">
        <div className="max-w-[1170px] mx-auto space-y-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
            Our clients are featured on
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {HIDDEN_SECRET_PRESS.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Overall Metrics */}
      <section
        className="py-16 px-5 sm:px-8 text-white"
        style={{ background: 'linear-gradient(126deg, #191919 0%, #c22677 100%)' }}
      >
        <div className="max-w-[1170px] mx-auto space-y-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">Overall Metrics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {HIDDEN_SECRET_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl bg-black/30 backdrop-blur border border-white/15 p-6"
              >
                <div className="text-4xl sm:text-5xl font-heading font-black text-white">
                  {metric.value}
                </div>
                <p className="text-xs sm:text-sm text-pink-100 mt-2">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Feedback + Disclaimer */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 py-16 space-y-8">
        <div className="max-w-3xl mx-auto rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <Quote className="w-10 h-10 text-[#c22677] mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
            Clients Feedback
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed italic">
            “We would like to thank one of our marketing partners as well as our airdrop managers
            @eon8 for making a super successful whitelisting campaign, Their assistance in helping us
            successfully reach 25k participants already! The dream of marketing my project in NYC
            times square was finally manifested through the eon8 team, The truck campaign helped us
            feature in different PR communities that in turn brought us ROI during the mint phase.”
          </p>
        </div>

        <p className="text-xs text-slate-500 text-center max-w-3xl mx-auto">
          Disclaimer: The intended trademarks and logos are not our proprietary property and are
          owned by the respective brands. The mentioned names are strictly for creative and
          informative purposes.
        </p>
      </section>

      <CaseStudyFooterStrip current="hidden-secret" />
    </div>
  );
}

export function CaseStudyPage({ slug }: CaseStudyPageProps) {
  if (slug === 'hidden-secret') {
    return <HiddenSecretCaseStudyView />;
  }
  return <RetailCaseStudyView slug={slug} />;
}
