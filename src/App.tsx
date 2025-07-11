import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import AppLayout from './layouts/AppLayout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import ServicesApp from './pages/ServicesApp';
import AdServices from './pages/AdServices';
import About from './pages/About';
import AboutApp from './pages/AboutApp';
import Contact from './pages/Contact';
import ContactApp from './pages/ContactApp';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import ExpressService from './pages/Express';
import AdsExpressService from './pages/AdsExpress';
import WorkshopPartner from './pages/WorkshopPartner';
import FranchisePage from './pages/FranchisePage';
import Feedback from './pages/Feedback';
import Footer from './components/Footer';
import CustomerForm from './components/CustomerForm';
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
import { enquiryService } from './services/enquiry';

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Terms from './pages/legal/Terms';
import RefundPolicy from './pages/legal/RefundPolicy';
import ExpressServiceTnC from './pages/legal/ExpressServiceTnC';
import ExpressServiceTerms from './pages/legal/ExpressServiceTerms';

import CityPage from './pages/CityPage';

import ExpressBetaATC from './pages/ExpressBetaATC';
import ExpressBetaATCCart from './pages/ExpressBetaATCCart';
import ExpressRzpATC from './pages/ExpressRzpATC';
import ExpressRzpATCCart from './pages/ExpressRzpATCCart';
import CouponAdmin from './pages/CouponAdmin';

import CarServiceInJaipur from './pages/CarServiceInJaipur';
import CarACServiceInJaipur from './pages/CarACServiceInJaipur';
import CarDentPaintServiceInJaipur from './pages/CarDentPaintServiceInJaipur';
import CarRepairServiceInJaipur from './pages/CarRepairServiceInJaipur';
import CarMechanicShopInJaipur from './pages/CarMechanicShopInJaipur';

