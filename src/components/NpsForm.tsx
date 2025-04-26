import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, MessageSquare, Phone, X, Car } from 'lucide-react';
import { npsService } from '../services/nps';
import type { NpsFormData, ServiceType } from '../types/nps';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const NpsForm: React.FC = () => {
  const [formData, setFormData] = useState<NpsFormData>({
    score: 10,
    category: 'promoter',
    selectedFeatures: '',
    feedback: '',
    name: '',
    mobileNumber: '',
    carModel: '',
    serviceType: undefined,
    serviceDate: '',
    express90Mins: true
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof NpsFormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  
  const feedbackOptions = [
    { id: 'express', label: 'Express 90 MINS Service' },
    { id: 'communication', label: 'Communication' },
    { id: 'pickdrop', label: 'Pick and Drop' },
    { id: 'streaming', label: 'Live Streaming' },
    { id: 'updates', label: 'Real Time Updates' },
    { id: 'pricing', label: 'Affordable Pricing' }
  ];
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NpsFormData, string>> = {};
    const score = formData.score ?? 0;
    
    // Required fields validation
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
    
    if (score === null) {
      newErrors.score = 'Please select a score';
    }
    
    if (score >= 9 && !formData.selectedFeatures) {
      newErrors.selectedFeatures = 'Please select at least one option';
    } else if (score < 9 && !formData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleScoreSelect = (score: number) => {
    setFormData(prev => ({ ...prev, score }));
    if (errors.score) {
      setErrors(prev => ({ ...prev, score: undefined }));
    }
  };

  const handleFeedbackOptionToggle = (optionId: string) => {
    setFormData(prev => {
      const currentFeatures = prev.selectedFeatures ? prev.selectedFeatures.split(',') : [];
      const updatedFeatures = currentFeatures.includes(optionId)
        ? currentFeatures.filter(id => id !== optionId)
        : [...currentFeatures, optionId];
        
      return { 
        ...prev, 
        selectedFeatures: updatedFeatures.join(',')
      };
    });
    
    if (errors.selectedFeatures) {
      setErrors(prev => ({ ...prev, selectedFeatures: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Log the data being submitted to help debug
      console.log('Submitting form data:', formData);
      
      await npsService.submit(formData);
      setStatus('success');
      setShowCouponPopup(true);
      
      // Reset form
      setFormData({
        score: 10,
        category: 'promoter',
        selectedFeatures: '',
        feedback: '',
        name: '',
        mobileNumber: '',
        carModel: '',
        serviceType: undefined,
        serviceDate: '',
        express90Mins: true
      });
    } catch (error: any) {
      setStatus('error');
      
      // Extract a more helpful error message if possible
      let errorMsg = 'An error occurred. Please try again.';
      
      if (error.error?.message) {
        errorMsg = error.error.message;
      } else if (error.message) {
        errorMsg = error.message;
      } else if (typeof error === 'string') {
        errorMsg = error;
      } else if (error.error?.details?.errors) {
        // For Strapi validation errors
        const errors = error.error.details.errors;
        errorMsg = errors.map((err: any) => err.message).join(', ');
      }
      
      console.error('Form submission error:', error);
      setErrorMessage(errorMsg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof NpsFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Function to handle WhatsApp sharing for coupon
  const handleWhatsAppShare = () => {
    const message = encodeURIComponent("Hi GaadiMech, I just submitted my feedback and would like to receive the Rs.100 OFF Coupon Code!");
    window.open(`https://wa.me/+919811000780?text=${message}`, '_blank');
    setShowCouponPopup(false);
  };

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await npsService.getServiceTypes();
        setServiceTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch service types:', error);
      }
    };

    fetchServiceTypes();
  }, []);

  // Set today's date as default
  useEffect(() => {
    if (!formData.serviceDate) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;
      
      setFormData(prev => ({ ...prev, serviceDate: todayStr }));
    }
  }, []);

  // Get the feedback question based on the score
  const getFeedbackQuestion = (): string => {
    if (formData.score === null) return 'Please provide your feedback';
    if (formData.score <= 6) return 'What could we do better to improve your experience?';
    if (formData.score <= 8) return 'What would it take for you to give us a higher rating?';
    return 'What did you love most about your experience with GaadiMech?';
  };

  // Get the color class for a score button
  const getScoreButtonClass = (score: number, isSelected: boolean): string => {
    if (isSelected) {
      if (score <= 6) return 'bg-red-500 text-white shadow-md';
      if (score <= 8) return 'bg-yellow-500 text-white shadow-md';
      return 'bg-green-500 text-white shadow-md scale-110'; // Slightly enlarged for 9-10
    }
    
    // Not selected - use a gradient of colors to encourage higher scores
    if (score <= 3) return 'bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 border border-gray-300';
    if (score <= 6) return 'bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 border border-gray-300';
    if (score <= 8) return 'bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-700 border border-gray-300';
    return 'bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 border-2 border-green-300 hover:scale-110 transition-transform'; // Encouraging visual for 9-10
  };

  // WhatsApp Coupon Popup
  const CouponPopup = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-4 m-4 rounded-lg shadow-lg max-w-sm w-full relative"
      >
        <button 
          onClick={() => setShowCouponPopup(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
        
        <div className="mb-3 flex justify-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Get ₹100 OFF Coupon!</h3>
        <p className="text-sm text-center text-gray-600 mb-4">
          Share your feedback with us on WhatsApp to receive your exclusive ₹100 OFF Coupon Code for your next service!
        </p>
        
        <button
          onClick={handleWhatsAppShare}
          className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Share on WhatsApp
        </button>
        
        <p className="text-xs text-center text-gray-500 mt-3">
          *Coupon will be sent to you through WhatsApp after verification
        </p>
      </motion.div>
    </div>
  );

  if (status === 'success' && !showCouponPopup) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg text-center"
      >
        <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center rounded-full bg-green-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Thank You!</h2>
        <p className="text-sm mb-4 text-gray-600">Your feedback is incredibly valuable to us and helps us improve our services.</p>
        
        <div className="mt-4">
          <h3 className="text-base font-semibold mb-2">Share your experience</h3>
          <div className="flex justify-center space-x-3">
            <a 
              className="share-button facebook" 
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.gaadimech.com"
            >
              <FaFacebook /> Share
            </a>
            <a 
              className="share-button twitter" 
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/intent/tweet?text=I just had a great experience with GaadiMech!&url=https://www.gaadimech.com`}
            >
              <FaTwitter /> Tweet
            </a>
            <a 
              className="share-button whatsapp" 
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/?text=I just had a great experience with GaadiMech! Check them out at https://www.gaadimech.com"
            >
              <FaWhatsapp /> Share
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-2 sm:p-4 bg-white">
      {showCouponPopup && <CouponPopup />}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* 1. Name (Required) */}
        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ayush Sharma"
            />
            <User className="absolute top-2.5 left-2.5 text-gray-400" size={16} />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        
        {/* 2. Mobile Number (Required) */}
        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              required
              className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength={10}
            />
            <Phone className="absolute top-2.5 left-2.5 text-gray-400" size={16} />
          </div>
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
          )}
        </div>
        
        {/* New: Car Model (Required) */}
        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
          <label htmlFor="carModel" className="block text-sm font-medium text-gray-700 mb-1">
            Car Model <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="carModel"
              name="carModel"
              required
              className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={formData.carModel}
              onChange={handleChange}
              placeholder="Swift, Baleno, i20"
            />
            <Car className="absolute top-2.5 left-2.5 text-gray-400" size={16} />
          </div>
          {errors.carModel && (
            <p className="text-red-500 text-xs mt-1">{errors.carModel}</p>
          )}
        </div>
        
        {/* 3. Service Used (with Express as default) */}
        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Service Used</label>
          <select
            id="serviceType"
            name="serviceType"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white"
            value={formData.serviceType || ''}
            onChange={handleChange}
          >
            <option value="">Select a service</option>
            {serviceTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          
          {/* Express 90 mins checkbox - highlighted and checked by default */}
          <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-md">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="express90Mins"
                className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4"
                checked={formData.express90Mins}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700 font-medium">Express 90 MINS Service</span>
              <span className="ml-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">Recommended</span>
            </label>
          </div>
        </div>
        
        {/* 4. Feedback Date */}
        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
          <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700 mb-1">Feedback Date</label>
          <input
            type="date"
            id="serviceDate"
            name="serviceDate"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={formData.serviceDate}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        {/* 5. NPS Score Selection */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-2 border-orange-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 text-center">
            How likely are you to recommend GaadiMech?
          </h2>
          
          <div className="flex justify-between gap-0.5 sm:gap-1 mb-3">
            {Array.from({ length: 11 }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all text-sm sm:text-base
                  ${getScoreButtonClass(i, formData.score === i)}`}
                onClick={() => handleScoreSelect(i)}
              >
                {i}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between text-xs sm:text-sm mt-2">
            <span className="text-red-600 font-medium">Not likely</span>
            <div className="text-center flex-1 mx-2">
              <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full mt-1"></div>
            </div>
            <span className="text-green-600 font-medium">Extremely likely</span>
          </div>
          
          {errors.score && (
            <p className="text-red-500 text-xs mt-1">{errors.score}</p>
          )}
        </div>
        
        {/* 6. Feedback Question */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-2 border-orange-200">
          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-3 text-center">
            {getFeedbackQuestion()}
          </label>
          
          {(formData.score ?? 0) >= 9 ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {feedbackOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    className={`p-2 sm:p-3 rounded-lg border text-left transition-all flex items-center text-xs sm:text-sm
                      ${formData.selectedFeatures.includes(option.id)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    onClick={() => handleFeedbackOptionToggle(option.id)}
                  >
                    <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center border
                      ${formData.selectedFeatures.includes(option.id)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-400'
                      }`}
                    >
                      {formData.selectedFeatures.includes(option.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm sm:text-base">{option.label}</span>
                  </button>
                ))}
              </div>
              {errors.selectedFeatures && (
                <p className="text-red-500 text-xs mt-1">{errors.selectedFeatures}</p>
              )}
              <textarea
                name="feedback"
                rows={3}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Any additional comments? (Optional)"
              />
            </div>
          ) : (
            <div className="relative">
              <textarea
                id="feedback"
                name="feedback"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Your feedback helps us improve"
              />
              {errors.feedback && (
                <p className="text-red-500 text-xs mt-1">{errors.feedback}</p>
              )}
            </div>
          )}
        </div>
        
        {/* Privacy Notice */}
        <div className="text-xs text-gray-500">
          <p>
            By submitting, you consent to GaadiMech processing your data in accordance with our 
            <a href="/privacy-policy" className="text-orange-500 hover:underline ml-1">Privacy Policy</a>.
          </p>
        </div>
        
        {/* 7. Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-2.5 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors
              ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
        
        {/* Error Message */}
        {status === 'error' && (
          <div className="p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default NpsForm; 