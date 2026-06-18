export interface NftServiceData {
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

export const nftPagesData: Record<string, NftServiceData> = {
  "nft-marketing-services": {
    pathKey: "nft-marketing-services",
    metaTitle: "NFT Marketing Services Company | NFT Marketing Agency",
    metaDesc: "Eon8 the leading NFT marketing agency crafts the best NFT marketing strategies that are tailored to meet your current and future marketing needs.",
    heroTitle: "Premium NFT Marketing Services Agency",
    heroSubtitle: "Build viral traction and high conversion rates for your NFT collections with our targeted marketing strategies",
    heroPoints: ["Diversified Channels", "Strategic Growth", "Insightful Direction", "Data-Driven ROI"],
    introTitle: "Pioneering NFT Marketing Company",
    introDesc: "We have a passionate team of NFT marketing specialists to make your NFTs viral. We combine our unparalleled NFT marketing services with cost-effective solutions for your NFT collection to build brand values. From conceptualizing your NFTs to influencer marketing, get all essential marketing services under one roof. We understand the goals of your NFT project and create a customized NFT launch campaign to target your audience with unique and interactive campaign ideas.",
    servicesTitle: "Our NFT Marketing Scope",
    servicesSubtitle: "Comprehensive marketing services designed to elevate and monetize digital assets",
    services: [
      {
        title: "NFT Collection Marketing",
        desc: "We market your NFT art collection to NFT investors and collectors worldwide, building awareness and driving demand."
      },
      {
        title: "NFT Influencer Marketing",
        desc: "Our influencers make your NFTs viral and drive targeted, high-intent traffic to your project's landing pages."
      },
      {
        title: "NFT Community Marketing",
        desc: "We build strong and engaging communities that support your NFT vision and long-term project growth."
      },
      {
        title: "PR Services",
        desc: "We create and publish high-quality press releases on top authority crypto and mainstream media platforms for maximum awareness."
      },
      {
        title: "Email Marketing",
        desc: "Keep your NFT audience engaged and primed for mint day with strategic email sequences and investor outreach."
      },
      {
        title: "Remarketing & Retargeting",
        desc: "Re-engage interested website visitors and improve overall NFT mint conversions with advanced retargeting strategies."
      }
    ],
    processTitle: "Our NFT Marketing Approach",
    processSteps: [
      {
        title: "Aspire",
        desc: "We create the short- and long-term objectives of your NFT marketing campaigns and layout the guiding principles."
      },
      {
        title: "Analysis",
        desc: "Identify key competitors and the ideal marketplace for your NFT project with maximum efficiency."
      },
      {
        title: "Assemble",
        desc: "Enrich your overall marketing strategy with our peerless resources to ensure immeasurable value."
      },
      {
        title: "Execution",
        desc: "We pay great attention to every single element of your NFT marketing campaign to boost value."
      },
      {
        title: "Listing",
        desc: "Our highly tactical and granular marketing strategies will help you manage your NFT list on major marketplaces."
      },
      {
        title: "Evaluation",
        desc: "Track significant metrics of your NFT marketing campaign to justify the money and effort spent on the process."
      }
    ],
    whyTitle: "Why Choose Eon8 for NFT Marketing Services?",
    whyDesc: "Having crafted bespoke marketing strategies for over 25+ NFT clients, we can help you promote your NFTs with a unique marketing strategy that speaks for itself. We have leveraged the growth of various NFT projects in the past, and we are pretty much confident that we can do the same for you too.",
    faqs: [
      {
        q: "What is NFT Marketing?",
        a: "NFT marketing is the process of strategically advertising digital assets to improve their reach and increase brand awareness. A professional NFT marketing strategy can help you attract NFT collectors and investors to your NFT projects."
      },
      {
        q: "What makes Eon8 different from other NFT marketing agencies?",
        a: "Being the leading NFT marketing agency, we understand and respect your time and resources. We listen to you carefully to ensure that we craft a personalized NFT marketing strategy that is beneficial for your project. We act as an extension of your NFT team."
      },
      {
        q: "What is the cost of hiring an NFT marketing agency?",
        a: "The cost of hiring varies depending on the type of services you expect from your NFT marketing services provider. NFT marketing packages start from $2,500, but a comprehensive package with all relevant services is recommended to maximize ROI."
      }
    ]
  },
  "nft-art-agency": {
    pathKey: "nft-art-agency",
    metaTitle: "NFT Art Marketing Agency | Art NFT Marketing Company - Eon8",
    metaDesc: "Eon8 is the most popular agency for NFT art marketing and creation services, offering custom illustration and 3D modeling solutions.",
    heroTitle: "Premium NFT Art Creation Agency",
    heroSubtitle: "Transform creative concepts into high-value 2D and 3D generative NFT art collections",
    heroPoints: ["Pioneering Artists", "Generative Code", "3D Modeling", "Vast Utilities"],
    introTitle: "Professional NFT Art Studio",
    introDesc: "We are a full-service NFT art creation company that can help you create impeccable NFT artwork. Our skilled artists can assist you with user-centric designs and fine-tuned solutions, maximizing the potential of your NFTs. We constantly evolve with the latest trends in art design, 3D modeling, and animation. Our talented NFT artists deliver quick and flawless artwork for your NFT collections.",
    servicesTitle: "Our NFT Art Design Services",
    servicesSubtitle: "Tailored creative services to make your digital collections stand out",
    services: [
      {
        title: "Ideation & Concept Art",
        desc: "We create a unique NFT art strategy based on the volume, storyline, and long-term vision of your NFT project."
      },
      {
        title: "Generative Art Engine",
        desc: "Our creative team builds custom script systems to generate thousands of unique NFT images with distinct rarity scores."
      },
      {
        title: "3D Animation & Modeling",
        desc: "Bring your collectibles to life in the metaverse with high-quality 3D animations and digital models."
      },
      {
        title: "Trading Cards",
        desc: "We build professionally designed custom trading cards for sports, fantasy, cars, gems, and physical collectibles."
      },
      {
        title: "Anime NFT Characters",
        desc: "Our NFT art studio is highly renowned for designing high-quality, hand-drawn anime NFT characters and backgrounds."
      },
      {
        title: "Metaverse Assets",
        desc: "We create premium skins, wearables, and interactive digital structures tailored for sandbox and decentralized worlds."
      }
    ],
    processTitle: "NFT Art Creation Lifecycle",
    processSteps: [
      {
        title: "Ideation",
        desc: "Brainstorming concept arts, traits, constraints, and setting up metadata templates."
      },
      {
        title: "Creation",
        desc: "Designing primary characters, layering backgrounds, traits, and finalizing art textures."
      },
      {
        title: "Generation",
        desc: "Running generative codes to output the complete collection alongside unique JSON metadata files."
      }
    ],
    whyTitle: "Why Choose Eon8 For NFT Art Creation?",
    whyDesc: "Our NFT design agency helps you grow leaps and bounds as an NFT artist at every stage to help you achieve your desired outcomes. We make sure that you get a totally unique and visually enticing NFT collection for your project. Our team comprises only qualified professionals to meet your value with quality.",
    faqs: [
      {
        q: "What types of art styles can your NFT studio design?",
        a: "We support a vast array of styles, including 2D pixel art, retro designs, detailed vector illustrations, hand-drawn anime style, and fully-rendered 3D voxel and realistic models."
      },
      {
        q: "How does the generation process work?",
        a: "We design traits (e.g., hats, glasses, backgrounds) in layers and then run a generative script to merge them dynamically while ensuring strict rarity distributions and metadata accuracy."
      }
    ]
  },
  "nft-collection-marketing": {
    pathKey: "nft-collection-marketing",
    metaTitle: "NFT Collection Marketing Agency | Promote NFT Drop - Eon8",
    metaDesc: "Unlock the full potential of your NFT drop. Eon8 delivers optimized launch strategies, coin listing, and community hype.",
    heroTitle: "Successful NFT Collection Marketing",
    heroSubtitle: "Build pre-mint hype and ensure a sell-out collection with our proven framework",
    heroPoints: ["Drop Calendars", "Press Syndicates", "Hype Engines", "Rarity Optimization"],
    introTitle: "Collectibles Drop Promotion",
    introDesc: "NFT collections are an assortment of identical or similarly-themed NFTs launched by NFT creators. If you have an NFT collection piled up, NFT collection marketing can help you make the right deal. We construct customized, chronological marketing milestones leading up to mint day to drive massive sales volume.",
    servicesTitle: "Collection Launch Solutions",
    servicesSubtitle: "From ideation to secondary market support, we manage your drop visibility",
    services: [
      {
        title: "Drop Calendar Listings",
        desc: "Feature your drop on top sites like NFTCalendar, RarityTools, and Minty to capture active collectors' calendars."
      },
      {
        title: "Rarity Optimization",
        desc: "Ensure your rarity parameters are appealing to professional traders and automated rarity analytics crawlers."
      },
      {
        title: "Secondary Market Hype",
        desc: "Maintain floor price stability and volume momentum on OpenSea, Magic Eden, and Blur post-mint."
      },
      {
        title: "Whitelisting Campaigns",
        desc: "Run gamified discord and twitter campaigns to incentivize active community members with mint whitelist access."
      }
    ],
    processTitle: "Collection Marketing Milestones",
    processSteps: [
      {
        title: "Pre-Reveal Build",
        desc: "Creating viral animations and sneak peeks to hook early collectors and seed the core community."
      },
      {
        title: "Mint Phase Execution",
        desc: "Driving high-volume traffic to the mint site through intensive influencer pushes and real-time announcements."
      },
      {
        title: "Post-Mint Floor Push",
        desc: "Activating secondary market strategies, listing checks, and launching token utility programs."
      }
    ],
    whyTitle: "Why Choose Eon8 to Market Your NFT Drop?",
    whyDesc: "We look at NFT collections as full businesses. We don't just focus on the mint day; we design campaigns that build long-term loyalty and utility, ensuring high secondary volume and royalties.",
    faqs: [
      {
        q: "When should we start marketing our NFT collection?",
        a: "Ideally, marketing should begin at least 6 to 8 weeks before the mint date to establish a robust community and whitelist database."
      },
      {
        q: "How do you drive organic engagement for a collection?",
        a: "We avoid basic bot shill tactics. We focus on storytelling, interactive games, puzzle whitelists, and co-marketing with established Web3 projects."
      }
    ]
  },
  "nft-community-marketing": {
    pathKey: "nft-community-marketing",
    metaTitle: "NFT Community Marketing Services | Web3 Growth Agency",
    metaDesc: "Build and moderate high-growth communities on Discord, Telegram, and Twitter with Eon8's specialized community marketing.",
    heroTitle: "Impactful NFT Community Marketing",
    heroSubtitle: "Nurture prospective NFT collectors into loyal project advocates and investors",
    heroPoints: ["Organic Relations", "Twitter Spaces", "AMA Campaigns", "High Retention"],
    introTitle: "Community-Led Token Growth",
    introDesc: "Community building is the ultimate key to developing trust and engagement for your NFT projects. We build strong and engaging communities that support your NFT vision and growth. Our team designs daily interaction loops that keep members active, informed, and enthusiastic.",
    servicesTitle: "Community Marketing Services",
    servicesSubtitle: "Fostering authentic connections across Web3 social networks",
    services: [
      {
        title: "AMA Orchestration",
        desc: "Plan and host engaging AMA (Ask Me Anything) sessions on Twitter Spaces, Discord Stages, and Telegram Voice Chats."
      },
      {
        title: "Collab Management",
        desc: "Execute cross-promotional partnerships with other NFT collections to trade whitelist spots and expand reach."
      },
      {
        title: "Gamified Activations",
        desc: "Run creative trivia nights, meme competitions, and lore-writing quests to maintain daily server hype."
      },
      {
        title: "Twitter Spaces Co-Hosting",
        desc: "Position your founders as thought leaders through weekly Twitter Spaces discussing project updates and Web3 trends."
      }
    ],
    processTitle: "Engagement Optimization Framework",
    processSteps: [
      {
        title: "Setup & Rules",
        desc: "Configuring channels, automated verification systems, roles, and safety bots."
      },
      {
        title: "Nurturing Loops",
        desc: "Creating daily discussion topics, announcements, and feedback loops to build trust."
      },
      {
        title: "Advocacy Scaling",
        desc: "Enabling active members to act as moderators and ambassadors, making the community self-sustainable."
      }
    ],
    whyTitle: "Why Choose Eon8 for Community Marketing?",
    whyDesc: "Communities are the foundation of Web3. Eon8's community building services focus on creating true believers rather than empty statistics. We turn passing browsers into active contributors and holders.",
    faqs: [
      {
        q: "Which platform is best for NFT community building?",
        a: "Discord is the industry standard for nested channels, bot utilities, and nested discussions, while Twitter serves as the primary announcement and public discovery funnel."
      },
      {
        q: "How do you protect the community from scams and hacks?",
        a: "We implement strict security configurations, multi-factor authorization for moderators, anti-drainer bot integrations, and clear rules to prevent rogue links."
      }
    ]
  },
  "nft-game-marketing-services": {
    pathKey: "nft-game-marketing-services",
    metaTitle: "NFT Game Marketing Agency | Play-to-Earn Game Promotion - Eon8",
    metaDesc: "Scale your GameFi or NFT play-to-earn game. Eon8 offers game marketing, guild partnerships, and Web3 player acquisition.",
    heroTitle: "Expert NFT Game Marketing Services",
    heroSubtitle: "Acquire active players, form guild alliances, and increase token velocity for Web3 games",
    heroPoints: ["Guild Partnerships", "P2E Launchpad", "Alpha Testers", "Lore Hype"],
    introTitle: "Acquire & Retain Blockchain Players",
    introDesc: "NFT games require a dual marketing strategy: appealing to gaming enthusiasts who want immersive gameplay, and crypto investors who care about token economics and asset utility. We bridge these two worlds to scale your GameFi ecosystem.",
    servicesTitle: "GameFi Marketing Solutions",
    servicesSubtitle: "Targeted strategies to acquire players and retain Web3 guilds",
    services: [
      {
        title: "Gaming Guild Outreach",
        desc: "Partner with major gaming guilds (e.g., YGG, Merit Circle) to onboard scholarship players and scale in-game asset renting."
      },
      {
        title: "Launchpad Integrations",
        desc: "Coordinate and list your initial game offering (IGO) on leading Web3 gaming launchpads to raise initial capital."
      },
      {
        title: "Alpha/Beta Playtests",
        desc: "Recruit dedicated gamers for initial feedback cycles, building early gameplay reviews and community hype."
      },
      {
        title: "Game Lore Marketing",
        desc: "Develop creative animations, characters backstories, and comic teasers to hook players onto the game's universe."
      }
    ],
    processTitle: "GameFi Launch Lifecycle",
    processSteps: [
      {
        title: "Lore & Art Hype",
        desc: "Revealing concept graphics, character models, and tokenomics structures."
      },
      {
        title: "Asset Mint (IGO)",
        desc: "Conducting initial land sales and playable character drops to build initial player base."
      },
      {
        title: "Live Game Growth",
        desc: "Running tournament incentives, leaderboard campaigns, and token economy upgrades."
      }
    ],
    whyTitle: "Why Choose Eon8 for Play-to-Earn Game Marketing?",
    whyDesc: "With 12+ years in traditional game marketing combined with deep Web3 network capabilities, we build marketing plans that look at player retention, sustainable token models, and community fun.",
    faqs: [
      {
        q: "How do you balance gameplay and token economics in marketing?",
        a: "We emphasize gameplay first to attract genuine players who love the game, and use solid token utility messaging to appeal to yield-focused Web3 investors."
      },
      {
        q: "What is the role of gaming guilds in GameFi marketing?",
        a: "Guilds provide bulk player acquisition, rent out costly NFT game assets to players, and generate high organic transaction volumes within your game's ecosystem."
      }
    ]
  },
  "nft-social-media-marketing": {
    pathKey: "nft-social-media-marketing",
    metaTitle: "NFT Social Media Marketing Services | Web3 Social Agency",
    metaDesc: "Grow your Web3 audience. Eon8 delivers optimized social media management, organic twitter hooks, and viral reels campaigns.",
    heroTitle: "Dynamic NFT Social Media Marketing",
    heroSubtitle: "Optimize your organic social handle growth and coordinate viral social media campaigns",
    heroPoints: ["Viral Reels", "Thread Writing", "Meme Campaigns", "Audience Sync"],
    introTitle: "Omnichannel Social Web3 Growth",
    introDesc: "Web3 moves at lightning speed. To stay relevant, your NFT project needs consistent, highly engaging social touchpoints. We manage your presence across Twitter, Instagram, TikTok, and YouTube, positioning your project at the center of cultural conversations.",
    servicesTitle: "Social Media Scope",
    servicesSubtitle: "Creative social campaigns that drive community growth and mint conversion",
    services: [
      {
        title: "Twitter Thread Optimization",
        desc: "Draft highly engaging educational threads explaining your project utilities, vision, and team credentials."
      },
      {
        title: "Meme Marketing",
        desc: "Create and seed contextual memes that capture crypto culture and get shared organically across Web3 channels."
      },
      {
        title: "Short-Form Video (TikTok/Reels)",
        desc: "Produce dynamic animations, founder interviews, and aesthetic previews optimized for Instagram Reels and TikTok algorithms."
      },
      {
        title: "Community Highlight Reels",
        desc: "Curate and share community content, reviews, and tweets to build social proof and secondary market interest."
      }
    ],
    processTitle: "Content Creation Framework",
    processSteps: [
      {
        title: "Content Strategy",
        desc: "Defining visual guidelines, tone of voice, content calendar, and primary messaging themes."
      },
      {
        title: "Daily Execution",
        desc: "Drafting, designing graphics, editing videos, and scheduling across all relevant social handles."
      },
      {
        title: "Engagement & Sync",
        desc: "Monitoring comments, hosting real-time Q&A, and participating in trending industry hashtags."
      }
    ],
    whyTitle: "Why Partner with Eon8 for NFT Social Management?",
    whyDesc: "We don't just post content; we write content that matches the specific vibe of Web3. Our copywriters and graphic designers understand crypto terminology, building authentic credibility with your audience.",
    faqs: [
      {
        q: "Why is Twitter (X) the primary channel for NFT marketing?",
        a: "Twitter is where the global Web3 conversation, news, creators, and investors gather, making it essential for instant community updates and discovery."
      },
      {
        q: "Do you create custom graphics and animations for posts?",
        a: "Yes, our in-house creative team designs custom static cards, infographics, 3D character renders, and short gameplay animations for all social content."
      }
    ]
  },
  "nft-pr-services": {
    pathKey: "nft-pr-services",
    metaTitle: "NFT PR Agency | NFT Press Release Services - Eon8",
    metaDesc: "Establish credibility for your NFT collection. Eon8 publishes articles in Yahoo Finance, Forbes, CoinTelegraph, etc.",
    heroTitle: "Expert NFT PR Services Agency",
    heroSubtitle: "Publish your collection details on top crypto publications and global news outlets to build trust",
    heroPoints: ["Global News outlets", "Guaranteed Coverage", "Story Pitching", "Investor Pitch"],
    introTitle: "Credibility Through Media Coverage",
    introDesc: "Public relations are critical in Web3 to combat skepticism. When prospective collectors search for your project on Google, having reviews and articles in trusted magazines is the ultimate proof of credibility.",
    servicesTitle: "NFT PR Solutions",
    servicesSubtitle: "Get featured in the world's most popular financial and blockchain outlets",
    services: [
      {
        title: "Crypto Media Distribution",
        desc: "Publish detailed interviews, collection previews, and project roadmaps on CoinTelegraph, Decrypt, and Bitcoinist."
      },
      {
        title: "Mainstream Press Syndication",
        desc: "Distribute news announcements on Yahoo Finance, Business Insider, Forbes, and Bloomberg for global financial exposure."
      },
      {
        title: "Founder Interview Pitching",
        desc: "Pitch your core developers and artists to leading podcast hosts and tech journalists for dedicated feature episodes."
      },
      {
        title: "Crisis Communication Management",
        desc: "Strategic advisory and response writing to maintain project reputation during system upgrades or market downturns."
      }
    ],
    processTitle: "Press Distribution Pipeline",
    processSteps: [
      {
        title: "Story Development",
        desc: "Writing press releases, pitches, and positioning statements that highlight the project's unique innovation."
      },
      {
        title: "Outlet Selection",
        desc: "Selecting the target media list based on audience alignment and authority scores."
      },
      {
        title: "Publish & Track",
        desc: "Distributing the release, securing live links, and generating complete visibility analytics reports."
      }
    ],
    whyTitle: "Why Choose Eon8 for NFT Press Releases?",
    whyDesc: "We have pre-existing relationships with editors across global news networks and crypto blogs, guaranteeing faster publication turnaround times and optimized placements.",
    faqs: [
      {
        q: "What is the benefit of PR compared to paid advertising?",
        a: "PR builds long-term authority, organic Google search presence, and credibility, whereas advertising only drives temporary traffic."
      },
      {
        q: "Can you help write the content for press releases?",
        a: "Yes, our team of professional Web3 copywriters drafts the complete copy, hooks, and structures, sending them to you for approval before media pitching."
      }
    ]
  },
  "nft-telegram-marketing": {
    pathKey: "nft-telegram-marketing",
    metaTitle: "NFT Telegram Marketing Agency | Web3 Group Promotion - Eon8",
    metaDesc: "Scale your Telegram community. Eon8 delivers group setup, automated bots, shill campaigns, and active channel growth.",
    heroTitle: "Direct NFT Telegram Marketing",
    heroSubtitle: "Grow your Telegram channel, automate moderations, and drive active mint notifications",
    heroPoints: ["Group Growth", "Shill Mitigation", "Announcements Bot", "P2P Promotion"],
    introTitle: "Real-Time Telegram Engagement",
    introDesc: "Telegram is the instant messaging hub for crypto traders and NFT collectors. We build, manage, and scale your Telegram group, ensuring it remains an active, safe, and positive space for direct updates.",
    servicesTitle: "Telegram Growth Scope",
    servicesSubtitle: "Targeted Telegram promotional campaigns to convert users into mint buyers",
    services: [
      {
        title: "Telegram Channel Setup",
        desc: "Establish a broadcast channel with clean brand visuals and automated links for official announcements only."
      },
      {
        title: "Shield & Security Setup",
        desc: "Integrate anti-bot verification, anti-drainer filters, and spam protection to ensure your members stay safe from scammers."
      },
      {
        title: "Coin Group Shill Coordination",
        desc: "Promote your NFT artwork across thousands of verified crypto trading Telegram channels and alpha groups."
      },
      {
        title: "Active Q&A Management",
        desc: "Our moderators provide 24/7 coverage, answering members questions and keeping the group vibe positive."
      }
    ],
    processTitle: "Telegram Scaling Framework",
    processSteps: [
      {
        title: "Configuration",
        desc: "Setting up automated welcome messages, community guidelines, and moderator shifts."
      },
      {
        title: "Alpha Outreach",
        desc: "Sharing daily project metrics, rarity leaks, and teaser clips to build engagement."
      },
      {
        title: "Launch Coordination",
        desc: "Hosting voice chat calls and pinning countdown links leading up to the mint phase."
      }
    ],
    whyTitle: "Why Choose Eon8 for Telegram NFT Campaigns?",
    whyDesc: "We deploy experienced, bilingual community managers who understand crypto culture, keeping your group vibrant, interactive, and fully protected from rogue promotions and spam.",
    faqs: [
      {
        q: "What is the difference between Telegram Channel and Group?",
        a: "Channels are for read-only broadcasts from the project team, while Groups allow all members to chat, share opinions, and build peer relationships."
      },
      {
        q: "How do you drive new members to a Telegram group?",
        a: "We run referral competitions, coordinate announcements with crypto alpha channels, and leverage cross-promotion deals."
      }
    ]
  },
  "nft-twitter-marketing": {
    pathKey: "nft-twitter-marketing",
    metaTitle: "NFT Twitter Marketing Agency | Web3 Twitter (X) Promotion",
    metaDesc: "Dominate Twitter (X). Eon8 manages viral twitter threads, spaces co-hosting, influencer partnerships, and whitelist giveaways.",
    heroTitle: "Sleek NFT Twitter Marketing",
    heroSubtitle: "Build authority and community on Web3's primary discussion channel",
    heroPoints: ["Spaces Events", "Thread Hooks", "Giveaways engine", "Founder Branding"],
    introTitle: "Rule the Web3 Conversation on X",
    introDesc: "Twitter (X) is the public square for NFTs. A successful project requires creative copywriting, consistent spaces presence, and viral giveaway partnerships. We configure, design, and execute your entire Twitter strategy.",
    servicesTitle: "Twitter Growth Scope",
    servicesSubtitle: "Strategic positioning to capture investor eyes on X timelines",
    services: [
      {
        title: "Viral Whitelist Giveaways",
        desc: "Coordinate giveaway campaigns with major Web3 influencers requiring retweets, follows, and discord joins."
      },
      {
        title: "Founder Profile Branding",
        desc: "Optimize your founders' personal Twitter handles to establish authority, trust, and narrative alignment."
      },
      {
        title: "Live Spaces Coordination",
        desc: "Host, co-host, and speak on popular Web3 Twitter Spaces, driving thousands of listeners to your project's website."
      },
      {
        title: "Timeline Engagement Hooks",
        desc: "Actively engage in popular discussions and comments under major crypto accounts to build project visibility."
      }
    ],
    processTitle: "Organic Twitter Funnel",
    processSteps: [
      {
        title: "Profile Audit & Setup",
        desc: "Redesigning banners, bios, pinned posts, and links page to maximize follow conversions."
      },
      {
        title: "Growth Sprints",
        desc: "Running giveaways, scheduling high-quality hooks, and launching spaces co-hosts."
      },
      {
        title: "Retention Engagement",
        desc: "Building visual content, sharing community memes, and publishing project development logs."
      }
    ],
    whyTitle: "Why Choose Eon8 for Twitter Marketing?",
    whyDesc: "We track algorithm updates in real-time, structuring our posts (threads, short videos, quotes) to ensure maximum impressions and organic reach without relying on paid bots.",
    faqs: [
      {
        q: "Do giveaway campaigns bring real members?",
        a: "Yes, when paired with strict Discord entry verification and gamified tasks, it converts passing users into active, long-term community members."
      },
      {
        q: "How often should an NFT project post on X?",
        a: "We recommend 2 to 3 high-quality organic posts per day, along with active involvement in relevant spaces and reply sections."
      }
    ]
  },
  "nft-youtube-marketing": {
    pathKey: "nft-youtube-marketing",
    metaTitle: "NFT YouTube Marketing Agency | Web3 Video Promotion - Eon8",
    metaDesc: "Scale your NFT project with YouTube. Eon8 offers video creation, influencer reviews, animations, and ads.",
    heroTitle: "Dynamic NFT YouTube Marketing",
    heroSubtitle: "Capture long-form attention with 3D animation videos and verified influencer reviews",
    heroPoints: ["3D Video Trailers", "Influencer Reviews", "Ad Campaigns", "SEO Video Hooks"],
    introTitle: "Long-Form Video Authority",
    introDesc: "YouTube is the second largest search engine in the world. High-quality 3D video previews and deep-dive developer interviews build massive trust, demonstrating your team's long-term execution capabilities and budget.",
    servicesTitle: "YouTube Promotion Scope",
    servicesSubtitle: "Video creation and distribution solutions to boost project valuation",
    services: [
      {
        title: "3D Animation Teasers",
        desc: "Produce cinematic, high-rendering 3D video trailers highlighting your NFT artwork and lore."
      },
      {
        title: "YouTube Influencer Collaborations",
        desc: "Partner with top Web3 and tech YouTubers for comprehensive reviews, tutorials, and deep dives."
      },
      {
        title: "TrueView Video Ads",
        desc: "Configure and run targeted YouTube pre-roll ads targeting crypto traders, developers, and collectors."
      },
      {
        title: "Founder Interview Broadcasts",
        desc: "Record and publish high-quality founder interviews, AMA videos, and gameplay demos."
      }
    ],
    processTitle: "Video Production Pipeline",
    processSteps: [
      {
        title: "Script & Storyboard",
        desc: "Drafting script outlines, visual frames, hooks, and background scores."
      },
      {
        title: "Render & Edit",
        desc: "Generating 3D models, character textures, adding sound effects, and final edits."
      },
      {
        title: "Publish & SEO",
        desc: "Uploading with targeted keywords, thumbnails, metadata, and coordinating influencer releases."
      }
    ],
    whyTitle: "Why Choose Eon8 for YouTube NFT Video Campaigns?",
    whyDesc: "We have an in-house team of video directors, scriptwriters, and 3D animators who specialize in Web3 storytelling, bringing your collections to life with film-level rendering and graphics.",
    faqs: [
      {
        q: "What is the typical length of a project trailer video?",
        a: "We recommend keeping trailers between 60 to 90 seconds, focusing heavily on visuals, music beats, and primary utility highlights."
      },
      {
        q: "How do you measure YouTube campaign performance?",
        a: "We track viewer retention, click-through rates (CTR) to the main website, subscriber growth, and direct traffic conversions."
      }
    ]
  },
  "nft-reddit-marketing": {
    pathKey: "nft-reddit-marketing",
    metaTitle: "NFT Reddit Marketing Agency | Web3 Subreddit Promotion",
    metaDesc: "Acquire active Web3 discussions. Eon8 delivers organic subreddit threads, AMA sessions, and community engagement.",
    heroTitle: "Direct NFT Reddit Marketing",
    heroSubtitle: "Build organic discussions on r/NFT, r/crypto, and custom project subreddits",
    heroPoints: ["Subreddit setup", "AMA hosting", "Moderator shield", "Organic Threads"],
    introTitle: "Reddit Community Trust",
    introDesc: "Reddit is the ultimate platform for community reviews and discussions. To win on Reddit, projects must avoid automated spam and focus on transparent, high-value discussions. We configure and manage your entire Reddit marketing strategy.",
    servicesTitle: "Reddit Promotion Scope",
    servicesSubtitle: "Targeted subreddit promotions that build organic trust and search presence",
    services: [
      {
        title: "Subreddit Creation & Setup",
        desc: "Create and brand a dedicated subreddit for your NFT collection, establishing it as the official discussion forum."
      },
      {
        title: "Organic Discussion Seeding",
        desc: "Publish valuable, educational threads discussing the technology, art, and long-term utility of your NFTs."
      },
      {
        title: "r/AMA Session Hosting",
        desc: "Coordinate and manage Ask-Me-Anything sessions on popular subreddits to directly answer user questions."
      },
      {
        title: "Reddit Conversational Outreach",
        desc: "Identify and engage with users asking about upcoming NFT collections in comments, providing helpful information."
      }
    ],
    processTitle: "Reddit Engagement Strategy",
    processSteps: [
      {
        title: "Setup & Rules",
        desc: "Configuring the subreddit rules, visual graphics, auto-moderation filters, and pinned wiki page."
      },
      {
        title: "Narrative Seeding",
        desc: "Publishing detailed developer logs, art reveals, and roadmaps to build organic interest."
      },
      {
        title: "Outreach & Growth",
        desc: "Coordinating AMA events, responding to reviews, and engaging in relevant subreddits."
      }
    ],
    whyTitle: "Why Choose Eon8 for Reddit NFT Marketing?",
    whyDesc: "We understand Reddit's unique rules and culture. We build organic, value-focused engagement that increases your project's credibility without triggering spam flags or moderator bans.",
    faqs: [
      {
        q: "How do you prevent Reddit posts from being marked as spam?",
        a: "We write detailed, value-first posts, engage authentically in comment sections, and strictly follow the formatting rules of each subreddit."
      },
      {
        q: "Why is Reddit important for search engine optimization (SEO)?",
        a: "Search engines like Google rank active Reddit threads highly for query reviews and discussions, making organic Reddit presence essential for building trust."
      }
    ]
  },
  "nft-game-discord-marketing": {
    pathKey: "nft-game-discord-marketing",
    metaTitle: "NFT Game Discord Marketing Agency | GameFi Server Growth",
    metaDesc: "Scale your GameFi Discord. Eon8 delivers server configuration, gamer roles, automated bots, and game engagement.",
    heroTitle: "Expert GameFi Discord Marketing",
    heroSubtitle: "Build a highly active and secure Discord community for your NFT gaming project",
    heroPoints: ["Gamer Roles", "Game Integration", "Automated bots", "Event hosting"],
    introTitle: "Connect Gamers and Web3 Collectors",
    introDesc: "GameFi Discord servers require unique engagement strategies. Gamers expect active channels, tournament updates, leaderboard integrations, and real-time support. We design, configure, and moderate your GameFi Discord server.",
    servicesTitle: "GameFi Discord Solutions",
    servicesSubtitle: "Targeted strategies to keep gamers engaged and active",
    services: [
      {
        title: "Gamer Roles Configuration",
        desc: "Establish a detailed hierarchy of roles based on in-game achievements, assets owned, and server participation."
      },
      {
        title: "Custom Bot Integrations",
        desc: "Integrate bots that track player statistics, show current floor prices, and handle verification."
      },
      {
        title: "Gaming Tournament Hosting",
        desc: "Coordinate and manage competitive gaming events, tournament brackets, and live streams within your Discord server."
      },
      {
        title: "24/7 Gamer Support",
        desc: "Our team provides round-the-clock moderator coverage, resolving technical issues and maintaining community health."
      }
    ],
    processTitle: "GameFi Server Setup Lifecycle",
    processSteps: [
      {
        title: "Server Configuration",
        desc: "Creating channels, setting up rules, and configuring security bots."
      },
      {
        title: "Engagement Launch",
        desc: "Hosting gameplay streams, running giveaway campaigns, and leaking game logs."
      },
      {
        title: "Scale & Support",
        desc: "Expanding moderator coverage, running tournaments, and managing support tickets."
      }
    ],
    whyTitle: "Why Choose Eon8 for GameFi Discord Marketing?",
    whyDesc: "We combine deep gaming community expertise with advanced Web3 security configuration, ensuring your Discord server is a safe, fun, and highly active space for your player base.",
    faqs: [
      {
        q: "How do you verify in-game assets inside Discord?",
        a: "We integrate verified Web3 verification bots (e.g., Collab.Land) that scan users' wallets for specific NFTs to grant exclusive roles."
      },
      {
        q: "What types of events keep gamers engaged on Discord?",
        a: "Weekly trivia nights, gaming tournaments, founder AMA voice calls, and leaderboard screenshot competitions are highly effective."
      }
    ]
  },
  "discord-marketing-agency": {
    pathKey: "discord-marketing-agency",
    metaTitle: "Discord Marketing Agency | Discord NFT Marketing Firm - Eon8",
    metaDesc: "Partner with Eon8, the leading Discord NFT marketing firm. We handle custom bot setup, promotions, and 24/7 moderation.",
    heroTitle: "Expert Discord Marketing Agency",
    heroSubtitle: "Build and scale your brand's digital community with the leading Discord marketing firm",
    heroPoints: ["Custom Bots", "24/7 Moderation", "Member Growth", "Server Security"],
    introTitle: "Pioneering Discord Marketing Solutions",
    introDesc: "Partner with our Discord marketing firm and get an amazing platform to outsmart your competition and get a positive ROI. Experience growth beyond your expectations! We configure, design, and manage your entire Discord server structure to optimize conversions and retention.",
    servicesTitle: "Discord Marketing Scope",
    servicesSubtitle: "Comprehensive community solutions to turn users into holders and advocates",
    services: [
      {
        title: "Custom Bots Integration",
        desc: "We build and install custom bots that automate welcome messages, manage security, and provide interactive commands for users."
      },
      {
        title: "Server Security Audit",
        desc: "Protect your members from scammers with advanced security configurations, verification walls, and anti-drainer link shields."
      },
      {
        title: "Promo & Partnership Campaigns",
        desc: "Coordinate server-invite giveaways and trade whitelist spots with partner projects to drive massive member growth."
      },
      {
        title: "Bilingual Moderation Support",
        desc: "Ensure 24/7 support coverage with trained, native moderators handling chat flows and user questions."
      }
    ],
    processTitle: "Discord Server Execution Plan",
    processSteps: [
      {
        title: "Configure",
        desc: "Building a clean, visually appealing server channel design, categories, roles, and guidelines."
      },
      {
        title: "Scale",
        desc: "Launching promotional partnership drives, giveaways, and influencer events to onboard users."
      },
      {
        title: "Maintain",
        desc: "Keeping members active, engaged, and safe through professional daily moderation and events."
      }
    ],
    whyTitle: "Why Choose Eon8 for Discord Marketing?",
    whyDesc: "Having built and managed servers for over 30+ successful Web3 and traditional brands, Eon8 brings proven security, high-retention engagement campaigns, and top moderation networks to your project.",
    faqs: [
      {
        q: "How do you drive new members to join a Discord server?",
        a: "We run gamified whitelist giveaways, coordinate partnerships with established projects, and leverage influencer marketing campaigns."
      },
      {
        q: "What is the role of a Discord moderator?",
        a: "Moderators enforce server rules, welcome new users, answer technical questions, run games, and delete malicious links immediately."
      }
    ]
  },
  "discord-game-marketing-agency": {
    pathKey: "discord-game-marketing-agency",
    metaTitle: "Discord Game Marketing Agency | Game Server Promotion - Eon8",
    metaDesc: "Scale your gaming server. Eon8 offers game integration, player role setups, tournament coordination, and custom bots.",
    heroTitle: "Expert Discord Game Marketing Agency",
    heroSubtitle: "Build a thriving community of gamers, speed up asset trading, and scale gameplay updates",
    heroPoints: ["Leaderboard Bots", "Gaming Events", "Team Roles", "Support Systems"],
    introTitle: "Connect Gamers and Game Developers",
    introDesc: "Gamers require real-time interactions and highly active communities. Our Discord gaming specialists design custom channels, role structures, and tournament integrations to keep your gaming server highly engaging.",
    servicesTitle: "Gaming Server Solutions",
    servicesSubtitle: "Dynamic setups that keep players active and competitive",
    services: [
      {
        title: "Leaderboard Integrations",
        desc: "Install bots that sync with in-game databases to display player ranks, matches won, and stats directly on Discord."
      },
      {
        title: "Voice Channel Organization",
        desc: "Design custom voice channels for teams, duos, squads, and general community hangouts."
      },
      {
        title: "Gaming Role Setup",
        desc: "Assign dynamic roles to players based on their favorite characters, levels, clans, or server achievements."
      },
      {
        title: "Bug & Feedback Tracking",
        desc: "Integrate ticketing tools to streamline game bug reports, developer answers, and feature suggestions."
      }
    ],
    processTitle: "Gaming Server Lifecycle",
    processSteps: [
      {
        title: "Architect",
        desc: "Designing channel categories (e.g., General, Strategies, Media, Support) and player roles."
      },
      {
        title: "Launch",
        desc: "Deploying custom bots, verification systems, and announcing the server launch on social media."
      },
      {
        title: "Engage",
        desc: "Hosting game nights, tournaments, and developer streams to maintain high player activity."
      }
    ],
    whyTitle: "Why Choose Eon8 for Discord Game Marketing?",
    whyDesc: "We understand gamer culture. We combine custom bot integrations with tournament management to keep players excited about your game and active on your server.",
    faqs: [
      {
        q: "How do you coordinate gaming tournaments?",
        a: "We use tournament bots to handle registrations, match schedules, brackets, and score submissions directly inside Discord channels."
      },
      {
        q: "Can you help set up support tickets for users?",
        a: "Yes, we integrate support bots that allow users to create private channels (tickets) to resolve issues with moderators."
      }
    ]
  },
  "discord-server-marketing": {
    pathKey: "discord-server-marketing",
    metaTitle: "Discord Server Marketing Services | Group Promotion - Eon8",
    metaDesc: "Drive organic member growth to your server. Eon8 delivers invite campaigns, giveaway integrations, and partner deals.",
    heroTitle: "Proven Discord Server Marketing",
    heroSubtitle: "Scale your server membership and increase user engagement with our marketing strategies",
    heroPoints: ["Invite Contests", "Influencer Shills", "Cross Promotions", "Organic Traffic"],
    introTitle: "Expand Your Discord Server Reach",
    introDesc: "Building a great Discord server is just the beginning; you must actively promote it to onboard new members. We design and execute multi-channel marketing campaigns to drive targeted traffic to your Discord server invite link.",
    servicesTitle: "Server Promotional Services",
    servicesSubtitle: "Targeted growth campaigns to build a large and active community",
    services: [
      {
        title: "Invite Contest Setup",
        desc: "Run gamified invite contests with automated bots tracking invites, rewarding members with exclusive roles."
      },
      {
        title: "Influencer Partnership Drives",
        desc: "Co-market with established Discord communities and influencers who run invite campaigns to their servers."
      },
      {
        title: "Listing Optimization",
        desc: "Submit and optimize your server profile on top listing directories like Disboard, Discord Me, and top lists."
      },
      {
        title: "Social Media Funnels",
        desc: "Create Twitter, Instagram, and TikTok content funnels designed to drive viewers directly to your server verification wall."
      }
    ],
    processTitle: "Server Hype Pipeline",
    processSteps: [
      {
        title: "Audit & Optimize",
        desc: "Reviewing server layouts, descriptions, and verification speed to minimize user drops."
      },
      {
        title: "Campaign Kickoff",
        desc: "Launching invite contents, cross-promotions, and influencer pushes concurrently."
      },
      {
        title: "Retention Monitor",
        desc: "Analyzing retention metrics, chat activity, and adjusting campaigns for optimal member value."
      }
    ],
    whyTitle: "Why Choose Eon8 for Discord Server Marketing?",
    whyDesc: "We avoid fake member bots. We focus on organic member acquisition strategies, ensuring every new member is a genuine user interested in your brand.",
    faqs: [
      {
        q: "What is a good verification wall setup?",
        a: "We recommend a single-click verification bot (e.g., Captcha.bot) that prevents automated spam while remaining quick for real users."
      },
      {
        q: "How do you track who invited which member?",
        a: "We install tracking bots that monitor link creations, counting invites per user and updating leaderboards dynamically."
      }
    ]
  },
  "discord-moderation-services": {
    pathKey: "discord-moderation-services",
    metaTitle: "Discord Moderation Services | 24/7 Community Shield - Eon8",
    metaDesc: "Protect your Discord server from spam and scams. Eon8 delivers trained moderators, safety bot setup, and spam shields.",
    heroTitle: "Bespoke Discord Moderation Services",
    heroSubtitle: "Secure your community and keep conversations positive with our 24/7 moderator shifts",
    heroPoints: ["24/7 Shifts", "Scam Mitigation", "Role Management", "Active Engagement"],
    introTitle: "Keep Your Community Clean and Safe",
    introDesc: "A safe server is a trusted server. Our professional Discord moderators monitor chat rooms round-the-clock, deleting spam links, banning malicious actors, and maintaining a welcoming environment for all members.",
    servicesTitle: "Discord Moderation Scope",
    servicesSubtitle: "Automated filters and human oversight to secure your digital assets",
    services: [
      {
        title: "24/7 Shift Coverage",
        desc: "Our global team handles moderator shifts across all timezones, ensuring your server is never left unattended."
      },
      {
        title: "Anti-Scam Configuration",
        desc: "Configure word filters, link blocks, and automated ban scripts to protect members from direct message scams."
      },
      {
        title: "Support Ticket Handling",
        desc: "Manage and resolve customer support tickets, troubleshooting user issues, and collecting helpful feedback."
      },
      {
        title: "Chat Starter Prompts",
        desc: "Moderators actively post daily discussion questions, news updates, and memes to keep chat rooms active."
      }
    ],
    processTitle: "Community Protection Plan",
    processSteps: [
      {
        title: "Risk Analysis",
        desc: "Identifying potential attack vectors, setting up auto-mod rules, and configuring security bots."
      },
      {
        title: "Moderator Deploy",
        desc: "Assigning moderator roles, scheduling shifts, and establishing communication protocols."
      },
      {
        title: "Continuous Review",
        desc: "Analyzing moderation logs, refining word filters, and updating server security parameters."
      }
    ],
    whyTitle: "Why Choose Eon8 for Discord Moderation?",
    whyDesc: "We provide trained, professional moderators who understand community guidelines and conflict resolution, keeping your server clean, active, and fully protected.",
    faqs: [
      {
        q: "How do you handle rogue links in chat?",
        a: "Our automated filters instantly delete unauthorized links, and moderators immediately ban the accounts posting them."
      },
      {
        q: "Can moderators help coordinate community events?",
        a: "Yes, our moderators help host games, run trivia contests, and assist in managing stage calls and AMAs."
      }
    ]
  },
  "reddit-community-marketing-agency": {
    pathKey: "reddit-community-marketing-agency",
    metaTitle: "Reddit Community Marketing Agency | Web3 Reddit Promotion",
    metaDesc: "Scale your Reddit presence. Eon8 manages organic subreddit creation, community discussions, and AMA events.",
    heroTitle: "Expert Reddit Community Marketing",
    heroSubtitle: "Build credibility and organic discussion for your brand on the internet's homepage",
    heroPoints: ["Subreddit Growth", "Organic Seeding", "AMA Events", "Trust Building"],
    introTitle: "Engage the Global Reddit Community",
    introDesc: "Reddit is a community-driven platform that values authenticity above all. To succeed, brands must participate genuinely in discussions. We create and execute Reddit marketing strategies that build brand authority and trust.",
    servicesTitle: "Reddit Marketing Services",
    servicesSubtitle: "Strategic promotions that foster authentic user discussions and search presence",
    services: [
      {
        title: "Dedicated Subreddit Creation",
        desc: "We build and customize a dedicated subreddit for your brand, establishing an official hub for community discussions."
      },
      {
        title: "High-Value Thread Seeding",
        desc: "Draft and publish detailed, informative threads sharing insights, updates, and roadmaps without triggering spam flags."
      },
      {
        title: "Subreddit AMA Coordination",
        desc: "Host Ask-Me-Anything sessions on popular subreddits (e.g., r/IAmA, r/cryptocurrency) to directly answer user queries."
      },
      {
        title: "Community Moderation Setup",
        desc: "Establish clear subreddit rules, visual guidelines, and configure automoderator tools to protect your brand community."
      }
    ],
    processTitle: "Reddit Growth Plan",
    processSteps: [
      {
        title: "Audit & Establish",
        desc: "Creating the official subreddit, writing rules, and setting up auto-moderation tools."
      },
      {
        title: "Seeding & Discussion",
        desc: "Publishing detailed project logs and participating in discussions across relevant subreddits."
      },
      {
        title: "AMA & Scale",
        desc: "Coordinating AMA events, responding to reviews, and managing community growth."
      }
    ],
    whyTitle: "Why Choose Eon8 for Reddit Community Marketing?",
    whyDesc: "We understand Reddit's unique rules and formatting guidelines. We build organic, value-focused engagement that increases your project's credibility without triggering spam flags or moderator bans.",
    faqs: [
      {
        q: "How do you prevent Reddit posts from being marked as spam?",
        a: "We write detailed, value-first posts, engage authentically in comment sections, and strictly follow the formatting rules of each subreddit."
      },
      {
        q: "Why is Reddit important for search engine optimization (SEO)?",
        a: "Search engines like Google rank active Reddit threads highly for query reviews and discussions, making organic Reddit presence essential for building trust."
      }
    ]
  },
  "discord-community-building-services": {
    pathKey: "discord-community-building-services",
    metaTitle: "Discord Community Building Services | Web3 Server Growth",
    metaDesc: "Scale your Discord community. Eon8 delivers server configuration, gamer roles, automated bots, and game engagement.",
    heroTitle: "Expert Discord Community Building",
    heroSubtitle: "Build a highly active and secure Discord community for your brand or project",
    heroPoints: ["Roles Config", "Bot Integrations", "AMA Stages", "Event Hosting"],
    introTitle: "Connect Brand Advocates and Customers",
    introDesc: "Discord communities require unique engagement strategies. Members expect active channels, real-time updates, event integrations, and direct support. We design, configure, and moderate your brand's Discord server.",
    servicesTitle: "Discord Community Solutions",
    servicesSubtitle: "Targeted strategies to keep members active and engaged",
    services: [
      {
        title: "Role Hierarchy Configuration",
        desc: "Establish a detailed hierarchy of roles based on community contributions, milestones, and server participation."
      },
      {
        title: "Custom Bot Integrations",
        desc: "Integrate bots that track member referrals, manage safety verification, and automate commands."
      },
      {
        title: "Community Event Hosting",
        desc: "Coordinate and manage trivia nights, meme contests, and stage calls within your Discord server."
      },
      {
        title: "24/7 Moderator Support",
        desc: "Our team provides round-the-clock moderator coverage, resolving technical issues and maintaining community health."
      }
    ],
    processTitle: "Discord Server Setup Lifecycle",
    processSteps: [
      {
        title: "Server Layout",
        desc: "Creating channel categories, categories, and setting up verification systems."
      },
      {
        title: "Launch & Hype",
        desc: "Deploying custom bots, verification systems, and announcing the server launch on social media."
      },
      {
        title: "Active Growth",
        desc: "Running tournament incentives, leaderboard campaigns, and token economy upgrades."
      }
    ],
    whyTitle: "Why Choose Eon8 for Discord Community Building?",
    whyDesc: "We combine deep gaming community expertise with advanced Web3 security configuration, ensuring your Discord server is a safe, fun, and highly active space for your player base.",
    faqs: [
      {
        q: "How do you verify in-game assets inside Discord?",
        a: "We integrate verified Web3 verification bots (e.g., Collab.Land) that scan users' wallets for specific NFTs to grant exclusive roles."
      },
      {
        q: "What types of events keep gamers engaged on Discord?",
        a: "Weekly trivia nights, gaming tournaments, founder AMA voice calls, and leaderboard screenshot competitions are highly effective."
      }
    ]
  },
  "nft-game-reddit-marketing": {
    pathKey: "nft-game-reddit-marketing",
    metaTitle: "NFT Game Reddit Marketing Agency | Web3 Game Reddit Promotion",
    metaDesc: "Scale your GameFi Reddit. Eon8 delivers subreddit setup, player role setups, tournament coordination, and custom bots.",
    heroTitle: "Expert GameFi Reddit Marketing",
    heroSubtitle: "Build a highly active and secure Reddit community for your NFT gaming project",
    heroPoints: ["Subreddit Growth", "Organic Seeding", "AMA Events", "Gamer Reviews"],
    introTitle: "Connect Gamers and Game Developers on Reddit",
    introDesc: "GameFi Reddit communities require unique engagement strategies. Gamers expect active subreddits, tournament updates, leaderboard integrations, and real-time support. We design, configure, and moderate your GameFi Reddit community.",
    servicesTitle: "GameFi Reddit Solutions",
    servicesSubtitle: "Targeted strategies to keep players engaged and active",
    services: [
      {
        title: "Subreddit Setup & Layout",
        desc: "Create and brand a dedicated subreddit for your GameFi project, establishing an official hub for player discussions."
      },
      {
        title: "Organic Discussion Seeding",
        desc: "Publish valuable, educational threads discussing the technology, art, and long-term utility of your NFTs."
      },
      {
        title: "r/AMA Session Hosting",
        desc: "Coordinate and manage Ask-Me-Anything sessions on popular subreddits to directly answer user questions."
      },
      {
        title: "Reddit Conversational Outreach",
        desc: "Identify and engage with users asking about upcoming NFT collections in comments, providing helpful information."
      }
    ],
    processTitle: "GameFi Reddit Setup Lifecycle",
    processSteps: [
      {
        title: "Subreddit Configuration",
        desc: "Creating the official subreddit, writing rules, and setting up auto-moderation tools."
      },
      {
        title: "Narrative Seeding",
        desc: "Publishing detailed developer logs, art reveals, and roadmaps to build organic interest."
      },
      {
        title: "Outreach & Growth",
        desc: "Coordinating AMA events, responding to reviews, and engaging in relevant subreddits."
      }
    ],
    whyTitle: "Why Choose Eon8 for GameFi Reddit Marketing?",
    whyDesc: "We combine deep gaming community expertise with advanced Web3 security configuration, ensuring your Reddit community is a safe, fun, and highly active space for your player base.",
    faqs: [
      {
        q: "How do you prevent Reddit posts from being marked as spam?",
        a: "We write detailed, value-first posts, engage authentically in comment sections, and strictly follow the formatting rules of each subreddit."
      },
      {
        q: "Why is Reddit important for search engine optimization (SEO)?",
        a: "Search engines like Google rank active Reddit threads highly for query reviews and discussions, making organic Reddit presence essential for building trust."
      }
    ]
  },
  "pr-marketing-agency": {
    pathKey: "pr-marketing-agency",
    metaTitle: "PR Marketing Agency | Public Relations Agency - Eon8",
    metaDesc: "Eon8 is the most popular agency for PR marketing services as they offer tons of great options to all their customers which is quite essential.",
    heroTitle: "Expert PR Marketing Agency",
    heroSubtitle: "Publish your collection details on top crypto publications and global news outlets to build trust",
    heroPoints: ["Global News outlets", "Guaranteed Coverage", "Story Pitching", "Investor Pitch"],
    introTitle: "Credibility Through Media Coverage",
    introDesc: "Public relations are critical in Web3 to combat skepticism. When prospective collectors search for your project on Google, having reviews and articles in trusted magazines is the ultimate proof of credibility.",
    servicesTitle: "PR Marketing Solutions",
    servicesSubtitle: "Get featured in the world's most popular financial and blockchain outlets",
    services: [
      {
        title: "Crypto Media Distribution",
        desc: "Publish detailed interviews, collection previews, and project roadmaps on CoinTelegraph, Decrypt, and Bitcoinist."
      },
      {
        title: "Mainstream Press Syndication",
        desc: "Distribute news announcements on Yahoo Finance, Business Insider, Forbes, and Bloomberg for global financial exposure."
      },
      {
        title: "Founder Interview Pitching",
        desc: "Pitch your core developers and artists to leading podcast hosts and tech journalists for dedicated feature episodes."
      },
      {
        title: "Crisis Communication Management",
        desc: "Strategic advisory and response writing to maintain project reputation during system upgrades or market downturns."
      }
    ],
    processTitle: "Press Distribution Pipeline",
    processSteps: [
      {
        title: "Story Development",
        desc: "Writing press releases, pitches, and positioning statements that highlight the project's unique innovation."
      },
      {
        title: "Outlet Selection",
        desc: "Selecting the target media list based on audience alignment and authority scores."
      },
      {
        title: "Publish & Track",
        desc: "Distributing the release, securing live links, and generating complete visibility analytics reports."
      }
    ],
    whyTitle: "Why Choose Eon8 for PR Marketing?",
    whyDesc: "We have pre-existing relationships with editors across global news networks and crypto blogs, guaranteeing faster publication turnaround times and optimized placements.",
    faqs: [
      {
        q: "What is the benefit of PR compared to paid advertising?",
        a: "PR builds long-term authority, organic Google search presence, and credibility, whereas advertising only drives temporary traffic."
      },
      {
        q: "Can you help write the content for press releases?",
        a: "Yes, our team of professional Web3 copywriters drafts the complete copy, hooks, and structures, sending them to you for approval before media pitching."
      }
    ]
  }
};
