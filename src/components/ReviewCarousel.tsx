import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  initial: string;
  name: string;
  text: string;
  service: string;
}

interface ReviewCarouselProps {
  reviews: Review[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const [currentReview, setCurrentReview] = useState(0);

  if (reviews.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Customer Reviews Near You
      </h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentReview * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#FF7200] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                      {review.initial}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                      <div className="flex text-[#FF7200]">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">"{review.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {reviews.length > 1 && (
          <>
            <button 
              onClick={() => setCurrentReview(prev => Math.max(prev - 1, 0))}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors ${
                currentReview === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentReview === 0}
            >
              <ChevronLeft className="w-6 h-6 text-[#FF7200]" />
            </button>
            <button 
              onClick={() => setCurrentReview(prev => Math.min(prev + 1, reviews.length - 1))}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors ${
                currentReview === reviews.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentReview === reviews.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-[#FF7200]" />
            </button>

            <div className="flex justify-center mt-6 gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentReview === index ? 'bg-[#FF7200]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewCarousel; 