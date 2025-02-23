// auth-provider.tsx
'use client'
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  signInWithPhone: (phoneNumber: string) => Promise<void>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/phone-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Include the error details from the server if available
        throw new Error(data.details || data.error || 'Failed to send OTP');
      }
  
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP';
      console.error('Phone login error:', errorMessage); // Debug log
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (phoneNumber: string, otp: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP');
      }

      const data = await response.json();
      
      // Redirect to dashboard or home page after successful verification
      router.push('/dashboard');
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/email-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      router.push('/dashboard');
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      // Redirect to Auth0's Google login page
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