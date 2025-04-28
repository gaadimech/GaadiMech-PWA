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

export interface HreflangItem {
  lang: string;
  url: string;
}

export interface PaginationLinks {
  prev?: string;
  next?: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  image: string;
  canonicalUrl?: string;
  structuredData?: any;
  hiddenContent?: SeoConfigHiddenContent;
  robots?: string;  // Controls indexing with values like 'noindex, nofollow'
  hreflang?: HreflangItem[];  // For multilingual support
  pagination?: PaginationLinks;  // For paginated content
}

// Default SEO configuration
const defaultSeoConfig: SeoConfig = {
  title: 'GaadiMech - Professional Car Service & Repair in India',
  description: 'GaadiMech provides reliable car repair, maintenance, and servicing across India. Book car services, AC repairs, denting & painting, and more from expert mechanics.',
  keywords: 'car service jaipur, car repair jaipur, car mechanic jaipur, 90 minute car service, car ac repair jaipur, denting painting jaipur, doorstep car service jaipur',
  image: 'https://www.gaadimech.com/og-image.jpg',
  canonicalUrl: 'https://www.gaadimech.com',
  robots: 'index, follow',  // Default robots meta tag
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
    title: 'GaadiMech®',
    description: 'Book 90-minute car service, AC repair, dent-paint, tyres & batteries at GaadiMech Jaipur. Certified mechanics, genuine parts & free pickup-drop.',
    keywords: 'car service jaipur, car repair jaipur, car mechanic jaipur, 90 minute car service, car ac repair jaipur, denting painting jaipur, doorstep car service jaipur',
    image: 'https://www.gaadimech.com/og-image.jpg',
    robots: 'index, follow',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'GaadiMech',
      'description': 'Professional car repair and service company',
      'url': 'https://www.gaadimech.com',
      'logo': 'https://www.gaadimech.com/logo.png',
      'image': 'https://www.gaadimech.com/og-image.jpg',
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
      h1: '90-Minute Car Service in Jaipur',
      h2: 'Certified Mechanics • Genuine Parts • Free Pickup',
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
    title: 'Car Services in Jaipur',
    description: 'All car services under one roof – periodic, AC, dent-paint, tyres, battery, detailing. Book online & enjoy free pickup in Jaipur.',
    keywords: 'car services jaipur, car maintenance jaipur, car ac service jaipur, car dent paint jaipur, tyre replacement jaipur, battery replacement jaipur, car detailing jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/services',
    robots: 'index, follow',
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
    title: 'Periodic Car Service Jaipur',
    description: 'Professional periodic car service in Jaipur. Get engine oil change, filter replacement & complete car inspection by certified mechanics.',
    keywords: 'periodic car service jaipur, car oil change jaipur, full car service jaipur, scheduled car maintenance jaipur',
    image: 'https://www.gaadimech.com/periodic-service-image.jpg',
    hiddenContent: {
      h1: 'Periodic Car Maintenance in Jaipur',
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
    title: 'Car AC Repair Jaipur',
    description: 'Restore icy cooling: AC gas refill, compressor repair, condenser clean & leak check at your doorstep in Jaipur. Book GaadiMech today.',
    keywords: 'car ac repair jaipur, car ac gas refill jaipur, car ac service jaipur, car ac not cooling jaipur, ac compressor repair jaipur',
    image: 'https://www.gaadimech.com/ac-service-image.jpg',
    robots: 'index, follow',
    hiddenContent: {
      h1: 'Professional Car AC Service & Repair',
      h2: 'Expert AC Maintenance and Troubleshooting',
      paragraphs: [
        'Is your car AC not cooling properly in the Jaipur heat? GaadiMech provides comprehensive AC services including gas refilling, compressor repair, condenser cleaning, and complete system diagnostics. Our certified technicians identify and fix all AC issues to restore optimal cooling performance.'
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
  '/services/denting': {
    title: 'Car Denting & Painting Jaipur',
    description: 'Expert car denting and painting services in Jaipur. Get professional dent repair, scratch removal & full body paint by skilled technicians.',
    keywords: 'car dent repair jaipur, car painting jaipur, scratch removal jaipur, bumper repair jaipur, full body paint jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Car Denting & Painting Services',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech'
      },
      'serviceType': 'Denting & Painting',
      'description': 'Expert car denting and painting services to restore your vehicle\'s appearance.'
    }
  },
  '/services/battery': {
    title: 'Car Battery Replacement Jaipur',
    description: 'Quick car battery replacement in Jaipur. Get battery testing, jump start service & new battery installation at your doorstep.',
    keywords: 'car battery replacement jaipur, car battery service jaipur, jump start jaipur, battery testing jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Car Battery Service & Replacement',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech'
      },
      'serviceType': 'Battery Service',
      'description': 'Professional car battery services including testing, repair, and replacement.'
    }
  },
  '/services/tyre': {
    title: 'Tyre Replacement & Wheel Alignment Jaipur – GaadiMech',
    description: 'Professional tyre services in Jaipur including replacement, wheel alignment, balancing & puncture repair. Get expert service at your location.',
    keywords: 'tyre replacement jaipur, wheel alignment jaipur, tyre balancing jaipur, puncture repair jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Tyre Replacement & Wheel Alignment Services',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech'
      },
      'serviceType': 'Tyre Service',
      'description': 'Professional tyre services including replacement, alignment, balancing, and puncture repair.'
    }
  },
  '/services/windshield': {
    title: 'Windshield Repair & Replacement Jaipur – GaadiMech',
    description: 'Expert windshield repair & replacement in Jaipur. Get chip repair, crack fixing & complete windshield replacement with warranty.',
    keywords: 'windshield replacement jaipur, windshield repair jaipur, car glass repair jaipur, windshield chip repair jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Windshield Replacement & Repair Services',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech'
      },
      'serviceType': 'Windshield Service',
      'description': 'Professional windshield repair and replacement services.'
    }
  },
  '/express': {
    title: '90-Minute Car Service Jaipur',
    description: 'Experience Formula 1 style quick car service in Jaipur. Get your car serviced in just 90 minutes with expert mechanics & genuine parts.',
    keywords: '90 minute car service jaipur, express car service jaipur, quick car repair jaipur, formula 1 style service',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/express',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'GaadiMech Express',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech'
      },
      'serviceType': 'Express Car Service',
      'description': '90-Minute Professional Car Service',
      'offers': {
        '@type': 'Offer',
        'price': '2499.00',
        'priceCurrency': 'INR'
      }
    }
  },
  '/car-service-in-jaipur': {
    title: 'Car Service in Jaipur | Best Car Servicing in Jaipur - GaadiMech',
    description: 'Affordable car service in Jaipur with genuine parts, 90-minute turnaround & transparent pricing. GaadiMech – book online now.',
    keywords: 'car service jaipur, best car service jaipur, doorstep car service jaipur, quick car service jaipur, car maintenance jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/car-service-in-jaipur',
    robots: 'index, follow',
    hiddenContent: {
      h1: 'Professional Car Service in Jaipur',
      h2: 'Comprehensive Car Maintenance & Repair Services in Jaipur',
      paragraphs: [
        'GaadiMech offers a wide range of professional car services in Jaipur to keep your vehicle in top condition. From routine maintenance to specialized repairs, our certified mechanics deliver quality service using genuine parts and modern techniques at affordable prices. Explore our service offerings available in Jaipur including periodic maintenance, AC service & repair, denting & painting, car spa, battery replacement, and more.'
      ],
      listItems: [
        'Comprehensive Car Inspection in Jaipur',
        'Regular Maintenance Services in Jaipur',
        'AC Service & Repair in Jaipur',
        'Professional Denting & Painting in Jaipur',
        'Battery Replacement & Charging in Jaipur',
        'Car Spa & Detailing Services in Jaipur'
      ]
    }
  },
  '/car-repair-service-in-jaipur': {
    title: 'Car Repair Service in Jaipur | Car Repairing Services in Jaipur - GaadiMech',
    description: 'Looking for best car repair service in Jaipur? GaadiMech offers expert car repairing services in Jaipur at affordable prices. Book your car repair in Jaipur today!',
    keywords: 'car repair jaipur, engine repair jaipur, transmission repair jaipur, brake repair jaipur, affordable car repair jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/car-repair-service-in-jaipur',
    hiddenContent: {
      h1: 'Professional Car Repair Services in Jaipur',
      h2: 'Expert Car Repairing Services in Jaipur',
      paragraphs: [
        'GaadiMech offers comprehensive car repair services in Jaipur with expert mechanics. Our services include engine repair, electrical system diagnostics, transmission repair, brake system maintenance, and much more. We use genuine parts and provide doorstep service for your convenience.'
      ],
      listItems: [
        'Engine Repair in Jaipur',
        'Electrical System Diagnostics in Jaipur',
        'Transmission Repair in Jaipur',
        'Brake System Maintenance in Jaipur',
        'Suspension Repair in Jaipur',
        'Clutch Repair in Jaipur'
      ]
    }
  },
  '/car-mechanic-shop-in-jaipur': {
    title: 'Best Car Mechanic in Jaipur | Local Car Mechanic Shop in Jaipur - GaadiMech',
    description: 'Need the best car mechanic in Jaipur? GaadiMech is your trusted local car mechanic shop in Jaipur offering experienced, doorstep car repair and maintenance services.',
    keywords: 'car mechanic jaipur, local car mechanic jaipur, doorstep car mechanic jaipur, certified mechanic jaipur, mechanic shop jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/car-mechanic-shop-in-jaipur',
    hiddenContent: {
      h1: 'Best Car Mechanic Shop in Jaipur',
      h2: 'Experienced Local Car Mechanics in Jaipur',
      paragraphs: [
        'GaadiMech provides expert car mechanics in Jaipur with years of experience in all makes and models. Our mechanics are certified professionals equipped with the latest tools and technology to diagnose and fix any car issue. We offer doorstep car repair services in Jaipur for your convenience.'
      ],
      listItems: [
        'Experienced Car Mechanics in Jaipur',
        'Doorstep Car Repair Services in Jaipur',
        'All Car Makes and Models Serviced',
        'Advanced Diagnostic Equipment',
        'Genuine Parts Guarantee',
        'Transparent Pricing with No Hidden Costs'
      ]
    }
  },
  '/car-ac-service-in-jaipur': {
    title: 'Car AC Service in Jaipur | Doorstep AC Repairing in Jaipur - GaadiMech',
    description: 'Get expert car AC service in Jaipur with GaadiMech. We fix AC cooling issues, compressor faults, gas filling & more. Doorstep AC repairing in Jaipur by local mechanics.',
    keywords: 'car ac service jaipur, car ac repair jaipur, ac gas refill jaipur, ac compressor repair jaipur, car ac mechanic jaipur',
    image: 'https://www.gaadimech.com/ac-service-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/car-ac-service-in-jaipur',
    hiddenContent: {
      h1: 'Expert Car AC Service in Jaipur',
      h2: 'Professional AC Repair and Maintenance in Jaipur',
      paragraphs: [
        'Is your car AC not cooling properly in the Jaipur heat? GaadiMech provides complete car AC services in Jaipur including gas refilling, compressor repair, condenser cleaning, and cooling coil servicing. Our expert technicians diagnose and fix all AC issues with doorstep service available across Jaipur.'
      ],
      listItems: [
        'Car AC Gas Refilling in Jaipur',
        'AC Compressor Repair in Jaipur',
        'Condenser Cleaning in Jaipur',
        'Cooling System Diagnosis in Jaipur',
        'AC Performance Check in Jaipur',
        'Complete AC System Service in Jaipur'
      ]
    }
  },
  '/car-dent-paint-service-in-jaipur': {
    title: 'Car Dent Paint Service in Jaipur | Car Denting Services in Jaipur - GaadiMech',
    description: 'Get professional car dent paint service in Jaipur at GaadiMech. We offer car denting services in Jaipur like, car dent repair, bumper dent fixes, paint touch-ups, and accident body repairs.',
    keywords: 'car dent paint jaipur, denting painting jaipur, scratch removal jaipur, bumper dent repair jaipur, accident repair jaipur',
    image: 'https://www.gaadimech.com/denting-service-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/car-dent-paint-service-in-jaipur',
    hiddenContent: {
      h1: 'Professional Car Dent Paint Service in Jaipur',
      h2: 'Expert Denting and Painting Services in Jaipur',
      paragraphs: [
        'GaadiMech offers professional car dent and paint services in Jaipur to restore your vehicle\'s appearance. Our services include dent repair, scratch removal, bumper repairs, full body painting, and accident damage repair. We use modern techniques and quality paints to ensure a flawless finish.'
      ],
      listItems: [
        'Car Dent Repair in Jaipur',
        'Scratch Removal Services in Jaipur',
        'Bumper Repair and Painting in Jaipur',
        'Full Body Painting in Jaipur',
        'Accident Damage Repair in Jaipur',
        'Paint Touch-ups in Jaipur'
      ]
    }
  },
  // Service Pages
  '/services/car-spa': {
    title: 'Car Spa & Cleaning Services | GaadiMech',
    description: 'Professional car cleaning and detailing services. Get your car looking brand new with our expert cleaning solutions.',
    keywords: 'car spa, car cleaning, car detailing, car wash, professional car cleaning, car interior cleaning',
    image: 'https://www.gaadimech.com/services-image.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Car Spa & Cleaning Services',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech'
      },
      'serviceType': 'Car Cleaning',
      'description': 'Professional car cleaning and detailing services. Get your car looking brand new with our expert cleaning solutions.'
    }
  },
  '/services/detailing': {
    title: 'Premium Car Detailing Services | GaadiMech',
    description: 'Professional car detailing services that restore your car\'s beauty. From paint correction to interior detailing, we make your car look new again.',
    keywords: 'car detailing, premium car detailing, paint correction, interior detailing, exterior detailing',
    image: 'https://www.gaadimech.com/services-image.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Premium Car Detailing Services',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech'
      },
      'serviceType': 'Car Detailing',
      'description': 'Professional car detailing services that restore your car\'s beauty.'
    }
  },
  
  // Legal Pages
  '/privacy-policy': {
    title: 'Privacy Policy | GaadiMech',
    description: 'GaadiMech\'s privacy policy explains how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, personal information, gaadimech privacy',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/privacy-policy'
  },
  
  // Jaipur Landing Pages
  '/tyre-wheel-alignment-in-jaipur': {
    title: 'Wheel Alignment & Tyre Services in Jaipur | GaadiMech',
    description: 'Precise wheel alignment, tyre replacement, balancing and rotation services in Jaipur. Book expert car service and repair at GaadiMech.',
    keywords: 'wheel alignment jaipur, tyre service jaipur, car tyre replacement jaipur, car wheel balancing jaipur, car repair jaipur, car service jaipur, car mistri jaipur',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/tyre-wheel-alignment-in-jaipur',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Wheel Alignment & Tyre Service in Jaipur',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Jaipur',
          'addressRegion': 'Rajasthan',
          'addressCountry': 'IN'
        }
      },
      'serviceType': 'Car Tyre & Alignment Service',
      'areaServed': {
        '@type': 'City',
        'name': 'Jaipur'
      }
    }
  },
  '/windshield-replacement-in-jaipur': {
    title: 'Windshield Repair & Replacement in Jaipur | GaadiMech',
    description: 'Cracked or broken windshield? GaadiMech offers professional car glass repair and windshield replacement service in Jaipur with doorstep convenience.',
    keywords: 'windshield replacement jaipur, car glass repair jaipur, auto glass repair jaipur, windshield crack repair jaipur, car mistri jaipur, car service jaipur',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/windshield-replacement-in-jaipur',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Windshield Repair & Replacement Service in Jaipur',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Jaipur',
          'addressRegion': 'Rajasthan',
          'addressCountry': 'IN'
        }
      },
      'serviceType': 'Car Glass & Windshield Service',
      'areaServed': {
        '@type': 'City',
        'name': 'Jaipur'
      }
    }
  },
  '/car-battery-replacement-in-jaipur': {
    title: 'Car Battery Replacement & Jumpstart Service in Jaipur | GaadiMech',
    description: 'Facing a dead battery? Call GaadiMech for instant car battery replacement, delivery and jumpstart services across Jaipur.',
    keywords: 'car battery replacement jaipur, car battery jumpstart jaipur, emergency battery service jaipur, car service jaipur, car repair jaipur, car mistri jaipur',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/car-battery-replacement-in-jaipur',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Car Battery Replacement & Jumpstart Service in Jaipur',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Jaipur',
          'addressRegion': 'Rajasthan',
          'addressCountry': 'IN'
        }
      },
      'serviceType': 'Battery Replacement & Electrical Service',
      'areaServed': {
        '@type': 'City',
        'name': 'Jaipur'
      }
    }
  },
  '/doorstep-car-service-in-jaipur': {
    title: 'Doorstep Car Service & Mechanic in Jaipur | GaadiMech',
    description: 'Car service at your home in Jaipur. GaadiMech provides doorstep mechanic visits for car repair, AC service, dent paint and periodic maintenance.',
    keywords: 'doorstep car service jaipur, car service at home jaipur, home car mechanic jaipur, doorstep car repair jaipur, car ac service jaipur, car mistri jaipur, car service jaipur',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/doorstep-car-service-in-jaipur',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Doorstep Car Service in Jaipur',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Jaipur',
          'addressRegion': 'Rajasthan',
          'addressCountry': 'IN'
        }
      },
      'serviceType': 'Mobile Car Service & Repair',
      'areaServed': {
        '@type': 'City',
        'name': 'Jaipur'
      }
    }
  },
  '/90-minute-car-service-in-jaipur': {
    title: '90-Minute Car Service, Repair & Dent Paint in Jaipur | GaadiMech',
    description: 'Quick 90-minute express car service in Jaipur including periodic service, dent paint, car AC repair & battery service by expert GaadiMech mechanics.',
    keywords: '90 minute car service jaipur, express car service jaipur, quick car repair jaipur, dent paint service jaipur, car ac service jaipur, car mistri jaipur, car mechanic jaipur',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/90-minute-car-service-in-jaipur',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': '90-Minute Car Service & Repair in Jaipur',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'GaadiMech',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Jaipur',
          'addressRegion': 'Rajasthan',
          'addressCountry': 'IN'
        }
      },
      'serviceType': 'Express Car Service, Repair & Dent Paint',
      'areaServed': {
        '@type': 'City',
        'name': 'Jaipur'
      }
    }
  },
  
  '/terms': {
    title: 'Terms and Conditions | GaadiMech',
    description: 'Read GaadiMech\'s terms and conditions for using our car service platform and services.',
    keywords: 'terms and conditions, terms of use, service terms, gaadimech terms',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/terms'
  },
  '/refund-policy': {
    title: 'Refund Policy | GaadiMech',
    description: 'Learn about GaadiMech\'s refund policy for car services and products.',
    keywords: 'refund policy, return policy, cancellation policy, gaadimech refunds',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/refund-policy'
  },
  '/express-service-TnCs': {
    title: 'Express Service Terms and Conditions | GaadiMech',
    description: 'Terms and conditions for GaadiMech\'s Express 90 MINS Car Service package.',
    keywords: 'express service terms, 90 minute service terms, express service conditions',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/express-service-TnCs'
  },
  
  // Other Pages
  '/careers': {
    title: 'Careers at GaadiMech | Join the 90-Minute Revolution in Car Care',
    description: 'Join GaadiMech\'s innovative team and be part of revolutionizing the car service industry. Explore exciting career opportunities in automotive technology, operations, and more.',
    keywords: 'careers, jobs, automotive careers, car service jobs, gaadimech careers',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/careers'
  },
  '/feedback': {
    title: 'Customer Feedback | GaadiMech',
    description: 'Share your feedback with GaadiMech to help us improve our automotive services. Your opinion matters to us!',
    keywords: 'GaadiMech feedback, customer feedback, car repair feedback, automotive service review',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/feedback'
  },
  '/express-beta-atc': {
    title: 'GaadiMech Express: 90-Minute Car Service | Fast & Professional Car Repair',
    description: 'Experience the future of car servicing with GaadiMech Express. Get your car serviced in just 90 minutes with our expert mechanics and state-of-the-art technology.',
    keywords: 'express car service, 90 minute car service, quick car service, fast car repair',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/express'
  },
  '/blog': {
    title: 'Blog - GaadiMech | Car Maintenance Tips & Automotive Insights',
    description: 'Read expert automotive tips, car maintenance guides, and industry insights from GaadiMech\'s professional mechanics.',
    keywords: 'car maintenance tips, automotive blog, car repair guide, vehicle maintenance blog',
    image: 'https://www.gaadimech.com/blog-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/blog',
    robots: 'index, follow',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'GaadiMech Blog',
      'description': 'Expert automotive tips, car maintenance guides, and industry insights',
      'publisher': {
        '@type': 'Organization',
        'name': 'GaadiMech',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.gaadimech.com/logo.png'
        }
      }
    }
  },
  
  // Example of a private page that shouldn't be indexed
  '/admin-dashboard': {
    title: 'Admin Dashboard - GaadiMech',
    description: 'Internal admin dashboard for GaadiMech team members.',
    keywords: 'admin dashboard, internal tool',
    image: 'https://www.gaadimech.com/og-image.jpg',
    robots: 'noindex, nofollow', // Prevent search engines from indexing this page
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
    return {
      ...defaultSeoConfig, // First apply default values
      ...seoConfigs[path], // Then override with page-specific values
      canonicalUrl: seoConfigs[path].canonicalUrl || `https://www.gaadimech.com${path}`
    };
  }
  
  // For service pages, try to match the service type
  if (path.startsWith('/services/')) {
    const serviceType = path.split('/')[2];
    const servicePath = `/services/${serviceType}`;
    
    if (seoConfigs[servicePath]) {
      return {
        ...defaultSeoConfig, // First apply default values
        ...seoConfigs[servicePath], // Then override with page-specific values
        canonicalUrl: seoConfigs[servicePath].canonicalUrl || `https://www.gaadimech.com${path}`
      };
    }
  }
  
  // For blog posts, we'll rely on the BlogPost component to handle SEO dynamically
  // This ensures that blog post SEO is based on the actual content
  if (path.startsWith('/blog/') && path !== '/blog') {
    return {
      ...defaultSeoConfig, // Include default values like robots tag
      title: 'GaadiMech Blog',
      description: 'Read expert automotive tips and insights on the GaadiMech blog.',
      keywords: 'automotive blog, car maintenance blog, car repair tips',
      image: 'https://www.gaadimech.com/blog-image.jpg',
      canonicalUrl: `https://www.gaadimech.com${path}`,
      // Note: The actual SEO meta will be set by the BlogPost component
    };
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
      image: 'https://www.gaadimech.com/og-image.jpg',
      canonicalUrl: `https://www.gaadimech.com${path}`,
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
  
  // Return default SEO configuration if no other match is found
  return {
    ...defaultSeoConfig,
    canonicalUrl: `https://www.gaadimech.com${path}`
  };
}; 