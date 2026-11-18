import {
  AlternatingSplitSection,
  BottomCtaBanner,
  FeatureGridSection,
  PageSeo,
  ProcessRoadmapSection,
  ServiceHeroSection,
  type ActionItem,
} from '@/components/sections';
import type { CtaAction } from './types';
import { ieoListingData } from './data/ieoListingData';

function mapAction(c: CtaAction, fallbackVariant: ActionItem['variant'] = 'primary'): ActionItem {
  const isWhatsapp = c.kind === 'whatsapp' || /wa\.link|whatsapp/i.test(c.href);
  return {
    label: c.label,
    href: c.href,
    opensModal: c.kind === 'modal' || c.href === '#' || c.href === '#myModal',
    external: c.kind === 'external' || isWhatsapp,
    variant: isWhatsapp ? 'whatsapp' : fallbackVariant,
  };
}

export default function IeoListingPage() {
  const data = ieoListingData;

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={data.title} description={data.metaDesc} />

      {/* 1. Split Hero + Lead Form */}
      <ServiceHeroSection
        theme="crypto"
        layout="split-form"
        badge="Exchange Launchpad"
        heading={data.hero.heading}
        paragraphs={data.hero.paragraphs}
        actions={[mapAction(data.hero.cta)]}
        formHeading={data.hero.formHeading}
        formSubmitLabel="Submit Listing Inquiry"
      />

      {/* 2. Why Choose IEO Over ICO */}
      <AlternatingSplitSection
        theme="crypto"
        surface="light"
        badge="Exchange Validation"
        heading={data.whyIeoOverIco.heading}
        paragraphs={[
          ...data.whyIeoOverIco.introParagraphs,
          ...(data.whyIeoOverIco.closingParagraph ? [data.whyIeoOverIco.closingParagraph] : []),
        ]}
        bullets={data.whyIeoOverIco.bullets}
        imageSrc={data.whyIeoOverIco.imageSrc}
        imageAlt={data.whyIeoOverIco.imageAlt}
      />

      {/* 3. Our IEO Listing Services */}
      <FeatureGridSection
        theme="crypto"
        surface="muted"
        badge="End-to-End Listing"
        heading={`${data.servicesSection.headingPrefix} ${data.servicesSection.headingAccent}`}
        subheading={data.servicesSection.subtitle}
        cards={data.servicesSection.cards.map((c) => ({
          badge: c.number,
          title: c.title,
          description: c.text,
          bullets: c.bullets,
        }))}
        columns={3}
      />

      {/* 4. Benefits of Our IEO Listing Services */}
      <AlternatingSplitSection
        theme="crypto"
        surface="dark"
        reverse
        badge="Competitive Edge"
        heading={data.benefitsSection.heading}
        paragraphs={[
          ...data.benefitsSection.paragraphs,
          ...(data.benefitsSection.closingParagraph ? [data.benefitsSection.closingParagraph] : []),
        ]}
        bullets={data.benefitsSection.bullets}
        imageSrc={data.benefitsSection.imageSrc}
        imageAlt={data.benefitsSection.imageAlt}
      />

      {/* 5. Who Should Use IEO Listing Services */}
      <AlternatingSplitSection
        theme="crypto"
        surface="light"
        badge="Ideal Token Teams"
        heading={data.whoShouldUse.heading}
        paragraphs={[
          ...(data.whoShouldUse.intro ? [data.whoShouldUse.intro] : []),
          ...(data.whoShouldUse.closing ? [data.whoShouldUse.closing] : []),
        ]}
        bullets={data.whoShouldUse.bullets}
        imageSrc={data.whoShouldUse.imageSrc}
        imageAlt={data.whoShouldUse.imageAlt}
      />

      {/* 6. Our Proven Process */}
      <ProcessRoadmapSection
        theme="crypto"
        surface="muted"
        variant="timeline"
        badge="Launch Workflow"
        heading={`${data.processSection.headingPrefix} ${data.processSection.headingAccent}`}
        subheading={data.processSection.subtitle}
        steps={data.processSection.steps.map((s) => ({
          step: s.number,
          title: s.title,
          description: s.text,
        }))}
      />

      {/* 7. Why EON8 for IEO Listing */}
      <AlternatingSplitSection
        theme="crypto"
        surface="dark"
        reverse
        badge="Trusted Exchange Network"
        heading={data.whyEon8Section.heading}
        paragraphs={[
          ...data.whyEon8Section.paragraphs,
          ...(data.whyEon8Section.closing ? [data.whyEon8Section.closing] : []),
        ]}
        bullets={data.whyEon8Section.bullets}
        imageSrc={data.whyEon8Section.imageSrc}
        imageAlt={data.whyEon8Section.imageAlt}
      />

      {/* 8. Final CTA + Lead Form */}
      <BottomCtaBanner
        theme="crypto"
        heading={`${data.finalCta.headingPrefix} ${data.finalCta.headingAccent}`}
        description={data.finalCta.paragraphs.join(' ')}
        submitLabel="Book Free Consultation"
      />
    </div>
  );
}
