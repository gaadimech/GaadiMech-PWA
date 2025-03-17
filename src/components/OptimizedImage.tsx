import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        {
          rootMargin: '50px',
        }
      );

      const element = document.querySelector(`[data-image-src="${src}"]`);
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    } else {
      setIsInView(true);
    }
  }, [src, priority]);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined;

    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map((size) => {
        const w = Math.round(width * size);
        return `${src} ${w}w`;
      })
      .join(', ');
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      data-image-src={src}
    >
      {(isInView || priority) && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          srcSet={generateSrcSet()}
          sizes={width ? `(max-width: ${width}px) 100vw, ${width}px` : undefined}
        />
      )}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 