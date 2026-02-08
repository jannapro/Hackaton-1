---
id: 0001
title: Expand Spec with RAG Chatbot
stage: spec
date: 2026-01-30
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: /sp.specify
labels: ["rag", "chatbot", "spec-expansion", "openai-agents-sdk", "qdrant"]
links:
  spec: specs/001-physical-humanoid-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-physical-humanoid-textbook/spec.md (modified)
  - specs/001-physical-humanoid-textbook/checklists/requirements.md (modified)
tests:
  - Checklist validation: PASS
---

## Prompt

Update the existing spec.md (Feature Specification) to formally specify an Integrated Retrieval-Augmented Generation (RAG) Chatbot for the "Physical Humanoid Robots" textbook.

Required new sections:
1. Feature Overview - Integrated RAG Chatbot
2. RAG System Architecture (6 layers)
3. OpenAI Agents SDK - Agent Specification
4. RAG Functional Requirements (FR-RAG-001 through FR-RAG-013)
5. RAG User Scenarios & Acceptance Tests
6. Non-Functional Requirements (RAG)
7. Safety & Governance Alignment

## Response snapshot

Updated spec.md with comprehensive RAG chatbot specification including:

- **Feature Overview**: Describes chatbot as embedded UI widget with exclusive textbook corpus, text selection grounding, and educational purpose
- **RAG System Architecture**: Six-layer specification (Content Source, Indexing, Metadata, Retrieval, Generation, API) with tables defining attributes and constraints
- **Agent Specification**: `physical_ai_book_agent` with role, allowed tools, input types, output constraints, and system prompt summary
- **13 Functional Requirements**: FR-RAG-001 through FR-RAG-013 covering indexing, generation, interaction, absence handling, and multilingual readiness
- **4 User Stories**: Conceptual questions, selected text grounding, cross-chapter queries, and answer-not-found handling with Given/When/Then scenarios
- **14 Non-Functional Requirements**: Performance, determinism, re-indexing safety, version compatibility, and availability constraints
- **Safety Alignment**: Constitution compliance, grounding as safety mechanism, corpus authority, and audit trail requirements

Updated status from "Draft" to "Draft (Expanded with RAG)" and validated against checklist.

## Outcome

- ✅ Impact: Spec expanded with formal RAG chatbot requirements aligned to Constitution v1.1.0
- 🧪 Tests: Checklist validation PASS - all items including RAG-specific validation
- 📁 Files: 2 files modified (spec.md, requirements.md checklist)
- 🔁 Next prompts: /sp.plan to create implementation plan for RAG system
- 🧠 Reflection: Technology stack references are constitution-mandated (Section XIII), not arbitrary implementation choices

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Checklist validation PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to /sp.plan for RAG implementation planning
