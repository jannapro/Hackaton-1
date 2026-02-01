# Implementation Plan: Physical Humanoid Robots Textbook

**Branch**: `001-physical-humanoid-textbook` | **Date**: 2026-01-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-physical-humanoid-textbook/spec.md`

## Summary

Produce an AI-native technical textbook with 8 chapters covering Physical AI and Humanoid Robotics, featuring an **embedded RAG chatbot** that uses the book as its authoritative corpus for grounded Q&A. Content uses interactive MDX format, targets Docusaurus deployment, and follows governance-before-content discipline with optional Claude Code subagent support.

**Key Differentiators**:
- **Book-as-Corpus**: The textbook content serves as the ONLY knowledge source for the RAG chatbot
- **Text Selection Grounding**: Users can select text to scope chatbot queries
- **Strict Grounding Rules**: Agent refuses to answer when content is not in the book

## Technical Context

**Language/Version**: Python 3.10+ (rclpy examples, FastAPI backend), MDX (content), TypeScript (Docusaurus, React)
**Primary Dependencies**: Docusaurus 3.x, ROS 2 Humble/Iron, Gazebo, NVIDIA Isaac Sim, rclpy, OpenAI Agents SDK, Qdrant, FastAPI
**Storage**: Git repository (content as MDX files), Qdrant Cloud (vector embeddings), Neon Postgres (metadata)
**Testing**: Manual editorial review, code example validation via ROS 2 runtime, RAG grounding validation
**Target Platform**: Docusaurus static site → GitHub Pages / Vercel; FastAPI backend → Render
**Project Type**: Documentation/Textbook (static site generation) + RAG Chatbot (AI-powered Q&A)
**Performance Goals**: <3s page load, RAG-optimized chunk size (500-1000 tokens per section), <2s chatbot response
**Constraints**: 4,000-6,000 words per chapter, ROS 2 only (no ROS 1), simulation-first, book-only grounding
**Scale/Scope**: 8 chapters, ~40,000-48,000 total words, Unitree H1 reference model, ~200 vector chunks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Supreme Authority | PASS | Plan follows constitution as highest authority |
| II. Source of Truth | PASS | Context7 MCP usage planned for content alignment |
| III. Context7 MCP | PASS | Chapter authoring phase mandates Context7 queries |
| IV. GitHub MCP | PASS | Incremental commits per chapter, no history rewrite |
| V. Purpose | PASS | Textbook scope matches constitution mission |
| VI. Audience | PASS | Python assumed, ROS not assumed, simulation-only supported |
| VII. Pedagogical | PASS | Each chapter has objectives, architecture, debugging, hardware |
| VIII. Structure | PASS | 8-chapter structure matches constitution exactly |
| IX. Technical Fidelity | PASS | ROS 2 Humble/Iron only, rclpy, Gazebo/Isaac Sim |
| X. AI-Native | PASS | RAG chunking, MDX format, multilingual-ready structure |
| XI. Tone | PASS | Technical, no emojis, no hype |
| XII. Safety | PASS | Simulation-first, safety warnings required |

**Gate Status**: PASS - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-physical-humanoid-textbook/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (chapter templates)
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
docs/
├── intro.mdx                          # Book introduction
├── 01-physical-ai-foundations/
│   ├── index.mdx                      # Chapter 1 main content
│   ├── _category_.json                # Docusaurus category config
│   └── assets/                        # Architecture diagrams
├── 02-ros2-robotic-nervous-system/
│   ├── index.mdx
│   ├── _category_.json
│   └── assets/
├── 03-digital-twins-gazebo-unity/
│   ├── index.mdx
│   ├── _category_.json
│   └── assets/
├── 04-nvidia-isaac-robot-intelligence/
│   ├── index.mdx
│   ├── _category_.json
│   └── assets/
├── 05-vision-language-action/
│   ├── index.mdx
│   ├── _category_.json
│   └── assets/
├── 06-humanoid-locomotion-manipulation/
│   ├── index.mdx
│   ├── _category_.json
│   └── assets/
├── 07-conversational-robotics/
│   ├── index.mdx
│   ├── _category_.json
│   └── assets/
└── 08-capstone-autonomous-agent/
    ├── index.mdx
    ├── _category_.json
    └── assets/

src/
├── components/
│   ├── CodePlayground.tsx             # Interactive code execution
│   ├── Quiz.tsx                       # Embedded quiz component
│   ├── CollapsibleSection.tsx         # Expandable content blocks
│   └── ChatbotWidget.tsx              # RAG chatbot UI component
├── hooks/
│   └── useTextSelection.ts            # Text selection detection
├── services/
│   └── chatApi.ts                     # RAG API client
└── theme/
    ├── custom.css                     # Textbook styling
    └── Layout/
        └── index.tsx                  # Global layout with chatbot

backend/                               # RAG Chatbot Backend
├── app/
│   ├── main.py                        # FastAPI application entry
│   ├── config.py                      # Environment configuration
│   ├── api/routes/
│   │   ├── chat.py                    # POST /api/chat endpoint
│   │   └── health.py                  # GET /api/health endpoint
│   ├── core/
│   │   ├── agent.py                   # OpenAI Agents SDK agent
│   │   ├── retrieval.py               # Qdrant vector search
│   │   └── embeddings.py              # Embedding generation
│   ├── services/
│   │   └── indexing.py                # MDX parsing & chunking
│   └── models/
│       └── schemas.py                 # Pydantic models
├── scripts/
│   └── index_content.py               # CLI to index book content
├── requirements.txt                   # Python dependencies
└── .env                               # Environment variables (gitignored)

static/
├── img/                               # Shared images
└── code-examples/                     # Downloadable ROS 2 packages

docusaurus.config.ts                   # Site configuration
sidebars.ts                            # Navigation structure
```

