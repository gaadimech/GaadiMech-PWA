import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blog';
import type { BlogPostAttributes } from '../types/blog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogCarouselProps {
  maxPosts?: number;
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ maxPosts = 5 }) => {
  const [posts, setPosts] = useState<BlogPostAttributes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await blogService.getAllPosts();
        
        // Sort posts by publishedAt date (newest first)
        const sortedPosts = [...allPosts].sort((a, b) => {
          const dateA = new Date(a.publishedAt || a.createdAt).getTime();
          const dateB = new Date(b.publishedAt || b.createdAt).getTime();
          return dateB - dateA; // Descending order (newest first)
        });
        
        // Get only the specified number of posts
        const recentPosts = sortedPosts.slice(0, maxPosts);
        
        setPosts(recentPosts);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog posts for carousel:', error);
        setError('Failed to load recent blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [maxPosts]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7200]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-gray-500 py-4">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center text-gray-500 py-4">No blog posts available.</div>;
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900">Recent Blog Posts</h3>
        <div className="flex gap-2">
          <button 
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((post) => (
          <div 
            key={post.id}
            className="flex-shrink-0 w-[280px] bg-white rounded-lg shadow-md overflow-hidden"
          >
            {post?.featuredImage?.url ? (
              <img
                src={post.featuredImage.url}
                alt={post.title || 'Blog post image'}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  // Use placeholder if image fails to load
                  (e.target as HTMLImageElement).src = '/images/blog-placeholder.svg';
                }}
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <img 
                  src="/images/blog-placeholder.svg"
                  alt="No image available"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">
                {post.publishedAt ? 
                  new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) 
                  : 'Date not available'
                }
              </p>
              <h4 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title || 'Untitled Post'}
              </h4>
              <Link 
                to={`/blog/${post.slug}`}
                className="text-[#FF7200] text-sm font-semibold hover:text-[#0e5aa8] transition-colors"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel; 