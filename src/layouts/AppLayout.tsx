import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import Footer from '../components/Footer';
import InstallPrompt from '../components/InstallPrompt';
import PageTransition from '../components/PageTransition';
import OfflineIndicator from '../components/OfflineIndicator';
import StickyCartBanner from '../components/StickyCartBanner';

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Desktop Navbar - hidden on mobile */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 lg:pt-0 pb-20 lg:pb-0">
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