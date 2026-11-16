import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CryptoActionLink } from './components/CryptoActionLink';
import { CryptoCalendlySection } from './components/CryptoCalendlySection';
import { CryptoClientMarquee } from './components/CryptoClientMarquee';
import { CryptoAgencyHeroForm } from './components/CryptoForms';
import { CryptoPageShell } from './components/CryptoPageShell';
import { cryptoMarketingAgencyData } from './data/cryptoMarketingAgencyData';

interface CryptoMarketingAgencyPageProps {
  slug?: string;
}

export default function CryptoMarketingAgencyPage({
  slug = 'crypto-marketing-agency',
}: CryptoMarketingAgencyPageProps) {
  const data = cryptoMarketingAgencyData;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const featureMid = Math.ceil(data.hero.features.length / 2);
  const leftFeatures = data.hero.features.slice(0, featureMid);
  const rightFeatures = data.hero.features.slice(featureMid);

  return (
    <CryptoPageShell slug={slug} title={data.title} metaDesc={data.metaDesc}>
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container-custom">
          <div className="flex-wrap">
            <div className="left-content">
              <h1>{data.hero.heading}</h1>
              <p>{data.hero.description}</p>
              <div className="features">
                <div>
                  {leftFeatures.map((feat, idx) => (
                    <p key={idx}>✔ {feat}</p>
                  ))}
                </div>
                <div>
                  {rightFeatures.map((feat, idx) => (
                    <p key={idx}>✔ {feat}</p>
                  ))}
                </div>
              </div>
              <div className="buttons">
                {data.hero.ctas.map((cta, idx) => (
                  <CryptoActionLink action={cta} className="crypto-hero-link" key={idx} />
                ))}
              </div>
            </div>

            <div className="right-content">
              <CryptoAgencyHeroForm heading={data.hero.formHeading} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Client Slider */}
      <CryptoClientMarquee
        heading={data.clientSlider.heading}
        logos={data.clientSlider.logos}
        variant="client-slider-section"
      />

      {/* 3. Viral Section */}
      <section className="viral-section">
        <div className="floating-group left">
          {data.viralSection.leftIcons.map((src, idx) => (
            <img src={src} alt="" key={idx} loading="lazy" />
          ))}
        </div>
        <div className="content">
          {data.viralSection.eyebrow && <h4>{data.viralSection.eyebrow}</h4>}
          <h2 className="main-title">{data.viralSection.heading}</h2>
          {data.viralSection.paragraphs.map((p, idx) => (
            <p className="fade-text" key={idx}>
              {p}
            </p>
          ))}
          <div className="buttons">
            {data.viralSection.ctas.map((cta, idx) => (
              <CryptoActionLink action={cta} className="crypto-viral-link" key={idx} />
            ))}
          </div>
        </div>
        <div className="floating-group right">
          {data.viralSection.rightIcons.map((src, idx) => (
            <img src={src} alt="" key={idx} loading="lazy" />
          ))}
        </div>
      </section>

      {/* 4. Overview Section */}
      <section className="overview-section">
        <div className="overview-container">
          <div className="overview-left">
            <h2>{data.overview.heading}</h2>
            <h4>{data.overview.subheading}</h4>
          </div>
          <div className="overview-right">
            {data.overview.steps.map((step, idx) => (
              <div className="step" key={idx}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Value Section */}
      <section className="value-section">
        <div className="value-container">
          <div className="value-left">
            <h2>{data.valueSection.heading}</h2>
            <div className="chip-group">
              {data.valueSection.chips.map((chip, idx) => (
                <Link to={chip.href} key={idx}>
                  {chip.label}
                </Link>
              ))}
            </div>
            {data.valueSection.points.map((pt, idx) => (
              <p key={idx}>{pt}</p>
            ))}
          </div>
          <div className="value-right">
            <img
              src={data.valueSection.imageSrc}
              alt={data.valueSection.imageAlt}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>{data.ctaSection.heading}</h2>
          <p>{data.ctaSection.subtext}</p>
          <div className="cta-buttons">
            {data.ctaSection.ctas.map((cta, idx) => (
              <CryptoActionLink action={cta} className="crypto-cta-link" key={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Data-Driven Services */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2>{data.dataDrivenServices.heading}</h2>
            <p>{data.dataDrivenServices.intro}</p>
          </div>
          <div className="services-subtitle">
            <h3>{data.dataDrivenServices.subtitle}</h3>
          </div>
          <div className="services-grid">
            {data.dataDrivenServices.cards.map((card, idx) => (
              <div className="service-card" key={idx}>
                <img src={card.iconSrc} alt={card.iconAlt} loading="lazy" />
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Extensive Services Grid */}
      <section className="ext-services-section">
        <div className="ext-container">
          <div className="ext-header">
            <h2>{data.extensiveServices.heading}</h2>
          </div>
          <div className="ext-grid">
            {data.extensiveServices.cards.map((card, idx) => (
              <div className="ext-card" key={idx}>
                <img src={card.iconSrc} alt={card.iconAlt} loading="lazy" />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Projects Covered */}
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2>{data.projectsSection.heading}</h2>
          </div>
          <div className="projects-grid">
            {data.projectsSection.items.map((item, idx) => (
              <div className="project-item" key={idx}>
                <img src={item.iconSrc} alt={item.iconAlt} loading="lazy" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Roadmap Timeline */}
      <section className="roadmap-section">
        <div className="roadmap-container">
          <div className="roadmap-header">
            <h2>{data.roadmapSection.heading}</h2>
          </div>
          <div className="timeline">
            {data.roadmapSection.steps.map((step, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="dot" />
                <div className="content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          {data.roadmapSection.ctaHeading && (
            <div className="roadmap-cta">
              <h3>{data.roadmapSection.ctaHeading}</h3>
              {data.roadmapSection.ctaSubtext && <p>{data.roadmapSection.ctaSubtext}</p>}
              <div className="cta-buttons">
                {data.roadmapSection.ctaButtons.map((cta, idx) => (
                  <CryptoActionLink action={cta} className="crypto-roadmap-link" key={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 11. Partner Section */}
      <section className="partner-section">
        <div className="partner-container">
          <div className="partner-left">
            <h2>{data.partnerSection.heading}</h2>
            <p>{data.partnerSection.description}</p>
            <div className="partner-features">
              {data.partnerSection.features.map((feat, idx) => (
                <div className="feature" key={idx}>
                  <span className="tick">✔</span>
                  <p>{feat}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="partner-right">
            <div className="image-box">
              <img
                src={data.partnerSection.imageSrc}
                alt={data.partnerSection.imageAlt}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2>{data.faqSection.heading}</h2>
          {data.faqSection.items.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div className={`faq-item ${isOpen ? 'active' : ''}`} key={idx}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="faq-question"
                  onClick={() => setOpenFaq((prev) => (prev === idx ? null : idx))}
                >
                  {item.question}
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. Consultation Scheduler */}
      <CryptoCalendlySection
        variant="gold-agency"
        heading={data.calendlySection.heading}
        subheading={data.calendlySection.subheading}
      />
    </CryptoPageShell>
  );
}
