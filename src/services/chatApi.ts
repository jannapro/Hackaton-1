/**
 * API client for the RAG chatbot backend.
 */

export interface ChatRequest {
  query: string;
  selected_text?: string | null;
  conversation_id?: string | null;
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

// Get API URL from environment or default to localhost
const getApiUrl = (): string => {
  // Check for Docusaurus custom field
  if (typeof window !== 'undefined') {
    const docusaurusConfig = (window as any).docusaurus;
    if (docusaurusConfig?.siteConfig?.customFields?.chatbotApiUrl) {
      return docusaurusConfig.siteConfig.customFields.chatbotApiUrl;
    }
  }
  // Default for development
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
