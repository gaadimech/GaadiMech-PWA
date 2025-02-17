import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const features = [
  "Crack repair",
  "Chip fixing",
  "Full windshield replacement",
  "Water leakage check",
  "Sealant application",
  "Quality glass installation",
  "Insurance assistance",
  "Warranty coverage"
];

const WindshieldService = () => {
  const handleBookNow = () => {
    window.open('https://wa.me/917300042410?text=Hi%2C%20I%27d%20like%20to%20book%20Windshield%20Service.', '_blank');
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
        <title>Windshield Repair & Replacement | GaadiMech</title>
        <meta name="description" content="Professional windshield repair and replacement services. Get expert solutions for cracks, chips, and damaged auto glass." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co/3zcSYzf/Frame.png"
              alt="Windshield Service"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Windshield Service</h1>
          <p className="text-xl text-gray-600">Expert windshield repair and replacement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Glass Solutions</h2>
            <p className="text-gray-600 mb-6">
              Don't let a damaged windshield compromise your safety. Our expert technicians provide
              quick and reliable windshield solutions.
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
                  src="https://i.ibb.co/3zcSYzf/Frame.png"
                  alt="Windshield Service"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Book Windshield Service</h3>
              <p className="text-gray-600 text-center mb-6">
                Safe and reliable glass solutions
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
      </div>
    </motion.div>
  );
};

export default WindshieldService;