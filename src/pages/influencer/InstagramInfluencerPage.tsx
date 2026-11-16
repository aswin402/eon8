import { Fragment } from 'react';
import { HeadingLines, RichText } from '@/pages/crypto/components/RichText';
import { InfluencerQuoteForm } from './components/InfluencerForms';
import { InfluencerClientMarquee } from './components/InfluencerMarquee';
import { InfluencerPageShell } from './components/InfluencerPageShell';
import { instagramInfluencerData } from './data/instagramInfluencerData';
import type { RichNode } from './types';

function renderParagraphs(paragraphs: RichNode[][], pClassName?: string) {
  return paragraphs.map((nodes, idx) => (
    <p className={pClassName} key={idx}>
      <RichText nodes={nodes} />
    </p>
  ));
}

function renderBrandsHeading(text: string) {
  const parts = text.split('\n');
  return parts.map((part, idx) => (
    <Fragment key={idx}>
      {idx > 0 && <br />}
      {part}
    </Fragment>
  ));
}

/**
 * Native React clone of /instagram-influencer-marketing-agency.
 */
export default function InstagramInfluencerPage() {
  const {
    slug,
    title,
    metaDesc,
    hero,
    journeyCounters,
    clientSliderHeading,
    clientLogos,
    reelsSection,
    whyPartner,
    campaignResults,
    growSection,
    services,
    fixedSchedule,
    solutions,
    enquiry,
  } = instagramInfluencerData;

  return (
    <InfluencerPageShell slug={slug} title={title} description={metaDesc}>
      {/* Section 0: Hero Banner */}
      <section className="banner_inr banner-inr-digital">
        <div className="container">
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
                {hero.brandsHeading && (
                  <h4 className="text-white">{renderBrandsHeading(hero.brandsHeading)}</h4>
                )}
                <div className="bannft-btn">
                  <a className="nft-eon-btn mt-0" href={hero.ctaHref}>
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

      {/* Section 1: Our Journey So Far Counters */}
      <section className="bg-white box text-center" id="our-projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h2 className="reveal reveal-up">
                  <span className="to">{journeyCounters.heading}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row reveal">
            {journeyCounters.items.map((counter, idx) => (
              <div className="col-md-3" key={idx}>
                <h1 className={`${counter.isRed ? 'red ' : ''}count-digit`.trim()}>
                  {counter.value}
                </h1>
                <p>{counter.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Client Marquee */}
      <InfluencerClientMarquee heading={clientSliderHeading} logos={clientLogos} />

      {/* Section 3: Instagram Reels Video Split */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6 vertical-middle">
              <h2>{reelsSection.heading}</h2>
              {renderParagraphs(reelsSection.paragraphs)}
            </div>
            <div className="col-md-6">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                width={reelsSection.videoWidth}
              >
                <source src={reelsSection.videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Partner */}
      <section className="common-spc abt_desc_inr yellow_shad">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h2 className="reveal reveal-up">
                  <span className="to">{whyPartner.heading}</span>
                </h2>
              </div>
              <div className="desc_cnt text-center">
                {renderParagraphs(whyPartner.paragraphs, 'reveal')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Campaign Results Cards */}
      <section className="spectaular our_serv_inr">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h3 className="reveal">
                  <span className="to">{campaignResults.heading}</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="our_social_four">
              {campaignResults.items.map((card, idx) => (
                <div className="col-lg-4 col-md-4 col-sm-12" key={idx}>
                  <div className="feature-card border-outer hoshd">
                    <div className="iconpart">
                      <div className="card-icon-section card-icon-section-2">
                        <img alt={card.brandLogo.alt} src={card.brandLogo.src} loading="lazy" />
                      </div>
                      {card.metrics.map((metric, mIdx) => (
                        <div className="col-xs-6 section-card-icon" key={mIdx}>
                          <img alt={metric.iconAlt} src={metric.iconSrc} loading="lazy" />
                          <p>
                            <b>{metric.strongText}</b>
                            <br />
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Grow With Influencer Marketing */}
      <section className="common-spc abt_desc_inr">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h2 className="reveal reveal-up">
                  <span className="to">{growSection.heading}</span>
                </h2>
              </div>
              <div className="desc_cnt text-center">
                {renderParagraphs(growSection.paragraphs, 'reveal')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: 6 Instagram Services */}
      <section className="spectaular yellow_shad">
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

      {/* Section 8: Fixed Schedule Meeting Bar */}
      <section className="fixed-schedule">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <a
                href={fixedSchedule.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fixedSchedule.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Solutions Split */}
      <section className="common-spc abt_desc_inr">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="sec_tit">
                <h4 className="reveal">
                  <HeadingLines lines={solutions.headingLines} />
                </h4>
              </div>
              <div className="desc_cnt">{renderParagraphs(solutions.paragraphs)}</div>
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

      {/* Section 10: Enquiry Quote Form */}
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
