/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic colors for PWA theming
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74', 
          400: '#fb923c',
          500: '#FF7200', // Brand orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Success, warning, error states
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      spacing: {
        // App-specific spacing
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      borderRadius: {
        // App-specific radius
        'app': '12px',
        'card': '16px',
        'modal': '20px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        // Touch feedback animations
        'tap': 'tap 0.1s ease-in-out',
        'press': 'press 0.1s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        tap: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
        press: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.98)', opacity: '0.8' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: {
        xs: {
          css: {
            fontSize: '0.75rem',
            h1: {
              fontSize: '1rem',
              marginBottom: '0.5rem',
              marginTop: '0.5rem',
            },
            h2: {
              fontSize: '0.875rem',
              marginBottom: '0.375rem',
              marginTop: '0.375rem',
            },
            h3: {
              fontSize: '0.8125rem',
              marginBottom: '0.25rem',
              marginTop: '0.25rem',
            },
            p: {
              marginBottom: '0.375rem',
              marginTop: '0.375rem',
            },
            ul: {
              marginBottom: '0.375rem',
              marginTop: '0.375rem',
            },
            li: {
              marginBottom: '0.125rem',
              marginTop: '0.125rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};