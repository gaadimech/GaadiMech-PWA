import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Wallet, QrCode, ChevronRight } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  recommended?: boolean;
  available: boolean;
}

const PaymentOptions = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load booking details from session
  useEffect(() => {
    const details = sessionStorage.getItem('bookingDetails');
    if (details) {
      setBookingDetails(JSON.parse(details));
    } else {
      // Redirect back if no booking details
      navigate('/cart');
    }
  }, [navigate]);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI (Google Pay, PhonePe, Paytm)',
      description: 'Quick and secure payment',
      icon: <QrCode className="h-6 w-6" />,
      recommended: true,
      available: true
    },
    {
      id: 'cards',
      name: 'Credit/Debit Cards',
      description: 'Visa, Mastercard, RuPay accepted',
      icon: <CreditCard className="h-6 w-6" />,
      available: true
    },
    {
      id: 'wallets',
      name: 'Digital Wallets',
      description: 'Paytm, MobiKwik, Freecharge',
      icon: <Wallet className="h-6 w-6" />,
      available: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'All major banks supported',
      icon: <Smartphone className="h-6 w-6" />,
      available: true
    }
  ];

  const handleProceedToPayment = () => {
    if (!selectedMethod) return;
    
    setLoading(true);
    
    // Store selected payment method
    const updatedBookingDetails = {
      ...bookingDetails,
      paymentMethod: selectedMethod
    };
    sessionStorage.setItem('bookingDetails', JSON.stringify(updatedBookingDetails));
    
    setTimeout(() => {
      navigate('/payment-processing');
    }, 1000);
  };

  if (!bookingDetails) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/booking-details')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Payment Options</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">✓</div>
              <span className="ml-2 text-green-600 font-medium">Cart</span>
            </div>
            <div className="flex-1 h-px bg-green-300 mx-4"></div>
            <div className="flex items-center">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">✓</div>
              <span className="ml-2 text-green-600 font-medium">Booking Details</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-4"></div>
            <div className="flex items-center">
              <div className="bg-[#FF7200] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
              <span className="ml-2 text-[#FF7200] font-medium">Payment</span>
            </div>
          </div>

          {/* Bill Total */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bill Total</h2>
              <div className="text-4xl font-bold text-[#FF7200] mb-4">
                ₹{bookingDetails.cartSummary.total.toLocaleString()}
              </div>
              <p className="text-gray-600">
                {bookingDetails.cartSummary.itemCount} service{bookingDetails.cartSummary.itemCount !== 1 ? 's' : ''} • 
                {bookingDetails.customerInfo.name} • 
                {new Date(bookingDetails.selectedDate).toLocaleDateString('en-IN', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Choose Payment Method</h2>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => method.available && setSelectedMethod(method.id)}
                  className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'border-[#FF7200] bg-orange-50'
                      : method.available
                      ? 'border-gray-200 hover:border-[#FF7200] hover:bg-gray-50'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Radio button */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id
                          ? 'border-[#FF7200] bg-[#FF7200]'
                          : 'border-gray-300'
                      }`}>
                        {selectedMethod === method.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>

                      {/* Icon */}
                      <div className={`p-2 rounded-lg ${
                        selectedMethod === method.id
                          ? 'bg-[#FF7200] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {method.icon}
                      </div>

                      {/* Method details */}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          {method.recommended && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className={`h-5 w-5 ${
                      selectedMethod === method.id
                        ? 'text-[#FF7200]'
                        : 'text-gray-400'
                    }`} />
                  </div>

                  {/* Additional info for UPI */}
                  {method.id === 'upi' && selectedMethod === method.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-orange-200"
                    >
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex items-center justify-center p-2 bg-white rounded border">
                          <img src="/images/gpay-logo.svg" alt="Google Pay" className="h-6" />
                        </div>
                        <div className="flex items-center justify-center p-2 bg-white rounded border">
                          <img src="/images/phonepe-logo.svg" alt="PhonePe" className="h-6" />
                        </div>
                        <div className="flex items-center justify-center p-2 bg-white rounded border">
                          <img src="/images/paytm-logo.svg" alt="Paytm" className="h-6" />
                        </div>
                        <div className="flex items-center justify-center p-2 bg-white rounded border">
                          <span className="text-xs font-medium text-gray-600">& more</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 rounded-full p-1">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-900">100% Secure Payment</h3>
                <p className="text-xs text-blue-700 mt-1">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="sticky bottom-0 bg-white border-t p-4 -mx-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProceedToPayment}
              disabled={!selectedMethod || loading}
              className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                selectedMethod && !loading
                  ? 'bg-[#FF7200] text-white hover:bg-[#e56700]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Pay ₹{bookingDetails.cartSummary.total.toLocaleString()}
                  <ChevronRight className="h-5 w-5 ml-2" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions; 