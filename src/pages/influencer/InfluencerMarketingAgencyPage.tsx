import {
  AlternatingSplitSection,
  BottomCtaBanner,
  ClientLogoMarquee,
  FaqAccordionSection,
  FeatureGridSection,
  PageSeo,
  ProcessRoadmapSection,
  ServiceHeroSection,
  StatsCounterStrip,
} from '@/components/sections';
import { HeadingLines, RichText } from '@/pages/crypto/components/RichText';
import { influencerAgencyData } from './data/influencerAgencyData';

export default function InfluencerMarketingAgencyPage() {
  const {
    title,
    metaDesc,
    hero,
    introSection,
    counters,
    clientSliderHeading,
    clientLogos,
    whyEssential,
    services,
    categories,
    advantages,
    roadmap,
    influencerValue,
    solutions,
    faq,
    enquiry,
  } = influencerAgencyData;

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={title} description={metaDesc} />

      {/* 1. Split Hero with Local Creator Graphic */}
      <ServiceHeroSection
        theme="influencer"
        layout="split-media"
        badge="Creator Economy Growth"
        heading={<HeadingLines lines={hero.headingLines} />}
        paragraphs={hero.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} tone="on-dark" />
        ))}
        bullets={hero.bulletColumns.flat()}
        mediaSrc={hero.image.src}
        mediaAlt={hero.image.alt}
        actions={[{ label: hero.ctaLabel, href: hero.ctaHref, variant: 'primary' }]}
      />

      {/* 2. Agency Intro + Counters */}
      <StatsCounterStrip
        theme="influencer"
        badge="Proven Creator Impact"
        heading={introSection.heading}
        subheading={introSection.paragraphs
          .map((p) => p.map((n) => (typeof n === 'string' ? n : n.text || '')).join(''))
          .join(' ')}
        stats={counters.map((c) => ({
          value: c.removePlus ? c.value : `${c.value}+`,
          label: c.label,
        }))}
      />

      {/* 3. Client Logo Marquee */}
      <ClientLogoMarquee heading={clientSliderHeading} logos={clientLogos} />

      {/* 4. Why Essential */}
      <AlternatingSplitSection
        theme="influencer"
        surface="muted"
        badge="Social Proof At Scale"
        heading={whyEssential.heading}
        paragraphs={whyEssential.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
      />

      {/* 5. 9 Influencer Marketing Services */}
      <FeatureGridSection
        theme="influencer"
        surface="light"
        badge="Full-Service Creator Ops"
        heading={services.heading}
        cards={services.items.map((item) => ({
          title: item.title,
          description: item.description,
          iconSrc: item.iconSrc,
          iconAlt: item.iconAlt,
        }))}
        columns={3}
      />

      {/* 6. 12 Influencer Categories */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-pink-400">
              Niche Verticals
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              {categories.heading}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.items.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-card border border-border p-5 flex flex-col items-center text-center gap-3 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-slate-800 p-2.5 flex items-center justify-center">
                  <img
                    src={cat.iconSrc}
                    alt={cat.iconAlt}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <h3 className="text-sm font-heading font-bold text-foreground leading-snug">
                  {cat.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Advantages 3x2 Grid */}
      <FeatureGridSection
        theme="influencer"
        surface="dark"
        badge="Why Creator Campaigns Win"
        heading={advantages.heading}
        cards={advantages.items.map((adv) => ({
          title: adv.title,
          description: adv.description,
        }))}
        columns={3}
      />

      {/* 8. Roadmap Timeline */}
      <ProcessRoadmapSection
        theme="influencer"
        surface="light"
        variant="timeline"
        badge="Campaign Execution"
        heading={roadmap.heading}
        steps={roadmap.steps.map((step, i) => ({
          step: String(i + 1).padStart(2, '0'),
          title: step.title,
          description: step.description,
          iconSrc: step.iconSrc,
        }))}
        bottomActions={[{ label: roadmap.ctaLabel, href: roadmap.ctaHref, variant: 'primary' }]}
      />

      {/* 9. What Influencers Can Do (Single unified responsive grid — no duplicate desktop/mobile DOM!) */}
      <FeatureGridSection
        theme="influencer"
        surface="muted"
        badge="Brand Amplification"
        heading={influencerValue.heading}
        cards={influencerValue.desktopCards.map((c) => ({
          title: c.title,
          description: c.description,
          iconSrc: c.iconSrc,
          iconAlt: c.iconAlt,
        }))}
        columns={3}
      />

      {/* 10. On-Demand Solutions Split */}
      <AlternatingSplitSection
        theme="influencer"
        surface="light"
        badge="Tailored Partnerships"
        heading={<HeadingLines lines={solutions.headingLines} />}
        paragraphs={solutions.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
        bullets={solutions.bulletColumns.flat()}
        bulletsColumns={2}
        imageSrc={solutions.image.src}
        imageAlt={solutions.image.alt}
      />

      {/* 11. FAQ Accordion */}
      <FaqAccordionSection
        theme="influencer"
        surface="muted"
        heading={faq.heading}
        faqs={faq.items.map((f) => ({
          question: f.question,
          answer: (
            <div className="space-y-3">
              {f.answers.map((nodes, aIdx) => (
                <p key={aIdx}>
                  <RichText nodes={nodes} />
                </p>
              ))}
              {f.bullets && f.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-1.5">
                  {f.bullets.map((b, bIdx) => (
                    <li key={bIdx}>
                      <RichText nodes={b} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ),
        }))}
      />

      {/* 12. Bottom Quote Section */}
      <BottomCtaBanner
        id="enquiry"
        theme="influencer"
        heading="Launch High-ROI Influencer Campaigns Today"
        description="Connect your brand with vetted macro, micro, and niche creators engineered for authentic conversions."
        formHeading={enquiry.formHeading}
        submitLabel={enquiry.submitLabel}
      />
    </div>
  );
}
