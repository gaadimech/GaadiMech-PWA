import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import Modal from 'react-modal';

interface SimpleFranchiseFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Get the API URL from Vite environment variables or use a default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SimpleFranchiseForm: React.FC<SimpleFranchiseFormProps> = ({ isOpen, onClose }) => {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Applicant Details
    name: '',
    mobileNumber: '',
    email: '',
    city: '',
    priorExperience: '',
    
    // Step 2: Premise Details
    premiseOwnership: '',
    location: '',
    premiseSize: '',
    investmentCapacity: '',
    currentOccupation: ''
  });

  // Form validation state
  const [errors, setErrors] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    city: '',
    priorExperience: '',
    premiseOwnership: '',
    location: '',
    premiseSize: '',
    investmentCapacity: '',
    currentOccupation: ''
  });

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        if (!isOpen) {
          resetForm();
        }
      }, 300);
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmissionError('');
    setDebugInfo('');
    setFormData({
      name: '',
      mobileNumber: '',
      email: '',
      city: '',
      priorExperience: '',
      premiseOwnership: '',
      location: '',
      premiseSize: '',
      investmentCapacity: '',
      currentOccupation: ''
    });
    setErrors({
      name: '',
      mobileNumber: '',
      email: '',
      city: '',
      priorExperience: '',
      premiseOwnership: '',
      location: '',
      premiseSize: '',
      investmentCapacity: '',
      currentOccupation: ''
    });
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate step 1
  const validateStep1 = () => {
    const newErrors = { ...errors };
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    
    if (!formData.priorExperience) {
      newErrors.priorExperience = 'Please select your prior experience';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Validate step 2
  const validateStep2 = () => {
    const newErrors = { ...errors };
    let isValid = true;
    
    if (!formData.premiseOwnership) {
      newErrors.premiseOwnership = 'Please select premise ownership status';
      isValid = false;
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location area is required';
      isValid = false;
    }
    
    if (!formData.premiseSize) {
      newErrors.premiseSize = 'Please select premise size';
      isValid = false;
    }
    
    if (!formData.investmentCapacity) {
      newErrors.investmentCapacity = 'Please select investment capacity';
      isValid = false;
    }
    
    if (!formData.currentOccupation.trim()) {
      newErrors.currentOccupation = 'Current occupation is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Navigate between steps
  const handleNextStep = () => {
    if (validateStep1()) {
      setFormStep(2);
      // Scroll to top when changing steps on mobile
      if (window.innerWidth < 768) {
        const modalContent = document.querySelector('.ReactModal__Content');
        if (modalContent) modalContent.scrollTop = 0;
      }
    }
  };

  const handlePrevStep = () => {
    setFormStep(1);
    // Scroll to top when changing steps on mobile
    if (window.innerWidth < 768) {
      const modalContent = document.querySelector('.ReactModal__Content');
      if (modalContent) modalContent.scrollTop = 0;
    }
  };

  // Handle modal close
  const handleCloseAttempt = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Debug API access
  const testApiAccess = async () => {
    try {
      // Test API access with general request
      const testResponse = await fetch(`${API_URL}/api`, {
        method: 'GET'
      });
      
      const testInfo = `API Root access: ${testResponse.status} ${testResponse.statusText}`;
      setDebugInfo(prev => prev + testInfo + '\n');

      // Try to access the collection (read-only)
      const readTest = await fetch(`${API_URL}/api/new-franchise-applications`, {
        method: 'GET'
      });
      
      const readInfo = `Collection GET test: ${readTest.status} ${readTest.statusText}`;
      setDebugInfo(prev => prev + readInfo + '\n');
      
      return testResponse.ok;
    } catch (error) {
      const errorMsg = `API connection error: ${error instanceof Error ? error.message : String(error)}`;
      setDebugInfo(prev => prev + errorMsg + '\n');
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionError('');
    setDebugInfo('');
    
    // First check API access
    await testApiAccess();
    
    try {
      // Prepare data using camelCase field names matching the Strapi setup
      const submissionData = {
        data: {
          name: formData.name.trim(),
          mobileNumber: formData.mobileNumber.trim(),
          email: formData.email.trim(),
          city: formData.city.trim(),
          priorExperience: formData.priorExperience,
          premiseOwnership: formData.premiseOwnership,
          location: formData.location.trim(),
          premiseSize: formData.premiseSize,
          investmentCapacity: formData.investmentCapacity,
          currentOccupation: formData.currentOccupation.trim()
        }
      };
      
      const requestLog = `Sending data: ${JSON.stringify(submissionData)}`;
      setDebugInfo(prev => prev + requestLog + '\n');
      
      // Try with the plural collection name first (as shown in the screenshot)
      // NOTE: Strapi API ID might still be an issue if it's not exactly 'new-franchise-applications' or 'new-franchise-application'
      const response = await fetch(`${API_URL}/api/new-franchise-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
      
      const responseInfo = `Response: ${response.status} ${response.statusText}`;
      setDebugInfo(prev => prev + responseInfo + '\n');
      
      let responseText = '';
      try {
        responseText = await response.text();
        setDebugInfo(prev => prev + `Response body: ${responseText}\n`);
      } catch (error) {
        setDebugInfo(prev => prev + `Error reading response: ${error instanceof Error ? error.message : String(error)}\n`);
      }
      
      if (response.ok) {
        setIsSubmitted(true);
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setTimeout(resetForm, 300);
        }, 3000);
      } else if (response.status === 405 || response.status === 404) {
        // Try with singular endpoint if 405 Method Not Allowed or 404 Not Found
        setDebugInfo(prev => prev + "Trying singular endpoint...\n");
        
        const singularResponse = await fetch(`${API_URL}/api/new-franchise-application`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionData)
        });
        
        const singularInfo = `Singular endpoint response: ${singularResponse.status} ${singularResponse.statusText}`;
        setDebugInfo(prev => prev + singularInfo + '\n');
        
        if (singularResponse.ok) {
          setIsSubmitted(true);
          
          // Close modal after 3 seconds
          setTimeout(() => {
            onClose();
            setTimeout(resetForm, 300);
          }, 3000);
        } else {
          const singularText = await singularResponse.text();
          setDebugInfo(prev => prev + `Singular response body: ${singularText}\n`);
          setSubmissionError(`Failed to submit form: ${singularResponse.status} ${singularResponse.statusText}. Check API endpoint and permissions.`);
        }
      } else {
        setSubmissionError(`Failed to submit form: ${response.status} ${response.statusText}. Check API endpoint and permissions.`);
      }
    } catch (error) {
      const errorMsg = `Network error: ${error instanceof Error ? error.message : String(error)}`;
      setDebugInfo(prev => prev + errorMsg + '\n');
      setSubmissionError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseAttempt}
      shouldCloseOnOverlayClick={!isSubmitting}
      shouldCloseOnEsc={!isSubmitting}
      className="sm:max-w-2xl w-full mx-auto mt-0 sm:mt-10 mb-0 sm:mb-10 bg-white p-0 rounded-none sm:rounded-2xl shadow-2xl outline-none max-h-[100vh] sm:max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
      ariaHideApp={false}
    >
      {isSubmitted ? (
        <div className="p-6 sm:p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Franchise Application Submitted!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Thank you for your interest in the GaadiMech Franchise. Our team will contact you shortly to discuss the next steps.
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#FF7200] to-[#FF8800] text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center bg-gradient-to-r from-[#FF7200] to-[#FF8800] text-white p-5 sm:p-6 sticky top-0 z-20">
            <h2 className="text-xl font-bold">Franchise Application Form</h2>
            <button 
              onClick={handleCloseAttempt} 
              className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
              aria-label="Close form"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-5 sm:p-7">
            {submissionError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertTriangle className="text-red-500 w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{submissionError}</p>
              </div>
            )}
            
            {debugInfo && (
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs font-mono whitespace-pre-wrap overflow-auto max-h-40">{debugInfo}</p>
              </div>
            )}
            
            <div className="flex mb-8 relative">
              <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10"></div>
              <div className={`flex-1 text-center relative ${formStep === 1 ? 'text-[#FF7200] font-semibold' : 'text-gray-500'}`}>
                <div className={`w-9 h-9 rounded-full ${formStep === 1 ? 'bg-gradient-to-r from-[#FF7200] to-[#FF8800]' : 'bg-gray-200'} text-white flex items-center justify-center mx-auto mb-3 shadow-md transition-all duration-300`}>
                  1
                </div>
                <div className="text-sm sm:text-base">Applicant Details</div>
              </div>
              <div className={`flex-1 text-center ${formStep === 2 ? 'text-[#FF7200] font-semibold' : 'text-gray-500'}`}>
                <div className={`w-9 h-9 rounded-full ${formStep === 2 ? 'bg-gradient-to-r from-[#FF7200] to-[#FF8800]' : 'bg-gray-200'} text-white flex items-center justify-center mx-auto mb-3 shadow-md transition-all duration-300`}>
                  2
                </div>
                <div className="text-sm sm:text-base">Premise Details</div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
              {formStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 sm:p-3.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none shadow-sm transition-all`}
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className={`w-full p-3 sm:p-3.5 border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none shadow-sm transition-all`}
                      placeholder="Your 10-digit mobile number"
                      autoComplete="tel"
                    />
                    {errors.mobileNumber && <p className="text-red-500 text-xs mt-1.5">{errors.mobileNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 sm:p-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none shadow-sm transition-all`}
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-3 sm:p-3.5 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none shadow-sm transition-all`}
                      placeholder="Your city"
                      autoComplete="address-level2"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1.5">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prior Experience in Automobile Sector <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6 flex-wrap">
                      <label className="inline-flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-[#FF7200]/50 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="priorExperience"
                          value="yes"
                          checked={formData.priorExperience === 'yes'}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#FF7200] focus:ring-[#FF7200] mr-2"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="inline-flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-[#FF7200]/50 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="priorExperience"
                          value="no"
                          checked={formData.priorExperience === 'no'}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#FF7200] focus:ring-[#FF7200] mr-2"
                        />
                        <span>No</span>
                      </label>
                    </div>
                    {errors.priorExperience && <p className="text-red-500 text-xs mt-1.5">{errors.priorExperience}</p>}
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Premise is <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6 flex-wrap">
                      <label className="inline-flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-[#FF7200]/50 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="premiseOwnership"
                          value="owned"
                          checked={formData.premiseOwnership === 'owned'}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#FF7200] focus:ring-[#FF7200] mr-2"
                        />
                        <span>Owned</span>
                      </label>
                      <label className="inline-flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-[#FF7200]/50 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="premiseOwnership"
                          value="rented"
                          checked={formData.premiseOwnership === 'rented'}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#FF7200] focus:ring-[#FF7200] mr-2"
                        />
                        <span>Rented</span>
                      </label>
                    </div>
                    {errors.premiseOwnership && <p className="text-red-500 text-xs mt-1.5">{errors.premiseOwnership}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Location - Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full p-3 sm:p-3.5 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none shadow-sm transition-all`}
                      placeholder="Enter location area"
                    />
                    {errors.location && <p className="text-red-500 text-xs mt-1.5">{errors.location}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="premiseSize" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Premise Size <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="premiseSize"
                        name="premiseSize"
                        value={formData.premiseSize}
                        onChange={handleChange}
                        className={`w-full p-3 sm:p-3.5 border ${errors.premiseSize ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none shadow-sm transition-all appearance-none bg-white pr-10`}
                      >
                        <option value="">Please select</option>
                        <option value="less-than-1000">Less than 1000 SqFt</option>
                        <option value="1000-to-2000">1000 to 2000 SqFt</option>
                        <option value="more-than-2000">More than 2000 SqFt</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                        <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.premiseSize && <p className="text-red-500 text-xs mt-1.5">{errors.premiseSize}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="investmentCapacity" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Investment Capacity <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="investmentCapacity"
                        name="investmentCapacity"
                        value={formData.investmentCapacity}
                        onChange={handleChange}
                        className={`w-full p-3 sm:p-3.5 border ${errors.investmentCapacity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none shadow-sm transition-all appearance-none bg-white pr-10`}
                      >
                        <option value="">Please select</option>
                        <option value="5-10-lakhs">5 to 10 Lakhs</option>
                        <option value="10-20-lakhs">10 to 20 Lakhs</option>
                        <option value="20-30-lakhs">20 to 30 Lakhs</option>
                        <option value="30-plus-lakhs">30 Lakh+</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                        <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.investmentCapacity && <p className="text-red-500 text-xs mt-1.5">{errors.investmentCapacity}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="currentOccupation" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Current Occupation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="currentOccupation"
                      name="currentOccupation"
                      value={formData.currentOccupation}
                      onChange={handleChange}
                      className={`w-full p-3 sm:p-3.5 border ${errors.currentOccupation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none shadow-sm transition-all`}
                      placeholder="Enter your current occupation"
                    />
                    {errors.currentOccupation && <p className="text-red-500 text-xs mt-1.5">{errors.currentOccupation}</p>}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-10 sticky bottom-0 pt-4 pb-2 bg-white border-t border-gray-100">
                {formStep === 1 ? (
                  <>
                    <button 
                      type="button" 
                      onClick={handleCloseAttempt}
                      className="order-2 sm:order-1 text-gray-600 hover:text-gray-800 font-medium transition-colors sm:block w-full sm:w-auto text-center sm:text-left"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      onClick={handleNextStep}
                      className="order-1 sm:order-2 w-full sm:w-auto bg-gradient-to-r from-[#FF7200] to-[#FF8800] text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all shadow-md transform hover:-translate-y-0.5"
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      type="button" 
                      onClick={handlePrevStep}
                      className="order-2 sm:order-1 w-full sm:w-auto bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-lg hover:bg-gray-300 transition-all shadow-sm"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="order-1 sm:order-2 w-full sm:w-auto bg-gradient-to-r from-[#FF7200] to-[#FF8800] text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all shadow-md transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </Modal>
  );
};

export default SimpleFranchiseForm; 