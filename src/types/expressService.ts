export interface ExpressServiceFormData {
  mobileNumber: string;
  serviceType?: string;
  serviceDate?: string;
  timeSlot?: string;
}

export interface ExpressServiceResponse {
  data: {
    id: number;
    attributes: {
      mobileNumber: string;
      serviceType?: string;
      serviceDate?: string;
      timeSlot?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: Record<string, unknown>;
} 