import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { NftCalendlyWidget } from '@/pages/nft/components/NftCalendlyWidget';
import '@/styles/legacy-eon8.css';
import '@/styles/legacy-responsive-fixes.css';
import '@/styles/ai-core-blog-pages.css';

const BUSINESS_CARDS = [
  {
    img: '/wp-content/uploads/2022/07/brand.png',
    alt: 'Cost Effective',
    title: '1. Cost-Effective Automation',
    desc: 'AI agents significantly reduce human intervention, helping businesses save time and operational costs while maintaining high accuracy and efficiency.',
  },
  {
    img: '/wp-content/uploads/2022/07/community-moderation.png',
    alt: 'Customer Support',
    title: '2. Real-Time Customer Support',
    desc: 'Deploy personalised AI agents as virtual assistants that handle queries, process orders, provide recommendations, and offer support 24/7.',
  },
  {
    img: '/wp-content/uploads/2022/07/connections.png',
    alt: 'Scalable Intelligence',
    title: '3. Scalable Intelligence',
    desc: 'Our customizable AI agent services allow you to scale from simple use cases to complex, multi-functional systems without starting from scratch.',
  },
  {
    img: '/wp-content/uploads/2022/07/discord-classic.png',
    alt: 'Data Driven',
    title: '4. Data-Driven Decisions',
    desc: 'AI agents gather and analyze data continuously, enabling intelligent decision-making and predictive analytics to keep you proactive.',
  },
  {
    img: '/wp-content/uploads/2022/07/discord-nitro.png',
    alt: 'Omnichannel',
    title: '5. Omnichannel Integration',
    desc: 'Seamlessly integrate AI agents across websites, mobile apps, CRMs, help desks, and social media for a consistent customer experience.',
  },
];

const SERVICES_CARDS = [
  {
    title: '1. Customizable AI Agent Service',
    desc: 'Our AI agents operate independently, making real-time decisions based on predefined rules, data-driven insights, and advanced algorithms — streamlining workflows and improving efficiency.',
    label: 'Features include:',
    items: [
      'Task-specific design (sales, support, automation)',
      'Multi-language processing',
      'Natural Language Processing (NLP)',
      'Integration with existing systems (APIs, CRMs, ERPs)',
    ],
  },
  {
    title: '2. Personalised AI Agents',
    desc: "Our Personalised AI Agents are trained on contextual and behavioral data, offering hyper-personalized interactions based on your customer's preferences, history, and needs.",
    label: 'Key benefits:',
    items: [
      'Enhanced user experience',
      'Personalized product recommendations',
      'Intelligent sentiment analysis',
      'Real-time adaptability',
    ],
  },
  {
    title: '3. AI Chatbot & Voice Agent Development',
    desc: 'Deploy conversational AI agents across text or voice platforms like WhatsApp, Telegram, Facebook Messenger, Alexa, and Google Assistant.',
    label: 'Capabilities:',
    items: [
      'Human-like conversation handling',
      'Sentiment and emotion detection',
      'Multilingual responses',
      'Voice-to-text NLP interpretation',
    ],
  },
  {
    title: '4. Domain-Specific AI Agents',
    desc: 'From healthcare bots to financial advisors and e-commerce assistants, we build AI agents that solve niche industry problems with domain knowledge and pre-trained data models.',
    label: 'Examples:',
    items: [
      'AI-powered HR agents for recruitment',
      'AI finance bots for investment analysis',
      'AI agents for supply chain management',
    ],
  },
];

