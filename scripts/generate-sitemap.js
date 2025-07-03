#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator for GaadiMech
 * 
 * This script fetches live blog posts from the API and generates 
 * an updated sitemap.xml with current content.
 * 
 * Run with: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://www.gaadimech.com';
const API_URL = process.env.VITE_API_URL || 'https://strapi-cms-8wqv.onrender.com';
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

// Current date for lastmod
const currentDate = new Date().toISOString().split('T')[0] + 'T00:00:00+00:00';

/**
 * Fetch blog posts from API
 */
async function fetchBlogPosts() {
  try {
    console.log('📡 Fetching blog posts from API...');
    
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${API_URL}/api/articles?populate=*&sort=publishedAt:desc`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Found ${data.data?.length || 0} blog posts`);
    
    return data.data || [];
  } catch (error) {
    console.warn('⚠️ Could not fetch blog posts from API:', error.message);
    console.log('🔄 Using fallback blog posts...');
    return getFallbackBlogPosts();
  }
}

/**
 * Fallback blog posts if API is unavailable
 */
function getFallbackBlogPosts() {
  return [
    {
      slug: 'comprehensive-guide-to-car-maintenance-in-2025',
      publishedAt: '2025-01-02T00:00:00+00:00'
    },
    {
      slug: 'car-maintenance-tips-for-monsoon-season',
      publishedAt: '2025-01-01T00:00:00+00:00'
    },
    {
      slug: 'winter-car-maintenance-checklist',
      publishedAt: '2024-12-30T00:00:00+00:00'
    },
    {
      slug: 'essential-car-maintenance-tips-for-beginners',
      publishedAt: '2024-12-28T00:00:00+00:00'
    },
    {
      slug: 'how-to-choose-the-best-car-service-center',
      publishedAt: '2024-12-25T00:00:00+00:00'
    },
    {
      slug: 'signs-your-car-needs-immediate-servicing',
      publishedAt: '2024-12-22T00:00:00+00:00'
    },
    {
      slug: 'understanding-periodic-car-service-intervals',
      publishedAt: '2024-12-20T00:00:00+00:00'
    },
    {
      slug: 'car-ac-not-cooling-common-problems-and-solutions',
      publishedAt: '2024-12-18T00:00:00+00:00'
    },
    {
      slug: 'car-ac-maintenance-guide-for-summer',
      publishedAt: '2024-12-15T00:00:00+00:00'
    },
    {
      slug: 'how-to-improve-car-ac-efficiency',
      publishedAt: '2024-12-12T00:00:00+00:00'
    },
    {
      slug: 'when-to-replace-your-car-battery-warning-signs',
      publishedAt: '2024-12-10T00:00:00+00:00'
    },
    {
      slug: 'how-to-extend-car-battery-life',
      publishedAt: '2024-12-08T00:00:00+00:00'
    },
    {
      slug: 'car-battery-maintenance-tips',
      publishedAt: '2024-12-05T00:00:00+00:00'
    },
    {
      slug: 'complete-guide-to-car-denting-and-painting',
      publishedAt: '2024-12-03T00:00:00+00:00'
    },
    {
      slug: 'how-to-fix-car-scratches-and-dents',
      publishedAt: '2024-12-01T00:00:00+00:00'
    },
    {
      slug: 'ultimate-guide-to-car-tyre-maintenance',
      publishedAt: '2024-11-28T00:00:00+00:00'
    },
    {
      slug: 'when-to-replace-car-tyres',
      publishedAt: '2024-11-25T00:00:00+00:00'
    },
    {
      slug: 'importance-of-wheel-alignment-and-balancing',
      publishedAt: '2024-11-22T00:00:00+00:00'
    },
    {
      slug: 'professional-car-detailing-vs-regular-wash',
      publishedAt: '2024-11-20T00:00:00+00:00'
    },
    {
      slug: 'how-to-protect-car-paint-from-damage',
      publishedAt: '2024-11-18T00:00:00+00:00'
    }
  ];
}

/**
 * Static pages configuration
 */
