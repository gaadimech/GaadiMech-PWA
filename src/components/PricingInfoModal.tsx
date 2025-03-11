import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { X, CheckCircle, Shield, Clock, Car } from 'lucide-react';

interface PricingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
  carBrand: string;
  carModel: string;
  fuelType: string;
  servicePrice: number;
}

// Function to get the standard car logo
const getCarLogo = () => {
  // Using standard car icon for all brands for now
  return <Car className="w-10 h-10 text-gray-700" />;
};

const PricingInfoModal: React.FC<PricingInfoModalProps> = ({
  isOpen,
  onClose,
  onBookNow,
  carBrand,
  carModel,
  fuelType,
  servicePrice
}) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      border: 'none',
      borderRadius: '12px',
      maxWidth: '90%',
      width: '500px',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000
    }
  };

  // Traditional service price (higher than express service)
  const traditionalServicePrice = 19999;

  // Calculate the savings
  const savings = traditionalServicePrice - servicePrice;
  const savingsPercentage = Math.round((savings / traditionalServicePrice) * 100);

  // Get standard car logo
  const CarLogo = getCarLogo();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Express Service Pricing"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header with gradient background */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#FF7200] to-[#FFA500] text-white">
          <h2 className="text-xl font-bold">Express Service Pricing</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Vehicle details card with standard car logo */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Vehicle Details</h3>
            <div className="flex items-center">
              <div className="mr-3">
                {CarLogo}
              </div>
              <div>
                <div className="font-medium text-lg">{carBrand} {carModel}</div>
                <div className="text-gray-600">{fuelType}</div>
              </div>
            </div>
          </div>

          {/* Pricing comparison with clean design */}
          <div className="mb-6">
            {/* Regular Workshop Service - subdued */}
            <div className="p-3 bg-gray-100 rounded-t-lg text-gray-400">
              <div className="flex justify-between items-center">
                <div className="text-base font-medium">Regular Workshop Service</div>
                <div className="font-bold">₹{traditionalServicePrice}</div>
              </div>
            </div>
            
            {/* Horizontal divider */}
            <div className="h-1 bg-gradient-to-r from-[#FF7200] to-[#FFA500]"></div>
            
            {/* Express Service - highlighted */}
            <div className="p-4 bg-orange-50 rounded-b-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="text-lg font-bold text-gray-800">Express Service</div>
                <div className="text-2xl font-bold text-[#FF7200]">₹{servicePrice}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-[#FF7200]">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>90-Minute Service</span>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  Save {savingsPercentage}% (₹{savings})
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookNow}
            className="w-full py-4 px-4 bg-[#FF7200] text-white font-bold rounded-lg hover:bg-[#e86700] transition-colors shadow-lg mb-6"
          >
            Book Slot Now
          </motion.button>
          
          {/* Service inclusions */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-gray-700 mb-4">Service Inclusions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Engine Oil Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Oil Filter Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Air Filter Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Complete Car Wash</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Interior Vacuuming</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">15 Point Car Inspection</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Coolant Top-up (up to 100ml)</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Battery Water Top-up</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Brake Oil Top-up</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Wiper Fluid Replacement</p>
              </div>
            </div>
          </div>

          {/* Benefits section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center mb-1">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-bold text-blue-800">90-Minute Service</h4>
              </div>
              <p className="text-sm text-blue-700">Quick service by experts</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <div className="flex items-center mb-1">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-bold text-green-800">1-Month Warranty</h4>
              </div>
              <p className="text-sm text-green-700">On parts and labor</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PricingInfoModal; 