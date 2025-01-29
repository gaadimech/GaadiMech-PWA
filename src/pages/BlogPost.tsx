import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();

  // Temporary mock data until Strapi integration
  const post = {
    title: 'Car Maintenance Tips for Summer',
    meta_title: 'Essential Car Maintenance Tips for Summer | GaadiMech',
    meta_description: 'Learn how to keep your car running smoothly during hot summer months with these essential maintenance tips from GaadiMech experts.',
    excerpt: 'Keep your car running smoothly during the hot summer months...',
    content: `
# Car Maintenance Tips for Summer

Summer can be tough on your vehicle. Here are some essential tips to keep your car running smoothly:

## 1. Check Your Cooling System
- Monitor coolant levels
- Inspect hoses for leaks
- Test the radiator fan

## 2. Maintain Proper Tire Pressure
Hot roads can cause tire pressure to increase. Check your tire pressure regularly.

## 3. Test Your AC System
Make sure your air conditioning is working efficiently before the peak summer heat.
    `,
    image_url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3',
    published_at: '2024-03-15'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>{post.meta_title || post.title} - GaadiMech Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <link rel="canonical" href={`https://gaadimech.com/blog/${slug}`} />
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8"
          />
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <div className="text-gray-600 mb-8">
          Published on {new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </motion.div>
  );
};

export default BlogPost;