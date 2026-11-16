import { CryptoActionLink } from './components/CryptoActionLink';
import { CryptoServiceLeadForm } from './components/CryptoForms';
import { CryptoPageShell } from './components/CryptoPageShell';
import { ieoListingData } from './data/ieoListingData';

export default function IeoListingPage() {
  const data = ieoListingData;

  return (
    <CryptoPageShell slug={data.slug} title={data.title} metaDesc={data.metaDesc}>
      {/* 1. Hero Banner + Navy Lead Form */}
      <section className="ieo-hero-banner">
        <div className="ieo-hero-grid">
          <div>
            <h1>{data.hero.heading}</h1>
            {data.hero.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <CryptoActionLink action={data.hero.cta} className="ieo-hero-cta-btn" />
          </div>
          <div>
            <CryptoServiceLeadForm heading={data.hero.formHeading} cardVariant="ieo-navy" />
          </div>
        </div>
      </section>

      {/* 2. Why Choose IEO Over ICO? */}
      <section className="ieo-split-section">
        <div className="ieo-split-grid">
          <div>
            <h2>{data.whyIeoOverIco.heading}</h2>
            {data.whyIeoOverIco.introParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {data.whyIeoOverIco.bulletsHeading && (
              <p className="font-semibold text-slate-900 mt-4 mb-2">
                {data.whyIeoOverIco.bulletsHeading}
              </p>
            )}
            <ul className="ieo-check-list">
              {data.whyIeoOverIco.bullets.map((b, idx) => (
                <li key={idx}>
                  <span aria-hidden="true">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {data.whyIeoOverIco.closingParagraph && <p>{data.whyIeoOverIco.closingParagraph}</p>}
          </div>
          <div>
            <img
              src={data.whyIeoOverIco.imageSrc}
              alt={data.whyIeoOverIco.imageAlt}
              className="ieo-split-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 3. Our IEO Listing Services */}
      <section className="ieo-services-white">
        <div className="container">
          <div className="ieo-head">
            <h2>
              {data.servicesSection.headingPrefix} <span>{data.servicesSection.headingAccent}</span>
            </h2>
            <p>{data.servicesSection.subtitle}</p>
          </div>
          <div className="ieo-grid">
            {data.servicesSection.cards.map((card, idx) => (
              <div className="ieo-card" key={idx}>
                <div className="number">{card.number}</div>
                <h3>{card.title}</h3>
                {card.text && <p>{card.text}</p>}
                {card.bullets && card.bullets.length > 0 && (
                  <ul>
                    {card.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Benefits of Our IEO Listing Services */}
      <section className="ieo-split-section ieo-blue-band">
        <div className="ieo-split-grid">
          <div>
            <h2>{data.benefitsSection.heading}</h2>
            {data.benefitsSection.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <ul className="ieo-check-list">
              {data.benefitsSection.bullets.map((b, idx) => (
                <li key={idx}>
                  <span aria-hidden="true">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {data.benefitsSection.closingParagraph && (
              <p>{data.benefitsSection.closingParagraph}</p>
            )}
          </div>
          <div>
            <img
              src={data.benefitsSection.imageSrc}
              alt={data.benefitsSection.imageAlt}
              className="ieo-split-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. Who Should Use IEO Listing Services? */}
      <section className="ieo-split-section">
        <div className="ieo-split-grid">
          <div>
            <h2>{data.whoShouldUse.heading}</h2>
            {data.whoShouldUse.intro && <p>{data.whoShouldUse.intro}</p>}
            <ul className="ieo-check-list">
              {data.whoShouldUse.bullets.map((b, idx) => (
                <li key={idx}>
                  <span aria-hidden="true">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {data.whoShouldUse.closing && <p>{data.whoShouldUse.closing}</p>}
          </div>
          <div>
            <img
              src={data.whoShouldUse.imageSrc}
              alt={data.whoShouldUse.imageAlt}
              className="ieo-split-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 6. Our Proven Process */}
      <section className="ieo-process-flow">
        <div className="container">
          <div className="process-head">
            <h2>
              {data.processSection.headingPrefix} <span>{data.processSection.headingAccent}</span>
            </h2>
            <p>{data.processSection.subtitle}</p>
          </div>
          <div className="process-timeline">
            <div className="center-line" />
            {data.processSection.steps.map((step, idx) => (
              <div className={`process-step ${step.align}`} key={idx}>
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why EON8 for IEO Listing Services? */}
      <section className="ieo-split-section ieo-blue-band">
        <div className="ieo-split-grid">
          <div>
            <h2>{data.whyEon8Section.heading}</h2>
            {data.whyEon8Section.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <ul className="ieo-check-list">
              {data.whyEon8Section.bullets.map((b, idx) => (
                <li key={idx}>
                  <span aria-hidden="true">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {data.whyEon8Section.closing && <p>{data.whyEon8Section.closing}</p>}
          </div>
          <div>
            <img
              src={data.whyEon8Section.imageSrc}
              alt={data.whyEon8Section.imageAlt}
              className="ieo-split-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 8. Final CTA Band */}
      <section className="ieo-cta-white">
        <div className="container">
          <div className="cta-glow" />
          <div className="cta-content">
            <span className="mini-tag">{data.finalCta.tag}</span>
            <h2>
              {data.finalCta.headingPrefix} <span>{data.finalCta.headingAccent}</span>
            </h2>
            {data.finalCta.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {data.finalCta.smallText && <p className="small-text">{data.finalCta.smallText}</p>}
            <div className="cta-buttons">
              <CryptoActionLink action={data.finalCta.primaryCta} className="primary-btn" />
              <CryptoActionLink action={data.finalCta.secondaryCta} className="secondary-btn" />
            </div>
          </div>
        </div>
      </section>
    </CryptoPageShell>
  );
}
