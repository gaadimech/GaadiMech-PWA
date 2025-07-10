import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * This component automatically scrolls to the top of the page
 * whenever the route changes. It should be placed inside the Router
 * to ensure all page navigation starts from the top.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top immediately when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use instant instead of smooth for immediate jump
    });
    
    // Also reset any scroll position in the document body and html
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop; 