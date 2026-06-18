export interface DigitalServiceData {
  pathKey: string;
  metaTitle: string;
  metaDesc: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPoints: string[];
  introTitle: string;
  introDesc: string;
  servicesTitle: string;
  servicesSubtitle: string;
  services: { title: string; desc: string }[];
  processTitle: string;
  processSteps: { title: string; desc: string }[];
  whyTitle: string;
  whyDesc: string;
  faqs: { q: string; a: string }[];
}

export const digitalPagesData: Record<string, DigitalServiceData> = {
  "search-engine-optimization-services-seo": {
    pathKey: "search-engine-optimization-services-seo",
    metaTitle: "Enterprise Search Engine Optimization SEO Services | Eon8",
    metaDesc: "Eon8 is a leading SEO agency offering data-driven, white-hat search engine optimization services to boost search rankings, traffic, and ROI.",
    heroTitle: "Enterprise Search Engine Optimization SEO Services",
    heroSubtitle: "Dominate Google search results, drive qualified organic traffic, and accelerate revenue growth with our data-driven SEO strategies.",
    heroPoints: ["White-Hat SEO", "Keyword Mastery", "Quality Backlinks", "Technical Audits"],
    introTitle: "Drive Growth with Strategic SEO",
    introDesc: "Search Engine Optimization (SEO) is the cornerstone of a sustainable online presence. At Eon8, we provide comprehensive SEO services that align with your business goals. We do not believe in short-cuts or temporary hacks; we implement robust, white-hat SEO strategies that yield long-term search engine visibility. Our dedicated SEO specialists analyze your target audience, identify high-intent search terms, and execute custom campaigns to bring high-converting traffic directly to your website.",
    servicesTitle: "Our SEO Services Blueprint",
    servicesSubtitle: "A holistic search campaign designed to scale your search visibility and site authority",
    services: [
      {
        title: "Technical SEO Audits",
        desc: "We analyze site crawlability, page speed, core web vitals, indexing, schema tags, and site structure to eliminate ranking blockers."
      },
      {
        title: "On-Page Optimization",
        desc: "Optimizing page content, meta tags, heading hierarchies, URL formats, and internal link distributions to maximize indexing relevancy."
      },
      {
        title: "High-Quality Link Acquisition",
        desc: "Securing authority backlinks through digital PR, broken link building, and targeted outreach campaigns to increase page rankings."
      },
      {
        title: "Content Marketing SEO",
        desc: "Drafting engaging, informative, and keyword-optimized articles and resources that establish your brand as an industry authority."
      },
      {
        title: "Competitor Analysis",
        desc: "Detailed competitive mapping of rankings, backlink profiles, and traffic sources to discover untapped ranking opportunities."
      },
      {
        title: "Local Search SEO Integration",
        desc: "Optimizing directory listings, local maps, and citation consistency to dominate local geographical search inquiries."
      }
    ],
    processTitle: "Our Search Engine Optimization Lifecycle",
    processSteps: [
      {
        title: "Discover & Audit",
        desc: "We run a comprehensive technical and content audit on your site to evaluate crawl status, indexing gaps, and speed constraints."
      },
      {
        title: "Keyword & Strategy Map",
        desc: "Identify high-value keywords and map them to existing or new landing pages matching searcher intents."
      },
      {
        title: "Execution & Build",
        desc: "Optimize on-page code elements, speed parameters, write high-authority content, and construct backlink structures."
      }
    ],
    whyTitle: "Why Choose Eon8 as Your SEO Company?",
    whyDesc: "With years of SEO experience helping enterprise businesses and high-growth startups rank globally, we deliver transparent, performance-focused SEO campaigns. We keep you informed with detailed analytics dashboards, avoiding vanity metrics and focusing strictly on keyword conversions, organic sessions growth, and bottom-line revenue.",
    faqs: [
      {
        q: "What is Search Engine Optimization (SEO)?",
        a: "SEO is the ongoing process of optimizing a website's design, content, and external authority signals so that search engines like Google can easily crawl, index, and rank the site for relevant search queries."
      },
      {
        q: "How long does it take to see tangible SEO results?",
        a: "Typically, noticeable rankings shifts and traffic improvements are achieved within 3 to 6 months. SEO is a long-term compound investment that builds search equity and reduces client acquisition costs over time."
      },
      {
        q: "Do you use safe, white-hat link-building techniques?",
        a: "Yes. Eon8 strictly follows search engine webmaster guidelines. We acquire natural links through content promotion, guest blogging, PR outreach, and citation listings, keeping your site safe from algorithm penalties."
      }
    ]
  },
  "local-seo-agency": {
    pathKey: "local-seo-agency",
    metaTitle: "Local SEO Agency & Services | Rank in Local Pack - Eon8",
    metaDesc: "Dominate local search queries. Eon8 local SEO agency helps businesses rank #1 in the Google Local Pack and map results to drive nearby customers.",
    heroTitle: "Targeted Local SEO Services Agency",
    heroSubtitle: "Attract nearby customers, rank #1 in the Google Local Pack, and grow footprint traffic with our local search solutions.",
    heroPoints: ["Google Business Pack", "Local Citations", "Review Growth", "Local Page Mappings"],
    introTitle: "Connect with Customers in Your Area",
    introDesc: "Local SEO is crucial for businesses aiming to attract customers in specific cities or zip codes. At Eon8, we specialize in local search algorithms, ensuring that your locations pop up right when local searchers are seeking your services. We map Google Business Profiles, optimize geographical citations, and manage review acquisition campaigns to establish your business as the preferred choice in your local community.",
    servicesTitle: "Local Search Optimization Solutions",
    servicesSubtitle: "Tailored local search signals to maximize map exposure and foot traffic",
    services: [
      {
        title: "Google Business Profile Optimization",
        desc: "Setting up, verifying, and fully optimizing your GBP listings with keyword descriptions, operating hours, geotagged photos, and Q&As."
      },
      {
        title: "Citation Auditing & Management",
        desc: "Building consistent NAP (Name, Address, Phone) citations across premium directories like Yelp, YellowPages, Apple Maps, and Bing Places."
      },
      {
        title: "Local Link Building",
        desc: "Acquiring localized backlinks from neighborhood blogs, directories, local chambers of commerce, and regional sponsors."
      },
      {
        title: "Geo-Targeted Content Creation",
        desc: "Developing localized landing pages and blog content that directly target regional topics, events, and location-specific pain points."
      }
    ],
    processTitle: "Local SEO Milestones",
    processSteps: [
      {
        title: "Profile Audit",
        desc: "We analyze citation consistency and audit Google Business Profile health for compliance gaps."
      },
      {
        title: "Citation Campaign",
        desc: "Build new directories, clean duplicate listings, and enforce name-address-phone alignment."
      },
      {
        title: "Review Acquisition",
        desc: "Implement systems to solicit reviews from happy clients and handle localized feedback loops."
      }
    ],
    whyTitle: "Why Hire Eon8 for Local SEO?",
    whyDesc: "We understand that local visibility translates directly into phone calls, location visits, and direct sales. Our team uses top-tier local intelligence tools to manage multi-location listings with absolute accuracy, providing real-time call tracking and citation health reports.",
    faqs: [
      {
        q: "What is Local SEO?",
        a: "Local SEO is a subset of search engine optimization focusing on optimization signals that target search queries with local intent (e.g. 'plumber near me' or 'pizza in Mumbai')."
      },
      {
        q: "How does Google determine local ranking?",
        a: "Google uses three primary local ranking factors: Relevance (how well a listing matches a search query), Distance (how close the location is to the searcher), and Prominence (the overall online popularity and reputation of the business)."
      }
    ]
  },
  "ecommerce-seo-services": {
    pathKey: "ecommerce-seo-services",
    metaTitle: "eCommerce SEO Services Agency | Rank Product Pages - Eon8",
    metaDesc: "Drive sales to your online store. Eon8 eCommerce SEO services optimize product pages, category grids, and schema markup for maximum traffic.",
    heroTitle: "Ecommerce SEO Services Agency",
    heroSubtitle: "Rank your product pages, category grids, and brand terms to drive massive organic sales and maximize Shopify/WooCommerce revenue.",
    heroPoints: ["Product Page Audits", "Schema Integration", "Faceted Nav Tuning", "Ecommerce Link Building"],
    introTitle: "Boost Organic Conversions for Your Store",
    introDesc: "Selling online is highly competitive. Without robust search visibility, you lose thousands of shoppers to giants like Amazon. Eon8's eCommerce SEO services focus on high-intent keywords that turn browse clicks into completed checkout sales. We optimize page structures, category layouts, product descriptions, and structural schema markup to position your store on the front page of search results.",
    servicesTitle: "Our eCommerce SEO Scope",
    servicesSubtitle: "Comprehensive technical and creative optimizations to maximize shop traffic",
    services: [
      {
        title: "Category & Product Optimization",
        desc: "Drafting unique, persuasive description copies optimized with transactional keyword triggers and calls-to-action."
      },
      {
        title: "Faceted Navigation Auditing",
        desc: "Resolving duplicate URL configurations, index bloat issues, and thin pages generated by filters and size options."
      },
      {
        title: "Product Schema Implementation",
        desc: "Adding advanced JSON-LD structured data showing ratings, pricing, and stock availability directly in search listings."
      },
      {
        title: "Digital PR & Ecom Links",
        desc: "Outreach to gift guides, product review blogs, and lifestyle influencers to build premium product backlink authority."
      }
    ],
    processTitle: "Ecommerce Optimization Workflow",
    processSteps: [
      {
        title: "Platform Crawl",
        desc: "We analyze Shopify, WooCommerce, or Custom Node architectures for index blockages and page load latency."
      },
      {
        title: "Intent Mapping",
        desc: "Align category and product keywords with search intents, prioritizing low-hanging transactional searches."
      },
      {
        title: "Content & PR Scale",
        desc: "Deploy schema metadata, draft optimized product guides, and launch media outreach campaigns."
      }
    ],
    whyTitle: "Why Partner with Eon8 for eCommerce SEO?",
    whyDesc: "We have worked across major platforms including Shopify, Magento, WooCommerce, BigCommerce, and custom headless stacks. Our SEO experts optimize product listings to increase average order value, maximize conversion rates, and build long-term site equity.",
    faqs: [
      {
        q: "What is eCommerce SEO?",
        a: "Ecommerce SEO is the specialized practice of optimizing an online storefront's technical architecture, category indexation, and product copy to attract shoppers searching for products online."
      },
      {
        q: "How do you handle duplicate content issues?",
        a: "We resolve duplicate content generated by color/size variations by configuring canonical tags, implementing correct robots rules, and redirecting obsolete URLs."
      }
    ]
  },
  "mobile-seo-agency-eon8-seo-services": {
    pathKey: "mobile-seo-agency-eon8-seo-services",
    metaTitle: "Mobile SEO Agency & Services | Mobile-First Indexing - Eon8",
    metaDesc: "Optimize for the mobile web. Eon8 mobile SEO agency fine-tunes mobile page speed, Core Web Vitals, and responsive layouts for top search rank.",
    heroTitle: "High-Performance Mobile SEO Services Agency",
    heroSubtitle: "Optimize your mobile web presence for speed, core web vitals, responsiveness, and Google's mobile-first indexing.",
    heroPoints: ["Mobile Speed Optimization", "Core Web Vitals", "UX Alignment", "AMP Integration"],
    introTitle: "Dominate the Mobile-First Web",
    introDesc: "Over 60% of web searches originate from mobile devices. Google exclusively indexes the mobile version of websites. At Eon8, we ensure that your mobile layout loads instantly, scales perfectly, and offers an unmatched user experience on all smartphones. We debug slow Javascript resources, optimize assets sizes, and streamline mobile checkout flows to maximize search performance.",
    servicesTitle: "Mobile Optimization Scope",
    servicesSubtitle: "Advanced techniques to align your site with Google's mobile algorithms",
    services: [
      {
        title: "Mobile Speed Optimization",
        desc: "Compressing images, lazy-loading resources, minimizing code structures, and leverage server caching to hit high mobile speeds."
      },
      {
        title: "Core Web Vitals Remediation",
        desc: "Optimizing LCP, CLS, and INP metrics on mobile networks to satisfy Google's search algorithms."
      },
      {
        title: "Mobile UX/UI Audits",
        desc: "Checking target click zones, text readability, menu structures, and checkout forms for friction-free mobile navigation."
      },
      {
        title: "Vary / Responsive Configuration",
        desc: "Ensuring responsive layout styles adjust properly, preventing scaling issues or resource load overheads."
      }
    ],
    processTitle: "Mobile SEO Audit Process",
    processSteps: [
      {
        title: "Simulated Audits",
        desc: "We analyze layouts on simulated mobile viewports across slow 3G/4G networks."
      },
      {
        title: "Code Optimizations",
        desc: "Resolve cumulative layout shifts, critical rendering paths, and server response speeds."
      },
      {
        title: "Mobile Verification",
        desc: "Validate pages against Google Mobile Usability checkups to confirm clean rendering."
      }
    ],
    whyTitle: "Why Choose Eon8 for Mobile SEO?",
    whyDesc: "We combine deep technical frontend expertise with search engine optimization strategies. Our optimization plans improve mobile page speed while boosting conversion rates and user retention.",
    faqs: [
      {
        q: "What is Mobile SEO?",
        a: "Mobile SEO is the process of optimizing a website to ensure that visitors browsing from mobile devices have a seamless experience, and that the site ranks well in mobile search results."
      },
      {
        q: "What is Google's Mobile-First Indexing?",
        a: "Mobile-first indexing means Google uses the mobile version of the content for indexing and ranking, making mobile compatibility the primary ranking baseline."
      }
    ]
  },
  "small-business-seo-services": {
    pathKey: "small-business-seo-services",
    metaTitle: "SEO for Small Business | Affordable Search Rankings - Eon8",
    metaDesc: "Scale your business online. Eon8 small business SEO services offer cost-effective, high-impact campaigns to outrank major competitors.",
    heroTitle: "Affordable SEO Services for Small Businesses",
    heroSubtitle: "Level the playing field, outrank larger competitors, and drive local leads with cost-effective, high-impact SEO packages.",
    heroPoints: ["Niche Keyword Targets", "Optimized Content", "Competitor Hijacking", "Transparent Analytics"],
    introTitle: "Outrank Big Competitors on a Budget",
    introDesc: "Small businesses need to extract maximum value from every marketing dollar. At Eon8, we design highly targeted small business SEO services that focus on high-intent, low-difficulty keywords. By bypassing overly competitive terms, we secure ranking wins that bring ready-to-buy customers straight to your business.",
    servicesTitle: "Small Business SEO Scope",
    servicesSubtitle: "Focused SEO tactics to deliver rapid visibility and lead growth",
    services: [
      {
        title: "Niche Keyword Targeting",
        desc: "Researching long-tail keyword combinations that have lower competition and higher purchase intent."
      },
      {
        title: "On-Page Optimization",
        desc: "Tuning page metadata, body copies, layout headers, and links to align with small business service categories."
      },
      {
        title: "Local Google Profile Sync",
        desc: "Linking Google Business Profile metrics with on-page SEO content to maximize visibility in maps pack."
      },
      {
        title: "Affordable Citation Management",
        desc: "Building listings on local directories to establish trust and search relevance without massive budget layout."
      }
    ],
    processTitle: "Small Business Strategy Flow",
    processSteps: [
      {
        title: "Quick-Wins Audit",
        desc: "We scan the website to identify quick technical improvements that yield immediate index boosts."
      },
      {
        title: "Content Alignment",
        desc: "Develop dedicated service landing pages containing localized, high-value keyword structures."
      },
      {
        title: "Weekly Check-ins",
        desc: "Track rankings movement and adjust focus areas to guarantee rapid traffic acquisition."
      }
    ],
    whyTitle: "Why Choose Eon8 for Small Business SEO?",
    whyDesc: "We offer budget-friendly SEO packages tailored for small service providers, shops, and startups. We focus strictly on conversions and organic inquiries rather than complex jargon, giving you measurable business growth.",
    faqs: [
      {
        q: "Can a small business compete with major brands in search?",
        a: "Yes. By targeting niche keyword combinations, localized queries, and long-tail topics, small businesses can outrank national brands for highly profitable search intents."
      },
      {
        q: "What is the budget for small business SEO?",
        a: "Eon8 provides customizable SEO packages starting at budget-friendly points, scaling as your business generates traffic and sales."
      }
    ]
  },
  "link-building-services-for-high-rankings": {
    pathKey: "link-building-services-for-high-rankings",
    metaTitle: "High-Authority Link Building Services | Safe Backlinks - Eon8",
    metaDesc: "Supercharge your site authority. Eon8 link building services secure safe, high-quality editorial backlinks from top industry sites.",
    heroTitle: "High-Authority Link Building Services",
    heroSubtitle: "Acquire safe, natural, and editorial backlinks from top authority sites to increase domain authority and search visibility.",
    heroPoints: ["Premium Publisher Network", "Custom Outreach", "Strict Spam Filter", "Anchor Optimization"],
    introTitle: "Secure Authority Backlinks That Drive Rank",
    introDesc: "Backlinks are one of the most critical search ranking factors. However, low-quality spam backlinks can cause severe search penalties. Eon8's link building services focus exclusively on manual, relationship-driven outreach. We build partnerships with premium publishers, tech blogs, and authority resource pages to place natural links that boost your domain rating safely.",
    servicesTitle: "Our Backlink Scope",
    servicesSubtitle: "Diverse link acquisition tactics designed for safety and search authority",
    services: [
      {
        title: "Guest Article Placements",
        desc: "Writing high-quality guest posts for authority industry publications to acquire natural, in-content links."
      },
      {
        title: "Broken Link Replacement",
        desc: "Scanning authority pages for broken links, drafting replacements, and pitching your resources to publishers."
      },
      {
        title: "Digital PR Campaign",
        desc: "Distributing press releases and asset stories to top-tier media channels for high-authority placements."
      },
      {
        title: "Resource Page Outreach",
        desc: "Submitting your comprehensive guides and digital assets to popular resource libraries in your industry."
      }
    ],
    processTitle: "Link Acquisition Process",
    processSteps: [
      {
        title: "Vetting Targets",
        desc: "We filter potential link targets using metrics like Domain Rating, Organic Traffic, and Spam Scores."
      },
      {
        title: "Pitch & Outreach",
        desc: "Launch personalized email outreach to editors, pitch content angles, and negotiate placements."
      },
      {
        title: "Placements Check",
        desc: "Verify that backlink attributes are clean and ensure permanent placements."
      }
    ],
    whyTitle: "Why Trust Eon8 for Link Building?",
    whyDesc: "We avoid automated link networks, PBNs, and low-quality directories. Every backlink we secure is manuals-vetted, editorial-friendly, and safe against search engine algorithm updates, building real long-term authority.",
    faqs: [
      {
        q: "What is Link Building?",
        a: "Link building is the process of acquiring links from other websites to your own. Backlinks act as search trust signals, telling search engines that your content is authoritative."
      },
      {
        q: "How do you check link quality?",
        a: "We assess targets based on active search traffic, domain rating metrics, spam scores, topical alignment, and target audience engagement."
      }
    ]
  },
  "game-marketing-agency-video-mobile-gaming": {
    pathKey: "game-marketing-agency-video-mobile-gaming",
    metaTitle: "Game Marketing Agency | App Installs & Game Launches - Eon8",
    metaDesc: "Drive game installs. Eon8 game marketing agency manages app store optimization (ASO), influencer reviews, and paid user acquisition campaigns.",
    heroTitle: "Game Marketing Agency for Mobile & Video Games",
    heroSubtitle: "Acquire millions of players, drive app installs, and coordinate viral launch campaigns for mobile, PC, and console games.",
    heroPoints: ["ASO Optimizations", "KOL & Influencer Plays", "Hype Pre-Registrations", "Community Hype"],
    introTitle: "Launch & Scale Your Gaming Titles",
    introDesc: "In a crowded gaming market, visibility makes or breaks a game's success. At Eon8, we manage end-to-end game marketing campaigns that capture players' interest pre-launch and sustain player volume post-release. From optimizing App Store and Google Play assets (ASO) to coordinating influencer play reviews and paid player acquisition campaigns, we scale installs efficiently.",
    servicesTitle: "Gaming Launch Blueprint",
    servicesSubtitle: "Comprehensive marketing tactics to scale player volume and retention",
    services: [
      {
        title: "App Store Optimization (ASO)",
        desc: "Optimizing title names, keyword fields, description copy, app icons, and screen previews to drive organic search store installs."
      },
      {
        title: "Gaming Influencer Placements",
        desc: "Partnering with Twitch streamers and YouTube gamers for dedicated reviews and sponsored play sessions."
      },
      {
        title: "Paid UA Campaigns",
        desc: "Coordinating performance-driven install ads on Unity Ads, AppLovin, Google Ads, TikTok, and Meta."
      },
      {
        title: "Discord Community Creation",
        desc: "Setting up and moderating official game servers to engage players, organize events, and manage retention."
      }
    ],
    processTitle: "Game Marketing Lifecycle",
    processSteps: [
      {
        title: "Pre-Reg Campaign",
        desc: "Create pre-registration pages, launch teasers, and incentivize sign-ups to build launch-day momentum."
      },
      {
        title: "Launch Blast",
        desc: "Synchronize influencer play videos, paid app install campaigns, and press releases to spike rankings."
      },
      {
        title: "Post-Launch Growth",
        desc: "Analyze player acquisition costs, run retargeting ads, and manage updates to maintain player retention."
      }
    ],
    whyTitle: "Why Choose Eon8 for Game Marketing?",
    whyDesc: "We combine app store indexing expertise with gaming influencer networks. Our performance-driven campaigns focus on player lifetime value (LTV), acquisition cost optimizations, and sustaining long-term player community engagement.",
    faqs: [
      {
        q: "What does ASO stand for in game marketing?",
        a: "ASO stands for App Store Optimization, which is the process of improving a mobile game's visibility and conversion rate in app stores like Apple App Store and Google Play."
      },
      {
        q: "How do you coordinate influencer gaming campaigns?",
        a: "We work directly with streamers and gamers who match your target genre, setting up sponsored playthroughs, giveaways, and review integrations."
      }
    ]
  },
  "ecommerce-website-development-services": {
    pathKey: "ecommerce-website-development-services",
    metaTitle: "eCommerce Website Development Services | Shopify & Custom Shops - Eon8",
    metaDesc: "Build lightning-fast online shops. Eon8 ecommerce development services build custom stores on Shopify, WooCommerce, and Magento.",
    heroTitle: "Ecommerce Website Development Services",
    heroSubtitle: "Build custom, lightning-fast, and high-converting online stores using Shopify, WooCommerce, Magento, or headless custom commerce frameworks.",
    heroPoints: ["Shopify & WooCommerce", "Custom UI UX Design", "Headless Architecture", "Secure Gateways"],
    introTitle: "Engineered for Sales and Scale",
    introDesc: "An eCommerce store should be fast, secure, and built to convert browsing sessions into checkouts. Eon8's development team engineers online stores that load instantly, scale with massive holiday sales volume, and feature clean checkout user flows. We build custom store themes, integrate custom APIs, and set up multi-currency payment portals.",
    servicesTitle: "Store Engineering Scope",
    servicesSubtitle: "Professional development services to launch and optimize online retail",
    services: [
      {
        title: "Shopify & WooCommerce Builds",
        desc: "Developing custom, fully-functional storefront themes and configuring app ecosystems for rapid store launches."
      },
      {
        title: "Headless eCommerce Frameworks",
        desc: "Engineering React / Next.js storefronts connected to headless backends (Shopify Plus, Commerce layer) for high speed."
      },
      {
        title: "API & Gateway Integrations",
        desc: "Integrating ERPs, inventory management systems, shipping services (DHL, FedEx), and payment processors (Stripe, PayPal)."
      },
      {
        title: "Speed Optimization Audits",
        desc: "Optimizing script sizes, compression rates, caching configurations, and server loads to speed up store catalog pages."
      }
    ],
    processTitle: "Development Lifecycle",
    processSteps: [
      {
        title: "UI UX Blueprint",
        desc: "Designing Figma mockups of product pages, cart popups, search configurations, and desktop layouts."
      },
      {
        title: "Coding & Config",
        desc: "Coding store structures, configuring back-end inventory databases, and securing SSL checkouts."
      },
      {
        title: "Testing & Launch",
        desc: "Simulating checkout runs across multiple devices, verifying integrations, and launching storefronts."
      }
    ],
    whyTitle: "Why Build Your Shop with Eon8?",
    whyDesc: "We blend custom store code with search optimization best practices. Every e-commerce site we build is mobile-responsive, structured for high SEO indexation, and optimized for high checkout completion rates.",
    faqs: [
      {
        q: "Which eCommerce platform is best for my business?",
        a: "The ideal platform depends on store size and requirements. Shopify is great for rapid deployment, WooCommerce for customization, and Headless architectures for high-performance enterprise needs."
      },
      {
        q: "Will my online store be mobile-responsive?",
        a: "Yes. All storefront architectures designed by Eon8 use responsive layouts, ensuring that shopping runs flawlessly on all devices."
      }
    ]
  },
  "web-design-development-services-chennai": {
    pathKey: "web-design-development-services-chennai",
    metaTitle: "Web Design & Development Services | Custom Websites - Eon8",
    metaDesc: "Create stunning custom websites. Eon8 offers responsive design, React development, custom portals, and database solutions.",
    heroTitle: "Custom Web Design & Development Agency",
    heroSubtitle: "Create visually stunning, mobile-responsive, and blazing-fast corporate websites, portals, and custom web applications tailored to your business needs.",
    heroPoints: ["Stunning Visual UI UX", "Next/React Frameworks", "API Development", "Speed & Security Boosts"],
    introTitle: "Web Designs That Build Real Authority",
    introDesc: "Your website is the digital face of your business. A slow, outdated design compromises brand credibility. Eon8's design and engineering division creates corporate websites and web apps that deliver a stunning first impression. We combine visual design systems, user-centric wireframes, and optimized codebase frameworks to build sites that load in under a second and look exceptional.",
    servicesTitle: "Our Website Design & Development Scope",
    servicesSubtitle: "From wireframes to custom code, we build responsive web platforms",
    services: [
      {
        title: "Interactive UI/UX Design",
        desc: "Creating visually premium layouts, Figma wireframes, customized fonts palettes, and subtle CSS animations."
      },
      {
        title: "React & React-Native Development",
        desc: "Coding interactive frontend structures using React, Next.js, and Vite for lightning-fast, SPA loads."
      },
      {
        title: "CMS Integrations",
        desc: "Configuring headless CMS tools like Sanity, Strapi, or standard WordPress setups to allow simple content editing."
      },
      {
        title: "Web Security & Auditing",
        desc: "Configuring SSL encryptions, firewalls, and optimized server routing configurations to protect site databases."
      }
    ],
    processTitle: "Development Milestones",
    processSteps: [
      {
        title: "Wireframes & Mockups",
        desc: "Draft layout patterns and design visual themes inside Figma for user verification."
      },
      {
        title: "Coding & API Setup",
        desc: "Construct clean, component-based codebases and hook up custom backend API endpoints."
      },
      {
        title: "Deploy & Optimization",
        desc: "Launch pages on reliable cloud servers, optimize compression rates, and complete site diagnostics."
      }
    ],
    whyTitle: "Why Choose Eon8 Web Studio?",
    whyDesc: "We build websites with clean, search-friendly code structures. Our engineering processes are optimized for SEO compliance, fast page loading speed (Core Web Vitals), and high conversion outcomes.",
    faqs: [
      {
        q: "Do you write custom code or use templates?",
        a: "We design and engineer completely custom websites tailored to your exact brand styling and functionality requirements, using clean component-based architectures."
      },
      {
        q: "Will my website load fast?",
        a: "Yes. We strictly optimize loading speeds by using lightweight frameworks (Vite/Next), leveraging caching systems, and optimizing asset compression to guarantee immediate page rendering."
      }
    ]
  },
  "social-media-brand-management-agency-chennai": {
    pathKey: "social-media-brand-management-agency-chennai",
    metaTitle: "Social Media Brand Management Agency | Build Reputation - Eon8",
    metaDesc: "Build and manage your brand reputation. Eon8 social media brand management services establish strong brand voices across Facebook, X, and Instagram.",
    heroTitle: "Social Media Brand Management Agency",
    heroSubtitle: "Shape your brand identity, manage public perception, and engage loyal customer bases across major social networks.",
    heroPoints: ["Brand Integrity", "Vigilant Listening", "Content Style Guides", "Real-Time PR"],
    introTitle: "Proactive Brand Management & Listening",
    introDesc: "Your social media channels are the direct touchpoint between your brand and your customers. At Eon8, we provide expert social media brand management services to maintain your brand voice, manage user reviews, and design strategic content frameworks. We track mentions, manage complaints, and build community hype to ensure your business maintains a positive public image.",
    servicesTitle: "Brand Management Framework",
    servicesSubtitle: "Comprehensive monitoring and creative campaigns to align your online voice",
    services: [
      {
        title: "Social Media Brand Audits",
        desc: "We analyze your historical posts, user engagement metrics, and competitor profiles to establish a unified voice guideline."
      },
      {
        title: "Brand Listening & Monitoring",
        desc: "Tracking brand mentions, direct reviews, and negative sentiment spikes to address concerns immediately."
      },
      {
        title: "Creative Content Calendars",
        desc: "Developing aesthetic, structured posting plans that highlight your brand principles, products, and milestones."
      },
      {
        title: "Crisis PR Management",
        desc: "Active monitoring and response templates to handle negative comments or brand crises with maximum speed and professionalism."
      }
    ],
    processTitle: "Brand Management Process",
    processSteps: [
      {
        title: "Brand Blueprint",
        desc: "Define typography rules, color themes, caption guidelines, and response protocols."
      },
      {
        title: "Vigilant Listening",
        desc: "Configure automated notification trackers for direct tag mentions and competitor updates."
      },
      {
        title: "Engagement Growth",
        desc: "Publish daily content, host interactive QA runs, and organize fan reviews."
      }
    ],
    whyTitle: "Why Choose Eon8 for Brand Management?",
    whyDesc: "We do not just schedule generic posts. We act as protectors of your brand's digital identity, aligning our creative work with your core business values to turn casual followers into dedicated brand advocates.",
    faqs: [
      {
        q: "What is Social Media Brand Management?",
        a: "It is the strategic process of monitoring, listening, and crafting custom social media content to maintain a consistent, positive public reputation for your brand."
      },
      {
        q: "How do you handle negative feedback?",
        a: "We address negative reviews using customer-first, pre-approved response scripts, taking the conversation to private support channels to resolve concerns swiftly."
      }
    ]
  },
  "social-media-management-agency-chennai": {
    pathKey: "social-media-management-agency-chennai",
    metaTitle: "Best Social Media Management Agency | Content & Posting - Eon8",
    metaDesc: "Grow your social channels. Eon8 social media management agency schedules content, coordinates captions, and drives page engagement.",
    heroTitle: "Professional Social Media Management Agency",
    heroSubtitle: "Sustain daily community engagement, automate posting pipelines, and optimize channel growth across Instagram, TikTok, LinkedIn, and YouTube.",
    heroPoints: ["Cross-Channel Strategy", "Dedicated Page Managers", "Visual Graphic Templates", "Detailed Analytic Reports"],
    introTitle: "Hands-Free Social Media Growth",
    introDesc: "Managing multiple social media channels can be overwhelming. Eon8 takes the weight off your shoulders. We research content ideas, draft engaging captions, produce visual post templates, and handle daily scheduling. Our goal is to drive high organic reach, grow your follower base, and keep your community engaged.",
    servicesTitle: "Management Operations Scope",
    servicesSubtitle: "Professional page operations to maximize organic channel traction",
    services: [
      {
        title: "Multi-Platform Administration",
        desc: "Scheduling and publishing posts across Instagram, Facebook, X, LinkedIn, TikTok, and YouTube."
      },
      {
        title: "Caption & Hashtag Research",
        desc: "Writing search-optimized captions and research relevant tags to boost discoverability."
      },
      {
        title: "Visual Graphic Design",
        desc: "Designing post graphics, banners, slides, and stories templates that match your brand aesthetics."
      },
      {
        title: "Community Moderation",
        desc: "Answering direct messages, responding to comments, and encouraging follower interaction."
      }
    ],
    processTitle: "Our Management Lifecycle",
    processSteps: [
      {
        title: "Content Lab",
        desc: "Brainstorm topics, draft copy variations, and design graphic templates."
      },
      {
        title: "Publishing Automation",
        desc: "Verify copy checklists and load posts into scheduling systems for optimal local times."
      },
      {
        title: "Analytics Review",
        desc: "Compile monthly reports tracking growth patterns, best-performing content, and reach."
      }
    ],
    whyTitle: "Why Partner with Eon8 for Social Management?",
    whyDesc: "We provide dedicated social media managers for your brand, ensuring rapid response times, highly custom content creation, and absolute transparency through weekly dashboards.",
    faqs: [
      {
        q: "What does social media management include?",
        a: "It includes strategy development, post creation, caption drafting, graphic design, direct community moderation, publishing, and channel performance reporting."
      },
      {
        q: "How often will you post on our accounts?",
        a: "We customize posting frequencies depending on your package, typically ranging from 3 to 7 posts per week per platform."
      }
    ]
  },
  "facebook-marketing-agency-in-chennai": {
    pathKey: "facebook-marketing-agency-in-chennai",
    metaTitle: "Facebook Marketing Agency | Paid Facebook Ads - Eon8",
    metaDesc: "Scale sales with paid ads. Eon8 Facebook marketing agency manages high-ROAS paid campaign funnels and pixel analytics configurations.",
    heroTitle: "Result-Driven Facebook Marketing Agency",
    heroSubtitle: "Scale user acquisition, launch high-ROAS paid ads campaigns, and manage organic page presence on Facebook.",
    heroPoints: ["Paid Ads Mastery", "Pixel Target Tracking", "Custom Ad Copies", "LTV Optimizations"],
    introTitle: "Convert Browsing to Buying with Facebook Ads",
    introDesc: "With billions of active users, Facebook remains a powerhouse for customer acquisition. Eon8 designs target paid ads campaigns that put your products directly in front of buyers. We install pixel tracking systems, build custom lookalike audiences, and run A/B copy tests to ensure every ad dollar drives maximum conversion returns.",
    servicesTitle: "Facebook Ads Scope of Work",
    servicesSubtitle: "Performance-driven paid campaign setup and catalog integrations",
    services: [
      {
        title: "Campaign Structure & Bidding",
        desc: "Building CBO (Campaign Budget Optimization) frameworks and setting up bid limits to keep costs low."
      },
      {
        title: "Custom Audience Targeting",
        desc: "Building lookalike segments from customer lists, tracking pixel visitors, and targeting based on exact interests."
      },
      {
        title: "A/B Testing Creatives",
        desc: "Testing headline layouts, product image designs, video teasers, and calls-to-action to find top performers."
      },
      {
        title: "Dynamic Catalog Ads",
        desc: "Integrating product databases with Meta catalogs to show retargeting ads of products users viewed."
      }
    ],
    processTitle: "Paid Ads Optimization Pipeline",
    processSteps: [
      {
        title: "Pixel Setup",
        desc: "Deploy Meta pixel tracking and configure conversion APIs for precise event measurement."
      },
      {
        title: "Creative Deployment",
        desc: "Design image variations, build text sets, and set up campaign tests."
      },
      {
        title: "ROAS Tuning",
        desc: "Turn off low-performing ads, scale successful budgets, and refresh ad copies to avoid fatigue."
      }
    ],
    whyTitle: "Why Choose Eon8 for Facebook Marketing?",
    whyDesc: "We focus on real metrics (conversions, purchase value, leads) rather than simple likes. Our team helps you optimize target customer acquisition costs to ensure long-term campaign profitability.",
    faqs: [
      {
        q: "What budget do I need for Facebook ads?",
        a: "We recommend starting with a modest test budget (e.g. $50/day) to test audiences and creatives, scaling up once high conversion rates are established."
      },
      {
        q: "What is Facebook Pixel?",
        a: "The Facebook Pixel is a snippet of tracking code installed on your website to measure conversion actions, build custom audiences, and optimize ad relevance."
      }
    ]
  },
  "twitter-marketing-agency-in-chennai-marketing": {
    pathKey: "twitter-marketing-agency-in-chennai-marketing",
    metaTitle: "Twitter Marketing Agency | X Twitter Growth & Threads - Eon8",
    metaDesc: "Build virality on X. Eon8 Twitter marketing agency creates viral threads, coordinates trend hijacking, and manages tech communities.",
    heroTitle: "Twitter Marketing & Campaign Agency",
    heroSubtitle: "Build brand voice, coordinate viral trend campaigns, and engage tech, finance, and crypto audiences on Twitter/X.",
    heroPoints: ["Viral Thread Drafts", "Trend Hijacking", "Spaces Administration", "Key KOL Outreach"],
    introTitle: "Drive Conversations and Authority on X",
    introDesc: "Twitter (X) is the global center for real-time news, tech conversations, and crypto projects. To win on Twitter, you need a distinct brand voice, high-value threads, and active community interaction. Eon8 crafts Twitter marketing campaigns that tap into trending topics, publish high-engagement threads, and build real brand authority in your industry.",
    servicesTitle: "Twitter Marketing Scope",
    servicesSubtitle: "Real-time content tactics to scale followers and drive brand conversations",
    services: [
      {
        title: "High-Value Thread Writing",
        desc: "Drafting educational, analytical, and storytelling threads that spark shares, bookmarks, and organic profile clicks."
      },
      {
        title: "Trend Hijacking Campaigns",
        desc: "Monitoring real-time industry trends and publishing relevant, witty responses to place your brand in active topics."
      },
      {
        title: "X Spaces Management",
        desc: "Organizing, scheduling, and script hosting live audio Spaces to discuss key updates and engage followers directly."
      },
      {
        title: "KOL Partnerships",
        desc: "Partnering with top industry creators for retweets, quote tweets, and product endorsements."
      }
    ],
    processTitle: "Twitter Growth Roadmap",
    processSteps: [
      {
        title: "Voice Design",
        desc: "Define the brand's tone (professional, conversational, bold) and setup thread formats."
      },
      {
        title: "Topic Tracking",
        desc: "Monitor industry keywords and hashtags to draft immediate response content."
      },
      {
        title: "Spaces & Hype",
        desc: "Schedule recurring Spaces sessions and coordinate giveaways to drive engagement."
      }
    ],
    whyTitle: "Why Choose Eon8 for Twitter Marketing?",
    whyDesc: "We understand the fast-paced culture of X. We write content that captures attention, builds professional authority, and drives organic growth, bypassing boring, generic templates.",
    faqs: [
      {
        q: "What is a Twitter thread and why does it matter?",
        a: "A thread is a series of connected posts. Threads are highly favored by X's algorithm, generating significantly more reach and saves than single posts."
      },
      {
        q: "How do you handle real-time engagement?",
        a: "Our community team monitors your notifications daily to answer comments, tag relevant creators, and participate in industry discussions."
      }
    ]
  },
  "instagram-marketing-agency-services-instagram": {
    pathKey: "instagram-marketing-agency-services-instagram",
    metaTitle: "Instagram Growth & Reel Marketing Agency | Eon8",
    metaDesc: "Make your brand viral. Eon8 Instagram marketing agency creates aesthetic grids, produces high-impact Reels, and manages influencer campaigns.",
    heroTitle: "Instagram Growth & Reel Marketing Agency",
    heroSubtitle: "Acquire followers, produce high-impact Reel videos, and coordinate aesthetic grid design campaigns that build brand value.",
    heroPoints: ["High-Impact Reels", "Aesthetic Grid Styling", "Influencer Collaborations", "Interactive Stories"],
    introTitle: "Turn Instagram Scrolling into Brand Value",
    introDesc: "Instagram is a visual-first platform where design quality determines brand authority. At Eon8, we design highly visual campaigns that look premium and convert. From filming short-form video Reels to designing clean puzzle grids and scheduling interactive stories, we ensure your profile reflects a professional, premium brand image.",
    servicesTitle: "Instagram Creative Scope",
    servicesSubtitle: "Visual marketing tactics to boost page reach and conversion rates",
    services: [
      {
        title: "Reels Scripting & Production",
        desc: "Writing hooks, planning visual guides, and editing high-engagement short videos using popular audio tracks."
      },
      {
        title: "Aesthetic Grid Curation",
        desc: "Planning post arrangements to ensure your main feed looks cohesive, professional, and visually premium."
      },
      {
        title: "Interactive Stories Curation",
        desc: "Designing daily Q&A polls, quiz stickers, and product link slides to engage active followers."
      },
      {
        title: "Shop Integrations",
        desc: "Configuring Instagram Shopping tags on catalog images to allow users to buy directly from your feed."
      }
    ],
    processTitle: "Instagram Campaign Process",
    processSteps: [
      {
        title: "Visual Theme Map",
        desc: "Define custom palettes, grid layouts, post templates, and logo overlays."
      },
      {
        title: "Reel Production",
        desc: "Produce video storyboards, edit visual sequences, and align transitions with trending audios."
      },
      {
        title: "Engagement Spikes",
        desc: "Launch Instagram giveaways, direct outreach campaigns, and partner tag-posts."
      }
    ],
    whyTitle: "Why Partner with Eon8 for Instagram?",
    whyDesc: "We don't just focus on follower numbers. We focus on visual excellence, post shares, profile clicks, and storefront conversions, ensuring your Instagram channel builds real customer acquisition.",
    faqs: [
      {
        q: "How do Instagram Reels help my business?",
        a: "Reels are distributed to users who don't follow you yet, making them the most powerful organic tool to scale brand reach and acquire followers."
      },
      {
        q: "Do you coordinate partnerships with influencers?",
        a: "Yes. We manage influencer selection, draft contracts, track post deliverables, and measure overall ROI for brand campaigns."
      }
    ]
  },
  "linkedin-marketing-agency-chennai-services": {
    pathKey: "linkedin-marketing-agency-chennai-services",
    metaTitle: "B2B LinkedIn Marketing & Lead Gen Agency | Eon8",
    metaDesc: "Scale B2B customer acquisition. Eon8 LinkedIn marketing agency builds personal brands, drafts thought-leadership, and drives B2B leads.",
    heroTitle: "B2B LinkedIn Marketing & Lead Generation Agency",
    heroSubtitle: "Establish corporate thought-leadership, scale executive personal brands, and capture premium enterprise B2B leads.",
    heroPoints: ["B2B Lead Funnels", "Thought Leadership Guides", "Executive Personal Branding", "Sponsored Ad Ads"],
    introTitle: "Establish B2B Authority and Capture Leads",
    introDesc: "LinkedIn is the premier platform for B2B marketers, founders, and recruiters. To stand out, your company needs thought-leadership articles, employee advocacy networks, and strategic outbound message funnels. Eon8 scales B2B lead generation by optimizing executive profiles, drafting high-value posts, and running targeted sponsored content campaigns.",
    servicesTitle: "LinkedIn B2B Solutions",
    servicesSubtitle: "Professional content and targeting campaigns to capture high-value clients",
    services: [
      {
        title: "Executive Personal Branding",
        desc: "Drafting personal stories, business insights, and industry commentary to position founders and executives as thought leaders."
      },
      {
        title: "B2B Content Optimization",
        desc: "Creating PDF slides, carousel graphics, text insights, and case studies optimized for LinkedIn's feed algorithm."
      },
      {
        title: "LinkedIn Paid Campaigns",
        desc: "Targeting decision-makers, HR managers, and C-level executives by job titles, industry, and company size."
      },
      {
        title: "Outbound Lead Generation",
        desc: "Drafting highly personalized, non-spammy direct messages to generate consultation inquiries."
      }
    ],
    processTitle: "B2B LinkedIn Pipeline",
    processSteps: [
      {
        title: "Branding Workshop",
        desc: "Align profile copy, update banner graphics, and map key business propositions."
      },
      {
        title: "Insights Development",
        desc: "Draft technical case studies, write carousels, and plan scheduled thought-leadership posts."
      },
      {
        title: "Lead Acquisition",
        desc: "Launch B2B targeting ads, run direct message funnels, and compile monthly conversion tracking."
      }
    ],
    whyTitle: "Why Choose Eon8 for LinkedIn B2B?",
    whyDesc: "We avoid dry, boilerplate corporate speak. We write insights-driven copy that engages high-level decision makers, establishing professional trust and generating high-converting sales pipelines.",
    faqs: [
      {
        q: "Why should founders invest in LinkedIn personal branding?",
        a: "People buy from people. A founder's personal brand builds organic credibility, attracts talent, and drives sales more effectively than a generic company page."
      },
      {
        q: "What types of B2B ads are most effective on LinkedIn?",
        a: "Sponsored Content (in-feed carousels or video stories) and Lead Gen Forms (which allow users to submit contact data without leaving LinkedIn) yield the highest B2B conversion rates."
      }
    ]
  },
  "youtube-marketing-company-chennai-eon8": {
    pathKey: "youtube-marketing-company-chennai-eon8",
    metaTitle: "YouTube Channel Optimization & Video Marketing Company | Eon8",
    metaDesc: "Optimize video search rank. Eon8 YouTube marketing agency manages thumbnails design, description SEO, and video pre-roll ad placements.",
    heroTitle: "YouTube Channel Optimization & Video Marketing Company",
    heroSubtitle: "Build organic subscriber bases, optimize video SEO, and deploy targeted video pre-roll ad campaigns.",
    heroPoints: ["Video SEO Search", "High-CTR Thumbnails", "Pre-Roll Ad Campaigns", "Channel Moderation"],
    introTitle: "Dominate the Global Video Search Engine",
    introDesc: "YouTube is the second-largest search engine in the world. To generate views, your videos need high-click-through-rate thumbnails, search-optimized title tags, and strategic tags configurations. Eon8 optimizes your YouTube presence by writing video scripts, designing visuals, tuning description keywords, and running highly targeted video ad campaigns.",
    servicesTitle: "YouTube Growth Blueprint",
    servicesSubtitle: "Professional video search optimization and campaign administration",
    services: [
      {
        title: "Video SEO Title & Description Tuning",
        desc: "Researching search volume keywords to place inside video titles, descriptions, and tag fields to boost organic search rank."
      },
      {
        title: "High-CTR Thumbnail Design",
        desc: "Designing clear, readable, and highly clickable thumbnail layouts that stand out in feed recommendations."
      },
      {
        title: "YouTube Video Ad Campaigns",
        desc: "Setting up skippable in-stream ads, non-skippable bumper ads, and search ads via Google Ads to scale view counts."
      },
      {
        title: "Channel Audits & Analytics",
        desc: "Tracking player retention charts, click-through rates, and audience demographics to optimize future video concepts."
      }
    ],
    processTitle: "YouTube Video Flow",
    processSteps: [
      {
        title: "Video Audit",
        desc: "Identify search keyword opportunities and research competitor video structures."
      },
      {
        title: "SEO Curation",
        desc: "Draft optimized descriptions, design attention-grabbing thumbnails, and map timestamps."
      },
      {
        title: "Campaign Amplification",
        desc: "Launch paid video discovery ads, seed videos on social channels, and track retention metrics."
      }
    ],
    whyTitle: "Why Choose Eon8 for YouTube Marketing?",
    whyDesc: "We combine thumbnail design strategy with video search optimization guidelines. We focus on increasing viewer watch times, channel subscriber rates, and conversion clicks to landing pages.",
    faqs: [
      {
        q: "What is Video SEO?",
        a: "Video SEO is the process of optimizing your video metadata (titles, descriptions, tags, captions) to rank for search queries on YouTube and Google Video search tab."
      },
      {
        q: "Do you produce the videos?",
        a: "We provide scriptwriting, storyboarding, SEO curation, thumbnail design, and channel growth management. Video filming is handled by your internal production team based on our strategy templates."
      }
    ]
  },
  "reputation-management-services": {
    pathKey: "reputation-management-services",
    metaTitle: "Business Reputation Management Services | Eon8",
    metaDesc: "Protect your corporate image. Eon8 reputation management services monitor employee sentiments and acquire positive reviews across listings.",
    heroTitle: "Business Reputation Management Services",
    heroSubtitle: "Improve corporate credibility, monitor employee sentiments, and address negative online reviews across reviews boards.",
    heroPoints: ["Glassdoor Monitoring", "NAP Citation Audits", "Review Gain Programs", "Corporate Alignment"],
    introTitle: "Defend and Build Corporate Credibility",
    introDesc: "A company's online reputation directly influences its partner trust and talent recruitment rate. Eon8's reputation management services provide active monitoring of brand mentions, Glassdoor reviews, and business listings. We construct review generation campaigns and resolve customer complaints, building trust in your organization.",
    servicesTitle: "Reputation Management Scope",
    servicesSubtitle: "Professional auditing and review campaigns to keep your corporate brand clean",
    services: [
      {
        title: "Employee Sentiment Audits",
        desc: "Monitoring reviews on Glassdoor and Indeed to manage workplace perception gaps."
      },
      {
        title: "Google Review Campaigns",
        desc: "Deploying automated customer feedback emails to solicit positive 5-star ratings from satisfied clients."
      },
      {
        title: "Social Mention Tracking",
        desc: "Monitoring tag notifications on Reddit, LinkedIn, and X to address public feedback immediately."
      },
      {
        title: "Suppression of Misleading Info",
        desc: "Burying old, inaccurate, or outdated posts that negatively impact company credibility."
      }
    ],
    processTitle: "Our Reputation Strategy",
    processSteps: [
      {
        title: "Reputation Audit",
        desc: "Scan all online listings, Glassdoor boards, and social accounts to evaluate sentiment."
      },
      {
        title: "Review Acquisition",
        desc: "Setup automated client email flows to gather positive feedback."
      },
      {
        title: "Sentiment Tracking",
        desc: "Deploy brand monitoring dashboards to identify negative reviews in real time."
      }
    ],
    whyTitle: "Why Partner with Eon8 for Reputation Management?",
    whyDesc: "We provide systematic, white-hat reputation management solutions. We help corporate brands build genuine public trust and streamline feedback loops, protecting your market positioning.",
    faqs: [
      {
        q: "What is Business Reputation Management?",
        a: "It is the process of monitoring, listening, and influencing public perception of a business brand across maps, directory listings, review boards, and social media."
      },
      {
        q: "Why does corporate reputation matter?",
        a: "A clean online reputation increases partner sales conversion rates and helps companies attract high-level executive talent."
      }
    ]
  },
  "online-reputation-management-agency": {
    pathKey: "online-reputation-management-agency",
    metaTitle: "Online Reputation Management Agency | Executive ORM - Eon8",
    metaDesc: "Protect executive personal brands. Eon8 online reputation management agency highlights positive press and suppresses negative links.",
    heroTitle: "Online Reputation Management Agency",
    heroSubtitle: "Protect founder personal brands, highlight positive press coverage, and dominate Page 1 search results with trusted brand mentions.",
    heroPoints: ["Founder personal branding", "PR Placement Hype", "Search Suppression", "Secure Audits"],
    introTitle: "Proactive Personal & Executive Brand Protection",
    introDesc: "For high-profile founders, investors, and executives, personal search results act as the ultimate CV. Eon8's executive ORM services protect personal brands by suppressing unfavorable links and distributing premium PR features. We optimize personal portfolios and social channels (LinkedIn, X) to ensure searchers only see authoritative, verified achievements.",
    servicesTitle: "Executive ORM Scope",
    servicesSubtitle: "Premium PR placements and search result management for leaders",
    services: [
      {
        title: "Personal Brand Auditing",
        desc: "Analyzing personal search terms to spot vulnerabilities, outdated articles, or fake profiles."
      },
      {
        title: "Positive Press Campaigns",
        desc: "Pitching personal achievements and company milestones to top news publications for placement."
      },
      {
        title: "Social Assets Optimization",
        desc: "Verifying and optimizing LinkedIn, X, Crunchbase, and personal website pages to rank high."
      },
      {
        title: "Search Term Shielding",
        desc: "Building a firewall of positive content around personal names to block out negative commentary."
      }
    ],
    processTitle: "ORM Campaign Lifecycle",
    processSteps: [
      {
        title: "Vulnerability Check",
        desc: "Evaluate personal keywords to trace any negative search associations."
      },
      {
        title: "Asset Development",
        desc: "Build personal portfolio domains and distribute premium PR articles."
      },
      {
        title: "Search Firewalls",
        desc: "Rank verified assets to push negative or secondary mentions off Page 1."
      }
    ],
    whyTitle: "Why Choose Eon8 for Executive ORM?",
    whyDesc: "We maintain absolute confidentiality while managing personal brands. Our relationship outreach secures high-authority placements that build long-term reputation equity.",
    faqs: [
      {
        q: "Who needs Online Reputation Management (ORM)?",
        a: "Executives, founders, public figures, and high-growth corporations whose business deals or brand trust depend on search credibility."
      },
      {
        q: "How do you bury negative search links?",
        a: "We create and optimize authoritative personal pages and distribute positive press features, pushing lower-quality negative links off the first page of Google."
      }
    ]
  },
  "clean-negative-search-results": {
    pathKey: "clean-negative-search-results",
    metaTitle: "Clean Negative Search Results | Suppress Bad Reviews - Eon8",
    metaDesc: "Clean up search results. Eon8 suppresses negative news, forum complaints, and defamatory links past page 1 of search engine rankings.",
    heroTitle: "Clean Negative Search Results",
    heroSubtitle: "Bury defamatory links, negative reviews articles, and forum complaints past page 1 of search engine results pages.",
    heroPoints: ["Search Suppression", "Press Syndicates", "SEO Shielding", "Takedown Curation"],
    introTitle: "Bury Falsified & Harmful Search Links",
    introDesc: "A single negative article or forum thread on Page 1 of Google can tank business sales. Eon8's clean search campaigns use advanced SEO suppression to push harmful links off Page 1. We create high-authority web assets, optimize positive reviews hubs, and generate media coverage to build an SEO shield, protecting your brand.",
    servicesTitle: "Search Suppression Scope",
    servicesSubtitle: "Targeted SEO campaigns to suppress negative search links",
    services: [
      {
        title: "Defamatory Link Audits",
        desc: "Mapping negative URLs, identifying ranking power, and designing SEO strategies."
      },
      {
        title: "Authority Web Properties",
        desc: "Building micro-sites, medium profiles, and portfolio pages to occupy top rankings."
      },
      {
        title: "Content Amplification",
        desc: "Promoting positive articles to accumulate authority signals and push target keywords down."
      },
      {
        title: "Legal Terms Vetting",
        desc: "Vetting sites for copyright or terms of service violations to petition webmasters for removals."
      }
    ],
    processTitle: "Suppression Workflow",
    processSteps: [
      {
        title: "Analysis & Mapping",
        desc: "Identify keyword associations and index strengths of negative pages."
      },
      {
        title: "SEO Push",
        desc: "Create and distribute high-authority positive content targeting the same keywords."
      },
      {
        title: "Suppression Check",
        desc: "Track position shifts of negative links as they fall off Page 1."
      }
    ],
    whyTitle: "Why Partner with Eon8 for Link Suppression?",
    whyDesc: "We use only white-hat, search-compliant optimization techniques. By building real web authority assets, we ensure negative links remain suppressed long-term.",
    faqs: [
      {
        q: "Can you delete a negative link permanently from Google?",
        a: "Google cannot delete external website content, but we can petition Google to remove links under strict copyright or privacy policies, or suppress them so they are practically invisible."
      },
      {
        q: "How long does search suppression take?",
        a: "Suppression is an organic SEO process that usually yields measurable results in 3 to 6 months depending on keyword authority."
      }
    ]
  },
  "google-complaint-removal": {
    pathKey: "google-complaint-removal",
    metaTitle: "Google Complaint Removal Services | DMCA & Removals - Eon8",
    metaDesc: "Remove complaints from search. Eon8 files DMCA takedowns and petitions search engines to de-index unauthorized defamatory links.",
    heroTitle: "Google Complaint Removal Services",
    heroSubtitle: "File legal takedown forms, petition search indices for copyright breaches, and suppress unauthorized defamatory posts.",
    heroPoints: ["DMCA Filings", "Privacy de-indexing", "Terms of Service Reviews", "Google Submissions"],
    introTitle: "Remove Damaging Content from Google Index",
    introDesc: "If a webpage hosts copyrighted content, false allegations, or confidential data without permission, it may qualify for de-indexation. Eon8's removal specialists draft and submit DMCA takedown requests, terms of service breach reports, and de-indexing petitions, removing harmful links from search engine results.",
    servicesTitle: "Content De-indexing Solutions",
    servicesSubtitle: "Specialized submissions to request search de-indexing of harmful links",
    services: [
      {
        title: "DMCA Takedown Filings",
        desc: "Submitting formal copyright complaints to hosting providers and Google to remove stolen assets."
      },
      {
        title: "Privacy Infringement Petitions",
        desc: "Requesting removal of personally identifiable information (PII) published without consent."
      },
      {
        title: "Terms of Service Complaints",
        desc: "Petitioning sites that host defamatory content to remove listings based on platform terms violations."
      },
      {
        title: "Google Search Console Submissions",
        desc: "Handling removal requests inside Google Search Console for outdated cached contents."
      }
    ],
    processTitle: "Removal Lifecycle",
    processSteps: [
      {
        title: "Case Analysis",
        desc: "Analyze harmful links to identify copyright breaches, privacy violations, or terms violations."
      },
      {
        title: "Petition Filing",
        desc: "Draft and file formal legal takedowns with hosting providers and search engines."
      },
      {
        title: "Removal Audit",
        desc: "Track de-indexing status and ensure cached search snippets are cleared."
      }
    ],
    whyTitle: "Why Choose Eon8 for De-indexing?",
    whyDesc: "We have deep expertise in DMCA regulations, search terms of service guidelines, and hosting provider relations, ensuring your removal requests are structured for rapid approval.",
    faqs: [
      {
        q: "What is a DMCA takedown?",
        a: "A DMCA takedown is a legal request sent to a website host or search engine requesting the removal of material that infringes on copyright laws."
      },
      {
        q: "Does de-indexing remove the website content?",
        a: "No, de-indexing removes the webpage link from search engine results, making it practically impossible for searchers to find it via search engines."
      }
    ]
  },
  "complaints-board-removal": {
    pathKey: "complaints-board-removal",
    metaTitle: "Complaints Board Removal Services | Fix Brand Trust - Eon8",
    metaDesc: "Resolve board complaints. Eon8 complaints board removal services handle disputes, manage responses, and suppress bad listings.",
    heroTitle: "Complaints Board Removal Services",
    heroSubtitle: "Resolve disputes, remove negative entries from consumer reviews boards, and repair brand trust.",
    heroPoints: ["Disputes Settlements", "Review Updates", "Crisis Responses", "Board Tracking"],
    introTitle: "Resolve and Suppress Review Board Complaints",
    introDesc: "Anonymous reviews boards like ComplaintsBoard often host unverified complaints that harm business credibility. At Eon8, we help brands resolve disputes, petition boards for removal of fraudulent posts, and suppress bad listings. We draft professional customer service responses to protect your brand image.",
    servicesTitle: "Review Board Resolution Scope",
    servicesSubtitle: "Tactical solutions to manage and resolve negative forum listings",
    services: [
      {
        title: "Fake Complaint Audits",
        desc: "Vetting postings to identify unverified accounts, competitor attacks, or Terms of Service violations."
      },
      {
        title: "Reviewer Dispute Resolution",
        desc: "Contacting reviewers to resolve customer concerns, requesting updates or removals of complaints."
      },
      {
        title: "Legal Terms Petitions",
        desc: "Submitting formal complaints to forum administrators detailing defamation or rules violations."
      },
      {
        title: "Forum Search Suppression",
        desc: "Burying ComplaintsBoard URLs through targeted positive content campaigns."
      }
    ],
    processTitle: "Resolution Process Flow",
    processSteps: [
      {
        title: "Audit Thread",
        desc: "Trace details of the review board listing and identify terms violations."
      },
      {
        title: "Engagement & Dispute",
        desc: "Reach out to the customer or submit a removal request to forum administrators."
      },
      {
        title: "SEO Shielding",
        desc: "Publish positive press coverage to suppress forum listings if removal fails."
      }
    ],
    whyTitle: "Why Hire Eon8 for Complaints Board ORM?",
    whyDesc: "We avoid confrontational tone. We use customer service resolutions, legal compliance petitions, and search optimization to clear your brand's search results of unverified complaints.",
    faqs: [
      {
        q: "Can you delete posts on third-party complaints sites?",
        a: "We petition site administrators to remove posts that violate terms of service, or resolve customer disputes to have listings updated or resolved."
      },
      {
        q: "How do you handle fraudulent reviews?",
        a: "We gather proof of terms violations and submit detailed de-indexation petitions to search engines and host administrators."
      }
    ]
  },
  "consumer-complaints-removal": {
    pathKey: "consumer-complaints-removal",
    metaTitle: "Consumer Complaints Removal Services | Restore Sales - Eon8",
    metaDesc: "Restore business trust. Eon8 consumer complaints removal bury RipoffReport links and resolve BBB complaints to boost sales.",
    heroTitle: "Consumer Complaints Removal Services",
    heroSubtitle: "Bury RipoffReport listings, handle BBB consumer complaints, and restore product conversions.",
    heroPoints: ["RipoffReport Shielding", "BBB Score Audits", "Customer Care Outreach", "Product Page Protection"],
    introTitle: "Reclaim Your Brand Trust and Sales",
    introDesc: "Customer complaints on RipoffReport or the Better Business Bureau (BBB) can severely impact conversions. Eon8's consumer complaints removal services help companies resolve disputes, optimize BBB ratings, and suppress RipoffReport links. We implement structured customer care campaigns to rebuild brand trust.",
    servicesTitle: "Consumer ORM Scope of Work",
    servicesSubtitle: "Strategic solutions to resolve BBB disputes and suppress RipoffReport links",
    services: [
      {
        title: "BBB Profile Optimization",
        desc: "Resolving customer disputes, submitting response updates, and optimizing BBB scores."
      },
      {
        title: "RipoffReport Search Suppression",
        desc: "Burying RipoffReport search results through advanced authority content and SEO campaigns."
      },
      {
        title: "Customer Support Protocols",
        desc: "Setting up response workflows to handle complaints before they reach public forums."
      },
      {
        title: "Positive Search Ecosystem",
        desc: "Building a network of positive articles and profile links to protect keyword searches."
      }
    ],
    processTitle: "ORM Cleanup Pipeline",
    processSteps: [
      {
        title: "BBB / Report Scan",
        desc: "Identify outstanding consumer complaints and trace search rankings of negative links."
      },
      {
        title: "Dispute & Resolve",
        desc: "Help customer care resolve issues and submit resolved statuses to bureaus."
      },
      {
        title: "SEO Push Campaign",
        desc: "Launch positive SEO campaigns to push harmful consumer reports off Page 1."
      }
    ],
    whyTitle: "Why Choose Eon8 for Consumer Complaints ORM?",
    whyDesc: "We provide comprehensive solutions that resolve active customer concerns while using search engine optimization to protect your brand from competitor attacks and harmful search listings.",
    faqs: [
      {
        q: "What is RipoffReport?",
        a: "RipoffReport is a consumer complaint forum that does not allow removal of complaints, making search suppression the only effective way to protect your reputation."
      },
      {
        q: "How do you improve a BBB rating?",
        a: "We analyze complaints, guide resolutions with customers, and submit verified response histories to the Bureau to restore your score."
      }
    ]
  },
  "search-advertising-company": {
    pathKey: "search-advertising-company",
    metaTitle: "Search Advertising Company | Paid Search PPC - Eon8",
    metaDesc: "Scale B2B leads and retail sales. Eon8 search advertising company builds high-ROAS paid campaign funnels across Google and Bing search results.",
    heroTitle: "Search Advertising Agency | Paid Search PPC",
    heroSubtitle: "Dominate high-intent Google and Bing searches, capture active buyer leads, and optimize ad spend ROI.",
    heroPoints: ["Paid Search Master", "Keyword Match Tuning", "Quality Score Optimization", "ROAS Escalation"],
    introTitle: "High-Intent Customer Acquisition",
    introDesc: "Search advertising puts your brand directly in front of buyers at the exact second they search for your services. Eon8's PPC experts design search campaigns that target transactional keyword intents, optimize bid strategies, and design high-converting landing pages to ensure your ad spend generates positive ROI.",
    servicesTitle: "Search Ads Scope of Work",
    servicesSubtitle: "Technical campaign setups, keyword matches, and custom bidding strategies",
    services: [
      {
        title: "Campaign CBO & Setup",
        desc: "Creating high-performing campaign structures using Campaign Budget Optimization (CBO) and smart bidding models."
      },
      {
        title: "Keyword Matches Optimization",
        desc: "Researching target keyword matches, negatives directories, and search volumes to filter out low-value traffic."
      },
      {
        title: "Quality Score Improvements",
        desc: "Tuning ad click-through rates, keyword relevancy, and landing page load speeds to reduce cost-per-click."
      },
      {
        title: "Landing Page Conversions",
        desc: "Optimizing landing page headlines, layout structures, and lead capture forms to convert clicks to sales."
      }
    ],
    processTitle: "Our PPC Pipeline",
    processSteps: [
      {
        title: "Audit & Analysis",
        desc: "Analyze competitor bidding strategies and evaluate historical quality scores."
      },
      {
        title: "Campaign Setup",
        desc: "Draft custom ad copies, upload keyword matches, and set up conversions tracking."
      },
      {
        title: "Bid Optimization",
        desc: "Automate bid shifts, test creative variations, and scale successful campaigns."
      }
    ],
    whyTitle: "Why Hire Eon8 for Search Ads?",
    whyDesc: "We manage PPC budgets with data-driven precision. We optimize Quality Scores to lower your cost-per-click and maximize your conversions, ensuring you get the highest value from your budget.",
    faqs: [
      {
        q: "How do Google Search Ads work?",
        a: "Search ads are auction-based listings shown above organic results when users search for target terms. Advertisers only pay when a user clicks their ad (CPC)."
      },
      {
        q: "What is Google Quality Score?",
        a: "Quality Score is Google's rating of ad relevance and landing page experience. Higher scores decrease costs-per-click and improve ad positioning."
      }
    ]
  },
  "display-advertising-agency": {
    pathKey: "display-advertising-agency",
    metaTitle: "Display Advertising Agency | Google Display Network - Eon8",
    metaDesc: "Scale brand awareness visually. Eon8 display advertising agency designs high-converting banner ads across GDN and publisher websites.",
    heroTitle: "Display Advertising Agency | Google Display Network",
    heroSubtitle: "Launch high-impact visual banner ads, scale brand awareness, and retarget website visitors across millions of websites.",
    heroPoints: ["Visual Banner Design", "GDN Placements", "Target Contextual Audits", "Brand Safety Shields"],
    introTitle: "Visual Branding across the Web",
    introDesc: "Display advertising captures user interest visually across blogs, news publications, and partner websites. Eon8's display specialists design aesthetic banners, build custom audience interest parameters, and coordinate placements to drive brand recognition and support sales conversion cycles.",
    servicesTitle: "Display Campaign Solutions",
    servicesSubtitle: "Creative banner layouts and targeting optimizations for visual reach",
    services: [
      {
        title: "Graphic Banner Designs",
        desc: "Designing aesthetic, high-converting banner creatives in standard IAB sizes for desktop and mobile devices."
      },
      {
        title: "Placement Audits & Vetting",
        desc: "Selecting partner directories and websites to display ads, avoiding low-quality spam placements."
      },
      {
        title: "Contextual Interest Matching",
        desc: "Targeting users based on past search patterns, topics, or demographic parameters."
      },
      {
        title: "Brand Protection Shielding",
        desc: "Configuring safety parameters to prevent banners from showing on sensitive or unsafe web content."
      }
    ],
    processTitle: "Display Ads Milestones",
    processSteps: [
      {
        title: "Creative Concept",
        desc: "Design banner variations, draft text calls, and setup size templates."
      },
      {
        title: "Campaign Launch",
        desc: "Select targeted placement channels and set bid limits for visual impressions."
      },
      {
        title: "Placements Audit",
        desc: "Review site lists daily, blacklisting channels that deliver low click-through rates."
      }
    ],
    whyTitle: "Why Choose Eon8 for Display Advertising?",
    whyDesc: "We combine visual design expertise with data-driven targeting. We design banners that capture attention, optimize placement lists to save budgets, and drive targeted traffic to your site.",
    faqs: [
      {
        q: "What is Display Advertising?",
        a: "Display advertising is a method of paid advertising showing visual banners or image blocks on third-party publisher websites within the Google Display Network."
      },
      {
        q: "How do Display Ads help brand awareness?",
        a: "They deliver millions of visual impressions to target interest groups, ensuring your brand name stays top-of-mind at a lower CPM (Cost Per Thousand impressions)."
      }
    ]
  },
  "best-remarketing-ad-agency": {
    pathKey: "best-remarketing-ad-agency",
    metaTitle: "Remarketing & Retargeting Ads Agency | Eon8",
    metaDesc: "Re-engage lost visitors. Eon8 retargeting ads agency sets up conversion pixels, dynamic ads catalogs, and multi-stage ad funnels.",
    heroTitle: "Remarketing & Retargeting Ads Agency",
    heroSubtitle: "Re-engage lost visitors, optimize shopping cart drops, and multiply conversion rates across paid channels.",
    heroPoints: ["Pixel Retargeting", "Dynamic Store Catalogs", "Multi-Stage Funnels", "Ad Fatigue Refreshers"],
    introTitle: "Convert Abandoned Clicks into Sales",
    introDesc: "Typically, only 2% of website visitors convert on their first visit. Retargeting captures the remaining 98%. Eon8 builds multi-stage retargeting campaigns that display custom ads to users who viewed products or left carts, bringing them back to complete their purchase.",
    servicesTitle: "Retargeting Ads Scope",
    servicesSubtitle: "Strategic audience setups and automated catalog ad campaigns",
    services: [
      {
        title: "Cross-Channel Pixel Setups",
        desc: "Deploying Meta, Google, and LinkedIn tracking pixels to map user interactions."
      },
      {
        title: "Dynamic Catalog Retargeting",
        desc: "Showing automated, highly relevant ads displaying the exact products visitors viewed in your catalog."
      },
      {
        title: "Custom Audience Segments",
        desc: "Grouping audiences by interaction levels (e.g. cart abandoners vs simple homepage visitors) to adjust bids."
      },
      {
        title: "Creative Refresh Programs",
        desc: "Updating ad copies and layouts to prevent ad fatigue and maintain high click-through rates."
      }
    ],
    processTitle: "Retargeting Workflow",
    processSteps: [
      {
        title: "Pixel Audit",
        desc: "Configure conversion tracking pixels and verify that events are mapped."
      },
      {
        title: "Funnel Curation",
        desc: "Setup audience segments based on page drop points and load catalog creatives."
      },
      {
        title: "Campaign Scale",
        desc: "Monitor frequency parameters, optimize ad placement bids, and scale conversion counts."
      }
    ],
    whyTitle: "Why Hire Eon8 for Retargeting?",
    whyDesc: "We build advanced, multi-stage conversion funnels. We adjust bids based on how close users are to buying, lowering acquisition costs and maximizing your advertising ROAS.",
    faqs: [
      {
        q: "What is the difference between Remarketing and Retargeting?",
        a: "The terms are often used interchangeably. Retargeting usually refers to paid display or social ads showing products to past site visitors, while remarketing often focuses on email campaigns targeting existing customers."
      },
      {
        q: "How do you avoid annoying visitors with retargeting ads?",
        a: "We set strict frequency capping rules (e.g. max 3 impressions per user per day) and exclude users immediately after they complete a purchase."
      }
    ]
  },
  "product-listing-ads-agency": {
    pathKey: "product-listing-ads-agency",
    metaTitle: "Product Listing Ads Agency | Google Shopping Feeds - Eon8",
    metaDesc: "Rank products in Google Shopping. Eon8 optimizes merchant feeds, smart shopping campaigns, and product descriptors.",
    heroTitle: "Product Listing Ads Agency | Google Shopping",
    heroSubtitle: "Rank your products directly in Google Shopping grids, manage merchant center feeds, and optimize high-ROAS product ads.",
    heroPoints: ["Merchant Center Sync", "Product Feed Optimization", "Performance Max Campaigns", "Smart Bidding"],
    introTitle: "Drive Product Sales with Google Shopping Ads",
    introDesc: "Product Listing Ads (PLAs) display product photos, prices, and store reviews directly in search grids, attracting high-intent buyers. Eon8's shopping experts clean up your Merchant Center product feed, optimize descriptions, and manage Performance Max campaigns to drive sales volume.",
    servicesTitle: "Product Listing Ads Scope",
    servicesSubtitle: "Merchant feed technical optimization and catalog ads management",
    services: [
      {
        title: "Merchant Center Configurations",
        desc: "Resolving feed diagnostics errors, setting up shipping rules, and verifying catalog sync loops."
      },
      {
        title: "Product Feed Optimization",
        desc: "Rewriting product titles, configuring GTIN codes, and assigning correct Google Product Categories."
      },
      {
        title: "Performance Max Campaigns",
        desc: "Deploying automated Google campaigns that place your products across Search, Shopping, YouTube, and Maps."
      },
      {
        title: "Competitor Price Tracking",
        desc: "Tracking competitor product pricing strategies to adjust bidding limits dynamically."
      }
    ],
    processTitle: "Shopping Campaign Milestones",
    processSteps: [
      {
        title: "Feed Diagnostics",
        desc: "Sync storefront product catalogs with Google Merchant Center and resolve errors."
      },
      {
        title: "Feed Tuning",
        desc: "Optimize title keywords, upload high-quality product images, and configure pricing."
      },
      {
        title: "Campaign Launch",
        desc: "Load creative assets, set up conversion tracking, and start automated bidding."
      }
    ],
    whyTitle: "Why Partner with Eon8 for Shopping Ads?",
    whyDesc: "We combine technical data feed management with retail search optimization. We ensure your products show up for relevant search queries, maximizing conversion volume and return on ad spend.",
    faqs: [
      {
        q: "What is Google Merchant Center?",
        a: "It is a cloud-based dashboard where retail stores upload their product feed data, which Google uses to display shopping ads on search pages."
      },
      {
        q: "Why do my products get rejected by Google Merchant Center?",
        a: "Rejections are usually caused by missing unique identifiers (GTIN/UPC), mismatched prices between your feed and site, or incomplete shipping details."
      }
    ]
  },
  "android-apps-marketing-services-marketing": {
    pathKey: "android-apps-marketing-services-marketing",
    metaTitle: "Android App Marketing Services | Play Store App Growth - Eon8",
    metaDesc: "Scale Android user acquisition. Eon8 android app marketing services design Play Store optimizations (ASO) and run optimized Google UAC campaigns.",
    heroTitle: "Android App Marketing Services | Play Store App Growth",
    heroSubtitle: "Acquire millions of active users, drive Play Store installations, and run optimized Android ad campaigns.",
    heroPoints: ["Play Store ASO", "Google UAC Setup", "User Retention Funnels", "Store Review Campaigns"],
    introTitle: "Drive High-Volume Play Store Installs",
    introDesc: "Android accounts for the majority of global smartphone users. To stand out in the crowded Google Play Store, your app needs search optimization and paid acquisition campaigns. Eon8's app marketing experts optimize play store metadata (ASO), manage Google App campaigns, and set up user tracking tools to scale active app installs.",
    servicesTitle: "Android Marketing Scope",
    servicesSubtitle: "Technical store optimization and performance campaigns to scale app installs",
    services: [
      {
        title: "Play Store Optimization (ASO)",
        desc: "Optimizing app titles, short descriptions, long copy keywords, icons, and screen previews for organic Play Store search ranking."
      },
      {
        title: "Google App Campaigns (UAC)",
        desc: "Configuring and running Google Universal App Campaigns to display ads on Search, Google Play, YouTube, and Gmail."
      },
      {
        title: "Android Store Review Campaigns",
        desc: "Developing client feedback loops to encourage positive 5-star ratings and manage user complaints."
      },
      {
        title: "App Analytics & Event Tracking",
        desc: "Integrating Firebase, Adjust, or AppsFlyer to trace store installs, session counts, and in-app actions."
      }
    ],
    processTitle: "Android Campaign Lifecycle",
    processSteps: [
      {
        title: "Store Assets Audit",
        desc: "Evaluate listing titles, descriptive copy, and screenshot designs for store conversion gaps."
      },
      {
        title: "ASO & Ads Deploy",
        desc: "Publish optimized descriptions, upload visual assets, and set up paid app install campaigns."
      },
      {
        title: "Install Optimization",
        desc: "Analyze player acquisition costs, optimize bidding limits, and refresh ad visuals to prevent fatigue."
      }
    ],
    whyTitle: "Why Partner with Eon8 for Android Marketing?",
    whyDesc: "We combine app store search optimization with mobile attribution tracking. We focus on player lifetime value (LTV), acquisition cost optimizations, and sustaining active user engagement.",
    faqs: [
      {
        q: "What is Google Universal App Campaign (UAC)?",
        a: "Google UAC is an automated campaign type that matches and displays app install ads across Google Search, Google Play, YouTube, and Google Display Network."
      },
      {
        q: "How do you track in-app actions?",
        a: "We integrate mobile attribution tools like Firebase, AppsFlyer, or Adjust to measure when users open the app or make purchases."
      }
    ]
  },
  "apple-app-store-optimization-services-ios": {
    pathKey: "apple-app-store-optimization-services-ios",
    metaTitle: "Apple App Store Optimization Services | iOS ASO - Eon8",
    metaDesc: "Rank #1 in the iOS App Store. Eon8 Apple App Store Optimization services optimize metadata, visual screenshots, and Apple Search Ads.",
    heroTitle: "Apple App Store Optimization Services | iOS ASO",
    heroSubtitle: "Optimize iOS app titles, descriptions, keyword fields, and screenshots to rank #1 in the Apple App Store search results.",
    heroPoints: ["iOS Keyword Research", "Screenshot Design", "Apple Search Ads (ASA)", "Localized iOS ASO"],
    introTitle: "Maximize Organic Installs on iOS Devices",
    introDesc: "iOS users have higher average purchase values, making App Store optimization crucial for monetization. Eon8's iOS ASO services optimize metadata keywords, design high-converting visual screenshots, and manage Apple Search Ads to put your app directly in front of active iOS searchers.",
    servicesTitle: "iOS ASO Solutions",
    servicesSubtitle: "Aesthetic screenshot styling and targeting configurations for iOS growth",
    services: [
      {
        title: "iOS Keyword Field Research",
        desc: "Researching target terms for the App Store's 100-character keyword field, maximizing keyword rankings."
      },
      {
        title: "Aesthetic App Screenshot Design",
        desc: "Designing clean, readable screenshots and promo videos that highlight key app features and drive downloads."
      },
      {
        title: "Apple Search Ads (ASA) Management",
        desc: "Coordinating sponsored search ads in the App Store search results to capture high-intent downloads."
      },
      {
        title: "Localized iOS Campaigns",
        desc: "Optimizing iOS app listings for international store locations to scale global user acquisition."
      }
    ],
    processTitle: "iOS Optimization Milestones",
    processSteps: [
      {
        title: "iOS Search Audit",
        desc: "Analyze target keyword volumes and evaluate screenshot styling metrics."
      },
      {
        title: "ASO Content Upload",
        desc: "Optimize App Store titles, keywords fields, and upload design assets."
      },
      {
        title: "Performance Review",
        desc: "Track keyword rank changes, download conversion rates, and adjust Apple Search Ads bids."
      }
    ],
    whyTitle: "Why Choose Eon8 for iOS ASO?",
    whyDesc: "We combine keyword optimization with visual design strategies. We design App Store assets that capture interest, lower download acquisition costs, and maximize conversion rates.",
    faqs: [
      {
        q: "What is iOS App Store Optimization?",
        a: "ASO for iOS is the process of optimizing an app's listing metadata (title, subtitle, keywords field) and visual assets to rank high in App Store searches."
      },
      {
        q: "What is Apple Search Ads (ASA)?",
        a: "ASA is Apple's sponsored advertising program, displaying paid app listings above organic search results in the iOS App Store."
      }
    ]
  },
  "android-game-marketing-services-eon8-marketing": {
    pathKey: "android-game-marketing-services-eon8-marketing",
    metaTitle: "Android Game Marketing Services | Play Store Game Growth - Eon8",
    metaDesc: "Drive game installs. Eon8 Android game marketing services build pre-registrations list and coordinate viral launch campaigns.",
    heroTitle: "Android Game Marketing Services | Play Store Game Growth",
    heroSubtitle: "Acquire gaming users, build pre-registration lists, and run viral Google Play game launch campaigns.",
    heroPoints: ["Pre-Registration Campaigns", "Game ASO", "KOL Streaming Deals", "Play Store Featuring"],
    introTitle: "Launch & Scale Your Android Gaming Title",
    introDesc: "With millions of gaming apps in the Play Store, game launches require strategic marketing campaigns. Eon8 organizes pre-registration buzz, sets up influencer play partnerships, and coordinates Google Play app campaigns to ensure your game ranks on launch day.",
    servicesTitle: "Android Game Growth Scope",
    servicesSubtitle: "Strategic game store optimization and user acquisition solutions",
    services: [
      {
        title: "Pre-Registration Setup & Hype",
        desc: "Setting up pre-registration pages, launching promotional teasers, and managing milestone awards campaigns."
      },
      {
        title: "Android Game ASO Tuning",
        desc: "Optimizing game titles, descriptors, gameplay screenshots, and YouTube trailer links for search."
      },
      {
        title: "Gaming Influencer Partners",
        desc: "Sourcing gaming streamers and creators for dedicated Let's Plays and sponsored reviews on launch day."
      },
      {
        title: "Google Play Featuring Support",
        desc: "Tuning app stability metrics and formatting layouts to comply with Google Play editor requirements."
      }
    ],
    processTitle: "Game Launch Process Flow",
    processSteps: [
      {
        title: "Pre-Launch Hype",
        desc: "Organize pre-registrations milestone campaigns and launch gameplay trailers."
      },
      {
        title: "Launch Day Blitz",
        desc: "Coordinate influencer play videos, press releases, and paid install ads to spike downloads."
      },
      {
        title: "UA Optimization",
        desc: "Track retention rates, optimize paid campaign bidding, and manage updates to sustain volume."
      }
    ],
    whyTitle: "Why Choose Eon8 for Android Game Marketing?",
    whyDesc: "We combine technical app store optimization with creative influencer marketing, organizing campaigns that scale player acquisition, maximize lifetime value, and sustain player communities.",
    faqs: [
      {
        q: "How do you drive pre-registrations for Android games?",
        a: "We configure pre-registration listings, set up exclusive rewards (e.g. skin unlocks on launch day), and coordinate ad teasers on YouTube and TikTok."
      },
      {
        q: "What is Play Store Featuring?",
        a: "It is the process of getting your game highlighted in Google Play's featured grids by editors, which drives massive organic install volume."
      }
    ]
  },
  "immersive-vr-marketing": {
    pathKey: "immersive-vr-marketing",
    metaTitle: "Immersive VR & AR Marketing Services | Eon8",
    metaDesc: "Engage users with interactive 3D virtual reality spaces, virtual showroom launches, and immersive brand experiences.",
    heroTitle: "Immersive VR & AR Marketing Services",
    heroSubtitle: "Engage users with interactive 3D virtual reality spaces, virtual showroom launches, and immersive brand experiences.",
    heroPoints: ["3D Showrooms", "360-Degree Brand Tours", "Interactive VR Ads", "WebVR Engineering"],
    introTitle: "Build Unforgettable VR Experiences",
    introDesc: "Virtual and Augmented Reality offer brands a way to break free from standard web screens. At Eon8, we design immersive VR marketing campaigns that transport users into interactive digital spaces. From launching virtual stores to creating 360-degree brand worlds, we engineer custom experiences that build deep consumer trust and brand value.",
    servicesTitle: "Immersive VR Scope",
    servicesSubtitle: "Professional virtual showroom development and media placements",
    services: [
      {
        title: "Virtual Showroom Development",
        desc: "Designing and engineering interactive 3D showrooms where users can browse, interact with, and buy products."
      },
      {
        title: "360-Degree Brand Worlds",
        desc: "Creating immersive, panoramic corporate tours and virtual experiences for trade shows or websites."
      },
      {
        title: "Interactive VR Ads Curation",
        desc: "Designing highly engaging virtual advertisements for placement in VR ecosystems."
      },
      {
        title: "Headless WebVR Integration",
        desc: "Building browser-friendly 3D simulations that load on mobile devices without external headsets."
      }
    ],
    processTitle: "Immersive Campaign Lifecycle",
    processSteps: [
      {
        title: "Concept Curation",
        desc: "Map the narrative, design spatial wireframes, and outline interactive elements."
      },
      {
        title: "3D Asset Modeling",
        desc: "Model high-fidelity product assets, align light textures, and program click functions."
      },
      {
        title: "Launch & Analytics",
        desc: "Publish the VR space on your website and track user interactions and time spent."
      }
    ],
    whyTitle: "Why Partner with Eon8 for VR Marketing?",
    whyDesc: "We blend 3D modeling skills with web optimization best practices. We build immersive visual spaces that load instantly in standard mobile browsers, maximizing engagement and conversion rates.",
    faqs: [
      {
        q: "What is Immersive VR Marketing?",
        a: "It is the process of using virtual reality technology to create interactive, spatial brand experiences (e.g. virtual showrooms) that engage customers."
      },
      {
        q: "Do users need a VR headset to access your showrooms?",
        a: "No. All VR environments we build use WebVR frameworks, allowing users to browse and interact using standard smartphone or desktop web browsers."
      }
    ]
  },
  "augmented-reality-agency": {
    pathKey: "augmented-reality-agency",
    metaTitle: "End-to-End Augmented Reality Agency | Custom AR - Eon8",
    metaDesc: "Build WebAR experiences and product packaging. Eon8 augmented reality agency creates custom virtual try-ons and AR filters.",
    heroTitle: "End-to-End Augmented Reality Agency | Custom AR",
    heroSubtitle: "Build custom WebAR experiences, interactive product packaging, and AR applications that drive consumer conversions.",
    heroPoints: ["WebAR Browser Solutions", "AR Retail Try-ons", "Interactive Packaging", "Location AR Launches"],
    introTitle: "Connect the Physical and Digital Worlds",
    introDesc: "Augmented Reality (AR) bridges the gap between digital content and the physical environment. Eon8's AR development division creates custom solutions that allow shoppers to see your products in their own space. From virtual try-on filters for retail to interactive product packaging, we build engagement that drives conversions.",
    servicesTitle: "Custom AR Solutions Scope",
    servicesSubtitle: "Professional augmented reality engineering for retail and branding",
    services: [
      {
        title: "WebAR Browser Experiences",
        desc: "Building web-based AR setups that allow users to scan QR codes and place 3D products in their room instantly."
      },
      {
        title: "Interactive Retail Try-ons",
        desc: "Developing camera try-on solutions for sunglasses, makeup, shoes, and hats to boost catalog sales."
      },
      {
        title: "AR Packaging Activations",
        desc: "Adding scan triggers to physical product packaging to launch 3D stories or game modules."
      },
      {
        title: "Location-Based AR Launches",
        desc: "Designing spatial AR coordinates for retail launch events, museum guides, and city branding."
      }
    ],
    processTitle: "AR Project Milestones",
    processSteps: [
      {
        title: "Asset Curation",
        desc: "Model 3D products, optimize asset polygons, and export web-friendly assets files."
      },
      {
        title: "WebAR Setup",
        desc: "Write tracking code pipelines to ensure products scale correctly on different surfaces."
      },
      {
        title: "Campaign Check",
        desc: "Test AR scans across mobile cameras and launch campaigns."
      }
    ],
    whyTitle: "Why Choose Eon8 for AR Development?",
    whyDesc: "We focus on browser compatibility and fast load speeds. We build WebAR experiences that scan and render in seconds, providing a friction-free user experience.",
    faqs: [
      {
        q: "What is WebAR?",
        a: "WebAR is augmented reality accessed directly through mobile browsers, eliminating the need for users to download dedicated apps."
      },
      {
        q: "How do AR package scans help retail brands?",
        a: "They increase consumer engagement times, highlight product details, and link users directly to digital discount codes."
      }
    ]
  },
  "social-ar-solutions": {
    pathKey: "social-ar-solutions",
    metaTitle: "Social Media AR Campaigns | Instagram & TikTok Filters - Eon8",
    metaDesc: "Launch custom AR filters. Eon8 creates Spark AR and Effect House filters for Instagram, TikTok, and Snapchat.",
    heroTitle: "Social Media AR Campaigns | Instagram & TikTok Filters",
    heroSubtitle: "Organize viral campaigns using custom Spark AR and Effect House filters on Instagram, TikTok, and Snapchat.",
    heroPoints: ["Spark AR Design", "TikTok Effect House", "Snapchat Lenses", "Gamified Filters"],
    introTitle: "Engage Communities with Viral AR Filters",
    introDesc: "AR filters are powerful viral marketing tools. By building gamified, aesthetic, or interactive face filters, you turn users into content creators for your brand. Eon8 designs custom filters for Instagram, TikTok, and Snapchat, launching campaigns that drive millions of user-generated impressions.",
    servicesTitle: "Social AR Campaign Scope",
    servicesSubtitle: "Creative filter design and platform publishing services",
    services: [
      {
        title: "Instagram Filter Design",
        desc: "Designing custom face tracking filters, beauty overlays, and 3D background elements using Spark AR."
      },
      {
        title: "TikTok Effect House Curation",
        desc: "Creating interactive, trending face effects and green-screen elements designed for TikTok's algorithm."
      },
      {
        title: "Snapchat Lenses Curation",
        desc: "Building advanced, interactive lenses utilizing hand gestures or voice triggers."
      },
      {
        title: "Gamified AR filters",
        desc: "Designing simple, addictive head-tilt games or random-selector filters to maximize social shares."
      }
    ],
    processTitle: "Social AR Milestones",
    processSteps: [
      {
        title: "Idea Curation",
        desc: "Map filter mechanics, design graphics assets, and plan branding elements."
      },
      {
        title: "Filter Coding",
        desc: "Build tracking scripts and code interactives on Spark AR or Effect House."
      },
      {
        title: "Platform Approval",
        desc: "Submit filters for platform verification and coordinate creator campaigns."
      }
    ],
    whyTitle: "Why Hire Eon8 for Social AR?",
    whyDesc: "We design social filters that are built for sharing. We focus on viral mechanics, aesthetic appeal, and branding to maximize campaign impressions.",
    faqs: [
      {
        q: "How do AR filters drive brand growth?",
        a: "When users use your filter in their stories or videos, their followers see your brand name attached, driving organic growth."
      },
      {
        q: "How long does platform approval take?",
        a: "Typically, Instagram and TikTok approve submitted filters within 24 to 72 hours."
      }
    ]
  },
  "vr-product-marketing": {
    pathKey: "vr-product-marketing",
    metaTitle: "Virtual Reality in Product Marketing | 3D Demos - Eon8",
    metaDesc: "Rank products higher with 3D. Eon8 designs interactive product simulations, custom try-ons, and visual demos.",
    heroTitle: "Virtual Reality in Product Marketing | 3D Demos",
    heroSubtitle: "Accelerate sales cycles with interactive 3D product simulations, virtual test runs, and high-fidelity product visualization.",
    heroPoints: ["3D Product Demos", "Custom Try-on Simulators", "CAD File Optimization", "Interactive Features"],
    introTitle: "Showcase Complex Products in High-Fidelity 3D",
    introDesc: "Static product images often fail to show the details of complex products. Eon8's product visualization team builds interactive 3D simulations that allow users to rotate, open, and view products from every angle. We help brands showcase features, increasing buyer confidence.",
    servicesTitle: "Product Visualization Scope",
    servicesSubtitle: "Professional 3D asset optimization and interactive web demos",
    services: [
      {
        title: "Interactive 3D Product Demos",
        desc: "Building rotating, interactive product mockups that allow users to inspect features and colors."
      },
      {
        title: "Virtual Try-on Simulators",
        desc: "Developing camera try-ons for retail product catalog pages to reduce store return rates."
      },
      {
        title: "CAD File Optimization",
        desc: "Compressing industrial CAD files into lightweight files that load on standard web browsers."
      },
      {
        title: "Interactive Custom Configurator",
        desc: "Coding dynamic configuration tools to allow users to build custom products in real time."
      }
    ],
    processTitle: "Visualization Lifecycle",
    processSteps: [
      {
        title: "Asset Import",
        desc: "Import CAD designs or physical images and build clean 3D structures."
      },
      {
        title: "Configurator Coding",
        desc: "Code configuration selectors and program click animations."
      },
      {
        title: "Web Integration",
        desc: "Embed 3D configurators on your store product pages and optimize loading speed."
      }
    ],
    whyTitle: "Why Choose Eon8 for Product Demos?",
    whyDesc: "We build configurators that are optimized for web speed. We ensure 3D simulations render fast on all mobile devices, boosting conversions and catalog engagement.",
    faqs: [
      {
        q: "What are the benefits of 3D product configurators?",
        a: "They increase user time-on-page, build buyer trust, reduce product returns, and double conversion rates."
      },
      {
        q: "Do these configurations work on mobile browsers?",
        a: "Yes. All product visualizations built by Eon8 use WebGL, running smoothly on iOS and Android devices without plugins."
      }
    ]
  },
  "metaverse": {
    pathKey: "metaverse",
    metaTitle: "Strategic Branding in the Metaverse | Virtual Worlds - Eon8",
    metaDesc: "Establish your brand footprint. Eon8 metaverse solutions build custom virtual hubs, organize events, and design digital wearables.",
    heroTitle: "Strategic Branding in the Metaverse",
    heroSubtitle: "Position your brand in decentralised spaces, launch custom virtual hubs, and establish brand footprints inside Sandbox and Decentraland.",
    heroPoints: ["Virtual Architecture", "Wearable Curation", "Decentralized Events", "Land Acquisition"],
    introTitle: "Pioneer the Future of Immersive Branding",
    introDesc: "The metaverse represents the next iteration of the digital landscape. Eon8 guides brands in acquiring space, building virtual showrooms, and launching interactive events. We design 3D experiences that bridge physical products and virtual spaces, establishing your presence in the digital future.",
    servicesTitle: "Metaverse Operations Blueprint",
    servicesSubtitle: "Professional 3D building, events, and asset creation services",
    services: [
      {
        title: "Virtual Hub Architecture",
        desc: "Designing and engineering custom 3D buildings, storefronts, and galleries tailored for virtual platforms."
      },
      {
        title: "Metaverse Event Coordination",
        desc: "Hosting virtual product launches, gallery showcases, and live concerts inside virtual platforms."
      },
      {
        title: "Digital Wearables Curation",
        desc: "Designing and minting custom digital accessories, skins, and clothing items for user avatars."
      },
      {
        title: "Platform Setup & Land Guides",
        desc: "Helping brands select, purchase, and deploy custom installations on Sandbox, Decentraland, or Somnium Space."
      }
    ],
    processTitle: "Metaverse Launch Roadmap",
    processSteps: [
      {
        title: "Spatial Design",
        desc: "Wireframe 3D architectures, plan visitor pathways, and specify platform bounds."
      },
      {
        title: "Asset Development",
        desc: "Model high-quality 3D structures, design wearable accessories, and program interactive elements."
      },
      {
        title: "Event Launch",
        desc: "Organize the launch event, invite key influencers, and deploy branding features."
      }
    ],
    whyTitle: "Why Choose Eon8 for Metaverse Solutions?",
    whyDesc: "We combine 3D environment design with Web3 wallet integration and marketing, helping brands build virtual spaces that drive real engagement.",
    faqs: [
      {
        q: "What is branding in the metaverse?",
        a: "It is the creation of interactive 3D spaces, virtual products, and digital events inside decentralized worlds to engage users."
      },
      {
        q: "Do visitors need Web3 wallets to join your spaces?",
        a: "Many platforms allow users to log in using standard email and Google accounts, making it easy for mainstream audiences to participate."
      }
    ]
  }
};
