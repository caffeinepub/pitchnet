import { Bell, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useNav } from "../App";
import { CURRENT_USER_ID, profiles } from "../data/mockData";

export default function TopHeader() {
  const [query, setQuery] = useState("");
  const { viewProfile } = useNav();
  const me = profiles.find((p) => p.id === CURRENT_USER_ID)!;

  return (
    <header
      className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-pn-border z-10"
      style={{ background: "oklch(0.17 0.045 214)" }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-pn-meta"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people, pitches, opportunities…"
          data-ocid="header.search_input"
          className="w-full pl-8 pr-4 py-2 rounded-full text-sm text-pn-text placeholder-pn-meta border border-pn-border focus:outline-none focus:border-pn-teal transition-colors"
          style={{ background: "oklch(0.13 0.04 215)" }}
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          type="button"
          className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-pn-muted hover:text-pn-text"
          aria-label="Notifications"
          data-ocid="header.bell.button"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button
          type="button"
          className="p-2 rounded-full hover:bg-white/5 transition-colors text-pn-muted hover:text-pn-text"
          aria-label="Settings"
          data-ocid="header.settings.button"
        >
          <Settings size={18} />
        </button>
        <button
          type="button"
          onClick={() => viewProfile(me.id)}
          data-ocid="header.profile.button"
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-white/5 transition-colors"
        >
          <img
            src={me.avatarUrl}
            alt={me.displayName}
            className="w-7 h-7 rounded-full border border-pn-gold"
          />
          <span className="text-xs font-medium text-pn-text hidden sm:block">
            {me.displayName}
          </span>
        </button>
      </div>
    </header>
  );
}
