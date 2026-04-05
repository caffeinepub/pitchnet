import type {
  Endorsement,
  LiveSession,
  MarketplaceListing,
  Message,
  PitchVideo,
  Post,
  Story,
  UserProfile,
} from "../types";

export const CURRENT_USER_ID = "u1";

export const profiles: UserProfile[] = [
  {
    id: "u1",
    username: "alexrivera",
    displayName: "Alex Rivera",
    role: "Entrepreneur",
    headline:
      "Founder & CEO at TechVentures | Building the future of AI-driven productivity",
    bio: "Serial entrepreneur with 3 exits. Passionate about leveraging AI to solve real-world problems. Currently building TechVentures, a SaaS platform that's revolutionizing how teams collaborate.",
    avatarUrl: "/assets/generated/avatar-alex-rivera.dim_300x300.jpg",
    skills: [
      "Product Strategy",
      "Fundraising",
      "Go-to-Market",
      "Team Building",
      "AI/ML",
      "SaaS",
    ],
    followerCount: 12400,
    pitchVideoUrl:
      "https://cdn.pixabay.com/video/2022/08/13/128068-739248390_large.mp4",
    coverUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    postCount: 87,
    connectionCount: 843,
    company: "TechVentures",
    location: "San Francisco, CA",
    achievements: [
      {
        year: "2024",
        title: "Series A — $2.5M Raised",
        description: "Closed our Series A round led by Sequoia Capital",
        icon: "\ud83d\ude80",
      },
      {
        year: "2023",
        title: "Product Hunt #1",
        description: "TechVentures topped Product Hunt with 2,400+ upvotes",
        icon: "\ud83c\udfc6",
      },
      {
        year: "2022",
        title: "Y Combinator S22",
        description: "Accepted into YC Summer 2022 batch",
        icon: "\u26a1",
      },
      {
        year: "2021",
        title: "DataPulse Acquired",
        description: "Successfully exited DataPulse for $8M",
        icon: "\ud83d\udcb0",
      },
      {
        year: "2019",
        title: "CloudSync Acquired",
        description: "First exit — CloudSync acquired for $3.2M",
        icon: "\u2601\ufe0f",
      },
    ],
  },
  {
    id: "u2",
    username: "sarahchen",
    displayName: "Sarah Chen",
    role: "Investor",
    headline:
      "Partner at Horizon Ventures | Early-stage B2B SaaS | 40+ portfolio companies",
    bio: "Investing in exceptional founders building category-defining companies. Focus areas: B2B SaaS, AI/ML, developer tools. Previously a founder myself.",
    avatarUrl: "/assets/generated/avatar-sarah-chen.dim_300x300.jpg",
    skills: [
      "Venture Capital",
      "Due Diligence",
      "Portfolio Management",
      "B2B SaaS",
      "AI Strategy",
      "Board Advisory",
    ],
    followerCount: 28700,
    pitchVideoUrl:
      "https://cdn.pixabay.com/video/2021/09/12/88011-603534012_large.mp4",
    coverUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    postCount: 142,
    connectionCount: 2100,
    company: "Horizon Ventures",
    location: "New York, NY",
    achievements: [
      {
        year: "2024",
        title: "Forbes Midas List",
        description: "Named to Forbes Midas List of top tech investors",
        icon: "\ud83c\udfc5",
      },
      {
        year: "2023",
        title: "Portfolio Unicorn",
        description: "First unicorn in portfolio — DataFlow hits $1B ARR",
        icon: "\ud83e\udd84",
      },
      {
        year: "2022",
        title: "$200M Fund III",
        description: "Closed Horizon Fund III oversubscribed at $200M",
        icon: "\ud83d\udcc8",
      },
    ],
  },
  {
    id: "u3",
    username: "marcuswilliams",
    displayName: "Marcus Williams",
    role: "Freelancer",
    headline:
      "Senior UI/UX Designer | Branding & Product Design | 200+ projects delivered",
    bio: "I turn complex problems into elegant digital experiences. Specializing in product design, brand identity, and design systems for tech startups.",
    avatarUrl: "/assets/generated/avatar-marcus-williams.dim_300x300.jpg",
    skills: [
      "UI/UX Design",
      "Figma",
      "Design Systems",
      "Brand Identity",
      "Prototyping",
      "User Research",
    ],
    followerCount: 9300,
    pitchVideoUrl:
      "https://cdn.pixabay.com/video/2023/05/15/163248-826952459_large.mp4",
    coverUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    postCount: 215,
    connectionCount: 1240,
    company: "Independent",
    location: "Austin, TX",
    achievements: [
      {
        year: "2024",
        title: "Awwwards Site of the Day",
        description: "Client project won Awwwards SOTD recognition",
        icon: "\ud83c\udfa8",
      },
      {
        year: "2023",
        title: "200 Projects Milestone",
        description: "Completed 200th freelance project with 5\u2605 rating",
        icon: "\u2b50",
      },
    ],
  },
  {
    id: "u4",
    username: "priyapatel",
    displayName: "Priya Patel",
    role: "HR Professional",
    headline:
      "Head of People & Culture at Stripe | Building world-class teams | Ex-Google",
    bio: "People-first leader passionate about building inclusive, high-performance cultures. 10+ years in HR at Google, Airbnb, and now Stripe.",
    avatarUrl: "/assets/generated/avatar-priya-patel.dim_300x300.jpg",
    skills: [
      "Talent Acquisition",
      "Culture Building",
      "Performance Management",
      "DEI",
      "Organizational Design",
      "Executive Coaching",
    ],
    followerCount: 15600,
    pitchVideoUrl:
      "https://cdn.pixabay.com/video/2022/03/31/112762-695800254_large.mp4",
    coverUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    postCount: 98,
    connectionCount: 1876,
    company: "Stripe",
    location: "San Francisco, CA",
    achievements: [
      {
        year: "2024",
        title: "HR Leader of the Year",
        description: "Named HR Leader of the Year by HRTech Awards",
        icon: "\ud83c\udfc6",
      },
      {
        year: "2023",
        title: "10K Applicants Milestone",
        description: "Scaled Stripe talent pipeline to 10,000+ applicants",
        icon: "\ud83c\udfaf",
      },
    ],
  },
  {
    id: "u5",
    username: "jordankim",
    displayName: "Jordan Kim",
    role: "Business Enthusiast",
    headline:
      "Business Strategist & Speaker | Helping companies scale 0\u2192$100M | Web Summit Keynote",
    bio: "Strategy consultant turned entrepreneur. I help fast-growing startups build scalable business models, enter new markets, and raise capital.",
    avatarUrl: "/assets/generated/avatar-jordan-kim.dim_300x300.jpg",
    skills: [
      "Business Strategy",
      "Market Expansion",
      "Fundraising",
      "Public Speaking",
      "Consulting",
      "Leadership",
    ],
    followerCount: 34200,
    pitchVideoUrl:
      "https://cdn.pixabay.com/video/2021/04/14/70716-537985154_large.mp4",
    coverUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    postCount: 311,
    connectionCount: 3400,
    company: "Kim Strategy Group",
    location: "London, UK",
    achievements: [
      {
        year: "2024",
        title: "Web Summit Keynote",
        description:
          "Delivered keynote to 40,000+ attendees at Web Summit Lisbon",
        icon: "\ud83c\udfa4",
      },
      {
        year: "2023",
        title: "Top 50 Business Minds",
        description: "Inc. Magazine Top 50 Most Innovative Business Minds",
        icon: "\ud83d\udcf0",
      },
    ],
  },
];

