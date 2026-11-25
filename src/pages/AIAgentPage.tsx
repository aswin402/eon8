import { Link } from 'react-router-dom';
import {
  Bolt,
  Expand,
  Headphones,
  SlidersHorizontal,
  Tag,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import {
  AlternatingSplitSection,
  BottomCtaBanner,
  DiscoveryCallSection,
  FaqAccordionSection,
  FeatureGridSection,
  PageSeo,
  ProcessRoadmapSection,
  ServiceHeroSection,
  type FaqItem,
  type FeatureCardItem,
  type ProcessStepItem,
} from '@/components/sections';

const BUSINESS_CARDS: FeatureCardItem[] = [
  {
    iconSrc: '/wp-content/uploads/2022/07/brand.png',
    iconAlt: 'Cost Effective',
    title: '1. Cost-Effective Automation',
    description:
      'AI agents significantly reduce human intervention, helping businesses save time and operational costs while maintaining high accuracy and efficiency.',
  },
  {
    iconSrc: '/wp-content/uploads/2022/07/community-moderation.png',
    iconAlt: 'Customer Support',
    title: '2. Real-Time Customer Support',
    description:
      'Deploy personalised AI agents as virtual assistants that handle queries, process orders, provide recommendations, and offer support 24/7.',
  },
  {
    iconSrc: '/wp-content/uploads/2022/07/connections.png',
    iconAlt: 'Scalable Intelligence',
    title: '3. Scalable Intelligence',
    description:
      'Our customizable AI agent services allow you to scale from simple use cases to complex, multi-functional systems without starting from scratch.',
  },
  {
    iconSrc: '/wp-content/uploads/2022/07/discord-classic.png',
    iconAlt: 'Data Driven',
    title: '4. Data-Driven Decisions',
    description:
      'AI agents gather and analyze data continuously, enabling intelligent decision-making and predictive analytics to keep you proactive.',
  },
  {
    iconSrc: '/wp-content/uploads/2022/07/discord-nitro.png',
    iconAlt: 'Omnichannel',
    title: '5. Omnichannel Integration',
    description:
      'Seamlessly integrate AI agents across websites, mobile apps, CRMs, help desks, and social media for a consistent customer experience.',
  },
];

const SERVICES_CARDS: FeatureCardItem[] = [
  {
    title: '1. Customizable AI Agent Service',
    description:
      'Our AI agents operate independently, making real-time decisions based on predefined rules, data-driven insights, and advanced algorithms — streamlining workflows and improving efficiency.',
    bulletsLabel: 'Features include:',
    bullets: [
      'Task-specific design (sales, support, automation)',
      'Multi-language processing',
      'Natural Language Processing (NLP)',
      'Integration with existing systems (APIs, CRMs, ERPs)',
    ],
  },
  {
    title: '2. Personalised AI Agents',
    description:
      "Our Personalised AI Agents are trained on contextual and behavioral data, offering hyper-personalized interactions based on your customer's preferences, history, and needs.",
    bulletsLabel: 'Key benefits:',
    bullets: [
      'Enhanced user experience',
      'Personalized product recommendations',
      'Intelligent sentiment analysis',
      'Real-time adaptability',
    ],
  },
  {
    title: '3. AI Chatbot & Voice Agent Development',
    description:
      'Deploy conversational AI agents across text or voice platforms like WhatsApp, Telegram, Facebook Messenger, Alexa, and Google Assistant.',
    bulletsLabel: 'Capabilities:',
    bullets: [
      'Human-like conversation handling',
      'Sentiment and emotion detection',
      'Multilingual responses',
      'Voice-to-text NLP interpretation',
    ],
  },
  {
    title: '4. Domain-Specific AI Agents',
    description:
      'From healthcare bots to financial advisors and e-commerce assistants, we build AI agents that solve niche industry problems with domain knowledge and pre-trained data models.',
    bulletsLabel: 'Examples:',
    bullets: [
      'AI-powered HR agents for recruitment',
      'AI finance bots for investment analysis',
      'AI agents for supply chain management',
    ],
  },
];

const PROCESS_STEPS: ProcessStepItem[] = [
  {
    step: '01',
    iconSrc: '/wp-content/uploads/2022/07/server-setup-discord.svg',
    title: 'Requirement Analysis',
    description: 'Understand your business goals and processes',
  },
  {
    step: '02',
    iconSrc: '/wp-content/uploads/2022/07/channel-creation-discord.svg',
    title: 'AI Strategy Planning',
    description: 'Define the scope, features, and integrations',
  },
  {
    step: '03',
    iconSrc: '/wp-content/uploads/2022/07/bot-discord.svg',
    title: 'Model Selection & Training',
    description: 'Choose suitable AI/ML models and train them',
  },
  {
    step: '04',
    iconSrc: '/wp-content/uploads/2022/07/moderation-disccord.svg',
    title: 'Custom UI/UX Design',
    description: 'Create interfaces aligned with your brand',
  },
  {
    step: '05',
    iconSrc: '/wp-content/uploads/2022/07/assigning-discord.svg',
    title: 'Deployment',
    description: 'Seamlessly integrate with your systems',
  },
  {
    step: '06',
    iconSrc: '/wp-content/uploads/2022/07/invite-discord.svg',
    title: 'Monitoring & Maintenance',
    description: 'Continuously optimize performance',
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
      { name: 'OpenAI API', src: '/wp-content/uploads/2025/08/OpenAI-API.png' },
      { name: 'Dialogflow', src: '/wp-content/uploads/2025/08/Dialogflow.png' },
    ],
  },
  {
    title: 'NLP Engines',
    items: [
      { name: 'Google BERT', src: '/wp-content/uploads/2025/08/Google-BERT.png' },
      { name: 'OpenAI GPT', src: '/wp-content/uploads/2025/08/OpenAI-GPT.png' },
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
      { name: 'API Gateways', src: '/wp-content/uploads/2025/08/API-Gateways.png' },
      { name: 'Webhooks', src: '/wp-content/uploads/2025/08/Webhooks.png' },
    ],
  },
];

