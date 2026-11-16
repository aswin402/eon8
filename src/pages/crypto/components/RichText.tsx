import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import type { RichNode } from '../types';

export function HeadingLines({
  lines,
  spanClassName = 'to',
}: {
  lines: string[];
  spanClassName?: string;
}) {
  return (
    <>
      {lines.map((line, idx) => (
        <Fragment key={idx}>
          {idx > 0 ? ' ' : null}
          <span className={spanClassName}>{line}</span>
        </Fragment>
      ))}
    </>
  );
}

interface RichTextProps {
  nodes: RichNode[];
}

/** Render structured rich text segments as native React JSX without dangerouslySetInnerHTML. */
export function RichText({ nodes }: RichTextProps) {
  return (
    <>
      {nodes.map((node, idx) => {
        if (typeof node === 'string') {
          return <Fragment key={idx}>{node}</Fragment>;
        }
        if (node.br) {
          return <br key={idx} />;
        }
        const content = node.text ?? '';
        if (node.href) {
          const isInternal = node.href.startsWith('/') && !node.href.startsWith('//');
          if (isInternal) {
            return (
              <Link key={idx} to={node.href} className={node.className}>
                {node.strong ? <strong>{content}</strong> : content}
              </Link>
            );
          }
          return (
            <a
              key={idx}
              href={node.href}
              className={node.className}
              target={node.href.startsWith('http') ? '_blank' : undefined}
              rel={node.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {node.strong ? <strong>{content}</strong> : content}
            </a>
          );
        }
        if (node.strong) {
          return (
            <strong key={idx} className={node.className}>
              {content}
            </strong>
          );
        }
        if (node.em) {
          return (
            <em key={idx} className={node.className}>
              {content}
            </em>
          );
        }
        if (node.accent || node.className) {
          return (
            <span key={idx} className={node.className || 'text-[#f58220]'}>
              {content}
            </span>
          );
        }
        return <Fragment key={idx}>{content}</Fragment>;
      })}
    </>
  );
}
