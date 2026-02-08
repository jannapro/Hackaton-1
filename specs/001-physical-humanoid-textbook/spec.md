# Feature Specification: Physical Humanoid Robots Textbook

**Feature Branch**: `001-physical-humanoid-textbook`
**Created**: 2026-01-21
**Status**: Draft (Expanded with RAG)
**Input**: AI-native technical textbook for Physical AI and Humanoid Robotics with 8 chapters and Integrated RAG Chatbot

## Clarifications

### Session 2026-01-21

- Q: Should chapters use interactive MDX components or static markdown? → A: Interactive MDX (code playgrounds, quizzes, collapsible sections)
- Q: Which humanoid robot model should be used consistently across chapters? → A: Unitree H1 (open-source friendly, ROS 2 support, Isaac Sim assets available)
- Q: Target word count per chapter for learning time consistency? → A: 4,000-6,000 words (standard technical textbook depth)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Learn Physical AI Foundations (Priority: P1)

A learner with Python proficiency but no robotics experience wants to understand the foundational concepts of Physical AI, including embodied intelligence, simulation-first approaches, and the relationship between perception, planning, and action in robotic systems.

**Why this priority**: Foundations must be established before any domain-specific content. Without understanding Physical AI principles, subsequent chapters on ROS 2, digital twins, and humanoid systems will lack context.

**Independent Test**: Can be fully tested by having a learner read Chapter 1, complete learning objective assessments, and demonstrate understanding of core Physical AI concepts without referencing other chapters.

**Acceptance Scenarios**:

1. **Given** a learner opens Chapter 1, **When** they read the learning objectives, **Then** they see clear, measurable goals for what they will learn.
2. **Given** a learner completes Chapter 1, **When** they encounter a system architecture diagram, **Then** they can identify perception, planning, and action components.
3. **Given** a learner finishes Chapter 1, **When** asked to explain simulation-first design, **Then** they can articulate why simulation precedes physical deployment.

---

### User Story 2 - Understand ROS 2 as Robotic Middleware (Priority: P2)

A learner wants to understand ROS 2 (Humble/Iron) as the communication backbone for robotic systems, including nodes, topics, services, and actions, using Python (rclpy) examples.

**Why this priority**: ROS 2 knowledge is prerequisite for all subsequent chapters involving simulation, control, and system integration. It serves as the "nervous system" connecting all robotic components.

**Independent Test**: Can be fully tested by having a learner set up a basic ROS 2 workspace, create publisher/subscriber nodes, and verify message passing.

**Acceptance Scenarios**:

1. **Given** a learner with Python experience, **When** they follow Chapter 2 instructions, **Then** they can explain the ROS 2 computation graph (nodes, topics, services, actions).
2. **Given** a learner reads the rclpy examples, **When** they run the code, **Then** the examples execute without errors on ROS 2 Humble or Iron.
3. **Given** a learner encounters a failure scenario, **When** they consult the debugging section, **Then** they find guidance for common ROS 2 issues.

---

### User Story 3 - Build Digital Twins with Gazebo and Unity (Priority: P3)

A learner wants to create digital twin environments using Gazebo and/or Unity for simulating robotic systems before physical deployment.

**Why this priority**: Digital twins enable safe experimentation and are essential for the simulation-first methodology emphasized throughout the textbook.

**Independent Test**: Can be fully tested by having a learner create a basic simulation environment, spawn a robot model, and observe physics-based behavior.

**Acceptance Scenarios**:

1. **Given** a learner follows Chapter 3, **When** they complete the Gazebo tutorial, **Then** they can spawn and control a robot in simulation.
2. **Given** a learner has no prior Gazebo experience, **When** they read the setup instructions, **Then** they can install and configure the simulation environment.
3. **Given** a learner encounters simulation failures, **When** they reference the debugging section, **Then** they find resolution steps for common issues (physics instability, sensor noise, timing).

---

### User Story 4 - Integrate NVIDIA Isaac for Robot Intelligence (Priority: P4)

A learner wants to leverage NVIDIA Isaac Sim for advanced robot simulation, reinforcement learning, and sim-to-real transfer.

**Why this priority**: Isaac Sim provides GPU-accelerated simulation essential for training complex behaviors and represents industry-standard tooling for humanoid robotics.

**Independent Test**: Can be fully tested by having a learner run an Isaac Sim environment and observe GPU-accelerated physics simulation.

