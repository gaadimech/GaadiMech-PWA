import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, MessageCircle, ChevronRight } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);
  const [whatsappRedirectCountdown, setWhatsappRedirectCountdown] = useState(3);
  const WHATSAPP_PHONE_NUMBER = '917300042410';

  // Load order data from session
  useEffect(() => {
    const data = sessionStorage.getItem('orderData');
    if (data) {
      setOrderData(JSON.parse(data));
    } else {
      // Redirect if no order data
      navigate('/services');
    }
  }, [navigate]);

  // WhatsApp redirect countdown
  useEffect(() => {
    if (whatsappRedirectCountdown > 0) {
      const timer = setTimeout(() => {
        setWhatsappRedirectCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      handleWhatsAppRedirect();
    }
  }, [whatsappRedirectCountdown]);

  const handleWhatsAppRedirect = () => {
    if (!orderData) return;

    const paymentTypeText = orderData.paymentType === 'cash_payment' ? 'Cash on Service' : 
                           orderData.paymentType === 'full_payment' ? 'Full Payment' : 
                           'Partial Payment (25%)';

    const message = `Hi! I've successfully booked a car service. Here are my booking details:

🚗 Vehicle: ${orderData.selectedVehicle?.manufacturer} ${orderData.selectedVehicle?.model}
📅 Date: ${formatDate(orderData.selectedDate)}
⏰ Time: ${formatTimeSlot(orderData.selectedTimeSlot)}
💰 Payment Type: ${paymentTypeText}
💵 Amount Paid: ₹${orderData.paymentAmount}
🆔 Order ID: ${orderData.orderId}
${orderData.paymentId ? `💳 Payment ID: ${orderData.paymentId}` : ''}

Please confirm my booking. Thank you!`;

    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleViewOrderDetails = () => {
    navigate('/order-details');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeSlot = (timeSlotId: string) => {
    const slots: { [key: string]: string } = {
      '9-12': '9 AM - 12 PM',
      '12-15': '12 PM - 3 PM',
      '15-18': '3 PM - 6 PM',
      '18-21': '6 PM - 9 PM'
    };
    return slots[timeSlotId] || timeSlotId;
  };

  const getPaymentTypeDisplay = (paymentType: string) => {
    switch (paymentType) {
      case 'full_payment':
        return 'Full Payment';
      case 'partial_payment':
        return 'Partial Payment (25%)';
      case 'cash_payment':
        return 'Cash on Service';
      default:
        return paymentType;
    }
  };

  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8 mb-6"
        >
          <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {orderData.paymentType === 'cash_payment' ? 'Booking Confirmed!' : 'Payment Successful!'}
          </h1>
          <p className="text-gray-600">Your booking has been confirmed.</p>
        </motion.div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-medium">{orderData.orderId}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Vehicle</p>
              <p className="font-medium">{orderData.selectedVehicle?.manufacturer} {orderData.selectedVehicle?.model}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Service Date</p>
              <p className="font-medium">{formatDate(orderData.selectedDate)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Time Slot</p>
              <p className="font-medium">{formatTimeSlot(orderData.selectedTimeSlot)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Payment Type</p>
              <p className="font-medium">{getPaymentTypeDisplay(orderData.paymentType)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Amount Paid</p>
              <p className="font-medium">₹{orderData.paymentAmount}</p>
            </div>
            
            {orderData.paymentId && (
              <div>
                <p className="text-sm text-gray-600">Payment ID</p>
                <p className="font-medium text-gray-500">{orderData.paymentId}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleViewOrderDetails}
            className="w-full bg-[#FF7200] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#e66600] transition-colors flex items-center justify-center"
          >
            View Order Details
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>

          <button
            onClick={handleWhatsAppRedirect}
            className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Continue on WhatsApp ({whatsappRedirectCountdown}s)
          </button>
        </div>

        {/* Security Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          A copy of your booking details has been sent to your registered mobile number.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess; 