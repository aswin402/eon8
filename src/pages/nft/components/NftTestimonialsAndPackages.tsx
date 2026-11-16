import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { NftCtaButton, NftPackageRow, NftTestimonialCard } from '../types';
import { NftActionButton } from './NftActionButton';

interface NftVideoFeatureProps {
  sectionClass?: string;
  heading: string;
  description: string;
  videoSrc: string;
  videoTitle: string;
}

/**
 * Two-column client testimonial video feature section with responsive 16:9 embed.
 */
export function NftVideoFeatureSection({
  sectionClass = 'non-padding',
  heading,
  description,
  videoSrc,
  videoTitle,
}: NftVideoFeatureProps) {
  return (
    <section className={sectionClass}>
      <div className="container">
        <div className="row items-center">
          <div className="col-md-6">
            <div className="testi-video-content">
              <h2>{heading}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="nft-video-embed">
              <iframe
                src={videoSrc}
                title={videoTitle}
                className="testimonails-width"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface NftTestimonialsSectionProps {
  heading: string;
  subheading?: string;
  cards: NftTestimonialCard[];
  videoFeature?: {
    sectionClass: string;
    heading: string;
    description: string;
    videoSrc: string;
    videoTitle: string;
  };
  ctaButtons: NftCtaButton[];
  onOpenModal?: () => void;
}

/**
 * Interactive client testimonial slider section paired with nested video review and CTAs.
 */
export function NftTestimonialsSection({
  heading,
  subheading,
  cards,
  videoFeature,
  ctaButtons,
  onOpenModal,
}: NftTestimonialsSectionProps) {
  const windowSize = 3;
  const maxPage = Math.max(0, cards.length - windowSize);
  const [startIdx, setStartIdx] = useState(0);

  const visibleCards =
    cards.length <= windowSize ? cards : cards.slice(startIdx, startIdx + windowSize);

  return (
    <div id="testimonials-slider" className="container rounded mb-5">
      <div className="text-center mb-4">
        <h2 className="text-center head">{heading}</h2>
        {subheading && <p className="text-center text-slate-600">{subheading}</p>}
      </div>

      <div className="nft-testimonial-grid">
        {visibleCards.map((card, idx) => (
          <div className="card d-flex flex-column" id={card.id || undefined} key={`${startIdx}-${idx}`}>
            <div className="profile pb-4 mt-auto">
              <img src={card.avatarSrc} alt={card.avatarAlt} loading="lazy" />
              <div className="mt-2" aria-label={`${card.stars} out of 5 stars`}>
                {Array.from({ length: card.stars }).map((_, sIdx) => (
                  <span className="fas fa-star active-star" key={sIdx} aria-hidden="true" />
                ))}
              </div>
              {card.name && <strong className="mt-2 block text-slate-900">{card.name}</strong>}
              <div className="testimonial">{card.quote}</div>
              {card.button && (
                <div className="d-flex flex-column mt-3">
                  <NftActionButton button={card.button} onOpenModal={onOpenModal} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {maxPage > 0 && (
        <div className="nft-testimonial-controls items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Previous testimonials"
            onClick={() => setStartIdx((prev) => (prev <= 0 ? maxPage : prev - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: maxPage + 1 }).map((_, dotIdx) => (
            <button
              type="button"
              key={dotIdx}
              aria-label={`Show testimonial group ${dotIdx + 1}`}
              aria-pressed={startIdx === dotIdx}
              className={`nft-testimonial-dot ${startIdx === dotIdx ? 'is-active' : ''}`}
              onClick={() => setStartIdx(dotIdx)}
            />
          ))}
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Next testimonials"
            onClick={() => setStartIdx((prev) => (prev >= maxPage ? 0 : prev + 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {videoFeature && (
        <div className="mt-10">
          <NftVideoFeatureSection
            sectionClass={videoFeature.sectionClass}
            heading={videoFeature.heading}
            description={videoFeature.description}
            videoSrc={videoFeature.videoSrc}
            videoTitle={videoFeature.videoTitle}
          />
        </div>
      )}

      {ctaButtons.length > 0 && (
        <div className="col-md-12 text-center mt-6 flex flex-wrap justify-center gap-3">
          {ctaButtons.map((btn, idx) => (
            <NftActionButton key={idx} button={btn} onOpenModal={onOpenModal} />
          ))}
        </div>
      )}
    </div>
  );
}

interface NftPackageTableSectionProps {
  sectionId?: string;
  sectionClass: string;
  heading: string;
  mainRows: NftPackageRow[];
  noteText?: string;
}

/**
 * NFT Marketing packages and pricing breakdown table.
 */
export function NftPackageTableSection({
  sectionId = 'package',
  sectionClass,
  heading,
  mainRows,
  noteText,
}: NftPackageTableSectionProps) {
  return (
    <section id={sectionId} className={sectionClass}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center mb-4">
            <h2>{heading}</h2>
          </div>
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table" id="seo-package">
                <tbody>
                  {mainRows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.cells.map((cell, cIdx) => {
                        const CellTag = cell.tag === 'td' ? 'td' : 'th';
                        return (
                          <CellTag
                            key={cIdx}
                            className={cell.className}
                            rowSpan={cell.rowSpan}
                            colSpan={cell.colSpan}
                          >
                            {cell.text}
                          </CellTag>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {noteText && (
                <table className="table" id="seo-package-note">
                  <tbody>
                    <tr>
                      <th className="bg-color" colSpan={4}>
                        {noteText}
                      </th>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
