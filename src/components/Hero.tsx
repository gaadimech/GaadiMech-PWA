import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, Clock, Home, IndianRupee, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMetaAnalytics } from '../hooks/useMetaAnalytics';
import { ConversionTracker } from '../utils/conversionTracking';
import { testMetaConversionApi } from '../utils/metaTest';
import { testAllMetaEvents } from '../utils/metaEventTest';
import MobileNumberModal from './MobileNumberModal';

// Google Analytics events added:
// 1. conversion_event_book_appointment - Triggered when user clicks "Book Now" (WhatsApp)
// 2. conversion_event_phone_call_lead - Triggered when user clicks "Call Us"

const Hero = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const { trackContact, trackLead } = useMetaAnalytics();

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // SECURITY: Only test Meta Conversion API in development
    if (import.meta.env.DEV) {
      testMetaConversionApi().then(success => {
        if (success) {
          console.log('🎯 Meta API is connected (DEV MODE)');
          console.log('ℹ️  Use testAllMetaEvents() in console to run event tests');
          // Note: Automatic event tests disabled for security
        }
      });
    }
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleBookService = async () => {
    // Track conversion event for Book Service
    if (window.gtag) {
      window.gtag('event', 'conversion_event_book_service', {
        'event_category': 'engagement',
        'event_label': 'hero_whatsapp_booking'
      });
    }
    
    // Track with Meta Conversion API
    await trackLead(undefined, {
      content_name: 'Hero WhatsApp Booking',
      content_type: 'booking_request'
    });

    // Show mobile number modal first
    setShowMobileModal(true);
  };

  const handleMobileNumberSubmit = (mobileNumber: string) => {
    // Close the modal
    setShowMobileModal(false);
    
    // Track WhatsApp redirect with ConversionTracker
    ConversionTracker.trackWhatsAppRedirect({
      service: 'Express Service',
      source: 'hero_section'
    });
    
    // Proceed with WhatsApp redirect
    const message = encodeURIComponent("Hi, I'd like to book an Express Car Service through GaadiMech.");
    window.open(`https://wa.me/917300042410?text=${message}`, '_blank');
  };

  const handleContact = async () => {
    // Track conversion event for Call Us
    if (window.gtag) {
      window.gtag('event', 'conversion_event_phone_call_lead', {
        'event_category': 'engagement',
        'event_label': 'hero_phone_call'
      });
    }
    
    // Track with Meta Conversion API
    await trackContact();
    
    window.location.href = `tel:+918448285289`;
  };

  const handleExpressServiceClick = () => {
    navigate('/express');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="home" className="pt-12 md:pt-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white border-b-8 border-gray-100">
      {/* Enhanced background elements */}
      <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-xl"></div>
      <div className="hidden md:block absolute top-1/4 left-1/5 w-24 h-24 rounded-full bg-orange-400 opacity-10 blur-lg"></div>
      <div className="hidden md:block absolute bottom-1/3 left-1/4 w-6 h-12 rounded-full bg-[#FF7200] opacity-10"></div>
      
      {/* Animated circuit-like pattern for tech feel */}
      <div className="hidden md:block absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 w-1/2 h-1/2">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 rounded-full bg-[#FF7200]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.25
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 relative z-10">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-8 md:gap-12 items-center`}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            {/* Enhanced badge with pulse effect */}
            <div className="inline-block mb-4 relative">
              <motion.div 
                className="absolute inset-0 bg-[#FF7200] rounded-lg blur-sm opacity-30"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5 
                }}
              ></motion.div>
              <div className="relative bg-gradient-to-r from-[#FF7200] to-[#FF9500] px-4 py-1 rounded-lg shadow-md">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-white fill-white" />
                  <span className="text-white font-bold text-sm uppercase tracking-wider">Premium Service</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Get Your Car Serviced in Just{" "}
              <div className="inline-block relative">
                <span className="relative z-10 text-[#FF7200]">90 Minutes!</span>
                <div className="absolute -bottom-2 left-0 h-3 w-full bg-yellow-200 opacity-40 -rotate-1"></div>
              </div>
            </h2>

            <p className="text-base md:text-lg text-gray-600 mb-6">
              Experience lightning-fast car service with GaadiMech. Trusted mechanics, transparent pricing, and expert care—all at your convenience.
            </p>
            
            {/* Enhanced timer visualization with subtle animation */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm mx-auto md:mx-0 max-w-xs cursor-pointer hover:shadow-md hover:border-orange-200 transition-all"
              onClick={handleExpressServiceClick}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#FF7200] to-[#FF9500] text-white font-bold text-2xl">
                    90
                  </div>
                  <motion.div 
                    className="absolute inset-0 rounded-xl border-2 border-[#FF7200]"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2 
                    }}
                  ></motion.div>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">EXPRESS SERVICE</div>
                  <div className="font-bold text-[#FF7200] text-lg">Minutes or Less</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-8 space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants} 
                whileHover={{ scale: 1.02, y: -3 }}
                className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-start cursor-pointer border border-transparent hover:border-orange-100"
              >
                <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                  <Clock className="text-white" size={20} />
                </div>
                <div className="ml-3 flex flex-col items-start">
                  <p className="text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">No More Waiting</span>
                  </p>
                  <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-1">90 Mins vs 6+ Hours</span>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -3 }}
                className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-start cursor-pointer border border-transparent hover:border-orange-100"
              >
                <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                  <Home className="text-white" size={20} />
                </div>
                <div className="ml-3 flex flex-col items-start">
                  <p className="text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">Zero Hassle</span>
                  </p>
                  <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full mt-1">100% doorstep service</span>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -3 }}
                className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-start cursor-pointer border border-transparent hover:border-orange-100"
              >
                <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                  <IndianRupee className="text-white" size={20} />
                </div>
                <div className="ml-3 flex flex-col items-start">
                  <p className="text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">Transparent Pricing</span>
                  </p>
                  <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full mt-1">No hidden fees</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center md:justify-start mb-6 space-x-6">
              <div className="flex flex-col items-center">
                <p className="font-bold text-xl text-[#FF7200]">2K+</p>
                <p className="text-xs text-gray-600">Happy Customers</p>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <p className="font-bold text-xl text-[#FF7200]">4.8</p>
                <p className="text-xs text-gray-600">Star Rating</p>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <p className="font-bold text-xl text-[#FF7200]">5K+</p>
                <p className="text-xs text-gray-600">Services Done</p>
              </div>
            </div>
            
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookService}
                className="w-1/2 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-2 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm sm:text-base font-medium hover:from-[#25D366] hover:to-[#128C7E]"
              >
                <img src="/images/whatsapp-icon.png" alt="WhatsApp" className="mr-2" style={{ width: '24px', height: '24px' }} />
                Book Now
                <ArrowRight className="ml-1 sm:ml-2" size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContact}
                className="w-1/2 bg-white border-2 border-[#FF7200] text-[#FF7200] px-2 sm:px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center text-sm sm:text-base font-medium"
              >
                <Phone className="mr-2" size={20} />
                Call Us
              </motion.button>
            </div>

            {/* Scroll down indicator */}
            <motion.div 
              className="mt-8 flex justify-center md:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.div 
                className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <p className="text-sm text-gray-500 mb-1">Explore Services</p>
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L8 7L15 1" stroke="#FF7200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Desktop video only (hidden on mobile) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 md:mt-0 hidden md:block"
            >
              {/* Enhanced badge with better visibility */}
              <motion.div 
                className="absolute top-0 right-0 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-3 py-2 rounded-tr-lg rounded-bl-lg font-bold z-10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center">
                  <Clock size={25} className="mr-1" />
                  <span>SUPER FAST</span>
                </div>
              </motion.div>
              
              {/* Image with enhanced frame effect */}
              <div className="relative">
                {/* Frame overlay */}
                <div className="absolute inset-0 border-[8px] border-white rounded-lg shadow-xl"></div>
                
                <iframe
                  src="https://www.youtube.com/embed/unRdRJJypR4?si=V9CFOHrq8EU6WEzB&autoplay=1&mute=1&loop=1&playlist=unRdRJJypR4"
                  title="Car Service Timelapse"
                  className="rounded-lg shadow-xl w-full max-w-2xl mx-auto"
                  width="800"
                  height="600"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  rel="nofollow"
                ></iframe>

                {/* Animated review badge overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg"
                >
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400 mr-0.5" />
                      ))}
                    </div>
                    <span className="ml-1 text-sm font-medium">4.8/5 (120+ reviews)</span>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-lg shadow-xl w-auto cursor-pointer"
                onClick={handleContact}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] rounded-full p-3">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Emergency Service</p>
                    <a href="tel:+918448285289" className="text-lg font-bold text-gray-900 hover:text-[#FF7200] transition-colors">
                      +91 844 828 5289
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Mobile Number Modal */}
      <MobileNumberModal
        isOpen={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        onSubmit={handleMobileNumberSubmit}
        serviceName="Express Car Service"
      />
    </section>
  );
};

export default Hero;