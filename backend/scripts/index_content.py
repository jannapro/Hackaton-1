#!/usr/bin/env python3
"""
CLI script to index MDX content into Qdrant vector database.

Usage:
    python scripts/index_content.py [--clear] [--content-path PATH]

Examples:
    # Index all content (incremental)
    python scripts/index_content.py

    # Clear and reindex
    python scripts/index_content.py --clear

    # Use custom content path
    python scripts/index_content.py --content-path ../docs
"""

import argparse
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from app.config import get_settings
from app.core.retrieval import get_retrieval_service
from app.services.indexing import process_all_content


def main():
    parser = argparse.ArgumentParser(
        description="Index MDX content into Qdrant vector database"
    )
    parser.add_argument(
        "--clear",
        action="store_true",
        help="Clear existing collection before indexing",
    )
    parser.add_argument(
        "--content-path",
        type=str,
        default=None,
        help="Path to content directory (default: from settings)",
    )
    parser.add_argument(
        "--max-chunk-tokens",
        type=int,
        default=500,
        help="Maximum tokens per chunk (default: 500)",
    )

    args = parser.parse_args()

    # Get settings and services
    settings = get_settings()
    retrieval = get_retrieval_service()

    # Determine content path
    if args.content_path:
        content_path = Path(args.content_path).resolve()
    else:
        # Resolve relative to backend directory
        backend_dir = Path(__file__).parent.parent
        content_path = (backend_dir / settings.content_path).resolve()

    print(f"Content path: {content_path}")

    if not content_path.exists():
        print(f"Error: Content path does not exist: {content_path}")
        sys.exit(1)

    # Clear collection if requested
    if args.clear:
        print("Clearing existing collection...")
        retrieval.clear_collection()
        print("Collection cleared.")
    else:
        # Ensure collection exists
        retrieval.ensure_collection()

    # Process content
    print(f"Processing MDX files from {content_path}...")
    chunks, processed_files = process_all_content(
        content_path,
        max_chunk_tokens=args.max_chunk_tokens,
    )

    print(f"\nProcessed {len(processed_files)} files:")
    for f in processed_files:
        print(f"  - {f}")

    print(f"\nGenerated {len(chunks)} chunks")

    # Index chunks
    if chunks:
        print("\nIndexing chunks into Qdrant...")
        count = retrieval.upsert_chunks(chunks)
        print(f"Successfully indexed {count} chunks")

        # Verify
        total = retrieval.get_chunk_count()
        print(f"\nTotal chunks in collection: {total}")
    else:
        print("No chunks to index.")

    print("\nIndexing complete!")


if __name__ == "__main__":
    main()
