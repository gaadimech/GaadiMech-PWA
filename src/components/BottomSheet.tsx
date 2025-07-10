import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: 'auto' | 'half' | 'full';
  className?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  height = 'auto',
  className = '',
}) => {
  const getHeightClass = () => {
    switch (height) {
      case 'half':
        return 'h-1/2';
      case 'full':
        return 'h-full';
      default:
        return 'max-h-[90vh]';
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const sheetVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const transition = {
    type: 'spring',
    damping: 25,
    stiffness: 300,
    duration: 0.3,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sheetVariants}
            transition={transition}
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 ${getHeightClass()} ${className}`}
            style={{
              // Use the newer viewport units for better mobile support
              maxHeight: 'calc(100dvh - env(safe-area-inset-top))',
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>
            
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet; 