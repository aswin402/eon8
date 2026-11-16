import { createElement, Fragment, type ReactNode } from 'react';
import type { ServiceElementProps, ServiceNode } from '../types';
import { ServicesFormWidget } from './ServicesFormWidget';
import {
  ServicesBootstrapAccordion,
  ServicesCustomFaqItem,
  ServicesElementorAccordion,
  ServicesLegacyFaqItem,
} from './ServicesAccordions';
import {
  ServicesCardsCarousel,
  ServicesLogoMarquee,
  ServicesTestimonialQuotes,
} from './ServicesCarousels';
import { ServicesSmartLink } from './ServicesSmartLink';

const VOID_TAGS = new Set(['img', 'br', 'hr', 'source']);

function buildDomProps(props?: ServiceElementProps): Record<string, unknown> {
  if (!props) return {};
  const out: Record<string, unknown> = {};

  if (props.id) out.id = props.id;
  if (props.className) out.className = props.className;
  if (props.style) out.style = props.style;
  if (props.src) out.src = props.src;
  if (props.alt !== undefined) out.alt = props.alt;
  if (props.title) out.title = props.title;
  if (props.width !== undefined) out.width = props.width;
  if (props.height !== undefined) out.height = props.height;
  if (props.loading) out.loading = props.loading;
  if (props.decoding) out.decoding = props.decoding;
  if (props.type) out.type = props.type;
  if (props.role) out.role = props.role;
  if (props.ariaLabel) out['aria-label'] = props.ariaLabel;
  if (props.ariaHidden !== undefined) out['aria-hidden'] = props.ariaHidden;
  if (props.colSpan !== undefined) out.colSpan = props.colSpan;
  if (props.rowSpan !== undefined) out.rowSpan = props.rowSpan;
  if (props.autoPlay) out.autoPlay = true;
  if (props.loop) out.loop = true;
  if (props.muted) out.muted = true;
  if (props.playsInline) out.playsInline = true;

  // SVG attributes
  if (props.xmlns) out.xmlns = props.xmlns;
  if (props.viewBox) out.viewBox = props.viewBox;
  if (props.fill) out.fill = props.fill;
  if (props.fillRule) out.fillRule = props.fillRule;
  if (props.clipRule) out.clipRule = props.clipRule;
  if (props.stroke) out.stroke = props.stroke;
  if (props.strokeWidth !== undefined) out.strokeWidth = props.strokeWidth;
  if (props.strokeLinecap) out.strokeLinecap = props.strokeLinecap;
  if (props.strokeLinejoin) out.strokeLinejoin = props.strokeLinejoin;
  if (props.d) out.d = props.d;
  if (props.cx !== undefined) out.cx = props.cx;
  if (props.cy !== undefined) out.cy = props.cy;
  if (props.r !== undefined) out.r = props.r;
  if (props.x !== undefined) out.x = props.x;
  if (props.y !== undefined) out.y = props.y;
  if (props.rx !== undefined) out.rx = props.rx;
  if (props.ry !== undefined) out.ry = props.ry;

  // Scoped Elementor selector attributes
  if (props.dataElementorType) out['data-elementor-type'] = props.dataElementorType;
  if (props.dataElementorId) out['data-elementor-id'] = props.dataElementorId;
  if (props.dataElementType) out['data-element_type'] = props.dataElementType;
  if (props.dataWidgetType) out['data-widget_type'] = props.dataWidgetType;
  if (props.dataId) out['data-id'] = props.dataId;

  return out;
}

function renderServiceNodes(nodes?: ServiceNode[]): ReactNode {
  if (!nodes || nodes.length === 0) return null;
  return nodes.map((node, index) => (
    <ServiceNodeView key={index} node={node} />
  ));
}

export function ServiceNodeList({ nodes }: { nodes?: ServiceNode[] }) {
  return <>{renderServiceNodes(nodes)}</>;
}

export function ServiceNodeView({ node }: { node: ServiceNode }) {
  switch (node.kind) {
    case 'text':
      return <Fragment>{node.value}</Fragment>;

    case 'form':
      return <ServicesFormWidget node={node} />;

    case 'elementor-accordion':
      return (
        <ServicesElementorAccordion
          node={node}
          renderNodes={renderServiceNodes}
        />
      );

    case 'bootstrap-accordion':
      return (
        <ServicesBootstrapAccordion
          node={node}
          renderNodes={renderServiceNodes}
        />
      );

    case 'custom-faq-item':
      return (
        <ServicesCustomFaqItem
          node={node}
          renderNodes={renderServiceNodes}
        />
      );

    case 'legacy-faq-item':
      return (
        <ServicesLegacyFaqItem
          node={node}
          renderNodes={renderServiceNodes}
        />
      );

    case 'testimonial-quotes':
      return <ServicesTestimonialQuotes node={node} />;

    case 'cards-carousel':
      return <ServicesCardsCarousel node={node} />;

    case 'logo-marquee':
      return <ServicesLogoMarquee node={node} />;

    case 'counter': {
      const CounterTag = node.tag;
      return (
        <CounterTag {...buildDomProps(node.props)}>
          {node.displayValue}
        </CounterTag>
      );
    }

    case 'element': {
      if (node.tag === 'a') {
        return (
          <ServicesSmartLink
            id={node.props?.id}
            className={node.props?.className}
            style={node.props?.style}
            href={node.props?.href}
            target={node.props?.target}
            rel={node.props?.rel}
            title={node.props?.title}
            role={node.props?.role}
            ariaLabel={node.props?.ariaLabel}
          >
            {renderServiceNodes(node.children)}
          </ServicesSmartLink>
        );
      }

      const domProps = buildDomProps(node.props);
      if (VOID_TAGS.has(node.tag)) {
        return createElement(node.tag, domProps);
      }

      const element = createElement(
        node.tag,
        domProps,
        renderServiceNodes(node.children)
      );

      if (node.tag === 'table') {
        return <div className="services-table-scroll">{element}</div>;
      }

      return element;
    }
  }
}
