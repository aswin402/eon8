import { useEffect, useState } from 'react';
import {
  BottomCtaBanner,
  ClientLogoMarquee,
  PageSeo,
  ServiceHeroSection,
  type ActionItem,
} from '@/components/sections';
import { useAppStore } from '@/store/useAppStore';
import { HeadingLines, RichText } from '../crypto/components/RichText';
import { NftSectionRenderer } from './components/NftSectionRenderer';
import { NFT_SERVICE_LOADERS } from './data/services';
import type { NftCtaButton, NftServicePageData, NftWpSlug } from './types';
import { loadPageContent } from '@/lib/pages/pageContent';

interface NftServicePageProps {
  slug: NftWpSlug;
}

function mapNftCta(btn: NftCtaButton): ActionItem {
  const isWhatsapp = /wa\.link|whatsapp/i.test(btn.href);
  return {
    label: btn.label,
    href: btn.href,
    opensModal: Boolean(btn.opensModal || btn.href === '#' || btn.href === '#myModal'),
    external: Boolean(btn.isExternal || isWhatsapp),
    variant: isWhatsapp ? 'whatsapp' : 'primary',
  };
}

export default function NftServicePage({ slug }: NftServicePageProps) {
  const { setContactModalOpen } = useAppStore();
  const [loaded, setLoaded] = useState<{
    routeSlug: NftWpSlug;
    data: NftServicePageData;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = NFT_SERVICE_LOADERS[slug];
    if (!loader) return undefined;

    loadPageContent(`nft-service:${slug}`, loader).then((pageData) => {
      if (!cancelled) {
        setLoaded({ routeSlug: slug, data: pageData });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const data = loaded?.routeSlug === slug ? loaded.data : null;
  const openModal = () => setContactModalOpen(true);

  if (!data) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-background">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={data.title} description={data.metaDesc} />

      {/* 1. Hero Section */}
      {data.hero ? (
        <ServiceHeroSection
          theme="nft"
          layout={data.hero.heroForm ? 'split-form' : data.hero.image ? 'split-media' : 'centered'}
          badge={slug.startsWith('discord') ? 'Discord Community Growth' : 'NFT & Web3 Studio'}
          heading={<HeadingLines lines={data.hero.headingLines} />}
          paragraphs={data.hero.paragraphs.map((nodes, idx) => (
            <RichText key={idx} nodes={nodes} tone="on-dark" />
          ))}
          bullets={data.hero.bulletColumns.flat()}
          actions={data.hero.ctas.map(mapNftCta)}
          mediaSrc={data.hero.image?.src}
          mediaAlt={data.hero.image?.alt || data.title}
          formHeading={data.hero.heroForm?.heading || 'Get Free NFT Proposal'}
          formSubmitLabel={data.hero.heroForm?.submitLabel || 'Submit'}
          onCustomModal={openModal}
        />
      ) : (
        <ServiceHeroSection
          theme="nft"
          layout="split-form"
          badge="Free Web3 Strategy Call"
          heading={data.bottomEnquiry?.heading || data.title}
          subheading={data.bottomEnquiry?.subheading}
          paragraphs={[
            ...(data.bottomEnquiry?.paragraphs || []),
            ...(data.bottomEnquiry?.trailingParagraphs || []),
          ].map((nodes, idx) => (
            <RichText key={idx} nodes={nodes} tone="on-dark" />
          ))}
          bullets={data.bottomEnquiry?.bullets || []}
          formHeading={data.bottomEnquiry?.formHeading || 'Book Free Consultation'}
          formSubmitLabel={data.bottomEnquiry?.formSubmitLabel || 'Submit'}
          onCustomModal={openModal}
        />
      )}

      {/* 2. Client Brand Marquee */}
      {data.clientSlider && (
        <ClientLogoMarquee
          heading={data.clientSlider.heading}
          logos={data.clientSlider.logos.map((l) => ({ src: l.src, alt: l.name }))}
        />
      )}

      {/* 3. Pure Tailwind NFT & Discord Section Blocks */}
      <NftSectionRenderer sections={data.sections} onOpenModal={openModal} />

      {/* 4. Bottom Enquiry + Disclaimer (skip duplicate form if hero already rendered bottomEnquiry) */}
      {data.hero && (
        <BottomCtaBanner
          theme="nft"
          heading={data.bottomEnquiry?.heading || 'Launch & Scale Your Web3 Collection With EON8'}
          description={
            data.bottomEnquiry && data.bottomEnquiry.paragraphs.length > 0 ? (
              <div className="space-y-3">
                {data.bottomEnquiry.paragraphs.map((nodes, idx) => (
                  <p key={idx}>
                    <RichText nodes={nodes} tone="on-dark" />
                  </p>
                ))}
              </div>
            ) : (
              'Partner with EON8 to build organic community hype, connect with tier-1 Web3 KOLs, and execute sold-out mint campaigns.'
            )
          }
          stats={
            data.bottomEnquiry?.stats.length
              ? data.bottomEnquiry.stats
              : undefined
          }
          formHeading={data.bottomEnquiry?.formHeading || 'Reach Out To Us'}
          submitLabel={data.bottomEnquiry?.formSubmitLabel || 'Schedule Consultation'}
          disclaimer={data.disclaimer?.text}
        />
      )}
    </div>
  );
}
