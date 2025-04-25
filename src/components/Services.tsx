import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Zap, Timer, Calendar, ChevronRight, Car } from 'lucide-react';

const services = [
  {
    icon: (
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full h-full relative"
      >
        <Car className="w-full h-full text-[#FF7200] relative z-10" />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className="w-1/2 h-1/2 text-yellow-400 drop-shadow-md" />
        </motion.div>
      </motion.div>
    ),
    title: 'Why Wait All Day?',
    description: 'Car Service in 90 MINS, Nahi to FREEEE',
    tagline: 'Fast, Affordable, Done Right!',
    highlight: true,
    link: '/express-beta-atc',
    featured: true
  },
  {
    image: 'https://i.ibb.co/t4HmbHZ/Group.png',
    title: 'Periodic Service',
    description: 'Regular Maintenance and Servicing',
    link: '/services/periodic'
  },
  {
    image: 'https://i.ibb.co/dtZj35M/Group-3.png',
    title: 'AC Service',
    description: 'Professional Car AC Repair and Maintenance',
    link: '/services/ac'
  },
  {
    image: 'https://i.ibb.co/54mCj9R/Group-1.png',
    title: 'Car Spa & Cleaning',
    description: 'Professional Car Cleaning Services',
    link: '/services/car-spa'
  },
  {
    image: 'https://i.ibb.co/RNTXGpd/Group-2.png',
    title: 'Denting & Painting',
    description: 'Expert Dent Removal and Painting Services',
    link: '/services/denting'
  },
  {
    image: 'https://i.ibb.co/ZXCWCRC/Group-4.png',
    title: 'Battery Service',
    description: 'Battery Check, Repair and Replacement',
    link: '/services/battery'
  },
  {
    image: 'https://i.ibb.co/3zcSYzf/Frame.png',
    title: 'Windshield Service',
    description: 'Windshield Repair and Replacement',
    link: '/services/windshield'
  },
  {
    image: 'https://i.ibb.co/MpG0nBb/Layer-1.png',
    title: 'Car Detailing',
    description: 'Professional Car Detailing Services',
    link: '/services/detailing'
  },
  {
    image: 'https://i.ibb.co/hMSWCJB/Layer-x0020-1-1.png',
    title: 'Tyre Service',
    description: 'Tyre Maintenance and Replacement',
    link: '/services/tyre'
  }
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service: typeof services[0]) => {
    if (service.link) {
      if (service.link === '/express-beta-atc') {
        window.scrollTo(0, 0);
        navigate('/express-beta-atc');
      } else {
        navigate(service.link);
      }
    }
  };

  const handleScheduleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    navigate('/express-beta-atc');
    window.scrollTo(0, 0);
  };

  const featuredService = services.find(service => service.featured);
  const regularServices = services.filter(service => !service.featured);

  return (
    <section id="services" className="py-8 md:py-12 bg-gray-50 border-b-8 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Services</h2>
          <p className="text-sm md:text-base text-gray-600">Aapki Gaadi, Hamari Zimmedari</p>
        </div>

        {/* Featured Express Service */}
        {featuredService && (
          <motion.div
            onClick={() => handleServiceClick(featuredService)}
            className="mb-8 mx-auto max-w-3xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative bg-gradient-to-r from-orange-50 via-white to-orange-50 p-5 rounded-xl shadow-lg border-2 border-[#FF7200] cursor-pointer overflow-hidden">
              {/* Recommended Tag */}
              <div className="absolute top-0 right-0">
                <div className="bg-[#FF7200] text-white px-3 py-1 rounded-bl-lg font-medium flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Super Fast
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-orange-100 rounded-full p-5 flex items-center justify-center relative">
                  {featuredService.icon}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-[#FF7200]"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2 
                    }}
                  ></motion.div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="mb-1">
                    <span className="text-lg md:text-xl text-gray-800 font-bold">Express Car Service</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#FF7200] mb-1">
                    {featuredService.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-800 mb-1 font-semibold">
                    Car Service in <span className="text-[#FF7200]">90 MINS</span>, Nahi to <span className="text-[#FF7200] font-extrabold text-lg md:text-xl animate-pulse">FREEEE</span>
                  </p>
                  {featuredService.tagline && (
                    <p className="text-xs md:text-sm text-[#FF7200] font-medium mb-2 italic">
                      {featuredService.tagline}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-3">
                    <div className="flex items-center text-gray-700 bg-orange-50 px-2 py-1 rounded-full">
                      <Clock className="w-4 h-4 mr-1 text-[#FF7200]" />
                      <span className="font-bold text-sm">90-MIN Guarantee</span>
                    </div>
                    <motion.button
                      onClick={handleScheduleClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#FF7200] text-white px-4 py-1 rounded-md hover:bg-[#0e5aa8] transition-colors flex items-center gap-1 shadow-md text-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule Slot Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {regularServices.map((service, index) => (
            <motion.div
              key={index}
              onClick={() => handleServiceClick(service)}
              className={`bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden border border-transparent hover:border-orange-200 md:hover:border-orange-200 border-gray-100`}
              whileHover={{ 
                scale: service.link ? 1.02 : 1,
                y: -3
              }}
              whileTap={{ scale: service.link ? 0.98 : 1 }}
            >
              {/* Highlight corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 
                border-t-[30px] border-t-[#FF7200] opacity-30 md:opacity-0
                border-l-[30px] border-l-transparent
                md:group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <motion.div 
                className="mb-2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative"
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {/* Subtle pulse animation for mobile */}
                <div className="absolute inset-0 bg-orange-100 rounded-full opacity-20 animate-pulse hidden xs:flex"></div>
                {service.icon ? (
                  service.icon
                ) : (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </motion.div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#FF7200] transition-colors">
                {service.title}
              </h3>
              <p className="hidden md:block text-xs text-gray-600 mb-2">
                {service.description}
              </p>
              
              {/* View Service Button - visible on mobile, hover effect on desktop */}
              <div className="mt-auto pt-1 w-full">
                <div className="flex items-center justify-center text-[#FF7200] md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform md:translate-y-2 md:group-hover:translate-y-0">
                  <span className="font-medium mr-1 text-sm">Learn More</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ChevronRight size={14} />
                  </motion.div>
                </div>
              </div>
              
              {/* Mobile-only indicator */}
              <div className="absolute bottom-1 right-1 md:hidden">
                <ChevronRight size={12} className="text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;