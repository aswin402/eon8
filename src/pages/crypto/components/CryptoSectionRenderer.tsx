import { Fragment } from 'react';
import type { CryptoSectionBlock } from '../types';
import { CryptoActionLink } from './CryptoActionLink';
import { CryptoCalendlySection } from './CryptoCalendlySection';
import { CryptoFaqAccordion } from './CryptoFaqAccordion';
import { HeadingLines, RichText } from './RichText';

interface CryptoSectionRendererProps {
  section: CryptoSectionBlock;
}

export function CryptoSectionRenderer({ section }: CryptoSectionRendererProps) {
  switch (section.type) {
    case 'viral':
      return (
        <section
          className="text-white custom-padding viral nft-dark-bg"
          style={section.background ? { background: section.background } : undefined}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 viral-left">
                {section.leftImages.map((src, idx) => (
                  <img
                    alt=""
                    className={`img-fluid img-${idx + 1} floating`}
                    src={src}
                    key={idx}
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="col-md-8 text-center viral-inner">
                <h2 className="reveal reveal-up">
                  <span className="to">{section.heading}</span>
                </h2>
                {section.paragraphs.map((nodes, idx) => (
                  <p className="p-3 text-dark reveal" style={{ color: '#000' }} key={idx}>
                    <RichText nodes={nodes} />
                  </p>
                ))}
                {section.ctas.length > 0 && (
                  <div className="cta-buttons">
                    {section.ctas.map((cta, idx) => (
                      <CryptoActionLink action={cta} key={idx} />
                    ))}
                  </div>
                )}
              </div>
              <div className="col-md-2 viral-right">
                {section.rightImages.map((src, idx) => (
                  <img
                    alt=""
                    className={`img-fluid img-${idx + 1} floating`}
                    src={src}
                    key={idx}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 'gold-intro':
      return (
        <section className="gold-bg-section">
          <div className="gold-container">
            <div className="gold-content text-center reveal">
              <h2 className="reveal">
                <HeadingLines lines={section.headingLines} />
              </h2>
              {section.paragraphs.map((nodes, idx) => (
                <p key={idx}>
                  <RichText nodes={nodes} />
                </p>
              ))}
              {section.cta && <CryptoActionLink action={section.cta} />}
            </div>
          </div>
        </section>
      );

    case 'dark-intro-split':
      return (
        <section className="section-wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12 col-lg-6">
                <div className="content-box">
                  <h2 className="reveal">
                    <span className="to">{section.heading}</span>
                  </h2>
                  {section.paragraphs.map((nodes, idx) => (
                    <p className="reveal" key={idx}>
                      <RichText nodes={nodes} />
                    </p>
                  ))}
                  {section.cta && <CryptoActionLink action={section.cta} />}
                </div>
              </div>
              <div className="col-md-12 col-lg-6 text-center">
                {section.imageSrc && (
                  <img
                    src={section.imageSrc}
                    alt={section.imageAlt}
                    className="img-fluid rounded"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'card-grid': {
      const renderCards = () =>
        section.cards.map((card, idx) => {
          const innerCard = (
            <div className={section.cardClass}>
              {(card.iconImg || card.svgPath) && (
                <div className={section.iconWrapClass || 'icon-wrap'}>
                  {card.svgPath ? (
                    <svg viewBox={card.svgViewBox || '0 0 24 24'}>
                      <path d={card.svgPath} />
                    </svg>
                  ) : (
                    <img
                      src={card.iconImg}
                      alt={card.iconAlt || card.title}
                      style={card.iconImgWidth ? { width: `${card.iconImgWidth}px` } : undefined}
                      loading="lazy"
                    />
                  )}
                </div>
              )}
              {card.title && <h3>{card.title}</h3>}
              {card.metricHeading && <h4>{card.metricHeading}</h4>}
              {card.paragraphs.map((nodes, pIdx) => (
                <p key={pIdx}>
                  <RichText nodes={nodes} />
                </p>
              ))}
              {card.bullets.length > 0 && (
                <ul>
                  {card.bullets.map((b, bIdx) => (
                    <li key={bIdx}>
                      <RichText nodes={b} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          if (section.cardOuterClass?.includes('pr-card-wrapper')) {
            return (
              <div className={section.cardOuterClass} key={idx}>
                <div className="pr-card-outer">{innerCard}</div>
              </div>
            );
          }

          return section.cardOuterClass ? (
            <div className={section.cardOuterClass} key={idx}>
              {innerCard}
            </div>
          ) : (
            <Fragment key={idx}>{innerCard}</Fragment>
          );
        });

      const headerBlock = (
        <div className={section.headerClass}>
          <h2 className="reveal reveal-up">
            <HeadingLines lines={section.headingLines} />
          </h2>
          {section.subheading && <p className="reveal">{section.subheading}</p>}
        </div>
      );

      // Variant without grid wrapper inside container (e.g. .pr-row contains header + cards)
      if (!section.gridClass) {
        return (
          <section className={section.variantClass}>
            <div className={section.containerClass}>
              <div className="pr-row">
                {headerBlock}
                {renderCards()}
              </div>
            </div>
          </section>
        );
      }

      // Variant without container wrapper (e.g. .ci-section / .cm-section / .cv-section)
      if (!section.containerClass) {
        return (
          <section className={section.variantClass}>
            {headerBlock}
            <div className={section.gridClass}>{renderCards()}</div>
          </section>
        );
      }

      return (
        <section className={section.variantClass}>
          <div className={section.containerClass}>
            {headerBlock}
            <div className={section.gridClass}>{renderCards()}</div>
            {section.footerNote && <p className="text-center mt-4">{section.footerNote}</p>}
            {section.footerCta && (
              <div className="text-center mt-4">
                <CryptoActionLink action={section.footerCta} />
              </div>
            )}
          </div>
        </section>
      );
    }

    case 'cta-band':
      return (
        <section className={section.variant}>
          <div className="container">
            <div className="row">
              {section.variant === 'nft-cta-2' && <div className="col-lg-5" />}
              <div className="col-md-12 col-lg-7">
                <div id="submitProp">
                  <div className="form-heading">
                    <h3 className="reveal">
                      <HeadingLines lines={section.headingLines} spanClassName="big-font text-white to" />
                      {section.subtext && (
                        <>
                          <br />
                          <span className="paragraph text-white">{section.subtext}</span>
                        </>
                      )}
                    </h3>
                  </div>
                  <div className="center call-btn mobile-center">
                    <div className="cta-buttons">
                      {section.ctas.map((cta, idx) => (
                        <CryptoActionLink action={cta} key={idx} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'specialized-3col':
      return (
        <section className="common-spc our_specialized">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="sec_tit text-center">
                  <h2 className="reveal reveal-up">
                    <HeadingLines lines={section.headingLines} />
                  </h2>
                </div>
              </div>
            </div>
            <br />
            <div className="row reveal">
              {section.columns.map((col, idx) => (
                <div className="col-md-4 mb-3" key={idx}>
                  <div className="parag">
                    {col.iconImg && (
                      <div className="headinghub">
                        <img
                          src={col.iconImg}
                          alt={col.iconAlt || col.title}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h2>{col.title}</h2>
                    <div className="serv_descparag">
                      {col.paragraphs.map((nodes, pIdx) => (
                        <p key={pIdx}>
                          <RichText nodes={nodes} />
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'service-4col':
      return (
        <section className={section.sectionClass || 'our_serv_inr nft-light-bg'}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="sec_tit text-center">
                  <h2 className="reveal">
                    <HeadingLines lines={section.headingLines} />
                  </h2>
                </div>
                {section.introParagraphs.map((nodes, idx) => (
                  <p className="text-center reveal" key={idx}>
                    <RichText nodes={nodes} />
                  </p>
                ))}
              </div>
            </div>
            <div className="row">
              {section.items.map((item, idx) => (
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 reveal" key={idx}>
                  <div className="feature-items equal-height">
                    {item.iconImg && (
                      <img
                        className="child"
                        src={item.iconImg}
                        alt={item.iconAlt || item.title}
                        loading="lazy"
                      />
                    )}
                    <h3>{item.title}</h3>
                    {item.paragraphs.map((nodes, pIdx) => (
                      <p key={pIdx}>
                        <RichText nodes={nodes} />
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'split-feature': {
      const contentEl = (
        <div className={section.contentColClass || 'sky-ido-content'}>
          <h2 className="reveal">
            <HeadingLines lines={section.headingLines} />
          </h2>
          {section.paragraphs.map((nodes, idx) => (
            <p className="reveal" key={idx}>
              <RichText nodes={nodes} />
            </p>
          ))}
          {section.listHeading && <h4>{section.listHeading}</h4>}
          {section.listItems.length > 0 && (
            <ul className={section.listClass || 'reveal'}>
              {section.listItems.map((li, idx) => (
                <li key={idx}>
                  <RichText nodes={li} />
                </li>
              ))}
            </ul>
          )}
          {section.cta && <CryptoActionLink action={section.cta} />}
        </div>
      );

      const imageEl = (
        <div className={section.imageColClass || 'sky-ido-image'}>
          {section.imageSrc && (
            <img
              src={section.imageSrc}
              alt={section.imageAlt}
              className="img-fluid"
              loading="lazy"
            />
          )}
        </div>
      );

      // Bootstrap .abt_desc_inr / .spectaular split structure vs CSS grid structure
      if (section.containerClass === 'container') {
        const isSpectacular = section.sectionClass.includes('spectaular');
        return (
          <section className={section.sectionClass}>
            <div className="container">
              {isSpectacular ? (
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="sec_tit">
                      <h2 className="reveal">
                        <HeadingLines lines={section.headingLines} />
                      </h2>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 text-center img-border reveal">
                    <img
                      src={section.imageSrc}
                      alt={section.imageAlt}
                      style={{ width: '360px', maxWidth: '100%' }}
                      loading="lazy"
                    />
                  </div>
                  <div className="desc_cnt col-md-6">
                    {section.paragraphs.map((nodes, idx) => (
                      <p className="reveal" key={idx}>
                        <RichText nodes={nodes} />
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-md-12 col-lg-6 col-sm-12">
                    <div className="sec_tit">
                      <h2 className="reveal reveal-up">
                        <HeadingLines lines={section.headingLines} />
                      </h2>
                    </div>
                    <div className="desc_cnt">
                      {section.paragraphs.map((nodes, idx) => (
                        <p className="reveal" key={idx}>
                          <RichText nodes={nodes} />
                        </p>
                      ))}
                      {section.listItems.length > 0 && (
                        <ul className={section.listClass || 'list-unstyled'}>
                          {section.listItems.map((li, idx) => (
                            <li key={idx}>
                              <RichText nodes={li} />
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.cta && <CryptoActionLink action={section.cta} />}
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6 text-center">
                    {section.imageSrc && (
                      <img
                        src={section.imageSrc}
                        alt={section.imageAlt}
                        className="img-fluid"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      }

      return (
        <section className={section.sectionClass}>
          <div className={section.containerClass}>
            <div className={section.gridClass}>
              {section.reverseCols ? (
                <>
                  {imageEl}
                  {contentEl}
                </>
              ) : (
                <>
                  {contentEl}
                  {imageEl}
                </>
              )}
            </div>
          </div>
        </section>
      );
    }

    case 'kol-network':
      return (
        <section className="kol-network-section">
          <div className="kol-container">
            <div className="kol-header text-center">
              <h2 className="kol-title reveal reveal-up">
                <span className="to">{section.heading}</span>
              </h2>
              <p className="kol-subtitle reveal">{section.subheading}</p>
            </div>
            <div className="kol-grid">
              {section.groups.map((grp, idx) => (
                <div className="kol-card" key={idx}>
                  <h3 className="kol-card-title">{grp.title}</h3>
                  <ul className="kol-list">
                    {grp.items.map((item, iIdx) => (
                      <li key={iIdx}>
                        <RichText nodes={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'comparison-table':
      return (
        <section className="kol-table-section py-12 px-4">
          <div className="kol-table-wrap text-center">
            {section.heading && (
              <h2 className="reveal reveal-up mb-3 text-3xl font-bold text-slate-900">
                <span className="to">{section.heading}</span>
              </h2>
            )}
            {section.intro && (
              <p className="reveal mb-6 text-slate-600">{section.intro}</p>
            )}
            <table className="kol-advantage-table text-left">
              <thead>
                <tr>
                  {section.headers.map((h, idx) => (
                    <th key={idx}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {section.closingNote && (
              <p className="reveal mt-6 text-slate-600">{section.closingNote}</p>
            )}
          </div>
        </section>
      );

    case 'faq':
      return (
        <CryptoFaqAccordion
          variant={section.variant}
          sectionClass={section.sectionClass}
          containerClass={section.containerClass}
          heading={section.heading}
          subheading={section.subheading}
          items={section.items}
        />
      );

    case 'calendly':
      return (
        <CryptoCalendlySection
          variant={section.variant}
          heading={section.heading}
          subheading={section.subheading}
        />
      );

    default:
      return null;
  }
}
