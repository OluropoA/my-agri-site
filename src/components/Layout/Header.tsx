"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Research', href: '/research' },
    { name: 'Blog', href: '/blog' },
    { name: 'Market Watch', href: '/market-watch' },
    { name: 'Trusted Sellers', href: '/trusted-sellers' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return pathname === path
      ? 'text-brand-green font-semibold after:content-[""] after:block after:h-0.5 after:bg-brand-green after:w-full after:scale-x-100 after:transition-transform'
      : 'text-brand-charcoal hover:text-brand-gold relative after:content-[""] after:block after:h-0.5 after:bg-brand-gold after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 pointer-events-auto">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-gray-200 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-green font-primary">Dr. &apos;Ropo</span>
              <span className="ml-2 text-sm text-brand-charcoal font-secondary">Agricultural Science</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:ml-10 lg:block">
            <div className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${isActive(item.href)} text-base font-medium transition-colors duration-150`}
                >
                  {item.name}
                </Link>
              ))}
              {session?.user?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className={`${isActive('/admin')} text-base font-medium transition-colors duration-150`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-brand-green">
                  Hello, {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center rounded-md bg-brand-green/10 px-3 py-1.5 text-sm font-medium text-brand-green hover:bg-brand-green/20 font-primary"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // Hidden sign-in for security - only accessible via direct URL /login
              // This prevents exposing admin capabilities to regular visitors
              <div className="hidden">
                <Link
                  href="/login"
                  className="inline-flex items-center rounded-md bg-brand-green px-3 py-1.5 text-sm font-medium !text-white hover:bg-brand-emerald hover:!text-white font-primary"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-brand-green hover:bg-brand-green/10 transition-colors"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div
              id="mobile-nav-drawer"
              className="lg:hidden border-t border-gray-200 bg-white py-3"
          >
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${pathname === item.href
                    ? 'bg-brand-green/10 text-brand-green'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    } block rounded-md px-4 py-3 text-base font-medium transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {session?.user?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className={`${pathname === '/admin'
                    ? 'bg-brand-green/10 text-brand-green'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    } block rounded-md px-4 py-3 text-base font-medium transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
            </div>

            {session ? (
              <div className="mt-3 border-t border-gray-100 pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-center text-gray-400">
                © {new Date().getFullYear()} Dr. &apos;Ropo Apalowo
              </p>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
