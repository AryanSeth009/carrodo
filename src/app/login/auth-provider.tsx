'use client';
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  signInWithPhone: (phoneNumber: string) => Promise<void>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => void;
  signUpWithPhone: (phoneNumber: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 🚀 Google Sign-In (Auth0)
  const signInWithGoogle = () => {
    window.location.href = '/api/auth/login?connection=google-oauth2';
  };

  // 🚀 Sign Up with Email & Password
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }

      router.push('/dashboard');
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 📧 Email Login
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      router.push('/dashboard');
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    signInWithPhone: async () => {},
    verifyOTP: async () => {},
    signInWithEmail,
    signInWithGoogle,
    signUpWithPhone: async () => {},
    signUpWithEmail,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
