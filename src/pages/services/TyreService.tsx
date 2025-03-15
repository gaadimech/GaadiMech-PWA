import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  Gauge, 
  Shield, 
  RotateCcw, 
  Car, 
  Wrench, 
  Settings,
  ChevronDown,
  Star,
  Clock,
  Award,
  Truck
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReviewCarousel from '../../components/ReviewCarousel';
import { getReviewsByService } from '../../data/reviews';

// Service features with icons
const features = [
  { name: "Tyre replacement", icon: <RotateCcw className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Wheel balancing", icon: <Settings className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Wheel alignment", icon: <Car className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Tyre pressure check", icon: <Gauge className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Tyre rotation", icon: <RotateCcw className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Puncture repair", icon: <Wrench className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Tubeless tyre", icon: <Shield className="w-5 h-5 text-[#FF7200]" /> },
  { name: "Multi-brand options", icon: <Car className="w-5 h-5 text-[#FF7200]" /> }
];

// Service benefits with icons
const benefits = [
  { title: "Quality Service", description: "Premium tyres & expert fitting", icon: <Award className="w-12 h-12 text-[#FF7200]" /> },
  { title: "Time Efficient", description: "Quick installation", icon: <Clock className="w-12 h-12 text-[#FF7200]" /> },
  { title: "Top Rated", description: "Highly rated by customers", icon: <Star className="w-12 h-12 text-[#FF7200]" /> },
  { title: "Doorstep Service", description: "Available in select areas", icon: <Truck className="w-12 h-12 text-[#FF7200]" /> }
];

// Service packages
const servicePackages = [
  {
    name: "Tyre Replacement",
    features: [
      "New Tyre Installation",
      "Old Tyre Disposal",
      "Wheel Balancing",
      "Tyre Pressure Check",
      "Valve Replacement"
    ],
    recommended: false
  },
  {
    name: "Complete Wheel Care",
    features: [
      "Four-Wheel Alignment",
      "Wheel Balancing",
      "Tyre Rotation",
      "Pressure Optimization",
      "Brake Inspection",
      "Suspension Check"
    ],
    recommended: true
  },
  {
    name: "Puncture Repair",
    features: [
      "Puncture Location",
      "Professional Repair",
      "Wheel Balancing",
      "Pressure Check",
      "Valve Inspection",
      "Safety Verification"
    ],
    recommended: false
  }
];

