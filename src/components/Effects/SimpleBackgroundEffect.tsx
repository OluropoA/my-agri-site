"use client";

import { useEffect, useState } from 'react';

export default function SimpleBackgroundEffect() {
  const [bgColor, setBgColor] = useState('rgb(245, 245, 220)');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined') return;
    
    setMounted(true);
    
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Calculate scroll percentage (0-100)
      const percentage = Math.min(Math.round((scrollPosition / (viewportHeight * 1.5)) * 100), 100);
      
      // Interpolate between Warm Ivory (#F5F5DC) and Golden Harvest (#DAA520)
      const startR = 245, startG = 245, startB = 220; // Warm Ivory
      const endR = 218, endG = 165, endB = 32; // Golden Harvest
      
      const r = Math.round(startR - ((percentage / 100) * (startR - endR)));
      const g = Math.round(startG - ((percentage / 100) * (startG - endG)));
      const b = Math.round(startB - ((percentage / 100) * (startB - endB)));
      
      setBgColor(`rgb(${r}, ${g}, ${b})`);
    };
    
    // Initial color calculation
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: bgColor,
        zIndex: -1,
        transition: 'background-color 0.5s ease',
        pointerEvents: 'none'
      }}
      aria-hidden="true" // Accessibility - this is decorative only
    />
  );
}
