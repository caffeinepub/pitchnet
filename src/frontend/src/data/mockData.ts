import type {
  Endorsement,
  LiveSession,
  MarketplaceListing,
  Message,
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
    bio: "Serial entrepreneur with 3 exits. Passionate about leveraging AI to solve real-world problems. Currently building TechVentures, a SaaS platform that's revolutionizing how teams collaborate. Previously founded DataPulse (acquired 2021) and CloudSync (acquired 2019).",
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
    pitchVideoUrl: "",
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
        icon: "🚀",
      },
      {
        year: "2023",
        title: "Product Hunt #1",
        description: "TechVentures topped Product Hunt with 2,400+ upvotes",
        icon: "🏆",
      },
      {
        year: "2022",
        title: "Y Combinator S22",
        description: "Accepted into YC Summer 2022 batch",
        icon: "⚡",
      },
      {
        year: "2021",
        title: "DataPulse Acquired",
        description: "Successfully exited DataPulse for $8M",
        icon: "💰",
      },
      {
        year: "2019",
        title: "CloudSync Acquired",
        description: "First exit — CloudSync acquired for $3.2M",
        icon: "☁️",
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
    bio: "Investing in exceptional founders building category-defining companies. Focus areas: B2B SaaS, AI/ML, developer tools. Previously a founder myself — built and sold two companies before joining the VC world. Love meeting passionate builders.",
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
    pitchVideoUrl: "",
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
        icon: "🏅",
      },
      {
        year: "2023",
        title: "Portfolio Unicorn",
        description: "First unicorn in portfolio — DataFlow hits $1B ARR",
        icon: "🦄",
      },
      {
        year: "2022",
        title: "$200M Fund III",
        description: "Closed Horizon Fund III oversubscribed at $200M",
        icon: "📈",
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
    bio: "I turn complex problems into elegant digital experiences. Specializing in product design, brand identity, and design systems for tech startups and scale-ups. Available for select freelance projects.",
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
    pitchVideoUrl: "",
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
        icon: "🎨",
      },
      {
        year: "2023",
        title: "200 Projects Milestone",
        description: "Completed 200th freelance project with 5★ rating",
        icon: "⭐",
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
    bio: "People-first leader passionate about building inclusive, high-performance cultures. 10+ years in HR at Google, Airbnb, and now Stripe. Helping companies hire better, faster, and smarter through data-driven talent strategies.",
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
    pitchVideoUrl: "",
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
        icon: "🏆",
      },
      {
        year: "2023",
        title: "10K Applicants Milestone",
        description: "Scaled Stripe talent pipeline to 10,000+ applicants",
        icon: "🎯",
      },
    ],
  },
  {
    id: "u5",
    username: "jordankim",
    displayName: "Jordan Kim",
    role: "Business Enthusiast",
    headline:
      "Business Strategist & Speaker | Helping companies scale 0→$100M | Web Summit Keynote",
    bio: "Strategy consultant turned entrepreneur. I help fast-growing startups build scalable business models, enter new markets, and raise capital. Speaker at Web Summit, TechCrunch Disrupt, and Davos.",
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
    pitchVideoUrl: "",
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
        icon: "🎤",
      },
      {
        year: "2023",
        title: "Top 50 Business Minds",
        description: "Inc. Magazine Top 50 Most Innovative Business Minds",
        icon: "📰",
      },
    ],
  },
];

