"""FastAPI application entry point for RAG Chatbot."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes import chat, health
from .config import get_settings
from .core.retrieval import get_retrieval_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup/shutdown."""
    # Startup: ensure Qdrant collection exists
    try:
        retrieval = get_retrieval_service()
        retrieval.ensure_collection()
        print(f"Qdrant collection ready: {retrieval.get_chunk_count()} chunks")
    except Exception as e:
        print(f"Warning: Could not connect to Qdrant: {e}")

    yield

    # Shutdown: cleanup if needed
    print("Shutting down RAG Chatbot backend...")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()

    app = FastAPI(
        title="Physical AI Textbook RAG Chatbot",
        description="AI-powered Q&A for the Physical Humanoid Robots textbook",
        version="1.0.0",
        lifespan=lifespan,
    )

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(health.router, prefix="/api", tags=["Health"])
    app.include_router(chat.router, prefix="/api", tags=["Chat"])

    @app.get("/")
    async def root():
        """Root endpoint with API information."""
        return {
            "name": "Physical AI Textbook RAG Chatbot",
            "version": "1.0.0",
            "docs": "/docs",
            "health": "/api/health",
        }

    return app


# Create app instance for uvicorn
app = create_app()


if __name__ == "__main__":
    import uvicorn

    settings = get_settings()
    uvicorn.run(
        "app.main:app",
        host=settings.backend_host,
        port=settings.backend_port,
        reload=True,
    )
