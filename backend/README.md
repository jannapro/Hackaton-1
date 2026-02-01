# Physical AI Textbook RAG Chatbot Backend

FastAPI backend for the RAG-powered chatbot that provides book-grounded Q&A for the Physical Humanoid Robots textbook.

## Quick Start

### 1. Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

Copy the example environment file and fill in your credentials:

```bash
cp ../.env.example .env
```

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `QDRANT_URL`: Qdrant Cloud cluster URL
- `QDRANT_API_KEY`: Qdrant API key

### 3. Index Content

Run the indexing script to populate the vector database:

```bash
python scripts/index_content.py --clear
```

Expected output: ~150 chunks indexed from 9 MDX files.

### 4. Start the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### Health Check
```
GET /api/health
```

Returns backend status and Qdrant connection info.

### Chat
```
POST /api/chat
Content-Type: application/json

{
  "query": "How does ROS 2 handle QoS?",
  "selected_text": null,
  "conversation_id": null
}
```

Returns grounded answer with source citations.

## Architecture

```
backend/
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Environment configuration
│   ├── api/routes/
│   │   ├── chat.py          # POST /api/chat
│   │   └── health.py        # GET /api/health
│   ├── core/
│   │   ├── agent.py         # OpenAI Agents SDK agent
│   │   ├── retrieval.py     # Qdrant vector search
│   │   └── embeddings.py    # OpenAI embeddings
│   ├── services/
│   │   └── indexing.py      # MDX parsing & chunking
│   └── models/
│       └── schemas.py       # Pydantic models
└── scripts/
    └── index_content.py     # Content indexing CLI
```

## Grounding Rules

The agent follows strict grounding rules from the Constitution:

1. Answers MUST be based ONLY on retrieved book content
2. If information not found: "This information is not covered in the retrieved content."
3. NEVER contradict book content
4. Cite sources with [Chapter: Section] format
5. User-selected text overrides global retrieval

## Development

### Run with hot reload
```bash
uvicorn app.main:app --reload --port 8000
```

### Run tests
```bash
pytest tests/
```

### Reindex content
```bash
python scripts/index_content.py --clear --content-path ../docs
```

## Re-indexing Procedure (T194)

When textbook content is updated, re-index the vector database:

### Standard Re-index (Full)

```bash
# Clear existing collection and re-index all content
python scripts/index_content.py --clear --content-path ../docs
```

### Incremental Update (Future)

For production systems with minimal downtime:

1. Create a versioned collection:
   ```python
   from app.core.retrieval import RetrievalService
   service = RetrievalService(version="v2")
   service.ensure_collection()
   ```

2. Index content to the new collection
3. Switch production to the new version
4. Delete the old collection

### Validation After Re-index

1. Check chunk count matches expected (~193 chunks)
2. Run sample queries to verify retrieval accuracy
3. Test grounding behavior with known in-scope and out-of-scope queries

## Known Limitations (T223, T224.2)

### Retrieval Limitations

1. **Chunk boundary artifacts**: Long code blocks may be split across chunks, potentially losing context
2. **Semantic search bias**: Technical terms with multiple meanings may retrieve incorrect context
3. **No cross-reference awareness**: The system doesn't understand internal book references (e.g., "as discussed in Chapter 2")

### Grounding Limitations

1. **Hallucination risk on edge cases**: When retrieved content is tangentially related, the agent may extrapolate beyond source material
2. **Citation accuracy**: Source citations reflect retrieval results, not necessarily the exact source of each statement
3. **No fact-checking**: The system cannot verify if book content itself contains errors

### Performance Limitations

1. **Cold start latency**: First query after deployment takes 2-5 seconds for model initialization
2. **Token limits**: Very long user selections (>2000 chars) are truncated
3. **Concurrent request limits**: Free tier Qdrant has query rate limits

### Content Limitations

1. **Code execution**: Code examples are not executable; the chatbot explains code but cannot run it
2. **Image understanding**: Architecture diagrams are not indexed; only text content is searchable
3. **Real-time updates**: Content must be manually re-indexed after book updates

### Safety Limitations

1. **Simulation-first bias**: The system strongly encourages simulation but cannot physically prevent real-world deployment
2. **No hardware validation**: Hardware requirement recommendations come from book content, not real-time verification

## Deployment

For production deployment to Render or similar:

1. Set all environment variables
2. Use `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Configure CORS origins in `CORS_ORIGINS` env var

## Troubleshooting

### Common Issues

**"No module named 'frontmatter'"**
```bash
pip install python-frontmatter
```

**Qdrant connection failed**
- Verify `QDRANT_URL` includes port (`:6333`)
- Check API key is valid
- Ensure collection exists (run indexing)

**OpenAI API errors**
- Verify `OPENAI_API_KEY` is valid
- Check rate limits on your API key
- Ensure sufficient credits

**Empty search results**
- Run re-indexing with `--clear` flag
- Lower `score_threshold` in retrieval (default: 0.5)
- Check query is relevant to textbook content
