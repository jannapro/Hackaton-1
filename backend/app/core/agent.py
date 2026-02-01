"""OpenAI Agents SDK agent for RAG-based Q&A with session memory."""

import os
import uuid
from typing import Any

from agents import Agent, Runner, SQLiteSession, function_tool, set_default_openai_key

from ..config import get_settings
from ..models.schemas import ChatResponse, SourceReference
from .retrieval import get_retrieval_service

# Get settings and configure API key
settings = get_settings()
set_default_openai_key(settings.openai_api_key)

# Session storage directory
SESSION_DB_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "data",
    "sessions.db"
)

# Ensure data directory exists
os.makedirs(os.path.dirname(SESSION_DB_PATH), exist_ok=True)

# Get retrieval service for the search tool
_retrieval_service = None


def _get_retrieval():
    global _retrieval_service
    if _retrieval_service is None:
        _retrieval_service = get_retrieval_service()
    return _retrieval_service


# System prompt for the agent
AGENT_SYSTEM_PROMPT = """You are a friendly and knowledgeable AI assistant for the "Physical Humanoid Robots" textbook.

## Your Personality:
- Be warm, helpful, and conversational
- Greet users back when they say hello, hi, hey, etc.
- For casual conversation (greetings, thanks, how are you), respond naturally without using the search tool
- You can have friendly small talk while staying professional

## Conversation Memory:
- You have access to the full conversation history with this user
- Remember what they asked before and refer back to it naturally
- If they ask follow-up questions like "tell me more" or "what about X", use the previous context
- You can say things like "As I mentioned earlier..." or "Building on what we discussed..."

## When to Search vs Not Search:

**DO NOT search for:**
- Greetings: "hi", "hello", "hey", "good morning", etc. → Just greet them back warmly
- Thanks: "thank you", "thanks" → You're welcome!
- How are you: → Respond friendly, ask how you can help
- General chat about yourself → Explain you're the textbook assistant

**DO search for:**
- Any question about Physical AI, robotics, ROS 2, simulation, etc.
- Technical questions
- Questions about chapter content
- "What is...", "How does...", "Explain...", "Tell me about..."

## When Answering Technical Questions:

1. **ALWAYS use the search_textbook tool first** to find relevant content
2. Base your answer ONLY on the retrieved content
3. Cite sources using [Chapter: Section] format
4. If the search returns no relevant results, say: "This topic isn't covered in the textbook. The book focuses on Physical AI, ROS 2, simulation, and humanoid robotics."

## Examples:

User: "Hi!"
You: "Hello! 👋 I'm the Physical AI Textbook Assistant. I can help you understand concepts from the book about Physical AI, ROS 2, simulation, and humanoid robotics. What would you like to learn about?"

User: "What is ROS 2?"
You: [Use search_textbook tool first, then answer based on results]

User: "Thanks for explaining that!"
You: "You're welcome! Feel free to ask if you have more questions about the textbook content."
"""


@function_tool
def search_textbook(query: str) -> str:
    """
    Search the Physical Humanoid Robots textbook for relevant content.
    Use this tool for ANY technical question about Physical AI, ROS 2, simulation, robotics, etc.
    DO NOT use this for greetings or casual conversation.

    Args:
        query: The search query to find relevant textbook sections

    Returns:
        Relevant excerpts from the textbook with source citations
    """
    retrieval = _get_retrieval()
    results = retrieval.search(query, limit=5, score_threshold=0.3)

    if not results:
        return "NO_RESULTS: No relevant content found in the textbook for this query. The textbook covers Physical AI, ROS 2, Gazebo/Isaac Sim simulation, humanoid locomotion, VLA systems, and conversational robotics."

    # Format results for the agent
    formatted = []
    for text, source, score in results:
        formatted.append(
            f"[{source.chapter}: {source.section}] (relevance: {score:.2f})\n{text}"
        )

    return "TEXTBOOK CONTENT:\n\n" + "\n\n---\n\n".join(formatted)


