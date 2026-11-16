import { Fragment, useState } from 'react';
import { Target } from 'lucide-react';
import type { NftSectionBlock, NftThemedCard } from '../types';
import { CryptoClientMarquee } from '../../crypto/components/CryptoClientMarquee';
import { RichText, HeadingLines } from '../../crypto/components/RichText';
import { NftActionButton } from './NftActionButton';
import { NftCalendlyWidget } from './NftCalendlyWidget';
import {
  NftPackageTableSection,
  NftTestimonialsSection,
  NftVideoFeatureSection,
} from './NftTestimonialsAndPackages';

interface NftSectionRendererProps {
  sections: NftSectionBlock[];
  onOpenModal: () => void;
}

interface FloatingHeroLayout {
  wrapperClass: string;
  leftClass: string;
  centerOuterClass: string;
  contentClass: string;
  rightClass: string;
  titleClass?: string;
  subtitleClass?: string;
  descClass?: string;
}

const FLOATING_HERO_LAYOUTS: Record<string, FloatingHeroLayout> = {
  'blue-viral-section': {
    wrapperClass: 'blue-viral-wrapper',
    leftClass: 'blue-viral-left',
    centerOuterClass: '',
    contentClass: 'blue-viral-content',
    rightClass: 'blue-viral-right',
  },
  'pink-viral-section': {
    wrapperClass: 'pink-viral-wrapper',
    leftClass: 'pink-viral-left',
    centerOuterClass: '',
    contentClass: 'pink-viral-content',
    rightClass: 'pink-viral-right',
  },
  'community-pink-section': {
    wrapperClass: 'community-pink-wrapper',
    leftClass: 'community-pink-left',
    centerOuterClass: '',
    contentClass: 'community-pink-content',
    rightClass: 'community-pink-right',
  },
  'gaming-marketing-section': {
    wrapperClass: 'row',
    leftClass: 'col-md-2 gaming-left-icons',
    centerOuterClass: 'col-md-8 text-center gaming-content',
    contentClass: '',
    rightClass: 'col-md-2 gaming-right-icons',
    titleClass: 'gaming-title',
    subtitleClass: 'gaming-subtitle',
    descClass: 'gaming-description',
  },
  'telegram-pink-section': {
    wrapperClass: 'telegram-pink-wrapper',
    leftClass: 'telegram-pink-left',
    centerOuterClass: '',
    contentClass: 'telegram-pink-content',
    rightClass: 'telegram-pink-right',
  },
  'discord-blue-section': {
    wrapperClass: 'row align-items-center',
    leftClass: 'col-md-2 discord-blue-left',
    centerOuterClass: 'col-md-8',
    contentClass: 'discord-blue-content',
    rightClass: 'col-md-2 discord-blue-right',
  },
  'violet-pr-section': {
    wrapperClass: 'row align-items-center',
    leftClass: 'col-md-2 violet-left',
    centerOuterClass: 'col-md-8 text-center violet-content',
    contentClass: '',
    rightClass: 'col-md-2 violet-right',
  },
  default: {
    wrapperClass: 'row',
    leftClass: 'col-md-2 viral-left',
    centerOuterClass: 'col-md-8 text-center viral-inner',
    contentClass: '',
    rightClass: 'col-md-2 viral-right',
  },
};

function getFloatingLayout(sectionClass: string): FloatingHeroLayout {
  for (const key of Object.keys(FLOATING_HERO_LAYOUTS)) {
    if (key !== 'default' && sectionClass.includes(key)) {
      return FLOATING_HERO_LAYOUTS[key];
    }
  }
  return FLOATING_HERO_LAYOUTS.default;
}

function renderHeadingWithAccent(
  heading: string,
  highlight: string | undefined,
  headingBrLines?: string[]
) {
  if (headingBrLines && headingBrLines.length > 0) {
    return headingBrLines.map((line, i) => (
      <Fragment key={i}>
        {i > 0 && <br />}
        {line}
      </Fragment>
    ));
  }
  if (!highlight) return heading;
  return (
    <>
      {heading} <span>{highlight}</span>
    </>
  );
}

