import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Car, PenTool as Tool, Phone, CheckCircle, ArrowRight, Share2, Gift, Wrench, Sparkles, Timer, Calendar, Image, MessageSquare, User, Shield, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { expressService } from '../services/expressService';
import TimeSlotModal from '../components/TimeSlotModal';
import CarSelectionModal from '../components/CarSelectionModal';
import PricingInfoModal from '../components/PricingInfoModal';
import ReviewCarousel from '../components/ReviewCarousel';
import { getReviewsByService } from '../data/reviews';
import { enquiryService } from '../services/enquiry';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { getVehicleFromSession } from '../utils/pricing-utils';

const steps = [
  {
    icon: <Clock className="w-12 h-12 text-[#FF7200]" />,
    title: "Book Online",
    description: "Schedule your express service in seconds"
  },
  {
    icon: <Car className="w-12 h-12 text-[#FF7200]" />,
    title: "Express Pickup",
    description: "Optional doorstep pickup service"
  },
  {
    icon: <Tool className="w-12 h-12 text-[#FF7200]" />,
    title: "90-Minute Service",
    description: "Expert mechanics work simultaneously"
  },
  {
    icon: <Phone className="w-12 h-12 text-[#FF7200]" />,
    title: "Real-Time Updates",
    description: "Track progress with photos & videos"
  },
  {
    icon: <User className="w-12 h-12 text-[#FF7200]" />,
    title: "GaadiMech's Trained Mechanics",
    description: "Expert technicians with specialized training"
  },
  {
    icon: <Shield className="w-12 h-12 text-[#FF7200]" />,
    title: "Genuine Parts Used",
    description: "Quality parts for optimal performance"
  }
];

const processSteps = [
  {
    title: "Initial Inspection",
    description: "Quick but thorough inspection to identify service requirements",
    icon: <Car className="w-8 h-8 text-[#FF7200]" />,
    time: "5 mins"
  },
  {
    title: "Service Planning",
    description: "Efficient allocation of tasks to specialized technicians",
    icon: <Clock className="w-8 h-8 text-[#FF7200]" />,
    time: "5 mins"
  },
  {
    title: "Parallel Processing",
    description: "Multiple services performed simultaneously by expert teams",
    icon: <Wrench className="w-8 h-8 text-[#FF7200]" />,
    time: "70 mins"
  },
  {
    title: "Quality Check",
    description: "Comprehensive inspection of all serviced components",
    icon: <CheckCircle className="w-8 h-8 text-[#FF7200]" />,
    time: "10 mins"
  }
];

const qualityFeatures = [
  {
    title: "Certified Technicians",
    description: "Every service performed by OEM-trained professionals",
    icon: <Tool />
  },
  {
    title: "Quality Parts",
    description: "Only genuine or OEM-approved parts used",
    icon: <Sparkles />
  },
  {
    title: "Digital Documentation",
    description: "Complete service history with photos and videos",
    icon: <Phone />
  }
];

