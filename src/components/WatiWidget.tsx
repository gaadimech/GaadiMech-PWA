import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Car, Sparkles, X } from 'lucide-react';
import WatiChatInterface from './WatiChatInterface';

const WatiWidget: React.FC = () => {
  const [shouldShow, setShouldShow] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if the page has the hide-whatsapp-button class
    const checkIfShouldHide = () => {
      const bodyElement = document.body;
      const hasHideClass = bodyElement.classList.contains('hide-whatsapp-button') ||
                           document.querySelector('.hide-whatsapp-button') !== null;
      setShouldShow(!hasHideClass);
    };
    
    // Initial check
    checkIfShouldHide();
    
    // Create a mutation observer to watch for class changes
    const observer = new MutationObserver(checkIfShouldHide);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'],
      childList: true,
      subtree: true
    });

    // Show widget after 15 seconds
    const timer = setTimeout(() => {
      if (shouldShow) {
        setIsVisible(true);
      }
    }, 15000); // 15 seconds as requested

    // Show nudge after widget is visible and user hasn't interacted
    const nudgeTimer = setTimeout(() => {
      if (shouldShow && !hasInteracted && !isChatOpen) {
        setShowNudge(true);
      }
    }, 25000); // Show nudge 10 seconds after widget appears

    // Hide nudge after some time if user still hasn't interacted
    const hideNudgeTimer = setTimeout(() => {
      if (showNudge && !hasInteracted) {
        setShowNudge(false);
      }
    }, 40000); // Hide nudge after 15 seconds

    // Cleanup the timers and observer when component unmounts
    return () => {
      clearTimeout(timer);
      clearTimeout(nudgeTimer);
      clearTimeout(hideNudgeTimer);
      observer.disconnect();
    };
  }, [shouldShow, hasInteracted, isChatOpen, showNudge]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    setHasInteracted(true);
    setShowNudge(false);
  };

  const handleNudgeClose = () => {
    setShowNudge(false);
  };

  const handleNudgeClick = () => {
    setIsChatOpen(true);
    setHasInteracted(true);
    setShowNudge(false);
  };

  // Don't render if not visible yet or shouldn't show based on class
  if (!isVisible || !shouldShow) return null;

  return (
    <>
      {/* Animated Nudge */}
      <AnimatePresence>
        {showNudge && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-5 z-50 max-w-xs"
          >
            <div className="relative">
              {/* Main nudge card */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  boxShadow: [
                    "0 10px 25px rgba(255, 165, 0, 0.3)",
                    "0 15px 35px rgba(255, 165, 0, 0.4)",
                    "0 10px 25px rgba(255, 165, 0, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={handleNudgeClick}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg shadow-xl cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              >
                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNudgeClose();
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Content */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                    >
                      <Car className="w-6 h-6 text-orange-500" />
                    </motion.div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 mb-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                      <h3 className="text-sm font-bold">Need Car Service?</h3>
                    </div>
                    
                    <p className="text-xs opacity-90 leading-relaxed">
                      📱 Chat with our AI assistant for instant booking! 
                      <span className="block mt-1 font-medium">90-min service • Free pickup</span>
                    </p>
                    
                    <div className="mt-2 flex items-center text-xs opacity-75">
                      <span>👆 Tap to start</span>
                    </div>
                  </div>
                </div>

                {/* Animated border */}
                <motion.div
                  animate={{ 
                    background: [
                      "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-lg"
                />
              </motion.div>

              {/* Pointer/Arrow */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 transform rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ 
          scale: showNudge ? [1, 1.1, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 0.8,
            repeat: showNudge ? Infinity : 0,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleChatToggle}
        className={`fixed bottom-5 right-5 w-16 h-16 bg-[#00e785] hover:bg-[#00d470] text-white rounded-full shadow-lg flex items-center justify-center z-40 transition-all duration-300 ${
          showNudge ? 'ring-4 ring-orange-400 ring-opacity-50' : ''
        }`}
        aria-label="Chat with us"
      >
        <MessageCircle className="w-8 h-8" />
        
        {/* Notification dot when nudge is shown */}
        {showNudge && (
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          />
        )}
      </motion.button>

      <WatiChatInterface 
        isOpen={isChatOpen} 
        onClose={() => {
          setIsChatOpen(false);
          setHasInteracted(true);
        }} 
      />
    </>
  );
};

export default WatiWidget; 