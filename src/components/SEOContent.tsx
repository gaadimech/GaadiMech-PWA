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

  return (
    <>
      {/* Helmet manages all SEO meta tags */}
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://gaadimech.com${path}`} />
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:image" content={seoConfig.image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://gaadimech.com${path}`} />
        <meta property="twitter:title" content={seoConfig.title} />
        <meta property="twitter:description" content={seoConfig.description} />
        <meta property="twitter:image" content={seoConfig.image} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://gaadimech.com${path}`} />
        
        {/* Custom structured data if available */}
        {seoConfig.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(seoConfig.structuredData)}
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