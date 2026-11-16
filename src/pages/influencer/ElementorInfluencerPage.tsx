import { RichText } from '@/pages/crypto/components/RichText';
import {
  ElementorCallbackForm,
  ElementorFunnelForm,
} from './components/InfluencerForms';
import { ElementorBrandCarousel } from './components/InfluencerMarquee';
import { InfluencerPageShell } from './components/InfluencerPageShell';
import {
  tiktokInfluencerData,
  youtubeInfluencerData,
} from './data/elementorInfluencerData';
import type { ElementorInfluencerPageData } from './types';

const PAGE_DATA_MAP: Record<
  'tiktok-influencer-marketing' | 'youtube-influencer-services',
  ElementorInfluencerPageData
> = {
  'tiktok-influencer-marketing': tiktokInfluencerData,
  'youtube-influencer-services': youtubeInfluencerData,
};

interface ElementorInfluencerPageProps {
  slug: 'tiktok-influencer-marketing' | 'youtube-influencer-services';
}

/**
 * Shared Elementor-styled native React page for TikTok & YouTube Influencer services.
 */
export default function ElementorInfluencerPage({
  slug,
}: ElementorInfluencerPageProps) {
  const data = PAGE_DATA_MAP[slug];
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
    centerEditorial,
    growthPartnerHeader,
    growthPartnerFeatures,
    approachGrid,
  } = data;

  return (
    <InfluencerPageShell slug={slug} title={title} description={metaDesc}>
      <div className={`elementor ${elementorPageClass}`}>
        {/* Top Spacing Bar matching Elementor 6cfcffd */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-6cfcffd elementor-section-full_width elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="6cfcffd"
        >
          <div className="elementor-container elementor-column-gap-no">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-fcecc62"
              data-element_type="column"
              data-id="fcecc62"
            >
              <div className="elementor-widget-wrap elementor-element-populated" />
            </div>
          </div>
        </section>

        {/* Hero Split + Proposal Funnel Form (daed937) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-daed937 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="daed937"
        >
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
                    <h2 className="elementor-heading-title elementor-size-default">
                      {hero.heading}
                    </h2>
                  </div>
                </div>

                <div
                  className="elementor-element elementor-element-cd70503 elementor-widget elementor-widget-text-editor"
                  data-element_type="widget"
                  data-id="cd70503"
                  data-widget_type="text-editor.default"
                >
                  <div className="elementor-widget-container">
                    {hero.leadParagraphs.map((nodes, idx) => (
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
                    <div
                      className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-7ebf60d"
                      data-element_type="column"
                      data-id="7ebf60d"
                    >
                      <div className="elementor-widget-wrap elementor-element-populated">
                        <div
                          className="elementor-element elementor-element-30ac54e elementor-align-start elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
                          data-element_type="widget"
                          data-id="30ac54e"
                          data-widget_type="icon-list.default"
                        >
                          <div className="elementor-widget-container">
                            <ul className="elementor-icon-list-items">
                              {hero.leftChecks.map((check, idx) => (
                                <li className="elementor-icon-list-item" key={idx}>
                                  <span className="elementor-icon-list-icon">
                                    <i aria-hidden="true" className="fas fa-check" />
                                  </span>
                                  <span className="elementor-icon-list-text">{check}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-ebc2b37"
                      data-element_type="column"
                      data-id="ebc2b37"
                    >
                      <div className="elementor-widget-wrap elementor-element-populated">
                        <div
                          className="elementor-element elementor-element-2fbaa49 elementor-align-start elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
                          data-element_type="widget"
                          data-id="2fbaa49"
                          data-widget_type="icon-list.default"
                        >
                          <div className="elementor-widget-container">
                            <ul className="elementor-icon-list-items">
                              {hero.rightChecks.map((check, idx) => (
                                <li className="elementor-icon-list-item" key={idx}>
                                  <span className="elementor-icon-list-icon">
                                    <i aria-hidden="true" className="fas fa-check" />
                                  </span>
                                  <span className="elementor-icon-list-text">{check}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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
                            className={`elementor-element elementor-element-${stat.headingWidgetId} seo-red elementor-widget elementor-widget-heading`}
                            data-element_type="widget"
                            data-id={stat.headingWidgetId}
                            data-widget_type="heading.default"
                          >
                            <div className="elementor-widget-container">
                              <h1 className="elementor-heading-title elementor-size-default">
                                {stat.number}
                                {stat.suffix}
                              </h1>
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

        {/* 5 Minutes Call Back Bar (0c62c77) */}
        <section
          className="elementor-section elementor-top-section elementor-element elementor-element-0c62c77 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
          data-element_type="section"
          data-id="0c62c77"
        >
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
                      placeholder={callbackBar.phonePlaceholder}
                      submitLabel={callbackBar.submitLabel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Carousel Strip (b73683c) */}
        <ElementorBrandCarousel logos={brandCarousel.logos} />

        {/* Optional YouTube Alternating Editorial Section (1f71c14) */}
        {whyAlternating && (
          <section
            className={`elementor-section elementor-top-section elementor-element elementor-element-${whyAlternating.outerSectionId} elementor-section-boxed elementor-section-height-default elementor-section-height-default`}
            data-element_type="section"
            data-id={whyAlternating.outerSectionId}
          >
            <div className="elementor-container elementor-column-gap-default">
              <div
                className={`elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-${whyAlternating.innerColId}`}
                data-element_type="column"
                data-id={whyAlternating.innerColId}
              >
                <div className="elementor-widget-wrap elementor-element-populated">
                  {whyAlternating.rows.map((row) => {
                    const textColumn = (
                      <div
                        className={`elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-${
                          row.layout === 'text-left' ? row.leftColId : row.rightColId
                        }`}
                        data-element_type="column"
                        data-id={
                          row.layout === 'text-left' ? row.leftColId : row.rightColId
                        }
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div
                            className={`elementor-element elementor-element-${row.textWidgetId} elementor-widget elementor-widget-heading`}
                            data-element_type="widget"
                            data-id={row.textWidgetId}
                            data-widget_type="heading.default"
                          >
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">
                                {row.heading}
                              </h2>
                            </div>
                          </div>
                          <div className="elementor-element elementor-widget elementor-widget-text-editor">
                            <div className="elementor-widget-container">
                              <p>
                                <RichText nodes={row.body} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );

                    const imageColumn = (
                      <div
                        className={`elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-${
                          row.layout === 'text-left' ? row.rightColId : row.leftColId
                        }`}
                        data-element_type="column"
                        data-id={
                          row.layout === 'text-left' ? row.rightColId : row.leftColId
                        }
                      >
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-widget elementor-widget-image">
                            <div className="elementor-widget-container">
                              <img
                                alt={row.image.alt}
                                src={row.image.src}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );

                    return (
                      <section
                        className={`elementor-section elementor-inner-section elementor-element elementor-element-${row.sectionId} elementor-section-boxed elementor-section-height-default elementor-section-height-default`}
                        data-element_type="section"
                        data-id={row.sectionId}
                        key={row.sectionId}
                      >
                        <div className="elementor-container elementor-column-gap-default">
                          {row.layout === 'text-left' ? (
                            <>
                              {textColumn}
                              {imageColumn}
                            </>
                          ) : (
                            <>
                              {imageColumn}
                              {textColumn}
                            </>
                          )}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Services Grid Section (fac51cf #seo-new) */}
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
                      {servicesSection.heading}
                    </h2>
                  </div>
                </div>

                {servicesSection.rows.map((row) => (
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
                      {centerEditorial.heading}
                    </h2>
                  </div>
                </div>
                <div
                  className={`elementor-element elementor-element-${centerEditorial.textWidgetId} elementor-widget elementor-widget-text-editor`}
                  data-element_type="widget"
                  data-id={centerEditorial.textWidgetId}
                  data-widget_type="text-editor.default"
                >
                  <div className="elementor-widget-container">
                    {centerEditorial.paragraphs.map((nodes, idx) => (
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

        {/* Why Eon8 Is Your Ideal Growth Partner Header (d4a63ab) */}
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
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impeccable Approach 3x2 Grid (a48cf2a #seo-ne) */}
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
              id="seo-ne"
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

                {approachGrid.rows.map((row, rowIdx) => (
                  <section
                    className={`elementor-section elementor-inner-section elementor-element elementor-element-${row.sectionId} elementor-section-boxed elementor-section-height-default elementor-section-height-default`}
                    data-element_type="section"
                    data-id={row.sectionId}
                    id={rowIdx === 1 ? 'seo-padding' : undefined}
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
      </div>
    </InfluencerPageShell>
  );
}