const CHOOSE_ITEMS: { icon: LucideIcon; text: string }[] = [
  { icon: SlidersHorizontal, text: '100% tailored AI solutions' },
  { icon: TrendingUp, text: 'Business-focused, ROI-driven development' },
  { icon: Expand, text: 'Scalable architecture for growing businesses' },
  { icon: Tag, text: 'Transparent pricing and milestone tracking' },
  { icon: Headphones, text: 'Round-the-clock support and maintenance' },
  { icon: Bolt, text: 'Fast turnaround time' },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Can AI agents be integrated into legacy systems?',
    answer:
      'Absolutely. Our agents are API-compatible and can be connected with existing ERPs, CRMs, and databases.',
  },
  {
    question: 'What industries benefit most from AI agent development services?',
    answer:
      'Virtually every industry — retail, healthcare, finance, education, travel, and logistics — can benefit from AI agents.',
  },
  {
    question: 'How long does it take to build a customized AI agent?',
    answer: 'Typically 3 to 6 weeks, depending on complexity and integrations required.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'We follow strict security protocols including encryption, access control, and GDPR compliance.',
  },
];

export function AIAgentPage() {
  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title="AI Agent Development Services for Business Growth"
        description="Get advanced AI agent development services tailored to your business. Build scalable, personalised AI agents to automate workflows and boost growth."
      />

      {/* 1. Split Hero */}
      <ServiceHeroSection
        theme="ai"
        layout="split-media"
        badge="Enterprise AI Engineering"
        heading="AI Agent Development Services: Powering the Future of Intelligent Business Automation"
        paragraphs={[
          "In today's digital landscape, AI agents are transforming how businesses operate — handling complex tasks, making smart decisions, and enabling human-like interactions. At Eon8, we deliver customized, scalable AI agent solutions tailored to your business needs, helping you reduce costs and elevate customer experiences.",
          'From Personalised AI Agents to enterprise-grade customizable AI agent services, our solutions empower businesses to stay ahead of the curve, reduce operational overhead, and deliver superior customer experiences.',
        ]}
        mediaSrc="/wp-content/uploads/2025/08/ai-agent-development-services.png"
        mediaAlt="AI Agent Development Services"
        actions={[
          { label: 'Whatsapp Us', href: 'https://wa.link/cgw2xa', variant: 'whatsapp', external: true },
          { label: 'Get Free Consultation', href: '#consult-form', variant: 'secondary' },
        ]}
      />

      {/* 2. What Are AI Agents */}
      <AlternatingSplitSection
        theme="ai"
        reverse
        badge="Autonomous Systems"
        heading="What Are AI Agents?"
        paragraphs={[
          'AI agents are intelligent software programs designed to autonomously perceive their environment, make decisions, and take actions to achieve defined objectives — ranging from simple chatbots to advanced systems capable of learning and reasoning like humans.',
          'Deployed across finance, healthcare, e-commerce, and logistics — AI agents automate repetitive tasks, enhance workflows, and deliver 24/7 operational support.',
        ]}
        bullets={[
          'Rule-Based Agents',
          'Learning Agents',
          'Autonomous Agents',
          'Multi-Agent Systems',
        ]}
        bulletsColumns={2}
        imageSrc="/wp-content/uploads/2025/08/ai-agents.png"
        imageAlt="Types of AI Agents"
      />

      {/* 3. Business Needs */}
      <FeatureGridSection
        theme="ai"
        surface="dark"
        badge="Competitive Advantage"
        heading="Why Your Business Needs AI Agent Development Services"
        subheading="Whether you're a startup or an enterprise, integrating intelligent agents into your digital ecosystem unlocks massive competitive advantages."
        cards={BUSINESS_CARDS}
        columns={3}
      />

      {/* 4. Core AI Agent Services */}
      <FeatureGridSection
        theme="ai"
        surface="light"
        badge="360° AI Architecture"
        heading="Our AI Agent Development Services"
        subheading="At Eon8, we take a 360° approach to AI agent development, ensuring each solution is aligned with your goals, technology infrastructure, and industry challenges."
        cards={SERVICES_CARDS}
        columns={2}
      />

      {/* 5. Development Process */}
      <ProcessRoadmapSection
        theme="ai"
        surface="dark"
        badge="Agile Delivery"
        heading="Our Development Process"
        subheading="We follow a streamlined and agile methodology to ensure rapid deployment and measurable results:"
        steps={PROCESS_STEPS}
        bottomActions={[{ label: 'Talk to Our Experts', href: '#consult-form', variant: 'primary' }]}
      />

      {/* 6. Tools & Technologies Stack */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#FD5900]">
              Production Stack
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              Tools &amp; Technologies We Use
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl bg-card border border-border p-6 sm:p-7 shadow-xs"
              >
                <h3 className="text-lg font-heading font-bold text-foreground mb-5 pb-3 border-b border-border">
                  {cat.title}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-center text-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80"
                    >
                      <div className="w-11 h-11 rounded-lg bg-white p-1.5 flex items-center justify-center shadow-2xs">
                        <img
                          src={item.src}
                          alt={item.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground leading-tight">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Choose Eon8 (Lucide Icons — zero broken FA glyphs) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-cyan-400">
              Why Partner With Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground leading-tight">
              Why Choose Eon8 for AI Agent Development?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Our mission is to simplify AI adoption and help you stay agile, competitive, and customer-centric.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CHOOSE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-600/10 dark:bg-cyan-500/15 text-indigo-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-heading font-bold text-foreground leading-snug">
                    {item.text}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Case Study Spotlight */}
      <AlternatingSplitSection
        theme="ai"
        surface="muted"
        badge="Proven Impact"
        heading="Case Study: Boosting Sales with Personalised AI Agents"
        paragraphs={[
          'A leading e-commerce brand approached Eon8 to reduce cart abandonment and improve user engagement. We built a Personalised AI Agent capable of identifying user intent, recommending products, and sending follow-ups via WhatsApp and email.',
        ]}
        metrics={[
          { value: '30%', label: 'Increase in sales conversions' },
          { value: '50%', label: 'Improvement in customer retention' },
          { value: '40%', label: 'Reduction in manual support tickets' },
        ]}
        imageSrc="/wp-content/uploads/2025/08/casestudy-ai-agents.png"
        imageAlt="AI Agent Case Study"
      />

      {/* 9. FAQ */}
      <FaqAccordionSection
        theme="ai"
        surface="dark"
        faqs={FAQ_ITEMS}
      />

      {/* 10. Discovery Call Calendar */}
      <DiscoveryCallSection
        theme="ai"
        badge="Free Consultation"
        heading="Book a Free Consultation With Our Experts"
        subheading="Schedule a 30-minute session and discover how AI agents can transform your business."
        callTitle="30-Min AI Agent Discovery Session"
        callDescription="Schedule a 30-minute session with our AI Agent architects to map workflows, integrations, and ROI."
      />

      {/* 11. Bottom Enquiry + Disclaimer */}
      <BottomCtaBanner
        theme="ai"
        heading="Get Started Today"
        description={
          <>
            Ready to build smart, agile, and business-ready AI agents? Partner with{' '}
            <Link to="/" className="text-[#FD5900] font-bold underline">
              Eon8
            </Link>{' '}
            — your trusted AI agent development services company — and discover what intelligent automation can do for your growth. Let&apos;s build the future, one smart agent at a time.
          </>
        }
        disclaimer="Disclaimer: The intended trademarks and logos are not our proprietary property and are owned by the respective brands. The mentioned names are strictly for creative and informative purposes."
      />
    </div>
  );
}

export default AIAgentPage;
