import { apiClient } from './api-client';
import { BlogPostAttributes, StrapiResponse } from '../types/blog';

export const blogService = {
  async getAllPosts() {
    try {
      const response = await apiClient.get<StrapiResponse<BlogPostAttributes>>(
        '/articles?populate=*'
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  async getPostBySlug(slug: string) {
    try {
      const response = await apiClient.get<StrapiResponse<BlogPostAttributes>>(
        `/articles?filters[slug][$eq]=${slug}&populate=*`
      );
      if (!response.data.data || response.data.data.length === 0) {
        throw new Error('Post not found');
      }
      return response.data.data[0];
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }
}; 