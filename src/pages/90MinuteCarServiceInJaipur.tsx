import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { StarIcon } from '@heroicons/react/20/solid';
import { WrenchIcon, SparklesIcon, ShieldCheckIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';
import { useMetaAnalytics } from '../hooks/useMetaAnalytics';

const NinetyMinuteCarServiceInJaipur: React.FC = () => {
  const navigate = useNavigate();
  const { trackLead, trackContact } = useMetaAnalytics();
  const cityName = "Jaipur";
  const serviceName = "90-Minute Car Service";

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

  const handleBookService = async () => {
    // Track Book Now button as Lead
    await trackLead(
      undefined, // No customer info available at this point
      {
        content_name: `90-Minute Car Service Booking - ${cityName}`,
        content_type: 'service_inquiry',
        currency: 'INR'
      }
    );

    const message = encodeURIComponent(`Hi, I'd like to book a 90-Minute Car Service in ${cityName} through GaadiMech.`);
    window.open(`https://wa.me/917300042410?text=${message}`, '_blank');
  };

  const handleContact = async () => {
    // Track Contact button
    await trackContact();
    window.location.href = `tel:+918448285289`;
  };

  const handleExpressService = () => {
    navigate('/express-beta-atc');
  };

  const handleServicePage = () => {
    navigate('/services/periodic');
  };

  return (
    <>
      {/* SEO handled centrally via SEOContent */}

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
                    <span className="text-white font-bold text-sm uppercase tracking-wider">Express Service</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                90-Minute Express Car Service in{" "}
                <div className="inline-block relative">
                  <span className="relative z-10 text-[#FF7200]">{cityName}</span>
                  <div className="absolute -bottom-2 left-0 h-3 w-full bg-yellow-200 opacity-40 -rotate-1"></div>
                </div>
              </h1>

              <p className="text-base md:text-lg text-gray-600 mb-6">
                For busy professionals who can't wait. Get a comprehensive car service completed in just 90 minutes with our express maintenance package.
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
                    <ClockIcon className="text-white h-5 w-5" />
                  </div>
                  <p className="ml-3 text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">90-Minute</span> Guaranteed Completion
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
                    <span className="text-[#FF7200] font-bold">Free</span> Pickup & Drop
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
                    <span className="text-[#FF7200] font-bold">Essential</span> Maintenance Package
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
                  <ClockIcon className="h-5 w-5 mr-1" />
                  <span>90 MINUTES ONLY</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 border-[8px] border-white rounded-lg shadow-xl"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-lg shadow-xl w-auto">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] rounded-full p-3">
                    <PhoneIcon className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Express Booking</p>
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

      {/* What's Included Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What's Included in 90-Minute Service</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our express service covers essential maintenance to keep your car running smoothly
            </p>
          </div>
          
          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <WrenchIcon className="h-8 w-8 text-[#FF7200]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Engine Oil Change</h3>
                <p className="text-gray-600 text-center">
                  Premium quality engine oil replacement for optimal engine performance
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <SparklesIcon className="h-8 w-8 text-[#FF7200]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Oil Filter Replacement</h3>
                <p className="text-gray-600 text-center">
                  New oil filter to ensure clean oil circulation through your engine
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <ShieldCheckIcon className="h-8 w-8 text-[#FF7200]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">15-Point Inspection</h3>
                <p className="text-gray-600 text-center">
                  Comprehensive safety and performance check of critical vehicle components
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <ClockIcon className="h-8 w-8 text-[#FF7200]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Fluid Top-ups</h3>
                <p className="text-gray-600 text-center">
                  Essential fluid checks and top-ups including coolant, brake fluid, and washer fluid
                </p>
              </div>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] hover:from-[#FF9500] hover:to-[#FF7200] text-white px-8 py-3 text-lg"
              onClick={handleExpressService}
            >
              Book 90-Minute Service
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our 90-Minute Service Process</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              How we deliver quality service in just 90 minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FF7200] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Express Check-in</h3>
              <p className="text-gray-600">
                Quick digital documentation and vehicle assessment to identify service needs.
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FF7200] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Parallel Processing</h3>
              <p className="text-gray-600">
                Our team works simultaneously on different aspects of your vehicle to save time.
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FF7200] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Quality Check & Delivery</h3>
              <p className="text-gray-600">
                Final inspection and vehicle delivery within the promised 90-minute timeframe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our 90-Minute Service in {cityName}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Save time without compromising on quality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-[#FF7200]"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Time Guarantee</h3>
              <p className="text-gray-600">
                We promise to complete your service within 90 minutes or we'll offer a complimentary service upgrade.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-[#FF7200]"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Skilled Technicians</h3>
              <p className="text-gray-600">
                Our specialized express service team is trained to work efficiently without compromising quality.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-[#FF7200]"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Genuine Parts</h3>
              <p className="text-gray-600">
                We use only manufacturer-recommended parts and premium lubricants for all express services.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-[#FF7200]"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Reports</h3>
              <p className="text-gray-600">
                Receive detailed digital service reports with recommendations for future maintenance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FF7200] opacity-20 blur-xl"></div>
            <div className="absolute -bottom-14 -left-14 w-40 h-40 rounded-full bg-[#FF9500] opacity-20 blur-xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need a Quick Car Service in {cityName}?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                Book our 90-minute express service and get back on the road in no time. Perfect for busy schedules!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] hover:from-[#25D366] hover:to-[#128C7E] text-white px-8 py-3 text-lg"
                  onClick={handleBookService}
                >
                  Book on WhatsApp
                </Button>
                <Button 
                  className="bg-white text-[#FF7200] border-2 border-[#FF7200] hover:bg-[#FF7200] hover:text-white px-8 py-3 text-lg"
                  onClick={handleContact}
                >
                  Call Us Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about our 90-minute car service in {cityName}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is the 90-minute service suitable for all car models?</h3>
              <p className="text-gray-600">
                Yes, our express service is available for most passenger cars and SUVs. For luxury or specialized vehicles, we recommend confirming availability in advance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">What if my car needs additional repairs?</h3>
              <p className="text-gray-600">
                Our 15-point inspection may identify additional issues. We'll provide a detailed report and quote for any extra work, which can be scheduled separately or added with additional time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How often should I get the 90-minute service?</h3>
              <p className="text-gray-600">
                We recommend this express service every 5,000-7,500 km for most vehicles, with more comprehensive services at manufacturer-recommended intervals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Do you offer a warranty on the express service?</h3>
              <p className="text-gray-600">
                Yes, all our services, including the 90-minute express package, come with a warranty on parts and labor for up to 6 months or 5,000 kilometers, whichever comes first.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NinetyMinuteCarServiceInJaipur;