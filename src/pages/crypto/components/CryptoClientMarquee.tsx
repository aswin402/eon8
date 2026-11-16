import type { ClientLogoItem } from '../types';

interface CryptoClientMarqueeProps {
  heading: string;
  logos: ClientLogoItem[];
  variant?: 'nft-slider' | 'client-slider-section';
}

export function CryptoClientMarquee({
  heading,
  logos,
  variant = 'nft-slider',
}: CryptoClientMarqueeProps) {
  if (!logos.length) return null;

  if (variant === 'client-slider-section') {
    const repeatedLogos = [...logos, ...logos];
    return (
      <section className="client-slider-section">
        <div className="container text-center">
          <h2>{heading}</h2>
          <div className="logo-slider">
            <div className="logo-slide-track">
              {repeatedLogos.map((logo, idx) => (
                <div className="slide" key={`${logo.src}-${idx}`}>
                  <img src={logo.src} alt={logo.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="slider" id="nft-client-slider">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="reveal">
              <span className="to">{heading}</span>
            </h2>
          </div>
          <div className="logo-slider reveal">
            <div className="logo-slide-track">
              {logos.map((logo, idx) => (
                <div className="slide" key={`${logo.src}-${idx}`}>
                  <img
                    alt={logo.name}
                    className="img-fluid"
                    src={logo.src}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
