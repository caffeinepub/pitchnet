import { motion } from "motion/react";
import { useNav } from "../App";
import AnimatedBackground from "../components/AnimatedBackground";

const features = [
  {
    id: "pitch",
    emoji: "📣",
    title: "Pitch Stories",
    desc: "Share your vision in engaging story format. Captivate investors and partners with visual, swipe-through pitches.",
  },
  {
    id: "network",
    emoji: "🤝",
    title: "Smart Networking",
    desc: "Connect with investors, founders & top talent. Algorithms surface the right people at the right moment.",
  },
  {
    id: "marketplace",
    emoji: "💼",
    title: "Freelance Marketplace",
    desc: "Discover and post top-tier opportunities. Find your next project or the perfect collaborator.",
  },
  {
    id: "live",
    emoji: "🔴",
    title: "Live Sessions",
    desc: "Real-time Q&A and pitch presentations. Engage your audience live and leave a lasting impression.",
  },
  {
    id: "messages",
    emoji: "💬",
    title: "Direct Messaging",
    desc: "Chat with your network instantly. Smart inboxes keep important conversations front and centre.",
  },
  {
    id: "achievements",
    emoji: "🏆",
    title: "Achievement Showcase",
    desc: "Celebrate milestones that matter. Build a living portfolio of your professional wins.",
  },
];

const stats = [
  { id: "professionals", value: "10,000+", label: "Professionals" },
  { id: "pitches", value: "500+", label: "Active Pitches" },
  { id: "sessions", value: "200+", label: "Live Sessions Monthly" },
];

const floatingCards = [
  {
    id: "seed",
    top: "15%",
    left: "5%",
    right: undefined as string | undefined,
    rotate: "-6deg",
    delay: 0,
    text: "🚀 Seed Round Closed",
    sub: "$2M · TechVentures",
  },
  {
    id: "product",
    top: "20%",
    left: undefined as string | undefined,
    right: "4%",
    rotate: "5deg",
    delay: 0.2,
    text: "🏆 Product of the Week",
    sub: "ProductHunt · #1",
  },
  {
    id: "partner",
    top: "62%",
    left: "3%",
    right: undefined as string | undefined,
    rotate: "4deg",
    delay: 0.4,
    text: "🤝 Partnership Signed",
    sub: "Series A · $8M",
  },
  {
    id: "pitch-live",
    top: "58%",
    left: undefined as string | undefined,
    right: "3%",
    rotate: "-5deg",
    delay: 0.6,
    text: "💡 Live Pitch Tonight",
    sub: "100 attending · 7 PM",
  },
];

