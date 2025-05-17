import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, Clock, Shield, Zap, Truck, Settings, Users, Award, DollarSign, TrendingUp, BarChart, Percent, ThumbsUp, ChevronDown, Rocket, PieChart, BarChart2, LineChart, TrendingDown, X, Car, Phone, Mail, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SimpleFranchiseForm from './SimpleFranchiseForm';

const FranchisePartner = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [animateCount, setAnimateCount] = useState(false);
  const [showApplyButton, setShowApplyButton] = useState(false);
  const [countValues, setCountValues] = useState({
    investment: 0,
    roi: 0,
    breakEven: 0,
    profit: 0,
    annualProfit: 0
  });

  // Start count animation when page is viewed
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCount(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show Apply Now button after 90 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApplyButton(true);
    }, 90000); // 90 seconds

    return () => clearTimeout(timer);
  }, []);

  // Animate count values
  useEffect(() => {
    if (animateCount) {
      const duration = 1500;
      const frames = 60;
      const interval = duration / frames;
      
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        const progress = Math.min(frame * interval / duration, 1);
        
        setCountValues({
          investment: Math.floor(progress * 7),
          roi: Math.floor(progress * 200),
          breakEven: Math.floor(progress * 8),
          profit: Math.floor(progress * 4.4 * 10) / 10,
          annualProfit: Math.floor(progress * 30)
        });
        
        if (frame >= frames) clearInterval(timer);
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [animateCount]);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // FAQ Data
  const faqData = [
    {
      question: "What is the total investment required?",
      answer: <>
        The total investment required is <span className="font-semibold">₹7,00,000</span>, which includes equipment setup, working capital, branding, franchise fees, software, and security deposit. This comprehensive package ensures you have everything needed to start operations.
      </>
    },
    {
      question: "How soon can I expect to break even?",
      answer: <>
        Most franchise partners achieve <span className="font-semibold">break-even within 8 months</span> of operations. Our revenue guarantee system and operational efficiency help you reach profitability faster than traditional auto service businesses.
      </>
    },
    {
      question: "What kind of support will I receive?",
      answer: <>
        We provide <span className="font-semibold">comprehensive end-to-end support</span> including complete infrastructure & branding, tools & training, spare parts supply chain, CRM & operational software, and local hiring & marketing assistance. Our team stays with you from setup to scale.
      </>
    },
    {
      question: "Is there any royalty or revenue sharing?",
      answer: <>
        Unlike traditional franchises with heavy fees, we only have a <span className="font-semibold">15% revenue share model with no fixed royalty</span>. This ensures our incentives are aligned - we only succeed when you do. Most competitors charge 25-30% plus fixed monthly fees.
      </>
    },
    {
      question: "How much space is required for setup?",
      answer: <>
        Our revolutionary compact model requires just <span className="font-semibold">1000 sq. ft.</span> compared to traditional workshops that need 3000-5000 sq. ft. This results in 70% lower rental costs while maintaining high efficiency and profitability.
      </>
    }
  ];

  return (
    <>
      <Helmet>
        <title>GaadiMech Express Franchise | Start Your Own Car Service Business</title>
        <meta name="description" content="Invest in GaadiMech Express Franchise with just ₹7 lakhs. Enjoy 200%+ ROI in 18 months, break even in 8 months, and earn up to ₹4.4 lakhs monthly with our revolutionary car service franchise model." />
      </Helmet>
      
      {/* Main Apply Button only */}
      {showApplyButton && (
        <div className="fixed bottom-8 right-8 z-50">
          <motion.button
            onClick={openForm}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white rounded-lg shadow-lg flex items-center justify-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="bg-green-500 text-white px-3 py-2 rounded-lg font-medium animate-pulse">
              Apply Now
            </span>
          </motion.button>
        </div>
      )}
      
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF7200]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-80 -left-32 w-64 h-64 bg-[#FF7200]/5 rounded-full blur-3xl"></div>
          
          {/* Hero section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20 relative"
          >
            <div className="absolute top-10 left-0 w-20 h-20 border-t-2 border-l-2 border-[#FF7200]/30 -z-10"></div>
            <div className="absolute bottom-10 right-0 w-20 h-20 border-b-2 border-r-2 border-[#FF7200]/30 -z-10"></div>
            
            <div className="bg-[#FF7200]/10 inline-block px-4 py-2 rounded-full text-[#FF7200] font-semibold mb-4">
              GaadiMech Express Franchise Opportunity
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Start Your Own Premium Car Service Business
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Launch with just ₹7 lakhs & earn ₹30 Lakhs+ annually with India's most innovative car service brand
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button
                onClick={openForm}
                className="bg-[#FF7200] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FF9500] transition-colors shadow-lg inline-flex items-center relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></span>
                Apply For Franchise
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
            
            {/* Stats Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF7200]/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-[#FF7200]">₹{countValues.investment}<span className="text-2xl">L</span></div>
                  <p className="text-gray-600 text-sm">Investment</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF7200]/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-[#FF7200]">{countValues.roi}%<span className="text-2xl">+</span></div>
                  <p className="text-gray-600 text-sm">ROI in 18 Months</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF7200]/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-[#FF7200]">{countValues.breakEven}<span className="text-2xl">mo</span></div>
                  <p className="text-gray-600 text-sm">Break Even Time</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF7200]/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-[#FF7200]">₹{countValues.annualProfit}<span className="text-2xl">L+</span></div>
                  <p className="text-gray-600 text-sm">Annual Profit</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Revenue Guarantee section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-20 relative z-10"
          >
            {/* Decorative pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4xMDUgMC0yIC44OTUtMiAyIDAgMS4xMDUuODk1IDIgMiAyIDEuMTA1IDAgMi0uODk1IDItMiAwLTEuMTA1LS44OTUtMi0yLTIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
            
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden border-4 border-[#FF7200] transform hover:scale-[1.02] transition-all duration-300">
              {/* Pulsating background effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-48 h-48 bg-[#FF7200]/20 rounded-full blur-2xl animate-pulse" 
                     style={{top: '20%', left: '10%', animationDuration: '6s'}}></div>
                <div className="absolute w-72 h-72 bg-[#FF7200]/10 rounded-full blur-2xl animate-pulse" 
                     style={{top: '50%', right: '10%', animationDuration: '8s'}}></div>
              </div>

              {/* Shield icon */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-800 p-5 rounded-full shadow-xl relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Shield className="w-16 h-16 text-[#FF7200]" />
                  </motion.div>
                  <div className="absolute -inset-2 bg-[#FF7200]/30 rounded-full blur-md -z-10"></div>
                </div>
              </div>
              
              <div className="text-center mb-10">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  <span className="text-[#FF7200]">REVENUE GUARANTEE</span>
                </h3>
                <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-medium leading-relaxed">
                  We ensure your success with a <span className="font-bold bg-[#FF7200] px-2 py-1 rounded">guaranteed minimum revenue</span> — or <span className="underline decoration-[#FF7200] decoration-4">we'll pay the difference!</span> Your business stability is our top priority.
                </p>
              </div>
              
              {/* Featured callout with improved visual emphasis */}
              <div className="mb-10">
                <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border-2 border-[#FF7200] relative overflow-hidden max-w-3xl mx-auto transform hover:scale-105 transition-transform duration-300">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#FF7200]/30 rounded-full blur-xl"></div>
                  <div className="relative text-center">
                    <p className="text-3xl font-bold text-[#FF7200] mb-3">70% Lower Rental Costs!</p>
                    <p className="text-white text-xl">Revolutionary 1000 sq. ft. Compact Model</p>
                  </div>
                </div>
              </div>
              
              {/* Feature cards with better mobile layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/5 p-5 rounded-lg backdrop-blur-sm border border-white/5 hover:border-[#FF7200]/20 transition-colors duration-300 flex flex-col items-center text-center"
                >
                  <div className="bg-white/5 p-3 rounded-full mb-3">
                    <Zap className="w-7 h-7 text-[#FF7200]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">Express 90-Minute Service</h4>
                  <p className="text-gray-300 text-sm">Higher Customer Satisfaction</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/5 p-5 rounded-lg backdrop-blur-sm border border-white/5 hover:border-[#FF7200]/20 transition-colors duration-300 flex flex-col items-center text-center"
                >
                  <div className="bg-white/5 p-3 rounded-full mb-3">
                    <Settings className="w-7 h-7 text-[#FF7200]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">Complete Tech Stack</h4>
                  <p className="text-gray-300 text-sm">Zero Operational Hassles</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/5 p-5 rounded-lg backdrop-blur-sm border border-white/5 hover:border-[#FF7200]/20 transition-colors duration-300 flex flex-col items-center text-center"
                >
                  <div className="bg-white/5 p-3 rounded-full mb-3">
                    <TrendingUp className="w-7 h-7 text-[#FF7200]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">Proven Business Model</h4>
                  <p className="text-gray-300 text-sm">In India's ₹80,000 Crore Industry</p>
                </motion.div>
              </div>
              
              {/* New bottom banner emphasizing revenue guarantee */}
              <div className="mt-8 text-center">
                <div className="inline-block bg-[#FF7200] px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-xl font-bold text-white">
                    Our guarantee means ZERO revenue risk for you!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Who is GaadiMech section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16 relative"
          >
            <div className="absolute -z-10 w-72 h-72 bg-[#FF7200]/5 rounded-full blur-3xl opacity-70 -right-20 -top-20"></div>
            
            <div className="text-center mb-10">
              <div className="inline-block mb-3">
                <div className="relative">
                  <span className="absolute inset-0 rounded-lg transform rotate-3 bg-[#FF7200]/20"></span>
                  <h3 className="relative text-2xl md:text-3xl font-bold text-gray-900 bg-white px-4 py-1 rounded-lg">Who is <span className="text-[#FF7200]">GaadiMech?</span></h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7200] to-[#FF9500]"></div>
              <div className="p-6 md:p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="text-[#FF7200] w-5 h-5 mr-2" />
                  Founded by Industry Experts
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="rounded-xl overflow-hidden shadow-md relative"
                  >
                    <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] h-2"></div>
                    <div className="p-5 bg-white">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#FFF1E6] flex items-center justify-center mr-3 shadow-sm">
                          <span className="text-xl">🔧</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-800 text-lg">Surakshit Soni</h5>
                          <p className="text-[#FF7200] font-medium text-sm">Co-Founder & Tech Lead</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5 pl-4">
                        {[
                          "Mechanical Engineer, BITS Pilani",
                          "Ex-Flipkart, OYO, and Credit Suisse",
                          "Scaled US based tutoring business to ₹1.2Cr annual revenue",
                          <strong>Leads Tech Systems, Marketing & Service Innovation</strong>
                        ].map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="text-gray-600 relative flex"
                          >
                            <span className="absolute left-[-1rem] text-[#FF7200] font-bold">•</span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <div className="absolute top-2 right-3 opacity-5">
                        <Settings className="w-24 h-24 text-[#FF7200]" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="rounded-xl overflow-hidden shadow-md relative"
                  >
                    <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] h-2"></div>
                    <div className="p-5 bg-white">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#FFF1E6] flex items-center justify-center mr-3 shadow-sm">
                          <span className="text-xl">🚗</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-800 text-lg">CA Sarvesh Kabra</h5>
                          <p className="text-[#FF7200] font-medium text-sm">Co-Founder & Business Lead</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5 pl-4">
                        {[
                          "Founded Jaipur's largest car servicing brand",
                          "Top-ranked CA (AIR 11) and CS (AIR 19)",
                          "5+ years of automobile aftermarket leadership",
                          <strong>Drives Growth Strategy & Financial Performance</strong>
                        ].map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="text-gray-600 relative flex"
                          >
                            <span className="absolute left-[-1rem] text-[#FF7200] font-bold">•</span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <div className="absolute top-2 right-3 opacity-5">
                        <TrendingUp className="w-24 h-24 text-[#FF7200]" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Add VC-Backed Trust Signal */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 relative"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 shadow-sm overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="bg-white p-3 rounded-full shadow-md mr-4">
                          <TrendingUp className="text-blue-600 w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">VC-Backed Startup</h4>
                          <p className="text-gray-600">Trusted by leading investors & venture capital firms</p>
                        </div>
                      </div>
                      
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center">
                        <DollarSign className="text-[#FF7200] w-5 h-5 mr-2" />
                        <span className="font-semibold text-gray-800">Secured Significant Funding</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-gray-500 text-sm">Strategic Funding</p>
                        <p className="font-semibold text-gray-800">For Rapid Expansion</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Financial Stability</p>
                        <p className="font-semibold text-gray-800">Strong Investor Backing</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Franchise Partners Benefit</p>
                        <p className="font-semibold text-gray-800">From Growth Resources</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Clock className="text-[#FF7200] w-5 h-5 mr-2" />
                  Our Model: The 90-Minute Express Service
                </h4>
                <p className="text-gray-600 mb-6">
                  Unlike traditional workshops, GaadiMech Express operates using a Formula 1-style pit-stop approach—servicing vehicles in just <span className="font-semibold text-[#FF7200]">90 minutes</span> using standardized workflows, skilled technicians, and a robust tech stack.
                </p>
                
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Award className="text-[#FF7200] w-5 h-5 mr-2" />
                  Strong Brand Presence
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Recognized for innovative, fast, and transparent service</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Growing digital footprint and customer trust</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">In-house CRM, job card management, and inventory platform</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Market Opportunity section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-16 relative"
          >
            <div className="absolute -z-10 w-80 h-80 bg-[#FF7200]/5 rounded-full blur-3xl opacity-80 top-20 -left-40"></div>
            
            <div className="text-center mb-10 md:mb-10 mb-5">
              <div className="relative inline-block">
                <motion.span 
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FFF1E6] to-[#FFF5EB] blur-lg opacity-80"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>
                <h3 className="relative text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 px-6 py-2">
                  The Market <span className="text-[#FF7200]">Opportunity</span>
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#FF7200]/20 to-[#FF9500]/10 h-1 md:h-2"></div>
                <div className="p-3 md:p-6">
                  <div className="bg-[#FF7200]/10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 md:mb-4">
                    <PieChart className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <h4 className="text-base md:text-xl font-bold text-gray-800 mb-1 md:mb-2">₹80,000 Crore</h4>
                  <p className="text-xs md:text-base text-gray-600">
                    Indian automobile aftermarket size with 12% CAGR
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#FF7200]/20 to-[#FF9500]/10 h-1 md:h-2"></div>
                <div className="p-3 md:p-6">
                  <div className="bg-[#FF7200]/10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 md:mb-4">
                    <Car className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <h4 className="text-base md:text-xl font-bold text-gray-800 mb-1 md:mb-2">4+ Crore Cars</h4>
                  <p className="text-xs md:text-base text-gray-600">
                    On Indian roads requiring regular servicing
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#FF7200]/20 to-[#FF9500]/10 h-1 md:h-2"></div>
                <div className="p-3 md:p-6">
                  <div className="bg-[#FF7200]/10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 md:mb-4">
                    <Percent className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <h4 className="text-base md:text-xl font-bold text-gray-800 mb-1 md:mb-2">70% Market Share</h4>
                  <p className="text-xs md:text-base text-gray-600">
                    Of servicing occurs outside authorized dealerships
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* What We're Offering section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16 relative"
          >
            <div className="absolute -z-10 w-96 h-96 bg-[#FF7200]/5 rounded-full blur-3xl opacity-70 bottom-10 -right-48"></div>
            
            <div className="text-center mb-10 md:mb-10 mb-5">
              <div className="relative inline-block">
                <motion.span 
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FFF1E6] to-[#FFF5EB] blur-lg opacity-80"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>
                <h3 className="relative text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 px-4 md:px-6 py-2">
                  What Are We <span className="text-[#FF7200]">Offering?</span>
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
              {/* 1. Revenue Guarantee (NEW) */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden p-2 md:p-6 flex flex-col items-center text-center"
              >
                <div className="bg-[#FF7200]/10 p-2 md:p-3 rounded-full mb-2 md:mb-4">
                  <Shield className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2">Revenue Guarantee</h4>
                <p className="text-xs md:text-sm text-gray-600">Assured minimum monthly revenue</p>
              </motion.div>

              {/* 2. Software Suite */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden p-2 md:p-6 flex flex-col items-center text-center"
              >
                <div className="bg-[#FF7200]/10 p-2 md:p-3 rounded-full mb-2 md:mb-4">
                  <BarChart className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2">Software Suite</h4>
                <p className="text-xs md:text-sm text-gray-600">CRM & operational systems</p>
              </motion.div>
              
              {/* 3. Supply Chain */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden p-2 md:p-6 flex flex-col items-center text-center"
              >
                <div className="bg-[#FF7200]/10 p-2 md:p-3 rounded-full mb-2 md:mb-4">
                  <Truck className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2">Supply Chain</h4>
                <p className="text-xs md:text-sm text-gray-600">Parts & consumables network</p>
              </motion.div>
              
              {/* 4. Complete Infrastructure */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden p-2 md:p-6 flex flex-col items-center text-center"
              >
                <div className="bg-[#FF7200]/10 p-2 md:p-3 rounded-full mb-2 md:mb-4">
                  <Truck className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2">Complete Infrastructure</h4>
                <p className="text-xs md:text-sm text-gray-600">Full branding & setup support</p>
              </motion.div>
              
              {/* 5. Tools & Training */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden p-2 md:p-6 flex flex-col items-center text-center"
              >
                <div className="bg-[#FF7200]/10 p-2 md:p-3 rounded-full mb-2 md:mb-4">
                  <Settings className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2">Tools & Training</h4>
                <p className="text-xs md:text-sm text-gray-600">Technical equipment & know-how</p>
              </motion.div>
              
              {/* 6. Hiring & Marketing */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden p-2 md:p-6 flex flex-col items-center text-center"
              >
                <div className="bg-[#FF7200]/10 p-2 md:p-3 rounded-full mb-2 md:mb-4">
                  <Users className="text-[#FF7200] w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1 md:mb-2">Hiring & Marketing</h4>
                <p className="text-xs md:text-sm text-gray-600">Local team & promotion support</p>
              </motion.div>
            </div>
          </motion.div>

          {/* The GaadiMech Advantage section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 relative"
          >
            <div className="absolute -z-10 w-64 h-64 bg-[#FF7200]/5 rounded-full blur-3xl opacity-70 top-20 left-20"></div>
            <div className="absolute -z-10 w-64 h-64 bg-[#FF7200]/5 rounded-full blur-3xl opacity-70 bottom-20 right-20"></div>
            
            <div className="text-center mb-10">
              <motion.div 
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-6 py-3 rounded-lg shadow-lg">
                  <h3 className="text-2xl md:text-3xl font-bold">The GaadiMech <span className="text-white">Advantage</span></h3>
                </div>
              </motion.div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
              <div className="p-4 md:p-6">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Rocket className="text-[#FF7200] w-5 h-5 mr-2" />
                    Revolutionary Space Efficiency - Maximum Profits in Just 1000 sq. ft!
                  </h4>
                  <p className="text-gray-600 mb-6">
                    While competitors struggle with massive spaces and high costs, GaadiMech Express offers a revolutionary compact model.
                  </p>
                </div>
                
                {/* Responsive Table - DESKTOP VERSION (hidden on mobile) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-1.5 px-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider w-1/3 border-r border-gray-200">
                          Feature
                        </th>
                        <th className="py-1.5 px-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider w-1/3 border-r border-gray-200">
                          GaadiMech Express
                        </th>
                        <th className="py-1.5 px-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider w-1/3">
                          Typical Franchises
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="py-1.5 px-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          Space Required
                        </td>
                        <td className="py-1.5 px-3 border-r border-gray-200">
                          <div className="flex items-center">
                            <div className="bg-green-50 p-0.5 rounded-full mr-2">
                              <CheckCircle className="text-green-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm font-medium">1000 sq. ft. only</span>
                          </div>
                        </td>
                        <td className="py-1.5 px-3">
                          <div className="flex items-center">
                            <div className="bg-red-50 p-0.5 rounded-full mr-2">
                              <X className="text-red-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm">3000-5000 sq. ft.</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="py-1.5 px-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          Express Service
                        </td>
                        <td className="py-1.5 px-3 border-r border-gray-200">
                          <div className="flex items-center">
                            <div className="bg-green-50 p-0.5 rounded-full mr-2">
                              <CheckCircle className="text-green-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm font-medium">90-minute</span>
                          </div>
                        </td>
                        <td className="py-1.5 px-3">
                          <div className="flex items-center">
                            <div className="bg-red-50 p-0.5 rounded-full mr-2">
                              <X className="text-red-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm">4+ hours</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-1.5 px-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          Tech Platform
                        </td>
                        <td className="py-1.5 px-3 border-r border-gray-200">
                          <div className="flex items-center">
                            <div className="bg-green-50 p-0.5 rounded-full mr-2">
                              <CheckCircle className="text-green-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm font-medium">Integrated CRM</span>
                          </div>
                        </td>
                        <td className="py-1.5 px-3">
                          <div className="flex items-center">
                            <div className="bg-red-50 p-0.5 rounded-full mr-2">
                              <X className="text-red-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm">Often absent</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="py-1.5 px-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          Supply Chain
                        </td>
                        <td className="py-1.5 px-3 border-r border-gray-200">
                          <div className="flex items-center">
                            <div className="bg-green-50 p-0.5 rounded-full mr-2">
                              <CheckCircle className="text-green-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm font-medium">Centralized</span>
                          </div>
                        </td>
                        <td className="py-1.5 px-3">
                          <div className="flex items-center">
                            <div className="bg-red-50 p-0.5 rounded-full mr-2">
                              <X className="text-red-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm">Self-managed</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-1.5 px-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          Revenue Share
                        </td>
                        <td className="py-1.5 px-3 border-r border-gray-200">
                          <div className="flex items-center">
                            <div className="bg-green-50 p-0.5 rounded-full mr-2">
                              <CheckCircle className="text-green-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm font-medium">Only 15%</span>
                          </div>
                        </td>
                        <td className="py-1.5 px-3">
                          <div className="flex items-center">
                            <div className="bg-red-50 p-0.5 rounded-full mr-2">
                              <X className="text-red-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm">25-30% + fees</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="py-1.5 px-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          Setup Time
                        </td>
                        <td className="py-1.5 px-3 border-r border-gray-200">
                          <div className="flex items-center">
                            <div className="bg-green-50 p-0.5 rounded-full mr-2">
                              <CheckCircle className="text-green-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm font-medium">45 days</span>
                          </div>
                        </td>
                        <td className="py-1.5 px-3">
                          <div className="flex items-center">
                            <div className="bg-red-50 p-0.5 rounded-full mr-2">
                              <X className="text-red-500 w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-sm">3-6 months</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* MOBILE VERSION - Card-based layout */}
                <div className="md:hidden space-y-3">
                  {[
                    {
                      feature: "Space Required",
                      gaadimech: "1000 sq. ft. only",
                      typical: "3000-5000 sq. ft."
                    },
                    {
                      feature: "Express Service",
                      gaadimech: "90-minute",
                      typical: "4+ hours"
                    },
                    {
                      feature: "Tech Platform",
                      gaadimech: "Integrated CRM",
                      typical: "Often absent"
                    },
                    {
                      feature: "Supply Chain",
                      gaadimech: "Centralized",
                      typical: "Self-managed"
                    },
                    {
                      feature: "Revenue Share",
                      gaadimech: "Only 15%",
                      typical: "25-30% + fees"
                    },
                    {
                      feature: "Setup Time",
                      gaadimech: "45 days",
                      typical: "3-6 months"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                      <div className="bg-gray-50 py-2 px-3 border-b border-gray-100">
                        <p className="font-medium text-gray-700">{item.feature}</p>
                      </div>
                      <div className="p-3 flex justify-between">
                        <div className="flex items-start">
                          <div className="bg-green-50 p-1 rounded-full mr-2">
                            <CheckCircle className="text-green-500 w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">GaadiMech Express</p>
                            <p className="text-sm font-medium">{item.gaadimech}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-red-50 p-1 rounded-full mr-2">
                            <X className="text-red-500 w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Typical Franchises</p>
                            <p className="text-sm">{item.typical}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Highlight banner */}
                <div className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 text-center">
                  <h4 className="text-lg text-white">
                    Setup in just <span className="text-[#FF7200] font-bold">45 days</span> with <span className="text-[#FF7200] font-bold">3x higher profit</span> per square foot!
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] rounded-xl shadow-xl overflow-hidden relative">
              {/* Background elements for visual interest */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/4"></div>
              </div>
              
              <div className="p-6 md:p-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="inline-block mb-4 relative">
                    <span className="absolute -inset-1 rounded-lg bg-white/20 blur-sm animate-pulse"></span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white relative">
                      LAST CHANCE! Limited Zones Available
                    </h3>
                  </div>
                  
                  <p className="text-white text-lg mb-6 font-medium">
                    Secure your exclusive territory before it's gone forever
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20 transform transition-transform hover:scale-105 flex items-center justify-center min-h-[60px]">
                      <p className="text-white font-bold text-lg">₹30 Lakhs+ Annual Profit</p>
                    </div>
                    
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20 transform transition-transform hover:scale-105 flex items-center justify-center min-h-[60px]">
                      <p className="text-white font-bold text-lg">Express 90-Mins Service Model</p>
                    </div>
                    
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20 transform transition-transform hover:scale-105 flex items-center justify-center min-h-[60px]">
                      <p className="text-white font-bold text-lg">Limited Slots Only!</p>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block mb-6"
                  >
                    <button
                      onClick={openForm}
                      className="bg-white text-[#FF7200] px-8 py-4 rounded-lg font-bold text-xl shadow-lg relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-yellow-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                      <span className="relative flex items-center justify-center">
                        Apply Now <ChevronDown className="w-5 h-5 ml-2 transform rotate-90" />
                      </span>
                    </button>
                  </motion.div>
                  
                  <div className="text-white text-sm flex flex-col md:flex-row items-center justify-center gap-4">
                    <a href="tel:+917300042414" className="flex items-center hover:underline">
                      <Phone className="w-4 h-4 mr-1" /> +91-7300042414
                    </a>
                    <a href="mailto:contact@gaadimech.com" className="flex items-center hover:underline">
                      <Mail className="w-4 h-4 mr-1" /> contact@gaadimech.com
                    </a>
                    <a href="https://www.gaadimech.com/partner-with-us" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                      <Globe className="w-4 h-4 mr-1" /> gaadimech.com/franchise
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
              {faqData.map((faq, index) => (
                <div key={index} className="overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-5 text-left flex items-start justify-between focus:outline-none"
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-[#FF7200] rounded-full text-white flex items-center justify-center text-sm mr-3 flex-shrink-0">Q</span>
                      <h4 className="text-lg font-bold text-gray-800">{faq.question}</h4>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 mt-1.5 ${expandedFaq === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-5 pt-0">
                          <p className="text-gray-600 ml-11">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popup Application Form */}
      <SimpleFranchiseForm isOpen={isFormOpen} onClose={closeForm} />
    </>
  );
};

export default FranchisePartner; 