import React, { useState } from 'react';
import SimpleFranchiseForm from './SimpleFranchiseForm';

const FranchiseSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Become a GaadiMech Franchise Partner
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join India's fastest growing automobile service network and build a profitable business
            with our proven franchise model.
          </p>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#FF7200] rounded-full p-2 mr-4 text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Low Investment</h3>
                    <p className="text-gray-700">Start your franchise with an investment as low as ₹5 Lakhs</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#FF7200] rounded-full p-2 mr-4 text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Comprehensive Support</h3>
                    <p className="text-gray-700">Training, marketing, tech platform and operational support</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#FF7200] rounded-full p-2 mr-4 text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Quick ROI</h3>
                    <p className="text-gray-700">Faster break-even with our proven business model</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#FF7200] rounded-full p-2 mr-4 text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Brand Recognition</h3>
                    <p className="text-gray-700">Leverage our growing brand presence across India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#FF7200] hover:bg-[#FF9500] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Apply for Franchise
          </button>
        </div>
      </div>
      
      {/* This is where we use the NewFranchiseForm component */}
      <SimpleFranchiseForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default FranchiseSection; 