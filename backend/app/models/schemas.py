"""Pydantic schemas for API request/response models."""

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Request model for POST /api/chat."""

    query: str = Field(
        ...,
        description="The user's question about the textbook content",
        min_length=1,
        max_length=2000,
    )
    selected_text: str | None = Field(
        default=None,
        description="Optional user-selected text to scope the search",
        max_length=5000,
    )
    conversation_id: str | None = Field(
        default=None,
        description="Optional conversation ID for continuity",
    )


class SourceReference(BaseModel):
    """A source reference from the textbook."""

    chunk_id: str = Field(..., description="Unique identifier for the chunk")
    chapter: str = Field(..., description="Chapter name/title")
    section: str = Field(..., description="Section name")
    score: float = Field(..., description="Relevance score (0-1)")


class ChatResponse(BaseModel):
    """Response model for POST /api/chat."""

    answer: str = Field(..., description="The generated answer")
    sources: list[SourceReference] = Field(
        default_factory=list,
        description="List of source references used to generate the answer",
    )
    grounded: bool = Field(
        ...,
        description="Whether the answer is fully grounded in book content",
    )
    conversation_id: str = Field(..., description="Conversation ID for continuity")


class HealthResponse(BaseModel):
    """Response model for GET /api/health."""

    status: str = Field(default="healthy")
    qdrant_connected: bool = Field(default=False)
    collection_exists: bool = Field(default=False)
    chunk_count: int = Field(default=0)


class ChunkMetadata(BaseModel):
    """Metadata for an indexed content chunk."""

    chunk_id: str = Field(..., description="Unique chunk identifier")
    chapter: str = Field(..., description="Chapter identifier (e.g., '01-physical-ai-foundations')")
    chapter_title: str = Field(..., description="Human-readable chapter title")
    section: str = Field(..., description="Section heading")
    position: int = Field(..., description="Position within the section")
    keywords: list[str] = Field(default_factory=list, description="Keywords from frontmatter")


class IndexingResult(BaseModel):
    """Result of indexing operation."""

    total_chunks: int
    chapters_indexed: int
    files_processed: list[str]
    errors: list[str] = Field(default_factory=list)
