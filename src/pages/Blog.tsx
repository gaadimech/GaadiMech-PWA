import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogService } from '../services/blog';
import type { BlogPostAttributes } from '../types/blog';
import env from '../utils/env';

const Blog = () => {
  const [posts, setPosts] = useState<Array<{ id: number; attributes: BlogPostAttributes }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogService.getAllPosts();
        console.log('API Response:', response);
        if (response.data && Array.isArray(response.data)) {
          const formattedPosts = response.data.map(post => ({
            id: post.id || 0,
            attributes: post.attributes || {
              title: '',
              excerpt: '',
              slug: '',
              publishedAt: new Date().toISOString(),
              featuredImage: null
            }
          }));
          setPosts(formattedPosts);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getImageUrl = (attributes: BlogPostAttributes) => {
    try {
      if (!attributes) return null;
      if (!attributes.featuredImage) return null;
      
      console.log('Featured Image:', attributes.featuredImage);
      
      if (attributes.featuredImage.formats && attributes.featuredImage.formats.medium) {
        return env.getImageUrl(attributes.featuredImage.formats.medium.url);
      }
      
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

  if (error) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>Blog - GaadiMech | Car Maintenance Tips & Automotive Insights</title>
        <meta 
          name="description" 
          content="Read expert automotive tips, car maintenance guides, and industry insights from GaadiMech's professional mechanics." 
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">GaadiMech Blogs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(({ id, attributes }) => {
            if (!attributes) return null;
            
            const imageUrl = getImageUrl(attributes);
            
            return (
              <article 
                key={id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={attributes.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error('Image load error:', imageUrl);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {attributes.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{attributes.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(attributes.publishedAt).toLocaleDateString()}
                    </span>
                    <Link 
                      to={`/blog/${attributes.slug}`}
                      className="text-[#FF7200] hover:text-[#cc5b00] transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;