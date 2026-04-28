/**
 * API client for the RAG chatbot backend.
 * Supports multilingual responses (English/Urdu).
 */

export type Language = 'en' | 'ur';

export interface ChatRequest {
  query: string;
  selected_text?: string | null;
  conversation_id?: string | null;
  language?: Language;
}

export interface SourceReference {
  chunk_id: string;
  chapter: string;
  section: string;
  score: number;
}

export interface ChatResponse {
  answer: string;
  sources: SourceReference[];
  grounded: boolean;
  conversation_id: string;
}

export interface HealthResponse {
  status: string;
  qdrant_connected: boolean;
  collection_exists: boolean;
  chunk_count: number;
}

// Get API URL from Docusaurus config or default to localhost
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getApiUrl = (): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const siteConfig = require('@generated/docusaurus.config').default;
    const url = siteConfig?.customFields?.chatbotApiUrl;
    if (url && typeof url === 'string') return url;
  } catch {
    // Not in a Docusaurus build context
  }
  return 'http://localhost:8000';
};

/**
 * Send a chat message to the RAG backend.
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Check the health of the chatbot backend.
 */
export async function checkHealth(): Promise<HealthResponse> {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/health`);

  if (!response.ok) {
    throw new Error(`Health check failed: HTTP ${response.status}`);
  }

  return response.json();
}