export const posts: Post[] = [
  {
    id: "p1",
    authorId: "u1",
    content:
      "🚀 Thrilled to announce TechVentures has raised $2.5M in our Series A round, led by Horizon Ventures!\n\nThis milestone wouldn't have been possible without our incredible team, early customers, and supporters. We're using this capital to triple our engineering team and expand to European markets.\n\nThe future of AI-powered productivity is here — and we're just getting started. 💡",
    mediaUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
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
      "📊 After reviewing 200+ pitch decks this quarter, here are the 5 patterns that separate fundable startups from the rest:\n\n1. Crystal-clear problem definition with real data\n2. A founder who's lived the problem\n3. Evidence of early traction (even if small)\n4. A realistic, not hockey-stick, 18-month plan\n5. The 'why now' — what's changed in the market?\n\nWhat would you add to this list? 👇",
    mediaUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    postType: "insight",
    tags: ["VentureCapital", "Startups", "Fundraising", "Investing"],
    likeCount: 1243,
    commentCount: 187,
    createdAt: "4h ago",
    isAchievement: false,
  },
  {
    id: "p3",
    authorId: "u3",
    content:
      "🎨 Just delivered a complete brand identity rebrand for a fintech unicorn — and the results speak for themselves.\n\nWe went from a forgettable logo to a system that scales across 40+ touchpoints. The key? Starting with strategy, not pixels.\n\nBefore you design anything, answer: What does this brand need to FEEL like to earn trust from its users?\n\n[Design process breakdown in comments 👇]",
    mediaUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    postType: "showcase",
    tags: ["Design", "Branding", "UX", "Fintech"],
    likeCount: 562,
    commentCount: 41,
    createdAt: "6h ago",
    isAchievement: false,
  },
  {
    id: "p4",
    authorId: "u4",
    content:
      "🎉 Huge milestone: our talent pipeline just crossed 10,000 applicants — and our quality-to-volume ratio is better than ever.\n\nHere's what changed: We stopped posting generic job descriptions and started telling our company story. We stopped filtering for credentials and started filtering for curiosity.\n\nTalent is everywhere. Your job as HR is to build a magnet, not a filter.\n\n#HiringTips #PeopleOps #TalentAcquisition",
    mediaUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    postType: "milestone",
    tags: ["HR", "Hiring", "TalentAcquisition", "PeopleOps"],
    likeCount: 2100,
    commentCount: 254,
    createdAt: "8h ago",
    isAchievement: true,
  },
  {
    id: "p5",
    authorId: "u5",
    content:
      "🌍 Just landed back from Web Summit in Lisbon — 40,000 people, 1,200 speakers, and honestly the most energizing conference I've attended in years.\n\nThe one theme I heard everywhere: AI is not replacing jobs — it's replacing tasks. The people who thrive are those using AI to multiply their leverage, not those ignoring it.\n\nBig thanks to the entire Web Summit team. See you next year! 🙌",
    mediaUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
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
      "📈 Massive congratulations to the DataFlow team — our portfolio company just crossed $1B ARR! 🦄\n\nWhen we led their seed round 4 years ago, the team was 3 people and $0 in revenue. Today: 800 employees, 12,000 customers, and a unicorn valuation.\n\nThis is what extraordinary founders with relentless execution can achieve. So proud to support this journey from day one.",
    mediaUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
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
      "💡 Freelance tip that changed my business: Stop billing by the hour. Start billing by the outcome.\n\nHere's why: When you charge hourly, clients focus on time. When you charge by outcome, they focus on results. And results are worth infinitely more than time.\n\nI switched to project-based pricing 3 years ago and doubled my revenue in 12 months without working more hours.\n\nWhat's your pricing model? 👇",
    mediaUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    postType: "tip",
    tags: ["Freelancing", "Pricing", "BusinessTips", "Design"],
    likeCount: 891,
    commentCount: 127,
    createdAt: "3d ago",
    isAchievement: false,
  },
  {
    id: "p8",
    authorId: "u1",
    content:
      "💡 6 months ago we had 0 customers. Today we have 340 paying teams using TechVentures.\n\nHere's the growth playbook that worked for us:\n\n→ Found 10 design partners before writing a line of code\n→ Launched with 50% of planned features (shipped the other 50% based on feedback)\n→ Made our onboarding flow embarrassingly simple\n→ Focused 100% on retention before acquisition\n\nThe unsexy truth: there's no hack, just relentless iteration.",
    mediaUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    postType: "insight",
    tags: ["GrowthHacking", "Startups", "ProductMarketFit", "B2BSaaS"],
    likeCount: 1760,
    commentCount: 203,
    createdAt: "4d ago",
    isAchievement: false,
  },
];

