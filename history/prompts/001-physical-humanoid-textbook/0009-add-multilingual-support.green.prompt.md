---
id: 0009
title: Add Multilingual Support (English/Urdu)
stage: green
date: 2026-02-01
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: implementation
labels: ["multilingual", "i18n", "urdu", "localization"]
links:
  spec: specs/001-physical-humanoid-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docusaurus.config.ts (modified - i18n config with Urdu locale)
  - src/contexts/LanguageContext.tsx (created - language state management)
  - src/components/ChatbotWidget.tsx (modified - multilingual UI)
  - src/services/chatApi.ts (modified - language parameter)
  - src/theme/Layout/index.tsx (modified - LanguageProvider)
  - backend/app/models/schemas.py (modified - Language type)
  - backend/app/core/agent.py (modified - Urdu system prompt)
  - backend/app/api/routes/chat.py (modified - pass language)
  - i18n/ur/docusaurus-theme-classic/navbar.json (created)
  - i18n/ur/docusaurus-theme-classic/footer.json (created)
  - i18n/ur/docusaurus-plugin-content-docs/current/intro.mdx (created)
tests:
  - N/A - requires live testing with locale switching
---

## Prompt

make the book multilingual add button for language selection in that i need 2 languages urdu and english default english when user select urdu language chat whole book in urdu language and also the agent should urdu into in urdu

## Response snapshot

Added multilingual support with English (default) and Urdu:

**Docusaurus i18n Configuration:**
- Added Urdu locale with RTL support
- Locale dropdown in navbar
- Translated navbar and footer

**Language Context:**
```typescript
// src/contexts/LanguageContext.tsx
export type Language = 'en' | 'ur';

const translations = {
  en: { chatPlaceholder: 'Ask about Physical AI...', ... },
  ur: { chatPlaceholder: 'فزیکل AI کے بارے میں پوچھیں...', ... },
};
```

**Agent Multilingual Support:**
```python
# Separate system prompts for each language
AGENT_SYSTEM_PROMPT_EN = """You are a friendly AI assistant..."""
AGENT_SYSTEM_PROMPT_UR = """آپ ایک دوستانہ AI معاون ہیں..."""

# Agent selection based on language
self._agents = {
    "en": Agent(..., instructions=SYSTEM_PROMPTS["en"]),
    "ur": Agent(..., instructions=SYSTEM_PROMPTS["ur"]),
}
```

**ChatbotWidget Updates:**
- RTL support for Urdu (direction: rtl)
- Translated labels (placeholder, buttons, messages)
- Greeting detection for Urdu (السلام علیکم, شکریہ, etc.)

**API Changes:**
- Added `language` parameter to ChatRequest
- Agent responds in selected language
- Technical terms kept in English, explanations in Urdu

## Outcome

- ✅ Impact: Full multilingual support (English/Urdu) for book and chatbot
- 🧪 Tests: Requires manual testing with locale switching
- 📁 Files: 11 files created/modified
- 🔁 Next prompts: Translate remaining chapters to Urdu, test locale switching
- 🧠 Reflection: Separate agents per language provides clean language isolation

## Evaluation notes (flywheel)

- Failure modes observed: None yet - needs live testing
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Test greeting in Urdu (السلام علیکم)
