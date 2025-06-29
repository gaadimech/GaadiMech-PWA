import React, { useState } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { X, Phone, ArrowRight } from 'lucide-react';
import { ConversionTracker } from '../utils/conversionTracking';

interface MobileNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mobileNumber: string) => void;
  serviceName?: string;
}

const MobileNumberModal: React.FC<MobileNumberModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  serviceName = "Service" 
}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing mobile number when modal opens
  React.useEffect(() => {
    if (isOpen) {
      const existingNumber = sessionStorage.getItem('userMobileNumber');
      if (existingNumber && validateMobileNumber(existingNumber)) {
        setMobileNumber(existingNumber);
      }
    }
  }, [isOpen]);

  const validateMobileNumber = (number: string): boolean => {
    // Indian mobile number validation (10 digits, can start with 6-9)
    const indianMobileRegex = /^[6-9]\d{9}$/;
    return indianMobileRegex.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!mobileNumber.trim()) {
      setError('Please enter your mobile number');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    
    try {
      // Store in session storage
      sessionStorage.setItem('userMobileNumber', mobileNumber);
      
      // Create/update lead in Strapi with all collected data
      await ConversionTracker.captureMobileNumberAndCreateLead(mobileNumber);
      
      // Call the onSubmit callback
      onSubmit(mobileNumber);
      
      // Reset form
      setMobileNumber('');
      setError('');
    } catch (error) {
      console.error('Error storing mobile number:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMobileNumber('');
    setError('');
    setIsLoading(false);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 10) {
      setMobileNumber(value);
      setError('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal-content max-w-md mx-auto bg-white p-6 rounded-xl shadow-2xl w-[90%] m-4"
      overlayClassName="modal-overlay fixed inset-0 bg-black/60 flex items-center justify-center overflow-y-auto z-50"
      contentLabel="Mobile Number Modal"
      ariaHideApp={false}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 w-full text-center">
            Confirm Your Booking
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] rounded-full p-3">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <p className="text-center text-gray-600 mb-6">
            We need your mobile number to confirm your <span className="font-semibold text-[#FF7200]">{serviceName}</span> booking.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">+91</span>
              </div>
              <input
                type="tel"
                id="mobile"
                value={mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter 10-digit mobile number"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7200] focus:border-[#FF7200] transition-colors ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
                maxLength={10}
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !mobileNumber || mobileNumber.length !== 10}
              className="w-full bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-6 py-3 rounded-lg hover:from-[#25D366] hover:to-[#128C7E] transition-all flex items-center justify-center font-medium disabled:opacity-50 disabled:hover:from-[#FF7200] disabled:hover:to-[#FF9500]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Continue</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              )}
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 text-center">
            <span className="font-medium">🔒 Your privacy is protected.</span> We use your number only for booking confirmations and support.
          </p>
        </div>
      </motion.div>
    </Modal>
  );
};

export default MobileNumberModal; 