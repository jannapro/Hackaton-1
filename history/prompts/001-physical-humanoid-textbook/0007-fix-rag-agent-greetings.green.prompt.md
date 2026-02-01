---
id: 0007
title: Fix RAG Agent Greetings with OpenAI Agents SDK
stage: green
date: 2026-02-01
surface: agent
model: claude-opus-4-5-20251101
feature: 001-physical-humanoid-textbook
branch: 001-physical-humanoid-textbook
user: janna
command: implementation fix
labels: ["rag", "openai-agents-sdk", "greetings", "bug-fix"]
links:
  spec: specs/001-physical-humanoid-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/app/core/agent.py (modified - improved system prompt)
tests:
  - Greeting test PASS ("Hi!" → friendly response without search)
  - Technical query PASS ("What is Physical AI?" → grounded answer with citations)
---

## Prompt

fix instructions of agent and make sure the agent should be on openai agent sdk and tell me in which file ar in the code of agent

## Response snapshot

Fixed the RAG chatbot agent to handle greetings while using OpenAI Agents SDK:

**Problem**: Agent was calling search_textbook for ALL queries including greetings, returning "not covered in context" for "hi", "hello", etc.

**Solution**: Updated system prompt in `backend/app/core/agent.py` with explicit instructions:

```python
AGENT_SYSTEM_PROMPT = """You are a friendly and knowledgeable AI assistant...

## When to Search vs Not Search:

**DO NOT search for:**
- Greetings: "hi", "hello", "hey", "good morning", etc. → Just greet them back warmly
- Thanks: "thank you", "thanks" → You're welcome!
- How are you: → Respond friendly, ask how you can help

**DO search for:**
- Any question about Physical AI, robotics, ROS 2, simulation, etc.
- Technical questions
- Questions about chapter content
"""
```

**OpenAI Agents SDK components used**:
- `Agent` - defines assistant with name, instructions, model, tools
- `Runner.run()` - async execution of agent
- `@function_tool` - decorator for search_textbook tool
- `set_default_openai_key()` - API key configuration

**Test results**:
- "Hi!" → "Hello! 👋 I'm the Physical AI Textbook Assistant..."
- "What is Physical AI?" → Detailed grounded answer with [Chapter: Section] citations

## Outcome

- ✅ Impact: RAG chatbot now handles both greetings and technical queries correctly
- 🧪 Tests: Manual testing PASS for greetings and technical questions
- 📁 Files: 1 file modified (agent.py)
- 🔁 Next prompts: Run remaining tasks T194.2, T198, T217, T217.2
- 🧠 Reflection: System prompt clarity is critical for tool usage decisions

## Evaluation notes (flywheel)

- Failure modes observed: LLM called search tool for non-technical queries
- Graders run and results (PASS/FAIL): Manual test PASS
- Prompt variant (if applicable): Added explicit DO/DON'T search instructions
- Next experiment (smallest change to try): Add few-shot examples in system prompt if issues persist
