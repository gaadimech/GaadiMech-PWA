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
    highlight: true,
    link: '/express-app',
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
    image: 'https://i.ibb.co/xJtZLcV/Group-6.png',
    title: 'Battery Service',
    description: 'Battery Replacement and Testing',
    link: '/services/battery'
  },
  {
    image: 'https://i.ibb.co/fYY8fLt/Group-5.png',
    title: 'Windshield Service',
    description: 'Windshield Repair and Replacement',
    link: '/services/windshield'
  },
  {
    image: 'https://i.ibb.co/vhLrWtk/Group-4.png',
    title: 'Tyre Service',
    description: 'Tyre Replacement and Alignment',
    link: '/services/tyre'
  }
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (link: string) => {
    navigate(link);
  };

  return (
    <section id="services" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600"
          >
            Professional car care services at your doorstep
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                group cursor-pointer rounded-lg shadow-lg transition-all duration-300 
                hover:shadow-xl hover:-translate-y-2 overflow-hidden
                ${service.featured ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white col-span-1 sm:col-span-2 lg:col-span-2' : 'bg-white'}
              `}
              onClick={() => handleServiceClick(service.link)}
            >
              <div className={`p-4 md:p-6 ${service.featured ? 'text-center' : ''}`}>
                <div className={`flex ${service.featured ? 'flex-col items-center' : 'items-center mb-4'}`}>
                  <div className={`${service.featured ? 'w-20 h-20 mb-4' : 'w-16 h-16 mr-4 flex-shrink-0'} overflow-hidden rounded-lg`}>
                    {service.icon ? (
                      service.icon
                    ) : (
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className={service.featured ? 'text-center' : 'flex-1'}>
                    <h3 className={`font-bold mb-2 ${service.featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl text-gray-900'}`}>
                      {service.title}
                    </h3>
                    <p className={`${service.featured ? 'text-white/90 text-base md:text-lg' : 'text-gray-600'}`}>
                      {service.description}
                    </p>
                  </div>
                </div>
                
                {service.featured && (
                  <div className="mt-6">
                    <div className="flex items-center justify-center text-white/90 mb-4">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="text-sm">Express Service Available</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Book Now <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.div>
                  </div>
                )}
                
                {!service.featured && (
                  <div className="flex items-center text-[#FF7200] font-medium">
                    Learn More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 md:mt-12"
        >
          <button
            onClick={() => navigate('/services')}
            className="bg-[#FF7200] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#0e5aa8] transition-colors text-base md:text-lg font-semibold"
          >
            View All Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;