const ExpressService = () => {
  const location = useLocation();
  const [mobile, setMobile] = useState(() => {
    // Initialize mobile number from session storage if available
    return sessionStorage.getItem('userMobileNumber') || '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isTimeSlotModalOpen, setIsTimeSlotModalOpen] = useState(false);
  const [isCarSelectionModalOpen, setIsCarSelectionModalOpen] = useState(false);
  const [isMobileInputModalOpen, setIsMobileInputModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<number | null>(null);
  const [serviceTypesLoaded, setServiceTypesLoaded] = useState<boolean>(false);
  const [currentLeadId, setCurrentLeadId] = useState<number | null>(null);
  const [selectedCarBrand, setSelectedCarBrand] = useState<string>('');
  const [selectedCarModel, setSelectedCarModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [selectedServicePrice, setSelectedServicePrice] = useState<number | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const serviceReviews = getReviewsByService('express');

  // State for selected time slot
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  const validateMobile = (number: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleScheduleClick = () => {
    // Clear previous errors
    setError('');
    
    // First check if we have vehicle details in session
    const savedVehicle = getVehicleFromSession();
    
    if (savedVehicle) {
      // Pre-select the saved vehicle details
      setSelectedCarBrand(savedVehicle.manufacturer);
      setSelectedCarModel(savedVehicle.model);
      setSelectedFuelType(savedVehicle.fuelType);
    }
    
    // Open car selection modal directly
    setIsCarSelectionModalOpen(true);
  };
  
  const handleCarSelectionSubmit = async (brand: string, model: string, fuelType: string, price: number) => {
    // Store selected car information in state
    setSelectedCarBrand(brand);
    setSelectedCarModel(model);
    setSelectedFuelType(fuelType);
    setSelectedServicePrice(price);
    
    // Store in session for persistence
    const vehicleData = { manufacturer: brand, model, fuelType };
    sessionStorage.setItem('selectedVehicle', JSON.stringify(vehicleData));
    
    // Close car selection modal
    setIsCarSelectionModalOpen(false);
    
    // Open pricing modal without creating a lead yet
    setIsPricingModalOpen(true);
  };

  // Handle "Book Slot Now" click from pricing modal
  const handleBookSlotNowClick = (providedMobileNumber?: string) => {
    setIsPricingModalOpen(false);
    
    // Since mobile validation now happens in PricingInfoModal, providedMobileNumber should always be valid
    // We can skip the validation and mobile input modal step
    if (providedMobileNumber) {
      setMobile(providedMobileNumber);
      // This function will create the lead with car and mobile info
      createLeadWithAllInfo(providedMobileNumber, selectedCarBrand, selectedCarModel, selectedFuelType, selectedServicePrice || 0)
        .then(() => {
          // Open time slot modal immediately after creating lead
          setIsTimeSlotModalOpen(true);
        })
        .catch(error => {
          console.error('Error creating lead:', error);
          alert('Something went wrong. Please try again.');
        });
    } else {
      // This should rarely happen since we validate in the modal, but handle just in case
      console.error('No mobile number provided from pricing modal');
      alert('Please provide a valid mobile number to continue.');
      // Reopen the pricing modal
      setIsPricingModalOpen(true);
    }
  };
  
  // New function to create a lead with all info at once
  const createLeadWithAllInfo = async (mobileNumber: string, carBrand: string, carModel: string, fuelType: string, price: number) => {
    if (isSubmitting) return Promise.reject('Already submitting');
    
    setIsSubmitting(true);
    sessionStorage.setItem('userMobileNumber', mobileNumber);
    const serviceType = selectedServiceType || 4; // Default to "Express Service" (ID: 4)
    let serviceTypeName = "Express Service";
    
    try {
      // Create the lead with all info
      console.log('Creating lead with:', { mobileNumber, carBrand, carModel, fuelType, price });
      
      const response = await expressService.submitLead({
        mobileNumber: mobileNumber,
        serviceType: serviceTypeName,
        carBrand: carBrand,
        carModel: carModel,
        fuel_type: fuelType,
        servicePrice: price
      });
      
      if (!response || !response.data || !response.data.id) {
        throw new Error('Invalid response from server');
      }
      
      const leadId = response.data.id;
      console.log('Lead created successfully with ID:', leadId);
      
      setCurrentLeadId(leadId);
      sessionStorage.setItem('expressServiceLeadId', String(leadId));
      setIsSubmitting(false);
      
      return Promise.resolve(); // Return resolved promise for chaining
    } catch (error) {
      console.error('Error creating lead:', error);
      setIsSubmitting(false);
      return Promise.reject(error); // Return rejected promise for error handling
    }
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Create lead with all information we have
    await createLeadWithAllInfo(
      mobile, 
      selectedCarBrand, 
      selectedCarModel, 
      selectedFuelType, 
      selectedServicePrice || 0
    );
  };

  const handleMobileModalClose = () => {
    setIsMobileInputModalOpen(false);
    setMobile('');
    setError('');
    // Don't reset other data as we want to preserve car selection
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleScheduleClick();
  };

  const handleCarSelectionModalClose = () => {
    // Close the modal without losing data
    setIsCarSelectionModalOpen(false);
    // Keep car selection data in session storage if any
  };
  
  const handlePricingModalClose = () => {
    setIsPricingModalOpen(false);
    // Keep all data for potential future use
  };

  const handleTimeSlotSubmit = async (date: string, timeSlot: string) => {
    if (!currentLeadId) {
      console.error('No lead ID available');
      alert('Session expired. Please try again.');
      setIsTimeSlotModalOpen(false);
      return;
    }

    try {
      console.log('Updating lead with date and time slot:', { id: currentLeadId, date, timeSlot });
      
      // Update the lead with the selected date and time slot
      const response = await expressService.updateLead(currentLeadId, {
        serviceDate: date,
        timeSlot: timeSlot
      });

      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      // Close the time slot modal
      setIsTimeSlotModalOpen(false);
      
      // Store user's mobile number in session storage before resetting the form
      if (mobile) {
        sessionStorage.setItem('userMobileNumber', mobile);
      }
      
      // Clear the lead ID from session storage since this booking is complete
      sessionStorage.removeItem('expressServiceLeadId');
      
      // Show success message briefly to provide feedback
      setShowSuccessMessage(true);
      
      // Create WhatsApp message with booking details
      const discountedPrice = selectedServicePrice ? selectedServicePrice - 500 : 0;
      const message = `Hi, I booked a 90 Mins Car Express Car Service with GaadiMech
Car Manufacturer: ${selectedCarBrand}
Car Model: ${selectedCarModel}
Fuel Type: ${selectedFuelType || 'Not specified'}
Package Price: ₹${selectedServicePrice}
*Discounted Price: ₹${discountedPrice}*
Booking Slot: ${new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}, ${timeSlot}`;
      
      // Direct WhatsApp redirection after a brief delay to show success message
      setTimeout(() => {
        // Close success message
        setShowSuccessMessage(false);
        
        // Open WhatsApp with pre-populated message
        window.open(`https://wa.me/917300042410?text=${encodeURIComponent(message)}`, '_blank');
        
        // Reset all form fields after successful submission
        setMobile('');
        setCurrentLeadId(null);
        setSelectedCarBrand('');
        setSelectedCarModel('');
        setSelectedFuelType('');
        setSelectedServicePrice(null);
        setSuccess(false);
        setError('');
      }, 1000); // Show success message for 1 second before redirecting
    } catch (error) {
      console.error('Error updating lead with time slot:', error);
      alert('Failed to update time slot. Please try again.');
    }
  };

  const handleTimeSlotModalClose = () => {
    // Close the modal without updating the lead
    setIsTimeSlotModalOpen(false);
    
    // Store user's mobile number in session storage before resetting the form
    if (mobile) {
      sessionStorage.setItem('userMobileNumber', mobile);
    }
    
    // IMPORTANT: Unlike the car selection cancel, DO NOT reset the current lead ID
    // This ensures we don't create duplicate leads if the user goes back
    
    // We also don't reset car selection details to maintain state between modals
  };

  // Check for URL parameters when the component mounts
  useEffect(() => {
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const openModal = searchParams.get('openModal');

    // If openModal=true, trigger the car selection modal
    if (openModal === 'true') {
      handleScheduleClick();
    }

    // Check for saved lead ID in session storage
    const savedLeadId = sessionStorage.getItem('expressServiceLeadId');
    if (savedLeadId) {
      setCurrentLeadId(parseInt(savedLeadId, 10));
    }

    // Load service types
    const loadServiceTypes = async () => {
      try {
        await enquiryService.getServiceTypes();
        setServiceTypesLoaded(true);
      } catch (error) {
        console.error('Error loading service types:', error);
      }
    };

    loadServiceTypes();
  }, [location.search]); // Only re-run if the search params change

  // Query parameter handling
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceType = queryParams.get('service_type');
    
    if (serviceType) {
      const serviceTypeId = parseInt(serviceType, 10);
      if (!isNaN(serviceTypeId)) {
        setSelectedServiceType(serviceTypeId);
      }
    }
  }, [location]);
  
  // Check for saved vehicle on mount and also check for an existing lead
  useEffect(() => {
    // Check for saved vehicle
    const savedVehicle = getVehicleFromSession();
    if (savedVehicle) {
      setSelectedCarBrand(savedVehicle.manufacturer);
      setSelectedCarModel(savedVehicle.model);
      setSelectedFuelType(savedVehicle.fuelType);
      console.log("Loaded saved vehicle:", savedVehicle);
    }
    
    // Check for saved lead ID
    const savedLeadId = sessionStorage.getItem('expressServiceLeadId');
    if (savedLeadId) {
      const leadId = parseInt(savedLeadId, 10);
      if (!isNaN(leadId)) {
        console.log("Found existing lead ID:", leadId);
        setCurrentLeadId(leadId);
      }
    }
    
    // Check if we have everything needed to auto-start the flow
    const storedMobile = sessionStorage.getItem('userMobileNumber');
    
    // If we have both vehicle and mobile info but no active modals yet,
    // we can prompt user to continue their booking
    if (savedVehicle && storedMobile && !isTimeSlotModalOpen && !isCarSelectionModalOpen && !isSubmitting) {
      console.log("Found both vehicle and mobile in session. Setting up for booking continuation.");
      setMobile(storedMobile);
      
      // Wait a bit to ensure component is fully mounted
      setTimeout(() => {
        // If we have a lead ID, we can open car selection directly
        if (savedLeadId) {
          setIsCarSelectionModalOpen(true);
        } else {
          // Otherwise, prompt the user to start booking
          handleScheduleClick();
        }
      }, 500);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>GaadiMech Express: 90-Minute Car Service | Fast & Professional Car Repair</title>
        <meta name="description" content="Experience the future of car servicing with GaadiMech Express. Get your car serviced in just 90 minutes with our expert mechanics and state-of-the-art technology." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Car Servicing Done in
              <span className="text-[#FF7200]"> 90 Minutes</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Skip the all-day wait. Get your car serviced by expert mechanics using
              state-of-the-art technology – all while you enjoy a coffee.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              <button
                onClick={handleScheduleClick}
                className="w-64 bg-[#FF7200] text-white px-8 py-4 rounded-lg hover:bg-[#FF8000] transition-colors text-lg font-semibold flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Schedule Slot Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Input Modal */}
      <Modal
        isOpen={isMobileInputModalOpen}
        onRequestClose={handleMobileModalClose}
        className="modal-content max-w-md mx-auto bg-white p-6 rounded-xl shadow-2xl relative"
        overlayClassName="modal-overlay fixed inset-0 bg-black/60 flex items-center justify-center overflow-y-auto z-50"
        contentLabel="Mobile Input Modal"
      >
        <button
          onClick={handleMobileModalClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="pt-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6 text-[#FF7200]" />
            Enter Your Mobile Number
          </h2>
          
          <form onSubmit={handleMobileSubmit}>
            <div className="mb-4">
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your 10-digit mobile number"
                className={`w-full px-4 py-3 rounded-lg border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-[#FF7200] focus:border-transparent`}
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF7200] text-white py-3 rounded-lg hover:bg-[#FF8000] transition-colors disabled:opacity-50 font-semibold"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : 'Continue'}
            </button>
          </form>
        </div>
      </Modal>

      {/* Success Message Modal */}
      <Modal
        isOpen={showSuccessMessage}
        onRequestClose={() => setShowSuccessMessage(false)}
        className="modal-content max-w-md mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-[90%]"
        overlayClassName="modal-overlay fixed inset-0 bg-black/60 flex items-center justify-center overflow-y-auto z-50"
        contentLabel="Success Message Modal"
      >
        <div className="text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-3">Your ₹500 discount has been locked in successfully!</p>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#25D366] mr-2"></div>
            <p className="text-sm text-gray-700">Redirecting to WhatsApp...</p>
          </div>
        </div>
      </Modal>

      {/* Car Selection Modal */}
      <CarSelectionModal
        isOpen={isCarSelectionModalOpen}
        onClose={handleCarSelectionModalClose}
        onSubmit={handleCarSelectionSubmit}
        mobileNumber={mobile}
        leadId={currentLeadId || undefined}
      />

      {/* Time Slot Modal */}
      <TimeSlotModal
        isOpen={isTimeSlotModalOpen}
        onClose={handleTimeSlotModalClose}
        onSubmit={handleTimeSlotSubmit}
        mobileNumber={mobile}
        servicePrice={selectedServicePrice || 0}
      />

      {/* Pricing Info Modal */}
      <PricingInfoModal
        isOpen={isPricingModalOpen}
        onClose={handlePricingModalClose}
        onBookNow={handleBookSlotNowClick}
        carBrand={selectedCarBrand}
        carModel={selectedCarModel}
        fuelType={selectedFuelType}
        servicePrice={selectedServicePrice || 0}
        initialMobileNumber={mobile}
      />

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white rounded-lg p-4 md:p-6 shadow-sm md:shadow-none border border-gray-100 md:border-0 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-50 p-2 md:p-0 rounded-full md:rounded-none">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 hidden md:block">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our 90-Minute Service Process
            </h2>
            <p className="text-xl text-gray-600">
              Speed meets precision with our innovative parallel processing system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    {step.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-[#FF7200] font-medium">
                      {step.time}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Quality Assurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center p-3 bg-orange-50 rounded-full mb-4">
                  {React.cloneElement(feature.icon, {
                    className: "w-6 h-6 text-[#FF7200]"
                  })}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready for the Fastest Car Service in Town?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your 90-minute express service now and experience the future of car care.
          </p>
          <motion.a
            href="https://api.whatsapp.com/send/?phone=917300042410&text=Hi%2C%20I%27d%20like%20to%20book%20an%20Express%20Service."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF7200] hover:bg-[#25D366] text-white px-8 py-3 rounded-md transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Connect on WhatsApp
          </motion.a>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewCarousel reviews={serviceReviews} />
        </div>
      </section>
    </motion.div>
  );
};

export default ExpressService;