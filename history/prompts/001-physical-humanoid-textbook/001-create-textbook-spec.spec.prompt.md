---
id: 001
title: Create Textbook Specification
stage: spec
date: 2026-01-21
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: /sp.specify
labels: ["spec", "textbook", "physical-ai", "humanoid-robotics", "ros2"]
links:
  spec: specs/001-physical-humanoid-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-physical-humanoid-textbook/spec.md
  - specs/001-physical-humanoid-textbook/checklists/requirements.md
tests:
  - null
---

## Prompt

You are Claude Code operating inside a Spec-Kit Plus governed repository.

Project Name: Physical Humanoid Robots
Domain: Physical AI & Humanoid Robotics
Framework: Spec-Kit Plus
Deployment Target: Docusaurus → GitHub Pages / Vercel

You MUST obey the following instructions strictly.

────────────────────────────────────────
1. GOVERNANCE
────────────────────────────────────────
- Prefer correctness, clarity, and retrievability over verbosity.
- Treat `sp.constitution.md` as the highest authority.

────────────────────────────────────────
2. PROJECT OBJECTIVE
────────────────────────────────────────
Create an AI-native technical textbook titled:

"Physical Humanoid Robots"

The book teaches Physical AI and Humanoid Robotics with a strong emphasis on:
- Embodied intelligence
- Simulation-first learning
- ROS 2-based robotic systems
- Digital twins and sim-to-real concepts
- Vision-Language-Action pipelines
- Conversational and autonomous humanoid behavior

────────────────────────────────────────
3. AUTHORING RULES
────────────────────────────────────────
- Content must be modular, structured, and optimized for AI retrieval.
- Avoid long, unstructured prose.
- Every chapter must be independently understandable.
- Assume Python proficiency but no prior ROS or robotics experience.

────────────────────────────────────────
4. REQUIRED BOOK STRUCTURE
────────────────────────────────────────
Generate content that follows this high-level structure:

1. Foundations of Physical AI
2. ROS 2 as the Robotic Nervous System
3. Digital Twins with Gazebo and Unity
4. NVIDIA Isaac and Robot Intelligence
5. Vision-Language-Action Systems
6. Humanoid Locomotion and Manipulation
7. Conversational Robotics
8. Capstone: Autonomous Humanoid Agent

Each chapter MUST include:
- Learning objectives
- System-level architecture explanation
- Practical implementation discussion
- Common failure modes and debugging notes
- Hardware and compute considerations

────────────────────────────────────────
5. TECHNICAL CONSTRAINTS
────────────────────────────────────────
- Use ROS 2 (Humble or Iron) concepts only
- Python (`rclpy`) for examples
- Gazebo and/or NVIDIA Isaac Sim for simulation
- No ROS 1
- No deprecated APIs
- No unsafe real-world deployment instructions

────────────────────────────────────────
6. AI-NATIVE DESIGN REQUIREMENTS
────────────────────────────────────────
Content must be suitable for:
- Future Retrieval-Augmented Generation (RAG)
- Chapter-level personalization
- User-selected text grounding
- Multilingual transformation (including Urdu)

Write in a way that supports semantic chunking.

────────────────────────────────────────
7. EXTENSIBILITY EXPECTATIONS
────────────────────────────────────────
- Allow for optional Claude Code subagents
- Keep specs, content, and tooling clearly separated
- Do not hard-code assumptions that block future personalization or translation

────────────────────────────────────────
8. TONE AND STYLE
────────────────────────────────────────
- Technical
- Precise
- Instructional
- No emojis
- No hype
- No conversational filler

Assume a serious engineering audience.

## Response snapshot

Created feature specification for Physical Humanoid Robots Textbook:

- Branch: `001-physical-humanoid-textbook`
- Spec: `specs/001-physical-humanoid-textbook/spec.md`
- Checklist: `specs/001-physical-humanoid-textbook/checklists/requirements.md`

Specification includes:
- 8 user stories (P1-P8) mapping to 8 chapters
- 12 functional requirements
- 8 success criteria (all measurable, technology-agnostic)
- 5 key entities
- 4 edge cases with resolutions
- 5 assumptions documented

All checklist items pass validation. No [NEEDS CLARIFICATION] markers. Ready for `/sp.clarify` or `/sp.plan`.

## Outcome

- Impact: Feature specification created with full user story coverage for 8-chapter textbook
- Tests: N/A (documentation artifact)
- Files: 2 created (spec.md, checklists/requirements.md)
- Next prompts: `/sp.clarify` for refinement or `/sp.plan` for implementation planning
- Reflection: User description was comprehensive; no clarifications needed due to detailed constitution and input

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Checklist validation PASS (all items checked)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Test spec against Context7 MCP for curriculum alignment
