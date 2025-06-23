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
    this.apiVersion = env.META_API_VERSION;
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
    
    const clientIP = getClientIP();
    if (clientIP) userData.client_ip_address = clientIP;

    return userData;
  }

  // Check if we have sufficient customer data for Meta's requirements
  private hasSufficientCustomerData(customerInfo?: CustomerInfo): boolean {
    if (!customerInfo) return false;
    
    // Meta requires at least one of these combinations for effective matching:
    // 1. Email address
    // 2. Phone number
    // 3. First name + Last name + (City OR State OR Country OR Postal Code)
    
    if (customerInfo.email) return true;
    if (customerInfo.phone) return true;
    
    if (customerInfo.firstName && customerInfo.lastName) {
      return !!(customerInfo.city || customerInfo.state || customerInfo.country || customerInfo.postalCode);
    }
    
    return false;
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
      
      // Clean the payload to remove any undefined or empty values
      const cleanedPayload = {
        data: payload.data.map(event => {
          const cleanEvent: any = {
            event_name: event.event_name,
            event_time: event.event_time,
            event_source_url: event.event_source_url,
            action_source: event.action_source
          };

          // Only add user_data if it has actual data
          if (event.user_data && Object.keys(event.user_data).length > 0) {
            const userData: any = {};
            Object.entries(event.user_data).forEach(([key, value]) => {
              if (value && value !== '') {
                userData[key] = value;
              }
            });
            if (Object.keys(userData).length > 0) {
              cleanEvent.user_data = userData;
            }
          }

          // Only add custom_data if it has actual data
          if (event.custom_data && Object.keys(event.custom_data).length > 0) {
            const customData: any = {};
            Object.entries(event.custom_data).forEach(([key, value]) => {
              if (value !== undefined && value !== null && value !== '') {
                customData[key] = value;
              }
            });
            if (Object.keys(customData).length > 0) {
              cleanEvent.custom_data = customData;
            }
          }

          return cleanEvent;
        })
      };

      console.log('Sending Meta Conversion API payload:', JSON.stringify(cleanedPayload, null, 2));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedPayload),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Meta Conversion API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: result,
          payload: cleanedPayload
        });
        return false;
      }

      console.log('Meta Conversion API Success:', result);
      return true;
    } catch (error) {
      console.error('Meta Conversion API Request Failed:', error);
      return false;
    }
  }

  // PageView Event - Enhanced with proper customer data validation
  async trackPageView(eventData: Partial<EventData> = {}): Promise<boolean> {
    // Get customer info from provided data or session storage
    let customerInfo = eventData.customerInfo || this.getCustomerInfoFromSession();
    
    // PageView events also require sufficient customer data - skip if insufficient
    if (!this.hasSufficientCustomerData(customerInfo)) {
      console.log('⚠️ PageView: Insufficient customer data, skipping event to avoid 400 error');
      console.log('💡 PageView will be tracked once user provides phone/email/location data');
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
      console.log('⚠️ Lead: Insufficient customer data, skipping event');
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
      console.log('⚠️ Contact: Insufficient customer data, skipping event');
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
      console.log('⚠️ CompleteRegistration: Insufficient customer data, skipping event');
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
      console.log('⚠️ SubmitApplication: Insufficient customer data, skipping event');
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
      console.log('⚠️ Schedule: Insufficient customer data, skipping event');
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
      console.log('⚠️ AddToCart: Insufficient customer data, skipping event');
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
      console.log('⚠️ InitiateCheckout: Insufficient customer data, skipping event');
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
      console.log('⚠️ Purchase: Insufficient customer data, skipping event');
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
      console.log('⚠️ Subscribe: Insufficient customer data, skipping event');
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
      console.log('⚠️ FindLocation: Insufficient customer data, skipping event');
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
      console.log('⚠️ CustomizeProduct: Insufficient customer data, skipping event');
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