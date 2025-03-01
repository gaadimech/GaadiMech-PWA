import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Tag, Droplet, CheckCircle, Clock } from 'lucide-react';

interface CarSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (brand: string, model: string, fuelType: string, price: number) => void;
  mobileNumber: string;
}

interface CarPricing {
  brand: string;
  model: string;
  fuelType: string;
  expressServicePrice: number;
}

const CarSelectionModal: React.FC<CarSelectionModalProps> = ({ isOpen, onClose, onSubmit, mobileNumber }) => {
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

  // Update models when brand changes
  useEffect(() => {
    if (selectedBrand) {
      const models = [...new Set(
        pricingData
          .filter(car => car.brand === selectedBrand)
          .map(car => car.model)
      )];
      
      setCarModels(models.sort());
      setSelectedModel(''); // Reset model selection
      setSelectedFuelType(''); // Reset fuel type selection
      setAvailableFuelTypes([]); // Reset available fuel types
      setCurrentPrice(null); // Reset price
    } else {
      setCarModels([]);
      setSelectedModel('');
      setSelectedFuelType('');
      setAvailableFuelTypes([]);
      setCurrentPrice(null);
    }
  }, [selectedBrand, pricingData]);

  // Update available fuel types when model changes
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const fuelTypes = [...new Set(
        pricingData
          .filter(car => car.brand === selectedBrand && car.model === selectedModel)
          .map(car => car.fuelType)
      )];
      
      setAvailableFuelTypes(fuelTypes.sort());
      
      // If only one fuel type is available, auto-select it
      if (fuelTypes.length === 1) {
        setSelectedFuelType(fuelTypes[0]);
      } else {
        setSelectedFuelType(''); // Reset fuel type selection if multiple options
      }
      
      setCurrentPrice(null); // Reset price
    } else {
      setAvailableFuelTypes([]);
      setSelectedFuelType('');
      setCurrentPrice(null);
    }
  }, [selectedModel, selectedBrand, pricingData]);

  // Update price when fuel type changes
  useEffect(() => {
    if (selectedBrand && selectedModel && selectedFuelType) {
      const carData = pricingData.find(
        car => car.brand === selectedBrand && 
               car.model === selectedModel && 
               car.fuelType === selectedFuelType
      );
      
      if (carData) {
        setCurrentPrice(carData.expressServicePrice);
      } else {
        setCurrentPrice(null);
      }
    } else {
      setCurrentPrice(null);
    }
  }, [selectedFuelType, selectedModel, selectedBrand, pricingData]);

  const handleSubmit = () => {
    if (!selectedBrand) {
      alert('Please select a car brand');
      return;
    }
    
    if (!selectedModel) {
      alert('Please select a car model');
      return;
    }
    
    if (!selectedFuelType) {
      alert('Please select a fuel type');
      return;
    }
    
    if (currentPrice === null) {
      alert('Unable to determine price. Please try again.');
      return;
    }
    
    try {
      onSubmit(selectedBrand, selectedModel, selectedFuelType, currentPrice);
    } catch (error) {
      console.error('Error submitting car selection:', error);
      alert('Something went wrong. Please try again.');
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
              
              {currentPrice !== null && (
                <div className="mt-6">
                  <div className="bg-[#EBF3FA] border-[1px] border-[#3B82F6]/20 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">Express Service</h3>
                    
                    <div className="flex justify-center mb-4">
                      <div className="flex items-center">
                        <Clock className="w-8 h-8 text-[#FF7200] mr-3" />
                        <span className="text-4xl font-bold text-[#FF7200]">90 MINS</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-b border-gray-200 py-4 mb-4">
                      <div className="text-4xl font-bold text-center text-[#FF7200]">₹{new Intl.NumberFormat('en-IN').format(currentPrice)}</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-inner">
                      <h4 className="text-xl font-bold text-[#2563EB] mb-4">INCLUDES:</h4>
                      
                      <div className="space-y-3 grid md:grid-cols-2 gap-x-4">
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Engine Oil Replacement</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Oil Filter Replacement</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Air Filter Replacement</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Complete Car Wash</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Interior Vacuuming</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">15 Point Car Inspection</span>
                        </div>

                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Coolant Top-up (up to 100ml)</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Battery Water Top-up</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Brake Oil Top-up</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-700 font-medium">Wiper Fluid Replacement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-[#FF7200] text-white font-semibold py-4 px-4 rounded-md hover:bg-[#cc5b00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7200] focus:ring-opacity-50 text-lg shadow-md"
                    >
                      Continue
                    </button>
                  </div>
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