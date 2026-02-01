---
id: 0003
title: Update Plan with RAG Lifecycle
stage: plan
date: 2026-02-01
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: /sp.plan
labels: ["rag", "plan", "lifecycle", "chatbot"]
links:
  spec: specs/001-physical-humanoid-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-physical-humanoid-textbook/plan.md (modified)
tests:
  - Plan structure validation: All phases properly numbered
  - RAG phase completeness: All 7 subsections included
---

## Prompt

UPDATE the overall plan summary to explicitly mention: AI-native textbook + embedded RAG chatbot, Book as authoritative corpus for retrieval.

UPDATE Specification Authoring phase (Phase 2) to include: RAG architecture documentation, Agent grounding rules, RAG acceptance tests.

UPDATE AI-Native Optimization phase (Phase 7) to include: Chunk boundary validation, Grounding edge-case testing, Citation consistency.

ADD a new dedicated phase: Integrated RAG System Lifecycle (Phase 8) covering:
- A. Content Preparation & Chunking
- B. Vector Indexing (Qdrant)
- C. Metadata Storage (Neon Postgres)
- D. Agent Definition (OpenAI Agents SDK)
- E. API Layer (FastAPI)
- F. UI Integration (Docusaurus)
- G. Safety, Validation & Governance

UPDATE Deployment Preparation phase (now Phase 9) to include: RAG service readiness checks, Backend deployment to Render, CORS validation, End-to-end testing.

UPDATE Maintenance phase (now Phase 10) to include: Re-indexing procedures, Embedding model upgrade path, Grounding regression tests, Analytics and feedback loop.

## Response snapshot

Updated plan.md with RAG as first-class system component:

1. **Summary**: Added embedded RAG chatbot mention, book-as-corpus principle, text selection grounding
2. **Technical Context**: Added FastAPI, OpenAI Agents SDK, Qdrant, Neon to dependencies
3. **Phase 2**: Added RAG architecture, grounding rules, acceptance tests as outputs
4. **Phase 7**: Added chunk boundary validation, grounding testing, marked completed outputs
5. **Phase 8 (NEW)**: Integrated RAG System Lifecycle with 7 subsections and detailed actions
6. **Phase 9**: Renamed from Phase 8, added RAG service readiness checks
7. **Phase 10**: Renamed from Phase 9, added RAG maintenance procedures
8. **Risk Assessment**: Added 5 RAG-specific risks with mitigations
9. **Project Structure**: Added full backend/ directory tree
10. **Next Steps**: Updated to reflect current progress

## Outcome

- ✅ Impact: Plan now treats RAG chatbot as first-class system with dedicated phase and maintenance
- 🧪 Tests: Plan structure validation PASS - phases renumbered correctly
- 📁 Files: 1 file modified (plan.md)
- 🔁 Next prompts: Complete remaining RAG tasks (T195-T198 Postgres, T220-T224 Safety)
- 🧠 Reflection: Plan elevation ensures RAG system receives proper lifecycle management

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Structure validation PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Execute remaining RAG tasks to complete Phase 8
