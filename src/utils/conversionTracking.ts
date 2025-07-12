// TODO: Reconnect to new Strapi V5 backend
// import { leadsService } from '../services/leads';
// import { LeadTrackingData } from '../types/leads';
import { getVehicleFromSession, getPricingData, parseCSVData } from './pricing-utils';

// Placeholder interface for lead tracking data - TODO: Update with new Strapi V5 types
interface LeadTrackingData {
  mobileNumber?: string;
  location?: string;
  area?: string;
  serviceInterest?: string;
  source: string;
  carBrand?: string;
  carModel?: string;
  priceRange?: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  deviceInfo?: {
    type?: string;
    browser?: string;
    referrer?: string;
  };
}

interface WhatsAppRedirectData {
  timestamp: string;
  service: string;
  source: string;
  car?: string | null;
  price?: string;
  sessionId: string;
  userId?: string;
}

interface ConversionFunnelData {
  whatsappRedirects: WhatsAppRedirectData[];
  totalRedirects: number;
  uniqueSessions: number;
  topServices: { service: string; count: number; }[];
  conversionBySource: { source: string; count: number; }[];
}

export class ConversionTracker {
  private static SESSION_KEY = 'sessionId';
  private static REDIRECTS_KEY = 'whatsappRedirects';
  private static USER_KEY = 'userId';
  private static LEAD_KEY = 'leadTrackingData';

  // Generate or get session ID
  static getSessionId(): string {
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  // Generate user ID (persistent across sessions)
  static getUserId(): string {
    let userId = localStorage.getItem(this.USER_KEY);
    if (!userId) {
      userId = Math.random().toString(36).substr(2, 12) + Date.now().toString(36);
      localStorage.setItem(this.USER_KEY, userId);
    }
    return userId;
  }

  // Track WhatsApp redirect attempt
  static trackWhatsAppRedirect(data: Omit<WhatsAppRedirectData, 'timestamp' | 'sessionId' | 'userId'>): void {
    const redirectData: WhatsAppRedirectData = {
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId(),
      userId: this.getUserId()
    };

    // Store in localStorage
    const existingRedirects = this.getStoredRedirects();
    existingRedirects.push(redirectData);
    localStorage.setItem(this.REDIRECTS_KEY, JSON.stringify(existingRedirects));

    // Track with Google Analytics
    if (window.gtag) {
      window.gtag('event', 'whatsapp_redirect', {
        'event_category': 'engagement',
        'event_label': `${data.source}_whatsapp_click`,
        'service_type': data.service,
        'car_model': data.car || 'unknown',
        'price': data.price || 'unknown',
        'session_id': redirectData.sessionId,
        'user_id': redirectData.userId
      });
    }

    // Update lead tracking data
    this.updateLeadTrackingData({
      source: data.source,
      serviceInterest: data.service,
      carBrand: data.car?.split(' ')[0] || undefined, // Extract brand from car string
      carModel: data.car || undefined,
      priceRange: data.price
    });

    // Also try to capture any vehicle data from session storage
    try {
      const vehicleData = getVehicleFromSession();
      if (vehicleData && !data.car) {
        // If WhatsApp redirect doesn't have car info, but session has vehicle data
        this.updateLeadTrackingData({
          carBrand: vehicleData.manufacturer,
          carModel: vehicleData.model
        });
      }
    } catch (error) {
      console.log('Could not capture session vehicle data during WhatsApp redirect');
    }

    // Send to your backend for analysis (optional)
    this.sendToBackend(redirectData);
  }

  // Get stored redirects
  private static getStoredRedirects(): WhatsAppRedirectData[] {
    return JSON.parse(localStorage.getItem(this.REDIRECTS_KEY) || '[]');
  }

  // Analyze conversion funnel
  static getConversionFunnelData(): ConversionFunnelData {
    const redirects = this.getStoredRedirects();
    
    // Calculate unique sessions
    const uniqueSessions = new Set(redirects.map(r => r.sessionId)).size;

    // Top services
    const serviceCount: { [key: string]: number } = {};
    redirects.forEach(r => {
      serviceCount[r.service] = (serviceCount[r.service] || 0) + 1;
    });
    const topServices = Object.entries(serviceCount)
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count);

    // Conversion by source
    const sourceCount: { [key: string]: number } = {};
    redirects.forEach(r => {
      sourceCount[r.source] = (sourceCount[r.source] || 0) + 1;
    });
    const conversionBySource = Object.entries(sourceCount)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);

