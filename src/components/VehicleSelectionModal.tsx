import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Vehicle } from '../types/services';
import { 
  parseCSVData, 
  getManufacturers, 
  getModelsByManufacturer, 
  getFuelTypes,
  saveVehicleToSession
} from '../utils/pricing-utils';

interface VehicleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

const VehicleSelectionModal: React.FC<VehicleSelectionModalProps> = ({ 
  isOpen, 
  onClose,
  onVehicleSelect
}) => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [autoSelectedFuel, setAutoSelectedFuel] = useState<boolean>(false);
  
  // Load CSV data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await parseCSVData();
        setCsvData(data);
        
        const manufacturersList = getManufacturers(data);
        setManufacturers(manufacturersList);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load vehicle data. Please try again later.');
        setLoading(false);
      }
    };
    
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);
  
  // Update models when manufacturer changes
  useEffect(() => {
    if (selectedManufacturer) {
      const modelsList = getModelsByManufacturer(csvData, selectedManufacturer);
      setModels(modelsList);
      setSelectedModel('');
      setSelectedFuelType('');
      setAutoSelectedFuel(false);
    } else {
      setModels([]);
    }
  }, [selectedManufacturer, csvData]);
  
  // Update fuel types when model changes
  useEffect(() => {
    if (selectedManufacturer && selectedModel) {
      const fuelTypesList = getFuelTypes(csvData, selectedManufacturer, selectedModel);
      setFuelTypes(fuelTypesList);
      
      // Auto-select fuel type if only one option is available
      if (fuelTypesList.length === 1) {
        setSelectedFuelType(fuelTypesList[0]);
        setAutoSelectedFuel(true);
      } else {
        setSelectedFuelType('');
        setAutoSelectedFuel(false);
      }
    } else {
      setFuelTypes([]);
      setAutoSelectedFuel(false);
    }
  }, [selectedModel, selectedManufacturer, csvData]);
  
  const handleManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedManufacturer(e.target.value);
  };
  
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };
  
  const handleFuelTypeSelect = (fuelType: string) => {
    setSelectedFuelType(fuelType);
    setAutoSelectedFuel(false);
  };
  
  const handleSubmit = () => {
    if (selectedManufacturer && selectedModel && selectedFuelType) {
      const vehicle: Vehicle = {
        manufacturer: selectedManufacturer,
        model: selectedModel,
        fuelType: selectedFuelType
      };
      
      // Save to session storage
      saveVehicleToSession(vehicle);
      
      // Notify parent component
      onVehicleSelect(vehicle);
      
      // Close modal
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Vehicle</h2>
        <p className="text-gray-600 mb-6">
          Choose your car details to get personalized service pricing.
        </p>
        
        {loading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF7200]"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center my-4">{error}</div>
        ) : (
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Manufacturer</label>
              <select
                value={selectedManufacturer}
                onChange={handleManufacturerChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7200] focus:border-transparent"
                required
              >
                <option value="">Select manufacturer</option>
                {manufacturers.map(manufacturer => (
                  <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
              <select
                value={selectedModel}
                onChange={handleModelChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7200] focus:border-transparent"
                disabled={!selectedManufacturer}
                required
              >
                <option value="">Select model</option>
                {models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            
            {selectedModel && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                
                {fuelTypes.length === 0 ? (
                  <div className="text-red-500 text-sm mt-1">
                    No pricing data available for this vehicle.
                  </div>
                ) : fuelTypes.length === 1 ? (
                  <div className="mt-1 text-gray-700">
                    <div className="bg-orange-100 border-2 border-[#FF7200] rounded-md p-3 flex items-center justify-between">
                      <span className="font-medium">{fuelTypes[0].charAt(0).toUpperCase() + fuelTypes[0].slice(1)}</span>
                      <span className="text-[#FF7200]"><Check size={18} /></span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Only this fuel type has pricing data available for the selected model.
                    </p>
                  </div>
                ) : (
                  <div className="mt-1">
                    <div className="flex space-x-2">
                      {fuelTypes.map(fuelType => (
                        <button
                          key={fuelType}
                          type="button"
                          onClick={() => handleFuelTypeSelect(fuelType)}
                          className={`flex-1 py-2 rounded-md border-2 transition-colors ${
                            selectedFuelType === fuelType
                              ? 'bg-orange-100 text-gray-900 border-[#FF7200] font-medium'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      These fuel types have pricing data available for the selected model.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedManufacturer || !selectedModel || !selectedFuelType || fuelTypes.length === 0}
              className={`w-full py-3 px-4 rounded-md font-medium text-white transition
                ${(selectedManufacturer && selectedModel && selectedFuelType && fuelTypes.length > 0)
                  ? 'bg-[#FF7200] hover:bg-[#e56700]' 
                  : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Confirm Selection
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VehicleSelectionModal; 