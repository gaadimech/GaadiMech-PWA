import { apiClient } from './api-client';
import { BlogPostAttributes, StrapiResponse } from '../types/blog';
import axios, { AxiosError } from 'axios';

export const blogService = {
  async getAllPosts() {
    try {
      const response = await apiClient.get<StrapiResponse<BlogPostAttributes>>(
        '/articles?populate=*'
      );
      
      if (!response?.data?.data) {
        throw new Error('Invalid response format: missing data');
      }
      
      const transformedData = response.data.data.map(item => ({
        ...item.attributes,
        id: item.id
      }));
      
      return transformedData;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async getPostBySlug(slug: string) {
    try {
      const response = await apiClient.get<StrapiResponse<BlogPostAttributes>>(
        `/articles?filters[slug][$eq]=${slug}&populate=*`
      );
      
      console.log('Raw post response:', response); // Debug log
      
      if (!response?.data?.data || !Array.isArray(response.data.data) || response.data.data.length === 0) {
        throw new Error('Post not found');
      }
      
      const post = response.data.data[0];
      // Transform the data to match the expected format
      return {
        ...post.attributes,
        id: post.id
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Service error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      } else {
        console.error('Service error:', error);
      }
      throw error;
    }
  }
}; 