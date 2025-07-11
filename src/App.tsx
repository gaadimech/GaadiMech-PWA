import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import AppLayout from './layouts/AppLayout';
import Navbar from './components/Navbar';
import Services from './pages/Services';
import ServicesApp from './pages/ServicesApp';
import ExpressService from './pages/Express';
import Feedback from './pages/Feedback';
import Footer from './components/Footer';
// import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
// import { useAnalytics } from './hooks/useAnalytics';
// import { useMetaAnalytics } from './hooks/useMetaAnalytics';
// import './utils/testPageView'; // Import PageView test utilities
import { useLocation as useUserLocation } from './hooks/useLocation';

// Service Pages
import PeriodicService from './pages/services/PeriodicService';
import ACService from './pages/services/ACService';
import CarSpaService from './pages/services/CarSpaService';
import DentingService from './pages/services/DentingService';
import BatteryService from './pages/services/BatteryService';
import WindshieldService from './pages/services/WindshieldService';
import DetailingService from './pages/services/DetailingService';
import TyreService from './pages/services/TyreService';
import SEOContent from './components/SEOContent';
import ScrollToTop from './components/ScrollToTop';

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Terms from './pages/legal/Terms';
import RefundPolicy from './pages/legal/RefundPolicy';
import ExpressServiceTnC from './pages/legal/ExpressServiceTnC';
import ExpressServiceTerms from './pages/legal/ExpressServiceTerms';

import HomepageAppV0 from './pages/HomepageAppV0';
import ExpressApp from './pages/ExpressApp';

// Doorstep Services Components
import DoorstepServicesIndex from './pages-doorstep/index';
import CategoryPage from './pages-doorstep/CategoryPage';
import CartPage from './components-doorstep/CartPage';

// Auth Pages
import Login from './pages/auth/Login';
import VerifyOTP from './pages/auth/VerifyOTP';
import CarSelection from './pages/auth/CarSelection';

// Profile Pages
import ProfileMain from './pages/profile/ProfileMain';
import MyCars from './pages/profile/MyCars';
import ProfileEdit from './pages/profile/ProfileEdit';
import MyOrders from './pages/profile/MyOrders';
import MyAddresses from './pages/profile/MyAddresses';

// Support Page
import Support from './pages/Support';

// Cart Page
import Cart from './pages/Cart';

// Booking Details Page
import BookingDetails from './pages/BookingDetails';

// Payment Options Page
import PaymentOptions from './pages/PaymentOptions';

// Payment Processing Page
import PaymentProcessing from './pages/PaymentProcessing';

// Order Success Page
import OrderSuccess from './pages/OrderSuccess';

// Order Failed Page
import OrderFailed from './pages/OrderFailed';

// Order Details Page
import OrderDetails from './pages/OrderDetails';

Modal.setAppElement('#root');

// Create a new component to use the hook
const AnalyticsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useGoogleAnalytics();
  // useMetaAnalytics();
  return <>{children}</>;
};

// Create a wrapper component to handle location-based logic
const AppContent = () => {
  // Global location detection for analytics and backend data collection
  // Enable auto-detect for all users across the entire website
  const { location: userLocation } = useUserLocation(true);
  
  const location = useLocation();

  // useAnalytics();

  // Log location data for debugging (only in development)
  useEffect(() => {
    if (import.meta.env.DEV && userLocation) {
      console.log('🌍 Global location detected:', {
        city: userLocation.city,
        state: userLocation.state,
        country: userLocation.country,
        source: userLocation.source,
        coordinates: userLocation.latitude && userLocation.longitude 
          ? `${userLocation.latitude}, ${userLocation.longitude}` 
          : 'Not available'
      });
    }
  }, [userLocation]);

  useEffect(() => {
    // Remove loading spinner and show content
    const root = document.getElementById('root');
    if (root) {
      root.classList.add('loaded');
    }
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
      spinner.remove();
    }
  }, []);

  // Add check for doorstep service pages
  const isDoorstepServicePage = location.pathname.startsWith('/doorstep-services');

  // Define which service pages should have app-like design (no navbar)
  const appLikeServicePages = ['/services/periodic', '/services/ac', '/services/denting', '/services/car-spa', '/services/detailing', '/services/tyre', '/services/battery', '/services/windshield'];
  const isAppLikeServicePage = appLikeServicePages.includes(location.pathname);

  // Only hide navbar on category, cart pages, and specific app-like service pages
  const shouldHideNavbar = location.pathname.startsWith('/doorstep-services/category') || 
                          location.pathname.startsWith('/doorstep-services/cart') ||
                          isAppLikeServicePage;

  return (
    <>
      <SEOContent />
      <AnalyticsWrapper>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify-otp" element={<VerifyOTP />} />
            <Route path="/auth/car-selection" element={<CarSelection />} />

            {/* Support Route */}
            <Route path="/support" element={<Support />} />

            {/* Routes that need the full app shell */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomepageAppV0 />} />
              <Route path="services" element={<ServicesApp />} />
              <Route path="express" element={<ExpressService />} />
              <Route path="express-app" element={<ExpressApp />} />
              <Route path="feedback" element={<Feedback />} />
              
              {/* Cart Flow Routes */}
              <Route path="cart" element={<Cart />} />
              <Route path="booking-details" element={<BookingDetails />} />
              <Route path="payment-options" element={<PaymentOptions />} />
              <Route path="payment-processing" element={<PaymentProcessing />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="order-failed" element={<OrderFailed />} />
              <Route path="order-details" element={<OrderDetails />} />
              
              {/* Profile Routes */}
              <Route path="profile" element={<ProfileMain />} />
              <Route path="profile/edit" element={<ProfileEdit />} />
              <Route path="profile/cars" element={<MyCars />} />
              <Route path="profile/orders" element={<MyOrders />} />
              <Route path="profile/addresses" element={<MyAddresses />} />
              
              {/* Service Routes */}
              <Route path="services/periodic" element={<PeriodicService />} />
              <Route path="services/ac" element={<ACService />} />
              <Route path="services/car-spa" element={<CarSpaService />} />
              <Route path="services/denting" element={<DentingService />} />
              <Route path="services/battery" element={<BatteryService />} />
              <Route path="services/windshield" element={<WindshieldService />} />
              <Route path="services/detailing" element={<DetailingService />} />
              <Route path="services/tyre" element={<TyreService />} />
              
              {/* Legal Routes */}
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
              <Route path="express-service-tnc" element={<ExpressServiceTnC />} />
              <Route path="express-service-terms" element={<ExpressServiceTerms />} />
            </Route>

            {/* Doorstep Services Routes - Full screen app-like experience */}
            <Route path="/doorstep-services" element={<DoorstepServicesIndex />} />
            <Route path="/doorstep-services/category/:categoryId" element={<CategoryPage />} />
            <Route path="/doorstep-services/cart" element={<CartPage />} />

            {/* Legacy Services Route - Keep for compatibility */}
            <Route path="/services-old" element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <Services />
                <Footer />
              </div>
            } />
          </Routes>
        </AnimatePresence>
      </AnalyticsWrapper>
    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <UserProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </CartProvider>
      </UserProvider>
    </HelmetProvider>
  );
};

export default App;