import { Search, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNav } from "../App";
import { CURRENT_USER_ID, messages, profiles } from "../data/mockData";
import type { Message } from "../types";

export default function MessagesPage() {
  const { viewProfile } = useNav();
  const [activeUserId, setActiveUserId] = useState("u2");
  const [allMessages, setAllMessages] = useState<Message[]>(messages);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const partners = Array.from(
    new Set(
      messages.map((m) =>
        m.fromUserId === CURRENT_USER_ID ? m.toUserId : m.fromUserId,
      ),
    ),
  );

  const getThread = (partnerId: string) =>
    allMessages.filter(
      (m) =>
        (m.fromUserId === CURRENT_USER_ID && m.toUserId === partnerId) ||
        (m.fromUserId === partnerId && m.toUserId === CURRENT_USER_ID),
    );

  const getLastMessage = (partnerId: string) => {
    const thread = getThread(partnerId);
    return thread[thread.length - 1];
  };

  const thread = getThread(activeUserId);
  const activeProfile = profiles.find((p) => p.id === activeUserId);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      fromUserId: CURRENT_USER_ID,
      toUserId: activeUserId,
      content: text,
      sentAt: "Just now",
      isRead: false,
    };
    setAllMessages((prev) => [...prev, newMsg]);
    setDraft("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="flex h-[calc(100vh-57px)]" data-ocid="messages.page">
      {/* Conversation list — stays dark */}
      <aside
        className="w-64 shrink-0 border-r border-pn-border flex flex-col"
        style={{ background: "oklch(0.17 0.045 214)" }}
      >
        <div className="px-3 py-3 border-b border-pn-border">
          <h2 className="text-sm font-bold text-pn-text mb-2">Messages</h2>
          <div className="relative">
            <Search
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-pn-meta"
            />
            <input
              type="search"
              placeholder="Search conversations…"
              data-ocid="messages.search_input"
              className="w-full pl-7 pr-3 py-1.5 rounded-lg text-xs text-pn-text placeholder-pn-meta border border-pn-border focus:outline-none focus:border-pn-teal transition-colors"
              style={{ background: "oklch(0.13 0.04 215)" }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {partners.map((partnerId, i) => {
            const partner = profiles.find((p) => p.id === partnerId);
            const last = getLastMessage(partnerId);
            const isActive = partnerId === activeUserId;
            if (!partner) return null;
            return (
              <button
                type="button"
                key={partnerId}
                onClick={() => setActiveUserId(partnerId)}
                data-ocid={`messages.conversation.item.${i + 1}`}
                className={`w-full flex items-center gap-2.5 px-3 py-3 text-left transition-colors ${
                  isActive ? "bg-pn-teal/20" : "hover:bg-white/5"
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={partner.avatarUrl}
                    alt={partner.displayName}
                    className="w-9 h-9 rounded-full"
                  />
                  {!last?.isRead && last?.toUserId === CURRENT_USER_ID && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-pn-gold border border-pn-surface" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <span className="text-pn-text text-xs font-semibold truncate">
                      {partner.displayName}
                    </span>
                    <span className="text-pn-meta text-[10px] shrink-0 ml-1">
                      {last?.sentAt}
                    </span>
                  </div>
                  <p className="text-pn-muted text-[10px] truncate">
                    {last?.fromUserId === CURRENT_USER_ID ? "You: " : ""}
                    {last?.content}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Chat thread */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Thread header — white */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b border-pn-card-border shrink-0"
          style={{ background: "#ffffff" }}
        >
          <button
            type="button"
            onClick={() => viewProfile(activeProfile?.id ?? "")}
            className="shrink-0"
          >
            <img
              src={activeProfile?.avatarUrl}
              alt={activeProfile?.displayName}
              className="w-9 h-9 rounded-full border border-pn-gold"
            />
          </button>
          <div>
            <button
              type="button"
              onClick={() => viewProfile(activeProfile?.id ?? "")}
              className="text-slate-800 text-sm font-semibold hover:text-pn-teal transition-colors"
            >
              {activeProfile?.displayName}
            </button>
            <div className="text-slate-400 text-xs">{activeProfile?.role}</div>
          </div>
        </div>

        {/* Messages background — very light */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3"
          style={{ background: "#f8fafc" }}
        >
          {thread.map((msg, i) => {
            const isMe = msg.fromUserId === CURRENT_USER_ID;
            return (
              <div
                key={msg.id}
                data-ocid={`messages.bubble.item.${i + 1}`}
                className={`flex items-end gap-2 ${
                  isMe
                    ? "flex-row-reverse animate-slide-right"
                    : "flex-row animate-slide-left"
                }`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {!isMe && (
                  <img
                    src={activeProfile?.avatarUrl}
                    alt=""
                    className="w-7 h-7 rounded-full shrink-0"
                  />
                )}
                <div
                  className={`max-w-[70%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "rounded-br-sm text-white"
                      : "rounded-bl-sm text-slate-800"
                  }`}
                  style={{
                    background: isMe ? "oklch(0.43 0.065 207)" : "#e2e8f0",
                  }}
                >
                  {msg.content}
                  <div
                    className={`text-[10px] mt-1 ${
                      isMe ? "text-right text-white/70" : "text-slate-500"
                    }`}
                  >
                    {msg.sentAt}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Message input bar — white */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-t border-pn-card-border shrink-0"
          style={{ background: "#ffffff" }}
        >
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message…"
            data-ocid="messages.input"
            className="flex-1 px-4 py-2.5 rounded-full text-sm text-slate-800 placeholder-slate-400 border border-pn-card-border focus:outline-none focus:border-pn-teal transition-colors"
            style={{ background: "#f1f5f9" }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!draft.trim()}
            data-ocid="messages.send.button"
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 disabled:opacity-40"
            style={{ background: "oklch(0.75 0.115 75)" }}
          >
            <Send size={15} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
