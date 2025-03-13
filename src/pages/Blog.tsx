import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blog';
import type { BlogPostAttributes } from '../types/blog';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostAttributes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await blogService.getAllPosts();
        console.log('Fetched blog posts:', posts); // Debug log
        setPosts(posts);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        <meta name="description" content="Read expert automotive tips, car maintenance guides, and industry insights from GaadiMech's professional mechanics." />
        <meta name="keywords" content="car maintenance tips, automotive blog, car repair guide, vehicle maintenance blog" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">GaadiMech Blogs</h1>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7200]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 py-8">No blog posts available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {post?.featuredImage?.url ? (
                  <img
                    src={post.featuredImage.url}
                    alt={post.title || 'Blog post image'}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', post.featuredImage?.url);
                      // Use the SVG placeholder
                      (e.target as HTMLImageElement).src = '/images/blog-placeholder.svg';
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <img 
                      src="/images/blog-placeholder.svg"
                      alt="No image available"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.publishedAt ? 
                      new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) 
                      : 'Date not available'
                    }
                  </p>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title || 'Untitled Post'}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt || 'No excerpt available'}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-[#FF7200] font-semibold hover:text-[#0e5aa8] transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;