/**
 * Brand Identity Guidelines Implementation
 * Dr. Oluropo Apalowo - Agricultural Science Website
 * 
 * This file centralizes all brand colors, typography, and styling to ensure
 * consistent application of the brand identity across the website.
 */

export const brandColors = {
  // Core Colors
  forestGreen: '#2D5016', // Primary Brand Color
  goldenHarvest: '#DAA520', // Secondary Brand Color
  earthBrown: '#8B4513', // Supporting Color
  pureWhite: '#FFFFFF', // Neutral Base

  // Extended Color Palette
  deepEmerald: '#006A4E', // For professional documents
  warmIvory: '#F5F5DC', // For soft backgrounds
  charcoalGray: '#36454F', // For body text and subtle elements
  sageGreen: '#87A96B', // For secondary graphics and illustrations
};

export const brandFonts = {
  // Primary Typeface - Montserrat
  primary: {
    fontFamily: "'Montserrat', sans-serif",
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  // Secondary Typeface - Open Sans
  secondary: {
    fontFamily: "'Open Sans', sans-serif",
    weights: {
      regular: 400,
      semiBold: 600,
      bold: 700,
    },
  },
  // Accent Typeface - Playfair Display
  accent: {
    fontFamily: "'Playfair Display', serif",
    weights: {
      regular: 400,
      bold: 700,
    },
  },
};

export const brandShadows = {
  light: '0 2px 4px rgba(0, 0, 0, 0.05)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
  heavy: '0 8px 16px rgba(0, 0, 0, 0.15)',
};

export const brandBorders = {
  thin: '1px solid',
  medium: '2px solid',
  thick: '3px solid',
  radius: {
    sm: '0.25rem', // 4px
    md: '0.5rem',  // 8px
    lg: '1rem',    // 16px
    xl: '1.5rem',  // 24px
    full: '9999px', // Fully rounded
  },
};

export const brandGradients = {
  primary: `linear-gradient(135deg, ${brandColors.forestGreen}, ${brandColors.deepEmerald})`,
  secondary: `linear-gradient(135deg, ${brandColors.goldenHarvest}, ${brandColors.earthBrown})`,
  light: `linear-gradient(135deg, ${brandColors.warmIvory}, ${brandColors.pureWhite})`,
};

export const brandSpacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  xxl: '3rem',   // 48px
};

// Theme mapping for Tailwind class variants
export const brandTheme = {
  // Mapping for colors
  colors: {
    primary: brandColors.forestGreen,
    secondary: brandColors.goldenHarvest,
    tertiary: brandColors.earthBrown,
    background: brandColors.pureWhite,
    text: brandColors.charcoalGray,
    accent: brandColors.deepEmerald,
    muted: brandColors.sageGreen,
    light: brandColors.warmIvory,
  },
  // Typography scale
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  // Other theme elements...
};

// Export common utility functions for consistent branding
export const brandUtils = {
  // Apply primary button styling consistently
  getPrimaryButtonClasses: (isSmall = false) => {
    return `bg-[${brandColors.forestGreen}] hover:bg-[${brandColors.deepEmerald}] text-white font-medium ${
      isSmall ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'
    } rounded-md transition-colors duration-200`;
  },
  // Apply secondary button styling consistently
  getSecondaryButtonClasses: (isSmall = false) => {
    return `border border-[${brandColors.forestGreen}] text-[${brandColors.forestGreen}] hover:bg-[${brandColors.forestGreen}]/5 font-medium ${
      isSmall ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'
    } rounded-md transition-colors duration-200`;
  },
  // Apply consistent card styling
  getCardClasses: () => {
    return `bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden`;
  }
};
