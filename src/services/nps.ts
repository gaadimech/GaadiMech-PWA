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
      
      // Format data to exactly match Strapi's expected structure
      // Strapi requires a 'data' object with all fields
      const payload = {
        data: {
          score: Number(formData.score),
          category,
          selectedFeatures: formData.selectedFeatures || '',
          feedback: formData.feedback || '',
          name: formData.name || '',
          mobileNumber: formData.mobileNumber || '',
          carmodel: formData.carModel || '',
          serviceType: formData.serviceType ? String(formData.serviceType) : '',
          serviceDate: formData.serviceDate || '',
          express90Mins: formData.express90Mins ? 'true' : 'false'
        }
      };
      
      // Debug log
      console.log('Submitting NPS data to Strapi:', payload);
      
      // Send the properly formatted request to Strapi
      const response = await apiClient.post<NpsResponse>('/nps-feedbacks', payload);
      return response.data;
    } catch (error: any) {
      // Enhanced error handling with more details
      if (error.response?.data) {
        console.error('NPS submission error details:', error.response.data);
        throw error.response.data;
      }
      console.error('NPS submission error:', error);
      throw error;
    }
  },
  
  // Get service types for the dropdown
  getServiceTypes: async (): Promise<{ data: ServiceType[] }> => {
    try {
      const response = await apiClient.get<{ data: ServiceType[] }>('/service-types');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching service types:', error.response?.data || error);
      if (error.response?.data?.error) {
        throw error.response.data;
      }
      throw error;
    }
  }
}; 