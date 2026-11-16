import { useState } from 'react';
import type { FaqPanelItem } from '../types';
import { RichText } from '@/pages/crypto/components/RichText';

interface InfluencerFaqAccordionProps {
  variant: 'faq' | 'panel-nft';
  heading: string;
  items: FaqPanelItem[];
}

/**
 * Interactive accessible FAQ accordion supporting Agency (.faq) and Twitter (.accordion-section).
 */
export function InfluencerFaqAccordion({
  variant,
  heading,
  items,
}: InfluencerFaqAccordionProps) {
  const initialIndex = items.findIndex((item) => item.defaultOpen);
  const [openIndex, setOpenIndex] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  if (variant === 'panel-nft') {
    return (
      <section aria-label="Question Accordions" className="accordion-section clearfix mt-3">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="sec_tit text-center">
              <h2 className="reveal reveal-up">
                <span className="to">{heading}</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="container reveal">
          <div className="panel-group" id="accordion" role="tablist">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = item.id || `collapse-${idx}`;
              return (
                <div className="panel panel-nft panel-default" key={panelId}>
                  <div className="panel-heading p-3 mb-3" role="tab">
                    <h3 className="panel-title">
                      <a
                        role="button"
                        href={`#${panelId}`}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
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
                    id={panelId}
                    className={`panel-collapse collapse ${isOpen ? 'show' : ''}`}
                    role="tabpanel"
                  >
                    <div className="panel-body px-3 mb-4">
                      {item.answers.map((nodes, aIdx) => (
                        <p key={aIdx}>
                          <RichText nodes={nodes} />
                        </p>
                      ))}
                      {item.bullets && item.bullets.length > 0 && (
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

  return (
    <section className="faq">
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
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="panel-group" id="accordion" role="tablist">
              {items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const panelId = item.id || `collapse${idx + 1}`;
                return (
                  <div className="panel panel-default" key={panelId}>
                    <div className="panel-heading" role="tab">
                      <h4 className="panel-title">
                        <a
                          role="button"
                          href={`#${panelId}`}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className={isOpen ? '' : 'collapsed'}
                          onClick={(e) => {
                            e.preventDefault();
                            toggle(idx);
                          }}
                        >
                          {item.question}
                        </a>
                      </h4>
                    </div>
                    <div
                      id={panelId}
                      className={`panel-collapse collapse ${isOpen ? 'show' : ''}`}
                      role="tabpanel"
                    >
                      <div className="panel-body">
                        {item.answers.map((nodes, aIdx) => (
                          <p key={aIdx}>
                            <RichText nodes={nodes} />
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
