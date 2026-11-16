import { HeadingLines, RichText } from '@/pages/crypto/components/RichText';
import type { NftHeroSection, NftImageAsset } from '../types';
import { NftActionButton } from './NftActionButton';
import { NftProposalForm } from './NftForms';

interface NftStickyOfferButtonProps {
  image: NftImageAsset;
  onOpenModal: () => void;
}

/**
 * Floating consultation badge trigger shown beside NFT banners on desktop viewports.
 */
export function NftStickyOfferButton({
  image,
  onOpenModal,
}: NftStickyOfferButtonProps) {
  return (
    <div className="sticky-offer-img" id="mobile-hide">
      <button
        type="button"
        className="sticky-offer-trigger"
        aria-label={image.alt || 'Get Free Consultation'}
        onClick={onOpenModal}
      >
        <img
          src={image.src}
          alt={image.alt || 'Free Consultation'}
          className={image.className || 'img-fluid'}
        />
      </button>
    </div>
  );
}

interface NftHeroBannerProps {
  hero: NftHeroSection;
  onOpenModal: () => void;
}

/**
 * Parameterized NFT & Discord hero section supporting visual artwork or embedded proposal forms.
 */
export function NftHeroBanner({ hero, onOpenModal }: NftHeroBannerProps) {
  return (
    <section id={hero.sectionId} className={hero.sectionClass}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="ba_inr_cnt">
              <h1>
                <HeadingLines lines={hero.headingLines} />
              </h1>
              {hero.paragraphs.map((nodes, idx) => (
                <p key={idx}>
                  <RichText nodes={nodes} />
                </p>
              ))}
              {hero.bulletColumns.length > 0 && (
                <div className="row list-nft">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    {hero.bulletColumns.map((col, cIdx) => (
                      <div className="col-md-6 col-sm-6 col-xs-12" key={cIdx}>
                        <ul>
                          {col.map((item, iIdx) => (
                            <li key={iIdx}>
                              <i className="fa fa-check-circle" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {hero.ctas.length > 0 && (
                <div className="bannft-btn flex flex-wrap gap-3 items-center">
                  {hero.ctas.map((cta, idx) => (
                    <NftActionButton key={idx} button={cta} onOpenModal={onOpenModal} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            {hero.heroForm ? (
              <div className="form_ban">
                <NftProposalForm
                  mode="proposal-6"
                  heading={hero.heroForm.heading}
                  submitLabel={hero.heroForm.submitLabel}
                />
                {hero.heroForm.extraButtons && hero.heroForm.extraButtons.length > 0 && (
                  <div className="eon-action-buttons flex flex-wrap justify-center gap-3 mt-4">
                    {hero.heroForm.extraButtons.map((btn, idx) => (
                      <NftActionButton key={idx} button={btn} onOpenModal={onOpenModal} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              hero.image && (
                <div className="banner-img text-center">
                  <img
                    src={hero.image.src}
                    alt={hero.image.alt}
                    className={hero.image.className || 'img-fluid'}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
