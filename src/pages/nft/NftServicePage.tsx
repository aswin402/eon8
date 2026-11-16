import { useEffect, useState } from 'react';
import { NFT_SERVICE_LOADERS } from './data/services';
import type { NftServicePageData, NftWpSlug } from './types';
import { NftPageShell } from './components/NftPageShell';
import { NftHeroBanner, NftStickyOfferButton } from './components/NftHeroBanner';
import { CryptoClientMarquee } from '../crypto/components/CryptoClientMarquee';
import { NftSectionRenderer } from './components/NftSectionRenderer';
import { NftBottomEnquirySection } from './components/NftForms';
import { NftConsultationModal } from './components/NftConsultationModal';

interface NftServicePageProps {
  slug: NftWpSlug;
}

/**
 * Pure React TSX page renderer for all WordPress NFT, Discord & PR service routes.
 */
export default function NftServicePage({ slug }: NftServicePageProps) {
  const [loaded, setLoaded] = useState<{
    routeSlug: NftWpSlug;
    data: NftServicePageData;
  } | null>(null);
  const [modalSlug, setModalSlug] = useState<NftWpSlug | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = NFT_SERVICE_LOADERS[slug];
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
  const isModalOpen = modalSlug === slug;
  const openModal = () => setModalSlug(slug);
  const closeModal = () => setModalSlug(null);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-white">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <NftPageShell slug={slug} title={data.title} description={data.metaDesc}>
      {data.stickyOffer && (
        <NftStickyOfferButton
          image={data.stickyOffer}
          onOpenModal={openModal}
        />
      )}

      {data.hero && <NftHeroBanner hero={data.hero} onOpenModal={openModal} />}

      {data.clientSlider && (
        <CryptoClientMarquee
          heading={data.clientSlider.heading}
          logos={data.clientSlider.logos}
          variant="nft-slider"
        />
      )}

      <NftSectionRenderer sections={data.sections} onOpenModal={openModal} />

      {data.bottomEnquiry && (
        <NftBottomEnquirySection data={data.bottomEnquiry} onOpenModal={openModal} />
      )}

      {data.disclaimer && (
        <section className={data.disclaimer.sectionClass}>
          <div className="container">
            <div className="row disc-head">
              <div className="col-md-12">
                <div className="claim-box text-center">
                  <p>{data.disclaimer.text}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {data.hasConsultationModal && (
        <NftConsultationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          variant={data.modalVariant}
          heading={data.modalHeading}
          submitLabel={data.modalSubmitLabel}
        />
      )}
    </NftPageShell>
  );
}
