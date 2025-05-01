import React from 'react';
import { Helmet } from 'react-helmet-async';
import ACService from './services/ACService';
import { getSeoConfig } from '../utils/seo';

const CarACServiceInJaipur = () => {
  const seoConfig = getSeoConfig('/car-ac-service-in-jaipur');
  
  return (
    <>
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <link rel="canonical" href={seoConfig.canonicalUrl || window.location.href} />
        {seoConfig.robots && <meta name="robots" content={seoConfig.robots} />}
      </Helmet>
      <ACService />
    </>
  );
};

export default CarACServiceInJaipur; 