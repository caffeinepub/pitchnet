import {
  ArrowLeft,
  Award,
  Building2,
  FileText,
  MapPin,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import {
  CURRENT_USER_ID,
  endorsements,
  posts,
  profiles,
} from "../data/mockData";

interface Props {
  profileId: string;
}

export default function ProfilePage({ profileId }: Props) {
  const { navigate } = useNav();
  const profile = profiles.find((p) => p.id === profileId);
  const isOwnProfile = profileId === CURRENT_USER_ID;
  const [endorsed, setEndorsed] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"posts" | "about">("posts");

  if (!profile) {
    return (
      <div
        className="flex items-center justify-center h-64 text-pn-muted"
        data-ocid="profile.empty_state"
      >
        Profile not found.
      </div>
    );
  }

  const userPosts = posts.filter((p) => p.authorId === profileId);
  const userEndorsements = endorsements.filter((e) => e.toUserId === profileId);

  const handleEndorse = (skill: string) => {
    if (endorsed.has(skill)) return;
    setEndorsed((s) => new Set([...s, skill]));
    toast.success(`\u2B50 Endorsed ${profile.displayName} for ${skill}!`, {
      description: "They'll be notified of your endorsement.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto" data-ocid="profile.page">
      {/* Back button */}
      {!isOwnProfile && (
        <div className="px-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("feed")}
            data-ocid="profile.back.button"
            className="flex items-center gap-1.5 text-pn-muted hover:text-pn-text text-sm transition-colors mb-2"
          >
            <ArrowLeft size={15} /> Back to Feed
          </button>
        </div>
      )}

      {/* Cover + avatar */}
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img
            src={profile.coverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95) 100%)",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-4 translate-y-1/2">
          <div className="p-0.5 rounded-full story-ring">
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="w-20 h-20 rounded-full"
              style={{ border: "3px solid #ffffff" }}
            />
          </div>
        </div>
      </div>

      {/* Profile info — white card */}
      <motion.div
        className="px-4 pt-14 pb-4"
        style={{ background: "#ffffff" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {profile.displayName}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.75 0.115 75 / 0.12)",
                  color: "oklch(0.50 0.115 75)",
                }}
              >
                {profile.role}
              </span>
              {profile.company && (
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Building2 size={11} /> {profile.company}
                </span>
              )}
            </div>
          </div>
          {!isOwnProfile && (
            <button
              type="button"
              data-ocid="profile.follow.button"
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "oklch(0.65 0.18 28)" }}
            >
              Follow
            </button>
          )}
        </div>
        {profile.bio && (
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            {profile.bio}
          </p>
        )}
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          {profile.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {profile.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Users size={11} /> {profile.followerCount?.toLocaleString()}{" "}
            followers
          </span>
          <span className="flex items-center gap-1">
            <Star size={11} /> {profile.connectionCount?.toLocaleString()}{" "}
            connections
          </span>
        </div>
      </motion.div>

      {/* Tabs */}
      <div
        className="flex border-b border-pn-card-border sticky top-0 z-10"
        style={{ background: "#ffffff" }}
      >
        {(["posts", "about"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            data-ocid={`profile.${tab}.tab`}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 text-slate-800"
                : "text-slate-400 hover:text-slate-600"
            }`}
            style={
              activeTab === tab
                ? { borderBottomColor: "oklch(0.65 0.18 28)" }
                : {}
            }
          >
            {tab === "posts" ? (
              <span className="flex items-center justify-center gap-1.5">
                <FileText size={13} /> Posts
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <Award size={13} /> About
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "posts" ? (
        <div
          className="divide-y divide-pn-card-border"
          style={{ background: "#ffffff" }}
        >
          {userPosts.length === 0 ? (
            <div
              className="py-16 text-center text-slate-400"
              data-ocid="profile.posts.empty_state"
            >
              No posts yet.
            </div>
          ) : (
            userPosts.map((post, i) => (
              <motion.div
                key={post.id}
                data-ocid={`profile.post.item.${i + 1}`}
                className="px-4 py-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.07,
                  ease: "easeOut",
                }}
              >
                <p className="text-slate-700 text-sm leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center gap-3 mt-2 text-slate-400 text-xs">
                  <span>{post.createdAt}</span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={11} /> {post.likeCount}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="px-4 py-4 space-y-5" style={{ background: "#ffffff" }}>
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
              <Award size={14} /> Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills?.map((skill) => (
                <motion.button
                  key={skill}
                  type="button"
                  onClick={() => handleEndorse(skill)}
                  data-ocid="profile.skill.toggle"
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                  style={{
                    background: endorsed.has(skill)
                      ? "oklch(0.75 0.115 75 / 0.12)"
                      : "#f8fafc",
                    borderColor: endorsed.has(skill)
                      ? "oklch(0.75 0.115 75 / 0.4)"
                      : "#e2e8f0",
                    color: endorsed.has(skill)
                      ? "oklch(0.50 0.115 75)"
                      : "#64748b",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {endorsed.has(skill) ? "\u2B50 " : ""}
                  {skill}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Endorsements */}
          {userEndorsements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className="text-sm font-bold text-slate-700 mb-3">
                Recent Endorsements
              </h2>
              <div className="space-y-2">
                {userEndorsements.slice(0, 5).map((e, i) => {
                  const endorser = profiles.find((p) => p.id === e.fromUserId);
                  return (
                    <motion.div
                      key={e.id ?? i}
                      data-ocid={`profile.endorsement.item.${i + 1}`}
                      className="flex items-center gap-2 text-xs text-slate-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <img
                        src={endorser?.avatarUrl}
                        alt={endorser?.displayName}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>
                        <strong>{endorser?.displayName}</strong> endorsed for{" "}
                        <span
                          className="font-medium"
                          style={{ color: "oklch(0.50 0.115 75)" }}
                        >
                          {e.skill}
                        </span>
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
