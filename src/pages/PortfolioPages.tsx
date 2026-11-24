import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2, ExternalLink, Sparkles, Star, Target, TrendingUp } from 'lucide-react';
import {
  AlternatingSplitSection,
  BottomCtaBanner,
  ClientLogoMarquee,
  FeatureGridSection,
  PageSeo,
  ProcessRoadmapSection,
  ServiceHeroSection,
  StatsCounterStrip,
} from '@/components/sections';

const PORTFOLIO_PROJECTS: {
  id?: string;
  slug: string;
  ctaLabel?: string;
  category: string;
  name: string;
  logo: string;
  preview: string;
  highlight: string;
  summary: string;
}[] = [
  {
    slug: '/case-study-poorvika',
    category: 'Multi-Brand Retail & Social Scale',
    name: 'Poorvika Mobiles',
    logo: '/wp-content/uploads/2019/09/poorvika.png',
    preview: '/wp-content/themes/eon8/assets/img/case_study_poorvika.png',
    highlight: 'Reached 1.1M+ Consumers in 7 Days',
    summary:
      'Poorvika is a leading multi-brand retail chain dealing in mobile phones, connections, accessories, recharges, and data cards across South India. Discover how EON8 built an active social community and high-converting digital funnel from the ground up.',
  },
  {
    slug: '/case-study-cake-square-chennai',
    category: 'eCommerce & Performance Ads',
    name: 'Cake Square Chennai',
    logo: '/wp-content/themes/eon8/assets/img/cake-square-logo.png',
    preview: '/wp-content/themes/eon8/assets/img/cake_square_web.png',
    highlight: '1,60,000+ Page Likes & ₹30L+ Lead Pipeline',
    summary:
      'Cake Square pioneered online custom cake delivery in Chennai for every occasion. EON8 designed an interactive storefront and scaled Facebook & Google search campaigns to #1 rankings.',
  },
  {
    slug: '/case-study-hidden-secret',
    category: 'Web3, NFT & NYC Times Square Stunt',
    name: 'Hidden Secret NFT',
    logo: '/wp-content/uploads/2022/11/OpenSea.png',
    preview: '/wp-content/uploads/2022/11/truck-campaign-scaled.jpg',
    highlight: 'NYC Times Square Showcase in 7 Days • 90% Mint Rate',
    summary:
      'Our client wanted his NFT project showcased in front of NYC Times Square within 3 months — EON8 executed the guerrilla truck stunt, 300+ press releases, and 30+ simultaneous influencer drops in just 7 days.',
  },
  {
    id: 'manju-groups',
    slug: '#consult-form',
    ctaLabel: 'Request Real Estate Playbook',
    category: 'Real Estate & High-Intent Lead Generation',
    name: 'Manju Groups',
    logo: '/wp-content/uploads/2026/06/manju.webp',
    preview: '/wp-content/uploads/2026/06/building.webp',
    highlight: '20%+ Conversion Rate From Online Leads',
    summary:
      'EON8 engineered hyper-targeted search, Meta lead ads, and dedicated property landing funnels for Manju Groups — converting over 20% of qualified digital inquiries into site visits and bookings.',
  },
];

