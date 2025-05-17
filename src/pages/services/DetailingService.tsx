import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  Droplets, 
  Shield, 
  Sparkles, 
  Car, 
  Brush, 
  Zap,
  ChevronDown,
  Star,
  Clock,
  Award,
  Truck
} from 'lucide-react';

import ReviewCarousel from '../../components/ReviewCarousel';
import { getReviewsByService } from '../../data/reviews';

// Service features with icons
const features = [
  { name: "Exterior deep cleaning", icon: <Droplets className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Interior detailing", icon: <Car className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Paint correction", icon: <Sparkles className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Ceramic coating", icon: <Shield className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Leather treatment", icon: <Brush className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Headlight restoration", icon: <Zap className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Engine bay detailing", icon: <Car className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Odor elimination", icon: <Sparkles className="w-5 h-5 text-[#FF7200]" /> }
];

// Service benefits with icons
const benefits = [
  { title: "Quality Service", description: "Premium products & expert techniques", icon: <Award className="w-12 h-12 text-[#FF7200]" /> },
  { title: "Time Efficient", description: "Thorough yet quick service", icon: <Clock className="w-12 h-12 text-[#FF7200]" /> },
  { title: "Top Rated", description: "Highly rated by customers", icon: <Star className="w-12 h-12 text-[#FF7200]" /> },
  { title: "Doorstep Service", description: "Available in select areas", icon: <Truck className="w-12 h-12 text-[#FF7200]" /> }
];

// Service packages
const servicePackages = [
  {
    name: "Interior Detailing",
    features: [
      "Complete Interior Cleaning",
      "Upholstery Treatment",
      "Dashboard Conditioning",
      "Door Panel Cleaning",
      "Air Vent Sanitation",
      "Odor Elimination"
    ],
    recommended: false
  },
  {
    name: "Premium Detailing",
    features: [
      "Exterior Deep Cleaning",
      "Paint Correction",
      "Interior Detailing",
      "Leather Treatment",
      "Engine Bay Cleaning",
      "Headlight Restoration",
      "Tire & Rim Detailing"
    ],
    recommended: true
  },
  {
    name: "Ceramic Coating",
    features: [
      "Paint Preparation",
      "Surface Decontamination",
      "Clay Bar Treatment",
      "Polish Application",
      "Ceramic Coating",
      "2-Year Protection",
      "Hydrophobic Effect"
    ],
    recommended: false
  }
];

const DetailingService = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  const handleGetPrices = (packageName?: string) => {
    let message = 'Hi%2C%20I%27d%20like%20to%20know%20the%20prices%20for%20Car%20Detailing%20Service';
    if (packageName) {
      message += `%20(%${packageName.replace(' ', '%20')})`;
    }
    window.open(`https://wa.me/917300042414?text=${message}`, '_blank');
  };

  const handleBookAppointment = () => {
    window.open(`https://wa.me/917300042414?text=I%27d%20like%20to%20book%20a%20Car%20Detailing%20Service.`, '_blank');
  };

  const serviceReviews = getReviewsByService('car_detailing');

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
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById('main-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 overflow-x-hidden"
    >

      {/* Hero Section with Custom Design Background */}
      <div className="relative h-[90vh] sm:h-[80vh] overflow-hidden">
        {/* Custom designed background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Circular detail outline */}
          <div className="absolute right-0 md:right-[10%] top-[20%] w-[50vh] h-[50vh] border-[3px] border-[#FF7200]/20 rounded-full"></div>
          <div className="absolute left-[5%] bottom-[5%] w-[30vh] h-[30vh] border-[3px] border-[#FF7200]/10 rounded-full"></div>
          
          {/* Diagonal stripe */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[30%] -left-[10%] w-[120%] h-[30vh] bg-[#FF7200]/10 -rotate-12 transform origin-left"></div>
            <div className="absolute top-[40%] -left-[10%] w-[120%] h-[5vh] bg-[#FF7200]/30 -rotate-12 transform origin-left"></div>
          </div>
          
          {/* Abstract car shape */}
          <div className="absolute bottom-[10%] right-[5%] md:right-[15%] w-[50vh] h-[15vh] rounded-[100px] bg-gradient-to-r from-[#FF7200]/40 to-[#FF7200]/5 transform -rotate-6"></div>
          <div className="absolute bottom-[17%] right-[10%] md:right-[20%] w-[40vh] h-[8vh] rounded-[50px] bg-[#FF7200]/20 transform -rotate-6"></div>
          
          {/* Detail spots */}
          <div className="absolute top-[35%] left-[25%] w-[8vh] h-[8vh] rounded-full bg-[#FF7200]/30 blur-md"></div>
          <div className="absolute top-[40%] left-[30%] w-[5vh] h-[5vh] rounded-full bg-[#FF7200]/20 blur-md"></div>
          <div className="absolute top-[45%] left-[35%] w-[3vh] h-[3vh] rounded-full bg-[#FF7200]/10 blur-md"></div>
          
          {/* Shine lines */}
          <div className="absolute top-[20%] left-[30%] w-[20vh] h-[2px] bg-[#FF7200]/50 rotate-45"></div>
          <div className="absolute top-[25%] left-[32%] w-[15vh] h-[2px] bg-[#FF7200]/30 rotate-45"></div>
          <div className="absolute top-[30%] left-[34%] w-[10vh] h-[2px] bg-[#FF7200]/20 rotate-45"></div>
          
          {/* Radial highlight */}
          <div className="absolute top-[40%] left-[40%] w-[50vh] h-[50vh] rounded-full bg-radial-gradient"></div>
        </div>
        
        {/* Floating polish particles animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/30 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 + 200],
                opacity: [0.7, 0],
                scale: [1, 0.7]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        {/* Animated shine ripples */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#FF7200]/30"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ 
                width: ['0px', '300px'], 
                height: ['0px', '300px'], 
                opacity: [0.8, 0],
                borderWidth: ['5px', '1px']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeOut',
                delay: i * 2
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-full shadow-lg shadow-orange-500/20">
                  <img
                    src="https://i.ibb.co/MpG0nBb/Layer-1.png"
                    alt="Car Detailing Service"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                </div>
              </div>
              
              {/* Text with better visibility */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                <span className="text-[#FF7200]">Premium</span> Car Detailing
              </h1>
              <div className="bg-black/30 backdrop-blur-sm py-3 px-6 rounded-full inline-block">
                <p className="text-xl text-white max-w-2xl mx-auto">
                  Restore your car's beauty with our expert detailing services
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookAppointment}
                className="bg-[#FF7200] hover:bg-[#FF8800] text-white font-semibold px-8 py-4 rounded-lg shadow-lg flex items-center justify-center mx-auto"
              >
                Book Detailing Service Now
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
              
              {/* Scroll down indicator */}
              <motion.div 
                className="mt-16 text-white/80 flex flex-col items-center cursor-pointer"
                onClick={scrollToContent}
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                <span className="text-sm mb-2">Explore Our Services</span>
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Custom wave separator */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[10vh]">
            <path 
              fill="white" 
              fillOpacity="1" 
              d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,90.7C672,75,768,85,864,117.3C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Benefits Section - Bridge between hero and main content */}
      <div className="relative z-30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-16 sm:-mt-20">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 bg-orange-50 p-3 rounded-full">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation with highlight indicator */}
        <div className="relative flex flex-wrap justify-center mb-12 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'about' 
                ? 'text-[#FF7200]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            About Our Service
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'packages' 
                ? 'text-[#FF7200]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Service Packages
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'reviews' 
                ? 'text-[#FF7200]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Customer Reviews
          </button>
          
          {/* Animated indicator */}
          <motion.div 
            className="absolute bottom-0 h-0.5 bg-[#FF7200]"
            animate={{ 
              left: activeTab === 'about' ? '0%' : activeTab === 'packages' ? '33.33%' : '66.66%',
              width: '33.33%'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* About Tab */}
          {activeTab === 'about' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Make Your Car Look New Again</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  Our premium detailing services go beyond regular cleaning. We use professional-grade products 
                  and techniques to restore your car's finish and protect it from environmental damage.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors"
                    >
                      <div className="mt-1 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{feature.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative h-full">
                <div className="relative aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://i.ibb.co/4gPMdzV6/male-worker-wrapping-car-with-ptotective-foil.jpg" 
                    alt="Professional car detailing service" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating label */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    Premium Detailing Process
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-lg shadow-lg hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#FF7200]/10 p-3 rounded-full">
                      <Sparkles className="text-[#FF7200] w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Showroom Finish</p>
                      <p className="text-gray-600 text-sm">Professional results</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-center text-gray-900 mb-8"
              >
                Choose Your Car Detailing Package
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {servicePackages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className={`rounded-xl overflow-hidden shadow-lg border ${
                      pkg.recommended ? 'border-[#FF7200]' : 'border-gray-200'
                    }`}
                  >
                    {pkg.recommended && (
                      <div className="bg-[#FF7200] text-white text-center py-2 font-medium">
                        Most Popular
                      </div>
                    )}
                    <div className={`p-6 ${pkg.recommended ? 'bg-[#FFF9F5]' : 'bg-white'}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="text-[#FF7200] w-5 h-5 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleGetPrices(pkg.name)}
                        className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center ${
                          pkg.recommended 
                            ? 'bg-[#FF7200] text-white' 
                            : 'bg-white text-[#FF7200] border border-[#FF7200]'
                        }`}
                      >
                        Get Prices
                        <ArrowRight className="ml-2" size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-center text-gray-900 mb-8"
              >
                What Our Customers Say
              </motion.h2>
              <ReviewCarousel reviews={serviceReviews} />
            </motion.div>
          )}
        </div>
        
        {/* Call to Action with Design Elements */}
        <div className="relative bg-gradient-to-r from-[#FF7200] to-[#FF9500] rounded-xl p-8 mb-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          {/* Shine particles animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 40 + 20}px`,
                  left: `${Math.random() * 100}%`,
                  bottom: '-20px',
                }}
                animate={{
                  y: [0, -100 - Math.random() * 100],
                  x: [0, (Math.random() - 0.5) * 40],
                  opacity: [0.7, 0],
                  scale: [1, 0.8]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Bring back your car's showroom shine</h3>
              <p className="text-white/90 mb-6">
                Book your detailing service today and experience the transformation. Our expert technicians will restore your car's appearance with attention to every detail.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookAppointment}
                className="bg-white text-[#FF7200] px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors"
              >
                Book Your Appointment
              </motion.button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://i.ibb.co/MpG0nBb/Layer-1.png" 
                alt="Car Detailing Service"
                className="w-40 h-40 mx-auto object-contain filter drop-shadow-lg"
              />
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How long does a full car detailing take?",
                answer: "A complete premium detailing service typically takes 4-8 hours depending on the size, condition of your vehicle, and the package selected."
              },
              {
                question: "What's the difference between car washing and detailing?",
                answer: "Car washing focuses on exterior cleaning, while detailing is a thorough deep cleaning of both interior and exterior with specialized products and techniques to restore and protect surfaces."
              },
              {
                question: "How often should I detail my car?",
                answer: "For best results, we recommend a full detailing every 4-6 months, with more frequent basic maintenance in between to maintain your car's appearance."
              },
              {
                question: "What is ceramic coating and how long does it last?",
                answer: "Ceramic coating is a liquid polymer that creates a protective layer on your car's paint. Our ceramic coatings typically last 2-5 years with proper maintenance, providing superior protection against environmental contaminants."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailingService;