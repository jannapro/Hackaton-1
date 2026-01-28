# Data Model: Physical Humanoid Robots Textbook

**Feature**: `001-physical-humanoid-textbook`
**Date**: 2026-01-21
**Purpose**: Define content entities, relationships, and structure for the textbook

---

## Core Entities

### Chapter

A self-contained learning unit within the textbook.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (e.g., "01-physical-ai-foundations") |
| title | string | Yes | Display title (e.g., "Physical AI Foundations") |
| priority | integer | Yes | Authoring order (P1-P8) |
| wordCount | integer | Yes | Target 4,000-6,000 words |
| learningObjectives | LearningObjective[] | Yes | 3-5 measurable objectives |
| sections | Section[] | Yes | Content sections |
| architectureDiagram | Asset | Yes | System-level diagram |
| codeExamples | CodeExample[] | Yes | Runnable Python snippets |
| failureModes | FailureMode[] | Yes | Common errors with resolutions |
| hardwareRequirements | HardwareSpec | Yes | Minimum compute/hardware |
| quizzes | Quiz[] | Optional | Interactive assessments |

**Validation Rules**:
- wordCount MUST be between 4,000 and 6,000
- learningObjectives MUST have 3-5 items
- Each chapter MUST be independently understandable

**State Transitions**:
- Draft → Review → Published
- Published → Revision (when constitution/curriculum changes)

---

### LearningObjective

A measurable goal statement for chapter outcomes.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique within chapter (e.g., "LO-01-01") |
| statement | string | Yes | Measurable objective text |
| bloomLevel | enum | Yes | Cognitive level (Remember, Understand, Apply, Analyze, Evaluate, Create) |
| assessmentMethod | string | Yes | How objective is validated |

**Validation Rules**:
- statement MUST contain action verb aligned with bloomLevel
- statement MUST be testable (no vague terms like "understand basics")

---

### Section

A content block within a chapter, optimized for RAG chunking.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique within chapter |
| heading | string | Yes | H2 or H3 level heading |
| content | markdown | Yes | Section body (500-1000 tokens target) |
| tokenCount | integer | Computed | Approximate token count |
| subsections | Section[] | Optional | Nested H3/H4 sections |

**Validation Rules**:
- tokenCount SHOULD be 500-1000 for optimal RAG retrieval
- content MUST NOT contain English idioms (multilingual compatibility)
- Headings MUST be semantic and keyword-rich

---

### CodeExample

A runnable Python code snippet using ROS 2.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique within chapter |
| title | string | Yes | Descriptive title |
| language | enum | Yes | "python" (rclpy) |
| code | string | Yes | Complete, runnable code |
| ros2Distribution | enum | Yes | "humble" or "iron" |
| dependencies | string[] | Yes | Required packages |
| expectedOutput | string | Optional | Sample output |
| colabLink | url | Optional | Link to Colab notebook |

**Validation Rules**:
- code MUST use rclpy (no ROS 1 rospy)
- code MUST NOT use deprecated ROS 2 APIs
- dependencies MUST be pinned to specific versions

---

### FailureMode

A documented common error scenario.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique within chapter |
| symptom | string | Yes | What the learner observes |
| cause | string | Yes | Root cause explanation |
| resolution | string | Yes | Step-by-step fix |
| preventionTip | string | Optional | How to avoid in future |

---

### Asset

A visual resource (diagram, image).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| type | enum | Yes | "architecture-diagram", "screenshot", "photo" |
| path | string | Yes | Relative path in assets/ |
| altText | string | Yes | Accessibility description |
| caption | string | Optional | Display caption |

**Validation Rules**:
- All images MUST have altText for accessibility
- Architecture diagrams MUST label all components

---

### Quiz

An interactive assessment component.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique within chapter |
| title | string | Yes | Quiz title |
| questions | QuizQuestion[] | Yes | 3-10 questions |
| passingScore | integer | Yes | Minimum correct answers |

---

### QuizQuestion

A single quiz question.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique within quiz |
| questionText | string | Yes | The question |
| questionType | enum | Yes | "multiple-choice", "true-false", "code-completion" |
| options | string[] | Conditional | For multiple-choice |
| correctAnswer | string | Yes | Correct option or answer |
| explanation | string | Yes | Why answer is correct |

---

### HardwareSpec

Hardware and compute requirements for chapter exercises.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| os | string | Yes | Operating system (Ubuntu 22.04) |
| ros2 | string | Yes | ROS 2 distribution (Humble/Iron) |
| ram | string | Yes | Minimum RAM |
| gpu | string | Optional | GPU requirements (for Isaac Sim chapters) |
| gpuAlternative | string | Optional | Fallback for no GPU |
| storage | string | Yes | Disk space needed |

---

## Relationships

```text
Textbook (1) ──contains──> (8) Chapter
Chapter (1) ──has──> (3-5) LearningObjective
Chapter (1) ──contains──> (n) Section
Chapter (1) ──has──> (1) ArchitectureDiagram (Asset)
Chapter (1) ──contains──> (n) CodeExample
Chapter (1) ──contains──> (n) FailureMode
Chapter (1) ──has──> (1) HardwareSpec
Chapter (1) ──contains──> (0-n) Quiz
Quiz (1) ──contains──> (3-10) QuizQuestion
Section (1) ──contains──> (0-n) Section (nesting)
```

---

## Content Hierarchy

```text
Physical Humanoid Robots Textbook
├── Chapter 1: Physical AI Foundations
│   ├── Learning Objectives (3-5)
│   ├── Sections
│   │   ├── Introduction (~500 tokens)
│   │   ├── Embodied Intelligence (~800 tokens)
│   │   ├── Simulation-First Design (~700 tokens)
│   │   ├── Perception-Planning-Action (~900 tokens)
│   │   └── Summary (~300 tokens)
│   ├── Architecture Diagram (1)
│   ├── Code Examples (2-4)
│   ├── Failure Modes (3-5)
│   ├── Hardware Requirements (1)
│   └── Quiz (optional)
├── Chapter 2: ROS 2 Robotic Nervous System
│   └── [same structure]
├── ...
└── Chapter 8: Capstone Autonomous Agent
    └── [same structure]
```

---

## Frontmatter Schema (MDX)

Each chapter index.mdx MUST include:

```yaml
---
id: "01-physical-ai-foundations"
title: "Physical AI Foundations"
sidebar_label: "1. Physical AI Foundations"
sidebar_position: 1
keywords:
  - physical ai
  - embodied intelligence
  - simulation-first
  - perception planning action
description: "Introduction to Physical AI concepts including embodied intelligence and simulation-first design principles."
---
```

**Purpose**: Enables Docusaurus navigation and RAG metadata extraction.
