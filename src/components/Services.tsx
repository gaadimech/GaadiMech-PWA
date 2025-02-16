import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Zap, Timer, Calendar } from 'lucide-react';

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
        className="w-full h-full"
      >
        <Zap className="w-full h-full text-[#FF7200]" />
      </motion.div>
    ),
    title: 'Express Service',
    description: 'Get your car serviced in 90 minutes',
    highlight: true,
    link: '/express',
    featured: true
  },
  {
    image: 'https://i.ibb.co/t4HmbHZ/Group.png',
    title: 'Periodic Service',
    description: 'Regular maintenance and servicing',
    link: '/services/periodic'
  },
  {
    image: 'https://i.ibb.co/dtZj35M/Group-3.png',
    title: 'AC Service',
    description: 'Professional car AC repair and maintenance',
    link: '/services/ac'
  },
  {
    image: 'https://i.ibb.co/54mCj9R/Group-1.png',
    title: 'Car Spa & Cleaning',
    description: 'Professional car cleaning services',
    link: '/services/car-spa'
  },
  {
    image: 'https://i.ibb.co/RNTXGpd/Group-2.png',
    title: 'Denting & Painting',
    description: 'Expert dent removal and painting services',
    link: '/services/denting'
  },
  {
    image: 'https://i.ibb.co/ZXCWCRC/Group-4.png',
    title: 'Battery Service',
    description: 'Battery check, repair and replacement',
    link: '/services/battery'
  },
  {
    image: 'https://i.ibb.co/3zcSYzf/Frame.png',
    title: 'Windshield Service',
    description: 'Windshield repair and replacement',
    link: '/services/windshield'
  },
  {
    image: 'https://i.ibb.co/MpG0nBb/Layer-1.png',
    title: 'Car Detailing',
    description: 'Professional car detailing services',
    link: '/services/detailing'
  },
  {
    image: 'https://i.ibb.co/hMSWCJB/Layer-x0020-1-1.png',
    title: 'Tyre Service',
    description: 'Tyre maintenance and replacement',
    link: '/services/tyre'
  }
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service: typeof services[0]) => {
    if (service.link) {
      if (service.link === '/express') {
        window.scrollTo(0, 0);
      }
      navigate(service.link);
    }
  };

  const featuredService = services.find(service => service.featured);
  const regularServices = services.filter(service => !service.featured);

  return (
    <section id="services" className="py-12 md:py-20 bg-gray-50 border-b-8 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Our Services</h2>
          <p className="text-base md:text-lg text-gray-600">Aapki Gaadi, Hamari Zimmedari</p>
        </div>

        {/* Featured Express Service */}
        {featuredService && (
          <motion.div
            onClick={() => handleServiceClick(featuredService)}
            className="mb-12 mx-auto max-w-3xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative bg-gradient-to-r from-orange-50 to-white p-8 rounded-xl shadow-lg border-2 border-[#FF7200] cursor-pointer overflow-hidden">
              {/* Recommended Tag */}
              <div className="absolute top-0 right-0">
                <div className="bg-[#FF7200] text-white px-4 py-1 rounded-bl-lg font-medium flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  Recommended
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-orange-100 rounded-full p-6 flex items-center justify-center">
                  {featuredService.icon}
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#FF7200] mb-2">
                    {featuredService.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {featuredService.description}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-[#FF7200]" />
                      <span>90-Minute Service</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#FF7200] text-white px-6 py-2 rounded-md hover:bg-[#0e5aa8] transition-colors flex items-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Book Your Slot
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {regularServices.map((service, index) => (
            <motion.div
              key={index}
              onClick={() => handleServiceClick(service)}
              className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center group cursor-pointer`}
              whileHover={{ scale: service.link ? 1.05 : 1 }}
              whileTap={{ scale: service.link ? 0.95 : 1 }}
            >
              <div className="mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                {service.icon ? (
                  service.icon
                ) : (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="hidden md:block text-sm text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;