export const posts: Post[] = [
  {
    id: "p1",
    authorId: "u1",
    content:
      "\ud83d\ude80 Thrilled to announce TechVentures has raised $2.5M in our Series A round, led by Horizon Ventures!\n\nThis milestone wouldn't have been possible without our incredible team, early customers, and supporters. We're using this capital to triple our engineering team and expand to European markets.\n\nThe future of AI-powered productivity is here — and we're just getting started. \ud83d\udca1",
    mediaUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    mediaType: "image",
    postType: "achievement",
    tags: ["Fundraising", "SeriesA", "StartupLife", "AI"],
    likeCount: 847,
    commentCount: 93,
    createdAt: "2h ago",
    isAchievement: true,
  },
  {
    id: "p2",
    authorId: "u2",
    content:
      "\ud83d\udcca After reviewing 200+ pitch decks this quarter, here are the 5 patterns that separate fundable startups from the rest:\n\n1. Crystal-clear problem definition with real data\n2. A founder who's lived the problem\n3. Evidence of early traction (even if small)\n4. A realistic, not hockey-stick, 18-month plan\n5. The 'why now' — what's changed in the market?\n\nWhat would you add to this list? \ud83d\udc47",
    mediaUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    mediaType: "image",
    postType: "insight",
    tags: ["VentureCapital", "Startups", "Fundraising", "Investing"],
    likeCount: 1243,
    commentCount: 187,
    createdAt: "4h ago",
    isAchievement: false,
  },
  {
    id: "pv1",
    authorId: "u1",
    content:
      "\ud83e\udd16 Exclusive behind-the-scenes look at our AI productivity engine — watch how TechVentures automates the repetitive parts of your workflow so your team can focus on what matters.\n\nThis is the future of work. We're building it now. \ud83d\udd25",
    mediaUrl:
      "https://cdn.pixabay.com/video/2022/01/18/104907-666763514_large.mp4",
    mediaType: "video",
    postType: "product",
    tags: ["AI", "ProductDemo", "FutureOfWork", "TechVentures"],
    likeCount: 2140,
    commentCount: 189,
    createdAt: "1h ago",
    isAchievement: false,
  },
  {
    id: "p3",
    authorId: "u3",
    content:
      "\ud83c\udfa8 Just delivered a complete brand identity rebrand for a fintech unicorn — and the results speak for themselves.\n\nWe went from a forgettable logo to a system that scales across 40+ touchpoints. The key? Starting with strategy, not pixels.\n\nBefore you design anything, answer: What does this brand need to FEEL like to earn trust from its users?",
    mediaUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    mediaType: "image",
    postType: "showcase",
    tags: ["Design", "Branding", "UX", "Fintech"],
    likeCount: 562,
    commentCount: 41,
    createdAt: "6h ago",
    isAchievement: false,
  },
  {
    id: "pv2",
    authorId: "u2",
    content:
      "\ud83c\udfa5 I recorded a short breakdown of what I look for when evaluating a fintech pitch in under 3 minutes. If you're building in fintech — this one's for you. Watch till the end for the framework I use with every founder.",
    mediaUrl:
      "https://cdn.pixabay.com/video/2023/03/07/153791-804999538_large.mp4",
    mediaType: "video",
    postType: "insight",
    tags: ["Fintech", "Investing", "PitchTips", "VentureCapital"],
    likeCount: 3870,
    commentCount: 312,
    createdAt: "3h ago",
    isAchievement: false,
  },
  {
    id: "p4",
    authorId: "u4",
    content:
      "\ud83c\udf89 Huge milestone: our talent pipeline just crossed 10,000 applicants — and our quality-to-volume ratio is better than ever.\n\nHere's what changed: We stopped posting generic job descriptions and started telling our company story. We stopped filtering for credentials and started filtering for curiosity.\n\nTalent is everywhere. Your job as HR is to build a magnet, not a filter.",
    mediaUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    mediaType: "image",
    postType: "milestone",
    tags: ["HR", "Hiring", "TalentAcquisition", "PeopleOps"],
    likeCount: 2100,
    commentCount: 254,
    createdAt: "8h ago",
    isAchievement: true,
  },
  {
    id: "pv3",
    authorId: "u3",
    content:
      "\ud83c\udfa5 Speed design session: I redesigned a SaaS dashboard from scratch in 45 minutes. Here's the full timelapse with my live commentary. Design thinking in action.",
    mediaUrl:
      "https://cdn.pixabay.com/video/2021/12/30/102851-663017877_large.mp4",
    mediaType: "video",
    postType: "showcase",
    tags: ["Design", "UX", "Timelapse", "Freelance"],
    likeCount: 1590,
    commentCount: 97,
    createdAt: "5h ago",
    isAchievement: false,
  },
  {
    id: "p5",
    authorId: "u5",
    content:
      "\ud83c\udf0d Just landed back from Web Summit in Lisbon — 40,000 people, 1,200 speakers, and honestly the most energizing conference I've attended in years.\n\nThe one theme I heard everywhere: AI is not replacing jobs — it's replacing tasks. The people who thrive are those using AI to multiply their leverage, not those ignoring it.",
    mediaUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    mediaType: "image",
    postType: "event",
    tags: ["WebSummit", "AI", "Tech", "Networking"],
    likeCount: 3400,
    commentCount: 312,
    createdAt: "1d ago",
    isAchievement: false,
  },
  {
    id: "p6",
    authorId: "u2",
    content:
      "\ud83d\udcc8 Massive congratulations to the DataFlow team — our portfolio company just crossed $1B ARR! \ud83e\udd84\n\nWhen we led their seed round 4 years ago, the team was 3 people and $0 in revenue. Today: 800 employees, 12,000 customers, and a unicorn valuation.",
    mediaUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    mediaType: "image",
    postType: "achievement",
    tags: ["Unicorn", "Portfolio", "VentureCapital", "Milestones"],
    likeCount: 5200,
    commentCount: 448,
    createdAt: "2d ago",
    isAchievement: true,
  },
  {
    id: "p7",
    authorId: "u3",
    content:
      "\ud83d\udca1 Freelance tip that changed my business: Stop billing by the hour. Start billing by the outcome.\n\nHere's why: When you charge hourly, clients focus on time. When you charge by outcome, they focus on results. And results are worth infinitely more than time.",
    mediaUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    mediaType: "image",
    postType: "tip",
    tags: ["Freelancing", "Pricing", "BusinessTips", "Design"],
    likeCount: 891,
    commentCount: 127,
    createdAt: "3d ago",
    isAchievement: false,
  },
];

