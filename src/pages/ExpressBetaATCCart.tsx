import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Calendar, ArrowRight, ArrowUp, ArrowDown, Shield, AlertTriangle, X, Car, Phone, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { expressService } from '../services/expressService';
import { getVehicleFromSession, parseCSVData, getPricingData } from '../utils/pricing-utils';
import { Link, useNavigate } from 'react-router-dom';
import { PricingData } from '../types/services';

const ExpressBetaATCCart = () => {
  const navigate = useNavigate();
  const dateTimeRef = useRef<HTMLDivElement>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showDateTimeSection, setShowDateTimeSection] = useState(false);
  
  // Loading state for pricing data
  const [isLoadingPricingData, setIsLoadingPricingData] = useState(true);
  
  // Vehicle details from session
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [fuelType, setFuelType] = useState('');
  
  // Time slot data
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<{id: string, display: string, available: boolean}[]>([]);
  const [bookedSlots, setBookedSlots] = useState<number>(0);
  const [availableSlots, setAvailableSlots] = useState<number>(2);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  
  // Updated price states using data from CSV
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [autoDiscountAmount, setAutoDiscountAmount] = useState(0);
  const [additionalDiscount, setAdditionalDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  
  // Add new state for workshop price calculation
  const [workshopPrice, setWorkshopPrice] = useState(0);

  // Add state for highlighting mobile input
  const [showMobileHighlight, setShowMobileHighlight] = useState(true);
  const [showSlotBookingGuide, setShowSlotBookingGuide] = useState(false);

  // Add new state for tracking if mobile number is submitted
  const [isMobileSubmitted, setIsMobileSubmitted] = useState(false);

  // Add state for tracking lead ID
  const [leadId, setLeadId] = useState<number | null>(null);

  // WhatsApp information
  const [whatsappRedirectTimeout, setWhatsappRedirectTimeout] = useState<NodeJS.Timeout | null>(null);
  const WHATSAPP_PHONE_NUMBER = '917300042410';

  // Load pricing data on component mount
  useEffect(() => {
    const loadPricingData = async () => {
      setIsLoadingPricingData(true);
      try {
        // Load vehicle details from session
        const savedVehicle = getVehicleFromSession();
        if (savedVehicle) {
          setCarBrand(savedVehicle.manufacturer);
          setCarModel(savedVehicle.model);
          setFuelType(savedVehicle.fuelType);

          // Load CSV data
          const csvData = await parseCSVData();
          
          // Get pricing for this specific vehicle
          const pricing = getPricingData(csvData, savedVehicle);
          
          if (pricing) {
            // Set pricing data from CSV
            setOriginalPrice(pricing.expressServicePrice);
            setDiscountedPrice(pricing.discountedExpressPrice);
            
            // Calculate auto discount (original - discounted)
            const autoDiscount = pricing.expressServicePrice - pricing.discountedExpressPrice;
            setAutoDiscountAmount(autoDiscount);
            
            // Set final price (discounted price by default - before any coupon)
            setFinalPrice(pricing.discountedExpressPrice);
            
            // Set workshop price (2.5x for demonstration, or use actual workshop price if available)
            setWorkshopPrice(Math.round(pricing.expressServicePrice * 2.5));
          } else {
            console.error('No pricing data found for vehicle:', savedVehicle);
            // Redirect back if no pricing data
            navigate('/express-beta-atc');
          }
        } else {
          // If no vehicle details found, redirect back to express-beta-atc
          navigate('/express-beta-atc');
        }
      } catch (error) {
        console.error('Error loading pricing data:', error);
      } finally {
        setIsLoadingPricingData(false);
      }
    };

    loadPricingData();
  }, [navigate]);

  // Effect to handle mobile input highlight animation
  useEffect(() => {
    const timer = setInterval(() => {
      setShowMobileHighlight(prev => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const generateDates = () => {
    const today = new Date();
    const dates = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Format: YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    
    return dates;
  };
  
  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Compare dates without time
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const generateTimeSlots = () => {
    return [
      { id: '09:00-11:00', display: '9:00 AM - 11:00 AM', available: true },
      { id: '11:00-13:00', display: '11:00 AM - 1:00 PM', available: true },
      { id: '13:00-15:00', display: '1:00 PM - 3:00 PM', available: true },
      { id: '15:00-17:00', display: '3:00 PM - 5:00 PM', available: true },
      { id: '17:00-19:00', display: '5:00 PM - 7:00 PM', available: true }
    ];
  };
  
  useEffect(() => {
    // Generate available dates
    setAvailableDates(generateDates());
    // Set default date to today
    setSelectedDate(generateDates()[0]);
    
    // Generate time slots
    setAvailableTimeSlots(generateTimeSlots());

    // Check if mobile number exists in session storage and prefill if available
    const savedMobileNumber = sessionStorage.getItem('userMobileNumber');
    if (savedMobileNumber) {
      setMobileNumber(savedMobileNumber);
      // If the mobile number is already saved, we can consider it as submitted
      if (validateMobile(savedMobileNumber)) {
        setIsMobileSubmitted(true);
        setShowDateTimeSection(true);
        setShowSlotBookingGuide(true);
      }
    }

    // Check if lead ID exists in session storage
    const existingLeadId = sessionStorage.getItem('expressServiceLeadId');
    if (existingLeadId) {
      setLeadId(Number(existingLeadId));
    }
  }, []);
  
  // Simulate some slots being taken when a date is selected
  useEffect(() => {
    if (selectedDate) {
      // Mark time slots as unavailable based on weightage
      const updatedSlots = generateTimeSlots().map((slot, index) => {
        // First slot (9-11 AM) is always booked (high weightage)
        if (index === 0) {
          return { ...slot, available: false };
        }
        
        // Fifth slot (5-7 PM) has high probability of being booked (80%)
        if (index === 4 && Math.random() < 0.8) {
          return { ...slot, available: false };
        }
        
        // Third slot (1-3 PM) has low probability of being booked (30%)
        if (index === 2 && Math.random() < 0.3) {
          return { ...slot, available: false };
        }
        
        // Second and Fourth slots are always available
        return slot;
      });
      
      // Calculate actual counts based on the slots' availability
      const actualBooked = updatedSlots.filter(slot => !slot.available).length;
      const actualAvailable = updatedSlots.filter(slot => slot.available).length;
      
      setBookedSlots(actualBooked);
      setAvailableSlots(actualAvailable);
      setAvailableTimeSlots(updatedSlots);
    }
  }, [selectedDate]);
  
  // Scroll to date time section when it becomes visible
  useEffect(() => {
    if (showDateTimeSection && dateTimeRef.current) {
      setTimeout(() => {
        dateTimeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showDateTimeSection]);
  
  const validateMobile = (number: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };
  
  // Function to create a lead with mobile and vehicle details
  const createLead = async (mobileNumber: string) => {
    try {
      setIsSubmitting(true);
      
      // Store mobile number in session
      sessionStorage.setItem('userMobileNumber', mobileNumber);
      
      // Prepare service type
      const serviceTypeName = "Express Service";
      
      // Create the lead with all info
      const response = await expressService.submitLead({
        mobileNumber: mobileNumber,
        serviceType: serviceTypeName,
        carBrand: carBrand,
        carModel: carModel,
        fuel_type: fuelType,
        servicePrice: originalPrice, // Original price from CSV
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        finalPrice: finalPrice // Final price after all discounts
      } as any);
      
      if (!response || !response.data || !response.data.id) {
        throw new Error('Invalid response from server');
      }
      
      // Store lead ID in state and session
      const newLeadId = response.data.id;
      setLeadId(newLeadId);
      sessionStorage.setItem('expressServiceLeadId', String(newLeadId));
      
      console.log('Lead created successfully with ID:', newLeadId);
      setIsSubmitting(false);
      return newLeadId;
    } catch (error) {
      console.error('Error creating lead:', error);
      setIsSubmitting(false);
      throw error;
    }
  };
  
  // Function to update lead with date and time slot
  const updateLeadWithTimeSlot = async (leadId: number, date: string, timeSlot: string) => {
    try {
      setIsSubmitting(true);
      
      // Update the lead with selected date and time slot
      // Also update coupon and pricing information in case they've changed
      const response = await expressService.updateLead(leadId, {
        timeSlot: timeSlot,
        serviceDate: date,
        servicePrice: originalPrice, // Update the original price
        couponCode: appliedCoupon ? appliedCoupon.code : null, // Update coupon code if applied
        finalPrice: finalPrice // Update final price after all discounts
      });
      
      if (!response || !response.data) {
        throw new Error('Invalid response when updating lead');
      }
      
      console.log('Lead updated successfully with time slot and pricing details');
      setIsSubmitting(false);
      return response.data;
    } catch (error) {
      console.error('Error updating lead with time slot:', error);
      setIsSubmitting(false);
      throw error;
    }
  };
  
  // Update mobile submit handler
  const handleMobileSubmit = async () => {
    // Reset error
    setMobileError('');
    
    // Validate mobile number
    if (!mobileNumber.trim()) {
      setMobileError('Please enter your mobile number');
      return;
    }
    
    if (!validateMobile(mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      // Create lead in Strapi if not already created
      if (!leadId) {
        await createLead(mobileNumber);
      }
      
      // Set mobile as submitted
      setIsMobileSubmitted(true);
      
      // Show slot booking guide
      setShowSlotBookingGuide(true);
      setShowDateTimeSection(true);
      
      // Scroll to date time section
      setTimeout(() => {
        dateTimeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Error during mobile submission:', error);
      setMobileError('Something went wrong. Please try again.');
    }
  };
  
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(''); // Reset time slot when date changes
  };
  
  const handleTimeSlotSelection = (slotId: string) => {
    setSelectedTimeSlot(slotId);
  };
  
  const handleCompleteBooking = async () => {
    if (!selectedDate || !selectedTimeSlot || !mobileNumber) {
      alert('Please complete all required steps to proceed.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Ensure we have a lead ID
      let currentLeadId = leadId;
      
      // If no lead ID, create a new lead first
      if (!currentLeadId) {
        currentLeadId = await createLead(mobileNumber);
      }
      
      // Update the lead with time slot information
      await updateLeadWithTimeSlot(currentLeadId, selectedDate, selectedTimeSlot);
      
      // Show success modal
      setSuccess(true);
      setIsSubmitting(false);
      
      // Set a timeout to redirect to WhatsApp after 2 seconds
      const timeout = setTimeout(() => {
        redirectToWhatsApp();
      }, 2000);
      
      setWhatsappRedirectTimeout(timeout);
    } catch (error) {
      console.error('Error completing booking:', error);
      alert('Something went wrong while completing your booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Helper function to format day number from date
  const getDayNumber = (dateStr: string): string => {
    return new Date(dateStr).getDate().toString();
  };

  // Function to validate and apply coupon
  const validateAndApplyCoupon = () => {
    setCouponError('');
    
    // For this example, we'll implement the TEST-10OFF coupon
    if (couponCode.toUpperCase() === 'TEST-10OFF') {
      const basePrice = discountedPrice; // Use the already discounted price as base
      const couponDiscount = Math.round(basePrice * 0.1); // 10% of base price
      setAdditionalDiscount(couponDiscount);
      setFinalPrice(basePrice - couponDiscount);
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: couponDiscount
      });
      setShowCouponInput(false);
      setDiscountApplied(true);
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  // Function to remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setAdditionalDiscount(0);
    setFinalPrice(discountedPrice); // Reset to discounted price without coupon
    setDiscountApplied(false);
  };

  // Function to format date for WhatsApp message
  const formatDateForWhatsApp = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Function to redirect to WhatsApp with pre-filled message
  const redirectToWhatsApp = () => {
    // Clear the timeout if it exists
    if (whatsappRedirectTimeout) {
      clearTimeout(whatsappRedirectTimeout);
      setWhatsappRedirectTimeout(null);
    }
    
    // Get the time slot display text
    const timeSlotDisplay = availableTimeSlots.find(slot => slot.id === selectedTimeSlot)?.display || selectedTimeSlot;
    
    // Format the date
    const formattedDate = formatDateForWhatsApp(selectedDate);
    
    // Calculate discounts
    const websiteDiscount = autoDiscountAmount;
    const couponDiscount = appliedCoupon ? additionalDiscount : 0;
    const totalPrice = finalPrice;
    
    // Create the message
    let message = `Hi, I booked a 90 Mins Car Express Car Service with GaadiMech
Car Manufacturer: ${carBrand}
Car Model: ${carModel}
Original Price: ₹${originalPrice}`;

    // Build the calculation part of the message
    message += `
Website Discount: -₹${websiteDiscount}`;

    // Add coupon discount if applied
    if (appliedCoupon) {
      message += `
Coupon Discount: -₹${couponDiscount}`;
    }

    // Show final calculation result
    message += `
Final Price: ₹${totalPrice}
Booking Slot: ${formattedDate}, ${timeSlotDisplay}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
    
    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  };
  
  // Clean up timeout when component unmounts
  useEffect(() => {
    return () => {
      if (whatsappRedirectTimeout) {
        clearTimeout(whatsappRedirectTimeout);
      }
    };
  }, [whatsappRedirectTimeout]);

  // Conditional rendering while loading
  if (isLoadingPricingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7200] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pricing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24 hide-whatsapp-button">
      <Helmet>
        <title>Complete Your Express Service Booking - GaadiMech</title>
        <meta name="description" content="Complete your express car service booking. Choose your service date and time, view pricing details, and confirm your booking." />
        <style>
          {`
            /* Hide WhatsApp button on this page */
            .hide-whatsapp-button .whatsapp-button {
              display: none !important;
            }

            /* Ensure proper bottom padding for content */
            @media (max-width: 1024px) {
              .hide-whatsapp-button {
                padding-bottom: 88px !important;
              }
            }
          `}
        </style>
      </Helmet>

      {/* Header with Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-2">
              <span>1. Car Details</span>
              <span className="mx-2">›</span>
              <span className="font-medium text-[#FF7200]">2. Service Selection</span>
              <span className="mx-2">›</span>
              <span className="text-gray-400">3. Booking Time</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Main content grid with different orders for mobile/desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Vehicle Details Card - Order 1 on mobile */}
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 order-1 lg:order-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <Car className="w-10 h-10 lg:w-12 lg:h-12 text-gray-700" />
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{carBrand} {carModel}</h2>
                    <p className="text-gray-600">{fuelType}</p>
                  </div>
                </div>
                <Link 
                  to="/express-beta-atc" 
                  className="text-[#FF7200] hover:text-[#FF6000] font-medium flex items-center"
                >
                  Change Vehicle
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Compare & Save Section - Order 2 on mobile - Optimized height */}
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 order-2 lg:order-none">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Compare & Save</h2>
              
              <div className="flex flex-col space-y-3">
                {/* Regular Workshop Service */}
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg border-l-4 border-[#FF8A3D]">
                  <div>
                    <h3 className="text-gray-700 font-medium">Regular Workshop Service</h3>
                    <p className="text-gray-500 text-sm">Authorized Service Center</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">₹{workshopPrice}</span>
                    <p className="text-gray-500 text-xs">4-8 hours service time</p>
                  </div>
                </div>
                
                {/* Express Service - Compact version with dynamic pricing */}
                <div className="bg-[#FFF8F0] p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">Express Service</h3>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Save ₹{workshopPrice - finalPrice}
                        </span>
                      </div>
                      <div className="flex items-center text-[#FF8A3D] text-sm mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>90-Minute Service</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 line-through text-sm">₹{originalPrice}</div>
                      <div className="font-bold text-xl text-[#FF8A3D]">₹{finalPrice}</div>
                      <div className="text-green-600 text-xs">Auto discount: ₹{autoDiscountAmount} OFF</div>
                      {appliedCoupon && (
                        <div className="text-blue-600 text-xs">Coupon: ₹{additionalDiscount} OFF</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Code Section - Order 3 on mobile */}
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 order-3 lg:order-none">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Have a Coupon Code?</h2>
                {appliedCoupon && (
                  <div className="text-green-600 font-medium text-sm flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Coupon Applied
                  </div>
                )}
              </div>

              {!appliedCoupon ? (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="ENTER COUPON CODE"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF7200] transition-all duration-300 uppercase"
                      />
                      {couponCode && (
                        <button 
                          onClick={() => setCouponCode('')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={validateAndApplyCoupon}
                      className="bg-[#FF7200] text-white px-6 py-3 rounded-lg hover:bg-[#FF6000] text-lg font-medium transition-all flex items-center justify-center whitespace-nowrap"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm bg-red-50 p-2 rounded flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {couponError}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <Tag className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="font-medium text-blue-800 text-lg">{appliedCoupon.code}</p>
                      </div>
                      <p className="text-blue-600 flex items-center mt-1">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Additional ₹{additionalDiscount} OFF applied
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-blue-600 hover:text-blue-800 font-medium bg-white py-1 px-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 text-gray-600 space-y-1">
                <p className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  ₹500 discount is auto-applied to all express services
                </p>
                <p className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Apply coupon code to get additional discounts
                </p>
              </div>
            </div>

            {/* Mobile Number Section - Enhanced with better nudge */}
            <div className={`bg-white rounded-lg shadow-sm p-4 lg:p-6 order-4 lg:order-none ${showMobileHighlight ? 'ring-2 ring-[#FF7200] ring-opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Enter Mobile Number</h2>
                <div className="flex items-center text-[#FF7200]">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Quick 2-step booking</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    className={`w-full border ${mobileError ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF7200]`}
                  />
                </div>
                {mobileError && <p className="text-red-500 text-sm">{mobileError}</p>}
                
                <button
                  onClick={handleMobileSubmit}
                  className="w-full bg-[#FF7200] text-white font-bold py-4 rounded-lg hover:bg-[#FF6000] transition-colors text-lg flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Continue to Book Slot
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Your number is safe with us</span>
                </div>
              </div>

              {/* Benefits list */}
              <div className="mt-4 space-y-2">
                <p className="text-gray-600 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Book your slot in under 2 minutes
                </p>
                <p className="text-gray-600 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Get instant booking confirmation
                </p>
                <p className="text-gray-600 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No advance payment required
                </p>
              </div>
            </div>

            {/* Date & Time Selection Section */}
            {showDateTimeSection && (
              <div ref={dateTimeRef} className="bg-white rounded-lg shadow-sm p-4 lg:p-6 animate__animated animate__fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Select Date & Time</h2>
                  {showSlotBookingGuide && (
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Choose your preferred slot</span>
                    </div>
                  )}
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Select Date</label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {availableDates.map((date, index) => {
                      const isToday = index === 0;
                      const isTomorrow = index === 1;
                      const dateObj = new Date(date);
                      const dayName = isToday ? 'Today' : 
                                     isTomorrow ? 'Tomorrow' : 
                                     dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNumber = dateObj.getDate();
                      const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                      
                      return (
                        <button
                          key={date}
                          onClick={() => handleDateSelection(date)}
                          className={`p-3 text-center rounded-lg border transition-all ${
                            selectedDate === date
                              ? 'border-[#FF7200] bg-orange-50 text-[#FF7200] shadow-sm'
                              : 'border-gray-200 hover:border-[#FF7200] hover:bg-orange-50/50'
                          }`}
                        >
                          <div className="text-xs font-medium">{dayName}</div>
                          <div className="text-base font-bold">{dayNumber}</div>
                          <div className="text-xs text-gray-500">{month}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Selection */}
                {selectedDate && (
                  <div className="animate__animated animate__fadeIn">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gray-700 font-medium">Select Time Slot</label>
                      <div className="flex items-center space-x-3 text-xs">
                        <div className="flex items-center text-amber-600">
                          <div className="w-2 h-2 rounded-full bg-amber-600 mr-1"></div>
                          <span>{bookedSlots} booked</span>
                        </div>
                        <div className="flex items-center text-green-600">
                          <div className="w-2 h-2 rounded-full bg-green-600 mr-1"></div>
                          <span>{availableSlots} available</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => slot.available ? handleTimeSlotSelection(slot.id) : null}
                          disabled={!slot.available}
                          className={`p-4 text-left rounded-lg border transition-all ${
                            !slot.available
                              ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
                              : selectedTimeSlot === slot.id
                              ? 'border-[#FF7200] bg-orange-50 text-[#FF7200]'
                              : 'border-gray-200 hover:border-[#FF7200] hover:bg-orange-50/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{slot.display}</div>
                              {!slot.available && (
                                <div className="text-gray-500 mt-1 flex items-center">
                                  <span className="inline-block w-2 h-2 bg-amber-600 rounded-full mr-1"></span>
                                  <span className="text-xs">Not available</span>
                                </div>
                              )}
                            </div>
                            {slot.available && selectedTimeSlot === slot.id && (
                              <CheckCircle className="w-5 h-5 text-[#FF7200]" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Slot Selection Guide */}
                    {showSlotBookingGuide && (
                      <div className="mt-4 bg-green-50 p-3 rounded-lg">
                        <p className="text-green-700 text-sm flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Select a date and time slot to complete your booking
                        </p>
                      </div>
                    )}

                    {/* Express Service Promise */}
                    <div className="mt-4 border-t pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-[#FF7200]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">90-Minute Express Service</h4>
                          <p className="text-sm text-gray-600">
                            Your car service will be completed within 90 minutes as soon as as the car reaches the workshop.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Selected Date & Time Summary - Show when both are selected */}
                {selectedDate && selectedTimeSlot && (
                  <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-blue-700">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDateDisplay(selectedDate)}</span>
                        </div>
                        <div className="flex items-center text-blue-700">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{availableTimeSlots.find(slot => slot.id === selectedTimeSlot)?.display}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedDate('');
                          setSelectedTimeSlot('');
                        }}
                        className="text-blue-600 text-sm hover:text-blue-800"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price Summary - Order 5 on mobile */}
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 order-5 lg:order-none lg:hidden">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Price Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Original Price</span>
                  <span>₹{originalPrice}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Auto Discount</span>
                  <span>-₹{autoDiscountAmount}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-blue-600">
                    <span>Coupon Discount</span>
                    <span>-₹{additionalDiscount}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-xl">
                  <span>Final Price</span>
                  <span className="text-[#FF7200]">₹{finalPrice}</span>
                </div>
              </div>
            </div>

            {/* Service Inclusions Section - Order 6 on mobile */}
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 order-6 lg:order-none">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Service Inclusions</h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {/* First Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Engine Oil Replacement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Air Filter Replacement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Interior Vacuuming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Coolant Top-up</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Brake Oil Top-up</span>
                  </div>
                </div>

                {/* Second Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Oil Filter Replacement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Complete Car Wash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">15 Point Inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Battery Water Top-up</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Wiper Fluid Top-up</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-medium text-blue-700 text-sm">90-Minute Service</span>
                      <p className="text-blue-600 text-xs">Quick service by experts</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="font-medium text-green-700 text-sm">1-Month Warranty</span>
                      <p className="text-green-600 text-xs">On parts and labor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Only visible on desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              {isMobileSubmitted ? (
                /* Complete Booking Section (after mobile submission) */
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Complete Booking</h2>
                  
                  {selectedDate && selectedTimeSlot ? (
                    <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center text-blue-700">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{formatDateDisplay(selectedDate)}</span>
                          </div>
                          <div className="flex items-center text-blue-700">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{availableTimeSlots.find(slot => slot.id === selectedTimeSlot)?.display}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedDate('');
                            setSelectedTimeSlot('');
                          }}
                          className="text-blue-600 text-sm hover:text-blue-800"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 bg-amber-50 p-3 rounded-lg">
                      <p className="text-amber-700 text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Please select a date and time slot below
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={handleCompleteBooking}
                    disabled={!selectedDate || !selectedTimeSlot || isSubmitting}
                    className={`w-full font-bold py-4 rounded-lg transition-colors text-lg flex items-center justify-center ${
                      selectedDate && selectedTimeSlot && !isSubmitting
                        ? 'bg-[#FF7200] text-white hover:bg-[#FF6000]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } relative overflow-hidden group`}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Processing...' : 'Complete Booking'}
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  </button>
                  
                  <div className="mt-3 text-gray-600 text-sm flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>Booking for: {mobileNumber}</span>
                    <button 
                      onClick={() => setIsMobileSubmitted(false)} 
                      className="ml-2 text-[#FF7200] hover:text-[#FF6000]"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                /* Mobile Number Section (before submission) */
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Enter Mobile Number</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                        className={`w-full border ${mobileError ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF7200]`}
                      />
                    </div>
                    {mobileError && <p className="text-red-500 text-sm">{mobileError}</p>}
                    
                    <button
                      onClick={handleMobileSubmit}
                      disabled={!mobileNumber}
                      className={`w-full bg-[#FF7200] text-white font-bold py-4 rounded-lg hover:bg-[#FF6000] transition-colors text-lg flex items-center justify-center ${!mobileNumber ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      Continue to Book Slot
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Price Summary Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Price Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Original Price</span>
                    <span>₹{originalPrice}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Auto Discount</span>
                    <span>-₹{autoDiscountAmount}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-blue-600">
                      <span>Coupon Discount</span>
                      <span>-₹{additionalDiscount}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between font-bold text-xl">
                    <span>Final Price</span>
                    <span className="text-[#FF7200]">₹{finalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add a gradient fade at the bottom before the sticky CTA */}
        <div className="h-24 bg-gradient-to-t from-gray-50 to-transparent fixed bottom-[72px] left-0 right-0 pointer-events-none lg:hidden"></div>

        {/* Enhanced Mobile Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-top p-4 border-t border-gray-200 z-50">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600">Total Price</div>
              <div className="font-bold text-2xl text-[#FF7200]">₹{finalPrice}</div>
              <div className="text-green-600 text-xs">
                Save ₹{workshopPrice - finalPrice} vs. Workshop
              </div>
            </div>
            <button
              onClick={isMobileSubmitted ? handleCompleteBooking : handleMobileSubmit}
              disabled={isMobileSubmitted ? (!selectedDate || !selectedTimeSlot || isSubmitting) : !mobileNumber}
              className={`px-6 py-3 rounded-lg font-bold text-lg ${
                isMobileSubmitted
                  ? (selectedDate && selectedTimeSlot && !isSubmitting
                    ? 'bg-[#FF7200] text-white hover:bg-[#FF6000]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                  : (mobileNumber
                    ? 'bg-[#FF7200] text-white hover:bg-[#FF6000]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed')
              } relative overflow-hidden group`}
            >
              <span className="relative z-10">
                {isSubmitting 
                  ? 'Processing...' 
                  : isMobileSubmitted 
                    ? 'Complete Booking'
                    : 'Continue to Book Slot'}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-end">
              <button 
                onClick={() => {
                  setSuccess(false);
                  redirectToWhatsApp(); // Immediately redirect if user closes modal
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">Your express service has been booked successfully.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Service Type:</div>
                <div className="font-medium">Express Service</div>
                <div className="text-gray-500">Vehicle:</div>
                <div className="font-medium">{carBrand} {carModel}</div>
                <div className="text-gray-500">Date:</div>
                <div className="font-medium">{formatDateDisplay(selectedDate)}</div>
                <div className="text-gray-500">Time:</div>
                <div className="font-medium">
                  {availableTimeSlots.find(slot => slot.id === selectedTimeSlot)?.display}
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mb-4">
              Redirecting to WhatsApp in a moment...
            </p>
            <Link 
              to="/"
              onClick={(e) => {
                e.preventDefault();
                redirectToWhatsApp();
              }}
              className="block w-full py-3 bg-[#FF7200] text-white font-bold rounded-md text-center hover:bg-[#FF6000]"
            >
              Continue to WhatsApp
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpressBetaATCCart; 