import { apiClient } from './api-client';
import type { EnquiryFormData, EnquiryResponse, ServiceTypeResponse } from '../types/enquiry';

export const enquiryService = {
  async submit(formData: EnquiryFormData): Promise<EnquiryResponse> {
    const response = await apiClient.post<EnquiryResponse>('/enquiries', {
      data: formData,
    });
    return response.data;
  },

  async getServiceTypes(): Promise<ServiceTypeResponse> {
    const response = await apiClient.get<ServiceTypeResponse>('/service-types');
    return response.data;
  },
}; 