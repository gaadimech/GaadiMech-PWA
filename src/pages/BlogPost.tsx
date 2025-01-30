import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { blogService } from '../services/blog';
import type { BlogPostAttributes } from '../types/blog';
import env from '../utils/env';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<{ id: number; attributes: BlogPostAttributes } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) throw new Error('Post not found');
        const response = await blogService.getPostBySlug(slug);
        
        // Ensure the response has the expected structure
        if (response && response.id && response.attributes) {
          setPost(response);
        } else {
          console.error('Invalid post data:', response);
          throw new Error('Invalid post data structure');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load blog post');
        setTimeout(() => navigate('/blog'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const getImageUrl = (attributes: BlogPostAttributes) => {
    try {
      // Add defensive checks
      if (!attributes) return null;
      if (!attributes.featuredImage) return null;
      
      // Log the structure to debug
      console.log('Featured Image:', attributes.featuredImage);
      
      // Check if formats exists
      if (attributes.featuredImage.formats && attributes.featuredImage.formats.large) {
        return env.getImageUrl(attributes.featuredImage.formats.large.url);
      }
      
      // Fallback to original url
      if (attributes.featuredImage.url) {
        return env.getImageUrl(attributes.featuredImage.url);
      }
      
      return null;
    } catch (error) {
      console.error('Error in getImageUrl:', error);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF7200]"></div>
      </div>
    );
  }

  if (error || !post || !post.attributes) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen text-red-600">
        {error || 'Post not found'}
      </div>
    );
  }

  const { attributes } = post;
  const imageUrl = getImageUrl(attributes);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>{attributes.seo?.metaTitle || attributes.title} - GaadiMech Blog</title>
        <meta 
          name="description" 
          content={attributes.seo?.metaDescription || attributes.excerpt} 
        />
        <meta 
          property="og:title" 
          content={attributes.seo?.metaTitle || attributes.title} 
        />
        <meta 
          property="og:description" 
          content={attributes.seo?.metaDescription || attributes.excerpt} 
        />
        {attributes.seo?.metaImage && (
          <meta 
            property="og:image" 
            content={`${env.STRAPI_URL}${attributes.seo.metaImage.url}`} 
          />
        )}
        <meta name="robots" content={attributes.seo?.metaRobots || 'index,follow'} />
        <link rel="canonical" href={`https://gaadimech.com/blog/${slug}`} />
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={attributes.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8"
          />
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {attributes.title}
        </h1>
        
        <div className="text-gray-600 mb-8">
          Published on {new Date(attributes.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#FF7200] hover:prose-a:text-[#cc5b00]">
          <ReactMarkdown>{attributes.content}</ReactMarkdown>
        </div>
      </article>
    </motion.div>
  );
};

export default BlogPost;