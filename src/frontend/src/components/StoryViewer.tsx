import { ChevronLeft, ChevronRight, Eye, Heart, Share2, X } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useNav } from "../App";
import { profiles } from "../data/mockData";
import type { Story } from "../types";

interface Props {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

const storyTypeMeta: Record<string, { label: string; emoji: string }> = {
  pitch: { label: "Pitch", emoji: "🚀" },
  insight: { label: "Insight", emoji: "📊" },
  showcase: { label: "Showcase", emoji: "🎨" },
  milestone: { label: "Milestone", emoji: "🎉" },
  event: { label: "Event", emoji: "🌍" },
};

export default function StoryViewer({ stories, initialIndex, onClose }: Props) {
  const { viewProfile } = useNav();
  const [index, setIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);

  const current = stories[index];
  const author = profiles.find((p) => p.id === current?.authorId);

  const next = useCallback(() => {
    if (index < stories.length - 1) {
      setIndex((i) => i + 1);
      setProgress(0);
      setLiked(false);
    } else {
      onClose();
    }
  }, [index, stories.length, onClose]);

  const prev = useCallback(() => {
    setIndex((i) => {
      if (i > 0) {
        setProgress(0);
        setLiked(false);
        return i - 1;
      }
      return i;
    });
  }, []);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          next();
          return 100;
        }
        return p + 1.4;
      });
    }, 70);
    return () => clearInterval(interval);
  }, [next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, next, prev]);

  if (!current || !author) return null;

  const meta = storyTypeMeta[current.storyType];

  return (
    <button
      type="button"
      className="fixed inset-0 z-50 flex items-center justify-center w-full"
      style={{ background: "rgba(5,18,26,0.94)" }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-sm mx-4 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "oklch(0.15 0.05 213)",
          aspectRatio: "9/16",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
          {stories.map((s, i) => (
            <div
              key={s.id}
              className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/20"
            >
              <div
                className="h-full rounded-full transition-none"
                style={{
                  background: "oklch(0.75 0.115 75)",
                  width:
                    i < index ? "100%" : i === index ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Media */}
        <img
          src={current.mediaUrl}
          alt={current.caption}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,18,26,0.55) 0%, transparent 38%, rgba(5,18,26,0.85) 100%)",
          }}
        />

        {/* Story type badge */}
        {meta && (
          <div className="absolute top-8 left-3 z-10">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: "oklch(0.65 0.18 28)" }}
            >
              {meta.emoji} {meta.label}
            </span>
          </div>
        )}

        {/* Header — author info */}
        <div className="absolute top-8 left-0 right-3 flex items-center gap-2 z-10 pl-3 pr-2">
          {/* spacer for type badge */}
          <div className="w-0" />
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => viewProfile(author.id)}
            className="shrink-0"
          >
            <img
              src={author.avatarUrl}
              alt={author.displayName}
              className="w-9 h-9 rounded-full story-ring"
            />
          </button>
          <div className="flex-1">
            <div className="text-white text-sm font-semibold leading-tight">
              {author.displayName}
            </div>
            <div className="text-white/60 text-[10px]">
              {author.role} · {current.createdAt}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="story.close.button"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5">
          {/* Caption + like */}
          <div className="flex items-start gap-2 mb-3">
            <p className="flex-1 text-white text-sm font-medium leading-snug">
              {current.caption}
            </p>
            <motion.button
              type="button"
              onClick={() => setLiked((v) => !v)}
              data-ocid="story.toggle"
              className="shrink-0 flex flex-col items-center gap-0.5 pt-0.5"
              whileTap={{ scale: 1.3 }}
            >
              <Heart
                size={20}
                fill={liked ? "oklch(0.65 0.18 28)" : "transparent"}
                style={{
                  color: liked
                    ? "oklch(0.65 0.18 28)"
                    : "rgba(255,255,255,0.7)",
                }}
              />
              <span className="text-[9px] text-white/60">Like</span>
            </motion.button>
          </div>

          {/* View count */}
          <div className="flex items-center gap-1 mb-4 text-white/50 text-xs">
            <Eye size={11} />
            <span>{current.viewCount.toLocaleString()} views</span>
          </div>

          {/* Action buttons row */}
          <div className="flex gap-2">
            <motion.button
              type="button"
              onClick={() => setFollowed((v) => !v)}
              data-ocid="story.primary_button"
              className="flex-1 py-2.5 rounded-full font-semibold text-sm transition-all"
              style={{
                background: followed
                  ? "oklch(0.60 0.13 195)"
                  : "oklch(0.65 0.18 28)",
                color: "white",
              }}
              whileTap={{ scale: 0.97 }}
            >
              {followed
                ? `Following ${author.displayName.split(" ")[0]}`
                : `Follow ${author.displayName.split(" ")[0]}`}
            </motion.button>
            <button
              type="button"
              data-ocid="story.secondary_button"
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <Share2 size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Nav buttons */}
        {index > 0 && (
          <button
            type="button"
            onClick={prev}
            data-ocid="story.prev.button"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {index < stories.length - 1 && (
          <button
            type="button"
            onClick={next}
            data-ocid="story.next.button"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </motion.div>
    </button>
  );
}
