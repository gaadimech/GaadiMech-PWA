import { ServiceType } from '../types/services';

// Service category interface
export interface DoorstepServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  availability: string;
}

// Service interface
export interface DoorstepService {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  isEmergency: boolean;
  image?: string;
  features: string[];
}

// Service Categories
export const SERVICE_CATEGORIES: Record<string, DoorstepServiceCategory> = {
  EMERGENCY: {
    id: 'EMERGENCY',
    name: 'Emergency Services',
    icon: '/images/doorstep-services/emergency.jpg',
    description: '24/7 emergency car repair services at your location',
    availability: '24/7'
  },
  MAINTENANCE: {
    id: 'MAINTENANCE',
    name: 'Car Maintenance',
    icon: '/images/doorstep-services/maintenance.jpg',
    description: 'Regular maintenance and servicing for your vehicle',
    availability: '8 AM - 8 PM'
  },
  INSPECTION: {
    id: 'INSPECTION',
    name: 'Inspection & Diagnostic',
    icon: '/images/doorstep-services/inspection.jpg',
    description: 'Comprehensive vehicle inspection and diagnostics',
    availability: '9 AM - 6 PM'
  },
  CLEANING: {
    id: 'CLEANING',
    name: 'Car Cleaning & Spa',
    icon: '/images/doorstep-services/car-spa.jpg',
    description: 'Professional car cleaning and detailing services',
    availability: '8 AM - 7 PM'
  },
  AC_SERVICE: {
    id: 'AC_SERVICE',
    name: 'AC & Seasonal Service',
    icon: '/images/doorstep-services/ac-service.jpg',
    description: 'Car AC repair and seasonal maintenance',
    availability: '9 AM - 6 PM'
  },
  REPAIRS: {
    id: 'REPAIRS',
    name: 'Doorstep Repairs',
    icon: '/images/doorstep-services/doorstep-repair.jpg',
    description: 'Professional repair services at your doorstep',
    availability: '8 AM - 8 PM'
  }
};

// Helper function to get services by category
export const getServicesByCategory = (categoryId: string): DoorstepService[] => {
  // Return services filtered by category ID
  return SERVICES.filter(service => service.categoryId === categoryId);
};

// Helper function to get service by ID
export const getServiceById = (serviceId: string): DoorstepService | undefined => {
  return SERVICES.find(service => service.id === serviceId);
};