function getThemedCardClasses(sectionClass: string) {
  const isOrangeWhite = sectionClass.includes('orange-white-card-section');
  const isPinkProcess = sectionClass.includes('pink-pr-expertise');
  return {
    titleClass: isOrangeWhite ? 'orange-card-title' : undefined,
    tagClass: isOrangeWhite ? 'orange-card-tag' : undefined,
    textClass: isOrangeWhite ? 'orange-card-text' : undefined,
    isPinkProcess,
  };
}

function renderViralHero(
  section: Extract<NftSectionBlock, { kind: 'viral-hero' }>,
  onOpenModal: () => void
) {
  if (section.layout === 'floating-center') {
    const layout = getFloatingLayout(section.sectionClass);
    const hasBlueBtnWrap = section.buttons?.some((b) =>
      (b.className || '').includes('blue-cta-btn')
    );

    const innerContent = (
      <>
        {section.badge && <span className="violet-tagline">{section.badge}</span>}
        {section.subtitle && (
          <h4 className={layout.subtitleClass}>{section.subtitle}</h4>
        )}
        <h2 className={layout.titleClass}>
          {renderHeadingWithAccent(
            section.heading,
            undefined,
            section.headingBrLines
          )}
        </h2>
        {section.paragraphs.map((nodes, i) => (
          <p key={i} className={layout.descClass}>
            <RichText nodes={nodes} />
          </p>
        ))}
        {section.buttons && section.buttons.length > 0 && (
          <div className={hasBlueBtnWrap ? 'blue-cta-buttons' : 'center call-btn'}>
            {section.buttons.map((btn, i) => (
              <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
            ))}
          </div>
        )}
      </>
    );

    return (
      <section className={section.sectionClass}>
        <div className={section.containerClass}>
          <div className={layout.wrapperClass}>
            <div className={layout.leftClass}>
              {section.sideLeftImages?.map((im, i) => (
                <img
                  key={i}
                  src={im.src}
                  alt={im.alt}
                  className={im.className}
                  loading="lazy"
                />
              ))}
            </div>

            {layout.centerOuterClass ? (
              <div className={layout.centerOuterClass}>
                {layout.contentClass ? (
                  <div className={layout.contentClass}>{innerContent}</div>
                ) : (
                  innerContent
                )}
              </div>
            ) : (
              <div className={layout.contentClass}>{innerContent}</div>
            )}

            <div className={layout.rightClass}>
              {section.sideRightImages?.map((im, i) => (
                <img
                  key={i}
                  src={im.src}
                  alt={im.alt}
                  className={im.className}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={section.sectionClass}>
      <div className={section.containerClass}>
        <div className="row align-items-center">
          <div className={section.contentColClass || 'col-md-6'}>
            <h2>
              {renderHeadingWithAccent(
                section.heading,
                undefined,
                section.headingBrLines
              )}
            </h2>
            {section.paragraphs.map((nodes, i) => (
              <p key={i}>
                <RichText nodes={nodes} />
              </p>
            ))}
            {section.buttons && section.buttons.length > 0 && (
              <div className="center call-btn">
                {section.buttons.map((btn, i) => (
                  <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                ))}
              </div>
            )}
          </div>
          {section.image && (
            <div className={section.imageColClass || 'col-md-6 text-center'}>
              <img
                src={section.image.src}
                alt={section.image.alt}
                className={section.image.className || 'img-fluid'}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderThemedCard(
  card: NftThemedCard,
  cardClass: string,
  sectionClass: string,
  onOpenModal: () => void,
  idx: number
) {
  const { titleClass, tagClass, textClass, isPinkProcess } =
    getThemedCardClasses(sectionClass);

  const iconNode = card.iconWrapClass ? (
    <div className={card.iconWrapClass}>
      {card.iconClass ? (
        <i className={card.iconClass} aria-hidden="true" />
      ) : card.iconImg ? (
        <img
          src={card.iconImg.src}
          alt={card.iconImg.alt}
          className={card.iconImg.className}
          loading="lazy"
        />
      ) : card.emoji ? (
        <span>{card.emoji}</span>
      ) : null}
    </div>
  ) : null;

  const textBody = (
    <>
      {card.tag && <span className={tagClass}>{card.tag}</span>}
      <h3 className={titleClass}>{card.title}</h3>
      {card.paragraphs.map((nodes, pIdx) => (
        <p key={pIdx} className={textClass}>
          <RichText nodes={nodes} />
        </p>
      ))}
      {card.button && <NftActionButton button={card.button} onOpenModal={onOpenModal} />}
    </>
  );

  const cardInner = (
    <div className={cardClass} key={card.colClass ? undefined : idx}>
      {card.topBarClass && <div className={card.topBarClass} />}
      {iconNode}
      {isPinkProcess ? <div className="pink-process-text">{textBody}</div> : textBody}
    </div>
  );

  return card.colClass ? (
    <div className={card.colClass} key={idx}>
      {cardInner}
    </div>
  ) : (
    cardInner
  );
}

function renderThemedCardGrid(
  section: Extract<NftSectionBlock, { kind: 'themed-card-grid' }>,
  onOpenModal: () => void
) {
  const headerNode =
    section.heading || section.subheading || section.badge ? (
      <div className={section.headingWrapClass || 'section-title text-center'}>
        {section.badge && <span className="pink-badge">{section.badge}</span>}
        {section.heading && (
          <h2>
            {renderHeadingWithAccent(section.heading, section.headingHighlight)}
          </h2>
        )}
        {section.subheading && <p>{section.subheading}</p>}
      </div>
    ) : null;

  const gridNode = (
    <div className={section.gridClass}>
      {section.cards.map((card, i) =>
        renderThemedCard(
          card,
          section.cardClass,
          section.sectionClass,
          onOpenModal,
          i
        )
      )}
    </div>
  );

  if (section.isSplitProcess) {
    return (
      <section className={section.sectionClass}>
        <div className={section.containerClass || 'container'}>
          <div className="pink-pr-box">
            <div className="row align-items-center">
              <div className="col-lg-5">{headerNode}</div>
              <div className="col-lg-7">{gridNode}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={section.sectionClass}>
      {section.containerClass ? (
        <div className={section.containerClass}>
          {headerNode}
          {gridNode}
        </div>
      ) : (
        <>
          {headerNode}
          {gridNode}
        </>
      )}
    </section>
  );
}

function renderPrWhiteEditorial(
  section: Extract<NftSectionBlock, { kind: 'pr-white-editorial' }>
) {
  if (section.variant === 'global-white') {
    return (
      <section className={section.sectionClass}>
        <div className="container">
          <div className="nft-global-row">
            <div className="nft-global-content">
              <div className="nft-global-heading">
                <h2>
                  {renderHeadingWithAccent(
                    section.headingPrefix,
                    section.headingAccent
                  )}
                </h2>
                {section.subheading && <p className="top-text">{section.subheading}</p>}
              </div>
              <div className="nft-feature-card">
                <div className="feature-line" />
                <div className="feature-content">
                  {section.paragraphs.map((nodes, i) => (
                    <p key={i}>
                      <RichText nodes={nodes} />
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {section.image && (
              <div className="nft-global-image">
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  className={section.image.className}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={section.sectionClass}>
      <div className="container">
        <div className="row nft-row">
          {section.image && (
            <div className="nft-image">
              <img
                src={section.image.src}
                alt={section.image.alt}
                className={section.image.className}
                loading="lazy"
              />
            </div>
          )}
          <div className="nft-content">
            <div className="nft-heading">
              <h2>
                {renderHeadingWithAccent(
                  section.headingPrefix,
                  section.headingAccent
                )}
              </h2>
              {section.subheading && <p className="sub-text">{section.subheading}</p>}
            </div>
            <div className="nft-card">
              {section.paragraphs.map((nodes, i) => (
                <p key={i}>
                  <RichText nodes={nodes} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderCtaBand(
  section: Extract<NftSectionBlock, { kind: 'cta-band' }>,
  onOpenModal: () => void
) {
  if (section.variant === 'blue-cta') {
    return (
      <section className={section.sectionClass}>
        <div className="blue-cta-container">
          <div className="blue-cta-box">
            <div className="blue-cta-content">
              <h2>{section.heading}</h2>
              {section.subtext && <p>{section.subtext}</p>}
              {section.buttons.length > 0 && (
                <div className="blue-cta-buttons">
                  {section.buttons.map((btn, i) => (
                    <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (section.variant === 'cta1') {
    return (
      <section className={section.sectionClass}>
        <div className="container">
          <div className="row align-items-center">
            {section.image && (
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 ct_a">
                <div className="clone-nft">
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    className={section.image.className}
                    loading="lazy"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12">
              <div className="section-title">
                <h3 className="white-color">
                  {section.heading}
                  {section.headingAccent && (
                    <span className="red-txt"> {section.headingAccent}</span>
                  )}
                </h3>
                {section.subtext && <p>{section.subtext}</p>}
              </div>
              <div className="center call-btn">
                {section.buttons.map((btn, i) => (
                  <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (section.variant === 'nft-cta-2') {
    return (
      <section className={section.sectionClass}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5" />
            <div className="col-md-12 col-lg-7">
              <div id="submitProp">
                <div className="form-heading">
                  <h3>
                    <span className="big-font text-white">{section.heading}</span>
                    {section.subtext && (
                      <>
                        <br />
                        <span className="paragraph text-white">{section.subtext}</span>
                      </>
                    )}
                  </h3>
                </div>
                <div className="center call-btn mobile-center">
                  {section.buttons.map((btn, i) => (
                    <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isSubProposal = section.variant === 'subPerposal';
  return (
    <section className={section.sectionClass}>
      <div className="container">
        <div className="row">
          <div className={isSubProposal ? 'col-md-12' : 'col-md-12 col-lg-7'}>
            <div id="submitProp">
              <div className="form-heading">
                <h3>
                  {section.heading}
                  {section.headingAccent && (
                    <>
                      {' '}
                      <span className="red-txt">{section.headingAccent}</span>
                    </>
                  )}
                </h3>
                {section.subtext && <p>{section.subtext}</p>}
              </div>
              <div className="center call-btn">
                {section.buttons.map((btn, i) => (
                  <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NftFaqSection({
  section,
}: {
  section: Extract<NftSectionBlock, { kind: 'faq' }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isWhite = section.variant === 'white-faq';
  const groupId = isWhite ? 'whiteFaqAccordion' : 'accordion';

  return (
    <section className={section.sectionClass}>
      {isWhite ? (
        <div className="container">
          <div className="white-faq-title">
            <h2>{section.heading}</h2>
            {section.subheading && <p>{section.subheading}</p>}
          </div>
          <div className="white-faq-wrapper">
            <div id={groupId} className="panel-group" role="tablist" aria-multiselectable="true">
              {section.items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const collapseId = `whiteFaqCollapse-${idx}`;
                return (
                  <div className="white-faq-card panel" key={idx}>
                    <div className="white-faq-question panel-heading" role="tab">
                      <h3 className="panel-title">
                        <a
                          href={`#${collapseId}`}
                          className={isOpen ? '' : 'collapsed'}
                          aria-expanded={isOpen}
                          aria-controls={collapseId}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenIndex(isOpen ? null : idx);
                          }}
                        >
                          {item.question}
                        </a>
                      </h3>
                    </div>
                    <div
                      id={collapseId}
                      className={`panel-collapse collapse ${isOpen ? 'show' : ''}`}
                      role="tabpanel"
                    >
                      <div className="white-faq-answer panel-body">
                        {item.paragraphs.map((nodes, pIdx) => (
                          <p key={pIdx}>
                            <RichText nodes={nodes} />
                          </p>
                        ))}
                        {item.bullets.length > 0 && (
                          <ul>
                            {item.bullets.map((bNodes, bIdx) => (
                              <li key={bIdx}>
                                <RichText nodes={bNodes} />
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
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="sec_tit text-center">
                <h2>{section.heading}</h2>
                {section.subheading && <p>{section.subheading}</p>}
              </div>
            </div>
          </div>
          <div className="container">
            <div id={groupId} className="panel-group" role="tablist" aria-multiselectable="true">
              {section.items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const collapseId = `nftFaqCollapse-${idx}`;
                return (
                  <div className="panel panel-nft panel-default" key={idx}>
                    <div className="panel-heading p-3 mb-3" role="tab">
                      <h3 className="panel-title">
                        <a
                          href={`#${collapseId}`}
                          className={isOpen ? '' : 'collapsed'}
                          aria-expanded={isOpen}
                          aria-controls={collapseId}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenIndex(isOpen ? null : idx);
                          }}
                        >
                          {item.question}
                        </a>
                      </h3>
                    </div>
                    <div
                      id={collapseId}
                      className={`panel-collapse collapse ${isOpen ? 'show' : ''}`}
                      role="tabpanel"
                    >
                      <div className="panel-body px-3 mb-4">
                        {item.paragraphs.map((nodes, pIdx) => (
                          <p key={pIdx}>
                            <RichText nodes={nodes} />
                          </p>
                        ))}
                        {item.bullets.length > 0 && (
                          <ul>
                            {item.bullets.map((bNodes, bIdx) => (
                              <li key={bIdx}>
                                <RichText nodes={bNodes} />
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
        </>
      )}
    </section>
  );
}

/**
 * Dispatches structured NftSectionBlock entries to their exact native TSX section layouts.
 */
export function NftSectionRenderer({ sections, onOpenModal }: NftSectionRendererProps) {
  return (
    <>
      {sections.map((section, idx) => {
        switch (section.kind) {
          case 'intro-centered':
            return (
              <section key={idx} className="custom-padding">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      {section.headingTag === 'h1' ? (
                        <h1>{section.heading}</h1>
                      ) : (
                        <h2>{section.heading}</h2>
                      )}
                      {section.paragraphs.map((nodes, i) => (
                        <p key={i}>
                          <RichText nodes={nodes} />
                        </p>
                      ))}
                      {section.buttons && section.buttons.length > 0 && (
                        <div className="center call-btn">
                          {section.buttons.map((btn, i) => (
                            <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'viral-hero':
            return (
              <Fragment key={idx}>{renderViralHero(section, onOpenModal)}</Fragment>
            );

          case 'strategy-split':
            return (
              <section key={idx} id={section.sectionId} className={section.sectionClass}>
                <div className={section.containerClass}>
                  <div className={section.wrapperClass}>
                    <div className={section.leftClass}>
                      <h2>
                        <HeadingLines lines={section.headingLines} />
                      </h2>
                      {section.subheading && <h4>{section.subheading}</h4>}
                    </div>
                    <div className={section.rightClass}>
                      {section.items.map((item, i) => (
                        <div className={section.itemClass} key={i}>
                          <div className={section.contentClass}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'themed-card-grid':
            return (
              <Fragment key={idx}>
                {renderThemedCardGrid(section, onOpenModal)}
              </Fragment>
            );

          case 'nft-overview':
            return (
              <section key={idx} id="nft-overview" className={section.sectionClass}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 nft-overview-bg">
                      <div className="row nft-overview-padding">
                        <div className="col-md-5">
                          <div className="approach-1">
                            <h2>{section.heading}</h2>
                            {section.subheading && <h4>{section.subheading}</h4>}
                          </div>
                        </div>
                        <div className="col-md-7">
                          {section.items.map((item, i) => (
                            <div className="row mb-4 align-items-start" key={i}>
                              <div className="col-md-1">
                                {item.useTargetSvg ? (
                                  <Target
                                    className="w-7 h-7 text-white"
                                    aria-label={item.iconAlt}
                                  />
                                ) : (
                                  <img
                                    src={item.iconSrc}
                                    alt={item.iconAlt}
                                    loading="lazy"
                                  />
                                )}
                              </div>
                              <div className="col-md-11">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'nova-steps':
            return (
              <section key={idx} className={section.sectionClass}>
                <div className="nova-container">
                  <div className="nova-header text-center">
                    <h2 className="reveal">
                      <span className="to">{section.heading}</span>
                    </h2>
                    {section.subheading && <p className="reveal">{section.subheading}</p>}
                  </div>
                  <div className="nova-timeline">
                    {section.steps.map((st, i) => (
                      <div className="nova-step" key={i}>
                        <div className="nova-number">{st.number}</div>
                        <div className="nova-card">
                          <h3>{st.title}</h3>
                          <p>{st.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'timeline-roadmap':
            return (
              <section key={idx} className={section.sectionClass}>
                <div className="container-fluid">
                  <div className="section-title text-center underline">
                    <div className="sec_tit">
                      <h2>{section.heading}</h2>
                      {section.subheading && <p>{section.subheading}</p>}
                    </div>
                  </div>
                  <ul className="timeline">
                    {section.steps.map((step, i) => (
                      <li
                        key={i}
                        className={step.inverted ? 'timeline-inverted' : undefined}
                      >
                        <div className="timeline-image">
                          <img
                            src={step.iconSrc}
                            alt={step.iconAlt}
                            className="rounded-circle img-fluid"
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
                  {section.buttons && section.buttons.length > 0 && (
                    <div className="center call-btn text-center">
                      {section.buttons.map((btn, i) => (
                        <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );

          case 'evolution-cards': {
            const chunks = [section.cards.slice(0, 2), section.cards.slice(2)].filter(
              (c) => c.length > 0
            );
            return (
              <section key={idx} className={section.sectionClass}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h2>{section.heading}</h2>
                    </div>
                  </div>
                </div>
                <div className="container">
                  {chunks.map((group, gIdx) => (
                    <div className="row" key={gIdx}>
                      {group.map((card, cIdx) => (
                        <div className="card" key={cIdx}>
                          <div className="title" />
                          <div className="circle">
                            <img src={card.iconSrc} alt={card.iconAlt} loading="lazy" />
                          </div>
                          <div className="content">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          case 'pr-white-editorial':
            return <Fragment key={idx}>{renderPrWhiteEditorial(section)}</Fragment>;

          case 'spectacular-split': {
            const isFluid = section.sectionClass.includes('p-0');
            const imgCol = section.image ? (
              <div
                className={
                  isFluid ? 'col-md-6' : 'col-md-12 col-lg-6 text-center img-border'
                }
              >
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  className={section.image.className}
                  loading="lazy"
                />
              </div>
            ) : null;

            const textCol = (
              <div className={isFluid ? 'col-md-6 p-4' : 'col-md-12 col-lg-6'}>
                <div className="sec_tit">
                  <h2>{section.heading}</h2>
                  {section.subheadings?.map((sub, i) => (
                    <h4 key={i}>{sub}</h4>
                  ))}
                </div>
                <div className="desc_cnt">
                  {section.paragraphs.map((nodes, i) => (
                    <p key={i}>
                      <RichText nodes={nodes} />
                    </p>
                  ))}
                  {section.checklistColumns && section.checklistColumns.length > 0 && (
                    <div className="row list-nft">
                      {section.checklistColumns.map((col, cIdx) => (
                        <div className="col-md-6 col-xs-12" key={cIdx}>
                          <ul>
                            {col.map((item, liIdx) => (
                              <li key={liIdx}>
                                <i
                                  className="fa fa-check-square"
                                  aria-hidden="true"
                                />{' '}
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul>
                      {section.bullets.map((nodes, i) => (
                        <li key={i}>
                          <RichText nodes={nodes} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.buttons && section.buttons.length > 0 && (
                    <div className="col-md-12 center call-btn">
                      {section.buttons.map((btn, i) => (
                        <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <section key={idx} className={section.sectionClass}>
                <div className={isFluid ? 'container-fluid' : 'container'}>
                  <div className="row align-items-center">
                    {section.imageOnRight ? (
                      <>
                        {textCol}
                        {imgCol}
                      </>
                    ) : (
                      <>
                        {imgCol}
                        {textCol}
                      </>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          case 'service-cards': {
            const isSectorBadges = Boolean(section.rowWrapClass?.includes('desc_cnt'));
            const cardNodes = section.cards.map((card, i) => {
              const cardMarkup = (
                <div className={card.cardClass} key={card.colClass ? undefined : i}>
                  {card.iconImg &&
                    (card.iconSpanClass ? (
                      <div className={card.iconSpanClass}>
                        <img
                          src={card.iconImg.src}
                          alt={card.iconImg.alt}
                          className={card.iconImg.className}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <img
                        src={card.iconImg.src}
                        alt={card.iconImg.alt}
                        className={card.iconImg.className}
                        loading="lazy"
                      />
                    ))}
                  {card.headingTag === 'h5' ? (
                    <div className={isSectorBadges ? 'serv_head' : undefined}>
                      <h5>{card.title}</h5>
                    </div>
                  ) : (
                    <h3>{card.title}</h3>
                  )}
                  {card.paragraphs.map((nodes, pIdx) => (
                    <p key={pIdx}>
                      <RichText nodes={nodes} />
                    </p>
                  ))}
                </div>
              );
              return card.colClass ? (
                <div className={card.colClass} key={i}>
                  {cardMarkup}
                </div>
              ) : (
                cardMarkup
              );
            });

            if (isSectorBadges) {
              return (
                <section key={idx} className={section.sectionClass}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-10 div_center">
                        <div className="sec_tit text-center">
                          <h2>{section.heading}</h2>
                          {section.subheading && <p>{section.subheading}</p>}
                        </div>
                        <div className={section.rowWrapClass}>{cardNodes}</div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            return (
              <section key={idx} className={section.sectionClass}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="sec_tit text-center">
                        <h2>{section.heading}</h2>
                        {section.subheading && <p>{section.subheading}</p>}
                        {section.paragraphs?.map((nodes, pIdx) => (
                          <p key={pIdx}>
                            <RichText nodes={nodes} />
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {section.rowWrapClass ? (
                      <div className={section.rowWrapClass}>{cardNodes}</div>
                    ) : (
                      cardNodes
                    )}
                  </div>
                  {section.buttons && section.buttons.length > 0 && (
                    <div className="center call-btn text-center mt-4">
                      {section.buttons.map((btn, i) => (
                        <NftActionButton key={i} button={btn} onOpenModal={onOpenModal} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          }

          case 'editorial-copy': {
            const hasRightplaceCenter =
              !section.image &&
              (section.sectionClass.includes('rightplace') ||
                section.sectionClass.includes('our_serv_inr'));
            return (
              <section key={idx} className={section.sectionClass}>
                <div className={hasRightplaceCenter ? 'container-fluid' : 'container'}>
                  {section.image ? (
                    <div className="row align-items-center">
                      <div className="col-md-12 col-lg-6 col-sm-12">
                        <div className="sec_tit">
                          <h2>{section.heading}</h2>
                          {section.subheading && <p>{section.subheading}</p>}
                        </div>
                        <div className="desc_cnt">
                          {section.paragraphs.map((nodes, i) => (
                            <p key={i}>
                              <RichText nodes={nodes} />
                            </p>
                          ))}
                        </div>
                        {section.checklistColumns &&
                          section.checklistColumns.length > 0 && (
                            <div className="row list-nft why-nft-eon8">
                              {section.checklistColumns.map((col, cIdx) => (
                                <div className="col-md-6 col-xs-12" key={cIdx}>
                                  <ul>
                                    {col.map((item, liIdx) => (
                                      <li key={liIdx}>
                                        <i
                                          className="fa fa-check-square"
                                          aria-hidden="true"
                                        />{' '}
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        {section.buttons && section.buttons.length > 0 && (
                          <div className="center call-btn">
                            {section.buttons.map((btn, i) => (
                              <NftActionButton
                                key={i}
                                button={btn}
                                onOpenModal={onOpenModal}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="col-md-12 col-lg-6 text-center">
                        <img
                          src={section.image.src}
                          alt={section.image.alt}
                          className={section.image.className || 'img-fluid'}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div
                        className={
                          hasRightplaceCenter ? 'col-md-10 div_center' : 'col-md-12'
                        }
                      >
                        <div className="sec_tit text-center">
                          <h2>{section.heading}</h2>
                          {section.subheading && <p>{section.subheading}</p>}
                        </div>
                        <div className="desc_cnt text-center">
                          {section.paragraphs.map((nodes, i) => (
                            <p key={i}>
                              <RichText nodes={nodes} />
                            </p>
                          ))}
                          {section.buttons && section.buttons.length > 0 && (
                            <div className="center call-btn">
                              {section.buttons.map((btn, i) => (
                                <NftActionButton
                                  key={i}
                                  button={btn}
                                  onOpenModal={onOpenModal}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          }

          case 'cta-band':
            return <Fragment key={idx}>{renderCtaBand(section, onOpenModal)}</Fragment>;

          case 'testimonials-slider':
            return (
              <NftTestimonialsSection
                key={idx}
                heading={section.heading}
                subheading={section.subheading}
                cards={section.cards}
                videoFeature={section.videoFeature}
                ctaButtons={section.ctaButtons}
                onOpenModal={onOpenModal}
              />
            );

          case 'video-feature':
            return (
              <NftVideoFeatureSection
                key={idx}
                sectionClass={section.sectionClass}
                heading={section.heading}
                description={section.description}
                videoSrc={section.videoSrc}
                videoTitle={section.videoTitle}
              />
            );

          case 'image-banner':
            return (
              <section key={idx} className={section.sectionClass}>
                <div className={section.containerClass}>
                  <div className="row">
                    {section.heading && (
                      <div className="col-md-12 sec_tit text-center pb-4">
                        <h2>{section.heading}</h2>
                      </div>
                    )}
                    <div className="col-md-12">
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className={section.image.className || 'img-fluid'}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'discord-cards':
            return (
              <section
                key={idx}
                id={section.sectionId}
                className={section.sectionClass}
              >
                <div className="container">
                  <div className="row discord-card">
                    <div className="col-md-12">
                      <div className="sec_tit text-center">
                        <h2>{section.heading}</h2>
                      </div>
                    </div>
                    {section.cards.map((card, i) => (
                      <div className="card-wrap" key={i}>
                        <div className={card.headerClass}>
                          <img
                            src={card.iconImg.src}
                            alt={card.iconImg.alt}
                            className={card.iconImg.className}
                            loading="lazy"
                          />
                        </div>
                        <div className="card-content">
                          <h3 className="card-title">{card.title}</h3>
                          <p className="card-text">{card.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'package-table':
            return (
              <NftPackageTableSection
                key={idx}
                sectionId={section.sectionId}
                sectionClass={section.sectionClass}
                heading={section.heading}
                mainRows={section.mainRows}
                noteText={section.noteText}
              />
            );

          case 'extra-slider':
            return (
              <CryptoClientMarquee
                key={idx}
                heading={section.heading ?? ''}
                logos={section.logos}
                variant="nft-slider"
              />
            );

          case 'faq':
            return <NftFaqSection key={idx} section={section} />;

          case 'calendly':
            if (section.sectionClass.includes('pink-calendly-section')) {
              return (
                <section key={idx} className={section.sectionClass}>
                  <div className="pink-calendly-container">
                    <div className="pink-calendly-box">
                      <div className="pink-calendly-heading">
                        <h2>{section.heading}</h2>
                        {section.subheading && <p>{section.subheading}</p>}
                      </div>
                      <div className="pink-calendly-widget">
                        <NftCalendlyWidget
                          callTitle={section.callTitle}
                          callDescription={section.callDescription}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              );
            }
            if (section.sectionClass.includes('light-calendly-section')) {
              return (
                <section key={idx} className={section.sectionClass}>
                  <div className="light-container">
                    <div className="light-calendly-header text-center">
                      <h2 className="reveal reveal-up">
                        <span className="to">{section.heading}</span>
                      </h2>
                      {section.subheading && <p className="reveal">{section.subheading}</p>}
                    </div>
                    <div className="light-calendly-box">
                      <NftCalendlyWidget
                        callTitle={section.callTitle}
                        callDescription={section.callDescription}
                      />
                    </div>
                  </div>
                </section>
              );
            }
            return (
              <div key={idx} className={section.sectionClass || 'col-md-12'}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center pt-5 pb-4">
                      <h2>{section.heading}</h2>
                      {section.subheading && <p>{section.subheading}</p>}
                    </div>
                    <div className="col-md-12 pb-5">
                      <NftCalendlyWidget
                        callTitle={section.callTitle}
                        callDescription={section.callDescription}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