**Acceptance Scenarios**:

1. **Given** a learner has appropriate GPU hardware, **When** they follow Chapter 4, **Then** they can launch Isaac Sim and load a robot asset.
2. **Given** a learner reads the sim-to-real section, **When** they complete it, **Then** they understand domain randomization and reality gap concepts.
3. **Given** a learner lacks GPU access, **When** they read the chapter, **Then** they find clear hardware requirements and alternative approaches documented.

---

### User Story 5 - Implement Vision-Language-Action Pipelines (Priority: P5)

A learner wants to understand and implement VLA (Vision-Language-Action) systems that connect perception, language understanding, and robotic action.

**Why this priority**: VLA represents the cutting edge of robot intelligence, enabling natural language instruction following and multimodal reasoning.

**Independent Test**: Can be fully tested by having a learner trace data flow through a VLA architecture diagram and explain each component's role.

**Acceptance Scenarios**:

1. **Given** a learner completes Chapter 5, **When** they see a VLA architecture, **Then** they can identify vision encoder, language model, and action decoder components.
2. **Given** a learner studies the implementation section, **When** they review the code patterns, **Then** they understand how to integrate pre-trained models.
3. **Given** a learner encounters model inference failures, **When** they consult debugging notes, **Then** they find guidance on memory, latency, and input preprocessing issues.

---

### User Story 6 - Program Humanoid Locomotion and Manipulation (Priority: P6)

A learner wants to understand humanoid robot locomotion (walking, balance) and manipulation (grasping, object interaction) control strategies.

**Why this priority**: Locomotion and manipulation are core competencies for humanoid robots, combining all previous concepts into physical capability.

**Independent Test**: Can be fully tested by having a learner simulate a humanoid walking gait and a simple grasp action in Gazebo or Isaac Sim.

**Acceptance Scenarios**:

1. **Given** a learner studies Chapter 6, **When** they review the locomotion section, **Then** they understand balance control, gait generation, and stability concepts.
2. **Given** a learner reads the manipulation section, **When** they complete it, **Then** they can explain grasp planning and force control principles.
3. **Given** a learner simulates a humanoid, **When** the robot falls or drops objects, **Then** the debugging section explains common causes (timing, gains, collision geometry).

---

### User Story 7 - Build Conversational Robotics Interfaces (Priority: P7)

A learner wants to enable natural language interaction with robots, including speech recognition, dialogue management, and speech synthesis.

**Why this priority**: Conversational interfaces make robots accessible to non-expert users and are essential for human-robot collaboration.

**Independent Test**: Can be fully tested by having a learner implement a basic voice command interface that triggers robot actions.

**Acceptance Scenarios**:

1. **Given** a learner completes Chapter 7, **When** they review the architecture, **Then** they understand ASR, NLU, dialogue management, and TTS components.
2. **Given** a learner implements a voice interface, **When** they test with spoken commands, **Then** the robot responds appropriately.
3. **Given** a learner encounters recognition failures, **When** they consult debugging notes, **Then** they find guidance on noise, latency, and intent classification issues.

---

### User Story 8 - Complete Capstone Autonomous Humanoid Agent (Priority: P8)

A learner wants to integrate all previous chapters into a complete autonomous humanoid agent that perceives, reasons, plans, and acts in a simulated environment.

**Why this priority**: The capstone demonstrates mastery by requiring integration of all concepts and provides a portfolio-worthy project.

**Independent Test**: Can be fully tested by having a learner run the complete autonomous agent in simulation and observe it completing a multi-step task.

**Acceptance Scenarios**:

1. **Given** a learner completes Chapter 8, **When** they run the capstone simulation, **Then** the humanoid agent autonomously completes a specified task sequence.
2. **Given** a learner reviews the integration architecture, **When** they trace data flow, **Then** they can identify how each previous chapter's concepts connect.
3. **Given** the capstone fails, **When** the learner debugs, **Then** they can isolate which subsystem (perception, planning, control, communication) caused the failure.

---

### Edge Cases

- What happens when a learner lacks GPU hardware for Isaac Sim chapters?
  - Graceful degradation: Provide CPU-based alternatives and cloud simulation options where possible.
- How does the system handle outdated ROS 2 distributions?
  - Content specifies Humble/Iron only; deprecated API warnings are documented.
- What if code examples fail due to dependency version conflicts?
  - Each chapter includes dependency version pinning and troubleshooting for common conflicts.
