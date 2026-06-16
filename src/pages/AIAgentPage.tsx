import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { 
  Bot, Cpu, Zap, Headphones, LineChart, MessageSquare, 
  ChevronDown, Check, ArrowRight, Code, Cloud
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function AIAgentPage() {
  const { setContactModalOpen } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP animations for scrolls
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
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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
      title: 'Cost-Effective Automation',
      desc: 'Standardize operations and automate manual back-office tasks, letting your team focus on core creative growth.',
      icon: Cpu
    },
    {
      title: 'Real-Time Customer Support',
      desc: 'Voice and chat agents offer 24/7 client response rates, solving customer issues instantly with zero queue delay.',
      icon: Headphones
    },
    {
      title: 'Scalable Intelligence',
      desc: 'Deploy multiple agent instances instantly during peak traffic seasons, scaling operational capabilities dynamically.',
      icon: Zap
    },
    {
      title: 'Data-Driven Decisions',
      desc: 'Extract database logs, parse spreadsheets, perform sentiment analysis, and generate automated performance reports.',
      icon: LineChart
    },
    {
      title: 'Omnichannel Integration',
      desc: 'Deploy agents directly on WhatsApp, Slack, Discord, email accounts, CRM software, and relational databases.',
      icon: MessageSquare
    }
  ];

  const services = [
    {
      title: 'Customizable AI Agent Service',
      desc: 'We design rule-based and autonomous agents tailored to match your specific corporate guidelines, tone of voice, and workflow parameters.'
    },
    {
      title: 'Personalised AI Agents',
      desc: 'Trained and fine-tuned on your internal manuals, support logs, and databases to provide precise context-aware operational assistance.'
    },
    {
      title: 'Chatbot & Voice Agent Development',
      desc: 'Cutting-edge natural conversational engines powered by LLMs (GPT-4, Claude 3.5) and human-like Text-to-Speech (TTS) pipelines.'
    },
    {
      title: 'Domain-Specific AI Agents',
      desc: 'Custom architectures specifically tuned for industry verticals like healthcare compliance, e-commerce support, and real estate lead-qualification.'
    }
  ];

  const steps = [
    { num: '01', title: 'Requirement Analysis', desc: 'Audit your workflow patterns and identify repetitive bottleneck tasks.' },
    { num: '02', title: 'AI Strategy Planning', desc: 'Select model architectures (RAG, agentic tools) and define safety parameters.' },
    { num: '03', title: 'Model selection & Training', desc: 'Choose models (Llama, Claude, GPT) and train them on custom datasets.' },
    { num: '04', title: 'Custom UI/UX Design', desc: 'Build clean chat panels, operational dashboards, and API connections.' },
    { num: '05', title: 'Deployment', desc: 'Deploy agents on secure cloud environments and link APIs to WhatsApp/Slack.' },
    { num: '06', title: 'Monitoring & Maintenance', desc: 'Conduct continuous latency audits, error logging, and vector store updates.' }
  ];

  const techStack = [
    {
      title: 'AI Frameworks',
      icon: Bot,
      items: ['LangChain', 'LlamaIndex', 'TensorFlow', 'PyTorch', 'AutoGPT', 'CrewAI']
    },
    {
      title: 'NLP & LLM Engines',
      icon: Cpu,
      items: ['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Llama 3', 'Hugging Face', 'Mistral AI']
    },
    {
      title: 'Languages & Integration',
      icon: Code,
      items: ['Python', 'TypeScript', 'Node.js', 'WhatsApp API', 'Slack API', 'Discord SDK']
    },
    {
      title: 'Cloud & Databases',
      icon: Cloud,
      items: ['AWS', 'GCP', 'Pinecone Vector DB', 'Milvus Vector DB', 'MongoDB', 'PostgreSQL']
    }
  ];

  const faqs = [
    {
      q: 'What is an AI Agent?',
      a: 'An AI Agent is an autonomous software program that uses Artificial Intelligence to observe its environment, make decisions, and take action using tools (like searching the web, calling APIs, or editing databases) to achieve pre-defined business goals.'
    },
    {
      q: 'How does Eon8 secure our corporate database during integration?',
      a: 'We implement strict data isolation rules. All models are integrated using encrypted API endpoints and secure vector databases. We audit system access configurations and run fail-safes so that confidential data never enters public training sets.'
    },
    {
      q: 'Can AI agents be deployed on our existing CRM systems?',
      a: 'Yes. Eon8 specialized integration engineers connect AI agents to popular CRMs (HubSpot, Salesforce, Zoho) as well as custom custom-built systems using secure webhooks and RESTful APIs.'
    },
    {
      q: 'What is the standard development timeline for a custom AI Agent?',
      a: 'Depending on complexity, a prototype agent is usually developed and deployed within 3 to 5 weeks. Fully integrated multi-agent workflows with deep custom database integrations can take 8 to 12 weeks.'
    }
  ];

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden font-body">
      
      {/* 1. Cinematic Hero Banner */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-b border-blue-500/10">
        {/* Background glow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10 ai-hero-content">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight leading-tight max-w-4xl mx-auto">
            AI Agent Development Services: <br />
            <span className="bg-gradient-to-r from-orange-400 via-primary to-blue-500 bg-clip-text text-transparent">
              Powering Intelligent Automation
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Automate operations, streamline support bottlenecks, and scale your business with custom AI agents trained on your corporate knowledge bases.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-gradient-to-r from-orange-500 to-primary text-white font-bold h-13 px-8 text-sm shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer"
            >
              <span>Develop an AI Agent</span>
            </Button>
            
            <a href="#process">
              <Button 
                variant="ghost" 
                className="text-white hover:text-orange-400 rounded-full border border-white/20 px-6 h-13 font-bold text-sm cursor-pointer"
              >
                <span>Our Process</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. What are AI Agents & Types Grid */}
      <section className="py-24 px-6 max-w-6xl mx-auto space-y-16 ai-cards-trigger">
        <div className="text-center space-y-3">
          <p className="text-orange-500 font-bold uppercase tracking-wider text-xs">Transform Business Operations</p>
          <h2 className="text-3xl sm:text-5xl font-heading font-black">Types of AI Agents & Benefits</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((bnf, idx) => {
            const Icon = bnf.icon;
            return (
              <div 
                key={idx}
                className="ai-card-reveal bg-card/40 border border-border/40 hover:border-orange-500/30 p-8 rounded-3xl backdrop-blur-sm shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-2xl flex items-center justify-center">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-foreground">{bnf.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{bnf.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Our Services section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-border/30 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <p className="text-primary font-bold uppercase tracking-wider text-xs">Custom AI Capabilities</p>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">Our AI Agent Development Services</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-950 border border-border/40 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow text-left flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-heading font-extrabold text-foreground">{srv.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Development Process */}
      <section id="process" className="py-24 px-6 max-w-6xl mx-auto space-y-16 ai-steps-trigger">
        <div className="text-center space-y-3">
          <p className="text-orange-500 font-bold uppercase tracking-wider text-xs">Lifecycle Roadmap</p>
          <h2 className="text-3xl sm:text-5xl font-heading font-black">Our AI Development Process</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((st, idx) => (
            <div 
              key={idx}
              className="ai-step-reveal bg-card/40 border border-border/40 hover:border-blue-500/20 p-8 rounded-3xl relative text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="absolute top-6 right-8 text-5xl font-heading font-black text-blue-500/10 font-mono select-none">
                {st.num}
              </span>
              <div className="space-y-3 pt-4">
                <h4 className="text-lg font-heading font-bold text-foreground">{st.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Tech Stack Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-border/30 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <p className="text-primary font-bold uppercase tracking-wider text-xs">The Power Behind AI</p>
            <h2 className="text-3xl sm:text-5xl font-heading font-black">AI Technologies We Integrate</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-950 border border-border/40 p-6 rounded-2xl text-left space-y-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 border-b border-border/20 pb-3">
                    <Icon className="w-5 h-5 text-orange-500" />
                    <h4 className="font-heading font-extrabold text-sm tracking-wide">{tech.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {tech.items.map((item, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2 font-medium">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-heading font-black">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-border/40 rounded-2xl bg-card/30 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
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
                    <p className="p-6 pt-0 text-muted-foreground text-xs sm:text-sm leading-relaxed border-t border-border/10 text-left">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 bg-slate-950 dark:bg-slate-900 text-white px-6 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{ backgroundImage: "url('/imgs/achievement-bg.png')" }} />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">Get Started Today</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Bring advanced automation to your workforce. Talk to our AI architect and map out your multi-agent architecture.
          </p>

          <div className="flex justify-center">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="rounded-full bg-gradient-to-r from-orange-500 to-primary text-white font-bold h-14 px-8 text-base shadow-xl shadow-orange-500/20 hover:scale-102 transition-transform cursor-pointer gap-2"
            >
              <span>Develop Your AI Agent</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
