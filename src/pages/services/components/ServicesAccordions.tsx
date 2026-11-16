import { useState, type ReactNode } from 'react';
import type {
  ServiceBootstrapAccordionNode,
  ServiceCustomFaqItemNode,
  ServiceElementorAccordionNode,
  ServiceElementorTabsNode,
  ServiceLegacyFaqItemNode,
  ServiceNode,
} from '../types';

interface RenderNodesFn {
  (nodes?: ServiceNode[]): ReactNode;
}

/**
 * Elementor native accordion (.elementor-accordion) rendered with pure React state.
 */
export function ServicesElementorAccordion({
  node,
  renderNodes,
}: {
  node: ServiceElementorAccordionNode;
  renderNodes: RenderNodesFn;
}) {
  const initialIdx = node.items.findIndex((it) => it.defaultOpen);
  const [openIdx, setOpenIdx] = useState<number>(initialIdx >= 0 ? initialIdx : 0);

  return (
    <div className={node.className || 'elementor-accordion'} role="tablist">
      {node.items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className={`elementor-accordion-item ${isOpen ? 'is-active' : ''}`}
          >
            <div
              className={`elementor-tab-title ${isOpen ? 'elementor-active' : ''}`}
              role="tab"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpenIdx(isOpen ? -1 : idx);
                }
              }}
            >
              <span className="elementor-accordion-icon elementor-accordion-icon-right" aria-hidden="true">
                <span className="elementor-accordion-icon-closed">
                  <i className="fas fa-plus" />
                </span>
                <span className="elementor-accordion-icon-opened">
                  <i className="fas fa-minus" />
                </span>
              </span>
              <span className="elementor-accordion-title">{item.title}</span>
            </div>
            <div
              className={`elementor-tab-content elementor-clearfix ${
                isOpen ? 'elementor-active is-open' : ''
              }`}
              role="tabpanel"
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              {renderNodes(item.content)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Bootstrap .panel-group FAQ accordion rendered with pure React state.
 */
export function ServicesBootstrapAccordion({
  node,
  renderNodes,
}: {
  node: ServiceBootstrapAccordionNode;
  renderNodes: RenderNodesFn;
}) {
  const initialIdx = node.items.findIndex((it) => it.defaultOpen);
  const [openIdx, setOpenIdx] = useState<number>(initialIdx >= 0 ? initialIdx : 0);

  return (
    <div
      id={node.id}
      className={node.className || 'panel-group'}
      role="tablist"
      aria-multiselectable="true"
    >
      {node.items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div className="panel panel-default" key={item.id || idx}>
            <div className="panel-heading" role="tab">
              <h4 className="panel-title">
                <a
                  href={`#${item.id || `faq-panel-${idx}`}`}
                  role="button"
                  aria-expanded={isOpen}
                  className={isOpen ? '' : 'collapsed'}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenIdx(isOpen ? -1 : idx);
                  }}
                >
                  {item.title}
                </a>
              </h4>
            </div>
            <div
              id={item.id || `faq-panel-${idx}`}
              className={`panel-collapse collapse ${isOpen ? 'in show' : ''}`}
              role="tabpanel"
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              <div className="panel-body">{renderNodes(item.content)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Interactive custom FAQ item supporting all 10 bespoke FAQ class families
 * (faq-item, faq2-item, zippy-faq-item, faq-item-white, consumer-faq-item,
 * searchads-item, vrfaqb-item, arfaqo-item, arfaqdp-item, vrfaq-item).
 */
export function ServicesCustomFaqItem({
  node,
  renderNodes,
}: {
  node: ServiceCustomFaqItemNode;
  renderNodes: RenderNodesFn;
}) {
  const [isOpen, setIsOpen] = useState(Boolean(node.defaultOpen));
  const QuestionTag = node.questionTag;

  const baseWrapper = node.wrapperClass
    .split(/\s+/)
    .filter((c) => c && c !== 'active')
    .join(' ');
  const wrapperClass = isOpen ? `${baseWrapper} active` : baseWrapper;

  return (
    <div className={wrapperClass}>
      <QuestionTag
        id={node.questionProps?.id}
        className={node.questionProps?.className}
        style={{ cursor: 'pointer', ...node.questionProps?.style }}
        type={QuestionTag === 'button' ? 'button' : undefined}
        role={QuestionTag !== 'button' ? 'button' : undefined}
        tabIndex={QuestionTag !== 'button' ? 0 : undefined}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (QuestionTag !== 'button' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        {renderNodes(node.questionNodes)}
        {node.toggleSignClass !== undefined && (
          <span className={node.toggleSignClass || undefined} aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        )}
      </QuestionTag>
      <div
        id={node.answerProps?.id}
        className={node.answerProps?.className}
        style={node.answerProps?.style}
      >
        {renderNodes(node.answerNodes)}
      </div>
    </div>
  );
}

/**
 * Inline-styled FAQ item replacing legacy toggleFAQ(n) handlers
 * (used on search-engine-optimization-services-seo & small-business-seo-services).
 */
export function ServicesLegacyFaqItem({
  node,
  renderNodes,
}: {
  node: ServiceLegacyFaqItemNode;
  renderNodes: RenderNodesFn;
}) {
  const [isOpen, setIsOpen] = useState(Boolean(node.defaultOpen));

  return (
    <div
      id={node.wrapperProps?.id}
      className={node.wrapperProps?.className}
      style={node.wrapperProps?.style}
    >
      <div
        className={node.questionProps?.className}
        style={{ cursor: 'pointer', ...node.questionProps?.style }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <span>{node.questionText}</span>
        <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </div>
      <div
        className={node.answerProps?.className}
        style={{
          ...node.answerProps?.style,
          display: isOpen ? 'block' : 'none',
        }}
      >
        {renderNodes(node.answerNodes)}
      </div>
    </div>
  );
}

/**
 * Elementor horizontal/vertical tab switcher (.elementor-tabs) rendered with pure React state.
 */
export function ServicesElementorTabs({
  node,
  renderNodes,
}: {
  node: ServiceElementorTabsNode;
  renderNodes: RenderNodesFn;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  if (!node.items.length) return null;

  return (
    <div className={node.className || 'elementor-tabs'}>
      <div className="elementor-tabs-wrapper" role="tablist">
        {node.items.map((tab, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={idx}
              role="tab"
              tabIndex={0}
              aria-selected={isActive}
              aria-expanded={isActive}
              data-tab={idx + 1}
              className={`elementor-tab-title elementor-tab-desktop-title ${
                isActive ? 'elementor-active' : ''
              }`}
              onClick={() => setActiveIdx(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIdx(idx);
                }
              }}
            >
              {tab.title}
            </div>
          );
        })}
      </div>
      <div className="elementor-tabs-content-wrapper">
        {node.items.map((tab, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={idx}
              role="tabpanel"
              data-tab={idx + 1}
              className={`elementor-tab-content elementor-clearfix ${
                isActive ? 'elementor-active is-open' : ''
              }`}
              style={{ display: isActive ? 'block' : 'none' }}
            >
              {renderNodes(tab.content)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
