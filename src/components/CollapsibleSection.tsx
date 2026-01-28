/**
 * CollapsibleSection Component
 * T051: Expandable content sections for optional/advanced material
 *
 * Use for supplementary content, advanced topics, or detailed
 * explanations that shouldn't interrupt the main flow.
 */

import React, { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'info' | 'warning' | 'advanced';
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  variant = 'default',
}: CollapsibleSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantStyles: Record<string, { borderColor: string; headerBg: string; icon: string }> = {
    default: {
      borderColor: 'var(--ifm-color-primary)',
      headerBg: 'var(--ifm-color-primary-lightest)',
      icon: '📖',
    },
    info: {
      borderColor: '#0288d1',
      headerBg: 'rgba(2, 136, 209, 0.1)',
      icon: 'ℹ️',
    },
    warning: {
      borderColor: '#ff9800',
      headerBg: 'rgba(255, 152, 0, 0.1)',
      icon: '⚠️',
    },
    advanced: {
      borderColor: '#9c27b0',
      headerBg: 'rgba(156, 39, 176, 0.1)',
      icon: '🔬',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      style={{
        border: `1px solid ${styles.borderColor}`,
        borderRadius: '8px',
        marginBottom: '1rem',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          backgroundColor: styles.headerBg,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '1rem',
          fontWeight: 500,
          color: 'var(--ifm-font-color-base)',
        }}
        aria-expanded={isOpen}
      >
        <span>
          <span style={{ marginRight: '0.5rem' }}>{styles.icon}</span>
          {title}
        </span>
        <span
          style={{
            transition: 'transform 0.2s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? '2000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        <div style={{ padding: '1rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
