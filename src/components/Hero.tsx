import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const handleBookService = () => {
    window.open(`https://wa.me/917300042410`, '_blank');
  };

  const handleContact = () => {
    window.location.href = `tel:+918448285289`;
  };

  return (
    <section id="home" className="pt-16 md:pt-20 bg-gradient-to-b from-gray-50 to-white border-b-8 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-6xl md:text-7xl font-bold text-center text-[#FF7200] mb-12 w-full">
          GAADIMECH
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Revolutionize Your Car Care with
              <span className="text-[#FF7200]"> GaadiMech</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Enjoy trusted service partners, hassle-free booking, transparent pricing, and a wide range of services. Quality, convenience, and expert care at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookService}
                className="bg-[#FF7200] text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                Book Service Now
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContact}
                className="border-2 border-[#FF7200] text-[#FF7200] px-6 py-3 rounded-md hover:bg-[#0e5aa8] hover:border-[#0e5aa8] hover:text-white transition-colors"
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
            <img
              src="https://i.ibb.co/R3QpgRT/DALL-E-2024-10-10-15-00-52-A-hyper-realistic-image-showing-two-Indian-mechanics-working-on-the-tires.webp"
              alt="Professional mechanic working on a car"
              className="rounded-lg shadow-xl w-full max-w-2xl mx-auto hover:opacity-90 transition-opacity"
              loading="lazy"
              srcset="
                https://i.ibb.co/R3QpgRT/image-400.webp 400w,
                https://i.ibb.co/R3QpgRT/image-800.webp 800w,
                https://i.ibb.co/R3QpgRT/image-1200.webp 1200w"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-lg shadow-lg w-auto">
              <div className="flex items-center gap-4">
                <div className="bg-[#FF7200] rounded-full p-3">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Emergency Service</p>
                  <a href="tel:+918448285289" className="text-lg font-bold text-gray-900 hover:text-[#FF7200]">
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