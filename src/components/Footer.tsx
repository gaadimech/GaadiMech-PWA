import React from 'react';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-[#FF7200] mb-4">GaadiMech</h3>
            <p className="text-gray-400">
              Your trusted partner for professional car repair and maintenance services.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-[#FF7200]">Home</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#FF7200]">Services</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-[#FF7200]">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[#FF7200]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">General Repair</li>
              <li className="text-gray-400">AC Service</li>
              <li className="text-gray-400">Denting & Painting</li>
              <li className="text-gray-400">Emergency Service</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
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