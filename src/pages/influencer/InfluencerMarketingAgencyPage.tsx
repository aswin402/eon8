import { HeadingLines, RichText } from '@/pages/crypto/components/RichText';
import { InfluencerFaqAccordion } from './components/InfluencerFaqAccordion';
import { InfluencerQuoteForm } from './components/InfluencerForms';
import { InfluencerClientMarquee } from './components/InfluencerMarquee';
import { InfluencerPageShell } from './components/InfluencerPageShell';
import { influencerAgencyData } from './data/influencerAgencyData';
import type { RichNode } from './types';

function renderParagraphs(paragraphs: RichNode[][], pClassName?: string) {
  return paragraphs.map((nodes, idx) => (
    <p className={pClassName} key={idx}>
      <RichText nodes={nodes} />
    </p>
  ));
}

/**
 * Native React clone of /influencer-marketing-agency.
 */
export default function InfluencerMarketingAgencyPage() {
  const {
    slug,
    title,
    metaDesc,
    hero,
    introSection,
    counters,
    clientSliderHeading,
    clientLogos,
    whyEssential,
    services,
    categories,
    advantages,
    roadmap,
    influencerValue,
    solutions,
    faq,
    enquiry,
  } = influencerAgencyData;

  return (
    <InfluencerPageShell slug={slug} title={title} description={metaDesc}>
      {/* Section 0: Hero Banner */}
      <section className="banner_inr banner-inr-digital">
        <div className="container" style={{ marginTop: '-60px' }}>
          <div className="row">
            <div className="col-md-6">
              <div className="ba_inr_cnt">
                <h1 className="reveal">
                  <HeadingLines lines={hero.headingLines} />
                </h1>
                {renderParagraphs(hero.paragraphs, 'reveal')}
                <div className="row list-nft">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    {hero.bulletColumns.map((col, colIdx) => (
                      <div className="col-md-6 col-sm-6 col-xs-12" key={colIdx}>
                        <ul>
                          {col.map((item, idx) => (
                            <li key={idx}>
                              <i aria-hidden="true" className="fa fa-check-circle" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="nft-eon-btn">
                  <a className="btn-one" href={hero.ctaHref}>
                    {hero.ctaLabel}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ba_inr_img">
                <img
                  alt={hero.image.alt}
                  className={hero.image.className || 'img-fluid'}
                  src={hero.image.src}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Agency Intro */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h2 className="reveal reveal-up">
                  <span className="to">{introSection.heading}</span>
                </h2>
                {renderParagraphs(introSection.paragraphs, 'reveal')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Project Counters */}
      <section className="bg-white box text-center non-pading" id="our-projects">
        <div className="container">
          <div className="row reveal">
            {counters.map((counter, idx) => (
              <div className="col-md-4" key={idx}>
                <h1
                  className={`${counter.removePlus ? 'remove ' : ''}${
                    counter.isRed ? 'red ' : ''
                  }count-digit`.trim()}
                >
                  {counter.value}
                </h1>
                <p>{counter.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Client Logo Marquee */}
      <InfluencerClientMarquee heading={clientSliderHeading} logos={clientLogos} />

      {/* Section 4: Why Essential */}
      <section className="common-spc abt_desc_inr yellow_shad">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h2 className="reveal reveal-up">
                  <span className="to">{whyEssential.heading}</span>
                </h2>
              </div>
              <div className="desc_cnt text-center">
                {renderParagraphs(whyEssential.paragraphs, 'reveal')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 9 Influencer Marketing Services */}
      <section className="spectaular">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h3 className="reveal">
                  <span className="to">{services.heading}</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="row our_media_row">
            {services.items.map((item, idx) => (
              <div className="col-md-6 col-lg-4 col-sm-12 reveal" key={idx}>
                <div className="h-100">
                  <div className="item text-center mb-md30" id="mni-hght">
                    <div className="type">
                      <span className={item.iconSpanClass}>
                        <img
                          alt={item.iconAlt}
                          className="type-trust"
                          src={item.iconSrc}
                          loading="lazy"
                        />
                      </span>
                      <h4 className={item.titleClass}>{item.title}</h4>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: 12 Influencer Marketing Categories */}
      <section className="yellow_shad">
        <div className="container text-center pb-5">
          <div className="row">
            <div className="col-md-12">
              <h2 className="reveal">
                <span className="to">{categories.heading}</span>
              </h2>
            </div>
            {categories.items.map((cat, idx) => (
              <div className="col-md-3 icon-section reveal" key={idx}>
                <img alt={cat.iconAlt} src={cat.iconSrc} loading="lazy" />
                <h5>{cat.label}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Advantages 3x2 Grid */}
      <section className="zxqv-influencer-wrap">
        <div className="zxqv-container">
          <h2 className="zxqv-title reveal">
            <span className="to">{advantages.heading}</span>
          </h2>
          <div className="zxqv-grid">
            {advantages.items.map((adv, idx) => (
              <div className="zxqv-card-box" key={idx}>
                <h3>{adv.title}</h3>
                <p>{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Roadmap Timeline */}
      <section className="common-spc abt_desc_inr ourspecificSector">
        <div className="container-fluid">
          <div className="section-title text-center underline">
            <div className="sec_tit">
              <h2 className="reveal">
                <span className="to">{roadmap.heading}</span>
              </h2>
            </div>
          </div>
          <ul className="timeline">
            {roadmap.steps.map((step, idx) => (
              <li className={step.inverted ? 'timeline-inverted' : undefined} key={idx}>
                <div className="timeline-image">
                  <img
                    alt={step.iconAlt}
                    className="rounded-circle img-fluid"
                    src={step.iconSrc}
                    loading="lazy"
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="subheading">{step.title}</h3>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <div className="nft-eon-btn">
              <a className="btn-one" href={roadmap.ctaHref}>
                {roadmap.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9a: What Influencers Can Do For Your Business (Desktop) */}
      <section className="yellow_shad" id="mobile-hide">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="reveal">
                <span className="to">{influencerValue.heading}</span>
              </h2>
            </div>
            <div className="col-md-12 pb-5">
              <div className="story-content">
                {influencerValue.desktopCards.map((card, idx) => (
                  <div className="story-description" key={idx}>
                    <img alt={card.iconAlt} src={card.iconSrc} loading="lazy" />
                    <h4>{card.title}</h4>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9b: What Influencers Can Do For Your Business (Mobile/Tablet) */}
      <section className="yellow_shad" id="desktop-hide" style={{ marginBottom: '20px' }}>
        <div className="container" style={{ marginBottom: '20px' }}>
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="reveal">
                <span className="to">{influencerValue.heading}</span>
              </h2>
            </div>
            {influencerValue.mobileCards.map((card, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="story-mobile-description">
                  <img alt={card.iconAlt} src={card.iconSrc} loading="lazy" />
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: On-Demand Solutions Split */}
      <section className="common-spc abt_desc_inr">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="sec_tit">
                <h4 className="reveal">
                  <HeadingLines lines={solutions.headingLines} />
                </h4>
              </div>
              <div className="desc_cnt">
                {renderParagraphs(solutions.paragraphs)}
              </div>
              <div className="row list-nft">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  {solutions.bulletColumns.map((col, colIdx) => (
                    <div className="col-md-6 col-sm-6 col-xs-12" key={colIdx}>
                      <ul>
                        {col.map((item, idx) => (
                          <li key={idx}>
                            <i aria-hidden="true" className="fa fa-check-circle" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="desc_img">
                <img
                  alt={solutions.image.alt}
                  className={solutions.image.className || 'img-fluid'}
                  src={solutions.image.src}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: FAQ Accordion */}
      <InfluencerFaqAccordion
        variant="faq"
        heading={faq.heading}
        items={faq.items}
      />

      {/* Section 12: Enquiry Quote Form */}
      <section className="pb-70 contact-nft" id="enquiry">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <img
                alt={enquiry.image.alt}
                className={enquiry.image.className || 'img-fluid'}
                src={enquiry.image.src}
                loading="lazy"
              />
            </div>
            <div className="col-md-6 col-xs-12">
              <InfluencerQuoteForm
                heading={enquiry.formHeading}
                submitLabel={enquiry.submitLabel}
              />
            </div>
          </div>
        </div>
      </section>
    </InfluencerPageShell>
  );
}