**Structure Decision**: Docusaurus documentation site with MDX chapters organized by topic. Each chapter is a self-contained directory with index.mdx and assets. Custom React components provide interactivity (code playgrounds, quizzes). **RAG chatbot** implemented as a separate FastAPI backend with OpenAI Agents SDK, deployed independently and accessed via REST API.

---

## Execution Phases

### Phase 1: Governance Initialization

**Objective**: Establish project governance before any content creation.

**Actions**:
1. Ratify constitution at `.specify/memory/constitution.md`
2. Verify Context7 MCP connectivity for Panaversity curriculum
3. Configure GitHub MCP for incremental commits
4. Create chapter template enforcing constitution requirements

**Outputs**:
- [x] Constitution v1.0.0 ratified
- [ ] Context7 curriculum alignment verified
- [ ] Chapter template with mandatory sections

**Gate**: Constitution ratified and MCP tools operational

---

### Phase 2: Specification Authoring

**Objective**: Complete feature specification with all clarifications resolved, including RAG architecture.

**Actions**:
1. Create spec.md with 8 user stories (1 per chapter)
2. Define functional requirements (FR-001 through FR-015)
3. Run `/sp.clarify` to resolve ambiguities
4. Document success criteria and assumptions
5. Define RAG functional requirements (FR-RAG-001 through FR-RAG-013)
6. Define RAG non-functional requirements (NFR-RAG-001 through NFR-RAG-014)
7. Document RAG agent specification and grounding rules
8. Define RAG user scenarios with acceptance tests

**Outputs**:
- [x] spec.md with 15 functional requirements
- [x] Clarifications session (MDX format, Unitree H1, word count)
- [x] Quality checklist passed
- [x] RAG system architecture documented
- [x] Agent grounding rules specified
- [x] RAG acceptance tests defined

**Gate**: No [NEEDS CLARIFICATION] markers remain; RAG architecture approved

---

### Phase 3: Agent Definition (Optional)

**Objective**: Define optional Claude Code subagents for parallel authoring.

**Actions**:
1. Define chapter-author subagent prompt template
2. Define code-validator subagent for ROS 2 example verification
3. Define rag-optimizer subagent for chunk analysis
4. Document agent coordination protocol

**Outputs**:
- [ ] `.specify/agents/chapter-author.md` template
- [ ] `.specify/agents/code-validator.md` template
- [ ] `.specify/agents/rag-optimizer.md` template

**Gate**: Optional - skip if single-agent workflow preferred

---

### Phase 4: Book Skeleton Creation

**Objective**: Create Docusaurus structure with empty chapter placeholders.

**Actions**:
1. Initialize Docusaurus project (if not exists)
2. Create `docs/` directory structure per Project Structure above
3. Create `_category_.json` for each chapter directory
4. Create placeholder `index.mdx` with chapter template (objectives, sections, no content)
5. Configure `sidebars.ts` with 8-chapter navigation
6. Create custom MDX components (CodePlayground, Quiz, CollapsibleSection)

**Outputs**:
- [ ] `docs/` with 8 chapter directories
- [ ] `src/components/` with interactive components
- [ ] `docusaurus.config.ts` configured
- [ ] `sidebars.ts` with chapter navigation
- [ ] Empty chapter templates with section headers only

**Gate**: `npm run build` succeeds with skeleton site

---

### Phase 5: Chapter Authoring (Iterative)

**Objective**: Author each chapter following constitution and spec requirements.

**Actions** (per chapter, P1→P8 priority order):
1. Query Context7 MCP for curriculum alignment
2. Write learning objectives (3-5 measurable goals)
3. Create system-level architecture diagram
4. Write content sections (4,000-6,000 words total)
5. Add code examples (rclpy, ROS 2 Humble/Iron compatible)
6. Add interactive elements (code playgrounds, quizzes)
7. Write "Common Failure Modes" section
8. Document hardware/compute requirements
9. Validate chapter independence (no mandatory prerequisites)
10. Commit via GitHub MCP with descriptive message

