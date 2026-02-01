/**
 * Language Context for multilingual support.
 *
 * Provides language state across the app.
 * Works in both dev mode and production.
 * The chatbot uses this to know which language to respond in.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  labels: {
    chatPlaceholder: string;
    sendButton: string;
    clearChat: string;
    chatTitle: string;
    thinking: string;
    error: string;
    greeting: string;
  };
}

const translations = {
  en: {
    chatPlaceholder: 'Ask about Physical AI...',
    sendButton: 'Send',
    clearChat: 'Clear',
    chatTitle: 'Physical AI Assistant',
    thinking: 'Thinking...',
    error: 'Error processing your request',
    greeting: 'Hello! I\'m the Physical AI Textbook Assistant. How can I help you today?',
  },
  ur: {
    chatPlaceholder: 'فزیکل AI کے بارے میں پوچھیں...',
    sendButton: 'بھیجیں',
    clearChat: 'صاف کریں',
    chatTitle: 'فزیکل AI معاون',
    thinking: 'سوچ رہا ہوں...',
    error: 'آپ کی درخواست پر عمل کرنے میں خرابی',
    greeting: 'السلام علیکم! میں فزیکل AI کتاب کا معاون ہوں۔ میں آج آپ کی کیسے مدد کر سکتا ہوں؟',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Get initial language from localStorage or URL
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  // Check localStorage first
  const stored = localStorage.getItem('docusaurus.locale') as Language;
  if (stored && (stored === 'en' || stored === 'ur')) {
    return stored;
  }

  // Check URL for locale
  const path = window.location.pathname;
  if (path.includes('/ur/') || path.startsWith('/ur')) {
    return 'ur';
  }

  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Initialize language on mount (client-side only)
  useEffect(() => {
    setLanguageState(getInitialLanguage());
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Store preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('docusaurus.locale', lang);
    }
  };

  const value: LanguageContextType = {
    language: mounted ? language : 'en',
    setLanguage,
    isRTL: mounted && language === 'ur',
    labels: translations[mounted ? language : 'en'],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default values if used outside provider (SSR safety)
    return {
      language: 'en',
      setLanguage: () => {},
      isRTL: false,
      labels: translations.en,
    };
  }
  return context;
}

export default LanguageContext;
