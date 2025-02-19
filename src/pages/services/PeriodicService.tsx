import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReviewCarousel from '../../components/ReviewCarousel';
import { getReviewsByService } from '../../data/reviews';

const features = [
  "Comprehensive vehicle inspection",
  "Oil and filter change",
  "Brake system check",
  "Fluid level top-up",
  "Battery health check",
  "Tire rotation and balancing",
  "Air filter replacement",
  "AC performance check"
];

const PeriodicService = () => {
  const serviceReviews = getReviewsByService('periodic');

  const handleBookNow = () => {
    window.open('https://wa.me/917300042410?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Periodic%20Service.', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>Periodic Car Service | GaadiMech - Professional Car Maintenance</title>
        <meta name="description" content="Keep your car in perfect condition with GaadiMech's professional periodic car service. Comprehensive maintenance packages for all car makes and models." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co/t4HmbHZ/Group.png"
              alt="Periodic Service"
              className="w-24 h-24 object-contain"
              loading="lazy"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Periodic Car Service</h1>
          <p className="text-xl text-gray-600">Keep your car running smoothly with regular maintenance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Regular Maintenance?</h2>
            <p className="text-gray-600 mb-6">
              Regular car maintenance is crucial for optimal performance, safety, and longevity. Our comprehensive periodic service ensures your vehicle stays in top condition.
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="text-[#FF7200] w-5 h-5 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="https://i.ibb.co/t4HmbHZ/Group.png"
                  alt="Periodic Service"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Book Your Service Now</h3>
              <p className="text-gray-600 text-center mb-6">
                Expert technicians, genuine parts, and comprehensive service
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className="w-full bg-[#FF7200] text-white px-6 py-3 rounded-md hover:bg-[#0e5aa8] transition-colors flex items-center justify-center"
              >
                Schedule Service
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Service Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#FF7200]">1</span>
              </div>
              <h3 className="font-semibold mb-2">Inspection</h3>
              <p className="text-gray-600">Thorough vehicle check and diagnosis</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#FF7200]">2</span>
              </div>
              <h3 className="font-semibold mb-2">Service</h3>
              <p className="text-gray-600">Expert maintenance and repairs</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#FF7200]">3</span>
              </div>
              <h3 className="font-semibold mb-2">Quality Check</h3>
              <p className="text-gray-600">Final inspection and test drive</p>
            </div>
          </div>
        </div>

        <ReviewCarousel reviews={serviceReviews} />

      </div>
    </motion.div>
  );
};

export default PeriodicService;