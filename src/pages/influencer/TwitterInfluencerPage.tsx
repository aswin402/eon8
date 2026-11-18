import { Megaphone, Sparkles, TrendingUp, Users } from 'lucide-react';
import {
  AlternatingSplitSection,
  BottomCtaBanner,
  DiscoveryCallSection,
  FaqAccordionSection,
  FeatureGridSection,
  PageSeo,
  ProcessRoadmapSection,
  ServiceHeroSection,
  SmartActionButton,
} from '@/components/sections';
import { HeadingLines, RichText } from '@/pages/crypto/components/RichText';
import { twitterInfluencerData } from './data/twitterInfluencerData';

const BENEFIT_ICONS = [TrendingUp, Users, Megaphone, Sparkles];

export default function TwitterInfluencerPage() {
  const {
    title,
    metaDesc,
    hero,
    benefitsSection,
    boostSplit,
    specializedCards,
    calibratedFeatures,
    ctaBanner,
    processGrid,
    scaleSplit,
    faq,
    calendly,
    bottomEnquiry,
    disclaimer,
  } = twitterInfluencerData;

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={title} description={metaDesc} />

      {/* 1. Split Hero + Lead Form */}
      <ServiceHeroSection
        theme="influencer"
        layout="split-form"
        badge="X / Twitter Creator Growth"
        heading={<HeadingLines lines={hero.headingLines} />}
        paragraphs={[hero.subheading]}
        bullets={hero.bulletColumns.flat()}
        actions={hero.ctas.map((c) => ({
          label: c.label,
          href: c.href,
          external: c.isExternal,
          variant: /wa\.link|whatsapp/i.test(c.href) ? 'whatsapp' : 'primary',
        }))}
        formHeading={hero.formHeading}
        formSubmitLabel={hero.formSubmitLabel}
      />

      {/* 2. Benefits Grid (Lucide icons — zero broken FA glyphs) */}
      <FeatureGridSection
        theme="influencer"
        surface="light"
        badge="Platform Impact"
        heading={benefitsSection.heading}
        cards={benefitsSection.items.map((item, idx) => ({
          icon: BENEFIT_ICONS[idx % BENEFIT_ICONS.length],
          title: item.title,
          description: item.description,
        }))}
        columns={4}
      />

      {/* 3. Boost Your Social Presence Split */}
      <AlternatingSplitSection
        theme="influencer"
        surface="muted"
        reverse
        heading={<HeadingLines lines={boostSplit.headingLines} />}
        paragraphs={[<RichText key="intro" nodes={boostSplit.intro} />]}
        bullets={boostSplit.bullets.map((b) => `${b.title} — ${b.text}`)}
        imageSrc={boostSplit.image.src}
        imageAlt={boostSplit.image.alt}
      />

      {/* 4. Specialized Twitter Influencer Services */}
      <FeatureGridSection
        theme="influencer"
        surface="light"
        badge="Core Capabilities"
        heading={<HeadingLines lines={specializedCards.headingLines} />}
        cards={specializedCards.cards.map((c) => ({
          title: c.title,
          description: c.description,
          iconSrc: c.iconSrc,
          iconAlt: c.iconAlt,
        }))}
        columns={3}
      />

      {/* 5. Calibrated Features Grid */}
      <FeatureGridSection
        theme="influencer"
        surface="dark"
        heading={<HeadingLines lines={calibratedFeatures.headingLines} />}
        subheading={calibratedFeatures.subheading}
        cards={calibratedFeatures.items.map((item) => ({
          title: item.title,
          description: item.description,
          iconSrc: item.iconSrc,
          iconAlt: item.iconAlt,
        }))}
        columns={2}
      />

      {/* 6. Mid-Page CTA Banner */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#4a0936] via-[#831843] to-[#be123c] text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              {ctaBanner.headingText}
            </h2>
            <p className="text-pink-100">{ctaBanner.subtext}</p>
          </div>
          <SmartActionButton
            theme="influencer"
            action={{
              label: ctaBanner.buttonLabel,
              href: ctaBanner.buttonHref,
              variant: 'primary',
            }}
          />
        </div>
      </section>

      {/* 7. Process Grid */}
      <ProcessRoadmapSection
        theme="influencer"
        surface="muted"
        badge="Workflow"
        heading={<HeadingLines lines={processGrid.headingLines} />}
        steps={processGrid.items.map((item, idx) => ({
          step: String(idx + 1).padStart(2, '0'),
          title: item.title,
          description: item.description,
          iconSrc: item.iconSrc,
        }))}
      />

      {/* 8. Scale The Social Realm Split */}
      <AlternatingSplitSection
        theme="influencer"
        surface="light"
        heading={<HeadingLines lines={scaleSplit.headingLines} />}
        paragraphs={scaleSplit.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} />
        ))}
        imageSrc={scaleSplit.image.src}
        imageAlt={scaleSplit.image.alt}
      />

      {/* 9. FAQ */}
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

      {/* 10. Discovery Call */}
      <DiscoveryCallSection
        theme="influencer"
        heading={calendly.heading}
        subheading={calendly.subheading}
        callTitle={calendly.callTitle}
        callDescription={calendly.callDescription}
      />

      {/* 11. Bottom Enquiry + Disclaimer */}
      <BottomCtaBanner
        id="enquiry"
        theme="influencer"
        heading={<HeadingLines lines={bottomEnquiry.headingLines} />}
        description={<RichText nodes={bottomEnquiry.description} tone="on-dark" />}
        stats={bottomEnquiry.stats}
        formHeading={bottomEnquiry.formHeading}
        submitLabel={bottomEnquiry.formSubmitLabel}
        disclaimer={disclaimer}
      />
    </div>
  );
}
