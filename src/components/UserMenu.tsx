/**
 * User Menu Component
 *
 * Shows user info and sign out option in the navbar.
 * Only visible when user is authenticated.
 */

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  en: {
    signOut: 'Sign Out',
    welcome: 'Welcome',
  },
  ur: {
    signOut: 'سائن آؤٹ',
    welcome: 'خوش آمدید',
  },
};

export default function UserMenu(): JSX.Element | null {
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language];

  if (!user) return null;

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginRight: '8px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: 'transparent',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '6px',
          cursor: 'pointer',
          color: 'var(--ifm-navbar-link-color)',
          fontSize: '14px',
        }}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <span
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {displayName}
        </span>
        <span style={{ fontSize: '10px' }}>▼</span>
      </button>

      {isOpen && (
        <>
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
              minWidth: '150px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '12px 14px',
                borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                fontSize: '12px',
                color: 'var(--ifm-color-emphasis-600)',
              }}
            >
              {user.email}
            </div>
            <button
              onClick={handleSignOut}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#ff5252',
                fontSize: '14px',
                textAlign: 'left',
              }}
            >
              {t.signOut}
            </button>
          </div>

          {/* Click outside to close */}
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
        </>
      )}
    </div>
  );
}
