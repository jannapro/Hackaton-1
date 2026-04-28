/**
 * UserMenu — sleek avatar dropdown for authenticated users.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const S = {
  wrap: {
    position: 'relative' as const,
    marginLeft: '4px',
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 10px 4px 4px',
    background: 'transparent',
    border: '1px solid rgba(0,212,255,0.18)',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00b4d8, #7c3aed)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: 'Space Grotesk, sans-serif',
    flexShrink: 0,
    boxShadow: '0 0 10px rgba(0,212,255,0.3)',
  },
  name: {
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'Space Grotesk, sans-serif',
    color: '#ccd8ee',
    maxWidth: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  chevron: {
    fontSize: '9px',
    color: '#4d6680',
    transition: 'transform 0.2s',
    lineHeight: 1,
  },
  dropdown: {
    position: 'absolute' as const,
    top: 'calc(100% + 8px)',
    right: 0,
    minWidth: '200px',
    background: 'rgba(8, 12, 24, 0.97)',
    border: '1px solid rgba(0,212,255,0.15)',
    borderRadius: '12px',
    boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.05)',
    zIndex: 1000,
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
  },
  header: {
    padding: '14px 16px',
    borderBottom: '1px solid rgba(0,212,255,0.08)',
    background: 'rgba(0,212,255,0.03)',
  },
  headerName: {
    fontSize: '13px',
    fontWeight: 700,
    fontFamily: 'Space Grotesk, sans-serif',
    color: '#ccd8ee',
    marginBottom: '2px',
  },
  headerEmail: {
    fontSize: '11px',
    fontFamily: 'Space Grotesk, sans-serif',
    color: '#3d5570',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  menuSection: {
    padding: '6px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '9px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    fontSize: '13px',
    fontFamily: 'Space Grotesk, sans-serif',
    fontWeight: 500,
    color: '#7799bb',
    transition: 'all 0.15s',
    textDecoration: 'none',
  },
  divider: {
    height: '1px',
    background: 'rgba(0,212,255,0.07)',
    margin: '4px 0',
  },
  logoutItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '9px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    fontSize: '13px',
    fontFamily: 'Space Grotesk, sans-serif',
    fontWeight: 500,
    color: '#ef4444',
    transition: 'all 0.15s',
  },
  backdrop: {
    position: 'fixed' as const,
    inset: 0,
    zIndex: 999,
  },
};

const menuItems = [
  { icon: '⊞', label: 'Dashboard' },
  { icon: '📈', label: 'My Progress' },
  { icon: '⚙', label: 'Settings' },
];

export default function UserMenu(): JSX.Element | null {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div style={S.wrap}>
      <button
        ref={triggerRef}
        onClick={() => setOpen(o => !o)}
        style={{
          ...S.trigger,
          ...(open ? { borderColor: 'rgba(0,212,255,0.4)', background: 'rgba(0,212,255,0.06)' } : {}),
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        <span style={S.avatar}>{initials}</span>
        <span style={S.name}>{user.name.split(' ')[0]}</span>
        <span style={{ ...S.chevron, transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>

      {open && (
        <>
          <div style={S.backdrop} onClick={() => setOpen(false)} />
          <div style={S.dropdown} role="menu">
            <div style={S.header}>
              <div style={S.headerName}>{user.name}</div>
              <div style={S.headerEmail}>{user.email}</div>
            </div>

            <div style={S.menuSection}>
              {menuItems.map(item => (
                <button
                  key={item.label}
                  style={S.menuItem}
                  role="menuitem"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.07)';
                    (e.currentTarget as HTMLElement).style.color = '#ccd8ee';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#7799bb';
                  }}
                >
                  <span style={{ fontSize: '14px', opacity: 0.7 }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}

              <div style={S.divider} />

              <button
                style={S.logoutItem}
                role="menuitem"
                onClick={() => { signOut(); setOpen(false); }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '14px', opacity: 0.8 }}>↩</span>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