export const stories: Story[] = [
  {
    id: "s1",
    authorId: "u1",
    mediaUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
    storyType: "pitch",
    caption:
      "🚀 Series A announcement — $2.5M raised! Swipe to see the journey.",
    viewCount: 2840,
    createdAt: "2h ago",
  },
  {
    id: "s2",
    authorId: "u2",
    mediaUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    storyType: "insight",
    caption: "📊 Top 5 metrics every early-stage startup should track",
    viewCount: 5100,
    createdAt: "3h ago",
  },
  {
    id: "s3",
    authorId: "u3",
    mediaUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    storyType: "showcase",
    caption: "🎨 Behind the scenes: fintech rebrand process",
    viewCount: 1920,
    createdAt: "5h ago",
  },
  {
    id: "s4",
    authorId: "u4",
    mediaUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    storyType: "milestone",
    caption: "🎉 10,000 applicants in our pipeline! Here's how we did it.",
    viewCount: 3300,
    createdAt: "8h ago",
  },
  {
    id: "s5",
    authorId: "u5",
    mediaUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    storyType: "event",
    caption: "🌍 Web Summit recap — the future of tech is here",
    viewCount: 7800,
    createdAt: "1d ago",
  },
  {
    id: "s6",
    authorId: "u2",
    mediaUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    storyType: "insight",
    caption:
      "📈 What separates a 10x return from a write-off? Three things founders often overlook.",
    viewCount: 6420,
    createdAt: "6h ago",
  },
  {
    id: "s7",
    authorId: "u3",
    mediaUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=600&q=80",
    storyType: "showcase",
    caption:
      "✨ New design system shipped for a Series B healthtech startup — clean, accessible, scalable.",
    viewCount: 2150,
    createdAt: "12h ago",
  },
  {
    id: "s8",
    authorId: "u1",
    mediaUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    storyType: "pitch",
    caption:
      "💡 Building in public: our team grew from 4 to 18 in 90 days. Here's what we learned.",
    viewCount: 4870,
    createdAt: "18h ago",
  },
  {
    id: "s9",
    authorId: "u5",
    mediaUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    storyType: "event",
    caption:
      "🎤 Just finished my TED talk on the future of remote-first companies. Slides in bio!",
    viewCount: 11300,
    createdAt: "2d ago",
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
      "Complete brand identity for a Series B fintech startup — logo, typography, color system, and a comprehensive Figma design system for a team of 20 designers.",
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
      "Run multi-channel paid acquisition campaigns (Google, LinkedIn, Meta) for a B2B HR tech startup. Goal: 500 qualified leads/month with CPA under $150.",
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
      "Design and build an executive analytics dashboard pulling from Salesforce, HubSpot, and internal databases. Must support real-time data and custom report generation.",
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
      "Develop a 6-month content strategy and produce 12 long-form thought leadership articles for a VC firm's blog. Focus on B2B SaaS, AI, and future of work themes.",
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
      "Conduct comprehensive UX research for a productivity app: 20 user interviews, usability testing sessions, heatmap analysis, and a detailed insights report with actionable recommendations.",
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
      "Join Alex Rivera for a live deep-dive on navigating the 0-to-funding journey. We'll cover validation, team building, and what investors actually look for.",
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
    description:
      "Sarah Chen, Partner at Horizon Ventures, opens her playbook. Learn how top VCs evaluate deals and what's changed in the current market.",
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
      "Marcus Williams breaks down the psychology of pricing, how to position your services as premium, and scripts for client negotiations.",
    scheduledAt: "Thu, Jan 18 · 6:00 PM EST",
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
      "Jordan Kim shares the exact strategic frameworks used by the fastest-growing startups. Interactive Q&A with real-time audience polls.",
    scheduledAt: "Fri, Jan 19 · 2:00 PM EST",
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
      "Perfect, Thursday at 3pm works great. I'll send a calendar invite. Looking forward to it! 🚀",
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
      "Hi Alex! We're expanding our engineering team at Stripe and I immediately thought of TechVentures' network. Would you be open to sharing the role with your team?",
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
      "Alex has one of the clearest fundraising narratives I've seen from an early-stage founder. Exceptional ability to communicate vision and traction.",
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
    message:
      "The culture Alex has built at TechVentures is something special. His team retention and engagement scores are among the highest I've seen.",
    createdAt: "2w ago",
  },
];
