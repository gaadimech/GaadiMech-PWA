import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const location = useLocation();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-[#FF7200] mb-4">GaadiMech</h3>
            <p className="text-gray-400 mb-4">
              Looking for a reliable car service near you? GaadiMech is your trusted car repair partner, 
              bringing professional auto mechanics right to your doorstep. We offer comprehensive car repair 
              and maintenance services across major cities in India, making quality car care accessible and convenient.
            </p>
            <p className="text-gray-400">
              From routine maintenance to complex repairs, our certified car mechanics ensure your vehicle 
              gets the expert care it deserves, wherever you are.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Home</Link></li>
              <li><Link to="/services" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Services</Link></li>
              <li><Link to="/about" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">About</Link></li>
              <li><Link to="/contact" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services#periodic-maintenance" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Periodic Maintenance</Link></li>
              <li><Link to="/services#car-ac-service" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Car AC Service</Link></li>
              <li><Link to="/services#car-denting-painting" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Denting & Painting</Link></li>
              <li><Link to="/services#car-detailing" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Car Detailing</Link></li>
              <li><Link to="/services#car-inspection" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Car Inspection</Link></li>
              <li><Link to="/services#wheel-care" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Wheel Care</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Privacy Policy</Link></li>
              <li><Link to="/terms" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Refund Policy</Link></li>
            </ul>
            <h4 className="text-lg font-semibold mb-4 mt-6">Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/GaadiMech.India/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#FF7200]"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.instagram.com/gaadimech/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#FF7200]"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://www.youtube.com/@GaadiMech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#FF7200]"
              >
                <Youtube size={24} />
              </a>
              <a 
                href="mailto:contact@gaadimech.com" 
                className="text-gray-400 hover:text-[#FF7200]"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GaadiMech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;