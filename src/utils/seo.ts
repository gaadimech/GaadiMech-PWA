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
  /**
   * OpenGraph site name used for `og:site_name` meta tag.
   * Falls back to the company/brand name when not supplied.
   */
  siteName?: string;
  /**
   * Locale to be used in `og:locale` meta tag. e.g., `en_IN`.
   */
  locale?: string;
  /**
   * Twitter handle for the website account e.g., `@gaadimech` used for `twitter:site`.
   */
  twitterSite?: string;
  /**
   * Twitter handle of the content creator e.g., `@gaadimech` used for `twitter:creator`.
   */
  twitterCreator?: string;
}

// Default SEO configuration
const defaultSeoConfig: SeoConfig = {
  title: 'GaadiMech - Professional Car Service & Repair in India',
  description: 'Book car services at GaadiMech - expert mechanics, genuine parts & free pickup-drop. AC repair, denting, tyres & batteries with transparent pricing.',
  keywords: [
    'car mechanic near me', 'near me car mechanic', 'automotive mechanics near me', 'car mechanic nearby me', 'car mechanic near to me', 'car mechanic close to me',
    'car repair', 'garage near me', 'car repair automotive', 'repair automotive', 'car servicing', 'car service',
    'car mechanic', 'auto mechanics', 'mechanic near me', 'mechanic shop near me', 'mechanic nearby me', 'near me mechanic', 'car auto mechanic',
    'car repair near me', 'car repair shop near me', 'car repair jaipur',
    'car ac repair near me', 'car ac service near me', 'car ac repair jaipur',
    'car glass shop near me', 'car glass shop in jaipur',
    'wheel alignment near me', 'transmission repair', 'exhaust repair',
    'best car service centre in jaipur', 'best car service center near me', 'car service center near me', 'car service near me', 'car service jaipur', 'car service at home in jaipur',
    'gadi mechanic', 'gaadi mechanic', 'gaadi',
    '90 minute car service', 'express car service', 'doorstep car service', 'car dent paint', 'denting painting', 'battery replacement', 'tyre services'
  ].join(', '),
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
  },
  siteName: 'GaadiMech',
  locale: 'en_IN',
  twitterSite: '@GaadiMech',
  twitterCreator: '@GaadiMech'
};

