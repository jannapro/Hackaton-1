---
id: 0002
title: Add RAG System Tasks Phase 16
stage: tasks
date: 2026-01-30
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: /sp.tasks
labels: ["rag", "tasks", "phase16", "chatbot"]
links:
  spec: specs/001-physical-humanoid-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-physical-humanoid-textbook/tasks.md (modified)
tests:
  - Format validation: All tasks follow checklist format
---

## Prompt

Add new Phase 16 — Integrated RAG System Implementation after Phase 15 (AI-Native Optimization). Include tasks for:
- A. Content Preparation & Chunking
- B. Vector Indexing (Qdrant)
- C. Metadata Storage (Neon Postgres)
- D. Agent Definition (OpenAI Agents SDK)
- E. API Layer (FastAPI)
- F. UI Integration (Docusaurus)
- G. Safety, Validation & Governance

## Response snapshot

Added Phase 16: Integrated RAG System Implementation to tasks.md with:
- 42 new tasks (T183-T224 for Phase 16)
- Renumbered Phase 16→17 (Deployment) with tasks T225-T232
- Renumbered Phase 17→18 (Maintenance) with tasks T233-T240
- Updated phase dependencies to include new RAG phase
- Marked completed tasks based on existing implementation

Task breakdown by category:
- A. Chunking: 5 tasks (T183-T187)
- B. Vector Indexing: 7 tasks (T188-T194)
- C. Metadata Storage: 4 tasks (T195-T198)
- D. Agent Definition: 5 tasks (T199-T203)
- E. API Layer: 6 tasks (T204-T209)
- F. UI Integration: 8 tasks (T210-T217)
- G. Safety/Governance: 7 tasks (T218-T224)

## Outcome

- ✅ Impact: 58 new/renumbered tasks added, RAG system fully specified in task breakdown
- 🧪 Tests: Format validation PASS - all tasks follow `- [ ] T### [P?] Description with file path` format
- 📁 Files: 1 file modified (tasks.md)
- 🔁 Next prompts: Complete remaining tasks T187, T194-T198, T209, T216-T224
- 🧠 Reflection: Many RAG tasks already completed from prior implementation session; marked accordingly

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Format validation PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Execute remaining uncompleted RAG tasks
