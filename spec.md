# Elevin – Feature Activation & Pitch Tab

## Current State
- App has 6 nav tabs: Feed, Stories, Marketplace, Live, Messages, Profile
- Chat (MessagesPage) is fully functional (send/receive, typing indicator, online status)
- Search input in TopHeader is a UI-only placeholder (no results logic)
- Settings gear in TopHeader is a UI-only placeholder (no panel)
- Feed has no video content — all posts use Unsplash images
- Stories page works (filter, like, viewer) but all media is static images
- No "Pitch" or "Reels" tab exists
- `pitchVideoUrl` field exists on profiles but is empty string for all 5 users
- MessagesPage search input (conversation filter) is a UI placeholder
- No stories exist with video content

## Requested Changes (Diff)

### Add
- **"Pitch" tab** (renamed from what would be a "Reels" tab): new sidebar nav item replacing or added after Stories, vertical full-screen short-video reel experience. Videos cover: new products, innovative ideas, domain models/concepts across tech, health, finance, sustainability, education domains.
- **Pitch video data**: 8–10 mock pitch video entries in mockData.ts using real royalty-free video embed URLs (Pixabay/Pexels video URLs or YouTube embeds via iframe — use reliable Pixabay video direct URLs)
- **PitchPage component** (`src/frontend/src/pages/PitchPage.tsx`): TikTok/Instagram Reels-style vertical scroll feed. Each card is full-height, shows video (autoplay muted loop), overlaid with: author avatar + name, pitch title, domain badge, like/bookmark/share action buttons on the right rail, progress bar at bottom. Snap scroll between cards.
- **Video posts in Feed**: Add 3–4 posts to mockData.ts that have a `mediaUrl` pointing to an embeddable video (use `<video>` or iframe). PostCard should detect if mediaUrl is a video URL and render a video player instead of an `<img>`.
- **Search functionality** (TopHeader): Implement a working search dropdown that filters across posts (title/content), profiles (name/headline), and marketplace listings (title/tags). Show grouped results dropdown (Posts, People, Listings sections). Close on outside click or Escape. Navigate to profile on person click.
- **Settings panel** (TopHeader): Clicking the gear icon opens a slide-in settings sheet/drawer with sections: Appearance (dark mode toggle placeholder), Notifications (toggle switches for email/push — UI only), Privacy (profile visibility toggle — UI only), Account (display name, bio edit area — UI only), About (version info). Use shadcn Sheet component.
- **Stories with video**: Add 2–3 stories to mockData that have video `mediaUrl` (short Pixabay video URLs). StoryViewer should detect video URLs and render a `<video autoplay loop>` instead of `<img>`.

### Modify
- **Sidebar.tsx**: Add "Pitch" tab (Film icon or Play icon) between Stories and Marketplace. Keep all existing 6 tabs.
- **App.tsx**: Add `pitch` to the `Page` type and page map. Wire `PitchPage`.
- **TopHeader.tsx**: Make search input functional (dropdown results, keyboard nav). Make settings gear open Settings sheet.
- **mockData.ts**: Add pitch video entries array, add video posts, add video stories, fill `pitchVideoUrl` for all 5 profiles.
- **PostCard.tsx**: Detect video mediaUrl (check for `.mp4` or `video` in URL or a `mediaType: 'video'` field) and render `<video muted loop autoPlay playsInline>` with controls, instead of `<img>`.
- **FeedPage.tsx**: Render updated posts (no layout change needed, PostCard handles video).
- **StoriesPage.tsx**: Update story ring row and cards to handle video stories.
- **StoryViewer.tsx**: If `mediaUrl` ends in `.mp4` or story has `mediaType: 'video'`, render `<video>` instead of `<img>`.

### Remove
- Nothing removed

## Implementation Plan
1. Update `types.ts` — add `mediaType?: 'image' | 'video'` to Post and Story types; add `pitchVideos` data type
2. Update `mockData.ts` — add pitch video array (8 entries with Pixabay/Pexels direct video URLs), update 4 posts to have video mediaUrl + mediaType, add 2 video stories, fill pitchVideoUrl on all 5 profiles
3. Create `PitchPage.tsx` — vertical snap-scroll reel feed with video cards, like/bookmark/share rail, domain badges, author info overlay
4. Update `Sidebar.tsx` — insert Pitch tab (Clapperboard or Play icon) in nav items array
5. Update `App.tsx` — add `pitch` page, wire `PitchPage`
6. Update `TopHeader.tsx` — implement search dropdown with filtering across posts/profiles/listings; implement settings sheet (shadcn Sheet) with toggle settings UI
7. Update `PostCard.tsx` — add video detection and `<video>` rendering branch
8. Update `StoryViewer.tsx` — add video rendering branch
9. Validate and build
