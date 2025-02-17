import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://gaadimech.com',
      dynamicRoutes: [
        '/',
        '/about',
        '/services',
        '/contact',
        '/blog',
        '/express',
        '/services/periodic',
        '/services/ac',
        '/services/car-spa',
        '/services/denting',
        '/services/battery',
        '/services/windshield',
        '/services/detailing',
        '/services/tyre'
      ],
      exclude: ['/admin', '/dashboard', '/login', '/register', '/reset-password', '/verify-email'],
      generateRobotsTxt: true,
      robots: [{
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/login', '/register', '/reset-password', '/verify-email'],
        crawlDelay: 10
      }]
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'framer-motion', 'react-modal'],
          markdown: ['react-markdown']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false
  }
});