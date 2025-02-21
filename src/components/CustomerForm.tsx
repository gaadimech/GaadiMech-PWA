import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Car, Wrench } from 'lucide-react';
import { enquiryService } from '../services/enquiry';
import type { EnquiryFormData, ServiceType } from '../types/enquiry';

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceType?: number;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ isOpen, onClose, defaultServiceType }) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    mobileNumber: '',
    carModel: '',
    preferredDate: '',
    message: '',
    serviceType: undefined
  });
  
  const [errors, setErrors] = useState<Partial<EnquiryFormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

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
        message: '',
        serviceType: undefined
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id as keyof EnquiryFormData]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const getRelativeDateString = (dateStr: string): string => {
    if (!dateStr) return '(Today)';
    
    // Create dates using the date string in local timezone
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Calculate difference in days
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '(Today)';
    if (diffDays === 1) return '(Tomorrow)';
    return `(${diffDays} days to go)`;
  };

  useEffect(() => {
    if (!formData.preferredDate) {
      // Get today's date in YYYY-MM-DD format in local timezone
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;
      
      setFormData(prev => ({ ...prev, preferredDate: todayStr }));
    }
  }, []);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      if (!isOpen || hasAttemptedLoad) return; // Don't fetch if form is closed or we've already attempted

      setIsLoading(true);
      try {
        const response = await enquiryService.getServiceTypes();
        setServiceTypes(response.data);
        
        // Set default service type if available
        if (response.data.length > 0) {
          if (defaultServiceType) {
            setFormData(prev => ({ ...prev, serviceType: defaultServiceType }));
          } else {
            const defaultService = response.data.find(st => st.isDefault) || response.data[0];
            setFormData(prev => ({ ...prev, serviceType: defaultService.id }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch service types:', error);
      } finally {
        setIsLoading(false);
        setHasAttemptedLoad(true);
      }
    };

    fetchServiceTypes();
  }, [isOpen, defaultServiceType, hasAttemptedLoad]);

  useEffect(() => {
    if (!isOpen) {
      setHasAttemptedLoad(false);
      setIsLoading(true);
      setServiceTypes([]);
      setFormData(prev => ({
        ...prev,
        serviceType: undefined
      }));
    }
  }, [isOpen]);

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
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-32"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7200]"></div>
          </motion.div>
        ) : status === 'success' ? (
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

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center justify-between">
                  <span>Preferred Date *</span>
                  <span className="text-sm text-gray-500">
                    {getRelativeDateString(formData.preferredDate)}
                  </span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.preferredDate}
                  onChange={(e) => {
                    const date = e.target.value;
                    setFormData(prev => ({ ...prev, preferredDate: date }));
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                  Service Type *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Wrench className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="serviceType"
                    value={formData.serviceType || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        serviceType: value ? Number(value) : undefined
                      }));
                    }}
                    className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] appearance-none bg-white ${
                      isLoading ? 'opacity-50' : ''
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <option value="">Loading service types...</option>
                    ) : (
                      <>
                        <option value="" disabled>Select a service type</option>
                        {serviceTypes.map((type) => (
                          <option 
                            key={type.id} 
                            value={type.id}
                            className="py-2"
                          >
                            {type.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
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