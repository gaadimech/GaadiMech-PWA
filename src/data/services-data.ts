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
  details: string[];
  whatsappMessage: string;
}

export interface ServiceTypeData {
  title: string;
  subtitle: string;
  serviceCards: ServiceCard[];
}

// Central data store for all service cards organized by service type
const servicesData: Record<ServiceType, ServiceTypeData> = {
  'periodic': {
    title: 'Car Periodic Service',
    subtitle: 'Keep your car running smoothly with our expert maintenance services',
    serviceCards: [
      {
        id: 'periodic-basic',
        title: 'Periodic Service',
        description: 'Complete inspection and maintenance for your vehicle',
        image: 'https://i.ibb.co/t4HmbHZ/Group.png',
        rating: 4.5,
        reviewCount: 570,
        duration: '4-5 Hours',
        price: '₹X,XXX',
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
      },
      {
        id: 'periodic-express',
        title: 'Express Service',
        description: 'Ultra Fast Car Service - Time is Money!',
        image: 'https://i.ibb.co/t4HmbHZ/Group.png',
        rating: 4.8,
        reviewCount: 190,
        duration: '90 Mins!',
        price: '₹X,XXX',
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
      }
    ]
  },
  'denting': {
    title: 'Car Denting & Painting',
    subtitle: 'Expert denting and painting services to make your car look brand new',
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
    subtitle: 'Get your car AC working at peak performance with our expert services',
    serviceCards: [
      {
        id: 'ac-regular',
        title: 'Express AC Gas Refilling',
        description: 'Maintenance service for your car AC system',
        image: 'https://i.ibb.co/hVP6Phg/ac-service.png',
        rating: 4.6,
        reviewCount: 320,
        duration: '45-60 Mins',
        price: '₹1,999',
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
        price: '₹3,999',
        details: [
          'AC Gas Refill (up to 400gms)',
          'Leak Detection',
          'Condenser Cleaning',
          'Compressor Inspection',
          'AC Filter Cleaning',
          'Cooling Coil Servicing (Includes Dashboard Removing Refitting)',
          'Compressor Oil Top-up',
        ],
        whatsappMessage: 'Hi, I\'d like to book an AC Repair Service for my car.'
      }
    ]
  },
  // Add more service types as needed
};

export default servicesData; 