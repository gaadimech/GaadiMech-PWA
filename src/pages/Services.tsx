import React from 'react';
import { motion } from 'framer-motion';
import ServicesComponent from '../components/Services';

const Services = ({ skipSeo = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <ServicesComponent showSeoContent={true} />
    </motion.div>
  );
};

export default Services;