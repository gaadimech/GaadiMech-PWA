import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Clock, ChevronRight } from 'lucide-react';

// Declare Razorpay global variable
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOption {
  id: string;
  title: string;
  description: string;
  amount: number;
  originalAmount?: number;
  isSelected?: boolean;
}

const PaymentOptions = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');
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

  // Load Razorpay script
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  if (!bookingDetails) {
    return null;
  }

  const totalAmount = bookingDetails.cartSummary.total;
  const partialAmount = Math.round(totalAmount * 0.25); // 25% of total
  
  const paymentOptions: PaymentOption[] = [
    {
      id: 'full_payment',
      title: 'Pay Full Amount Now',
      description: 'Settle your payment immediately and enjoy a hassle-free service experience.',
      amount: totalAmount,
      originalAmount: totalAmount
    },
    {
      id: 'partial_payment',
      title: 'Pay 25% & Book Priority',
      description: 'Secure a priority slot by paying only 25% upfront. Balance due after service completion.',
      amount: partialAmount,
      originalAmount: totalAmount
    },
    {
      id: 'cash_payment',
      title: 'Pay in Cash',
      description: 'Prefer to pay after the service? Opt for cash payment upon completion.',
      amount: 0,
      originalAmount: totalAmount
    }
  ];

  const handleRazorpayPayment = (paymentAmount: number) => {
    if (!window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      alert('Payment system is not ready. Please try again.');
      return;
    }

    setLoading(true);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_719oj4MDAGClqw',
      amount: paymentAmount * 100, // Convert to paise
      currency: 'INR',
      name: 'GaadiMech',
      description: `Car Service Booking - ${selectedOption === 'full_payment' ? 'Full Payment' : 'Partial Payment'}`,
      image: '/images/logo.png',
      order_id: '', // You can generate order_id from backend
      handler: function (response: any) {
        console.log('Payment successful:', response);
        
        // Store payment details
        const paymentData = {
          ...bookingDetails,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          paymentAmount: paymentAmount,
          paymentType: selectedOption,
          paymentStatus: 'completed',
          orderDate: new Date().toISOString()
        };
        
        sessionStorage.setItem('orderData', JSON.stringify(paymentData));
        sessionStorage.removeItem('bookingDetails');
        setLoading(false);
        navigate('/order-success');
      },
      prefill: {
        name: bookingDetails.customerInfo.name || '',
        email: bookingDetails.customerInfo.email || '',
        contact: bookingDetails.customerInfo.mobile || ''
      },
      notes: {
        service_type: bookingDetails.serviceMode || 'pickup',
        selected_date: bookingDetails.selectedDate,
        selected_time: bookingDetails.selectedTimeSlot
      },
      theme: {
        color: '#FF7200'
      }
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response: any) {
      console.error('Payment failed:', response);
      setLoading(false);
      navigate('/order-failed');
    });

    rzp.open();
  };

  const handlePayNow = () => {
    if (!selectedOption) {
      alert('Please select a payment option');
      return;
    }

    const selectedPaymentOption = paymentOptions.find(option => option.id === selectedOption);
    
    if (!selectedPaymentOption) {
      alert('Invalid payment option selected');
      return;
    }

    if (selectedOption === 'cash_payment') {
      // Handle cash payment - direct booking without payment
      const orderData = {
        ...bookingDetails,
        paymentType: 'cash',
        paymentStatus: 'pending',
        paymentAmount: 0,
        orderDate: new Date().toISOString(),
        orderId: `GM${Date.now()}${Math.floor(Math.random() * 1000)}`
      };
      
      sessionStorage.setItem('orderData', JSON.stringify(orderData));
      sessionStorage.removeItem('bookingDetails');
      navigate('/order-success');
    } else {
      // Handle online payment via Razorpay
      handleRazorpayPayment(selectedPaymentOption.amount);
    }
  };

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
          {/* Header Text */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Select the option that best suits your needs</h2>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">
            {paymentOptions.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedOption(option.id)}
                className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedOption === option.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Radio button */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option.id
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === option.id && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>

                    {/* Option details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{option.title}</h3>
                      <p className="text-sm text-gray-600 max-w-md">{option.description}</p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#FF7200]">
                      ₹ {option.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment Method Info */}
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img src="/images/phonepe-logo.png" alt="PhonePe" className="h-8 w-8" />
                <span className="text-sm font-medium text-gray-900">PAY USING</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF7200]">
                  ₹ {selectedOption ? paymentOptions.find(opt => opt.id === selectedOption)?.amount.toLocaleString() : '0'}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Phone Pe UPI</p>
          </div>

          {/* Pay Now Button */}
          <div className="sticky bottom-0 bg-white border-t p-4 -mx-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayNow}
              disabled={!selectedOption || loading}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center ${
                selectedOption && !loading
                  ? 'bg-[#FF7200] text-white hover:bg-[#e56700]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  PAY NOW
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