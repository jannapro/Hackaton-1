/**
 * Simple Authentication Page
 *
 * Sign in and sign up forms.
 */

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

type AuthMode = 'signin' | 'signup';

const translations = {
  en: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    welcome: 'Physical Humanoid Robots',
    subtitle: 'Sign in to access the textbook',
  },
  ur: {
    signIn: 'سائن ان',
    signUp: 'سائن اپ',
    email: 'ای میل',
    password: 'پاس ورڈ',
    name: 'پورا نام',
    noAccount: 'اکاؤنٹ نہیں ہے؟',
    hasAccount: 'پہلے سے اکاؤنٹ ہے؟',
    welcome: 'فزیکل ہیومنائیڈ روبوٹس',
    subtitle: 'کتاب تک رسائی کے لیے سائن ان کریں',
  },
};

export default function AuthPage(): JSX.Element {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { signIn, signUp, error, clearError } = useAuth();
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') {
      signIn(email, password);
    } else {
      signUp(email, password, name);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    clearError();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--ifm-background-color)',
        padding: '20px',
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--ifm-background-surface-color)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          border: '1px solid var(--ifm-color-emphasis-200)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: 'var(--ifm-font-color-base)' }}>
            {t.welcome}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--ifm-color-emphasis-600)', marginTop: '8px' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: '12px',
              backgroundColor: 'rgba(255, 82, 82, 0.1)',
              borderRadius: '8px',
              color: '#ff5252',
              fontSize: '14px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>
                {t.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  backgroundColor: 'var(--ifm-background-color)',
                  color: 'var(--ifm-font-color-base)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                borderRadius: '8px',
                border: '1px solid var(--ifm-color-emphasis-300)',
                backgroundColor: 'var(--ifm-background-color)',
                color: 'var(--ifm-font-color-base)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                borderRadius: '8px',
                border: '1px solid var(--ifm-color-emphasis-300)',
                backgroundColor: 'var(--ifm-background-color)',
                color: 'var(--ifm-font-color-base)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '14px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            {mode === 'signin' ? t.signIn : t.signUp}
          </button>
        </form>

        {/* Switch mode */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--ifm-color-emphasis-600)' }}>
          {mode === 'signin' ? t.noAccount : t.hasAccount}{' '}
          <button
            onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ifm-color-primary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {mode === 'signin' ? t.signUp : t.signIn}
          </button>
        </div>
      </div>
    </div>
  );
}
