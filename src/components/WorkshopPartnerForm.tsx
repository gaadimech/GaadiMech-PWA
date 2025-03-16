import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import Modal from 'react-modal';

interface WorkshopPartnerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WorkshopPartnerForm: React.FC<WorkshopPartnerFormProps> = ({ isOpen, onClose }) => {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    workshopName: '',
    workshopAddress: '',
    city: '',
    workshopAge: '',
    numTechnicians: '',
    serviceTypes: [] as string[],
    monthlyVehicles: '',
    heardFrom: '',
    additionalInfo: ''
  });

  // Form validation state
  const [errors, setErrors] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    workshopName: '',
    workshopAddress: '',
    city: '',
    workshopAge: '',
    numTechnicians: '',
    serviceTypes: '',
    monthlyVehicles: '',
    heardFrom: ''
  });

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      // Reset form data and errors after modal is fully closed
      setTimeout(() => {
        if (!isOpen) {
          setFormStep(1);
          setIsSubmitted(false);
          setIsSubmitting(false);
          setFormData({
            ownerName: '',
            ownerPhone: '',
            ownerEmail: '',
            workshopName: '',
            workshopAddress: '',
            city: '',
            workshopAge: '',
            numTechnicians: '',
            serviceTypes: [] as string[],
            monthlyVehicles: '',
            heardFrom: '',
            additionalInfo: ''
          });
          setErrors({
            ownerName: '',
            ownerPhone: '',
            ownerEmail: '',
            workshopName: '',
            workshopAddress: '',
            city: '',
            workshopAge: '',
            numTechnicians: '',
            serviceTypes: '',
            monthlyVehicles: '',
            heardFrom: ''
          });
        }
      }, 300);
    }
  }, [isOpen]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        serviceTypes: [...prevData.serviceTypes, value]
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        serviceTypes: prevData.serviceTypes.filter(type => type !== value)
      }));
    }
    
    // Clear service types error if at least one is selected
    if (errors.serviceTypes && checked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        serviceTypes: ''
      }));
    }
  };

  // Validate step 1
  const validateStep1 = () => {
    const newErrors = {
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      workshopName: '',
      workshopAddress: '',
      city: '',
      workshopAge: '',
      numTechnicians: '',
      serviceTypes: '',
      monthlyVehicles: '',
      heardFrom: ''
    };
    
    let isValid = true;
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Name is required';
      isValid = false;
    }
    
    if (!formData.ownerPhone.trim()) {
      newErrors.ownerPhone = 'Phone number is required';
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.ownerPhone)) {
      newErrors.ownerPhone = 'Enter a valid 10-digit Indian phone number';
      isValid = false;
    }
    
    if (!formData.ownerEmail.trim()) {
      newErrors.ownerEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = 'Enter a valid email address';
      isValid = false;
    }
    
    if (!formData.workshopName.trim()) {
      newErrors.workshopName = 'Workshop name is required';
      isValid = false;
    }
    
    if (!formData.workshopAddress.trim()) {
      newErrors.workshopAddress = 'Workshop address is required';
      isValid = false;
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Validate step 2
  const validateStep2 = () => {
    const newErrors = {
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      workshopName: '',
      workshopAddress: '',
      city: '',
      workshopAge: '',
      numTechnicians: '',
      serviceTypes: '',
      monthlyVehicles: '',
      heardFrom: ''
    };
    
    let isValid = true;
    
    if (!formData.workshopAge) {
      newErrors.workshopAge = 'Please select workshop age';
      isValid = false;
    }
    
    if (!formData.numTechnicians) {
      newErrors.numTechnicians = 'Please select number of technicians';
      isValid = false;
    }
    
    if (formData.serviceTypes.length === 0) {
      newErrors.serviceTypes = 'Please select at least one service type';
      isValid = false;
    }
    
    if (!formData.monthlyVehicles) {
      newErrors.monthlyVehicles = 'Please select monthly vehicles serviced';
      isValid = false;
    }
    
    if (!formData.heardFrom) {
      newErrors.heardFrom = 'Please select how you heard about us';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Go to next step
  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    if (formStep === 1) {
      if (validateStep1()) {
        setFormStep(2);
      }
    }
  };

  // Go to previous step
  const handlePrevStep = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    if (formStep === 2) {
      setFormStep(1);
    }
  };

  // Handle modal close attempt
  const handleCloseAttempt = () => {
    // If form is being submitted, don't close
    if (isSubmitting) return;
    onClose();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validate step 2 before submitting
    if (!validateStep2()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would normally send the form data to your backend
      // For now, we'll just simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set submitted state to true to show success message
      setIsSubmitted(true);
      
      // Optional: send the data to the server
      // const response = await fetch('/api/workshop-partners', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // Reset form after 3 seconds and close
      setTimeout(() => {
        onClose();
        
        // Reset form state after modal is closed
        setTimeout(() => {
          setFormData({
            ownerName: '',
            ownerPhone: '',
            ownerEmail: '',
            workshopName: '',
            workshopAddress: '',
            city: '',
            workshopAge: '',
            numTechnicians: '',
            serviceTypes: [] as string[],
            monthlyVehicles: '',
            heardFrom: '',
            additionalInfo: ''
          });
          setFormStep(1);
          setIsSubmitted(false);
        }, 300);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseAttempt}
      shouldCloseOnOverlayClick={!isSubmitting}
      shouldCloseOnEsc={!isSubmitting}
      className="max-w-2xl mx-auto mt-10 mb-10 bg-white p-0 rounded-2xl shadow-2xl outline-none max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
      ariaHideApp={false}
    >
      {isSubmitted ? (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in partnering with GaadiMech. Our team will contact you within 24 hours to discuss next steps.
          </p>
          <button
            onClick={onClose}
            className="bg-[#FF7200] text-white font-semibold py-2 px-6 rounded-lg"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center bg-[#FF7200] text-white p-6 rounded-t-2xl">
            <h2 className="text-xl font-bold">Partner Application Form</h2>
            <button onClick={handleCloseAttempt} className="text-white" type="button">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex mb-8">
              <div className={`flex-1 text-center relative ${formStep === 1 ? 'text-[#FF7200] font-semibold' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full ${formStep === 1 ? 'bg-[#FF7200]' : 'bg-gray-200'} text-white flex items-center justify-center mx-auto mb-2`}>
                  1
                </div>
                <div>Basic Info</div>
                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
              </div>
              <div className={`flex-1 text-center ${formStep === 2 ? 'text-[#FF7200] font-semibold' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full ${formStep === 2 ? 'bg-[#FF7200]' : 'bg-gray-200'} text-white flex items-center justify-center mx-auto mb-2`}>
                  2
                </div>
                <div>Workshop Details</div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
              {formStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.ownerName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                        placeholder="Enter your full name"
                      />
                      {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="ownerPhone"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.ownerPhone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                        placeholder="Your 10-digit mobile number"
                      />
                      {errors.ownerPhone && <p className="text-red-500 text-xs mt-1">{errors.ownerPhone}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="ownerEmail"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.ownerEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                      placeholder="your@email.com"
                    />
                    {errors.ownerEmail && <p className="text-red-500 text-xs mt-1">{errors.ownerEmail}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="workshopName" className="block text-sm font-medium text-gray-700 mb-1">
                      Workshop Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="workshopName"
                      name="workshopName"
                      value={formData.workshopName}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.workshopName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                      placeholder="Enter your workshop name"
                    />
                    {errors.workshopName && <p className="text-red-500 text-xs mt-1">{errors.workshopName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="workshopAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Workshop Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="workshopAddress"
                      name="workshopAddress"
                      value={formData.workshopAddress}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.workshopAddress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                      placeholder="Enter complete workshop address"
                    />
                    {errors.workshopAddress && <p className="text-red-500 text-xs mt-1">{errors.workshopAddress}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                      placeholder="Your city"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="workshopAge" className="block text-sm font-medium text-gray-700 mb-1">
                      How long has your workshop been operating? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="workshopAge"
                      name="workshopAge"
                      value={formData.workshopAge}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.workshopAge ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                    >
                      <option value="">Please select</option>
                      <option value="less-than-6-months">Less than 6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="1-3-years">1-3 years</option>
                      <option value="3-5-years">3-5 years</option>
                      <option value="more-than-5-years">More than 5 years</option>
                    </select>
                    {errors.workshopAge && <p className="text-red-500 text-xs mt-1">{errors.workshopAge}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="numTechnicians" className="block text-sm font-medium text-gray-700 mb-1">
                      How many technicians work at your workshop? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="numTechnicians"
                      name="numTechnicians"
                      value={formData.numTechnicians}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.numTechnicians ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                    >
                      <option value="">Please select</option>
                      <option value="1-2">1-2 technicians</option>
                      <option value="3-5">3-5 technicians</option>
                      <option value="6-10">6-10 technicians</option>
                      <option value="more-than-10">More than 10 technicians</option>
                    </select>
                    {errors.numTechnicians && <p className="text-red-500 text-xs mt-1">{errors.numTechnicians}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What services do you offer? (Select all that apply) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-periodic"
                          name="serviceTypes"
                          value="periodic-maintenance"
                          checked={formData.serviceTypes.includes('periodic-maintenance')}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#FF7200] focus:ring-[#FF7200] border-gray-300 rounded"
                        />
                        <label htmlFor="service-periodic" className="ml-2 text-sm text-gray-700">
                          Periodic Maintenance
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-ac"
                          name="serviceTypes"
                          value="ac-service"
                          checked={formData.serviceTypes.includes('ac-service')}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#FF7200] focus:ring-[#FF7200] border-gray-300 rounded"
                        />
                        <label htmlFor="service-ac" className="ml-2 text-sm text-gray-700">
                          AC Service
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-denting"
                          name="serviceTypes"
                          value="denting-painting"
                          checked={formData.serviceTypes.includes('denting-painting')}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#FF7200] focus:ring-[#FF7200] border-gray-300 rounded"
                        />
                        <label htmlFor="service-denting" className="ml-2 text-sm text-gray-700">
                          Denting & Painting
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-detailing"
                          name="serviceTypes"
                          value="car-detailing"
                          checked={formData.serviceTypes.includes('car-detailing')}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#FF7200] focus:ring-[#FF7200] border-gray-300 rounded"
                        />
                        <label htmlFor="service-detailing" className="ml-2 text-sm text-gray-700">
                          Car Detailing
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-mechanical"
                          name="serviceTypes"
                          value="mechanical-repairs"
                          checked={formData.serviceTypes.includes('mechanical-repairs')}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#FF7200] focus:ring-[#FF7200] border-gray-300 rounded"
                        />
                        <label htmlFor="service-mechanical" className="ml-2 text-sm text-gray-700">
                          Mechanical Repairs
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-electrical"
                          name="serviceTypes"
                          value="electrical-work"
                          checked={formData.serviceTypes.includes('electrical-work')}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#FF7200] focus:ring-[#FF7200] border-gray-300 rounded"
                        />
                        <label htmlFor="service-electrical" className="ml-2 text-sm text-gray-700">
                          Electrical Work
                        </label>
                      </div>
                    </div>
                    {errors.serviceTypes && <p className="text-red-500 text-xs mt-1">{errors.serviceTypes}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="monthlyVehicles" className="block text-sm font-medium text-gray-700 mb-1">
                      How many vehicles do you service monthly? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="monthlyVehicles"
                      name="monthlyVehicles"
                      value={formData.monthlyVehicles}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.monthlyVehicles ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                    >
                      <option value="">Please select</option>
                      <option value="less-than-20">Less than 20</option>
                      <option value="21-50">21-50</option>
                      <option value="51-100">51-100</option>
                      <option value="more-than-100">More than 100</option>
                    </select>
                    {errors.monthlyVehicles && <p className="text-red-500 text-xs mt-1">{errors.monthlyVehicles}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="heardFrom" className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about GaadiMech Partner Program? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="heardFrom"
                      name="heardFrom"
                      value={formData.heardFrom}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.heardFrom ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none`}
                    >
                      <option value="">Please select</option>
                      <option value="social-media">Social Media</option>
                      <option value="search-engine">Search Engine</option>
                      <option value="friend-referral">Friend/Colleague Referral</option>
                      <option value="gaadimech-customer">I'm a GaadiMech Customer</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.heardFrom && <p className="text-red-500 text-xs mt-1">{errors.heardFrom}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                      Any additional information you'd like to share?
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#FF7200] focus:border-[#FF7200] outline-none"
                      placeholder="Tell us anything else that might be important..."
                    ></textarea>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {formStep === 1 ? (
                  <button 
                    type="button" 
                    onClick={handleCloseAttempt}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={handlePrevStep}
                    className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                )}
                
                {formStep === 1 ? (
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-[#FF7200] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#FF9500] transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FF7200] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#FF9500] transition-colors disabled:bg-[#FF7200]/70 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </Modal>
  );
};

export default WorkshopPartnerForm; 