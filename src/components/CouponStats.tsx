import React from 'react';
import { BarChart, Tag, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface CouponStatsProps {
  stats: {
    totalCoupons: number;
    activeCoupons: number;
    expiredCoupons: number;
    totalUses: number;
    usageByType: {
      percentage: number;
      fixed: number;
      free_shipping: number;
    };
    mostUsedCoupons: Array<{
      code: string;
      uses: number;
      maxUses: number;
      discountType: string;
      discountValue: number;
    }>;
  };
  isLoading?: boolean;
}

const CouponStats: React.FC<CouponStatsProps> = ({ stats, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Coupon Statistics</h2>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-40 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Coupon Statistics</h2>
        <p className="text-gray-500">No statistics available.</p>
      </div>
    );
  }

  const getDiscountDisplay = (type: string, value: number) => {
    if (type === 'percentage') {
      return `${value}%`;
    } else if (type === 'fixed') {
      return `₹${value}`;
    } else {
      return 'Free Shipping';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <BarChart className="w-5 h-5 mr-2 text-[#FF7200]" />
        Coupon Statistics
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#FFF8F0] p-4 rounded-lg border-l-4 border-[#FF7200]">
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm">Total Coupons</div>
            <Tag className="w-4 h-4 text-[#FF7200]" />
          </div>
          <div className="text-2xl font-bold mt-2">{stats.totalCoupons}</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm">Active Coupons</div>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold mt-2">{stats.activeCoupons}</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm">Expired Coupons</div>
            <Clock className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold mt-2">{stats.expiredCoupons}</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm">Total Uses</div>
            <AlertTriangle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold mt-2">{stats.totalUses}</div>
        </div>
      </div>

      {/* Usage by Type */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Usage by Discount Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Percentage</div>
            <div className="text-xl font-bold">{stats.usageByType.percentage} uses</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Fixed Amount</div>
            <div className="text-xl font-bold">{stats.usageByType.fixed} uses</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Free Shipping</div>
            <div className="text-xl font-bold">{stats.usageByType.free_shipping} uses</div>
          </div>
        </div>
      </div>

      {/* Most Used Coupons */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Most Used Coupons</h3>
        {stats.mostUsedCoupons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uses
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.mostUsedCoupons.map((coupon, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 text-[#FF7200] mr-2" />
                        {coupon.code}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {coupon.uses} / {coupon.maxUses}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {getDiscountDisplay(coupon.discountType, coupon.discountValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No usage data available.</p>
        )}
      </div>
    </div>
  );
};

export default CouponStats; 