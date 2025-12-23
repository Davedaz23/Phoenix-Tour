'use client';

import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  // Check authentication pages
  const isLoginPage = pathname === '/dashboard/login';
  const isSignupPage = pathname === '/dashboard/signup';
  const isAuthPage = isLoginPage || isSignupPage;

  useEffect(() => {
    console.log("Session status:", status, "Session data:", session);
    
    // Only run redirect logic after session is loaded
    if (status === 'loading') {
      return;
    }

    // If user is authenticated and on auth pages, redirect to dashboard
    if (status === 'authenticated' && isAuthPage) {
      console.log("Authenticated user on auth page, redirecting to dashboard");
      redirect('/dashboard');
      return;
    }

    // If user is not authenticated and not on auth pages, redirect to login
    if (status === 'unauthenticated' && !isAuthPage) {
      console.log("Unauthenticated user, redirecting to login");
      redirect('/dashboard/login');
      return;
    }

    // Check admin role if authenticated
    if (status === 'authenticated' && session?.user) {
      const isAdmin = session.user.role === 'admin' || session.user.role === 'super_admin';
      
      if (!isAdmin && pathname.startsWith('/dashboard')) {
        console.log("Non-admin user trying to access dashboard, redirecting to home");
        redirect('/');
        return;
      }
    }
  }, [session, status, pathname, isAuthPage]);

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't show layout on auth pages (login/signup)
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 w-64">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-64 min-w-0">
        <div className="sticky top-0 z-20 bg-white">
          <Header />
        </div>
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}