import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, ArrowRight, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCard as ServiceCardProps } from '../data/services-data';
import { Vehicle } from '../types/services';

interface ServiceCardComponentProps {
  card: ServiceCardProps;
  vehicleSelected: boolean;
  actualPrice?: string;
  onSelectCar: () => void;
}

const ServiceCard: React.FC<ServiceCardComponentProps> = ({
  card,
  vehicleSelected,
  actualPrice,
  onSelectCar
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [highlightDuration, setHighlightDuration] = useState(false);
  const isExpressService = card.duration.includes('90 Mins') || card.duration.includes('⏰');
  
  // Animation for express service
  useEffect(() => {
    if (isExpressService) {
      const interval = setInterval(() => {
        setHighlightDuration(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isExpressService]);
  
  const handleBookNow = () => {
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/917300042410?text=${encodeURIComponent(card.whatsappMessage)}`, '_blank');
  };
  
  const toggleDetails = (e: React.MouseEvent) => {
    // Prevent event from bubbling up
    e.stopPropagation();
    setShowDetails(prev => !prev);
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {card.isBestseller && (
        <div className="absolute top-4 left-4 bg-[#FFF0E6] text-[#FF7200] text-xs font-semibold py-1 px-2 rounded">
          Bestseller
        </div>
      )}
      
      <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
        <p className="text-gray-600 text-sm">{card.description}</p>
      </div>
      
      <div className="border-t border-b border-gray-100 py-3 my-3">
        <div className="flex items-center">
          <div className="bg-green-100 text-green-800 rounded-md px-2 py-1 flex items-center">
            <Star className="w-4 h-4 fill-current text-yellow-500 mr-1" />
            <span className="font-semibold">{card.rating}</span>
          </div>
          <span className="text-gray-500 text-sm ml-2">({card.reviewCount}+ reviews)</span>
          
          {isExpressService ? (
            <div className="relative ml-auto">
              <motion.div 
                className="absolute -inset-2 rounded-full"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: highlightDuration ? 1 : 0,
                  opacity: highlightDuration ? 1 : 0
                }}
                transition={{ 
                  pathLength: { duration: 1, ease: "easeInOut" },
                  opacity: { duration: 0.5 }
                }}
                style={{ zIndex: 1 }}
              >
                <svg 
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 140 70"
                  style={{ overflow: 'visible' }}
                >
                  <motion.ellipse
                    cx="70"
                    cy="35"
                    rx="68"
                    ry="34"
                    fill="none"
                    stroke="#FF3A3A"
                    strokeWidth="3"
                    strokeDasharray="0 1"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: highlightDuration ? 1 : 0
                    }}
                    transition={{ duration: 1 }}
                  />
                </svg>
              </motion.div>
              <div className="flex items-center px-3 py-1.5 rounded-full relative z-10">
                <Clock className="w-4 h-4 text-[#FF7200] mr-1" />
                <span className="text-sm font-bold text-gray-800">{card.duration}</span>
              </div>
            </div>
          ) : (
            <span className="text-gray-500 text-sm ml-auto">{card.duration}</span>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-2xl font-bold text-gray-900">
            {vehicleSelected && actualPrice ? actualPrice : card.price}
          </h4>
        </div>
        {vehicleSelected ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookNow}
            className="bg-[#FF7200] text-white px-4 py-2 rounded-md hover:bg-[#e56700] transition-colors flex items-center"
          >
            BOOK NOW
            <ArrowRight className="ml-1" size={16} />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectCar}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            SELECT CAR
            <ArrowRight className="ml-1" size={16} />
          </motion.button>
        )}
      </div>
      
      <div className="border-t border-gray-100 pt-2">
        <button
          onClick={toggleDetails}
          className="w-full flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium transition-colors py-1"
          data-card-id={card.id}
        >
          {showDetails ? (
            <>
              <span>Less Details</span>
              <ChevronUp className="ml-1" size={18} />
            </>
          ) : (
            <>
              <span>More Details</span>
              <ChevronDown className="ml-1" size={18} />
            </>
          )}
        </button>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              <ul className="space-y-2">
                {card.details.map((detail, index) => (
                  <li key={index} className="text-gray-700 flex items-start p-1.5 rounded hover:bg-gray-50">
                    <div className="bg-[#FFF0E6] rounded-full p-1 mr-2 flex-shrink-0">
                      <Check className="w-3 h-3 text-[#FF7200]" strokeWidth={3} />
                    </div>
                    <span className="mt-0.5">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServiceCard; 