export function WorksPage() {
  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title="Our Works, Portfolio & Case Study - Eon8"
        description="Readout online marketing and branding case study for Poorvika, Cake Square, Ramraj, TVS, Chettinad Health City, NAC Jewelry."
      />

      <ServiceHeroSection
        theme="brand"
        layout="centered"
        badge="Portfolio & Proven Outcomes"
        heading="Our Works & Case Studies"
        paragraphs={[
          'Explore how EON8 transforms ambitious retail, eCommerce, enterprise, and Web3 brands into market leaders with measurable ROI.',
        ]}
      />

      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {PORTFOLIO_PROJECTS.map((proj, idx) => {
            const isAnchor = proj.slug.startsWith('#');
            return (
              <div
                id={proj.id}
                key={proj.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl bg-card border border-border p-6 sm:p-8 lg:p-10 shadow-md hover:shadow-xl transition-shadow scroll-mt-28"
              >
                <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0053C6]/10 dark:bg-sky-500/15 text-[#0053C6] dark:text-sky-400">
                      {proj.category}
                    </span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#FD5900]/12 text-[#FD5900]">
                      {proj.highlight}
                    </span>
                  </div>

                  <div className="h-12 flex items-center">
                    <img
                      src={proj.logo}
                      alt={`${proj.name} logo`}
                      className="max-h-11 max-w-[180px] object-contain bg-white rounded-lg px-2.5 py-1 border border-slate-200"
                    />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                    {proj.name}
                  </h2>

                  <p className="text-base text-muted-foreground leading-relaxed">{proj.summary}</p>

                  <div className="pt-2">
                    {isAnchor ? (
                      <a
                        href={proj.slug}
                        onClick={(e) => {
                          const target = document.getElementById(proj.slug.slice(1));
                          if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="inline-flex items-center gap-2 min-h-[46px] px-6 py-3 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm shadow-md transition-all no-underline"
                      >
                        <span>{proj.ctaLabel || 'Talk With Our Experts'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        to={proj.slug}
                        className="inline-flex items-center gap-2 min-h-[46px] px-6 py-3 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm shadow-md transition-all no-underline"
                      >
                        <span>{proj.ctaLabel || 'Read Full Case Study'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {isAnchor ? (
                    <div className="overflow-hidden rounded-2xl border border-border bg-slate-100 dark:bg-slate-800">
                      <img
                        src={proj.preview}
                        alt={`${proj.name} campaign showcase`}
                        className="w-full max-h-[380px] object-cover"
                      />
                    </div>
                  ) : (
                    <Link
                      to={proj.slug}
                      className="block overflow-hidden rounded-2xl border border-border bg-slate-100 dark:bg-slate-800"
                    >
                      <img
                        src={proj.preview}
                        alt={`${proj.name} campaign showcase`}
                        className="w-full max-h-[380px] object-cover hover:scale-[1.02] transition-transform duration-300"
                      />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <BottomCtaBanner
        theme="brand"
        heading="Want Your Brand To Be Our Next Success Story?"
        description="Talk to EON8's growth architects to build a high-converting SEO, Paid Media, AI, or Web3 campaign tailored to your targets."
      />
    </div>
  );
}

export type CaseStudySlug =
  | 'case-study-poorvika'
  | 'case-study-cake-square-chennai'
  | 'case-study-hidden-secret';

const HIDDEN_SECRET_TEAM = [
  { role: 'Project Manager', avatar: '/wp-content/uploads/2022/11/profile-1.png' },
  { role: 'Project Strategist', avatar: '/wp-content/uploads/2022/11/profile-2.png' },
  { role: 'Community Manager', avatar: '/wp-content/uploads/2022/11/profile-3.png' },
  { role: 'Community Moderator', avatar: '/wp-content/uploads/2022/11/profile-4.png' },
  { role: 'PR Manager', avatar: '/wp-content/uploads/2022/11/profile-3.png' },
  { role: 'Influencer Relationship Manager', avatar: '/wp-content/uploads/2022/11/profile-2.png' },
  { role: 'Content Writer', avatar: '/wp-content/uploads/2022/11/profile-1.png' },
  { role: 'Professional NFT Artist / Designer', avatar: '/wp-content/uploads/2022/11/profile-4.png' },
];

const HIDDEN_SECRET_DESIGNS = [
  '/wp-content/uploads/2022/11/hidden-4.jpeg',
  '/wp-content/uploads/2022/11/hidden-3.jpeg',
  '/wp-content/uploads/2022/11/hidden-2.jpeg',
  '/wp-content/uploads/2022/11/hidden-1.jpeg',
  '/wp-content/uploads/2022/11/02_Genie.png',
  '/wp-content/uploads/2022/11/01_Creative.png',
  '/wp-content/uploads/2022/11/09_MagicPotion.png',
  '/wp-content/uploads/2022/11/06_Boat.png',
];

const HIDDEN_SECRET_PRESS_LOGOS = [
  { src: '/wp-content/uploads/2022/11/nft-now.png', alt: 'NFT Now' },
  { src: '/wp-content/uploads/2022/11/cointelegraph.png', alt: 'Cointelegraph' },
  { src: '/wp-content/uploads/2022/11/OpenSea.png', alt: 'OpenSea' },
  { src: '/wp-content/uploads/2022/11/logoyahoo.png', alt: 'Yahoo Finance' },
  { src: '/wp-content/uploads/2022/11/forbes.png', alt: 'Forbes' },
];

export function CaseStudyPage({ slug }: { slug: CaseStudySlug }) {
  if (slug === 'case-study-poorvika') {
    return (
      <div className="bg-background text-foreground">
        <PageSeo
          title="Poorvika Case Study: Digital Growth Strategy | Eon8"
          description="Poorvika generated never before seen sales and revenue numbers by partnering with our marketing agency. We have compiled the practices in the case study."
        />

        <ServiceHeroSection
          theme="brand"
          layout="split-media"
          badge="Retail Growth Case Study"
          heading="Case Study – Poorvika Mobiles"
          subheading="Multi-Brand Mobile Retail Digital Transformation"
          paragraphs={[
            'Poorvika Mobile Pvt Ltd is a leading multi-brand retail chain dealing in mobile phones, connections, accessories, recharges, and internet data cards across India.',
          ]}
          mediaSrc="/wp-content/themes/eon8/assets/img/poorvika.jpg"
          mediaAlt="Poorvika Mobiles Case Study"
          actions={[
            { label: 'Start Your Growth Campaign', href: '#consult-form', variant: 'primary' },
            { label: 'All Case Studies', href: '/works', variant: 'secondary' },
          ]}
        />

        <AlternatingSplitSection
          theme="brand"
          surface="light"
          badge="BRAND – POORVIKA MOBILE PVT LTD"
          heading="Brand & Agency Collaboration"
          paragraphs={[
            'Poorvika partnered with S A EONSOFTTECH PVT LTD (EON8) — a digital marketing agency with a team of creative strategists and performance specialists — to establish a dominant online brand footprint and connect retail convenience with digital discovery.',
          ]}
          imageSrc="/wp-content/themes/eon8/assets/img/eon-softtech_3.jpg"
          imageAlt="EON8 Agency Team"
        />

        <AlternatingSplitSection
          theme="brand"
          surface="muted"
          reverse
          badge="Objective & Background"
          heading="Bridging Brick-and-Mortar Scale With Digital Reach"
          paragraphs={[
            'Objective: Poorvika aimed at amalgamating the look, touch, and feel of physical mobile outlets with online choice, convenience, and elegance for its customers.',
            'Background: When Poorvika began scaling digitally, they lacked an active social media presence and structured customer engagement channels to capture online mobile buyers.',
          ]}
          imageSrc="/wp-content/themes/eon8/assets/img/poorvika_2.jpg"
          imageAlt="Poorvika Digital Objective"
        />

        <AlternatingSplitSection
          theme="brand"
          surface="light"
          badge="Execution & Results"
          heading="High-Velocity Social & Website Traffic Execution"
          paragraphs={[
            'Execution: Qualified traffic was directed to the Poorvika website through targeted Facebook campaigns, festive promotions, and interactive social contests — dramatically increasing store and online inquiries.',
            'Results: Through sustained social media and performance marketing campaigns, Poorvika established a massive, loyal fan base across social channels, reaching over 1.1 million consumers in a single week and driving record omnichannel sales.',
          ]}
          bullets={[
            'Reached 1.1M+ targeted mobile shoppers within one week',
            'Built an active, high-engagement social community from scratch',
            'Directed high-intent regional traffic directly to online & retail offers',
          ]}
          imageSrc="/wp-content/themes/eon8/assets/img/poorvika_case_study.jpg"
          imageAlt="Poorvika Campaign Results"
        />

        <BottomCtaBanner
          theme="brand"
          heading="Ready To Replicate Poorvika's Digital Growth?"
          description="Partner with EON8 to turn regional brand recognition into measurable omnichannel traffic and revenue."
        />
      </div>
    );
  }

  if (slug === 'case-study-cake-square-chennai') {
    return (
      <div className="bg-background text-foreground">
        <PageSeo
          title="Case Study – Cake Square Chennai - Eon8"
          description="We transformed a small business into a recognizable brand with personalized marketing strategies. Study the case study of Cake Square Chennai here."
        />

        <ServiceHeroSection
          theme="brand"
          layout="split-media"
          badge="eCommerce & Paid Search Case Study"
          heading="Case Study – Cake Square Chennai"
          subheading="From Local Bakery To Chennai's #1 Online Cake Brand"
          paragraphs={[
            'Cake Square is a pioneer in the online cake shop model providing custom celebration cakes and home delivery services across Chennai for all occasions.',
          ]}
          mediaSrc="/wp-content/themes/eon8/assets/img/cake-square-baner.jpg"
          mediaAlt="Cake Square Chennai Banner"
          actions={[
            { label: 'Scale Your Store', href: '#consult-form', variant: 'primary' },
            { label: 'All Case Studies', href: '/works', variant: 'secondary' },
          ]}
        />

        <StatsCounterStrip
          theme="brand"
          stats={[
            { value: '1,60,000+', label: 'Organic & Paid Facebook Page Likes', icon: TrendingUp },
            { value: '₹30 Lakhs+', label: 'Direct Lead-Generated Business', icon: Award },
            { value: '#1 Rank', label: 'Top Google Search Visibility in Chennai', icon: Target },
            { value: '10,000+', label: 'High-Intent Online Customer Leads', icon: Sparkles },
          ]}
        />

        <AlternatingSplitSection
          theme="brand"
          surface="muted"
          badge="Brand & Objective"
          heading="Building Digital Visibility From Zero"
          paragraphs={[
            'Background: Cake Square initially had no website or social media presence and struggled to expand its reach across Chennai.',
            'Objective: Cake Square partnered with S A EONSOFTTECH PVT LTD (EON8) to launch an interactive eCommerce experience and capture high-intent celebration cake orders across search and social.',
          ]}
          imageSrc="/wp-content/themes/eon8/assets/img/cake-square-object.jpg"
          imageAlt="Cake Square Objective"
          actions={[
            {
              label: 'Visit Cake Square Website',
              href: 'https://cakesquarechennaionline.com/',
              external: true,
              variant: 'outline',
            },
          ]}
        />

        <AlternatingSplitSection
          theme="brand"
          surface="light"
          reverse
          badge="Multi-Channel Execution"
          heading="Interactive Storefront, Seasonal Social & Precision Google Ads"
          paragraphs={[
            'EON8 built a dynamic, conversion-focused eCommerce storefront for Cake Square engineered for instant custom-cake ordering, doorstep delivery scheduling, and mobile checkout speed across Chennai.',
            'We paired high-engagement Facebook and Instagram campaigns around peak celebration windows (New Year, Valentine’s Day, Diwali, Christmas, and birthdays) with precision-bid Google Search Ads capturing ready-to-order local shoppers.',
            'Dedicated landing pages, retargeting sequences for repeat family celebrations, and continuous local SEO cemented Cake Square at the #1 spot on Google for Chennai online cake delivery.',
          ]}
          bullets={[
            'Custom conversion-focused eCommerce web development & local SEO foundation',
            'High-intent Google Search & Shopping ads targeting Chennai cake-delivery keywords',
            'Festive social campaigns & remarketing driving repeat celebration orders',
          ]}
          imageSrc="/wp-content/themes/eon8/assets/img/cake-square-execution.jpg"
          imageAlt="Cake Square Execution"
        />

        <AlternatingSplitSection
          theme="brand"
          surface="muted"
          badge="Verified Results"
          heading="1,60,000+ Fans & ₹30 Lakhs+ in Direct Online Revenue"
          paragraphs={[
            'Through unified Facebook, Instagram, Twitter, SEO, and Google Search campaigns, Cake Square grew past 1,60,000 active Facebook fans, achieved #1 local Google rankings, and converted over 10,000 qualified leads into more than ₹30 lakhs in direct recurring business.',
          ]}
          bullets={[
            '1,60,000+ engaged social community across Chennai',
            '₹30 Lakhs+ in verified online lead-generated cake orders',
            '#1 organic & paid visibility for high-converting celebration searches',
          ]}
          imageSrc="/wp-content/themes/eon8/assets/img/cake-square-result.jpg"
          imageAlt="Cake Square Results"
        />

        <BottomCtaBanner
          theme="brand"
          heading="Want To Transform Your Store Into A Household Brand?"
          description="Let EON8 architect your eCommerce storefront, Google Ads, and social acquisition engine."
        />
      </div>
    );
  }

  // case-study-hidden-secret
  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title="Case Study Hidden Secret - Eon8"
        description="Learn how the Hidden Secret Project generated 20x more revenue in less 2.5 months. Learn more about the campaign from our case study now."
      />

      {/* 1. Dramatic Web3 Stunt Hero */}
      <ServiceHeroSection
        theme="nft"
        layout="split-media"
        badge="WE DID IT IN 7 DAYS"
        heading="Our Client Wanted His Project Showcased in NYC Times Square in 3 Months — We Did It in 7 Days"
        paragraphs={[
          'Discover how EON8 staged a viral New York City guerrilla truck stunt, 300+ global press releases, and 30+ simultaneous influencer drops to achieve a 90% mint-day sell-through.',
        ]}
        bullets={[
          'NYC Times Square Truck Stunt Campaign',
          '300+ Tier-1 Crypto & NFT Press Releases',
          '30+ Simultaneous Influencer Campaigns',
          '90% Mint Rate on Mint Day',
        ]}
        mediaSrc="/wp-content/uploads/2022/11/truck-campaign-scaled.jpg"
        mediaAlt="Hidden Secret NYC Times Square Truck Stunt"
        actions={[
          { label: 'Launch Your Web3 Campaign', href: '#consult-form', variant: 'primary' },
          { label: 'All Case Studies', href: '/works', variant: 'secondary' },
        ]}
      />

      {/* 2. Project Highlights & Overall Metrics */}
      <StatsCounterStrip
        theme="nft"
        badge="Project Highlights"
        heading="Project Highlights — Quantifiable Web3 Launch Impact"
        stats={[
          { value: '300+', label: '300+ Press Releases Syndicated' },
          { value: '30+', label: '30+ Influencer Campaigns on the Same Day' },
          { value: '90%', label: 'Mint Rate Achieved on Mint Day' },
          { value: '5M+', label: 'Impressions From NYC Truck Stunt' },
        ]}
      />

      {/* 3. The Magic We Promised To Stage */}
      <FeatureGridSection
        theme="nft"
        surface="muted"
        badge="Campaign Blueprint"
        heading="The Magic We Promised To Stage"
        cards={[
          {
            iconSrc: '/wp-content/uploads/2022/11/discord.svg',
            title: 'Organic Discord Community',
            description: 'Building an authentic, high-engagement organic collector community on Discord.',
          },
          {
            iconSrc: '/wp-content/uploads/2022/11/twitter.svg',
            title: '100+ Twitter Influencer Raids',
            description: 'Coordinated 100+ Twitter retweeting and KOL amplification campaigns ahead of mint.',
          },
          {
            iconSrc: '/wp-content/uploads/2022/11/campaign.svg',
            title: 'NYC Times Square Truck Stunt',
            description: 'On-ground New York City LED billboard truck activation capturing massive IRL buzz.',
          },
        ]}
        columns={3}
      />

      {/* 4. How The Trick Was Done */}
      <ProcessRoadmapSection
        theme="nft"
        surface="dark"
        badge="Execution"
        heading="How The Trick Was Done"
        steps={[
          {
            step: '01',
            title: 'Organic Discord Architecture',
            description:
              'Our Discord community manager implemented gamified whitelisting, AMAs, and 24/7 moderation to establish a genuine, hype-ready community.',
          },
          {
            step: '02',
            title: 'Synchronized Twitter KOL Blitz',
            description:
              'A massive Twitter influencer wave was orchestrated ahead of mint day, sparking organic retweets, spaces discussions, and OpenSea trending momentum.',
          },
          {
            step: '03',
            title: 'NYC Times Square Activation & 300+ PRs',
            description:
              'Leveraging our global media network, we rolled out the NYC LED truck stunt in 7 days alongside 300+ press syndications across top publications.',
          },
        ]}
      />

      {/* 5. Featured Press Logos */}
      <ClientLogoMarquee
        heading="Our Client Was Featured On"
        logos={HIDDEN_SECRET_PRESS_LOGOS}
      />

      {/* 6. Proof of Work + NFT Artwork Showcase */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-6 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-purple-600 dark:text-fuchsia-400">
              Verified Delivery
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              Proof of Work
            </h2>
            <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-lg p-3 max-w-5xl mx-auto">
              <img
                src="/wp-content/uploads/2022/11/Proof-of-work.png"
                alt="Hidden Secret Proof of Work"
                className="w-full h-auto rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#FD5900]">
                Creative Studio
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
                Some of Our Best Design Work
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {HIDDEN_SECRET_DESIGNS.map((src, idx) => (
                <div
                  key={src}
                  className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-shadow aspect-square"
                >
                  <img
                    src={src}
                    alt={`Hidden Secret NFT Artwork ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Specialist Team */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-purple-600 dark:text-fuchsia-400">
              Dedicated Pod
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              The Team That Accomplished The Goal
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {HIDDEN_SECRET_TEAM.map((member) => (
              <div
                key={member.role}
                className="rounded-2xl bg-card border border-border p-5 text-center space-y-3 shadow-xs"
              >
                <img
                  src={member.avatar}
                  alt={member.role}
                  className="w-16 h-16 rounded-full mx-auto object-cover border border-border"
                />
                <h3 className="text-sm font-heading font-bold text-foreground leading-snug">
                  {member.role}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Client Feedback */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto rounded-3xl bg-card border border-border p-8 sm:p-10 text-center shadow-md space-y-5">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
            Client&apos;s Feedback
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground italic leading-relaxed">
            &ldquo;We would like to thank one of our marketing partners as well as our airdrop managers @eon8 for making a super successful whitelisting campaign — their assistance helped us successfully reach 25k+ participants!&rdquo;
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-fuchsia-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Hidden Secret Founding Team</span>
          </div>
          <div>
            <Link
              to="/nft-marketing-services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FD5900] hover:underline"
            >
              <span>Explore Our NFT Marketing Services</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <BottomCtaBanner
        theme="nft"
        heading="Ready To Stage Your Own Viral Web3 Launch?"
        description="Talk with EON8's NFT, Discord, PR, and guerrilla campaign specialists today."
        disclaimer="Disclaimer: The intended trademarks and logos are not our proprietary property and are owned by the respective brands. The mentioned names are strictly for creative and informative purposes."
      />
    </div>
  );
}
