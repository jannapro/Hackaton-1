"""MDX content parsing and chunking for vector indexing."""

import re
from pathlib import Path

import frontmatter
import tiktoken

from ..models.schemas import ChunkMetadata


def count_tokens(text: str, model: str = "text-embedding-3-small") -> int:
    """Count tokens in text using tiktoken."""
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        encoding = tiktoken.get_encoding("cl100k_base")
    return len(encoding.encode(text))


def clean_mdx_content(content: str) -> str:
    """Remove MDX-specific syntax and clean content for embedding."""
    # Remove import statements
    content = re.sub(r'^import\s+.*$', '', content, flags=re.MULTILINE)

    # Remove JSX components but keep their text content
    # Handle self-closing tags
    content = re.sub(r'<[A-Z][^>]*\/>', '', content)

    # Handle component wrappers (keep inner content)
    content = re.sub(r'<[A-Z][^>]*>', '', content)
    content = re.sub(r'<\/[A-Z][^>]*>', '', content)

    # Remove HTML comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)

    # Remove code block language specifiers but keep content
    content = re.sub(r'```\w*\n', '```\n', content)

    # Normalize whitespace
    content = re.sub(r'\n{3,}', '\n\n', content)

    return content.strip()


def extract_sections(content: str) -> list[tuple[str, str]]:
    """
    Extract sections from MDX content based on headings.

    Returns list of (section_heading, section_content) tuples.
    """
    # Split on h2 headings (## )
    sections = []
    current_heading = "Introduction"
    current_content = []

    lines = content.split('\n')
    for line in lines:
        if line.startswith('## '):
            # Save previous section if it has content
            if current_content:
                section_text = '\n'.join(current_content).strip()
                if section_text:
                    sections.append((current_heading, section_text))
            # Start new section
            current_heading = line[3:].strip()
            current_content = []
        else:
            current_content.append(line)

    # Don't forget the last section
    if current_content:
        section_text = '\n'.join(current_content).strip()
        if section_text:
            sections.append((current_heading, section_text))

    return sections


def chunk_section(
    section_text: str,
    max_tokens: int = 500,
    overlap_tokens: int = 50,
) -> list[str]:
    """
    Split a section into chunks with token-based limits.

    Tries to split on paragraph boundaries while respecting token limits.
    """
    paragraphs = section_text.split('\n\n')
    chunks = []
    current_chunk = []
    current_tokens = 0

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        para_tokens = count_tokens(para)

        # If single paragraph exceeds limit, split it
        if para_tokens > max_tokens:
            # Save current chunk first
            if current_chunk:
                chunks.append('\n\n'.join(current_chunk))
                current_chunk = []
                current_tokens = 0

            # Split long paragraph by sentences
            sentences = re.split(r'(?<=[.!?])\s+', para)
            sentence_chunk = []
            sentence_tokens = 0

            for sentence in sentences:
                sent_tokens = count_tokens(sentence)
                if sentence_tokens + sent_tokens > max_tokens and sentence_chunk:
                    chunks.append(' '.join(sentence_chunk))
                    sentence_chunk = []
                    sentence_tokens = 0
                sentence_chunk.append(sentence)
                sentence_tokens += sent_tokens

            if sentence_chunk:
                chunks.append(' '.join(sentence_chunk))

        elif current_tokens + para_tokens > max_tokens:
            # Save current chunk and start new one
            if current_chunk:
                chunks.append('\n\n'.join(current_chunk))
            current_chunk = [para]
            current_tokens = para_tokens
        else:
            current_chunk.append(para)
            current_tokens += para_tokens

    # Add remaining content
    if current_chunk:
        chunks.append('\n\n'.join(current_chunk))

    return chunks


def parse_mdx_file(file_path: Path) -> tuple[dict, str]:
    """
    Parse an MDX file and extract frontmatter and content.

    Returns (metadata_dict, cleaned_content).
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)

    metadata = dict(post.metadata)
    content = clean_mdx_content(post.content)

    return metadata, content


def generate_chunk_id(chapter: str, section: str, position: int) -> str:
    """Generate a stable chunk ID."""
    # Normalize section name for ID
    section_slug = re.sub(r'[^a-z0-9]+', '-', section.lower()).strip('-')
    return f"{chapter}:{section_slug}:{position}"


def index_mdx_file(
    file_path: Path,
    max_chunk_tokens: int = 500,
) -> list[tuple[str, ChunkMetadata]]:
    """
    Process a single MDX file into chunks with metadata.

    Returns list of (chunk_text, chunk_metadata) tuples.
    """
    metadata, content = parse_mdx_file(file_path)

    # Extract chapter info from path and metadata
    chapter_dir = file_path.parent.name
    chapter_title = metadata.get('title', chapter_dir)
    keywords = metadata.get('keywords', [])

    # Extract sections and chunk them
    sections = extract_sections(content)
    chunks = []

    for section_heading, section_content in sections:
        section_chunks = chunk_section(section_content, max_tokens=max_chunk_tokens)

        for position, chunk_text in enumerate(section_chunks):
            chunk_id = generate_chunk_id(chapter_dir, section_heading, position)

            chunk_metadata = ChunkMetadata(
                chunk_id=chunk_id,
                chapter=chapter_dir,
                chapter_title=chapter_title,
                section=section_heading,
                position=position,
                keywords=keywords,
            )

            chunks.append((chunk_text, chunk_metadata))

    return chunks


def discover_mdx_files(content_path: Path) -> list[Path]:
    """Discover all MDX chapter files in the content directory."""
    mdx_files = []

    # Look for index.mdx files in chapter directories
    for item in sorted(content_path.iterdir()):
        if item.is_dir() and not item.name.startswith('.'):
            index_file = item / 'index.mdx'
            if index_file.exists():
                mdx_files.append(index_file)

    # Also check for intro.mdx at root
    intro_file = content_path / 'intro.mdx'
    if intro_file.exists():
        mdx_files.insert(0, intro_file)

    return mdx_files


def process_all_content(
    content_path: Path,
    max_chunk_tokens: int = 500,
) -> tuple[list[tuple[str, ChunkMetadata]], list[str]]:
    """
    Process all MDX files in the content directory.

    Returns (list of (text, metadata) tuples, list of processed files).
    """
    all_chunks = []
    processed_files = []

    mdx_files = discover_mdx_files(content_path)

    for mdx_file in mdx_files:
        try:
            chunks = index_mdx_file(mdx_file, max_chunk_tokens)
            all_chunks.extend(chunks)
            processed_files.append(str(mdx_file.relative_to(content_path)))
        except Exception as e:
            print(f"Error processing {mdx_file}: {e}")

    return all_chunks, processed_files