const PROCESS_STEPS = [
  {
    img: '/wp-content/uploads/2022/07/server-setup-discord.svg',
    alt: 'Requirement Analysis',
    title: 'Requirement Analysis',
    desc: 'Understand your business goals and processes',
  },
  {
    img: '/wp-content/uploads/2022/07/channel-creation-discord.svg',
    alt: 'AI Strategy Planning',
    title: 'AI Strategy Planning',
    desc: 'Define the scope, features, and integrations',
  },
  {
    img: '/wp-content/uploads/2022/07/bot-discord.svg',
    alt: 'Model Selection',
    title: 'Model Selection & Training',
    desc: 'Choose suitable AI/ML models and train them',
  },
  {
    img: '/wp-content/uploads/2022/07/moderation-disccord.svg',
    alt: 'UI/UX Design',
    title: 'Custom UI/UX Design',
    desc: 'Create interfaces aligned with your brand',
  },
  {
    img: '/wp-content/uploads/2022/07/assigning-discord.svg',
    alt: 'Deployment',
    title: 'Deployment',
    desc: 'Seamlessly integrate with your systems',
  },
  {
    img: '/wp-content/uploads/2022/07/invite-discord.svg',
    alt: 'Monitoring',
    title: 'Monitoring & Maintenance',
    desc: 'Continuously optimize performance',
  },
];

const TECH_CATEGORIES = [
  {
    title: 'Programming',
    items: [
      { name: 'Python', src: '/wp-content/uploads/2025/08/Python.png' },
      { name: 'JavaScript', src: '/wp-content/uploads/2025/08/JavaScript.png' },
      { name: 'Node.js', src: '/wp-content/uploads/2025/08/Node.js.png' },
    ],
  },
  {
    title: 'AI Frameworks',
    items: [
      { name: 'TensorFlow', src: '/wp-content/uploads/2025/08/TensorFlow.png' },
      { name: 'PyTorch', src: '/wp-content/uploads/2025/08/PyTorch.png' },
      { name: 'OpenAI API', src: '/wp-content/uploads/2025/08/OpenAI API.png' },
      { name: 'Dialogflow', src: '/wp-content/uploads/2025/08/Dialogflow.png' },
    ],
  },
  {
    title: 'NLP Engines',
    items: [
      { name: 'Google BERT', src: '/wp-content/uploads/2025/08/Google BERT.png' },
      { name: 'OpenAI GPT', src: '/wp-content/uploads/2025/08/OpenAI GPT.png' },
      { name: 'SpaCy', src: '/wp-content/uploads/2025/08/SpaCy.png' },
    ],
  },
  {
    title: 'Cloud Platforms',
    items: [
      { name: 'AWS', src: '/wp-content/uploads/2025/08/AWS.png' },
      { name: 'Azure', src: '/wp-content/uploads/2025/08/Azure.png' },
      { name: 'GCP', src: '/wp-content/uploads/2025/08/GCP.png' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'MongoDB', src: '/wp-content/uploads/2025/08/MongoDB.png' },
      { name: 'PostgreSQL', src: '/wp-content/uploads/2025/08/PostgreSQL.png' },
      { name: 'MySQL', src: '/wp-content/uploads/2025/08/MySQL.png' },
    ],
  },
  {
    title: 'Integration Tools',
    items: [
      { name: 'Zapier', src: '/wp-content/uploads/2025/08/Zapier.png' },
      { name: 'API Gateways', src: '/wp-content/uploads/2025/08/API Gateways.png' },
      { name: 'Webhooks', src: '/wp-content/uploads/2025/08/Webhooks.png' },
    ],
  },
];

const CHOOSE_ITEMS = [
  { icon: 'fa-solid fa-sliders', text: '100% tailored AI solutions' },
  { icon: 'fa-solid fa-chart-line', text: 'Business-focused, ROI-driven development' },
  { icon: 'fa-solid fa-expand', text: 'Scalable architecture for growing businesses' },
  { icon: 'fa-solid fa-tags', text: 'Transparent pricing and milestone tracking' },
  { icon: 'fa-solid fa-headset', text: 'Round-the-clock support and maintenance' },
  { icon: 'fa-solid fa-bolt', text: 'Fast turnaround time' },
];

const FAQ_ITEMS = [
  {
    q: 'Can AI agents be integrated into legacy systems?',
    a: 'Absolutely. Our agents are API-compatible and can be connected with existing ERPs, CRMs, and databases.',
  },
  {
    q: 'What industries benefit most from AI agent development services?',
    a: 'Virtually every industry — retail, healthcare, finance, education, travel, and logistics — can benefit from AI agents.',
  },
  {
    q: 'How long does it take to build a customized AI agent?',
    a: 'Typically 3 to 6 weeks, depending on complexity and integrations required.',
  },
  {
    q: 'Is my data safe?',
    a: 'We follow strict security protocols including encryption, access control, and GDPR compliance.',
  },
];

