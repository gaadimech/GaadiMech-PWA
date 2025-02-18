import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import ComingSoon from '../components/ComingSoon';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <ComingSoon />
      <Contact />
    </main>
  );
};

export default Home;