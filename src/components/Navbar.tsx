import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleBookNow = () => {
    setIsOpen(false); // Close menu when Book Now is clicked
    window.open(`https://wa.me/917300042410`, '_blank');
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close menu when any link is clicked
    window.scrollTo(0, 0); // Scroll to top when link is clicked
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=186,fit=crop,q=95/Y4Lpj7xVzXTezB99/gaadimech-no-background-m6LwGQnga1sp6V1n.png"
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
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/express' ? 'text-[#FF7200]' : ''}`}
            >
              Express
            </Link>
            <Link
              to="/about"
              onClick={handleLinkClick}
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/about' ? 'text-[#FF7200]' : ''}`}
            >
              About
            </Link>
            <Link
              to="/blog"
              onClick={handleLinkClick}
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/blog' ? 'text-[#FF7200]' : ''}`}
            >
              Blog
            </Link>
            <Link
              to="/careers"
              onClick={handleLinkClick}
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/careers' ? 'text-[#FF7200]' : ''}`}
            >
              Careers
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className={`text-gray-700 hover:text-[#FF7200] ${location.pathname === '/contact' ? 'text-[#FF7200]' : ''}`}
            >
              Contact
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookNow}
              className="bg-[#FF7200] text-white px-6 py-2 rounded-md hover:bg-[#0e5aa8] transition-colors"
            >
              Book Now
            </motion.button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
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
              to="/about" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-gray-700 hover:text-[#FF7200]"
            >
              About
            </Link>
            <Link 
              to="/blog" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-gray-700 hover:text-[#FF7200]"
            >
              Blog
            </Link>
            <Link 
              to="/careers" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-gray-700 hover:text-[#FF7200]"
            >
              Careers
            </Link>
            <Link 
              to="/contact" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-gray-700 hover:text-[#FF7200]"
            >
              Contact
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
    </nav>
  );
};

export default Navbar;