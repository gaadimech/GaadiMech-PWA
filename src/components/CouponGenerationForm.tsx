import React, { useState, useEffect } from 'react';

interface CouponGenerationFormProps {
  onCouponsGenerated: (coupons: any[]) => void;
}

const CouponGenerationForm: React.FC<CouponGenerationFormProps> = ({ onCouponsGenerated }) => {
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [pattern, setPattern] = useState('');
  const [count, setCount] = useState(1);
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [maxUses, setMaxUses] = useState(2);
  const [createdFor, setCreatedFor] = useState('');
  const [description, setDescription] = useState('');
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');
  const [maxDiscountAmount, setMaxDiscountAmount] = useState('');
  
  const [validityPeriod, setValidityPeriod] = useState('6months'); // default 6 months
  const [validFrom, setValidFrom] = useState(new Date().toISOString().split('T')[0]); // default today
  const [validUntil, setValidUntil] = useState(''); // will be calculated based on validityPeriod
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  
  // Fetch CSRF token when component mounts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        // Make a simple GET request to get a CSRF token
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1337'}/api/coupons`, {
          credentials: 'include', // Important for receiving cookies
        });
        
        // The CSRF token is typically set in a cookie
        // We don't need to extract it here as it will be automatically included
        // in subsequent requests due to credentials: 'include'
        
        if (!response.ok) {
          console.error('Failed to preflight CSRF request:', response.status);
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    
    fetchCsrfToken();
  }, []);
  
  // Calculate validUntil based on validFrom and validity period
  React.useEffect(() => {
    if (validFrom) {
      const fromDate = new Date(validFrom);
      let untilDate = new Date(fromDate);
      
      if (validityPeriod === '1month') {
        untilDate.setMonth(fromDate.getMonth() + 1);
      } else if (validityPeriod === '3months') {
        untilDate.setMonth(fromDate.getMonth() + 3);
      } else if (validityPeriod === '6months') {
        untilDate.setMonth(fromDate.getMonth() + 6);
      } else if (validityPeriod === '1year') {
        untilDate.setFullYear(fromDate.getFullYear() + 1);
      }
      
      setValidUntil(untilDate.toISOString().split('T')[0]);
    }
  }, [validFrom, validityPeriod]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    
    try {
      const basicAuthCredentials = btoa('admin-coupon:admin@coupon');
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1337'}/api/coupons/generate`, {
        method: 'POST',
        credentials: 'include', // Important for CSRF protection
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuthCredentials}`
        },
        body: JSON.stringify({
          prefix,
          suffix,
          pattern,
          count,
          discountType,
          discountValue,
          maxUses,
          validFrom,
          validUntil,
          createdFor,
          isPersonalized,
          minPurchaseAmount: minPurchaseAmount ? Number(minPurchaseAmount) : undefined,
          maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : undefined,
          description
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      onCouponsGenerated(data.coupons);
      
      // Clear form fields after successful generation
      setCount(1);
      setCreatedFor('');
      setDescription('');
    } catch (error) {
      console.error('Error generating coupons:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate coupons. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generate Coupons</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prefix (optional)
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. SUMMER"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suffix (optional)
            </label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 2023"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pattern (optional, currently not implemented)
          </label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Custom pattern for code generation"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">
            Custom pattern generation is not yet implemented. Codes will use prefix-RANDOM-suffix format.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Coupons
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Type
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
              <option value="free_shipping">Free Shipping</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
            </label>
            <input
              type="number"
              min="0"
              step={discountType === 'percentage' ? '1' : '0.01'}
              value={discountValue}
              onChange={(e) => setDiscountValue(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            {discountType === 'percentage' && (
              <p className="text-xs text-gray-500 mt-1">Enter percentage without % symbol (e.g. 10 for 10%)</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Uses Per Coupon
            </label>
            <input
              type="number"
              min="1"
              value={maxUses}
              onChange={(e) => setMaxUses(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valid From
            </label>
            <input
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Validity Period
            </label>
            <select
              value={validityPeriod}
              onChange={(e) => setValidityPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="1month">1 Month</option>
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="1year">1 Year</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Valid until: {validUntil}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Created For (optional)
            </label>
            <input
              type="text"
              value={createdFor}
              onChange={(e) => setCreatedFor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. customer name or campaign name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Brief description about this coupon"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPersonalized"
              checked={isPersonalized}
              onChange={(e) => setIsPersonalized(e.target.checked)}
              className="h-4 w-4 text-[#FF7200] focus:ring-[#FF7200] border-gray-300 rounded"
            />
            <label htmlFor="isPersonalized" className="ml-2 block text-sm text-gray-700">
              Is Personalized
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Purchase Amount (optional)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={minPurchaseAmount}
              onChange={(e) => setMinPurchaseAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Min order value for coupon"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Discount Amount (optional)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={maxDiscountAmount}
              onChange={(e) => setMaxDiscountAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Max discount cap for percentage"
            />
            <p className="text-xs text-gray-500 mt-1">
              Only applies to percentage discounts
            </p>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-[#FF7200] text-white py-2 px-4 rounded-md hover:bg-[#e66700] transition-colors disabled:bg-gray-400"
        >
          {isGenerating ? 'Generating...' : 'Generate Coupons'}
        </button>
      </form>
    </div>
  );
};

export default CouponGenerationForm; 