import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import CouponGenerationForm from '../components/CouponGenerationForm';
import CouponsList from '../components/CouponsList';
import CouponStats from '../components/CouponStats';
import { Search } from 'lucide-react';

// Define coupon type
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

// Define stats type
interface CouponStats {
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
}

const defaultStats: CouponStats = {
  totalCoupons: 0,
  activeCoupons: 0,
  expiredCoupons: 0,
  totalUses: 0,
  usageByType: {
    percentage: 0,
    fixed: 0,
    free_shipping: 0
  },
  mostUsedCoupons: []
};

const CouponAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [generatedCoupons, setGeneratedCoupons] = useState<Coupon[]>([]);
  const [allCoupons, setAllCoupons] = useState<Coupon[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
  const [stats, setStats] = useState<CouponStats>(defaultStats);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Authentication function
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    
          // SECURITY: Use environment variables for credentials
      const expectedUser = import.meta.env.VITE_ADMIN_USER || 'admin-coupon';
      const expectedPass = import.meta.env.VITE_ADMIN_PASS || 'admin@coupon';
      
      if (username === expectedUser && password === expectedPass) {
      setIsAuthenticated(true);
      setAuthError('');
      // Store authentication in session storage so it persists on page refresh
      sessionStorage.setItem('couponAdminAuth', 'true');
    } else {
      setAuthError('Invalid credentials');
    }
  };
  
  // Check if user is already authenticated (from session storage)
  useEffect(() => {
    const storedAuth = sessionStorage.getItem('couponAdminAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch all coupons when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllCoupons();
      fetchCouponStats();
    }
  }, [isAuthenticated]);
  
  // Filter coupons based on search query and filter type
  useEffect(() => {
    if (allCoupons.length > 0) {
      let filtered = [...allCoupons];
      
      // Apply search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(coupon => 
          coupon.code.toLowerCase().includes(query) || 
          (coupon.createdFor && coupon.createdFor.toLowerCase().includes(query)) ||
          (coupon.description && coupon.description.toLowerCase().includes(query))
        );
      }
      
      // Apply status filter
      if (filterType !== 'all') {
        const now = new Date();
        
        if (filterType === 'active') {
          filtered = filtered.filter(coupon => 
            coupon.isActive && 
            new Date(coupon.validUntil) >= now &&
            coupon.currentUses < coupon.maxUses
          );
        } else if (filterType === 'expired') {
          filtered = filtered.filter(coupon => 
            new Date(coupon.validUntil) < now ||
            coupon.currentUses >= coupon.maxUses ||
            !coupon.isActive
          );
        } else if (filterType === 'percentage' || filterType === 'fixed' || filterType === 'free_shipping') {
          filtered = filtered.filter(coupon => coupon.discountType === filterType);
        }
      }
      
      setFilteredCoupons(filtered);
    } else {
      setFilteredCoupons([]);
    }
  }, [allCoupons, searchQuery, filterType]);
  
  // Fetch all coupons
  const fetchAllCoupons = async () => {
    setIsLoadingCoupons(true);
    
    try {
      // SECURITY: Get credentials from environment variables
      const adminUser = import.meta.env.VITE_ADMIN_USER;
      const adminPass = import.meta.env.VITE_ADMIN_PASS;
      
      if (!adminUser || !adminPass) {
        throw new Error('Admin credentials not configured. Contact system administrator.');
      }
      
      const basicAuthCredentials = btoa(`${adminUser}:${adminPass}`);
      
      const response = await fetch('/api/coupons', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuthCredentials}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch coupons');
      }
      
      const data = await response.json();
      setAllCoupons(data.data || []);
      setFilteredCoupons(data.data || []);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setIsLoadingCoupons(false);
    }
  };
  
  // Generate real-time stats from coupon data
  const generateRealTimeStats = (coupons: Coupon[]): CouponStats => {
    const now = new Date();
    
    const activeCoupons = coupons.filter(coupon => 
      coupon.isActive && 
      new Date(coupon.validUntil) >= now &&
      coupon.currentUses < coupon.maxUses
    ).length;
    
    const expiredCoupons = coupons.filter(coupon => 
      !coupon.isActive || 
      new Date(coupon.validUntil) < now ||
      coupon.currentUses >= coupon.maxUses
    ).length;
    
    const totalUses = coupons.reduce((sum, coupon) => sum + coupon.currentUses, 0);
    
    const usageByType = {
      percentage: coupons.filter(c => c.discountType === 'percentage')
                    .reduce((sum, coupon) => sum + coupon.currentUses, 0),
      fixed: coupons.filter(c => c.discountType === 'fixed')
                .reduce((sum, coupon) => sum + coupon.currentUses, 0),
      free_shipping: coupons.filter(c => c.discountType === 'free_shipping')
                      .reduce((sum, coupon) => sum + coupon.currentUses, 0)
    };
    
    // Sort coupons by uses and get top 5
    const mostUsedCoupons = [...coupons]
      .sort((a, b) => b.currentUses - a.currentUses)
      .slice(0, 5)
      .map(coupon => ({
        code: coupon.code,
        uses: coupon.currentUses,
        maxUses: coupon.maxUses,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue
      }));
    
    return {
      totalCoupons: coupons.length,
      activeCoupons,
      expiredCoupons,
      totalUses,
      usageByType,
      mostUsedCoupons
    };
  };
  
  // Fetch coupon statistics
  const fetchCouponStats = async () => {
    try {
      setIsLoadingStats(true);
      // Use the new public endpoint that doesn't require authentication
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1337'}/api/coupons/public-stats`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        console.error('Failed to fetch stats:', response.status);
        // Generate stats from local data as fallback
        if (allCoupons.length > 0) {
          const generatedStats = generateRealTimeStats(allCoupons);
          setStats(generatedStats);
        }
        throw new Error('Failed to fetch coupon statistics');
      }
      
      const data = await response.json();
      
      // Merge fetched data with real-time calculations if needed
      if (allCoupons.length > 0) {
        const generatedStats = generateRealTimeStats(allCoupons);
        // Use API data if available, otherwise use generated data
        setStats({
          ...data,
          // Ensure we have the most up-to-date stats
          totalCoupons: allCoupons.length,
          totalUses: generatedStats.totalUses,
          usageByType: generatedStats.usageByType,
          activeCoupons: generatedStats.activeCoupons,
          expiredCoupons: generatedStats.expiredCoupons,
          mostUsedCoupons: generatedStats.mostUsedCoupons
        });
      } else {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching coupon statistics:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };
  
  // Handle new coupons generated
  const handleCouponsGenerated = (coupons: Coupon[]) => {
    setGeneratedCoupons(coupons);
    fetchAllCoupons(); // Refresh the list
    fetchCouponStats(); // Refresh stats
  };
  
  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle filter type change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };
  
  // Clear search and filters
  const clearFilters = () => {
    setSearchQuery('');
    setFilterType('all');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Internal admin page – SEO handled centrally (noindex) */}
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          // Authentication Form
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Coupon Admin Login</h1>
            
            {authError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {authError}
              </div>
            )}
            
            <form onSubmit={handleAuthenticate}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#FF7200] text-white py-2 px-4 rounded-md hover:bg-[#e66700] transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          // Admin Dashboard
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Coupon Management Dashboard</h1>
              
              <button
                onClick={() => {
                  sessionStorage.removeItem('couponAdminAuth');
                  setIsAuthenticated(false);
                }}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Logout
              </button>
            </div>
            
            <div className="mb-8">
              <CouponStats stats={stats} isLoading={isLoadingStats} />
            </div>
            
            <div className="mb-6">
              <Tabs defaultValue="generate" onValueChange={(value) => setActiveTab(value)}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="generate">Generate Coupons</TabsTrigger>
                  <TabsTrigger value="list">All Coupons</TabsTrigger>
                </TabsList>
                
                <TabsContent value="generate" className="space-y-6">
                  <CouponGenerationForm onCouponsGenerated={handleCouponsGenerated} />
                  
                  {generatedCoupons.length > 0 && (
                    <CouponsList 
                      coupons={generatedCoupons} 
                      title="Recently Generated Coupons" 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="list" className="space-y-4">
                  {/* Search and Filter Controls */}
                  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-grow relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search by code, description, or created for..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
                        />
                      </div>
                      
                      <div className="w-full md:w-48">
                        <select
                          value={filterType}
                          onChange={handleFilterChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
                        >
                          <option value="all">All Coupons</option>
                          <option value="active">Active</option>
                          <option value="expired">Expired/Inactive</option>
                          <option value="percentage">Percentage Discount</option>
                          <option value="fixed">Fixed Amount</option>
                          <option value="free_shipping">Free Shipping</option>
                        </select>
                      </div>
                      
                      <button
                        onClick={clearFilters}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-500">
                      Showing {filteredCoupons.length} of {allCoupons.length} coupons
                    </div>
                  </div>
                  
                  <CouponsList 
                    coupons={filteredCoupons} 
                    title="All Coupons" 
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponAdmin; 