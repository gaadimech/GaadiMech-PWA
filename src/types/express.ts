export interface ExpressLeadFormData {
  name: string;
  mobileNumber: string;
  carModel: string;
  preferredDate: string;
  serviceType: string;
}

export interface ExpressLeadResponse {
  data: {
    id: number;
    attributes: {
      name: string;
      mobileNumber: string;
      carModel: string;
      preferredDate: string;
      serviceType: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: Record<string, unknown>;
} 