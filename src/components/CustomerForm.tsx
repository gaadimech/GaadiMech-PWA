import React, { useState } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Car } from 'lucide-react';

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    car: '',
    preferred_date: '',
    service_type: 'general'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Implement form submission to Strapi
    // For now, just simulate success
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        mobile: '',
        car: '',
        preferred_date: '',
        service_type: 'general'
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
                An error occurred. Please try again.
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
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="car" className="block text-sm font-medium text-gray-700">Car Model *</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Car className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="car"
                    required
                    value={formData.car}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    placeholder="e.g., Honda City 2020"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700">Preferred Date *</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="preferred_date"
                    required
                    value={formData.preferred_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                  />
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