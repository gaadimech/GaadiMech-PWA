export type ServiceType = 'periodic' | 'denting' | 'ac' | 'battery' | 'windshield' | 'detailing' | 'tyre' | 'carspa';

export interface Vehicle {
  manufacturer: string;
  model: string;
  fuelType: string;
}

export interface PricingData {
  periodicServicePrice: number;
  expressServicePrice: number;
  dentingPaintPrice: number;
}

export interface ServiceTypeOption {
  value: ServiceType;
  label: string;
} 