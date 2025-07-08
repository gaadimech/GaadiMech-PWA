import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, X, Edit3, Tag, ChevronDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { getCartSummary, removeFromCart, updateCartQuantity, clearCart, doorstepCart } from '../utils-doorstep/cartFunctions.ts';
import { formatPrice } from '../data-doorstep/doorstepServicesData.ts';
import { DoorstepService } from '../data-doorstep/doorstepServicesData';
import { getVehicleFromSession } from '../utils/pricing-utils';
import { scrollToTop } from '../utils/location';

interface CartItem {
  serviceId: string;
  service: DoorstepService;
  quantity: number;
  totalPrice: number;
}

interface CartSummary {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
}

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartSummary, setCartSummary] = useState<CartSummary>(getCartSummary());
  const [isLoading, setIsLoading] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [requirements, setRequirements] = useState('');
  
  // Vehicle information state
  const [vehicleInfo, setVehicleInfo] = useState<{manufacturer: string; model: string} | null>(null);
  
  // Coupon related states
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [showCouponSection, setShowCouponSection] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  // Payment states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [whatsappRedirectCountdown, setWhatsappRedirectCountdown] = useState(3);

  // Listen to cart changes
  React.useEffect(() => {
    const updateCart = () => {
      setCartSummary(getCartSummary());
    };

    doorstepCart.addListener(updateCart);
    return () => doorstepCart.removeListener(updateCart);
  }, []);

  // Check for coupon in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const couponParam = params.get('coupon');
    
    if (couponParam) {
      sessionStorage.setItem('pendingCoupon', couponParam);
      setAppliedCoupon(null);
      setCouponCode(couponParam.toUpperCase());
    }
  }, [location]);

  // Get vehicle information on mount
  useEffect(() => {
    const savedVehicle = getVehicleFromSession();
    if (savedVehicle) {
      setVehicleInfo({
        manufacturer: savedVehicle.manufacturer,
        model: savedVehicle.model
      });
    }
  }, []);

  // WhatsApp redirect countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (paymentSuccess && whatsappRedirectCountdown > 0) {
      timer = setTimeout(() => {
        setWhatsappRedirectCountdown(prev => prev - 1);
      }, 1000);
    } else if (paymentSuccess && whatsappRedirectCountdown === 0) {
      handleWhatsAppRedirect();
    }
    return () => clearTimeout(timer);
  }, [paymentSuccess, whatsappRedirectCountdown]);

  // Add useEffect for scroll behavior
  useEffect(() => {
    scrollToTop(false);
  }, []);

  const handleQuantityChange = (serviceId: string, newQuantity: number) => {
    updateCartQuantity(serviceId, newQuantity);
  };

  const handleRemoveItem = (serviceId: string) => {
    removeFromCart(serviceId);
  };

  const handleRazorpayPayment = () => {
    // Check if Razorpay is loaded
    if (typeof window.Razorpay === 'undefined') {
      // If not loaded, wait for a bit and try again
      setIsProcessingPayment(true);
      const checkRazorpay = setInterval(() => {
        if (typeof window.Razorpay !== 'undefined') {
          clearInterval(checkRazorpay);
          initializeRazorpay();
        }
      }, 100);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkRazorpay);
        if (typeof window.Razorpay === 'undefined') {
          console.error('Razorpay SDK not loaded');
          alert('Could not load payment system. Please refresh the page and try again.');
          setIsProcessingPayment(false);
        }
      }, 5000);
      return;
    }

    initializeRazorpay();
  };

  const initializeRazorpay = () => {
    setIsProcessingPayment(true);
    setPaymentFailed(false);
    setPaymentError('');

    try {
      // Get checkout data
      const checkoutData = doorstepCart.getCheckoutData();
      
      // Prepare order data
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_719oj4MDAGClqw',
        amount: checkoutData.amount * 100,
        currency: checkoutData.currency || 'INR',
        name: 'GaadiMech Doorstep Services',
        description: 'Doorstep Car Services Booking',
        image: '/images/logo.png',
        handler: function (response: any) {
          // Payment successful
          console.log('Payment successful:', response);
          // First set success state before clearing cart
          setPaymentSuccess(true);
          setPaymentFailed(false);
          setPaymentError('');
          // Clear cart after a small delay to avoid flash of empty cart
          setTimeout(() => {
            clearCart();
          }, 100);
        },
        prefill: {
          name: vehicleInfo ? `${vehicleInfo.manufacturer} ${vehicleInfo.model} Owner` : '',
          contact: '',
          email: ''
        },
        notes: {
          ...checkoutData.notes,
          vehicle: vehicleInfo ? `${vehicleInfo.manufacturer} ${vehicleInfo.model}` : '',
          requirements: requirements,
          coupon: appliedCoupon ? appliedCoupon.code : null
        },
        theme: {
          color: '#FF7200'
        },
        modal: {
          ondismiss: function() {
            if (!paymentSuccess) { // Only set failed if payment wasn't successful
              setIsProcessingPayment(false);
              setPaymentFailed(true);
              setPaymentError('Payment cancelled by user');
            }
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        setPaymentFailed(true);
        setPaymentError(response.error.description || 'Payment failed');
        setIsProcessingPayment(false);
      });

      razorpay.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
      setPaymentFailed(true);
      setPaymentError('Failed to initialize payment. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const services = cartSummary.items.map(item => 
      `• ${item.service.name} (${item.quantity}x)`
    ).join('\n');

    const message = 
      `🚗 *GaadiMech Doorstep Service Booking*%0a%0a` +
      `*Vehicle:* ${vehicleInfo?.manufacturer} ${vehicleInfo?.model}%0a%0a` +
      `*Services Booked:*%0a${encodeURIComponent(services)}%0a%0a` +
      `*Total Amount:* ${formatPrice(cartSummary.total)}%0a%0a` +
      `*Requirements:* ${requirements ? encodeURIComponent(requirements) : 'None'}`;

    const whatsappUrl = `https://wa.me/917300042410?text=${message}`;
    window.location.href = whatsappUrl;
  };

  const handleCheckout = () => {
    setIsProcessingPayment(true);
    handleRazorpayPayment();
  };

  const handleContinueShopping = () => {
    scrollToTop(false);
    navigate('/doorstep-services');
  };

  const handleApplyCoupon = () => {
    // Navigate to coupon application page or open modal
    navigate('/apply-coupon');
  };

  const RequirementsModal = () => {
    const [localRequirements, setLocalRequirements] = useState(requirements);

    const handleSave = () => {
      setRequirements(localRequirements);
      setShowRequirementsModal(false);
    };

    return (
      <AnimatePresence>
        {showRequirementsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequirementsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Any other requirements...</h3>
                <button
                  onClick={() => setShowRequirementsModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <textarea
                value={localRequirements}
                onChange={(e) => setLocalRequirements(e.target.value)}
                placeholder="Please specify any additional requirements or comments..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#FF7200] focus:border-transparent"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowRequirementsModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-[#FF7200] text-white rounded-lg hover:bg-[#e66600] transition-colors"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Update the setCouponError function to ensure it always sets a string
  const setCouponErrorSafe = (error: unknown): void => {
    if (typeof error === 'string') {
      setCouponError(error);
    } else if (error && typeof error === 'object') {
      if ('message' in error && typeof error.message === 'string') {
        setCouponError(error.message);
      } else if ('error' in error && typeof error.error === 'string') {
        setCouponError(error.error);
      } else {
        setCouponError('An error occurred with the coupon');
      }
    } else {
      setCouponError('An unexpected error occurred');
    }
  };

  // Function to validate and apply coupon
  const validateAndApplyCoupon = async () => {
    setCouponError('');
    
    if (!couponCode) {
      setCouponErrorSafe('Please enter a coupon code');
      return;
    }
    
    // Ensure coupon code is uppercase
    const upperCouponCode = couponCode.toUpperCase();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1337'}/api/coupons/validate`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: upperCouponCode,
          amount: cartSummary.subtotal // Send the current cart subtotal to validate any minimum purchase requirements
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.valid) {
        const couponDetails = data.coupon;
        
        // Apply the coupon discount
        let couponDiscount = 0;
        
        if (couponDetails.discountType === 'percentage') {
          couponDiscount = couponDetails.discountAmount;
        } else if (couponDetails.discountType === 'fixed') {
          couponDiscount = couponDetails.discountValue;
        }
        
        // Round discount to nearest integer
        couponDiscount = Math.round(couponDiscount);
        
        // Update state
        setAppliedCoupon({
          code: couponDetails.code,
          discount: couponDiscount
        });
        setCouponApplied(true);
        
        // Update cart total with discount
        const updatedTotal = cartSummary.subtotal - couponDiscount;
        setCartSummary(prev => ({
          ...prev,
          total: updatedTotal
        }));
      } else {
        let errorMessage = 'Invalid or expired coupon code';
        if (data && data.error) {
          errorMessage = typeof data.error === 'string' 
            ? data.error 
            : (data.error.message || 'Invalid coupon code');
        }
        setCouponErrorSafe(errorMessage);
        setAppliedCoupon(null);
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      setCouponErrorSafe(error);
      setAppliedCoupon(null);
    }
  };

  // Function to remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponApplied(false);
    // Reset cart total to original amount
    setCartSummary(prev => ({
      ...prev,
      total: prev.subtotal
    }));
  };

  // Update empty cart button
  if (cartSummary.items.length === 0 && !paymentSuccess && !paymentFailed) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any services to your cart yet.</p>
          <button
            onClick={handleContinueShopping}
            className="bg-[#FF7200] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e66600] transition-colors"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  // Payment Success Page
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 mt-8">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your doorstep services have been booked successfully.</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Redirecting to WhatsApp in</p>
              <p className="text-3xl font-bold text-[#FF7200]">{whatsappRedirectCountdown}</p>
              <p className="text-sm text-gray-600">seconds</p>
            </div>
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full bg-[#25D366] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition-colors mb-4 flex items-center justify-center gap-2"
            >
              <span>Open WhatsApp Now</span>
            </button>
            <button
              onClick={handleContinueShopping}
              className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Book More Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment Failed Page
  if (paymentFailed) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 mt-8">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{paymentError || 'There was an error processing your payment.'}</p>
            <button
              onClick={() => {
                setPaymentFailed(false);
                setPaymentError('');
                setIsProcessingPayment(false);
                handleRazorpayPayment();
              }}
              className="w-full bg-[#FF7200] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#e66600] transition-colors mb-4"
            >
              Retry Payment
            </button>
            <button
              onClick={() => {
                setPaymentFailed(false);
                setPaymentError('');
                setIsProcessingPayment(false);
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 hide-whatsapp-button">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
            </div>
            {vehicleInfo && (
              <div className="bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  {vehicleInfo.model}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Cart Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {cartSummary.items.map((item) => (
              <motion.div
                key={item.serviceId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  {/* Service Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.service.image || '/images/doorstep-services/default-service.jpg'} 
                      alt={item.service.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/doorstep-services/default-service.jpg';
                      }}
                    />
                  </div>

                  {/* Service Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base">
                          {item.service.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.service.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.serviceId)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors ml-2"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(item.service.price)}
                        </span>
                        {item.service.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.service.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.serviceId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.serviceId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Requirements Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => setShowRequirementsModal(true)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-[#FF7200]" />
              </div>
              <span className="text-gray-700 font-medium">
                {requirements ? 'Requirements Added' : 'Any other requirements...'}
              </span>
            </div>
            <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
          </button>
        </div>

        {/* Coupon Section - Moved here */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <button 
            onClick={() => setShowCouponSection(!showCouponSection)}
            className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-1 rounded transition-colors"
          >
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-700">Have a coupon code?</span>
              {appliedCoupon && (
                <div className="ml-3 text-green-600 font-medium text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Applied
                </div>
              )}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showCouponSection ? 'rotate-180' : ''}`} />
          </button>
          
          {showCouponSection && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              {!appliedCoupon ? (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="ENTER COUPON CODE"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF7200] transition-all duration-300 uppercase"
                      />
                      {couponCode && (
                        <button 
                          onClick={() => setCouponCode('')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={validateAndApplyCoupon}
                      className="bg-white border-2 border-[#FF7200] text-[#FF7200] px-6 py-3 rounded-lg hover:bg-[#FF7200] hover:text-white text-lg font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap"
                    >
                      Apply Coupon
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm bg-red-50 p-2 rounded flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {couponError}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <Tag className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="font-medium text-blue-800 text-lg">{appliedCoupon.code}</p>
                      </div>
                      <p className="text-blue-600 flex items-center mt-1">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Additional ₹{appliedCoupon.discount} OFF applied
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-blue-600 hover:text-blue-800 font-medium bg-white py-1 px-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Item Total (Incl. of taxes)</span>
              <span className="text-gray-900 font-semibold">
                {formatPrice(cartSummary.subtotal)}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Grand Total</span>
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(cartSummary.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Cart Value</p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(cartSummary.total)}
            </p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isProcessingPayment || cartSummary.items.length === 0}
            className="bg-[#FF7200] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e66600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessingPayment ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </div>

      <RequirementsModal />
    </div>
  );
};

export default CartPage; 