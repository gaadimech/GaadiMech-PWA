import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import servicesData, { ServiceCard } from '../../data/services-data';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { ArrowRight, Star, Check, X } from 'lucide-react';
import { ServiceType } from '../../types/services';

/**
 * Service Page Template
 * 
 * This is a template for creating service-specific pages.
 * It follows a consistent structure for all service types,
 * making it easier to maintain and update service content.
 * 
 * SEO information is managed through the SEO utility,
 * not directly in this component.
 */
const ServicePageTemplate: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
  
  // Convert serviceType to a valid ServiceType
  const normalizedServiceType = serviceType as ServiceType || 'periodic';
  
  // Get service data
  const serviceTypeData = servicesData[normalizedServiceType];
  
  useEffect(() => {
    // Set first service as default selected service
    if (serviceTypeData && serviceTypeData.serviceCards.length > 0) {
      setSelectedService(serviceTypeData.serviceCards[0]);
    }
  }, [serviceTypeData]);
  
  if (!serviceTypeData) {
    return <div>Service not found</div>;
  }
  
  // Handler for "Book Service" button
  const handleBookService = () => {
    if (!selectedService) return;
    
    const message = encodeURIComponent(selectedService.whatsappMessage);
    window.open(`https://wa.me/917300042414?text=${message}`, '_blank');
  };
  
  return (
    <div className="bg-white">
      {/* Breadcrumb navigation */}
      <Breadcrumb serviceName={serviceTypeData.title} />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {serviceTypeData.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {serviceTypeData.subtitle}
              </p>
              <Button 
                className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] hover:from-[#FF9500] hover:to-[#FF7200] text-white px-8 py-6 text-lg"
                onClick={handleBookService}
              >
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://i.ibb.co/qjZBrnD/dent-and-paint.png"
                alt={serviceTypeData.title}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-bold">4.8</span>
                  <span className="ml-1 text-gray-600">
                    (1000+ Ratings)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Service Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our {serviceTypeData.title} Packages
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTypeData.serviceCards.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedService?.id === service.id
                    ? 'border-[#FF7200] shadow-lg'
                    : 'border-gray-200 hover:border-[#FF7200] hover:shadow-md'
                }`}
                onClick={() => setSelectedService(service)}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                  {service.isBestseller && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Best Seller
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{service.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-600">{service.duration}</span>
                </div>
                <ul className="mb-6 space-y-2">
                  {service.details.slice(0, 3).map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div className="text-2xl font-bold text-[#FF7200] mb-4">
                    {service.price}
                  </div>
                  <Button
                    className={`w-full ${
                      selectedService?.id === service.id
                        ? 'bg-[#FF7200] text-white'
                        : 'bg-white text-[#FF7200] border-2 border-[#FF7200]'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(service);
                    }}
                  >
                    {selectedService?.id === service.id ? 'Selected' : 'Select Package'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Details Section */}
      {selectedService && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What's Included in {selectedService.title}
            </h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Package Details
                  </h3>
                  <ul className="space-y-3">
                    {selectedService.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Not Included
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Additional parts replacement</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Major repairs outside the service scope</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Custom modifications</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] hover:from-[#FF9500] hover:to-[#FF7200] text-white px-8 py-3 text-lg"
                  onClick={handleBookService}
                >
                  Book This Package
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* FAQ Section, Testimonials, etc. would go here */}
    </div>
  );
};

export default ServicePageTemplate; 