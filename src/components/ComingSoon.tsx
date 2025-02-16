import React from 'react';
import { motion } from 'framer-motion';
const ComingSoon = () => {
  const handleAppStoreClick = () => {
    // Replace with actual App Store link when available
    window.open('#', '_blank');
  };

  const handlePlayStoreClick = () => {
    // Replace with actual Play Store link when available
    window.open('#', '_blank');
  };

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
            src="https://i.ibb.co/BKyT0xg/App-Store.webp"
            alt="Download on App Store"
            className="h-20 md:h-24 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleAppStoreClick}
            role="button"
            tabIndex={0}
          />
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            src="https://i.imgur.com/FHCeKeD.png"
            alt="Get it on Google Play"
            className="h-20 md:h-24 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handlePlayStoreClick}
            role="button"
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;