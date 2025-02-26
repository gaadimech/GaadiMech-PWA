export interface ExpressServiceFormData {
  mobileNumber: string;
  serviceType?: string;
  serviceDate?: string;
  timeSlot?: string;
  carBrand?: string;
  carModel?: string;
  servicePrice?: number;
}

export interface ExpressServiceResponse {
  data: {
    id: number;
    attributes: {
      mobileNumber: string;
      serviceType?: string;
      serviceDate?: string;
      timeSlot?: string;
      carBrand?: string;
      carModel?: string;
      servicePrice?: number;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: Record<string, unknown>;
} 