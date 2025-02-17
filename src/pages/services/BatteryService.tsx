import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const features = [
  "Battery health check",
  "Voltage testing",
  "Terminal cleaning",
  "Charging system diagnosis",
  "Battery replacement",
  "Jump start service",
  "Alternator check",
  "Warranty support"
];

const BatteryService = () => {
  const handleBookNow = () => {
    window.open('https://wa.me/917300042410?text=Hi%2C%20I%27d%20like%20to%20book%20Battery%20Service.', '_blank');
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
        <title>Car Battery Service & Replacement | GaadiMech</title>
        <meta name="description" content="Professional car battery services including testing, repair, and replacement. Get reliable battery solutions from expert technicians." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co/ZXCWCRC/Group-4.png"
              alt="Battery Service"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Battery Service & Replacement</h1>
          <p className="text-xl text-gray-600">Keep your car powered with reliable battery solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Battery Care</h2>
            <p className="text-gray-600 mb-6">
              Don't let battery issues leave you stranded. Our comprehensive battery services ensure
              your vehicle starts reliably every time.
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
                  src="https://i.ibb.co/ZXCWCRC/Group-4.png"
                  alt="Battery Service"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Book Battery Service</h3>
              <p className="text-gray-600 text-center mb-6">
                Expert battery solutions at your doorstep
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

export default BatteryService;