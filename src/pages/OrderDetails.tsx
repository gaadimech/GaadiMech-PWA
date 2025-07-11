import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Phone, Car, Download, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Check if order data is passed via state (from OrderSuccess page)
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // Try to load from session storage as fallback
      const data = sessionStorage.getItem('orderData');
      if (data) {
        setOrderData(JSON.parse(data));
      } else {
        // Redirect if no order data found
        navigate('/services');
      }
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleDownloadInvoice = () => {
    if (!orderData) return;
    
    // Create a detailed invoice content
    const invoiceContent = `
GAADITECH INVOICE
=======================================

Order ID: ${orderData.orderId}
Order Date: ${new Date(orderData.orderDate).toLocaleDateString('en-IN')}
Payment Status: ${orderData.paymentStatus}

CUSTOMER DETAILS:
Name: ${orderData.customerInfo.name}
Phone: ${orderData.customerInfo.phone}
Email: ${orderData.customerInfo.email || 'N/A'}
Address: ${orderData.customerInfo.address}, ${orderData.customerInfo.city} - ${orderData.customerInfo.pincode}

VEHICLE DETAILS:
Vehicle: ${orderData.vehicle?.manufacturer} ${orderData.vehicle?.model}
Fuel Type: ${orderData.vehicle?.fuelType}

SERVICE DETAILS:
Service Date: ${new Date(orderData.selectedDate).toLocaleDateString('en-IN')}
Service Time: ${getTimeSlotLabel(orderData.selectedTimeSlot)}

SERVICES ORDERED:
=======================================
${orderData.cartSummary.items.map((item: any, index: number) => 
  `${index + 1}. ${item.type === 'regular' ? item.service.title : item.service.name}
     Quantity: ${item.quantity}
     Price: ₹${item.totalPrice.toLocaleString()}`
).join('\n')}

=======================================
Subtotal: ₹${(orderData.cartSummary.total + orderData.cartSummary.discount).toLocaleString()}
${orderData.cartSummary.discount > 0 ? `Discount: -₹${orderData.cartSummary.discount.toLocaleString()}` : ''}
TOTAL PAID: ₹${orderData.cartSummary.total.toLocaleString()}

Thank you for choosing GaadiMech!
For support: +91 73000 42410
Website: www.gaadimech.in
    `;

    const element = document.createElement('a');
    const file = new Blob([invoiceContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `GaadiMech_Invoice_${orderData.orderId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleContactSupport = () => {
    if (!orderData) return;
    
    const message = `Hi! I need help with my order:

Order ID: ${orderData.orderId}
Service Date: ${formatDate(orderData.selectedDate)}
Vehicle: ${orderData.vehicle?.manufacturer} ${orderData.vehicle?.model}

Please assist me. Thank you!`;
    
    window.open(`https://wa.me/917300042410?text=${encodeURIComponent(message)}`, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeSlotLabel = (timeSlotId: string) => {
    const slots: { [key: string]: string } = {
      '9-12': '9 AM - 12 PM',
      '12-15': '12 PM - 3 PM',
      '15-18': '3 PM - 6 PM',
      '18-21': '6 PM - 9 PM'
    };
    return slots[timeSlotId] || timeSlotId;
  };

  const getOrderStatus = () => {
    const serviceDate = new Date(orderData?.selectedDate);
    const now = new Date();
    
    if (serviceDate > now) {
      return { status: 'Scheduled', color: 'text-blue-600', bg: 'bg-blue-100' };
    } else {
      return { status: 'Completed', color: 'text-green-600', bg: 'bg-green-100' };
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7200] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const orderStatus = getOrderStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="mr-4 p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order ID: {orderData.orderId}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${orderStatus.bg} ${orderStatus.color}`}>
                {orderStatus.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Order Confirmed</p>
                  <p className="text-sm text-gray-600">
                    {new Date(orderData.orderDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Service Scheduled</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(orderData.selectedDate)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Payment Complete</p>
                  <p className="text-sm text-gray-600">
                    ₹{orderData.cartSummary.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6 border"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Time */}
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-[#FF7200] mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Service Date & Time</h3>
                  <p className="text-gray-600">{formatDate(orderData.selectedDate)}</p>
                  <p className="text-gray-600">{getTimeSlotLabel(orderData.selectedTimeSlot)}</p>
                </div>
              </div>

              {/* Vehicle */}
              <div className="flex items-start space-x-3">
                <Car className="h-5 w-5 text-[#FF7200] mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Vehicle Details</h3>
                  <p className="text-gray-600">
                    {orderData.vehicle?.manufacturer} {orderData.vehicle?.model}
                  </p>
                  <p className="text-gray-600">{orderData.vehicle?.fuelType}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#FF7200] mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Service Address</h3>
                  <p className="text-gray-600">{orderData.customerInfo.address}</p>
                  <p className="text-gray-600">
                    {orderData.customerInfo.city} - {orderData.customerInfo.pincode}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-[#FF7200] mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Contact Details</h3>
                  <p className="text-gray-600">{orderData.customerInfo.name}</p>
                  <p className="text-gray-600">{orderData.customerInfo.phone}</p>
                  {orderData.customerInfo.email && (
                    <p className="text-gray-600">{orderData.customerInfo.email}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Ordered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6 border"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Services Ordered</h2>
            
            <div className="space-y-4">
              {orderData.cartSummary.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.type === 'regular' ? item.service.title : item.service.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} × ₹{(item.totalPrice / item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{item.totalPrice.toLocaleString()}
                  </span>
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                {orderData.cartSummary.discount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-600">
                      ₹{(orderData.cartSummary.total + orderData.cartSummary.discount).toLocaleString()}
                    </span>
                  </div>
                )}
                {orderData.cartSummary.discount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600">
                      -₹{orderData.cartSummary.discount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Paid</span>
                  <span className="text-2xl font-bold text-[#FF7200]">
                    ₹{orderData.cartSummary.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={handleDownloadInvoice}
              className="flex-1 bg-[#FF7200] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#e56700] transition-colors flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Invoice
            </button>
            
            <button
              onClick={handleContactSupport}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Support
            </button>
          </motion.div>

          {/* Support Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-100 rounded-lg p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Assistance?</h3>
            <p className="text-gray-600 mb-4">
              Our team is available to help you with any questions about your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/917300042410" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#FF7200] font-semibold hover:text-[#e56700] transition-colors"
              >
                WhatsApp: +91 73000 42410
              </a>
              <a 
                href="tel:+917300042410"
                className="text-[#FF7200] font-semibold hover:text-[#e56700] transition-colors"
              >
                Call: +91 73000 42410
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 