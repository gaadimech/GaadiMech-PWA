import React from 'react';
import { Helmet } from 'react-helmet-async';
import DentingService from './services/DentingService';
import { getSeoConfig } from '../utils/seo';

const CarDentPaintServiceInJaipur = () => {
  const seoConfig = getSeoConfig('/car-dent-paint-service-in-jaipur');
  
  return (
    <>
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <link rel="canonical" href={seoConfig.canonicalUrl || window.location.href} />
        {seoConfig.robots && <meta name="robots" content={seoConfig.robots} />}
      </Helmet>
      <DentingService />
    </>
  );
};

export default CarDentPaintServiceInJaipur; 