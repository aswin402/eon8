import { useState } from 'react';
import type {
  ServiceCardsCarouselNode,
  ServiceLogoMarqueeNode,
  ServiceTestimonialQuotesNode,
} from '../types';

/**
 * Pure CSS infinite client/brand logo marquee replacing Swiper & #clients-list JS sliders.
 */
export function ServicesLogoMarquee({ node }: { node: ServiceLogoMarqueeNode }) {
  if (!node.logos.length) return null;
  const trackLogos = [...node.logos, ...node.logos];

  return (
    <div className="services-logo-marquee" aria-label="Client and Partner Logos">
      <div className="services-logo-marquee-track">
        {trackLogos.map((logo, idx) => (
          <div className="services-logo-marquee-slide" key={`${logo.src}-${idx}`}>
            <img
              src={logo.src}
              alt={logo.alt || 'Client Logo'}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Interactive quote rotator replacing prevTestimonial() / nextTestimonial()
 * on small-business-seo-services using exact native .testimonial-box classes.
 */
export function ServicesTestimonialQuotes({
  node,
}: {
  node: ServiceTestimonialQuotesNode;
}) {
  const [idx, setIdx] = useState(0);
  const total = node.quotes.length;
  if (total === 0) return null;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div
      id={node.wrapperProps?.id}
      className={node.wrapperProps?.className || 'testimonial-box'}
      style={node.wrapperProps?.style}
    >
      <div className="quote" aria-hidden="true">
        ❝
      </div>
      <div
        id="testimonialText"
        className={node.quoteProps?.className || 'testimonial-text'}
        style={node.quoteProps?.style}
      >
        {node.quotes[idx]}
      </div>
      <div className="user">
        <div className="user-avatar" />
        <div>
          <div className="user-name">Client Feedback</div>
          <div className="user-role">EON8 Customer</div>
        </div>
      </div>
      <div className="arrows">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous Testimonial"
          className="arrow-btn"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next Testimonial"
          className="arrow-btn"
        >
          ›
        </button>
      </div>
    </div>
  );
}

/**
 * Interactive cards carousel replacing Owl Carousel on search-engine-optimization-services-seo.
 */
export function ServicesCardsCarousel({ node }: { node: ServiceCardsCarouselNode }) {
  const [page, setPage] = useState(0);
  const cards = node.cards;
  if (!cards.length) return null;

  const pageSize = 3;
  const pageCount = Math.ceil(cards.length / pageSize);
  const start = page * pageSize;
  const visible =
    cards.length <= pageSize
      ? cards
      : Array.from({ length: pageSize }, (_, i) => cards[(start + i) % cards.length]);

  return (
    <div className="services-cards-carousel">
      <div className="services-cards-carousel-grid">
        {visible.map((card, idx) => (
          <div className="item" key={`${card.title}-${idx}`}>
            <div className="seo_wwd">
              <img src={card.imgSrc} alt={card.imgAlt || card.title} loading="lazy" />
              <div className="seo_wwd_cnt text-center">
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {pageCount > 1 && (
        <div className="services-carousel-dots" role="tablist" aria-label="Service slides">
          {Array.from({ length: pageCount }, (_, pIdx) => (
            <button
              key={pIdx}
              type="button"
              role="tab"
              aria-selected={page === pIdx}
              aria-label={`Slide group ${pIdx + 1}`}
              className={`services-carousel-dot ${page === pIdx ? 'is-active' : ''}`}
              onClick={() => setPage(pIdx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
