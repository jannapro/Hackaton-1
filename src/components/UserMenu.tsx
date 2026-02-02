/**
 * User Menu Component
 *
 * Shows user name and sign out button in navbar.
 */

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UserMenu(): JSX.Element | null {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div style={{ position: 'relative', marginRight: '8px' }}>
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
      >
        <span
          style={{
            width: '26px',
            height: '26px',
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
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span>{user.name}</span>
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
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '10px 14px', fontSize: '12px', color: 'var(--ifm-color-emphasis-600)', borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
              {user.email}
            </div>
            <button
              onClick={() => { signOut(); setIsOpen(false); }}
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
              Sign Out
            </button>
          </div>
          <div
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}
