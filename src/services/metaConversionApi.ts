import env from '../config/env';
import CryptoJS from 'crypto-js';

// Hash function for customer information - Meta requires specific formatting
const hashData = (data: string): string => {
  if (!data || typeof data !== 'string') return '';
  
  let cleanData = data.trim();
  
  // For phone numbers (contains mostly digits), clean and format properly
  if (/^[\d\+\-\s\(\)]+$/.test(cleanData)) {
    // Remove all non-digits first
    cleanData = cleanData.replace(/\D/g, '');
    
    // Add India country code if it's a 10-digit number
    if (cleanData.length === 10) {
      cleanData = '91' + cleanData;
    }
    
    // Meta expects phone numbers WITHOUT + sign when hashing
    // Final format should be: 919876543210 (country code + number)
  } else {
    // For emails and other data, just lowercase and trim
    cleanData = cleanData.toLowerCase();
  }
  
  console.log(`🔐 Hashing "${data}" -> cleaned: "${cleanData}" -> hash: ${CryptoJS.SHA256(cleanData).toString().substring(0, 10)}...`);
  return CryptoJS.SHA256(cleanData).toString();
};

// Get client IP address
const getClientIP = (): string => {
  // For browser environment, we can't directly get the client IP
  // Meta will use the request IP instead
  return '';
};

// Get client user agent
const getClientUserAgent = (): string => {
  return typeof window !== 'undefined' ? window.navigator.userAgent : '';
};

// Helper to read a cookie value by name
const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
};

// Event data interface based on your CSV file
interface CustomerInfo {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  dateOfBirth?: string;
  gender?: string;
}

interface EventData {
  eventName: string;
  eventTime: number;
  eventSourceUrl: string;
  actionSource: 'website';
  customerInfo?: CustomerInfo;
  customData?: {
    currency?: string;
    value?: number;
    contentName?: string;
    contentType?: string;
    contentIds?: string[];
    contents?: Array<{
      id: string;
      quantity: number;
      deliveryCategory?: string;
    }>;
  };
}

interface ConversionApiPayload {
  data: Array<{
    event_name: string;
    event_time: number;
    event_source_url: string;
    action_source: 'website';
    user_data?: {
      em?: string;  // email (hashed)
      ph?: string;  // phone (hashed)
      fn?: string;  // first name (hashed)
      ln?: string;  // last name (hashed)
      ct?: string;  // city (hashed)
      st?: string;  // state (hashed)
      country?: string;  // country (hashed)
      zp?: string;  // postal code (hashed)
      db?: string;  // date of birth (hashed)
      ge?: string;  // gender (hashed)
      client_ip_address?: string;
      client_user_agent?: string;
      fbp?: string;
      fbc?: string;
    };
    custom_data?: {
      currency?: string;
      value?: number;
      content_name?: string;
      content_type?: string;
      content_ids?: string[];
      contents?: Array<{
        id: string;
        quantity: number;
        delivery_category?: string;
      }>;
    };
  }>;
  test_event_code?: string; // For testing purposes
}

class MetaConversionApi {
  private pixelId: string;
  private accessToken: string;
  private apiVersion: string;
  private baseUrl: string;

  constructor() {
    this.pixelId = env.META_PIXEL_ID;
    this.accessToken = env.META_ACCESS_TOKEN;
    // Normalise API version – ensure it is of the form "vXX.Y" expected by Graph API
    const rawVersion = env.META_API_VERSION?.toString().trim() || 'v17.0';
    let normalisedVersion = rawVersion.startsWith('v') ? rawVersion : `v${rawVersion}`;
    // If version looks like "v210" (no dot), convert to "v21.0"
    if (/^v\d{3}$/.test(normalisedVersion)) {
      normalisedVersion = `v${normalisedVersion.slice(1, 3)}.${normalisedVersion.slice(3)}`;
    }
    // If version looks like "v17" (no decimal), convert to "v17.0"
    if (/^v\d+$/.test(normalisedVersion) && !normalisedVersion.includes('.')) {
      normalisedVersion = `${normalisedVersion}.0`;
    }
    this.apiVersion = normalisedVersion;

    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
  }

