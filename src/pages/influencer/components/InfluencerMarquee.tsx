import type { ClientLogo, ImageAsset } from '../types';

interface InfluencerClientMarqueeProps {
  heading: string;
  logos: ClientLogo[];
}

/**
 * Infinite horizontal marquee for brand/client logos on Agency & Instagram pages.
 */
export function InfluencerClientMarquee({
  heading,
  logos,
}: InfluencerClientMarqueeProps) {
  if (!logos.length) return null;
  const repeatedLogos = [...logos, ...logos];

  return (
    <section className="common-spc">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="sec_tit text-center">
              <h2 className="reveal reveal-up">
                <span className="to">{heading}</span>
              </h2>
            </div>
          </div>
        </div>
        <div id="client-content">
          <div id="clients">
            <div className="clients-wrap">
              <ul className="clearfix" id="clients-list">
                {repeatedLogos.map((logo, idx) => (
                  <li key={`${logo.src}-${idx}`}>
                    <img alt={logo.alt} src={logo.src} loading="lazy" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ElementorBrandCarouselProps {
  logos: ImageAsset[];
}

/**
 * Smooth CSS-animated brand logo strip matching Elementor's b73683c carousel.
 */
export function ElementorBrandCarousel({ logos }: ElementorBrandCarouselProps) {
  if (!logos.length) return null;
  const repeatedLogos = [...logos, ...logos];

  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-b73683c elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-element_type="section"
      data-id="b73683c"
    >
      <div className="elementor-container elementor-column-gap-default">
        <div
          className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-e0d7304"
          data-element_type="column"
          data-id="e0d7304"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-3386724 elementor-widget elementor-widget-image-carousel"
              data-element_type="widget"
              data-id="3386724"
              data-widget_type="image-carousel.default"
            >
              <div className="elementor-widget-container">
                <div className="elementor-image-carousel-wrapper swiper influencer-brand-carousel-viewport">
                  <div className="swiper-wrapper influencer-brand-carousel-track">
                    {repeatedLogos.map((logo, idx) => (
                      <div className="swiper-slide" key={`${logo.src}-${idx}`}>
                        <figure className="swiper-slide-inner">
                          <img
                            className="swiper-slide-image"
                            src={logo.src}
                            alt={logo.alt}
                            loading="lazy"
                          />
                        </figure>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
