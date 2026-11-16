import { useState } from 'react';
import type { FaqEntry } from '../types';
import { RichText } from './RichText';

interface CryptoFaqAccordionProps {
  variant: 'panel' | 'gold-faq' | 'modern-faq' | 'blue-faq';
  sectionClass: string;
  containerClass: string;
  heading: string;
  subheading?: string;
  items: FaqEntry[];
}

export function CryptoFaqAccordion({
  variant,
  sectionClass,
  containerClass,
  heading,
  subheading,
  items,
}: CryptoFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  if (variant === 'panel') {
    return (
      <section aria-label="Question Accordions" className={sectionClass}>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="sec_tit text-center">
              <h2 className="reveal reveal-up">
                <span className="to">{heading}</span>
              </h2>
            </div>
          </div>
        </div>
        <div className={containerClass || 'container reveal'}>
          <div className="panel-group" id="accordion" role="tablist">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div className="panel panel-nft panel-default" key={idx}>
                  <div className="panel-heading p-3 mb-3" role="tab">
                    <h3 className="panel-title">
                      <a
                        role="button"
                        href={`#collapse-${idx}`}
                        aria-expanded={isOpen}
                        className={isOpen ? '' : 'collapsed'}
                        onClick={(e) => {
                          e.preventDefault();
                          toggle(idx);
                        }}
                      >
                        {item.question}
                      </a>
                    </h3>
                  </div>
                  <div
                    className={`panel-collapse collapse ${isOpen ? 'show' : ''}`}
                    role="tabpanel"
                  >
                    <div className="panel-body px-3 mb-4">
                      {item.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>
                          <RichText nodes={p} />
                        </p>
                      ))}
                      {item.bullets.length > 0 && (
                        <ul>
                          {item.bullets.map((b, bIdx) => (
                            <li key={bIdx}>
                              <RichText nodes={b} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const listClass =
    variant === 'blue-faq'
      ? 'blue-accordion reveal'
      : variant === 'gold-faq'
      ? 'faq-container'
      : 'faq-list reveal';

  const headerClass = variant === 'blue-faq' ? 'blue-header text-center' : 'faq-header text-center';

  return (
    <section className={sectionClass}>
      <div className={containerClass || 'faq-container'}>
        <div className={headerClass}>
          <h2 className={variant === 'gold-faq' ? 'faq-title reveal' : 'reveal'}>
            <span className="to">{heading}</span>
          </h2>
          {subheading && <p>{subheading}</p>}
        </div>
        <div className={listClass}>
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className={`faq-item ${isOpen ? 'active' : ''}`} key={idx}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="faq-question"
                  onClick={() => toggle(idx)}
                >
                  {item.question}
                </button>
                <div className="faq-answer">
                  {item.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>
                      <RichText nodes={p} />
                    </p>
                  ))}
                  {item.bullets.length > 0 && (
                    <ul>
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx}>
                          <RichText nodes={b} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
