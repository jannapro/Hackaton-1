---
id: 003
title: Create Implementation Plan
stage: plan
date: 2026-01-21
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: /sp.plan
labels: ["plan", "textbook", "docusaurus", "execution-phases", "governance"]
links:
  spec: specs/001-physical-humanoid-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-physical-humanoid-textbook/plan.md
  - specs/001-physical-humanoid-textbook/research.md
  - specs/001-physical-humanoid-textbook/data-model.md
  - specs/001-physical-humanoid-textbook/quickstart.md
  - specs/001-physical-humanoid-textbook/contracts/chapter-template.mdx
  - CLAUDE.md
tests:
  - null
---

## Prompt

/sp.plan

You MUST obey these rules:
- Prefer correctness, clarity, and retrievability over verbosity.
- Do NOT generate book content or chapter prose.
- Produce an operational action plan, not marketing or narrative text.

The execution plan MUST:
- Be written in clear, structured Markdown
- Define ordered phases for the project
- Include objectives, actions, and outputs per phase
- Enforce governance-before-content discipline
- Support optional Claude Code subagents
- Align with an AI-native textbook workflow
- Assume Docusaurus deployment

Required phases to include:
- Governance Initialization
- Specification Authoring
- Agent Definition (optional)
- Book Skeleton Creation
- Chapter Authoring (iterative)
- Cross-Chapter Consistency
- AI-Native Optimization
- Deployment Preparation
- Maintenance & Extension

## Response snapshot

Generated comprehensive implementation plan with 9 execution phases:

1. **Governance Initialization** - Constitution ratified, MCP tools configured
2. **Specification Authoring** - 15 functional requirements, clarifications complete
3. **Agent Definition** - Optional subagent templates for parallel authoring
4. **Book Skeleton Creation** - Docusaurus structure with 8 chapter directories
5. **Chapter Authoring** - Iterative P1-P8 priority order with Context7 alignment
6. **Cross-Chapter Consistency** - Unitree H1, terminology, code pattern validation
7. **AI-Native Optimization** - RAG chunking (500-1000 tokens), metadata frontmatter
8. **Deployment Preparation** - GitHub Pages/Vercel configuration
9. **Maintenance & Extension** - ROS 2 version updates, contribution guidelines

Phase 0 (research.md) resolved 8 technical decisions:
- Docusaurus 3.x + custom MDX components
- Unitree H1 with generic URDF fallback
- ROS 2 Humble primary, Iron secondary
- Gazebo Harmonic preferred
- VLA: RT-2/OpenVLA reference architecture
- Conversational: Whisper + Piper + Ollama

Phase 1 artifacts created:
- data-model.md: 10 entities with validation rules
- contracts/chapter-template.mdx: Complete MDX template
- quickstart.md: Development environment setup

Constitution Check: All 12 principles PASS.

## Outcome

- Impact: Complete operational plan for 8-chapter textbook production
- Tests: N/A (planning artifact)
- Files: 5 created (plan.md, research.md, data-model.md, quickstart.md, chapter-template.mdx), 1 updated (CLAUDE.md)
- Next prompts: `/sp.tasks` to generate task breakdown
- Reflection: User requirements for governance-before-content discipline well-addressed; all 9 phases defined with clear gates

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Constitution Check PASS (12/12 principles)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Verify Unitree H1 URDF availability before Chapter 6 authoring
