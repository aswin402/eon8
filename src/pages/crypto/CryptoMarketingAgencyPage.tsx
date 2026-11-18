import { Link } from 'react-router-dom';
import {
  AlternatingSplitSection,
  BottomCtaBanner,
  ClientLogoMarquee,
  DiscoveryCallSection,
  FaqAccordionSection,
  FeatureGridSection,
  PageSeo,
  ProcessRoadmapSection,
  ServiceHeroSection,
  SmartActionButton,
  type ActionItem,
} from '@/components/sections';
import type { CtaAction } from './types';
import { cryptoMarketingAgencyData } from './data/cryptoMarketingAgencyData';

interface CryptoMarketingAgencyPageProps {
  slug?: string;
}

function mapCta(c: CtaAction): ActionItem {
  const isWhatsapp = c.kind === 'whatsapp' || /wa\.link|whatsapp/i.test(c.href);
  return {
    label: c.label,
    href: c.href,
    opensModal: c.kind === 'modal' || c.href === '#' || c.href === '#myModal',
    external: c.kind === 'external' || isWhatsapp,
    variant: isWhatsapp ? 'whatsapp' : c.variant === 'secondary' ? 'secondary' : 'primary',
  };
}

export default function CryptoMarketingAgencyPage({ slug }: CryptoMarketingAgencyPageProps) {
  const data = cryptoMarketingAgencyData;

  return (
    <div className="bg-background text-foreground" data-page-slug={slug}>
      <PageSeo title={data.title} description={data.metaDesc} />

      {/* 1. Split Hero + Lead Form */}
      <ServiceHeroSection
        theme="crypto"
        layout="split-form"
        badge="Web3 & Token Growth"
        heading={data.hero.heading}
        paragraphs={[data.hero.description]}
        bullets={data.hero.features}
        actions={data.hero.ctas.map(mapCta)}
        formHeading={data.hero.formHeading}
        formSubmitLabel="Submit Enquiry"
        formShowCountry
      />

      {/* 2. Client Brand Marquee */}
      <ClientLogoMarquee
        heading={data.clientSlider.heading}
        logos={data.clientSlider.logos.map((l) => ({ src: l.src, alt: l.name }))}
      />

      {/* 3. Viral Spotlight Banner with Floating Coin Icons */}
      <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0d1017] via-[#1c1a0e] to-[#4a3700] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="hidden lg:flex lg:col-span-2 flex-col items-center gap-6">
            {data.viralSection.leftIcons.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt=""
                className="w-16 h-16 object-contain animate-float"
              />
            ))}
          </div>

          <div className="lg:col-span-8 text-center space-y-5">
            {data.viralSection.eyebrow && (
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                {data.viralSection.eyebrow}
              </span>
            )}
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
              {data.viralSection.heading}
            </h2>
            {data.viralSection.paragraphs.map((p, idx) => (
              <p key={idx} className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
                {p}
              </p>
            ))}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              {data.viralSection.ctas.map((cta, idx) => (
                <SmartActionButton key={idx} action={mapCta(cta)} theme="crypto" />
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-2 flex-col items-center gap-6">
            {data.viralSection.rightIcons.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt=""
                className="w-16 h-16 object-contain animate-bounce-slow"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Overview: Get Maximum ROI */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
              Full-Funnel Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground leading-tight">
              {data.overview.heading}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {data.overview.subheading}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {data.overview.steps.map((step, idx) => (
              <div
                key={step.title}
                className="rounded-2xl bg-card border border-border p-6 shadow-xs flex items-start gap-4"
              >
                <span className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 font-heading font-extrabold text-sm flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How We Bring Value + Channel Chips */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0a0d14] via-[#121726] to-[#261e07] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
              {data.valueSection.heading}
            </h2>

            <div className="flex flex-wrap gap-2.5">
              {data.valueSection.chips.map((chip) => (
                <Link
                  key={chip.label}
                  to={chip.href}
                  className="px-4 py-2 rounded-full bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-400/30 text-xs sm:text-sm font-bold transition-colors no-underline"
                >
                  {chip.label}
                </Link>
              ))}
            </div>

            <ul className="space-y-3 pt-1">
              {data.valueSection.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200 text-base">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <img
              src={data.valueSection.imageSrc}
              alt={data.valueSection.imageAlt}
              className="w-full max-w-[360px] h-auto object-contain drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* 6. Mid-Page PR CTA */}
      <section className="py-14 px-4 sm:px-6 bg-gradient-to-r from-[#2b2208] via-[#574100] to-[#785900] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            {data.ctaSection.heading}
          </h2>
          <p className="text-amber-200 font-semibold">{data.ctaSection.subtext}</p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            {data.ctaSection.ctas.map((cta, idx) => (
              <SmartActionButton key={idx} action={mapCta(cta)} theme="crypto" />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Data-Driven Crypto Services */}
      <FeatureGridSection
        theme="crypto"
        surface="light"
        badge={data.dataDrivenServices.subtitle}
        heading={data.dataDrivenServices.heading}
        subheading={data.dataDrivenServices.intro}
        cards={data.dataDrivenServices.cards.map((c) => ({
          title: c.title,
          description: c.text,
          iconSrc: c.iconSrc,
          iconAlt: c.iconAlt,
        }))}
        columns={3}
      />

      {/* 8. Extensive Crypto Services (9 Cards) */}
      <FeatureGridSection
        theme="crypto"
        surface="dark"
        badge="360° Web3 Execution"
        heading={data.extensiveServices.heading}
        cards={data.extensiveServices.cards.map((c) => ({
          title: c.title,
          description: c.text,
          iconSrc: c.iconSrc,
          iconAlt: c.iconAlt,
        }))}
        columns={3}
      />

      {/* 9. Projects Covered (Clean full-width cards — zero crushed text!) */}
      <FeatureGridSection
        theme="crypto"
        surface="muted"
        badge="Token Ecosystems"
        heading={data.projectsSection.heading}
        cards={data.projectsSection.items.map((item) => ({
          title: item.title,
          description: item.text,
          iconSrc: item.iconSrc,
          iconAlt: item.iconAlt,
        }))}
        columns={3}
      />

      {/* 10. Roadmap Timeline */}
      <ProcessRoadmapSection
        theme="crypto"
        surface="light"
        variant="timeline"
        badge="Execution Blueprint"
        heading={data.roadmapSection.heading}
        steps={data.roadmapSection.steps.map((s, i) => ({
          step: `0${i + 1}`,
          title: s.title,
          description: s.text,
        }))}
        bottomActions={data.roadmapSection.ctaButtons.map(mapCta)}
      />

      {/* 11. Partner With Eon8 (Full crisp 800x532 visual) */}
      <AlternatingSplitSection
        theme="crypto"
        surface="muted"
        badge="Long-Term Growth"
        heading={data.partnerSection.heading}
        paragraphs={[data.partnerSection.description]}
        bullets={data.partnerSection.features}
        bulletsColumns={2}
        imageSrc={data.partnerSection.imageSrc}
        imageAlt={data.partnerSection.imageAlt}
      />

      {/* 12. FAQs */}
      <FaqAccordionSection
        theme="crypto"
        surface="light"
        heading={data.faqSection.heading}
        faqs={data.faqSection.items.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      {/* 13. Discovery Call + Bottom Enquiry */}
      <DiscoveryCallSection
        theme="crypto"
        heading={data.calendlySection.heading}
        subheading={data.calendlySection.subheading}
        callTitle="30-Min Crypto Discovery Call"
        callDescription="Schedule a 30-minute consultation with our crypto marketing specialists."
      />

      <BottomCtaBanner
        theme="crypto"
        heading="Ready To Launch & Scale Your Token Globally?"
        description="Connect with EON8's Web3 marketing strategists for investor-grade PR, KOL amplification, community growth, and exchange listing campaigns."
      />
    </div>
  );
}
