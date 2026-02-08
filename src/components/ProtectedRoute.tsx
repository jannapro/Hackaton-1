/**
 * Protected Route Component
 *
 * Wraps content that requires authentication.
 * Shows loading spinner while checking auth state.
 * Redirects to AuthPage if not authenticated.
 */

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from './AuthPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const styles = {
  loading: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--ifm-background-color)',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid var(--ifm-color-emphasis-200)',
    borderTop: '3px solid var(--ifm-color-primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div style={styles.loading}>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={styles.spinner} />
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!user) {
    return <AuthPage />;
  }

  // User is authenticated, show protected content
  return <>{children}</>;
}
