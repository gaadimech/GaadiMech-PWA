import React, { useState } from 'react';
import { Star, ArrowRight, Check, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCard as ServiceCardProps } from '../data/services-data';
import { Vehicle } from '../types/services';
import { useMetaAnalytics } from '../hooks/useMetaAnalytics';
import MobileNumberModal from './MobileNumberModal';
import { useCart } from '../contexts/CartContext';

interface ServiceCardModernProps {
  card: ServiceCardProps;
  vehicleSelected: boolean;
  actualPrice?: string;
  onSelectCar: () => void;
  selectedVehicle?: Vehicle | null;
  serviceType?: string;
  periodicServicePrice?: string;
}

const ServiceCardModern: React.FC<ServiceCardModernProps> = ({
  card,
  vehicleSelected,
  actualPrice,
  onSelectCar,
  selectedVehicle,
  serviceType,
  periodicServicePrice
}) => {
  const { trackLead } = useMetaAnalytics();
  const { addRegularService, isInCart, getItemQuantity, updateQuantity } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const isExpressService = card.duration.includes('90 Mins') || card.duration.includes('⏰');

  const getDisplayPrice = () => {
    return vehicleSelected && actualPrice ? actualPrice : card.price;
  };

  const getDiscountedPrice = () => {
    if (isExpressService && vehicleSelected && actualPrice) {
      const price = parseFloat(actualPrice.replace(/[^\d.]/g, ''));
      return `₹${(price - 500).toFixed(0)}`;
    }
    return getDisplayPrice();
  };

  const handleAddToCart = async () => {
    console.log('🛒 Add to Cart clicked:', { 
      vehicleSelected, 
      cardId: card.id, 
      serviceType: serviceType || 'periodic' 
    });

    if (!vehicleSelected) {
      console.log('❌ No vehicle selected, triggering car selection');
      onSelectCar();
      return;
    }

    // Calculate the price to use
    let unitPrice: number;
    if (isExpressService && actualPrice) {
      // Apply express service discount
      unitPrice = Math.max(0, parseFloat(actualPrice.replace(/[^\d.]/g, '')) - 500);
    } else if (actualPrice) {
      unitPrice = parseFloat(actualPrice.replace(/[^\d.]/g, ''));
    } else {
      unitPrice = parseFloat(card.price.replace(/[^\d.]/g, ''));
    }

    console.log('💰 Calculated unit price:', unitPrice);
    console.log('🚗 Selected vehicle:', selectedVehicle);

    // Add to cart
    try {
      addRegularService(
        card.id,
        serviceType || 'periodic',
        card,
        unitPrice,
        selectedVehicle
      );
      console.log('✅ Successfully added to cart');
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
    }

    // Track add to cart as Lead
    try {
      await trackLead(
        undefined,
        {
          content_name: `Add to Cart - ${card.title}`,
          content_type: 'add_to_cart',
          currency: 'INR',
          value: unitPrice
        }
      );
      console.log('📊 Analytics tracked successfully');
    } catch (error) {
      console.error('📊 Analytics tracking failed:', error);
    }
  };

  const handleMobileNumberSubmit = async (mobileNumber: string) => {
    try {
      await trackLead(
        { phone: mobileNumber },
        {
          content_name: card.title,
          content_type: 'service_inquiry',
          value: parseFloat(getDisplayPrice().replace(/[^\d.]/g, '')),
          currency: 'INR'
        }
      );

      const message = `Hi, I'm interested in ${card.title} service for my ${selectedVehicle?.manufacturer} ${selectedVehicle?.model}. Price: ${getDisplayPrice()}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/917300042410?text=${encodedMessage}`, '_blank');
      
      setShowMobileModal(false);
    } catch (error) {
      console.error('Error tracking lead:', error);
      setShowMobileModal(false);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{card.title}</h3>
              {card.isBestseller && (
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                  Bestseller
                </span>
              )}
              {isExpressService && (
                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full">
                  Express
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-gray-900">{card.rating}</span>
            <span className="text-xs text-gray-500">({card.reviewCount}+)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{card.duration}</span>
          </div>
          {isExpressService && (
            <div className="bg-red-50 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
              ₹500 OFF
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isExpressService && vehicleSelected && actualPrice ? (
              <>
                <span className="text-xl font-bold text-gray-900">{getDiscountedPrice()}</span>
                <span className="text-sm text-gray-500 line-through">{getDisplayPrice()}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">{getDisplayPrice()}</span>
            )}
          </div>
          
          {vehicleSelected ? (
            <motion.div className="flex items-center gap-2">
              {isInCart(card.id, 'regular') ? (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateQuantity(card.id, 'regular', getItemQuantity(card.id, 'regular') - 1)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg font-semibold text-lg w-8 h-8 flex items-center justify-center"
                  >
                    -
                  </motion.button>
                  <span className="font-semibold text-lg w-8 text-center">{getItemQuantity(card.id, 'regular')}</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateQuantity(card.id, 'regular', getItemQuantity(card.id, 'regular') + 1)}
                    className="bg-[#FF7200] hover:bg-orange-700 text-white p-2 rounded-lg font-semibold text-lg w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="bg-[#FF7200] hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  Add to Cart
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSelectCar}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2"
            >
              Select Car
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Details Toggle */}
      <div className="border-t border-gray-100 px-4 py-3">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
        >
          {showDetails ? (
            <>
              Hide Details
              <ChevronUp className="ml-2 w-4 h-4" />
            </>
          ) : (
            <>
              Show Details
              <ChevronDown className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 pt-3 border-t border-gray-100"
            >
              <div className="grid grid-cols-1 gap-2">
                {card.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Number Modal */}
      <MobileNumberModal
        isOpen={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        onSubmit={handleMobileNumberSubmit}
        serviceName={card.title}
      />
    </motion.div>
  );
};

export default ServiceCardModern; 