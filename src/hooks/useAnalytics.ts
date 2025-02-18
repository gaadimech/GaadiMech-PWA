import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    let isSubscribed = true;

    const initAnalytics = async () => {
      // Only initialize if component is still mounted
      if (!isSubscribed) return;

      try {
        // Initialize analytics only when idle
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            if (window.gtag) {
              window.gtag('event', 'page_view');
            }
            if (window.amplitude) {
              window.amplitude.track('Page View');
            }
          });
        } else {
          setTimeout(() => {
            if (window.gtag) {
              window.gtag('event', 'page_view');
            }
            if (window.amplitude) {
              window.amplitude.track('Page View');
            }
          }, 1000);
        }
      } catch (error) {
        console.error('Analytics initialization failed:', error);
      }
    };

    initAnalytics();

    return () => {
      isSubscribed = false;
    };
  }, []);
}; 