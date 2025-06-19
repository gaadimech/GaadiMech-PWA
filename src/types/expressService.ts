export interface ExpressServiceFormData {
  mobileNumber: string;
  serviceType: string;
  submissionTimestamp?: string; // Set automatically by backend
  serviceDate?: string;
  timeSlot?: string;
  carBrand?: string;
  carModel?: string;
  fuel_type?: string;
  servicePrice?: number; // integer in Strapi
  couponCode?: string | null;
  finalPrice?: number; // decimal in Strapi
  // Location fields (all strings in Strapi)
  userCity?: string | null;
  userState?: string | null;
  userCountry?: string | null;
  userLatitude?: string | null; // String in Strapi schema
  userLongitude?: string | null; // String in Strapi schema
  locationSource?: string | null;
}

export interface ExpressServiceResponse {
  data: {
    id: number;
          attributes: {
        mobileNumber: string;
        serviceType: string;
        submissionTimestamp?: string;
      serviceDate?: string;
      timeSlot?: string;
      carBrand?: string;
      carModel?: string;
      fuel_type?: string;
      servicePrice?: number;
      couponCode?: string | null;
      finalPrice?: number;
      // Location fields
      userCity?: string | null;
      userState?: string | null;
      userCountry?: string | null;
      userLatitude?: string | null;
      userLongitude?: string | null;
      locationSource?: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: Record<string, unknown>;
} 