- How does content support simulation-only learners without physical robots?
  - All content is designed to be fully completable in simulation; physical hardware sections are clearly marked as optional extensions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each chapter MUST begin with explicit learning objectives (3-5 measurable goals).
- **FR-002**: Each chapter MUST include a system-level architecture diagram with labeled components.
- **FR-003**: All code examples MUST use Python (rclpy) and be compatible with ROS 2 Humble or Iron.
- **FR-004**: Each chapter MUST include a "Common Failure Modes" section with debugging guidance.
- **FR-005**: Each chapter MUST include hardware and compute requirements with minimum specifications.
- **FR-006**: Content MUST be structured for semantic chunking to support RAG retrieval.
- **FR-007**: Each chapter MUST be independently understandable without requiring prior chapters (cross-references allowed but not mandatory prerequisites).
- **FR-008**: No content MUST include ROS 1 APIs or deprecated ROS 2 APIs.
- **FR-009**: No content MUST provide unsafe real-world deployment instructions without explicit safety warnings.
- **FR-010**: Content MUST support multilingual transformation (structure should not rely on English-specific idioms).
- **FR-011**: The textbook MUST follow the 8-chapter structure defined in the constitution.
- **FR-012**: All simulation examples MUST use Gazebo and/or NVIDIA Isaac Sim.
- **FR-013**: Chapters MUST use interactive MDX format including code playgrounds, embedded quizzes, and collapsible sections for active learning.
- **FR-014**: Humanoid robot examples MUST use Unitree H1 as the reference model for consistency across locomotion, manipulation, and capstone chapters.
- **FR-015**: Each chapter MUST target 4,000-6,000 words to ensure standard technical textbook depth while meeting the 2-hour reading time goal.

### Key Entities

- **Chapter**: A self-contained learning unit with objectives, architecture, implementation, debugging, and hardware sections.
- **Learning Objective**: A measurable goal statement that learners should achieve after completing a chapter.
- **Code Example**: A runnable Python snippet using rclpy, with version requirements and expected output documented.
- **Architecture Diagram**: A visual representation of system components and their relationships within a chapter's domain.
- **Failure Mode**: A documented common error scenario with symptoms, causes, and resolution steps.
- **Unitree H1**: The reference humanoid robot model used consistently across chapters; open-source friendly with ROS 2 support and Isaac Sim assets.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Learners with Python proficiency but no ROS experience can complete Chapter 2 (ROS 2 basics) within 4 hours of focused study.
- **SC-002**: 90% of code examples execute successfully on first attempt when dependencies are correctly installed.
- **SC-003**: Each chapter can be read and understood independently in under 2 hours.
- **SC-004**: Learners can complete the capstone project (Chapter 8) within 8 hours using only knowledge from the textbook.
- **SC-005**: Content supports retrieval queries: any concept mentioned in learning objectives can be found via keyword search within the chapter.
- **SC-006**: All 8 chapters pass editorial review for technical accuracy, clarity, and adherence to constitution guidelines.
- **SC-007**: Content renders correctly in Docusaurus and can be deployed to GitHub Pages or Vercel without errors.
- **SC-008**: Simulation-only learners (no physical hardware) can complete 100% of required exercises.

## Assumptions

- Learners have Python 3.8+ proficiency and can install packages via pip.
- Learners have access to a Linux-based development environment (Ubuntu 22.04 recommended for ROS 2).
- GPU-dependent content (Isaac Sim) clearly documents NVIDIA GPU requirements and provides degradation paths for CPU-only users.
- Panaversity curriculum requirements align with the 8-chapter structure defined in the constitution.
- Docusaurus is pre-configured for the deployment target; content creation does not include Docusaurus setup.

---

## Feature Overview: Integrated RAG Chatbot

The textbook includes an Integrated Retrieval-Augmented Generation (RAG) Chatbot as a first-class feature. This chatbot is embedded directly in the Docusaurus UI and provides interactive question answering grounded exclusively in the textbook content.

### Core Characteristics

- **Embedded Interface**: The chatbot appears as a floating widget on all textbook pages within the Docusaurus site.
- **Exclusive Corpus**: The textbook MDX content is the ONLY knowledge source. The chatbot does not access external information or model knowledge for answering questions.
- **Interactive Learning**: Enables learners to ask questions about concepts, request clarifications, and explore topics beyond linear reading.
- **Text Selection Grounding**: Users can select specific text passages to scope their questions to that context.

