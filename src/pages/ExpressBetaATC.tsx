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
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

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

const ExpressBetaATC = () => {
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
    
    // Instead of showing pricing modal, navigate to the cart page
    window.location.href = '/express-beta-atc/cart';
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
      } as any);
      
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleCarSelectionModalClose = () => {
    setIsCarSelectionModalOpen(false);
  };

  const handlePricingModalClose = () => {
    setIsPricingModalOpen(false);
  };

  const handleTimeSlotSubmit = async (date: string, timeSlot: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
    
    if (!currentLeadId) {
      console.error('No lead ID found');
      alert('Something went wrong. Please try again.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Update the lead with the selected time slot using the correct property name (serviceDate)
      const response = await expressService.updateLead(currentLeadId, {
        timeSlot: timeSlot,
        serviceDate: date // Using serviceDate which is the correct field in ExpressServiceFormData
      });
      
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }
      
      // Close time slot modal
      setIsTimeSlotModalOpen(false);
      
      // Show success message
      setSuccess(true);
      setShowSuccessMessage(true);
      
      // Clear form after successful submission
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error updating lead with time slot:', error);
      alert('Something went wrong while scheduling your service. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleTimeSlotModalClose = () => {
    setIsTimeSlotModalOpen(false);
  };

  // Use effect to load service types when component mounts
  useEffect(() => {
    // Only load service types if not already loaded
    if (!serviceTypesLoaded) {
      loadServiceTypes();
    }
    
    // Check if coming back from a redirect with success message
    const urlParams = new URLSearchParams(location.search);
    const showSuccessFromParams = urlParams.get('success') === 'true';
    
    if (showSuccessFromParams) {
      // Handle showing success message if redirected back with success=true
      setShowSuccessMessage(true);
    }
  }, []);

  // Function to load service types
  const loadServiceTypes = async () => {
    try {
      const response = await enquiryService.getServiceTypes();
      // Find Express Service in the list and set its ID
      const expressService = response.data.find((service: any) => 
        service.name.toLowerCase().includes('express')
      );
      
      if (expressService) {
        setSelectedServiceType(expressService.id);
      } else {
        // Default to service type ID 4 if not found
        setSelectedServiceType(4);
      }
      
      setServiceTypesLoaded(true);
    } catch (error) {
      console.error('Failed to load service types:', error);
    }
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Express Car Service in 90 Minutes - GaadiMech</title>
        <meta name="description" content="Book a complete car service in just 90 minutes. Express service includes engine oil change, filters replacement, car wash, and 15-point inspection at competitive rates." />
      </Helmet>
      
      {/* Breadcrumb */}
      <Breadcrumb serviceName="Express Service" />
      
      {/* Timelapse Video Section */}
      <section className="pt-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              Express Service in 90 Minutes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete car service in just 90 minutes, not 4-8 hours. Same quality, faster service.
            </p>
          </div>
          
          <div className="flex justify-center mb-4">
            <button 
              onClick={handleScheduleClick}
              className="px-6 py-3 bg-[#FF7200] text-white font-bold rounded-md text-lg shadow-lg hover:bg-[#E56500] transition-colors duration-300 flex items-center space-x-2"
            >
              <span>Book Express Service Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Brief advantages beneath CTA */}
          <div className="flex flex-wrap justify-center items-center gap-5 mb-8 text-sm md:text-base">
            <div className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
              <span>1-Month Warranty</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
              <span>90-Minute Turnaround</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
              <span>Save Up to 60%</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
              <span>Free Post-Service Support</span>
            </div>
          </div>
          
          <div className="relative overflow-hidden pb-[56.25%] rounded-lg shadow-xl">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/unRdRJJypR4?si=yDPoz_MREFH_Zsyi" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

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
      <section className="py-16 bg-gradient-to-r from-[#FF8A3D] to-[#FF7200] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Experience Express Service?</h2>
          <button 
            onClick={handleScheduleClick}
            className="px-8 py-4 bg-white text-[#FF7200] font-bold rounded-md text-lg shadow-xl hover:bg-gray-100 transition-colors duration-300"
          >
            Book Your Express Service
          </button>
          <p className="mt-4 opacity-80">No prepayment required. Book now, pay after service.</p>
        </div>
      </section>

      {/* Modals */}
      <CarSelectionModal
        isOpen={isCarSelectionModalOpen}
        onClose={handleCarSelectionModalClose}
        onSubmit={handleCarSelectionSubmit}
        mobileNumber={mobile}
      />

      <TimeSlotModal
        isOpen={isTimeSlotModalOpen}
        onClose={handleTimeSlotModalClose}
        onSubmit={handleTimeSlotSubmit}
        mobileNumber={mobile}
        servicePrice={selectedServicePrice || 0}
      />

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

      {/* Success Notification */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative"
          >
            <button 
              onClick={() => setShowSuccessMessage(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Your Express Service has been scheduled successfully. We'll see you at the selected time!
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Service:</div>
                  <div className="font-medium">Express Service</div>
                  
                  <div className="text-gray-500">Vehicle:</div>
                  <div className="font-medium">{selectedCarBrand} {selectedCarModel}</div>
                  
                  <div className="text-gray-500">Date:</div>
                  <div className="font-medium">{selectedDate}</div>
                  
                  <div className="text-gray-500">Time:</div>
                  <div className="font-medium">{selectedTimeSlot}</div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowSuccessMessage(false)}
                className="px-6 py-3 bg-[#FF7200] text-white font-bold rounded-md hover:bg-[#E56500] transition-colors duration-300 w-full"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ExpressBetaATC; 