---
id: 001
title: Fix Vercel Deployment for Docusaurus Site
stage: general
date: 2026-04-25
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: janna
command: deploy to Vercel
labels: ["vercel","deployment","docusaurus","fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docusaurus.config.ts
  - vercel.json
tests:
  - none
---

## Prompt

my project is not running on vercel tell me how can i run it and check it and tell me how to fix it

(follow-up) yes

## Response snapshot

Diagnosed root cause: `docusaurus.config.ts` was configured for GitHub Pages (`baseUrl: '/physical-humanoid-robots-textbook/'`) instead of Vercel (`baseUrl: '/'`). Project had never been deployed to Vercel.

**Changes made:**
1. Updated `docusaurus.config.ts` to use env-based URL/baseUrl — uses `'/'` on Vercel, falls back to GitHub Pages path otherwise.
2. Created `vercel.json` with `buildCommand`, `outputDirectory`, and `installCommand`.
3. Ran `npx vercel --prod` — build succeeded, deployed to https://hackathon1-nu-azure.vercel.app

## Outcome

- ✅ Impact: Project now live on Vercel at https://hackathon1-nu-azure.vercel.app; GitHub Pages deployment unaffected.
- 🧪 Tests: Vercel build passed for both `en` and `ur` locales; FastAPI backend auto-detected and deployed.
- 📁 Files: docusaurus.config.ts, vercel.json
- 🔁 Next prompts: Connect custom domain, configure CHATBOT_API_URL env var on Vercel for backend integration.
- 🧠 Reflection: The VERCEL_URL env var approach cleanly handles dual-deployment without code duplication.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): Vercel build PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Set CHATBOT_API_URL in Vercel env vars to point to deployed backend URL
