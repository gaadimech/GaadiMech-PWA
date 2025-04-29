/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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