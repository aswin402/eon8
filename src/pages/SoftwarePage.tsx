import { useState, useEffect, type FormEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SoftwarePageProps {
  mode: 'crm' | 'erp';
}

const STATS = [
  { val: '1250+', label: 'Projects Completed' },
  { val: '548+', label: 'Happy Clients' },
  { val: '12+', label: 'Years of Experience' },
  { val: '250+', label: 'Development Experts' },
];

const CRM_CONFIG = {
  metaTitle: 'CRM Software Development Services | Eon8',
  metaDesc:
    'Eon8 designs custom CRM software that helps you track leads, manage customers, and close deals faster. Built around your sales process. Get a quote.',
  badge: 'Custom Sales Platforms',
  h1: 'CRM Software Development Services',
  heroDesc:
    'Manage leads, automate follow-ups, and streamline your sales process with a custom CRM built around your business. Empower your team with real-time insights, better customer relationships, and higher conversions.',
  heroCta: 'Get a Custom CRM',
  introTitle: 'Built for How Your Sales Team Actually Sells',
  introParagraphs: [
    'Off-the-shelf CRM tools force growing teams into rigid workflows and bloated licensing tiers. Eon8 designs custom CRM software around your exact pipeline stages, customer touchpoints, and reporting needs.',
    'From initial lead capture and automated follow-ups to closed-won analytics and third-party integrations, our CRM platforms give your sales and support teams a single, intuitive command center.',
  ],
  whyTitle: 'Why Businesses Choose Eon8 for CRM Software Development',
  whySub:
    'We build CRM systems around the way your sales team actually works — with the flexibility, integrations, visibility, and support needed to grow.',
  whyCards: [
    {
      title: 'Built Around Your Sales Process',
      desc: 'We map your actual lead-to-close journey — stages, qualification criteria, and handoffs between marketing and sales — and build a CRM that mirrors it instead of forcing your team into a rigid structure.',
    },
    {
      title: 'Modular & Scalable',
      desc: 'Launch with core functionality and expand module by module as your team and needs grow, including contact management, pipeline tracking, automation, support, and analytics.',
    },
    {
      title: 'Seamless Third-Party Integration',
      desc: 'Connect email, calendars, phone systems, e-commerce platforms, and other tools so customer data flows automatically across the systems your team already uses.',
    },
    {
      title: 'Real-Time Pipeline Visibility',
      desc: 'Live dashboards give sales managers visibility into deals, tasks, interactions, and pipeline health without relying on manual status updates.',
    },
    {
      title: 'Automation That Actually Saves Time',
      desc: 'Automated follow-up reminders, lead scoring, task assignment, and workflow triggers reduce manual admin work and help prevent leads from going cold.',
    },
    {
      title: 'Secure, Reliable Infrastructure',
      desc: 'CRM systems are built with role-based access, encrypted storage, audit trails, and infrastructure designed to handle growing contact volumes and users.',
    },
    {
      title: 'Support That Continues After Launch',
      desc: 'We provide ongoing maintenance, updates, monitoring, and new feature development as your sales process matures.',
    },
  ],
  modulesTitle: 'Core Modules We Build',
  modulesSub:
    'Build only what your business needs today, with a modular foundation that can grow as your sales and customer operations evolve.',
  modules: [
    {
      title: 'Contact & Account Management',
      desc: 'Centralized customer and company records with a complete interaction history.',
    },
    {
      title: 'Lead & Pipeline Management',
      desc: 'Custom deal stages, lead scoring, qualification workflows, and pipeline visibility.',
    },
    {
      title: 'Marketing Automation',
      desc: 'Email campaigns, follow-up sequences, and lead nurturing triggers connected to customer activity.',
    },
    {
      title: 'Sales Task & Activity Tracking',
      desc: 'Reminders, call logs, meeting scheduling, and task assignment to keep sales activity organized.',
    },
    {
      title: 'Customer Support & Ticketing',
      desc: 'Case tracking and support history tied directly to customer records.',
    },
    {
      title: 'Reporting & Analytics',
      desc: 'Custom dashboards showing pipeline health, conversion rates, and team performance.',
    },
    {
      title: 'Third-Party Integrations',
      desc: 'Connections to email, telephony, e-commerce, accounting platforms, calendars, and other business tools.',
    },
  ],
  processTitle: 'Our CRM Software Development Process',
  processSub:
    'From mapping your sales process to deployment and ongoing enhancement, we build the CRM around how your team works.',
  processCta: 'Talk to Our CRM Experts',
  processSteps: [
    {
      title: '1. Discovery & Sales Process Mapping',
      desc: 'Understand pipeline stages, pain points, team workflows, and the outcomes the CRM needs to deliver.',
    },
    {
      title: '2. System Architecture & Planning',
      desc: 'Design the data model, module structure, integration points, and technical roadmap before development begins.',
    },
    {
      title: '3. Custom Development',
      desc: 'Build contact management, deal tracking, automation, reporting, and interfaces designed for quick team adoption.',
    },
    {
      title: '4. Integration & Data Migration',
      desc: 'Migrate existing contacts and deal data and configure connections to email, calendars, communication tools, and other systems.',
    },
    {
      title: '5. Testing & Quality Assurance',
      desc: 'Test functionality, security, and performance before rollout so active sales work is not disrupted.',
    },
    {
      title: '6. Deployment & Team Training',
      desc: 'Roll out the system in structured phases and train your team for smooth adoption from day one.',
    },
    {
      title: '7. Ongoing Support & Enhancement',
      desc: 'Monitor performance, apply updates, and build new capabilities as your sales process evolves.',
    },
  ],
  industries: [
    {
      name: 'Real Estate',
      desc: 'Manage property enquiries, leads, follow-ups, sales pipelines, and customer relationships.',
    },
    {
      name: 'Retail & E-commerce',
      desc: 'Connect customer data, sales activity, orders, marketing workflows, and support interactions.',
    },
    {
      name: 'Healthcare & Wellness',
      desc: 'Organize customer or patient engagement workflows and service interactions.',
    },
    {
      name: 'Financial Services & Insurance',
      desc: 'Structure complex sales journeys, follow-ups, qualification workflows, and account management.',
    },
    {
      name: 'B2B & Enterprise Sales',
      desc: 'Manage multi-stage sales cycles, accounts, opportunities, activities, and team visibility.',
    },
    {
      name: 'Professional Services & Education',
      desc: 'Build CRM workflows around consultations, enrolments, client relationships, and service delivery.',
    },
  ],
  highlightsTitle: 'Built for the Way Your Business Sells',
  highlightsSub:
    'Each industry has its own sales cycle length, compliance considerations, and customer engagement patterns. We build these requirements into the CRM from the start.',
  highlights: [
    'Custom sales stages and qualification criteria',
    'Centralized customer and account records',
    'Workflow automation tailored to your team',
    'Real-time dashboards and performance visibility',
    'Integrations with the tools you already use',
    'Architecture that can scale with your business',
  ],
  faqs: [
    {
      q: 'How long does CRM software development take?',
      a: 'It depends on scope. A focused CRM with core pipeline and contact management can be ready in a few weeks, while a full system with automation, integrations, and reporting typically takes a few months. We provide a firm timeline after the discovery phase.',
    },
    {
      q: 'Should we build a custom CRM or customize an existing platform?',
      a: 'It depends on how complex your sales process is and how much you need the system to flex. Eon8 evaluates your workflows first and recommends the approach — fully custom or extending an existing platform — that fits your budget and timeline.',
    },
    {
      q: 'Can Eon8 migrate our existing contact and deal data?',
      a: 'Yes. We handle migration from spreadsheets, legacy CRMs, and other systems, with checks in place to ensure data accuracy and avoid lost records.',
    },
    {
      q: 'Will the CRM integrate with the tools our team already uses?',
      a: 'Yes. We build integrations with email platforms, calendars, phone systems, e-commerce tools, accounting software, and other business systems so the CRM fits into your existing workflow.',
    },
    {
      q: 'Does Eon8 support the CRM after it goes live?',
      a: 'Yes. We provide ongoing maintenance, monitoring, and feature development so the CRM continues to serve your team as your sales process changes and grows.',
    },
  ],
  consultHeadline: "Let's Build the CRM Your Sales Team Will Actually Use",
  consultDesc:
    "If your current system is creating more admin work than it's saving, let's map your sales process and design a CRM around how your team actually sells.",
  formHeading: 'Get a Free CRM Consultation',
  formSub:
    'Partner with Eon8 to design a system that keeps every lead, deal, and customer relationship organized and visible.',
};

const ERP_CONFIG = {
  metaTitle: 'ERP Software Development Services | Eon8',
  metaDesc:
    'Eon8 builds custom ERP software that unifies your operations, cuts manual work, and scales with your business. Get a free consultation today.',
  badge: 'Enterprise Resource Planning',
  h1: 'ERP Software Development Services',
  heroDesc:
    'EON8 builds custom ERP software that connects every department into one intelligent platform for better efficiency and real-time business insights.',
  heroCta: 'Get a Free Consultation',
  introTitle: 'What Is ERP Software Development?',
  introParagraphs: [
    'Enterprise Resource Planning (ERP) software is the backbone that connects the different functions of a business accounting, inventory, human resources, sales, procurement, and manufacturing into a single, unified platform. Instead of each department working off its own disconnected tool or spreadsheet, an ERP system gives everyone access to the same live data, in real time.',
    "ERP software development is the process of designing, building, and deploying this kind of system, either from the ground up or by customizing and extending an existing platform to match a company's specific requirements. Done well, it becomes the single source of truth your entire organization runs on.",
    'At Eon8, our approach to ERP software development focuses on three things: eliminating duplicate work, giving decision-makers accurate real-time visibility, and building a system flexible enough to grow alongside your business.',
  ],
  whyTitle: 'Why Businesses Choose Eon8 for ERP Software Development',
  whySub:
    'Purpose-built ERP architecture connecting finance, inventory, HR, procurement, and executive reporting.',
  whyCards: [
    {
      title: 'Built Around Your Workflows, Not a Template',
      desc: 'We start every engagement by mapping how your teams actually work the approvals, exceptions, and edge cases that off-the-shelf software often ignores. The result is an ERP system that fits your business instead of forcing your business to adapt to the software.',
    },
    {
      title: 'Modular Architecture',
      desc: 'Our ERP solutions are built in modules finance, inventory, HR, procurement, CRM, manufacturing, and reporting so you can start with what you need today and add capabilities as your business grows, without a costly rebuild.',
    },
    {
      title: 'Seamless Integration',
      desc: "Your ERP shouldn't operate in isolation. Eon8 builds integrations with your existing payment gateways, e-commerce platforms, logistics providers, and third-party tools, so data flows automatically instead of being re-entered by hand.",
    },
    {
      title: 'Real-Time Data & Reporting',
      desc: 'Every module feeds into centralized dashboards, giving leadership an accurate, up-to-the-minute view of finances, stock levels, order status, and team performance without waiting for someone to compile a report.',
    },
    {
      title: 'Scalable, Secure Infrastructure',
      desc: 'Our ERP systems are architected to handle growth in users, transaction volume, and data without performance issues, and are built with role-based access control, encryption, and audit trails to keep sensitive business data protected.',
    },
    {
      title: 'Long-Term Support',
      desc: "ERP software isn't a one-time build. Eon8 provides ongoing maintenance, updates, and enhancements so your system keeps pace with your business as it evolves.",
    },
  ],
  modulesTitle: 'Core Modules We Build',
  modulesSub:
    'Start with your highest-priority department and scale cleanly into a unified organization-wide ERP.',
  modules: [
    {
      title: 'Finance & Accounting',
      desc: 'General ledger, accounts payable/receivable, budgeting, and financial reporting',
    },
    {
      title: 'Inventory & Warehouse Management',
      desc: 'Real-time stock tracking, reorder alerts, and multi-location visibility',
    },
    {
      title: 'Human Resources',
      desc: 'Employee records, payroll, attendance, and performance tracking',
    },
    {
      title: 'Procurement & Vendor Management',
      desc: 'Purchase orders, vendor evaluation, and approval workflows',
    },
    {
      title: 'Sales & CRM',
      desc: 'Lead tracking, order management, and customer history',
    },
    {
      title: 'Manufacturing & Production',
      desc: 'Bill of materials, production scheduling, and shop floor tracking',
    },
    {
      title: 'Business Intelligence & Reporting',
      desc: 'Custom dashboards and analytics across every module',
    },
  ],
  processTitle: 'Our ERP Software Development Process',
  processSub: 'A disciplined 7-step methodology designed for mission-critical reliability.',
  processCta: 'Talk to Our ERP Experts',
  processSteps: [
    {
      title: '1. Discovery & Requirement Mapping',
      desc: 'We work closely with your team to understand current workflows, pain points, and the specific outcomes you need the ERP system to deliver.',
    },
    {
      title: '2. System Architecture & Planning',
      desc: 'Our team designs the database structure, module breakdown, and integration points, laying out a clear technical roadmap before development begins.',
    },
    {
      title: '3. Custom Development',
      desc: 'We build each module — finance, inventory, HR, procurement, and more — with clean, maintainable code and interfaces your team can actually use without extensive training.',
    },
    {
      title: '4. Integration & Data Migration',
      desc: 'Existing data from spreadsheets, legacy systems, or other software is migrated carefully, and connections to your other business tools are configured and tested.',
    },
    {
      title: '5. Testing & Quality Assurance',
      desc: 'Every module goes through rigorous functional, security, and performance testing before it reaches your team, minimizing disruption during rollout.',
    },
    {
      title: '6. Deployment & Training',
      desc: 'We deploy the system in a structured rollout and train your staff so adoption is smooth from day one.',
    },
    {
      title: '7. Ongoing Support & Enhancement',
      desc: 'Post-launch, Eon8 continues to monitor performance, apply updates, and build new features as your business requirements change.',
    },
  ],
  industries: [
    { name: 'Manufacturing and Production', desc: 'Production scheduling, BOMs, and plant efficiency.' },
    { name: 'Retail and E-commerce', desc: 'Omnichannel stock sync, POS, and supplier management.' },
    { name: 'Logistics and Supply Chain', desc: 'Warehouse visibility, fleet tracking, and dispatch.' },
    { name: 'Healthcare and Life Sciences', desc: 'Compliance, inventory batch tracking, and billing.' },
    { name: 'Construction and Real Estate', desc: 'Project costing, materials, and contractor workflows.' },
    { name: 'Wholesale and Distribution', desc: 'Order fulfillment, multi-warehouse stock, and invoicing.' },
    { name: 'Professional Services', desc: 'Resource allocation, timesheets, and project accounting.' },
  ],
  highlightsTitle: "Let's Build the ERP System Your Business Actually Needs",
  highlightsSub:
    'Each industry has its own compliance requirements, reporting standards, and operational quirks — our ERP development team accounts for these from day one rather than treating them as an afterthought.',
  highlights: [
    'Eliminate duplicate manual data entry across teams',
    'Unified real-time dashboards for leadership',
    'Role-based access controls and audit trails',
    'Smooth migration from spreadsheets & legacy tools',
    'Seamless gateway, accounting & shipping integrations',
    'Modular roadmap ready to scale with growth',
  ],
  faqs: [
    {
      q: 'How long does ERP software development take?',
      a: 'Timelines vary based on the number of modules and integrations involved. A focused, single-department ERP module can take a few weeks, while a full multi-department system typically takes several months. We provide a detailed timeline after the discovery phase.',
    },
    {
      q: 'Should I build a custom ERP or customize an existing platform?',
      a: 'It depends on your business complexity and budget. Eon8 can advise on the right approach after understanding your workflows. Sometimes a fully custom build is the right call, and sometimes extending an existing platform gets you there faster and more cost-effectively.',
    },
    {
      q: 'Can Eon8 migrate our data from our current system?',
      a: 'Yes. We handle data migration from spreadsheets, legacy software, and other business systems as part of the development process, with validation checks to ensure accuracy.',
    },
    {
      q: 'Will the ERP system integrate with tools we already use?',
      a: 'Yes. We build integrations with payment gateways, e-commerce platforms, accounting tools, and other third-party software so your ERP works with your existing tech stack rather than replacing it entirely.',
    },
    {
      q: 'Does Eon8 provide support after the ERP system goes live?',
      a: 'Yes. We offer ongoing maintenance, monitoring, and feature development to keep your ERP system running smoothly and evolving with your business.',
    },
  ],
  consultHeadline: "Let's Build the ERP System Your Business Actually Needs",
  consultDesc:
    "If disconnected tools and manual processes are slowing your business down, it's time for an ERP system built specifically around how you operate.",
  formHeading: 'Get a Free ERP Consultation',
  formSub:
    'Ready to build an ERP system around how your business actually operates? Partner with Eon8 to connect your operations.',
};

export function SoftwarePage({ mode }: SoftwarePageProps) {
  const cfg = mode === 'crm' ? CRM_CONFIG : ERP_CONFIG;
  const [openFaq, setOpenFaq] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [captchaN1] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [captchaN2] = useState(() => Math.floor(Math.random() * 7) + 1);
  const [captchaAns, setCaptchaAns] = useState('');
  const [formErr, setFormErr] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = cfg.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', cfg.metaDesc);
    }
    window.scrollTo(0, 0);
  }, [cfg.metaTitle, cfg.metaDesc, mode]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormErr('Please complete all required fields.');
      return;
    }
    if (parseInt(captchaAns.trim(), 10) !== captchaN1 + captchaN2) {
      setFormErr('Incorrect security answer. Please try again.');
      return;
    }
    setFormErr('');
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground font-body overflow-x-clip">
      {/* 1. Sage-Teal Architectural Hero (matching d_crm.png) */}
      <section
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2d5a58 0%, #1b3b4b 55%, #0f2537 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{cfg.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-tight">
            {cfg.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {cfg.heroDesc}
          </p>

          <div className="pt-2">
            <a href="#consult-form">
              <Button className="rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold h-12 sm:h-14 px-8 text-sm sm:text-base shadow-xl cursor-pointer">
                <span>{cfg.heroCta}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Deep Cobalt KPI Band beneath hero (matching d_crm.png) */}
      <section className="bg-[#0053c6] text-white py-8 sm:py-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="text-2xl sm:text-4xl font-heading font-black text-white">{s.val}</div>
              <div className="text-xs sm:text-sm font-medium text-blue-100">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Overview Intro */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 bg-[#eff4fb] dark:bg-card/30">
        <div className="max-w-4xl mx-auto space-y-5 text-left sm:text-center">
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-foreground">
            {cfg.introTitle}
          </h2>
          {cfg.introParagraphs.map((p, idx) => (
            <p key={idx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* 3. Why Businesses Choose Eon8 */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              {cfg.whyTitle}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">{cfg.whySub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cfg.whyCards.map((c) => (
              <div
                key={c.title}
                className="bg-[#f8fafc] dark:bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-sm hover:-translate-y-1 transition-transform"
              >
                <ShieldCheck className="w-6 h-6 text-[#0053c6] dark:text-blue-400" />
                <h3 className="text-lg font-heading font-bold text-foreground">{c.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Modules We Build */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-[#eff4fb] dark:bg-card/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              {cfg.modulesTitle}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">{cfg.modulesSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cfg.modules.map((m) => (
              <div
                key={m.title}
                className="bg-white dark:bg-card border border-border rounded-2xl p-6 space-y-2 shadow-sm hover:border-[#FD5900]/40 transition-colors"
              >
                <h3 className="text-lg font-heading font-bold text-foreground">{m.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Development Process */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              {cfg.processTitle}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">{cfg.processSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cfg.processSteps.map((s) => (
              <div
                key={s.title}
                className="bg-[#f8fafc] dark:bg-card border border-border rounded-2xl p-6 space-y-2.5"
              >
                <h3 className="text-base font-heading font-bold text-[#0053c6] dark:text-blue-400">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#consult-form">
              <Button className="rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold h-12 px-8 text-sm cursor-pointer shadow-md">
                <span>{cfg.processCta}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Industries We Serve + Highlights */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-[#eff4fb] dark:bg-card/30">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground">
              Industries We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cfg.industries.map((ind) => (
              <div
                key={ind.name}
                className="bg-white dark:bg-card border border-border rounded-2xl p-6 space-y-2 shadow-sm"
              >
                <h3 className="text-lg font-heading font-bold text-foreground">{ind.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-3xl p-7 sm:p-10 space-y-6">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-foreground">
                {cfg.highlightsTitle}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{cfg.highlightsSub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cfg.highlights.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#FD5900] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-white dark:bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {cfg.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border border-border rounded-2xl bg-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-foreground cursor-pointer hover:text-[#FD5900]"
                  >
                    <span>{f.q}</span>
                    {open ? (
                      <ChevronUp className="w-4 h-4 text-[#FD5900] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {open && (
                    <div className="px-5 pb-5 pt-3 border-t border-border/60 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Consultation Form & Stats */}
      <section
        id="consult-form"
        className="py-16 sm:py-24 px-5 sm:px-8 bg-gradient-to-br from-[#0f2537] via-[#1b3b4b] to-[#0053c6] text-white scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-heading font-black leading-tight text-white">
              {cfg.consultHeadline}
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {cfg.consultDesc}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/15">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                    {s.val}
                  </div>
                  <div className="text-xs text-blue-100">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-900 text-foreground rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-heading font-black mb-2">{cfg.formHeading}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-5">{cfg.formSub}</p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold">Consultation Request Received!</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Our engineering team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formErr && (
                  <p className="text-xs font-semibold text-red-600 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    {formErr}
                  </p>
                )}
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900]"
                />
                <input
                  type="email"
                  required
                  placeholder="Business Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900]"
                />
                <textarea
                  rows={3}
                  placeholder="Tell us about your requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900] resize-none"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="text-xs font-bold text-muted-foreground shrink-0">
                    Security Check: {captchaN1} + {captchaN2} = ?
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Answer"
                    value={captchaAns}
                    onChange={(e) => setCaptchaAns(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#FD5900] w-full sm:w-32"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  <span>Reach Out To Us</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
