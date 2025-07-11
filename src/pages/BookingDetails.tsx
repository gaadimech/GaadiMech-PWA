import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Car, ChevronRight, CheckCircle, CreditCard, Shield, AlertTriangle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

// Declare Razorpay global variable
declare global {
  interface Window {
    Razorpay: any;
  }
}

const BookingDetails = () => {
  const navigate = useNavigate();
  const { cartSummary } = useCart();
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [serviceMode, setServiceMode] = useState<'pickup' | 'walkin'>('pickup');
  const [customerInfo, setCustomerInfo] = useState({
    mobile: '',
    location: null as any,
    city: 'Jaipur' // Default city
  });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Load data from session
  useEffect(() => {
    // Load vehicle data
    const vehicleData = sessionStorage.getItem('selectedVehicle');
    if (vehicleData) {
      try {
        setSelectedVehicle(JSON.parse(vehicleData));
      } catch (error) {
        console.error('Error parsing vehicle data:', error);
      }
    }

    // Load service mode from cart
    const mode = sessionStorage.getItem('serviceMode') as 'pickup' | 'walkin';
    if (mode) {
      setServiceMode(mode);
    }

    // Load mobile number
    const mobile = sessionStorage.getItem('userMobileNumber') || '';
    setCustomerInfo(prev => ({ ...prev, mobile }));
  }, []);

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
    // Check if Razorpay script is already loaded
    if (window.Razorpay) {
      console.log('Razorpay already loaded');
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      console.log('Razorpay script already in DOM');
      return;
    }

    console.log('Loading Razorpay script');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
    };
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return days;
  };

  const timeSlots = [
    { id: '09-12', label: '9:00 AM - 12:00 PM', available: true },
    { id: '12-15', label: '12:00 PM - 3:00 PM', available: true },
    { id: '15-18', label: '3:00 PM - 6:00 PM', available: true },
    { id: '18-21', label: '6:00 PM - 9:00 PM', available: false }
  ];

  const handleProceedToPayment = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert('Please select date and time slot');
      return;
    }

    // Save booking details to session
    const bookingDetails = {
      customerInfo,
      selectedVehicle,
      serviceMode,
      selectedDate,
      selectedTimeSlot,
      cartSummary
    };
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    navigate('/payment-options');
  };

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      alert('Payment system not loaded. Please refresh the page and try again.');
      setIsProcessingPayment(false);
      return;
    }

    if (!bookingDetails) {
      console.error('No booking details found');
      alert('Booking details not found. Please try again.');
      setIsProcessingPayment(false);
      return;
    }

    setIsProcessingPayment(true);
    setPaymentFailed(false);
    setPaymentError('');

    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_719oj4MDAGClqw',
        amount: bookingDetails.cartSummary.total * 100, // Amount in paisa
        currency: 'INR',
        name: 'GaadiMech',
        description: 'Car Service Booking',
        image: '/images/logo.png',
        handler: function (response: any) {
          console.log('Payment successful:', response);
          
          // Store payment details in session
          const updatedBookingDetails = {
            ...bookingDetails,
            payment: {
              id: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              status: 'completed',
              amount: bookingDetails.cartSummary.total,
              timestamp: new Date().toISOString()
            }
          };
          sessionStorage.setItem('bookingDetails', JSON.stringify(updatedBookingDetails));
          
          // Set success state and navigate
          setPaymentSuccess(true);
          setIsProcessingPayment(false);
          navigate('/order-success');
        },
        prefill: {
          name: bookingDetails.customerInfo?.mobile || '', // Assuming mobile number is customerInfo.mobile
          contact: bookingDetails.customerInfo?.mobile || '',
          email: bookingDetails.customerInfo?.mobile + '@example.com' // Placeholder email
        },
        notes: {
          vehicle: `${bookingDetails.selectedVehicle?.manufacturer} ${bookingDetails.selectedVehicle?.model}`,
          service_date: bookingDetails.selectedDate,
          service_time: bookingDetails.selectedTimeSlot,
          service_type: 'Regular Service'
        },
        theme: {
          color: '#FF7200'
        },
        modal: {
          ondismiss: function() {
            setIsProcessingPayment(false);
            if (!paymentSuccess) {
              setPaymentFailed(true);
              setPaymentError('Payment was cancelled. Please try again.');
            }
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        setIsProcessingPayment(false);
        setPaymentFailed(true);
        setPaymentError(response.error.description || 'Payment failed. Please try again.');
      });
      
      rzp.open();
    } catch (error) {
      console.error('Error opening Razorpay:', error);
      setIsProcessingPayment(false);
      setPaymentFailed(true);
      setPaymentError('Error opening payment gateway. Please try again.');
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return 'Select Date';
    const date = new Date(selectedDate);
    return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}`;
  };

  const formatSelectedTimeSlot = () => {
    if (!selectedTimeSlot) return 'Select Time';
    const slot = timeSlots.find(s => s.id === selectedTimeSlot);
    return slot ? slot.label : 'Select Time';
  };

  if (cartSummary.isEmpty) {
    navigate('/cart');
    return null;
  }

  // Payment Failed UI
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
              Back to Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main booking details UI with payment button
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Back to Cart</h1>
          </div>
          {selectedVehicle && (
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Car className="h-4 w-4 text-gray-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">{selectedVehicle.model?.toUpperCase()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto pb-24">
        {/* Progress Steps */}
        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
            <span className="ml-2 text-green-600">Cart</span>
          </div>
          <div className="flex-1 h-[2px] bg-[#FF7200] mx-2"></div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-[#FF7200] text-white rounded-full flex items-center justify-center text-xs">2</div>
            <span className="ml-2 text-[#FF7200]">Booking</span>
          </div>
          <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs">3</div>
            <span className="ml-2 text-gray-400">Payment</span>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Cart Summary</h2>
              <p className="text-sm text-gray-600">{cartSummary.itemCount} service{cartSummary.itemCount !== 1 ? 's' : ''}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#FF7200]">₹{cartSummary.total}</span>
              {cartSummary.discount > 0 && (
                <p className="text-green-600 text-sm">You save ₹{cartSummary.discount}</p>
              )}
            </div>
          </div>
        </div>

        {/* Service Mode */}
        <div className="bg-white p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-[#FF7200] mr-2" />
              <div>
                <h3 className="font-medium text-gray-900">Mode: {serviceMode === 'pickup' ? 'Pickup Service' : 'Walk-in'}</h3>
                <p className="text-sm text-gray-600">
                  {serviceMode === 'pickup' ? "We'll pick up your car" : 'Visit our workshop'}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="bg-white p-4">
          <h3 className="font-medium text-gray-900 mb-4">Select Date & Time</h3>
          
          {/* Date Selection */}
          <div className="mb-4">
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
              {getNextDays().map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  className={`flex-shrink-0 p-3 rounded-lg border transition-all ${
                    selectedDate === day.date
                      ? 'border-[#FF7200] bg-orange-50 text-[#FF7200]'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">{day.day}</div>
                    <div className="text-lg font-bold">{day.dayNum}</div>
                    <div className="text-xs">{day.month}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                  disabled={!slot.available}
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    !slot.available
                      ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                      : selectedTimeSlot === slot.id
                      ? 'border-[#FF7200] bg-orange-50 text-[#FF7200]'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{slot.label}</span>
                    {selectedTimeSlot === slot.id && <CheckCircle className="h-5 w-5" />}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleRazorpayPayment}
              disabled={isProcessingPayment}
              className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center ${
                isProcessingPayment
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FF7200] text-white hover:bg-[#e56700]'
              }`}
            >
              {isProcessingPayment ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span>Pay Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails; 