---
id: "0001"
title: "Amend Constitution for RAG Governance"
stage: constitution
date: 2026-01-29
surface: agent
model: claude-opus-4-5-20251101
feature: none
branch: 001-physical-humanoid-textbook
user: jannapro
command: /sp.constitution
labels: ["rag", "governance", "constitution", "amendment"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - null
---

## Prompt

You are Claude Code operating inside a Spec-Kit Plus governed repository.

Your task is to UPDATE the existing `sp.constitution.md` to formally incorporate
an Integrated Retrieval-Augmented Generation (RAG) Chatbot system.

You MUST obey these rules:

- Treat the existing constitution as the base document
- Do NOT rewrite unrelated sections
- Apply minimal but sufficient changes
- Maintain legal-style precision
- Prefer correctness, clarity, and retrievability over verbosity
- This is a governance change, not implementation content

VERSIONING REQUIREMENTS:
- Bump version from 1.0.0 → 1.1.0 (MINOR)
- Update the Sync Impact Report accordingly
- Clearly document added sections and modified sections
- Preserve ratification date; update amendment date

REQUIRED CONSTITUTION UPDATES:
- Integrated RAG Chatbot using OpenAI Agents SDK, FastAPI, Neon Serverless Postgres, Qdrant Cloud
- Book-wide question answering and user-selected text grounding
- Embedded directly into Docusaurus book

SPECIFIC EDIT INSTRUCTIONS:
1. UPDATE Section V (Purpose) - RAG chatbot as first-class deliverable
2. ADD Section XIII (Integrated RAG System Governance)
3. UPDATE Section X (AI-Native Design Rules) - vector chunk boundaries, stable IDs
4. UPDATE Section XII (Safety and Ethics) - RAG safety rules
5. UPDATE Governance/Change Discipline - RAG schema governance

## Response snapshot

Constitution amended from v1.0.0 to v1.1.0 with the following changes:

**Modified Sections:**
- V. Purpose — Added RAG chatbot as first-class deliverable
- X. AI-Native Design Rules — Added vector indexing, chunk IDs, multilingual RAG
- XII. Safety and Ethics — Added RAG-specific safety constraints
- Governance/Change Discipline — Added RAG schema governance requirements

**Added Sections:**
- XIII. Integrated RAG System Governance (NEW) including:
  - System Definition (Authoring, Indexing, Retrieval, Generation)
  - Technology Stack (OpenAI Agents SDK, FastAPI, Neon Postgres, Qdrant)
  - Corpus Authority (book as sole authoritative source)
  - Grounding Rules (book-wide retrieval, user-selected text, contradiction prohibition)
  - Separation of Concerns table

## Outcome

- ✅ Impact: Constitution v1.1.0 now governs RAG chatbot as first-class deliverable
- 🧪 Tests: N/A (governance document)
- 📁 Files: .specify/memory/constitution.md updated
- 🔁 Next prompts: Create spec for RAG chatbot implementation
- 🧠 Reflection: MINOR version bump appropriate for new section addition

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
