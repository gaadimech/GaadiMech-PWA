import { apiClient } from './api-client';
import type { EnquiryFormData, EnquiryResponse } from '../types/enquiry';

export const enquiryService = {
  async submit(formData: EnquiryFormData): Promise<EnquiryResponse> {
    return apiClient.post<EnquiryResponse>('/api/enquiries', {
      data: formData,
    });
  },
}; 