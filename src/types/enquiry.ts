export interface ServiceType {
  id: number;
  documentId: string;
  name: string;
  isDefault: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ServiceTypeResponse {
  data: ServiceType[];
  meta: Record<string, unknown>;
}

export interface EnquiryFormData {
  name: string;
  mobileNumber: string;
  carModel: string;
  preferredDate: string;
  message: string;
  serviceType?: number;
}

export interface EnquiryResponse {
  data: {
    id: number;
    attributes: {
      name: string;
      mobileNumber: string;
      carModel: string;
      preferredDate: string;
      message: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: Record<string, unknown>;
} 