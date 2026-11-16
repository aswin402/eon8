import { CryptoCalendlySection } from '@/pages/crypto/components/CryptoCalendlySection';
import { CryptoDisclaimerSection } from '@/pages/crypto/components/CryptoDisclaimerSection';
import { HeadingLines, RichText } from '@/pages/crypto/components/RichText';
import { InfluencerFaqAccordion } from './components/InfluencerFaqAccordion';
import { TwitterLeadForm } from './components/InfluencerForms';
import { InfluencerPageShell } from './components/InfluencerPageShell';
import { twitterInfluencerData } from './data/twitterInfluencerData';

/**
 * Native React clone of /twitter-influencer-marketing.
 */
export default function TwitterInfluencerPage() {
  const {
    slug,
    title,
    metaDesc,
    hero,
    benefitsSection,
    boostSplit,
    specializedCards,
    calibratedFeatures,
    ctaBanner,
    processGrid,
    scaleSplit,
    faq,
    calendly,
    bottomEnquiry,
    disclaimer,
  } = twitterInfluencerData;

  return (
    <InfluencerPageShell slug={slug} title={title} description={metaDesc}>
      {/* Section 0: Hero Banner + Lead Form */}
      <section className="banner_inr banner-inr-digital" id="enquiry-top">
        <div className="container">
          <div className="col-md-6">
            <div className="ba_inr_cnt">
              <h1 className="reveal">
                <HeadingLines lines={hero.headingLines} />
              </h1>
              <p className="reveal">{hero.subheading}</p>
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
              <div className="bannft-btn">
                {hero.ctas.map((cta, idx) => (
                  <a
                    key={idx}
                    className={idx === 0 ? 'nft-eon-btn mt-0 mr-4' : 'nft-eon-btn'}
                    href={cta.href}
                    target={cta.isExternal ? '_blank' : undefined}
                    rel={cta.isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {cta.label}{' '}
                    {cta.iconClass && <i aria-hidden="true" className={cta.iconClass} />}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <TwitterLeadForm
              id="hero-twitter-form"
              heading={hero.formHeading}
              submitLabel={hero.formSubmitLabel}
            />
          </div>
        </div>
      </section>

      {/* Section 1: Benefits Cards (.qx9d-section) */}
      <section className="qx9d-section">
        <div className="qx9d-container">
          <h2 className="qx9d-title reveal">
            <span className="to">{benefitsSection.heading}</span>
          </h2>
          <div className="qx9d-grid">
            {benefitsSection.items.map((item, idx) => (
              <div className="qx9d-card" key={idx}>
                <div className="qx9d-icon">
                  <i aria-hidden="true" className={item.iconClass} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Boost Your Social Presence Split */}
      <section className="spectaular nft-light-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="sec_tit">
                <h2 className="reveal">
                  <HeadingLines lines={boostSplit.headingLines} />
                </h2>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 text-center img-border">
              <img
                alt={boostSplit.image.alt}
                className={boostSplit.image.className || 'discord-img'}
                src={boostSplit.image.src}
                loading="lazy"
              />
            </div>
            <div className="desc_cnt col-md-6" style={{ alignItems: 'center' }}>
              <p>
                <RichText nodes={boostSplit.intro} />
              </p>
              <ul className="dis-list">
                {boostSplit.bullets.map((bullet, idx) => (
                  <li key={idx}>
                    <b>{bullet.title}</b> - {bullet.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Disruptive Twitter Influencer Marketing Services */}
      <section className="common-spc our_specialized">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h2 className="reveal">
                  <HeadingLines lines={specializedCards.headingLines} />
                </h2>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            {specializedCards.cards.map((card, idx) => (
              <div className="col-md-4 mb-3" key={idx}>
                <div className="parag">
                  <div className="headinghub">
                    <img alt={card.iconAlt} src={card.iconSrc} loading="lazy" />
                  </div>
                  <h2>{card.title}</h2>
                  <div className="serv_descparag">
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Perfectly Calibrated Features Grid */}
      <section className="our_serv_inr nft-light-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h2 className="reveal">
                  <HeadingLines lines={calibratedFeatures.headingLines} />
                </h2>
                {calibratedFeatures.subheading && (
                  <p className="reveal">{calibratedFeatures.subheading}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            {calibratedFeatures.items.map((item, idx) => (
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={idx}>
                <div className="feature-items equal-height">
                  <img
                    alt={item.iconAlt}
                    className="child"
                    src={item.iconSrc}
                    loading="lazy"
                  />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Mid-Page CTA Banner */}
      <section className="nft-cta-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-5" />
            <div className="col-md-12 col-lg-7">
              <div id="submitProp">
                <div className="form-heading">
                  <h3>
                    <span className="big-font text-white">{ctaBanner.headingText}</span>
                    <br />
                    <span className="paragraph text-white">{ctaBanner.subtext}</span>
                  </h3>
                </div>
                <div className="center call-btn mobile-center">
                  <a className="nft-eon-btn" href={ctaBanner.buttonHref}>
                    {ctaBanner.buttonLabel}{' '}
                    <i aria-hidden="true" className="fa-regular fa-calendar-check" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Tailored Twitter Influencer Process Grid */}
      <section className="spectaular nft-light-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit media-influ text-center">
                <h2 className="reveal">
                  <HeadingLines lines={processGrid.headingLines} />
                </h2>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            {processGrid.items.map((item, idx) => (
              <div className="col-md-3 col-sm-6 mb-4" key={idx}>
                <div className="item text-center mb-md30" id="mni-hght">
                  <div className="headinghub">
                    <img alt={item.iconAlt} src={item.iconSrc} loading="lazy" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Scale The Social Realm Split */}
      <section className="common-spc abt_desc_inr">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-6 col-sm-12">
              <div className="sec_tit">
                <h2>
                  <HeadingLines lines={scaleSplit.headingLines} spanClassName="" />
                </h2>
              </div>
              <div className="desc_cnt">
                {scaleSplit.paragraphs.map((nodes, idx) => (
                  <p key={idx}>
                    <RichText nodes={nodes} />
                  </p>
                ))}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-sm-12">
              <div className="desc_img text-center">
                <img
                  alt={scaleSplit.image.alt}
                  src={scaleSplit.image.src}
                  style={{ width: '84%' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: FAQ Accordion */}
      <InfluencerFaqAccordion
        variant="panel-nft"
        heading={faq.heading}
        items={faq.items}
      />

      {/* Section 9: Interactive Calendly Booking */}
      <CryptoCalendlySection
        variant="light"
        heading={calendly.heading}
        subheading={calendly.subheading}
        callTitle={calendly.callTitle}
        callDescription={calendly.callDescription}
      />

      {/* Section 10: Bottom Gradient Enquiry + Stats */}
      <section className="pb-70 gradient-nft" id="enquiry">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h1 className="text-white">
                {bottomEnquiry.headingLines.map((line, idx) => (
                  <span key={idx}>
                    {idx > 0 ? ' ' : ''}
                    {line}
                  </span>
                ))}
              </h1>
              <p className="text-white">
                <RichText nodes={bottomEnquiry.description} />
              </p>
              <div className="footer-number text-white">
                {bottomEnquiry.stats.map((stat, idx) => (
                  <div className="footer-number-inner" key={idx}>
                    <h2 className="count">{stat.value}</h2>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <TwitterLeadForm
                id="enquiry-twitter-form"
                heading={bottomEnquiry.formHeading}
                submitLabel={bottomEnquiry.formSubmitLabel}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Disclaimer */}
      <CryptoDisclaimerSection text={disclaimer} />
    </InfluencerPageShell>
  );
}
