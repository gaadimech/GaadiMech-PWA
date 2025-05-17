import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PhoneIcon, MapPinIcon, ShieldCheckIcon, WrenchIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

import ReviewCarousel from '../components/ReviewCarousel';
import Breadcrumb from '../components/Breadcrumb';
import { getReviewsByService } from '../data/reviews';

const CarMechanicShopInJaipur = () => {
  const navigate = useNavigate();
  const cityName = "Jaipur";
  const serviceName = "Car Mechanic Shop";
  const serviceReviews = getReviewsByService('periodic');

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

  const handleBookService = () => {
    const message = encodeURIComponent(`Hi, I'd like to book a service with your Car Mechanic Shop in ${cityName} through GaadiMech.`);
    window.open(`https://wa.me/917300042414?text=${message}`, '_blank');
  };

  const handleContact = () => {
    window.location.href = `tel:+918448285289`;
  };

  return (
    <>
      <Breadcrumb cityName={cityName} serviceName={serviceName} />

      {/* Hero Section */}
      <section className="pt-12 md:pt-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white border-b-8 border-gray-100">
        {/* Decorative elements */}
        <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#FF7200] opacity-10 blur-xl"></div>
        <div className="hidden md:block absolute bottom-1/3 left-1/4 w-6 h-12 rounded-full bg-[#FF7200] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <div className="inline-block mb-4 relative">
                <div className="absolute inset-0 bg-[#FF7200] rounded-lg blur-sm opacity-30"></div>
                <div className="relative bg-gradient-to-r from-[#FF7200] to-[#FF9500] px-4 py-1 rounded-lg shadow-md">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 w-5 text-white fill-white" />
                    <span className="text-white font-bold text-sm uppercase tracking-wider">Expert Mechanics</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Best Car Mechanic Shop in{" "}
                <div className="inline-block relative">
                  <span className="relative z-10 text-[#FF7200]">{cityName}</span>
                  <div className="absolute -bottom-2 left-0 h-3 w-full bg-yellow-200 opacity-40 -rotate-1"></div>
                </div>
              </h1>

              <p className="text-base md:text-lg text-gray-600 mb-6">
                Trusted local car mechanics in Jaipur offering expert repair and maintenance services for all vehicle makes and models.
              </p>
              
              <motion.div 
                className="mb-8 space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  variants={itemVariants} 
                  className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center"
                >
                  <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                    <WrenchIcon className="text-white h-5 w-5" />
                  </div>
                  <p className="ml-3 text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">Experienced</span> Mechanics
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center"
                >
                  <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                    <MapPinIcon className="text-white h-5 w-5" />
                  </div>
                  <p className="ml-3 text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">Doorstep</span> Service Available
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center"
                >
                  <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                    <ShieldCheckIcon className="text-white h-5 w-5" />
                  </div>
                  <p className="ml-3 text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">Quality</span> Parts & Service
                  </p>
                </motion.div>
              </motion.div>
              
              <div className="flex flex-row gap-4 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookService}
                  className="w-1/2 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-2 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm sm:text-base font-medium hover:from-[#25D366] hover:to-[#128C7E]"
                >
                  Book Service
                  <ArrowRight className="ml-1 sm:ml-2 h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContact}
                  className="w-1/2 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-2 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm sm:text-base font-medium hover:from-[#0e5aa8] hover:to-[#1c7ed6]"
                >
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
            
            {/* Hero image section - right side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 md:mt-0 hidden md:block"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-3 py-2 rounded-tr-lg rounded-bl-lg font-bold z-10 shadow-lg">
                <div className="flex items-center">
                  <WrenchIcon className="h-5 w-5 mr-1" />
                  <span>EXPERT MECHANICS</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-lg shadow-xl w-auto">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] rounded-full p-3">
                    <PhoneIcon className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Book Now</p>
                    <a href="tel:+918448285289" className="text-lg font-bold text-gray-900 hover:text-[#FF7200] transition-colors">
                      +91 844 828 5289
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="my-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">General Repair</h3>
                <p className="text-gray-600 mb-4">
                  From routine maintenance to complex repairs, our mechanics can handle it all
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Engine diagnostics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Transmission repair
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Brake system service
                  </li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBookService}
                  className="w-full bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm font-medium"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Specialized Services</h3>
                <p className="text-gray-600 mb-4">
                  Expert solutions for specialized mechanical issues
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Clutch replacement
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Timing belt service
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Suspension repair
                  </li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBookService}
                  className="w-full bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm font-medium"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Diagnostic Services</h3>
                <p className="text-gray-600 mb-4">
                  Advanced diagnostic tools to identify issues accurately
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Engine check light diagnosis
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Computer diagnostics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Performance issues
                  </li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBookService}
                  className="w-full bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm font-medium"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose GaadiMech's Car Mechanic Shop in Jaipur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Experienced Mechanics</h3>
              <p>Our team has years of experience working with all car makes and models</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Doorstep Service</h3>
              <p>We bring our expertise to your doorstep with our mobile mechanic service</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Quality Parts</h3>
              <p>We use only genuine or OEM-quality parts for all repairs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p>Clear, upfront pricing with no hidden charges</p>
            </div>
          </div>
        </div>

        <div className="my-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookService}
            className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-lg font-medium mx-auto hover:from-[#25D366] hover:to-[#128C7E]"
          >
            Book Your Car Service Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </div>

        <ReviewCarousel reviews={serviceReviews} />
      </div>
    </>
  );
};

export default CarMechanicShopInJaipur; 