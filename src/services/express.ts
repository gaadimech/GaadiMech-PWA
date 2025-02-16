import { apiClient } from './api-client';
import type { ExpressLeadFormData, ExpressLeadResponse } from '../types/express';

export const expressService = {
  async submitLead(formData: ExpressLeadFormData): Promise<ExpressLeadResponse> {
    const response = await apiClient.post<ExpressLeadResponse>('/express-leads', {
      data: formData,
    });
    return response.data;
  },
}; 