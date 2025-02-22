import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Footer from './components/Footer';
import CustomerForm from './components/CustomerForm';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import { useAnalytics } from './hooks/useAnalytics';
import { Analytics } from "@vercel/analytics/react";
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

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [isFormDataLoaded, setIsFormDataLoaded] = useState(false);

  useAnalytics();

  useEffect(() => {
    // First fetch the service types
    const fetchInitialData = async () => {
      try {
        const response = await enquiryService.getServiceTypes();
        if (response.data.length > 0) {
          setIsFormDataLoaded(true);
          // Only show form after data is loaded
          const timer = setTimeout(() => {
            setShowForm(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

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

  return (
    <HelmetProvider>
      <Router>
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
              </Routes>
            </AnimatePresence>
            <Footer />
            {isFormDataLoaded && (
              <CustomerForm 
                isOpen={showForm} 
                onClose={() => setShowForm(false)} 
              />
            )}
            <Suspense fallback={<div>Loading...</div>}>
              <WhatsAppButton />
            </Suspense>
          </div>
        </AnalyticsWrapper>
        <Analytics />
      </Router>
    </HelmetProvider>
  );
};

export default App;