# Research: Physical Humanoid Robots Textbook

**Feature**: `001-physical-humanoid-textbook`
**Date**: 2026-01-21
**Purpose**: Resolve technical unknowns and document best practices for textbook implementation

---

## 1. Docusaurus MDX Interactive Components

**Decision**: Use Docusaurus 3.x with custom React components for interactivity

**Rationale**:
- Docusaurus 3.x supports MDX v2 natively with improved component syntax
- Custom components can be created in `src/components/` and imported in MDX
- Code playgrounds achievable via `@docusaurus/theme-live-codeblock` or custom implementation
- Quiz components require custom React implementation (no built-in support)

**Alternatives Considered**:
- Jupyter Book: Better for notebooks but weaker Docusaurus ecosystem integration
- GitBook: Proprietary, limited customization
- VuePress: Vue-based, team prefers React/TypeScript

**Implementation Notes**:
- Install `@docusaurus/theme-live-codeblock` for JavaScript code execution
- Python code playgrounds require external service (Pyodide, JupyterLite, or iframe to Colab)
- Quiz state can use React useState or localStorage for persistence

---

## 2. Unitree H1 Asset Availability

**Decision**: Use Unitree H1 as reference humanoid with fallback to generic URDF

**Rationale**:
- Unitree H1 URDF available in official `unitree_ros` repository
- Isaac Sim has Unitree Go1/Go2 assets; H1 may require conversion from URDF
- ROS 2 support via community packages (unitree_ros2)
- Open-source friendly licensing for educational use

**Alternatives Considered**:
- Boston Dynamics Atlas: No public URDF, proprietary
- Figure 01: Limited documentation, proprietary
- NAO/Pepper: Well-documented but not humanoid-scale

**Implementation Notes**:
- Verify H1 URDF compatibility with Gazebo Fortress/Harmonic
- For Isaac Sim: Convert URDF using Isaac Sim URDF Importer
- Maintain generic humanoid URDF as fallback if H1 assets unavailable

---

## 3. ROS 2 Humble vs Iron

**Decision**: Target ROS 2 Humble as primary, Iron as secondary

**Rationale**:
- Humble is LTS (support until 2027), widely adopted
- Iron is latest stable but shorter support window
- Code examples should work on both with minimal changes
- Ubuntu 22.04 supports both distributions

**Alternatives Considered**:
- Rolling: Too unstable for educational content
- Jazzy: Too new, limited adoption

**Implementation Notes**:
- Pin package versions in code examples
- Document any Humble/Iron API differences in failure modes section
- Use `ros2 pkg` patterns compatible with both

---

## 4. RAG Chunk Optimization

**Decision**: Target 500-1000 tokens per section for optimal retrieval

**Rationale**:
- Standard embedding models (OpenAI, Cohere) handle 512-8192 tokens
- Smaller chunks (500-1000) improve retrieval precision
- Larger chunks preserve context but reduce specificity
- MDX section headers create natural chunk boundaries

**Alternatives Considered**:
- Paragraph-level chunking: Too granular, loses context
- Chapter-level chunking: Too large, poor retrieval precision
- Sentence-level: Extremely granular, high overhead

**Implementation Notes**:
- Use H2/H3 headers as chunk boundaries
- Add frontmatter metadata for filtering (chapter, topic, difficulty)
- Avoid cross-section references within chunk (link instead)

---

## 5. Code Playground Implementation

**Decision**: Hybrid approach - live JS for simple demos, iframe to Colab/JupyterLite for Python/ROS

**Rationale**:
- ROS 2 code cannot run in browser without significant infrastructure
- JupyterLite can run Python but not ROS 2 nodes
- Google Colab can run ROS 2 in container but requires account
- Best UX: show code inline, provide "Run in Colab" button

**Alternatives Considered**:
- WebAssembly ROS 2: Experimental, not production-ready
- Docker-in-browser: Security concerns, heavy
- Video demonstrations: Not interactive

**Implementation Notes**:
- Create Colab notebook templates per chapter
- Link notebooks from code blocks with "Open in Colab" button
- For non-ROS Python (numpy, matplotlib): use JupyterLite embed

---

## 6. VLA Pipeline Architecture

**Decision**: Reference RT-2/OpenVLA style architecture for Chapter 5

**Rationale**:
- RT-2 (Google) and OpenVLA are well-documented open approaches
- Architecture pattern: Vision Encoder → LLM → Action Tokenizer → Robot Control
- Educational value in understanding transformer-based robot control
- Simulation-safe: can demonstrate without physical hardware

**Alternatives Considered**:
- Proprietary Tesla/Figure approaches: Limited documentation
- Classic behavior trees: Not VLA, different paradigm
- End-to-end RL: Less interpretable for education

**Implementation Notes**:
- Use pre-trained vision encoders (CLIP, DINOv2) in examples
- Action space: discrete tokens or continuous via MLP head
- Isaac Sim provides synthetic data generation for training demos

---

## 7. Conversational Robotics Stack

**Decision**: Use open-source ASR/TTS with ROS 2 integration

**Rationale**:
- Whisper (OpenAI) for ASR: Open-source, high quality
- Piper/Coqui for TTS: Open-source, customizable
- ROS 2 audio packages: `audio_common` stack
- LLM for NLU: Local (Ollama) or API (Claude/GPT)

**Alternatives Considered**:
- Google Cloud Speech: Requires API key, not fully open
- Amazon Lex: Proprietary, complex setup
- Rasa: Good for NLU but heavyweight for tutorial

**Implementation Notes**:
- Document Whisper setup with ROS 2 node wrapper
- Provide Ollama integration example for local LLM
- Include latency optimization guidance (streaming ASR/TTS)

---

## 8. Gazebo Version

**Decision**: Target Gazebo Harmonic (preferred) with Fortress fallback

**Rationale**:
- Gazebo Harmonic is latest stable, pairs with ROS 2 Humble/Iron
- Gazebo Fortress also supported, older but stable
- New Gazebo (Ignition rebranding) has improved physics
- ros_gz bridge provides ROS 2 integration

**Alternatives Considered**:
- Gazebo Classic (11): Deprecated, not recommended
- PyBullet: Simpler but less realistic physics
- MuJoCo: Excellent for RL but less ROS integration

**Implementation Notes**:
- Use `ros_gz` packages for bridge
- Document SDF model format (not legacy URDF for Gazebo)
- Include installation instructions for both Harmonic and Fortress

---

## Summary of Resolved Items

| Item | Resolution | Risk Level |
|------|------------|------------|
| MDX Interactive | Docusaurus 3.x + custom components | Low |
| Unitree H1 | Primary with generic URDF fallback | Medium |
| ROS 2 Version | Humble primary, Iron secondary | Low |
| RAG Chunks | 500-1000 tokens per section | Low |
| Code Playground | Hybrid: inline + Colab links | Medium |
| VLA Architecture | RT-2/OpenVLA reference pattern | Low |
| Conversational | Whisper + Piper + Ollama | Low |
| Gazebo Version | Harmonic preferred, Fortress fallback | Low |

**Status**: All NEEDS CLARIFICATION items resolved. Ready for Phase 1.
