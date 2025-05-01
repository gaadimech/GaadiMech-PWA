import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'react-feather';

interface CategorySection {
  title: string;
  links: Array<{
    text: string;
    url: string;
  }>;
}

interface ServiceCategory {
  title: string;
  services: string[];
}

const categories: CategorySection[] = [
  {
    title: "Popular Searches",
    links: [
      { text: "Car Mechanic Near Me", url: "/services" },
      { text: "Car Service Center Near Me", url: "/services" },
      { text: "Car AC Service Near Me", url: "/services#car-ac-service" },
      { text: "Car Repair Near Me", url: "/services" },
      { text: "Auto Repair Shop Near Me", url: "/services" }
    ]
  },
  {
    title: "Our Services",
    links: [
      { text: "Periodic Car Service", url: "/services/periodic" },
      { text: "Car AC Repair", url: "/services/ac" },
      { text: "Denting & Painting", url: "/services/denting" },
      { text: "Car Detailing", url: "/services/detailing" },
      { text: "Car Inspection", url: "/services" }
    ]
  },
  {
    title: "Service Locations",
    links: [
      { text: "Car Service in Delhi", url: "/delhi" },
      { text: "Car Service in Mumbai", url: "/mumbai" },
      { text: "Car Service in Bangalore", url: "/bangalore" },
      { text: "Car Service in Hyderabad", url: "/hyderabad" },
      { text: "Car Service in Chennai", url: "/chennai" },
      { text: "Car Service in Jaipur", url: "/car-service-in-jaipur" },
      { text: "Car Repair Service in Jaipur", url: "/car-repair-service-in-jaipur" },
      { text: "Car Mechanic Shop in Jaipur", url: "/car-mechanic-shop-in-jaipur" },
      { text: "Car AC Service in Jaipur", url: "/car-ac-service-in-jaipur" },
      { text: "Car Dent Paint Service in Jaipur", url: "/car-dent-paint-service-in-jaipur" }
    ]
  }
];

const seoCategories: ServiceCategory[] = [
  {
    title: "Car Repair & Maintenance",
    services: [
      "Car Repair Services",
      "Car Maintenance Experts",
      "Auto Repair Shop",
      "Vehicle Repair Services",
      "Car Service Center",
      "Professional Auto Mechanics",
      "Affordable Car Repairs",
      "Local Car Repair Shop"
    ]
  },
  {
    title: "Specialized Services",
    services: [
      "Car AC Service",
      "Car AC Repair",
      "Brake Repair Services",
      "Engine Tuning",
      "Oil Change Services",
      "Transmission Services",
      "Battery Replacement",
      "Tire Alignment"
    ]
  },
  {
    title: "Additional Services",
    services: [
      "Vehicle Diagnostics",
      "Suspension Repair",
      "Wheel Balancing",
      "Exhaust System Repair",
      "Clutch Repair Services",
      "Check Engine Diagnostics",
      "Emission Testing",
      "Timing Belt Replacement"
    ]
  }
];

const CategoryAccordion: React.FC<{
  section: CategorySection;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ section, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 px-6 flex justify-between items-center text-left"
        onClick={onToggle}
      >
        <span className="text-sm font-medium text-gray-700">{section.title}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-500" />
        ) : (
          <ChevronDown size={16} className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <ul className="space-y-2">
            {section.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="text-xs text-gray-600 hover:text-gray-900"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-[#FF7200] mb-4">GaadiMech</h3>
            <p className="text-gray-400 mb-4">
              Looking for a reliable car mechanic near you? GaadiMech is your trusted car repair partner, 
              bringing professional auto mechanics right to your doorstep. We offer comprehensive car repair 
              and maintenance services across major cities in India, making quality car care accessible and convenient.
            </p>
            <p className="text-gray-400">
              From routine maintenance to complex repairs, our certified car mechanics ensure your vehicle 
              gets the expert care it deserves, wherever you are. Find a car mechanic near you today!
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Home</Link></li>
              <li><Link to="/services" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Services</Link></li>
              <li><Link to="/contact" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Contact</Link></li>
              <li><Link to="/about" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">About</Link></li>
              <li><Link to="/blog" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Blog</Link></li>
              <li><Link to="/workshop-partner" onClick={handleLinkClick} className="text-gray-400 hover:text-[#FF7200]">Partner With Us</Link></li>
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

        {/* SEO Footer Section - Desktop Only */}
        <div className="hidden md:block border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-3 gap-8 text-xs text-gray-500">
            {seoCategories.map((category, idx) => (
              <div key={idx}>
                <h5 className="font-medium mb-3">{category.title}</h5>
                <ul className="space-y-1">
                  {category.services.map((service, serviceIdx) => (
                    <li key={serviceIdx} className="hover:text-gray-400">
                      <Link to="/services" onClick={handleLinkClick}>
                        {service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-8 text-center">
            Find the best car mechanic near me, auto repair shop near me, car service center near me, and car AC service near me. 
            GaadiMech provides professional automotive mechanics and car repair services across India.
          </p>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GaadiMech. All rights reserved.</p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="max-w-7xl mx-auto">
          {categories.map((section) => (
            <CategoryAccordion
              key={section.title}
              section={section}
              isOpen={openSections[section.title] || false}
              onToggle={() => toggleSection(section.title)}
            />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {categories.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className="text-xs text-gray-600 hover:text-gray-900"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;