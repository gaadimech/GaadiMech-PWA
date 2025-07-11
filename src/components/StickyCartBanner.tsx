import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const StickyCartBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartSummary } = useCart();

  // Don't show on cart page or if cart is empty
  const shouldHide = cartSummary.isEmpty || 
                    location.pathname === '/cart' || 
                    location.pathname === '/booking-details' ||
                    location.pathname.startsWith('/payment') ||
                    location.pathname.startsWith('/order') ||
                    location.pathname.startsWith('/auth/');

  console.log('🏷️ StickyCartBanner render:', {
    isEmpty: cartSummary.isEmpty,
    itemCount: cartSummary.itemCount,
    shouldHide,
    currentPath: location.pathname,
    hideReasons: {
      isEmpty: cartSummary.isEmpty,
      isCartPage: location.pathname === '/cart',
      isBookingPage: location.pathname === '/booking-details',
      isPaymentPage: location.pathname.startsWith('/payment'),
      isOrderPage: location.pathname.startsWith('/order'),
      isAuthPage: location.pathname.startsWith('/auth/')
    }
  });

  if (shouldHide) {
    return null;
  }

  const handleViewCart = () => {
    console.log('🛒 View Cart clicked - navigating to cart');
    console.log('📍 Current location:', location.pathname);
    
    try {
      // Try relative navigation first
      navigate('cart', { replace: false });
      console.log('✅ Relative navigation attempted');
    } catch (error) {
      console.error('❌ Relative navigation failed:', error);
      try {
        // Try absolute navigation
        navigate('/cart', { replace: false });
        console.log('✅ Absolute navigation attempted');
      } catch (error2) {
        console.error('❌ Absolute navigation failed:', error2);
        // Final fallback
        window.location.href = '/cart';
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-20 left-0 right-0 z-50 bg-white border-t shadow-lg md:bottom-20 md:left-4 md:right-4 md:max-w-sm md:mx-auto md:rounded-t-lg md:border md:shadow-xl"
      >
        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Cart info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-[#FF7200] p-2 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                {/* Badge */}
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartSummary.itemCount > 9 ? '9+' : cartSummary.itemCount}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {cartSummary.itemCount} item{cartSummary.itemCount !== 1 ? 's' : ''} in cart
                </div>
                <div className="text-sm text-gray-600">
                  Total: ₹{cartSummary.total.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Right side - View Cart button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewCart}
              className="bg-[#FF7200] text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 text-sm"
            >
              <span>View Cart</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Savings indicator */}
          {cartSummary.discount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 text-xs text-green-600 font-medium"
            >
              🎉 You're saving ₹{cartSummary.discount.toLocaleString()}
            </motion.div>
          )}

          {/* Progress indicator for bulk discount */}
          {cartSummary.serviceCount >= 1 && cartSummary.serviceCount < 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2"
            >
              <div className="text-xs text-blue-600 font-medium mb-1">
                Add {3 - cartSummary.serviceCount} more service{3 - cartSummary.serviceCount !== 1 ? 's' : ''} for 5% discount
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(cartSummary.serviceCount / 3) * 100}%` }}
                ></div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Ripple effect on tap */}
        <motion.div
          className="absolute inset-0 bg-[#FF7200] opacity-0 rounded-lg"
          whileTap={{ opacity: 0.1 }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default StickyCartBanner; 