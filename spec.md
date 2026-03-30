# PitchNet

## Current State
Full-featured professional networking app with Feed, Stories, Marketplace, Live, Messages, and Profile pages. Background is dark teal with blob shapes. Cards have white backgrounds. Avatars use dicebear SVG placeholders. Typography uses Plus Jakarta Sans. UI is functional but not yet Apple-caliber.

## Requested Changes (Diff)

### Add
- Real AI-generated professional headshot images for all 5 users (already generated at `/assets/generated/avatar-*.dim_300x300.jpg`)
- Apple-inspired design language: SF-style clean typography, frosted glass nav/sidebar, ultra-smooth transitions, minimal chrome, generous whitespace

### Modify
- `mockData.ts`: Replace all `avatarUrl` dicebear SVG URLs with the generated headshot paths:
  - u1 Alex Rivera → `/assets/generated/avatar-alex-rivera.dim_300x300.jpg`
  - u2 Sarah Chen → `/assets/generated/avatar-sarah-chen.dim_300x300.jpg`
  - u3 Marcus Williams → `/assets/generated/avatar-marcus-williams.dim_300x300.jpg`
  - u4 Priya Patel → `/assets/generated/avatar-priya-patel.dim_300x300.jpg`
  - u5 Jordan Kim → `/assets/generated/avatar-jordan-kim.dim_300x300.jpg`
- `index.css`: Apply Apple-like design tokens — use SF Pro-style font stack (system-ui), tighten letter-spacing, add smooth spring-like transition defaults, subtle frosted glass utilities
- `Sidebar.tsx`: Frosted glass effect (backdrop-blur), refined active state with subtle pill highlight, reduced visual weight
- `PostCard.tsx`: More breathing room, cleaner avatar treatment, refined action bar
- `StoriesPage.tsx`: Cleaner story rings, pill filter bar refinement
- `FeedPage.tsx`: Cleaner right sidebar sections

### Remove
- Nothing removed

## Implementation Plan
1. Update `mockData.ts` avatarUrl fields for all 5 profiles
2. Refine `index.css` with Apple-inspired design tokens and utilities (system-ui font, smooth transitions, glass utilities)
3. Refine `Sidebar.tsx` with frosted glass sidebar background, cleaner nav items
4. Refine `PostCard.tsx`, `FeedPage.tsx`, `StoriesPage.tsx` for Apple-level spacing, typography, and finish
5. Validate build