  private buildUserData(customerInfo?: CustomerInfo) {
    const userData: any = {};
    
    // Always include client_user_agent as it's always available and helps with attribution
    userData.client_user_agent = getClientUserAgent();
    
    // Add customer information if available
    if (customerInfo) {
      if (customerInfo.email) userData.em = hashData(customerInfo.email);
      if (customerInfo.phone) userData.ph = hashData(customerInfo.phone);
      if (customerInfo.firstName) userData.fn = hashData(customerInfo.firstName);
      if (customerInfo.lastName) userData.ln = hashData(customerInfo.lastName);
      if (customerInfo.city) userData.ct = hashData(customerInfo.city);
      if (customerInfo.state) userData.st = hashData(customerInfo.state);
      if (customerInfo.country) userData.country = hashData(customerInfo.country);
      if (customerInfo.postalCode) userData.zp = hashData(customerInfo.postalCode);
      if (customerInfo.dateOfBirth) userData.db = hashData(customerInfo.dateOfBirth);
      if (customerInfo.gender) userData.ge = hashData(customerInfo.gender);
    }
    
    // Add browser identifiers when available – improves match quality even without PII
    const fbp = getCookie('_fbp');
    if (fbp) userData.fbp = fbp;
    const fbc = getCookie('_fbc');
    if (fbc) userData.fbc = fbc;
    
    const clientIP = getClientIP();
    if (clientIP) userData.client_ip_address = clientIP;

    return userData;
  }

  // Check if we have sufficient customer data for Meta's requirements
  private hasSufficientCustomerData(customerInfo?: CustomerInfo): boolean {
    // Meta now allows events that contain only non-PII identifiers such as
    // client_user_agent (required) and client_ip_address. To avoid losing
    // early-funnel events where a user hasn't shared any personal details yet
    // (for example, clicks on "Book Now" / "Call Us"), we no longer block
    // events on the basis of missing PII.  We still hash and forward any data
    // that *is* available, but when nothing is provided we proceed with the
    // minimal payload.

    if (!customerInfo || Object.keys(customerInfo).length === 0) {
      // In development, let engineers know we're sending a minimal user_data
      if (import.meta.env.DEV) {
        console.warn('MetaConversionApi: proceeding with minimal customer data – only client_user_agent will be sent.');
      }
    }

    // Always return true so that every event is sent to Meta.
    return true;
  }

  // Get customer info from session storage or provide defaults
  private getCustomerInfoFromSession(): CustomerInfo | undefined {
    try {
      // Get stored customer information
      const userLocation = JSON.parse(sessionStorage.getItem('userLocation') || '{}');
      const mobileNumber = sessionStorage.getItem('userMobileNumber');
      const customerData = JSON.parse(sessionStorage.getItem('customerData') || '{}');
      
      const customerInfo: CustomerInfo = {};
      
      // Add location data
      if (userLocation.city) customerInfo.city = userLocation.city;
      if (userLocation.state) customerInfo.state = userLocation.state;
      if (userLocation.country) customerInfo.country = userLocation.country;
      
      // Add mobile number
      if (mobileNumber) customerInfo.phone = mobileNumber;
      
      // Add other customer data if available
      if (customerData.email) customerInfo.email = customerData.email;
      if (customerData.firstName) customerInfo.firstName = customerData.firstName;
      if (customerData.lastName) customerInfo.lastName = customerData.lastName;
      if (customerData.gender) customerInfo.gender = customerData.gender;
      if (customerData.dateOfBirth) customerInfo.dateOfBirth = customerData.dateOfBirth;
      if (customerData.postalCode) customerInfo.postalCode = customerData.postalCode;
      
      // For Indian users, add default country if not present
      if (!customerInfo.country && (customerInfo.city || customerInfo.state || customerInfo.phone)) {
        customerInfo.country = 'India';
      }
      
      return Object.keys(customerInfo).length > 0 ? customerInfo : undefined;
    } catch (error) {
      console.error('Error getting customer info from session:', error);
      return undefined;
    }
  }

