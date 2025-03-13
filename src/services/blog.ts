import { apiClient } from './api-client';
import { BlogPostAttributes, RawBlogPostAttributes, StrapiResponse } from '../types/blog';
import axios from 'axios';

export const blogService = {
  async getAllPosts() {
    try {
      const response = await apiClient.get<StrapiResponse<RawBlogPostAttributes>>(
        '/articles?populate=*'
      );
      
      // Add debugging to see the raw response
      console.log('Raw API response:', JSON.stringify(response.data, null, 2));
      
      if (!response?.data?.data) {
        throw new Error('Invalid response format: missing data');
      }
      
      const transformedData = response.data.data.map(post => {
        // Log each post to debug
        console.log('Processing post:', post.id, JSON.stringify(post, null, 2));
        
        // Get the API base URL to prepend to relative image URLs
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337';
        
        // Handle featured image
        let featuredImage = null;
        if (post.featuredImage) {
          const imageUrl = post.featuredImage.url;
          featuredImage = {
            url: imageUrl.startsWith('http') ? imageUrl : `${apiUrl}${imageUrl}`,
            // Add other needed image properties if required
          };
        }
        
        // Use the first available date field for publication date
        const publishDate = 
          post.publishedAt || 
          post.pub_at || 
          post.published_at || 
          post.createdAt;
        
        return {
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt || undefined,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          publishedAt: publishDate,
          featuredImage,
          seo: post.seo ? {
            id: post.seo.id,
            metaTitle: post.seo.metaTitle,
            metaDescription: post.seo.metaDescription,
            metaRobots: post.seo.metaRobots,
            metaImage: post.seo.metaImage ? {
              id: post.seo.metaImage.id,
              url: post.seo.metaImage.url
            } : null
          } : null
        };
      });
      
      return transformedData;
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Log additional details about the error
      if (error && typeof error === 'object') {
        const err = error as any;
        if (err.response) {
          console.error('API Error Details:', {
            status: err.response.status,
            data: err.response.data,
            message: err.message
          });
        }
      }
      throw error;
    }
  },

  async getPostBySlug(slug: string) {
    try {
      const response = await apiClient.get<StrapiResponse<RawBlogPostAttributes>>(
        `/articles?filters[slug][$eq]=${slug}&populate=*`
      );
      
      // Add debugging
      console.log('Raw post response:', JSON.stringify(response.data, null, 2));
      
      if (!response?.data?.data || !Array.isArray(response.data.data) || response.data.data.length === 0) {
        throw new Error('Post not found');
      }
      
      const post = response.data.data[0];
      console.log('Processing post:', post.id, JSON.stringify(post, null, 2));
      
      // Get the API base URL to prepend to relative image URLs
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337';
      
      // Handle featured image
      let featuredImage = null;
      if (post.featuredImage) {
        const imageUrl = post.featuredImage.url;
        featuredImage = {
          url: imageUrl.startsWith('http') ? imageUrl : `${apiUrl}${imageUrl}`,
          // Add other needed image properties if required
        };
      }
      
      // Use the first available date field for publication date
      const publishDate = 
        post.publishedAt || 
        post.pub_at || 
        post.published_at || 
        post.createdAt;
      
      // Transform the data to match the expected format
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || undefined,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        publishedAt: publishDate,
        featuredImage,
        seo: post.seo ? {
          id: post.seo.id,
          metaTitle: post.seo.metaTitle,
          metaDescription: post.seo.metaDescription,
          metaRobots: post.seo.metaRobots,
          metaImage: post.seo.metaImage ? {
            id: post.seo.metaImage.id,
            url: post.seo.metaImage.url
          } : null
        } : null
      };
    } catch (error) {
      console.error('Service error:', error);
      
      if (error && typeof error === 'object') {
        const err = error as any;
        if (err.response) {
          console.error('API Error Details:', {
            status: err.response.status,
            data: err.response.data,
            message: err.message
          });
        }
      }
      
      throw error;
    }
  }
}; 