import React from 'react';
import { motion } from 'framer-motion';

import ReviewCarousel from '../components/ReviewCarousel';
import { getReviewsByService } from '../data/reviews';

const CarMechanicShopInJaipur = () => {
  const serviceReviews = getReviewsByService('periodic');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Best Car Mechanic Shop in Jaipur</h1>
          <p className="text-xl text-gray-600">
            Trusted local car mechanics in Jaipur offering expert repair and maintenance services
          </p>
        </div>

        <div className="my-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">General Repair</h3>
                <p className="text-gray-600 mb-4">
                  From routine maintenance to complex repairs, our mechanics can handle it all
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Engine diagnostics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Transmission repair
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Brake system service
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Specialized Services</h3>
                <p className="text-gray-600 mb-4">
                  Expert solutions for specialized mechanical issues
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Clutch replacement
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Timing belt service
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Suspension repair
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Diagnostic Services</h3>
                <p className="text-gray-600 mb-4">
                  Advanced diagnostic tools to identify issues accurately
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Engine check light diagnosis
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Computer diagnostics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Performance issues
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose GaadiMech's Car Mechanic Shop in Jaipur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Experienced Mechanics</h3>
              <p>Our team has years of experience working with all car makes and models</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Doorstep Service</h3>
              <p>We bring our expertise to your doorstep with our mobile mechanic service</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Quality Parts</h3>
              <p>We use only genuine or OEM-quality parts for all repairs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p>Clear, upfront pricing with no hidden charges</p>
            </div>
          </div>
        </div>

        <ReviewCarousel reviews={serviceReviews} />
      </div>
    </motion.div>
  );
};

export default CarMechanicShopInJaipur; 