import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/ai-core-blog-pages.css';

const ACCORDION_PANELS = [
  {
    id: 'collapseOne',
    title: 'Our History',
    content: 'Started in 2012 and scaled to 1000+ projects.',
  },
  {
    id: 'collapseTwo',
    title: 'Our Mission',
    content: 'Deliver strategies that drive business growth.',
  },
  {
    id: 'collapseThree',
    title: 'Our Vision',
    content: 'Become global leaders in Web3 marketing.',
  },
];

const TOP_ROW_OPERATE = [
  {
    title: 'Learn',
    desc: 'We analyze your project thoroughly down to the last molecule to understand your unique requirement.',
    icon: '/wp-content/themes/eon8/assets/svg/social-media-3.svg',
  },
  {
    title: 'Strategize',
    desc: 'Based on the inputs from our analysis, our Web 3.0 team will create the most relevant and effective marketing strategy.',
    icon: '/wp-content/themes/eon8/assets/svg/presentation.svg',
  },
  {
    title: 'Align',
    desc: 'A fundamental exo-framework will be developed to implement the created strategy with disruptive efficiency.',
    icon: '/wp-content/themes/eon8/assets/svg/content.svg',
  },
];

const BOTTOM_ROW_OPERATE = [
  {
    title: 'Deploy',
    desc: 'The team rapidly jumps into execution without wasting a microsecond and manages the project impressively.',
    icon: '/wp-content/themes/eon8/assets/svg/amazon.svg',
  },
  {
    title: 'Iterate',
    desc: 'We learn from every output gained from the campaign and quickly apply an upgraded solution to maximize the impact.',
    icon: '/wp-content/themes/eon8/assets/svg/technology.svg',
  },
];

export function AboutPage() {
  const { setContactModalOpen } = useAppStore();
  const [openPanelId, setOpenPanelId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Eon8 Digital Marketing Agency';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'At Eon8 you can get 360-degree Digital Marketing solution and online marketing services for Web 2.0, Web 3.0, and AI brands.'
      );
    }
  }, []);

  return (
    <div className="eon8-live-page about-page-scope">
      <div id="site-content">
        <header className="custom-page-header">
          <div className="container text-center">
            <h1 className="page-title" style={{ color: '#fff' }}>
              About Us
            </h1>
          </div>
        </header>

        <section className="web3-about sec-spacer" id="rs-about">
          <div className="container">
            <div className="row align-center">
              <div className="col-lg-7 col-md-7 col-sm-12 pr-md-65">
                <div className="section-header">
                  <h2 className="reveal active">
                    <span className="to">Why Do We Dominate The Web 3.0 Space?</span>
                  </h2>
                </div>
                <p className="section-desc reveal active">
                  EON8 leads the transition from Web 2.0 to Web 3.0 by building the strategic foundation that positions brands at the top.
                </p>
                <p
                  className="reveal active"
                  style={{ fontWeight: 600, color: '#222', marginBottom: 18 }}
                >
                  We challenge marketing norms and create new growth opportunities.
                </p>

                <div className="custom-accordion panel-group reveal active" id="accordion">
                  {ACCORDION_PANELS.map((panel) => {
                    const isOpen = openPanelId === panel.id;
                    return (
                      <div key={panel.id} className="panel custom-panel">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              href={`#${panel.id}`}
                              aria-expanded={isOpen}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenPanelId(isOpen ? null : panel.id);
                              }}
                            >
                              {panel.title}
                            </a>
                          </h4>
                        </div>
                        {isOpen && (
                          <div className="panel-collapse" id={panel.id}>
                            <div className="panel-body">{panel.content}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-12">
                <div className="about-img">
                  <img
                    alt="EON8 Headquarters"
                    src="/wp-content/themes/eon8/assets/img/eon-softtech_2.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="welcome-seo-ninja sec-spacer" id="welcome-seo-ninja">
          <div className="container">
            <div className="sec-title text-center" style={{ marginBottom: 32 }}>
              <h2 className="reveal">
                <span className="to">How Do We Operate?</span>
              </h2>
              <h4
                className="subtitle reveal"
                style={{ maxWidth: 780, margin: '14px auto 0', color: '#4b5563', lineHeight: 1.6 }}
              >
                EON8 has over 18 years of experience in preparing Web 3.0 brands for unprecedented success, while ensuring 57% ROMI.
              </h4>
            </div>

            <div className="row">
              {TOP_ROW_OPERATE.map((step) => (
                <div key={step.title} className="col-md-4 col-sm-6 text-center">
                  <div className="items" style={{ height: '100%' }}>
                    <div className="ab_serv_icon">
                      <img alt={step.title} src={step.icon} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}

              {BOTTOM_ROW_OPERATE.map((step) => (
                <div
                  key={step.title}
                  className="col-md-6 col-sm-6 text-center"
                  style={{ marginTop: 20 }}
                >
                  <div className="items" style={{ height: '100%' }}>
                    <div className="ab_serv_icon">
                      <img alt={step.title} src={step.icon} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grey_bg" id="abt_testi">
          <div className="container">
            <div className="sec-title text-center" style={{ marginBottom: 36 }}>
              <h2 className="reveal">
                <span className="to">What Our Clients Say</span>
              </h2>
            </div>
          </div>

          <div className="container testi_wrap">
            <div className="row">
              <div className="col-md-3 col-sm-3 col-xs-12">
                <img
                  alt="Jullian Edisa"
                  src="/wp-content/themes/eon8/assets/img/Jullian-Edisa.jpg"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <div className="col-md-9 col-sm-9 col-xs-12">
                <div className="abt_t_cnt" style={{ padding: '24px 28px' }}>
                  <h3>Jullian Edisa</h3>
                  <h5>Supervisor</h5>
                  <p>
                    EON8 has made a big difference to our brand with their excellent work and knowledge of Digital marketing techniques. Our brand awareness grew, the search engine rankings of our website are made better and eventually, our sales had gone high. Overall EON8 is a reliable and friendly firm to connect with for Digital marketing needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container testi_wrap is-reversed">
            <div className="row">
              <div className="col-md-3 col-sm-3 col-xs-12">
                <img
                  alt="Aaron P"
                  src="/wp-content/themes/eon8/assets/img/testi_1.jpg"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <div className="col-md-9 col-sm-9 col-xs-12 pull-left">
                <div className="abt_t_cnt" style={{ padding: '24px 28px' }}>
                  <h3>Aaron P</h3>
                  <h5>Supervisor</h5>
                  <p>
                    EON8 did a wonderful job handling the design of our website. The team made sure to give extraordinary results as I’ve imagined and made my website more user-friendly for my visitors. I would recommend EON8 Digital Marketing company for anyone who looks to build their brand online or just in need of any digital marketing service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="get_traffic">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="cta-content text-center">
                  <h3>
                    Let’s Make Your Brand
                    <br />
                    The Next Big Web 3.0 Phenomenon!
                  </h3>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                <button
                  type="button"
                  className="dt-eon-btn"
                  onClick={() => setContactModalOpen(true)}
                >
                  <span>Talk with our Experts</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
