import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [react(), sitemap({
    hostname: 'https://gaadimech.com',
    dynamicRoutes: [
      '/',
      '/about',
      '/services',
      '/contact',
      '/blog'
    ],
    exclude: ['/admin', '/dashboard', '/login', '/register', '/reset-password', '/verify-email'],
    generateRobotsTxt: true,
    robots: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/dashboard',
          '/login',
          '/register',
          '/reset-password',
          '/verify-email'
        ],
        crawlDelay: 10,
      }
    ]
  })],
  build: {
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});