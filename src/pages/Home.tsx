import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import ComingSoon from '../components/ComingSoon';
import HomepageFAQSection from '../components/HomepageFAQSection';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <ComingSoon />
      <HomepageFAQSection />
      <Contact />
    </main>
  );
};

export default Home;