**Outputs** (per chapter):
- [ ] `docs/0X-chapter-name/index.mdx` (complete content)
- [ ] `docs/0X-chapter-name/assets/` (architecture diagrams)
- [ ] Code examples validated against ROS 2 runtime

**Chapter Order**:
| Priority | Chapter | Directory |
|----------|---------|-----------|
| P1 | Physical AI Foundations | `01-physical-ai-foundations/` |
| P2 | ROS 2: Robotic Nervous System | `02-ros2-robotic-nervous-system/` |
| P3 | Digital Twins: Gazebo & Unity | `03-digital-twins-gazebo-unity/` |
| P4 | NVIDIA Isaac & Robot Intelligence | `04-nvidia-isaac-robot-intelligence/` |
| P5 | Vision-Language-Action Systems | `05-vision-language-action/` |
| P6 | Humanoid Locomotion & Manipulation | `06-humanoid-locomotion-manipulation/` |
| P7 | Conversational Robotics | `07-conversational-robotics/` |
| P8 | Capstone: Autonomous Humanoid Agent | `08-capstone-autonomous-agent/` |

**Gate**: Each chapter passes editorial review before next chapter begins

---

### Phase 6: Cross-Chapter Consistency

**Objective**: Ensure consistency across all 8 chapters.

**Actions**:
1. Verify Unitree H1 usage consistent in chapters 6, 8
2. Cross-reference terminology (glossary consistency)
3. Validate code example patterns match across chapters
4. Check architecture diagram styling consistency
5. Verify learning objective measurability standards
6. Ensure ROS 2 API usage consistent (no deprecated APIs)

**Outputs**:
- [ ] Consistency audit report
- [ ] Updated chapters with fixes (if needed)
- [ ] Glossary appendix (optional)

**Gate**: All consistency checks pass

---

### Phase 7: AI-Native Optimization

**Objective**: Optimize content for RAG retrieval and AI applications.

**Actions**:
1. Analyze content chunks (target 500-1000 tokens per section)
2. Add semantic headers for retrieval
3. Verify keyword density in learning objectives
4. Test retrieval queries against chapter content
5. Validate multilingual transformation compatibility (no idioms)
6. Add metadata frontmatter for RAG indexing
7. Validate chunk boundaries align with semantic sections
8. Test grounding with edge-case queries (out-of-scope topics)
9. Verify citation format consistency across retrieved chunks

**Outputs**:
- [x] Chunk analysis report (193 chunks indexed, ~200-600 tokens each)
- [ ] Updated chapters with optimized structure
- [x] RAG test query results (grounding validated)
- [x] Vector embeddings indexed in Qdrant Cloud

**Gate**: SC-005 validated (concepts findable via keyword search); RAG grounding test pass rate >95%

---

### Phase 8: Integrated RAG System Lifecycle

**Objective**: Implement and validate the RAG chatbot as a first-class system component.

**Actions**:
1. **Content Preparation & Chunking**
   - Parse MDX files with frontmatter extraction
   - Chunk content at semantic boundaries (H2/H3 headings)
   - Generate stable chunk IDs: `{chapter}:{section}:{position}`
   - Validate chunk sizes (500-1000 tokens target)

2. **Vector Indexing (Qdrant)**
   - Configure Qdrant Cloud collection with cosine similarity
   - Generate embeddings via OpenAI text-embedding-3-small
   - Upsert chunks with metadata payload
   - Verify collection health and chunk count

3. **Metadata Storage (Neon Postgres)**
   - Create schema for conversation history
   - Store user feedback and grounding metrics
   - Track chunk usage analytics

4. **Agent Definition (OpenAI Agents SDK)**
   - Define grounding system prompt with constitution rules
   - Implement `search_book_content` function tool
   - Configure conversation memory (last 10 messages)
   - Implement grounding validation logic

5. **API Layer (FastAPI)**
   - POST `/api/chat` endpoint with streaming support
   - GET `/api/health` with Qdrant connectivity check
   - CORS configuration for GitHub Pages origin
   - Rate limiting and error handling

6. **UI Integration (Docusaurus)**
   - ChatbotWidget React component (floating button + modal)
   - Text selection detection hook
   - Chat API client with error handling
   - Layout swizzle for global injection

7. **Safety, Validation & Governance**
   - Grounding test suite (in-scope and out-of-scope queries)
   - Citation format validation
   - Hallucination detection heuristics
   - User feedback collection

