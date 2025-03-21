import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, ArrowRight, Check, Clock, Car, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCard as ServiceCardProps } from '../data/services-data';
import { Vehicle } from '../types/services';
import ReactDOM from 'react-dom';

interface ServiceCardComponentProps {
  card: ServiceCardProps;
  vehicleSelected: boolean;
  actualPrice?: string;
  onSelectCar: () => void;
  selectedVehicle?: Vehicle | null;
  serviceType?: string;
  periodicServicePrice?: string;
}

// New interface for customizable service
interface CustomService {
  id: string;
  name: string;
  description?: string;
  percentage: number;
  price: number;
  isSelected: boolean;
  isRequired?: boolean;
}

const ServiceCard: React.FC<ServiceCardComponentProps> = ({
  card,
  vehicleSelected,
  actualPrice,
  onSelectCar,
  selectedVehicle,
  serviceType,
  periodicServicePrice
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [highlightDuration, setHighlightDuration] = useState(false);
  const isExpressService = card.duration.includes('90 Mins') || card.duration.includes('⏰');
  
  // New states for customization
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  const [basePackagePrice, setBasePackagePrice] = useState(0);
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0);
  
  // Animation for express service
  useEffect(() => {
    if (isExpressService) {
      const interval = setInterval(() => {
        setHighlightDuration(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isExpressService]);
  
  // Initialize custom services when the modal is opened
  useEffect(() => {
    if (showCustomizationModal && card.id === 'customizable-service') {
      // Use periodicServicePrice if available for calculations, otherwise fallback to actualPrice or default price
      let basePrice: number;
      
      if (periodicServicePrice && vehicleSelected) {
        // Use the periodic service price when a vehicle is selected
        basePrice = parseFloat(periodicServicePrice.replace(/[^\d.]/g, ''));
      } else if (actualPrice) {
        // Fallback to actualPrice if periodicServicePrice is not available
        basePrice = parseFloat(actualPrice.replace(/[^\d.]/g, ''));
      } else {
        // Fallback to the card's default price if neither are available
        basePrice = parseFloat(card.price.replace(/[^\d.]/g, ''));
      }
      
      setBasePackagePrice(basePrice);
      
      // Remove the 1.25x multiplier and use base price directly
      const adjustedBasePrice = basePrice;
      
      // Define the custom services with their percentages from the provided table
      // Only Engine Oil and Oil Filter are preselected and required
      const services: CustomService[] = [
        { id: 'engine-oil', name: 'Engine Oil Replacement', percentage: 57.47, price: adjustedBasePrice * 0.5747, isSelected: true, isRequired: true, description: 'Essential for engine health & performance' },
        { id: 'oil-filter', name: 'Oil Filter Replacement', percentage: 5.18, price: adjustedBasePrice * 0.0518, isSelected: true, isRequired: true, description: 'Prevents engine damage from contaminants' },
        { id: 'air-filter', name: 'Air Filter Replacement', percentage: 12.25, price: adjustedBasePrice * 0.1225, isSelected: false, description: 'Recommended every 10,000 km' },
        { id: 'brake-pad', name: 'Brake Pad Servicing', percentage: 4.61, price: adjustedBasePrice * 0.0461, isSelected: false, description: 'Important for safety' },
        { id: 'car-wash', name: 'Top Body Wash', percentage: 6.35, price: adjustedBasePrice * 0.0635, isSelected: false, description: 'Maintains paint & prevents corrosion' },
        { id: 'vacuuming', name: 'Interior Vacuuming', percentage: 5.51, price: adjustedBasePrice * 0.0551, isSelected: false, description: 'Keeps cabin clean & allergen-free' },
        { id: 'inspection', name: '25 Point Car Inspection', percentage: 3.94, price: adjustedBasePrice * 0.0394, isSelected: false, description: 'Comprehensive vehicle check' },
        { id: 'coolant', name: 'Coolant Top-up', percentage: 1.50, price: adjustedBasePrice * 0.0150, isSelected: false, description: 'Prevents engine overheating' },
        { id: 'battery', name: 'Battery Water Top-up', percentage: 0.84, price: adjustedBasePrice * 0.0084, isSelected: false, description: 'Extends battery life' },
        { id: 'brake-oil', name: 'Brake Oil Top-up', percentage: 1.71, price: adjustedBasePrice * 0.0171, isSelected: false, description: 'Ensures responsive braking' },
        { id: 'wiper-fluid', name: 'Wiper Fluid Replacement', percentage: 0.63, price: adjustedBasePrice * 0.0063, isSelected: false, description: 'Improves visibility in rain' },
        { id: 'labour', name: 'Labour Charges', percentage: 0, price: 200, isSelected: true, isRequired: true, description: 'Professional service by experts' },
      ];
      
      setCustomServices(services);
      
      // Calculate initial total based on preselected services
      const initialTotal = services.reduce((total, service) => {
        return service.isSelected ? total + service.price : total;
      }, 0);
      
      setCurrentTotalPrice(initialTotal);
    }
  }, [showCustomizationModal, card.id, actualPrice, card.price, periodicServicePrice, vehicleSelected]);
  
  // Calculate the total price based on selected services
  const calculateTotalPrice = (services: CustomService[]) => {
    return services.reduce((total, service) => {
      return service.isSelected ? total + service.price : total;
    }, 0);
  };
  
  // Toggle a service selection
  const toggleServiceSelection = (serviceId: string) => {
    const updatedServices = customServices.map(service => {
      if (service.id === serviceId) {
        // Don't toggle if the service is required
        if (service.isRequired) {
          return service;
        }
        return { ...service, isSelected: !service.isSelected };
      }
      return service;
    });
    
    setCustomServices(updatedServices);
    setCurrentTotalPrice(calculateTotalPrice(updatedServices));
  };
  
  const handleBookNow = () => {
    let customMessage = card.whatsappMessage;
    
    // If this is a customized service and the modal has been used
    if (card.id === 'customizable-service' && customServices.length > 0) {
      // Create a detailed message with selected services
      const selectedServices = customServices.filter(service => service.isSelected);
      
      // Format the selected services as a bullet list
      const servicesList = selectedServices.map(service => 
        `• ${service.name} - ₹${service.price.toFixed(2)}`
      ).join('\n');
      
      customMessage = `Hi, I've created a Customized Car Service Package from GaadiMech.com.
Details:
${selectedVehicle ? `Car Model: *${selectedVehicle.manufacturer} ${selectedVehicle.model}*
Fuel Type: ${selectedVehicle.fuelType}` : ''}
Selected Services:
${servicesList}

Total Package Price: ₹${currentTotalPrice.toFixed(2)}`;
    } else if (selectedVehicle && vehicleSelected && actualPrice) {
      // For non-customized services, use the existing message format
      let serviceName = card.title;
      
      // Create the custom message
      if (isExpressService) {
        // For Express Service, include both original and discounted prices
        const originalPrice = actualPrice;
        const discountedPrice = getDiscountedPrice();
        
        customMessage = `Hi, I've Booked a ${serviceName} from GaadiMech.com.
Details:
Car Model: *${selectedVehicle.manufacturer} ${selectedVehicle.model}*
Fuel Type: ${selectedVehicle.fuelType}
Service Type: ${serviceName}
Original Price: ${originalPrice}
Discounted Price (₹500 off): ${discountedPrice}`;
      } else {
        // For other services, use regular pricing
        customMessage = `Hi, I've Booked a ${serviceName} from GaadiMech.com.
Details:
Car Model: *${selectedVehicle.manufacturer} ${selectedVehicle.model}*
Fuel Type: ${selectedVehicle.fuelType}
Service Type: ${serviceName}
Package Price: ${actualPrice}`;
      }
    }
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/917300042410?text=${encodeURIComponent(customMessage)}`, '_blank');
  };
  
  const toggleDetails = (e: React.MouseEvent) => {
    // Prevent event from bubbling up
    e.stopPropagation();
    setShowDetails(prev => !prev);
  };
  
  const handleCustomizeButton = () => {
    setShowCustomizationModal(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeCustomizationModal = () => {
    setShowCustomizationModal(false);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };
  
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };
  
  // Get display price for customizable service
  const getDisplayPrice = () => {
    if (card.id === 'customizable-service') {
      if (vehicleSelected && periodicServicePrice) {
        // When vehicle is selected, show the price based on periodic service price
        // but only show the minimum price (Engine Oil + Oil Filter + Labour Charges) as the starting price
        const basePrice = parseFloat(periodicServicePrice.replace(/[^\d.]/g, ''));
        const adjustedBasePrice = basePrice;
        const minPrice = adjustedBasePrice * 0.5747 + adjustedBasePrice * 0.0518 + 200; // 57.47% + 5.18% (Engine Oil + Oil Filter) + Labour Charges
        return `₹${minPrice.toFixed(2)}`;
      } else {
        // When no vehicle is selected, show the card's default price
        return card.price;
      }
    } else if (isExpressService && vehicleSelected && actualPrice) {
      // For express service with selected vehicle, return the original price without discount
      // The discount will be applied in the UI
      return actualPrice;
    } else {
      // For other cards, use the normal logic
      return vehicleSelected && actualPrice ? actualPrice : card.price;
    }
  };
  
  // Calculate the discounted price for express service (₹500 off)
  const getDiscountedPrice = () => {
    if (isExpressService && vehicleSelected && actualPrice) {
      const originalPrice = parseFloat(actualPrice.replace(/[^\d.]/g, ''));
      const discountedPrice = Math.max(0, originalPrice - 500); // Ensure price doesn't go below 0
      return `₹${discountedPrice.toFixed(2)}`;
    }
    return null;
  };
  
  // Common button class to ensure consistency
  const buttonClass = "bg-[#FF7200] text-white px-6 py-3 rounded-md hover:bg-[#FF7200]/90 transition-colors flex items-center justify-center w-[170px] text-sm whitespace-nowrap";
  const selectCarButtonClass = "bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center w-[170px] text-sm whitespace-nowrap";
  
  // Render the modal using a portal to ensure it appears at the center of the screen
  const renderCustomizationModal = () => {
    if (!showCustomizationModal) return null;
    
    // Calculate the potential full price (if all services were selected)
    const fullPrice = customServices.reduce((total, service) => total + service.price, 0);
    
    // Calculate savings compared to individual bookings
    const periodicServicePriceValue = periodicServicePrice ? 
      parseFloat(periodicServicePrice.replace(/[^\d.]/g, '')) : 
      parseFloat(card.price.replace(/[^\d.]/g, ''));
      
    const potentialSavings = fullPrice - periodicServicePriceValue;
    
    // Calculate progress - how many services are selected out of total
    const selectedServicesCount = customServices.filter(service => service.isSelected).length;
    const totalServicesCount = customServices.length;
    const progressPercentage = (selectedServicesCount / totalServicesCount) * 100;
    
    // Group services by category for better organization
    const essentialServices = customServices.filter(service => 
      service.isRequired || service.id === 'air-filter' || service.id === 'brake-pad' || service.id === 'labour');
      
    const comfortServices = customServices.filter(service => 
      service.id === 'car-wash' || service.id === 'vacuuming');
      
    const maintenanceServices = customServices.filter(service => 
      service.id === 'coolant' || service.id === 'battery' || 
      service.id === 'brake-oil' || service.id === 'wiper-fluid');
      
    const inspectionServices = customServices.filter(service => 
      service.id === 'inspection');
    
    // Portal content
    const modalContent = (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4"
        onClick={closeCustomizationModal}
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Modal Header - Made more compact */}
          <div className="sticky top-0 bg-white z-20 border-b py-2 px-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
              <p className="text-gray-500 text-xs">Customize services that your car actually needs</p>
            </div>
            <button
              onClick={closeCustomizationModal}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Compact Value Proposition - Combined with Sticky Header */}
          <div className="sticky top-[57px] z-10 bg-gradient-to-r from-orange-50 to-orange-100 py-2 px-4 border-b">
            {/* Simplified Savings Message */}
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 mr-2">
                  <div className="bg-orange-100 rounded-full p-1">
                    <svg className="w-4 h-4 text-[#FF7200]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-xs text-gray-700 font-medium">Save more on Complete Packages!</div>
              </div>
            </div>
            
            {/* Progress Bar - More compact */}
            <div className="mt-1.5">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-[#FF7200] h-1.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-500 mt-0.5">
                <span>Package completion</span>
                <span>{selectedServicesCount} of {totalServicesCount} services selected</span>
              </div>
            </div>
          </div>
          
          {/* Collapsible Required Services Notice - Hidden by default on mobile, toggleable */}
          <div className="bg-blue-50 py-2 px-3 border-b flex items-center">
            <Info className="text-blue-500 mr-2 flex-shrink-0" size={16} />
            <p className="text-xs text-blue-700">
              Engine Oil, Oil Filter, and Labour Charges are required. Other services optional.
            </p>
          </div>

          {/* Services Selection - Optimized for more visible space */}
          <div className="flex-1 overflow-y-auto">
            {/* Essential Maintenance Section */}
            <div className="pb-3 pt-2 px-4">
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <span className="bg-orange-100 p-1 rounded-full mr-2">
                  <Check className="w-3 h-3 text-[#FF7200]" />
                </span>
                Essential Maintenance
              </h4>
              
              {/* Required Services - More compact */}
              <div className="mb-2">
                {essentialServices
                  .filter(service => service.isRequired)
                  .map((service) => (
                    <div 
                      key={service.id}
                      className="flex items-center justify-between p-2 mb-1.5 border border-orange-200 bg-orange-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-md bg-[#FF7200] border-[#FF7200] mr-2 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{service.name}</span>
                          <p className="text-[10px] text-gray-500">{service.description || 'Required component'}</p>
                        </div>
                      </div>
                      <span className="text-gray-900 font-semibold text-sm">+ {formatPrice(service.price)}</span>
                    </div>
                ))}
              </div>
              
              {/* Optional Essential Services - More compact */}
              <div className="space-y-1.5">
                {essentialServices
                  .filter(service => !service.isRequired)
                  .map((service) => (
                    <div 
                      key={service.id}
                      className={`flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${service.isSelected ? 'bg-orange-50 border-orange-200' : ''}`}
                      onClick={() => toggleServiceSelection(service.id)}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-5 h-5 rounded-md border ${service.isSelected ? 'bg-[#FF7200] border-[#FF7200]' : 'border-gray-300'} mr-2 flex items-center justify-center transition-colors`}
                        >
                          {service.isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <span className="text-sm font-medium">{service.name}</span>
                          <p className="text-[10px] text-gray-500">{service.description}</p>
                        </div>
                      </div>
                      <span className={`font-semibold text-sm ${service.isSelected ? 'text-[#FF7200]' : 'text-gray-900'}`}>+ {formatPrice(service.price)}</span>
                    </div>
                ))}
              </div>
            </div>
            
            {/* Inspection Services - More compact */}
            {inspectionServices.length > 0 && (
              <div className="pb-3 pt-1 px-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <Info className="w-3 h-3 text-blue-600" />
                  </span>
                  Inspection Services
                </h4>
                
                <div className="space-y-1.5">
                  {inspectionServices.map((service) => (
                    <div 
                      key={service.id}
                      className={`flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${service.isSelected ? 'bg-blue-50 border-blue-200' : ''}`}
                      onClick={() => toggleServiceSelection(service.id)}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-5 h-5 rounded-md border ${service.isSelected ? 'bg-[#FF7200] border-[#FF7200]' : 'border-gray-300'} mr-2 flex items-center justify-center transition-colors`}
                        >
                          {service.isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <span className="text-sm font-medium">{service.name}</span>
                          <p className="text-[10px] text-gray-500">{service.description}</p>
                        </div>
                      </div>
                      <span className={`font-semibold text-sm ${service.isSelected ? 'text-[#FF7200]' : 'text-gray-900'}`}>+ {formatPrice(service.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Fluids & Maintenance - More compact */}
            {maintenanceServices.length > 0 && (
              <div className="pb-3 pt-1 px-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">
                    <div className="w-3 h-3 text-green-600 flex items-center justify-center">
                      <span className="text-[10px]">↺</span>
                    </div>
                  </span>
                  Fluids & Maintenance
                </h4>
                
                <div className="space-y-1.5">
                  {maintenanceServices.map((service) => (
                    <div 
                      key={service.id}
                      className={`flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${service.isSelected ? 'bg-green-50 border-green-200' : ''}`}
                      onClick={() => toggleServiceSelection(service.id)}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-5 h-5 rounded-md border ${service.isSelected ? 'bg-[#FF7200] border-[#FF7200]' : 'border-gray-300'} mr-2 flex items-center justify-center transition-colors`}
                        >
                          {service.isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <span className="text-sm font-medium">{service.name}</span>
                          <p className="text-[10px] text-gray-500">{service.description}</p>
                        </div>
                      </div>
                      <span className={`font-semibold text-sm ${service.isSelected ? 'text-[#FF7200]' : 'text-gray-900'}`}>+ {formatPrice(service.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Comfort & Cleaning - More compact */}
            {comfortServices.length > 0 && (
              <div className="pb-3 pt-1 px-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <span className="bg-purple-100 p-1 rounded-full mr-2">
                    <div className="w-3 h-3 text-purple-600 flex items-center justify-center">✨</div>
                  </span>
                  Comfort & Cleaning
                </h4>
                
                <div className="space-y-1.5">
                  {comfortServices.map((service) => (
                    <div 
                      key={service.id}
                      className={`flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${service.isSelected ? 'bg-purple-50 border-purple-200' : ''}`}
                      onClick={() => toggleServiceSelection(service.id)}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-5 h-5 rounded-md border ${service.isSelected ? 'bg-[#FF7200] border-[#FF7200]' : 'border-gray-300'} mr-2 flex items-center justify-center transition-colors`}
                        >
                          {service.isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <span className="text-sm font-medium">{service.name}</span>
                          <p className="text-[10px] text-gray-500">{service.description}</p>
                        </div>
                      </div>
                      <span className={`font-semibold text-sm ${service.isSelected ? 'text-[#FF7200]' : 'text-gray-900'}`}>+ {formatPrice(service.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Extra padding for bottom safety */}
            <div className="h-2"></div>
          </div>
          
          {/* Total Price and Booking Button - Sticky */}
          <div className="sticky bottom-0 bg-white border-t py-3 px-4 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <p className="text-xs text-gray-500">Total Package Price</p>
                  {selectedServicesCount > 2 && (
                    <span className="ml-0.5 bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full text-center">
                      Best Value
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold text-gray-900">₹{currentTotalPrice.toFixed(2)}</h4>
                <p className="text-[10px] text-gray-500">Package includes {selectedServicesCount} services</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  closeCustomizationModal();
                  handleBookNow();
                }}
                className={buttonClass}
              >
                BUILD YOUR PACKAGE
                <ArrowRight className="ml-1" size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
    
    // Use ReactDOM.createPortal to render the modal at the document body level
    return ReactDOM.createPortal(
      modalContent,
      document.body
    );
  };
  
  return (
    <motion.div 
      className={`bg-white rounded-lg shadow-lg relative flex flex-col h-full overflow-hidden
      ${isExpressService ? 'border-2 border-[#FF7200]' : ''}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Express Service Banner - Only for Express Service */}
      {isExpressService && (
        <div className="absolute top-0 right-0 bg-[#FF7200] text-white text-xs font-bold py-1.5 px-4 shadow-md transform rotate-45 translate-x-7 translate-y-2 z-10">
          EXPRESS
        </div>
      )}
      
      {/* Card content is organized into three main sections with consistent heights */}
      
      {/* Header Section */}
      <div className={`p-6 ${isExpressService ? 'pb-3' : 'pb-4'}`}>
        {card.isBestseller && (
          <div className="absolute top-4 left-4 bg-[#FFF0E6] text-[#FF7200] text-xs font-semibold py-1 px-2 rounded">
            Bestseller
          </div>
        )}
        
        <h3 className={`text-xl font-bold ${isExpressService ? 'text-[#FF7200]' : 'text-gray-900'}`}>{card.title}</h3>
        <p className="text-gray-600 text-sm min-h-[40px] mt-1">{card.description}</p>
      </div>
      
      {/* Info Section - Made more attractive for Express */}
      <div className="border-t border-b border-gray-100 mx-6 py-3">
        <div className="flex items-center">
          <div className="bg-green-100 text-green-800 rounded-md px-2 py-1 flex items-center">
            <Star className="w-4 h-4 fill-current text-yellow-500 mr-1" />
            <span className="font-semibold">{card.rating}</span>
          </div>
          <span className="text-gray-500 text-sm ml-2">({card.reviewCount}+ reviews)</span>
          
          {isExpressService ? (
            <div className="relative ml-auto flex items-center">
              <div className={`flex items-center px-3 py-1.5 rounded-full bg-red-50 ${highlightDuration ? 'ring-2 ring-red-400' : ''}`}>
                <Clock className="w-4 h-4 text-[#FF7200] mr-1" />
                <span className="text-sm font-bold text-gray-800">{card.duration}</span>
              </div>
            </div>
          ) : (
            <span className="text-gray-500 text-sm ml-auto">{card.duration}</span>
          )}
        </div>
      </div>
      
      {/* Action Section - using flex-grow to push this to the bottom */}
      <div className="flex-grow flex flex-col justify-end p-6 pt-4">
        {/* Price and Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
          <div>
            {isExpressService && vehicleSelected && actualPrice ? (
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h4 className="text-2xl font-bold text-[#FF7200]">
                    {getDiscountedPrice()}
                  </h4>
                  <span className="ml-2 text-lg line-through text-gray-500">
                    {getDisplayPrice()}
                  </span>
                </div>
                <div className="bg-green-100 text-green-700 font-medium text-sm px-2 py-0.5 rounded-md inline-block mt-1 w-fit">
                  ₹500 OFF
                </div>
              </div>
            ) : (
              <h4 className="text-2xl font-bold text-gray-900">
                {getDisplayPrice()}
              </h4>
            )}
          </div>
          {vehicleSelected ? (
            card.id === 'customizable-service' ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCustomizeButton}
                className={`${buttonClass} w-full sm:w-[170px]`}
              >
                BUILD YOUR PACKAGE
                <ArrowRight className="ml-1" size={16} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className={`${isExpressService ? 
                  'bg-[#FF7200] hover:bg-[#FF7200]/90 text-white' : 
                  'bg-[#FF7200] hover:bg-[#FF7200]/90 text-white'} 
                  px-6 py-3 rounded-md transition-colors flex items-center justify-center w-full sm:w-[170px] text-sm whitespace-nowrap font-bold shadow-md`}
              >
                BOOK NOW
                <ArrowRight className="ml-1" size={16} />
              </motion.button>
            )
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSelectCar}
              className={`${selectCarButtonClass} w-full sm:w-[170px]`}
            >
              SELECT CAR
              <ArrowRight className="ml-1" size={16} />
            </motion.button>
          )}
        </div>
        
        {/* Details Toggle - always at the bottom */}
        <div className="border-t border-gray-100 pt-2">
          <button
            onClick={toggleDetails}
            className="w-full flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium transition-colors py-1"
            data-card-id={card.id}
          >
            {showDetails ? (
              <>
                <span>Less Details</span>
                <ChevronUp className="ml-1" size={18} />
              </>
            ) : (
              <>
                <span>More Details</span>
                <ChevronDown className="ml-1" size={18} />
              </>
            )}
          </button>
          
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3"
              >
                <ul className="space-y-2">
                  {card.details.map((detail, index) => (
                    <li key={index} className="text-gray-700 flex items-start p-1.5 rounded hover:bg-gray-50">
                      <div className={`${isExpressService ? 'bg-[#FFF0E6]' : 'bg-[#FFF0E6]'} rounded-full p-1 mr-2 flex-shrink-0`}>
                        <Check className={`w-3 h-3 ${isExpressService ? 'text-[#FF7200]' : 'text-[#FF7200]'}`} strokeWidth={3} />
                      </div>
                      <span className="mt-0.5">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Express Service Highlight - only for express service and on desktop */}
      {isExpressService && (
        <div className="absolute top-1/4 right-0 w-20 h-20 -rotate-45 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-r from-transparent to-[#FFF0E6] opacity-40"></div>
        </div>
      )}
      
      {/* Render the modal using a portal */}
      {renderCustomizationModal()}
    </motion.div>
  );
};

export default ServiceCard; 