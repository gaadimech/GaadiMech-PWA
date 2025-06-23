import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaConversionApi } from '../services/metaConversionApi';
import type { CustomerInfo } from '../services/metaConversionApi';

declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params: { page_path?: string; [key: string]: any }
    ) => void;
    fbq: (
      type: string,
      event: string,
      params?: { [key: string]: any }
    ) => void;
    amplitude: {
      track: (event: string, params?: any) => void;
    };
    zepic: {
      identify: (key: string, value: string) => void;
    };
  }
}

export const useMetaAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view with Meta Conversion API
    const trackPageView = async () => {
      try {
        // Get user location from session if available
        const userLocation = JSON.parse(sessionStorage.getItem('userLocation') || '{}');
        const customerInfo: CustomerInfo = {};
        
        // Only add location data if it exists
        if (userLocation.city) customerInfo.city = userLocation.city;
        if (userLocation.state) customerInfo.state = userLocation.state;
        if (userLocation.country) customerInfo.country = userLocation.country;

        // Get mobile number from session if available
        const mobileNumber = sessionStorage.getItem('userMobileNumber');
        if (mobileNumber) {
          customerInfo.phone = mobileNumber;
        }

        // Track with Meta Conversion API
        await metaConversionApi.trackPageView({
          eventSourceUrl: window.location.href,
          customerInfo: Object.keys(customerInfo).length > 0 ? customerInfo : undefined,
        });

        // Also fire Facebook Pixel event
        if (window.fbq) {
          window.fbq('track', 'PageView');
        }
      } catch (error) {
        console.error('Meta Conversion API PageView failed:', error);
      }
    };

    // Add a small delay to ensure the page is fully loaded
    const timer = setTimeout(trackPageView, 100);
    return () => clearTimeout(timer);
  }, [location]);

  // Return tracking functions for manual use
  return {
    trackLead: async (customerInfo?: CustomerInfo, customData?: any) => {
      try {
        await metaConversionApi.trackLead({ customerInfo, customData });
        if (window.fbq) {
          window.fbq('track', 'Lead', customData);
        }
      } catch (error) {
        console.error('Meta Conversion API Lead tracking failed:', error);
      }
    },

    trackContact: async (customerInfo?: CustomerInfo) => {
      try {
        await metaConversionApi.trackContact({ customerInfo });
        if (window.fbq) {
          window.fbq('track', 'Contact');
        }
      } catch (error) {
        console.error('Meta Conversion API Contact tracking failed:', error);
      }
    },

    trackCompleteRegistration: async (customerInfo?: CustomerInfo) => {
      try {
        await metaConversionApi.trackCompleteRegistration({ customerInfo });
        if (window.fbq) {
          window.fbq('track', 'CompleteRegistration');
        }
      } catch (error) {
        console.error('Meta Conversion API CompleteRegistration tracking failed:', error);
      }
    },

    trackSubmitApplication: async (customerInfo?: CustomerInfo) => {
      try {
        await metaConversionApi.trackSubmitApplication({ customerInfo });
        if (window.fbq) {
          window.fbq('track', 'SubmitApplication');
        }
      } catch (error) {
        console.error('Meta Conversion API SubmitApplication tracking failed:', error);
      }
    },

    trackSchedule: async (customerInfo?: CustomerInfo, customData?: any) => {
      try {
        await metaConversionApi.trackSchedule({ customerInfo, customData });
        if (window.fbq) {
          window.fbq('track', 'Schedule', customData);
        }
      } catch (error) {
        console.error('Meta Conversion API Schedule tracking failed:', error);
      }
    },

    trackAddToCart: async (customerInfo?: CustomerInfo, customData?: any) => {
      try {
        await metaConversionApi.trackAddToCart({ customerInfo, customData });
        if (window.fbq) {
          window.fbq('track', 'AddToCart', customData);
        }
      } catch (error) {
        console.error('Meta Conversion API AddToCart tracking failed:', error);
      }
    },

    trackInitiateCheckout: async (customerInfo?: CustomerInfo, customData?: any) => {
      try {
        await metaConversionApi.trackInitiateCheckout({ customerInfo, customData });
        if (window.fbq) {
          window.fbq('track', 'InitiateCheckout', customData);
        }
      } catch (error) {
        console.error('Meta Conversion API InitiateCheckout tracking failed:', error);
      }
    },

    trackPurchase: async (customerInfo?: CustomerInfo, customData?: any) => {
      try {
        await metaConversionApi.trackPurchase({ customerInfo, customData });
        if (window.fbq) {
          window.fbq('track', 'Purchase', customData);
        }
      } catch (error) {
        console.error('Meta Conversion API Purchase tracking failed:', error);
      }
    },

    trackSubscribe: async (customerInfo?: CustomerInfo) => {
      try {
        await metaConversionApi.trackSubscribe({ customerInfo });
        if (window.fbq) {
          window.fbq('track', 'Subscribe');
        }
      } catch (error) {
        console.error('Meta Conversion API Subscribe tracking failed:', error);
      }
    },

    trackFindLocation: async (customerInfo?: CustomerInfo) => {
      try {
        await metaConversionApi.trackFindLocation({ customerInfo });
        if (window.fbq) {
          window.fbq('track', 'FindLocation');
        }
      } catch (error) {
        console.error('Meta Conversion API FindLocation tracking failed:', error);
      }
    },

    trackCustomizeProduct: async (customerInfo?: CustomerInfo) => {
      try {
        await metaConversionApi.trackCustomizeProduct({ customerInfo });
        if (window.fbq) {
          window.fbq('track', 'CustomizeProduct');
        }
      } catch (error) {
        console.error('Meta Conversion API CustomizeProduct tracking failed:', error);
      }
    },
  };
}; 