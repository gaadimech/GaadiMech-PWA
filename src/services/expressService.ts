import { apiClient } from './api-client';
import type { ExpressServiceFormData, ExpressServiceResponse } from '../types/expressService';

export const expressService = {
  submitLead: async (data: ExpressServiceFormData): Promise<ExpressServiceResponse> => {
    try {
      console.log('Submitting express service lead with data:', data);
      
      const response = await apiClient.post<ExpressServiceResponse>('/express-services', {
        data,
      });
      return response.data;
    } catch (error) {
      console.error('API Error details:', error);
      throw error;
    }
  },
  
  updateLead: async (id: number, data: Partial<ExpressServiceFormData>): Promise<ExpressServiceResponse> => {
    try {
      console.log('Updating express service lead:', { id, data });
      
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