export interface PolicySection {
  heading: string;
  paragraphs: string[];
}

export interface PolicyData {
  slug: string;
  metaTitle: string;
  metaDesc: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const policyPagesData: Record<string, PolicyData> = {
  'privacy-policy-2': {
    slug: 'privacy-policy-2',
    metaTitle: 'Privacy Policy | Eon8 - Data Protection & User Privacy',
    metaDesc: 'Read the official Eon8 Privacy Policy. Understand how we collect, store, and protect your personal information in compliance with international privacy standards.',
    title: 'Privacy Policy',
    subtitle: 'Our commitment to transparency, data protection, and your personal privacy rights',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Introduction & Scope',
        paragraphs: [
          'At EON8, accessible from https://www.eon8.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by EON8 and how we use it.',
          'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at info@eon8.com.',
          'This Privacy Policy applies solely to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in EON8. This policy is not applicable to any information collected offline or via channels other than this website.'
        ]
      },
      {
        heading: '2. Consent',
        paragraphs: [
          'By using our website, you hereby consent to our Privacy Policy and agree to its terms.',
          'If you do not agree with any terms within this policy, please discontinue use of our site and services immediately.'
        ]
      },
      {
        heading: '3. Information We Collect',
        paragraphs: [
          'The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.',
          'If you contact us directly via our inquiry forms or email, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.',
          'When you register for an Account or submit a project consultation request, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.'
        ]
      },
      {
        heading: '4. How We Use Your Information',
        paragraphs: [
          'We use the information we collect in various ways, including to:',
          '• Provide, operate, and maintain our website and client service portals',
          '• Improve, personalize, and expand our digital marketing and development services',
          '• Understand and analyze how you use our website and campaigns',
          '• Develop new products, services, features, and functionality',
          '• Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes',
          '• Send you transactional emails and project status notifications',
          '• Find and prevent fraud, spam, and security vulnerabilities'
        ]
      },
      {
        heading: '5. Log Files & Analytics',
        paragraphs: [
          'EON8 follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services analytics.',
          'The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.',
          'The purpose of the information is for analyzing trends, administering the site, tracking users movement on the website, and gathering demographic information.'
        ]
      },
      {
        heading: '6. Cookies and Web Beacons',
        paragraphs: [
          'Like any other website, EON8 uses "cookies". These cookies are used to store information including visitors preferences, and the pages on the website that the visitor accessed or visited.',
          'The information is used to optimize the users experience by customizing our web page content based on visitors browser type and/or other information.',
          'You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers respective websites.'
        ]
      },
      {
        heading: '7. Third-Party Privacy Policies',
        paragraphs: [
          'EON8s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers or platforms (such as Google, Meta, or LinkedIn) for more detailed information.',
          'It may include their practices and instructions about how to opt-out of certain options.'
        ]
      },
      {
        heading: '8. GDPR & CCPA Data Protection Rights',
        paragraphs: [
          'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:',
          '• The right to access: You have the right to request copies of your personal data.',
          '• The right to rectification: You have the right to request that we correct any information you believe is inaccurate.',
          '• The right to erasure: You have the right to request that we erase your personal data, under certain conditions.',
          '• The right to restrict processing: You have the right to request that we restrict the processing of your personal data.',
          'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at info@eon8.com.'
        ]
      }
    ]
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    metaTitle: 'Terms and Conditions | Eon8 - Service Usage Agreement',
    metaDesc: 'Review the Terms and Conditions for using Eon8 digital marketing services, website development, Web3 consultations, and website access.',
    title: 'Terms and Conditions',
    subtitle: 'The legal agreement governing your access and usage of Eon8 services and digital assets',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Agreement to Terms',
        paragraphs: [
          'Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://www.eon8.com/ website and services operated by EON8 ("us", "we", or "our").',
          'Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.',
          'By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.'
        ]
      },
      {
        heading: '2. Client Accounts & Information',
        paragraphs: [
          'When you create an account with us or submit a service inquiry, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your service agreement.',
          'You are responsible for safeguarding any passwords or credentials used to access our client dashboard or shared deliverables.'
        ]
      },
      {
        heading: '3. Intellectual Property Rights',
        paragraphs: [
          'The Service and its original content, features, and functionality are and will remain the exclusive property of EON8 and its licensors.',
          'Upon full payment of agreed project contracts, client deliverables (such as custom code, custom designs, and campaign collateral) are transferred to the client as stipulated in the respective Master Services Agreement (MSA).'
        ]
      },
      {
        heading: '4. Service Agreements & Deliverables',
        paragraphs: [
          'Specific scopes of work, campaign timelines, KPI expectations, and payment schedules are governed by mutually agreed proposals and statements of work (SOW).',
          'While we employ industry-leading methodologies, marketing results (such as organic Google rankings, social algorithmic reach, and ad performance) are subject to third-party platform policies and market fluctuations.'
        ]
      },
      {
        heading: '5. Limitation of Liability',
        paragraphs: [
          'In no event shall EON8, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or inability to use the Service.'
        ]
      },
      {
        heading: '6. Termination',
        paragraphs: [
          'We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
          'All provisions of the Terms which by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.'
        ]
      },
      {
        heading: '7. Governing Law',
        paragraphs: [
          'These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.',
          'Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, India.'
        ]
      }
    ]
  },
  'refund-policy': {
    slug: 'refund-policy',
    metaTitle: 'Refund Policy | Eon8 - Service Guidelines & Guarantees',
    metaDesc: 'Understand Eon8 refund guidelines, terms for customized digital marketing services, software development, and Web3 campaign retainers.',
    title: 'Refund Policy',
    subtitle: 'Clear, fair, and transparent guidelines regarding service purchases and cancellation terms',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Customized Professional Services',
        paragraphs: [
          'Our applications, digital marketing campaigns, and development architectures are tailor-designed to meet the specific requirements provided by each client.',
          'Once a purchase order, retainer agreement, or project contract has been signed and work has commenced, human labor, strategy hours, server resources, and third-party media ad spends are allocated immediately.'
        ]
      },
      {
        heading: '2. Non-Refundable Items',
        paragraphs: [
          '• Media and Ad Spend: Any direct advertising budgets paid to third-party ad networks (Google Ads, Meta Ads, LinkedIn Ads, Twitter Ads, etc.) are strictly non-refundable once disbursed.',
          '• Completed Milestones: Payments for project milestones that have been reviewed, approved, and delivered are non-refundable.',
          '• Third-Party Licensing Fees: Domain registrations, SSL certificates, software licenses, and third-party API keys purchased on behalf of the client cannot be refunded.',
          '• PR and Media Placements: Once a press release or sponsored article has been pitched and published across media networks (e.g. CoinTelegraph, Bloomberg), publication costs are irrevocable.'
        ]
      },
      {
        heading: '3. Scope Adjustments & Support',
        paragraphs: [
          'EON8 is dedicated to ensuring client satisfaction. If you encounter any technical discrepancy or campaign variance not aligned with the agreed SOW, our representatives will work with you to resolve the matter promptly.',
          'In instances where a project is terminated prior to kickoff or before significant hours have been billed, a prorated refund minus administrative setup fees may be evaluated on a case-by-case basis.'
        ]
      },
      {
        heading: '4. Dispute Resolution & Contact',
        paragraphs: [
          'If you have questions regarding our refund policy or need assistance with billing inquiries, please contact our financial department at info@eon8.com or call +91 90422 94007.',
          'Our team will review your account details and provide a formal written assessment within 5 business days.'
        ]
      }
    ]
  },
  'delivery-policy': {
    slug: 'delivery-policy',
    metaTitle: 'Delivery Policy | Eon8 - Service Timelines & Deliverables',
    metaDesc: 'Learn how Eon8 delivers digital marketing campaigns, SEO milestones, software development sprints, and analytics reports.',
    title: 'Delivery Policy',
    subtitle: 'Standard timelines, onboarding milestones, and service delivery frameworks',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Commitment to Timely Delivery',
        paragraphs: [
          'EON8 is committed to delivering the promised digital marketing services, custom web development, and Web3 solutions in accordance with the timelines established in each client proposal and Master Services Agreement (MSA).',
          'We leverage modern project management frameworks and sprint workflows to ensure transparency and accountability at every stage of execution.'
        ]
      },
      {
        heading: '2. Immediate & Ongoing Service Delivery',
        paragraphs: [
          'What services begin immediately upon contract execution?',
          '• Social Media Marketing: Account onboarding, brand asset gathering, and social calendar development begin within 48 to 72 hours of agreement execution.',
          '• Search Engine Optimization (SEO): Initial technical audits, keyword mapping, and competitor benchmarks are initiated within the first 5 business days.',
          '• Pay-Per-Click Advertising (PPC): Ad accounts, pixel integrations, and campaign structures are typically configured and launched within 3 to 7 business days following budget authorization.',
          '• Web Development & AI Agents: Delivered in structured sprints (Wireframes -> UI Design -> Development -> QA Testing -> Staging Deployment -> Production Launch) as outlined in the project roadmap.'
        ]
      },
      {
        heading: '3. Deliverable Formats & Reporting',
        paragraphs: [
          'Deliverables are provided via digital channels, including:',
          '• Cloud Git Repositories and hosted staging environments for code development',
          '• Figma and Adobe XD workspace links for visual UI/UX designs',
          '• Live interactive Looker Studio dashboards for real-time traffic and conversion analytics',
          '• Comprehensive monthly PDF performance summaries detailing key metrics, rankings, and recommended next steps.'
        ]
      },
      {
        heading: '4. Client Dependencies & Delays',
        paragraphs: [
          'Timely delivery is a collaborative effort. Deadlines may be adjusted if required client assets (e.g. brand logos, API access credentials, content approvals, or DNS access) are delayed.',
          'We notify clients immediately of any critical path dependencies that could impact anticipated delivery schedules.'
        ]
      },
      {
        heading: '5. Inquiries & Contact',
        paragraphs: [
          'For any questions regarding deliverable status or upcoming milestones, please contact your designated Eon8 Account Manager or reach our operations desk at info@eon8.com.'
        ]
      }
    ]
  }
};
