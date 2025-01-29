import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  // Temporary mock data until Strapi integration
  const posts = [
    {
      id: '1',
      title: 'Car Maintenance Tips for Summer',
      excerpt: 'Keep your car running smoothly during the hot summer months...',
      image_url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3',
      published_at: '2024-03-15',
      slug: 'car-maintenance-tips-summer'
    },
    // Add 2-3 more mock posts
  ];

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
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-[#FF7200] hover:text-[#cc5b00] transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;