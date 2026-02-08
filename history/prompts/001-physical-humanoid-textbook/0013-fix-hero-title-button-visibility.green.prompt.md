---
id: "0013"
title: Fix hero title and button visibility
stage: green
date: 2026-02-08
surface: agent
model: claude-opus-4-6
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: chat
labels: ["css", "homepage", "bugfix", "animation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/pages/index.module.css
  - src/pages/index.tsx
tests:
  - npm run build (both en and ur locales compiled successfully)
---

## Prompt

evethin gis perfect but the Physical Humanoid Robots and start learning button is disable i can not see it its there but i can't see it when i click it all the things are good do fix it plz and good job on fixing

## Response snapshot

Fixed hero title and CTA button visibility. The elements were invisible because they started at `opacity: 0` and relied on a JavaScript `useState`/`useEffect` toggle to become visible. If the JS-driven class toggle didn't fire properly (due to BrowserOnly wrapper, React hydration, or timing issues), elements stayed invisible.

Fix: Replaced JS-driven opacity toggle with pure CSS `@keyframes fadeInUp` animations that auto-play on render. Added `color` fallback for the gradient text effect. Removed `isVisible` state from HomepageHeader component.

## Outcome

- ✅ Impact: Hero title and Start Learning button are now always visible with CSS-only fade-in animation
- 🧪 Tests: Build PASS (both locales)
- 📁 Files: 2 files modified (index.module.css, index.tsx)
- 🔁 Next prompts: Verify visually in browser
- 🧠 Reflection: JS-driven opacity toggles are fragile in SSR/hydration contexts; CSS-only animations are more robust

## Evaluation notes (flywheel)

- Failure modes observed: opacity: 0 initial state with JS-driven toggle caused invisible elements when JS timing was off
- Graders run and results (PASS/FAIL): Build PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
