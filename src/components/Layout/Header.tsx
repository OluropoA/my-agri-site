"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X } from 'lucide-react';
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

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Close mobile menu backdrop"
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm lg:hidden"
            />

            <div
              id="mobile-nav-drawer"
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-white shadow-xl lg:hidden flex flex-col"
            >
                <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-brand-green font-primary">Menu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                      type="button"
                      className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none dark:hover:bg-zinc-800 dark:text-gray-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={`${pathname === item.href ? 'bg-brand-green/10 text-brand-green border-l-4 border-brand-green' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          } block text-lg font-medium py-3 px-4 rounded-r-md transition-all`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}

                  {session?.user?.role === 'ADMIN' && (
                    <div>
                      <Link
                        href="/admin"
                        className={`${pathname === '/admin' ? 'bg-brand-green/10 text-brand-green border-l-4 border-brand-green' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          } block text-lg font-medium py-3 px-4 rounded-r-md transition-all`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </div>
                  )}
                </div>

                {/* Footer of drawer */}
                <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
                  {session ? (
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-bold">
                          {session.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700">{session.user?.name}</p>
                          <p className="text-xs text-gray-500">Logged in</p>
                        </div>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-center text-gray-400">
                      © {new Date().getFullYear()} Dr. &apos;Ropo Apalowo
                    </p>
                  )}
                </div>
              </div>
          </>
        )}
      </nav>
    </header>
  );
}
