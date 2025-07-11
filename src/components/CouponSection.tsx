import React, { useState } from 'react';
import { Tag, CheckCircle, X, ChevronDown, AlertTriangle } from 'lucide-react';

interface CouponSectionProps {
  originalPrice: number;
  discountedPrice: number;
  onCouponApply: (discount: number, code: string) => void;
  onCouponRemove: () => void;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  originalPrice,
  discountedPrice,
  onCouponApply,
  onCouponRemove
}) => {
  const [showCouponSection, setShowCouponSection] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string; discount: number} | null>(null);

  const validateAndApplyCoupon = async () => {
    setCouponError('');
    
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
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
          amount: discountedPrice
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.valid) {
        const couponDetails = data.coupon;
        
        // Calculate coupon discount
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
        onCouponApply(couponDiscount, couponDetails.code);
        setShowCouponSection(false);
      } else {
        let errorMessage = 'Invalid or expired coupon code';
        if (data && data.error) {
          errorMessage = typeof data.error === 'string' 
            ? data.error 
            : (data.error.message || 'Invalid coupon code');
        }
        setCouponError(errorMessage);
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      setCouponError('An error occurred while validating the coupon');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    onCouponRemove();
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3">
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
  );
};

export default CouponSection; 