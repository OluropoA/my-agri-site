"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  
  const childrenArray = Array.isArray(children) ? children : [children];
  
  if (isAdminRoute) {
    // For admin routes, only render the main content (skip header/footer)
    return <>{childrenArray.find((child: React.ReactNode) => 
      React.isValidElement(child) && 
      (child?.type === 'main' || child?.props?.className?.includes('flex-grow'))
    )}</>;
  }
  
  // For non-admin routes, render everything
  return <>{children}</>;
}
