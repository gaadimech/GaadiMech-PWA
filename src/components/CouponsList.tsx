import React, { useState } from 'react';
import { Tag, Clipboard, CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';
import WhatsAppShareModal from './WhatsAppShareModal';

interface Coupon {
  id: number;
  code: string;
  prefix?: string;
  suffix?: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number;
  maxUses: number;
  currentUses: number;
  createdFor?: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  isPersonalized?: boolean;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  description?: string;
  createdAt: string;
}

interface CouponsListProps {
  coupons: Coupon[];
  title?: string;
}

const CouponsList: React.FC<CouponsListProps> = ({ coupons, title = "Coupons" }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  // State for WhatsApp share modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedCouponCode, setSelectedCouponCode] = useState('');
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    
    // Clear the copied state after 2 seconds
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };
  
  // Handle opening WhatsApp share modal
  const handleOpenShareModal = (couponCode: string) => {
    setSelectedCouponCode(couponCode);
    setIsShareModalOpen(true);
  };
  
  // Close the WhatsApp share modal
  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };
  
  const getStatusBadge = (coupon: Coupon) => {
    if (!coupon.isActive) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          <XCircle className="w-3 h-3 mr-1" />
          Inactive
        </span>
      );
    }
    
    if (isExpired(coupon.validUntil)) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Expired
        </span>
      );
    }
    
    if (coupon.currentUses >= coupon.maxUses) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
          <XCircle className="w-3 h-3 mr-1" />
          Max Uses Reached
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </span>
    );
  };
  
  const getDiscountDisplay = (coupon: Coupon) => {
    if (coupon.discountType === 'percentage') {
      return `${coupon.discountValue}%`;
    } else if (coupon.discountType === 'fixed') {
      return `₹${coupon.discountValue}`;
    } else {
      return 'Free Shipping';
    }
  };
  
  if (!coupons || coupons.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500">No coupons to display.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Validity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 text-[#FF7200] mr-2" />
                    <div className="font-medium text-gray-900">{coupon.code}</div>
                    <button 
                      onClick={() => handleCopyCode(coupon.code)}
                      className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      title="Copy code"
                    >
                      {copiedCode === coupon.code ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clipboard className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {getDiscountDisplay(coupon)}
                    {coupon.maxDiscountAmount && coupon.discountType === 'percentage' && (
                      <span className="text-xs text-gray-500 ml-1">
                        (up to ₹{coupon.maxDiscountAmount})
                      </span>
                    )}
                  </div>
                  {coupon.minPurchaseAmount && (
                    <div className="text-xs text-gray-500">
                      Min. purchase: ₹{coupon.minPurchaseAmount}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {coupon.currentUses} / {coupon.maxUses}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    <div className="text-sm text-gray-900">
                      <div>{formatDate(coupon.validFrom)}</div>
                      <div className="text-xs text-gray-500">to {formatDate(coupon.validUntil)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(coupon)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {coupon.createdFor && (
                    <div>
                      <span className="font-medium">For:</span> {coupon.createdFor}
                    </div>
                  )}
                  {coupon.description && (
                    <div className="text-xs max-w-xs truncate" title={coupon.description}>
                      {coupon.description}
                    </div>
                  )}
                  {coupon.isPersonalized && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                      Personalized
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleOpenShareModal(coupon.code)}
                    className="inline-flex items-center justify-center p-2 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] focus:outline-none transition-colors"
                    title="Share via WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* WhatsApp Share Modal */}
      <WhatsAppShareModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        couponCode={selectedCouponCode}
      />
    </div>
  );
};

export default CouponsList; 