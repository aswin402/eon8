import { useEffect, useState } from 'react';
import {
  AlternatingSplitSection,
  BottomCtaBanner,
  ClientLogoMarquee,
  DiscoveryCallSection,
  FeatureGridSection,
  PageSeo,
  QuickCallbackBanner,
  ServiceHeroSection,
  StatsCounterStrip,
} from '@/components/sections';
import { RichText } from '../crypto/components/RichText';
import { NFT_ELEMENTOR_LOADERS } from './data/elementor';
import type { NftElementorPageData, NftElementorSlug } from './types';

interface ElementorNftPageProps {
  slug: NftElementorSlug;
}

export default function ElementorNftPage({ slug }: ElementorNftPageProps) {
  const [loaded, setLoaded] = useState<{
    routeSlug: NftElementorSlug;
    data: NftElementorPageData;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = NFT_ELEMENTOR_LOADERS[slug];
    if (!loader) return undefined;

    loader().then((pageData) => {
      if (!cancelled) {
        setLoaded({ routeSlug: slug, data: pageData });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const data = loaded?.routeSlug === slug ? loaded.data : null;

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  const {
    title,
    metaDesc,
    hero,
    statsSection,
    callbackBar,
    brandCarousel,
    whyAlternating,
    servicesSection,
    growthPartnerHeader,
    growthPartnerFeatures,
    approachGrid,
    calendlySection,
  } = data;

  const strategyCards = whyAlternating.rows.flatMap((r) => r.cards);
  const approachCards = approachGrid.rows.flatMap((r) => r.cards);

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={title} description={metaDesc} />

      {/* 1. Split Hero + Funnel Form */}
      <ServiceHeroSection
        theme="nft"
        layout="split-form"
        badge={
          slug === 'reddit-community-marketing-agency'
            ? 'Reddit Community Growth'
            : 'Discord Community Building'
        }
        heading={hero.heading}
        paragraphs={hero.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} tone="on-dark" />
        ))}
        bullets={hero.bulletColumns.flat()}
        formHeading="Get Community Growth Plan"
        formSubmitLabel={hero.formSubmitLabel || 'Submit'}
      />

      {/* 2. Stats Counter Bar */}
      <StatsCounterStrip
        theme="nft"
        heading={statsSection.heading}
        subheading={statsSection.subheading}
        stats={statsSection.stats.map((s) => ({
          value: `${s.number}${s.suffix}`,
          label: s.label,
        }))}
      />

      {/* 3. 5-Minute Callback Bar */}
      <QuickCallbackBanner
        theme="nft"
        heading={callbackBar.heading}
        submitLabel={callbackBar.submitLabel}
      />

      {/* 4. Brand Carousel */}
      <ClientLogoMarquee logos={brandCarousel.logos} />

      {/* 5. Community Strategy Cards Grid */}
      <FeatureGridSection
        theme="nft"
        surface="muted"
        badge={whyAlternating.subheading || 'Community Strategy'}
        heading={whyAlternating.heading}
        cards={strategyCards.map((c) => ({
          title: c.title,
          description: c.description,
          iconSrc: c.iconSrc,
          iconAlt: c.iconAlt,
        }))}
        columns={3}
      />

      {/* 6. Editorial Overview */}
      <AlternatingSplitSection
        theme="nft"
        surface="light"
        heading={servicesSection.heading}
        paragraphs={servicesSection.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
      />

      {/* 7. Growth Partner Features + Illustration */}
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
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-slate-800 p-2.5 flex items-center justify-center shrink-0">
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

      {/* 8. Impeccable Approach Grid */}
      <FeatureGridSection
        theme="nft"
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

      {/* 9. Discovery Call */}
      <DiscoveryCallSection
        theme="nft"
        heading={calendlySection.heading}
        callTitle={calendlySection.callTitle}
        callDescription={calendlySection.callDescription}
      />

      {/* 10. Bottom Enquiry */}
      <BottomCtaBanner
        theme="nft"
        heading="Build An Engaged, High-Retention Community"
        description="Connect with EON8's Reddit and Discord community architects to turn passive members into loyal brand advocates."
      />
    </div>
  );
}
