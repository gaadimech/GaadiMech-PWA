import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogService } from '../services/blog';
import type { BlogPostAttributes } from '../types/blog';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';

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
        if (!slug) throw new Error('No slug provided');
        const response = await blogService.getPostBySlug(slug);
        console.log('Fetched post:', response); // Debug log
        setPost(response);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post. Please try again later.');
        if (error instanceof Error && error.message === 'Post not found') {
          navigate('/blog');
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error}</div>
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
      <Helmet>
        <title>{post.title} - GaadiMech Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.featuredImage?.url && <meta property="og:image" content={post.featuredImage.url} />}
        <link rel="canonical" href={`https://gaadimech.com/blog/${post.slug}`} />
      </Helmet>

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