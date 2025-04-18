export type ServiceType = 'periodic' | 'denting' | 'ac' | 'battery' | 'windshield' | 'detailing' | 'tyre' | 'carspa';

export interface Vehicle {
  manufacturer: string;
  model: string;
  fuelType: string;
}

export interface PricingData {
  periodicServicePrice: number;
  expressServicePrice: number;
  discountedExpressPrice: number;
  dentingPaintPrice: number;
  fullBodyPaintPrice: number;
  acServicePrice: number;
}

export interface ServiceTypeOption {
  value: ServiceType;
  label: string;
} 