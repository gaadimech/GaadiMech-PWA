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
    // Scroll to top instantly when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop; 