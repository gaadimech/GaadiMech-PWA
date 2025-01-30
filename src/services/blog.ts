import { apiClient } from './api-client';
import { BlogPostAttributes, StrapiResponse } from '../types/blog';

export const blogService = {
  async getAllPosts() {
    try {
      const response = await apiClient.get<StrapiResponse<BlogPostAttributes>>(
        '/api/articles?populate=*'
      );
      console.log('Raw API response:', response);
      return response;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  async getPostBySlug(slug: string) {
    try {
      const response = await apiClient.get<StrapiResponse<BlogPostAttributes>>(
        `/api/articles?filters[slug][$eq]=${slug}&populate=*`
      );
      console.log('Raw API response for slug:', response);
      
      if (!response.data || response.data.length === 0) {
        throw new Error('Post not found');
      }
      return response.data[0];
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }
}; 