const staticPages = [
  // High Priority Pages (1.0)
  {
    url: '/',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '1.0',
    image: 'https://www.gaadimech.com/images/hero-image.jpg'
  },
  
  // Core Service Pages (0.9)
  {
    url: '/services',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/express',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.9'
  },
  {
    url: '/express-beta-atc',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.9'
  },
  
  // Content Pages (0.8-0.9)
  {
    url: '/blog',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.9'
  },
  {
    url: '/ad-services',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  
  // Business Pages (0.7-0.8)
  {
    url: '/about',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/contact',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/careers',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.6'
  },
  {
    url: '/franchise',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    url: '/workshop-partner',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    url: '/feedback',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.5'
  },
  
  // Express Services (0.8)
  {
    url: '/ads-express',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: '/express-rzp-atc',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.8'
  },
  
  // Individual Service Pages (0.8)
  {
    url: '/services/periodic',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/services/ac',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/services/car-spa',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/services/denting',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/services/battery',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/services/windshield',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/services/detailing',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/services/tyre',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  
  // SEO-Optimized City Service Pages (0.9)
  {
    url: '/car-service-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/car-ac-service-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/car-dent-paint-service-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/car-repair-service-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/car-mechanic-shop-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/90-minute-car-service-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/doorstep-car-service-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/tyre-wheel-alignment-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/windshield-replacement-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/car-battery-replacement-in-jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  
  // City Pages (0.8)
  {
    url: '/city/jaipur',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/city/mumbai',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/city/delhi',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/city/bangalore',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/city/pune',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  
  // Legal Pages (0.4)
  {
    url: '/privacy-policy',
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    url: '/terms',
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    url: '/refund-policy',
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    url: '/express-Service-TnCs',
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    url: '/legal/express-service-terms',
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: '0.4'
  }
];

/**
 * Generate XML URL entry
 */
function generateUrlEntry(page) {
  let xml = `  <url>\n`;
  xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  
  if (page.image) {
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${page.image}</image:loc>\n`;
    xml += `      <image:caption>GaadiMech 90-Minute Car Service</image:caption>\n`;
    xml += `    </image:image>\n`;
  }
  
  xml += `  </url>\n`;
  return xml;
}

/**
 * Generate sitemap XML
 */
async function generateSitemap() {
  console.log('🚀 Starting sitemap generation...');
  
  // Fetch dynamic blog posts
  const blogPosts = await fetchBlogPosts();
  
  // Start XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
  xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\n`;
  xml += `        http://www.google.com/schemas/sitemap-image/1.1\n`;
  xml += `        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">\n\n`;
  
  // Add static pages
  xml += `  <!-- STATIC PAGES -->\n`;
  for (const page of staticPages) {
    xml += generateUrlEntry(page);
  }
  
  // Add dynamic blog posts
  xml += `\n  <!-- DYNAMIC BLOG POSTS -->\n`;
  xml += `  <!-- Generated from API on ${new Date().toISOString()} -->\n`;
  
  for (const post of blogPosts) {
    const publishDate = post.publishedAt || post.pub_at || post.published_at || post.createdAt || currentDate;
    const blogPage = {
      url: `/blog/${post.slug}`,
      lastmod: publishDate,
      changefreq: 'monthly',
      priority: '0.7'
    };
    xml += generateUrlEntry(blogPage);
  }
  
  xml += `\n</urlset>`;
  
  return xml;
}

/**
 * Write sitemap to file
 */
async function writeSitemap() {
  try {
    const xml = await generateSitemap();
    
    // Ensure directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write file
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📍 Location: ${OUTPUT_FILE}`);
    console.log(`📊 Total URLs: ${xml.split('<url>').length - 1}`);
    console.log(`📅 Generated: ${new Date().toISOString()}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🎯 GaadiMech Sitemap Generator Starting...');
  const success = await writeSitemap();
  process.exit(success ? 0 : 1);
}

// Check if this script is being run directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('generate-sitemap.js')) {
  main();
}

export {
  generateSitemap,
  writeSitemap,
  fetchBlogPosts
}; 