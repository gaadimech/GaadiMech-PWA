import { apiClient } from './api-client';
import { ContactFormData, ContactResponse } from '../types/contact';

export const submitContactForm = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await apiClient.post<ContactResponse>('/contacts', {
      data: formData
    });
    return response.data;
  } catch (error: any) {
    // Enhance error handling for Strapi validation errors
    if (error.response?.data?.error) {
      throw error.response.data;
    }
    throw error;
  }
}; 