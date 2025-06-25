import { apiClient } from './api-client';
import type { ExpressServiceFormData, ExpressServiceResponse } from '../types/expressService';

export const expressService = {
  submitLead: async (data: ExpressServiceFormData): Promise<ExpressServiceResponse> => {
    try {
      // SECURITY: Only log in development, no customer data
      if (import.meta.env.DEV) {
        console.log('Submitting express service lead...');
      }
      
      const response = await apiClient.post<ExpressServiceResponse>('/express-services', {
        data,
      });
      return response.data;
    } catch (error) {
      // Only log errors in development, no sensitive details
      if (import.meta.env.DEV) {
        console.error('Express service submission failed:', error instanceof Error ? error.message : 'Unknown error');
      }
      throw error;
    }
  },
  
  updateLead: async (id: number, data: Partial<ExpressServiceFormData>): Promise<ExpressServiceResponse> => {
    try {
      // SECURITY: Only log in development, no customer data
      if (import.meta.env.DEV) {
        console.log('Updating express service lead with ID:', id);
      }
      
      const response = await apiClient.put<ExpressServiceResponse>(`/express-services/${id}`, {
        data,
      });
      return response.data;
    } catch (error) {
      // Only log errors in development, no sensitive details
      if (import.meta.env.DEV) {
        console.error('Express service update failed:', error instanceof Error ? error.message : 'Unknown error');
      }
      throw error;
    }
  },
}; 