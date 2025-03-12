export interface ExpressLeadFormData {
  name?: string;
  mobileNumber: string;
  carModel?: string;
  preferredDate?: string;
  serviceType?: string;
  carBrand?: string;
  fuel_type?: string;
  servicePrice?: number;
  serviceDate?: string;
  timeSlot?: string;
}

export interface ExpressLeadResponse {
  data: {
    id: number;
    attributes: {
      name?: string;
      mobileNumber: string;
      carModel?: string;
      carBrand?: string;
      fuel_type?: string;
      preferredDate?: string;
      serviceType?: string;
      servicePrice?: number;
      serviceDate?: string;
      timeSlot?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: Record<string, unknown>;
} 