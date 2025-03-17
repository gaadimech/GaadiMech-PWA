import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import { compression } from 'vite-plugin-compression2';

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
        '/services/tyre',
        '/jaipur',
        '/delhi',
        '/mumbai',
        '/bangalore',
        '/chennai',
        '/kolkata',
        '/hyderabad',
        '/pune',
        '/ahmedabad'
      ],
      exclude: ['/admin', '/dashboard', '/login', '/register', '/reset-password', '/verify-email'],
      generateRobotsTxt: true,
      robots: [{
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/login', '/register', '/reset-password', '/verify-email'],
        crawlDelay: 10
      }]
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      deleteOriginalAssets: false,
    }),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      deleteOriginalAssets: false,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react-icons'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-animations';
            if (id.includes('lucide')) return 'vendor-icons';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
      },
    },
    sourcemap: false,
    assetsInlineLimit: 4096,
    modulePreload: {
      polyfill: true,
    },
    target: 'es2020',
    reportCompressedSize: false,
  },
  server: {
    compression: true,
  },
});