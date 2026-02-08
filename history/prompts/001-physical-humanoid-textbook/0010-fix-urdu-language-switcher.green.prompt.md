---
id: 10
title: Fix Urdu Language Switcher Navigation
stage: green
date: 2026-02-03
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: /sp.implement
labels: ["i18n", "language-switcher", "urdu", "bug-fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docusaurus.config.ts
  - src/components/LanguageSwitcher.tsx
  - src/contexts/LanguageContext.tsx
tests:
  - npm run build (both en and ur locales succeed)
---

## Prompt

fic the laguage switcher becuz the urdu language isn't working

## Response snapshot

Fixed three issues preventing the Urdu language switcher from working:

1. **Added `localeDropdown` to navbar items** in `docusaurus.config.ts` — Docusaurus's built-in locale switcher was missing entirely since the navbar `items` array was empty.

2. **Fixed dev mode navigation** in `LanguageSwitcher.tsx` — The custom switcher only navigated to locale URLs in production mode. Changed to navigate in both dev and production, with correct base URL handling for each environment.

3. **Fixed locale detection priority** in `LanguageContext.tsx` — URL-based locale detection now takes precedence over localStorage, ensuring the language context matches the actual Docusaurus locale page being viewed.

Build verified: both `en` and `ur` locales compile successfully with all 8 chapter pages generated for Urdu.

## Outcome

- Impact: Urdu language switching now works in both development and production modes
- Tests: npm run build passes for both en and ur locales
- Files: 3 files modified (docusaurus.config.ts, LanguageSwitcher.tsx, LanguageContext.tsx)
- Next prompts: Test in browser, commit changes, translate _category_.json sidebar labels to Urdu
- Reflection: The root cause was that the custom language switcher bypassed Docusaurus's native i18n URL routing in dev mode

## Evaluation notes (flywheel)

- Failure modes observed: Custom i18n implementation diverged from Docusaurus's native locale URL scheme
- Graders run and results (PASS/FAIL): npm run build PASS (both locales)
- Prompt variant (if applicable): null
- Next experiment: Verify locale switching in browser with npm run serve