export const stories: Story[] = [
  {
    id: "s1",
    authorId: "u1",
    mediaUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
    mediaType: "image",
    storyType: "pitch",
    caption:
      "\ud83d\ude80 Series A announcement — $2.5M raised! Swipe to see the journey.",
    viewCount: 2840,
    createdAt: "2h ago",
  },
  {
    id: "s2",
    authorId: "u2",
    mediaUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    mediaType: "image",
    storyType: "insight",
    caption:
      "\ud83d\udcca Top 5 metrics every early-stage startup should track",
    viewCount: 5100,
    createdAt: "3h ago",
  },
  {
    id: "s3",
    authorId: "u3",
    mediaUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    mediaType: "image",
    storyType: "showcase",
    caption: "\ud83c\udfa8 Behind the scenes: fintech rebrand process",
    viewCount: 1920,
    createdAt: "5h ago",
  },
  {
    id: "s4",
    authorId: "u4",
    mediaUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    mediaType: "image",
    storyType: "milestone",
    caption:
      "\ud83c\udf89 10,000 applicants in our pipeline! Here's how we did it.",
    viewCount: 3300,
    createdAt: "8h ago",
  },
  {
    id: "s5",
    authorId: "u5",
    mediaUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    mediaType: "image",
    storyType: "event",
    caption: "\ud83c\udf0d Web Summit recap — the future of tech is here",
    viewCount: 7800,
    createdAt: "1d ago",
  },
  {
    id: "s6",
    authorId: "u2",
    mediaUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    mediaType: "image",
    storyType: "insight",
    caption:
      "\ud83d\udcc8 What separates a 10x return from a write-off? Three things founders often overlook.",
    viewCount: 6420,
    createdAt: "6h ago",
  },
  {
    id: "s7",
    authorId: "u3",
    mediaUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=600&q=80",
    mediaType: "image",
    storyType: "showcase",
    caption:
      "\u2728 New design system shipped for a Series B healthtech startup — clean, accessible, scalable.",
    viewCount: 2150,
    createdAt: "12h ago",
  },
  {
    id: "s8",
    authorId: "u1",
    mediaUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    mediaType: "image",
    storyType: "pitch",
    caption:
      "\ud83d\udca1 Building in public: our team grew from 4 to 18 in 90 days. Here's what we learned.",
    viewCount: 4870,
    createdAt: "18h ago",
  },
  {
    id: "s9",
    authorId: "u5",
    mediaUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    mediaType: "image",
    storyType: "event",
    caption:
      "\ud83c\udfa4 Just finished my TED talk on the future of remote-first companies. Slides in bio!",
    viewCount: 11300,
    createdAt: "2d ago",
  },
  {
    id: "sv1",
    authorId: "u1",
    mediaUrl:
      "https://cdn.pixabay.com/video/2022/08/13/128068-739248390_large.mp4",
    mediaType: "video",
    storyType: "pitch",
    caption:
      "\ud83e\udd16 60-second pitch: How TechVentures is building the AI layer for enterprise teams. Full demo in bio!",
    viewCount: 8920,
    createdAt: "30m ago",
  },
  {
    id: "sv2",
    authorId: "u5",
    mediaUrl:
      "https://cdn.pixabay.com/video/2021/09/12/88011-603534012_large.mp4",
    mediaType: "video",
    storyType: "insight",
    caption:
      "\ud83c\udfa5 The 3 business model shifts that will define the next decade. Quick breakdown — watch now.",
    viewCount: 14700,
    createdAt: "1h ago",
  },
];

