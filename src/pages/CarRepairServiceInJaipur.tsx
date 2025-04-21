import React from 'react';
import { motion } from 'framer-motion';

import ServiceCard from '../components/ServiceCard';
import ReviewCarousel from '../components/ReviewCarousel';
import { getReviewsByService } from '../data/reviews';

const CarRepairServiceInJaipur = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Repair Service in Jaipur</h1>
          <p className="text-xl text-gray-600">
            Professional car repair services in Jaipur with expert mechanics and genuine parts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Engine Repair</h3>
              <p className="text-gray-600 mb-4">
                Complete engine diagnostics and repair services by certified mechanics
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Engine diagnostics
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Engine overhaul
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Oil leakage repair
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Electrical System Repair</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive electrical system diagnostics and repairs
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Battery issues
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Wiring problems
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  ECU diagnostics
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Brake System Repair</h3>
              <p className="text-gray-600 mb-4">
                Complete brake system inspection and repair
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Brake pad replacement
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Brake fluid change
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Brake caliper repair
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose GaadiMech for Car Repair in Jaipur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Expert Mechanics</h3>
              <p>Our technicians are certified and experienced in handling all car makes and models</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Genuine Parts</h3>
              <p>We use only genuine spare parts for all repairs to ensure quality and durability</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Doorstep Service</h3>
              <p>Enjoy the convenience of our doorstep car repair services in Jaipur</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p>No hidden costs - get detailed estimates before any work begins</p>
            </div>
          </div>
        </div>

        <ReviewCarousel reviews={serviceReviews} />
      </div>
    </motion.div>
  );
};

export default CarRepairServiceInJaipur; 