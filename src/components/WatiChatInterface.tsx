import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Phone, Car, MapPin, Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';

// Strapi API configuration
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337/api';  // Use direct URL for now
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

// Debug environment variables
console.log('🔧 Environment Variables Debug:');
console.log('VITE_STRAPI_API_URL:', import.meta.env.VITE_STRAPI_API_URL);
console.log('VITE_STRAPI_API_TOKEN:', import.meta.env.VITE_STRAPI_API_TOKEN ? 'Token loaded ✅' : 'Token missing ❌');
console.log('STRAPI_API_URL:', STRAPI_API_URL);
console.log('STRAPI_API_TOKEN:', STRAPI_API_TOKEN ? 'Token available ✅' : 'Token missing ❌');
console.log('🔑 Full token (first 50 chars):', STRAPI_API_TOKEN ? STRAPI_API_TOKEN.substring(0, 50) + '...' : 'No token');
console.log('🔑 Token length:', STRAPI_API_TOKEN ? STRAPI_API_TOKEN.length : 0);
console.log('🔑 Expected token length: 256');
console.log('🔑 Token matches expected:', STRAPI_API_TOKEN.length === 256 ? '✅' : '❌');

interface StrapiBooking {
  id?: number;
  documentId?: string;  // Add documentId for Strapi v5
  manufacturer?: string;
  model?: string;
  fuelType?: string;
  location?: string;
  area?: string;
  address?: string;
  serviceType?: string;
  servicePreference?: string;
  date?: string;
  timeSlot?: string;
  fullName?: string;
  mobileNumber?: string;
  bookingId?: string;
  servicePrice?: string;
  booking_status?: 'in_progress' | 'completed' | 'cancelled';
  sessionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  buttons?: QuickReply[];
  showInput?: boolean;
  showDatePicker?: boolean;
  showTimePicker?: boolean;
  inputType?: 'text' | 'phone' | 'email';
  placeholder?: string;
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
  payload?: any;
}

interface BookingData {
  manufacturer?: string;
  model?: string;
  fuelType?: string;
  location?: string;
  area?: string;
  address?: string;
  serviceType?: string;
  servicePreference?: string;
  date?: string;
  timeSlot?: string;
  fullName?: string;
  mobileNumber?: string;
  bookingId?: string;
  pricing?: PricingData;
}

interface PricingData {
  periodicService?: string;
  expressService?: string;
  discountedPrice?: string;
  comprehensiveService?: string;
  dentPaint?: string;
  dentPaintFullBody?: string;
}

interface CarData {
  fuelType: string;
  brand: string;
  model: string;
  periodicService: string;
  expressService: string;
  discountedPrice: string;
  comprehensiveService: string;
  dentPaint: string;
  dentPaintFullBody: string;
}

interface ChatFlow {
  [key: string]: {
    message: string;
    buttons?: QuickReply[];
    showInput?: boolean;
    showDatePicker?: boolean;
    showTimePicker?: boolean;
    inputType?: 'text' | 'phone' | 'email';
    placeholder?: string;
    delay?: number;
  };
}

