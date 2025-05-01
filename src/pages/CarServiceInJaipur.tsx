import React from 'react';
import { Helmet } from 'react-helmet-async';
import Services from './Services';
import { getSeoConfig } from '../utils/seo';

const CarServiceInJaipur = () => {
  const seoConfig = getSeoConfig('/car-service-in-jaipur');
  
  return (
    <>
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <link rel="canonical" href={seoConfig.canonicalUrl || window.location.href} />
        {seoConfig.robots && <meta name="robots" content={seoConfig.robots} />}
      </Helmet>
      <Services />
    </>
  );
};

export default CarServiceInJaipur; 