---
id: "0012"
title: Fix language switcher to navigate locale URLs
stage: green
date: 2026-02-08
surface: agent
model: claude-opus-4-6
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: chat
labels: ["i18n", "language-switcher", "bugfix", "docusaurus"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/LanguageSwitcher.tsx
  - src/contexts/LanguageContext.tsx
  - package.json
tests:
  - npm run build (both en and ur locales compiled successfully)
---

## Prompt

now when i go in to the book and i switch the book to urdu it does not change the language now change it and i shoudl see everything in urdu if i ma on urdu mode and englich when i am on english mode

## Response snapshot

Fixed the language switcher to properly navigate between locale URLs using Docusaurus's built-in `useAlternatePageUtils` hook. Previously the switcher only changed a React context (affecting just the chatbot labels) and only navigated to locale URLs in production mode. Now it always navigates to the correct locale URL, switching the entire page content between English and Urdu.

Key changes:
1. **LanguageSwitcher.tsx**: Replaced hardcoded URL generation with `useAlternatePageUtils` from `@docusaurus/theme-common/internal`. Removed production-only guard so navigation works in all environments. Uses `currentLocale` from Docusaurus context instead of React state.
2. **LanguageContext.tsx**: Syncs with Docusaurus's `currentLocale` via `useDocusaurusContext` instead of localStorage/URL parsing.
3. **package.json**: Added `start:ur` script for dev-mode Urdu testing.

## Outcome

- ✅ Impact: Language switcher now properly switches all page content between English and Urdu
- 🧪 Tests: Build succeeded for both en and ur locales
- 📁 Files: 3 files modified (LanguageSwitcher.tsx, LanguageContext.tsx, package.json)
- 🔁 Next prompts: Test on deployed site; verify RTL layout in Urdu mode
- 🧠 Reflection: The root cause was the production-only guard on URL navigation and using custom URL generation instead of Docusaurus's built-in locale utilities

## Evaluation notes (flywheel)

- Failure modes observed: Language switcher only set React context in dev mode; hardcoded baseUrl in URL generation
- Graders run and results (PASS/FAIL): Build PASS (both locales)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Deploy and verify locale switching on GitHub Pages
