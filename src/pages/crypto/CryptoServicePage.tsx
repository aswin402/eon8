import { useEffect, useState } from 'react';
import { CryptoClientMarquee } from './components/CryptoClientMarquee';
import { CryptoDisclaimerSection } from './components/CryptoDisclaimerSection';
import { CryptoBottomEnquirySection } from './components/CryptoForms';
import { CryptoHeroBanner } from './components/CryptoHeroBanner';
import { CryptoPageShell } from './components/CryptoPageShell';
import { CryptoSectionRenderer } from './components/CryptoSectionRenderer';
import { CRYPTO_SERVICE_LOADERS } from './data/services';
import type { CryptoServicePageData } from './types';

interface CryptoServicePageProps {
  slug: string;
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
    loader()
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
      <div className="max-w-3xl mx-auto py-24 px-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Crypto Service Not Found</h1>
        <p className="text-slate-600">We could not load data for "{slug}".</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#044DB5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <CryptoPageShell slug={data.slug} title={data.title} metaDesc={data.metaDesc}>
      <CryptoHeroBanner hero={data.hero} />

      {data.clientLogos.length > 0 && (
        <CryptoClientMarquee
          heading={data.clientSliderHeading || 'We Helped Our Clients Take Their Biggest Step'}
          logos={data.clientLogos}
          variant="nft-slider"
        />
      )}

      {data.sections.map((section, idx) => (
        <CryptoSectionRenderer section={section} key={`${section.type}-${idx}`} />
      ))}

      <CryptoBottomEnquirySection enquiry={data.enquiry} formHeading={data.hero.formHeading} />

      <CryptoDisclaimerSection text={data.disclaimer} />
    </CryptoPageShell>
  );
}
