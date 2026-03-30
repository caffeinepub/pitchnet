import { Toaster } from "@/components/ui/sonner";
import { createContext, useContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import FeedPage from "./pages/FeedPage";
import LivePage from "./pages/LivePage";
import MarketplacePage from "./pages/MarketplacePage";
import MessagesPage from "./pages/MessagesPage";
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
  currentPage: "feed",
  navigate: () => {},
  profileId: "u1",
  viewProfile: () => {},
});

export const useNav = () => useContext(NavContext);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("feed");
  const [profileId, setProfileId] = useState("u1");

  const navigate = (p: Page) => setCurrentPage(p);

  const viewProfile = (id: string) => {
    setProfileId(id);
    setCurrentPage("profile");
  };

  const pageMap: Record<Page, React.ReactNode> = {
    feed: <FeedPage />,
    stories: <StoriesPage />,
    marketplace: <MarketplacePage />,
    live: <LivePage />,
    messages: <MessagesPage />,
    profile: <ProfilePage profileId={profileId} />,
  };

  return (
    <NavContext.Provider
      value={{ currentPage, navigate, profileId, viewProfile }}
    >
      <div className="flex h-screen bg-pn-bg overflow-hidden">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TopHeader />
          <main
            className="flex-1 overflow-y-auto pb-20 md:pb-0 pn-bg-pattern"
            style={{ background: "oklch(0.26 0.07 210)" }}
          >
            <div
              key={currentPage}
              className="animate-fade-in-up"
              style={{ animationDuration: "0.35s" }}
            >
              {pageMap[currentPage]}
            </div>
          </main>
        </div>

        {/* Mobile bottom nav */}
        <Sidebar mobile />
      </div>
      <Toaster />
    </NavContext.Provider>
  );
}
