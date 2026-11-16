import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  policyPagesData,
  type PolicyBlock,
  type PolicyInlineNode,
} from './policyPagesData';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/policy-pages.css';

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
      return <strong key={idx}>{node.text}</strong>;
    }
    if (node.type === 'italic') {
      return <i key={idx}>{node.text}</i>;
    }
    if (node.type === 'link') {
      if (node.href.startsWith('/') && !node.external) {
        return (
          <Link key={idx} to={node.href}>
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
      return <h2 key={idx}>{block.text}</h2>;
    }
    if (block.type === 'h3') {
      return <h3 key={idx}>{block.text}</h3>;
    }
    if (block.type === 'p') {
      return <p key={idx}>{renderInlineNodes(block.children)}</p>;
    }
    if (block.type === 'ul') {
      return (
        <ul key={idx}>
          {block.items.map((item, itemIdx) => (
            <li key={itemIdx}>{item}</li>
          ))}
        </ul>
      );
    }
    if (block.type === 'security-group') {
      return (
        <div key={idx} className="security-content">
          {block.heading && <h3>{block.heading}</h3>}
          {renderBlocks(block.blocks)}
        </div>
      );
    }
    return null;
  });
}

export function PolicyPage({ slug }: PolicyPageProps) {
  const data = policyPagesData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      document.title = data.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.metaDesc);
      }
    }
  }, [slug, data]);

  if (!data) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
          Policy Page Not Found
        </h1>
        <Link to="/" className="text-[#FD5900] hover:underline font-medium">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="eon8-live-page policy-page-scope">
      <div id="site-content">
        <main>
          <header className="page_title_wrap">
            <div className="container">
              <h1 className="page_title">{data.title}</h1>
            </div>
          </header>

          <article
            id={`page-${data.pageId}`}
            className={`post-${data.pageId} page type-page status-publish hentry`}
          >
            {data.layout === 'privacy-standard' && data.blocks && (
              <div className="page-content container">
                <section className="policy-standard-section">
                  {renderBlocks(data.blocks)}
                </section>
              </div>
            )}

            {data.layout === 'security-blocks' && data.blocks && (
              <div className="page-content container policy-security-wrap">
                {renderBlocks(data.blocks)}
              </div>
            )}

            {data.layout === 'elementor-delivery' && data.delivery && (
              <div className="page-content container">
                <div className="elementor elementor-41615 policy-delivery-box">
                  <div className="policy-spacer-50" aria-hidden="true" />

                  <div className="policy-delivery-grid">
                    <div>
                      <p>{data.delivery.intro}</p>
                      <h3 className="delivery-policy-heading">
                        {data.delivery.immediateHeading}
                      </h3>
                      <p className="delivery-policy-lead">
                        {data.delivery.immediateLead}
                      </p>
                      <p>{renderInlineNodes(data.delivery.immediateBody)}</p>
                    </div>

                    <div>
                      <img
                        src={data.delivery.image.src}
                        srcSet={data.delivery.image.srcSet}
                        sizes={data.delivery.image.sizes}
                        width={data.delivery.image.width}
                        height={data.delivery.image.height}
                        alt={data.delivery.image.alt}
                        className="delivery-policy-img"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="security-content delivery-policy-subhead">
                      {data.delivery.webDesignHeading}
                    </div>
                    <div className="security-content">
                      {data.delivery.webDesignParagraphs.map((para, pIdx) => (
                        <p key={pIdx}>{renderInlineNodes(para)}</p>
                      ))}
                    </div>
                  </div>

                  <div className="policy-spacer-50" aria-hidden="true" />
                </div>
              </div>
            )}
          </article>
        </main>
      </div>
    </div>
  );
}