### Educational Purpose

The RAG chatbot transforms the textbook from static content into an interactive learning system by:

1. Enabling just-in-time concept clarification without leaving the reading context
2. Supporting exploratory learning through natural language queries
3. Providing source-cited answers that reference specific book sections
4. Acknowledging knowledge boundaries when content is not present

---

## RAG System Architecture

The RAG pipeline comprises six interconnected layers, each with defined responsibilities and constraints.

### Content Source Layer

| Attribute | Specification |
|-----------|---------------|
| Format | MDX/Markdown chapters |
| Chunking | Semantic boundaries (sections, subsections) |
| Chunk Size | 300-500 tokens per chunk (optimized for retrieval) |
| Chunk IDs | Stable identifiers: `{chapter}:{section}:{position}` |
| Metadata | Chapter title, section heading, keywords, language |

Content is chunked at semantic boundaries (H2/H3 headings) to preserve conceptual coherence. Chunk IDs remain stable across re-indexing operations to maintain reference integrity.

### Indexing Layer

| Attribute | Specification |
|-----------|---------------|
| Embedding Model | OpenAI text-embedding-3-small |
| Vector Dimensions | 1536 |
| Vector Database | Qdrant Cloud (Free Tier) |
| Collection Strategy | One collection per book version |

The indexing layer generates vector embeddings for all chunks and stores them with associated metadata. Re-indexing operations preserve chunk ID stability for forward compatibility.

### Metadata Layer

| Attribute | Specification |
|-----------|---------------|
| Database | Neon Serverless Postgres |
| Stored Metadata | Chunk ID, chapter, section, language, version, position |
| Purpose | Structural filtering, version management, analytics |

The metadata layer links chunk IDs to book structure, enabling structural queries (e.g., "only search Chapter 3") and version-aware retrieval.

### Retrieval Layer

| Attribute | Specification |
|-----------|---------------|
| Search Type | Hybrid (semantic similarity + structural filters) |
| Default Scope | Entire book corpus |
| Selected Text Mode | User selection overrides global retrieval |
| Chapter Scoping | Optional filter by chapter boundary |
| Result Limit | Top-k retrieval (k=5 default) |

Retrieval supports two modes:
1. **Global retrieval**: Searches entire indexed corpus
2. **Scoped retrieval**: Restricts search to user-selected text context or specified chapter

### Generation Layer

| Attribute | Specification |
|-----------|---------------|
| Agent Framework | OpenAI Agents SDK |
| Grounding | Strict adherence to retrieved chunks only |
| Citation | All answers cite source chunks |
| Refusal | Explicit acknowledgment when answer not found |

The generation layer synthesizes answers from retrieved chunks without introducing external knowledge. The agent is constrained to generate only grounded responses.

### API Layer

| Attribute | Specification |
|-----------|---------------|
| Framework | FastAPI |
| Request Handling | Stateless |
| Authentication | CORS-aware for Docusaurus frontend |
| Endpoints | `/api/chat` (POST), `/api/health` (GET) |

The API layer serves as the interface between the frontend chatbot widget and the RAG pipeline, handling request validation, retrieval orchestration, and response formatting.

---

## OpenAI Agents SDK: Agent Specification

### Primary Agent: `physical_ai_book_agent`

#### Role and Responsibilities

The `physical_ai_book_agent` serves as the exclusive question-answering interface for the textbook. Its responsibilities include:

1. Interpreting user questions about Physical AI, ROS 2, simulation, and humanoid robotics
2. Invoking retrieval tools to find relevant textbook content
3. Synthesizing answers grounded exclusively in retrieved chunks
4. Citing sources using chapter and section references
5. Refusing to answer when content is not present in the corpus

#### Allowed Tools

| Tool | Purpose | Constraints |
|------|---------|-------------|
| `search_book_content` | Semantic search against indexed corpus | Read-only, no external access |

The agent has access to retrieval tools only. External browsing, web search, code execution, and file system access are explicitly prohibited.

#### Input Types

1. **Free-form questions**: Natural language queries about any textbook topic
   - Example: "What is the difference between ROS 1 and ROS 2?"

2. **User-selected text + question**: Contextual queries scoped to highlighted passages
   - Example: [Selected: "perception-planning-action loop"] + "Can you explain this concept?"

#### Output Constraints

