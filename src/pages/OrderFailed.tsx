import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, ArrowLeft, MessageCircle, Phone } from 'lucide-react';

const OrderFailed = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const WHATSAPP_PHONE_NUMBER = '917300042410';

  // Load booking details from session
  useEffect(() => {
    // Check for both bookingDetails and orderData
    const details = sessionStorage.getItem('bookingDetails');
    const orderData = sessionStorage.getItem('orderData');
    
    if (details) {
      setBookingDetails(JSON.parse(details));
    } else if (orderData) {
      // If orderData exists, use it as booking details
      setBookingDetails(JSON.parse(orderData));
    } else {
      // Redirect if no booking details
      navigate('/services');
    }
  }, [navigate]);

  const handleRetryPayment = () => {
    navigate('/payment-options');
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handleContactSupport = () => {
    const vehicleInfo = bookingDetails?.selectedVehicle || bookingDetails?.vehicle;
    const totalAmount = bookingDetails?.cartSummary?.total || bookingDetails?.paymentAmount;
    
    const message = `Hi! I faced an issue with my payment. My booking details are:

🚗 Vehicle: ${vehicleInfo?.manufacturer} ${vehicleInfo?.model}
📅 Date: ${formatDate(bookingDetails?.selectedDate)}
⏰ Time: ${formatTimeSlot(bookingDetails?.selectedTimeSlot)}
💰 Amount: ₹${totalAmount}

Please help me complete my booking. Thank you!`;
    
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallSupport = () => {
    window.location.href = 'tel:+917300042410';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeSlot = (timeSlotId: string) => {
    if (!timeSlotId) return '';
    const slots: { [key: string]: string } = {
      '9-12': '9 AM - 12 PM',
      '12-15': '12 PM - 3 PM',
      '15-18': '3 PM - 6 PM',
      '18-21': '6 PM - 9 PM'
    };
    return slots[timeSlotId] || timeSlotId;
  };

  if (!bookingDetails) {
    return null;
  }

  const vehicleInfo = bookingDetails.selectedVehicle || bookingDetails.vehicle;
  const totalAmount = bookingDetails.cartSummary?.total || bookingDetails.paymentAmount;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Error Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8 mb-6"
        >
          <div className="bg-red-100 rounded-full p-4 inline-block mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600">We couldn't process your payment.</p>
        </motion.div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Vehicle</p>
              <p className="font-medium">{vehicleInfo?.manufacturer} {vehicleInfo?.model}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Service Date</p>
              <p className="font-medium">{formatDate(bookingDetails.selectedDate)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Time Slot</p>
              <p className="font-medium">{formatTimeSlot(bookingDetails.selectedTimeSlot)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Amount</p>
              <p className="font-medium">₹{totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleRetryPayment}
            className="w-full bg-[#FF7200] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#e66600] transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retry Payment
          </button>

          <button
            onClick={handleBackToCart}
            className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
        </div>

        {/* Support Section */}
        <div className="mt-8">
          <p className="text-center text-gray-600 mb-4">Need help with your payment?</p>
          <div className="space-y-3">
            <button
              onClick={handleContactSupport}
              className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </button>

            <button
              onClick={handleCallSupport}
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Support
            </button>
          </div>
        </div>

        {/* Security Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't worry, your booking details are saved. You can try the payment again or contact our support team for assistance.
        </p>
      </div>
    </div>
  );
};

export default OrderFailed; 