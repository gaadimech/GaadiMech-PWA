import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { X, CheckCircle, Shield, Clock, Car, Phone, Gift, AlertTriangle, Users } from 'lucide-react';

interface PricingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (mobileNumber?: string) => void;
  carBrand: string;
  carModel: string;
  fuelType: string;
  servicePrice: number;
  initialMobileNumber?: string;
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
  servicePrice,
  initialMobileNumber = ''
}) => {
  const [mobileNumber, setMobileNumber] = useState(initialMobileNumber);
  // Add error state for mobile number validation
  const [mobileError, setMobileError] = useState<string>('');
  // Simulate a random number of remaining spots between 5-15
  const [spotsRemaining] = useState(() => Math.floor(Math.random() * 11) + 5);

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

  // Calculate traditional service price (Express service has a 60% discount)
  const traditionalServicePrice = Math.round(servicePrice / 0.4);

  // Calculate the savings
  const savings = traditionalServicePrice - servicePrice;
  const savingsPercentage = Math.round((savings / traditionalServicePrice) * 100);

  // Get standard car logo
  const CarLogo = getCarLogo();

  // Validate mobile number: must be 10 digits and start with 6-9
  const validateMobileNumber = (number: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleSubmit = () => {
    // Reset any previous errors
    setMobileError('');
    
    // Validate mobile number before proceeding
    if (!mobileNumber.trim()) {
      setMobileError('Please enter your mobile number to continue');
      return;
    }
    
    if (!validateMobileNumber(mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    // If validation passes, proceed with booking
    onBookNow(mobileNumber);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Express Service"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header with white background instead of orange gradient */}
        <div className="flex justify-between items-center p-4 bg-white text-gray-800 border-b border-gray-200">
          <h2 className="text-xl font-bold">Express Service</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Vehicle details card with standard car logo */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">Vehicle Details</h3>
            <div className="flex items-center">
              <div className="mr-3">
                {CarLogo}
              </div>
              <div>
                <div className="font-medium text-base sm:text-lg">{carBrand} {carModel}</div>
                <div className="text-gray-600 text-sm">{fuelType}</div>
              </div>
            </div>
          </div>

          {/* Pricing comparison with clean design */}
          <div className="mb-4 sm:mb-6">
            {/* Regular Workshop Service - subdued */}
            <div className="p-2 sm:p-3 bg-gray-100 rounded-t-lg text-gray-400">
              <div className="flex justify-between items-center">
                <div className="text-sm sm:text-base font-medium">Regular Workshop Service</div>
                <div className="font-bold">₹{traditionalServicePrice}</div>
              </div>
            </div>
            
            {/* Horizontal divider */}
            <div className="h-1 bg-gradient-to-r from-[#FF7200] to-[#FFA500]"></div>
            
            {/* Express Service - highlighted, with black price instead of orange */}
            <div className="p-3 sm:p-4 bg-orange-50 rounded-b-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="text-base sm:text-lg font-bold text-gray-800">Express Service</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">₹{servicePrice}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center text-xs sm:text-sm text-[#FF7200] mb-1 sm:mb-0">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span>Complete Car Service in 90 Minutes</span>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full self-start sm:self-auto">
                  Save {savingsPercentage}% (₹{savings})
                </div>
              </div>
              
              {/* Merged limited offer into the main widget - NEW */}
              <div className="mt-3 flex items-center justify-between border-t border-orange-200 pt-2">
                <div className="flex items-center">
                  <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mr-1 flex-shrink-0" />
                  <p className="text-xs font-medium text-amber-800">
                    Limited offer! Only available for the first 100 users.
                  </p>
                </div>
                <div className="flex items-center bg-amber-100 px-2 py-1 rounded-md">
                  <Users className="w-3 h-3 text-amber-800 mr-1" />
                  <span className="text-xs font-bold text-amber-900">{spotsRemaining} spots left</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Number Input - REARRANGED */}
          <div className="mb-4">
            {/* Discount offer banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 text-sm sm:text-base">Enter your mobile number</p>
                  <p className="text-xs sm:text-sm text-green-700">Get instant ₹500 OFF on your service!</p>
                </div>
              </div>
              <div className="bg-green-600 text-white text-base sm:text-lg font-bold px-3 py-1 rounded-md self-start sm:self-auto">
                ₹500 OFF
              </div>
            </div>
            
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#FF7200] focus-within:ring-1 focus-within:ring-[#FF7200]">
              <div className="bg-gray-100 p-2 sm:p-3 border-r border-gray-300">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </div>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter Your Mobile Number"
                className={`flex-1 p-2 sm:p-3 outline-none text-gray-700 text-sm sm:text-base ${mobileError ? 'border-red-300 bg-red-50' : ''}`}
                maxLength={10}
                pattern="[0-9]*"
                required
              />
            </div>
            {/* Display error message if validation fails */}
            {mobileError && (
              <p className="mt-1 text-xs sm:text-sm text-red-600 font-medium">
                {mobileError}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full py-3 sm:py-4 px-4 bg-[#FF7200] text-white font-bold rounded-lg hover:bg-[#e86700] transition-colors shadow-lg mb-3 sm:mb-6 text-sm sm:text-base"
          >
            Unlock ₹500 Discount Now!
          </motion.button>
          
          {/* Limited time message under button */}
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-xs font-medium text-amber-700 flex items-center justify-center">
              <Clock className="w-3 h-3 mr-1" />
              Don't miss out! Claim your discount before it's gone.
            </p>
          </div>
          
          {/* Service inclusions */}
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 mb-4 sm:mb-6">
            <h3 className="font-semibold text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">Service Inclusions:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Engine Oil Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Oil Filter Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Air Filter Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Complete Car Wash</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Interior Vacuuming</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">15 Point Car Inspection</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Coolant Top-up (up to 100ml)</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Battery Water Top-up</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Brake Oil Top-up</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">Wiper Fluid Replacement</p>
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