import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  rating: number;
  duration: string;
  price: string;
  badge?: string;
  isPopular?: boolean;
  categories: string[]; // Adding categories field
}

const serviceCategories = [
  { id: 'all', name: 'All', icon: '🚗' },
  { id: 'maintenance', name: 'Maintenance', icon: '🔧' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧽' },
  { id: 'repair', name: 'Repair', icon: '⚡' },
  { id: 'emergency', name: 'Emergency', icon: '🚨' },
];

const services: ServiceCard[] = [
  {
    id: '1',
    title: 'Basic Car Service',
    subtitle: 'Engine oil • Oil filter • AC filter',
    image: '/images/Periodic%20Car%20Service.png',
    link: '/services/periodic',
    rating: 4.8,
    duration: '2-3 hrs',
    price: '₹1,999',
    badge: 'Most Popular',
    isPopular: true,
    categories: ['maintenance']
  },
  {
    id: '2',
    title: 'AC Service',
    subtitle: 'AC gas refill • Filter cleaning • Cooling check',
    image: '/images/AC%20Service.png',
    link: '/services/ac',
    rating: 4.7,
    duration: '1-2 hrs',
    price: '₹1,499',
    categories: ['maintenance', 'repair']
  },
  {
    id: '3',
    title: 'Car Spa & Wash',
    subtitle: 'Interior cleaning • Exterior wash • Waxing',
    image: '/images/car_wash.png',
    link: '/services/car-spa',
    rating: 4.6,
    duration: '2-4 hrs',
    price: '₹899',
    categories: ['cleaning']
  },
  {
    id: '4',
    title: 'Denting & Painting',
    subtitle: 'Scratch repair • Dent removal • Paint job',
    image: '/images/Dent%20Paint.png',
    link: '/services/denting',
    rating: 4.5,
    duration: '1-2 days',
    price: '₹2,999',
    categories: ['repair']
  },
  {
    id: '5',
    title: 'Battery Replacement',
    subtitle: 'Battery check • New battery • Installation',
    image: '/images/Battery.png',
    link: '/services/battery',
    rating: 4.9,
    duration: '30 mins',
    price: '₹3,999',
    categories: ['repair', 'emergency']
  },
  {
    id: '6',
    title: 'Tyre & Wheel Care',
    subtitle: 'Wheel alignment • Balancing • Rotation',
    image: '/images/Tyres.png',
    link: '/services/tyre',
    rating: 4.4,
    duration: '1-2 hrs',
    price: '₹1,299',
    categories: ['maintenance', 'repair']
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
  
  // Subtitle match gets medium score
  if (service.subtitle.toLowerCase().includes(queryLower)) score += 5;
  
  // Word-by-word partial matches
  const queryWords = queryLower.split(' ');
  queryWords.forEach(word => {
    if (service.title.toLowerCase().includes(word)) score += 3;
    if (service.subtitle.toLowerCase().includes(word)) score += 1;
  });
  
  return score;
};

const ServicesApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter and search logic with fuzzy matching
  const { filteredServices, searchSuggestions } = useMemo(() => {
    let filtered = services;
    
    // Apply category filter first
    if (selectedCategory !== 'all') {
      filtered = services.filter(service => 
        service.categories.includes(selectedCategory)
      );
    }
    
    // Apply search filter with fuzzy matching
    if (searchQuery.trim()) {
      filtered = filtered.filter(service => 
        fuzzySearch(searchQuery, service.title) || 
        fuzzySearch(searchQuery, service.subtitle)
      );
      
      // Sort by search relevance
      filtered.sort((a, b) => {
        const scoreA = getSearchScore(searchQuery, a);
        const scoreB = getSearchScore(searchQuery, b);
        return scoreB - scoreA;
      });
    }
    
    // Generate search suggestions when there's a query
    const suggestions = searchQuery.trim() ? 
      services
        .filter(service => 
          fuzzySearch(searchQuery, service.title) || 
          fuzzySearch(searchQuery, service.subtitle)
        )
        .slice(0, 5)
        .map(service => service.title)
      : [];
    
    return { filteredServices: filtered, searchSuggestions: suggestions };
  }, [selectedCategory, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Our Services</h1>
            <p className="text-sm text-gray-600">Professional car care at your doorstep</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#FF7200]" />
            <span className="text-sm text-gray-600">Jaipur</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 left-0 right-0">
            {searchSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 cursor-pointer hover:bg-orange-50 hover:text-[#FF7200] text-sm border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="w-4 h-4 text-gray-400" />
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex space-x-4 overflow-x-auto">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#FF7200] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-4">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? `No results for "${searchQuery}"` : "No services match the selected category"}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowSuggestions(false);
              }}
              className="bg-[#FF7200] text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Show All Services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.link}>
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex space-x-4">
                    {/* Service Image */}
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      {service.isPopular && (
                        <div className="absolute -top-2 -right-2 bg-[#FF7200] text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                    </div>

                    {/* Service Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base">{service.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{service.subtitle}</p>
                          
                          {/* Service Stats */}
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-700">{service.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{service.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{service.price}</p>
                          <p className="text-xs text-gray-500">onwards</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-3">
                        <button className="w-full bg-orange-50 text-[#FF7200] py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          </div>
        )}

        {/* Emergency Section */}
        <div className="mt-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Emergency Service</h3>
              <p className="text-sm opacity-90">24/7 roadside assistance</p>
            </div>
            <a
              href="tel:+91-8448-285289"
              className="bg-white text-red-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call SOS
            </a>
          </div>
        </div>

        {/* Popular Services */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Trending Services</h2>
          <div className="grid grid-cols-2 gap-3">
            {services.slice(0, 4).map((service) => (
              <Link key={service.id} to={service.link}>
                <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-12 h-12 object-contain mx-auto mb-2"
                  />
                  <h4 className="text-sm font-medium text-gray-900 text-center leading-tight">
                    {service.title}
                  </h4>
                  <p className="text-xs text-[#FF7200] text-center mt-1 font-medium">
                    {service.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesApp; 