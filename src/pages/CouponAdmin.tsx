import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import CouponGenerationForm from '../components/CouponGenerationForm';
import CouponsList from '../components/CouponsList';
import CouponStats from '../components/CouponStats';

const defaultStats = {
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
  
  const [generatedCoupons, setGeneratedCoupons] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [stats, setStats] = useState(defaultStats);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  
  // Authentication function
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'admin-coupon' && password === 'admin@coupon') {
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
  
  // Fetch all coupons
  const fetchAllCoupons = async () => {
    try {
      setIsLoadingCoupons(true);
      const basicAuthCredentials = btoa('admin-coupon:admin@coupon');
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1337'}/api/coupons`, {
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
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setIsLoadingCoupons(false);
    }
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
        throw new Error('Failed to fetch coupon statistics');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching coupon statistics:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };
  
  // Handle new coupons generated
  const handleCouponsGenerated = (coupons) => {
    setGeneratedCoupons(coupons);
    fetchAllCoupons(); // Refresh the list
    fetchCouponStats(); // Refresh stats
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Coupon Admin | GaadiMech</title>
      </Helmet>
      
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
                  <CouponsList 
                    coupons={allCoupons} 
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