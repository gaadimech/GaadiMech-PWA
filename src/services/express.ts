import { apiClient } from './api-client';
import type { ExpressLeadFormData, ExpressLeadResponse } from '../types/express';

export const expressService = {
  async submitLead(formData: ExpressLeadFormData): Promise<ExpressLeadResponse> {
    const response = await apiClient.post<ExpressLeadResponse>('/express-leads', {
      data: formData,
    });
    return response.data;
  },
  
  async updateLead(leadId: number, updateData: { serviceDate?: string; timeSlot?: string }): Promise<ExpressLeadResponse> {
    const response = await apiClient.put<ExpressLeadResponse>(`/express-leads/${leadId}`, {
      data: updateData,
    });
    return response.data;
  },
}; 