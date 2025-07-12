import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Tag, Droplet, CheckCircle } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';
import { saveVehicleToSession, getVehicleFromSession } from '../utils/pricing-utils';
import { useUser } from '../contexts/UserContext';

interface CarSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (brand: string, model: string, fuelType: string, price: number) => void;
  mobileNumber: string;
  leadId?: number;
}

interface CarPricing {
  brand: string;
  model: string;
  fuelType: string;
  expressServicePrice: number;
}

const CarSelectionModal: React.FC<CarSelectionModalProps> = ({ isOpen, onClose, onSubmit, mobileNumber, leadId }) => {
  const { user, addCar, isAuthenticated } = useUser();
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [carBrands, setCarBrands] = useState<string[]>([]);
  const [carModels, setCarModels] = useState<string[]>([]);
  const [availableFuelTypes, setAvailableFuelTypes] = useState<string[]>([]);
  const [pricingData, setPricingData] = useState<CarPricing[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Check for saved vehicle when modal opens
      const savedVehicle = getVehicleFromSession();
      if (savedVehicle) {
        setSelectedBrand(savedVehicle.manufacturer);
        // The models and fuel types will be populated in subsequent effects
      }
    }
  }, [isOpen]);

  useEffect(() => {
    // Load car pricing data from CSV
    const loadPricingData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching CSV file...');
        // Add cache-busting parameter to ensure a fresh copy is downloaded
        const cacheBuster = new Date().getTime();
        const response = await fetch(`/GM Pricing March Website Usage -Final.csv?v=${cacheBuster}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
        
        const csvText = await response.text();
        console.log('CSV fetched, parsing data...');
        
        // Parse CSV - properly handle the newline in headers
        const lines = csvText.split('\n');
        
        // The headers might span multiple lines due to an error in the CSV
        // Join the first two lines to handle the newline in the "Comprehensive Service Price" column
        const headersText = lines[0] + (lines[1] || '');
        const headers = headersText.split(',').map(h => h.trim());
        
        console.log('Headers found:', headers);
        
        // Updated column names to match the actual CSV
        const fuelTypeIndex = headers.findIndex(h => h === 'FuelType');
        const brandIndex = headers.findIndex(h => h === 'Car Brand');
        const modelIndex = headers.findIndex(h => h === 'Car Model');
        const priceIndex = headers.findIndex(h => h.includes('Express Service Price'));
        
        console.log('Column indices:', { fuelTypeIndex, brandIndex, modelIndex, priceIndex });
        
        if (fuelTypeIndex === -1 || brandIndex === -1 || modelIndex === -1 || priceIndex === -1) {
          console.error('CSV header format is invalid.', { 
            headers,
            fuelTypeIndex,
            brandIndex,
            modelIndex, 
            priceIndex,
            headersText
          });
          throw new Error(`CSV format is invalid. Missing required columns. FuelType: ${fuelTypeIndex}, Car Brand: ${brandIndex}, Car Model: ${modelIndex}, Express Service Price: ${priceIndex}`);
        }
        
        const data: CarPricing[] = [];
        const brands = new Set<string>();
        
        // Start from line 2 as headers might span lines 0 and 1
        for (let i = 2; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',');
          if (values.length <= Math.max(fuelTypeIndex, brandIndex, modelIndex, priceIndex)) continue;
          
          const fuelType = values[fuelTypeIndex].trim().toLowerCase();
          const brand = values[brandIndex].trim();
          const model = values[modelIndex].trim();
          // Handle potential spaces in the price column
          const priceStr = values[priceIndex].trim().replace(/[^\d.]/g, ''); // Remove any non-numeric characters except decimal point
          const price = parseFloat(priceStr);
          
          if (brand && model && fuelType && !isNaN(price) && price > 0) {
            data.push({ brand, model, fuelType, expressServicePrice: price });
            brands.add(brand);
          }
        }
        
        console.log(`Parsed ${data.length} car entries with ${brands.size} unique brands`);
        
        if (data.length === 0) {
          throw new Error('No valid data found in CSV');
        }
        
        setPricingData(data);
        setCarBrands(Array.from(brands).sort());
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading pricing data:', error);
        setError('Failed to load car data. Please try again later or contact customer support.');
        setIsLoading(false);
      }
    };
    
    if (isOpen) {
      loadPricingData();
    }
  }, [isOpen]);

  // Update models when brand changes or when CSV data loads
  useEffect(() => {
    if (selectedBrand && pricingData.length > 0) {
      // Find all models for the selected brand
      const models = Array.from(new Set(
        pricingData
          .filter(item => item.brand.toLowerCase() === selectedBrand.toLowerCase())
          .map(item => item.model)
      )).sort();
      
      setCarModels(models);
      
      // If we had a saved vehicle, try to select its model now that we have the models list
      const savedVehicle = getVehicleFromSession();
      if (savedVehicle && 
          savedVehicle.manufacturer.toLowerCase() === selectedBrand.toLowerCase() && 
          !selectedModel) {
        // Find the model in our list that matches the saved one
        const matchingModel = models.find(
          model => model.toLowerCase() === savedVehicle.model.toLowerCase()
        );
        if (matchingModel) {
          setSelectedModel(matchingModel);
        }
      }
    } else {
      setCarModels([]);
      setSelectedModel('');
    }
  }, [selectedBrand, pricingData]);
  
  // Update fuel types when model changes or when a model is auto-selected from session
  useEffect(() => {
    if (selectedBrand && selectedModel && pricingData.length > 0) {
      // Find all fuel types for the selected brand and model
      const fuelTypes = Array.from(new Set(
        pricingData
          .filter(item => 
            item.brand.toLowerCase() === selectedBrand.toLowerCase() && 
            item.model.toLowerCase() === selectedModel.toLowerCase()
          )
          .map(item => item.fuelType)
      )).sort();
      
      setAvailableFuelTypes(fuelTypes);
      
      // If we had a saved vehicle, try to select its fuel type
      const savedVehicle = getVehicleFromSession();
      if (savedVehicle && 
          savedVehicle.manufacturer.toLowerCase() === selectedBrand.toLowerCase() && 
          savedVehicle.model.toLowerCase() === selectedModel.toLowerCase() && 
          !selectedFuelType) {
        // Find the fuel type in our list that matches the saved one
        const matchingFuelType = fuelTypes.find(
          fuel => fuel.toLowerCase() === savedVehicle.fuelType.toLowerCase()
        );
        if (matchingFuelType) {
          setSelectedFuelType(matchingFuelType);
        }
      }
    } else {
      setAvailableFuelTypes([]);
      setSelectedFuelType('');
    }
  }, [selectedBrand, selectedModel, pricingData]);

  // Update price when all selections are made
  useEffect(() => {
    if (selectedBrand && selectedModel && selectedFuelType && pricingData.length > 0) {
      // Find the pricing data for the selected vehicle
      const selectedVehiclePricing = pricingData.find(
        item => 
          item.brand.toLowerCase() === selectedBrand.toLowerCase() && 
          item.model.toLowerCase() === selectedModel.toLowerCase() && 
          item.fuelType.toLowerCase() === selectedFuelType.toLowerCase()
      );
      
      if (selectedVehiclePricing) {
        setCurrentPrice(selectedVehiclePricing.expressServicePrice);
      } else {
        setCurrentPrice(null);
      }
    } else {
      setCurrentPrice(null);
    }
  }, [selectedBrand, selectedModel, selectedFuelType, pricingData]);

  // TODO: Reconnect to new Strapi V5 backend - placeholder function
  const updateLeadWithSelection = async (field: string, value: string, price?: number) => {
    if (!leadId) return;
    
    console.log(`TODO: Update ${field} with value ${value} in new Strapi V5 backend`);
    // TODO: Implement with new Strapi V5 API
    /*
    const data: Record<string, any> = {
      [field]: value
    };
    
    if (price !== undefined) {
      data.servicePrice = price;
    }
    
    try {
      await expressService.updateLead(leadId, data);
      console.log(`Updated ${field} in Strapi:`, value);
    } catch (error) {
      console.error(`Error updating ${field} in Strapi:`, error);
    }
    */
  };

  // Update brand effect - add Strapi update
  useEffect(() => {
    if (selectedBrand && leadId) {
      updateLeadWithSelection('carBrand', selectedBrand);
    }
  }, [selectedBrand, leadId]);
  
  // Update model effect - add Strapi update
  useEffect(() => {
    if (selectedBrand && selectedModel && leadId) {
      updateLeadWithSelection('carModel', selectedModel);
    }
  }, [selectedModel, selectedBrand, leadId]);
  
  // Update fuel type and price effect - add Strapi update
  useEffect(() => {
    if (selectedBrand && selectedModel && selectedFuelType && currentPrice !== null && leadId) {
      updateLeadWithSelection('fuelType', selectedFuelType, currentPrice);
    }
  }, [selectedFuelType, currentPrice, selectedBrand, selectedModel, leadId]);

  const handleSubmit = async () => {
    if (selectedBrand && selectedModel && selectedFuelType) {
      // Find the price for this selection
      const selectedVehiclePricing = pricingData.find(
        car => 
          car.brand.toLowerCase() === selectedBrand.toLowerCase() && 
          car.model.toLowerCase() === selectedModel.toLowerCase() && 
          car.fuelType.toLowerCase() === selectedFuelType.toLowerCase()
      );
      
      const price = selectedVehiclePricing?.expressServicePrice || 3999; // Default price if not found
      
      // Save vehicle to session storage to be used across service pages
      saveVehicleToSession({
        manufacturer: selectedBrand,
        model: selectedModel,
        fuelType: selectedFuelType
      });
      
      // If user is authenticated, add the car to their profile
      if (isAuthenticated && user) {
        try {
          console.log('🚗 CarSelectionModal: Adding car to user profile', {
            make: selectedBrand,
            model: selectedModel,
            fuelType: selectedFuelType,
            userId: user.id
          });
          
          // Check if this exact car already exists for the user
          const existingCar = user.cars.find(car => 
            car.make.toLowerCase() === selectedBrand.toLowerCase() && 
            car.model.toLowerCase() === selectedModel.toLowerCase() && 
            car.fuelType.toLowerCase() === selectedFuelType.toLowerCase()
          );
          
          if (!existingCar) {
            await addCar({
              make: selectedBrand,
              model: selectedModel,
              year: new Date().getFullYear(),
              fuelType: selectedFuelType,
              isPrimary: user.cars.length === 0, // Make first car primary
              registrationNumber: '', // Will be empty initially, user can add later
            });
            
            console.log('✅ CarSelectionModal: Car added successfully');
          } else {
            console.log('ℹ️ CarSelectionModal: Car already exists, skipping add');
          }
        } catch (error) {
          console.error('❌ CarSelectionModal: Error adding car:', error);
          // Don't block the flow, just log the error
        }
      }
      
      // Proceed with form submission (passing values to parent component)
      onSubmit(selectedBrand, selectedModel, selectedFuelType, price);
    } else {
      // Let the user know what's missing
      if (!selectedBrand) {
        setError('Please select a car brand');
      } else if (!selectedModel) {
        setError('Please select a car model');
      } else if (!selectedFuelType) {
        setError('Please select a fuel type');
      }
    }
  };

  // Helper function to capitalize first letter
  const capitalize = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto mt-0 p-6 w-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90vh',
          overflow: 'auto'
        }
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative"
        >
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-gray-500 hover:text-gray-700 shadow-md"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Your Car</h2>
            <p className="text-gray-500">Mobile Number: {mobileNumber}</p>
          </div>

          {error ? (
            <div className="text-center">
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                <p>{error}</p>
              </div>
              <button
                className="bg-[#FF7200] text-white px-4 py-2 rounded-md hover:bg-[#cc5b00]"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7200]"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Car className="w-5 h-5 mr-2 text-[#FF7200]" />
                  Select Car Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF7200] focus:border-transparent"
                >
                  <option value="">Select a brand</option>
                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedBrand && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-[#FF7200]" />
                    Select Car Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF7200] focus:border-transparent"
                  >
                    <option value="">Select a model</option>
                    {carModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {selectedModel && availableFuelTypes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Droplet className="w-5 h-5 mr-2 text-[#FF7200]" />
                    Select Fuel Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableFuelTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedFuelType(type)}
                        className={`p-3 border rounded-md flex items-center justify-center focus:outline-none transition-all ${
                          selectedFuelType === type
                            ? 'bg-[#FF7200] text-white border-[#FF7200]'
                            : 'border-gray-300 hover:border-[#FF7200] text-gray-700'
                        }`}
                      >
                        {selectedFuelType === type && <CheckCircle className="w-4 h-4 mr-1" />}
                        {capitalize(type)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Continue button will appear only after all three selections are made */}
              {selectedBrand && selectedModel && selectedFuelType && (
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#FF7200] text-white font-semibold py-4 px-4 rounded-md hover:bg-[#cc5b00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7200] focus:ring-opacity-50 text-lg shadow-md"
                  >
                    Get Price!
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default CarSelectionModal; 