export const pitchVideos: PitchVideo[] = [
  {
    id: "pv1",
    title: "AI-Powered Enterprise Productivity: The Next Frontier",
    description:
      "Discover how AI is reshaping the way enterprise teams work, collaborate, and scale. TechVentures presents a bold vision for the productivity stack of 2025 and beyond.",
    domain: "Tech/AI",
    videoUrl:
      "https://cdn.pixabay.com/video/2022/08/13/128068-739248390_large.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80",
    authorId: "u1",
    likes: 4820,
    views: 38400,
    duration: "2:47",
  },
  {
    id: "pv2",
    title: "Rethinking Business Models in the Age of Abundance",
    description:
      "Traditional business models are breaking. Jordan Kim breaks down three emerging frameworks that will define the next wave of category-defining companies.",
    domain: "Business Models",
    videoUrl:
      "https://cdn.pixabay.com/video/2021/09/12/88011-603534012_large.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
    authorId: "u5",
    likes: 3110,
    views: 27900,
    duration: "3:22",
  },
  {
    id: "pv3",
    title: "Carbon-Neutral Startups: Building Green from Day One",
    description:
      "Sustainability isn't just a trend — it's a competitive moat. Learn how climate-tech founders are embedding net-zero principles into their MVP and attracting ESG-focused investors.",
    domain: "Sustainability",
    videoUrl:
      "https://cdn.pixabay.com/video/2023/05/15/163248-826952459_large.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80",
    authorId: "u2",
    likes: 2760,
    views: 19800,
    duration: "2:15",
  },
  {
    id: "pv4",
    title: "Digital Health Revolution: Wearables, Data & Outcomes",
    description:
      "From continuous glucose monitors to mental health AI coaches — the digital health space is exploding. Here's how to pitch in the most regulated vertical in tech.",
    domain: "Health Innovation",
    videoUrl:
      "https://cdn.pixabay.com/video/2022/03/31/112762-695800254_large.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    authorId: "u4",
    likes: 3540,
    views: 31200,
    duration: "3:08",
  },
  {
    id: "pv5",
    title: "Fintech 3.0: Embedded Finance & the Banking API Layer",
    description:
      "Every software company is becoming a fintech. Sarah Chen explains how embedded finance is creating billion-dollar opportunities for founders willing to navigate compliance.",
    domain: "Finance/Fintech",
    videoUrl:
      "https://cdn.pixabay.com/video/2021/04/14/70716-537985154_large.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    authorId: "u2",
    likes: 5180,
    views: 42700,
    duration: "4:01",
  },
  {
    id: "pv6",
    title: "EdTech 2.0: Personalized Learning at Planet Scale",
    description:
      "The next generation of education platforms won't look like MOOCs. AI-driven adaptive learning, micro-credentials, and outcome-based models are here.",
    domain: "Education",
    videoUrl:
      "https://cdn.pixabay.com/video/2020/07/23/46225-446766001_large.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&q=80",
    authorId: "u3",
    likes: 2290,
    views: 17500,
    duration: "2:53",
  },
  {
    id: "pv7",
    title: "From Concept to Shelf: Launching a Hardware Product in 2025",
    description:
      "Hardware is hard. Marcus Williams walks through a real product launch — from napkin sketch to crowdfunding to retail — covering industrial design and the DTC model.",
    domain: "New Products",
    videoUrl:
      "https://cdn.pixabay.com/video/2022/10/10/134386-758568136_large.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80",
    authorId: "u3",
    likes: 1870,
    views: 14300,
    duration: "3:34",
  },
  {
    id: "pv8",
    title: "Innovation Concepts: First Principles Thinking for Founders",
    description:
      "How do breakthrough products really get made? Alex Rivera shares the mental models and first-principles frameworks he uses to generate novel ideas and validate them fast.",
    domain: "Innovation",
    videoUrl:
      "https://cdn.pixabay.com/video/2021/11/08/93990-644682791_large.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80",
    authorId: "u1",
    likes: 6340,
    views: 55100,
    duration: "4:18",
  },
];

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "m1",
    postedById: "u1",
    title: "Full-Stack Mobile App Development",
    brief:
      "Build a cross-platform mobile app for our B2B SaaS platform. Need React Native expertise with complex state management and real-time features.",
    budgetMin: 15000,
    budgetMax: 25000,
    durationWeeks: 12,
    category: "Development",
    applicantCount: 8,
    isOpen: true,
  },
  {
    id: "m2",
    postedById: "u2",
    title: "Brand Identity & Design System",
    brief:
      "Complete brand identity for a Series B fintech startup — logo, typography, color system, and a comprehensive Figma design system.",
    budgetMin: 5000,
    budgetMax: 8000,
    durationWeeks: 8,
    category: "Design",
    applicantCount: 14,
    isOpen: true,
  },
  {
    id: "m3",
    postedById: "u4",
    title: "Growth Marketing & Paid Acquisition",
    brief:
      "Run multi-channel paid acquisition campaigns (Google, LinkedIn, Meta) for a B2B HR tech startup. Goal: 500 qualified leads/month.",
    budgetMin: 3000,
    budgetMax: 6000,
    durationWeeks: 6,
    category: "Marketing",
    applicantCount: 11,
    isOpen: true,
  },
  {
    id: "m4",
    postedById: "u5",
    title: "Data Analytics Dashboard",
    brief:
      "Design and build an executive analytics dashboard pulling from Salesforce, HubSpot, and internal databases. Must support real-time data.",
    budgetMin: 8000,
    budgetMax: 12000,
    durationWeeks: 10,
    category: "Development",
    applicantCount: 6,
    isOpen: true,
  },
  {
    id: "m5",
    postedById: "u2",
    title: "Content Strategy & Thought Leadership",
    brief:
      "Develop a 6-month content strategy and produce 12 long-form thought leadership articles for a VC firm's blog.",
    budgetMin: 2000,
    budgetMax: 4000,
    durationWeeks: 4,
    category: "Marketing",
    applicantCount: 19,
    isOpen: true,
  },
  {
    id: "m6",
    postedById: "u3",
    title: "UX Research & Usability Testing",
    brief:
      "Conduct comprehensive UX research for a productivity app: 20 user interviews, usability testing sessions, heatmap analysis, and detailed insights report.",
    budgetMin: 4000,
    budgetMax: 7000,
    durationWeeks: 6,
    category: "Design",
    applicantCount: 9,
    isOpen: true,
  },
];

