'use client'
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  signInWithPhone: (phoneNumber: string) => Promise<void>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
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

  // 🚀 Signup with Phone Number
  const signUpWithPhone = async (phoneNumber: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/phone-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP for signup');
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up with phone');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Signup with Email & Password
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }

      router.push('/dashboard'); // Redirect after successful signup
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 📱 Login with Phone (Send OTP)
  const signInWithPhone = async (phoneNumber: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/phone-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Verify OTP
  const verifyOTP = async (phoneNumber: string, otp: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP');
      }

      router.push('/dashboard'); // Redirect after OTP verification
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 📧 Login with Email & Password
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/email-login', {
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

  // 🔵 Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      window.location.href = '/api/auth/google';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
      throw err;
    } finally {
      setLoading(false);  
    }
  };

  const value = {
    signInWithPhone,
    verifyOTP,
    signInWithEmail,
    signInWithGoogle,
    signUpWithPhone,
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
