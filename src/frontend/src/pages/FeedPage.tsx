import { Clock, DollarSign, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import PostCard from "../components/PostCard";
import StoryViewer from "../components/StoryViewer";
import {
  CURRENT_USER_ID,
  liveSessions,
  marketplaceListings,
  posts,
  profiles,
  stories,
} from "../data/mockData";

export default function FeedPage() {
  const { viewProfile } = useNav();
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [applied, setApplied] = useState<Set<string>>(new Set());

  const handleApply = (id: string, title: string) => {
    setApplied((s) => new Set([...s, id]));
    toast.success(`Applied to "${title}"!`, {
      description: "The poster will review your application.",
    });
  };

  return (
    <div className="flex gap-5 p-4 max-w-7xl mx-auto">
      {/* Feed column */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Stories row */}
        <section
          data-ocid="feed.stories.panel"
          className="rounded-3xl border border-black/5 p-4 shadow-sm card-hover"
          style={{ background: "#ffffff" }}
        >
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Stories
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-thin">
            {stories.map((story, i) => {
              const author = profiles.find((p) => p.id === story.authorId);
              if (!author) return null;
              return (
                <button
                  type="button"
                  key={story.id}
                  onClick={() => setActiveStory(i)}
                  data-ocid={`feed.story.item.${i + 1}`}
                  className="flex flex-col items-center gap-1.5 shrink-0 group"
                >
                  <div className="p-0.5 rounded-full story-ring">
                    <img
                      src={author.avatarUrl}
                      alt={author.displayName}
                      className="w-[68px] h-[68px] rounded-full border-2 object-cover object-top group-hover:scale-105 transition-transform"
                      style={{ borderColor: "#ffffff" }}
                    />
                  </div>
                  <span className="text-slate-700 text-[11px] font-medium max-w-[60px] truncate">
                    {author.displayName.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Post feed */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>

      {/* Right sidebar — staggered fade in from right */}
      <aside className="hidden lg:flex flex-col gap-4 w-72 shrink-0">
        {/* Freelance Marketplace preview */}
        <motion.section
          data-ocid="feed.marketplace.panel"
          className="rounded-3xl border border-black/5 overflow-hidden shadow-sm card-hover"
          style={{ background: "#ffffff" }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-pn-card-border">
            <h2 className="text-sm font-semibold text-slate-800">
              Freelance Marketplace
            </h2>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.43 0.065 207 / 0.12)",
                color: "oklch(0.35 0.065 207)",
              }}
            >
              {marketplaceListings.length} open
            </span>
          </div>
          <div className="divide-y divide-pn-card-border">
            {marketplaceListings.slice(0, 3).map((listing) => (
              <div
                key={listing.id}
                className="px-4 py-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-slate-800 text-xs font-semibold leading-snug flex-1">
                    {listing.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[10px] mb-2">
                  <span className="flex items-center gap-0.5">
                    <DollarSign size={9} />
                    {(listing.budgetMin / 1000).toFixed(0)}k\u2013
                    {(listing.budgetMax / 1000).toFixed(0)}k
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock size={9} /> {listing.durationWeeks}w
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleApply(listing.id, listing.title)}
                  data-ocid={`feed.marketplace.apply.button.${listing.id}`}
                  disabled={applied.has(listing.id)}
                  className={`w-full text-[10px] font-semibold py-1.5 rounded-lg transition-all ${
                    applied.has(listing.id)
                      ? "text-slate-400 bg-slate-100 cursor-default"
                      : "text-white hover:opacity-90 active:scale-95"
                  }`}
                  style={
                    applied.has(listing.id)
                      ? {}
                      : { background: "oklch(0.75 0.115 75)" }
                  }
                >
                  {applied.has(listing.id) ? "\u2713 Applied" : "Apply Now"}
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Live Sessions */}
        <motion.section
          data-ocid="feed.live.panel"
          className="rounded-3xl border border-black/5 overflow-hidden shadow-sm card-hover"
          style={{ background: "#ffffff" }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-pn-card-border">
            <h2 className="text-sm font-semibold text-slate-800">
              Upcoming Live
            </h2>
            <Zap size={14} className="text-pn-gold" />
          </div>
          <div className="divide-y divide-pn-card-border">
            {liveSessions.map((session) => {
              const host = profiles.find((p) => p.id === session.hostId);
              return (
                <div
                  key={session.id}
                  className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="relative shrink-0">
                    <img
                      src={host?.avatarUrl}
                      alt={host?.displayName}
                      className="w-9 h-9 rounded-full"
                    />
                    {session.isLive && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 border border-white animate-pulse-live" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 text-xs font-semibold leading-snug line-clamp-2">
                      {session.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {session.isLive ? (
                        <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-live" />
                          LIVE
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">
                          {session.scheduledAt}
                        </span>
                      )}
                      <span className="text-slate-400 text-[10px] flex items-center gap-0.5">
                        <Users size={9} />{" "}
                        {session.participantCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Suggested connections */}
        <motion.section
          className="rounded-3xl border border-black/5 p-4 shadow-sm card-hover"
          style={{ background: "#ffffff" }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-sm font-semibold text-slate-800 mb-3">
            People to Follow
          </h2>
          <div className="space-y-3">
            {profiles
              .filter((p) => p.id !== CURRENT_USER_ID)
              .slice(0, 3)
              .map((person) => (
                <div key={person.id} className="flex items-center gap-2">
                  <button type="button" onClick={() => viewProfile(person.id)}>
                    <img
                      src={person.avatarUrl}
                      alt={person.displayName}
                      className="w-9 h-9 rounded-full border border-pn-card-border"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => viewProfile(person.id)}
                      className="text-slate-800 text-xs font-semibold hover:text-pn-teal transition-colors block truncate"
                    >
                      {person.displayName}
                    </button>
                    <div className="text-slate-400 text-[10px] truncate">
                      {person.role}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-pn-gold/50 text-pn-gold hover:bg-pn-gold/10 transition-colors"
                  >
                    Follow
                  </button>
                </div>
              ))}
          </div>
        </motion.section>
      </aside>

      {/* Story viewer modal */}
      {activeStory !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </div>
  );
}
