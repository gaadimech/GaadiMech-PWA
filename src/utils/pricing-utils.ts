import Papa from 'papaparse';
import { Vehicle, PricingData } from '../types/services';

interface CSVRow {
  FuelType: string;
  'Car Brand': string;
  'Car Model': string;
  'Periodic Service Price GaadiMech': string;
  'Express Service Price GaadiMech': string;
  'Discounted Price': string;
  'Comprehensive Service Price GaadiMech': string;
  'Dent & Paint Price GaadiMech': string;
  'Dent and Paint Full Body': string;
  'AC Service': string;
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
      // Parse the CSV file
      const results = Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
      });
      
      if (results.data && Array.isArray(results.data) && results.data.length > 0) {
        // Convert array data to objects with proper field names
        const rows: CSVRow[] = [];
        const data = results.data as string[][];
        
        // Skip the header row if it exists
        const startIndex = data[0][0] === 'FuelType' ? 1 : 0;
        
        for (let i = startIndex; i < data.length; i++) {
          const row = data[i];
          if (row.length >= 9) {
            rows.push({
              'FuelType': row[0],
              'Car Brand': row[1],
              'Car Model': row[2],
              'Periodic Service Price GaadiMech': row[3],
              'Express Service Price GaadiMech': row[4],
              'Discounted Price': row[5],
              'Comprehensive Service Price GaadiMech': row[6],
              'Dent & Paint Price GaadiMech': row[7],
              'Dent and Paint Full Body': row[8],
              'AC Service': row[9] || ''
            });
          }
        }
        
        resolve(rows);
      } else {
        reject(new Error('Failed to parse CSV data'));
      }
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
      parseFloat(row['Discounted Price'] || '0') > 0 ||
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
    // Periodic Service price from column 4
    periodicServicePrice: parseFloat(row['Periodic Service Price GaadiMech']) || 0,
    
    // Express Service price from column 5
    expressServicePrice: parseFloat(row['Express Service Price GaadiMech']) || 0,
    
    // Discounted Express Service price from column 6
    discountedExpressPrice: parseFloat(row['Discounted Price']) || 0,
    
    // Express Dent & Paint price from column 8 (Dent & Paint Price GaadiMech)
    dentingPaintPrice: parseFloat(row['Dent & Paint Price GaadiMech']) || 0,
    
    // Full Body Paint price from column 9 (Dent and Paint Full Body)
    fullBodyPaintPrice: parseFloat(row['Dent and Paint Full Body']) || 0,
    
    // AC Service price from column 10
    acServicePrice: parseFloat(row['AC Service']) || 0,
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