export function AIAgentPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'AI Agent Development Services for Business Growth';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Get advanced AI agent development services tailored to your business. Build scalable, personalised AI agents to automate workflows and boost growth.'
      );
    }
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || phone.trim().length < 5) {
      setStatus({ type: 'error', text: 'Please enter your name, valid email, and mobile number.' });
      return;
    }
    setStatus({
      type: 'success',
      text: 'Thank you! Our AI Agent engineering team will reach out shortly.',
    });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="eon8-live-page ai-agent-page-scope">
      <div id="site-content">
        <section className="banner_inr banner-inr-digital" id="enquiry-top">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="ba_inr_cnt">
                  <h1>
                    AI Agent Development Services: Powering the Future of Intelligent Business Automation
                  </h1>
                  <p className="reveal active">
                    In today&apos;s digital landscape, AI agents are transforming how businesses operate — handling complex tasks, making smart decisions, and enabling human-like interactions. At Eon8, we deliver customized, scalable AI agent solutions tailored to your business needs, helping you reduce costs and elevate customer experiences.
                  </p>
                  <p className="reveal active">
                    From Personalised AI Agents to enterprise-grade customizable AI agent services, our solutions empower businesses to stay ahead of the curve, reduce operational overhead, and deliver superior customer experiences.
                  </p>
                  <div className="bannft-btn reveal active">
                    <a
                      className="nft-eon-btn mt-0 mr-4"
                      href="https://wa.link/cgw2xa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Whatsapp Us <i aria-hidden="true" className="fab fa-whatsapp" />
                    </a>
                    <a className="nft-eon-btn" href="#consult-form">
                      Get Free Consultation
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 reveal active">
                <img
                  alt="AI Agent Development Services"
                  className="d-block m-auto"
                  src="/wp-content/uploads/2025/08/ai-agent-development-services.png"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="ai-agents-section">
          <div className="ai-container">
            <div className="ai-header">
              <h2 className="reveal">
                <span className="to">What Are AI Agents?</span>
              </h2>
              <p className="reveal">
                AI agents are intelligent software programs designed to autonomously perceive their environment, make decisions, and take actions to achieve defined objectives — ranging from simple chatbots to advanced systems capable of learning and reasoning like humans.
              </p>
            </div>
            <div className="ai-content-wrapper reveal reveal-left">
              <div className="ai-image-block">
                <img
                  alt="AI Agents"
                  className="ai-image"
                  src="/wp-content/uploads/2025/08/ai-agents.png"
                />
              </div>
              <div className="ai-desc-block reveal reveal-right">
                <h3>Types of AI Agents:</h3>
                <ul className="ai-agent-list">
                  <li>Rule-Based Agents</li>
                  <li>Learning Agents</li>
                  <li>Autonomous Agents</li>
                  <li>Multi-Agent Systems</li>
                </ul>
                <p>
                  Deployed across finance, healthcare, e-commerce, and logistics — AI agents automate repetitive tasks, enhance workflows, and deliver 24/7 operational support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="business-needs-section">
          <div className="business-container">
            <div className="business-header">
              <h2 className="reveal">
                <span className="to">Why Your Business Needs AI Agent Development Services</span>
              </h2>
              <p className="reveal">
                Whether you&apos;re a startup or an enterprise, integrating intelligent agents into your digital ecosystem unlocks massive competitive advantages. Here&apos;s how:
              </p>
            </div>
            <div className="business-grid reveal">
              {BUSINESS_CARDS.map((card) => (
                <div key={card.title} className="business-card">
                  <img alt={card.alt} className="business-icon" src={card.img} />
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="services-container">
            <div className="services-header">
              <h2 className="reveal">
                <span className="to">Our AI Agent Development Services</span>
              </h2>
              <p className="reveal">
                At Eon8, we take a 360° approach to AI agent development, ensuring each solution is aligned with your goals, technology infrastructure, and industry challenges.
              </p>
            </div>
            <div className="services-grid reveal">
              {SERVICES_CARDS.map((card) => (
                <div key={card.title} className="services-card">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <p className="services-label">{card.label}</p>
                  <ul className="services-list">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section">
          <div className="process-wrapper">
            <div className="process-header">
              <h2 className="reveal">
                <span className="to">Our Development Process</span>
              </h2>
              <p className="reveal">
                We follow a streamlined and agile methodology to ensure rapid deployment and measurable results:
              </p>
            </div>
            <div className="process-grid reveal">
              {PROCESS_STEPS.map((step) => (
                <div key={step.title} className="process-card">
                  <div className="process-icon-wrap">
                    <img alt={step.alt} className="process-icon" src={step.img} />
                  </div>
                  <div className="process-content">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="process-cta">
              <a className="process-btn" href="#enquiry">
                Talk to Our Experts
              </a>
            </div>
          </div>
        </section>

        <section className="tech-section" id="tech-section">
          <div className="tech-wrapper">
            <div className="tech-header">
              <h2 className="reveal">
                <span className="to">Tools &amp; Technologies We Use</span>
              </h2>
            </div>
            <div className="tech-categories reveal">
              {TECH_CATEGORIES.map((cat) => (
                <div key={cat.title} className="tech-category">
                  <h3 className="tech-category-title">{cat.title}</h3>
                  <div className="tech-items">
                    {cat.items.map((item) => (
                      <div key={item.name} className="tech-item">
                        <img alt={item.name} src={item.src} />
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="choose-section" id="choose-eon8">
          <div className="choose-wrapper">
            <div className="choose-inner">
              <div className="choose-left">
                <h2 className="reveal">
                  <span className="to">Why Choose Eon8 for AI Agent Development?</span>
                </h2>
                <p className="reveal">
                  Our mission is to simplify AI adoption and help you stay agile, competitive, and customer-centric.
                </p>
              </div>
              <div className="choose-right reveal">
                {CHOOSE_ITEMS.map((item) => (
                  <div key={item.text} className="choose-item">
                    <div className="choose-icon-wrap">
                      <i aria-hidden="true" className={item.icon} />
                    </div>
                    <h3>{item.text}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="casestudy-section">
          <div className="casestudy-wrapper">
            <div className="casestudy-inner">
              <div className="casestudy-content">
                <h2 className="reveal">
                  <span className="to">
                    Case Study: Boosting Sales with Personalised AI Agents
                  </span>
                </h2>
                <p className="reveal reveal-right">
                  A leading e-commerce brand approached Eon8 to reduce cart abandonment and improve user engagement. We built a Personalised AI Agent capable of identifying user intent, recommending products, and sending follow-ups via WhatsApp and email.
                </p>
                <p className="casestudy-results-label reveal">Results:</p>
                <div className="casestudy-results">
                  <div className="casestudy-result-item">
                    <div className="casestudy-result-icon">
                      <i aria-hidden="true" className="fa-solid fa-arrow-trend-up" />
                    </div>
                    <div className="casestudy-result-text">
                      <span className="casestudy-stat">30%</span>
                      <p>Increase in sales conversions</p>
                    </div>
                  </div>
                  <div className="casestudy-result-item">
                    <div className="casestudy-result-icon">
                      <i aria-hidden="true" className="fa-solid fa-users" />
                    </div>
                    <div className="casestudy-result-text">
                      <span className="casestudy-stat">50%</span>
                      <p>Improvement in customer retention</p>
                    </div>
                  </div>
                  <div className="casestudy-result-item">
                    <div className="casestudy-result-icon">
                      <i aria-hidden="true" className="fa-solid fa-ticket" />
                    </div>
                    <div className="casestudy-result-text">
                      <span className="casestudy-stat">40%</span>
                      <p>Reduction in manual support tickets</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="casestudy-image-block reveal reveal-left">
                <img
                  alt="AI Agent Case Study"
                  className="casestudy-img"
                  src="/wp-content/uploads/2025/08/casestudy-ai-agents.png"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-label="FAQ Section" className="faq-section">
          <div className="faq-wrapper">
            <div className="faq-header">
              <h2 className="reveal">
                <span className="to">Frequently Asked Questions</span>
              </h2>
            </div>
            <div className="faq-accordion reveal">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={item.q} className={`faq-item ${isOpen ? 'active' : ''}`}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      className="faq-question"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    >
                      <span>{item.q}</span>
                      <i aria-hidden="true" className="fa-solid fa-chevron-down faq-icon" />
                    </button>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="consult-section">
          <div className="consult-wrapper">
            <div className="consult-header">
              <span className="consult-badge">FREE CONSULTATION</span>
              <h2 className="reveal">
                <span className="to">
                  Book a Free Consultation{' '}
                  <span className="consult-highlight">with Our Experts</span>
                </span>
              </h2>
              <p className="reveal">
                Schedule a 30-minute session and discover how AI agents can transform your business.
              </p>
              <div className="consult-trust reveal">
                <div className="consult-trust-item">
                  <i aria-hidden="true" className="fa-solid fa-clock" />
                  <span>30 Min Session</span>
                </div>
                <div className="consult-trust-item">
                  <i aria-hidden="true" className="fa-solid fa-circle-check" />
                  <span>No Commitment</span>
                </div>
                <div className="consult-trust-item">
                  <i aria-hidden="true" className="fa-solid fa-lock" />
                  <span>100% Confidential</span>
                </div>
              </div>
            </div>
            <div className="consult-calendar">
              <NftCalendlyWidget
                callTitle="30-Min AI Agent Discovery Session"
                callDescription="Schedule a 30-minute session with our AI Agent architects to map workflows, integrations, and ROI."
              />
            </div>
          </div>
        </section>

        <section className="pb-70 gradient-nft" id="enquiry">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <h2 className="text-white" style={{ fontSize: '36px', marginBottom: '16px' }}>
                  Get Started Today
                </h2>
                <p className="text-white">
                  Ready to build smart, agile, and business-ready AI agents?
                  <br />
                  Partner with{' '}
                  <Link to="/" style={{ color: 'yellow' }}>
                    Eon8
                  </Link>{' '}
                  your trusted AI agent development services company and discover what intelligent automation can do for your growth.
                  <br />
                  Unlock personalized and customizable AI agent services with Eon8. Let’s build the future, one smart agent at a time.
                </p>
                <div className="footer-number text-white">
                  <div className="footer-number-inner">
                    <h3>1250+</h3>
                    <p>Project Completed</p>
                  </div>
                  <div className="footer-number-inner">
                    <h3>548+</h3>
                    <p>Our Happy Clients</p>
                  </div>
                  <div className="footer-number-inner">
                    <h3>12+</h3>
                    <p>Years of Experience</p>
                  </div>
                  <div className="footer-number-inner">
                    <h3>250+</h3>
                    <p>Development Experts</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12" id="consult-form">
                <div className="banner_form">
                  <div className="wpcf7">
                    <form className="wpcf7-form" onSubmit={handleFormSubmit} noValidate>
                      <div className="clearfix" id="nft-form">
                        <h3>Reach Out To Us</h3>
                        <div className="form-row">
                          <div className="col-12">
                            <input
                              className="wpcf7-form-control wpcf7-text"
                              name="fname"
                              placeholder="Name*"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <input
                              className="wpcf7-form-control wpcf7-email"
                              name="email"
                              placeholder="Email*"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <input
                              className="wpcf7-form-control wpcf7-tel"
                              name="phone"
                              placeholder="Mobile Number"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-12 quiz_cap">
                            <input
                              className="wpcf7-form-control wpcf7-submit"
                              type="submit"
                              value="Submit"
                            />
                          </div>
                        </div>
                        {status && (
                          <div
                            role="status"
                            className={`ai-form-feedback ${
                              status.type === 'success' ? 'is-success' : 'is-error'
                            }`}
                          >
                            {status.text}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testi_sec">
          <div className="container">
            <div className="row disc-head">
              <div className="col-md-12">
                <div className="claim-box text-center">
                  <p>
                    Disclaimer: The intended trademarks and logos are not our proprietary property and are owned by the respective brands. The mentioned names are strictly for creative and informative purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AIAgentPage;
