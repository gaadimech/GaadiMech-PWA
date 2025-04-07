# GaadiMech Website SEO Guide

This guide provides a comprehensive overview of the GaadiMech website structure specifically focused on SEO elements. It will help you understand where content is defined, how to modify SEO elements, and how the site is organized.

## Table of Contents

1. [Website Structure Overview](#website-structure-overview)
2. [SEO Implementation](#seo-implementation)
3. [Page-specific SEO](#page-specific-seo)
4. [Content Management](#content-management)
5. [URL Structure](#url-structure)
6. [City Pages](#city-pages)
7. [Service Pages](#service-pages)
8. [Blog Implementation](#blog-implementation)

## Website Structure Overview

The GaadiMech website follows a standard React structure:

- `/src`: Main source code directory
  - `/components`: UI components
  - `/pages`: Page components
  - `/data`: Static content & data
  - `/utils`: Utility functions including SEO
  - `/services`: API service connections
  - `/types`: TypeScript type definitions
  - `/assets`: Static assets like images

## SEO Implementation

All SEO-related configuration is now centralized in two main files:

### 1. SEO Utility (`/src/utils/seo.ts`)

This file contains all SEO metadata for the website organized by page path. It includes:

- Page titles
- Meta descriptions
- Keywords
- Open Graph data
- Hidden SEO content
- Structured data (JSON-LD)

Example:
```typescript
const seoConfigs: Record<string, SeoConfig> = {
  '/': {
    title: 'GaadiMech - Professional Car Service & Repair in India',
    description: 'GaadiMech provides reliable car repair, maintenance...',
    keywords: 'car service, car repair, car mechanic...',
    // More SEO data...
  },
  // Other pages...
}
```

### 2. SEO Component (`/src/components/SEOContent.tsx`)

This component applies the SEO configuration from the utility based on the current page path. It handles:

- Setting document title
- Meta tags
- Open Graph tags
- Structured data
- Hidden SEO content

The component is included in the main App component to ensure SEO is applied to all pages.

## Page-specific SEO

To modify SEO for a specific page:

1. Open `/src/utils/seo.ts`
2. Find the relevant page configuration in the `seoConfigs` object
3. Update the title, description, keywords, or other SEO elements

For dynamic pages (like city pages), SEO is generated programmatically based on the page content.

## Content Management

Content on the website comes from these main sources:

### 1. Static Content in Data Files

- `/src/data/services-data.ts`: All service information
- `/src/data/cityData.ts`: City-specific content
- `/src/data/reviews.ts`: Customer testimonials

### 2. Component Content

Some content is defined directly in the component files, especially UI elements and section headers.

### 3. API Content (Dynamic)

The blog posts and some other dynamic content are fetched from an external API.

## URL Structure

The website follows a clear URL structure that's SEO-friendly:

- `/`: Homepage
- `/services`: Services overview
- `/services/[service-type]`: Individual service pages (e.g., `/services/periodic`)
- `/[city-name]`: City-specific landing pages (e.g., `/jaipur`)
- `/blog`: Blog listing
- `/blog/[slug]`: Individual blog posts

## City Pages

City pages are a key part of local SEO. They're configured in `/src/data/cityData.ts` and rendered with the `CityPage` component.

Each city has:
- SEO metadata
- City-specific content
- Local services information
- Local testimonials

To add or modify a city page:
1. Edit the city data in `/src/data/cityData.ts`
2. The SEO utility will automatically generate appropriate SEO for that city

## Service Pages

Service pages are defined in:
1. `/src/data/services-data.ts`: Service information
2. Individual page components in `/src/pages/services/`

To modify service information:
1. Edit the service data in `/src/data/services-data.ts`
2. Update the SEO configuration in `/src/utils/seo.ts`

## Blog Implementation

The blog is implemented with:
1. Blog listing page (`/src/pages/Blog.tsx`)
2. Individual blog post page (`/src/pages/BlogPost.tsx`)
3. API integration to fetch blog content

The SEO for blog posts is generated dynamically based on the post content.

---

## Making SEO Changes

Here's a quick reference for common SEO tasks:

### Change page title or meta description
Edit the corresponding entry in `/src/utils/seo.ts`

### Modify hidden SEO content
Update the `hiddenContent` property in `/src/utils/seo.ts`

### Add structured data
Add or modify the `structuredData` property in `/src/utils/seo.ts`

### Update city-specific SEO
Edit the city data in `/src/data/cityData.ts`

### Change service information
Modify the service data in `/src/data/services-data.ts`

If you have any questions or need assistance with the SEO implementation, please contact the development team. 