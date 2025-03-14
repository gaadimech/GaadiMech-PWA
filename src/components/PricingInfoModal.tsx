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
        <div className="flex justify-between items-center p-3 bg-white text-gray-800 border-b border-gray-200">
          <h2 className="text-xl font-bold">Express Service</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3">
          {/* Vehicle details card with standard car logo */}
          <div className="bg-gray-50 p-2 rounded-md mb-3 border border-gray-200">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Vehicle Details</h3>
            <div className="flex items-center">
              <div className="mr-2">
                {CarLogo}
              </div>
              <div>
                <div className="font-medium text-base">{carBrand} {carModel}</div>
                <div className="text-gray-600 text-sm">{fuelType}</div>
              </div>
            </div>
          </div>

          {/* Pricing comparison with clean design */}
          <div className="mb-3">
            {/* Regular Workshop Service - subdued */}
            <div className="p-2 bg-gray-100 rounded-t-md text-gray-400">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Regular Workshop Service</div>
                <div className="font-bold">₹{traditionalServicePrice}</div>
              </div>
            </div>
            
            {/* Horizontal divider */}
            <div className="h-1 bg-gradient-to-r from-[#FF7200] to-[#FFA500]"></div>
            
            {/* Express Service - highlighted, with black price instead of orange */}
            <div className="p-2 bg-orange-50 rounded-b-md">
              <div className="flex justify-between items-center mb-1">
                <div className="text-base font-bold text-gray-800">Express Service</div>
                <div className="text-xl font-bold text-gray-900">₹{servicePrice}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center text-xs text-[#FF7200] mb-1 sm:mb-0">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Complete Car Service in 90 Minutes</span>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full self-start sm:self-auto">
                  Save {savingsPercentage}%
                </div>
              </div>
              
              {/* Merged limited offer into the main widget - NEW */}
              <div className="mt-2 flex items-center justify-between border-t border-orange-200 pt-1">
                <div className="flex items-center">
                  <AlertTriangle className="w-3 h-3 text-amber-600 mr-1 flex-shrink-0" />
                  <p className="text-xs font-medium text-amber-800">
                    Limited offer! Only available for the first 100 users.
                  </p>
                </div>
                <div className="flex items-center bg-amber-100 px-2 py-0.5 rounded">
                  <Users className="w-3 h-3 text-amber-800 mr-1" />
                  <span className="text-xs font-bold text-amber-900">{spotsRemaining} spots left</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Number Input - REARRANGED */}
          <div className="mb-3">
            {/* Highlight box around entire input section - simplified styling */}
            <div className="border border-green-400 rounded-md p-2 bg-green-50">
              {/* More compact layout */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Gift className="w-4 h-4 text-green-600 mr-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 text-sm">Enter your mobile number</p>
                    <p className="text-xs text-green-700">Get instant ₹500 OFF on your service!</p>
                  </div>
                </div>
                <div className="bg-green-600 text-white text-sm font-bold px-2 py-0.5 rounded">
                  ₹500 OFF
                </div>
              </div>
              
              {/* Simple down arrow with less space */}
              <div className="flex justify-center my-1">
                <svg className="w-4 h-4 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* Streamlined input field */}
              <div className="relative mb-2">
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter Your Mobile Number"
                  className="w-full p-2 pl-8 outline-none text-gray-800 text-base border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  maxLength={10}
                  pattern="[0-9]*"
                  required
                  autoFocus
                />
                {/* Phone icon */}
                <div className="absolute left-0 top-0 h-full flex items-center justify-center pl-2">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
              </div>
              
              {/* Display error message if validation fails */}
              {mobileError && (
                <p className="mt-0.5 mb-1.5 text-xs text-red-600 font-medium">
                  {mobileError}
                </p>
              )}
              
              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSubmit}
                className="w-full py-2.5 px-3 bg-[#FF7200] text-white font-bold rounded-md hover:bg-[#e86700] transition-colors shadow-sm text-base flex items-center justify-center"
              >
                <span>Unlock ₹500 Discount Now!</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
              
              {/* Minimal message under button */}
              <div className="text-center mt-1">
                <p className="text-xs text-amber-700 flex items-center justify-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Don't miss out! Claim your discount before it's gone.
                </p>
              </div>
            </div>
          </div>
          
          {/* Service inclusions - more compact */}
          <div className="bg-white p-2 rounded-md border border-gray-200 mb-3">
            <h3 className="font-semibold text-gray-700 text-sm mb-1.5">Service Inclusions:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Engine Oil Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Oil Filter Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Air Filter Replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Complete Car Wash</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Interior Vacuuming</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">15 Point Car Inspection</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Coolant Top-up (up to 100ml)</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Battery Water Top-up</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Brake Oil Top-up</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs">Wiper Fluid Replacement</p>
              </div>
            </div>
          </div>

          {/* Benefits section - more compact */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 p-2 rounded-md border border-blue-100">
              <div className="flex items-center mb-0.5">
                <Clock className="w-4 h-4 text-blue-600 mr-1.5" />
                <h4 className="font-bold text-blue-800 text-sm">90-Minute Service</h4>
              </div>
              <p className="text-xs text-blue-700">Quick service by experts</p>
            </div>
            <div className="bg-green-50 p-2 rounded-md border border-green-100">
              <div className="flex items-center mb-0.5">
                <Shield className="w-4 h-4 text-green-600 mr-1.5" />
                <h4 className="font-bold text-green-800 text-sm">1-Month Warranty</h4>
              </div>
              <p className="text-xs text-green-700">On parts and labor</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PricingInfoModal; 