---
id: 007
title: Implement RAG Chatbot for Physical AI Textbook
stage: green
date: 2026-01-30
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: implement plan
labels: ["rag", "chatbot", "fastapi", "openai-agents", "qdrant", "docusaurus"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/requirements.txt
  - backend/README.md
  - backend/app/__init__.py
  - backend/app/config.py
  - backend/app/main.py
  - backend/app/api/__init__.py
  - backend/app/api/routes/__init__.py
  - backend/app/api/routes/health.py
  - backend/app/api/routes/chat.py
  - backend/app/core/__init__.py
  - backend/app/core/embeddings.py
  - backend/app/core/retrieval.py
  - backend/app/core/agent.py
  - backend/app/services/__init__.py
  - backend/app/services/indexing.py
  - backend/app/models/__init__.py
  - backend/app/models/schemas.py
  - backend/scripts/__init__.py
  - backend/scripts/index_content.py
  - src/components/ChatbotWidget.tsx
  - src/hooks/useTextSelection.ts
  - src/hooks/index.ts
  - src/services/chatApi.ts
  - src/services/index.ts
  - src/theme/Layout/index.tsx
  - src/components/index.ts (modified)
  - docusaurus.config.ts (modified)
  - .env.example
tests:
  - manual: curl http://localhost:8000/api/health
  - manual: python scripts/index_content.py --clear
  - manual: POST /api/chat with sample query
---

## Prompt

Implement the following plan:

# RAG Chatbot Implementation Plan

## Summary

Implement an Integrated RAG Chatbot for the Physical AI textbook that provides book-grounded Q&A with user-selected text scoping, embedded directly in the Docusaurus site.

## Technology Stack (per Constitution v1.1.0)

- **Agent Framework**: OpenAI Agents SDK
- **Serving Layer**: FastAPI
- **Metadata Storage**: Neon Serverless Postgres
- **Vector Database**: Qdrant Cloud (Free Tier)
- **Embeddings**: OpenAI text-embedding-3-small

[Full plan details included in implementation context]

## Response snapshot

Implemented complete RAG chatbot system with:

**Backend (FastAPI + OpenAI Agents SDK + Qdrant)**:
- FastAPI application with /api/health and /api/chat endpoints
- OpenAI Agents SDK agent with grounding system prompt
- Qdrant vector database integration for semantic search
- MDX content indexing pipeline with section-level chunking
- Pydantic models for request/response validation
- Environment-based configuration

**Frontend (React/TypeScript)**:
- ChatbotWidget component with floating chat UI
- Text selection detection hook for context-aware queries
- API client service for backend communication
- Swizzled Docusaurus Layout for global chatbot injection
- Source citation display in chat responses

**Key Files Created**:
- 17 Python files in backend/
- 6 TypeScript files in src/
- Environment template and README documentation

## Outcome

- ✅ Impact: Full RAG chatbot implementation following Constitution v1.1.0 technology stack
- 🧪 Tests: Manual verification steps documented in backend/README.md
- 📁 Files: 25 files created/modified across backend and frontend
- 🔁 Next prompts: Deploy backend to Render, configure production CORS, run end-to-end tests
- 🧠 Reflection: Implementation follows plan phases sequentially; grounding rules embedded in agent system prompt

## Evaluation notes (flywheel)

- Failure modes observed: None during implementation
- Graders run and results (PASS/FAIL): N/A - awaiting deployment and integration testing
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Test indexing with actual MDX content and verify chunk quality
