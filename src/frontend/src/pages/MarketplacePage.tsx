import { Briefcase, CheckCircle, Clock, DollarSign, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import { marketplaceListings, profiles } from "../data/mockData";

const categories = ["All", "Development", "Design", "Marketing"];

export default function MarketplacePage() {
  const { viewProfile } = useNav();
  const [activeCategory, setActiveCategory] = useState("All");
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [ripple, setRipple] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? marketplaceListings
      : marketplaceListings.filter((l) => l.category === activeCategory);

  const handleApply = (id: string, title: string) => {
    setRipple(id);
    setTimeout(() => {
      setApplied((s) => new Set([...s, id]));
      setRipple(null);
      toast.success("\u2728 Application submitted!", {
        description: `You applied to "${title}". Good luck!`,
      });
    }, 500);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto" data-ocid="marketplace.page">
      {/* Page header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-pn-text">
          Freelance Marketplace
        </h1>
        <p className="text-pn-muted text-sm mt-1">
          {marketplaceListings.length} open opportunities across design,
          development, and marketing
        </p>
      </motion.div>

      {/* Category filters */}
      <motion.div
        className="flex gap-2 mb-6 flex-wrap"
        data-ocid="marketplace.filter.tab"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
      >
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            data-ocid={`marketplace.${cat.toLowerCase()}.tab`}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "text-white"
                : "text-slate-500 border border-slate-200 bg-white hover:border-pn-teal hover:text-slate-700 hover:bg-slate-50"
            }`}
            style={
              activeCategory === cat
                ? { background: "oklch(0.75 0.115 75)" }
                : {}
            }
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Listings grid */}
      {filtered.length === 0 ? (
        <div
          data-ocid="marketplace.empty_state"
          className="text-center py-20 text-pn-muted"
        >
          <Briefcase size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">No listings in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((listing, i) => {
            const poster = profiles.find((p) => p.id === listing.postedById);
            const isApplied = applied.has(listing.id);
            const isRippling = ripple === listing.id;
            return (
              <motion.div
                key={listing.id}
                data-ocid={`marketplace.listing.item.${i + 1}`}
                className="rounded-2xl border border-pn-card-border overflow-hidden flex flex-col shadow-card card-hover"
                style={{ background: "#ffffff" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.38,
                  delay: i * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
              >
                {/* Category badge */}
                <div className="px-4 pt-4 pb-0 flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{
                      background:
                        listing.category === "Design"
                          ? "oklch(0.43 0.065 207 / 0.12)"
                          : listing.category === "Development"
                            ? "oklch(0.43 0.115 250 / 0.12)"
                            : "oklch(0.65 0.12 160 / 0.1)",
                      color:
                        listing.category === "Design"
                          ? "oklch(0.35 0.065 207)"
                          : listing.category === "Development"
                            ? "oklch(0.35 0.115 250)"
                            : "oklch(0.40 0.12 160)",
                    }}
                  >
                    {listing.category}
                  </span>
                  {listing.isOpen && (
                    <span className="text-[10px] font-semibold text-green-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Open
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="px-4 py-3 flex-1">
                  <h3 className="text-slate-800 font-semibold text-sm leading-snug mb-2">
                    {listing.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {listing.brief}
                  </p>
                </div>

                {/* Stats */}
                <div className="px-4 py-3 border-t border-pn-card-border flex items-center gap-4 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <DollarSign size={11} />$
                    {(listing.budgetMin / 1000).toFixed(0)}k\u2013$
                    {(listing.budgetMax / 1000).toFixed(0)}k
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {listing.durationWeeks} weeks
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {listing.applicantCount} applied
                  </span>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => viewProfile(poster?.id ?? "")}
                    className="shrink-0"
                  >
                    <img
                      src={poster?.avatarUrl}
                      alt={poster?.displayName}
                      className="w-7 h-7 rounded-full border border-pn-card-border"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => viewProfile(poster?.id ?? "")}
                    className="text-slate-400 text-xs hover:text-slate-700 transition-colors flex-1 text-left truncate"
                  >
                    {poster?.displayName}
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        !isApplied && handleApply(listing.id, listing.title)
                      }
                      data-ocid={`marketplace.apply.button.${i + 1}`}
                      disabled={isApplied}
                      className={`relative overflow-hidden px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                        isApplied
                          ? "bg-slate-100 text-slate-400 cursor-default"
                          : "text-white hover:opacity-90"
                      }`}
                      style={
                        isApplied ? {} : { background: "oklch(0.75 0.115 75)" }
                      }
                    >
                      {isRippling && (
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.3)",
                            animation: "ripple-out 0.5s ease-out forwards",
                          }}
                        />
                      )}
                      {isApplied ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle size={11} /> Applied
                        </span>
                      ) : (
                        "Apply Now"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
