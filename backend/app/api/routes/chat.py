"""Chat endpoint for RAG-based Q&A with conversation memory."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ...core.agent import get_textbook_agent
from ...models.schemas import ChatRequest, ChatResponse


class ClearConversationResponse(BaseModel):
    """Response for clearing a conversation."""
    success: bool
    message: str


class ActiveConversationsResponse(BaseModel):
    """Response for listing active conversations."""
    conversations: list[str]
    count: int


router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """
    Process a chat query and return a grounded response.

    The response is generated using RAG (Retrieval-Augmented Generation):
    1. Relevant content is retrieved from the indexed textbook
    2. An AI agent generates a response grounded in that content
    3. Sources are cited with chapter and section references

    Args:
        request: ChatRequest with query and optional context

    Returns:
        ChatResponse with answer, sources, and grounding status
    """
    try:
        agent = get_textbook_agent()

        response = await agent.chat(
            query=request.query,
            selected_text=request.selected_text,
            conversation_id=request.conversation_id,
        )

        return response

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat request: {str(e)}",
        )


@router.delete("/chat/{conversation_id}", response_model=ClearConversationResponse)
async def clear_conversation(conversation_id: str) -> ClearConversationResponse:
    """
    Clear the conversation history for a specific conversation.

    This removes all session memory for the given conversation ID,
    allowing the user to start fresh.

    Args:
        conversation_id: The ID of the conversation to clear

    Returns:
        ClearConversationResponse indicating success or failure
    """
    try:
        agent = get_textbook_agent()
        cleared = agent.clear_conversation(conversation_id)

        if cleared:
            return ClearConversationResponse(
                success=True,
                message=f"Conversation {conversation_id} cleared successfully"
            )
        else:
            return ClearConversationResponse(
                success=False,
                message=f"Conversation {conversation_id} not found"
            )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error clearing conversation: {str(e)}",
        )


@router.get("/conversations", response_model=ActiveConversationsResponse)
async def list_conversations() -> ActiveConversationsResponse:
    """
    List all active conversation IDs.

    Returns:
        ActiveConversationsResponse with list of conversation IDs
    """
    try:
        agent = get_textbook_agent()
        conversations = agent.get_active_conversations()

        return ActiveConversationsResponse(
            conversations=conversations,
            count=len(conversations)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error listing conversations: {str(e)}",
        )
