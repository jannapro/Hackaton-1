/**
 * Simple Authentication Context
 *
 * Basic login/signup using localStorage.
 * Users must sign up and log in to access the book.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, name: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USERS_KEY = 'textbook_users';
const CURRENT_USER_KEY = 'textbook_current_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const getUsers = (): Record<string, { password: string; name: string }> => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
  };

  const saveUsers = (users: Record<string, { password: string; name: string }>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const signUp = (email: string, password: string, name: string) => {
    setError(null);
    const users = getUsers();

    if (users[email]) {
      setError('This email is already registered. Please sign in.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Save new user
    users[email] = { password, name };
    saveUsers(users);

    // Log in the new user
    const newUser = { email, name };
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  };

  const signIn = (email: string, password: string) => {
    setError(null);
    const users = getUsers();

    if (!users[email]) {
      setError('No account found with this email.');
      return;
    }

    if (users[email].password !== password) {
      setError('Incorrect password.');
      return;
    }

    // Log in
    const loggedInUser = { email, name: users[email].name };
    setUser(loggedInUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
