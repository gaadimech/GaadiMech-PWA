import React from 'react';
import NpsForm from '../components/NpsForm';


const Feedback: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <img src="/images/logo1.png" alt="GaadiMech Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">We Value Your Feedback</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your opinion helps us deliver better automotive services. Tell us about your experience!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-orange-500 py-4 px-6">
            <h2 className="text-white text-xl font-semibold">Customer Feedback Form</h2>
          </div>
          
          <NpsForm />
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Express 90 MINS Service?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Save Time</h4>
              <p className="text-gray-600">
                Your car serviced within 90 minutes or less, so you can get back on the road quickly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Quality Guaranteed</h4>
              <p className="text-gray-600">
                Despite the quick service, we never compromise on quality. Your vehicle deserves the best.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Transparent Pricing</h4>
              <p className="text-gray-600">
                No hidden costs. Pay only for what your car needs with our upfront, transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 