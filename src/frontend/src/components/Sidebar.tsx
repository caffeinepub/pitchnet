import {
  BookOpen,
  Clapperboard,
  Home,
  MessageCircle,
  Radio,
  ShoppingBag,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useNav } from "../App";
import type { Page } from "../types";

const navItems: {
  id: Page;
  label: string;
  icon: React.FC<{ size?: number; className?: string }>;
}[] = [
  { id: "feed", label: "Feed", icon: Home },
  { id: "stories", label: "Stories", icon: BookOpen },
  { id: "pitch", label: "Pitch", icon: Clapperboard },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
  { id: "live", label: "Live", icon: Radio },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
];

export default function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const { currentPage, navigate } = useNav();

  if (mobile) {
    return (
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] border-t border-white/5 glass-dark"
        aria-label="Mobile navigation"
      >
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = currentPage === id;
          return (
            <button
              type="button"
              key={id}
              onClick={() => navigate(id)}
              data-ocid={`nav.${id}.link`}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 ${
                active
                  ? "text-pn-gold"
                  : "text-pn-muted hover:text-pn-text hover:bg-white/10 hover:scale-105"
              }`}
              aria-label={label}
            >
              <Icon size={18} />
              <span className="text-[9px] font-medium tracking-wide">
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-60 shrink-0 glass-dark">
      {/* Logo */}
      <button
        type="button"
        onClick={() => navigate("landing")}
        className="flex items-center gap-3 px-5 py-5 border-b border-white/5 hover:opacity-80 transition-opacity w-full text-left"
        data-ocid="nav.landing.link"
      >
        <img
          src="/assets/generated/elevin-logo-transparent.dim_200x200.png"
          alt="Elevin logo"
          className="w-10 h-10 rounded-2xl shrink-0 shadow-lg object-cover"
        />
        <div>
          <div className="font-semibold text-pn-text text-base leading-tight tracking-[0.02em]">
            Elevin
          </div>
          <div className="text-pn-meta text-[10px] font-medium tracking-widest uppercase opacity-60">
            <span style={{ color: "white" }}>11</span>In
          </div>
        </div>
      </button>

      {/* Nav items */}
      <nav
        className="flex-1 px-3 py-4 space-y-0.5"
        aria-label="Primary navigation"
      >
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = currentPage === id;
          return (
            <motion.div
              key={id}
              whileHover={{ x: active ? 0 : 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <button
                type="button"
                onClick={() => navigate(id)}
                data-ocid={`nav.${id}.link`}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "text-white border-l-2 border-pn-teal pl-[10px]"
                    : "text-pn-muted hover:text-pn-text hover:bg-[oklch(0.43_0.065_207_/_0.25)] border-l-2 border-transparent hover:border-pn-teal pl-[10px]"
                }`}
                style={
                  active ? { background: "oklch(0.35 0.08 207 / 0.75)" } : {}
                }
              >
                <Icon
                  size={17}
                  className={`transition-opacity duration-200 ${
                    active
                      ? "opacity-100"
                      : "opacity-60 group-hover:opacity-100"
                  }`}
                />
                {label}
              </button>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/5">
        <p className="text-pn-meta text-[10px] leading-relaxed opacity-50">
          &copy; {new Date().getFullYear()} Elevin
          <br />
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pn-gold transition-colors"
          >
            Built with caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );
}
