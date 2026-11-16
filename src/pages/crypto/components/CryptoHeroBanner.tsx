import type { HeroBannerConfig } from '../types';
import { CryptoActionLink } from './CryptoActionLink';
import { CryptoServiceLeadForm } from './CryptoForms';
import { HeadingLines, RichText } from './RichText';

interface CryptoHeroBannerProps {
  hero: HeroBannerConfig;
}

export function CryptoHeroBanner({ hero }: CryptoHeroBannerProps) {
  const midpoint = Math.ceil(hero.bullets.length / 2);
  const leftBullets = hero.bullets.slice(0, midpoint);
  const rightBullets = hero.bullets.slice(midpoint);

  return (
    <section className="banner_inr banner-inr-digital" id="enquiry-top">
      <div className="container">
        <div className="col-md-6">
          <div className="ba_inr_cnt">
            <h1 className="reveal reveal-up">
              <HeadingLines lines={hero.headingLines} />
            </h1>
            {hero.paragraphs.map((nodes, idx) => (
              <p className="reveal" key={idx}>
                <RichText nodes={nodes} />
              </p>
            ))}

            {hero.bullets.length > 0 && (
              <div className="row list-nft">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <ul>
                      {leftBullets.map((item, idx) => (
                        <li key={idx}>
                          <i aria-hidden="true" className="fa fa-check-circle" />
                          <RichText nodes={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <ul>
                      {rightBullets.map((item, idx) => (
                        <li key={idx}>
                          <i aria-hidden="true" className="fa fa-check-circle" />
                          <RichText nodes={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {hero.ctas.length > 0 && (
              <div className="bannft-btn">
                {hero.ctas.map((cta, idx) => (
                  <CryptoActionLink action={cta} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6 text-center">
          <div className="right-ban-img ba_inr_cnt">
            <CryptoServiceLeadForm heading={hero.formHeading} />
          </div>
        </div>
      </div>
    </section>
  );
}
