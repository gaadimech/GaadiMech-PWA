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
    title: 'Car Periodic Service',
    subtitle: 'Keep Your Car Running Smoothly With Our Expert Maintenance Services',
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
    title: 'Car Denting & Painting',
    subtitle: 'Expert Denting and Painting Services to Make Your Car Look Brand New',
    serviceCards: [
      {
        id: 'denting-door',
        title: 'Express Dent & Paint',
        description: 'Professional painting service for car doors',
        image: 'https://i.ibb.co/qjZBrnD/dent-and-paint.png',
        rating: 4.4,
        reviewCount: 250,
        duration: '4-6 Hours',
        price: '₹X,XXX/Panel',
        details: [
          '2 Year Warranty',
          '100% Colour Match',
          'Panel Rubbing and Polishing',
          'Grade A Primer',
          'High Quality Paint',
        ],
        whatsappMessage: 'Hi, I\'d like to book a Express Dent & Paint service for my car.'
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
    title: 'Car AC Service & Repair',
    subtitle: 'Get Your Car AC Working at Peak Performance With Our Expert Services',
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
  // Add more service types as needed
  'battery': {
    title: 'Car Battery Replacement',
    subtitle: 'Professional Battery Replacement Services for Your Vehicle',
    serviceCards: []
  },
  'windshield': {
    title: 'Windshield Replacement & Repair',
    subtitle: 'Expert Windshield Services to Ensure Safety and Visibility',
    serviceCards: []
  },
  'detailing': {
    title: 'Car Detailing Services',
    subtitle: 'Comprehensive Detailing Services to Make Your Car Look Brand New',
    serviceCards: []
  },
  'tyre': {
    title: 'Tyre Services',
    subtitle: 'Professional Tyre Repair, Replacement and Maintenance Services',
    serviceCards: []
  },
  'carspa': {
    title: 'Car Spa & Cleaning',
    subtitle: 'Premium Car Spa Services for a Fresh and Clean Vehicle',
    serviceCards: []
  }
};

export default servicesData; 