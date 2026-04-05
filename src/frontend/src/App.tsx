import { Toaster } from "@/components/ui/sonner";
import { createContext, useContext, useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import FeedPage from "./pages/FeedPage";
import LandingPage from "./pages/LandingPage";
import LivePage from "./pages/LivePage";
import MarketplacePage from "./pages/MarketplacePage";
import MessagesPage from "./pages/MessagesPage";
import PitchPage from "./pages/PitchPage";
import ProfilePage from "./pages/ProfilePage";
import StoriesPage from "./pages/StoriesPage";
import type { Page } from "./types";

interface NavCtx {
  currentPage: Page;
  navigate: (p: Page) => void;
  profileId: string;
  viewProfile: (id: string) => void;
}

const NavContext = createContext<NavCtx>({
  currentPage: "landing",
  navigate: () => {},
  profileId: "u1",
  viewProfile: () => {},
});

export const useNav = () => useContext(NavContext);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [profileId, setProfileId] = useState("u1");

  const navigate = (p: Page) => setCurrentPage(p);

  const viewProfile = (id: string) => {
    setProfileId(id);
    setCurrentPage("profile");
  };

  const pageMap: Record<Page, React.ReactNode> = {
    landing: <LandingPage />,
    feed: <FeedPage />,
    stories: <StoriesPage />,
    pitch: <PitchPage />,
    marketplace: <MarketplacePage />,
    live: <LivePage />,
    messages: <MessagesPage />,
    profile: <ProfilePage profileId={profileId} />,
  };

  if (currentPage === "landing") {
    return (
      <NavContext.Provider
        value={{ currentPage, navigate, profileId, viewProfile }}
      >
        <div
          key="landing"
          className="animate-fade-in-up"
          style={{ animationDuration: "0.4s" }}
        >
          <LandingPage />
        </div>
        <Toaster />
      </NavContext.Provider>
    );
  }

  return (
    <NavContext.Provider
      value={{ currentPage, navigate, profileId, viewProfile }}
    >
      <AnimatedBackground intensity="subtle" />

      <div className="flex h-screen bg-pn-bg overflow-hidden relative z-10">
        <Sidebar />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TopHeader />
          <main
            className={`flex-1 pb-20 md:pb-0 pn-bg-pattern ${
              currentPage === "pitch" ? "overflow-hidden" : "overflow-y-auto"
            }`}
            style={{ background: "oklch(0.24 0.07 210 / 0.85)" }}
          >
            <div
              key={currentPage}
              className="animate-fade-in-up h-full"
              style={{ animationDuration: "0.35s" }}
            >
              {pageMap[currentPage]}
            </div>
          </main>
        </div>

        <Sidebar mobile />
      </div>
      <Toaster />
    </NavContext.Provider>
  );
}
