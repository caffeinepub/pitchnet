import { Calendar, Clock, Mic, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import { liveSessions, profiles } from "../data/mockData";

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
}

const REACTION_EMOJIS = ["💼", "📈", "🌍", "🚀", "👏", "⭐"];

export default function LivePage() {
  const { viewProfile } = useNav();
  const [sessions, setSessions] = useState(liveSessions);
  const [floaters, setFloaters] = useState<FloatingEmoji[]>([]);
  const [joined, setJoined] = useState<Set<string>>(new Set());
  let emojiId = 0;

  const launchEmojis = () => {
    const newEmojis: FloatingEmoji[] = Array.from({ length: 5 }, () => ({
      id: ++emojiId,
      emoji:
        REACTION_EMOJIS[Math.floor(Math.random() * REACTION_EMOJIS.length)],
      x: 20 + Math.random() * 60,
    }));
    setFloaters((prev) => [...prev, ...newEmojis]);
    setTimeout(() => {
      setFloaters((prev) =>
        prev.filter((f) => !newEmojis.find((n) => n.id === f.id)),
      );
    }, 2200);
  };

  const handleJoin = (sessionId: string, title: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, participantCount: s.participantCount + 1 }
          : s,
      ),
    );
    setJoined((s) => new Set([...s, sessionId]));
    launchEmojis();
    toast.success(`🎤 Joined "${title}"!`, {
      description: "You're now in the session. Welcome!",
    });
  };

  const liveSess = sessions.filter((s) => s.isLive);
  const upcomingSess = sessions.filter((s) => !s.isLive);

  return (
    <div className="p-4 max-w-5xl mx-auto relative" data-ocid="live.page">
      {/* Floating emoji reactions */}
      <div className="fixed bottom-24 right-8 pointer-events-none z-40">
        {floaters.map((f) => (
          <span
            key={f.id}
            className="absolute text-2xl animate-float-emoji"
            style={{ left: `${f.x}%`, bottom: 0 }}
          >
            {f.emoji}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-pn-text">
          Live &amp; Upcoming Sessions
        </h1>
        <p className="text-pn-muted text-sm mt-1">
          Industry Q&amp;As, startup panels, and expert masterclasses
        </p>
      </div>

      {/* LIVE NOW section */}
      {liveSess.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-live" />
            <h2 className="text-base font-bold text-pn-text">LIVE NOW</h2>
          </div>
          {liveSess.map((session) => {
            const host = profiles.find((p) => p.id === session.hostId);
            const isJoined = joined.has(session.id);
            return (
              <div
                key={session.id}
                data-ocid={"live.session.item.1"}
                className="rounded-2xl border-2 overflow-hidden shadow-card"
                style={{
                  background: "#ffffff",
                  borderColor: "oklch(0.65 0.22 22 / 0.5)",
                  boxShadow:
                    "0 0 24px oklch(0.65 0.22 22 / 0.12), 0 4px 24px rgba(0,0,0,0.08)",
                }}
              >
                <div className="relative">
                  <img
                    src={session.thumbnailUrl}
                    alt={session.title}
                    className="w-full h-48 object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95) 100%)",
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
                    LIVE
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                    <Users size={11} />{" "}
                    {session.participantCount.toLocaleString()} watching
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <h3 className="text-slate-800 text-lg font-bold mt-2 mb-1 leading-snug">
                    {session.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                    {session.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => viewProfile(host?.id ?? "")}
                      className="shrink-0"
                    >
                      <img
                        src={host?.avatarUrl}
                        alt={host?.displayName}
                        className="w-10 h-10 rounded-full border-2"
                        style={{ borderColor: "oklch(0.65 0.22 22 / 0.6)" }}
                      />
                    </button>
                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => viewProfile(host?.id ?? "")}
                        className="text-slate-800 text-sm font-semibold hover:text-pn-teal transition-colors"
                      >
                        {host?.displayName}
                      </button>
                      <div className="text-slate-400 text-xs">
                        {host?.role} &bull; {session.durationMinutes} min
                        session
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleJoin(session.id, session.title)}
                      data-ocid="live.join.button.1"
                      disabled={isJoined}
                      className={`px-5 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${
                        isJoined
                          ? "bg-slate-100 text-slate-400"
                          : "bg-red-500 hover:bg-red-400 text-white"
                      }`}
                    >
                      {isJoined ? "✓ Joined" : "🎤 Join Live"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Upcoming Sessions */}
      <section>
        <h2 className="text-base font-bold text-pn-text mb-4">
          Upcoming Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingSess.map((session, i) => {
            const host = profiles.find((p) => p.id === session.hostId);
            const isJoined = joined.has(session.id);
            return (
              <div
                key={session.id}
                data-ocid={`live.session.item.${i + 2}`}
                className="rounded-2xl border border-pn-card-border overflow-hidden hover:-translate-y-1 hover:border-pn-teal transition-all duration-200 shadow-card"
                style={{ background: "#ffffff" }}
              >
                <div className="relative">
                  <img
                    src={session.thumbnailUrl}
                    alt={session.title}
                    className="w-full h-32 object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.95) 100%)",
                    }}
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-slate-800 text-sm font-bold leading-snug mb-2 line-clamp-2">
                    {session.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                    {session.description}
                  </p>
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                    <Calendar size={11} />
                    <span>{session.scheduledAt}</span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Clock size={11} /> {session.durationMinutes} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => viewProfile(host?.id ?? "")}
                    >
                      <img
                        src={host?.avatarUrl}
                        alt={host?.displayName}
                        className="w-7 h-7 rounded-full"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => viewProfile(host?.id ?? "")}
                      className="text-slate-500 text-xs hover:text-slate-700 transition-colors flex-1"
                    >
                      {host?.displayName}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleJoin(session.id, session.title)}
                      data-ocid={`live.join.button.${i + 2}`}
                      disabled={isJoined}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        isJoined
                          ? "bg-slate-100 text-slate-400"
                          : "text-white hover:opacity-90"
                      }`}
                      style={
                        isJoined ? {} : { background: "oklch(0.75 0.115 75)" }
                      }
                    >
                      {isJoined ? "✓ RSVP'd" : "RSVP"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
