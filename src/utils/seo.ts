/**
 * SEO Configuration Utility
 * 
 * This file centralizes all SEO-related configurations for the website,
 * making it easy for SEO experts to understand and modify SEO content.
 */

export interface SeoConfigHiddenContent {
  h1: string;
  h2?: string;
  paragraphs?: string[];
  listItems?: string[];
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  image: string;
  structuredData?: any;
  hiddenContent?: SeoConfigHiddenContent;
}

// Default SEO configuration
const defaultSeoConfig: SeoConfig = {
  title: 'GaadiMech - Professional Car Service & Repair in India',
  description: 'GaadiMech provides reliable car repair, maintenance, and servicing across India. Book car services, AC repairs, denting & painting, and more from expert mechanics.',
  keywords: 'car service, car repair, car mechanic, car ac repair, denting painting, car maintenance',
  image: 'https://gaadimech.com/og-image.jpg',
  hiddenContent: {
    h1: 'Best Car Repair Services in Jaipur',
    h2: 'Professional Car Mechanics Near You',
    paragraphs: [
      'Looking for reliable car repair services in Jaipur? GaadiMech provides expert car mechanics, professional car service, and emergency car repair near you. Our services include car AC repair, denting & painting, towing service, and complete car maintenance solutions. Find the best car mechanic shop near you with our network of certified automotive experts.'
    ],
    listItems: [
      '24/7 Emergency Car Repair Services in Jaipur',
      'Professional Car AC Service & Repair',
      'Expert Denting & Painting Solutions',
      'Complete Car Maintenance Services',
      'Certified Car Mechanics',
      'Affordable Car Repair Solutions'
    ]
  }
};

// Page-specific SEO configurations
const seoConfigs: Record<string, SeoConfig> = {
  '/': {
    title: 'GaadiMech - Professional Car Service & Repair in India',
    description: 'GaadiMech provides reliable car repair, maintenance, and servicing across India. Book car services, AC repairs, denting & painting, and more from expert mechanics.',
    keywords: 'car service, car repair, car mechanic, car ac repair, denting painting, car maintenance',
    image: 'https://gaadimech.com/og-image.jpg',
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
        'addressCountry': 'India'
      },
      'sameAs': [
        'https://www.facebook.com/gaadimech',
        'https://twitter.com/gaadimech',
        'https://www.instagram.com/gaadimech'
      ]
    },
    hiddenContent: {
      h1: 'Best Car Repair Services in India',
      h2: 'Professional Car Mechanics Near You',
      paragraphs: [
        'Looking for reliable car repair services in India? GaadiMech provides expert car mechanics, professional car service, and emergency car repair near you. Our services include car AC repair, denting & painting, towing service, and complete car maintenance solutions. Find the best car mechanic shop near you with our network of certified automotive experts.'
      ],
      listItems: [
        '24/7 Emergency Car Repair Services',
        'Professional Car AC Service & Repair',
        'Expert Denting & Painting Solutions',
        'Complete Car Maintenance Services',
        'Certified Car Mechanics',
        'Affordable Car Repair Solutions'
      ]
    }
  },
  '/services': {
    title: 'Car Services & Repair - GaadiMech',
    description: 'Explore GaadiMech\'s comprehensive car services including regular maintenance, AC repair, denting & painting, and more. Book professional car services today.',
    keywords: 'car services, car maintenance, car ac repair, denting painting, car care, professional car service',
    image: 'https://gaadimech.com/services-image.jpg',
    hiddenContent: {
      h1: 'Professional Car Services by GaadiMech',
      h2: 'Comprehensive Car Maintenance & Repair Services',
      paragraphs: [
        'GaadiMech offers a wide range of professional car services to keep your vehicle in top condition. From routine maintenance to specialized repairs, our certified mechanics deliver quality service using genuine parts and modern techniques. Explore our service offerings including periodic maintenance, AC service & repair, denting & painting, car spa, battery replacement, and more.'
      ],
      listItems: [
        'Comprehensive Car Inspection',
        'Regular Maintenance Services',
        'AC Service & Repair',
        'Professional Denting & Painting',
        'Battery Replacement & Charging',
        'Car Spa & Detailing Services'
      ]
    }
  },
  '/services/periodic': {
    title: 'Car Periodic Service & Maintenance - GaadiMech',
    description: 'Keep your car running smoothly with GaadiMech\'s periodic maintenance services. Our expert mechanics provide comprehensive car inspections and servicing.',
    keywords: 'car periodic service, car maintenance, regular car service, car inspection, car engine oil change',
    image: 'https://gaadimech.com/periodic-service-image.jpg',
    hiddenContent: {
      h1: 'Professional Car Periodic Maintenance Services',
      h2: 'Keep Your Car Running Smoothly With Expert Maintenance',
      paragraphs: [
        'Regular periodic maintenance is crucial for your car\'s performance and longevity. GaadiMech offers comprehensive periodic service packages that include oil changes, filter replacements, fluid top-ups, and detailed vehicle inspections. Our certified mechanics use genuine parts and follow manufacturer guidelines to ensure your car performs at its best.'
      ],
      listItems: [
        'Engine Oil & Filter Replacement',
        'Air Filter Cleaning & Replacement',
        'Comprehensive Multi-Point Inspection',
        'Brake System Check & Service',
        'Fluid Level Check & Top-up',
        'Battery Health Inspection'
      ]
    }
  },
  '/services/ac': {
    title: 'Car AC Service & Repair - GaadiMech',
    description: 'Expert car AC repair and service by GaadiMech. Get AC gas refilling, compressor repair, cooling system maintenance and more by certified technicians.',
    keywords: 'car ac repair, car ac service, ac gas refilling, car ac not cooling, car ac maintenance',
    image: 'https://gaadimech.com/ac-service-image.jpg',
    hiddenContent: {
      h1: 'Professional Car AC Service & Repair',
      h2: 'Expert AC Maintenance and Troubleshooting',
      paragraphs: [
        'Is your car AC not cooling properly? GaadiMech provides comprehensive AC services including gas refilling, compressor repair, condenser cleaning, and complete system diagnostics. Our certified technicians identify and fix all AC issues to restore optimal cooling performance.'
      ],
      listItems: [
        'AC Gas Refilling',
        'Compressor Repair & Replacement',
        'Condenser Cleaning & Repair',
        'Cooling Coil Servicing',
        'Complete AC System Diagnosis',
        'AC Performance Optimization'
      ]
    }
  },
  // Add more page-specific SEO configs as needed
};

