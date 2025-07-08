import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronUp } from 'lucide-react';
import { doorstepCart } from '../utils-doorstep/cartFunctions';

const StickyCartBanner = () => {
  const [cartSummary, setCartSummary] = useState(doorstepCart.getCartSummary());
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartSummary = () => {
      const summary = doorstepCart.getCartSummary();
      setCartSummary(summary);
      setIsVisible(!summary.isEmpty);
    };

    // Initial check
    updateCartSummary();

    // Listen to cart changes
    doorstepCart.addListener(updateCartSummary);

    return () => {
      doorstepCart.removeListener(updateCartSummary);
    };
  }, []);

  const handleViewCart = () => {
    navigate('/doorstep-services/cart');
  };

  if (!isVisible || cartSummary.isEmpty) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Cart Info */}
            <div className="flex items-center">
              <div className="relative mr-3">
                <ShoppingCart className="w-6 h-6 text-[#FF7200]" />
                <div className="absolute -top-2 -right-2 bg-[#FF7200] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartSummary.itemCount}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {cartSummary.itemCount} item{cartSummary.itemCount !== 1 ? 's' : ''} in cart
                </div>
                <div className="text-xs text-gray-600">
                  {cartSummary.serviceCount} service{cartSummary.serviceCount !== 1 ? 's' : ''} selected
                </div>
              </div>
            </div>

            {/* Total and Button */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ₹{cartSummary.total.toLocaleString()}
                </div>
                {cartSummary.discount > 0 && (
                  <div className="text-xs text-green-600">
                    Saved ₹{cartSummary.discount}
                  </div>
                )}
              </div>
              
              <motion.button
                onClick={handleViewCart}
                className="bg-[#FF7200] text-white px-6 py-2 rounded-md hover:bg-[#e66600] transition-colors font-medium flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Cart</span>
                <ChevronUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Bulk Discount Indicator */}
          {cartSummary.serviceCount >= 3 && (
            <div className="pb-2">
              <div className="text-xs text-center text-green-600 bg-green-50 py-1 px-2 rounded">
                🎉 Bulk discount applied! Save 5% on 3+ services
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StickyCartBanner; 