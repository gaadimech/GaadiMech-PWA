import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Car, PenTool as Tool, Phone, CheckCircle, ArrowRight, Share2, Gift, Wrench, Sparkles, Timer, Calendar, Image, MessageSquare, User, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { expressService } from '../services/expressService';
import TimeSlotModal from '../components/TimeSlotModal';
import CarSelectionModal from '../components/CarSelectionModal';
import ReviewCarousel from '../components/ReviewCarousel';
import { getReviewsByService } from '../data/reviews';
import { enquiryService } from '../services/enquiry';

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
  const [mobile, setMobile] = useState(() => {
    // Initialize mobile number from session storage if available
    return sessionStorage.getItem('userMobileNumber') || '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isTimeSlotModalOpen, setIsTimeSlotModalOpen] = useState(false);
  const [isCarSelectionModalOpen, setIsCarSelectionModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<number | undefined>();
  const [serviceTypesLoaded, setServiceTypesLoaded] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState<number | null>(null);
  const [selectedCarBrand, setSelectedCarBrand] = useState<string>('');
  const [selectedCarModel, setSelectedCarModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [selectedServicePrice, setSelectedServicePrice] = useState<number | null>(null);
  const serviceReviews = getReviewsByService('express');

  const validateMobile = (number: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Save mobile number to session storage
    sessionStorage.setItem('userMobileNumber', mobile);

    // Default to "Express Service" (ID: 4) if no service type is selected
    const serviceType = selectedServiceType || 4;
    
    // Default service name - use this if we can't fetch the actual name
    let serviceTypeName = "Express Service";
    
    setIsSubmitting(true);

    try {
      // Try to get the service name if service types are loaded
      if (serviceTypesLoaded) {
        try {
          const response = await enquiryService.getServiceTypes();
          const serviceTypeObj = response.data.find(type => type.id === serviceType);
          if (serviceTypeObj && serviceTypeObj.name) {
            serviceTypeName = serviceTypeObj.name;
          }
        } catch (error) {
          console.error('Error fetching service types:', error);
          // Continue with default name if there's an error
        }
      }

      // Submit the mobile number with the service type name
      const response = await expressService.submitLead({
        mobileNumber: mobile,
        serviceType: serviceTypeName
      });

      // Store the lead ID for potential updates
      if (response && response.data && response.data.id) {
        setCurrentLeadId(response.data.id);
        
        // Show success message for mobile number submission
        setSuccess(true);
        
        // Open the car selection modal
        setIsCarSelectionModalOpen(true);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Something went wrong. Please try again.');
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCarSelectionSubmit = async (brand: string, model: string, fuelType: string, price: number) => {
    if (!currentLeadId) {
      console.error('No lead ID available');
      alert('Session expired. Please try again.');
      setIsCarSelectionModalOpen(false);
      return;
    }

    try {
      console.log('Updating lead with car information:', { id: currentLeadId, brand, model, fuelType, price });
      
      // Update the lead with the selected car information
      const response = await expressService.updateLead(currentLeadId, {
        carBrand: brand,
        carModel: model,
        fuelType: fuelType,
        servicePrice: price
      });

      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      // Store selected car information in state
      setSelectedCarBrand(brand);
      setSelectedCarModel(model);
      setSelectedFuelType(fuelType);
      setSelectedServicePrice(price);
      
      // Close car selection modal and open time slot modal
      setIsCarSelectionModalOpen(false);
      
      // Add a small delay before opening the time slot modal to ensure proper transition
      setTimeout(() => {
        setIsTimeSlotModalOpen(true);
      }, 100);
    } catch (error) {
      console.error('Error updating lead with car information:', error);
      alert('Failed to update car information. Please try again.');
      
      // Keep the car selection modal open in case of error
      setIsCarSelectionModalOpen(true);
    }
  };

  const handleCarSelectionModalClose = () => {
    // Close the modal without updating the lead
    setIsCarSelectionModalOpen(false);
    
    // Store user's mobile number in session storage before resetting the form
    if (mobile) {
      sessionStorage.setItem('userMobileNumber', mobile);
    }
    
    // Reset the form and state if the user cancels
    setMobile('');
    setCurrentLeadId(null);
    setSuccess(false);
    setError('');
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
      
      // Reset the form
      setMobile('');
      setCurrentLeadId(null);
      setSelectedCarBrand('');
      setSelectedCarModel('');
      setSelectedFuelType('');
      setSelectedServicePrice(null);
      
      // Show success message
      alert('Booking confirmed! We will contact you shortly.');
    } catch (error) {
      console.error('Error updating lead with time slot:', error);
      alert('Sorry, there was an error confirming your booking. Please try again or contact us directly.');
      setIsTimeSlotModalOpen(false);
    }
  };

  const handleTimeSlotModalClose = () => {
    // Close the modal without updating the lead
    setIsTimeSlotModalOpen(false);
    
    // Store user's mobile number in session storage before resetting the form
    if (mobile) {
      sessionStorage.setItem('userMobileNumber', mobile);
    }
    
    // Reset the form and state
    setMobile('');
    setSuccess(false);
    setError('');
    setCurrentLeadId(null);
    setSelectedCarBrand('');
    setSelectedCarModel('');
    setSelectedServicePrice(null);
  };

  useEffect(() => {
    const checkServiceTypes = async () => {
      try {
        const response = await enquiryService.getServiceTypes();
        setServiceTypesLoaded(response.data.length > 0);
      } catch (error) {
        console.error('Failed to check service types:', error);
      }
    };
    
    checkServiceTypes();
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

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              {success ? (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg">
                  <p className="font-semibold">Thanks! We'll call you right back.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter your mobile number"
                      className={`flex-1 px-4 py-3 rounded-lg border ${
                        error ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#FF7200] focus:border-transparent`}
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#FF7200] text-white px-6 py-3 rounded-lg hover:bg-[#0e5aa8] transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Schedule Slot Now'}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* Car Selection Modal */}
      <CarSelectionModal
        isOpen={isCarSelectionModalOpen}
        onClose={handleCarSelectionModalClose}
        onSubmit={handleCarSelectionSubmit}
        mobileNumber={mobile}
      />

      {/* Time Slot Modal */}
      <TimeSlotModal
        isOpen={isTimeSlotModalOpen}
        onClose={handleTimeSlotModalClose}
        onSubmit={handleTimeSlotSubmit}
        mobileNumber={mobile}
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