"""SQLAlchemy models for Neon Postgres metadata storage."""

from datetime import datetime
from typing import Optional

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, relationship


class Base(AsyncAttrs, DeclarativeBase):
    """Base class for all database models."""

    pass


class Chapter(Base):
    """Chapter metadata for book structure."""

    __tablename__ = "chapters"

    id = Column(Integer, primary_key=True, autoincrement=True)
    chapter_id = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(500), nullable=False)
    position = Column(Integer, nullable=False)
    language = Column(String(10), default="en", nullable=False)
    version = Column(String(50), default="1.0.0", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    sections = relationship("Section", back_populates="chapter", cascade="all, delete-orphan")
    chunks = relationship("Chunk", back_populates="chapter", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Chapter(id={self.id}, chapter_id='{self.chapter_id}', title='{self.title}')>"


class Section(Base):
    """Section metadata within a chapter."""

    __tablename__ = "sections"

    id = Column(Integer, primary_key=True, autoincrement=True)
    section_id = Column(String(200), unique=True, nullable=False, index=True)
    chapter_id = Column(Integer, ForeignKey("chapters.id", ondelete="CASCADE"), nullable=False)
    heading = Column(String(500), nullable=False)
    position = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    chapter = relationship("Chapter", back_populates="sections")
    chunks = relationship("Chunk", back_populates="section", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("chapter_id", "position", name="uq_section_chapter_position"),
    )

    def __repr__(self) -> str:
        return f"<Section(id={self.id}, section_id='{self.section_id}', heading='{self.heading}')>"


class Chunk(Base):
    """
    Chunk metadata linking Qdrant vector IDs to book structure.

    This table links chunk IDs in Qdrant to the book's chapter/section structure,
    enabling structural queries and analytics.
    """

    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    chunk_id = Column(String(300), unique=True, nullable=False, index=True)
    chapter_id = Column(Integer, ForeignKey("chapters.id", ondelete="CASCADE"), nullable=False)
    section_id = Column(Integer, ForeignKey("sections.id", ondelete="CASCADE"), nullable=True)
    position = Column(Integer, nullable=False)
    token_count = Column(Integer, nullable=True)
    language = Column(String(10), default="en", nullable=False)
    version = Column(String(50), default="1.0.0", nullable=False)
    qdrant_point_id = Column(Integer, nullable=True)  # Optional link to Qdrant point
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    chapter = relationship("Chapter", back_populates="chunks")
    section = relationship("Section", back_populates="chunks")

    __table_args__ = (
        UniqueConstraint("chapter_id", "section_id", "position", name="uq_chunk_location"),
    )

    def __repr__(self) -> str:
        return f"<Chunk(id={self.id}, chunk_id='{self.chunk_id}')>"


class ConversationLog(Base):
    """Log of chatbot conversations for analytics and safety review."""

    __tablename__ = "conversation_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    conversation_id = Column(String(100), nullable=False, index=True)
    query = Column(Text, nullable=False)
    response = Column(Text, nullable=True)
    selected_text = Column(Text, nullable=True)
    grounded = Column(Integer, default=1)  # Boolean as int for compatibility
    chunk_ids_used = Column(Text, nullable=True)  # JSON array of chunk IDs
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self) -> str:
        return f"<ConversationLog(id={self.id}, conversation_id='{self.conversation_id}')>"


class GroundingFailure(Base):
    """Log of grounding failures for content gap analysis."""

    __tablename__ = "grounding_failures"

    id = Column(Integer, primary_key=True, autoincrement=True)
    query = Column(Text, nullable=False)
    reason = Column(String(200), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self) -> str:
        return f"<GroundingFailure(id={self.id}, query='{self.query[:50]}...')>"
