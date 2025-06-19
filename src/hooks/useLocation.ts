import { useState, useEffect } from 'react';
import { 
  LocationData, 
  getUserLocation, 
  getLocationFromSession, 
  isInServiceableArea,
  formatLocationDisplay 
} from '../utils/location';

interface UseLocationReturn {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  isServiceable: boolean;
  locationDisplay: string;
  requestLocation: () => Promise<void>;
  clearLocation: () => void;
}

export const useLocation = (autoDetect: boolean = true): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize location from session storage
  useEffect(() => {
    const cachedLocation = getLocationFromSession();
    if (cachedLocation) {
      setLocation(cachedLocation);
    } else if (autoDetect) {
      // Auto-detect location on mount if no cached location
      requestLocation();
    }
  }, [autoDetect]);

  const requestLocation = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Requesting user location...');
      const detectedLocation = await getUserLocation();
      
      if (detectedLocation) {
        setLocation(detectedLocation);
        console.log('Location detected:', detectedLocation);
      } else {
        setError('Unable to detect your location. Please ensure location services are enabled.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      console.error('Error detecting location:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLocation = (): void => {
    setLocation(null);
    setError(null);
    // Note: We don't clear from session storage here as other components might need it
  };

  // Computed values
  const isServiceable = location ? isInServiceableArea(location) : false;
  const locationDisplay = location ? formatLocationDisplay(location) : 'Unknown Location';

  return {
    location,
    isLoading,
    error,
    isServiceable,
    locationDisplay,
    requestLocation,
    clearLocation
  };
}; 