import { Award, Heart, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNav } from "../App";
import { profiles } from "../data/mockData";
import type { Post } from "../types";

interface Props {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: Props) {
  const { viewProfile } = useNav();
  const author = profiles.find((p) => p.id === post.authorId);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [bouncing, setBouncing] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);
  };

  const formatCount = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  if (!author) return null;

  return (
    <div
      ref={ref}
      data-ocid={`feed.post.item.${index + 1}`}
      className={`rounded-3xl border overflow-hidden transition-all duration-300 ${
        post.isAchievement
          ? "gold-glow-border border-pn-gold/50 shadow-md"
          : "border-black/5 shadow-sm hover:shadow-xl hover:shadow-black/10"
      } ${visible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
      style={{
        background: "#ffffff",
        animationDelay: `${index * 60}ms`,
        transform: visible ? undefined : "translateY(20px)",
      }}
    >
      {/* Achievement badge */}
      {post.isAchievement && (
        <div
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold"
          style={{
            background: "oklch(0.95 0.04 75)",
            color: "oklch(0.45 0.115 65)",
          }}
        >
          <Award size={13} />
          Achievement Unlocked
        </div>
      )}

      {/* Author header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => viewProfile(author.id)}
          className="shrink-0"
        >
          <img
            src={author.avatarUrl}
            alt={author.displayName}
            className="w-11 h-11 rounded-full object-cover object-top ring-2 ring-white ring-offset-1 ring-offset-white hover:opacity-80 transition-opacity shadow-sm"
          />
        </button>
        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={() => viewProfile(author.id)}
            className="font-semibold text-slate-800 text-sm hover:text-pn-teal transition-colors block"
          >
            {author.displayName}
          </button>
          <div className="text-slate-400 text-xs truncate">
            {author.role} &bull; {post.createdAt}
          </div>
        </div>
        <span
          className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
          style={{
            color: "oklch(0.50 0.115 75)",
            borderColor: "oklch(0.75 0.115 75 / 0.3)",
            background: "oklch(0.75 0.115 75 / 0.07)",
          }}
        >
          {author.role}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line line-clamp-5 font-[450]">
          {post.content}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  color: "oklch(0.38 0.065 207)",
                  background: "oklch(0.43 0.065 207 / 0.10)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      {post.mediaUrl && (
        <div className="px-4 pb-3">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={post.mediaUrl}
              alt="Post media"
              className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Engagement counts */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-black/5 text-slate-400 text-xs">
        <span>{formatCount(likeCount)} likes</span>
        <span>{formatCount(post.commentCount)} comments</span>
      </div>

      {/* Action row */}
      <div className="flex items-center px-2 py-1.5 border-t border-black/5">
        <button
          type="button"
          onClick={handleLike}
          data-ocid={`feed.post.like.button.${index + 1}`}
          className={`flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-xl text-xs font-medium transition-all duration-150 hover:bg-slate-50 ${
            liked ? "text-red-500" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Heart
            size={15}
            className={`transition-all ${
              bouncing ? "animate-like-bounce" : ""
            }`}
            fill={liked ? "currentColor" : "none"}
          />
          Like
        </button>
        <button
          type="button"
          data-ocid={`feed.post.comment.button.${index + 1}`}
          className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-150"
        >
          <MessageCircle size={15} />
          Comment
        </button>
        <button
          type="button"
          data-ocid={`feed.post.share.button.${index + 1}`}
          className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-150"
        >
          <Share2 size={15} />
          Share
        </button>
      </div>
    </div>
  );
}
