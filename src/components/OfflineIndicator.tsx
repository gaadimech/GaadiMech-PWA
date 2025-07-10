import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface OfflineIndicatorProps {
  className?: string;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(!navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    // Listen for network changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Try to detect connection type (experimental API)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setConnectionType(connection?.effectiveType || '');
      
      const handleConnectionChange = () => {
        setConnectionType(connection?.effectiveType || '');
      };
      
      connection?.addEventListener('change', handleConnectionChange);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection?.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-hide indicator after coming back online
  useEffect(() => {
    if (isOnline && showIndicator) {
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, showIndicator]);

  const getStatusMessage = () => {
    if (isOnline) {
      return connectionType ? `Connected (${connectionType})` : 'Back online';
    }
    return 'You are offline';
  };

  const getStatusColor = () => {
    if (isOnline) {
      return 'bg-success-500';
    }
    return 'bg-warning-500';
  };

  const getIcon = () => {
    if (isOnline) {
      return <WifiIcon className="w-4 h-4 text-white" />;
    }
    return <ExclamationTriangleIcon className="w-4 h-4 text-white" />;
  };

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed top-16 lg:top-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-auto z-50 ${className}`}
        >
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg ${getStatusColor()}`}>
            {getIcon()}
            <span className="text-white text-sm font-medium">
              {getStatusMessage()}
            </span>
            {!isOnline && (
              <button
                onClick={() => setShowIndicator(false)}
                className="ml-auto text-white hover:text-gray-200 transition-colors"
                aria-label="Dismiss"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for offline functionality
export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        // You can trigger data sync here
        console.log('Back online - syncing data...');
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  // Cache data in localStorage when online
  const cacheData = (key: string, data: any) => {
    try {
      localStorage.setItem(`offline_${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  };

  // Get cached data when offline
  const getCachedData = (key: string, maxAge = 24 * 60 * 60 * 1000) => {
    try {
      const cached = localStorage.getItem(`offline_${key}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < maxAge) {
          return data;
        }
      }
    } catch (error) {
      console.warn('Failed to get cached data:', error);
    }
    return null;
  };

  return {
    isOnline,
    wasOffline,
    cacheData,
    getCachedData,
  };
};

export default OfflineIndicator; 