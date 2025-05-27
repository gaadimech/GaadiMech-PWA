import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import WatiChatInterface from './WatiChatInterface';

const WatiWidget: React.FC = () => {
  const [shouldShow, setShouldShow] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

    // Cleanup the timer and observer when component unmounts
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [shouldShow]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Don't render if not visible yet or shouldn't show based on class
  if (!isVisible || !shouldShow) return null;

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleChatToggle}
        className="fixed bottom-5 right-5 w-16 h-16 bg-[#00e785] hover:bg-[#00d470] text-white rounded-full shadow-lg flex items-center justify-center z-40 transition-colors"
        aria-label="Chat with us"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>

      <WatiChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default WatiWidget; 