import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const handleClick = () => {
    const message = encodeURIComponent("Hi, I'd like to book a Car Service through GaadiMech.");
    window.open(`https://wa.me/917300042410?text=${message}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center hover:bg-[#128C7E] transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.button>
  );
};

export default WhatsAppButton;