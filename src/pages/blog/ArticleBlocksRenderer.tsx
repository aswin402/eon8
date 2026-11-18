import { useState } from 'react';
import { SmartActionButton } from '@/components/sections';
import { RichText } from '@/pages/crypto/components/RichText';
import type { ArticleBlock } from './blogPostsData';

function ArticleFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return null;

  return (
    <figure className="my-7 space-y-2">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-auto rounded-2xl border border-border shadow-sm mx-auto"
      />
      {caption && (
        <figcaption className="text-center text-xs text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderSingleBlock(block: ArticleBlock, idx: number) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl font-heading font-extrabold text-foreground mt-8 mb-3.5 leading-snug"
          >
            {block.text}
          </h2>
        );
      }
      if (block.level === 3) {
        return (
          <h3
            key={idx}
            className="text-lg sm:text-xl font-heading font-bold text-foreground mt-6 mb-2.5 leading-snug"
          >
            {block.text}
          </h3>
        );
      }
      return (
        <h4
          key={idx}
          className="text-base sm:text-lg font-heading font-bold text-foreground mt-5 mb-2"
        >
          {block.text}
        </h4>
      );

    case 'paragraph':
      return (
        <p
          key={idx}
          className="text-[16px] sm:text-[17px] text-muted-foreground leading-[1.8] mb-5"
        >
          <RichText nodes={block.content} />
        </p>
      );

    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag
          key={idx}
          className={`${
            block.ordered ? 'list-decimal' : 'list-disc'
          } pl-6 space-y-2.5 mb-6 text-[16px] text-muted-foreground`}
        >
          {block.items.map((item, iIdx) => (
            <li key={iIdx} className="leading-[1.75]">
              <RichText nodes={item} />
            </li>
          ))}
        </ListTag>
      );
    }

    case 'image':
      return (
        <ArticleFigure
          key={idx}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
        />
      );

    case 'blockquote':
      return (
        <blockquote
          key={idx}
          className="my-6 border-l-4 border-[#FD5900] bg-orange-500/[0.06] rounded-r-2xl py-4 px-6 italic text-foreground text-base leading-relaxed"
        >
          <RichText nodes={block.content} />
        </blockquote>
      );

    case 'table':
      return (
        <div
          key={idx}
          className="my-7 rounded-2xl border border-border bg-card overflow-x-auto shadow-xs"
        >
          <table className="w-full min-w-[520px] border-collapse text-left">
            {block.headers.length > 0 && (
              <thead>
                <tr className="bg-slate-900 text-white">
                  {block.headers.map((h, hIdx) => (
                    <th key={hIdx} className="py-3.5 px-5 text-sm font-heading font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-border">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-3 px-5 text-sm text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'cta':
      return (
        <div key={idx} className="my-6">
          <SmartActionButton
            action={{
              label: block.label,
              href: block.href,
              external: block.href.startsWith('http'),
              variant: 'primary',
            }}
          />
        </div>
      );

    default:
      return null;
  }
}

export function ArticleBlocksRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  return <>{blocks.map((block, idx) => renderSingleBlock(block, idx))}</>;
}
