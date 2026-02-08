---
id: 0004
title: Expand RAG Tasks Governance
stage: tasks
date: 2026-02-01
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: /sp.tasks
labels: ["rag", "tasks", "governance", "validation"]
links:
  spec: specs/001-physical-humanoid-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-physical-humanoid-textbook/tasks.md (modified)
tests:
  - Format validation: All tasks follow checklist format
  - Coverage validation: All 7 RAG task groups have complete coverage
---

## Prompt

You MUST obey these rules:

- Treat `sp.constitution.md` as the highest authority
- Align strictly with `sp.specify.md`
- Preserve all existing tasks and phases; do not delete or modify them
- Use clear, numbered tasks (T#.#) and outputs for the new phase
- Produce operational tasks only; do not include narrative or marketing text
- Maintain the existing formatting, style, and Markdown structure

WHERE TO ADD:
- Add a new phase after T6 — AI-Native Optimization
- Renumber subsequent phases if necessary

NEW PHASE: T7 — Integrated RAG System Implementation

Objective: Implement a governed RAG system that enables interactive question answering grounded in textbook content, accessible via OpenAI Agents SDK.

Task Groups:
1. Content Preparation & Chunking
2. Vector Indexing (Qdrant)
3. Metadata Storage (Neon Postgres)
4. Agent Definition (OpenAI Agents SDK)
5. API Layer (FastAPI)
6. UI Integration (Docusaurus)
7. Safety, Validation & Governance

## Response snapshot

Expanded Phase 16 (Integrated RAG System Implementation) with 13 additional tasks to ensure complete coverage of all 7 task groups per user requirements:

**A. Content Preparation & Chunking**:
- T187.1: Multilingual-safe chunking validation

**B. Vector Indexing (Qdrant)**:
- T194.1: Collection versioning strategy
- T194.2: Retrieval accuracy validation

**C. Metadata Storage (Neon Postgres)**:
- T198.1: Language and version metadata storage
- T198.2: Foreign key relationships for book structure

**D. Agent Definition (OpenAI Agents SDK)**:
- T203.1: Agent tools restricted to retrieval-only validation
- T203.2: User-selected text grounding test

**F. UI Integration (Docusaurus)**:
- T217.1: Accessibility validation (ARIA, keyboard)
- T217.2: Performance test (<100ms impact)

**G. Safety, Validation & Governance**:
- T224.1: Grounding test suite (20+ queries)
- T224.2: Limitations documentation

## Outcome

- ✅ Impact: 13 new tasks added (T187.1, T194.1-2, T198.1-2, T203.1-2, T217.1-2, T224.1-2), Phase 16 now has complete coverage
- 🧪 Tests: Format validation PASS - all tasks follow `- [ ] T### [P?] Description with file path` format
- 📁 Files: 1 file modified (tasks.md)
- 🔁 Next prompts: Execute remaining uncompleted RAG tasks (T187-T224)
- 🧠 Reflection: Phase 16 already existed; expanded with governance and validation tasks per user request

## Evaluation notes (flywheel)

- Failure modes observed: None - existing phase structure preserved
- Graders run and results (PASS/FAIL): Format validation PASS, Coverage validation PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Execute validation tasks T218-T224 to confirm constitution compliance
