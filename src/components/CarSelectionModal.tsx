import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Tag, Droplet, CheckCircle } from 'lucide-react';

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
        const response = await fetch('/GM Pricing March Website Usage -Final.csv');
        const csvText = await response.text();
        
        // Parse CSV
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        const typeIndex = headers.findIndex(h => h.trim() === 'Type');
        const brandIndex = headers.findIndex(h => h.trim() === 'Car Brand');
        const modelIndex = headers.findIndex(h => h.trim() === 'Car Model');
        const priceIndex = headers.findIndex(h => h.trim() === 'Express Service Price GaadiMech');
        
        if (typeIndex === -1 || brandIndex === -1 || modelIndex === -1 || priceIndex === -1) {
          throw new Error('CSV format is invalid');
        }
        
        const data: CarPricing[] = [];
        const brands = new Set<string>();
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',');
          const fuelType = values[typeIndex].trim().toLowerCase();
          const brand = values[brandIndex].trim();
          const model = values[modelIndex].trim();
          const priceStr = values[priceIndex].trim();
          const price = parseFloat(priceStr);
          
          if (brand && model && fuelType && !isNaN(price) && price > 0) {
            data.push({ brand, model, fuelType, expressServicePrice: price });
            brands.add(brand);
          }
        }
        
        setPricingData(data);
        setCarBrands(Array.from(brands).sort());
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading pricing data:', error);
        setError('Failed to load car data. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadPricingData();
  }, []);

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
    return str.charAt(0).toUpperCase() + str.slice(1);
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
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7200]"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">
              {error}
              <button 
                onClick={onClose}
                className="mt-4 bg-[#FF7200] text-white px-4 py-2 rounded-md hover:bg-[#cc5b00]"
              >
                Go Back
              </button>
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
                    <Car className="w-5 h-5 mr-2 text-[#FF7200]" />
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
                    Fuel Type
                  </label>
                  
                  {availableFuelTypes.length === 1 ? (
                    <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50">
                      {capitalize(availableFuelTypes[0])}
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-between">
                      {availableFuelTypes.map((fuelType) => (
                        <button
                          key={fuelType}
                          onClick={() => setSelectedFuelType(fuelType)}
                          className={`flex-1 py-2 px-3 rounded-md border ${
                            selectedFuelType === fuelType
                              ? 'bg-[#FF7200] text-white border-[#FF7200]'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          } transition-colors duration-200`}
                        >
                          {capitalize(fuelType)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentPrice !== null && (
                <div className="bg-gradient-to-br from-[#f8faff] to-[#e6eeff] p-6 rounded-xl border-2 border-[#0e5aa8] shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0e5aa8] opacity-5 rounded-full -mr-8 -mt-8"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#0e5aa8] opacity-5 rounded-full -ml-6 -mb-6"></div>
                  
                  <div className="flex items-center mb-4">
                    <div className="bg-[#0e5aa8] p-2 rounded-lg shadow-md mr-3">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Express Service in <span className="text-[#FF7200]">90 MINS</span>
                    </h3>
                  </div>
                  
                  <div className="text-3xl font-extrabold text-[#FF7200] mb-4 text-center py-2 border-y border-[#0e5aa8]/20">
                    ₹{currentPrice}
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-inner">
                    <p className="text-sm font-semibold text-[#0e5aa8] mb-3 uppercase tracking-wider">Includes:</p>
                    <ul className="text-sm text-gray-700 space-y-2.5">
                      <li className="flex items-center">
                        <div className="bg-[#0e5aa8]/10 p-1 rounded-full mr-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0e5aa8]" />
                        </div>
                        <span className="font-medium">Engine Oil Change</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-[#0e5aa8]/10 p-1 rounded-full mr-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0e5aa8]" />
                        </div>
                        <span className="font-medium">Oil Filter Change</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-[#0e5aa8]/10 p-1 rounded-full mr-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0e5aa8]" />
                        </div>
                        <span className="font-medium">Air Filter Change</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-[#0e5aa8]/10 p-1 rounded-full mr-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0e5aa8]" />
                        </div>
                        <span className="font-medium">Complete Car Wash</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-[#0e5aa8]/10 p-1 rounded-full mr-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0e5aa8]" />
                        </div>
                        <span className="font-medium">Interior Vacuum</span>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-[#0e5aa8]/10 p-1 rounded-full mr-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0e5aa8]" />
                        </div>
                        <span className="font-medium">15 Points General Checkup</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!currentPrice}
                className={`w-full py-3 rounded-md font-medium text-white ${
                  currentPrice
                    ? 'bg-[#FF7200] hover:bg-[#cc5b00]'
                    : 'bg-gray-400 cursor-not-allowed'
                } transition-colors duration-200`}
              >
                Continue
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default CarSelectionModal; 