export default function LandingPage() {
  const { navigate } = useNav();

  return (
    <div
      className="min-h-screen overflow-x-hidden relative"
      style={{ background: "oklch(0.26 0.07 210)" }}
    >
      {/* ── Animated Canvas Background ── */}
      <AnimatedBackground />

      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{
          background: "oklch(0.19 0.055 212 / 0.88)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid oklch(0.32 0.06 210 / 0.35)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/elevin-logo-transparent.dim_200x200.png"
            alt="Elevin"
            className="w-9 h-9 rounded-xl object-cover shadow-md"
          />
          <div>
            <span className="font-bold text-white text-lg tracking-tight leading-none block">
              Elevin
            </span>
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase">
              <span style={{ color: "white" }}>11</span>
              <span style={{ color: "oklch(0.65 0.18 28)" }}>In</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("feed")}
            data-ocid="landing.signin.button"
            className="hidden sm:block text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:bg-white/10"
            style={{ color: "oklch(0.85 0.04 205)" }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => navigate("feed")}
            data-ocid="landing.enter_app.button"
            className="text-sm font-semibold px-5 py-2 rounded-xl text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.65 0.18 28)",
              boxShadow: "0 4px 18px oklch(0.65 0.18 28 / 0.4)",
            }}
          >
            Enter App
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20"
        data-ocid="landing.section"
        style={{ zIndex: 1 }}
      >
        {/* Background blobs — sits above canvas, below content */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "520px",
              height: "520px",
              top: "-120px",
              left: "-160px",
              background: "oklch(0.38 0.09 207 / 0.28)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "400px",
              height: "400px",
              bottom: "-80px",
              right: "-100px",
              background: "oklch(0.55 0.12 28 / 0.18)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "300px",
              height: "300px",
              top: "40%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              background: "oklch(0.72 0.115 75 / 0.08)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Floating cards (desktop only) */}
        {floatingCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: card.delay + 0.8,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="hidden lg:block absolute pointer-events-none"
            style={{
              top: card.top,
              left: card.left,
              right: card.right,
              transform: `rotate(${card.rotate})`,
              zIndex: 2,
            }}
          >
            <div
              className="px-4 py-3 rounded-2xl shadow-2xl text-left"
              style={{
                background: "oklch(0.97 0.01 200)",
                border: "1px solid oklch(0.88 0.03 205)",
                minWidth: "180px",
              }}
            >
              <p className="text-sm font-semibold text-gray-800">{card.text}</p>
              <p className="text-xs text-gray-500 mt-0.5">{card.sub}</p>
            </div>
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.img
            src="/assets/generated/elevin-logo-transparent.dim_200x200.png"
            alt="Elevin"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-20 h-20 rounded-3xl shadow-2xl object-cover mb-6"
            style={{ boxShadow: "0 0 40px oklch(0.65 0.18 28 / 0.45)" }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold text-white tracking-tight mb-3"
            style={{ textShadow: "0 4px 32px oklch(0.38 0.09 207 / 0.5)" }}
          >
            Elevin
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-xl md:text-2xl font-semibold mb-3"
            style={{ color: "oklch(0.75 0.115 75)" }}
          >
            Where Professionals Pitch, Connect &amp; Grow
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-base md:text-lg max-w-xl mb-10"
            style={{ color: "oklch(0.72 0.04 205)" }}
          >
            The professional network reimagined — visual, vibrant, and alive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => navigate("feed")}
              data-ocid="landing.hero.primary_button"
              className="text-base font-bold px-8 py-3.5 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.65 0.18 28)",
                boxShadow: "0 6px 28px oklch(0.65 0.18 28 / 0.45)",
              }}
            >
              Enter App →
            </button>
            <a
              href="#features"
              data-ocid="landing.learn_more.button"
              className="text-base font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 hover:bg-white/10 border"
              style={{
                color: "oklch(0.88 0.03 205)",
                borderColor: "oklch(0.45 0.065 207 / 0.6)",
              }}
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.58 0.04 205)" }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.58 0.04 205), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section
        className="relative z-10 py-10 px-6"
        style={{
          background: "oklch(0.22 0.06 211 / 0.9)",
          borderTop: "1px solid oklch(0.32 0.06 210 / 0.4)",
          borderBottom: "1px solid oklch(0.32 0.06 210 / 0.4)",
        }}
        data-ocid="landing.stats.section"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {stats.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "oklch(0.75 0.115 75)" }}
              >
                {s.value}
              </div>
              <div
                className="text-sm mt-1 font-medium"
                style={{ color: "oklch(0.68 0.04 205)" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="relative z-10 py-20 px-6"
        data-ocid="landing.features.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Everything You Need to Thrive
            </h2>
            <p
              className="text-base max-w-lg mx-auto"
              style={{ color: "oklch(0.68 0.04 205)" }}
            >
              Elevin packs a full professional toolkit into one beautifully
              designed platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, idx) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl p-6 cursor-default"
                style={{
                  background: "oklch(0.97 0.01 200)",
                  border: "1px solid oklch(0.88 0.03 205 / 0.5)",
                  boxShadow: "0 4px 24px oklch(0.15 0.045 214 / 0.25)",
                }}
                data-ocid={`landing.features.item.${idx + 1}`}
              >
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="text-base font-bold text-gray-800 mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="relative z-10 py-24 px-6 text-center"
        style={{
          background: "oklch(0.22 0.06 211 / 0.85)",
          borderTop: "1px solid oklch(0.32 0.06 210 / 0.4)",
        }}
        data-ocid="landing.cta.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase"
            style={{
              background: "oklch(0.65 0.18 28 / 0.15)",
              color: "oklch(0.65 0.18 28)",
              border: "1px solid oklch(0.65 0.18 28 / 0.3)",
            }}
          >
            Join today — it&apos;s free
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to Elevate
            <br />
            Your Career?
          </h2>
          <p
            className="text-lg mb-10"
            style={{ color: "oklch(0.68 0.04 205)" }}
          >
            Thousands of professionals are already pitching, connecting, and
            growing on Elevin.
          </p>
          <button
            type="button"
            onClick={() => navigate("feed")}
            data-ocid="landing.cta.primary_button"
            className="inline-flex items-center gap-2 text-lg font-bold px-10 py-4 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.65 0.18 28)",
              boxShadow: "0 8px 40px oklch(0.65 0.18 28 / 0.5)",
            }}
          >
            Join Elevin Today ✦
          </button>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 py-8 px-6 text-center"
        style={{ borderTop: "1px solid oklch(0.32 0.06 210 / 0.3)" }}
      >
        <p className="text-sm" style={{ color: "oklch(0.5 0.035 205)" }}>
          &copy; {new Date().getFullYear()} Elevin &middot; Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
