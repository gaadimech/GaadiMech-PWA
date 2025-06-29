import { apiClient } from './api-client';
import { LeadData, StrapiLeadResponse, StrapiLeadsListResponse } from '../types/leads';

class LeadsService {
  /**
   * Create a new lead in Strapi
   */
  async createLead(leadData: Omit<LeadData, 'leadStatus'>): Promise<StrapiLeadResponse | null> {
    try {
      const payload = {
        data: {
          ...leadData,
          leadStatus: 'new' as const,
        }
      };

      console.log('Creating lead in Strapi:', payload);
      
      const response = await apiClient.post<StrapiLeadResponse>('/mncaptures', payload);
      
      console.log('✅ Lead created successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error creating lead:', error);
      
      // Handle Strapi validation errors
      if (error.response?.data?.error) {
        const errorDetails = error.response.data.error;
        console.error('Strapi Error Details:', {
          message: errorDetails.message,
          status: errorDetails.status,
          name: errorDetails.name
        });
        
        if (errorDetails.details?.errors) {
          console.error('Field Validation Errors:', errorDetails.details.errors);
        }
      }
      
      // Log the full response for debugging
      if (error.response?.data) {
        console.error('Full Strapi Response:', error.response.data);
      }
      
      return null;
    }
  }

  /**
   * Update an existing lead
   */
  async updateLead(documentId: string, updates: Partial<LeadData>): Promise<boolean> {
    try {
      const payload = {
        data: updates
      };

      console.log('Updating lead in Strapi:', documentId, payload);
      
      await apiClient.put(`/mncaptures/${documentId}`, payload);
      
      console.log('✅ Lead updated successfully');
      return true;
    } catch (error) {
      console.error('❌ Error updating lead:', error);
      return false;
    }
  }

  /**
   * Find lead by mobile number
   */
  async findLeadByMobile(mobileNumber: string): Promise<StrapiLeadResponse | null> {
    try {
      const response = await apiClient.get<StrapiLeadsListResponse>('/mncaptures', {
        params: {
          'filters[mobileNumber][$eq]': mobileNumber,
          'pagination[pageSize]': 1,
        }
      });

      if (response.data.data.length > 0) {
        return {
          data: response.data.data[0]
        };
      }

      return null;
    } catch (error) {
      console.error('❌ Error finding lead by mobile:', error);
      return null;
    }
  }
}

export const leadsService = new LeadsService(); 