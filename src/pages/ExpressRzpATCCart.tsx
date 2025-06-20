import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Calendar, ArrowRight, ArrowUp, ArrowDown, Shield, AlertTriangle, X, Car, Phone, Tag, ChevronDown, MapPin, AlertCircle, CreditCard, Star } from 'lucide-react';

import { expressService } from '../services/expressService';
import { getVehicleFromSession, parseCSVData, getPricingData } from '../utils/pricing-utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PricingData } from '../types/services';
import { useLocation as useUserLocation } from '../hooks/useLocation';
import { LocationData } from '../utils/location';

// Add new interface for time slots
interface TimeSlot {
  id: string;
  display: string;
  available: boolean;
  start: string;
  end: string;
}

// Declare Razorpay global variable
declare global {
  interface Window {
    Razorpay: any;
  }
}

const ExpressRzpATCCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<number>(0);
  const [availableSlots, setAvailableSlots] = useState<number>(2);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string>('');
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

  const [showSlotBookingGuide, setShowSlotBookingGuide] = useState(false);

  // Add new state for tracking if mobile number is submitted
  const [isMobileSubmitted, setIsMobileSubmitted] = useState(false);

  // Add state for tracking lead ID
  const [leadId, setLeadId] = useState<number | null>(null);

  // WhatsApp information
  const [whatsappRedirectTimeout, setWhatsappRedirectTimeout] = useState<NodeJS.Timeout | null>(null);
  const WHATSAPP_PHONE_NUMBER = '917300042410';

  // Add state to track if coupon has been applied already
  const [couponApplied, setCouponApplied] = useState(false);

  // Add state for collapsible coupon section
  const [showCouponSection, setShowCouponSection] = useState(false);

  // Location detection - basic implementation for RZP version
  // const { location: userLocation, isServiceable, locationDisplay } = useUserLocation(true);

  // State to track if user has been warned about non-serviceable area
  const [hasShownLocationWarning, setHasShownLocationWarning] = useState(false);

  // NEW PAYMENT STATES
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [prePaidDiscount, setPrePaidDiscount] = useState(200); // Rs. 200 discount for paying Rs. 100
  const [bookingFee, setBookingFee] = useState(100); // Rs. 100 booking fee
  const [whatsappRedirectCountdown, setWhatsappRedirectCountdown] = useState(3);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  // Update the setCouponError function to ensure it always sets a string
  const setCouponErrorSafe = (error: unknown): void => {
    if (typeof error === 'string') {
      setCouponError(error);
    } else if (error && typeof error === 'object') {
      // Handle object errors
      if ('message' in error && typeof error.message === 'string') {
        setCouponError(error.message);
      } else if ('error' in error && typeof error.error === 'string') {
        setCouponError(error.error);
      } else {
        setCouponError('An error occurred with the coupon');
      }
    } else {
      setCouponError('An unexpected error occurred');
    }
  };

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
            navigate('/express-rzp-atc');
          }
        } else {
          // If no vehicle details found, redirect back to express-rzp-atc
          navigate('/express-rzp-atc');
        }
      } catch (error) {
        console.error('Error loading pricing data:', error);
      } finally {
        setIsLoadingPricingData(false);
      }
    };

    loadPricingData();
  }, [navigate]);

  // Extract coupon code from URL parameters
  useEffect(() => {
    // First check if there's a coupon parameter in the URL
    const params = new URLSearchParams(location.search);
    const couponParam = params.get('coupon');
    
    // Then check if there's a coupon code in session storage (from the previous page)
    const sessionCoupon = sessionStorage.getItem('pendingCoupon');
    
    // Prioritize URL parameter over session storage
    const couponToApply = couponParam || sessionCoupon;
    
    if (couponToApply) {
      // Set the coupon code (convert to uppercase)
      setCouponCode(couponToApply.toUpperCase());
      
      // Show the coupon section when there's a coupon to apply
      setShowCouponSection(true);
      
      // Clear from session storage after reading it
      if (sessionCoupon) {
        sessionStorage.removeItem('pendingCoupon');
      }
      
      // Auto-apply the coupon after a short delay
      // The delay ensures that component state is fully initialized
      // Note: validateAndApplyCoupon function would need to be implemented for coupon functionality
      console.log('Coupon to apply:', couponToApply);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Load Razorpay script
  useEffect(() => {
    // Check if Razorpay script is already loaded
    if (window.Razorpay) {
      console.log('Razorpay already loaded');
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      console.log('Razorpay script already in DOM');
      return;
    }

    console.log('Loading Razorpay script');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
    };
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Helper function to get current time in IST
  const getCurrentTimeIST = () => {
    // Get current time in UTC
    const now = new Date();
    // Convert to IST (UTC+5:30)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));
    return istTime;
  };

  const generateDates = () => {
    // Get current IST date and time
    const todayIST = getCurrentTimeIST();
    const dates = [];
    
    // Generate 7 dates starting from today
    for (let i = 0; i < 7; i++) {
      const date = new Date(todayIST);
      date.setDate(todayIST.getDate() + i);
      
      // Format: YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    
    return dates;
  };

  // Rest of the functions...
  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const todayIST = getCurrentTimeIST();
    const today = new Date(todayIST);
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const inputDate = new Date(dateStr + 'T00:00:00');
    
    // Compare dates without time
    const compareDate = (date1: Date, date2: Date) => {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    };
    
    if (compareDate(inputDate, today)) return 'Today';
    if (compareDate(inputDate, tomorrow)) return 'Tomorrow';
    
    return inputDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const generateTimeSlots = () => {
    return [
      { id: '09:00-11:00', display: '9:00 AM - 11:00 AM', available: true, start: '09:00', end: '11:00' },
      { id: '11:00-13:00', display: '11:00 AM - 1:00 PM', available: true, start: '11:00', end: '13:00' },
      { id: '13:00-15:00', display: '1:00 PM - 3:00 PM', available: true, start: '13:00', end: '15:00' },
      { id: '15:00-17:00', display: '3:00 PM - 5:00 PM', available: true, start: '15:00', end: '17:00' },
      { id: '17:00-19:00', display: '5:00 PM - 7:00 PM', available: true, start: '17:00', end: '19:00' }
    ];
  };

  useEffect(() => {
    // Generate available dates
    const dates = generateDates();
    setAvailableDates(dates);
    
    // Check if after 5 PM - if yes, select tomorrow as default
    const todayIST = getCurrentTimeIST();
    const currentHourIST = todayIST.getHours();
    const isAfterLastSlot = currentHourIST >= 17;
    
    // Set default date to tomorrow if after 5 PM, otherwise today
    setSelectedDate(isAfterLastSlot ? dates[1] : dates[0]);
    
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

  // WhatsApp redirect countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showBookingConfirmation && paymentSuccess && whatsappRedirectCountdown > 0) {
      interval = setInterval(() => {
        setWhatsappRedirectCountdown(prev => {
          if (prev <= 1) {
            // Auto redirect to WhatsApp
            const bookingDetails = sessionStorage.getItem('bookingDetails');
            if (bookingDetails) {
              const details = JSON.parse(bookingDetails);
              const selectedSlot = availableTimeSlots.find(slot => slot.id === details.timeSlot);
              const message = `Hi! I've successfully booked a Priority Express Service slot. Here are my booking details:

🚗 Vehicle: ${details.vehicle}
📅 Date: ${formatDateDisplay(details.date)}
⏰ Time: ${selectedSlot?.display}
💰 Booking Fee Paid: ₹${details.bookingFee}
🆔 Payment ID: ${details.paymentId}

Please confirm my booking. Thank you!`;
              window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showBookingConfirmation, paymentSuccess, whatsappRedirectCountdown, availableTimeSlots, WHATSAPP_PHONE_NUMBER]);

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
      
      // Get current time in IST
      const todayIST = getCurrentTimeIST();
      const selectedDateObj = new Date(selectedDate);
      const isToday = selectedDateObj.toDateString() === todayIST.toDateString();
      
      // For today, filter out time slots that have already started
      if (isToday) {
        const currentTimeIST = todayIST.getHours() * 60 + todayIST.getMinutes();
        
        // Filter out time slots that have already started
        const filteredSlots = updatedSlots.map(slot => {
          const slotStartTime = parseInt(slot.start.split(':')[0]) * 60 + parseInt(slot.start.split(':')[1]);
          // If slot has already started, mark it as unavailable
          if (slotStartTime <= currentTimeIST) {
            return { ...slot, available: false };
          }
          return slot;
        });
        
        // Calculate actual counts based on the slots' availability
        const actualBooked = filteredSlots.filter(slot => !slot.available).length;
        const actualAvailable = filteredSlots.filter(slot => slot.available).length;
        
        setBookedSlots(actualBooked);
        setAvailableSlots(actualAvailable);
        setAvailableTimeSlots(filteredSlots);
      } else {
        // For future dates, use the original updatedSlots
        const actualBooked = updatedSlots.filter(slot => !slot.available).length;
        const actualAvailable = updatedSlots.filter(slot => slot.available).length;
        
        setBookedSlots(actualBooked);
        setAvailableSlots(actualAvailable);
        setAvailableTimeSlots(updatedSlots);
      }
    }
  }, [selectedDate]);

  const validateMobile = (number: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  // Razorpay payment handler
  const handleRazorpayPayment = () => {
    console.log('Payment button clicked');
    
    if (!window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      alert('Razorpay SDK not loaded. Please refresh the page and try again.');
      setIsProcessingPayment(false);
      return;
    }

    setIsProcessingPayment(true);
    setPaymentFailed(false);
    setPaymentError('');
    console.log('Starting Razorpay payment with amount:', bookingFee * 100);

    const options = {
      key: 'rzp_test_719oj4MDAGClqw', // Using the test key from rzp-test.csv
      amount: bookingFee * 100, // Amount in paisa (₹100 = 10000 paisa)
      currency: 'INR',
      name: 'GaadiMech',
      description: 'Express Service Priority Slot Booking',
      image: '/images/logo1.png',
      order_id: '', // This should be generated from your backend
      handler: function (response: any) {
        console.log('Payment successful:', response);
        
        // Handle successful payment
        setPaymentSuccess(true);
        setIsProcessingPayment(false);
        setShowBookingConfirmation(true);
        setShowPaymentSection(false);
        
        // Store payment details in session
        sessionStorage.setItem('rzpPaymentId', response.razorpay_payment_id);
        sessionStorage.setItem('rzpOrderId', response.razorpay_order_id || '');
        sessionStorage.setItem('rzpSignature', response.razorpay_signature || '');
        
        // Store booking details for WhatsApp message
        sessionStorage.setItem('bookingDetails', JSON.stringify({
          vehicle: `${carBrand} ${carModel}`,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          bookingFee: bookingFee,
          paymentId: response.razorpay_payment_id
        }));
      },
      prefill: {
        name: 'Customer',
        email: 'customer@example.com',
        contact: mobileNumber
      },
      notes: {
        vehicle: `${carBrand} ${carModel}`,
        slot_date: selectedDate,
        slot_time: selectedTimeSlot,
        service_type: 'Express Service'
      },
      theme: {
        color: '#FF7200'
      },
      modal: {
        ondismiss: function() {
          setIsProcessingPayment(false);
          console.log('Payment modal closed');
          // If payment was not successful and modal was dismissed, show retry option
          if (!paymentSuccess) {
            setPaymentFailed(true);
            setPaymentError('Payment was cancelled or failed. Please try again.');
          }
        },
        onhidden: function() {
          console.log('Payment modal hidden');
        }
      }
    };

    try {
      console.log('Creating Razorpay instance with options:', options);
      const rzp = new window.Razorpay(options);
      
      // Handle payment failure
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        setIsProcessingPayment(false);
        setPaymentFailed(true);
        setPaymentError(response.error.description || 'Payment failed. Please try again.');
        setShowPaymentSection(false); // Go back to slot selection
      });
      
      console.log('Opening Razorpay checkout');
      rzp.open();
    } catch (error) {
      console.error('Error opening Razorpay:', error);
      setIsProcessingPayment(false);
      setPaymentFailed(true);
      setPaymentError('Error opening payment gateway. Please try again.');
    }
  };

  // Function to retry payment
  const retryPayment = () => {
    setPaymentFailed(false);
    setPaymentError('');
    setShowPaymentSection(true);
  };

  // Continue with the rest of the component...
  return (
    <div className="bg-gray-50 min-h-screen pb-24 hide-whatsapp-button hide-enquiry-form">
      {/* Header content */}
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
              <span className="mx-2">›</span>
              <span className="text-gray-400">4. Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Show loading state */}
      {isLoadingPricingData && (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7200] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading pricing data...</p>
          </div>
        </div>
      )}

      {/* Main content when loaded */}
      {!isLoadingPricingData && (
        <div className="container mx-auto px-4 py-6 max-w-7xl pb-24 lg:pb-6">
          {/* Vehicle Details Card */}
          <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Car className="w-8 h-8 lg:w-9 lg:h-9 text-gray-700" />
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900">{carBrand} {carModel}</h2>
                  <p className="text-sm text-gray-600">{fuelType}</p>
                </div>
              </div>
              <Link 
                to="/express-rzp-atc" 
                className="text-[#FF7200] hover:text-[#FF6000] font-medium flex items-center text-sm"
              >
                Change Vehicle
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>

          {/* Compare & Save Section - Hide when payment section is shown */}
          {!showPaymentSection && !showBookingConfirmation && (
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Compare & Save</h2>
              
              <div className="flex flex-col space-y-4">
                {/* Regular Workshop Service */}
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg border-l-4 border-[#FF8A3D]">
                  <div>
                    <h3 className="text-gray-700 font-medium text-base">Regular Workshop Service</h3>
                    <p className="text-gray-500 text-sm">Authorized Service Center</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-900">₹{workshopPrice}</span>
                    <p className="text-gray-500 text-sm">6-8 hours service time</p>
                  </div>
                </div>
                
                {/* Express Service - Show actual discounted price from CSV */}
                <div className="bg-[#FFF8F0] p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">Express Service</h3>
                        <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full font-medium">
                          Save ₹{workshopPrice - discountedPrice}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">90-minute service</p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 line-through text-base">₹{originalPrice}</div>
                      <div className="font-bold text-2xl text-[#FF8A3D]">₹{discountedPrice}</div>
                      <div className="text-green-600 text-xs">Website discount: ₹{autoDiscountAmount} OFF</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Promotional Banner - Only on Payment Page */}
          {showPaymentSection && !showBookingConfirmation && (
            <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-md p-4 mb-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-base font-bold mb-1">
                    Express Service Package: <span className="text-yellow-200">₹{discountedPrice}</span>
                  </p>
                  <p className="text-base font-bold">
                    🎉 Get Additional <span className="bg-white bg-opacity-25 px-2 py-1 rounded">₹{prePaidDiscount} OFF</span> on Booking Slot Now!
                  </p>
                </div>
                <div className="text-right ml-3">
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                    <p className="text-xs opacity-90">Final Price</p>
                    <p className="text-xl font-bold text-yellow-200">₹{discountedPrice - prePaidDiscount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Express Service Summary - Payment Phase */}
          {showPaymentSection && !showBookingConfirmation && (
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Service Selection</h2>
              
              {/* Express Service - Show reduced price with additional discount */}
              <div className="bg-gradient-to-r from-[#FFF8F0] to-green-50 p-4 rounded-lg border-2 border-green-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">Express Service</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Priority booking • 90-minute service</p>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 line-through text-sm">₹{discountedPrice}</div>
                    <div className="font-bold text-2xl text-[#FF8A3D]">₹{discountedPrice - prePaidDiscount}</div>
                    <div className="text-blue-600 text-xs font-medium">Additional ₹{prePaidDiscount} OFF on Slot Booking</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Number Section - Show only when mobile not submitted */}
          {!isMobileSubmitted && (
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6">
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-[#FF7200] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-[#FF7200] font-medium text-sm">Enter Mobile Number</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-gray-500 font-medium text-sm">Select Date & Time</span>
                </div>
              </div>
              
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
                  onClick={() => {
                    if (!validateMobile(mobileNumber)) {
                      setMobileError('Please enter a valid 10-digit mobile number');
                      return;
                    }
                                    setMobileError('');
                setIsMobileSubmitted(true);
                setShowSlotBookingGuide(true);
                  }}
                  className="w-full bg-[#FF7200] text-white font-bold py-4 rounded-lg hover:bg-[#FF6000] transition-colors text-lg flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Next: Select Your Slot
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Your number is safe with us</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Failure Section */}
          {paymentFailed && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 lg:p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-red-800 text-center mb-2">Payment Failed</h2>
              <p className="text-red-600 text-center mb-4">{paymentError}</p>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-bold text-gray-900 mb-2">Your Selected Details:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium">{carBrand} {carModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatDateDisplay(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">
                      {availableTimeSlots.find(slot => slot.id === selectedTimeSlot)?.display}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button
                  onClick={retryPayment}
                  className="w-full bg-[#FF7200] text-white font-bold py-3 rounded-lg hover:bg-[#FF6000] transition-colors flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Retry Payment
                </button>
                <button
                  onClick={() => {
                    setPaymentFailed(false);
                    setPaymentError('');
                    setSelectedDate('');
                    setSelectedTimeSlot('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Select Different Slot
                </button>
              </div>
            </div>
          )}

          {/* Date & Time Selection Section - Show when mobile submitted */}
          {isMobileSubmitted && !showPaymentSection && !paymentFailed && !showBookingConfirmation && (
            <div ref={dateTimeRef} className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6 animate__animated animate__fadeIn">
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <span className="text-green-600 font-medium text-sm">Enter Mobile Number</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="bg-[#FF7200] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-[#FF7200] font-medium text-sm">Select Date & Time</span>
                </div>
              </div>
              
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
                        onClick={() => setSelectedDate(date)}
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
                        onClick={() => slot.available ? setSelectedTimeSlot(slot.id) : null}
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

                  {/* Show Payment Section when date and time are selected */}
                  {selectedDate && selectedTimeSlot && (
                    <div className="mt-6">
                      <button
                        onClick={() => setShowPaymentSection(true)}
                        className="w-full bg-[#FF7200] text-white font-bold py-4 rounded-lg hover:bg-[#FF6000] transition-colors text-lg flex items-center justify-center"
                      >
                        Confirm Booking
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Service Inclusions Section - Show always */}
          {!showPaymentSection && !showBookingConfirmation && !paymentFailed && (
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6">
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
          )}





          {/* PAYMENT SECTION */}
          {showPaymentSection && selectedDate && selectedTimeSlot && !showBookingConfirmation && (
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Complete Your Booking</h2>
              
              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium">{carBrand} {carModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatDateDisplay(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">
                      {availableTimeSlots.find(slot => slot.id === selectedTimeSlot)?.display}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Fee (Refundable):</span>
                    <span className="font-medium">₹{bookingFee}</span>
                  </div>
                </div>
                
                {/* Booking Amount Adjustment Notice */}
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-700 text-sm font-medium">Booking Amount Adjustment</p>
                      <p className="text-blue-600 text-xs mt-1">
                        This ₹{bookingFee} booking amount will be adjusted from your final service cost. You'll only pay the remaining ₹{discountedPrice - prePaidDiscount - bookingFee} at the workshop.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handleRazorpayPayment}
                disabled={isProcessingPayment}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-colors text-lg flex items-center justify-center space-x-2"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay ₹{bookingFee} & Book Slot</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm mt-3">
                <Shield className="w-4 h-4" />
                <span>Powered by Razorpay</span>
              </div>
            </div>
          )}

          {/* Terms & Conditions Section */}
          {showPaymentSection && selectedDate && selectedTimeSlot && !showBookingConfirmation && (
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Terms & Conditions</h3>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Booking Amount Refund Policy</p>
                    <p>The booking amount paid is fully refundable upon cancellation of the service. Customers may cancel their booking at any time prior to the commencement of service.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Refund Processing Timeline</p>
                    <p>In the event of cancellation, refunds will be processed and credited back to the original payment method within three (3) business working days from the date of cancellation request.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Service Commitment</p>
                    <p>By proceeding with the payment, you acknowledge and agree to the scheduled service appointment. Our team will contact you via WhatsApp for service coordination and confirmation.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Note:</span> For any queries regarding cancellation or refunds, please contact our customer support team. Terms are subject to GaadiMech's standard service agreement.
                </p>
              </div>
            </div>
          )}

          {/* Booking Confirmation Page */}
          {showBookingConfirmation && paymentSuccess && (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
              <div className="max-w-2xl mx-auto pt-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-3">Payment Completed! 🎉</h1>
                  <h2 className="text-2xl font-semibold text-green-600 mb-2">Booking Confirmed</h2>
                  <p className="text-gray-600 mb-8 text-lg">Your priority express service slot has been successfully booked.</p>
              
              {/* Booking Details Card */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <Car className="w-4 h-4 mr-2" />
                        Vehicle:
                      </span>
                      <span className="font-medium">{carBrand} {carModel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Date:
                      </span>
                      <span className="font-medium">{formatDateDisplay(selectedDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Time:
                      </span>
                      <span className="font-medium">
                        {availableTimeSlots.find(slot => slot.id === selectedTimeSlot)?.display}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Booking Fee:
                      </span>
                      <span className="font-medium text-green-600">₹{bookingFee} Paid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Booking ID:
                      </span>
                      <span className="font-medium">GM{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Total Savings:
                      </span>
                      <span className="font-medium text-green-600">₹{prePaidDiscount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Success Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Priority Slot Secured</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Your ₹{bookingFee} booking fee will be adjusted from the final service amount. 
                  You'll only pay ₹{discountedPrice - prePaidDiscount - bookingFee} at the workshop.
                </p>
              </div>

              {/* WhatsApp Redirect Countdown */}
              {whatsappRedirectCountdown > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium mb-2">
                    🚀 Redirecting to WhatsApp in {whatsappRedirectCountdown} seconds...
                  </p>
                  <p className="text-green-600 text-sm">
                    We'll send you all booking details via WhatsApp for easy reference.
                  </p>
                </div>
              )}
              
              {/* Manual WhatsApp Button */}
              <button 
                onClick={() => {
                  const bookingDetails = sessionStorage.getItem('bookingDetails');
                  if (bookingDetails) {
                    const details = JSON.parse(bookingDetails);
                    const selectedSlot = availableTimeSlots.find(slot => slot.id === details.timeSlot);
                    const message = `Hi! I've successfully booked a Priority Express Service slot. Here are my booking details:

🚗 Vehicle: ${details.vehicle}
📅 Date: ${formatDateDisplay(details.date)}
⏰ Time: ${selectedSlot?.display}
💰 Booking Fee Paid: ₹${details.bookingFee}
🆔 Payment ID: ${details.paymentId}

Please confirm my booking. Thank you!`;
                    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
                  }
                }}
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center mx-auto space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                                 <span>Continue to WhatsApp</span>
               </button>
                 </div>
               </div>
             </div>
           )}
        </div>
      )}

      {/* Add a gradient fade at the bottom before the sticky CTA */}
      <div className="h-24 bg-gradient-to-t from-gray-50 to-transparent fixed bottom-[72px] left-0 right-0 pointer-events-none lg:hidden"></div>

      {/* Enhanced Mobile Bottom Bar - Hide when booking is confirmed or payment failed */}
      {!showBookingConfirmation && !paymentFailed && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-top p-4 border-t border-gray-200 z-50">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600">Total Price</div>
              <div className="font-bold text-2xl text-[#FF7200]">
                ₹{showPaymentSection ? (discountedPrice - prePaidDiscount) : discountedPrice}
              </div>
              <div className="text-green-600 text-xs">
                Save ₹{workshopPrice - (showPaymentSection ? (discountedPrice - prePaidDiscount) : discountedPrice)} vs Company Workshops
              </div>
            </div>
            <button
              onClick={() => {
                if (!isMobileSubmitted) {
                  // Handle mobile submission
                  if (!validateMobile(mobileNumber)) {
                    setMobileError('Please enter a valid 10-digit mobile number');
                    return;
                  }
                  setMobileError('');
                  setIsMobileSubmitted(true);
                  setShowSlotBookingGuide(true);
                } else if (!selectedDate || !selectedTimeSlot) {
                  // Scroll to date time section if not selected
                  if (dateTimeRef.current) {
                    dateTimeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                } else if (!showPaymentSection) {
                  // Show payment section
                  setShowPaymentSection(true);
                } else {
                  // Handle payment
                  handleRazorpayPayment();
                }
              }}
              disabled={isProcessingPayment || (!isMobileSubmitted && !mobileNumber)}
              className={`px-6 py-3 rounded-lg font-bold text-lg ${
                (!isMobileSubmitted && !mobileNumber) || isProcessingPayment
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FF7200] text-white hover:bg-[#FF6000]'
              } relative overflow-hidden group`}
            >
              <span className="relative z-10">
                {isProcessingPayment 
                  ? 'Processing...' 
                  : !isMobileSubmitted 
                    ? 'Next: Select Your Slot'
                    : !selectedDate || !selectedTimeSlot
                      ? 'Select Date & Time'
                      : !showPaymentSection
                        ? 'Continue Booking'
                        : `Pay ₹${bookingFee} & Book Slot`}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpressRzpATCCart; 