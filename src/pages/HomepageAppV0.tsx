import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Car } from 'lucide-react';
import { useLocation as useUserLocation } from '../hooks/useLocation';
import { getVehicleFromSession } from '../utils/pricing-utils';
import CompactCarSelector from '../components/CompactCarSelector';
import VehicleSelectionModal from '../components/VehicleSelectionModal';

interface ServiceCard {
  title: string;
  image: string;
  link: string;
}

const services: ServiceCard[] = [
  {
    title: 'Periodic Services',
    image: '/images/Periodic%20Car%20Service.png',
    link: '/services/periodic'
  },
  {
    title: 'Denting & Painting',
    image: '/images/Dent%20Paint.png',
    link: '/services/denting'
  },
  {
    title: 'AC Service',
    image: '/images/AC%20Service.png',
    link: '/services/ac'
  },
  {
    title: 'Car Wash',
    image: '/images/car_wash.png',
    link: '/services/car-spa'
  },
  {
    title: 'Car Detailing',
    image: '/images/Car%20Detailing.png',
    link: '/services/detailing'
  },
  {
    title: 'Tyres & Wheelcare',
    image: '/images/Tyres.png',
    link: '/services/tyre'
  },
  {
    title: 'Windshield',
    image: '/images/windshield.png',
    link: '/services/windshield'
  },
  {
    title: 'Battery',
    image: '/images/Battery.png',
    link: '/services/battery'
  },
  {
    title: 'Insurance Claim',
    image: '/images/insurance%20claim.png',
    link: '/services/windshield'
  }
];

// Fuzzy search function
const fuzzySearch = (query: string, text: string): boolean => {
  if (!query) return true;
  
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match
  if (textLower.includes(queryLower)) return true;
  
  // Partial word matches
  const queryWords = queryLower.split(' ');
  const textWords = textLower.split(' ');
  
  return queryWords.every(queryWord => 
    textWords.some(textWord => 
      textWord.includes(queryWord) || queryWord.includes(textWord)
    )
  );
};

// Get search score for sorting
const getSearchScore = (query: string, service: ServiceCard): number => {
  if (!query) return 0;
  
  const queryLower = query.toLowerCase();
  let score = 0;
  
  // Title exact match gets highest score
  if (service.title.toLowerCase().includes(queryLower)) score += 10;
  
  // Word-by-word partial matches
  const queryWords = queryLower.split(' ');
  queryWords.forEach(word => {
    if (service.title.toLowerCase().includes(word)) score += 3;
  });
  
  return score;
};

const exclusives: ServiceCard[] = [
  {
    title: 'GaadiMech Membership',
    image: '/images/logo1.png',
    link: '/services'
  },
  {
    title: 'SOS',
    image: '/images/Sos.png',
    link: 'tel:+918448285289'
  }
];

  const HomepageAppV0: React.FC = () => {
  const { locationDisplay, requestLocation, isLoading } = useUserLocation(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [vehicleName, setVehicleName] = useState<string>('');
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(getVehicleFromSession());

  // Filter and search logic with fuzzy matching
  const filteredServices = useMemo(() => {
    if (!search.trim()) return [];
    
    const filtered = services.filter(service => 
      fuzzySearch(search, service.title)
    );
    
    // Sort by search relevance
    filtered.sort((a, b) => {
      const scoreA = getSearchScore(search, a);
      const scoreB = getSearchScore(search, b);
      return scoreB - scoreA;
    });
    
    return filtered.slice(0, 5); // Limit to 5 suggestions
  }, [search]);

  useEffect(() => {
    const selectedVehicle = getVehicleFromSession();
    if (selectedVehicle) {
      setVehicleName(`${selectedVehicle.model?.toUpperCase() || ''}`);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (service: ServiceCard) => {
    navigate(service.link);
    setSearch('');
    setShowSuggestions(false);
  };

  const handleSearchFocus = () => {
    if (search.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleLocationClick = async () => {
    try {
      await requestLocation();
    } catch (error) {
      console.error('Failed to refresh location:', error);
    }
  };

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowVehicleModal(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="px-4 py-4 bg-white shadow-md">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleLocationClick}
            className="flex items-start gap-2 flex-1 overflow-hidden hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            disabled={isLoading}
          >
            <MapPin className={`text-[#FF7200] flex-shrink-0 ${isLoading ? 'animate-pulse' : ''}`} />
            <div className="text-sm leading-tight truncate text-left">
              <p className="font-semibold truncate max-w-[180px]">
                {isLoading ? 'Refreshing location...' : locationDisplay}
              </p>
              <p className="text-gray-500 text-xs truncate">
                {isLoading ? 'Please wait...' : 'Tap to refresh location'}
              </p>
            </div>
          </button>
          <CompactCarSelector
            selectedVehicle={selectedVehicle}
            onSelectCar={() => setShowVehicleModal(true)}
            className="w-16"
          />
        </div>
        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onKeyDown={e => {
              if (e.key === 'Enter' && filteredServices.length) {
                navigate(filteredServices[0].link);
                setSearch('');
                setShowSuggestions(false);
              }
            }}
            placeholder="Search Services"
            className="w-full rounded-md bg-gray-100 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
          />
          {showSuggestions && filteredServices.length > 0 && (
            <div className="absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
              {filteredServices.map((service, index) => (
                <button
                  key={service.title}
                  onClick={() => handleSuggestionClick(service)}
                  className="w-full text-left px-4 py-3 hover:bg-orange-50 hover:text-[#FF7200] border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-8 h-8 object-contain flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="mt-4">
        <div className="relative w-full overflow-x-auto flex snap-x snap-mandatory gap-4 px-4">
          {['/images/Carousal%201.jpg', '/images/Carousal%202.jpg', '/images/Carousal%203.jpg', '/images/Carousal%204.jpg'].map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              className="snap-start flex-shrink-0 w-[88%] h-32 rounded-lg object-cover"
            />
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center mt-2 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#FF7200]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Schedule Services */}
      <section className="mt-6 px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Schedule Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <Link
              to={service.link}
              key={service.title}
              className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <img src={service.image} alt={service.title} className="w-12 h-12 object-contain flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Express Service Highlight */}
      <section className="mt-6 px-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold">Express Service</h3>
                <p className="text-sm text-orange-100 mt-1">90 minutes • ₹500 off</p>
                <Link
                  to="/express-app"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm mt-3 hover:bg-orange-50 transition-colors"
                >
                  Book Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GaadiMech Exclusives */}
      <section className="mt-6 px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">GaadiMech Exclusives</h2>
        <div className="grid grid-cols-2 gap-3">
          {exclusives.map(item => (
            <a
              key={item.title}
              href={item.link}
              className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
              <span className="font-medium text-gray-800 text-sm">{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Vehicle Selection Modal */}
      <VehicleSelectionModal
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
        onVehicleSelect={handleVehicleSelect}
      />
    </div>
  );
};

export default HomepageAppV0; 