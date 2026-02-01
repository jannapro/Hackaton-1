/**
 * Custom Language Switcher Component
 *
 * Works in both development and production modes.
 * - In dev mode: switches language context (affects chatbot)
 * - In production: navigates to locale-specific URL
 */

import React, { useState, useEffect } from 'react';
import { useLanguage, type Language } from '../contexts/LanguageContext';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
];

export default function LanguageSwitcher(): JSX.Element {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('docusaurus.locale', langCode);
    }

    // In production, navigate to locale URL
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const currentPath = window.location.pathname;
      const baseUrl = '/physical-humanoid-robots-textbook';

      // Remove existing locale prefix and base URL
      let cleanPath = currentPath.replace(baseUrl, '');
      cleanPath = cleanPath.replace(/^\/(en|ur)/, '');
      if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

      // Build new URL with locale
      const newPath = langCode === 'en'
        ? `${baseUrl}${cleanPath}`
        : `${baseUrl}/${langCode}${cleanPath}`;

      window.location.href = newPath;
    }
  };

  if (!mounted) {
    return <div style={{ width: '80px' }} />;
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: 'transparent',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '6px',
          cursor: 'pointer',
          color: 'var(--ifm-navbar-link-color)',
          fontSize: '14px',
          fontWeight: 500,
        }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <span style={{ fontSize: '10px', marginLeft: '2px' }}>▼</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '4px',
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            minWidth: '120px',
            overflow: 'hidden',
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '10px 14px',
                backgroundColor: lang.code === language
                  ? 'var(--ifm-color-primary-lightest)'
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ifm-font-color-base)',
                fontSize: '14px',
                textAlign: 'left',
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {lang.code === language && <span style={{ marginLeft: 'auto' }}>✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
