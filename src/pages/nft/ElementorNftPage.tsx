import { useEffect, useState } from 'react';
import { NFT_ELEMENTOR_LOADERS } from './data/elementor';
import type { NftElementorPageData, NftElementorSlug } from './types';
import { NftPageShell } from './components/NftPageShell';
import { NftCalendlyWidget } from './components/NftCalendlyWidget';
import { RichText } from '../crypto/components/RichText';
import {
  ElementorCallbackForm,
  ElementorFunnelForm,
} from '../influencer/components/InfluencerForms';

interface ElementorNftPageProps {
  slug: NftElementorSlug;
}

/**
 * Native React TSX renderer for Elementor-based Community Marketing routes
 * (reddit-community-marketing-agency & discord-community-building-services).
 */
export default function ElementorNftPage({ slug }: ElementorNftPageProps) {
  const [loaded, setLoaded] = useState<{
    routeSlug: NftElementorSlug;
    data: NftElementorPageData;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = NFT_ELEMENTOR_LOADERS[slug];
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

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-white">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const {
    title,
    metaDesc,
    elementorPageClass,
    hero,
    statsSection,
    callbackBar,
    brandCarousel,
    whyAlternating,
    servicesSection,
    growthPartnerHeader,
    growthPartnerFeatures,
    approachGrid,
    calendlySection,
  } = data;

  const elementorId = elementorPageClass.replace('elementor-', '');
  const marqueeLogos = [...brandCarousel.logos, ...brandCarousel.logos];
  const isReddit = slug === 'reddit-community-marketing-agency';

  return (
    <NftPageShell slug={slug} title={title} description={metaDesc}>
      <div
        data-elementor-type="wp-page"
        data-elementor-id={elementorId}
        className={`elementor ${elementorPageClass}`}
      >
        {/* Top Blue Accent Bar (6cfcffd) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-6cfcffd elementor-section-full_width elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="6cfcffd"
        >
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-fcecc62"
              data-element_type="column"
              data-id="fcecc62"
            >
              <div className="elementor-widget-wrap elementor-element-populated" />
            </div>
          </div>
        </section>

        {/* Hero Split Banner + Funnel Lead Form (daed937) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-daed937 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="daed937"
        >
          <div className="elementor-background-overlay" />
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-6f897f6"
              data-element_type="column"
              data-id="6f897f6"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-c8d197a elementor-widget elementor-widget-heading"
                  data-element_type="widget"
                  data-id="c8d197a"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h1 className="elementor-heading-title elementor-size-default">
                      {hero.heading}
                    </h1>
                  </div>
                </div>

                <div
                  className="elementor-element elementor-element-cd70503 elementor-widget elementor-widget-text-editor"
                  data-element_type="widget"
                  data-id="cd70503"
                  data-widget_type="text-editor.default"
                >
                  <div className="elementor-widget-container">
                    {hero.paragraphs.map((nodes, idx) => (
                      <p key={idx}>
                        <RichText nodes={nodes} />
                      </p>
                    ))}
                  </div>
                </div>

                <section
                  className="elementor-section elementor-inner-section elementor-element elementor-element-31f76d5 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                  data-element_type="section"
                  data-id="31f76d5"
                  id="seo-padding"
                >
                  <div className="elementor-container elementor-column-gap-default">
                    {[
                      {
                        colId: '7ebf60d',
                        widgetId: '30ac54e',
                        items: hero.bulletColumns[0] ?? [],
                      },
                      {
                        colId: 'ebc2b37',
                        widgetId: '2fbaa49',
                        items: hero.bulletColumns[1] ?? [],
                      },
                    ].map((col) => (
                      <div
                        key={col.colId}
                        className={`elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-${col.colId}`}
                        data-element_type="column"
                        data-id={col.colId}
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className={`elementor-element elementor-element-${col.widgetId} elementor-align-start elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list`}
                            data-element_type="widget"
                            data-id={col.widgetId}
                            data-widget_type="icon-list.default"
                          >
                            <div className="elementor-widget-container">
                              <ul className="elementor-icon-list-items">
                                {col.items.map((check, idx) => (
                                  <li className="elementor-icon-list-item" key={idx}>
                                    <span className="elementor-icon-list-icon">
                                      <i aria-hidden="true" className="fas fa-check" />
                                    </span>
                                    <span className="elementor-icon-list-text">
                                      {check}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <ElementorFunnelForm />
          </div>
        </section>

        {/* Stats Counter Bar (2560955) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-2560955 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="2560955"
        >
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-e86bd63"
              data-element_type="column"
              data-id="e86bd63"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-8025a49 elementor-widget elementor-widget-heading"
                  data-element_type="widget"
                  data-id="8025a49"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      {statsSection.heading}
                    </h2>
                  </div>
                </div>

                <div
                  className="elementor-element elementor-element-4b157e4 elementor-widget elementor-widget-text-editor"
                  data-element_type="widget"
                  data-id="4b157e4"
                  data-widget_type="text-editor.default"
                >
                  <div className="elementor-widget-container">
                    <p>{statsSection.subheading}</p>
                  </div>
                </div>

                <section
                  className="elementor-section elementor-inner-section elementor-element elementor-element-fb9a9c4 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                  data-element_type="section"
                  data-id="fb9a9c4"
                >
                  <div className="elementor-container elementor-column-gap-default">
                    {statsSection.stats.map((stat) => (
                      <div
                        className={`elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-${stat.colId}`}
                        data-element_type="column"
                        data-id={stat.colId}
                        key={stat.colId}
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className={`elementor-element elementor-element-${stat.headingWidgetId} ${
                              stat.isRed ? 'seo-red ' : ''
                            }elementor-widget elementor-widget-heading`}
                            data-element_type="widget"
                            data-id={stat.headingWidgetId}
                            data-widget_type="heading.default"
                          >
                            <div className="elementor-widget-container">
                              <div className="elementor-heading-title elementor-size-default">
                                {stat.number}
                                {stat.suffix}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`elementor-element elementor-element-${stat.textWidgetId} elementor-widget elementor-widget-text-editor`}
                            data-element_type="widget"
                            data-id={stat.textWidgetId}
                            data-widget_type="text-editor.default"
                          >
                            <div className="elementor-widget-container">
                              <p>{stat.label}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Minutes Callback Bar (0c62c77) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-0c62c77 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="0c62c77"
        >
          <div className="elementor-background-overlay" />
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-5468bbd"
              data-element_type="column"
              data-id="5468bbd"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-4ccb9e8 elementor-widget elementor-widget-heading"
                  data-element_type="widget"
                  data-id="4ccb9e8"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      {callbackBar.heading}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-babe14b"
              data-element_type="column"
              data-id="babe14b"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-6c6db19 elementor-widget elementor-widget-html"
                  data-element_type="widget"
                  data-id="6c6db19"
                  data-widget_type="html.default"
                >
                  <div className="elementor-widget-container">
                    <ElementorCallbackForm
                      placeholder="Enter Phone Number"
                      submitLabel={callbackBar.submitLabel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Carousel Strip (b73683c) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-b73683c elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="b73683c"
        >
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-2438952"
              data-element_type="column"
              data-id="2438952"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className={`elementor-element elementor-element-${brandCarousel.widgetId} elementor-widget elementor-widget-image-carousel`}
                  data-element_type="widget"
                  data-id={brandCarousel.widgetId}
                  data-widget_type="image-carousel.default"
                >
                  <div className="elementor-widget-container">
                    <div
                      aria-label="Client brand carousel"
                      className="elementor-image-carousel-wrapper influencer-brand-carousel-viewport"
                    >
                      <div className="elementor-image-carousel influencer-brand-carousel-track">
                        {marqueeLogos.map((logo, idx) => (
                          <div className="swiper-slide" key={idx}>
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

        {/* Community Strategy Cards Grid (fac51cf #seo-new) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-fac51cf elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="fac51cf"
          id="seo-new"
        >
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-e148fd8"
              data-element_type="column"
              data-id="e148fd8"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-5c849a8 elementor-widget elementor-widget-heading"
                  data-element_type="widget"
                  data-id="5c849a8"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      {whyAlternating.heading}
                    </h2>
                  </div>
                </div>

                {whyAlternating.subheading && (
                  <div
                    className="elementor-element elementor-element-e483796 elementor-widget elementor-widget-heading"
                    data-element_type="widget"
                    data-id="e483796"
                    data-widget_type="heading.default"
                  >
                    <div className="elementor-widget-container">
                      <h5 className="elementor-heading-title elementor-size-default">
                        {whyAlternating.subheading}
                      </h5>
                    </div>
                  </div>
                )}

                {whyAlternating.rows.map((row) => (
                  <section
                    className={`elementor-section elementor-inner-section elementor-element elementor-element-${row.sectionId} elementor-section-boxed elementor-section-height-default elementor-section-height-default`}
                    data-element_type="section"
                    data-id={row.sectionId}
                    key={row.sectionId}
                  >
                    <div className="elementor-container elementor-column-gap-default">
                      {row.cards.map((card) => (
                        <div
                          className={`elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-${card.colId}`}
                          data-element_type="column"
                          data-id={card.colId}
                          key={card.colId}
                        >
                          <div className="elementor-widget-wrap elementor-element-populated">
                            <div
                              className={`elementor-element elementor-element-${card.widgetId} elementor-position-top elementor-widget elementor-widget-image-box`}
                              data-element_type="widget"
                              data-id={card.widgetId}
                              data-widget_type="image-box.default"
                            >
                              <div className="elementor-widget-container">
                                <div className="elementor-image-box-wrapper">
                                  <figure className="elementor-image-box-img">
                                    <img
                                      alt={card.iconAlt}
                                      src={card.iconSrc}
                                      loading="lazy"
                                    />
                                  </figure>
                                  <div className="elementor-image-box-content">
                                    <h3 className="elementor-image-box-title">
                                      {card.title}
                                    </h3>
                                    <p className="elementor-image-box-description">
                                      {card.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Centered Editorial Overview (1c78a6e) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-1c78a6e elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="1c78a6e"
        >
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-c69715c"
              data-element_type="column"
              data-id="c69715c"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-b16e706 elementor-widget elementor-widget-heading"
                  data-element_type="widget"
                  data-id="b16e706"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      {servicesSection.heading}
                    </h2>
                  </div>
                </div>
                <div
                  className={`elementor-element elementor-element-${servicesSection.textWidgetId} elementor-widget elementor-widget-text-editor`}
                  data-element_type="widget"
                  data-id={servicesSection.textWidgetId}
                  data-widget_type="text-editor.default"
                >
                  <div className="elementor-widget-container">
                    {servicesSection.paragraphs.map((nodes, idx) => (
                      <p key={idx}>
                        <RichText nodes={nodes} />
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal Growth Partner Header (d4a63ab) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-d4a63ab elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="d4a63ab"
        >
          <div className="elementor-background-overlay" />
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-92f1710"
              data-element_type="column"
              data-id="92f1710"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-baef24c elementor-widget elementor-widget-heading"
                  data-element_type="widget"
                  data-id="baef24c"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      {growthPartnerHeader.heading}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Partner Features + Funnel Illustration (f0643c3) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-f0643c3 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="f0643c3"
        >
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-0bcc3c9"
              data-element_type="column"
              data-id="0bcc3c9"
              id="seo-new"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                {growthPartnerFeatures.items.map((item) => (
                  <div
                    className={`elementor-element elementor-element-${item.widgetId} elementor-position-left elementor-vertical-align-top elementor-widget elementor-widget-image-box`}
                    data-element_type="widget"
                    data-id={item.widgetId}
                    data-widget_type="image-box.default"
                    key={item.widgetId}
                  >
                    <div className="elementor-widget-container">
                      <div className="elementor-image-box-wrapper">
                        <figure className="elementor-image-box-img">
                          <img
                            alt={item.iconAlt}
                            src={item.iconSrc}
                            loading="lazy"
                          />
                        </figure>
                        <div className="elementor-image-box-content">
                          <h3 className="elementor-image-box-title">{item.title}</h3>
                          <p className="elementor-image-box-description">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2e7fa66"
              data-element_type="column"
              data-id="2e7fa66"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-8ca32d6 elementor-widget elementor-widget-image"
                  data-element_type="widget"
                  data-id="8ca32d6"
                  data-widget_type="image.default"
                >
                  <div className="elementor-widget-container">
                    <img
                      alt={growthPartnerFeatures.illustration.alt}
                      src={growthPartnerFeatures.illustration.src}
                      className={growthPartnerFeatures.illustration.className}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impeccable Approach 6-Card Grid (a48cf2a) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-a48cf2a elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="a48cf2a"
        >
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a6d54e6"
              data-element_type="column"
              data-id="a6d54e6"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-1cc04f2 elementor-widget elementor-widget-heading"
                  data-element_type="widget"
                  data-id="1cc04f2"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      {approachGrid.heading}
                    </h2>
                  </div>
                </div>

                {approachGrid.rows.map((row) => (
                  <section
                    className={`elementor-section elementor-inner-section elementor-element elementor-element-${row.sectionId} elementor-section-boxed elementor-section-height-default elementor-section-height-default`}
                    data-element_type="section"
                    data-id={row.sectionId}
                    key={row.sectionId}
                  >
                    <div className="elementor-container elementor-column-gap-default">
                      {row.cards.map((card) => (
                        <div
                          className={`elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-${card.colId}`}
                          data-element_type="column"
                          data-id={card.colId}
                          key={card.colId}
                        >
                          <div className="elementor-widget-wrap elementor-element-populated">
                            <div
                              className={`elementor-element elementor-element-${card.widgetId} elementor-position-top elementor-widget elementor-widget-image-box`}
                              data-element_type="widget"
                              data-id={card.widgetId}
                              data-widget_type="image-box.default"
                            >
                              <div className="elementor-widget-container">
                                <div className="elementor-image-box-wrapper">
                                  <figure className="elementor-image-box-img">
                                    <img
                                      alt={card.iconAlt}
                                      src={card.iconSrc}
                                      loading="lazy"
                                    />
                                  </figure>
                                  <div className="elementor-image-box-content">
                                    <h3 className="elementor-image-box-title">
                                      {card.title}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Interactive Calendly Section (f42381e / d91ad5b) */}
        <section
          className={`elementor-section elementor-top-section elementor-element elementor-element-${calendlySection.sectionId} elementor-section-boxed elementor-section-height-default elementor-section-height-default`}
          data-element_type="section"
          data-id={calendlySection.sectionId}
        >
          <div className="elementor-container elementor-column-gap-default">
            <div
              className={`elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-${
                isReddit ? '3f81fbd' : '6c56907'
              }`}
              data-element_type="column"
              data-id={isReddit ? '3f81fbd' : '6c56907'}
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className={`elementor-element elementor-element-${calendlySection.headingWidgetId} elementor-widget elementor-widget-heading`}
                  data-element_type="widget"
                  data-id={calendlySection.headingWidgetId}
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      {calendlySection.heading}
                    </h2>
                  </div>
                </div>

                <div
                  className={`elementor-element elementor-element-${
                    isReddit ? '5ec35b2' : 'feacd29'
                  } elementor-widget elementor-widget-html`}
                  data-element_type="widget"
                  data-id={isReddit ? '5ec35b2' : 'feacd29'}
                  data-widget_type="html.default"
                >
                  <div className="elementor-widget-container">
                    <NftCalendlyWidget
                      callTitle={calendlySection.callTitle}
                      callDescription={calendlySection.callDescription}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </NftPageShell>
  );
}
