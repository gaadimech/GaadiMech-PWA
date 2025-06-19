# In-House Location Tracking Implementation

This document explains the implementation of in-house location tracking for GaadiMech website to help identify user locations and prevent bookings from non-serviceable areas.

## Overview

The location tracking system consists of:
1. Location detection utilities
2. Custom React hook for location management
3. Integration with lead creation in Strapi
4. User interface components for location-based warnings

## Files Added/Modified

### New Files:
- `src/utils/location.ts` - Core location detection utilities
- `src/hooks/useLocation.ts` - React hook for location management
- `LOCATION-TRACKING-GUIDE.md` - This documentation

### Modified Files:
- `src/pages/ExpressBetaATCCart.tsx` - Added location detection and warnings
- `src/types/expressService.ts` - Added location fields to lead data
- `src/types/express.ts` - Added location fields to express lead data
- `src/types/contact.ts` - Added location fields to contact form data
- `src/App.tsx` - Added global location detection

## Location Detection Methods

The system uses multiple fallback methods for location detection:

1. **Browser Geolocation API** (Most accurate)
   - Requests precise GPS/WiFi location
   - Includes reverse geocoding to get city/state
   - Requires user permission

2. **IP-based Geolocation** (Fallback)
   - Uses IP address to determine approximate location
   - Primary service: ipapi.co
   - Fallback service: ipgeolocation.io
   - No user permission required

3. **Session Storage Caching**
   - Caches location data for 30 minutes
   - Prevents repeated location requests
   - Improves performance

## Usage

### Basic Location Detection

```typescript
import { useLocation } from '../hooks/useLocation';

const MyComponent = () => {
  const { 
    location, 
    isLoading, 
    error, 
    isServiceable, 
    locationDisplay,
    requestLocation 
  } = useLocation(true); // Auto-detect on mount

  return (
    <div>
      {isLoading && <p>Detecting location...</p>}
      {error && <p>Error: {error}</p>}
      {location && (
        <div>
          <p>Location: {locationDisplay}</p>
          <p>Serviceable: {isServiceable ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};
```

### Manual Location Detection

```typescript
import { getUserLocation } from '../utils/location';

const detectLocation = async () => {
  const location = await getUserLocation();
  if (location) {
    console.log('User location:', location);
  }
};
```

### Including Location in Lead Creation

```typescript
import { getLocationFromSession } from '../utils/location';

const createLead = async (leadData) => {
  const userLocation = getLocationFromSession();
  
  const response = await expressService.submitLead({
    ...leadData,
    userCity: userLocation?.city,
    userState: userLocation?.state,
    userCountry: userLocation?.country,
    userLatitude: userLocation?.latitude,
    userLongitude: userLocation?.longitude,
    locationSource: userLocation?.source
  });
};
```

## Data Structure

### LocationData Interface

```typescript
interface LocationData {
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  source: 'geolocation' | 'ip' | 'manual' | 'unknown';
  timestamp: number;
}
```

### Database Fields

The following fields are added to Strapi content types:
- `userCity` (String)
- `userState` (String)
- `userCountry` (String)
- `userLatitude` (Float)
- `userLongitude` (Float)
- `locationSource` (String)

## Serviceable Areas Configuration

Currently configured for Rajasthan, India. Update `isInServiceableArea()` in `src/utils/location.ts`:

```typescript
export const isInServiceableArea = (location: LocationData): boolean => {
  const serviceableCities = [
    'jaipur', 'jodhpur', 'udaipur', 'kota', 'ajmer', 'bikaner', 
    'alwar', 'bharatpur', 'sikar', 'pali'
  ];
  
  const serviceableStates = ['rajasthan'];
  
  // Add your logic here
  return true; // or false based on location
};
```

## Privacy and User Experience

### Permission Handling
- Browser geolocation requires user permission
- System gracefully falls back to IP location if permission denied
- No location blocking - users can still proceed with booking

### User Interface Elements
- Location loading indicators
- Non-serviceable area warnings
- Location display in vehicle details
- Manual retry options

### Data Privacy
- Location data stored only in session storage (not persistent)
- Data cleared after 30 minutes
- User can proceed without providing location

## Strapi Backend Requirements

Ensure your Strapi backend includes these fields in the relevant content types:

### Express Service Content Type
Add these fields to your `express-service` content type:
```json
{
  "userCity": {
    "type": "string"
  },
  "userState": {
    "type": "string"
  },
  "userCountry": {
    "type": "string"
  },
  "userLatitude": {
    "type": "float"
  },
  "userLongitude": {
    "type": "float"
  },
  "locationSource": {
    "type": "string"
  }
}
```

### Contact Content Type
Add the same fields to your `contact` content type.

## Analytics Integration

Location data can be integrated with analytics platforms:

```typescript
// Example: Send location to analytics
if (userLocation && window.gtag) {
  window.gtag('event', 'location_detected', {
    city: userLocation.city,
    state: userLocation.state,
    country: userLocation.country,
    source: userLocation.source
  });
}
```

## Error Handling

The system includes comprehensive error handling:
- Network failures for IP geolocation
- Geolocation permission denied
- Invalid location data
- Service unavailable fallbacks

## Performance Considerations

- Location detection happens asynchronously
- Results are cached in session storage
- Graceful degradation if location services fail
- Non-blocking user experience

## Testing

### Test Scenarios
1. Allow browser location permission
2. Deny browser location permission
3. Use VPN to simulate different locations
4. Test with mobile devices
5. Test with location services disabled

### Mock Data
For testing, you can manually set location data:

```typescript
import { saveLocationToSession } from '../utils/location';

// Mock Jaipur location for testing
saveLocationToSession({
  city: 'Jaipur',
  state: 'Rajasthan',
  country: 'India',
  latitude: 26.9124,
  longitude: 75.7873,
  source: 'manual',
  timestamp: Date.now()
});
```

## Future Enhancements

1. **Distance-based Service Areas**
   - Calculate distance from service centers
   - Dynamic service area boundaries

2. **Location-based Pricing**
   - Different pricing for different regions
   - Travel cost calculations

3. **Service Center Mapping**
   - Show nearest service centers
   - Route optimization

4. **Advanced Analytics**
   - Location-based conversion tracking
   - Regional performance metrics

## Troubleshooting

### Common Issues

1. **Location not detected**
   - Check browser permissions
   - Verify internet connection
   - Check if using HTTPS (required for geolocation)

2. **Incorrect location**
   - IP-based location can be inaccurate
   - VPNs can affect location detection
   - Consider requesting manual location entry

3. **Performance issues**
   - Check if location caching is working
   - Monitor API response times
   - Consider reducing timeout values

### Debug Information

Enable debug logging by adding to your browser console:
```javascript
localStorage.setItem('debug', 'location');
```

This will show detailed logs of the location detection process.

## Security Considerations

- All location APIs use HTTPS
- No sensitive location data stored permanently
- User has full control over location sharing
- Graceful handling of permission denial 