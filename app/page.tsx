'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from "../components/Dashboard";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <Dashboard /> : null;
} 