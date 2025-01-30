import { apiClient } from './api-client';
import type { EnquiryFormData, EnquiryResponse, ServiceTypeResponse } from '../types/enquiry';

export const enquiryService = {
  async submit(formData: EnquiryFormData): Promise<EnquiryResponse> {
    return apiClient.post<EnquiryResponse>('/api/enquiries', {
      data: formData,
    });
  },

  async getServiceTypes(): Promise<ServiceTypeResponse> {
    return apiClient.get<ServiceTypeResponse>('/api/service-types');
  },
}; 