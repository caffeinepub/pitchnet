import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Search, Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNav } from "../App";
import {
  CURRENT_USER_ID,
  marketplaceListings,
  posts,
  profiles,
} from "../data/mockData";

export default function TopHeader() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [displayName, setDisplayName] = useState("Alex Rivera");
  const [bio, setBio] = useState(
    "Serial entrepreneur with 3 exits. Building TechVentures.",
  );

  const { navigate, viewProfile } = useNav();
  const me = profiles.find((p) => p.id === CURRENT_USER_ID)!;
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.toLowerCase().trim();

  const filteredPeople = q
    ? profiles
        .filter(
          (p) =>
            p.displayName.toLowerCase().includes(q) ||
            p.headline.toLowerCase().includes(q),
        )
        .slice(0, 3)
    : [];

  const filteredPosts = q
    ? posts.filter((p) => p.content.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const filteredListings = q
    ? marketplaceListings
        .filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.category.toLowerCase().includes(q),
        )
        .slice(0, 3)
    : [];

  const hasResults =
    filteredPeople.length > 0 ||
    filteredPosts.length > 0 ||
    filteredListings.length > 0;

  useEffect(() => {
    if (q) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [q]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <header
      className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-pn-border z-30"
      style={{ background: "oklch(0.17 0.045 214)" }}
    >
      <div className="flex-1 max-w-md relative" ref={searchRef}>
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-pn-meta z-10 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => q && setShowDropdown(true)}
          placeholder="Search people, pitches, opportunities…"
          data-ocid="header.search_input"
          className="w-full pl-8 pr-8 py-2 rounded-full text-sm text-pn-text placeholder-pn-meta border border-pn-border focus:outline-none focus:border-pn-teal transition-colors"
          style={{ background: "oklch(0.13 0.04 215)" }}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-pn-meta hover:text-pn-text transition-colors z-10"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              data-ocid="header.search.dropdown"
              className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-pn-border overflow-hidden shadow-2xl z-50"
              style={{ background: "oklch(0.15 0.045 214)" }}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {!hasResults ? (
                <div className="px-4 py-5 text-center">
                  <p className="text-pn-muted text-sm">
                    No results for “{query}”
                  </p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto py-2">
                  {filteredPeople.length > 0 && (
                    <div>
                      <div className="px-4 py-1.5">
                        <span className="text-[10px] font-bold text-pn-meta uppercase tracking-wider">
                          People
                        </span>
                      </div>
                      {filteredPeople.map((person) => (
                        <button
                          type="button"
                          key={person.id}
                          data-ocid="search.person.button"
                          onClick={() => {
                            viewProfile(person.id);
                            setQuery("");
                            setShowDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
                        >
                          <img
                            src={person.avatarUrl}
                            alt={person.displayName}
                            className="w-8 h-8 rounded-full object-cover object-top shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-pn-text text-sm font-semibold truncate">
                              {person.displayName}
                            </div>
                            <div className="text-pn-muted text-xs truncate">
                              {person.headline}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredPosts.length > 0 && (
                    <div>
                      {filteredPeople.length > 0 && (
                        <div className="h-px mx-4 my-1 bg-white/5" />
                      )}
                      <div className="px-4 py-1.5">
                        <span className="text-[10px] font-bold text-pn-meta uppercase tracking-wider">
                          Posts
                        </span>
                      </div>
                      {filteredPosts.map((post) => {
                        const author = profiles.find(
                          (p) => p.id === post.authorId,
                        );
                        return (
                          <button
                            type="button"
                            key={post.id}
                            data-ocid="search.post.button"
                            onClick={() => {
                              navigate("feed");
                              setQuery("");
                              setShowDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
                          >
                            <img
                              src={author?.avatarUrl}
                              alt={author?.displayName}
                              className="w-7 h-7 rounded-full object-cover object-top shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-pn-text text-xs font-medium truncate">
                                {author?.displayName}
                              </div>
                              <div className="text-pn-muted text-xs truncate">
                                {post.content.slice(0, 60)}…
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {filteredListings.length > 0 && (
                    <div>
                      {(filteredPeople.length > 0 ||
                        filteredPosts.length > 0) && (
                        <div className="h-px mx-4 my-1 bg-white/5" />
                      )}
                      <div className="px-4 py-1.5">
                        <span className="text-[10px] font-bold text-pn-meta uppercase tracking-wider">
                          Listings
                        </span>
                      </div>
                      {filteredListings.map((listing) => (
                        <button
                          type="button"
                          key={listing.id}
                          data-ocid="search.listing.button"
                          onClick={() => {
                            navigate("marketplace");
                            setQuery("");
                            setShowDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold text-white"
                            style={{
                              background: "oklch(0.43 0.065 207 / 0.5)",
                            }}
                          >
                            {listing.category[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-pn-text text-xs font-medium truncate">
                              {listing.title}
                            </div>
                            <div className="text-pn-muted text-xs">
                              {listing.category} · $
                              {(listing.budgetMin / 1000).toFixed(0)}k–$
                              {(listing.budgetMax / 1000).toFixed(0)}k
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
          onClick={() => setSettingsOpen(true)}
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

      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent
          side="right"
          className="w-[340px] sm:w-[400px] p-0 border-pn-border"
          style={{ background: "oklch(0.17 0.045 214)", color: "white" }}
          data-ocid="settings.sheet"
        >
          <SheetHeader className="px-6 py-5 border-b border-white/10">
            <SheetTitle className="text-white text-lg font-bold">
              Settings
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-72px)]">
            <div className="px-6 py-4 space-y-6">
              <section data-ocid="settings.appearance.panel">
                <h3 className="text-pn-muted text-[11px] font-bold uppercase tracking-wider mb-3">
                  Appearance
                </h3>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-pn-text text-sm font-medium">
                      Dark Mode
                    </Label>
                    <p className="text-pn-muted text-xs mt-0.5">
                      Use dark theme across the app
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    data-ocid="settings.dark_mode.switch"
                  />
                </div>
              </section>

              <Separator className="bg-white/10" />

              <section data-ocid="settings.notifications.panel">
                <h3 className="text-pn-muted text-[11px] font-bold uppercase tracking-wider mb-3">
                  Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-pn-text text-sm font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-pn-muted text-xs mt-0.5">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifs}
                      onCheckedChange={setEmailNotifs}
                      data-ocid="settings.email_notifs.switch"
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-pn-text text-sm font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-pn-muted text-xs mt-0.5">
                        Browser &amp; mobile push alerts
                      </p>
                    </div>
                    <Switch
                      checked={pushNotifs}
                      onCheckedChange={setPushNotifs}
                      data-ocid="settings.push_notifs.switch"
                    />
                  </div>
                </div>
              </section>

              <Separator className="bg-white/10" />

              <section data-ocid="settings.privacy.panel">
                <h3 className="text-pn-muted text-[11px] font-bold uppercase tracking-wider mb-3">
                  Privacy
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-pn-text text-sm font-medium">
                        Public Profile
                      </Label>
                      <p className="text-pn-muted text-xs mt-0.5">
                        Allow anyone to view your profile
                      </p>
                    </div>
                    <Switch
                      checked={publicProfile}
                      onCheckedChange={setPublicProfile}
                      data-ocid="settings.public_profile.switch"
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-pn-text text-sm font-medium">
                        Show Online Status
                      </Label>
                      <p className="text-pn-muted text-xs mt-0.5">
                        Let connections see when you&apos;re active
                      </p>
                    </div>
                    <Switch
                      checked={showOnline}
                      onCheckedChange={setShowOnline}
                      data-ocid="settings.show_online.switch"
                    />
                  </div>
                </div>
              </section>

              <Separator className="bg-white/10" />

              <section data-ocid="settings.account.panel">
                <h3 className="text-pn-muted text-[11px] font-bold uppercase tracking-wider mb-3">
                  Account
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="settings-name"
                      className="text-pn-text text-sm font-medium mb-1.5 block"
                    >
                      Display Name
                    </Label>
                    <Input
                      id="settings-name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      data-ocid="settings.name.input"
                      className="bg-white/5 border-white/15 text-pn-text placeholder-pn-muted focus:border-pn-teal"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="settings-bio"
                      className="text-pn-text text-sm font-medium mb-1.5 block"
                    >
                      Bio
                    </Label>
                    <Textarea
                      id="settings-bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      data-ocid="settings.bio.textarea"
                      className="bg-white/5 border-white/15 text-pn-text placeholder-pn-muted focus:border-pn-teal resize-none"
                    />
                  </div>
                  <Button
                    data-ocid="settings.save.button"
                    className="w-full font-semibold"
                    style={{
                      background: "oklch(0.65 0.18 28)",
                      color: "white",
                    }}
                    onClick={() => setSettingsOpen(false)}
                  >
                    Save Changes
                  </Button>
                </div>
              </section>

              <Separator className="bg-white/10" />

              <section data-ocid="settings.about.panel">
                <h3 className="text-pn-muted text-[11px] font-bold uppercase tracking-wider mb-3">
                  About
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-pn-muted">App</span>
                    <span className="text-pn-text font-medium">Elevin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pn-muted">Version</span>
                    <span className="text-pn-text font-medium">v2.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pn-muted">Copyright</span>
                    <span className="text-pn-text font-medium">
                      © 2026 Elevin Inc.
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </header>
  );
}
