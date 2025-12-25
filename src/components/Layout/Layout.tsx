"use client";

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/Effects/MotionWrapper';

interface LayoutProps {
  children: React.ReactNode;
  containerClass?: string;
}

/**
 * Main Layout Component
 * Provides consistent branding across all pages with header and footer
 */
export default function Layout({ children, containerClass = "py-12" }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-secondary">
      <Header />

      <main className={`flex-grow ${containerClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Page Hero Component with brand styling
 */
export function PageHero({
  title,
  subtitle = "",
  backgroundImage = "",
  align = "center",
  size = "default"
}: {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  align?: "left" | "center" | "right";
  size?: "small" | "default" | "large";
}) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  const sizeClasses = {
    small: "py-8",
    default: "py-16",
    large: "py-24",
  };

  const maxWidthClasses = {
    left: "",
    center: "max-w-3xl",
    right: "",
  };

  return (
    <div
      className={`w-full ${sizeClasses[size]} relative overflow-hidden`}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(45, 80, 22, 0.85), rgba(0, 106, 78, 0.85)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : { backgroundColor: '#F5F5DC' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${alignmentClasses[align]} ${maxWidthClasses[align]}`}>
          <SlideUp>
            <h1 className={`font-primary font-bold ${backgroundImage ? 'text-white' : 'text-brand-charcoal'} ${size === 'large' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} mb-4`}>
              {title}
            </h1>
          </SlideUp>
          {subtitle && (
            <SlideUp delay={0.2}>
              <p className={`${backgroundImage ? 'text-white/80' : 'text-brand-charcoal/70'} text-xl max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
                {subtitle}
              </p>
            </SlideUp>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Section Component with brand styling
 */
export function Section({
  children,
  bgColor = "white", // white, light, green, gold, etc.
  className = "",
  containerClassName = "",
}: {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  containerClassName?: string;
}) {
  const bgClasses: Record<string, string> = {
    white: "bg-white",
    light: "bg-brand-ivory",
    green: "bg-brand-green text-white",
    gold: "bg-brand-gold text-white",
    dark: "bg-brand-charcoal text-white",
  };

  return (
    <section className={`py-16 ${bgClasses[bgColor] || bgClasses.white} ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

/**
 * Card Component with brand styling
 */
export function BrandCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white shadow-md rounded-lg border border-brand-green/20 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/**
 * Heading Components with brand styling
 */
export function SectionHeading({
  title,
  subtitle = "",
  align = "left",
  className = ""
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mb-8 ${alignClass[align]} ${className}`}>
      <h2 className="text-3xl font-primary font-bold text-brand-green mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-brand-charcoal/70 max-w-3xl font-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
