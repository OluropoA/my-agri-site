"use client";

import { usePathname } from 'next/navigation';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current route is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  
  // For admin routes, don't render the header/footer wrapper
  if (isAdminRoute) {
    return null;
  }
  
  // For non-admin routes, render the header/footer wrapper
  return <>{children}</>;
}
