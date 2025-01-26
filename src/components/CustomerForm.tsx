import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Car } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ isOpen, onClose }) => {
  // Get current IST date
  const getISTDate = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istDate = new Date(now.getTime() + istOffset);
    return istDate.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    car: '',
    preferred_date: getISTDate(),
    service_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [relativeDateText, setRelativeDateText] = useState('Today');

  useEffect(() => {
    const updateRelativeDate = () => {
      // Parse the date in IST
      const [year, month, day] = formData.preferred_date.split('-');
      const selectedDate = new Date(Number(year), Number(month) - 1, Number(day));
      const today = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      
      // Convert both dates to IST
      const selectedDateIST = new Date(selectedDate.getTime() + istOffset);
      const todayIST = new Date(today.getTime() + istOffset);
      
      // Reset both dates to midnight for accurate comparison
      selectedDateIST.setHours(0, 0, 0, 0);
      todayIST.setHours(0, 0, 0, 0);
      
      const diffTime = selectedDateIST.getTime() - todayIST.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        setRelativeDateText('Today');
      } else if (diffDays === 1) {
        setRelativeDateText('Tomorrow');
      } else if (diffDays < 0) {
        setRelativeDateText(`${Math.abs(diffDays)} days ago`);
      } else {
        setRelativeDateText(`${diffDays} days from now`);
      }
    };
    
    updateRelativeDate();
  }, [formData.preferred_date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('popup_leads')
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ 
          name: '', 
          mobile: '', 
          car: '', 
          preferred_date: getISTDate(), 
          service_type: 'general' 
        });
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto mt-20 p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <div className="bg-green-50 text-green-600 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Service Scheduled Successfully!</h3>
              <p>Our team will contact you shortly.</p>
            </div>
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

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {error}
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
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    placeholder="Akash Sharma"
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
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="car" className="block text-sm font-medium text-gray-700">Vehicle Details *</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Car className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="car"
                    required
                    value={formData.car}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    placeholder="Car Model"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700">Preferred Date *</label>
                  <input
                    type="date"
                    id="preferred_date"
                    required
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    min={getISTDate()}
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mt-7">{relativeDateText}</span>
                </div>
              </div>

              <div>
                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">Service Type *</label>
                <select
                  id="service_type"
                  required
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                >
                  <option value="general">General Service</option>
                  <option value="ac">AC Service</option>
                  <option value="denting">Denting & Painting</option>
                  <option value="emergency">Emergency Service</option>
                  <option value="battery">Battery Service</option>
                  <option value="tyre">Tyre Service</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF7200] text-white px-6 py-3 rounded-md hover:bg-[#0e5aa8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Scheduling...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="h-5 w-5" />
                    <span>Schedule Service</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default CustomerForm;