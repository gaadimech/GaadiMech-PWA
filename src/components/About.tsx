import React from 'react';
import { CheckCircle, Star, Clock, Shield, Zap, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Revolutionizing <span className="text-[#FF7200]">Car Care</span> in India
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            GaadiMech is transforming how Indians maintain their vehicles with technology, transparency, and trust.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#FF7200] rounded-full flex items-center justify-center mr-4">
                <Zap className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-gray-700 text-lg">
              To revolutionize car maintenance with our GaadiMech Express 90 Mins Car Service, creating a hyperlocal revolution that saves time, ensures quality, and transforms the traditional car service model through innovative technology and exceptional customer experience.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#FF7200] rounded-full flex items-center justify-center mr-4">
                <Star className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-gray-700 text-lg">
              To become India's most trusted automotive care platform, creating a seamless ecosystem where vehicle maintenance is no longer a burden but a delightful experience for every car owner.
            </p>
          </div>
        </motion.div>

        {/* Customer Testimonial */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-[#FF7200]/5 p-8 md:p-12 rounded-2xl border-l-4 border-[#FF7200] relative">
            <div className="absolute top-6 right-8 text-[#FF7200] opacity-20">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30.0002V60.0002H30V30.0002H10C10 13.4302 23.43 0.000244141 40 0.000244141V-9.99976C18.33 -9.99976 0 8.33024 0 30.0002ZM50 0.000244141C66.57 0.000244141 80 13.4302 80 30.0002H60V60.0002H80V30.0002C80 8.33024 61.67 -9.99976 40 -9.99976V0.000244141H50Z" fill="currentColor"/>
              </svg>
            </div>
            <p className="text-xl md:text-2xl font-medium text-gray-800 mb-6 relative z-10">
              <span>People love our 90 Mins Express Service. Once you try it, there's no going back to <span className="font-bold text-[#FF7200]">wasting</span> full day on traditional car service.</span>
            </p>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FF7200] fill-[#FF7200]" />
                ))}
              </div>
              <span className="ml-3 text-gray-600 font-medium">From our happy customers</span>
            </div>
          </div>
        </motion.div>

        {/* App showcase */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-[#FF7200]/10 rounded-2xl blur-lg"></div>
              <img
                src="https://i.ibb.co/k1H7j7b/App-Frame.jpg"
                alt="GaadiMech App Interface"
                className="rounded-2xl shadow-xl w-full h-auto max-w-xs mx-auto relative z-10"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The GaadiMech <span className="text-[#FF7200]">Advantage</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              GaadiMech isn't just another car service platform. We're a complete car care ecosystem that puts you in control while delivering unmatched quality and convenience.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-lg mt-1">
                  <CheckCircle className="text-[#FF7200] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Curated Network of Experts</h4>
                  <p className="text-sm text-gray-600">Access our rigorously vetted network of professional workshops and technicians</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-lg mt-1">
                  <Shield className="text-[#FF7200] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Quality Guarantee</h4>
                  <p className="text-sm text-gray-600">Every service backed by our quality assurance and customer satisfaction promise</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-lg mt-1">
                  <Clock className="text-[#FF7200] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Real-Time Tracking</h4>
                  <p className="text-sm text-gray-600">Monitor your service progress with our transparent real-time tracking system</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-lg mt-1">
                  <Truck className="text-[#FF7200] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Doorstep Convenience</h4>
                  <p className="text-sm text-gray-600">Enjoy pickup and drop services for ultimate convenience</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;