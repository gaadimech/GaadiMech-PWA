import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getSeoConfig } from '../utils/seo';

/**
 * SEOContent - Manages all SEO related metadata for the website
 * This component should be included in App.tsx to provide proper SEO for all pages
 * 
 * It gets the current route and loads the appropriate SEO config from utils/seo.ts
 */
const SEOContent = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Get SEO configuration based on current path
  const seoConfig = getSeoConfig(path);

  // Utility to generate breadcrumb structured data for current path
  const generateBreadcrumbSchema = (path: string) => {
    const segments = path === '/' ? [] : path.split('/').filter(Boolean);
    const baseUrl = 'https://www.gaadimech.com';
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      ...segments.map((segment, idx) => {
        const url = `${baseUrl}/${segments.slice(0, idx + 1).join('/')}`;
        // Convert slug to Title Case label
        const name = segment
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        return {
          '@type': 'ListItem',
          position: idx + 2,
          name,
          item: url,
        };
      }),
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    };
  };

  return (
    <>
      {/* Helmet manages all SEO meta tags */}
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoConfig.canonicalUrl || `https://www.gaadimech.com${path}`} />
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:image" content={seoConfig.image} />

        {/* Additional Open Graph tags */}
        {seoConfig.siteName && (
          <meta property="og:site_name" content={seoConfig.siteName} />
        )}
        {seoConfig.locale && (
          <meta property="og:locale" content={seoConfig.locale} />
        )}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoConfig.canonicalUrl || `https://www.gaadimech.com${path}`} />
        <meta property="twitter:title" content={seoConfig.title} />
        <meta property="twitter:description" content={seoConfig.description} />
        <meta property="twitter:image" content={seoConfig.image} />
        {seoConfig.twitterSite && (
          <meta property="twitter:site" content={seoConfig.twitterSite} />
        )}
        {seoConfig.twitterCreator && (
          <meta property="twitter:creator" content={seoConfig.twitterCreator} />
        )}

        {/* Canonical URL */}
        <link rel="canonical" href={seoConfig.canonicalUrl || `https://www.gaadimech.com${path}`} />
        
        {/* Robots meta tag if specified */}
        {seoConfig.robots && <meta name="robots" content={seoConfig.robots} />}
        
        {/* Hreflang tags if available */}
        {seoConfig.hreflang && seoConfig.hreflang.map((item) => (
          <link 
            key={item.lang}
            rel="alternate" 
            hrefLang={item.lang} 
            href={item.url} 
          />
        ))}
        
        {/* Pagination links if available */}
        {seoConfig.pagination && (
          <>
            {seoConfig.pagination.prev && 
              <link rel="prev" href={seoConfig.pagination.prev} />
            }
            {seoConfig.pagination.next && 
              <link rel="next" href={seoConfig.pagination.next} />
            }
          </>
        )}
        
        {/* Custom structured data if available */}
        {seoConfig.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(seoConfig.structuredData)}
          </script>
        )}

        {/* Auto-generated breadcrumb structured data */}
        {path !== '/admin-dashboard' && (
          <script type="application/ld+json">
            {JSON.stringify(generateBreadcrumbSchema(path))}
          </script>
        )}
      </Helmet>

      {/* Hidden SEO content visible to search engines but not users */}
      {seoConfig.hiddenContent && (
        <div className="hidden-seo-content" aria-hidden="true">
          <h1>{seoConfig.hiddenContent.h1}</h1>
          {seoConfig.hiddenContent.h2 && <h2>{seoConfig.hiddenContent.h2}</h2>}
          {seoConfig.hiddenContent.paragraphs && seoConfig.hiddenContent.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {seoConfig.hiddenContent.listItems && (
            <ul>
              {seoConfig.hiddenContent.listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SEOContent; 