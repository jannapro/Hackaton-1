/**
 * ChatbotWidget Component
 * RAG-powered chatbot for the Physical AI textbook.
 *
 * Features:
 * - Floating chat button
 * - Expandable chat panel
 * - Text selection context integration
 * - Source citations with chapter/section references
 * - Multilingual support (English/Urdu)
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sendChatMessage, ChatResponse, SourceReference } from '../services/chatApi';
import { useTextSelection } from '../hooks/useTextSelection';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceReference[];
  grounded?: boolean;
  timestamp: Date;
}

// Styles as CSS-in-JS for Docusaurus compatibility
const styles = {
  container: {
    position: 'fixed' as const,
    bottom: '24px',
    right: '24px',
    zIndex: 1000,
    fontFamily: 'var(--ifm-font-family-base)',
  },
  toggleButton: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#2563EB',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  chatPanel: {
    position: 'absolute' as const,
    bottom: '70px',
    right: '0',
    width: '380px',
    maxWidth: 'calc(100vw - 48px)',
    height: '500px',
    maxHeight: 'calc(100vh - 120px)',
    backgroundColor: 'var(--ifm-background-color)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    border: '1px solid var(--ifm-color-emphasis-200)',
  },
  header: {
    padding: '16px',
    backgroundColor: '#2563EB',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '4px',
    lineHeight: 1,
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  message: {
    maxWidth: '85%',
    padding: '10px 14px',
    borderRadius: '12px',
    fontSize: '14px',
    lineHeight: 1.5,
  },
  userMessage: {
    alignSelf: 'flex-end' as const,
    backgroundColor: '#2563EB',
    color: 'white',
    borderBottomRightRadius: '4px',
  },
  assistantMessage: {
    alignSelf: 'flex-start' as const,
    backgroundColor: 'var(--ifm-background-surface-color)',
    color: 'var(--ifm-font-color-base)',
    borderBottomLeftRadius: '4px',
    border: '1px solid var(--ifm-color-emphasis-200)',
  },
  sources: {
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid var(--ifm-color-emphasis-200)',
    fontSize: '12px',
    color: 'var(--ifm-color-emphasis-600)',
  },
  sourceTag: {
    display: 'inline-block',
    padding: '2px 6px',
    backgroundColor: 'var(--ifm-color-primary-lightest)',
    color: 'var(--ifm-color-primary-dark)',
    borderRadius: '4px',
    marginRight: '4px',
    marginBottom: '4px',
    fontSize: '11px',
  },
  selectionBanner: {
    padding: '8px 16px',
    backgroundColor: 'var(--ifm-color-info-contrast-background)',
    borderBottom: '1px solid var(--ifm-color-emphasis-200)',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectionText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    maxWidth: '280px',
  },
  clearButton: {
    background: 'none',
    border: 'none',
    color: 'var(--ifm-color-primary)',
    cursor: 'pointer',
    fontSize: '12px',
    textDecoration: 'underline',
  },
  inputContainer: {
    padding: '12px 16px',
    borderTop: '1px solid var(--ifm-color-emphasis-200)',
    display: 'flex',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '20px',
    border: '1px solid var(--ifm-color-emphasis-300)',
    backgroundColor: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)',
    fontSize: '14px',
    outline: 'none',
  },
  sendButton: {
    padding: '10px 16px',
    borderRadius: '20px',
    backgroundColor: '#2563EB',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  loadingDots: {
    display: 'flex',
    gap: '4px',
    padding: '8px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--ifm-color-emphasis-400)',
    animation: 'bounce 1.4s infinite ease-in-out both',
  },
  welcomeMessage: {
    textAlign: 'center' as const,
    color: 'var(--ifm-color-emphasis-600)',
    padding: '20px',
    fontSize: '14px',
  },
};

// Chat icon SVG
const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 11.5C21 16.75 16.75 21 11.5 21C9.8 21 8.2 20.5 6.8 19.7L2 21L3.3 16.2C2.5 14.8 2 13.2 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="7.5" cy="11.5" r="1" fill="currentColor" />
    <circle cx="11.5" cy="11.5" r="1" fill="currentColor" />
    <circle cx="15.5" cy="11.5" r="1" fill="currentColor" />
  </svg>
);

// Loading animation
const LoadingIndicator = () => (
  <div style={styles.loadingDots}>
    <div style={{ ...styles.dot, animationDelay: '-0.32s' }} />
    <div style={{ ...styles.dot, animationDelay: '-0.16s' }} />
    <div style={styles.dot} />
  </div>
);

export default function ChatbotWidget(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  const { selection, clearSelection, hasSelection } = useTextSelection();
  const { language, isRTL, labels } = useLanguage();

  // Trap focus within chat panel when open (T217.1 Accessibility)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response: ChatResponse = await sendChatMessage({
        query: input,
        selected_text: hasSelection ? selection?.text : null,
        conversation_id: conversationId,
        language: language,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        grounded: response.grounded,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConversationId(response.conversation_id);

      // Clear selection after using it
      if (hasSelection) {
        clearSelection();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, hasSelection, selection, conversationId, clearSelection]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError(null);
  };

  return (
    <div style={styles.container}>
      {/* Add keyframes for loading animation */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatPanelRef}
          className="chatbot-modal"
          style={{
            ...styles.chatPanel,
            direction: isRTL ? 'rtl' : 'ltr',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          aria-describedby="chatbot-description"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Screen reader description */}
          <span id="chatbot-description" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>
            Chat assistant for the Physical AI textbook. Ask questions about the content and receive grounded answers with source citations.
          </span>

          {/* Header */}
          <div className="chatbot-header" style={styles.header}>
            <h4 id="chatbot-title" style={styles.headerTitle}>{labels.chatTitle}</h4>
            <button
              style={styles.closeButton}
              onClick={toggleChat}
              aria-label="Close chat dialog"
            >
              ×
            </button>
          </div>

          {/* Selection Banner */}
          {hasSelection && (
            <div style={styles.selectionBanner}>
              <span style={styles.selectionText}>
                {isRTL ? 'سیاق و سباق' : 'Context'}: "{selection?.text.substring(0, 50)}..."
              </span>
              <button style={styles.clearButton} onClick={clearSelection}>
                {labels.clearChat}
              </button>
            </div>
          )}

          {/* Messages */}
          <div
            style={styles.messagesContainer}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.length === 0 ? (
              <div style={styles.welcomeMessage}>
                <p>{labels.greeting}</p>
                <p style={{ fontSize: '12px', marginTop: '8px' }}>
                  {isRTL
                    ? 'ٹپ: مخصوص مواد کے بارے میں سوالات پوچھنے کے لیے کتاب میں متن منتخب کریں۔'
                    : 'Tip: Select text in the book to ask questions about specific content.'}
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    ...styles.message,
                    ...(message.role === 'user'
                      ? styles.userMessage
                      : styles.assistantMessage),
                  }}
                >
                  <div>{message.content}</div>

                  {/* Sources for assistant messages */}
                  {message.role === 'assistant' &&
                    message.sources &&
                    message.sources.length > 0 && (
                      <div style={styles.sources}>
                        <div style={{ marginBottom: '4px' }}>{isRTL ? 'ذرائع:' : 'Sources:'}</div>
                        {message.sources.map((source) => (
                          <span key={source.chunk_id} style={styles.sourceTag}>
                            [{source.chapter}: {source.section}]
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              ))
            )}

            {isLoading && (
              <div style={{ ...styles.message, ...styles.assistantMessage }}>
                <LoadingIndicator />
              </div>
            )}

            {error && (
              <div
                style={{
                  ...styles.message,
                  ...styles.assistantMessage,
                  backgroundColor: 'rgba(255, 82, 82, 0.1)',
                  borderColor: 'rgba(255, 82, 82, 0.3)',
                }}
              >
                {labels.error}: {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area" style={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={labels.chatPlaceholder}
              style={{
                ...styles.input,
                textAlign: isRTL ? 'right' : 'left',
              }}
              disabled={isLoading}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button
              onClick={handleSend}
              style={{
                ...styles.sendButton,
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              }}
              disabled={isLoading || !input.trim()}
            >
              {labels.sendButton}
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        className="chatbot-toggle"
        style={{
          ...styles.toggleButton,
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
        }}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close textbook assistant' : 'Open textbook assistant'}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
      >
        {isOpen ? '×' : <ChatIcon />}
      </button>
    </div>
  );
}
