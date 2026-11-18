import {
  AlternatingSplitSection,
  BottomCtaBanner,
  ClientLogoMarquee,
  FeatureGridSection,
  PageSeo,
  QuickCallbackBanner,
  ServiceHeroSection,
  StatsCounterStrip,
} from '@/components/sections';
import { RichText } from '@/pages/crypto/components/RichText';
import {
  tiktokInfluencerData,
  youtubeInfluencerData,
} from './data/elementorInfluencerData';
import type { ElementorInfluencerPageData } from './types';

const PAGE_DATA_MAP: Record<
  'tiktok-influencer-marketing' | 'youtube-influencer-services',
  ElementorInfluencerPageData
> = {
  'tiktok-influencer-marketing': tiktokInfluencerData,
  'youtube-influencer-services': youtubeInfluencerData,
};

interface ElementorInfluencerPageProps {
  slug: 'tiktok-influencer-marketing' | 'youtube-influencer-services';
}

export default function ElementorInfluencerPage({ slug }: ElementorInfluencerPageProps) {
  const data = PAGE_DATA_MAP[slug];
  const {
    title,
    metaDesc,
    hero,
    statsSection,
    callbackBar,
    brandCarousel,
    whyAlternating,
    servicesSection,
    centerEditorial,
    growthPartnerHeader,
    growthPartnerFeatures,
    approachGrid,
  } = data;

  const serviceCards = servicesSection.rows.flatMap((r) => r.cards);
  const approachCards = approachGrid.rows.flatMap((r) => r.cards);

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={title} description={metaDesc} />

      {/* 1. Split Hero + Funnel Form */}
      <ServiceHeroSection
        theme="influencer"
        layout="split-form"
        badge={slug === 'tiktok-influencer-marketing' ? 'TikTok Creator Growth' : 'YouTube Creator Growth'}
        heading={hero.heading}
        paragraphs={hero.leadParagraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} tone="on-dark" />
        ))}
        bullets={[...hero.leftChecks, ...hero.rightChecks]}
        formHeading="Get Custom Creator Proposal"
        formSubmitLabel="Submit"
      />

      {/* 2. Stats Counter Bar */}
      <StatsCounterStrip
        theme="influencer"
        heading={statsSection.heading}
        subheading={statsSection.subheading}
        stats={statsSection.stats.map((s) => ({
          value: `${s.number}${s.suffix}`,
          label: s.label,
        }))}
      />

      {/* 3. 5-Minute Callback Bar */}
      <QuickCallbackBanner
        theme="influencer"
        heading={callbackBar.heading}
        submitLabel={callbackBar.submitLabel}
      />

      {/* 4. Brand Carousel */}
      <ClientLogoMarquee logos={brandCarousel.logos} />

      {/* 5. Optional Alternating Rows (YouTube Influencer) */}
      {whyAlternating && (
        <div className="divide-y divide-border/50">
          {whyAlternating.rows.map((row, idx) => (
            <AlternatingSplitSection
              key={row.sectionId}
              theme="influencer"
              surface={idx % 2 === 0 ? 'light' : 'muted'}
              reverse={row.layout === 'image-left'}
              badge={idx === 0 ? whyAlternating.heading : undefined}
              heading={row.heading}
              paragraphs={[<RichText key="body" nodes={row.body} />]}
              imageSrc={row.image.src}
              imageAlt={row.image.alt}
            />
          ))}
        </div>
      )}

      {/* 6. 9 Creator Services Grid */}
      <FeatureGridSection
        theme="influencer"
        surface="muted"
        badge="End-to-End Execution"
        heading={servicesSection.heading}
        cards={serviceCards.map((c) => ({
          title: c.title,
          description: c.description,
          iconSrc: c.iconSrc,
          iconAlt: c.iconAlt,
        }))}
        columns={3}
      />

      {/* 7. Editorial Overview */}
      <AlternatingSplitSection
        theme="influencer"
        surface="light"
        heading={centerEditorial.heading}
        paragraphs={centerEditorial.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
      />

      {/* 8. Why Eon8 Is Your Ideal Growth Partner */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              {growthPartnerHeader.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              {growthPartnerFeatures.items.map((item) => (
                <div
                  key={item.widgetId}
                  className="rounded-2xl bg-card border border-border p-6 flex items-start gap-4 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-slate-800 p-2.5 flex items-center justify-center shrink-0">
                    <img
                      src={item.iconSrc}
                      alt={item.iconAlt}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-heading font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <img
                src={growthPartnerFeatures.illustration.src}
                alt={growthPartnerFeatures.illustration.alt || growthPartnerHeader.heading}
                className="w-full max-w-[380px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Impeccable Approach 6-Card Grid */}
      <FeatureGridSection
        theme="influencer"
        surface="light"
        badge="Our Methodology"
        heading={approachGrid.heading}
        cards={approachCards.map((c) => ({
          title: c.title,
          iconSrc: c.iconSrc,
          iconAlt: c.iconAlt,
        }))}
        columns={3}
      />

      {/* 10. Bottom CTA */}
      <BottomCtaBanner
        theme="influencer"
        heading="Ready To Launch High-Impact Creator Campaigns?"
        description="Partner with EON8 to shortlist high-engagement creators, produce authentic content, and track measurable ROI."
      />
    </div>
  );
}