interface WatiChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const WatiChatInterface: React.FC<WatiChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [carDatabase, setCarDatabase] = useState<CarData[]>([]);
  const [isProcessingSelection, setIsProcessingSelection] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
  const [strapiBookingId, setStrapiBookingId] = useState<number | null>(null);
  const [strapiDocumentId, setStrapiDocumentId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate unique session ID on component mount
  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
  }, []);

  // Generate unique session ID
  const generateSessionId = (): string => {
    return sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Strapi API functions
  const createStrapiBooking = async (data: Partial<StrapiBooking>): Promise<{id: number, documentId: string} | null> => {
    try {
      // Remove undefined/null values to avoid validation errors
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );

      // Try different possible endpoints
      const possibleEndpoints = [
        'chatbot-bookings',  // ✅ CONFIRMED WORKING
        'chatbot-booking'    // Backup option
      ];

      console.log('Creating Strapi booking with data:', cleanData);
      console.log('Available API URL:', STRAPI_API_URL);
      console.log('Available API Token:', STRAPI_API_TOKEN ? 'Token provided' : 'No token');

      for (const endpoint of possibleEndpoints) {
        const apiUrl = `${STRAPI_API_URL}/${endpoint}`;
        console.log(`Trying endpoint: ${apiUrl}`);
        
        try {
          const requestHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          };
          
          const requestBody = JSON.stringify({
            data: cleanData,
          });
          
          console.log(`🔍 Request details for ${endpoint}:`);
          console.log(`🔗 URL: ${apiUrl}`);
          console.log(`🔑 Authorization header: Bearer ${STRAPI_API_TOKEN.substring(0, 20)}...`);
          console.log(`📦 Request body:`, requestBody);
          
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: requestHeaders,
            body: requestBody,
          });

          console.log(`Response for ${endpoint}:`, response.status, response.statusText);

          if (response.ok) {
            const result = await response.json();
            console.log('✅ Strapi booking created successfully:', result);
            // Return both id and documentId for Strapi v5 compatibility
            return {
              id: result.data.id,
              documentId: result.data.documentId
            };
          } else if (response.status === 404) {
            console.log(`❌ Endpoint ${endpoint} not found, trying next...`);
            continue;
          } else {
            const errorText = await response.text();
            console.error(`❌ Error with ${endpoint}:`, response.status, errorText);
            // Don't continue if it's not a 404 - this means the endpoint exists but has other issues
            return null;
          }
        } catch (fetchError) {
          console.error(`❌ Network error with ${endpoint}:`, fetchError);
          continue;
        }
      }

      console.error('❌ All endpoints failed. Please check:');
      console.error('1. Strapi is running on localhost:1337');
      console.error('2. Content type exists in Strapi');
      console.error('3. API token is correct');
      console.error('4. Permissions are set correctly');
      return null;

    } catch (error) {
      console.error('❌ Error creating Strapi booking:', error);
      return null;
    }
  };

  const updateStrapiBooking = async (documentId: string, data: Partial<StrapiBooking>): Promise<boolean> => {
    try {
      // Remove undefined/null values to avoid validation errors
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );

      console.log('Updating Strapi booking with data:', cleanData);

      // Use the same endpoint that worked for creation
      const possibleEndpoints = [
        'chatbot-bookings',  // ✅ CONFIRMED WORKING
        'chatbot-booking'    // Backup option
      ];

      // Try the most likely endpoint first (based on your Strapi setup)
      const primaryEndpoint = 'chatbot-bookings';
      const apiUrl = `${STRAPI_API_URL}/${primaryEndpoint}/${documentId}`;
      
      console.log(`🔄 Updating booking documentId ${documentId} at: ${apiUrl}`);
      console.log(`🔄 Update payload:`, JSON.stringify({ data: cleanData }, null, 2));
      
      try {
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: cleanData,
          }),
        });

        console.log(`🔄 Update response:`, response.status, response.statusText);

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Strapi booking updated successfully:', result);
          return true;
        } else {
          const errorText = await response.text();
          console.error(`❌ Update failed:`, response.status, errorText);
          
          // Try other endpoints if primary fails
          for (const endpoint of possibleEndpoints.filter(e => e !== primaryEndpoint)) {
            const fallbackUrl = `${STRAPI_API_URL}/${endpoint}/${documentId}`;
            console.log(`🔄 Trying fallback endpoint: ${fallbackUrl}`);
            
            try {
              const fallbackResponse = await fetch(fallbackUrl, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
                },
                body: JSON.stringify({
                  data: cleanData,
                }),
              });

              if (fallbackResponse.ok) {
                const fallbackResult = await fallbackResponse.json();
                console.log('✅ Strapi booking updated via fallback:', fallbackResult);
                return true;
              }
            } catch (fallbackError) {
              console.log(`❌ Fallback ${endpoint} failed:`, fallbackError);
              continue;
            }
          }
          return false;
        }
      } catch (fetchError) {
        console.error(`❌ Network error updating:`, fetchError);
        return false;
      }

      console.error('❌ All update endpoints failed');
      return false;
    } catch (error) {
      console.error('❌ Error updating Strapi booking:', error);
      return false;
    }
  };

  const saveToStrapi = async (newData: Partial<BookingData>, forceCreate: boolean = false) => {
    // Skip Strapi integration if API URL or token is missing
    if (!STRAPI_API_URL || !STRAPI_API_TOKEN) {
      console.log('⚠️ Strapi integration disabled - missing API URL or token');
      console.log('Chatbot will continue without database integration');
      return;
    }

    try {
      // Convert booking data to Strapi format - matching your exact field names
      const strapiData: Partial<StrapiBooking> = {};
      
      // Map fields to match your Strapi content type exactly
      if (newData.manufacturer) strapiData.manufacturer = newData.manufacturer;
      if (newData.model) strapiData.model = newData.model;
      if (newData.fuelType) strapiData.fuelType = newData.fuelType;
      if (newData.location) strapiData.location = newData.location;
      if (newData.area) strapiData.area = newData.area;
      if (newData.address) strapiData.address = newData.address;
      if (newData.serviceType) {
        strapiData.serviceType = newData.serviceType;
        strapiData.servicePrice = getServicePrice(newData.serviceType);
      }
      if (newData.servicePreference) strapiData.servicePreference = newData.servicePreference;
      if (newData.date) strapiData.date = newData.date;
      if (newData.timeSlot) strapiData.timeSlot = newData.timeSlot;
      if (newData.fullName) strapiData.fullName = newData.fullName;
      if (newData.mobileNumber) strapiData.mobileNumber = newData.mobileNumber;
      if (newData.bookingId) strapiData.bookingId = newData.bookingId;
      
      // Add session tracking and status
      strapiData.sessionId = generateSessionId();
      strapiData.booking_status = 'in_progress';

      console.log('📝 Saving to Strapi - Data:', newData);
      console.log('📝 Converted Strapi data:', strapiData);
      console.log('📝 Current booking ID:', strapiBookingId);
      console.log('📝 Force create:', forceCreate);

      if (strapiBookingId && !forceCreate) {
        // Update existing booking
        console.log('🔄 Updating existing booking ID:', strapiBookingId);
        console.log('🔄 Using documentId:', strapiDocumentId);
        
        if (strapiDocumentId) {
          const success = await updateStrapiBooking(strapiDocumentId, strapiData);
          if (success) {
            console.log('✅ Strapi update successful');
          } else {
            console.log('⚠️ Strapi update failed, but chatbot will continue');
          }
        } else {
          console.log('⚠️ No documentId available for update, creating new entry instead');
          const newBookingId = await createStrapiBooking(strapiData);
          if (newBookingId) {
            setStrapiBookingId(newBookingId.id);
            setStrapiDocumentId(newBookingId.documentId);
            console.log('✅ Strapi entry created - booking ID:', newBookingId.id);
          }
        }
      } else if (forceCreate || newData.mobileNumber) {
        // Create new booking when mobile number is provided or forced
        console.log('🆕 Creating new booking with complete data');
        const newBookingId = await createStrapiBooking(strapiData);
        if (newBookingId) {
          setStrapiBookingId(newBookingId.id);
          setStrapiDocumentId(newBookingId.documentId);
          console.log('✅ Strapi entry created - booking ID:', newBookingId.id);
        } else {
          console.log('⚠️ Strapi creation failed, but chatbot will continue');
        }
      } else {
        console.log('📋 Storing in session - waiting for mobile number to create Strapi entry');
      }
    } catch (error) {
      console.error('⚠️ Error saving to Strapi (chatbot will continue):', error);
    }
  };

  const getServicePrice = (serviceType?: string): string => {
    if (serviceType === 'Express Service') {
      return 'Rs.3299';
    } else if (serviceType === 'Dent & Paint') {
      return 'Rs.2499';
    } else if (serviceType === 'AC Service') {
      return 'Rs.1999';
    }
    return '';
  };

  // Load and parse CSV data
  useEffect(() => {
    const loadCarData = async () => {
      try {
        const response = await fetch('/GM Pricing March Website Usage -Final.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        const carData: CarData[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (values.length >= 8 && values[1] && values[2]) {
            carData.push({
              fuelType: values[0]?.toLowerCase() || '',
              brand: values[1] || '',
              model: values[2] || '',
              periodicService: values[3] || '',
              expressService: values[4] || '',
              discountedPrice: values[5] || '',
              comprehensiveService: values[6] || '',
              dentPaint: values[7] || '',
              dentPaintFullBody: values[8] || ''
            });
          }
        }
        setCarDatabase(carData);
      } catch (error) {
        console.error('Error loading car data:', error);
      }
    };

    loadCarData();
  }, []);

  // Get unique manufacturers from CSV data
  const getManufacturers = (): string[] => {
    const manufacturers = [...new Set(carDatabase.map(car => car.brand))];
    return manufacturers.filter(brand => brand && brand !== '').sort();
  };

  // Get models for a specific manufacturer
  const getModelsForManufacturer = (manufacturer: string): string[] => {
    const models = carDatabase
      .filter(car => car.brand === manufacturer)
      .map(car => car.model)
      .filter((model, index, self) => model && model !== '' && self.indexOf(model) === index)
      .sort();
    return models;
  };

  // Get fuel types for a specific manufacturer and model
  const getFuelTypesForCar = (manufacturer: string, model: string): string[] => {
    const fuelTypes = carDatabase
      .filter(car => car.brand === manufacturer && car.model === model)
      .map(car => car.fuelType)
      .filter((fuel, index, self) => fuel && fuel !== '' && self.indexOf(fuel) === index)
      .map(fuel => fuel.charAt(0).toUpperCase() + fuel.slice(1));
    return fuelTypes;
  };

  // Get pricing for specific car configuration
  const getPricingForCar = (manufacturer: string, model: string, fuelType: string): PricingData | null => {
    const carEntry = carDatabase.find(car => 
      car.brand === manufacturer && 
      car.model === model && 
      car.fuelType === fuelType.toLowerCase()
    );
    
    if (carEntry) {
      return {
        periodicService: carEntry.periodicService,
        expressService: carEntry.expressService,
        discountedPrice: carEntry.discountedPrice,
        comprehensiveService: carEntry.comprehensiveService,
        dentPaint: carEntry.dentPaint,
        dentPaintFullBody: carEntry.dentPaintFullBody
      };
    }
    return null;
  };

  // Time slots
  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ];

  // Comprehensive chatbot flow
  const chatFlow: ChatFlow = {
    welcome: {
      message: "Welcome to GaadiMech Express Car Service — 90-Minute Service!\nHelp us with some details so that we can assist you better.\n\nPlease select your car manufacturer:",
      delay: 1000
    },

    other_manufacturer_input: {
      message: "Please enter your car manufacturer:",
      showInput: true,
      inputType: 'text',
      placeholder: 'Enter manufacturer name...',
      delay: 500
    },

    model_selection: {
      message: "Select your car model:",
      delay: 1000
    },

    other_model_input: {
      message: "Please enter your car model:",
      showInput: true,
      inputType: 'text',
      placeholder: 'Enter model name...',
      delay: 500
    },

    fuel_type_selection: {
      message: "What's your car's fuel type?",
      delay: 1000
    },

    location_selection: {
      message: "Select your location:",
      buttons: [
        { id: 'jaipur', text: 'Jaipur', action: 'jaipur_area_selection', payload: { location: 'Jaipur' } },
        { id: 'other_city', text: 'Other City', action: 'other_city_input' }
      ],
      delay: 1000
    },

    other_city_input: {
      message: "Sorry, we don't service this area yet.\n\nWe currently serve only Jaipur city.\n\nPlease select Jaipur to continue:",
      buttons: [
        { id: 'jaipur', text: 'Jaipur', action: 'jaipur_area_selection', payload: { location: 'Jaipur' } },
        { id: 'contact_support', text: 'Contact Support', action: 'contact_support' }
      ],
      delay: 1000
    },

    jaipur_area_selection: {
      message: "Which area in Jaipur?",
      buttons: [
        { id: 'malviya_nagar', text: 'Malviya Nagar', action: 'service_type_selection', payload: { area: 'Malviya Nagar' } },
        { id: 'vaishali_nagar', text: 'Vaishali Nagar', action: 'service_type_selection', payload: { area: 'Vaishali Nagar' } },
        { id: 'mansarovar', text: 'Mansarovar', action: 'service_type_selection', payload: { area: 'Mansarovar' } },
        { id: 'jagatpura', text: 'Jagatpura', action: 'service_type_selection', payload: { area: 'Jagatpura' } },
        { id: 'c_scheme', text: 'C-Scheme', action: 'service_type_selection', payload: { area: 'C-Scheme' } },
        { id: 'pink_city', text: 'Pink City', action: 'service_type_selection', payload: { area: 'Pink City' } },
        { id: 'sanganer', text: 'Sanganer', action: 'service_type_selection', payload: { area: 'Sanganer' } },
        { id: 'sodala', text: 'Sodala', action: 'service_type_selection', payload: { area: 'Sodala' } },
        { id: 'VKI', text: 'VKI', action: 'service_type_selection', payload: { area: 'VKI' } },
        { id: 'pratap_nagar', text: 'Pratap Nagar', action: 'service_type_selection', payload: { area: 'Pratap Nagar' } },
        { id: 'other_area', text: 'Other Area', action: 'manual_address_input' }
      ],
      delay: 1000
    },

    manual_address_input: {
      message: "Please enter your exact address:",
      showInput: true,
      inputType: 'text',
      placeholder: 'Enter your full address...',
      delay: 500
    },

    service_type_selection: {
      message: "What type of service do you need?",
      buttons: [
        { id: 'express_service', text: 'Express Service', action: 'service_preference_selection', payload: { serviceType: 'Express Service' } },
        { id: 'dent_paint', text: 'Dent & Paint', action: 'service_preference_selection', payload: { serviceType: 'Dent & Paint' } },
        { id: 'ac_service', text: 'AC Service', action: 'service_preference_selection', payload: { serviceType: 'AC Service' } }
      ],
      delay: 1000
    },

    other_service_input: {
      message: "Please specify the service you need:",
      showInput: true,
      inputType: 'text',
      placeholder: 'Describe the service needed...',
      delay: 500
    },

    service_preference_selection: {
      message: "How would you prefer to get your service?",
      buttons: [
        { id: 'pick_drop', text: 'FREE Pick and Drop', action: 'date_selection', payload: { servicePreference: 'Free Pick and Drop (We\'ll collect and deliver your car)' } },
        { id: 'walk_in', text: 'Self Walk-in', action: 'date_selection', payload: { servicePreference: 'Self Walk-in (You bring the car to our center)' } }
      ],
      delay: 1000
    },

    date_selection: {
      message: "When would you like to schedule your service?",
      buttons: [
        { id: 'today', text: 'Today', action: 'time_slot_selection', payload: { date: 'Today' } },
        { id: 'tomorrow', text: 'Tomorrow', action: 'time_slot_selection', payload: { date: 'Tomorrow' } },
        { id: 'later_date', text: 'Schedule for Later', action: 'custom_date_selection' }
      ],
      delay: 1000
    },

    custom_date_selection: {
      message: "Please select your preferred date:",
      showDatePicker: true,
      delay: 500
    },

    time_slot_selection: {
      message: "Select your preferred time slot:",
      delay: 1000
    },

    contact_information: {
      message: "Please provide your contact details:\n\nFirst, enter your mobile number:",
      showInput: true,
      inputType: 'phone',
      placeholder: 'Enter 10-digit mobile number...',
      delay: 1000
    },

    full_name_input: {
      message: "Now, please enter your full name:",
      showInput: true,
      inputType: 'text',
      placeholder: 'Enter your full name...',
      delay: 500
    },

    booking_summary: {
      message: "Please review your booking details:",
      delay: 1000
    },

    booking_confirmed: {
      message: "Booking Confirmed!\n\nYour car service has been scheduled successfully!\n\nBooking ID: #{bookingId}\n\nYou will receive a confirmation SMS/Email shortly\nOur team will contact you 30 minutes before the scheduled time",
      buttons: [
        { id: 'need_help', text: 'Need Help?', action: 'contact_support' },
        { id: 'new_booking', text: 'New Booking', action: 'welcome' }
      ],
      delay: 1500
    },

    contact_support: {
      message: "Contact Support\n\nPhone: +91-XXXXX-XXXXX\nEmail: support@carservice.com\n\nOr continue to WhatsApp for live chat:",
      buttons: [
        { id: 'whatsapp_support', text: 'WhatsApp Support', action: 'redirect_whatsapp' },
        { id: 'back_to_booking', text: 'Back to Booking', action: 'welcome' }
      ],
      delay: 1000
    },

    technical_error: {
      message: "Something went wrong\n\nPlease try again or contact support:\n\nPhone: +91-XXXXX-XXXXX\nEmail: support@carservice.com",
      buttons: [
        { id: 'try_again', text: 'Try Again', action: 'welcome' },
        { id: 'contact_support', text: 'Contact Support', action: 'contact_support' }
      ],
      delay: 1000
    },

    redirect_whatsapp: {
      message: "Connecting you to WhatsApp support for live assistance...\n\nRedirecting in 3 seconds...",
      delay: 2000
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = () => {
    setCurrentStep('welcome');
    setBookingData({});
    setSelectedButtonId(null);
    setIsProcessingSelection(false);
    setShowQuickReplies(true);
    setStrapiBookingId(null);
    setStrapiDocumentId(null);
    processStep('welcome');
  };

  const processStep = (stepKey: string, context: any = {}) => {
    const step = chatFlow[stepKey];
    if (!step) return;

    setIsTyping(true);
    setShowQuickReplies(false);
    
    // Reset selection states for new step
    setSelectedButtonId(null);
    setIsProcessingSelection(false);

    // Update booking data
    const updatedBookingData = { ...bookingData, ...context };
    setBookingData(updatedBookingData);

    // Only save to Strapi when we have mobile number or if we're updating an existing entry
    if (Object.keys(context).length > 0) {
      console.log('🔄 ProcessStep - New context to save:', context);
      console.log('🔄 ProcessStep - Updated booking data:', updatedBookingData);
      
      // Check if this step includes mobile number (trigger Strapi creation)
      if (context.mobileNumber) {
        console.log('📱 Mobile number provided - creating Strapi entry with all data');
        saveToStrapi(updatedBookingData, true); // Force create with all accumulated data
      } else if (strapiBookingId) {
        console.log('🔄 Updating existing Strapi entry');
        saveToStrapi(updatedBookingData, false); // Update existing entry
      } else {
        console.log('📋 Storing in session - no mobile number yet, no Strapi entry');
      }
    }

    setTimeout(() => {
      let processedMessage = step.message;
      const fullContext = { ...bookingData, ...context };

      // Handle dynamic content based on step
      if (stepKey === 'welcome') {
        const manufacturers = getManufacturers();
        const manufacturerButtons = manufacturers.map((manufacturer, index) => ({
          id: `manufacturer_${index}`,
          text: manufacturer,
          action: 'model_selection',
          payload: { manufacturer }
        }));

        // Add "Other" option
        manufacturerButtons.push({
          id: 'other_manufacturer',
          text: 'Other',
          action: 'other_manufacturer_input',
          payload: { manufacturer: '' }
        });

        const botMessage: Message = {
          id: Date.now().toString(),
          text: processedMessage,
          sender: 'bot',
          timestamp: new Date(),
          buttons: manufacturerButtons
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setShowQuickReplies(true);
        setCurrentStep(stepKey);
        return;
      }

      if (stepKey === 'model_selection' && fullContext.manufacturer) {
        const models = getModelsForManufacturer(fullContext.manufacturer);
        const modelButtons = models.map((model, index) => ({
          id: `model_${index}`,
          text: model,
          action: 'fuel_type_selection',
          payload: { model }
        }));

                 // Add "Other" option
         modelButtons.push({
           id: 'other_model',
           text: 'Other',
           action: 'other_model_input',
           payload: { model: '' }
         });

        const botMessage: Message = {
          id: Date.now().toString(),
          text: processedMessage,
          sender: 'bot',
          timestamp: new Date(),
          buttons: modelButtons
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setShowQuickReplies(true);
        setCurrentStep(stepKey);
        return;
      }

      if (stepKey === 'fuel_type_selection' && fullContext.manufacturer && fullContext.model) {
        const fuelTypes = getFuelTypesForCar(fullContext.manufacturer, fullContext.model);
        const fuelButtons = fuelTypes.map((fuel, index) => ({
          id: `fuel_${index}`,
          text: fuel,
          action: 'location_selection',
          payload: { fuelType: fuel }
        }));

        const botMessage: Message = {
          id: Date.now().toString(),
          text: processedMessage,
          sender: 'bot',
          timestamp: new Date(),
          buttons: fuelButtons
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setShowQuickReplies(true);
        setCurrentStep(stepKey);
        return;
      }



      // Handle time slot selection
      if (stepKey === 'time_slot_selection') {
        const timeButtons = timeSlots.map((slot, index) => ({
          id: `time_${index}`,
          text: slot,
          action: 'contact_information',
          payload: { timeSlot: slot }
        }));

        const botMessage: Message = {
          id: Date.now().toString(),
          text: processedMessage,
          sender: 'bot',
          timestamp: new Date(),
          buttons: timeButtons
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setShowQuickReplies(true);
        setCurrentStep(stepKey);
        return;
      }

      // Handle booking summary
      if (stepKey === 'booking_summary') {
        // Get pricing based on service type
        let servicePrice = '';
        if (fullContext.serviceType === 'Express Service') {
          servicePrice = 'Rs.3299';
        } else if (fullContext.serviceType === 'Dent & Paint') {
          servicePrice = 'Rs.2499';
        } else if (fullContext.serviceType === 'AC Service') {
          servicePrice = 'Rs.1999';
        }

        const summaryText = `Please review your booking details:

Car: ${fullContext.manufacturer} ${fullContext.model} (${fullContext.fuelType})
Service: ${fullContext.serviceType}
Location: ${fullContext.area || fullContext.address}
Date: ${fullContext.date}
Time: ${fullContext.timeSlot}
Service Type: ${fullContext.servicePreference}
Contact: ${fullContext.fullName} - ${fullContext.mobileNumber}

**${fullContext.serviceType} Service: ${servicePrice}**`;

        const botMessage: Message = {
          id: Date.now().toString(),
          text: summaryText,
          sender: 'bot',
          timestamp: new Date(),
          buttons: [
            { id: 'confirm_booking', text: 'Confirm Booking', action: 'booking_confirmed' }
          ]
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setShowQuickReplies(true);
        setCurrentStep(stepKey);
        return;
      }

      // Handle booking confirmation with ID generation
      if (stepKey === 'booking_confirmed') {
        const bookingId = `CAR${Math.floor(Math.random() * 100000)}`;
        setBookingData((prev: BookingData) => ({ ...prev, bookingId }));
        processedMessage = processedMessage.replace('{bookingId}', bookingId);
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: processedMessage,
        sender: 'bot',
        timestamp: new Date(),
        buttons: step.buttons,
        showInput: step.showInput,
        showDatePicker: step.showDatePicker,
        showTimePicker: step.showTimePicker,
        inputType: step.inputType,
        placeholder: step.placeholder
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setShowQuickReplies(true);
      setCurrentStep(stepKey);

      // Auto-redirect to WhatsApp for final step
      if (stepKey === 'redirect_whatsapp') {
        setTimeout(() => {
          redirectToWhatsApp();
        }, 3000);
      }
    }, step.delay || 1000);
  };

  const handleQuickReply = (button: QuickReply) => {
    // Prevent multiple clicks while processing
    if (isProcessingSelection) {
      return;
    }

    // If user clicks a different button, handle selection change
    if (selectedButtonId && selectedButtonId !== button.id) {
      handleSelectionChange(button);
      return;
    }

    // Set processing state and selected button
    setIsProcessingSelection(true);
    setSelectedButtonId(button.id);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: button.text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowQuickReplies(false);

    // Process the action
    setTimeout(() => {
      if (button.action === 'booking_confirmed') {
        const bookingId = `CAR${Math.floor(Math.random() * 100000)}`;
        const updatedData = { ...bookingData, ...button.payload, bookingId };
        setBookingData(updatedData);
        
        // Save final booking data to Strapi and mark as completed
        saveToStrapi(updatedData).then(() => {
          if (strapiBookingId) {
            updateStrapiBooking(strapiDocumentId || '', { booking_status: 'completed' });
          }
        });
        
        processStep(button.action, { ...button.payload, bookingId });
      } else if (chatFlow[button.action]) {
        processStep(button.action, button.payload);
      } else {
        handleSpecialAction(button.action, button.payload);
      }
      
      // Reset processing state
      setIsProcessingSelection(false);
      setSelectedButtonId(null);
    }, 500);
  };

  const handleSelectionChange = (newButton: QuickReply) => {
    // Set processing state
    setIsProcessingSelection(true);
    setSelectedButtonId(newButton.id);

    // Update booking data with new selection
    const updatedData = { ...bookingData, ...newButton.payload };
    setBookingData(updatedData);

    // Save updated selection to Strapi immediately
    saveToStrapi(updatedData);

    // Add a message indicating the change
    const changeMessage: Message = {
      id: Date.now().toString(),
      text: `Changed selection to: ${newButton.text}`,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, changeMessage]);

    // Add bot acknowledgment
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: "Got it! I've updated your selection. Let me continue with the new choice.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Process the new selection
      setTimeout(() => {
        if (newButton.action === 'booking_confirmed') {
          const bookingId = `CAR${Math.floor(Math.random() * 100000)}`;
          const finalData = { ...updatedData, bookingId };
          setBookingData(finalData);
          
          // Save final booking data to Strapi and mark as completed
          saveToStrapi(finalData).then(() => {
            if (strapiBookingId) {
              updateStrapiBooking(strapiDocumentId || '', { booking_status: 'completed' });
            }
          });
          
          processStep(newButton.action, { ...newButton.payload, bookingId });
        } else if (chatFlow[newButton.action]) {
          processStep(newButton.action, newButton.payload);
        } else {
          handleSpecialAction(newButton.action, newButton.payload);
        }
        
        // Reset processing state
        setIsProcessingSelection(false);
        setSelectedButtonId(null);
      }, 1000);
    }, 500);
  };

  const handleSpecialAction = (action: string, payload: any) => {
    switch (action) {
      case 'redirect_whatsapp':
        processStep('redirect_whatsapp');
        break;
      default:
        processStep('technical_error');
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Handle manual input based on current step
    setTimeout(() => {
      switch (currentStep) {
        case 'other_manufacturer_input':
          const manufacturerData = { manufacturer: text.trim() };
          processStep('model_selection', manufacturerData);
          break;
        case 'other_model_input':
          const modelData = { model: text.trim() };
          processStep('fuel_type_selection', modelData);
          break;
        case 'manual_address_input':
          const addressData = { address: text.trim() };
          processStep('service_type_selection', addressData);
          break;
        case 'other_service_input':
          const serviceData = { serviceType: text.trim() };
          processStep('service_preference_selection', serviceData);
          break;
        case 'contact_information':
          const phoneRegex = /^[6-9]\d{9}$/;
          if (!phoneRegex.test(text.trim())) {
            const errorMessage: Message = {
              id: Date.now().toString(),
              text: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.",
              sender: 'bot',
              timestamp: new Date(),
              showInput: true,
              inputType: 'phone',
              placeholder: 'Enter 10-digit mobile number...'
            };
            setMessages(prev => [...prev, errorMessage]);
            return;
          }
          const phoneData = { mobileNumber: text.trim() };
          console.log('📱 Mobile number entered:', text.trim());
          processStep('full_name_input', phoneData);
          break;
        case 'full_name_input':
          if (text.trim().length < 2) {
            processStep('technical_error');
            return;
          }
          const nameData = { fullName: text.trim() };
          processStep('booking_summary', nameData);
          break;
        case 'custom_date_selection':
          const dateData = { date: text.trim() };
          processStep('time_slot_selection', dateData);
          break;
        default:
          processStep('redirect_whatsapp');
      }
    }, 500);
  };

  const redirectToWhatsApp = () => {
    const currentPage = window.location.href;
    
    // Create detailed booking summary for WhatsApp
    const bookingSummary = `
🚗 *GaadiMech Car Service Booking*

📋 *Booking Details:*
• Booking ID: ${bookingData.bookingId || 'Pending'}
• Car: ${bookingData.manufacturer || ''} ${bookingData.model || ''} (${bookingData.fuelType || ''})
• Service: ${bookingData.serviceType || ''}
• Location: ${bookingData.area || bookingData.address || ''}
• Date: ${bookingData.date || ''}
• Time: ${bookingData.timeSlot || ''}
• Service Type: ${bookingData.servicePreference || ''}
• Contact: ${bookingData.fullName || ''} - ${bookingData.mobileNumber || ''}
• Price: ${getServicePrice(bookingData.serviceType)}

✅ *Booking Confirmed!*
Our team will contact you 30 minutes before the scheduled time.

📱 Session ID: ${sessionId}
🌐 Booked from: ${currentPage}`;
    
    const encodedMessage = encodeURIComponent(bookingSummary);
    const whatsappUrl = `https://wa.me/917300042410?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Test direct API call (bypass proxy) - for debugging only
  const testDirectAPICall = async () => {
    // Use the same token that's loaded from environment variables instead of hardcoded
    const directToken = STRAPI_API_TOKEN;
    
    console.log('\n🧪 Testing DIRECT API call (bypass proxy)...');
    console.log('🔑 Using environment token length:', directToken.length);
    console.log('🔑 Environment token matches what we are using:', directToken === STRAPI_API_TOKEN ? '✅' : '❌');
    
    try {
      // Test direct API call to localhost:1337
      const directResponse = await fetch('http://localhost:1337/api/chatbot-bookings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${directToken}`,
          'Content-Type': 'application/json'
        },
      });
      
      console.log('🌐 Direct API call result:', directResponse.status, directResponse.statusText);
      
      if (directResponse.ok) {
        const data = await directResponse.json();
        console.log('✅ DIRECT API WORKS:', data);
        console.log('✅ Both frontend and direct API use the same token');
      } else {
        const errorText = await directResponse.text();
        console.log('❌ Direct API failed:', errorText);
      }
    } catch (error) {
      console.log('❌ Direct API error:', (error as Error).message);
    }

    // Enhanced comparison
    console.log('\n🔍 Frontend vs Direct comparison:');
    console.log('Frontend URL:', STRAPI_API_URL);
    console.log('Frontend Token Length:', STRAPI_API_TOKEN.length);
    console.log('Direct URL: http://localhost:1337/api');
    console.log('Direct Token Length:', directToken.length);
    console.log('Tokens match:', STRAPI_API_TOKEN === directToken ? '✅' : '❌');
    console.log('Both tokens are 256 chars:', STRAPI_API_TOKEN.length === 256 && directToken.length === 256 ? '✅' : '❌');
  };

  // Run API test on component mount (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(testDirectAPICall, 2000);
    }
  }, []);

  // Test Strapi connection - for debugging only
  const testStrapiConnection = async () => {
    if (!STRAPI_API_URL || !STRAPI_API_TOKEN) {
      console.log('❌ Missing API URL or token for testing');
      return;
    }

    console.log('🧪 Testing Strapi connection...');
    console.log('🔗 API URL:', STRAPI_API_URL);
    console.log('🔑 Token length:', STRAPI_API_TOKEN.length);

    // Test 1: Check if Strapi is responding
    try {
      const response = await fetch(`${STRAPI_API_URL.replace('/api', '')}`);
      console.log('🌐 Strapi server status:', response.status, response.statusText);
    } catch (error) {
      console.error('❌ Strapi server not responding:', error);
      return;
    }

    // Test 2: Try a simple GET request to find the correct endpoint
    const possibleEndpoints = [
      'chatbot-bookings',
      'chatbot-booking',
      'chatbotbookings', 
      'chatbotbooking'
    ];

    for (const endpoint of possibleEndpoints) {
      try {
        const response = await fetch(`${STRAPI_API_URL}/${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          },
        });
        
        console.log(`📋 GET ${endpoint}:`, response.status, response.statusText);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Found working endpoint: ${endpoint}`);
          console.log(`📊 Sample response:`, data);
          break;
        }
      } catch (error) {
        console.log(`❌ Error testing ${endpoint}:`, (error as Error).message);
      }
    }
  };

  // Run test on component mount (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(testStrapiConnection, 1000);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-sm h-[600px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Car Service Bot</h3>
                <p className="text-sm opacity-90">Booking Assistant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
                
                {/* Quick Reply Buttons */}
                {message.sender === 'bot' && message.buttons && showQuickReplies && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.buttons.map((button) => {
                      const isSelected = selectedButtonId === button.id;
                      const isDisabled = isProcessingSelection && !isSelected;
                      
                      return (
                        <motion.button
                          key={button.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={!isDisabled ? { scale: 1.02 } : {}}
                          whileTap={!isDisabled ? { scale: 0.98 } : {}}
                          onClick={() => handleQuickReply(button)}
                          disabled={isDisabled}
                          className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 font-medium ${
                            isSelected
                              ? 'bg-orange-500 text-white border-2 border-orange-500'
                              : isDisabled
                              ? 'bg-gray-100 border-2 border-gray-300 text-gray-400 cursor-not-allowed'
                              : 'bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer'
                          }`}
                        >
                          {isSelected && isProcessingSelection ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>{button.text}</span>
                            </div>
                          ) : (
                            button.text
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Phone className="w-3 h-3" />
              <span>Powered by WhatsApp</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WatiChatInterface; 