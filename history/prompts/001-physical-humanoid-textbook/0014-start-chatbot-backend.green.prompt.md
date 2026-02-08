---
id: "0014"
title: Start chatbot backend server
stage: green
date: 2026-02-08
surface: agent
model: claude-opus-4-6
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: chat
labels: ["chatbot", "backend", "fastapi", "rag"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests:
  - "curl http://localhost:8000/api/health → healthy, 193 chunks"
  - "curl POST /api/chat → successful response"
---

## Prompt

the chatbot is not working

## Response snapshot

The chatbot backend (FastAPI + OpenAI Agents + Qdrant) was not running. Started it with `uvicorn app.main:app` from the backend directory. Health check confirmed: Qdrant connected, collection exists with 193 indexed chunks. Chat endpoint tested and working.

## Outcome

- ✅ Impact: Chatbot is now functional - backend server running on localhost:8000
- 🧪 Tests: Health endpoint PASS, chat endpoint PASS
- 📁 Files: 0 files modified (only started existing server)
- 🔁 Next prompts: Consider adding a start script or docker-compose for easier startup
- 🧠 Reflection: Backend needs to be started separately from the frontend; consider documenting the startup steps

## Evaluation notes (flywheel)

- Failure modes observed: Backend server was not running, frontend fetch to localhost:8000 was failing
- Graders run and results (PASS/FAIL): Health PASS, Chat PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Add a combined start script or instructions
