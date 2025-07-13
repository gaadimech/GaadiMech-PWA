import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, X, Car, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CouponSection from '../components/CouponSection';

const Cart = () => {
  const navigate = useNavigate();
  const { cartSummary, removeItem, refreshCartFromStorage } = useCart();
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [modeOfService, setModeOfService] = useState<'pickup' | 'walkin'>('pickup');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');

  // Calculate prices
  const originalPrice = cartSummary.total;
  const discountedPrice = cartSummary.total; // You can add any automatic discounts here
  const finalPrice = discountedPrice - couponDiscount;

  console.log('🛒 Cart page render - Cart Summary:', cartSummary);

  // Load selected vehicle from session
  useEffect(() => {
    const vehicleData = sessionStorage.getItem('selectedVehicle');
    if (vehicleData) {
      try {
        const vehicle = JSON.parse(vehicleData);
        setSelectedVehicle(vehicle);
      } catch (error) {
        console.error('Error parsing vehicle data:', error);
      }
    }
  }, []);

  // Refresh cart data when component mounts
  useEffect(() => {
    refreshCartFromStorage();
  }, []);

  const handleContinueShopping = () => {
    navigate('/services');
  };

  const handleProceedToBooking = () => {
    console.log('🚀 Proceed to Booking clicked - Cart Summary:', cartSummary);
    console.log('🚀 Items in cart:', cartSummary.items);
    
    // Validate cart is not empty
    if (cartSummary.isEmpty || cartSummary.items.length === 0) {
      alert('Your cart is empty. Please add some services before proceeding.');
      return;
    }
    
    // Store service mode and coupon code in session for booking
    sessionStorage.setItem('serviceMode', modeOfService);
    if (appliedCouponCode) {
      sessionStorage.setItem('appliedCoupon', appliedCouponCode);
      sessionStorage.setItem('couponDiscount', couponDiscount.toString());
    }
    
    // Create and store booking details that BookingDetails component expects
    const bookingDetails = {
      cartSummary,
      selectedVehicle,
      serviceMode: modeOfService,
      appliedCouponCode,
      couponDiscount,
      customerInfo: {
        mobile: sessionStorage.getItem('userMobileNumber') || '',
        city: 'Jaipur' // Default city
      }
    };
    
    console.log('🚀 Setting booking details:', bookingDetails);
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    
    console.log('🚀 Navigating to booking-details...');
    navigate('/booking-details');
  };

  const handleCouponApply = (discount: number, code: string) => {
    setCouponDiscount(discount);
    setAppliedCouponCode(code);
  };

  const handleCouponRemove = () => {
    setCouponDiscount(0);
    setAppliedCouponCode('');
    sessionStorage.removeItem('appliedCoupon');
    sessionStorage.removeItem('couponDiscount');
  };

  if (cartSummary.isEmpty) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="mr-3">
                <ArrowLeft className="h-6 w-6 text-gray-700" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
            </div>
            {selectedVehicle && (
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <Car className="h-4 w-4 text-gray-600 mr-1" />
                <span className="text-sm font-medium text-gray-700">{selectedVehicle.model?.toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Empty Cart State */}
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">Looks like you haven't added any services to your cart yet. Browse our services to get started!</p>
            <button
              onClick={handleContinueShopping}
              className="bg-[#FF7200] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#e56700] transition-colors shadow-lg"
            >
              Browse Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
          </div>
          {selectedVehicle && (
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Car className="h-4 w-4 text-gray-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">{selectedVehicle.model?.toUpperCase()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto pb-32">
        {/* Service Items */}
        <div className="px-4 py-4 space-y-4">
          {cartSummary.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Service Image */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={(item.service as any).image || 'https://i.ibb.co/t4HmbHZ/Group.png'} 
                      alt={item.type === 'regular' ? (item.service as any).title : (item.service as any).name}
                      className="w-16 h-16 rounded-xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://i.ibb.co/t4HmbHZ/Group.png';
                      }}
                    />
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.serviceId, item.type)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">
                      {item.type === 'regular' ? (item.service as any).title : (item.service as any).name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {(item.service as any).description || 'Professional car service'}
                    </p>
                    
                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">₹{item.unitPrice.toLocaleString()}</span>
                        {item.quantity > 1 && (
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            × {item.quantity}
                          </span>
                        )}
                      </div>
                      
                      {/* Rating Badge */}
                      {(item.service as any).rating && (
                        <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                          <span className="text-green-800 text-xs font-medium">
                            ⭐ {(item.service as any).rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coupon Section */}
        <div className="px-4 mb-6">
          <CouponSection
            originalPrice={originalPrice}
            discountedPrice={discountedPrice}
            onCouponApply={handleCouponApply}
            onCouponRemove={handleCouponRemove}
          />
        </div>

        {/* Mode of Service */}
        <div className="mx-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-[#FF7200] mr-2" />
              Mode of Service
            </h3>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="serviceMode"
                  value="pickup"
                  checked={modeOfService === 'pickup'}
                  onChange={(e) => setModeOfService(e.target.value as 'pickup' | 'walkin')}
                  className="h-5 w-5 text-[#FF7200] border-gray-300 focus:ring-[#FF7200] mr-4"
                />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Pickup Service</span>
                  <p className="text-gray-600 text-sm">We'll pick up your car from your location</p>
                </div>
              </label>
              <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="serviceMode"
                  value="walkin"
                  checked={modeOfService === 'walkin'}
                  onChange={(e) => setModeOfService(e.target.value as 'pickup' | 'walkin')}
                  className="h-5 w-5 text-[#FF7200] border-gray-300 focus:ring-[#FF7200] mr-4"
                />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Walk-in Service</span>
                  <p className="text-gray-600 text-sm">Drop your car at our workshop</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-top z-40">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total</span>
              <div className="text-right">
                {couponDiscount > 0 && (
                  <>
                    <span className="text-gray-500 line-through text-sm mr-2">₹{originalPrice}</span>
                    <span className="text-green-600 text-sm">(-₹{couponDiscount})</span>
                  </>
                )}
                <span className="text-2xl font-bold text-[#FF7200] ml-2">₹{finalPrice}</span>
              </div>
            </div>
            <button
              onClick={handleProceedToBooking}
              className="w-full bg-[#FF7200] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#e56700] transition-colors"
            >
              Proceed to Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 