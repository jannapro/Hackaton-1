/**
 * Language Context for multilingual support.
 *
 * Syncs with Docusaurus's i18n locale system.
 * The chatbot and other components use this for translated labels.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale: Language = currentLocale === 'ur' ? 'ur' : 'en';

  const [language, setLanguageState] = useState<Language>(locale);
  const [mounted, setMounted] = useState(false);

  // Sync with Docusaurus locale
  useEffect(() => {
    setLanguageState(locale);
    setMounted(true);
  }, [locale]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
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
