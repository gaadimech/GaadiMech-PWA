import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Shield, Car, ChevronRight, CheckCircle, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import CarSelectionModal from '../components/CarSelectionModal';
import PricingInfoModal from '../components/PricingInfoModal';
import TimeSlotModal from '../components/TimeSlotModal';
import { getVehicleFromSession } from '../utils/pricing-utils';
import { expressService } from '../services/expressService';
import { useMetaAnalytics } from '../hooks/useMetaAnalytics';
import { useLocation as useUserLocation } from '../hooks/useLocation';

const ExpressApp: React.FC = () => {
  const navigate = useNavigate();
  const { trackAddToCart, trackInitiateCheckout, trackLead, trackSchedule } = useMetaAnalytics();
  const { location: userLocation } = useUserLocation(true);
  
  const [isCarSelectionModalOpen, setIsCarSelectionModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isTimeSlotModalOpen, setIsTimeSlotModalOpen] = useState(false);
  const [selectedCarBrand, setSelectedCarBrand] = useState<string>('');
  const [selectedCarModel, setSelectedCarModel] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [selectedServicePrice, setSelectedServicePrice] = useState<number | null>(null);
  const [currentLeadId, setCurrentLeadId] = useState<number | null>(null);
  const [mobile, setMobile] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    { icon: '🔧', title: 'Engine Oil Change', subtitle: 'Premium grade oil' },
    { icon: '🔍', title: 'Comprehensive Check', subtitle: '25+ point inspection' },
    { icon: '🚗', title: 'Car Wash', subtitle: 'Interior & exterior' },
    { icon: '🔋', title: 'Battery Check', subtitle: 'Health & terminals' },
    { icon: '🛞', title: 'Tire Check', subtitle: 'Pressure & condition' },
    { icon: '💨', title: 'AC Performance', subtitle: 'Cooling efficiency' }
  ];

  const whyChoose = [
    { icon: Clock, title: '90 Minutes', subtitle: 'Express completion', color: 'bg-blue-100 text-blue-600' },
    { icon: Shield, title: '6 Month Warranty', subtitle: 'Quality assured', color: 'bg-green-100 text-green-600' },
    { icon: Car, title: 'Doorstep Service', subtitle: 'At your location', color: 'bg-purple-100 text-purple-600' },
    { icon: Star, title: 'Expert Technicians', subtitle: 'Certified professionals', color: 'bg-orange-100 text-orange-600' }
  ];

  const handleBookNow = async () => {
    await trackAddToCart(undefined, {
      content_name: 'Express Service Schedule',
      content_type: 'service_booking'
    });

    const savedVehicle = getVehicleFromSession();
    if (savedVehicle) {
      setSelectedCarBrand(savedVehicle.manufacturer);
      setSelectedCarModel(savedVehicle.model);
      setSelectedFuelType(savedVehicle.fuelType);
    }
    setIsCarSelectionModalOpen(true);
  };

  const handleCarSelectionSubmit = async (brand: string, model: string, fuelType: string, price: number) => {
    setSelectedCarBrand(brand);
    setSelectedCarModel(model);
    setSelectedFuelType(fuelType);
    setSelectedServicePrice(price);

    const vehicleData = { manufacturer: brand, model, fuelType };
    sessionStorage.setItem('selectedVehicle', JSON.stringify(vehicleData));
    setIsCarSelectionModalOpen(false);
    setIsPricingModalOpen(true);
  };

  const handleBookSlotNowClick = async (providedMobileNumber?: string) => {
    setIsPricingModalOpen(false);
    
    await trackInitiateCheckout(
      { phone: providedMobileNumber },
      {
        currency: 'INR',
        value: selectedServicePrice ? selectedServicePrice - 500 : 0,
        content_name: 'Express Service Booking',
        content_type: 'service'
      }
    );

    if (providedMobileNumber) {
      setMobile(providedMobileNumber);
      try {
        await createLeadWithAllInfo(providedMobileNumber, selectedCarBrand, selectedCarModel, selectedFuelType, selectedServicePrice || 0);
        setIsTimeSlotModalOpen(true);
      } catch (error) {
        console.error('Error creating lead:', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  const createLeadWithAllInfo = async (mobileNumber: string, carBrand: string, carModel: string, fuelType: string, price: number) => {
    if (isSubmitting) return Promise.reject('Already submitting');
    
    setIsSubmitting(true);
    
    await trackLead(
      { phone: mobileNumber },
      {
        content_name: 'Express Service Lead',
        content_type: 'service_inquiry',
        value: price,
        currency: 'INR'
      }
    );

    sessionStorage.setItem('userMobileNumber', mobileNumber);
    
    try {
      const leadData = {
        mobileNumber: mobileNumber,
        serviceType: "Express Service",
        carBrand: carBrand,
        carModel: carModel,
        fuel_type: fuelType,
        servicePrice: price,
        userCity: userLocation?.city || null,
        userState: userLocation?.state || null,
        userCountry: userLocation?.country || null,
        userLatitude: userLocation?.latitude ? String(userLocation.latitude) : null,
        userLongitude: userLocation?.longitude ? String(userLocation.longitude) : null,
        locationSource: userLocation?.source || null
      };
      
      const response = await expressService.submitLead(leadData as any);
      
      if (!response || !response.data || !response.data.id) {
        throw new Error('Invalid response from server');
      }
      
      const leadId = response.data.id;
      setCurrentLeadId(leadId);
      sessionStorage.setItem('expressServiceLeadId', String(leadId));
      setIsSubmitting(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error creating lead:', error);
      setIsSubmitting(false);
      return Promise.reject(error);
    }
  };

  const handleTimeSlotSubmit = async (date: string, timeSlot: string) => {
    if (!currentLeadId) {
      console.error('No lead ID available');
      alert('Session expired. Please try again.');
      setIsTimeSlotModalOpen(false);
      return;
    }

    try {
      await trackSchedule(
        { phone: mobile },
        {
          content_name: 'Express Service Schedule',
          content_type: 'appointment',
          value: selectedServicePrice ? selectedServicePrice - 500 : 0,
          currency: 'INR'
        }
      );

      const response = await expressService.updateLead(currentLeadId, {
        serviceDate: date,
        timeSlot: timeSlot
      });

      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      setIsTimeSlotModalOpen(false);
      
      if (mobile) {
        sessionStorage.setItem('userMobileNumber', mobile);
      }
      
      sessionStorage.removeItem('expressServiceLeadId');
      
      const discountedPrice = selectedServicePrice ? selectedServicePrice - 500 : 0;
      const message = `Hi, I booked a 90 Mins Express Car Service with GaadiMech
Car: ${selectedCarBrand} ${selectedCarModel}
Fuel: ${selectedFuelType || 'Not specified'}
Price: ₹${selectedServicePrice} → *₹${discountedPrice}*
Slot: ${new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}, ${timeSlot}`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/917300042410?text=${encodedMessage}`, '_blank');
      
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('Failed to book the slot. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-2 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1.5 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Express Service</h1>
      </div>

      {/* Hero Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg border border-orange-200 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-300/20 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-3xl font-bold text-gray-900">90-Minute Express</h2>
                  <motion.span 
                    className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ₹500 OFF
                  </motion.span>
                </div>
                <p className="text-gray-700 mb-4 text-base leading-relaxed">
                  Revolutionary car service technology. Get your car serviced while you wait - no more all-day waits!
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Available Today</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">90 mins guaranteed</span>
                  </div>
                </div>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Car className="w-12 h-12 text-white" />
                </motion.div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-md border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Special Launch Price</p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">₹999</span>
                    <span className="text-lg text-gray-500 line-through">₹1499</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      33% OFF
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform"
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Flow */}
      <div className="px-4 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">How It Works</h3>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
            <div className="absolute top-6 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-orange-300 z-0"></div>
            
            {[
              { icon: '📱', title: 'Book', desc: 'Select slot' },
              { icon: '🚗', title: 'Pickup', desc: 'Free pickup' },
              { icon: '⚡', title: 'Service', desc: '90 mins' },
              { icon: '✅', title: 'Done', desc: 'Ready!' }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg mb-2">
                  {step.icon}
                </div>
                <h4 className="text-xs font-semibold text-gray-900">{step.title}</h4>
                <p className="text-xs text-gray-500 text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-4 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Express Service?</h3>
        <div className="grid grid-cols-2 gap-4">
          {whyChoose.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What's Included */}
      <div className="px-4 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Service Includes</h3>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 shadow-sm border border-green-100">
          <div className="grid grid-cols-1 gap-4">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white text-lg shadow-md">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{service.title}</h4>
                  <p className="text-xs text-gray-600">{service.subtitle}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-blue-900 text-sm mb-1">Trusted by 10,000+ Customers</h4>
              <p className="text-xs text-blue-700">
                ⭐ 4.8/5 rating • 6-month warranty • Genuine parts only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="px-4 mb-24">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-purple-900 text-sm mb-1">Service Coverage</h4>
              <p className="text-xs text-purple-700">All across Jaipur • Free doorstep pickup & delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t px-4 py-4 shadow-lg z-30">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleBookNow}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"
        >
          Book Express Service
          <ChevronRight className="w-5 h-5" />
        </motion.button>
        <p className="text-center text-xs text-gray-500 mt-2">
          Get ₹500 off on your first booking • Same day service available
        </p>
      </div>

      {/* Modals */}
      <CarSelectionModal
        isOpen={isCarSelectionModalOpen}
        onClose={() => setIsCarSelectionModalOpen(false)}
        onSubmit={handleCarSelectionSubmit}
        mobileNumber={mobile}
      />

      <PricingInfoModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onBookNow={handleBookSlotNowClick}
        carBrand={selectedCarBrand}
        carModel={selectedCarModel}
        fuelType={selectedFuelType}
        servicePrice={selectedServicePrice || 0}
        initialMobileNumber={mobile}
      />

      <TimeSlotModal
        isOpen={isTimeSlotModalOpen}
        onClose={() => setIsTimeSlotModalOpen(false)}
        onSubmit={handleTimeSlotSubmit}
        mobileNumber={mobile}
        servicePrice={selectedServicePrice || 0}
      />
    </div>
  );
};

export default ExpressApp; 