// New Landing Pages
import WindshieldReplacementInJaipur from './pages/WindshieldReplacementInJaipur';
import TyreWheelAlignmentInJaipur from './pages/TyreWheelAlignmentInJaipur'; 
import CarBatteryReplacementInJaipur from './pages/CarBatteryReplacementInJaipur';
import DoorstepCarServiceInJaipur from './pages/DoorstepCarServiceInJaipur'; 
import NinetyMinuteCarServiceInJaipur from './pages/90MinuteCarServiceInJaipur';

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
  const [showForm, setShowForm] = useState(false);
  const [isFormDataLoaded, setIsFormDataLoaded] = useState(false);
  
  // Global location detection for analytics and backend data collection
  // Enable auto-detect for all users across the entire website
  const { location: userLocation } = useUserLocation(true);
  
  const [hasFilledForm, setHasFilledForm] = useState(() => {
    return sessionStorage.getItem('hasFilledForm') === 'true';
  });
  const [hasShownInitialPopup, setHasShownInitialPopup] = useState(() => {
    return sessionStorage.getItem('hasShownInitialPopup') === 'true';
  });
  const [hasShownExitPopup, setHasShownExitPopup] = useState(() => {
    return sessionStorage.getItem('hasShownExitPopup') === 'true';
  });
  const [popupCount, setPopupCount] = useState(() => {
    return parseInt(sessionStorage.getItem('popupCount') || '0');
  });
  const [hasShownFirstPopup, setHasShownFirstPopup] = useState(() => {
    return sessionStorage.getItem('hasShownFirstPopup') === 'true';
  });
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

  // Function to check if we should show exit popup
  const shouldShowExitPopup = () => {
    return !hasFilledForm && 
           isFormDataLoaded && 
           !hasShownExitPopup && 
           popupCount < 2 && 
           location.pathname !== '/express' && 
           location.pathname !== '/ads-express' && 
           hasShownFirstPopup;
  };

  // Function to show exit popup
  const showExitPopup = () => {
    setShowForm(true);
    setHasShownExitPopup(true);
    const newCount = popupCount + 1;
    setPopupCount(newCount);
    sessionStorage.setItem('hasShownExitPopup', 'true');
    sessionStorage.setItem('popupCount', newCount.toString());
  };

  // Handle desktop exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && shouldShowExitPopup()) {
        showExitPopup();
      }
    };

    // Only add mouse leave detection for desktop devices
    if (window.innerWidth > 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [hasFilledForm, isFormDataLoaded, hasShownExitPopup, popupCount, location.pathname, hasShownFirstPopup]);

  // Handle mobile exit intent
  useEffect(() => {
    let lastFocusTime = Date.now();
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastFocusTime = Date.now();
      } else {
        // If user returns after at least 5 seconds and we should show popup
        if (Date.now() - lastFocusTime > 5000 && shouldShowExitPopup()) {
          showExitPopup();
        }
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldShowExitPopup()) {
        showExitPopup();
        // Modern browsers no longer show custom messages, but we'll set it anyway
        e.preventDefault();
        e.returnValue = '';
      }
    };

    // Only add mobile detection for mobile devices
    if (window.innerWidth <= 768) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [hasFilledForm, isFormDataLoaded, hasShownExitPopup, popupCount, location.pathname, hasShownFirstPopup]);

  // Handle form submission
  const handleFormSubmission = () => {
    setHasFilledForm(true);
    sessionStorage.setItem('hasFilledForm', 'true');
  };

  useEffect(() => {
    // First fetch the service types
    const fetchInitialData = async () => {
      try {
        const response = await enquiryService.getServiceTypes();
        if (response.data.length > 0) {
          setIsFormDataLoaded(true);
          // Only show initial popup if:
          // 1. Not on express page or ads-express page
          // 2. Haven't shown initial popup yet
          // 3. Haven't filled form yet
          // 4. Haven't reached popup limit
          if (location.pathname !== '/express' && 
              location.pathname !== '/ads-express' && 
              !hasShownInitialPopup && 
              !hasFilledForm && 
              popupCount < 2) {
            const timer = setTimeout(() => {
              setShowForm(true);
              setHasShownInitialPopup(true);
              setHasShownFirstPopup(true);
              const newCount = popupCount + 1;
              setPopupCount(newCount);
              sessionStorage.setItem('hasShownInitialPopup', 'true');
              sessionStorage.setItem('hasShownFirstPopup', 'true');
              sessionStorage.setItem('popupCount', newCount.toString());
            }, 45000);
            return () => clearTimeout(timer);
          }
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchInitialData();
  }, [location.pathname, hasShownInitialPopup, hasFilledForm, popupCount]);

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

  // Close form when navigating to express page
  useEffect(() => {
    if (location.pathname === '/express' || location.pathname === '/express-beta-atc' || location.pathname === '/ads-express') {
      setShowForm(false);
    }
  }, [location.pathname]);

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
              <Route path="ad-services" element={<AdServices />} />
              <Route path="about" element={<AboutApp />} />
              <Route path="contact" element={<ContactApp />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="careers" element={<Careers />} />
              <Route path="express" element={<ExpressService />} />
              <Route path="express-app" element={<ExpressApp />} />
              <Route path="workshop-partner" element={<WorkshopPartner />} />
              <Route path="franchise" element={<FranchisePage />} />
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
              
              {/* City Routes */}
              <Route path="city/:cityName" element={<CityPage />} />
              
              {/* Service Landing Pages */}
              <Route path="car-service-in-jaipur" element={<CarServiceInJaipur />} />
              <Route path="car-ac-service-in-jaipur" element={<CarACServiceInJaipur />} />
              <Route path="car-dent-paint-service-in-jaipur" element={<CarDentPaintServiceInJaipur />} />
              <Route path="car-repair-service-in-jaipur" element={<CarRepairServiceInJaipur />} />
              <Route path="car-mechanic-shop-in-jaipur" element={<CarMechanicShopInJaipur />} />
              <Route path="windshield-replacement-in-jaipur" element={<WindshieldReplacementInJaipur />} />
              <Route path="tyre-wheel-alignment-in-jaipur" element={<TyreWheelAlignmentInJaipur />} />
              <Route path="car-battery-replacement-in-jaipur" element={<CarBatteryReplacementInJaipur />} />
              <Route path="doorstep-car-service-in-jaipur" element={<DoorstepCarServiceInJaipur />} />
              <Route path="90-minute-car-service-in-jaipur" element={<NinetyMinuteCarServiceInJaipur />} />
            </Route>

            {/* Routes that need a minimal shell */}
            <Route path="/express-beta-atc" element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <ExpressBetaATC />
                <Footer />
              </div>
            } />
            <Route path="/express-beta-atc/cart" element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <ExpressBetaATCCart />
                <Footer />
              </div>
            } />
            <Route path="/express-rzp-atc" element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <ExpressRzpATC />
                <Footer />
              </div>
            } />
            <Route path="/express-rzp-atc/cart" element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <ExpressRzpATCCart />
                <Footer />
              </div>
            } />
            <Route path="/ads-express" element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <AdsExpressService />
                <Footer />
              </div>
            } />

            {/* Doorstep Services Routes - Full screen app-like experience */}
            <Route path="/doorstep-services" element={<DoorstepServicesIndex />} />
            <Route path="/doorstep-services/category/:categoryId" element={<CategoryPage />} />
            <Route path="/doorstep-services/cart" element={<CartPage />} />

            {/* Admin Routes */}
            <Route path="/coupon-admin" element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <CouponAdmin />
                <Footer />
              </div>
            } />
          </Routes>
        </AnimatePresence>
        {isFormDataLoaded && (
          <CustomerForm 
            isOpen={showForm} 
            onClose={() => setShowForm(false)}
            onSubmitSuccess={handleFormSubmission}
          />
        )}
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
            <AnimatePresence mode="wait">
              <AnalyticsWrapper>
                <AppContent />
              </AnalyticsWrapper>
            </AnimatePresence>
          </Router>
        </CartProvider>
      </UserProvider>
    </HelmetProvider>
  );
};

export default App;