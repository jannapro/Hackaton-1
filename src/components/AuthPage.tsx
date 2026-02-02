/**
 * Authentication Page Component
 *
 * Provides sign in, sign up, and password reset functionality.
 * This is the landing page for unauthenticated users.
 */

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

type AuthMode = 'signin' | 'signup' | 'reset';

const translations = {
  en: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    resetPassword: 'Reset Password',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Full Name',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    sendResetLink: 'Send Reset Link',
    backToSignIn: 'Back to Sign In',
    resetSent: 'Password reset email sent! Check your inbox.',
    welcome: 'Welcome to Physical Humanoid Robots',
    subtitle: 'Sign in to access the AI-native textbook',
    passwordMismatch: 'Passwords do not match',
  },
  ur: {
    signIn: 'سائن ان',
    signUp: 'سائن اپ',
    resetPassword: 'پاس ورڈ ری سیٹ',
    email: 'ای میل',
    password: 'پاس ورڈ',
    confirmPassword: 'پاس ورڈ کی تصدیق',
    name: 'پورا نام',
    forgotPassword: 'پاس ورڈ بھول گئے؟',
    noAccount: 'اکاؤنٹ نہیں ہے؟',
    hasAccount: 'پہلے سے اکاؤنٹ ہے؟',
    sendResetLink: 'ری سیٹ لنک بھیجیں',
    backToSignIn: 'سائن ان پر واپس',
    resetSent: 'پاس ورڈ ری سیٹ ای میل بھیج دی گئی! اپنا ان باکس چیک کریں۔',
    welcome: 'فزیکل ہیومنائیڈ روبوٹس میں خوش آمدید',
    subtitle: 'AI-native کتاب تک رسائی کے لیے سائن ان کریں',
    passwordMismatch: 'پاس ورڈ مماثل نہیں ہیں',
  },
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--ifm-background-color)',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--ifm-background-surface-color)',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    border: '1px solid var(--ifm-color-emphasis-200)',
  },
  logo: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  logoIcon: {
    fontSize: '48px',
    marginBottom: '12px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--ifm-font-color-base)',
    marginBottom: '8px',
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--ifm-color-emphasis-600)',
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--ifm-font-color-base)',
  },
  input: {
    padding: '12px 14px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid var(--ifm-color-emphasis-300)',
    backgroundColor: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'var(--ifm-color-primary)',
    color: 'white',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    marginTop: '8px',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: 'var(--ifm-color-primary)',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px',
  },
  footer: {
    textAlign: 'center' as const,
    marginTop: '24px',
    fontSize: '14px',
    color: 'var(--ifm-color-emphasis-600)',
  },
  error: {
    padding: '12px',
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    borderRadius: '8px',
    color: '#ff5252',
    fontSize: '14px',
    textAlign: 'center' as const,
  },
  success: {
    padding: '12px',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: '8px',
    color: '#4caf50',
    fontSize: '14px',
    textAlign: 'center' as const,
  },
};

export default function AuthPage(): JSX.Element {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { signIn, signUp, resetPassword, error, clearError } = useAuth();
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          setLocalError(t.passwordMismatch);
          setIsLoading(false);
          return;
        }
        await signUp(email, password, name);
      } else if (mode === 'reset') {
        await resetPassword(email);
        setResetSent(true);
      }
    } catch (err) {
      // Error is handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setLocalError(null);
    clearError();
    setResetSent(false);
  };

  const displayError = localError || error;

  return (
    <div style={styles.container} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🤖</div>
          <h1 style={styles.title}>{t.welcome}</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>
        </div>

        {displayError && <div style={styles.error}>{displayError}</div>}
        {resetSent && <div style={styles.success}>{t.resetSent}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>{t.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {mode !== 'reset' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
                minLength={6}
              />
            </div>
          )}

          {mode === 'signup' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>{t.confirmPassword}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                required
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: isLoading ? 0.7 : 1,
            }}
            disabled={isLoading}
          >
            {mode === 'signin' && t.signIn}
            {mode === 'signup' && t.signUp}
            {mode === 'reset' && t.sendResetLink}
          </button>
        </form>

        <div style={styles.footer}>
          {mode === 'signin' && (
            <>
              <button style={styles.linkButton} onClick={() => switchMode('reset')}>
                {t.forgotPassword}
              </button>
              <div style={{ marginTop: '12px' }}>
                {t.noAccount}{' '}
                <button style={styles.linkButton} onClick={() => switchMode('signup')}>
                  {t.signUp}
                </button>
              </div>
            </>
          )}

          {mode === 'signup' && (
            <div>
              {t.hasAccount}{' '}
              <button style={styles.linkButton} onClick={() => switchMode('signin')}>
                {t.signIn}
              </button>
            </div>
          )}

          {mode === 'reset' && (
            <button style={styles.linkButton} onClick={() => switchMode('signin')}>
              {t.backToSignIn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
