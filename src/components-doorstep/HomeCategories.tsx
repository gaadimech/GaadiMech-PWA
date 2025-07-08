import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES, DoorstepServiceCategory } from '../data-doorstep/doorstepServicesData';

const HomeCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/doorstep-services/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 hide-whatsapp-button">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                Doorstep Car Services
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative inline-block">
            <span className="relative z-10">Choose Your Service Category</span>
            <div className="absolute bottom-0 left-0 w-full h-3 bg-[#FF7200] opacity-10 -rotate-1"></div>
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {Object.values(SERVICE_CATEGORIES).map((category: DoorstepServiceCategory, index: number) => (
            <motion.div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden border border-transparent hover:border-orange-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Emergency Badge */}
              {category.availability === '24/7' && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  24/7
                </div>
              )}

              {/* Category Icon */}
              <div className="w-1/2 aspect-square mb-3 flex items-center justify-center">
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-full h-full object-contain"
                  title={category.name}
                />
              </div>

              {/* Category Content */}
              <div className="flex-grow flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#FF7200] transition-colors">
                  {category.name}
                </h3>
                
                <div className="mt-auto flex items-center gap-1 text-[#FF7200] font-medium text-sm group-hover:translate-x-1 transition-transform">
                  View Services
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories; 