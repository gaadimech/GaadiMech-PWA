import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, MessageSquare, Phone } from 'lucide-react';
import { npsService } from '../services/nps';
import type { NpsFormData, ServiceType } from '../types/nps';

const NpsForm: React.FC = () => {
  const [formData, setFormData] = useState<NpsFormData>({
    score: 10,
    category: 'promoter',
    selectedFeatures: '',
    feedback: '',
    name: '',
    mobileNumber: '',
    serviceType: undefined,
    serviceDate: '',
    express90Mins: true
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof NpsFormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  
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
    
    if (score === null) {
      newErrors.score = 'Please select a score';
    }
    
    if (score >= 9 && !formData.selectedFeatures) {
      newErrors.selectedFeatures = 'Please select at least one option';
    } else if (score < 9 && !formData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
    }
    
    if (formData.mobileNumber && !/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
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
      await npsService.submit(formData);
      setStatus('success');
      
      // Reset form
      setFormData({
        score: 10,
        category: 'promoter',
        selectedFeatures: '',
        feedback: '',
        name: '',
        mobileNumber: '',
        serviceType: undefined,
        serviceDate: '',
        express90Mins: true
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
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

  if (status === 'success') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center"
      >
        <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center rounded-full bg-green-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Thank You!</h2>
        <p className="text-base mb-5 text-gray-600">Your feedback is incredibly valuable to us and helps us improve our services.</p>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Share your experience</h3>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://www.facebook.com/sharer/sharer.php?u=https://gaadimech.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?text=I just had a great experience with GaadiMech!&url=https://gaadimech.com`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.072 10.072 0 01-3.127 1.184 4.91 4.91 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.161a4.96 4.96 0 001.52 6.575 4.94 4.94 0 01-2.224-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
              </svg>
            </a>
            <a 
              href="https://wa.me/?text=I just had a great experience with GaadiMech! Check them out at https://gaadimech.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NPS Score Selection */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            How likely are you to recommend GaadiMech?
          </h2>
          
          <div className="flex justify-between gap-1 sm:gap-2 mb-2">
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
          
          <div className="flex justify-between text-xs sm:text-sm mt-1">
            <span className="text-red-600">Not likely</span>
            <div className="text-center flex-1 mx-2">
              <div className="h-1 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full mt-1"></div>
            </div>
            <span className="text-green-600 font-medium">Extremely likely</span>
          </div>
          
          {errors.score && (
            <p className="text-red-500 text-xs mt-1">{errors.score}</p>
          )}
        </div>
        
        {/* Feedback Question */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-base font-semibold text-gray-800 mb-3">
            {getFeedbackQuestion()}
          </label>
          
          {(formData.score ?? 0) >= 9 ? (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {feedbackOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    className={`p-3 rounded-lg border text-left transition-all flex items-center
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
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
              {errors.selectedFeatures && (
                <p className="text-red-500 text-xs mt-1">{errors.selectedFeatures}</p>
              )}
              <textarea
                name="feedback"
                rows={2}
                className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Additional Information (Optional)</h3>
          
          <div className="space-y-3">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                <User className="absolute top-2.5 left-2.5 text-gray-400" size={16} />
              </div>
            </div>
            
            {/* Mobile Number */}
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="relative">
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Service Type */}
              <div>
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
              </div>
              
              {/* Service Date */}
              <div>
                <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700 mb-1">Date of Service</label>
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
            </div>
          </div>
          
          {/* Express 90 mins checkbox - now highlighted and checked by default */}
          <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-md">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="express90Mins"
                className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4"
                checked={formData.express90Mins}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700 font-medium">I used the Express 90 MINS Service</span>
              <span className="ml-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">Recommended</span>
            </label>
          </div>
        </div>
        
        {/* Privacy Notice */}
        <div className="text-xs text-gray-500">
          <p>
            By submitting, you consent to GaadiMech processing your data in accordance with our 
            <a href="/privacy-policy" className="text-orange-500 hover:underline ml-1">Privacy Policy</a>.
          </p>
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-3 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors
              ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
        
        {/* Error Message */}
        {status === 'error' && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default NpsForm; 