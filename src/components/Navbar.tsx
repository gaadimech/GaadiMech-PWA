import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MobileNumberModal from './MobileNumberModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const handleBookNow = () => {
    setShowMobileModal(true);
    setIsOpen(false);
  };

  const handleMobileNumberSubmit = (mobileNumber: string) => {
    // Store the mobile number in session storage
    sessionStorage.setItem('userMobileNumber', mobileNumber);
    // Navigate to express service
    window.location.href = '/express-app';
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
              <img
                src="/images/logo1.png"
                alt="GaadiMech"
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/' ? 'text-[#FF7200]' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={handleLinkClick}
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/services' ? 'text-[#FF7200]' : ''}`}
            >
              Services
            </Link>
            <Link
              to="/express"
              onClick={handleLinkClick}
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/express' || location.pathname === '/express-app' ? 'text-[#FF7200]' : ''}`}
            >
              Express
            </Link>
            <Link
              to="/support"
              onClick={handleLinkClick}
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/support' ? 'text-[#FF7200]' : ''}`}
            >
              Support
            </Link>
            <button
              onClick={handleBookNow}
              className="bg-[#FF7200] text-white px-6 py-2 rounded-md hover:bg-[#0e5aa8] transition-colors"
            >
              Book Now
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#FF7200] focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                onClick={handleLinkClick}
                className="block px-3 py-2 text-gray-700 hover:text-[#FF7200]"
              >
                Home
              </Link>
              <Link 
                to="/services" 
                onClick={handleLinkClick}
                className="block px-3 py-2 text-gray-700 hover:text-[#FF7200]"
              >
                Services
              </Link>
              <Link 
                to="/express" 
                onClick={handleLinkClick}
                className="block px-3 py-2 text-gray-700 hover:text-[#FF7200]"
              >
                Express
              </Link>
              <Link 
                to="/support" 
                onClick={handleLinkClick}
                className="block px-3 py-2 text-gray-700 hover:text-[#FF7200]"
              >
                Support
              </Link>
              <button
                onClick={handleBookNow}
                className="w-full bg-[#FF7200] text-white px-6 py-2 rounded-md hover:bg-[#0e5aa8] transition-colors"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Number Modal */}
      <MobileNumberModal
        isOpen={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        onSubmit={handleMobileNumberSubmit}
        serviceName="Express Car Service"
      />
    </nav>
  );
};

export default Navbar;