import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params: { page_path?: string; [key: string]: any }
    ) => void;
    zepic: {
      identify: (key: string, value: string) => void;
    };
  }
}

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);
}; 