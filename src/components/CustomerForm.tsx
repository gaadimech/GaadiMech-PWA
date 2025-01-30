import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Car } from 'lucide-react';
import { enquiryService } from '../services/enquiry';
import type { EnquiryFormData } from '../types/enquiry';

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    mobileNumber: '',
    carModel: '',
    preferredDate: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<EnquiryFormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<EnquiryFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.carModel.trim()) {
      newErrors.carModel = 'Car model is required';
    }
    
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await enquiryService.submit(formData);
      setStatus('success');
      setFormData({
        name: '',
        mobileNumber: '',
        carModel: '',
        preferredDate: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id as keyof EnquiryFormData]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const getRelativeDateString = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days from Today`;
  };

  useEffect(() => {
    if (!formData.preferredDate) {
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, preferredDate: today }));
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto mt-20 p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <AnimatePresence>
        {status === 'success' ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="text-center"
          >
            <div className="bg-green-50 text-green-600 p-4 rounded-md mb-4">
              <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
              <p>Your service request has been received. We'll contact you shortly.</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </motion.div>
        ) : (
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
              <h2 className="text-2xl font-bold text-gray-900">Schedule Your Service</h2>
              <p className="text-gray-600 mt-1">Book your car service in just a few clicks!</p>
            </div>

            {status === 'error' && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-md shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Akash Sharma"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="relative">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-md shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] ${
                      errors.mobileNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="9876543210"
                  />
                </div>
                {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>}
              </div>

              <div className="relative">
                <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">Car Model *</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Car className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-md shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] ${
                      errors.carModel ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Honda City 2020"
                  />
                </div>
                {errors.carModel && <p className="mt-1 text-sm text-red-600">{errors.carModel}</p>}
              </div>

              <div className="relative">
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">
                  Preferred Date * {formData.preferredDate && <span className="text-gray-500 ml-2">({getRelativeDateString(formData.preferredDate)})</span>}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className={`pl-10 block w-full rounded-md shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] ${
                      errors.preferredDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.preferredDate && <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#FF7200] text-white px-4 py-2 rounded-md hover:bg-[#cc5b00] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : 'Schedule Service'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default CustomerForm;