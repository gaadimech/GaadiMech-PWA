# GaadiMech Website SEO Guide

This comprehensive guide explains the GaadiMech website's SEO implementation, providing practical instructions and use cases for optimizing the site's search engine performance. After reading this guide, you'll understand exactly where to find and modify all SEO-related elements across the website.

## Table of Contents

1. [Website Structure Overview](#website-structure-overview)
2. [SEO Implementation](#seo-implementation)
3. [Common SEO Tasks](#common-seo-tasks)
   - [Modifying Page Titles and Meta Descriptions](#modifying-page-titles-and-meta-descriptions)
   - [Updating Meta Keywords](#updating-meta-keywords)
   - [Changing Canonical URLs](#changing-canonical-urls)
   - [Adding Structured Data](#adding-structured-data)
   - [Managing Hidden SEO Content](#managing-hidden-seo-content)
4. [Page-Specific SEO](#page-specific-seo)
   - [Homepage SEO](#homepage-seo)
   - [Service Pages SEO](#service-pages-seo)
   - [City Pages SEO](#city-pages-seo)
   - [Blog SEO](#blog-seo)
5. [Content Management](#content-management)
6. [URL Structure](#url-structure)
7. [SEO Troubleshooting](#seo-troubleshooting)
8. [Technical SEO Elements](#technical-seo-elements)

## Website Structure Overview

The GaadiMech website follows a React-based architecture with the following key directories:

- `/src`: Main source code directory
  - `/components`: UI components
  - `/pages`: Page components (each representing a URL route)
  - `/data`: Static content & data (SEO content sources)
  - `/utils`: Utility functions including SEO configurations
  - `/services`: API service connections
  - `/types`: TypeScript type definitions
  - `/assets`: Static assets like images

**Important for SEO work:** Focus primarily on files in `/utils/seo.ts` for global SEO settings and `/data` directory for content-specific SEO elements.

## SEO Implementation

All SEO elements are now centralized in two primary locations to make your work more efficient:

### 1. SEO Utility (`/src/utils/seo.ts`)

This file contains all SEO metadata for the website organized by page path. It includes:

- Page titles
- Meta descriptions
- Keywords
- Open Graph data
- Hidden SEO content
- Structured data (JSON-LD)

**Example of SEO configuration:**

```typescript
// This is where all SEO data is defined - modify here to update SEO elements
const seoConfigs: Record<string, SeoConfig> = {
  '/': {  // Homepage SEO configuration
    title: 'GaadiMech - Professional Car Service & Repair in India',
    description: 'GaadiMech provides reliable car repair, maintenance...',
    keywords: 'car service, car repair, car mechanic...',
    image: 'https://gaadimech.com/og-image.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      // more structured data...
    },
    hiddenContent: {
      h1: 'Best Car Repair Services in India',
      // more hidden content...
    }
  },
  
  '/services/periodic': {  // Periodic service page SEO
    title: 'Car Periodic Service & Maintenance - GaadiMech',
    description: 'Keep your car running smoothly with GaadiMech\'s periodic maintenance...',
    // more configuration...
  },
  
  // Additional page configurations...
}
```

### 2. SEO Component (`/src/components/SEOContent.tsx`)

This component applies the SEO configuration from the utility. **You generally don't need to modify this file** - it handles:

- Setting document title
- Meta tags
- Open Graph tags
- Structured data
- Hidden SEO content

## Common SEO Tasks

Here are step-by-step instructions for the most common SEO tasks you'll need to perform:

### Modifying Page Titles and Meta Descriptions

Page titles and meta descriptions are critical for search rankings. Here's how to update them:

1. Open `/src/utils/seo.ts`
2. Find the relevant page configuration in the `seoConfigs` object
3. Update the `title` and `description` properties

**Example - Updating the homepage title and description:**

```typescript
// BEFORE
'/': {
  title: 'GaadiMech - Professional Car Service & Repair in India',
  description: 'GaadiMech provides reliable car repair, maintenance, and servicing across India...',
  // other properties...
}

// AFTER
'/': {
  title: 'GaadiMech - #1 Car Service & Repair in India | Book Online',
  description: 'Looking for the best car repair service in India? GaadiMech offers doorstep car service, AC repair, and denting & painting with free pickup. Book now and get 20% off!',
  // other properties remain unchanged...
}
```

**Use Case:** If keyword research shows that "doorstep car service" has higher search volume, you'd want to include this in your meta description.

### Updating Meta Keywords

While less important than they once were, keywords are still maintained for compatibility:

1. Open `/src/utils/seo.ts`
2. Find the relevant page configuration
3. Update the `keywords` property (comma-separated list)

**Example - Updating keywords for AC service page:**

```typescript
'/services/ac': {
  // title and description...
  keywords: 'car ac repair, car ac service, ac gas refilling, car ac not cooling, car ac maintenance, car ac repair near me',
  // other properties...
}
```

### Changing Canonical URLs

Canonical URLs help prevent duplicate content issues. By default, canonical URLs are set to match the current page URL, but you can override this if needed:

1. Open `/src/utils/seo.ts`
2. Find the relevant page configuration
3. Add or modify the `canonicalUrl` property

**Example - Setting a custom canonical URL:**

```typescript
'/services/car-repair': {
  // other SEO properties...
  canonicalUrl: 'https://gaadimech.com/services/periodic', // Redirects SEO value to the periodic service page
}
```

### Adding Structured Data

Structured data (JSON-LD) helps search engines understand your content and can enable rich results:

1. Open `/src/utils/seo.ts`
2. Find the relevant page configuration
3. Add or modify the `structuredData` property

**Example - Adding FAQ structured data to a service page:**

```typescript
'/services/ac': {
  // other SEO properties...
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How much does car AC service cost?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'GaadiMech\'s car AC service starts from ₹999 for basic gas refilling...'
        }
      },
      {
        '@type': 'Question',
        'name': 'How often should I service my car AC?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We recommend servicing your car AC once every 6 months...'
        }
      }
    ]
  }
}
```

**Use Case:** Adding FAQ structured data can help your page appear in Google's FAQ rich results, potentially increasing click-through rates.

### Managing Hidden SEO Content

Hidden SEO content provides additional context for search engines without affecting the visual design:

1. Open `/src/utils/seo.ts`
2. Find the relevant page configuration
3. Modify the `hiddenContent` property

**Example - Updating hidden content for a city page:**

```typescript
// For a dynamic city page, modify the template in the getSeoConfig function:
if (path.match(/^\/[a-z-]+$/) && path.length > 1) {
  // city name processing logic...
  
  return {
    // title, description, keywords...
    hiddenContent: {
      h1: `Best Car Repair Services in ${cityNameCapitalized}`,
      h2: `Professional Car Mechanics in ${cityNameCapitalized}`,
      paragraphs: [
        `Looking for reliable car repair services in ${cityNameCapitalized}? GaadiMech provides expert car mechanics, professional car service, and emergency car repair in ${cityNameCapitalized}. Our services include car AC repair, denting & painting, towing service, and complete car maintenance solutions.`,
        `Our certified mechanics in ${cityNameCapitalized} are experienced in all car makes and models. Whether you need regular maintenance or emergency repairs, we're just a call away.`  // Added paragraph
      ],
      listItems: [
        `24/7 Emergency Car Repair Services in ${cityNameCapitalized}`,
        `Free Pickup and Drop Service in ${cityNameCapitalized}`,  // Added item
        'Professional Car AC Service & Repair',
        // other list items...
      ]
    }
  };
}
```

**Use Case:** If you find that competitors are ranking for terms like "free pickup and drop service" in certain cities, you can add this content to improve your ranking for those terms.

## Page-Specific SEO

Different page types have specific SEO needs. Here's how to optimize each type:

### Homepage SEO

The homepage is your most important page for SEO:

1. Open `/src/utils/seo.ts`
2. Find the `'/'` key in the `seoConfigs` object
3. Optimize the title, description, and keywords focusing on your main services and locations
4. Ensure the `structuredData` includes LocalBusiness schema with complete NAP (Name, Address, Phone) information

**Example - Optimizing homepage:**

```typescript
'/': {
  title: 'GaadiMech - Premium Car Service & Repair at Your Doorstep | Book Now',
  description: 'India\'s trusted car service provider with doorstep repair, maintenance, AC service, denting & painting. Top-rated mechanics, genuine parts & 6-month warranty on all services.',
  keywords: 'car service, car repair, doorstep car service, car AC repair, denting painting, car mechanic, car service at home',
  // other properties...
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'GaadiMech',
    'description': 'Professional car repair and service company',
    'url': 'https://gaadimech.com',
    'logo': 'https://gaadimech.com/logo.png',
    'image': 'https://gaadimech.com/og-image.jpg',
    'telephone': '+919876543210',
    'priceRange': '₹₹',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Jaipur',
      'addressRegion': 'Rajasthan',
      'postalCode': '302001',  // Added postal code
      'addressCountry': 'India'
    },
    'geo': {  // Added geo coordinates
      '@type': 'GeoCoordinates',
      'latitude': '26.9124',
      'longitude': '75.7873'
    },
    'openingHoursSpecification': {  // Added opening hours
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '08:00',
      'closes': '20:00'
    },
    'sameAs': [
      'https://www.facebook.com/gaadimech',
      'https://twitter.com/gaadimech',
      'https://www.instagram.com/gaadimech'
    ]
  }
}
```

### Service Pages SEO

Service pages target specific service-related keywords:

1. For global service page settings, edit `/src/utils/seo.ts`
2. For service-specific content, edit `/src/data/services-data.ts`

**To add a new service page:**

1. Create the service page component in `/src/pages/services/`
2. Add the service type to `/src/types/services.ts`
3. Add service data in `/src/data/services-data.ts`
4. Add SEO configuration in `/src/utils/seo.ts`

**Example - Adding a new "Engine Repair" service:**

```typescript
// 1. First in /src/types/services.ts, add to the ServiceType type:
export type ServiceType = 'periodic' | 'denting' | 'ac' | /* ... */ | 'engine-repair';

// 2. Then in /src/data/services-data.ts, add service details:
'engine-repair': {
  title: 'Car Engine Repair',
  subtitle: 'Expert Engine Repair & Diagnostics Services by Certified Mechanics',
  serviceCards: [
    {
      id: 'engine-basic',
      title: 'Basic Engine Diagnostics',
      description: 'Complete engine health check and basic repairs',
      image: '/images/services/engine-repair.jpg',
      rating: 4.7,
      reviewCount: 120,
      duration: '3-4 Hours',
      price: '₹1,999',
      details: [
        'Complete Engine Diagnostics',
        'Spark Plug Check & Replacement',
        'Fuel Injector Cleaning',
        // more details...
      ],
      whatsappMessage: 'Hi, I\'d like to book a Basic Engine Diagnostics service for my car.'
    },
    // other service cards...
  ]
}

// 3. Finally, in /src/utils/seo.ts, add SEO configuration:
'/services/engine-repair': {
  title: 'Car Engine Repair & Diagnostics Services | GaadiMech',
  description: 'Expert car engine repair services by GaadiMech. Our certified mechanics diagnose and fix all types of engine problems with authentic parts and warranty.',
  keywords: 'car engine repair, engine service, engine check, car engine problems, engine diagnostics, engine overhaul',
  image: 'https://gaadimech.com/engine-repair-image.jpg',
  hiddenContent: {
    h1: 'Professional Car Engine Repair Services',
    h2: 'Expert Engine Diagnostics and Repair',
    paragraphs: [
      'Is your car engine making unusual noises or showing warning lights? GaadiMech provides comprehensive engine diagnostics and repair services by certified mechanics. We identify and fix all types of engine issues from basic tune-ups to complete engine overhauls.'
    ],
    listItems: [
      'Complete Engine Diagnostics',
      'Engine Performance Optimization',
      'Timing Belt Replacement',
      'Engine Mounts Replacement',
      'Cylinder Head Repair',
      'Complete Engine Overhaul'
    ]
  }
}
```

### City Pages SEO

City pages target location-specific searches. The city page SEO is generated dynamically, but you can modify the template:

1. For overall city page settings, edit the city-specific logic in `/src/utils/seo.ts`
2. For city-specific content, edit `/src/data/cityData.ts`

**Example - Enhancing city page SEO template:**

```typescript
// In /src/utils/seo.ts, modify the city page template:
if (path.match(/^\/[a-z-]+$/) && path.length > 1) {
  const cityName = path.substring(1).replace(/-/g, ' ');
  const cityNameCapitalized = cityName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Get city-specific data if available  
  const cityData = getCityDataBySlug(path.substring(1));
  const cityAreas = cityData?.areas?.join(', ') || '';
  
  return {
    title: `Best Car Service & Repair in ${cityNameCapitalized} | Free Pickup & Drop`,
    description: `Professional car service and repair in ${cityNameCapitalized}. GaadiMech offers doorstep car service, AC repair, denting & painting with free pickup. Serving all areas including ${cityAreas}. Book now!`,
    keywords: `car service ${cityNameCapitalized}, car repair ${cityNameCapitalized}, car mechanic ${cityNameCapitalized}, car ac repair ${cityNameCapitalized}, doorstep car service ${cityNameCapitalized}`,
    image: 'https://gaadimech.com/og-image.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': `GaadiMech Car Service - ${cityNameCapitalized}`,
      'description': `Professional car repair and service company in ${cityNameCapitalized}`,
      'url': `https://gaadimech.com/${path.substring(1)}`,
      'logo': 'https://gaadimech.com/logo.png',
      'image': 'https://gaadimech.com/og-image.jpg',
      'telephone': '+919876543210',
      'priceRange': '₹₹',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': cityNameCapitalized,
        'addressCountry': 'India'
      },
      'areaServed': cityNameCapitalized,
      'serviceArea': {
        '@type': 'GeoCircle',
        'geoMidpoint': {
          '@type': 'GeoCoordinates',
          'latitude': cityData?.latitude || '',
          'longitude': cityData?.longitude || ''
        },
        'geoRadius': '30000'
      }
    },
    hiddenContent: {
      h1: `Best Car Repair Services in ${cityNameCapitalized}`,
      h2: `Professional Car Mechanics in ${cityNameCapitalized}`,
      paragraphs: [
        `Looking for reliable car repair services in ${cityNameCapitalized}? GaadiMech provides expert car mechanics, professional car service, and emergency car repair in ${cityNameCapitalized}. Our services include car AC repair, denting & painting, towing service, and complete car maintenance solutions.`
      ],
      listItems: [
        `24/7 Emergency Car Repair Services in ${cityNameCapitalized}`,
        `Car Service Centers in all areas of ${cityNameCapitalized}`,
        'Professional Car AC Service & Repair',
        'Expert Denting & Painting Solutions',
        'Complete Car Maintenance Services',
        'Certified Car Mechanics',
        'Affordable Car Repair Solutions'
      ]
    }
  };
}
```

**To add a new city page:**

1. Add city data in `/src/data/cityData.ts`
2. The SEO will be automatically generated based on the template above

```typescript
// In /src/data/cityData.ts, add a new city:
hyderabad: {
  name: "Hyderabad",
  slug: "hyderabad",
  title: "Car Repair & Service in Hyderabad | GaadiMech",
  description: "Expert car repair and service in Hyderabad. Book online for doorstep car service, repair, and maintenance. Trusted by 5,000+ customers in Hyderabad.",
  metaKeywords: ["car repair hyderabad", "car service hyderabad", "car mechanic hyderabad", "car maintenance hyderabad"],
  heroTitle: "Expert Car Repair & Service in Hyderabad",
  heroSubtitle: "Professional car service at your doorstep. Book online and get 20% off on your first service!",
  areas: ["Banjara Hills", "Jubilee Hills", "Hitech City", "Gachibowli", "Kukatpally"],
  latitude: "17.3850",
  longitude: "78.4867",
  services: [
    // service listings...
  ],
  // other city data...
}
```

### Blog SEO

Blog content is critical for organic traffic. The blog SEO is managed in two places:

1. For the blog listing page, edit the configuration in `/src/utils/seo.ts`
2. For individual blog posts, SEO is generated from the post content

**Example - Optimizing blog listing page:**

```typescript
'/blog': {
  title: 'Car Maintenance & Repair Blog | Expert Tips by GaadiMech',
  description: 'Explore expert car maintenance tips, DIY guides, and auto repair advice from GaadiMech\'s certified mechanics. Stay updated with the latest in car care.',
  keywords: 'car maintenance tips, car repair blog, auto repair guide, DIY car maintenance, car service tips',
  image: 'https://gaadimech.com/blog-cover.jpg',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'GaadiMech Car Maintenance & Repair Blog',
    'description': 'Expert car maintenance tips and advice',
    'url': 'https://gaadimech.com/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'GaadiMech',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://gaadimech.com/logo.png'
      }
    }
  }
}
```

**For individual blog posts:**

1. When creating new blog posts, ensure you include:
   - A descriptive title with target keywords
   - A meta description highlighting key points
   - Proper header structure (H1, H2, H3)
   - Alt text for all images
   - Internal linking to relevant service pages

2. Blog post data is managed through the API. Ensure each post has:
   - `title` - The post title (becomes the H1)
   - `metaDescription` - Custom meta description
   - `keywords` - Comma-separated list of keywords
   - `slug` - URL-friendly slug
   - `content` - The post content with proper HTML structure
   - `featuredImage` - Main image for the post with alt text

## Content Management

Content across the website comes from these sources:

### 1. Static Content in Data Files

- `/src/data/services-data.ts`: Service information
  - Modify this file to update service details, pricing, and features
  - Each service has a `title`, `description`, `details` array, etc.

- `/src/data/cityData.ts`: City-specific content
  - Modify this file to update city information, service availability, and local details
  - Each city has `name`, `description`, `services` array, etc.

- `/src/data/reviews.ts`: Customer testimonials
  - Update this file to add or modify customer reviews
  - Each review has `name`, `rating`, `comment`, etc.

**Example - Adding a testimonial:**

```typescript
// In /src/data/reviews.ts
export const reviews = [
  // existing reviews...
  {
    id: 'review123',
    name: 'Rahul Verma',
    rating: 5,
    comment: 'Excellent service! The mechanic arrived on time and fixed my car AC in less than an hour. Very professional and reasonably priced.',
    date: '2024-04-15',
    location: 'Delhi',
    service: 'AC Repair',
    verified: true,
    photoUrl: 'https://gaadimech.com/testimonials/rahul-verma.jpg'
  }
];
```

### 2. Component Content

Some content lives directly in component files:

- Main page sections in `/src/pages/`
- UI components in `/src/components/`

If you need to update text in a specific page section, you might need to edit these files, but most SEO-relevant content is in the data files.

### 3. API Content (Dynamic)

Blog posts and some dynamic content are fetched from the external API. For blog posts, ensure the API provides all necessary SEO fields:

- `title`
- `metaDescription`
- `keywords`
- `author`
- `publishDate`
- `modifiedDate`
- `featuredImage` (with alt text)
- `categories`
- `tags`

## URL Structure

The website uses a clean, SEO-friendly URL structure. Understanding this structure helps you optimize specific pages:

- `/`: Homepage
- `/services`: Services overview
- `/services/[service-type]`: Individual service pages
  - Examples: `/services/periodic`, `/services/ac`, `/services/denting`
- `/[city-name]`: City-specific landing pages
  - Examples: `/jaipur`, `/mumbai`, `/delhi`
- `/blog`: Blog listing
- `/blog/[slug]`: Individual blog posts

**Best practices for URLs:**

1. Keep URLs short and descriptive
2. Use hyphens to separate words
3. Include target keywords in the URL
4. Avoid special characters
5. Maintain consistent URL patterns

## SEO Troubleshooting

Here are solutions to common SEO issues you might encounter:

### Missing Metadata

If you find a page without proper meta tags:

1. Check if the path exists in `/src/utils/seo.ts`
2. If not, add a new configuration for that path
3. If it's a dynamic path, ensure the path matching logic in `getSeoConfig()` is working correctly

### Duplicate Content Issues

If you have duplicate content across city or service pages:

1. Ensure each page has unique `title` and `description` in the SEO config
2. Use the `canonicalUrl` property to point to the primary version of the content
3. Modify the dynamic content templates to generate more unique content based on location or service attributes

### Rich Snippets Not Showing

If structured data isn't generating rich results:

1. Validate your structured data using [Google's Rich Results Test](https://search.google.com/test/rich-results)
2. Ensure all required fields are present in the `structuredData` object
3. Check that the schema type matches the page content (e.g., Product, Service, FAQPage)

### Low Keyword Rankings

If specific keywords aren't ranking well:

1. Ensure target keywords appear in:
   - Page title
   - Meta description
   - H1 heading
   - URL
   - First paragraph of content
   - Subheadings
2. Add more comprehensive content using the `hiddenContent` property
3. Enhance structured data to better match search intent

## Technical SEO Elements

These advanced technical SEO elements are also managed through the SEO utility:

### Hreflang Tags

For multilingual support, add `hreflang` configurations:

```typescript
// In a page configuration in /src/utils/seo.ts
'/services/ac': {
  // other SEO properties...
  hreflang: [
    { lang: 'en', url: 'https://gaadimech.com/services/ac' },
    { lang: 'hi', url: 'https://gaadimech.com/hi/services/ac' }
  ]
}
```

### Pagination SEO

For paginated content, add pagination metadata:

```typescript
// In a page configuration
'/blog': {
  // basic SEO properties...
  pagination: {
    getPaginationTags: (pageNumber) => {
      if (pageNumber === 1) {
        return {
          canonical: 'https://gaadimech.com/blog',
          prev: null,
          next: 'https://gaadimech.com/blog/page/2'
        };
      } else {
        return {
          canonical: `https://gaadimech.com/blog/page/${pageNumber}`,
          prev: pageNumber > 1 ? `https://gaadimech.com/blog/page/${pageNumber - 1}` : 'https://gaadimech.com/blog',
          next: `https://gaadimech.com/blog/page/${pageNumber + 1}`
        };
      }
    }
  }
}
```

### Robots Meta Tags

Control indexing behavior with robots meta tags:

```typescript
// In a page configuration
'/under-construction': {
  // other SEO properties...
  robots: 'noindex, nofollow' // Prevent indexing of this page
}
```

### Open Graph Custom Properties

Add custom Open Graph properties for better social sharing:

```typescript
// In a page configuration
'/services/ac': {
  // basic SEO properties...
  openGraph: {
    type: 'product',
    price: '999',
    currency: 'INR',
    availability: 'instock'
  }
}
```

---

## Making SEO Changes: Quick Reference

Here's a quick reference guide for common SEO tasks:

| Task | File to Edit | Property to Modify |
|------|-------------|-------------------|
| Change page title | `/src/utils/seo.ts` | `title` |
| Update meta description | `/src/utils/seo.ts` | `description` |
| Modify keywords | `/src/utils/seo.ts` | `keywords` |
| Add structured data | `/src/utils/seo.ts` | `structuredData` |
| Edit hidden SEO content | `/src/utils/seo.ts` | `hiddenContent` |
| Update service information | `/src/data/services-data.ts` | various properties |
| Change city-specific content | `/src/data/cityData.ts` | various properties |
| Manage customer reviews | `/src/data/reviews.ts` | add/edit review objects |
| Add a new city | `/src/data/cityData.ts` | add new city object |
| Add a new service | 1. `/src/types/services.ts`<br>2. `/src/data/services-data.ts`<br>3. `/src/utils/seo.ts` | add service type<br>add service data<br>add SEO config |

If you have any questions or need assistance with the SEO implementation, please contact the development team. 