export const liveSessions: LiveSession[] = [
  {
    id: "l1",
    hostId: "u1",
    title: "Building Your First Startup: From Idea to Series A",
    description:
      "Join Alex Rivera for a live deep-dive on navigating the 0-to-funding journey.",
    scheduledAt: "Live now",
    durationMinutes: 60,
    participantCount: 1240,
    isLive: true,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
  },
  {
    id: "l2",
    hostId: "u2",
    title: "The Investor's Lens: What Makes a Fundable Startup in 2024",
    description: "Sarah Chen, Partner at Horizon Ventures, opens her playbook.",
    scheduledAt: "Tomorrow, 3:00 PM EST",
    durationMinutes: 45,
    participantCount: 892,
    isLive: false,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    id: "l3",
    hostId: "u3",
    title: "Freelance Pricing Masterclass: Charge What You're Worth",
    description:
      "Marcus Williams breaks down the psychology of pricing and scripts for client negotiations.",
    scheduledAt: "Thu, Jan 18 \u00b7 6:00 PM EST",
    durationMinutes: 90,
    participantCount: 456,
    isLive: false,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
  },
  {
    id: "l4",
    hostId: "u5",
    title: "Scaling from $0 to $100M ARR: A Strategy Session",
    description:
      "Jordan Kim shares the exact strategic frameworks used by the fastest-growing startups.",
    scheduledAt: "Fri, Jan 19 \u00b7 2:00 PM EST",
    durationMinutes: 75,
    participantCount: 728,
    isLive: false,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
];

export const messages: Message[] = [
  {
    id: "msg1",
    fromUserId: "u2",
    toUserId: "u1",
    content:
      "Hey Alex! Congrats on the Series A — incredible milestone. Would love to connect and hear more about TechVentures' roadmap.",
    sentAt: "10:32 AM",
    isRead: true,
  },
  {
    id: "msg2",
    fromUserId: "u1",
    toUserId: "u2",
    content:
      "Sarah! Thank you so much — it's been a crazy few weeks. Would love to grab a virtual coffee and discuss. Are you free this week?",
    sentAt: "10:45 AM",
    isRead: true,
  },
  {
    id: "msg3",
    fromUserId: "u2",
    toUserId: "u1",
    content:
      "Absolutely! I have Thursday afternoon open. How does 3pm EST work?",
    sentAt: "11:02 AM",
    isRead: true,
  },
  {
    id: "msg4",
    fromUserId: "u1",
    toUserId: "u2",
    content:
      "Perfect, Thursday at 3pm works great. I'll send a calendar invite. Looking forward to it! \ud83d\ude80",
    sentAt: "11:15 AM",
    isRead: false,
  },
  {
    id: "msg5",
    fromUserId: "u3",
    toUserId: "u1",
    content:
      "Alex, I saw your post about the rebrand — we had such a great experience working together. Let me know if TechVentures needs design work as you scale!",
    sentAt: "Yesterday",
    isRead: true,
  },
  {
    id: "msg6",
    fromUserId: "u1",
    toUserId: "u3",
    content:
      "Marcus! You're actually on our shortlist for a new project. We're redesigning our entire dashboard. I'll reach out next week with a brief.",
    sentAt: "Yesterday",
    isRead: true,
  },
  {
    id: "msg7",
    fromUserId: "u4",
    toUserId: "u1",
    content:
      "Hi Alex! We're expanding our engineering team at Stripe and I immediately thought of TechVentures' network. Would you be open to sharing the role?",
    sentAt: "Mon",
    isRead: false,
  },
];

export const endorsements: Endorsement[] = [
  {
    id: "e1",
    fromUserId: "u2",
    toUserId: "u1",
    skill: "Fundraising",
    message:
      "Alex has one of the clearest fundraising narratives I've seen from an early-stage founder.",
    createdAt: "3d ago",
  },
  {
    id: "e2",
    fromUserId: "u5",
    toUserId: "u1",
    skill: "Product Strategy",
    message:
      "Worked with Alex on market entry strategy — his product intuition and speed of execution are rare.",
    createdAt: "1w ago",
  },
  {
    id: "e3",
    fromUserId: "u4",
    toUserId: "u1",
    skill: "Team Building",
    message: "The culture Alex has built at TechVentures is something special.",
    createdAt: "2w ago",
  },
];
