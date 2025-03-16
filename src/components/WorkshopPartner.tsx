import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Clock, Shield, Zap, Truck, Settings, Users, Award, DollarSign, TrendingUp, BarChart, Percent, ThumbsUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import WorkshopPartnerForm from './WorkshopPartnerForm';

const WorkshopPartner = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Grow Your Workshop Business | GaadiMech Partner Program</title>
        <meta name="description" content="Transform your auto workshop with GaadiMech's partnership program. Boost revenue, increase customer base, and access cutting-edge technology with zero upfront costs." />
      </Helmet>
      
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="bg-[#FF7200]/10 inline-block px-4 py-2 rounded-full text-[#FF7200] font-semibold mb-4">
              Exclusive Workshop Partner Program
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              10X Your Workshop Business with <span className="text-[#FF7200]">Zero Investment</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our pool of workshop owners who've boosted monthly revenue by ₹50,000-₹2,00,000 through our partnership program.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button
                onClick={openForm}
                className="bg-[#FF7200] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FF9500] transition-colors shadow-lg inline-flex items-center"
              >
                Apply Now - Takes Just 2 Minutes
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
            <div className="flex flex-wrap justify-center mt-8 space-x-4">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                <span className="text-gray-600">Free to Join</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                <span className="text-gray-600">Zero Commission</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                <span className="text-gray-600">Unlimited Earnings</span>
              </div>
            </div>
          </motion.div>

          {/* Partner Benefits */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Workshop Owners <span className="text-[#FF7200]">Love Us</span> Because</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border-t-4 border-[#FF7200]">
                <div className="w-14 h-14 bg-[#FF7200] rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="text-white w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Instant Business Growth</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Direct access to our customer base</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Average 30-40 new bookings monthly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Zero marketing costs or commissions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border-t-4 border-[#FF7200] md:transform md:-translate-y-4">
                <div className="w-14 h-14 bg-[#FF7200] rounded-full flex items-center justify-center mb-6">
                  <BarChart className="text-white w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Business Optimization</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Free workshop management software worth ₹20,000/year</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Digital job cards and inventory management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Reduce operational costs by 25%</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border-t-4 border-[#FF7200]">
                <div className="w-14 h-14 bg-[#FF7200] rounded-full flex items-center justify-center mb-6">
                  <ThumbsUp className="text-white w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Premium Status</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">GaadiMech certified workshop badge</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Priority listing in our app & website</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Dedicated Partner Success Manager</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* How it Works */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Quick & Simple <span className="text-[#FF7200]">Onboarding</span></h3>
              <p className="text-lg text-gray-600 mt-3 max-w-3xl mx-auto">
                From application to receiving customers - just 7 days
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#FF7200]/30 transform -translate-x-1/2"></div>
              
              <div className="space-y-16 relative">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-6 md:mb-0 flex md:block flex-col items-center">
                    <div className="mb-4 md:hidden"></div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">2-Minute Application</h4>
                    <p className="text-gray-600">
                      Fill our simple form with basic details about your workshop. No complex documentation required.
                    </p>
                  </div>
                  <div className="relative flex items-center md:justify-start justify-center">
                    <div className="absolute h-full w-0.5 bg-[#FF7200]/30 md:hidden left-0 transform -translate-x-1/2 top-0"></div>
                    <div className="z-10 flex items-center justify-center w-16 h-16 bg-[#FF7200] rounded-full text-white font-bold text-xl shadow-xl">1</div>
                    <div className="md:hidden ml-4">
                      <h4 className="text-xl font-bold text-gray-800">2-Minute Application</h4>
                    </div>
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:col-start-2 md:col-end-3 md:row-start-1 mb-6 md:mb-0 flex md:block flex-col items-center">
                    <div className="mb-4 md:hidden"></div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">24-Hour Response</h4>
                    <p className="text-gray-600">
                      Our team will call you within 24 hours to discuss partnership opportunities and answer your questions.
                    </p>
                  </div>
                  <div className="relative flex md:justify-end justify-center items-center">
                    <div className="absolute h-full w-0.5 bg-[#FF7200]/30 md:hidden left-0 transform -translate-x-1/2 top-0"></div>
                    <div className="z-10 flex items-center justify-center w-16 h-16 bg-[#FF7200] rounded-full text-white font-bold text-xl shadow-xl">2</div>
                    <div className="md:hidden ml-4">
                      <h4 className="text-xl font-bold text-gray-800">24-Hour Response</h4>
                    </div>
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-6 md:mb-0 flex md:block flex-col items-center">
                    <div className="mb-4 md:hidden"></div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Quick Setup (3-5 days)</h4>
                    <p className="text-gray-600">
                      We'll set up your digital systems and train your team on GaadiMech processes. All software provided free.
                    </p>
                  </div>
                  <div className="relative flex items-center md:justify-start justify-center">
                    <div className="absolute h-full w-0.5 bg-[#FF7200]/30 md:hidden left-0 transform -translate-x-1/2 top-0"></div>
                    <div className="z-10 flex items-center justify-center w-16 h-16 bg-[#FF7200] rounded-full text-white font-bold text-xl shadow-xl">3</div>
                    <div className="md:hidden ml-4">
                      <h4 className="text-xl font-bold text-gray-800">Quick Setup (3-5 days)</h4>
                    </div>
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:col-start-2 md:col-end-3 md:row-start-1 flex md:block flex-col items-center">
                    <div className="mb-4 md:hidden"></div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Start Earning</h4>
                    <p className="text-gray-600">
                      Begin receiving service requests and watch your business grow with GaadiMech's powerful customer network.
                    </p>
                  </div>
                  <div className="relative flex md:justify-end justify-center items-center">
                    <div className="absolute h-full w-0.5 bg-[#FF7200]/30 md:hidden left-0 transform -translate-x-1/2 top-0 bottom-1/2"></div>
                    <div className="z-10 flex items-center justify-center w-16 h-16 bg-[#FF7200] rounded-full text-white font-bold text-xl shadow-xl">4</div>
                    <div className="md:hidden ml-4">
                      <h4 className="text-xl font-bold text-gray-800">Start Earning</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h3>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-[#FF7200] rounded-full text-white flex items-center justify-center text-sm mr-3">Q</span>
                  Is there any fee to join the partner program?
                </h4>
                <p className="text-gray-600 ml-9">
                  <span className="font-semibold">No, it's completely free.</span> There are no registration fees, monthly charges, or commissions. We believe in mutual growth and only succeed when you do.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-[#FF7200] rounded-full text-white flex items-center justify-center text-sm mr-3">Q</span>
                  What kind of workshops qualify for the program?
                </h4>
                <p className="text-gray-600 ml-9">
                  We partner with established workshops (6+ months in operation) with proper business registration, qualified technicians, and a commitment to quality service. Our team evaluates each application individually.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-[#FF7200] rounded-full text-white flex items-center justify-center text-sm mr-3">Q</span>
                  How soon can I expect to see results?
                </h4>
                <p className="text-gray-600 ml-9">
                  Most partners start receiving bookings within the first week of going live. On average, our partners see a <span className="font-semibold">30-40% increase in revenue within the first 3 months</span> of partnership.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-[#FF7200] rounded-full text-white flex items-center justify-center text-sm mr-3">Q</span>
                  Do I need to handle customer service differently?
                </h4>
                <p className="text-gray-600 ml-9">
                  We'll help you implement our customer service standards, but you'll maintain your workshop's identity. Our team provides training and digital tools to enhance your customer experience.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Apply Now CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] p-12 rounded-2xl shadow-xl">
              <div className="max-w-3xl mx-auto">
                <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full mb-6">
                  Limited spots available in your area
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Workshop Business?</h3>
                <p className="text-white text-xl mb-8">
                  Join our pool of successful workshop owners who are maximizing their profits with GaadiMech.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <div className="flex items-center justify-center bg-white/10 p-3 rounded-lg">
                    <CheckCircle className="text-white w-5 h-5 mr-2" />
                    <span className="text-white">More Customers</span>
                  </div>
                  <div className="flex items-center justify-center bg-white/10 p-3 rounded-lg">
                    <CheckCircle className="text-white w-5 h-5 mr-2" />
                    <span className="text-white">Higher Revenue</span>
                  </div>
                  <div className="flex items-center justify-center bg-white/10 p-3 rounded-lg">
                    <CheckCircle className="text-white w-5 h-5 mr-2" />
                    <span className="text-white">Free Technology</span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button
                    onClick={openForm}
                    className="inline-block bg-white text-[#FF7200] px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Apply Now - Takes Just 2 Minutes
                  </button>
                </motion.div>
                <p className="text-white/80 mt-6">
                  Questions? Contact our partnership team at <a href="mailto:contact@gaadimech.com" className="underline">contact@gaadimech.com</a> or call <a href="tel:+917300042410" className="underline">+91 7300042410</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popup Application Form */}
      <WorkshopPartnerForm isOpen={isFormOpen} onClose={closeForm} />
    </>
  );
};

export default WorkshopPartner; 