// Services Data
export const SERVICES: DoorstepService[] = [
  // Emergency Services
  {
    id: 'jump-start',
    categoryId: 'EMERGENCY',
    name: 'Jump Start',
    description: 'Dead battery? We\'ll jump-start your car quickly using portable boosters.',
    price: 299,
    duration: '15-30 mins',
    rating: 4.8,
    isEmergency: true,
    image: '/images/doorstep-services/Jump Start.jpg',
    features: [
      'Immediate response',
      'Portable battery',
      'Battery health check',
      'Charging diagnosis'
    ]
  },
  {
    id: 'tyre-stepney-change',
    categoryId: 'EMERGENCY',
    name: 'Tyre Stepney Change',
    description: 'On-spot puncture sealing and air refill for flat tyres.',
    price: 299,
    duration: '20-30 mins',
    rating: 4.7,
    isEmergency: true,
    image: '/images/doorstep-services/Tyre Change.jpg',
    features: [
      'Puncture sealing',
      'Air refill',
      'Tyre pressure check',
      'Stepney installation'
    ]
  },
  {
    id: 'emergency-fuel-delivery',
    categoryId: 'EMERGENCY',
    name: 'Emergency Fuel Delivery',
    description: 'Ran out of fuel? We\'ll deliver petrol or diesel to your location.',
    price: 499,
    duration: '30-60 mins',
    rating: 4.6,
    isEmergency: true,
    image: '/images/doorstep-services/Fuel Delivery.jpg',
    features: [
      'Up to 5L fuel',
      'Location within city',
      'quality assurance',
      'Quick response'
    ]
  },
  {
    id: 'overheating-assistance',
    categoryId: 'EMERGENCY',
    name: 'Overheating Assistance',
    description: 'Coolant refill & basic diagnostic for engine overheating.',
    price: 499,
    duration: '30-45 mins',
    rating: 4.7,
    isEmergency: true,
    image: '/images/doorstep-services/Over Heating.jpg',
    features: [
      'Coolant level check',
      'Basic diagnostic',
      'Temperature monitoring',
      'Cooling inspection'
    ]
  },

  // Routine Maintenance Services
  {
    id: 'oil-filter-change',
    categoryId: 'MAINTENANCE',
    name: 'Quick Oil & Filter Change',
    description: 'Fast engine oil replacement with filter at your location.',
    price: 799,
    duration: '45-60 mins',
    rating: 4.8,
    isEmergency: false,
    image: '/images/doorstep-services/Oil Change.jpg',
    features: [
      'Premium engine oil',
      'New oil filter',
      'Oil level check',
      'Basic inspection'
    ]
  },
  {
    id: 'battery-replacement',
    categoryId: 'MAINTENANCE',
    name: 'Battery Replacement',
    description: 'Delivery & installation of new car battery with old battery pickup.',
    price: 999,
    duration: '30-45 mins',
    rating: 4.9,
    isEmergency: false,
    image: '/images/doorstep-services/Battery Replacement.jpg',
    features: [
      '24-month warranty',
      'Old battery disposal',
      'Terminal cleaning',
      'Charging system check'
    ]
  },
  {
    id: 'coolant-topup',
    categoryId: 'MAINTENANCE',
    name: 'Coolant Top-up',
    description: 'Engine coolant level check and refill with recommended fluid.',
    price: 399,
    duration: '20-30 mins',
    rating: 4.7,
    isEmergency: false,
    image: '/images/doorstep-services/Coolant Topup.jpg',
    features: [
      'Coolant level check',
      'Recommended fluid',
      'System inspection',
      'Temperature check'
    ]
  },

  // Inspection & Diagnostic Services
  {
    id: 'engine-scanning',
    categoryId: 'INSPECTION',
    name: 'Engine Scanning (OBD)',
    description: 'Plug-in OBD scan to detect engine issues or warning lights.',
    price: 699,
    duration: '30-40 mins',
    rating: 4.8,
    isEmergency: false,
    image: '/images/doorstep-services/Engine OBD Scanning.jpg',
    features: [
      'Live scan report',
      'Error code reading',
      'Basic troubleshooting',
      'Performance analysis'
    ]
  },
  {
    id: 'used-car-inspection',
    categoryId: 'INSPECTION',
    name: 'Used Car Inspection',
    description: '30-point check before buying a used car.',
    price: 1499,
    duration: '60-90 mins',
    rating: 4.9,
    isEmergency: false,
    image: '/images/doorstep-services/Used Car Inspection.jpg',
    features: [
      'Comprehensive report',
      '30-point checklist',
      'Test drive assessment',
      'Value estimation'
    ]
  },

  // Cleaning & Detailing Services
  {
    id: 'quick-vacuum',
    categoryId: 'CLEANING',
    name: 'Quick Vacuum (Interior)',
    description: 'Basic vacuum cleaning of seats, mats & floors.',
    price: 299,
    duration: '20-30 mins',
    rating: 4.6,
    isEmergency: false,
    image: '/images/doorstep-services/Interior Vacuuming.jpg',
    features: [
      'Seat cleaning',
      'Floor cleaning',
      'Mat cleaning',
      'Boot cleaning'
    ]
  },
  {
    id: 'dry-cleaning-interior',
    categoryId: 'CLEANING',
    name: 'Dry Cleaning - Interior Only',
    description: 'Deep interior seat shampooing & dashboard sanitization.',
    price: 1299,
    duration: '90-120 mins',
    rating: 4.8,
    isEmergency: false,
    image: '/images/doorstep-services/Interior Drycleaning.jpg',
    features: [
      'Seat shampooing',
      'Dashboard cleaning',
      'Interior sanitization',
      'Odor treatment'
    ]
  },

  // AC & Seasonal Services
  {
    id: 'ac-gas-topup',
    categoryId: 'AC_SERVICE',
    name: 'AC Gas Top-Up',
    description: 'Recharge refrigerant for effective cooling.',
    price: 1499,
    duration: '60-90 mins',
    rating: 4.8,
    isEmergency: false,
    image: '/images/doorstep-services/AC Gas Refill.jpg',
    features: [
      'Gas refill',
      'Cooling check',
      'Performance test',
      'System inspection'
    ]
  },
  {
    id: 'ac-filter-service',
    categoryId: 'AC_SERVICE',
    name: 'AC Filter Cleaning / Replacement',
    description: 'Clean or replace cabin filters to improve air quality.',
    price: 699,
    duration: '30-45 mins',
    rating: 4.7,
    isEmergency: false,
    image: '/images/doorstep-services/AC Filter.jpg',
    features: [
      'Filter inspection',
      'Deep cleaning',
      'Replacement if needed',
      'Air quality check'
    ]
  },

  // Doorstep Repairs
  {
    id: 'horn-replacement',
    categoryId: 'REPAIRS',
    name: 'Horn Replacement',
    description: 'Repair or install car horn with new unit.',
    price: 499,
    duration: '20-30 mins',
    rating: 4.6,
    isEmergency: false,
    image: '/images/doorstep-services/Horn Replacement.jpg',
    features: [
      'Horn unit replacement',
      'Wiring check',
      'Sound testing',
      'Quality assurance'
    ]
  },
  {
    id: 'number-plate-fitting',
    categoryId: 'REPAIRS',
    name: 'Number Plate Fitting',
    description: 'Replacement or re-mounting of loose plates.',
    price: 299,
    duration: '20 mins',
    rating: 4.7,
    isEmergency: false,
    image: '/images/doorstep-services/Number Plate Fitting.jpg',
    features: [
      'Secure mounting',
      'Standard plates',
      'Quick installation',
      'Quality check'
    ]
  }
];

// Helper function to format price
export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
}; 