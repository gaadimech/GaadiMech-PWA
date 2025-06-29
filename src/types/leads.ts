export interface LeadData {
  mobileNumber: string;
  location?: string;
  area?: string;
  serviceInterest?: string;
  source: string; // Where they came from (hero, service page, etc.)
  sessionId: string;
  userId: string;
  whatsappRedirectCount: number;
  firstVisitTimestamp: string;
  lastActivityTimestamp: string;
  carBrand?: string;
  carModel?: string;
  priceRange?: string;
  leadStatus: 'new' | 'contacted' | 'interested' | 'not_interested' | 'converted';
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  deviceType?: string;
  browserInfo?: string;
  ipAddress?: string;
  notes?: string;
}

export interface LeadTrackingData {
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

export interface StrapiLeadResponse {
  data: {
    id: number;
    documentId: string;
    attributes: LeadData & {
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface StrapiLeadsListResponse {
  data: Array<{
    id: number;
    documentId: string;
    attributes: LeadData & {
      createdAt: string;
      updatedAt: string;
    };
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
} 