/**
 * Custom Language Switcher Component
 *
 * Uses Docusaurus's built-in locale URL generation to navigate
 * between English and Urdu versions of each page.
 */

import React, { useState, useEffect } from 'react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
];

export default function LanguageSwitcher(): JSX.Element {
  const { setLanguage } = useLanguage();
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  const handleLanguageChange = (langCode: Language) => {
    if (langCode === currentLocale) {
      setIsOpen(false);
      return;
    }

    setLanguage(langCode);
    setIsOpen(false);

    if (typeof window !== 'undefined') {
      localStorage.setItem('docusaurus.locale', langCode);

      // Navigate to the locale-specific URL using Docusaurus's built-in utility
      const url = alternatePageUtils.createUrl({
        locale: langCode,
        fullyQualified: false,
      });
      window.location.href = url;
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
                backgroundColor: lang.code === currentLocale
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
              {lang.code === currentLocale && <span style={{ marginLeft: 'auto' }}>✓</span>}
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
