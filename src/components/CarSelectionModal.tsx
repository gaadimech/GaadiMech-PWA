import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Tag } from 'lucide-react';

interface CarSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (brand: string, model: string, price: number) => void;
  mobileNumber: string;
}

interface CarPricing {
  brand: string;
  model: string;
  expressServicePrice: number;
}

const CarSelectionModal: React.FC<CarSelectionModalProps> = ({ isOpen, onClose, onSubmit, mobileNumber }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [carBrands, setCarBrands] = useState<string[]>([]);
  const [carModels, setCarModels] = useState<string[]>([]);
  const [pricingData, setPricingData] = useState<CarPricing[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load car pricing data from CSV
    const loadPricingData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/GM Service Pricing.csv');
        const csvText = await response.text();
        
        // Parse CSV
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        const brandIndex = headers.findIndex(h => h.trim() === 'Car Brand');
        const modelIndex = headers.findIndex(h => h.trim() === 'Car Model');
        const priceIndex = headers.findIndex(h => h.trim() === 'Express Service Price');
        
        if (brandIndex === -1 || modelIndex === -1 || priceIndex === -1) {
          throw new Error('CSV format is invalid');
        }
        
        const data: CarPricing[] = [];
        const brands = new Set<string>();
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',');
          const brand = values[brandIndex].trim();
          const model = values[modelIndex].trim();
          const price = parseInt(values[priceIndex].trim(), 10);
          
          if (brand && model && !isNaN(price)) {
            data.push({ brand, model, expressServicePrice: price });
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
      const models = pricingData
        .filter(car => car.brand === selectedBrand)
        .map(car => car.model);
      
      setCarModels(models.sort());
      setSelectedModel(''); // Reset model selection
      setCurrentPrice(null); // Reset price
    } else {
      setCarModels([]);
      setSelectedModel('');
      setCurrentPrice(null);
    }
  }, [selectedBrand, pricingData]);

  // Update price when model changes
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const carData = pricingData.find(
        car => car.brand === selectedBrand && car.model === selectedModel
      );
      
      if (carData) {
        setCurrentPrice(carData.expressServicePrice);
      } else {
        setCurrentPrice(null);
      }
    } else {
      setCurrentPrice(null);
    }
  }, [selectedModel, selectedBrand, pricingData]);

  const handleSubmit = () => {
    if (!selectedBrand) {
      alert('Please select a car brand');
      return;
    }
    
    if (!selectedModel) {
      alert('Please select a car model');
      return;
    }
    
    if (currentPrice === null) {
      alert('Unable to determine price. Please try again.');
      return;
    }
    
    try {
      onSubmit(selectedBrand, selectedModel, currentPrice);
    } catch (error) {
      console.error('Error submitting car selection:', error);
      alert('Something went wrong. Please try again.');
    }
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

              {currentPrice !== null && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <Tag className="w-5 h-5 mr-2 text-[#FF7200]" />
                    <h3 className="text-lg font-semibold"> Express Service in <span className="text-[#FF7200]">90 MINS</span></h3>
                  </div>
                  <div className="text-2xl font-bold text-[#FF7200] mb-2 text-center">₹{currentPrice}</div>
                  <p className="text-sm text-gray-600 mb-1">Includes:</p>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>Engine Oil Change</li>
                    <li>Oil Filter Change</li>
                    <li>Air Filter Change</li>
                    <li>Complete Car Wash</li>
                    <li>Interior Vacuum</li>
                    <li>15 Points General Checkup</li>
                  </ul>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!selectedBrand || !selectedModel || currentPrice === null}
                className="w-full bg-[#FF7200] text-white px-4 py-3 rounded-md hover:bg-[#cc5b00] transition-colors disabled:opacity-50"
              >
                Continue to Booking
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default CarSelectionModal; 