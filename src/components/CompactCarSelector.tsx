import React from 'react';
import { Car } from 'lucide-react';
import { Vehicle } from '../types/services';

interface CompactCarSelectorProps {
  selectedVehicle: Vehicle | null;
  onSelectCar: () => void;
  className?: string;
}

const CompactCarSelector: React.FC<CompactCarSelectorProps> = ({ 
  selectedVehicle, 
  onSelectCar, 
  className = '' 
}) => {
  return (
    <button
      onClick={onSelectCar}
      className={`flex flex-col items-center justify-center px-2 py-1.5 rounded-lg transition-all hover:shadow-sm ${
        selectedVehicle 
          ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200' 
          : 'bg-[#FF7200] hover:bg-[#e66600] text-white'
      } ${className}`}
    >
      {/* Car Icon */}
      <Car className={`w-4 h-4 mb-1 ${
        selectedVehicle ? 'text-gray-600' : 'text-white'
      }`} />
      
      {/* Car Model Text */}
      <div className="text-center">
        {selectedVehicle ? (
          <div className="text-xs text-gray-600 leading-tight font-medium">
            {selectedVehicle.model}
          </div>
        ) : (
          <div className="text-xs font-medium leading-tight">
            Select
          </div>
        )}
      </div>
    </button>
  );
};

export default CompactCarSelector; 