  private async sendEvent(payload: ConversionApiPayload): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/${this.pixelId}/events?access_token=${this.accessToken}`;
      
      // Clean payload for production logging (remove sensitive data)
      const cleanedPayload = {
        ...payload,
        data: payload.data.map(event => ({
          ...event,
          user_data: event.user_data ? {
            // Only show that data exists, not the actual values
            hasEmail: !!event.user_data.em,
            hasPhone: !!event.user_data.ph,
            hasLocation: !!(event.user_data.ct || event.user_data.st),
          } : undefined
        }))
      };

      // SECURITY: Only log detailed payload in development
      if (import.meta.env.DEV) {
        console.log('Sending Meta Conversion API event:', payload.data[0]?.event_name, 'with user data:', !!payload.data[0]?.user_data);
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (!response.ok) {
        // Only log errors in development
        if (import.meta.env.DEV) {
          console.error('Meta Conversion API Error:', {
            status: response.status,
            statusText: response.statusText,
            error: result,
          });
        }
        return false;
      }

      // SECURITY: Only log success in development
      if (import.meta.env.DEV) {
        console.log('Meta Conversion API Success:', response.status);
      }
      return true;
    } catch (error) {
      // Only log errors in development
      if (import.meta.env.DEV) {
        console.error('Meta Conversion API Request Failed:', error instanceof Error ? error.message : 'Unknown error');
      }
      return false;
    }
  }

  // PageView Event - Enhanced with proper customer data validation
  async trackPageView(eventData: Partial<EventData> = {}): Promise<boolean> {
    // Get customer info from provided data or session storage
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    // PageView events also require sufficient customer data - skip if insufficient
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ PageView: Insufficient customer data, skipping event to avoid 400 error');
      }
      return false;
    }

    const userData = this.buildUserData(customerInfo);

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: userData,
      }],
    };

    return this.sendEvent(payload);
  }

  // Lead Event
  async trackLead(eventData: Partial<EventData> = {}): Promise<boolean> {
    // Get customer info from provided data or session storage
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    // Lead events require customer data - skip if insufficient
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ Lead: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
        custom_data: eventData.customData,
      }],
    };

    return this.sendEvent(payload);
  }

  // Contact Event
  async trackContact(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ Contact: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'Contact',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
      }],
    };

    return this.sendEvent(payload);
  }

  // Complete Registration Event
  async trackCompleteRegistration(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ CompleteRegistration: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'CompleteRegistration',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
      }],
    };

    return this.sendEvent(payload);
  }

  // Submit Application Event
  async trackSubmitApplication(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ SubmitApplication: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'SubmitApplication',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
      }],
    };

    return this.sendEvent(payload);
  }

  // Schedule Event
  async trackSchedule(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ Schedule: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'Schedule',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
        custom_data: eventData.customData,
      }],
    };

    return this.sendEvent(payload);
  }

  // Add to Cart Event
  async trackAddToCart(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ AddToCart: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'AddToCart',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
        custom_data: eventData.customData,
      }],
    };

    return this.sendEvent(payload);
  }

  // Initiate Checkout Event
  async trackInitiateCheckout(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ InitiateCheckout: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'InitiateCheckout',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
        custom_data: eventData.customData,
      }],
    };

    return this.sendEvent(payload);
  }

  // Purchase Event
  async trackPurchase(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ Purchase: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
        custom_data: eventData.customData,
      }],
    };

    return this.sendEvent(payload);
  }

  // Subscribe Event
  async trackSubscribe(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ Subscribe: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'Subscribe',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
      }],
    };

    return this.sendEvent(payload);
  }

  // Find Location Event
  async trackFindLocation(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ FindLocation: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'FindLocation',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
      }],
    };

    return this.sendEvent(payload);
  }

  // Customize Product Event
  async trackCustomizeProduct(eventData: Partial<EventData> = {}): Promise<boolean> {
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    if (!this.hasSufficientCustomerData(customerInfo)) {
      // SECURITY: Only log in development
      if (import.meta.env.DEV) {
        console.log('⚠️ CustomizeProduct: Insufficient customer data, skipping event');
      }
      return false;
    }

    const payload: ConversionApiPayload = {
      data: [{
        event_name: 'CustomizeProduct',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.eventSourceUrl || window.location.href,
        action_source: 'website',
        user_data: this.buildUserData(customerInfo),
      }],
    };

    return this.sendEvent(payload);
  }
}

// Export singleton instance
export const metaConversionApi = new MetaConversionApi();
export type { EventData, CustomerInfo }; 