1. **Citation requirement**: All factual statements MUST cite the source chunk using format `[Chapter: Section]`
2. **Grounding enforcement**: Answers MUST NOT contain information absent from retrieved chunks
3. **Refusal protocol**: When content is not found, respond: "This information is not covered in the retrieved textbook content."
4. **No hallucination**: Model knowledge MUST NOT supplement or contradict book content

#### System Prompt (Summary)

```
You are the Physical AI Textbook Assistant. Answer questions using ONLY
retrieved textbook content. Cite sources as [Chapter: Section]. If the
answer is not in retrieved content, state: "This information is not
covered in the retrieved textbook content." Never contradict book content.
Never use external knowledge.
```

### Future Extensibility

The agent architecture supports future extensions:

- **Personalization-aware agents**: Track learner progress and tailor responses to knowledge level
- **Multilingual response agents**: Generate answers in Urdu and other languages while maintaining grounding in English source content

---

## RAG Functional Requirements

### Content Indexing

- **FR-RAG-001**: All MDX chapter content MUST be indexed into the vector database before chatbot deployment.
- **FR-RAG-002**: Each indexed chunk MUST have a stable, unique chunk ID following the format `{chapter}:{section}:{position}`.
- **FR-RAG-003**: Chunk metadata MUST include chapter identifier, section heading, keywords (from frontmatter), and content language.

### Answer Generation

- **FR-RAG-004**: The chatbot MUST answer questions using ONLY content retrieved from the indexed corpus.
- **FR-RAG-005**: The chatbot MUST NOT use model knowledge to supplement or contradict retrieved content.
- **FR-RAG-006**: All chatbot answers MUST cite source references using format `[Chapter Title: Section Heading]`.

### User Interaction

- **FR-RAG-007**: The chatbot MUST support user-selected text grounding, where selection overrides global retrieval scope.
- **FR-RAG-008**: The chatbot MUST support optional chapter-scoped queries when the user specifies chapter boundaries.
- **FR-RAG-009**: The chatbot MUST display source citations with each answer.

### Absence Handling

- **FR-RAG-010**: When the answer is not present in retrieved chunks, the chatbot MUST explicitly state: "This information is not covered in the retrieved textbook content."
- **FR-RAG-011**: The chatbot MUST NOT fabricate information to fill gaps in retrieved content.

### Multilingual Readiness

- **FR-RAG-012**: The indexing pipeline MUST support content language metadata to enable future multilingual retrieval.
- **FR-RAG-013**: The system architecture MUST support adding multilingual collections without restructuring.

---

## RAG User Scenarios & Acceptance Tests

### User Story RAG-1: Ask Conceptual Question About a Chapter (Priority: P1-RAG)

A learner reading Chapter 2 wants to ask a clarifying question about ROS 2 nodes without leaving the page.

**Acceptance Scenarios**:

1. **Given** a learner is on Chapter 2, **When** they open the chatbot and ask "What is the difference between a ROS 2 node and a topic?", **Then** they receive an answer citing Chapter 2 sections with accurate definitions.

2. **Given** the chatbot receives a valid question, **When** the answer is generated, **Then** at least one source citation appears in the format `[Chapter: Section]`.

3. **Given** the question has a clear answer in Chapter 2, **When** the chatbot responds, **Then** the response does not include information from external sources.

---

### User Story RAG-2: Ask Question About Selected Text (Priority: P2-RAG)

A learner selects a paragraph about "domain randomization" and wants a simplified explanation.

**Acceptance Scenarios**:

1. **Given** a learner selects text containing "domain randomization", **When** they ask "Can you explain this in simpler terms?", **Then** the chatbot responds with content grounded in the selected passage.

2. **Given** text is selected, **When** a question is submitted, **Then** the retrieval scope is limited to the selected context (not the full corpus).

3. **Given** the selected text is from Chapter 4, **When** the answer is generated, **Then** citations reference Chapter 4 sections.

---

### User Story RAG-3: Ask Question Spanning Multiple Chapters (Priority: P3-RAG)

A learner wants to understand how perception concepts (Chapter 1) connect to VLA systems (Chapter 5).

**Acceptance Scenarios**:

1. **Given** a learner asks "How does the perception-planning-action loop relate to VLA pipelines?", **When** the chatbot processes the query, **Then** it retrieves relevant chunks from both Chapter 1 and Chapter 5.

