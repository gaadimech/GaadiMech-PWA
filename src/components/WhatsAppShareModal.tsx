import React, { useState } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Send } from 'lucide-react';

// Templates for WhatsApp messages
const MESSAGE_TEMPLATES = [
  {
    id: 'template1',
    name: 'JOI Resident Offer',
    template: (couponCode: string) => `🚨 EXCLUSIVE JOI RESIDENT OFFER 🚨
🔧 GAADIMECH CAR SERVICING 🚘 
Express 90-Minute Professional Car Service & Repair
🏆 Doorstep Pickup | Genuine Parts | Expert Mechanics

Your exclusive code:
⁠ ${couponCode} ⁠

➡️ EXTRA 10% OFF all car servicing packages!
✅ Valid till: July 23, 2025
✅ Usable *2 times*

🔗 Book your car service: https://www.gaadimech.com/express-beta-atc?coupon=${couponCode}
 
📞 Call: 8448285289`,
  },
  {
    id: 'template2',
    name: 'Standard Offer',
    template: (couponCode: string) => `🚗 EXCLUSIVE GAADIMECH OFFER 🚗
Professional Car Service at Your Doorstep!

Use code: ${couponCode} for 10% OFF your next car service

🔗 Book now: https://www.gaadimech.com/express-beta-atc?coupon=${couponCode}
📞 Call: 8448285289`,
  },
];

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  couponCode: string;
}

const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({ isOpen, onClose, couponCode }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('template1');
  const [mobileError, setMobileError] = useState('');

  // Validate mobile number: must be 10 digits and start with 6-9
  const validateMobileNumber = (number: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setMobileNumber(value);
      if (mobileError) setMobileError('');
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplateId(e.target.value);
  };

  const handleSubmit = () => {
    // Validate mobile number
    if (!validateMobileNumber(mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number starting with 6-9');
      return;
    }
    
    // Track mobile number with Zepic
    if (window.zepic) {
      window.zepic.identify('mobile_number', mobileNumber);
    }
    
    // Get the selected template
    const selectedTemplate = MESSAGE_TEMPLATES.find(t => t.id === selectedTemplateId);
    if (!selectedTemplate) return;
    
    // Generate the message using the template and coupon code
    const message = selectedTemplate.template(couponCode);
    
    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    
    // Format the number with country code (India)
    const formattedNumber = `91${mobileNumber}`;
    
    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Close the modal
    onClose();
  };

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
      ariaHideApp={false}
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
            <h2 className="text-2xl font-bold text-gray-900">Share Coupon via WhatsApp</h2>
            <div className="flex items-center justify-center mt-2 bg-gray-100 p-2 rounded-md">
              <div className="font-mono text-[#FF7200] font-bold">{couponCode}</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Customer's Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleMobileChange}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
              />
              {mobileError && (
                <p className="mt-1 text-sm text-red-600">{mobileError}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="templateSelect" className="block text-sm font-medium text-gray-700 mb-1">
                Message Template
              </label>
              <select
                id="templateSelect"
                value={selectedTemplateId}
                onChange={handleTemplateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
              >
                {MESSAGE_TEMPLATES.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mt-2">
              <div className="text-sm font-medium text-gray-700 mb-2">Preview:</div>
              <div className="bg-gray-100 p-3 rounded-md text-xs md:text-sm max-h-40 overflow-y-auto whitespace-pre-wrap">
                {MESSAGE_TEMPLATES.find(t => t.id === selectedTemplateId)?.template(couponCode)}
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors mt-4"
            >
              <MessageSquare size={18} />
              Send on WhatsApp
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default WhatsAppShareModal; 