import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Types ---
  public type UserProfile = {
    id : Text;
    username : Text;
    displayName : Text;
    role : Text;
    headline : Text;
    bio : Text;
    avatarUrl : Text;
    skills : [Text];
    followerCount : Nat;
    pitchVideoUrl : Text;
  };

  public type Post = {
    id : Text;
    authorId : Text;
    content : Text;
    mediaUrl : Text;
    postType : Text;
    tags : [Text];
    likeCount : Nat;
    commentCount : Nat;
    createdAt : Int;
    isAchievement : Bool;
  };

  public type Story = {
    id : Text;
    authorId : Text;
    mediaUrl : Text;
    storyType : Text;
    caption : Text;
    viewCount : Nat;
    createdAt : Int;
  };

  public type MarketplaceListing = {
    id : Text;
    postedById : Text;
    title : Text;
    brief : Text;
    budgetMin : Nat;
    budgetMax : Nat;
    durationWeeks : Nat;
    category : Text;
    applicantCount : Nat;
    isOpen : Bool;
  };

  public type LiveSession = {
    id : Text;
    hostId : Text;
    title : Text;
    description : Text;
    scheduledAt : Int;
    durationMinutes : Nat;
    participantCount : Nat;
    isLive : Bool;
  };

  public type Message = {
    id : Text;
    fromUserId : Text;
    toUserId : Text;
    content : Text;
    sentAt : Int;
    isRead : Bool;
  };

  public type Endorsement = {
    id : Text;
    fromUserId : Text;
    toUserId : Text;
    skill : Text;
    message : Text;
    createdAt : Int;
  };

  // --- Stable state ---
  var users : [UserProfile] = [];
  var posts : [Post] = [];
  var stories : [Story] = [];
  var marketplace : [MarketplaceListing] = [];
  var liveSessions : [LiveSession] = [];
  var messages : [Message] = [];
  var endorsements : [Endorsement] = [];
  var initialized : Bool = false;

  // --- Init / Seed ---
  public func initialize() : async () {
    if (initialized) return;
    initialized := true;

    users := [
      { id = "u1"; username = "alex_ventures"; displayName = "Alex Rivera"; role = "Entrepreneur"; headline = "Founder & CEO at NovaTech | SaaS Builder"; bio = "Building the next generation of AI-powered workflow tools. 3x founder, passionate about startup ecosystems."; avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"; skills = ["Product Strategy", "Fundraising", "SaaS", "AI"]; followerCount = 1420; pitchVideoUrl = "" },
      { id = "u2"; username = "sarah_invests"; displayName = "Sarah Chen"; role = "Investor"; headline = "Partner @ Horizon Ventures | Seed & Series A"; bio = "Investing in bold founders building the future. Portfolio: 40+ companies across fintech, health, and climate."; avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"; skills = ["VC", "Due Diligence", "Portfolio Management"]; followerCount = 3800; pitchVideoUrl = "" },
      { id = "u3"; username = "marco_designs"; displayName = "Marco Delgado"; role = "Freelancer"; headline = "Senior UX/UI Designer | Brand Identity Specialist"; bio = "Crafting digital experiences that convert. 8 years helping startups and Fortune 500s nail their product design."; avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=marco"; skills = ["UI/UX", "Figma", "Branding", "Motion Design"]; followerCount = 890; pitchVideoUrl = "" },
      { id = "u4"; username = "priya_hr"; displayName = "Priya Sharma"; role = "HR"; headline = "Head of Talent @ ScaleUp Co | Startup Recruiting"; bio = "Connecting exceptional talent with high-growth startups. Specializing in technical and leadership hiring."; avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=priya"; skills = ["Talent Acquisition", "Employer Branding", "Leadership Hiring"]; followerCount = 2100; pitchVideoUrl = "" },
      { id = "u5"; username = "james_tech"; displayName = "James O'Brien"; role = "Enthusiast"; headline = "Tech Journalist | Startup Ecosystem Writer"; bio = "Writing about the intersection of technology, business, and society. Contributor to TechCrunch and Forbes."; avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=james"; skills = ["Content Strategy", "Journalism", "Community Building"]; followerCount = 5600; pitchVideoUrl = "" },
      { id = "u6"; username = "luna_dev"; displayName = "Luna Park"; role = "Freelancer"; headline = "Full-Stack Developer | Web3 & DeFi Specialist"; bio = "Building decentralized applications with a focus on user experience. Open source contributor and hackathon winner."; avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=luna"; skills = ["React", "Solidity", "Web3", "Node.js"]; followerCount = 1250; pitchVideoUrl = "" }
    ];

    posts := [
      { id = "p1"; authorId = "u1"; content = "Thrilled to announce NovaTech just closed our $2M seed round! Huge thanks to our investors and team who believed in this vision from day one. We're building AI workflow automation that saves teams 10+ hours per week."; mediaUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600"; postType = "achievement"; tags = ["fundraising", "seedround", "AI"]; likeCount = 247; commentCount = 38; createdAt = 1711500000; isAchievement = true },
      { id = "p2"; authorId = "u3"; content = "Just wrapped up a complete brand identity overhaul for a fintech startup. From logo concept to full design system in 3 weeks. Love seeing a vision come to life!"; mediaUrl = "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600"; postType = "milestone"; tags = ["design", "branding", "fintech"]; likeCount = 183; commentCount = 21; createdAt = 1711450000; isAchievement = false },
      { id = "p3"; authorId = "u2"; content = "Attended the most inspiring founder pitch day this week. The caliber of early-stage startups in climate tech right now is absolutely incredible. The future is being built today."; mediaUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"; postType = "update"; tags = ["climatetech", "investing", "founders"]; likeCount = 312; commentCount = 45; createdAt = 1711400000; isAchievement = false },
      { id = "p4"; authorId = "u6"; content = "My open-source Web3 authentication library just hit 1,000 GitHub stars! Started this as a weekend project 6 months ago. The developer community is incredible."; mediaUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600"; postType = "achievement"; tags = ["opensource", "web3", "developer"]; likeCount = 428; commentCount = 67; createdAt = 1711350000; isAchievement = true },
      { id = "p5"; authorId = "u4"; content = "Excited to share we've successfully placed 15 senior engineers at Series B+ startups this quarter! Talent is the ultimate competitive advantage. Reach out if you're hiring or looking."; mediaUrl = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600"; postType = "milestone"; tags = ["hiring", "talent", "startups"]; likeCount = 156; commentCount = 29; createdAt = 1711300000; isAchievement = false },
      { id = "p6"; authorId = "u5"; content = "Deep dive: Why 73% of Series A startups fail within 18 months and the 3 patterns I've seen in founders who succeed. Full article linked in bio."; mediaUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"; postType = "update"; tags = ["startups", "founders", "insights"]; likeCount = 891; commentCount = 134; createdAt = 1711250000; isAchievement = false },
      { id = "p7"; authorId = "u1"; content = "6 months ago I was sleeping on my co-founder's couch. Today we have 12 team members, 200 customers, and $2M in the bank. The journey is everything."; mediaUrl = "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600"; postType = "milestone"; tags = ["founder", "startup", "journey"]; likeCount = 1203; commentCount = 87; createdAt = 1711200000; isAchievement = true },
      { id = "p8"; authorId = "u3"; content = "Design tip: The best interfaces are the ones users never have to think about. Spent this week auditing 5 SaaS onboarding flows. Here's what separates good from great."; mediaUrl = "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600"; postType = "update"; tags = ["design", "UX", "SaaS"]; likeCount = 267; commentCount = 43; createdAt = 1711150000; isAchievement = false }
    ];

    stories := [
      { id = "s1"; authorId = "u1"; mediaUrl = "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400"; storyType = "pitch"; caption = "NovaTech Seed Round Announcement!"; viewCount = 342; createdAt = 1711500000 },
      { id = "s2"; authorId = "u3"; mediaUrl = "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400"; storyType = "milestone"; caption = "Brand Identity Complete"; viewCount = 128; createdAt = 1711480000 },
      { id = "s3"; authorId = "u6"; mediaUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"; storyType = "demo"; caption = "Web3 Auth Library Demo"; viewCount = 215; createdAt = 1711460000 },
      { id = "s4"; authorId = "u2"; mediaUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"; storyType = "event"; caption = "ClimateTech Pitch Day Recap"; viewCount = 467; createdAt = 1711440000 }
    ];

    marketplace := [
      { id = "m1"; postedById = "u1"; title = "Senior UI/UX Designer for SaaS Dashboard"; brief = "We need a talented designer to redesign our analytics dashboard. Must have SaaS and data visualization experience."; budgetMin = 5000; budgetMax = 8000; durationWeeks = 6; category = "Design"; applicantCount = 12; isOpen = true },
      { id = "m2"; postedById = "u4"; title = "Full-Stack Developer for FinTech MVP"; brief = "Building an investment portfolio tracker. React frontend with Node.js backend. 3 month engagement."; budgetMin = 12000; budgetMax = 18000; durationWeeks = 12; category = "Development"; applicantCount = 8; isOpen = true },
      { id = "m3"; postedById = "u2"; title = "Marketing Strategy Consultant"; brief = "Series A startup seeking GTM strategy expert to help launch in 3 new markets. Deep B2B SaaS knowledge required."; budgetMin = 8000; budgetMax = 15000; durationWeeks = 8; category = "Marketing"; applicantCount = 5; isOpen = true },
      { id = "m4"; postedById = "u5"; title = "Content Writer - Tech & Startup Niche"; brief = "Looking for a skilled writer to produce 4 in-depth articles per month. Must have strong tech background."; budgetMin = 2000; budgetMax = 3500; durationWeeks = 4; category = "Content"; applicantCount = 19; isOpen = true }
    ];

    liveSessions := [
      { id = "l1"; hostId = "u2"; title = "How to Pitch Investors: Live Q&A with Sarah Chen"; description = "Horizon Ventures partner Sarah Chen answers your questions about pitching, term sheets, and what investors really look for."; scheduledAt = 1711600000; durationMinutes = 60; participantCount = 234; isLive = true },
      { id = "l2"; hostId = "u1"; title = "Building a 0-to-1 SaaS Product in 90 Days"; description = "Alex Rivera shares his framework for rapid MVP development, customer discovery, and finding product-market fit."; scheduledAt = 1711700000; durationMinutes = 45; participantCount = 0; isLive = false },
      { id = "l3"; hostId = "u5"; title = "State of Startup Ecosystem 2026: Trends & Predictions"; description = "Tech journalist James O'Brien breaks down the macro trends shaping venture capital and startup success this year."; scheduledAt = 1711800000; durationMinutes = 90; participantCount = 0; isLive = false }
    ];

    messages := [
      { id = "msg1"; fromUserId = "u2"; toUserId = "u1"; content = "Hi Alex! Loved your pitch deck. Would love to schedule a call this week to discuss NovaTech."; sentAt = 1711490000; isRead = true },
      { id = "msg2"; fromUserId = "u1"; toUserId = "u2"; content = "Sarah, that would be amazing! I'm free Thursday or Friday afternoon. Thanks for reaching out!"; sentAt = 1711495000; isRead = true },
      { id = "msg3"; fromUserId = "u4"; toUserId = "u3"; content = "Marco, we have an exciting design role opening at one of our portfolio companies. Interested?"; sentAt = 1711480000; isRead = false }
    ];

    endorsements := [
      { id = "e1"; fromUserId = "u2"; toUserId = "u1"; skill = "Fundraising"; message = "Alex is one of the most prepared founders I've met. His financial modeling and storytelling is exceptional."; createdAt = 1711300000 },
      { id = "e2"; fromUserId = "u1"; toUserId = "u3"; skill = "UI/UX Design"; message = "Marco completely transformed our product's design. The new dashboard saw 40% better retention."; createdAt = 1711250000 },
      { id = "e3"; fromUserId = "u5"; toUserId = "u6"; skill = "Web3 Development"; message = "Luna's open source contributions to the Web3 space are genuinely impressive. Top-tier engineer."; createdAt = 1711200000 }
    ];
  };

  // --- User functions ---
  public func createProfile(profile : UserProfile) : async () {
    users := users.concat([profile]);
  };

  public query func getProfile(id : Text) : async ?UserProfile {
    users.find(func(u : UserProfile) : Bool { u.id == id })
  };

  public query func getAllProfiles() : async [UserProfile] { users };

  // --- Post functions ---
  public func createPost(post : Post) : async () {
    posts := posts.concat([post]);
  };

  public query func getFeedPosts(offset : Nat, limit : Nat) : async [Post] {
    let total = posts.size();
    if (offset >= total) return [];
    let end = if (offset + limit > total) total else offset + limit;
    Array.tabulate<Post>(end - offset, func(i : Nat) : Post { posts[total - 1 - offset - i] })
  };

  public func likePost(id : Text) : async () {
    posts := posts.map(func(p : Post) : Post {
      if (p.id == id) { { p with likeCount = p.likeCount + 1 } } else p
    });
  };

  public query func getUserPosts(authorId : Text) : async [Post] {
    posts.filter(func(p : Post) : Bool { p.authorId == authorId })
  };

  // --- Story functions ---
  public func createStory(story : Story) : async () {
    stories := stories.concat([story]);
  };

  public query func getActiveStories() : async [Story] { stories };

  public func viewStory(id : Text) : async () {
    stories := stories.map(func(s : Story) : Story {
      if (s.id == id) { { s with viewCount = s.viewCount + 1 } } else s
    });
  };

  // --- Marketplace functions ---
  public func createMarketplaceListing(listing : MarketplaceListing) : async () {
    marketplace := marketplace.concat([listing]);
  };

  public query func getMarketplaceListings() : async [MarketplaceListing] {
    marketplace.filter(func(l : MarketplaceListing) : Bool { l.isOpen })
  };

  public func applyToListing(id : Text) : async () {
    marketplace := marketplace.map(func(l : MarketplaceListing) : MarketplaceListing {
      if (l.id == id) { { l with applicantCount = l.applicantCount + 1 } } else l
    });
  };

  // --- Live session functions ---
  public func createLiveSession(session : LiveSession) : async () {
    liveSessions := liveSessions.concat([session]);
  };

  public query func getLiveSessions() : async [LiveSession] { liveSessions };

  public func joinLiveSession(id : Text) : async () {
    liveSessions := liveSessions.map(func(s : LiveSession) : LiveSession {
      if (s.id == id) { { s with participantCount = s.participantCount + 1 } } else s
    });
  };

  // --- Message functions ---
  public func sendMessage(msg : Message) : async () {
    messages := messages.concat([msg]);
  };

  public query func getConversation(user1 : Text, user2 : Text) : async [Message] {
    messages.filter(func(m : Message) : Bool {
      (m.fromUserId == user1 and m.toUserId == user2) or
      (m.fromUserId == user2 and m.toUserId == user1)
    })
  };

  public query func getConversations(userId : Text) : async [Message] {
    messages.filter(func(m : Message) : Bool {
      m.fromUserId == userId or m.toUserId == userId
    })
  };

  // --- Endorsement functions ---
  public func endorseUser(endorsement : Endorsement) : async () {
    endorsements := endorsements.concat([endorsement]);
  };

  public query func getEndorsementsForUser(userId : Text) : async [Endorsement] {
    endorsements.filter(func(e : Endorsement) : Bool { e.toUserId == userId })
  };
};
