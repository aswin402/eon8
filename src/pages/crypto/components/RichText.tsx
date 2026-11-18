import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import type { RichNode } from '../types';

export function HeadingLines({
  lines,
  spanClassName,
}: {
  lines: string[];
  spanClassName?: string;
}) {
  return (
    <>
      {lines.map((line, idx) => (
        <Fragment key={idx}>
          {idx > 0 ? ' ' : null}
          {spanClassName ? <span className={spanClassName}>{line}</span> : line}
        </Fragment>
      ))}
    </>
  );
}

interface RichTextProps {
  nodes: RichNode[];
  tone?: 'default' | 'on-dark';
}

export function RichText({ nodes, tone = 'default' }: RichTextProps) {
  const linkCls =
    tone === 'on-dark'
      ? 'font-semibold text-amber-300 hover:text-white underline transition-colors'
      : 'font-semibold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] underline transition-colors';

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
              <Link key={idx} to={node.href} className={linkCls}>
                {node.strong ? <strong>{content}</strong> : content}
              </Link>
            );
          }
          return (
            <a
              key={idx}
              href={node.href}
              className={linkCls}
              target={node.href.startsWith('http') ? '_blank' : undefined}
              rel={node.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {node.strong ? <strong>{content}</strong> : content}
            </a>
          );
        }
        if (node.strong) {
          return (
            <strong key={idx} className="font-bold">
              {content}
            </strong>
          );
        }
        if (node.em) {
          return (
            <em key={idx} className="italic">
              {content}
            </em>
          );
        }
        if (node.accent) {
          return (
            <span key={idx} className="text-[#FD5900] font-semibold">
              {content}
            </span>
          );
        }
        return <Fragment key={idx}>{content}</Fragment>;
      })}
    </>
  );
}
