'use client';

import { Spin } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { initializeAuth } from '@/store/slices/auth.slice';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [isInitialized, setIsInitialized] = useState(false);

  const { isAuthenticated, loading: authLoading } = useSelector((state: RootState) => state.auth);

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // Initialize auth state immediately when component mounts
    const initAuth = async () => {
      if (typeof window !== 'undefined') {
        dispatch(initializeAuth());
        // Add a small delay to ensure localStorage is read
        setTimeout(() => {
          setIsInitialized(true);
        }, 100);
      }
    };

    initAuth();
  }, [dispatch]);

  useEffect(() => {
    // Only handle routing after auth is initialized and not loading
    if (isInitialized && !authLoading) {
      if (!isAuthenticated && !isPublicRoute) {
        router.push('/auth/login');
      } else if (isAuthenticated && isPublicRoute) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, authLoading, isPublicRoute, router, isInitialized]);

  // Show loading while initializing or auth is loading
  if (!isInitialized || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Show loading while redirecting unauthenticated users
  if (!isAuthenticated && !isPublicRoute) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
