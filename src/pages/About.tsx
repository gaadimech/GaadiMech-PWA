import React from 'react';
import { motion } from 'framer-motion';
import AboutComponent from '../components/About';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <AboutComponent />
    </motion.div>
  );
};

export default About;