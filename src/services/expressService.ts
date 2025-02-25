import { apiClient } from './api-client';
import type { ExpressServiceFormData, ExpressServiceResponse } from '../types/expressService';

export const expressService = {
  submitLead: async (data: ExpressServiceFormData): Promise<ExpressServiceResponse> => {
    const response = await apiClient.post<ExpressServiceResponse>('/express-services', {
      data,
    });
    return response.data;
  },
  
  updateLead: async (id: number, data: Partial<ExpressServiceFormData>): Promise<ExpressServiceResponse> => {
    try {
      const response = await apiClient.put<ExpressServiceResponse>(`/express-services/${id}`, {
        data,
      });
      return response.data;
    } catch (error) {
      console.error('API Error details:', error);
      throw error;
    }
  },
}; 