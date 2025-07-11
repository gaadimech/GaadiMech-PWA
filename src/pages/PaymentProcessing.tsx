import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null);

  const steps = [
    { id: 1, text: 'Initializing payment...', duration: 2000 },
    { id: 2, text: 'Verifying payment details...', duration: 2000 },
    { id: 3, text: 'Processing payment...', duration: 3000 },
    { id: 4, text: 'Confirming transaction...', duration: 1500 }
  ];

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

  // Simulate payment processing
  useEffect(() => {
    if (!bookingDetails) return;

    const processPayment = async () => {
      // Step through each processing step
      for (let i = 1; i <= steps.length; i++) {
        setTimeout(() => {
          setStep(i);
        }, steps.slice(0, i - 1).reduce((acc, step) => acc + step.duration, 0));
      }

      // After all steps, determine payment result
      const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
      
      setTimeout(() => {
        // Simulate payment result (90% success rate)
        const success = Math.random() > 0.1;
        setPaymentResult(success ? 'success' : 'failed');
        
        // Redirect after showing result
        setTimeout(() => {
          if (success) {
            // Generate order ID and store in session
            const orderId = `GM${Date.now()}${Math.floor(Math.random() * 1000)}`;
            const orderData = {
              ...bookingDetails,
              orderId,
              paymentStatus: 'completed',
              orderDate: new Date().toISOString()
            };
            sessionStorage.setItem('orderData', JSON.stringify(orderData));
            sessionStorage.removeItem('bookingDetails'); // Clear booking details
            navigate('/order-success');
          } else {
            navigate('/order-failed');
          }
        }, 2000);
      }, totalDuration);
    };

    processPayment();
  }, [bookingDetails, navigate]);

  if (!bookingDetails) {
    return null;
  }

  const getCurrentStepText = () => {
    if (paymentResult === 'success') return 'Payment successful!';
    if (paymentResult === 'failed') return 'Payment failed!';
    return steps[step - 1]?.text || 'Processing...';
  };

  const getIcon = () => {
    if (paymentResult === 'success') {
      return <CheckCircle className="h-16 w-16 text-green-500" />;
    }
    if (paymentResult === 'failed') {
      return <XCircle className="h-16 w-16 text-red-500" />;
    }
    return <CreditCard className="h-16 w-16 text-[#FF7200]" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={paymentResult ? {} : { rotate: 360 }}
              transition={paymentResult ? {} : { duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {getIcon()}
            </motion.div>
          </div>

          {/* Amount */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ₹{bookingDetails.cartSummary.total.toLocaleString()}
            </h1>
            <p className="text-gray-600">
              {bookingDetails.cartSummary.itemCount} service{bookingDetails.cartSummary.itemCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Status */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-2 ${
              paymentResult === 'success' ? 'text-green-600' :
              paymentResult === 'failed' ? 'text-red-600' :
              'text-gray-900'
            }`}>
              {getCurrentStepText()}
            </h2>
            
            {!paymentResult && (
              <div className="flex items-center justify-center space-x-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-[#FF7200] rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-[#FF7200] rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-[#FF7200] rounded-full"
                />
              </div>
            )}
          </div>

          {/* Progress Steps */}
          {!paymentResult && (
            <div className="space-y-3">
              {steps.map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step > stepItem.id ? 'bg-green-500 text-white' :
                    step === stepItem.id ? 'bg-[#FF7200] text-white animate-pulse' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {step > stepItem.id ? '✓' : stepItem.id}
                  </div>
                  <span className={`text-sm ${
                    step >= stepItem.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {stepItem.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Payment Method Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Payment Method:</span>
              <span className="font-medium capitalize">
                {bookingDetails.paymentMethod === 'upi' ? 'UPI' : 
                 bookingDetails.paymentMethod === 'cards' ? 'Card' : 
                 bookingDetails.paymentMethod}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <span>Customer:</span>
              <span className="font-medium">{bookingDetails.customerInfo.name}</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 flex items-center justify-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure transaction in progress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing; 