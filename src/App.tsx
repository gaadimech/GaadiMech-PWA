import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import ExpressService from './pages/Express';
import WorkshopPartner from './pages/WorkshopPartner';
import Footer from './components/Footer';
import CustomerForm from './components/CustomerForm';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import { useAnalytics } from './hooks/useAnalytics';

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
import { enquiryService } from './services/enquiry';

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Terms from './pages/legal/Terms';
import RefundPolicy from './pages/legal/RefundPolicy';

Modal.setAppElement('#root');

// Create a new component to use the hook
const AnalyticsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useGoogleAnalytics();
  return <>{children}</>;
};

const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
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
            </Routes>
          </AnimatePresence>
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