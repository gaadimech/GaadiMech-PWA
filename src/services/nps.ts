import { apiClient } from './api-client';
import { NpsFormData, NpsResponse, ServiceType } from '../types/nps';

export const npsService = {
  // Submit NPS feedback
  submit: async (formData: NpsFormData): Promise<NpsResponse> => {
    try {
      // Determine category based on score
      const category = formData.score !== null
        ? formData.score <= 6
          ? 'detractor'
          : formData.score <= 8
            ? 'passive'
            : 'promoter'
        : 'passive';
      
      // Create a new object with proper types matching Strapi's content type
      const formattedData = {
        score: Number(formData.score),
        category,
        selectedFeatures: formData.selectedFeatures || '',
        feedback: formData.feedback || '',
        name: formData.name || '',
        mobileNumber: formData.mobileNumber || '',
        serviceType: formData.serviceType ? String(formData.serviceType) : '',
        serviceDate: formData.serviceDate || '',
        express90Mins: formData.express90Mins ? 'true' : 'false'
      };
      
      // Send the data in the same format as other working forms
      const response = await apiClient.post<NpsResponse>('/nps-feedbacks', {
        data: formattedData
      });
      
      return response.data;
    } catch (error: any) {
      // Enhance error handling for Strapi validation errors
      if (error.response?.data?.error) {
        throw error.response.data;
      }
      throw error;
    }
  },
  
  // Get service types for the dropdown
  getServiceTypes: async (): Promise<{ data: ServiceType[] }> => {
    try {
      const response = await apiClient.get<{ data: ServiceType[] }>('/service-types');
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw error.response.data;
      }
      throw error;
    }
  }
}; 