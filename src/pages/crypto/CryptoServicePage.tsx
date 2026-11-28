import { useEffect, useState } from 'react';
import {
  BottomCtaBanner,
  ClientLogoMarquee,
  PageSeo,
  ServiceHeroSection,
  type ActionItem,
} from '@/components/sections';
import { CryptoSectionRenderer } from './components/CryptoSectionRenderer';
import { HeadingLines, RichText } from './components/RichText';
import { CRYPTO_SERVICE_LOADERS } from './data/services';
import type { CryptoServicePageData, CtaAction, RichNode } from './types';
import { loadPageContent } from '@/lib/pages/pageContent';

interface CryptoServicePageProps {
  slug: string;
}

function flattenRichNodes(nodes: RichNode[]): string {
  return nodes
    .map((n) => (typeof n === 'string' ? n : n.br ? ' ' : n.text || ''))
    .join('')
    .trim();
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

export default function CryptoServicePage({ slug }: CryptoServicePageProps) {
  const [state, setState] = useState<{
    slug: string;
    data: CryptoServicePageData | null;
    error: boolean;
  }>({ slug: '', data: null, error: false });

  useEffect(() => {
    let active = true;
    const loader = CRYPTO_SERVICE_LOADERS[slug];
    if (!loader) {
      Promise.resolve().then(() => {
        if (active) setState({ slug, data: null, error: true });
      });
      return () => {
        active = false;
      };
    }
    loadPageContent(`crypto-service:${slug}`, loader)
      .then((loaded) => {
        if (active) setState({ slug, data: loaded, error: false });
      })
      .catch(() => {
        if (active) setState({ slug, data: null, error: true });
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const isCurrent = state.slug === slug;
  const data = isCurrent ? state.data : null;
  const error = isCurrent ? state.error : false;

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-28 px-6 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
          Crypto Service Not Found
        </h1>
        <p className="text-muted-foreground">We could not load data for &ldquo;{slug}&rdquo;.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-background">
        <div className="w-9 h-9 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={data.title} description={data.metaDesc} />

      {/* 1. Split Hero + Native Lead Capture */}
      <ServiceHeroSection
        theme="crypto"
        layout="split-form"
        badge="Web3 Growth Division"
        heading={<HeadingLines lines={data.hero.headingLines} />}
        paragraphs={data.hero.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} tone="on-dark" />
        ))}
        bullets={data.hero.bullets.map(flattenRichNodes).filter(Boolean)}
        actions={data.hero.ctas.map(mapCta)}
        formHeading={data.hero.formHeading || 'Reach Out To Us'}
        formSubmitLabel={data.enquiry.submitLabel || 'Submit Enquiry'}
      />

      {/* 2. Client Brand Marquee */}
      {data.clientLogos.length > 0 && (
        <ClientLogoMarquee
          heading={data.clientSliderHeading || 'We Helped Our Clients Take Their Biggest Step'}
          logos={data.clientLogos.map((l) => ({ src: l.src, alt: l.name }))}
        />
      )}

      {/* 3. Pure Tailwind Section Blocks */}
      {data.sections.map((section, idx) => (
        <CryptoSectionRenderer
          section={section}
          index={idx}
          key={`${section.type}-${idx}`}
        />
      ))}

      {/* 4. Bottom Enquiry + Disclaimer */}
      <BottomCtaBanner
        theme="crypto"
        heading={<HeadingLines lines={data.enquiry.headingLines} />}
        description={
          <div className="space-y-3">
            {data.enquiry.paragraphs.map((nodes, idx) => (
              <p key={idx}>
                <RichText nodes={nodes} tone="on-dark" />
              </p>
            ))}
          </div>
        }
        stats={data.enquiry.stats.map((s) => ({
          value: `${s.count}${s.suffix || ''}`,
          label: s.label,
          iconSrc: s.iconSrc,
        }))}
        formHeading={data.hero.formHeading || 'Reach Out To Us'}
        submitLabel={data.enquiry.submitLabel || 'Submit'}
        disclaimer={data.disclaimer}
      />
    </div>
  );
}
