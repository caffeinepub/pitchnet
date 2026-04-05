import { Eye, Heart, Play, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNav } from "../App";
import StoryViewer from "../components/StoryViewer";
import { profiles, stories } from "../data/mockData";

const STORY_TYPES = [
  "All",
  "Pitch",
  "Insight",
  "Showcase",
  "Milestone",
  "Event",
] as const;

const storyTypeMeta: Record<
  string,
  { label: string; emoji: string; color: string }
> = {
  pitch: {
    label: "Pitch",
    emoji: "🚀",
    color: "oklch(0.65 0.18 28)",
  },
  insight: {
    label: "Insight",
    emoji: "📊",
    color: "oklch(0.60 0.13 195)",
  },
  showcase: {
    label: "Showcase",
    emoji: "🎨",
    color: "oklch(0.62 0.14 290)",
  },
  milestone: {
    label: "Milestone",
    emoji: "🎉",
    color: "oklch(0.75 0.115 75)",
  },
  event: {
    label: "Event",
    emoji: "🌍",
    color: "oklch(0.62 0.14 155)",
  },
};

export default function StoriesPage() {
  const { viewProfile } = useNav();
  const [viewing, setViewing] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const filteredStories =
    activeFilter === "All"
      ? stories
      : stories.filter(
          (s) => s.storyType.toLowerCase() === activeFilter.toLowerCase(),
        );

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto" data-ocid="stories.page">
      {/* Page header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-pn-text">
          Professional Stories
        </h1>
        <p className="text-pn-muted text-sm mt-1">
          Startup highlights, milestones &amp; industry insights
        </p>
      </motion.div>

      {/* Stories rings row — white card with grab-scroll feel */}
      <motion.section
        className="rounded-3xl border border-black/5 p-4 mb-6 overflow-hidden shadow-sm card-hover"
        style={{ background: "#ffffff" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.06, ease: "easeOut" }}
        whileTap={{ cursor: "grabbing" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-700 text-sm font-semibold">
            Active Now
          </span>
          <span className="text-slate-400 text-xs">
            {stories.length} stories
          </span>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-1 scrollbar-none">
          {/* Add Story button */}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <button
              type="button"
              data-ocid="stories.add_story.button"
              className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center transition-colors hover:border-pn-teal"
              style={{
                borderColor: "oklch(0.65 0.18 28)",
                background: "#f8fafc",
              }}
            >
              <Plus size={20} style={{ color: "oklch(0.65 0.18 28)" }} />
            </button>
            <span className="text-slate-500 text-[10px] font-medium">
              Add Story
            </span>
          </div>

          {/* Story rings */}
          {stories.map((story, i) => {
            const author = profiles.find((p) => p.id === story.authorId);
            if (!author) return null;
            return (
              <motion.button
                type="button"
                key={story.id}
                onClick={() => {
                  const idx = stories.indexOf(story);
                  setViewing(idx);
                }}
                data-ocid={`stories.ring.item.${i + 1}`}
                className="flex flex-col items-center gap-1.5 shrink-0 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="p-0.5 rounded-full story-ring">
                  <img
                    src={author.avatarUrl}
                    alt={author.displayName}
                    className="w-[68px] h-[68px] rounded-full border-2 object-cover object-top"
                    style={{ borderColor: "#ffffff" }}
                  />
                </div>
                <span className="text-slate-700 text-[10px] font-medium max-w-[64px] truncate text-center">
                  {author.displayName.split(" ")[0]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Section header + filter pills */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      >
        <h2 className="text-pn-text font-bold text-lg">Trending Stories</h2>
        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          data-ocid="stories.filter.tab"
        >
          {STORY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveFilter(type)}
              className="shrink-0 text-xs font-[500] px-3.5 py-2 rounded-full border transition-all duration-200"
              style={{
                background:
                  activeFilter === type ? "oklch(0.65 0.18 28)" : "#f1f5f9",
                color: activeFilter === type ? "#fff" : "#64748b",
                borderColor:
                  activeFilter === type ? "oklch(0.65 0.18 28)" : "#e2e8f0",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Story cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredStories.map((story, i) => {
          const author = profiles.find((p) => p.id === story.authorId);
          if (!author) return null;
          const meta = storyTypeMeta[story.storyType];
          const isLiked = likedIds.has(story.id);
          const storyIdx = stories.indexOf(story);

          return (
            <motion.div
              key={story.id}
              data-ocid={`stories.card.item.${i + 1}`}
              className="rounded-3xl border border-black/5 overflow-hidden group cursor-pointer shadow-sm card-hover"
              style={{ background: "#ffffff" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
            >
              {/* Thumbnail */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                onClick={() => setViewing(storyIdx)}
                onKeyDown={(e) => e.key === "Enter" && setViewing(storyIdx)}
                role="presentation"
              >
                <img
                  src={story.mediaUrl}
                  alt={story.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark overlay on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(7,28,39,0.5)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: "oklch(0.65 0.18 28)" }}
                  >
                    <Play
                      size={18}
                      fill="white"
                      className="ml-0.5"
                      style={{ color: "white" }}
                    />
                  </div>
                </div>

                {/* Story type badge */}
                {meta && (
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white shadow"
                      style={{ background: meta.color }}
                    >
                      {meta.emoji} {meta.label}
                    </span>
                  </div>
                )}

                {/* Like button overlay */}
                <button
                  type="button"
                  onClick={(e) => toggleLike(story.id, e)}
                  data-ocid={`stories.card.toggle.${i + 1}`}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(7,28,39,0.6)" }}
                >
                  <Heart
                    size={14}
                    fill={isLiked ? "oklch(0.65 0.18 28)" : "transparent"}
                    style={{ color: isLiked ? "oklch(0.65 0.18 28)" : "white" }}
                  />
                </button>
              </div>

              {/* Card body */}
              <div className="p-4">
                {/* Author row */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      viewProfile(author.id);
                    }}
                    className="shrink-0"
                  >
                    <img
                      src={author.avatarUrl}
                      alt={author.displayName}
                      className="w-9 h-9 rounded-full object-cover object-top"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      className="text-slate-800 text-xs font-semibold hover:text-pn-teal transition-colors block truncate"
                      onClick={(e) => {
                        e.stopPropagation();
                        viewProfile(author.id);
                      }}
                    >
                      {author.displayName}
                    </button>
                    <div className="text-slate-400 text-[10px]">
                      {author.role} · {author.company}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors"
                    style={{
                      background: "oklch(0.60 0.13 195 / 0.12)",
                      color: "oklch(0.38 0.10 195)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Follow
                  </button>
                </div>

                {/* Caption */}
                <p className="text-slate-700 text-xs leading-relaxed line-clamp-2 mb-3">
                  {story.caption}
                </p>

                {/* Footer stats */}
                <div className="flex items-center gap-3 text-slate-400 text-[10px]">
                  <span className="flex items-center gap-1">
                    <Eye size={10} /> {story.viewCount?.toLocaleString() ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={10} />
                    {likedIds.has(story.id) ? "Liked" : "Like"}
                  </span>
                  <span className="ml-auto">{story.createdAt}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Story viewer */}
      {viewing !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={viewing}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
}
