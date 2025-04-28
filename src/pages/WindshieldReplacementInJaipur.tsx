import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { StarIcon } from '@heroicons/react/20/solid';
import { WrenchIcon, SparklesIcon, ShieldCheckIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const WindshieldReplacementInJaipur: React.FC = () => {
  const navigate = useNavigate();
  const cityName = "Jaipur";
  const serviceName = "Windshield Replacement";

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
    const message = encodeURIComponent(`Hi, I'd like to book a Windshield Replacement service in ${cityName} through GaadiMech.`);
    window.open(`https://wa.me/917300042410?text=${message}`, '_blank');
  };

  const handleContact = () => {
    window.location.href = `tel:+918448285289`;
  };

  const handleExpressService = () => {
    navigate('/express-beta-atc');
  };

  const handleServicePage = () => {
    navigate('/services/windshield');
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
                    <span className="text-white font-bold text-sm uppercase tracking-wider">Same Day Service</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Expert Windshield Replacement in{" "}
                <div className="inline-block relative">
                  <span className="relative z-10 text-[#FF7200]">{cityName}</span>
                  <div className="absolute -bottom-2 left-0 h-3 w-full bg-yellow-200 opacity-40 -rotate-1"></div>
                </div>
              </h1>

              <p className="text-base md:text-lg text-gray-600 mb-6">
                Fast, reliable windshield replacement at your doorstep. Our experts use high-quality materials and provide same-day service across {cityName}.
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
                    <span className="text-[#FF7200] font-bold">Same-day</span> Service Available
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
                    <span className="text-[#FF7200] font-bold">High-quality</span> Glass with Warranty
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
                  <img src="https://i.ibb.co/gM65t7Z/whatsapp-icon.png" alt="WhatsApp" className="mr-2" style={{ width: '36px', height: '36px' }} />
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
                  <span>EXPRESS SERVICE</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 border-[8px] border-white rounded-lg shadow-xl"></div>
                <img
                  src="https://i.ibb.co/MpMQJrP/windshield-replacement.jpg"
                  alt={`Professional windshield replacement in ${cityName}`}
                  className="rounded-lg shadow-xl w-full max-w-2xl mx-auto hover:opacity-90 transition-opacity"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-lg shadow-xl w-auto">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] rounded-full p-3">
                    <PhoneIcon className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Emergency Service</p>
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

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Windshield Services in {cityName}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We offer complete windshield solutions from minor repairs to full replacements
            </p>
          </div>
          
          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={handleServicePage}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <WrenchIcon className="h-6 w-6 text-[#FF7200]" />
                  </div>
                  <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                    <StarIcon className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-800">Top Rated</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Full Windshield Replacement</h3>
                <p className="text-gray-600 mb-4">Complete replacement with high-quality glass, including installation and sealing</p>
                <Button 
                  className="w-full bg-gradient-to-r from-[#FF7200] to-[#FF9500] hover:from-[#FF9500] hover:to-[#FF7200] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServicePage();
                  }}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={handleServicePage}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <SparklesIcon className="h-6 w-6 text-[#FF7200]" />
                  </div>
                  <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                    <StarIcon className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-800">Popular</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Crack Repair</h3>
                <p className="text-gray-600 mb-4">Professional repair for small cracks and chips to prevent further damage</p>
                <Button 
                  className="w-full bg-gradient-to-r from-[#FF7200] to-[#FF9500] hover:from-[#FF9500] hover:to-[#FF7200] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServicePage();
                  }}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={handleExpressService}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-[#FF7200]" />
                  </div>
                  <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                    <StarIcon className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-800">Express</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Express Windshield Service</h3>
                <p className="text-gray-600 mb-4">Quick and efficient service with same-day completion guaranteed</p>
                <Button 
                  className="w-full bg-gradient-to-r from-[#FF7200] to-[#FF9500] hover:from-[#FF9500] hover:to-[#FF7200] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpressService();
                  }}
                >
                  Book Express
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose GaadiMech for Windshield Replacement in {cityName}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver quality, convenience and reliability for all your windshield needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-[#FF7200]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality Glass</h3>
              <p className="text-gray-600">
                We use only high-quality glass that matches OEM specifications for safety and durability.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <ClockIcon className="h-8 w-8 text-[#FF7200]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Service</h3>
              <p className="text-gray-600">
                Our expert technicians can complete most windshield replacements within a few hours.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <MapPinIcon className="h-8 w-8 text-[#FF7200]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Doorstep Service</h3>
              <p className="text-gray-600">
                Our mobile service comes to your location, whether at home or work, across {cityName}.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FF7200] opacity-20 blur-xl"></div>
            <div className="absolute -bottom-14 -left-14 w-40 h-40 rounded-full bg-[#FF9500] opacity-20 blur-xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Windshield Replacement in {cityName}?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                Don't drive with a damaged windshield. Book our service today for a safe and reliable replacement.
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about windshield replacement in {cityName}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How long does a windshield replacement take?</h3>
              <p className="text-gray-600">
                A standard windshield replacement typically takes 2-3 hours. However, we recommend waiting an additional hour before driving to allow the adhesive to properly set.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is it safe to drive with a cracked windshield?</h3>
              <p className="text-gray-600">
                No, it's not safe. Even small cracks can compromise the structural integrity of your windshield and impair visibility, making it dangerous to drive.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Do you provide warranty on windshield replacement?</h3>
              <p className="text-gray-600">
                Yes, we offer a 1-year warranty on our windshield replacements, covering defects in materials and workmanship.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Do you serve all areas in {cityName}?</h3>
              <p className="text-gray-600">
                Yes, we provide windshield replacement services throughout {cityName} and surrounding areas, with mobile service coming to your location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WindshieldReplacementInJaipur; 