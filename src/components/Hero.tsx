import React from 'react';
import { ArrowRight, Phone, Clock, Home, IndianRupee, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleBookService = () => {
    const message = encodeURIComponent("Hi, I'd like to book an Express Car Service through GaadiMech.");
    window.open(`https://wa.me/917300042410?text=${message}`, '_blank');
  };

  const handleContact = () => {
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
      {/* Decorative elements - hidden on mobile for better performance */}
      <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-xl"></div>
      <div className="hidden md:block absolute bottom-1/3 left-1/4 w-6 h-12 rounded-full bg-[#FF7200] opacity-10"></div>
      
      {/* Dotted pattern - hidden on mobile */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            {/* New Badge - centered on mobile */}
            <div className="inline-block mb-4 relative">
              <div className="absolute inset-0 bg-[#FF7200] rounded-lg blur-sm opacity-30"></div>
              <div className="relative bg-gradient-to-r from-[#FF7200] to-[#FF9500] px-4 py-1 rounded-lg shadow-md">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-white fill-white" />
                  <span className="text-white font-bold text-sm uppercase tracking-wider">New Service</span>
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
            
            {/* Simplified timer visualization */}
            <div 
              className="mb-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm mx-auto md:mx-0 max-w-xs cursor-pointer hover:shadow-md transition-all"
              onClick={handleExpressServiceClick}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#FF7200] text-white font-bold text-2xl">
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
            </div>
            
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
                  <Clock className="text-white" size={20} />
                </div>
                <p className="ml-3 text-lg font-medium text-gray-700">
                  <span className="text-[#FF7200] font-bold">Express</span> Service
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center"
              >
                <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                  <Home className="text-white" size={20} />
                </div>
                <p className="ml-3 text-lg font-medium text-gray-700">
                  <span className="text-[#FF7200] font-bold">Doorstep</span> Pickup & Drop
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center"
              >
                <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                  <IndianRupee className="text-white" size={20} />
                </div>
                <p className="ml-3 text-lg font-medium text-gray-700">
                  <span className="text-[#FF7200] font-bold">Affordable</span> Pricing
                </p>
              </motion.div>
            </motion.div>
            
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookService}
                className="w-1/2 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-2 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm sm:text-base font-medium"
              >
                Book Now
                <ArrowRight className="ml-1 sm:ml-2" size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContact}
                className="w-1/2 bg-white border-2 border-[#FF7200] text-[#FF7200] px-2 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-[#0e5aa8] hover:border-[#0e5aa8] hover:text-white transition-all text-sm sm:text-base font-medium"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-8 md:mt-0 hidden md:block"
          >
            {/* Express badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-3 py-2 rounded-tr-lg rounded-bl-lg font-bold z-10 shadow-lg">
              <div className="flex items-center">
                <Clock size={25} className="mr-1" />
                <span>SUPER FAST</span>
              </div>
            </div>
            
            {/* Image with frame effect */}
            <div className="relative">
              {/* Frame overlay */}
              <div className="absolute inset-0 border-[8px] border-white rounded-lg shadow-xl"></div>
              
              <img
                src="https://i.ibb.co/Kcb1YjZc/Mechanic-Image-1.png"
                alt="Professional mechanic working on a car"
                className="rounded-lg shadow-xl w-full max-w-2xl mx-auto hover:opacity-90 transition-opacity"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-lg shadow-xl w-auto">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;