class TextbookAgent:
    """Agent for answering questions about the Physical AI textbook using OpenAI Agents SDK.

    Uses SQLiteSession for persistent conversation memory across multiple turns.
    Each conversation_id maps to a unique session that maintains full context.
    """

    def __init__(self):
        self.agent = Agent(
            name="Physical AI Textbook Assistant",
            instructions=AGENT_SYSTEM_PROMPT,
            model=settings.agent_model,
            tools=[search_textbook],
        )
        # Session cache for active conversations
        self._sessions: dict[str, SQLiteSession] = {}

    def _get_session(self, conversation_id: str) -> SQLiteSession:
        """Get or create a session for the given conversation ID.

        Sessions persist conversation history automatically, allowing the agent
        to remember previous messages and maintain context across turns.
        """
        if conversation_id not in self._sessions:
            self._sessions[conversation_id] = SQLiteSession(
                session_id=conversation_id,
                db_path=SESSION_DB_PATH
            )
        return self._sessions[conversation_id]

    async def chat(
        self,
        query: str,
        selected_text: str | None = None,
        conversation_id: str | None = None,
    ) -> ChatResponse:
        """
        Process a chat query and return a response.

        Args:
            query: The user's question
            selected_text: Optional user-selected text for context
            conversation_id: Optional ID for conversation continuity

        Returns:
            ChatResponse with answer, sources, and grounding status
        """
        # Generate conversation ID if needed
        if not conversation_id:
            conversation_id = str(uuid.uuid4())

        # Get or create session for this conversation
        session = self._get_session(conversation_id)

        # Build the user message
        if selected_text:
            user_message = f'The user selected this text from the textbook: "{selected_text[:500]}"\n\nTheir question: {query}'
        else:
            user_message = query

        # Run the agent with session for automatic context/memory management
        # The session automatically:
        # - Retrieves conversation history before each run
        # - Stores new messages after each run
        # - Maintains separate contexts for different conversation IDs
        result = await Runner.run(
            starting_agent=self.agent,
            input=user_message,
            session=session,
        )

        # Extract the response
        answer = result.final_output if result.final_output else "I couldn't generate a response."

        # Extract sources from the search results
        sources = self._extract_sources(query, answer)

        # Determine if response is grounded (only for technical answers)
        grounded = self._check_grounding(query, answer, sources)

        return ChatResponse(
            answer=answer,
            sources=sources,
            grounded=grounded,
            conversation_id=conversation_id,
        )

    def _is_greeting(self, query: str) -> bool:
        """Check if the query is a greeting or casual chat."""
        greetings = [
            "hi", "hello", "hey", "good morning", "good afternoon", "good evening",
            "howdy", "greetings", "what's up", "whats up", "sup", "yo",
            "thanks", "thank you", "thx", "bye", "goodbye", "see you",
            "how are you", "how r u", "how're you",
        ]
        query_lower = query.lower().strip()

        # Check if query is just a greeting
        for greeting in greetings:
            if query_lower == greeting or query_lower.startswith(greeting + " ") or query_lower.startswith(greeting + "!") or query_lower.startswith(greeting + ","):
                return True

        return len(query_lower) < 15 and any(g in query_lower for g in greetings)

    def _extract_sources(self, query: str, answer: str) -> list[SourceReference]:
        """Extract source references based on the answer content."""
        # Don't extract sources for greetings
        if self._is_greeting(query):
            return []

        sources = []
        seen_chunks = set()

        # Search to find what sources were likely used
        retrieval = _get_retrieval()

        # Only search if this seems like a technical question
        if len(query) > 10 and not self._is_greeting(query):
            search_results = retrieval.search(query, limit=3, score_threshold=0.3)

            for _, source, _ in search_results:
                if source.chunk_id not in seen_chunks:
                    seen_chunks.add(source.chunk_id)
                    sources.append(source)

        return sources

    def _check_grounding(self, query: str, answer: str, sources: list[SourceReference]) -> bool:
        """Check if the answer is grounded in sources."""
        # Greetings are always "grounded" (they don't need sources)
        if self._is_greeting(query):
            return True

        ungrounded_phrases = [
            "not covered in the retrieved",
            "not found in the textbook",
            "cannot find information",
            "no relevant content",
            "don't have information",
            "does not appear to cover",
            "isn't covered in the textbook",
            "not covered in the textbook",
        ]

        answer_lower = answer.lower()

        for phrase in ungrounded_phrases:
            if phrase in answer_lower:
                return False

        return len(sources) > 0

    def clear_conversation(self, conversation_id: str) -> bool:
        """Clear the conversation history for a given conversation ID.

        Args:
            conversation_id: The ID of the conversation to clear

        Returns:
            True if the conversation was cleared, False if it didn't exist
        """
        if conversation_id in self._sessions:
            del self._sessions[conversation_id]
            return True
        return False

    def get_active_conversations(self) -> list[str]:
        """Get list of active conversation IDs.

        Returns:
            List of conversation IDs with active sessions
        """
        return list(self._sessions.keys())


# Singleton instance
_textbook_agent: TextbookAgent | None = None


def get_textbook_agent() -> TextbookAgent:
    """Get or create singleton textbook agent."""
    global _textbook_agent
    if _textbook_agent is None:
        _textbook_agent = TextbookAgent()
    return _textbook_agent
