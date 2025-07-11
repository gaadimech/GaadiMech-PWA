import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const StickyCartBanner = () => {
  const location = useLocation();
  const { cartSummary } = useCart();

  // Don't show on cart page or if cart is empty
  const shouldHide = cartSummary.isEmpty || 
                    location.pathname === '/cart' || 
                    location.pathname === '/booking-details' ||
                    location.pathname.startsWith('/payment') ||
                    location.pathname.startsWith('/order') ||
                    location.pathname.startsWith('/auth/');

  if (shouldHide) {
    return null;
  }

  return (
    <AnimatePresence>
      <>
        {/* Gradient fade effect - mobile only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-20 lg:hidden"
        />
        
        {/* Cart Banner */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-20 left-4 right-4 z-30 mx-auto max-w-md lg:bottom-4"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                {/* Left side - Cart info */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <div className="bg-[#FF7200] p-2 rounded-full">
                      <ShoppingCart className="h-4 w-4 text-white" />
                    </div>
                    {/* Badge */}
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold min-w-[16px]">
                      {cartSummary.itemCount > 9 ? '9+' : cartSummary.itemCount}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {cartSummary.itemCount} item{cartSummary.itemCount !== 1 ? 's' : ''} in cart
                    </div>
                    <div className="text-xs text-gray-600">
                      Total: ₹{cartSummary.total.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Right side - View Cart button */}
                <Link
                  to="/cart"
                  className="bg-[#FF7200] text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 text-sm hover:bg-[#e56000] transition-colors flex-shrink-0 ml-3"
                >
                  <span>View Cart</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Savings indicator - only show if there's actual discount */}
              {cartSummary.discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 text-xs text-green-600 font-medium"
                >
                  🎉 You're saving ₹{cartSummary.discount.toLocaleString()}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default StickyCartBanner; 