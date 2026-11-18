import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PageSeo, ServiceHeroSection } from '@/components/sections';
import {
  policyPagesData,
  type PolicyBlock,
  type PolicyInlineNode,
} from './policyPagesData';

interface PolicyPageProps {
  slug: string;
}

function renderInlineNodes(nodes: PolicyInlineNode[]) {
  return nodes.map((node, idx) => {
    if (typeof node === 'string') {
      return <Fragment key={idx}>{node}</Fragment>;
    }
    if (node.type === 'br') {
      return <br key={idx} />;
    }
    if (node.type === 'strong') {
      return (
        <strong key={idx} className="font-bold text-foreground">
          {node.text}
        </strong>
      );
    }
    if (node.type === 'italic') {
      return (
        <em key={idx} className="italic">
          {node.text}
        </em>
      );
    }
    if (node.type === 'link') {
      const linkCls =
        'font-semibold text-[#0053C6] dark:text-sky-400 hover:text-[#FD5900] underline transition-colors';
      if (node.href.startsWith('/') && !node.external) {
        return (
          <Link key={idx} to={node.href} className={linkCls}>
            {node.text}
          </Link>
        );
      }
      return (
        <a
          key={idx}
          href={node.href}
          target={node.external ? '_blank' : undefined}
          rel={node.external ? 'noopener noreferrer' : undefined}
          className={linkCls}
        >
          {node.text}
        </a>
      );
    }
    return null;
  });
}

function renderBlocks(blocks: PolicyBlock[]) {
  return blocks.map((block, idx) => {
    if (block.type === 'h2') {
      return (
        <h2
          key={idx}
          className="text-xl sm:text-2xl font-heading font-extrabold text-foreground mt-8 mb-3"
        >
          {block.text}
        </h2>
      );
    }
    if (block.type === 'h3') {
      return (
        <h3
          key={idx}
          className="text-lg sm:text-xl font-heading font-bold text-foreground mt-6 mb-2.5"
        >
          {block.text}
        </h3>
      );
    }
    if (block.type === 'p') {
      return (
        <p key={idx} className="text-[15.5px] sm:text-base text-muted-foreground leading-relaxed mb-4">
          {renderInlineNodes(block.children)}
        </p>
      );
    }
    if (block.type === 'ul') {
      return (
        <ul key={idx} className="list-disc pl-6 space-y-2 mb-5 text-[15.5px] text-muted-foreground">
          {block.items.map((item, itemIdx) => (
            <li key={itemIdx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    if (block.type === 'security-group') {
      return (
        <div
          key={idx}
          className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-xs mb-6"
        >
          {block.heading && (
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground mb-4">
              {block.heading}
            </h2>
          )}
          {renderBlocks(block.blocks)}
        </div>
      );
    }
    return null;
  });
}

export function PolicyPage({ slug }: PolicyPageProps) {
  const data = policyPagesData[slug];

  if (!data) {
    return (
      <div className="min-h-[65vh] pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
          Policy Page Not Found
        </h1>
        <Link to="/" className="text-[#FD5900] hover:underline font-bold">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <PageSeo title={data.metaTitle} description={data.metaDesc} />

      <ServiceHeroSection
        theme="brand"
        layout="centered"
        badge="Legal & Compliance"
        heading={data.title}
      />

      <section className="py-14 sm:py-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {data.layout === 'privacy-standard' && data.blocks && (
            <article className="rounded-2xl bg-card border border-border p-6 sm:p-10 shadow-sm">
              {renderBlocks(data.blocks)}
            </article>
          )}

          {data.layout === 'security-blocks' && data.blocks && (
            <article className="space-y-6">{renderBlocks(data.blocks)}</article>
          )}

          {data.layout === 'split-delivery' && data.delivery && (
            <article className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-sm">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {data.delivery.intro}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
                    {data.delivery.immediateHeading}
                  </h2>
                  <p className="text-base font-semibold text-[#0053C6] dark:text-sky-400">
                    {data.delivery.immediateLead}
                  </p>
                  <p className="text-[15.5px] text-muted-foreground leading-relaxed">
                    {renderInlineNodes(data.delivery.immediateBody)}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <img
                    src={data.delivery.image.src}
                    alt={data.delivery.image.alt}
                    className="w-full h-auto rounded-2xl object-cover border border-border shadow-md"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
                  {data.delivery.webDesignHeading}
                </h2>
                {data.delivery.webDesignParagraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[15.5px] sm:text-base text-muted-foreground leading-relaxed"
                  >
                    {renderInlineNodes(para)}
                  </p>
                ))}
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}

export default PolicyPage;
