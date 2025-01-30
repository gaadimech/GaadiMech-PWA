export interface EnquiryFormData {
  name: string;
  mobileNumber: string;
  carModel: string;
  preferredDate: string;
  message: string;
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