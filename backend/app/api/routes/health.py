"""Health check endpoint."""

from fastapi import APIRouter

from ...core.retrieval import get_retrieval_service
from ...models.schemas import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """
    Check the health of the RAG chatbot backend.

    Returns:
        HealthResponse with connection status and chunk count
    """
    try:
        retrieval = get_retrieval_service()

        # Check Qdrant connection
        qdrant_connected = True
        collection_exists = retrieval.collection_exists()
        chunk_count = retrieval.get_chunk_count() if collection_exists else 0

        return HealthResponse(
            status="healthy",
            qdrant_connected=qdrant_connected,
            collection_exists=collection_exists,
            chunk_count=chunk_count,
        )
    except Exception as e:
        return HealthResponse(
            status=f"unhealthy: {str(e)}",
            qdrant_connected=False,
            collection_exists=False,
            chunk_count=0,
        )
