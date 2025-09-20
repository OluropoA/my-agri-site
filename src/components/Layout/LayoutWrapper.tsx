"use client";

import { usePathname } from 'next/navigation';
import { ReactElement, cloneElement } from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  
  const childrenArray = Array.isArray(children) ? children : [children];
  
  if (isAdminRoute) {
    // For admin routes, only render the main content (skip header/footer)
    return <>{childrenArray.find((child: any) => child?.type?.name === 'main' || child?.props?.className?.includes('flex-grow'))}</>;
  }
  
  // For non-admin routes, render everything
  return <>{children}</>;
}
