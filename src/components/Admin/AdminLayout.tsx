"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  LayoutDashboard,
  FileText,
  ShoppingBasket,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Admin navigation items
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Market Watch', href: '/admin/market-watch', icon: ShoppingBasket },
    { name: 'Trusted Sellers', href: '/admin/sellers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // Check if user is admin
  const isAdmin = session?.user?.role === 'ADMIN';
  const isLoading = status === 'loading';

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D5016] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not admin, show unauthorized message
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="bg-red-100 text-red-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <X className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="mb-6 text-gray-600">
            You do not have permission to access the admin area. This area is restricted to administrators only.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-[#2D5016] hover:bg-[#2D5016]/90 text-white"
            >
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
            sidebarOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'
          }`}
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition ${
            sidebarOpen
              ? 'transform translate-x-0 ease-out duration-300'
              : 'transform -translate-x-full ease-in duration-200'
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Mobile sidebar content */}
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center justify-between px-4 mb-4">
              <span className="text-lg font-bold text-[#2D5016]">Dr. Apalowo Admin</span>
              <Link
                href="/"
                className="p-2 text-gray-400 hover:text-[#2D5016] hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Main Site"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-[#2D5016]/10 text-[#2D5016]'
                      : 'text-gray-600 hover:bg-gray-50'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`${
                      pathname === item.href ? 'text-[#2D5016]' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-4 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    {session?.user?.name}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-sm text-gray-500 group-hover:text-gray-700"
                    onClick={() => {
                      // Sign out logic
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-between flex-shrink-0 px-4 mb-4">
              <span className="text-lg font-bold text-[#2D5016]">Dr. Apalowo Admin</span>
              <Link
                href="/"
                className="p-2 text-gray-400 hover:text-[#2D5016] hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Main Site"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-[#2D5016]/10 text-[#2D5016]'
                      : 'text-gray-600 hover:bg-gray-50'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      pathname === item.href ? 'text-[#2D5016]' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 bg-[#2D5016] text-white rounded-full flex items-center justify-center">
                    <span className="font-medium">{session?.user?.name?.[0] || 'A'}</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {session?.user?.name}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-xs text-gray-500 group-hover:text-gray-700"
                    onClick={() => {
                      // Sign out logic
                    }}
                  >
                    <LogOut className="mr-2 h-3 w-3" /> Sign out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top navbar */}
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/admin" className="text-gray-400 hover:text-gray-500">
                    <LayoutDashboard className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </li>
                {pathname !== '/admin' && (
                  <li>
                    <div className="flex items-center">
                      <ChevronRight
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-4 text-sm font-medium text-gray-700">
                        {navigation.find(item => item.href === pathname)?.name || 'Admin'}
                      </span>
                    </div>
                  </li>
                )}
              </ol>
            </nav>
          </div>

          {/* Page content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
