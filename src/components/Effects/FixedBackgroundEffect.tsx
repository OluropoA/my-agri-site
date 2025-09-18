"use client";

import { useEffect, useState } from 'react';

export default function FixedBackgroundEffect() {
  const [color, setColor] = useState('rgb(245, 245, 220)');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setMounted(true);
    
    const handleScroll = () => {
      const vh = window.innerHeight;
      const scroll = window.scrollY;
      const percent = Math.min(scroll / (vh * 1.5), 1);
      
      // Interpolate: Warm Ivory to Golden Harvest
      const r = Math.round(245 - percent * (245 - 218));
      const g = Math.round(245 - percent * (245 - 165));
      const b = Math.round(220 - percent * (220 - 32));
      
      setColor(`rgb(${r}, ${g}, ${b})`);
    };
    
    handleScroll(); // Initial color
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: color,
        zIndex: -1,
        transition: 'background-color 0.3s',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  );
}
