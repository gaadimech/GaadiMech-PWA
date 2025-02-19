import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReviewCarousel from '../../components/ReviewCarousel';
import { getReviewsByService } from '../../data/reviews';

const features = [
  "Dent removal",
  "Scratch repair",
  "Panel beating",
  "Paint matching",
  "Clear coat application",
  "Rust protection",
  "Quality paint finish",
  "Surface preparation"
];

const DentingService = () => {
  const handleBookNow = () => {
    window.open('https://wa.me/917300042410?text=Hi%2C%20I%27d%20like%20to%20book%20Denting%20%26%20Painting%20Service.', '_blank');
  };

  const serviceReviews = getReviewsByService('dent_paint');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>Denting & Painting Services | GaadiMech</title>
        <meta name="description" content="Expert dent removal and painting services. Restore your car's appearance with our professional denting and painting solutions." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co/RNTXGpd/Group-2.png"
              alt="Denting Service"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Denting & Painting Services</h1>
          <p className="text-xl text-gray-600">Expert dent removal and paint restoration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Paint Solutions</h2>
            <p className="text-gray-600 mb-6">
              Restore your car's appearance with our expert denting and painting services.
              We use advanced techniques and premium materials for lasting results.
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
                  src="https://i.ibb.co/RNTXGpd/Group-2.png"
                  alt="Denting Service"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Book Denting & Painting</h3>
              <p className="text-gray-600 text-center mb-6">
                Get your car looking new again
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

        <ReviewCarousel reviews={serviceReviews} />
      </div>
    </motion.div>
  );
};

export default DentingService;