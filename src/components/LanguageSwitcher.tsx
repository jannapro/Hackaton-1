/**
 * LanguageSwitcher — minimal globe-icon language picker.
 */

import React, { useState, useEffect } from 'react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';

const languages: { code: Language; label: string; short: string; flag: string }[] = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'ur', label: 'اردو',    short: 'UR', flag: '🇵🇰' },
];

const S = {
  wrap: { position: 'relative' as const, marginLeft: '4px' },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px 10px',
    background: 'transparent',
    border: '1px solid rgba(0,212,255,0.18)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'Space Grotesk, sans-serif',
    color: '#7799bb',
    letterSpacing: '0.06em',
    transition: 'all 0.2s',
    outline: 'none',
    whiteSpace: 'nowrap' as const,
  },
  globe: { fontSize: '14px', lineHeight: 1 },
  chevron: { fontSize: '8px', color: '#3d5570', transition: 'transform 0.2s' },
  dropdown: {
    position: 'absolute' as const,
    top: 'calc(100% + 8px)',
    right: 0,
    minWidth: '140px',
    background: 'rgba(8, 12, 24, 0.97)',
    border: '1px solid rgba(0,212,255,0.15)',
    borderRadius: '10px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
    zIndex: 1000,
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
    padding: '6px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '9px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'Space Grotesk, sans-serif',
    fontWeight: 500,
    color: '#7799bb',
    textAlign: 'left' as const,
    transition: 'all 0.15s',
  },
  check: {
    marginLeft: 'auto',
    color: '#00d4ff',
    fontSize: '11px',
  },
  backdrop: { position: 'fixed' as const, inset: 0, zIndex: 999 },
};

export default function LanguageSwitcher(): JSX.Element {
  const { setLanguage } = useLanguage();
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const current = languages.find(l => l.code === currentLocale) || languages[0];

  const handleSelect = (code: Language) => {
    if (code === currentLocale) { setOpen(false); return; }
    setLanguage(code);
    setOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('docusaurus.locale', code);
      window.location.href = alternatePageUtils.createUrl({ locale: code, fullyQualified: false });
    }
  };

  if (!mounted) return <div style={{ width: '68px' }} />;

  return (
    <div style={S.wrap}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          ...S.trigger,
          ...(open ? { borderColor: 'rgba(0,212,255,0.4)', color: '#00d4ff', background: 'rgba(0,212,255,0.06)' } : {}),
        }}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span style={S.globe}>🌐</span>
        <span>{current.short}</span>
        <span style={{ ...S.chevron, transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>

      {open && (
        <>
          <div style={S.backdrop} onClick={() => setOpen(false)} />
          <div style={S.dropdown} role="listbox" aria-label="Language options">
            {languages.map(lang => (
              <button
                key={lang.code}
                role="option"
                aria-selected={lang.code === currentLocale}
                onClick={() => handleSelect(lang.code)}
                style={{
                  ...S.option,
                  ...(lang.code === currentLocale ? { color: '#00d4ff', background: 'rgba(0,212,255,0.07)' } : {}),
                }}
                onMouseEnter={e => {
                  if (lang.code !== currentLocale) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.06)';
                    (e.currentTarget as HTMLElement).style.color = '#ccd8ee';
                  }
                }}
                onMouseLeave={e => {
                  if (lang.code !== currentLocale) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#7799bb';
                  }
                }}
              >
                <span style={{ fontSize: '15px' }}>{lang.flag}</span>
                <span>{lang.label}</span>
                {lang.code === currentLocale && <span style={S.check}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
