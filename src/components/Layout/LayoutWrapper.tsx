"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { CommandPalette } from '../Search/CommandPalette';

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
      (child?.type === 'main' ||
        (child?.props && typeof child.props === 'object' && child.props !== null &&
          'className' in child.props &&
          typeof (child.props as { className?: string }).className === 'string' &&
          (child.props as { className: string }).className.includes('flex-grow')))
    )}</>;
  }

  // For non-admin routes, render everything
  return (
    <>
      <CommandPalette />
      {children}
    </>
  );
}
