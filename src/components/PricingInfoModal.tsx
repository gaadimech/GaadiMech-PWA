import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { X, CheckCircle, Shield, Clock, Wrench, Car } from 'lucide-react';

interface PricingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
  carBrand: string;
  carModel: string;
  fuelType: string;
  servicePrice: number;
}

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Express Service Pricing"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Express Service Pricing</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <Car className="w-5 h-5 text-[#FF7200] mr-2" />
              <h3 className="font-semibold text-gray-800">Vehicle Details</h3>
            </div>
            <p className="text-gray-700">
              <span className="font-medium">{carBrand} {carModel}</span> ({fuelType})
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-800">Express Service</h3>
              <span className="text-xl font-bold text-[#FF7200]">₹{servicePrice}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Complete engine oil and filter replacement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Air filter cleaning and replacement (if necessary)</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Comprehensive vehicle inspection (25+ points)</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Fluid level check and top-up</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Digital inspection report with photos</p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Clock className="w-4 h-4 text-blue-600 mr-1" />
                <h4 className="font-medium text-blue-800">90-Minute Service</h4>
              </div>
              <p className="text-sm text-blue-700">Quick service by experts</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Shield className="w-4 h-4 text-green-600 mr-1" />
                <h4 className="font-medium text-green-800">1-Month Warranty</h4>
              </div>
              <p className="text-sm text-green-700">On parts and labor</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookNow}
            className="w-full py-3 px-4 bg-[#FF7200] text-white font-medium rounded-lg hover:bg-[#e86700] transition-colors"
          >
            Book Slot Now
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default PricingInfoModal; 