const TyreService = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  const handleGetPrices = (packageName?: string) => {
    let message = 'Hi%2C%20I%27d%20like%20to%20know%20the%20prices%20for%20Tyre%20Service';
    if (packageName) {
      message += `%20(%${packageName.replace(' ', '%20')})`;
    }
    window.open(`https://wa.me/917300042410?text=${message}`, '_blank');
  };

  const handleBookAppointment = () => {
    window.open(`https://wa.me/917300042410?text=I%27d%20like%20to%20book%20a%20Tyre%20Service.`, '_blank');
  };

  const serviceReviews = getReviewsByService('tyre_replacement');

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
      <Helmet>
        <title>Tyre Replacement & Wheel Alignment Services | GaadiMech</title>
        <meta name="description" content="Professional tyre services including replacement, alignment, balancing, and puncture repair. Keep your car running safely and efficiently." />
      </Helmet>

      {/* Hero Section with Custom Design Background */}
      <div className="relative h-[90vh] sm:h-[80vh] overflow-hidden">
        {/* Custom designed background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Circular tyre outline */}
          <div className="absolute right-0 md:right-[10%] top-[20%] w-[50vh] h-[50vh] border-[3px] border-[#FF7200]/20 rounded-full"></div>
          <div className="absolute left-[5%] bottom-[5%] w-[30vh] h-[30vh] border-[3px] border-[#FF7200]/10 rounded-full"></div>
          
          {/* Diagonal stripe */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[30%] -left-[10%] w-[120%] h-[30vh] bg-[#FF7200]/10 -rotate-12 transform origin-left"></div>
            <div className="absolute top-[40%] -left-[10%] w-[120%] h-[5vh] bg-[#FF7200]/30 -rotate-12 transform origin-left"></div>
          </div>
          
          {/* Abstract tyre treads */}
          <div className="absolute bottom-[10%] right-[5%] md:right-[15%] w-[50vh] h-[15vh] rounded-[100px] bg-gradient-to-r from-[#FF7200]/40 to-[#FF7200]/5 transform -rotate-6"></div>
          <div className="absolute bottom-[17%] right-[10%] md:right-[20%] w-[40vh] h-[8vh] rounded-[50px] bg-[#FF7200]/20 transform -rotate-6"></div>
          
          {/* Tyre tread pattern elements */}
          <div className="absolute top-[40%] left-[30%] w-[3vh] h-[15vh] bg-[#FF7200]/20 rotate-45"></div>
          <div className="absolute top-[40%] left-[35%] w-[3vh] h-[15vh] bg-[#FF7200]/20 rotate-45"></div>
          <div className="absolute top-[40%] left-[40%] w-[3vh] h-[15vh] bg-[#FF7200]/20 rotate-45"></div>
          
          {/* Wheel shapes */}
          <div className="absolute top-[25%] right-[25%] w-[20vh] h-[20vh] rounded-full border-8 border-[#FF7200]/30 bg-transparent"></div>
          <div className="absolute top-[30%] right-[30%] w-[10vh] h-[10vh] rounded-full border-4 border-[#FF7200]/20 bg-transparent"></div>
          
          {/* Radial highlight */}
          <div className="absolute top-[40%] left-[40%] w-[50vh] h-[50vh] rounded-full bg-radial-gradient"></div>
        </div>
        
        {/* Floating rubber particles animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-sm bg-black/40 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
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
        
        {/* Animated tread ripples */}
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
                    src="https://i.ibb.co/hMSWCJB/Layer-x0020-1-1.png"
                    alt="Tyre Service"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                </div>
              </div>
              
              {/* Text with better visibility */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                <span className="text-[#FF7200]">Tyre</span> Services & Solutions
              </h1>
              <div className="bg-black/30 backdrop-blur-sm py-3 px-6 rounded-full inline-block">
                <p className="text-xl text-white max-w-2xl mx-auto">
                  Keep your car grounded with expert tyre care
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
                Book Tyre Service Now
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Tyre Care Solutions</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  Your car's tyres are its only contact with the road. Our professional tyre services ensure 
                  optimal grip, handling, and safety in all driving conditions.
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
                    src="https://i.ibb.co/M5C1dZPs/Tyre-Change.jpg" 
                    alt="Professional tyre replacement service" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating label */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    Expert Tyre Services
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-lg shadow-lg hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#FF7200]/10 p-3 rounded-full">
                      <Gauge className="text-[#FF7200] w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Premium Tyres</p>
                      <p className="text-gray-600 text-sm">Perfect balance of grip & durability</p>
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
                Choose Your Tyre Service Package
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
          
          {/* Tread pattern animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-sm bg-white/20"
                style={{
                  width: `${Math.random() * 30 + 10}px`,
                  height: `${Math.random() * 50 + 10}px`,
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
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Proper tyre care is essential for safety</h3>
              <p className="text-white/90 mb-6">
                Book your tyre service today for a smoother, safer ride. Our expert technicians will ensure your tyres are in optimal condition for maximum grip and handling.
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
                src="https://i.ibb.co/hMSWCJB/Layer-x0020-1-1.png" 
                alt="Tyre Service"
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
                question: "How often should I replace my car tyres?",
                answer: "Most tyres should be replaced every 40,000-50,000 kilometers or every 3-5 years, even if they haven't reached their wear limits. Environmental factors and driving conditions can accelerate wear."
              },
              {
                question: "What's the importance of wheel alignment?",
                answer: "Proper wheel alignment ensures even tyre wear, better fuel efficiency, improved handling, and longer tyre life. We recommend checking your alignment at least once a year or if you notice your vehicle pulling to one side."
              },
              {
                question: "Can you repair any punctured tyre?",
                answer: "Not all punctures can be safely repaired. We can repair punctures in the tread area that are smaller than 6mm in diameter. Sidewall punctures or large damage generally requires tyre replacement for safety."
              },
              {
                question: "What brands of tyres do you offer?",
                answer: "We carry premium, mid-range, and economy options from brands like MRF, Apollo, CEAT, JK, Bridgestone, Michelin, and more, allowing us to meet various budget and performance requirements."
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
      
      {/* Final Floating CTA Button */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBookAppointment}
          className="bg-[#FF7200] text-white p-4 rounded-full shadow-lg"
        >
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TyreService;