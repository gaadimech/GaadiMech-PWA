import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Car } from 'lucide-react';
import ReviewCarousel from './ReviewCarousel';
import VehicleSelectionModal from './VehicleSelectionModal';
import ServiceCard from './ServiceCard';
import { getReviewsByService } from '../data/reviews';
import servicesData from '../data/services-data';
import { ServiceType, Vehicle, PricingData } from '../types/services';
import { getSeoConfig } from '../utils/seo';
import { 
  parseCSVData, 
  getPricingData, 
  formatPrice, 
  getVehicleFromSession,
  saveVehicleToSession
} from '../utils/pricing-utils';

interface ServicePageProps {
  serviceType: ServiceType;
  skipSeo?: boolean;
}

const ServicePage: React.FC<ServicePageProps> = ({ serviceType, skipSeo = false }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const serviceData = servicesData[serviceType];
  const serviceReviews = getReviewsByService(serviceType);
  
  // Get SEO content from seo.ts
  const seoPath = `/services/${serviceType}`;
  const seoConfig = getSeoConfig(seoPath);
  const landingPageSeoPath = serviceType === 'ac' ? '/car-ac-service-in-jaipur' : 
                            serviceType === 'denting' ? '/car-dent-paint-service-in-jaipur' :
                            `/services/${serviceType}`;
  const landingPageSeoConfig = getSeoConfig(landingPageSeoPath);
  const seoContent = landingPageSeoConfig.hiddenContent || seoConfig.hiddenContent;
  
  // Filter cards based on active tab and visibility
  const filteredCards = serviceData.serviceCards.filter(card => {
    // First check if the card is visible (defaulting to true if not specified)
    if (card.visible === false) return false;
    
    // Then apply the tab filtering
    if (activeTab === 'all') return true;
    return card.id.includes(activeTab.toLowerCase());
  });
  
  // Load CSV data and check for saved vehicle
  useEffect(() => {
    const loadCsvAndVehicle = async () => {
      // Load CSV data
      const data = await parseCSVData();
      setCsvData(data);
      
      // Check for saved vehicle in session storage
      const savedVehicle = getVehicleFromSession();
      if (savedVehicle) {
        setSelectedVehicle(savedVehicle);
        
        // Get pricing data for the vehicle
        const pricing = getPricingData(data, savedVehicle);
        setPricingData(pricing);
      } else {
        // Show vehicle selection modal if no vehicle is saved
        setShowVehicleModal(true);
      }
    };
    
    loadCsvAndVehicle();
  }, []);
  
  // Handle vehicle selection
  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    saveVehicleToSession(vehicle);
    
    // Get pricing data for the selected vehicle
    const pricing = getPricingData(csvData, vehicle);
    setPricingData(pricing);
    
    // Check if all pricing data is zero or unavailable
    if (pricing && 
        pricing.periodicServicePrice <= 0 && 
        pricing.expressServicePrice <= 0 && 
        pricing.dentingPaintPrice <= 0) {
      // You could show a toast notification or other UI feedback here
      console.warn('No pricing data available for this vehicle');
    }
    
    setShowVehicleModal(false);
  };
  
  // Get price for a specific service type
  const getServiceTypePrice = (cardId: string): string => {
    if (!pricingData) return '';
    
    // Handle cases where pricing data is not available
    if (pricingData.periodicServicePrice <= 0 && 
        pricingData.expressServicePrice <= 0 && 
        pricingData.dentingPaintPrice <= 0 &&
        pricingData.fullBodyPaintPrice <= 0) {
      return 'Price not available';
    }
    
    // Add debugging for denting services
    if (cardId.includes('denting')) {
      console.log(`Denting card: ${cardId}`);
      console.log(`Price data: dentingPaintPrice=${pricingData.dentingPaintPrice}, fullBodyPaintPrice=${pricingData.fullBodyPaintPrice}`);
    }
    
    // Map the card ID to the corresponding price
    if (cardId.includes('periodic-basic')) {
      return formatPrice(pricingData.periodicServicePrice);
    } else if (cardId.includes('periodic-express')) {
      return formatPrice(pricingData.expressServicePrice);
    } else if (cardId.includes('denting-door')) {
      // Express Dent & Paint price from Dent & Paint Price GaadiMech column
      return formatPrice(pricingData.dentingPaintPrice);
    } else if (cardId.includes('denting-full')) {
      // Full Body Paint price from Dent and Paint Full Body column
      return formatPrice(pricingData.fullBodyPaintPrice);
    }
    
    return '';
  };
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      {!skipSeo && (
        <Helmet>
          <title>{seoConfig.title}</title>
          <meta name="description" content={seoConfig.description} />
          <meta name="keywords" content={seoConfig.keywords} />
          <link rel="canonical" href={seoConfig.canonicalUrl || window.location.href} />
        </Helmet>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{seoContent?.h1 || serviceData.title}</h1>
          <p className="text-xl text-gray-600">{seoConfig.description}</p>
        </div>
        
        {/* Vehicle selection banner */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Car className="text-blue-500 mr-3" size={24} />
            <div>
              {selectedVehicle ? (
                <>
                  <p className="text-blue-800">
                    Selected Vehicle: <span className="font-semibold">{selectedVehicle.manufacturer} {selectedVehicle.model} ({selectedVehicle.fuelType})</span>
                  </p>
                  {pricingData && 
                   pricingData.periodicServicePrice <= 0 && 
                   pricingData.expressServicePrice <= 0 && 
                   pricingData.dentingPaintPrice <= 0 && (
                    <p className="text-amber-600 text-sm mt-1">
                      Note: Limited pricing data available for this vehicle.
                    </p>
                  )}
                </>
              ) : (
                <p className="text-blue-800">Select your car to view personalized service prices</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowVehicleModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {selectedVehicle ? 'Change Car' : 'Select Car'}
          </button>
        </div>
        
        {/* Service type tabs */}
        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'all'
                ? 'bg-[#FF7200] text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            All Services
          </button>
          
          {serviceType === 'periodic' && (
            <>
              <button
                onClick={() => handleTabChange('periodic')}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeTab === 'periodic'
                    ? 'bg-[#FF7200] text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Periodic
              </button>
              {/* Express tab is hidden when no Express Service cards are visible */}
              {serviceData.serviceCards.some(card => card.id.includes('express') && card.visible !== false) && (
                <button
                  onClick={() => handleTabChange('express')}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeTab === 'express'
                      ? 'bg-[#FF7200] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Express
                </button>
              )}
            </>
          )}
        </div>
        
        {/* Service cards */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCards.map((card, index) => {
              // Get the actual price for this vehicle and service
              const actualPrice = getServiceTypePrice(card.id);
              
              // Find the periodic service card to get its price
              const periodicServiceCard = servicesData['periodic']?.serviceCards.find(c => c.id === 'periodic-basic');
              const periodicServicePrice = periodicServiceCard ? getServiceTypePrice('periodic-basic') : undefined;
              
              return (
                <ServiceCard
                  key={`${card.id}-${index}`}
                  card={card}
                  vehicleSelected={!!selectedVehicle}
                  actualPrice={actualPrice}
                  onSelectCar={() => setShowVehicleModal(true)}
                  selectedVehicle={selectedVehicle}
                  serviceType={serviceType}
                  periodicServicePrice={card.id === 'customizable-service' ? periodicServicePrice : undefined}
                />
              );
            })}
          </div>
        ) : (
          <div className="mb-12 flex justify-center">
            <button
              onClick={() => window.open(`https://wa.me/917300042410?text=I'd%20like%20to%20inquire%20about%20your%20${seoContent?.h1 || serviceData.title}%20in%20Jaipur.`, '_blank')}
              className="bg-[#FF7200] hover:bg-[#e56700] text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors flex items-center space-x-2"
            >
              <span>Get a Quote</span>
            </button>
          </div>
        )}
        
        {/* Customer reviews */}
        <ReviewCarousel reviews={serviceReviews} />

        {/* SEO Content Section - Small and nearly invisible */}
        {seoContent && (
          <div className="mt-16 opacity-30 hover:opacity-80 transition-opacity text-xs overflow-hidden max-h-40 text-gray-600">
            <div className="text-center mb-2">
              <h2 className="text-sm font-semibold text-gray-700">{seoContent.h2}</h2>
            </div>
            <div className="space-y-2">
              {seoContent.paragraphs && seoContent.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-xs">{paragraph}</p>
              ))}
              {seoContent.listItems && seoContent.listItems.length > 0 && (
                <ul className="list-disc list-inside pl-2 space-y-1">
                  {seoContent.listItems.map((item, idx) => (
                    <li key={idx} className="text-xs">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Minimal Version of Rich Service Description Content */}
        {serviceData.description && (
          <div className="mt-6 opacity-30 hover:opacity-80 transition-opacity overflow-hidden max-h-32 text-xs">
            <div className="prose prose-xs max-w-none" dangerouslySetInnerHTML={{ __html: serviceData.description }} />
          </div>
        )}
      </div>
      
      {/* Vehicle selection modal */}
      <VehicleSelectionModal
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
        onVehicleSelect={handleVehicleSelect}
      />
    </motion.div>
  );
};

export default ServicePage; 