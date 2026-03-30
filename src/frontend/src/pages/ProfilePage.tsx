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
    toast.success(`⭐ Endorsed ${profile.displayName} for ${skill}!`, {
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
      <div className="px-4 pt-14 pb-4" style={{ background: "#ffffff" }}>
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
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            {!isOwnProfile && (
              <button
                type="button"
                data-ocid="profile.follow.button"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "oklch(0.75 0.115 75)" }}
              >
                + Follow
              </button>
            )}
            <button
              type="button"
              data-ocid="profile.message.button"
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-pn-card-border text-slate-700 hover:border-pn-teal transition-colors"
            >
              Message
            </button>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-3">
          {profile.headline}
        </p>

        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          {profile.company && (
            <span className="flex items-center gap-1">
              <Building2 size={12} /> {profile.company}
            </span>
          )}
          {profile.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {profile.location}
            </span>
          )}
        </div>

        {/* Stats */}
        <div
          className="flex gap-6 mt-4 pt-4 border-t border-pn-card-border"
          data-ocid="profile.stats.panel"
        >
          <div className="text-center">
            <div className="text-slate-800 font-bold text-base">
              {profile.followerCount.toLocaleString()}
            </div>
            <div className="text-slate-400 text-[10px] flex items-center gap-0.5">
              <Users size={9} /> Followers
            </div>
          </div>
          <div className="text-center">
            <div className="text-slate-800 font-bold text-base">
              {profile.postCount}
            </div>
            <div className="text-slate-400 text-[10px] flex items-center gap-0.5">
              <FileText size={9} /> Posts
            </div>
          </div>
          <div className="text-center">
            <div className="text-slate-800 font-bold text-base">
              {profile.connectionCount.toLocaleString()}
            </div>
            <div className="text-slate-400 text-[10px] flex items-center gap-0.5">
              <Users size={9} /> Connections
            </div>
          </div>
        </div>
      </div>

      {/* Tabs — white bg */}
      <div
        className="flex border-b border-pn-card-border px-4 sticky top-0 z-10"
        style={{ background: "#ffffff" }}
      >
        {(["posts", "about"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            data-ocid={`profile.${tab}.tab`}
            className={`px-4 py-3 text-sm font-semibold capitalize border-b-2 transition-colors -mb-px ${
              activeTab === tab
                ? "border-pn-gold text-pn-gold"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 space-y-4">
        {activeTab === "posts" ? (
          <>
            {/* Achievement timeline */}
            {profile.achievements.length > 0 && (
              <section
                className="rounded-2xl border border-pn-card-border p-4 shadow-card"
                style={{ background: "#ffffff" }}
              >
                <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Award size={14} className="text-pn-gold" />
                  Career Highlights
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {profile.achievements.map((ach) => (
                    <div
                      key={ach.title}
                      className="shrink-0 w-44 rounded-xl border border-pn-card-border p-3 hover:-translate-y-1 transition-transform"
                      style={{ background: "#f8fafc" }}
                    >
                      <div className="text-2xl mb-1.5">{ach.icon}</div>
                      <div
                        className="text-[10px] font-bold mb-1"
                        style={{ color: "oklch(0.55 0.115 75)" }}
                      >
                        {ach.year}
                      </div>
                      <div className="text-slate-800 text-xs font-semibold leading-snug mb-1">
                        {ach.title}
                      </div>
                      <div className="text-slate-500 text-[10px] leading-snug">
                        {ach.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Posts grid */}
            {userPosts.length > 0 ? (
              <section>
                <h2 className="text-sm font-bold text-pn-text mb-3">
                  Recent Posts
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {userPosts.map((post, i) => (
                    <div
                      key={post.id}
                      data-ocid={`profile.post.item.${i + 1}`}
                      className="rounded-xl overflow-hidden border border-pn-card-border aspect-square relative group cursor-pointer"
                    >
                      {post.mediaUrl ? (
                        <img
                          src={post.mediaUrl}
                          alt="Post"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center p-3"
                          style={{ background: "#f8fafc" }}
                        >
                          <p className="text-slate-500 text-xs text-center line-clamp-4">
                            {post.content}
                          </p>
                        </div>
                      )}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2"
                        style={{ background: "rgba(7,28,39,0.75)" }}
                      >
                        <div className="flex items-center gap-2 text-white text-[10px]">
                          <span>❤️ {post.likeCount}</span>
                          <span>💬 {post.commentCount}</span>
                        </div>
                      </div>
                      {post.isAchievement && (
                        <div className="absolute top-1.5 right-1.5">
                          <Star
                            size={12}
                            fill="oklch(0.75 0.115 75)"
                            className="text-pn-gold"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <div
                data-ocid="profile.posts.empty_state"
                className="text-center py-12 text-slate-500"
              >
                No posts yet.
              </div>
            )}
          </>
        ) : (
          <>
            {/* Bio */}
            <section
              className="rounded-2xl border border-pn-card-border p-4 shadow-card"
              style={{ background: "#ffffff" }}
            >
              <h2 className="text-sm font-bold text-slate-800 mb-2">About</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {profile.bio}
              </p>
            </section>

            {/* Skills with endorsements */}
            <section
              className="rounded-2xl border border-pn-card-border p-4 shadow-card"
              style={{ background: "#ffffff" }}
            >
              <h2 className="text-sm font-bold text-slate-800 mb-3">
                Skills &amp; Endorsements
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => handleEndorse(skill)}
                    data-ocid="profile.skill.button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      endorsed.has(skill)
                        ? "text-pn-gold border-pn-gold/60 bg-pn-gold/10"
                        : "text-slate-500 border-pn-card-border hover:border-pn-teal hover:text-slate-700"
                    }`}
                  >
                    {endorsed.has(skill) && (
                      <ThumbsUp size={10} fill="currentColor" />
                    )}
                    {skill}
                  </button>
                ))}
              </div>
            </section>

            {/* Endorsement messages */}
            {userEndorsements.length > 0 && (
              <section
                className="rounded-2xl border border-pn-card-border p-4 shadow-card"
                style={{ background: "#ffffff" }}
              >
                <h2 className="text-sm font-bold text-slate-800 mb-3">
                  Endorsements
                </h2>
                <div className="space-y-3">
                  {userEndorsements.map((endorse, i) => {
                    const from = profiles.find(
                      (p) => p.id === endorse.fromUserId,
                    );
                    return (
                      <div
                        key={endorse.id}
                        data-ocid={`profile.endorsement.item.${i + 1}`}
                        className="flex gap-3 p-3 rounded-xl border border-pn-card-border"
                        style={{ background: "#f8fafc" }}
                      >
                        <img
                          src={from?.avatarUrl}
                          alt={from?.displayName}
                          className="w-8 h-8 rounded-full shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-slate-800 text-xs font-semibold">
                              {from?.displayName}
                            </span>
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{
                                background: "oklch(0.75 0.115 75 / 0.12)",
                                color: "oklch(0.50 0.115 75)",
                              }}
                            >
                              {endorse.skill}
                            </span>
                          </div>
                          <p className="text-slate-500 text-xs leading-snug">
                            {endorse.message}
                          </p>
                          <div className="text-slate-400 text-[10px] mt-1">
                            {endorse.createdAt}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Pitch video (own profile) */}
            {isOwnProfile && (
              <section
                className="rounded-2xl border border-pn-card-border p-4 shadow-card"
                style={{ background: "#ffffff" }}
              >
                <h2 className="text-sm font-bold text-slate-800 mb-3">
                  🎥 My Pitch Video
                </h2>
                <div
                  data-ocid="profile.pitch.panel"
                  className="rounded-xl border-2 border-dashed border-pn-card-border flex flex-col items-center justify-center py-10 gap-3 hover:border-pn-teal transition-colors cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.75 0.115 75 / 0.12)" }}
                  >
                    <span className="text-2xl">🎤</span>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-800 text-sm font-semibold">
                      Upload Your 60-Second Pitch
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Help investors discover your startup
                    </p>
                  </div>
                  <button
                    type="button"
                    data-ocid="profile.upload.button"
                    className="px-4 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ background: "oklch(0.75 0.115 75)" }}
                  >
                    Upload Video
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
