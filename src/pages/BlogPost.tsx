import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogService } from '../services/blog';
import type { BlogPostAttributes } from '../types/blog';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';

/**
 * BlogPostPage Component
 * 
 * This component requires special SEO handling because blog post metadata
 * is dynamic and based on the actual post content fetched from an API.
 * We use Helmet directly here as an exception to the centralized SEO approach.
 */
const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostAttributes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (!slug) {
          console.error('No slug provided in URL parameters');
          throw new Error('No slug provided');
        }
        
        console.log('Fetching blog post with slug:', slug);
        
        const response = await blogService.getPostBySlug(slug);
        console.log('Fetched post successfully:', response); 
        setPost(response);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        
        // Check if error is due to post not found
        if (error instanceof Error && error.message === 'Post not found') {
          console.error(`Blog post with slug "${slug}" not found in database`);
          setError(`Blog post "${slug}" not found. Please check the URL or return to the blog listing.`);
          
          // Set a timeout before redirecting to give the user some context
          setTimeout(() => {
            navigate('/blog');
          }, 3000);
        } else {
          setError('Failed to load blog post. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7200]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => navigate('/blog')}
          className="bg-[#FF7200] text-white px-4 py-2 rounded hover:bg-[#0e5aa8] transition-colors"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      {/* Special case for dynamic blog posts: Use Helmet directly */}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {post.featuredImage?.url && (
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8"
            onError={(e) => {
              console.error('Image failed to load:', post.featuredImage?.url);
              // Use the SVG placeholder
              (e.target as HTMLImageElement).src = '/images/blog-placeholder.svg';
            }}
          />
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <div className="text-gray-600 mb-8">
          {post.publishedAt && `Published on ${new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}`}
        </div>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </motion.div>
  );
};

export default BlogPostPage;