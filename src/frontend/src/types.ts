export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  role: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  followerCount: number;
  pitchVideoUrl: string;
  coverUrl: string;
  postCount: number;
  connectionCount: number;
  company: string;
  location: string;
  achievements: Achievement[];
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  mediaUrl: string;
  postType: string;
  tags: string[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isAchievement: boolean;
}

export interface Story {
  id: string;
  authorId: string;
  mediaUrl: string;
  storyType: string;
  caption: string;
  viewCount: number;
  createdAt: string;
}

export interface MarketplaceListing {
  id: string;
  postedById: string;
  title: string;
  brief: string;
  budgetMin: number;
  budgetMax: number;
  durationWeeks: number;
  category: string;
  applicantCount: number;
  isOpen: boolean;
}

export interface LiveSession {
  id: string;
  hostId: string;
  title: string;
  description: string;
  scheduledAt: string;
  durationMinutes: number;
  participantCount: number;
  isLive: boolean;
  thumbnailUrl: string;
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}

export interface Endorsement {
  id: string;
  fromUserId: string;
  toUserId: string;
  skill: string;
  message: string;
  createdAt: string;
}

export type Page =
  | "feed"
  | "stories"
  | "marketplace"
  | "live"
  | "messages"
  | "profile";
