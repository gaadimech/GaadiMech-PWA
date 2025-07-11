import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import Footer from '../components/Footer';
import InstallPrompt from '../components/InstallPrompt';
import PageTransition from '../components/PageTransition';
import OfflineIndicator from '../components/OfflineIndicator';
import StickyCartBanner from '../components/StickyCartBanner';
import { useCart } from '../contexts/CartContext';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { cartSummary } = useCart();

  // Determine if cart banner should be shown (same logic as in StickyCartBanner)
  const shouldShowCartBanner = !cartSummary.isEmpty && 
                              location.pathname !== '/cart' && 
                              location.pathname !== '/booking-details' &&
                              !location.pathname.startsWith('/payment') &&
                              !location.pathname.startsWith('/order') &&
                              !location.pathname.startsWith('/auth/');

  // Dynamic bottom padding based on cart banner presence
  // Mobile: BottomNav (64px) + CartBanner (~80px) = ~144px (pb-36 = 144px)
  // Desktop: No bottom nav, small padding
  const bottomPadding = shouldShowCartBanner 
    ? 'pb-36 lg:pb-4' // Extra space when cart banner is present
    : 'pb-20 lg:pb-0'; // Normal space for just bottom navigation

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Desktop Navbar - hidden on mobile */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      
      {/* Main Content Area */}
      <main className={`flex-1 lg:pt-0 ${bottomPadding}`}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      
      {/* Footer - hidden on mobile to save space */}
      <div className="hidden lg:block">
        <Footer />
      </div>
      
      {/* Bottom Navigation - mobile only */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
      
      {/* Install Prompt */}
      <InstallPrompt />
      
      {/* Offline Indicator */}
      <OfflineIndicator />
      
      {/* Sticky Cart Banner */}
      <StickyCartBanner />
    </div>
  );
};

export default AppLayout; 