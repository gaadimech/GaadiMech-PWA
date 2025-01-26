import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-white border-b-8 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://i.ibb.co/k1H7j7b/App-Frame.jpg"
              alt="GaadiMech App Interface"
              className="hidden md:block rounded-lg shadow-xl w-full h-auto max-w-md mx-auto"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-center md:text-left">
              About GaadiMech
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 text-center md:text-left">
              GaadiMech is a car care platform that connects car owners to a network of service partners. It offers a seamless service booking experience with affordable prices, quality assurance, and real-time tracking.
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-[#FF7200] flex-shrink-0 w-6 h-6" />
                <span className="text-gray-700">Verified Professional Workshops</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-[#FF7200] flex-shrink-0 w-6 h-6" />
                <span className="text-gray-700">Technology Integration</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-[#FF7200] flex-shrink-0 w-6 h-6" />
                <span className="text-gray-700">Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-[#FF7200] flex-shrink-0 w-6 h-6" />
                <span className="text-gray-700">100% Customer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;