    return {
      whatsappRedirects: redirects,
      totalRedirects: redirects.length,
      uniqueSessions,
      topServices,
      conversionBySource
    };
  }

  // Send data to backend for analysis
  private static async sendToBackend(data: WhatsAppRedirectData): Promise<void> {
    try {
      // Only send if API URL is configured
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) return;

      await fetch(`${apiUrl}/api/conversion-tracking/whatsapp-redirect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('Failed to send conversion data to backend:', error);
      // Silently fail - don't break user experience
    }
  }

  // Clear old data (call this periodically)
  static clearOldData(daysToKeep: number = 30): void {
    const redirects = this.getStoredRedirects();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const filteredRedirects = redirects.filter(r => 
      new Date(r.timestamp) > cutoffDate
    );

    localStorage.setItem(this.REDIRECTS_KEY, JSON.stringify(filteredRedirects));
  }

  // Lead tracking methods
  static updateLeadTrackingData(data: Partial<LeadTrackingData>): void {
    const existingData = this.getLeadTrackingData();
    const updatedData = { ...existingData, ...data };
    
    // Update with latest activity
    updatedData.lastActivityTimestamp = new Date().toISOString();
    
    // Set first visit if not exists
    if (!updatedData.firstVisitTimestamp) {
      updatedData.firstVisitTimestamp = new Date().toISOString();
    }

    // Count WhatsApp redirects
    const redirects = this.getStoredRedirects();
    updatedData.whatsappRedirectCount = redirects.length;

    localStorage.setItem(this.LEAD_KEY, JSON.stringify(updatedData));
  }

  // Convenience method to track vehicle selection
  static trackVehicleSelection(manufacturer: string, model: string, fuelType?: string, price?: number): void {
    const priceRange = price ? `₹${price}` : undefined;
    
    this.updateLeadTrackingData({
      carBrand: manufacturer,
      carModel: model,
      priceRange: priceRange
    });
    
    console.log('🚗 Vehicle selection tracked:', { manufacturer, model, fuelType, price });
  }

  static getLeadTrackingData(): Partial<LeadTrackingData> & { 
    firstVisitTimestamp?: string; 
    lastActivityTimestamp?: string; 
    whatsappRedirectCount?: number; 
  } {
    const stored = localStorage.getItem(this.LEAD_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  static async captureMobileNumberAndCreateLead(mobileNumber: string): Promise<void> {
    try {
      // Update lead tracking data with mobile number
      this.updateLeadTrackingData({ mobileNumber });
      
      // Get all accumulated lead data
      const leadData = this.getLeadTrackingData();
      
      // Get additional info
      const deviceInfo = this.getDeviceInfo();
      const utmParams = this.getUTMParams();
      
      // Try to get vehicle data from session storage if not already captured
      if (!leadData.carBrand || !leadData.carModel) {
        try {
          const vehicleData = await this.getVehicleDataFromSession();
          if (vehicleData) {
            this.updateLeadTrackingData({
              carBrand: vehicleData.carBrand,
              carModel: vehicleData.carModel,
              priceRange: vehicleData.priceRange
            });
            // Refresh leadData after vehicle update
            Object.assign(leadData, this.getLeadTrackingData());
            console.log('📱 Captured vehicle data from session:', vehicleData);
          }
        } catch (error) {
          console.log('Vehicle data capture failed, proceeding without vehicle info');
        }
      }
      
      // Try to get user location if not already captured
      if (!leadData.location) {
        try {
          const locationData = await this.getCurrentLocation();
          if (locationData) {
            this.updateLeadTrackingData({
              location: locationData.city || locationData.region,
              area: locationData.area || locationData.district
            });
            // Refresh leadData after location update
            Object.assign(leadData, this.getLeadTrackingData());
          }
        } catch (error) {
          console.log('Location detection failed, proceeding without location');
        }
      }
      
      // Create/update lead in Strapi backend
      const { leadService, analyticsService } = await import('../services/api');
      
      try {
        const leadResponse = await leadService.createLead({
          name: `User ${mobileNumber.slice(-4)}`,
          mobileNumber: mobileNumber,
          status: 'new',
          source: utmParams.utm_source || leadData.source || 'website',
          medium: utmParams.utm_medium || 'organic',
          campaign: utmParams.utm_campaign || 'direct',
          carBrand: leadData.carBrand,
          carModel: leadData.carModel,
          location: leadData.location,
          area: leadData.area,
          notes: `Auto-generated lead from website`,
          metadata: {
            ...leadData,
            deviceInfo,
            utmParams
          }
        });

        const leadId = leadResponse.data ? (leadResponse.data as any).id : null;
        console.log('✅ Lead created in Strapi:', leadId);

        // Track analytics event
        await analyticsService.trackEvent({
          eventType: 'lead_created',
          eventName: 'mobile_number_captured',
          properties: {
            leadId,
            mobileNumber: mobileNumber,
            source: utmParams.utm_source || leadData.source || 'website',
            carBrand: leadData.carBrand,
            carModel: leadData.carModel,
            location: leadData.location
          },
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        console.error('❌ Error creating lead in Strapi:', error);
      }
      console.log('Lead data to be saved:', {
        mobileNumber: String(mobileNumber),
        serviceInterest: String(leadData.serviceInterest || 'General Interest'),
        source: String(leadData.source || 'website'),
        sessionId: String(this.getSessionId()),
        userId: String(this.getUserId()),
        whatsappRedirectCount: String(leadData.whatsappRedirectCount || 0),
        firstVisitTimestamp: String(leadData.firstVisitTimestamp || new Date().toISOString()),
        lastActivityTimestamp: String(new Date().toISOString()),
        referrer: String(deviceInfo.referrer || 'direct'),
        deviceType: String(deviceInfo.deviceType || 'unknown'),
        browserInfo: String(deviceInfo.browser || 'unknown'),
        location: leadData.location ? String(leadData.location) : undefined,
        area: leadData.area ? String(leadData.area) : undefined,
        carBrand: leadData.carBrand ? String(leadData.carBrand) : undefined,
        carModel: leadData.carModel ? String(leadData.carModel) : undefined,
        priceRange: leadData.priceRange ? String(leadData.priceRange) : undefined,
        utmSource: utmParams.utm_source ? String(utmParams.utm_source) : undefined,
        utmMedium: utmParams.utm_medium ? String(utmParams.utm_medium) : undefined,
        utmCampaign: utmParams.utm_campaign ? String(utmParams.utm_campaign) : undefined
      });
    } catch (error) {
      console.error('❌ Error creating/updating lead:', error);
    }
  }

  static getDeviceInfo(): { deviceType: string; browser: string; referrer: string } {
    const userAgent = navigator.userAgent;
    let deviceType = 'desktop';
    
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = 'tablet';
    } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      deviceType = 'mobile';
    }
    
    let browser = 'unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    return {
      deviceType,
      browser,
      referrer: document.referrer || 'direct'
    };
  }

  static getUTMParams(): { [key: string]: string | null } {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
    };
  }

  static async getCurrentLocation(): Promise<{ city?: string; region?: string; area?: string; district?: string } | null> {
    try {
      // Try to get location from IP geolocation service
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        return {
          city: data.city,
          region: data.region,
          area: data.region_code,
          district: data.district
        };
      }
    } catch (error) {
      console.log('IP geolocation failed');
    }

    // Fallback: try browser geolocation
    try {
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // For now, just resolve with coordinates info
              // In a real app, you'd reverse geocode these coordinates
              resolve({
                area: `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`
              });
            },
            () => resolve(null),
            { timeout: 5000 }
          );
        } else {
          resolve(null);
        }
      });
    } catch (error) {
      return null;
    }
  }

  static async getVehicleDataFromSession(): Promise<{ carBrand: string; carModel: string; priceRange: string } | null> {
    try {
      // Get vehicle data from session storage (saved by CarSelectionModal)
      const vehicleData = getVehicleFromSession();
      if (!vehicleData) {
        console.log('No vehicle data found in session storage');
        return null;
      }

      console.log('Found vehicle data in session:', vehicleData);

      // Try to get pricing data for this vehicle
      let priceRange = 'N/A';
      try {
        const csvData = await parseCSVData();
        const pricingData = getPricingData(csvData, vehicleData);
        
        if (pricingData && pricingData.expressServicePrice > 0) {
          priceRange = `₹${pricingData.expressServicePrice}`;
        } else if (pricingData && pricingData.periodicServicePrice > 0) {
          priceRange = `₹${pricingData.periodicServicePrice}`;
        }
      } catch (pricingError) {
        console.log('Could not fetch pricing data, using vehicle data without price');
      }

      return {
        carBrand: vehicleData.manufacturer,
        carModel: vehicleData.model,
        priceRange: priceRange
      };
    } catch (error) {
      console.error('Error getting vehicle data from session:', error);
      return null;
    }
  }

  // Get analytics summary for admin dashboard
  static getAnalyticsSummary(): {
    last7Days: number;
    last30Days: number;
    topService: string;
    conversionRate: string;
  } {
    const redirects = this.getStoredRedirects();
    const now = new Date();
    
    // Last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    const last7Days = redirects.filter(r => new Date(r.timestamp) > sevenDaysAgo).length;

    // Last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const last30Days = redirects.filter(r => new Date(r.timestamp) > thirtyDaysAgo).length;

    // Top service
    const funnelData = this.getConversionFunnelData();
    const topService = funnelData.topServices[0]?.service || 'None';

    // Estimate conversion rate (this would need actual booking data)
    const conversionRate = funnelData.uniqueSessions > 0 
      ? ((funnelData.totalRedirects / funnelData.uniqueSessions) * 100).toFixed(1) + '%'
      : '0%';

    return {
      last7Days,
      last30Days,
      topService,
      conversionRate
    };
  }
}

// Initialize cleanup on page load
if (typeof window !== 'undefined') {
  // Clear old data on page load
  ConversionTracker.clearOldData(30);
} 