// Page-specific SEO configurations
const seoConfigs: Record<string, SeoConfig> = {
  '/': {
    title: 'GaadiMech | 90 MINS Car Service | Best Car Service in Jaipur',
    description: 'Book your car service online with GaadiMech and get 90-minute express car service at your doorstep. Best car repair and maintenance services in Jaipur with 100% genuine parts.',
    keywords: 'car service, car repair, doorstep car service, 90 minute car service, car service jaipur, car maintenance, express car service',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/',
    robots: 'index, follow',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'GaadiMech',
      'description': '90-minute express car service at your doorstep',
      'url': 'https://www.gaadimech.com',
      'telephone': '+91-8448285289',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Jaipur',
        'addressRegion': 'Rajasthan',
        'addressCountry': 'IN'
      }
    }
  },
  '/services': {
    title: 'Car Services | Professional Car Repair & Maintenance - GaadiMech',
    description: 'Professional car services including periodic maintenance, AC service, battery replacement, denting & painting, car spa, and more. Book now for doorstep service.',
    keywords: 'car services, car repair, car maintenance, periodic service, AC service, battery replacement, denting painting',
    image: 'https://www.gaadimech.com/services-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/services',
    robots: 'index, follow'
  },
  '/ad-services': {
    title: 'Car Services Jaipur | Professional Car Repair & Maintenance - GaadiMech',
    description: 'Professional car services in Jaipur including periodic maintenance, AC service, battery replacement, denting & painting, car spa, and more. Book now for doorstep service.',
    keywords: 'car services jaipur, car repair jaipur, car maintenance jaipur, periodic service jaipur, AC service jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/ad-services',
    robots: 'index, follow'
  },
  '/about': {
    title: 'About GaadiMech | 90-Minute Car Service Revolution',
    description: 'Learn about GaadiMech\'s mission to revolutionize car servicing with our 90-minute express service model. Professional car care with technology-driven solutions.',
    keywords: 'about gaadimech, car service company, 90 minute car service, express car service, car repair company',
    image: 'https://www.gaadimech.com/about-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/about',
    robots: 'index, follow'
  },
  '/contact': {
    title: 'Contact GaadiMech | Book Car Service | Get Support',
    description: 'Contact GaadiMech for car service bookings, support, or inquiries. Call +91-8448285289 or book online for doorstep car service in Jaipur.',
    keywords: 'contact gaadimech, book car service, car service booking, gaadimech contact number, car service support',
    image: 'https://www.gaadimech.com/contact-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/contact',
    robots: 'index, follow'
  },
  '/blog': {
    title: 'Car Maintenance & Repair Blog | Expert Tips - GaadiMech',
    description: 'Expert car maintenance tips, repair guides, and automotive insights from professional mechanics. Learn how to care for your car with our detailed blog posts.',
    keywords: 'car maintenance blog, car repair tips, automotive blog, car care guides, vehicle maintenance tips',
    image: 'https://www.gaadimech.com/blog-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/blog',
    robots: 'index, follow'
  },
  '/express': {
    title: 'Express Car Service | 90-Minute Car Service - GaadiMech',
    description: 'Get your car serviced in just 90 minutes with GaadiMech Express. Fast, professional car service at your doorstep with genuine parts and expert mechanics.',
    keywords: 'express car service, 90 minute car service, quick car service, fast car repair, doorstep car service',
    image: 'https://www.gaadimech.com/express-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/express',
    robots: 'index, follow'
  },
  '/express-beta-atc': {
    title: 'Book Express Car Service | 90-Minute Service Booking - GaadiMech',
    description: 'Book your 90-minute express car service online. Select your car, choose time slot, and get professional service at your doorstep with genuine parts.',
    keywords: 'book express car service, 90 minute service booking, online car service booking, express car service booking',
    image: 'https://www.gaadimech.com/express-booking-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/express-beta-atc',
    robots: 'index, follow'
  },
  '/services/periodic': {
    title: 'Periodic Car Service in Jaipur | Scheduled Maintenance – GaadiMech',
    description: 'Regular maintenance to keep your car running at its best. Book our comprehensive periodic car service in Jaipur with free pickup & drop.',
    keywords: 'periodic car service jaipur, car oil change jaipur, full car service jaipur, scheduled car maintenance jaipur, engine oil replacement, filter replacement, car inspection jaipur',
    image: 'https://www.gaadimech.com/periodic-service-image.jpg',
    hiddenContent: {
      h1: 'Expert Car Periodic Service in Jaipur',
      h2: 'What Our Car Periodic Service Includes',
      paragraphs: [
        'Regular maintenance is vital for your vehicle\'s longevity and performance. GaadiMech offers comprehensive periodic car service in Jaipur, designed to keep your vehicle running at its best while preventing costly breakdowns and extending its lifespan. Our skilled technicians perform thorough inspections and maintenance according to manufacturer specifications.',
        'Jaipur\'s climate and road conditions can put additional stress on your vehicle\'s systems. Our periodic maintenance service addresses these specific challenges, providing customized care that goes beyond basic oil changes to ensure all critical components are properly maintained for optimal performance and reliability.'
      ],
      listItems: [
        'Engine Oil Replacement: Draining old oil and replacing with manufacturer-recommended grade and quantity.',
        'Oil Filter Replacement: Installing a new oil filter to maintain clean oil circulation.',
        'Air Filter Inspection/Replacement: Checking and replacing air filter to ensure proper engine breathing and fuel efficiency.',
        'Brake System Inspection: Checking brake pads, discs, and fluid levels for safety and performance.',
        'Cooling System Check: Inspecting radiator, hoses, and coolant level with top-up as needed.',
        'Battery Inspection: Testing battery health and cleaning terminals to prevent starting issues.',
        'Comprehensive Inspection: 25-point check of all critical vehicle systems and components.',
        'Fluids Top-up: Checking and topping up brake fluid, power steering fluid, and washer fluid.'
      ]
    }
  },
  '/services/ac': {
    title: 'Car AC Repair in Jaipur | AC Service at Doorstep – GaadiMech',
    description: 'Is your car AC not cooling? Get doorstep AC service – gas refill, compressor repair, leak fixing by certified mechanics. Beat the heat with fast, guaranteed AC repair.',
    keywords: 'car ac repair jaipur, car ac gas refill jaipur, car ac service jaipur, car ac not cooling jaipur, ac compressor repair jaipur, condenser cleaning, leak detection',
    image: 'https://www.gaadimech.com/ac-service-image.jpg',
    robots: 'index, follow',
    hiddenContent: {
      h1: 'Car AC Repair in Jaipur – Doorstep Service',
      h2: 'What Our Car AC Service Includes',
      paragraphs: [
        'Is your car\'s air conditioning not cooling properly or emitting unpleasant odors? GaadiMech offers comprehensive car AC services in Jaipur designed to restore your vehicle\'s cooling system to peak performance. Our expert technicians diagnose and fix common AC issues including refrigerant leaks, compressor problems, and electrical faults, ensuring you stay comfortable during Jaipur\'s hot summer months.',
        'Regular AC maintenance is essential in Jaipur\'s climate to prevent more serious problems and extend the life of your AC system. Our doorstep car AC service saves you time and hassle while ensuring your vehicle\'s cooling system works efficiently throughout the year.'
      ],
      listItems: [
        'AC Gas Refilling: Checking refrigerant levels and refilling to restore optimal cooling performance.',
        'Leak Detection: Thorough inspection of the AC system to identify and repair any refrigerant leaks.',
        'Condenser Cleaning: Removing dust and debris from the condenser to improve heat exchange efficiency.',
        'Compressor Inspection: Checking the compressor\'s operation and ensuring proper pressure levels.',
        'AC Filter Cleaning: Cleaning or replacing filters to improve air quality and system efficiency.'
      ]
    }
  },
  '/services/denting': {
    title: 'Car Denting & Painting in Jaipur | Dent & Scratch Repair – GaadiMech',
    description: 'Restore your car\'s look with professional denting & painting in Jaipur. From scratch removal to full body paint, we make your car look new – affordable & fast.',
    keywords: 'car dent repair jaipur, car painting jaipur, scratch removal jaipur, bumper repair jaipur, full body paint jaipur, panel alignment, color matching',
    image: 'https://www.gaadimech.com/denting-service-image.jpg',
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
    },
    hiddenContent: {
      h1: 'Professional Car Denting & Painting Services in Jaipur',
      h2: 'What Our Car Denting & Painting Service Includes',
      paragraphs: [
        'Has your car suffered dents, scratches, or paint damage? GaadiMech provides expert car denting and painting services in Jaipur to restore your vehicle\'s appearance to showroom condition. Our skilled technicians use advanced techniques and premium materials to repair everything from minor dings to major collision damage, ensuring flawless results.',
        'We understand that your car\'s appearance matters to you. Whether it\'s fixing a small parking lot dent or performing complete body restoration after an accident, our Jaipur-based denting and painting professionals deliver exceptional quality with attention to detail and perfect color matching.'
      ],
      listItems: [
        'Dent Repair: Removal of dents using specialized tools and techniques without damaging the original paint.',
        'Panel Alignment: Precise realignment of body panels for proper fit and appearance.',
        'Surface Preparation: Thorough cleaning, sanding, and priming to ensure paint adhesion.',
        'Premium Paint Application: Using high-quality paints with 100% color matching to your vehicle.',
        'Rubbing & Polishing: Professional finishing to restore gloss and protect the new paint.',
        'Clear Coat Application: Applying protective clear coat for durability and UV protection.'
      ]
    }
  },
  '/services/battery': {
    title: 'Car Battery Replacement in Jaipur | Jumpstart & New Battery – GaadiMech',
    description: 'Dead battery? Get instant car battery replacement with free delivery & installation. GaadiMech offers quick jumpstart service and new batteries with warranty.',
    keywords: 'car battery replacement jaipur, car battery service jaipur, jump start jaipur, battery testing jaipur, doorstep battery service, battery health check',
    image: 'https://www.gaadimech.com/battery-service-image.jpg',
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
    },
    hiddenContent: {
      h1: 'Car Battery Replacement in Jaipur',
      h2: 'What Our Car Battery Service Includes',
      paragraphs: [
        'Experiencing starting problems or electrical issues with your vehicle? GaadiMech offers reliable car battery replacement services across Jaipur, delivered right to your doorstep. Our expert technicians will diagnose your battery\'s condition, recommend the best replacement options, and install a new battery with minimal downtime.',
        'Car batteries typically last 2-3 years in Jaipur\'s climate conditions before performance begins to decline. Don\'t wait for a complete breakdown - our preventive battery replacement service ensures you\'re never stranded with a vehicle that won\'t start, especially during extreme weather conditions.'
      ],
      listItems: [
        'Battery Health Check: Comprehensive testing of your current battery\'s condition and charging system.',
        'Expert Recommendation: Suggesting the right battery type and capacity based on your vehicle specifications.',
        'Doorstep Installation: Professional removal of old battery and installation of new battery at your location in Jaipur.',
        'Terminal Cleaning: Cleaning battery terminals to ensure proper connection and prevent corrosion.',
        'Electrical System Check: Verifying proper functioning of your vehicle\'s charging system after battery replacement.',
        'Old Battery Disposal: Environmentally responsible disposal of your old battery.'
      ]
    }
  },
  '/services/tyre': {
    title: 'Tyre Replacement & Wheel Alignment in Jaipur – GaadiMech',
    description: 'Need new tyres or wheel alignment? Book our mobile tyre services in Jaipur for replacement, rotation, balancing & alignment with expert technicians.',
    keywords: 'tyre replacement jaipur, wheel alignment jaipur, tyre balancing jaipur, puncture repair jaipur, tyre rotation, wheel balancing, tyre pressure monitoring',
    image: 'https://www.gaadimech.com/tyre-service-image.jpg',
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
    },
    hiddenContent: {
      h1: 'Tyre Replacement & Wheel Alignment in Jaipur',
      h2: 'What Our Tyre Services Include',
      paragraphs: [
        'Are your tyres showing signs of wear or damage? GaadiMech delivers comprehensive tyre services in Jaipur including replacement, rotation, balancing, and wheel alignment. Our mobile tyre services bring expert technicians to your location with all the necessary equipment to keep your vehicle running safely and efficiently.',
        'Properly maintained tyres are crucial for safety, fuel efficiency, and vehicle handling, especially on Jaipur\'s varied road conditions. Our professional tyre services help extend the life of your tyres while ensuring optimal performance and preventing costly vehicle damage caused by worn or improperly aligned tyres.'
      ],
      listItems: [
        'Tyre Replacement: Supply and installation of new tyres from leading brands suited to your vehicle and driving needs.',
        'Wheel Balancing: Precision balancing to eliminate vibration and ensure even tyre wear.',
        'Wheel Alignment: Computer-assisted alignment to correct suspension angles for proper handling and tyre longevity.',
        'Tyre Rotation: Regular rotation to ensure even wear across all tyres.',
        'Puncture Repair: Professional repair of punctures and minor damages where safe to do so.',
        'Tyre Pressure Monitoring: Checking and adjusting pressure to recommended levels for safety and efficiency.'
      ]
    }
  },
  '/services/windshield': {
    title: 'Windshield Replacement in Jaipur | Car Glass Repair – GaadiMech',
    description: 'Cracked or broken windshield? Get professional windshield replacement and repair in Jaipur with high-quality glass, precise installation, and ADAS calibration.',
    keywords: 'windshield replacement jaipur, windshield repair jaipur, car glass repair jaipur, windshield chip repair jaipur, ADAS calibration, OEM glass',
    image: 'https://www.gaadimech.com/windshield-service-image.jpg',
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
    },
    hiddenContent: {
      h1: 'Windshield Replacement in Jaipur',
      h2: 'What Our Windshield Services Include',
      paragraphs: [
        'Dealing with a chipped, cracked, or shattered windshield? GaadiMech provides professional windshield replacement and repair services across Jaipur, ensuring your safety and restoring clear visibility. Our team uses high-quality glass that meets all safety standards, with precise installation techniques for a perfect fit.',
        'Even small chips or cracks in your windshield can compromise structural integrity and quickly spread into larger problems. Our prompt repair services in Jaipur can address minor damage before replacement becomes necessary, saving you time and money while maintaining your vehicle\'s safety standards.'
      ],
      listItems: [
        'Damage Assessment: Expert evaluation to determine if repair or replacement is needed.',
        'Chip Repair: Advanced resin filling for small chips to prevent spreading.',
        'Full Windshield Replacement: Complete removal of damaged glass and installation of new windshield.',
        'OEM Quality Glass: Using manufacturer-specified glass with proper thickness and specifications.',
        'Professional Installation: Proper sealing and setting techniques to prevent leaks and wind noise.',
        'ADAS Calibration: Recalibration of Advanced Driver Assistance Systems after windshield replacement when applicable.'
      ]
    }
  },
  '/services/detailing': {
    title: 'Professional Car Detailing Services in Jaipur',
    description: 'Want your car to look and feel like new again? GaadiMech offers premium car detailing services in Jaipur that go far beyond a regular car wash.',
    keywords: 'car detailing jaipur, premium car detailing, paint correction, interior detailing, exterior detailing, ceramic coating, engine bay cleaning',
    image: 'https://www.gaadimech.com/detailing-service-image.jpg',
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
    },
    hiddenContent: {
      h1: 'Professional Car Detailing Services in Jaipur',
      h2: 'What Our Car Detailing Service Includes',
      paragraphs: [
        'Want your car to look and feel like new again? GaadiMech offers premium car detailing services in Jaipur that go far beyond a regular car wash. Our comprehensive detailing packages include deep cleaning, polishing, and protection treatments for both exterior and interior, restoring your vehicle\'s showroom shine and preserving its value.',
        'Jaipur\'s climate, with its dust, heat, and occasional heavy rains, can take a toll on your vehicle\'s appearance. Our professional detailing services remove accumulated contaminants, correct minor paint imperfections, and apply protective treatments to shield your car from environmental damage.'
      ],
      listItems: [
        'Exterior Detailing: Clay bar treatment, paint correction, machine polishing, and protective wax or sealant application.',
        'Interior Detailing: Deep cleaning of upholstery, carpet shampooing, leather conditioning, and dashboard treatment.',
        'Engine Bay Cleaning: Careful degreasing and detailing of engine components for improved performance and aesthetics.',
        'Wheel and Tire Detailing: Deep cleaning of wheels, wheel wells, and tire dressing for a complete look.',
        'Glass Treatment: Special cleaning and water-repellent application for improved visibility.',
        'Premium Coating Options: Ceramic coating and paint protection film for long-lasting shine and protection.'
      ]
    }
  },
  '/services/carspa': {
    title: 'Premium Car Spa & Cleaning Services in Jaipur',
    description: 'Give your car the pampering it deserves with GaadiMech\'s professional car spa services in Jaipur. Our specialized cleaning treatments go beyond regular washing to deeply clean, refresh, and protect both your car\'s exterior and interior.',
    keywords: 'car spa jaipur, car cleaning jaipur, car detailing jaipur, car wash jaipur, interior cleaning, dashboard treatment, odor removal',
    image: 'https://www.gaadimech.com/carspa-service-image.jpg',
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
    },
    hiddenContent: {
      h1: 'Premium Car Spa & Cleaning Services in Jaipur',
      h2: 'What Our Car Spa Services Include',
      paragraphs: [
        'Give your car the pampering it deserves with GaadiMech\'s professional car spa services in Jaipur. Our specialized cleaning treatments go beyond regular washing to deeply clean, refresh, and protect both your car\'s exterior and interior, leaving it looking and smelling like new again.',
        'Jaipur\'s dusty environment can quickly affect your vehicle\'s appearance. Our comprehensive car spa services remove accumulated dirt, grime, and pollutants while applying protective treatments that help maintain your car\'s cleanliness and appearance for longer periods.'
      ],
      listItems: [
        'Exterior Foam Wash: Gentle yet effective foam cleaning that lifts dirt without scratching paint.',
        'Interior Vacuum & Cleaning: Deep vacuuming and cleaning of all interior surfaces including hard-to-reach areas.',
        'Dashboard & Plastic Treatment: Cleaning and applying UV protection to prevent cracking and fading.',
        'Seat Cleaning: Specialized cleaning for fabric, leather, or vinyl seats with appropriate conditioners.',
        'Glass Treatment: Streak-free cleaning of all windows and mirrors for optimal visibility.',
        'Tyre & Rim Cleaning: Thorough cleaning and dressing of tyres and wheel rims.',
        'Engine Bay Cleaning: Careful cleaning of engine compartment to remove oil and dirt buildup.',
        'Odor Elimination: Treatment to remove unpleasant odors and leave your car smelling fresh.'
      ]
    }
  },
  '/car-service-in-jaipur': {
    title: 'Car Service in Jaipur | Best Car Servicing in Jaipur - GaadiMech',
    description: 'Looking for the best car servicing in Jaipur? GaadiMech offers affordable car service in Jaipur with expert mechanics, doorstep service, and genuine parts. Book now!',
    keywords: 'Car Service in Jaipur, Best Car Service in Jaipur, Car Maintenance in Jaipur, Car Service Jaipur',
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
    keywords: 'Car Repair Service in Jaipur, Car Repairing Services in Jaipur, Car Repairing in Jaipur, doorstep Car Repair Service in Jaipur, Affordable car repair service in Jaipur',
    image: 'https://www.gaadimech.com/services-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/car-repair-service-in-jaipur',
    hiddenContent: {
      h1: '90-Minute Car Service in Jaipur',
      h2: 'Quick & Professional Car Repair',
      paragraphs: [
        'Experience Formula 1 style pit stop service for your car in Jaipur. Our 90-minute express car service provides efficient, high-quality maintenance without the long wait times. Skilled mechanics work simultaneously to complete your service in record time without compromising on quality.',
        'Perfect for busy professionals and families who can\'t afford to be without their vehicle for extended periods. Our express service covers essential maintenance tasks that keep your car running smoothly while saving you valuable time.'
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
    keywords: 'Car Mechanic in Jaipur, Car Mechanic Shop in Jaipur, Nearby Car Mechanic Jaipur, Car Repair Mechanic in Jaipur, Car Mechanic Shop Jaipur, Local car mechanic shop in Jaipur, Doorstep car mechanic in Jaipur',
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
    keywords: 'Car AC Service in Jaipur, Doorstep AC Repairing in Jaipur, AC Repairing in Jaipur, Car Air Conditioning Service Jaipur, Car AC Mechanic in Jaipur, Car AC gas filling service in Jaipur, Car AC compressor repair in Jaipur, Car AC servicing near me Jaipur, Doorstep car AC service in Jaipur',
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
    keywords: 'Car Dent Paint Service in Jaipur, Car Denting and Painting in Jaipur, Car Dent Repair in Jaipur, Car Body Repair in Jaipur, Car full body paint service in Jaipur, Car bumper dent repair in Jaipur, Car paint touch-up service in Jaipur, Car door dent repair in Jaipur, Car accident body repair in Jaipur',
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
      'name': 'Emergency Car Repair & Towing Service in Jaipur',
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
      'serviceType': 'Emergency Roadside Assistance & Towing',
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

  
  // Example of a private page that shouldn't be indexed
  '/admin-dashboard': {
    title: 'Admin Dashboard - GaadiMech',
    description: 'Internal admin dashboard for GaadiMech team members.',
    keywords: 'admin dashboard, internal tool',
    image: 'https://www.gaadimech.com/og-image.jpg',
    robots: 'noindex, nofollow', // Prevent search engines from indexing this page
  },
  
  // Add more page-specific SEO configs as needed
  '/workshop-partner': {
    title: 'Partner Your Workshop With GaadiMech | Boost Revenue & Customer Base',
    description: 'Join GaadiMech\'s network of authorised workshops. Get steady customer inflow, technology platform & genuine parts supply. Apply to become a workshop partner today.',
    keywords: 'workshop partner, car workshop partnership, authorised workshop jaipur, gaadimech workshop partner',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/workshop-partner',
    robots: 'index, follow'
  },
  '/franchise': {
    title: 'GaadiMech Franchise | Start Your Own 90-Minute Car Service Business',
    description: 'Invest in GaadiMech franchise and launch a premium car service outlet with low investment, 70% lower space requirement & 200% ROI in 18 months.',
    keywords: 'car service franchise, automobile franchise, car repair franchise, gaadimech franchise, express car service franchise',
    image: 'https://www.gaadimech.com/og-image.jpg',
    canonicalUrl: 'https://www.gaadimech.com/franchise',
    robots: 'index, follow'
  },
  '/coupon-admin': {
    title: 'Coupon Admin – Internal',
    description: 'Internal admin dashboard for managing coupons. Not intended for public indexing.',
    keywords: 'admin, coupons, internal',
    image: 'https://www.gaadimech.com/og-image.jpg',
    robots: 'noindex, nofollow',
    canonicalUrl: 'https://www.gaadimech.com/coupon-admin'
  },
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
      title: 'GaadiMech Blog - Car Maintenance & Repair Guides',
      description: 'Expert automotive tips and insights from professional car mechanics. Learn about car maintenance, repair, and care in our detailed guides.',
      keywords: 'automotive blog, car maintenance, car repair tips, vehicle care guides',
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
      title: `Car Service & Repair in ${cityNameCapitalized} | 90-Minute Service – GaadiMech`,
      description: `Book car service in ${cityNameCapitalized} with free pickup-drop. Expert mechanics for AC repair, denting, battery replacement & all car services. Best rates guaranteed.`,
      keywords: `car service ${cityNameCapitalized}, car repair ${cityNameCapitalized}, car mechanic ${cityNameCapitalized}, car ac repair ${cityNameCapitalized}, denting painting ${cityNameCapitalized}`,
      image: 'https://www.gaadimech.com/og-image.jpg',
      canonicalUrl: `https://www.gaadimech.com${path}`,
      hiddenContent: {
        h1: `Professional Car Repair Services in ${cityNameCapitalized}`,
        h2: `Trusted Car Mechanics in ${cityNameCapitalized}`,
        paragraphs: [
          `Looking for reliable car repair services in ${cityNameCapitalized}? GaadiMech provides expert car mechanics, professional car service, and emergency car repair in ${cityNameCapitalized}. Our services include car AC repair, denting & painting, towing service, and complete car maintenance solutions.`
        ],
        listItems: [
          `24/7 Emergency Car Repair Services in ${cityNameCapitalized}`,
          `Professional Car AC Service & Repair in ${cityNameCapitalized}`,
          `Expert Denting & Painting Solutions in ${cityNameCapitalized}`,
          `Complete Car Maintenance Services in ${cityNameCapitalized}`,
          `Certified Car Mechanics in ${cityNameCapitalized}`,
          `Affordable Car Repair Solutions in ${cityNameCapitalized}`
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