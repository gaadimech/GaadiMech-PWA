import { ServiceType } from '../types/services';

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: string; // Default price to display when no vehicle is selected
  isBestseller?: boolean;
  visible?: boolean; // Add visibility flag
  details: string[];
  whatsappMessage: string;
}

export interface ServiceTypeData {
  title: string;
  subtitle: string;
  serviceCards: ServiceCard[];
  description?: string;
}

// Define the customized service card before using it
export const customizedServiceCard: ServiceCard = {
  id: 'customizable-service',
  title: 'Customized Car Service',
  description: 'Build your own service package by selecting only what your car needs.',
  price: '₹1999',
  rating: 4.8,
  reviewCount: 150,
  duration: '3-4 Hours',
  //isBestseller: true,
  visible: true, // Visible by default
  image: 'https://i.ibb.co/t4HmbHZ/Group.png', // Using a placeholder image instead of null
  details: [
    'Personalize your service package',
    'Select only the components you need',
    'Transparent pricing for each service',
    'Save money by customizing your package',
    'Professional service with genuine parts',
    'Service warranty on all work done',
    '100% Genuine Spare Parts',
    'Expert mechanics'
  ],
  whatsappMessage: 'Hi, I would like to book a Customized Car Service package.'
};

// Central data store for all service cards organized by service type
const servicesData: Record<ServiceType, ServiceTypeData> = {
  'periodic': {
    title: 'Expert Car Periodic Service in Jaipur',
    subtitle: 'Keep Your Car Running Smoothly With Our Professional Maintenance Services',
    description: `
      <h1>Expert Car Periodic Service in Jaipur</h1>
      <p>Regular maintenance is vital for your vehicle's longevity and performance. GaadiMech offers comprehensive periodic car service in Jaipur, designed to keep your vehicle running at its best while preventing costly breakdowns and extending its lifespan. Our skilled technicians perform thorough inspections and maintenance according to manufacturer specifications.</p>
      <p>Jaipur's climate and road conditions can put additional stress on your vehicle's systems. Our periodic maintenance service addresses these specific challenges, providing customized care that goes beyond basic oil changes to ensure all critical components are properly maintained for optimal performance and reliability.</p>
      
      <h2>What Our Car Periodic Service Includes</h2>
      <ul>
        <li><strong>Engine Oil Replacement:</strong> Draining old oil and replacing with manufacturer-recommended grade and quantity.</li>
        <li><strong>Oil Filter Replacement:</strong> Installing a new oil filter to maintain clean oil circulation.</li>
        <li><strong>Air Filter Inspection/Replacement:</strong> Checking and replacing air filter to ensure proper engine breathing and fuel efficiency.</li>
        <li><strong>Brake System Inspection:</strong> Checking brake pads, discs, and fluid levels for safety and performance.</li>
        <li><strong>Cooling System Check:</strong> Inspecting radiator, hoses, and coolant level with top-up as needed.</li>
        <li><strong>Battery Inspection:</strong> Testing battery health and cleaning terminals to prevent starting issues.</li>
        <li><strong>Comprehensive Inspection:</strong> 25-point check of all critical vehicle systems and components.</li>
        <li><strong>Fluids Top-up:</strong> Checking and topping up brake fluid, power steering fluid, and washer fluid.</li>
      </ul>
      
      <h2>Why Choose GaadiMech for Periodic Service in Jaipur?</h2>
      <ul>
        <li>Doorstep service that saves you time and hassle</li>
        <li>Manufacturer-recommended service protocols</li>
        <li>Genuine parts and premium lubricants</li>
        <li>Transparent pricing with no hidden charges</li>
        <li>Detailed digital service report</li>
      </ul>
      
      <h2>Related Services</h2>
      <p>To maintain your vehicle's comfort systems, consider our specialized <a href="/services/ac" class="text-[#FF7200] hover:underline">car AC service in Jaipur</a>. For optimal tire performance and safety, check out our <a href="/services/tyre" class="text-[#FF7200] hover:underline">tire services and wheel alignment</a>. For a complete cleaning after your service, our <a href="/services/carspa" class="text-[#FF7200] hover:underline">car spa services</a> will leave your vehicle looking like new.</p>
      
      <h2>Frequently Asked Questions About Periodic Service</h2>
      <div class="faq-item">
        <h3>How often should I get my car serviced in Jaipur?</h3>
        <p>For most vehicles in Jaipur, we recommend periodic service every 5,000-10,000 km or every 6 months, whichever comes first. This schedule may vary based on your vehicle's make, model, and usage conditions.</p>
      </div>
      <div class="faq-item">
        <h3>Will periodic service from GaadiMech maintain my car's warranty?</h3>
        <p>Yes, our periodic service follows manufacturer guidelines and uses genuine parts, maintaining your vehicle's warranty while providing the convenience of doorstep service in Jaipur.</p>
      </div>
      <div class="faq-item">
        <h3>How long does a periodic service take?</h3>
        <p>A standard periodic service takes approximately 4-5 hours. Our express service option completes essential maintenance in just 90 minutes for customers in Jaipur with time constraints.</p>
      </div>
      <div class="faq-item">
        <h3>What's the difference between regular and express service?</h3>
        <p>Our express service focuses on essential maintenance items that can be completed quickly, while regular periodic service is more comprehensive and includes additional inspections and potential repairs as needed.</p>
      </div>
    `,
    serviceCards: [
      {
        id: 'periodic-express',
        title: 'Express Service',
        description: 'Ultra Fast Car Service - Time is Money!',
        image: 'https://i.ibb.co/t4HmbHZ/Group.png',
        rating: 4.8,
        reviewCount: 190,
        duration: '90 Mins!',
        price: '₹X,XXX',
        visible: true, // Changed from false to true to make it visible
        details: [
          'Engine Oil Replacement',
          'Oil Filter Replacement',
          'Air Filter Replacement',
          'Complete Car Wash',
          'Interior Vacuuming',
          '15 Point Car Inspection',
          'Coolant Top-up (up to 100ml)',
          'Battery Water Top-up',
          'Brake Oil Top-up',
          'Wiper Fluid Replacement',
        ],
        whatsappMessage: 'Hi, I\'d like to book an Express Service for my car.'
      },
      customizedServiceCard,
      {
        id: 'periodic-basic',
        title: 'Periodic Service',
        description: 'Complete inspection and maintenance for your vehicle',
        image: 'https://i.ibb.co/t4HmbHZ/Group.png',
        rating: 4.5,
        reviewCount: 570,
        duration: '4-5 Hours',
        price: '₹X,XXX',
        visible: false, // Changed from true to false to temporarily hide
        details: [
          'Engine Oil Replacement',
          'Oil Filter Replacement',
          'Air Filter Replacement',
          'Brake Pad Servicing',
          'Complete Car Wash',
          'Interior Vacuuming',
          '25 Point Car Inspection',
          'Coolant Top-up (up to 100ml)',
          'Battery Water Top-up',
          'Brake Oil Top-up',
          'Wiper Fluid Replacement',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Periodic Service for my car.'
      }
    ]
  },
  'denting': {
    title: 'Professional Car Denting & Painting Services in Jaipur',
    subtitle: 'Expert Denting and Painting Services to Make Your Car Look Brand New',
    description: `
      <h1>Professional Car Denting & Painting Services in Jaipur</h1>
      <p>Has your car suffered dents, scratches, or paint damage? GaadiMech provides expert car denting and painting services in Jaipur to restore your vehicle's appearance to showroom condition. Our skilled technicians use advanced techniques and premium materials to repair everything from minor dings to major collision damage, ensuring flawless results.</p>
      <p>We understand that your car's appearance matters to you. Whether it's fixing a small parking lot dent or performing complete body restoration after an accident, our Jaipur-based denting and painting professionals deliver exceptional quality with attention to detail and perfect color matching.</p>
      
      <h2>What Our Car Denting & Painting Service Includes</h2>
      <ul>
        <li><strong>Dent Repair:</strong> Removal of dents using specialized tools and techniques without damaging the original paint.</li>
        <li><strong>Panel Alignment:</strong> Precise realignment of body panels for proper fit and appearance.</li>
        <li><strong>Surface Preparation:</strong> Thorough cleaning, sanding, and priming to ensure paint adhesion.</li>
        <li><strong>Premium Paint Application:</strong> Using high-quality paints with 100% color matching to your vehicle.</li>
        <li><strong>Rubbing & Polishing:</strong> Professional finishing to restore gloss and protect the new paint.</li>
        <li><strong>Clear Coat Application:</strong> Applying protective clear coat for durability and UV protection.</li>
      </ul>
      
      <h2>Why Choose GaadiMech for Car Denting & Painting in Jaipur?</h2>
      <ul>
        <li>Expert technicians with years of experience in automotive body repair</li>
        <li>State-of-the-art equipment for precise color matching</li>
        <li>2-year warranty on all denting and painting work</li>
        <li>Transparent pricing with no hidden costs</li>
        <li>Convenient service options across Jaipur</li>
      </ul>
      
      <h2>Related Services</h2>
      <p>If your windshield was damaged in an accident as well, we also offer <a href="/services/windshield" class="text-[#FF7200] hover:underline">windshield replacement in Jaipur</a>. For a complete refresh of your vehicle, consider our <a href="/services/detailing" class="text-[#FF7200] hover:underline">car detailing services</a> after denting and painting work.</p>
      
      <h2>Frequently Asked Questions About Car Denting & Painting</h2>
      <div class="faq-item">
        <h3>How long does car denting and painting take in Jaipur?</h3>
        <p>Express panel denting and painting typically takes 1-2 days, while full body painting may require 5-7 days depending on the extent of work needed.</p>
      </div>
      <div class="faq-item">
        <h3>Can you match my car's original paint color exactly?</h3>
        <p>Yes, we use computerized color matching technology to ensure 100% accurate color matching with your vehicle's original paint.</p>
      </div>
      <div class="faq-item">
        <h3>Do I need to bring my car to your workshop in Jaipur?</h3>
        <p>For minor denting work, we offer doorstep services. For extensive painting jobs, we may recommend bringing your car to our specialized workshop in Jaipur for optimal results.</p>
      </div>
      <div class="faq-item">
        <h3>Will the repainted area look different from the rest of my car?</h3>
        <p>Our expert technicians ensure seamless blending of the repainted area with the surrounding panels, making the repair virtually undetectable.</p>
      </div>
    `,
    serviceCards: [
      {
        id: 'denting-door',
        title: 'Express Dent & Paint',
        description: 'Ultra Fast Car Service - Time is Money!',
        image: 'https://i.ibb.co/qjZBrnD/dent-and-paint.png',
        rating: 4.8,
        reviewCount: 190,
        duration: '1 Day Delivery',
        price: '₹X,XXX/Panel',
        details: [
          '2 Year Warranty',
          '100% Colour Match',
          'Panel Rubbing and Polishing',
          'Grade A Primer',
          'High Quality Paint',
        ],
        whatsappMessage: 'Hi, I\'d like to book an Express Dent & Paint service for my car. I get Rs.500 off!'
      },
      {
        id: 'denting-full',
        title: 'Full Body Paint',
        description: 'Comprehensive painting for the entire car',
        image: 'https://i.ibb.co/qjZBrnD/dent-and-paint.png',
        rating: 4.7,
        reviewCount: 180,
        duration: '5-7 Days',
        price: '₹X,XXX',
        details: [
          '2 Year Warranty',
          'Complete Car Rubbing and Polishing',
          '100% Colour Match',
          'Complete Car Wash',
          'Grade A Primer',
          'High Quality Paint',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Full Body Paint service for my car.'
      }
    ]
  },  
  'ac': {
    title: 'Professional Car AC Service & Repair in Jaipur',
    subtitle: 'Expert Car AC Services to Keep You Cool in Jaipur\'s Heat',
    description: `
      <h1>Professional Car AC Service & Repair in Jaipur</h1>
      <p>Is your car's air conditioning not cooling properly or emitting unpleasant odors? GaadiMech offers comprehensive car AC services in Jaipur designed to restore your vehicle's cooling system to peak performance. Our expert technicians diagnose and fix common AC issues including refrigerant leaks, compressor problems, and electrical faults, ensuring you stay comfortable during Jaipur's hot summer months.</p>
      <p>Regular AC maintenance is essential in Jaipur's climate to prevent more serious problems and extend the life of your AC system. Our doorstep car AC service saves you time and hassle while ensuring your vehicle's cooling system works efficiently throughout the year.</p>
      
      <h2>What Our Car AC Service Includes</h2>
      <ul>
        <li><strong>AC Gas Refilling:</strong> Checking refrigerant levels and refilling to restore optimal cooling performance.</li>
        <li><strong>Leak Detection:</strong> Thorough inspection of the AC system to identify and repair any refrigerant leaks.</li>
        <li><strong>Condenser Cleaning:</strong> Removing dust and debris from the condenser to improve heat exchange efficiency.</li>
        <li><strong>Compressor Inspection:</strong> Checking the compressor's operation and ensuring proper pressure levels.</li>
        <li><strong>AC Filter Cleaning:</strong> Cleaning or replacing filters to improve air quality and system efficiency.</li>
      </ul>
      
      <h2>Why Choose GaadiMech for Car AC Repair in Jaipur?</h2>
      <ul>
        <li>Experienced technicians trained specifically in car AC systems</li>
        <li>Convenient doorstep service across Jaipur</li>
        <li>Transparent pricing with no hidden charges</li>
        <li>Use of genuine parts and high-quality refrigerants</li>
        <li>Service warranty on all AC repairs</li>
      </ul>
      
      <h2>Related Services</h2>
      <p>To ensure your vehicle runs smoothly in all conditions, consider our <a href="/services/periodic" class="text-[#FF7200] hover:underline">periodic maintenance service</a>. For a complete refreshing experience, check out our <a href="/services/carspa" class="text-[#FF7200] hover:underline">car spa and cleaning services in Jaipur</a>.</p>
      
      <h2>Frequently Asked Questions About Car AC Service</h2>
      <div class="faq-item">
        <h3>How often should I service my car AC in Jaipur's climate?</h3>
        <p>In Jaipur's hot climate, we recommend servicing your car AC system at least once every 6-8 months to ensure optimal performance during summer months.</p>
      </div>
      <div class="faq-item">
        <h3>Do you use genuine parts for AC repair?</h3>
        <p>Yes, GaadiMech only uses genuine parts and high-quality refrigerants for all car AC repairs in Jaipur, ensuring reliable performance and longevity.</p>
      </div>
      <div class="faq-item">
        <h3>How long does a car AC service take?</h3>
        <p>A basic AC gas refill service takes approximately 45-60 minutes, while comprehensive AC repairs may take 4-6 hours depending on the complexity of the issue.</p>
      </div>
      <div class="faq-item">
        <h3>Why is my car AC not cooling properly in Jaipur's summer?</h3>
        <p>Common reasons include low refrigerant levels, clogged condenser, faulty compressor, or damaged cooling fans. Our technicians can diagnose and fix these issues at your doorstep in Jaipur.</p>
      </div>
    `,
    serviceCards: [
      {
        id: 'ac-regular',
        title: 'Express AC Gas Refilling',
        description: 'Maintenance service for your car AC system',
        image: 'https://i.ibb.co/hVP6Phg/ac-service.png',
        rating: 4.6,
        reviewCount: 320,
        duration: '45-60 Mins',
        price: '₹999',
        details: [
          'AC Gas Refill (up to 400gms)',
          'Leak Detection',
          'Condenser Cleaning',
          'Compressor Inspection',
          'AC Filter Cleaning',
        ],
        whatsappMessage: 'Hi, I\'d like to book an Express AC Gas Refilling service for my car.'
      },
      {
        id: 'ac-repair',
        title: 'Comprehensive AC Service',
        description: 'Comprehensive repair for car AC issues',
        image: 'https://i.ibb.co/hVP6Phg/ac-service.png',
        rating: 4.5,
        reviewCount: 180,
        duration: '4-6 Hours',
        price: 'Real-Time Quotes',
        details: [
          'Compressor Repair/Replacement',
          'Condenser Repair/Replacement',
          'Cooling Coil Repair/Replacement',
          'Expansion Valve Repair/Replacement',
          'Blower Motor Repair/Replacement',
          'Complete AC System Diagnosis',
          'AC Electrical Circuit Repair',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Comprehensive AC Service for my car. I need a real-time estimate based on diagnostic inspection.'
      }
    ]
  },
  'battery': {
    title: 'Professional Car Battery Replacement Services in Jaipur',
    subtitle: 'Expert Car Battery Services at Your Doorstep in Jaipur',
    description: `
      <h1>Professional Car Battery Replacement Services in Jaipur</h1>
      <p>Experiencing starting problems or electrical issues with your vehicle? GaadiMech offers reliable car battery replacement services across Jaipur, delivered right to your doorstep. Our expert technicians will diagnose your battery's condition, recommend the best replacement options, and install a new battery with minimal downtime.</p>
      <p>Car batteries typically last 2-3 years in Jaipur's climate conditions before performance begins to decline. Don't wait for a complete breakdown - our preventive battery replacement service ensures you're never stranded with a vehicle that won't start, especially during extreme weather conditions.</p>
      
      <h2>What Our Car Battery Service Includes</h2>
      <ul>
        <li><strong>Battery Health Check:</strong> Comprehensive testing of your current battery's condition and charging system.</li>
        <li><strong>Expert Recommendation:</strong> Suggesting the right battery type and capacity based on your vehicle specifications.</li>
        <li><strong>Doorstep Installation:</strong> Professional removal of old battery and installation of new battery at your location in Jaipur.</li>
        <li><strong>Terminal Cleaning:</strong> Cleaning battery terminals to ensure proper connection and prevent corrosion.</li>
        <li><strong>Electrical System Check:</strong> Verifying proper functioning of your vehicle's charging system after battery replacement.</li>
        <li><strong>Old Battery Disposal:</strong> Environmentally responsible disposal of your old battery.</li>
      </ul>
      
      <h2>Why Choose GaadiMech for Car Battery Replacement in Jaipur?</h2>
      <ul>
        <li>Doorstep service available anywhere in Jaipur</li>
        <li>Wide range of genuine batteries for all car makes and models</li>
        <li>Competitive pricing with manufacturer warranty</li>
        <li>Expert technicians with specialized tools</li>
        <li>Quick service with minimal wait time</li>
      </ul>
      
      <h2>Related Services</h2>
      <p>To ensure your vehicle's electrical system is in top condition, consider our <a href="/services/periodic" class="text-[#FF7200] hover:underline">periodic maintenance service</a> which includes a comprehensive electrical system check. If you're experiencing issues with your car's AC system, our <a href="/services/ac" class="text-[#FF7200] hover:underline">car AC service in Jaipur</a> can help diagnose and fix any problems.</p>
      
      <h2>Frequently Asked Questions About Car Battery Replacement</h2>
      <div class="faq-item">
        <h3>How do I know if my car battery needs replacement?</h3>
        <p>Signs include slow engine cranking, dimming headlights, battery warning light on dashboard, swollen battery case, and car not starting consistently. Our technicians can perform a diagnostic test to determine your battery's condition.</p>
      </div>
      <div class="faq-item">
        <h3>What brands of car batteries do you offer in Jaipur?</h3>
        <p>We provide a wide range of trusted battery brands including Exide, Amaron, SF Sonic, and other manufacturer-recommended options suitable for all vehicle types in Jaipur.</p>
      </div>
      <div class="faq-item">
        <h3>How long does battery replacement take?</h3>
        <p>Our doorstep battery replacement service typically takes only 30-45 minutes from arrival to completion, minimizing disruption to your schedule.</p>
      </div>
      <div class="faq-item">
        <h3>Do you offer warranty on new car batteries?</h3>
        <p>Yes, all batteries come with manufacturer warranty ranging from 18-36 months depending on the battery type and brand you select for your vehicle.</p>
      </div>
    `,
    serviceCards: [
      {
        id: 'battery-replacement',
        title: 'Car Battery Replacement',
        description: 'Professional battery replacement with doorstep service in Jaipur',
        image: 'https://i.ibb.co/DpK0ZDF/car-battery.png',
        rating: 4.8,
        reviewCount: 240,
        duration: '30-45 Mins',
        price: '₹X,XXX',
        details: [
          'Free Battery Health Check',
          'Old Battery Disposal',
          'Terminal Cleaning',
          'Electrical System Check',
          'Wide Range of Battery Options',
          'Doorstep Service in Jaipur',
          'Warranty on New Battery',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Car Battery Replacement service.'
      },
      {
        id: 'battery-jumpstart',
        title: 'Emergency Jumpstart',
        description: 'Quick assistance when your battery dies unexpectedly',
        image: 'https://i.ibb.co/DpK0ZDF/car-battery.png',
        rating: 4.9,
        reviewCount: 175,
        duration: '30 Mins',
        price: '₹499',
        details: [
          'Rapid Response Service',
          'Battery Health Check',
          'Charging System Diagnosis',
          'Available 24/7 in Jaipur',
          'Expert Advice on Battery Condition',
          'No Hidden Charges',
        ],
        whatsappMessage: 'Hi, I need an Emergency Jumpstart service for my car.'
      }
    ]
  },
  'windshield': {
    title: 'Windshield Replacement & Repair Services in Jaipur',
    subtitle: 'Expert Windshield Services to Ensure Safety and Visibility',
    description: `
      <h1>Windshield Replacement & Repair Services in Jaipur</h1>
      <p>Dealing with a chipped, cracked, or shattered windshield? GaadiMech provides professional windshield replacement and repair services across Jaipur, ensuring your safety and restoring clear visibility. Our team uses high-quality glass that meets all safety standards, with precise installation techniques for a perfect fit.</p>
      <p>Even small chips or cracks in your windshield can compromise structural integrity and quickly spread into larger problems. Our prompt repair services in Jaipur can address minor damage before replacement becomes necessary, saving you time and money while maintaining your vehicle's safety standards.</p>
      
      <h2>What Our Windshield Services Include</h2>
      <ul>
        <li><strong>Damage Assessment:</strong> Expert evaluation to determine if repair or replacement is needed.</li>
        <li><strong>Chip Repair:</strong> Advanced resin filling for small chips to prevent spreading.</li>
        <li><strong>Full Windshield Replacement:</strong> Complete removal of damaged glass and installation of new windshield.</li>
        <li><strong>OEM Quality Glass:</strong> Using manufacturer-specified glass with proper thickness and specifications.</li>
        <li><strong>Professional Installation:</strong> Proper sealing and setting techniques to prevent leaks and wind noise.</li>
        <li><strong>ADAS Calibration:</strong> Recalibration of Advanced Driver Assistance Systems after windshield replacement when applicable.</li>
      </ul>
      
      <h2>Why Choose GaadiMech for Windshield Services in Jaipur?</h2>
      <ul>
        <li>Mobile service available throughout Jaipur</li>
        <li>Insurance claim assistance available</li>
        <li>High-quality glass meeting all safety standards</li>
        <li>Expert technicians with specialized tools</li>
        <li>Warranty on workmanship and materials</li>
      </ul>
      
      <h2>Related Services</h2>
      <p>If your vehicle was in an accident, you might also need our <a href="/services/denting" class="text-[#FF7200] hover:underline">car denting and painting services in Jaipur</a>. To ensure all systems are running properly after windshield replacement, consider our <a href="/services/periodic" class="text-[#FF7200] hover:underline">periodic maintenance service</a>.</p>
      
      <h2>Frequently Asked Questions About Windshield Services</h2>
      <div class="faq-item">
        <h3>Can a chipped windshield be repaired instead of replaced?</h3>
        <p>Small chips (less than 2 inches) and cracks (less than 6 inches) that are not in the driver's line of sight can often be repaired. Our technicians in Jaipur will assess the damage and recommend the best course of action.</p>
      </div>
      <div class="faq-item">
        <h3>How long does it take to replace a windshield in Jaipur?</h3>
        <p>The actual replacement process takes approximately 1-2 hours, but we recommend waiting 24 hours before driving to allow adhesives to fully cure for optimal safety.</p>
      </div>
      <div class="faq-item">
        <h3>Will my insurance cover windshield replacement in Jaipur?</h3>
        <p>Most comprehensive auto insurance policies cover windshield replacement. GaadiMech can help you navigate the insurance claim process for your convenience.</p>
      </div>
      <div class="faq-item">
        <h3>What happens if my car has ADAS features linked to the windshield?</h3>
        <p>Vehicles with Advanced Driver Assistance Systems require proper recalibration after windshield replacement. Our technicians in Jaipur are equipped to handle this specialized service.</p>
      </div>
    `,
    serviceCards: [
      {
        id: 'windshield-repair',
        title: 'Windshield Chip Repair',
        description: 'Professional repair for small chips and cracks to prevent spreading',
        image: 'https://i.ibb.co/3zcSYzf/Frame.png',
        rating: 4.7,
        reviewCount: 180,
        duration: '45-60 Mins',
        price: '₹X,XXX',
        details: [
          'Damage Assessment',
          'Advanced Resin Filling',
          'UV Light Curing',
          'Surface Polishing',
          'Safety Inspection',
          'Prevent Crack Spreading',
          'Cost-Effective Solution',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Windshield Chip Repair service for my car.'
      },
      {
        id: 'windshield-replacement',
        title: 'Complete Windshield Replacement',
        description: 'Full windshield replacement with OEM quality glass',
        image: 'https://i.ibb.co/3zcSYzf/Frame.png',
        rating: 4.8,
        reviewCount: 220,
        duration: '2-3 Hours',
        price: '₹X,XXX',
        isBestseller: true,
        details: [
          'OEM Quality Glass',
          'Professional Removal',
          'Perfect Installation',
          'Leak Testing',
          'Proper Sealing',
          'ADAS Calibration (if needed)',
          '1-Year Warranty',
          'Insurance Assistance',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Complete Windshield Replacement service for my car.'
      }
    ]
  },
  'detailing': {
    title: 'Professional Car Detailing Services in Jaipur',
    subtitle: 'Comprehensive Detailing Services to Make Your Car Look Brand New',
    description: `
      <h1>Professional Car Detailing Services in Jaipur</h1>
      <p>Want your car to look and feel like new again? GaadiMech offers premium car detailing services in Jaipur that go far beyond a regular car wash. Our comprehensive detailing packages include deep cleaning, polishing, and protection treatments for both exterior and interior, restoring your vehicle's showroom shine and preserving its value.</p>
      <p>Jaipur's climate, with its dust, heat, and occasional heavy rains, can take a toll on your vehicle's appearance. Our professional detailing services remove accumulated contaminants, correct minor paint imperfections, and apply protective treatments to shield your car from environmental damage.</p>
      
      <h2>What Our Car Detailing Service Includes</h2>
      <ul>
        <li><strong>Exterior Detailing:</strong> Clay bar treatment, paint correction, machine polishing, and protective wax or sealant application.</li>
        <li><strong>Interior Detailing:</strong> Deep cleaning of upholstery, carpet shampooing, leather conditioning, and dashboard treatment.</li>
        <li><strong>Engine Bay Cleaning:</strong> Careful degreasing and detailing of engine components for improved performance and aesthetics.</li>
        <li><strong>Wheel and Tire Detailing:</strong> Deep cleaning of wheels, wheel wells, and tire dressing for a complete look.</li>
        <li><strong>Glass Treatment:</strong> Special cleaning and water-repellent application for improved visibility.</li>
        <li><strong>Premium Coating Options:</strong> Ceramic coating and paint protection film for long-lasting shine and protection.</li>
      </ul>
      
      <h2>Why Choose GaadiMech for Car Detailing in Jaipur?</h2>
      <ul>
        <li>Specialized detailing technicians trained in latest techniques</li>
        <li>Premium-grade products and equipment</li>
        <li>Customizable packages to suit your needs and budget</li>
        <li>Convenient service options across Jaipur</li>
        <li>Attention to every detail for exceptional results</li>
      </ul>
      
      <h2>Frequently Asked Questions About Car Detailing</h2>
      <div class="faq-item">
        <h3>How is car detailing different from a car wash?</h3>
        <p>Car washing primarily removes surface dirt, while detailing is a comprehensive process that includes deep cleaning, defect correction, and protection. Detailing restores your car's appearance to like-new condition both inside and out.</p>
      </div>
      <div class="faq-item">
        <h3>How often should I get my car detailed in Jaipur?</h3>
        <p>For optimal results in Jaipur's climate, we recommend a full detailing service every 3-4 months, with more frequent exterior maintenance during dusty seasons.</p>
      </div>
      <div class="faq-item">
        <h3>How long does professional car detailing take?</h3>
        <p>A standard full detailing service typically takes 4-8 hours depending on your vehicle's size and condition. Premium services like ceramic coating may require additional time.</p>
      </div>
      <div class="faq-item">
        <h3>What is ceramic coating and is it worth it for Jaipur's climate?</h3>
        <p>Ceramic coating creates a permanent bond with your car's paint, providing superior protection against UV rays, chemical stains, and oxidation. It's particularly beneficial in Jaipur's harsh sun and dusty environment, maintaining your car's appearance for years.</p>
      </div>
    `,
    serviceCards: [
      {
        id: 'detailing-basic',
        title: 'Premium Car Detailing',
        description: 'Comprehensive exterior and interior detailing for a showroom finish',
        image: 'https://i.ibb.co/4K1YZ6S/detailing.png',
        rating: 4.9,
        reviewCount: 280,
        duration: '4-6 Hours',
        price: '₹X,XXX',
        isBestseller: true,
        details: [
          'Exterior Clay Bar Treatment',
          'Paint Correction & Polish',
          'Interior Deep Cleaning',
          'Leather Conditioning',
          'Wheel & Tire Detailing',
          'Engine Bay Cleaning',
          'Glass Treatment',
          'Protective Wax Application',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Premium Car Detailing service for my car.'
      },
      {
        id: 'detailing-ceramic',
        title: 'Ceramic Coating Package',
        description: 'Professional ceramic coating for ultimate paint protection',
        image: 'https://i.ibb.co/4K1YZ6S/detailing.png',
        rating: 4.8,
        reviewCount: 150,
        duration: '6-8 Hours',
        price: '₹X,XXX',
        details: [
          'Paint Decontamination',
          'Multi-Stage Paint Correction',
          '2-Year Ceramic Coating',
          'Interior Protection',
          'Wheel Coating',
          'UV Protection',
          'Hydrophobic Effect',
          'Extended Warranty',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Ceramic Coating Package for my car.'
      }
    ]
  },
  'tyre': {
    title: 'Professional Tyre Services & Wheel Alignment in Jaipur',
    subtitle: 'Expert Tyre Repair, Replacement and Maintenance Services',
    description: `
      <h1>Professional Tyre Services & Wheel Alignment in Jaipur</h1>
      <p>Are your tyres showing signs of wear or damage? GaadiMech delivers comprehensive tyre services in Jaipur including replacement, rotation, balancing, and wheel alignment. Our mobile tyre services bring expert technicians to your location with all the necessary equipment to keep your vehicle running safely and efficiently.</p>
      <p>Properly maintained tyres are crucial for safety, fuel efficiency, and vehicle handling, especially on Jaipur's varied road conditions. Our professional tyre services help extend the life of your tyres while ensuring optimal performance and preventing costly vehicle damage caused by worn or improperly aligned tyres.</p>
      
      <h2>What Our Tyre Services Include</h2>
      <ul>
        <li><strong>Tyre Replacement:</strong> Supply and installation of new tyres from leading brands suited to your vehicle and driving needs.</li>
        <li><strong>Wheel Balancing:</strong> Precision balancing to eliminate vibration and ensure even tyre wear.</li>
        <li><strong>Wheel Alignment:</strong> Computer-assisted alignment to correct suspension angles for proper handling and tyre longevity.</li>
        <li><strong>Tyre Rotation:</strong> Regular rotation to ensure even wear across all tyres.</li>
        <li><strong>Puncture Repair:</strong> Professional repair of punctures and minor damages where safe to do so.</li>
        <li><strong>Tyre Pressure Monitoring:</strong> Checking and adjusting pressure to recommended levels for safety and efficiency.</li>
      </ul>
      
      <h2>Why Choose GaadiMech for Tyre Services in Jaipur?</h2>
      <ul>
        <li>Mobile service that comes to your location</li>
        <li>Wide range of quality tyre brands at competitive prices</li>
        <li>State-of-the-art wheel alignment and balancing equipment</li>
        <li>Expert advice on tyre selection for your specific vehicle</li>
        <li>Quick service with professional installation</li>
      </ul>
      
      <h2>Frequently Asked Questions About Tyre Services</h2>
      <div class="faq-item">
        <h3>How do I know when I need new tyres?</h3>
        <p>Signs include tread depth below 1.6mm, visible damage or bulges, uneven wear patterns, frequent loss of pressure, and excessive vibration while driving. Our technicians can perform a thorough inspection in Jaipur.</p>
      </div>
      <div class="faq-item">
        <h3>How often should I get wheel alignment done in Jaipur?</h3>
        <p>We recommend wheel alignment every 10,000 km or when you notice uneven tyre wear, vehicle pulling to one side, or off-center steering wheel. Jaipur's roads with speed bumps and potholes can affect alignment more frequently.</p>
      </div>
      <div class="faq-item">
        <h3>What tyre brands do you offer in Jaipur?</h3>
        <p>We provide tyres from premium brands like MRF, Apollo, Bridgestone, Michelin, JK, CEAT, and Goodyear, with options to suit different vehicles and budget requirements.</p>
      </div>
      <div class="faq-item">
        <h3>Can you repair a punctured tyre at my location in Jaipur?</h3>
        <p>Yes, our mobile tyre service can repair punctures at your location in Jaipur, provided the damage is within repairable limits. For safety reasons, some types of damage require tyre replacement.</p>
      </div>
    `,
    serviceCards: [
      {
        id: 'tyre-replacement',
        title: 'Tyre Replacement',
        description: 'Professional tyre replacement with premium brands',
        image: 'https://i.ibb.co/BCGXS2Q/tyre.png',
        rating: 4.7,
        reviewCount: 190,
        duration: '1-2 Hours',
        price: '₹X,XXX/Tyre',
        isBestseller: true,
        details: [
          'Premium Brand Tyres',
          'Expert Installation',
          'Wheel Balancing',
          'Pressure Check',
          'Old Tyre Disposal',
          'Mobile Service Available',
          'Wide Brand Selection',
          'Professional Advice',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Tyre Replacement service for my car.'
      },
      {
        id: 'wheel-alignment',
        title: 'Wheel Alignment & Balancing',
        description: 'Computer-assisted wheel alignment and precision balancing',
        image: 'https://i.ibb.co/BCGXS2Q/tyre.png',
        rating: 4.8,
        reviewCount: 250,
        duration: '45-90 Mins',
        price: '₹X,XXX',
        details: [
          'Computer-Assisted Alignment',
          'Precision Wheel Balancing',
          'Tyre Rotation',
          'Pressure Adjustment',
          'Suspension Check',
          'Extended Tyre Life',
          'Improved Fuel Efficiency',
          'Better Vehicle Handling',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Wheel Alignment & Balancing service for my car.'
      }
    ]
  },
  'carspa': {
    title: 'Premium Car Spa & Cleaning Services in Jaipur',
    subtitle: 'Professional Car Spa Services for a Fresh and Clean Vehicle',
    description: `
      <h1>Premium Car Spa & Cleaning Services in Jaipur</h1>
      <p>Give your car the pampering it deserves with GaadiMech's professional car spa services in Jaipur. Our specialized cleaning treatments go beyond regular washing to deeply clean, refresh, and protect both your car's exterior and interior, leaving it looking and smelling like new again.</p>
      <p>Jaipur's dusty environment can quickly affect your vehicle's appearance. Our comprehensive car spa services remove accumulated dirt, grime, and pollutants while applying protective treatments that help maintain your car's cleanliness and appearance for longer periods.</p>
      
      <h2>What Our Car Spa Services Include</h2>
      <ul>
        <li><strong>Exterior Foam Wash:</strong> Gentle yet effective foam cleaning that lifts dirt without scratching paint.</li>
        <li><strong>Interior Vacuum & Cleaning:</strong> Deep vacuuming and cleaning of all interior surfaces including hard-to-reach areas.</li>
        <li><strong>Dashboard & Plastic Treatment:</strong> Cleaning and applying UV protection to prevent cracking and fading.</li>
        <li><strong>Seat Cleaning:</strong> Specialized cleaning for fabric, leather, or vinyl seats with appropriate conditioners.</li>
        <li><strong>Glass Treatment:</strong> Streak-free cleaning of all windows and mirrors for optimal visibility.</li>
        <li><strong>Tyre & Rim Cleaning:</strong> Thorough cleaning and dressing of tyres and wheel rims.</li>
        <li><strong>Engine Bay Cleaning:</strong> Careful cleaning of engine compartment to remove oil and dirt buildup.</li>
        <li><strong>Odor Elimination:</strong> Treatment to remove unpleasant odors and leave your car smelling fresh.</li>
      </ul>
      
      <h2>Why Choose GaadiMech for Car Spa in Jaipur?</h2>
      <ul>
        <li>Doorstep service available across Jaipur</li>
        <li>Premium cleaning products that are gentle on surfaces</li>
        <li>Expert technicians trained in proper cleaning techniques</li>
        <li>Water-conserving methods suitable for Jaipur's environment</li>
        <li>Attention to detail for a truly comprehensive clean</li>
      </ul>
      
      <h2>Frequently Asked Questions About Car Spa Services</h2>
      <div class="faq-item">
        <h3>How often should I get a car spa service in Jaipur?</h3>
        <p>For vehicles in Jaipur, we recommend a professional car spa service every 4-6 weeks to maintain cleanliness, particularly during dusty seasons when exterior and interior surfaces accumulate dirt more quickly.</p>
      </div>
      <div class="faq-item">
        <h3>How long does a full car spa service take?</h3>
        <p>A standard car spa service takes approximately 2-3 hours to complete, while our premium packages with additional treatments may take 3-4 hours for thorough cleaning and protection.</p>
      </div>
      <div class="faq-item">
        <h3>Will the car spa treatment damage my car's paint or interior?</h3>
        <p>No, our car spa services use pH-balanced, automotive-grade products that are safe for all surfaces. Our technicians are trained to use appropriate cleaning methods for different materials in your vehicle.</p>
      </div>
      <div class="faq-item">
        <h3>How is your car spa different from a regular car wash in Jaipur?</h3>
        <p>Unlike standard car washes that focus only on exterior cleaning, our car spa service provides comprehensive care for both exterior and interior, including specialized treatments, protective coating application, and attention to details that normal car washes miss.</p>
      </div>
    `,
    serviceCards: [
      {
        id: 'carspa-basic',
        title: 'Premium Car Spa',
        description: 'Complete exterior and interior spa treatment for your vehicle',
        image: 'https://i.ibb.co/6Rz8LTk/car-spa.png',
        rating: 4.8,
        reviewCount: 320,
        duration: '2-3 Hours',
        price: '₹X,XXX',
        isBestseller: true,
        details: [
          'Exterior Foam Wash',
          'Interior Deep Cleaning',
          'Dashboard Treatment',
          'Seat Conditioning',
          'Glass Treatment',
          'Tyre & Rim Cleaning',
          'Engine Bay Cleaning',
          'Odor Elimination',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Premium Car Spa service for my car.'
      },
      {
        id: 'carspa-express',
        title: 'Express Car Wash',
        description: 'Quick and efficient cleaning for busy schedules',
        image: 'https://i.ibb.co/6Rz8LTk/car-spa.png',
        rating: 4.6,
        reviewCount: 180,
        duration: '45-60 Mins',
        price: '₹X,XXX',
        details: [
          'Exterior Wash & Dry',
          'Interior Vacuuming',
          'Dashboard Wipe',
          'Glass Cleaning',
          'Tyre Cleaning',
          'Quick Service',
          'Water-Conserving',
          'Eco-Friendly Products',
        ],
        whatsappMessage: 'Hi, I\'d like to book an Express Car Wash service for my car.'
      }
    ]
  }
};

export default servicesData; 