/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Colors
        'brand-green': '#2D5016', // Primary Brand Color
        'brand-gold': '#DAA520', // Secondary Brand Color
        'brand-brown': '#8B4513', // Supporting Color
        
        // Extended Color Palette
        'brand-emerald': '#006A4E', // Professional documents
        'brand-ivory': '#F5F5DC', // Soft backgrounds
        'brand-charcoal': '#36454F', // Body text and subtle elements
        'brand-sage': '#87A96B', // Secondary graphics
      },
      fontFamily: {
        'primary': ['Montserrat', 'sans-serif'],
        'secondary': ['Open Sans', 'sans-serif'],
        'accent': ['Playfair Display', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#36454F',
            h1: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              color: '#36454F',
            },
            h2: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              color: '#36454F',
            },
            h3: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              color: '#36454F',
            },
            h4: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              color: '#36454F',
            },
            a: {
              color: '#2D5016',
              '&:hover': {
                color: '#006A4E',
              },
            },
            blockquote: {
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              borderLeftColor: '#DAA520',
            },
          },
        },
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'brand-md': '0 6px 10px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2D5016, #006A4E)',
        'brand-gradient-gold': 'linear-gradient(135deg, #DAA520, #8B4513)',
        'brand-gradient-sage': 'linear-gradient(135deg, #87A96B, #2D5016)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
