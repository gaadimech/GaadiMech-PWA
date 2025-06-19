export interface LocationData {
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  source: 'geolocation' | 'ip' | 'manual' | 'unknown';
  timestamp: number;
}

export interface IPLocationResponse {
  city?: string;
  region?: string;
  region_code?: string;
  country?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isp?: string;
}

/**
 * Get user's location using browser geolocation API
 */
export const getBrowserLocation = (): Promise<LocationData | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser');
      resolve(null);
      return;
    }

    const options = {
      enableHighAccuracy: false, // Don't require GPS for faster response
      timeout: 10000, // 10 second timeout
      maximumAge: 600000 // Accept cached position up to 10 minutes old
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Use reverse geocoding to get city/state from coordinates
          const cityData = await reverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          );
          
          resolve({
            city: cityData?.city,
            state: cityData?.state,
            country: cityData?.country,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            source: 'geolocation',
            timestamp: Date.now()
          });
        } catch (error) {
          console.error('Error in reverse geocoding:', error);
          // Return coordinates even if reverse geocoding fails
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            source: 'geolocation',
            timestamp: Date.now()
          });
        }
      },
      (error) => {
        console.log('Geolocation error:', error.message);
        resolve(null);
      },
      options
    );
  });
};

/**
 * Get user's location using IP-based geolocation
 */
export const getIPLocation = async (): Promise<LocationData | null> => {
  try {
    // Using ipapi.co as it's free and reliable
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: IPLocationResponse = await response.json();
    
    return {
      city: data.city,
      state: data.region,
      country: data.country,
      latitude: data.latitude,
      longitude: data.longitude,
      source: 'ip',
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error getting IP location:', error);
    
    // Fallback to a different IP geolocation service
    try {
      const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=free');
      const data = await response.json();
      
      return {
        city: data.city,
        state: data.state_prov,
        country: data.country_name,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        source: 'ip',
        timestamp: Date.now()
      };
    } catch (fallbackError) {
      console.error('Fallback IP location service also failed:', fallbackError);
      return null;
    }
  }
};

/**
 * Reverse geocode coordinates to get city/state information
 */
const reverseGeocode = async (lat: number, lng: number): Promise<{city?: string, state?: string, country?: string} | null> => {
  try {
    // Using OpenStreetMap Nominatim for reverse geocoding (free)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'GaadiMech-Website/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      city: data.address?.city || data.address?.town || data.address?.village,
      state: data.address?.state,
      country: data.address?.country
    };
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return null;
  }
};

/**
 * Get user's location using multiple methods (with fallbacks)
 */
export const getUserLocation = async (): Promise<LocationData | null> => {
  // First, check if we have a recent location in session storage
  const cachedLocation = getLocationFromSession();
  if (cachedLocation && isLocationRecent(cachedLocation)) {
    console.log('🎯 Using cached location data:', cachedLocation);
    return cachedLocation;
  }

  console.log('🔍 Attempting to get user location...');
  
  // Try browser geolocation first (more accurate)
  try {
    const browserLocation = await getBrowserLocation();
    if (browserLocation) {
      console.log('✅ Got location from browser geolocation:', browserLocation);
      saveLocationToSession(browserLocation);
      return browserLocation;
    }
  } catch (error) {
    console.log('❌ Browser geolocation failed, trying IP location:', error);
  }
  
  // Fallback to IP-based location
  try {
    const ipLocation = await getIPLocation();
    if (ipLocation) {
      console.log('✅ Got location from IP geolocation:', ipLocation);
      saveLocationToSession(ipLocation);
      return ipLocation;
    }
  } catch (error) {
    console.error('❌ IP location also failed:', error);
  }
  
  console.log('❌ All location detection methods failed');
  return null;
};

/**
 * Save location data to session storage
 */
export const saveLocationToSession = (location: LocationData): void => {
  try {
    sessionStorage.setItem('userLocation', JSON.stringify(location));
  } catch (error) {
    console.error('Error saving location to session:', error);
  }
};

/**
 * Get location data from session storage
 */
export const getLocationFromSession = (): LocationData | null => {
  try {
    const stored = sessionStorage.getItem('userLocation');
    if (stored) {
      return JSON.parse(stored) as LocationData;
    }
  } catch (error) {
    console.error('Error reading location from session:', error);
  }
  return null;
};

/**
 * Check if location data is recent (within last 30 minutes)
 */
const isLocationRecent = (location: LocationData): boolean => {
  const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
  return (Date.now() - location.timestamp) < thirtyMinutes;
};

/**
 * Clear location data from session storage
 */
export const clearLocationFromSession = (): void => {
  try {
    sessionStorage.removeItem('userLocation');
  } catch (error) {
    console.error('Error clearing location from session:', error);
  }
};

/**
 * Format location for display
 */
export const formatLocationDisplay = (location: LocationData): string => {
  const parts = [];
  if (location.city) parts.push(location.city);
  if (location.state) parts.push(location.state);
  if (location.country) parts.push(location.country);
  
  return parts.join(', ') || 'Unknown Location';
};

/**
 * Check if user is in serviceable area
 * You can customize this function based on your service areas
 */
export const isInServiceableArea = (location: LocationData): boolean => {
  // Example: Currently servicing only in Rajasthan, India
  const serviceableCities = [
    'jaipur', 'jodhpur', 'udaipur', 'kota', 'ajmer', 'bikaner', 
    'alwar', 'bharatpur', 'sikar', 'pali'
  ];
  
  const serviceableStates = ['rajasthan'];
  
  if (location.city) {
    const cityLower = location.city.toLowerCase();
    if (serviceableCities.some(city => cityLower.includes(city))) {
      return true;
    }
  }
  
  if (location.state) {
    const stateLower = location.state.toLowerCase();
    if (serviceableStates.some(state => stateLower.includes(state))) {
      return true;
    }
  }
  
  return false;
}; 