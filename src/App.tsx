import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomerForm from './components/CustomerForm';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import { useAnalytics } from './hooks/useAnalytics';
import SeoKeywords from './components/SeoKeywords';
import SEOContent from './components/SEOContent';
import { enquiryService } from './services/enquiry';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const AdServices = lazy(() => import('./pages/AdServices'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Careers = lazy(() => import('./pages/Careers'));
const ExpressService = lazy(() => import('./pages/Express'));
const WorkshopPartner = lazy(() => import('./pages/WorkshopPartner'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));

// Lazy load service pages
const PeriodicService = lazy(() => import('./pages/services/PeriodicService'));
const ACService = lazy(() => import('./pages/services/ACService'));
const CarSpaService = lazy(() => import('./pages/services/CarSpaService'));
const DentingService = lazy(() => import('./pages/services/DentingService'));
const BatteryService = lazy(() => import('./pages/services/BatteryService'));
const WindshieldService = lazy(() => import('./pages/services/WindshieldService'));
const DetailingService = lazy(() => import('./pages/services/DetailingService'));
const TyreService = lazy(() => import('./pages/services/TyreService'));

// Lazy load legal pages
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const RefundPolicy = lazy(() => import('./pages/legal/RefundPolicy'));
const CityPage = lazy(() => import('./pages/CityPage'));

Modal.setAppElement('#root');

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Create a new component to use the hook
const AnalyticsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useGoogleAnalytics();
  return <>{children}</>;
};

// Create a wrapper component to handle location-based logic
const AppContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [isFormDataLoaded, setIsFormDataLoaded] = useState(false);
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

  useAnalytics();

  // Function to check if we should show exit popup
  const shouldShowExitPopup = () => {
    return !hasFilledForm && 
           isFormDataLoaded && 
           !hasShownExitPopup && 
           popupCount < 2 && 
           location.pathname !== '/express' && 
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
          // 1. Not on express page
          // 2. Haven't shown initial popup yet
          // 3. Haven't filled form yet
          // 4. Haven't reached popup limit
          if (location.pathname !== '/express' && !hasShownInitialPopup && !hasFilledForm && popupCount < 2) {
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
    if (location.pathname === '/express') {
      setShowForm(false);
    }
  }, [location.pathname]);

  return (
    <>
      <SEOContent />
      <AnalyticsWrapper>
        <div className="min-h-screen bg-white">
          <Navbar />
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/ad-services" element={<AdServices />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/express" element={<ExpressService />} />
                
                {/* Service Routes */}
                <Route path="/services/periodic" element={<PeriodicService />} />
                <Route path="/services/ac" element={<ACService />} />
                <Route path="/services/car-spa" element={<CarSpaService />} />
                <Route path="/services/denting" element={<DentingService />} />
                <Route path="/services/battery" element={<BatteryService />} />
                <Route path="/services/windshield" element={<WindshieldService />} />
                <Route path="/services/detailing" element={<DetailingService />} />
                <Route path="/services/tyre" element={<TyreService />} />
                
                {/* Legal Routes */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/workshop-partner" element={<WorkshopPartner />} />
                
                {/* City Routes */}
                <Route path="/:city" element={<CityPage />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
          <SeoKeywords />
          <Footer />
          {isFormDataLoaded && (
            <CustomerForm 
              isOpen={showForm} 
              onClose={() => setShowForm(false)}
              onSubmitSuccess={handleFormSubmission}
            />
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <WhatsAppButton />
          </Suspense>
        </div>
      </AnalyticsWrapper>
    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App;