/**
 * Gets the SEO configuration for a specific path
 * Falls back to default configuration if path-specific config is not found
 */
export const getSeoConfig = (path: string): SeoConfig => {
  // First try exact path match
  if (seoConfigs[path]) {
    return seoConfigs[path];
  }
  
  // For service pages, try to match the service type
  if (path.startsWith('/services/')) {
    const serviceType = path.split('/')[2];
    const servicePath = `/services/${serviceType}`;
    
    if (seoConfigs[servicePath]) {
      return seoConfigs[servicePath];
    }
  }
  
  // For city pages, create dynamic SEO config
  if (path.match(/^\/[a-z-]+$/) && path.length > 1) {
    const cityName = path.substring(1).replace(/-/g, ' ');
    const cityNameCapitalized = cityName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    return {
      title: `Best Car Service & Repair in ${cityNameCapitalized} - GaadiMech`,
      description: `Professional car service and repair in ${cityNameCapitalized}. GaadiMech offers expert car mechanics, AC repair, denting & painting services in ${cityNameCapitalized}.`,
      keywords: `car service ${cityNameCapitalized}, car repair ${cityNameCapitalized}, car mechanic ${cityNameCapitalized}, car ac repair ${cityNameCapitalized}`,
      image: 'https://gaadimech.com/og-image.jpg',
      hiddenContent: {
        h1: `Best Car Repair Services in ${cityNameCapitalized}`,
        h2: `Professional Car Mechanics in ${cityNameCapitalized}`,
        paragraphs: [
          `Looking for reliable car repair services in ${cityNameCapitalized}? GaadiMech provides expert car mechanics, professional car service, and emergency car repair in ${cityNameCapitalized}. Our services include car AC repair, denting & painting, towing service, and complete car maintenance solutions.`
        ],
        listItems: [
          `24/7 Emergency Car Repair Services in ${cityNameCapitalized}`,
          'Professional Car AC Service & Repair',
          'Expert Denting & Painting Solutions',
          'Complete Car Maintenance Services',
          'Certified Car Mechanics',
          'Affordable Car Repair Solutions'
        ]
      }
    };
  }
  
  // Return default config if no specific config found
  return defaultSeoConfig;
}; 