**Outputs**:
- [x] `backend/` directory with FastAPI application
- [x] `backend/app/core/agent.py` with OpenAI Agents SDK integration
- [x] `backend/app/core/retrieval.py` with Qdrant search
- [x] `backend/scripts/index_content.py` CLI tool
- [x] `src/components/ChatbotWidget.tsx` React component
- [x] `src/hooks/useTextSelection.ts` selection detection
- [x] 193 chunks indexed in Qdrant Cloud
- [ ] Neon Postgres schema for analytics
- [ ] Grounding test suite with >95% pass rate

**Gate**: Chatbot responds correctly to 10 sample queries; grounding refusal works for out-of-scope topics

---

### Phase 9: Deployment Preparation

**Objective**: Prepare for Docusaurus deployment to GitHub Pages / Vercel and RAG backend deployment to Render.

**Actions**:
1. Run `npm run build` and fix any errors
2. Validate all internal links resolve
3. Test responsive design on mobile/tablet
4. Configure deployment target (GitHub Pages or Vercel)
5. Set up CI/CD pipeline for automated builds
6. Create deployment documentation
7. **RAG Service Readiness Checks**:
   - Verify Qdrant Cloud collection accessible from production
   - Verify OpenAI API key valid and rate limits sufficient
   - Configure FastAPI backend for Render deployment
   - Set production environment variables
   - Test CORS with production frontend URL
8. Deploy FastAPI backend to Render
9. Update frontend API URL to production endpoint
10. End-to-end testing with production services

**Outputs**:
- [ ] Successful production build (Docusaurus)
- [ ] Deployment configuration (GitHub Actions or Vercel config)
- [ ] Deployment documentation
- [ ] FastAPI backend deployed to Render
- [ ] Production `.env` configured securely
- [ ] CORS validated for production origin
- [ ] End-to-end RAG flow tested

**Gate**: SC-007 validated (content renders correctly, deployable); RAG chatbot functional in production

---

### Phase 10: Maintenance & Extension

**Objective**: Define ongoing maintenance procedures for textbook and RAG system.

**Actions**:
1. Document ROS 2 version update procedure (Humble → future LTS)
2. Define chapter update workflow (Context7 re-sync)
3. Create contribution guidelines for external authors
4. Define Isaac Sim version compatibility matrix
5. Plan Unitree H1 model update path
6. **RAG System Maintenance**:
   - Define re-indexing procedure when content changes
   - Document chunk ID stability requirements
   - Create monitoring dashboard for Qdrant health
   - Define OpenAI API key rotation procedure
   - Establish grounding regression test suite
   - Plan embedding model upgrade path (text-embedding-3-small → future)
7. **Analytics & Feedback Loop**:
   - Monitor most-queried topics for content gaps
   - Track grounding failure patterns
   - Collect user satisfaction metrics

**Outputs**:
- [ ] `CONTRIBUTING.md` with authoring guidelines
- [ ] `MAINTENANCE.md` with update procedures
- [ ] Version compatibility matrix
- [ ] RAG re-indexing runbook
- [ ] Grounding regression test suite
- [ ] Monitoring and alerting configuration

**Gate**: Documentation complete for handoff; RAG maintenance procedures validated

---

## Complexity Tracking

> No constitution violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Unitree H1 Isaac Sim assets unavailable | High | Verify asset availability before Chapter 6; fallback to generic URDF |
| ROS 2 Iron deprecation | Medium | Pin to Humble as primary; Iron as secondary |
| Context7 curriculum drift | Medium | Re-sync before each chapter authoring phase |
| Code example breakage | High | CI validation against ROS 2 runtime container |
| **RAG: OpenAI API rate limits** | Medium | Implement request queuing; monitor usage; upgrade tier if needed |
| **RAG: Qdrant Cloud free tier limits** | Medium | Monitor vector count; upgrade to paid tier before limit |
| **RAG: Hallucination despite grounding** | High | Strict system prompt; grounding validation; user feedback loop |
| **RAG: Embedding model deprecation** | Low | Pin embedding model version; plan migration path |
| **RAG: Chunk drift after content updates** | Medium | Re-index on content change; stable chunk ID scheme |

---

## Next Steps

1. ~~Run `/sp.tasks` to generate task breakdown~~ ✅ Complete (240 tasks across 18 phases)
2. ~~Execute Phase 4 (Book Skeleton Creation)~~ ✅ Complete
3. ~~Begin Chapter 1-8 authoring~~ ✅ Complete (8 chapters, ~193 chunks)
4. ~~Implement RAG backend (Phase 8)~~ ✅ Mostly complete (193 chunks indexed)
5. **Remaining RAG tasks**:
   - T195-T198: Neon Postgres schema for analytics
   - T220-T224: Safety validation and governance tests
6. Deploy to production (Phase 9)
7. Create maintenance documentation (Phase 10)
