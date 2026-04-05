import { Bookmark, Eye, Heart, Share2, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNav } from "../App";
import { pitchVideos, profiles } from "../data/mockData";
import type { PitchVideo } from "../types";

const DOMAIN_COLORS: Record<string, { bg: string; text: string }> = {
  "Tech/AI": { bg: "oklch(0.43 0.065 207)", text: "#fff" },
  "Business Models": { bg: "oklch(0.55 0.14 230)", text: "#fff" },
  Sustainability: { bg: "oklch(0.52 0.14 155)", text: "#fff" },
  "Health Innovation": { bg: "oklch(0.60 0.16 0)", text: "#fff" },
  "Finance/Fintech": { bg: "oklch(0.75 0.115 75)", text: "#1a1a00" },
  Education: { bg: "oklch(0.60 0.18 290)", text: "#fff" },
  "New Products": { bg: "oklch(0.65 0.18 28)", text: "#fff" },
  Innovation: { bg: "oklch(0.62 0.16 310)", text: "#fff" },
};

function PitchCard({
  video,
  index,
  isActive,
}: {
  video: PitchVideo;
  index: number;
  isActive: boolean;
}) {
  const { viewProfile } = useNav();
  const author = profiles.find((p) => p.id === video.authorId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [muted, setMuted] = useState(true);
  const domainColor = DOMAIN_COLORS[video.domain] ?? {
    bg: "oklch(0.65 0.18 28)",
    text: "#fff",
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isActive) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isActive]);

  const handleLike = useCallback(() => {
    setLiked((v) => {
      setLikeCount((c) => (v ? c - 1 : c + 1));
      return !v;
    });
  }, []);

  const formatCount = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <div
      className="snap-start relative w-full overflow-hidden flex-shrink-0"
      style={{ height: "100%" }}
      data-ocid={`pitch.card.item.${index + 1}`}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={muted}
        playsInline
        poster={video.thumbnailUrl}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <div className="absolute top-4 right-14 z-10">
        <span
          className="text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg"
          style={{ background: domainColor.bg, color: domainColor.text }}
        >
          {video.domain}
        </span>
      </div>

      <div className="absolute top-4 left-4 z-10">
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          {video.duration}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setMuted((v) => !v)}
        data-ocid={`pitch.mute.toggle.${index + 1}`}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.55)" }}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <VolumeX size={15} className="text-white" />
        ) : (
          <Volume2 size={15} className="text-white" />
        )}
      </button>

      <div className="absolute right-4 bottom-40 z-10 flex flex-col items-center gap-5">
        <motion.button
          type="button"
          onClick={handleLike}
          data-ocid={`pitch.like.button.${index + 1}`}
          className="flex flex-col items-center gap-1"
          whileTap={{ scale: 1.3 }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <Heart
              size={21}
              fill={liked ? "oklch(0.65 0.18 28)" : "transparent"}
              style={{ color: liked ? "oklch(0.65 0.18 28)" : "white" }}
            />
          </div>
          <span className="text-white text-[10px] font-semibold">
            {formatCount(likeCount)}
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setBookmarked((v) => !v)}
          data-ocid={`pitch.bookmark.button.${index + 1}`}
          className="flex flex-col items-center gap-1"
          whileTap={{ scale: 1.2 }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <Bookmark
              size={21}
              fill={bookmarked ? "oklch(0.75 0.115 75)" : "transparent"}
              style={{
                color: bookmarked ? "oklch(0.75 0.115 75)" : "white",
              }}
            />
          </div>
          <span className="text-white text-[10px] font-semibold">Save</span>
        </motion.button>

        <motion.button
          type="button"
          data-ocid={`pitch.share.button.${index + 1}`}
          className="flex flex-col items-center gap-1"
          whileTap={{ scale: 1.2 }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <Share2 size={19} className="text-white" />
          </div>
          <span className="text-white text-[10px] font-semibold">Share</span>
        </motion.button>

        <div className="flex flex-col items-center gap-1">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <Eye size={19} className="text-white" />
          </div>
          <span className="text-white text-[10px] font-semibold">
            {formatCount(video.views)}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-16 z-10 px-4 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {author && (
              <div className="flex items-center gap-2.5 mb-3">
                <button
                  type="button"
                  onClick={() => viewProfile(author.id)}
                  data-ocid={`pitch.author.button.${index + 1}`}
                >
                  <img
                    src={author.avatarUrl}
                    alt={author.displayName}
                    className="w-11 h-11 rounded-full border-2 border-white object-cover object-top shadow-lg"
                  />
                </button>
                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => viewProfile(author.id)}
                    className="text-white font-bold text-sm leading-tight hover:underline block truncate"
                  >
                    {author.displayName}
                  </button>
                  <div className="text-white/70 text-xs">{author.role}</div>
                </div>
                <button
                  type="button"
                  className="shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full text-white border border-white/50 hover:bg-white/20 transition-colors"
                >
                  Follow
                </button>
              </div>
            )}

            <h2 className="text-white font-bold text-base leading-snug mb-1.5 line-clamp-2">
              {video.title}
            </h2>

            <p className="text-white/75 text-xs leading-relaxed line-clamp-2">
              {video.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PitchPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    const observers: IntersectionObserver[] = [];

    for (const [i, child] of children.entries()) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveIndex(i);
          }
        },
        { threshold: 0.6, root: container },
      );
      obs.observe(child);
      observers.push(obs);
    }

    return () => {
      for (const obs of observers) {
        obs.disconnect();
      }
    };
  }, []);

  const scrollTo = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[i] as HTMLElement;
    if (child) child.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative h-full">
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none"
        style={{ background: "rgba(0,0,0,0.55)" }}
      >
        <span className="text-white text-[11px] font-semibold">
          {activeIndex + 1} / {pitchVideos.length}
        </span>
      </div>

      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 py-2">
        {pitchVideos.map((_, i) => (
          <button
            key={pitchVideos[i].id}
            type="button"
            onClick={() => scrollTo(i)}
            data-ocid={`pitch.dot.button.${i + 1}`}
            className="rounded-full transition-all duration-300 mx-auto block"
            style={{
              width: "5px",
              height: i === activeIndex ? "20px" : "5px",
              background:
                i === activeIndex
                  ? "oklch(0.65 0.18 28)"
                  : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Go to pitch ${i + 1}`}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="h-full overflow-y-scroll"
        style={{
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        data-ocid="pitch.list"
      >
        {pitchVideos.map((video, i) => (
          <PitchCard
            key={video.id}
            video={video}
            index={i}
            isActive={activeIndex === i}
          />
        ))}
      </div>
    </div>
  );
}
