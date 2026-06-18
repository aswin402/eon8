import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { 
  Bot, Cpu, 
  ChevronDown, Rocket, 
  Award, Users, Network, Brain, Cloud, Atom, Shuffle, UserCheck, ClipboardCheck,
  Sliders, TrendingUp, Maximize, Tag, Headphones, Zap, Clock, Lock
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import tech logos from src/assets/
import pythonLogo from '@/assets/Python.png';
import jsLogo from '@/assets/JavaScript.png';
import nodeLogo from '@/assets/Node.js.png';
import tensorflowLogo from '@/assets/TensorFlow.png';
import pytorchLogo from '@/assets/PyTorch.png';
import openaiApiLogo from '@/assets/OpenAI API.png';
import openaiGptLogo from '@/assets/OpenAI GPT.png';
import dialogflowLogo from '@/assets/Dialogflow.png';
import bertLogo from '@/assets/Google BERT.png';
import spacyLogo from '@/assets/SpaCy.png';
import awsLogo from '@/assets/AWS.png';
import azureLogo from '@/assets/Azure.png';
import gcpLogo from '@/assets/GCP.png';
import mongoLogo from '@/assets/MongoDB.png';
import postgresLogo from '@/assets/PostgreSQL.png';
import mysqlLogo from '@/assets/MySQL.png';
import zapierLogo from '@/assets/Zapier.png';
import apiGatewayLogo from '@/assets/API Gateways.png';
import webhookLogo from '@/assets/Webhooks.png';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Map technology names to imported image assets
const techLogos: Record<string, string> = {
  'Python': pythonLogo,
  'JavaScript': jsLogo,
  'Node.js': nodeLogo,
  'TensorFlow': tensorflowLogo,
  'PyTorch': pytorchLogo,
  'OpenAI API': openaiApiLogo,
  'OpenAI GPT': openaiGptLogo,
  'Dialogflow': dialogflowLogo,
  'Google BERT': bertLogo,
  'SpaCy': spacyLogo,
  'AWS': awsLogo,
  'Azure': azureLogo,
  'GCP': gcpLogo,
  'MongoDB': mongoLogo,
  'PostgreSQL': postgresLogo,
  'MySQL': mysqlLogo,
  'Zapier': zapierLogo,
  'API Gateways': apiGatewayLogo,
  'Webhooks': webhookLogo,
};

// Helper for rendering custom colored tech icons using copied PNG assets
function TechIcon({ name }: { name: string }) {
  const src = techLogos[name];
  if (!src) {
    return <Cpu className="w-14 h-14 text-slate-400" />;
  }
  return <img src={src} alt={name} className="w-14 h-14 object-contain select-none" />;
}

export function AIAgentPage() {
  const { setContactModalOpen } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive Booking Calendar State
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Bottom Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  // GSAP animations for reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo('.ai-hero-content',
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
      );

      // Staggered cards reveal
      gsap.fromTo('.ai-card-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.ai-cards-trigger',
            start: 'top 80%',
          }
        }
      );

      // Staggered process steps
      gsap.fromTo('.ai-step-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.ai-steps-trigger',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      title: '1. Cost-Effective Automation',
      desc: 'AI agents significantly reduce human intervention, helping businesses save time and operational costs while maintaining high accuracy and efficiency.',
      icon: Award
    },
    {
      title: '2. Real-Time Customer Support',
      desc: 'Deploy personalised AI agents as virtual assistants that handle queries, process orders, provide recommendations, and offer support 24/7.',
      icon: Users
    },
    {
      title: '3. Scalable Intelligence',
      desc: 'Our customizable AI agent services allow you to scale from simple use cases to complex, multi-functional systems without starting from scratch.',
      icon: Network
    },
    {
      title: '4. Data-Driven Decisions',
      desc: 'AI agents gather and analyze data continuously, enabling intelligent decision-making and predictive analytics to keep you proactive.',
      icon: Brain
    },
    {
      title: '5. Omnichannel Integration',
      desc: 'Seamlessly integrate AI agents across websites, mobile apps, CRMs, help desks, and social media for a consistent customer experience.',
      icon: Rocket
    }
  ];

  const services = [
    {
      title: '1. Customizable AI Agent Service',
      desc: 'Our AI agents operate independently, making real-time decisions based on predefined rules, data-driven insights, and advanced algorithms — streamlining workflows and improving efficiency.',
      type: 'Features include:',
      bullets: [
        'Task-specific design (sales, support, automation)',
        'Multi-language processing',
        'Natural Language Processing (NLP)',
        'Integration with existing systems (APIs, CRMs, ERPs)'
      ]
    },
    {
      title: '2. Personalised AI Agents',
      desc: "Our Personalised AI Agents are trained on contextual and behavioral data, offering hyper-personalized interactions based on your customer's preferences, history, and needs.",
      type: 'Key benefits:',
      bullets: [
        'Enhanced user experience',
        'Personalized product recommendations',
        'Intelligent sentiment analysis',
        'Real-time adaptability'
      ]
    },
    {
      title: '3. AI Chatbot & Voice Agent Development',
      desc: 'Deploy conversational AI agents across text or voice platforms like WhatsApp, Telegram, Facebook Messenger, Alexa, and Google Assistant.',
      type: 'Capabilities:',
      bullets: [
        'Human-like conversation handling',
        'Sentiment and emotion detection',
        'Multilingual responses',
        'Voice-to-text NLP interpretation'
      ]
    },
    {
      title: '4. Domain-Specific AI Agents',
      desc: 'From healthcare bots to financial advisors and e-commerce assistants, we build AI agents that solve niche industry problems with domain knowledge and pre-trained data models.',
      type: 'Examples:',
      bullets: [
        'AI-powered HR agents for recruitment',
        'AI finance bots for investment analysis',
        'AI agents for supply chain management'
      ]
    }
  ];

  const steps = [
    { title: 'Requirement Analysis', desc: 'Understand your business goals and processes', icon: Cloud },
    { title: 'AI Strategy Planning', desc: 'Define the scope, features, and integrations', icon: Atom },
    { title: 'Model Selection & Training', desc: 'Choose suitable AI/ML models and train them', icon: Bot },
    { title: 'Custom UI/UX Design', desc: 'Create interfaces aligned with your brand', icon: Shuffle },
    { title: 'Deployment', desc: 'Seamlessly integrate with your systems', icon: UserCheck },
    { title: 'Monitoring & Maintenance', desc: 'Continuously optimize performance', icon: ClipboardCheck }
  ];

  const techStack = [
    {
      title: 'Programming',
      items: ['Python', 'JavaScript', 'Node.js']
    },
    {
      title: 'AI Frameworks',
      items: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Dialogflow']
    },
    {
      title: 'NLP Engines',
      items: ['Google BERT', 'OpenAI GPT', 'SpaCy']
    },
    {
      title: 'Cloud Platforms',
      items: ['AWS', 'Azure', 'GCP']
    },
    {
      title: 'Databases',
      items: ['MongoDB', 'PostgreSQL', 'MySQL']
    },
    {
      title: 'Integration Tools',
      items: ['Zapier', 'API Gateways', 'Webhooks']
    }
  ];

  const faqs = [
    {
      q: 'Can AI agents be integrated into legacy systems?',
      a: 'Yes. We design custom integration wrappers and API layers to seamlessly connect AI agents to legacy databases, mainframes, and on-premise ERP software with minimal disruption.'
    },
    {
      q: 'What industries benefit most from AI agent development services?',
      a: 'E-commerce, customer support, healthcare, fintech, real estate, and supply chain logistics benefit heavily through automated scheduling, processing, data entry, and smart agent communications.'
    },
    {
      q: 'How long does it take to build a customized AI agent?',
      a: 'Depending on the sophistication and workflows, a production-ready agent typically takes 4 to 8 weeks to design, develop, test, and integrate.'
    },
    {
      q: 'Is my data safe?',
      a: 'Absolutely. We enforce strict data confidentiality compliance, encrypted API endpoints, and private vector storage so your proprietary data never leaks into public LLM training sets.'
    }
  ];

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body">
      
      {/* 1. Cinematic Hero Banner (Alternating Section - Blue Background) */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden text-left">
        {/* Glow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-400/20 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 ai-hero-content">
          
          {/* Left Column: Heading and Paragraphs */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              AI Agent Development Services: <br />
              Powering The Future Of Intelligent Business Automation
            </h1>
            
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              In today's digital landscape, AI agents are transforming how businesses operate — handling complex tasks, making smart decisions, and enabling human-like interactions. At Eon8, we deliver customized, scalable AI agent solutions tailored to your business needs, helping you reduce costs and elevate customer experiences.
            </p>
            
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              From Personalised AI Agents to enterprise-grade customizable AI agent services, our solutions empower businesses to stay ahead of the curve, reduce operational overhead, and deliver superior customer experiences.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://wa.me/919042294007" target="_blank" rel="noreferrer">
                <Button className="rounded-lg bg-[#062b66] hover:bg-[#08367c] text-white font-bold h-12 px-6 text-sm flex items-center gap-2 border border-blue-400/20 shadow-md transition-all">
                  <svg className="w-5 h-5 fill-current text-green-400" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.99 11.45 1.01 6.012 1.01 1.59 5.379 1.586 10.81c-.001 1.687.455 3.328 1.32 4.795l-1.017 3.714 3.764-1.013q.145.088.404.242zM17.06 14.382c-.272-.136-1.61-.794-1.86-.885-.25-.092-.432-.136-.613.136-.18.273-.703.885-.862 1.067-.158.182-.317.205-.59.07-2.316-1.012-3.66-2.158-5.122-4.664-.326-.56.326-.52.932-1.722.1-.205.05-.386-.025-.522-.075-.137-.613-1.477-.84-2.023-.222-.534-.44-.46-.613-.47h-.522c-.18 0-.477.067-.726.34-.25.272-.953.931-.953 2.27 0 1.338.975 2.633 1.11 2.815.137.18 1.92 2.93 4.653 4.114.65.28 1.157.447 1.553.573.653.208 1.248.179 1.718.109.524-.078 1.61-.658 1.838-1.294.228-.635.228-1.18.158-1.294-.068-.113-.25-.181-.522-.317z" />
                  </svg>
                  <span>Whatsapp Us</span>
                </Button>
              </a>
              <Button 
                onClick={() => setContactModalOpen(true)}
                className="rounded-lg bg-[#062b66] hover:bg-[#08367c] text-white font-bold h-12 px-6 text-sm border border-blue-400/20 shadow-md cursor-pointer transition-all"
              >
                Get Free Consultation
              </Button>
            </div>
          </div>
          
          {/* Right Column: 3D Illustration */}
          <div className="flex justify-center select-none">
            <img 
              src="/imgs/ai-agent-hero-new.jpg" 
              alt="AI Agent Development 3D Render" 
              className="w-full max-w-[450px] lg:max-w-[480px] rounded-3xl object-contain shadow-2xl hover:scale-[1.01] transition-transform duration-500 border border-blue-400/15"
            />
          </div>

        </div>
      </section>

      {/* 2. What are AI Agents & Types (Alternating Section - Light Gray Background) */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/10 border-b border-border/20">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              What Are AI Agents?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              AI agents are intelligent software programs designed to autonomously perceive their environment, make decisions, and take actions to achieve defined objectives — ranging from simple chatbots to advanced systems capable of learning and reasoning like humans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Tech Infographic Diagram */}
            <div className="flex justify-center select-none">
              <img 
                src="/imgs/ai-agent-types.jpg" 
                alt="AI Agent Types Infographic Diagram" 
                className="w-full max-w-[500px] lg:max-w-none rounded-2xl shadow-lg border border-border/30 hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            
            {/* Right Column: Types of Agents list */}
            <div className="space-y-6 text-left">
              <h3 className="text-xl sm:text-2xl font-heading font-black text-foreground">
                Types Of AI Agents:
              </h3>
              <ul className="space-y-4 font-semibold text-slate-800 dark:text-slate-200">
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="text-blue-500 font-bold text-lg leading-none">✦</span>
                  <span>Rule-Based Agents</span>
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="text-blue-500 font-bold text-lg leading-none">✦</span>
                  <span>Learning Agents</span>
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="text-blue-500 font-bold text-lg leading-none">✦</span>
                  <span>Autonomous Agents</span>
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="text-blue-500 font-bold text-lg leading-none">✦</span>
                  <span>Multi-Agent Systems</span>
                </li>
              </ul>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed pt-2">
                Deployed across finance, healthcare, e-commerce, and logistics — AI agents automate repetitive tasks, enhance workflows, and deliver 24/7 operational support.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Why Your Business Needs AI Agent Services (Alternating Section - Deep Blue Background) */}
      <section className="py-24 px-6 bg-[#002266] text-white ai-cards-trigger">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Why Your Business Needs AI Agent Development Services
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Whether you're a startup or an enterprise, integrating intelligent agents into your digital ecosystem unlocks massive competitive advantages. Here's how:
            </p>
          </div>

          {/* Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.slice(0, 4).map((bnf, idx) => {
              const Icon = bnf.icon;
              return (
                <div 
                  key={idx}
                  className="ai-card-reveal bg-white dark:bg-slate-900 border border-slate-200/10 p-8 rounded-3xl shadow-md flex flex-col justify-between text-left hover:scale-[1.01] transition-transform duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white">
                      {bnf.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 text-xs sm:text-sm leading-relaxed">
                      {bnf.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered 5th Card */}
          <div className="flex justify-center mt-8">
            {benefits.slice(4).map((bnf, idx) => {
              const Icon = bnf.icon;
              return (
                <div 
                  key={idx}
                  className="ai-card-reveal bg-white dark:bg-slate-900 border border-slate-200/10 p-8 rounded-3xl shadow-md flex flex-col justify-between text-left max-w-2xl w-full hover:scale-[1.01] transition-transform duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white">
                      {bnf.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 text-xs sm:text-sm leading-relaxed">
                      {bnf.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Our AI Agent Services (Alternating Section - Light Gray Background) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-border/20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              Our AI Agent Development Services
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              At Eon8, we take a 360° approach to AI agent development, ensuring each solution is aligned with your goals, technology infrastructure, and industry challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {services.map((srv, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-950 border border-border/40 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6"
              >
                <div className="space-y-2">
                  <h4 className="text-lg sm:text-xl font-heading font-black text-foreground">{srv.title}</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{srv.desc}</p>
                </div>
                
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs sm:text-sm font-bold text-foreground tracking-wide uppercase">{srv.type}</h5>
                  <ul className="space-y-2">
                    {srv.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 font-medium leading-relaxed">
                        <span className="text-blue-500 font-bold select-none text-[13px] leading-none pt-0.5">✦</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Development Process Roadmap (Alternating Section - Deep Blue Background) */}
      <section id="process" className="py-24 px-6 bg-[#002266] text-white ai-steps-trigger border-b border-border/20 text-center">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 text-white">
            <h2 className="text-3xl sm:text-4xl font-heading font-black">
              Our Development Process
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              We follow a streamlined and agile methodology to ensure rapid deployment and measurable results:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div 
                  key={idx}
                  className="ai-step-reveal bg-white dark:bg-slate-900 border border-slate-200/10 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base sm:text-lg font-heading font-black text-slate-900 dark:text-white mt-5 mb-2">
                    {st.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-[240px]">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-12">
            <Button 
              onClick={() => setContactModalOpen(true)}
              className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 text-sm shadow-xl shadow-orange-500/20 hover:scale-102 transition-transform cursor-pointer"
            >
              Talk to Our Experts
            </Button>
          </div>

        </div>
      </section>

      {/* 6. Tools & Technologies (Alternating Section - Orange Background) */}
      <section className="py-24 px-6 bg-orange-500 text-white border-b border-border/20">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Tools & Technologies We Use
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((category) => (
              <div 
                key={category.title} 
                className="bg-white rounded-3xl p-8 shadow-lg text-slate-900 text-center space-y-6 border border-slate-100/50"
              >
                <h3 className="font-heading font-black text-base pb-3 border-b border-slate-100 uppercase tracking-wider text-slate-800">
                  {category.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
                  {category.items.map((item) => (
                    <div key={item} className="flex flex-col items-center justify-center space-y-2.5 w-[84px]">
                      <div className="w-14 h-14 flex items-center justify-center shrink-0">
                        <TechIcon name={item} />
                      </div>
                      <span className="text-[11px] sm:text-[13px] font-extrabold text-slate-700 dark:text-slate-350 text-center leading-tight max-w-full">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Why Choose Eon8 For AI Agent Development */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto p-12 bg-slate-50 dark:bg-slate-900/10 rounded-3xl border border-border/40 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Title and subtitle */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground leading-tight">
              Why Choose Eon8 For AI Agent Development?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Our mission is to simplify AI adoption and help you stay agile, competitive, and customer-centric.
            </p>
          </div>

          {/* Right Column: 6 Card rows */}
          <div className="space-y-4">
            {[
              { title: '100% Tailored AI Solutions', icon: Sliders },
              { title: 'Business-Focused, ROI-Driven Development', icon: TrendingUp },
              { title: 'Scalable Architecture For Growing Businesses', icon: Maximize },
              { title: 'Transparent Pricing And Milestone Tracking', icon: Tag },
              { title: 'Round-The-Clock Support And Maintenance', icon: Headphones },
              { title: 'Fast Turnaround Time', icon: Zap }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-900/40 p-5 rounded-2xl border border-border/30 shadow-sm flex items-center gap-4 hover:shadow-md hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-foreground text-left">
                    {item.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. E-commerce Case Study */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950/20 border-t border-b border-border/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Heading, description and results */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground leading-tight">
              Case Study: Boosting Sales With Personalised AI Agents
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A leading e-commerce brand approached Eon8 to reduce cart abandonment and improve user engagement. We built a Personalised AI Agent capable of identifying user intent, recommending products, and sending follow-ups via WhatsApp and email.
            </p>

            <div className="space-y-4 pt-2">
              <h4 className="font-heading font-black text-base text-foreground">Results:</h4>
              {[
                { val: '30%', label: 'Increase in sales conversions', icon: TrendingUp },
                { val: '50%', label: 'Improvement in customer retention', icon: Users },
                { val: '40%', label: 'Reduction in manual support tickets', icon: ClipboardCheck }
              ].map((res, idx) => {
                const Icon = res.icon;
                return (
                  <div 
                    key={idx}
                    className="p-5 bg-white dark:bg-slate-900 border border-border/30 rounded-2xl flex items-center gap-5 shadow-sm"
                  >
                    <div className="w-11 h-11 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h5 className="font-heading font-black text-xl text-blue-600 dark:text-blue-400 leading-none mb-1">
                        {res.val}
                      </h5>
                      <p className="text-xs text-muted-foreground font-semibold">
                        {res.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Case study generated image */}
          <div className="flex justify-center select-none">
            <img 
              src="/imgs/ecommerce-case-study.jpg" 
              alt="Holographic humanoid ecommerce AI assistant" 
              className="w-full max-w-[500px] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-border/25"
            />
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (Dark Blue Background) */}
      <section className="py-24 px-6 bg-[#001845] text-white">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-blue-900 bg-[#001133]/50 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-white hover:text-orange-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4.5 h-4.5 shrink-0 transition-transform duration-300 ${
                    activeFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 pt-0 text-blue-100 text-xs sm:text-sm leading-relaxed border-t border-blue-900/40 text-left">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Book Free Consultation (Interactive Scheduler) */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950/20 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
              Free Consultation
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              Book A Free Consultation <span className="text-blue-600 dark:text-blue-400">With Our Experts</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Schedule a 30-minute session and discover how AI agents can transform your business.
            </p>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-border/40 rounded-full shadow-sm">
              <Clock className="w-4.5 h-4.5 text-blue-600 shrink-0" />
              <span>30 Min Session</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-border/40 rounded-full shadow-sm">
              <UserCheck className="w-4.5 h-4.5 text-blue-600 shrink-0" />
              <span>No Commitment</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-border/40 rounded-full shadow-sm">
              <Lock className="w-4.5 h-4.5 text-blue-600 shrink-0" />
              <span>100% Confidential</span>
            </div>
          </div>

          {/* Simulated Calendly Widget */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-border/40 rounded-3xl shadow-xl overflow-hidden p-6 md:p-8 text-left">
            {!bookingConfirmed ? (
              <div className="space-y-8">
                {/* Calendly Header */}
                <div className="border-b border-border/40 pb-5">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Eon8 Digital Infinity</p>
                  <h3 className="text-2xl font-heading font-black text-foreground mt-1 mb-2">30 Minute Meeting</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 shrink-0" /> 30 min</span>
                    <span>🌐 Web conferencing details provided upon confirmation.</span>
                  </div>
                </div>

                {/* Calendar grid view */}
                {!selectedDate ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-black text-base text-foreground">Select a Date & Time</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">June 2026</span>
                      </div>
                    </div>
                    
                    {/* Calendar grid wrapper */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold border-t border-border/30 pt-4">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <div key={d} className="text-slate-400 py-1">{d}</div>
                      ))}
                      {/* Empty slots for offset (June 1st, 2026 is Monday, so 0 offset) */}
                      {Array.from({ length: 30 }).map((_, i) => {
                        const day = i + 1;
                        const isPast = day <= 18; // Today is 18th
                        return (
                          <button
                            key={day}
                            disabled={isPast}
                            onClick={() => setSelectedDate(day)}
                            className={`py-3 rounded-full text-center font-extrabold focus:outline-none transition-all ${
                              isPast 
                                ? 'text-slate-200 dark:text-slate-800 cursor-not-allowed' 
                                : 'text-slate-800 dark:text-slate-200 bg-blue-500/5 hover:bg-blue-600 hover:text-white cursor-pointer ring-1 ring-blue-600/10'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : !selectedTime ? (
                  // Select Time state
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border/20 pb-4">
                      <button 
                        onClick={() => setSelectedDate(null)}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        ← Back to calendar
                      </button>
                      <h4 className="font-heading font-black text-sm text-foreground">
                        Selected: June {selectedDate}, 2026
                      </h4>
                    </div>

                    <p className="text-sm font-bold text-foreground">Select a Time:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '4:30 PM'].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className="py-3 rounded-xl border border-blue-600/20 text-center font-extrabold bg-blue-500/5 hover:bg-blue-600 hover:text-white text-sm cursor-pointer transition-all"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Form validation state
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingConfirmed(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-border/20 pb-4">
                      <button 
                        type="button"
                        onClick={() => setSelectedTime(null)}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        ← Back to times
                      </button>
                      <h4 className="font-heading font-black text-sm text-foreground">
                        June {selectedDate} at {selectedTime}
                      </h4>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        className="w-full h-11 px-4 border border-border/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 bg-background text-sm"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Your Email *</label>
                      <input 
                        type="email" 
                        required 
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                        className="w-full h-11 px-4 border border-border/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 bg-background text-sm"
                        placeholder="john@example.com"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-sm transition-all"
                    >
                      Confirm Booking
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              // Booking Confirmed Success State
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-500/20 animate-bounce">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-black text-foreground">Meeting Confirmed!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                  Hi {bookingForm.name}, your meeting is scheduled on <strong>June {selectedDate}, 2026 at {selectedTime}</strong>. Calendar invite details have been sent to {bookingForm.email}.
                </p>
                <button 
                  onClick={() => {
                    setBookingConfirmed(false);
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setBookingForm({ name: '', email: '' });
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Schedule another session
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 11. Get Started Today / Lead Capture Form Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Column: Heading and Stats grid */}
          <div className="space-y-12 text-left">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
                Get Started Today
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Ready to build smart, agile, and business-ready AI agents? Partner with <span className="font-bold text-orange-400">Eon8</span> your trusted AI agent development services company and discover what intelligent automation can do for your growth. Unlock personalized and customizable AI agent services with Eon8. Let’s build the future, one smart agent at a time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-blue-400/20 pt-8">
              {[
                { val: '1250+', label: 'Project Completed' },
                { val: '548+', label: 'Our Happy Clients' },
                { val: '12+', label: 'Years of Experience' },
                { val: '250+', label: 'Development Experts' }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-white leading-none">
                    {stat.val}
                  </h4>
                  <p className="text-blue-200 text-xs font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl space-y-6 text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-black text-center text-white">
              Reach Out To Us
            </h3>

            {!contactSubmitted ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!contactName || !contactEmail || !contactPhone) {
                    setContactError('Please fill out all required fields');
                    return;
                  }
                  setContactSubmitted(true);
                  setContactError('');
                }}
                className="space-y-4 text-slate-800"
              >
                {contactError && (
                  <p className="text-xs font-bold text-red-400">{contactError}</p>
                )}

                <div className="space-y-1">
                  <input 
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Name*"
                    className="w-full h-11 px-4 bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm border-none shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <input 
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Email*"
                    className="w-full h-11 px-4 bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm border-none shadow-sm"
                  />
                </div>

                <div className="flex bg-white rounded-xl overflow-hidden shadow-sm">
                  <select 
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-transparent px-3 text-xs sm:text-sm font-bold border-r border-slate-100 focus:outline-none py-3"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                  </select>
                  <input 
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Mobile Number*"
                    className="flex-grow bg-transparent px-4 py-3 text-sm focus:outline-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full h-12 bg-[#b92c2c] hover:bg-[#9d2424] text-white font-extrabold rounded-xl text-sm transition-all border border-red-700/20 shadow-md cursor-pointer mt-2"
                >
                  Submit
                </Button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/25">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-heading font-black text-white">Thank You!</h4>
                <p className="text-blue-100 text-sm leading-relaxed max-w-sm mx-auto">
                  Hi {contactName}, your details have been received successfully. Our team will contact you at {contactEmail} / {countryCode} {contactPhone} shortly.
                </p>
                <button 
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactName('');
                    setContactEmail('');
                    setContactPhone('');
                  }}
                  className="text-xs font-bold text-blue-300 hover:underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 12. Disclaimer Ribbon */}
      <footer className="py-8 px-6 text-center">
        <div className="max-w-5xl mx-auto bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl py-5 px-6">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            Disclaimer: The intended trademarks and logos are not our proprietary property and are owned by the respective brands. The mentioned names are strictly for creative and informative purposes.
          </p>
        </div>
      </footer>

    </div>
  );
}
