import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../assets/images';

const ComingSoon = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Dropping Soon!
          </motion.h2>
          <p className="text-xl text-gray-600">Get ready for the GaadiMech Mobile App</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-2xl mx-auto">
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src={IMAGES.APP_STORE_BADGE}
            alt="Download on App Store"
            className="h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
          />
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            src={IMAGES.PLAY_STORE_BADGE}
            alt="Get it on Google Play"
            className="h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;