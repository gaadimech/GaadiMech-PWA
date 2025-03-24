import Papa from 'papaparse';
import { Vehicle, PricingData } from '../types/services';

interface CSVRow {
  FuelType: string;
  'Car Brand': string;
  'Car Model': string;
  'Periodic Service Price GaadiMech': string;
  'Express Service Price GaadiMech': string;
  'Dent & Paint Price GaadiMech': string;
  'Dent and Paint Full Body': string;
}

// Format price as Indian currency
export const formatPrice = (price: number | string): string => {
  if (!price) return '₹X,XXX';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numPrice).replace('₹', '₹');
};

// Parse CSV data
export const parseCSVData = async (): Promise<CSVRow[]> => {
  try {
    const response = await fetch('/GM Pricing March Website Usage -Final.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse<CSVRow>(csvText, {
        header: true,
        complete: (results) => resolve(results.data),
        error: (error: Error) => reject(error),
      });
    });
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    return [];
  }
};

// Get manufacturers from CSV data
export const getManufacturers = (data: CSVRow[]): string[] => {
  const manufacturers = new Set<string>();
  data.forEach(row => manufacturers.add(row['Car Brand']));
  return Array.from(manufacturers).sort();
};

// Get models for a specific manufacturer
export const getModelsByManufacturer = (data: CSVRow[], manufacturer: string): string[] => {
  const models = new Set<string>();
  data.filter(row => row['Car Brand'] === manufacturer)
    .forEach(row => models.add(row['Car Model']));
  return Array.from(models).sort();
};

// Get fuel types for a specific manufacturer and model
export const getFuelTypes = (data: CSVRow[], manufacturer: string, model: string): string[] => {
  const fuelTypes = new Set<string>();
  data.filter(row => 
    row['Car Brand'] === manufacturer && 
    row['Car Model'] === model &&
    // Ensure the row has at least one valid pricing data field
    (
      parseFloat(row['Periodic Service Price GaadiMech'] || '0') > 0 ||
      parseFloat(row['Express Service Price GaadiMech'] || '0') > 0 ||
      parseFloat(row['Dent & Paint Price GaadiMech'] || '0') > 0
    )
  ).forEach(row => fuelTypes.add(row.FuelType));
  return Array.from(fuelTypes).sort();
};

// Get pricing data for a specific vehicle
export const getPricingData = (data: CSVRow[], vehicle: Vehicle): PricingData | null => {
  const row = data.find(row => 
    row.FuelType.toLowerCase() === vehicle.fuelType.toLowerCase() &&
    row['Car Brand'].toLowerCase() === vehicle.manufacturer.toLowerCase() &&
    row['Car Model'].toLowerCase() === vehicle.model.toLowerCase()
  );
  
  if (!row) return null;
  
  return {
    periodicServicePrice: parseFloat(row['Periodic Service Price GaadiMech']),
    expressServicePrice: parseFloat(row['Express Service Price GaadiMech']),
    dentingPaintPrice: parseFloat(row['Dent & Paint Price GaadiMech']),
    fullBodyPaintPrice: parseFloat(row['Dent and Paint Full Body']),
  };
};

// Store selected vehicle in session storage
export const saveVehicleToSession = (vehicle: Vehicle): void => {
  sessionStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
};

// Get selected vehicle from session storage
export const getVehicleFromSession = (): Vehicle | null => {
  const vehicleData = sessionStorage.getItem('selectedVehicle');
  if (!vehicleData) return null;
  
  try {
    return JSON.parse(vehicleData) as Vehicle;
  } catch (error) {
    console.error('Error parsing vehicle data from session storage:', error);
    return null;
  }
};

// Remove vehicle from session storage
export const clearVehicleFromSession = (): void => {
  sessionStorage.removeItem('selectedVehicle');
}; 