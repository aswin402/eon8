import {
  AlternatingSplitSection,
  BottomCtaBanner,
  ClientLogoMarquee,
  FeatureGridSection,
  PageSeo,
  ServiceHeroSection,
  SmartActionButton,
  StatsCounterStrip,
} from '@/components/sections';
import { HeadingLines, RichText } from '@/pages/crypto/components/RichText';
import { instagramInfluencerData } from './data/instagramInfluencerData';

export default function InstagramInfluencerPage() {
  const {
    title,
    metaDesc,
    hero,
    journeyCounters,
    clientSliderHeading,
    clientLogos,
    reelsSection,
    whyPartner,
    campaignResults,
    growSection,
    services,
    fixedSchedule,
    solutions,
    enquiry,
  } = instagramInfluencerData;

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={title} description={metaDesc} />

      {/* 1. Split Hero */}
      <ServiceHeroSection
        theme="influencer"
        layout="split-media"
        badge="Instagram Creator Network"
        heading={<HeadingLines lines={hero.headingLines} />}
        subheading={hero.brandsHeading}
        paragraphs={hero.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} tone="on-dark" />
        ))}
        bullets={hero.bulletColumns.flat()}
        mediaSrc={hero.image.src}
        mediaAlt={hero.image.alt}
        actions={[{ label: hero.ctaLabel, href: hero.ctaHref, variant: 'primary' }]}
      />

      {/* 2. Journey Counters */}
      <StatsCounterStrip
        theme="influencer"
        heading={journeyCounters.heading}
        stats={journeyCounters.items.map((c) => ({
          value: `${c.value}+`,
          label: c.label,
        }))}
      />

      {/* 3. Client Brand Marquee */}
      <ClientLogoMarquee heading={clientSliderHeading} logos={clientLogos} />

      {/* 4. Instagram Reels Video Split */}
      <AlternatingSplitSection
        theme="influencer"
        surface="light"
        badge="Short-Form Viral Video"
        heading={reelsSection.heading}
        paragraphs={reelsSection.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
        customMedia={
          <div className="rounded-3xl overflow-hidden border border-border bg-slate-950 shadow-2xl p-3 max-w-[360px] mx-auto">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto rounded-2xl object-cover"
            >
              <source src={reelsSection.videoSrc} type="video/mp4" />
            </video>
          </div>
        }
      />

      {/* 5. Why Partner */}
      <AlternatingSplitSection
        theme="influencer"
        surface="muted"
        heading={whyPartner.heading}
        paragraphs={whyPartner.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
      />

      {/* 6. Campaign Results for Top Brands */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-pink-400">
              Verified Brand Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              {campaignResults.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {campaignResults.items.map((card, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-card border border-border p-7 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-6">
                  <div className="h-16 rounded-xl bg-white p-3 flex items-center justify-center border border-slate-100">
                    <img
                      src={card.brandLogo.src}
                      alt={card.brandLogo.alt || 'Brand partner'}
                      className="max-h-11 w-auto object-contain"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {card.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded-xl bg-rose-50/70 dark:bg-slate-800/80 p-3.5 text-center space-y-1.5"
                      >
                        <img
                          src={m.iconSrc}
                          alt={m.iconAlt}
                          className="w-7 h-7 mx-auto object-contain"
                        />
                        <div className="text-xl font-heading font-black text-rose-600 dark:text-pink-400">
                          {m.strongText}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Grow With Influencer Marketing */}
      <AlternatingSplitSection
        theme="influencer"
        surface="muted"
        heading={growSection.heading}
        paragraphs={growSection.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
      />

      {/* 8. 6 Instagram Services */}
      <FeatureGridSection
        theme="influencer"
        surface="light"
        badge="End-to-End Campaigns"
        heading={services.heading}
        cards={services.items.map((item) => ({
          title: item.title,
          description: item.description,
          iconSrc: item.iconSrc,
          iconAlt: item.iconAlt,
        }))}
        columns={3}
      />

      {/* 9. Schedule Meeting Strip */}
      <section className="py-10 px-4 sm:px-6 bg-gradient-to-r from-[#4a0936] via-[#831843] to-[#be123c] text-white text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-lg font-heading font-bold">
            Ready to scale your brand with top Instagram creators?
          </span>
          <SmartActionButton
            theme="influencer"
            size="md"
            action={{
              label: fixedSchedule.ctaLabel,
              href: fixedSchedule.ctaHref,
              external: fixedSchedule.ctaHref.startsWith('http'),
              variant: 'primary',
            }}
          />
        </div>
      </section>

      {/* 10. Solutions Split */}
      <AlternatingSplitSection
        theme="influencer"
        surface="light"
        heading={<HeadingLines lines={solutions.headingLines} />}
        paragraphs={solutions.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
        bullets={solutions.bulletColumns.flat()}
        bulletsColumns={2}
        imageSrc={solutions.image.src}
        imageAlt={solutions.image.alt}
      />

      {/* 11. Bottom Quote Section */}
      <BottomCtaBanner
        id="enquiry"
        theme="influencer"
        heading="Amplify Your Instagram Presence With EON8"
        description="Launch creator-led Reels, Stories, and partnership campaigns tailored to your target audience and ROI goals."
        formHeading={enquiry.formHeading}
        submitLabel={enquiry.submitLabel}
      />
    </div>
  );
}
