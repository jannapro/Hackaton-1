"""Qdrant vector search and retrieval service."""

from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels

from ..config import get_settings
from ..models.schemas import ChunkMetadata, SourceReference
from .embeddings import get_embedding_service


class RetrievalService:
    """Service for vector search using Qdrant."""

    def __init__(self, version: str | None = None):
        """
        Initialize retrieval service.

        Args:
            version: Optional version suffix for collection name (e.g., "v1", "v2").
                     Used for versioned collections during content updates.
        """
        settings = get_settings()
        self.client = QdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
        )
        self.base_collection_name = settings.qdrant_collection_name
        self.version = version
        self.collection_name = f"{self.base_collection_name}_{version}" if version else self.base_collection_name
        self.embedding_service = get_embedding_service()

    def list_collection_versions(self) -> list[str]:
        """List all versioned collections for this book."""
        try:
            collections = self.client.get_collections()
            versions = []
            for c in collections.collections:
                if c.name.startswith(self.base_collection_name):
                    if c.name == self.base_collection_name:
                        versions.append("default")
                    else:
                        # Extract version suffix
                        suffix = c.name[len(self.base_collection_name) + 1:]
                        versions.append(suffix)
            return sorted(versions)
        except Exception:
            return []

    def switch_version(self, version: str | None) -> None:
        """Switch to a different collection version."""
        self.version = version
        self.collection_name = f"{self.base_collection_name}_{version}" if version else self.base_collection_name

    def ensure_collection(self) -> bool:
        """Ensure the collection exists, create if not."""
        settings = get_settings()

        collections = self.client.get_collections()
        exists = any(c.name == self.collection_name for c in collections.collections)

        if not exists:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=qmodels.VectorParams(
                    size=settings.embedding_dimensions,
                    distance=qmodels.Distance.COSINE,
                ),
            )
            return True

        return exists

    def collection_exists(self) -> bool:
        """Check if collection exists."""
        try:
            collections = self.client.get_collections()
            return any(c.name == self.collection_name for c in collections.collections)
        except Exception:
            return False

    def get_chunk_count(self) -> int:
        """Get number of chunks in collection."""
        try:
            info = self.client.get_collection(self.collection_name)
            return info.points_count
        except Exception:
            return 0

    def upsert_chunks(
        self,
        chunks: list[tuple[str, ChunkMetadata]],
    ) -> int:
        """
        Upsert chunks into Qdrant.

        Args:
            chunks: List of (text, metadata) tuples

        Returns:
            Number of chunks upserted
        """
        if not chunks:
            return 0

        # Generate embeddings for all chunks
        texts = [text for text, _ in chunks]
        embeddings = self.embedding_service.embed_texts(texts)

        # Prepare points for Qdrant
        points = []
        for i, ((text, metadata), embedding) in enumerate(zip(chunks, embeddings)):
            point = qmodels.PointStruct(
                id=i,  # Use sequential IDs (Qdrant will handle dedup by chunk_id in payload)
                vector=embedding,
                payload={
                    "text": text,
                    "chunk_id": metadata.chunk_id,
                    "chapter": metadata.chapter,
                    "chapter_title": metadata.chapter_title,
                    "section": metadata.section,
                    "position": metadata.position,
                    "keywords": metadata.keywords,
                },
            )
            points.append(point)

        # Upsert in batches
        batch_size = 100
        for i in range(0, len(points), batch_size):
            batch = points[i : i + batch_size]
            self.client.upsert(
                collection_name=self.collection_name,
                points=batch,
            )

        return len(points)

    def clear_collection(self) -> bool:
        """Delete and recreate the collection."""
        try:
            self.client.delete_collection(self.collection_name)
        except Exception:
            pass  # Collection might not exist

        self.ensure_collection()
        return True

    def search(
        self,
        query: str,
        limit: int = 5,
        score_threshold: float = 0.5,
        chapter_filter: str | None = None,
    ) -> list[tuple[str, SourceReference, float]]:
        """
        Search for relevant chunks.

        Args:
            query: Search query text
            limit: Maximum number of results
            score_threshold: Minimum similarity score (0-1)
            chapter_filter: Optional chapter to filter by

        Returns:
            List of (text, source_reference, score) tuples
        """
        # Generate query embedding
        query_embedding = self.embedding_service.embed_text(query)

        # Build filter if chapter specified
        query_filter = None
        if chapter_filter:
            query_filter = qmodels.Filter(
                must=[
                    qmodels.FieldCondition(
                        key="chapter",
                        match=qmodels.MatchValue(value=chapter_filter),
                    )
                ]
            )

        # Search using query_points (new Qdrant API)
        results = self.client.query_points(
            collection_name=self.collection_name,
            query=query_embedding,
            query_filter=query_filter,
            limit=limit,
            score_threshold=score_threshold,
        )

        # Format results
        formatted = []
        for point in results.points:
            payload = point.payload
            source = SourceReference(
                chunk_id=payload["chunk_id"],
                chapter=payload.get("chapter_title", payload["chapter"]),
                section=payload["section"],
                score=point.score,
            )
            formatted.append((payload["text"], source, point.score))

        return formatted

    def search_with_selected_text(
        self,
        query: str,
        selected_text: str,
        limit: int = 5,
        score_threshold: float = 0.5,
    ) -> list[tuple[str, SourceReference, float]]:
        """
        Search with user-selected text context.

        Combines the query with selected text for better relevance.
        """
        # Combine query with context from selected text
        combined_query = f"Context: {selected_text[:500]}\n\nQuestion: {query}"
        return self.search(combined_query, limit, score_threshold)


# Singleton instance
_retrieval_service: RetrievalService | None = None


def get_retrieval_service() -> RetrievalService:
    """Get or create singleton retrieval service."""
    global _retrieval_service
    if _retrieval_service is None:
        _retrieval_service = RetrievalService()
    return _retrieval_service