2. **Given** multiple chapters are relevant, **When** the answer is generated, **Then** citations from multiple chapters appear.

3. **Given** cross-chapter content is retrieved, **When** the answer is synthesized, **Then** the response coherently integrates concepts without contradiction.

---

### User Story RAG-4: Handle Answer Not Found (Priority: P1-RAG)

A learner asks about a topic not covered in the textbook.

**Acceptance Scenarios**:

1. **Given** a learner asks "What is the SLAM algorithm?", **When** SLAM is not covered in the textbook, **Then** the chatbot responds: "This information is not covered in the retrieved textbook content."

2. **Given** an "answer not found" scenario, **When** the chatbot responds, **Then** it does NOT hallucinate an answer from model knowledge.

3. **Given** no relevant chunks are retrieved, **When** the response is generated, **Then** the `grounded` field in the response is `false`.

---

### RAG Edge Cases

- **What happens when retrieval returns low-confidence matches?**
  - The chatbot acknowledges uncertainty: "Based on the available content, here is what I found..." with appropriate source citations.

- **What if the user selects text from a non-chapter page (e.g., intro)?**
  - The system indexes all MDX content including intro pages; selection grounding works uniformly.

- **What if the same question is asked repeatedly?**
  - Stateless design means each query is processed independently; no session state is maintained.

- **How does the system handle very long selected text passages?**
  - Selection is truncated to 2000 characters maximum to fit within embedding context limits.

---

## Non-Functional Requirements (RAG)

### Performance

- **NFR-RAG-001**: Chatbot responses MUST be generated within 5 seconds for 95% of queries under normal load.
- **NFR-RAG-002**: The retrieval layer MUST return results within 500ms for 95% of queries.
- **NFR-RAG-003**: The system MUST support at least 10 concurrent chat sessions without degradation.

### Determinism and Grounding

- **NFR-RAG-004**: Given identical queries and corpus state, retrieval results MUST be deterministic.
- **NFR-RAG-005**: The generation layer MUST enforce grounding constraints with no bypass mechanism.
- **NFR-RAG-006**: All generated responses MUST pass grounding validation before delivery.

### Re-indexing Safety

- **NFR-RAG-007**: Re-indexing operations MUST preserve chunk ID stability for unchanged content.
- **NFR-RAG-008**: Re-indexing MUST be idempotent; running twice produces the same result.
- **NFR-RAG-009**: Partial indexing failures MUST NOT corrupt the existing collection.

### Version Compatibility

- **NFR-RAG-010**: The system MUST support multiple book versions through separate collections.
- **NFR-RAG-011**: Queries MUST target the correct version collection based on deployment context.
- **NFR-RAG-012**: Deprecated content versions MUST be marked but not automatically deleted.

### Availability

- **NFR-RAG-013**: Chatbot unavailability MUST NOT block textbook reading (graceful degradation).
- **NFR-RAG-014**: Health check endpoint MUST report accurate system status including vector DB connectivity.

---

## Safety & Governance Alignment

### Constitution Compliance

The RAG chatbot is governed by the constitution (Section XII: Safety and Ethics, Section XIII: Integrated RAG System Governance). The following constraints are binding:

1. **Simulation-first preservation**: All chatbot answers MUST respect the simulation-before-physical-deployment principle. Answers MUST NOT encourage bypassing simulation for real-world deployment.

2. **No unsafe physical-world instructions**: The chatbot MUST NOT generate instructions for physical robot operation that could cause harm. Safety warnings from source content MUST be preserved in answers.

3. **No weaponization content**: The chatbot MUST refuse queries that could enable weaponization or unsafe autonomy, consistent with constitution Section XII.

### Grounding as Safety

Strict grounding to book content serves as a safety mechanism:

- Hallucinated physical-world instructions are prevented by corpus-only generation
- Safety warnings authored in chapters are retrieved and included in relevant answers
- Unknown topics result in explicit refusal rather than fabricated guidance

### Corpus Authority

Per constitution Section XIII (Corpus Authority):

- The book content is the SOLE authoritative corpus
- External knowledge sources MUST NOT be injected
- Model knowledge MUST NOT override retrieved content
- Conflicts between retrieved chunks MUST be acknowledged, not resolved by fabrication

### Audit Trail

- All chatbot queries and responses SHOULD be logged for safety review
- Grounding validation failures MUST be logged with query details
- Refusal events (answer not found) MUST be logged for content gap analysis
