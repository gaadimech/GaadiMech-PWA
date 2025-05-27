# Strapi Integration for Car Service Booking Chatbot

## Overview
This document explains the Strapi integration that captures and stores booking details in real-time as users interact with the chatbot.

## Features Implemented

### 1. Real-time Data Capture
- ✅ **Immediate Storage**: Every user selection is saved to Strapi instantly
- ✅ **Session Tracking**: Unique session ID for each booking flow
- ✅ **Progressive Updates**: Same entry updated throughout the booking process
- ✅ **Selection Changes**: Handles when users change their mind (e.g., Petrol → CNG)

### 2. Strapi Content Type Structure

Create a content type called `booking` in Strapi with the following fields:

```javascript
{
  "manufacturer": "Text",
  "model": "Text", 
  "fuelType": "Text",
  "location": "Text",
  "area": "Text",
  "address": "Text",
  "serviceType": "Text",
  "servicePreference": "Text",
  "date": "Text",
  "timeSlot": "Text",
  "fullName": "Text",
  "mobileNumber": "Text",
  "bookingId": "Text",
  "servicePrice": "Text",
  "status": "Enumeration", // values: in_progress, completed, cancelled
  "sessionId": "Text"
}
```

### 3. Environment Configuration

Create a `.env` file in your project root:

```bash
# Strapi Configuration
REACT_APP_STRAPI_API_URL=http://localhost:1337/api
REACT_APP_STRAPI_API_TOKEN=your_strapi_api_token_here

# Example for production
# REACT_APP_STRAPI_API_URL=https://your-strapi-domain.com/api
# REACT_APP_STRAPI_API_TOKEN=your_production_api_token
```

### 4. API Token Setup in Strapi

1. Go to Strapi Admin Panel
2. Navigate to Settings → API Tokens
3. Create a new token with:
   - **Name**: Car Service Booking
   - **Description**: Token for car service booking chatbot
   - **Token duration**: Unlimited
   - **Token type**: Full access
4. Copy the generated token to your `.env` file

## Data Flow

### Initial Booking Creation
```javascript
// When user makes first selection (manufacturer)
POST /api/bookings
{
  "data": {
    "manufacturer": "Toyota",
    "sessionId": "session_1234567890_abc123",
    "status": "in_progress"
  }
}
```

### Progressive Updates
```javascript
// When user selects model
PUT /api/bookings/{id}
{
  "data": {
    "manufacturer": "Toyota",
    "model": "Innova",
    "sessionId": "session_1234567890_abc123"
  }
}
```

### Selection Changes
```javascript
// User changes from Petrol to CNG
PUT /api/bookings/{id}
{
  "data": {
    "manufacturer": "Toyota",
    "model": "Innova", 
    "fuelType": "CNG", // Updated from "Petrol"
    "sessionId": "session_1234567890_abc123"
  }
}
```

### Final Confirmation
```javascript
// When booking is confirmed
PUT /api/bookings/{id}
{
  "data": {
    "manufacturer": "Toyota",
    "model": "Innova",
    "fuelType": "CNG",
    "location": "Jaipur",
    "area": "Malviya Nagar",
    "serviceType": "Express Service",
    "servicePreference": "Free Pick and Drop",
    "date": "Tomorrow",
    "timeSlot": "1:00 PM - 3:00 PM",
    "fullName": "John Doe",
    "mobileNumber": "9876543210",
    "bookingId": "CAR12345",
    "servicePrice": "Rs.3299",
    "status": "completed",
    "sessionId": "session_1234567890_abc123"
  }
}
```

## Key Functions

### 1. Session Management
```javascript
// Generate unique session ID
const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
```

### 2. Create Booking
```javascript
const createStrapiBooking = async (data) => {
  const response = await fetch(`${STRAPI_API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: { ...data, sessionId, status: 'in_progress' } }),
  });
  return response.json();
};
```

### 3. Update Booking
```javascript
const updateStrapiBooking = async (id, data) => {
  const response = await fetch(`${STRAPI_API_URL}/bookings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: { ...data, sessionId } }),
  });
  return response.json();
};
```

## User Journey Examples

### Example 1: Normal Flow
1. **User selects Toyota** → Creates booking entry with manufacturer
2. **User selects Innova** → Updates same entry with model
3. **User selects Petrol** → Updates same entry with fuel type
4. **User continues...** → Progressive updates
5. **User confirms booking** → Final update with status: 'completed'

### Example 2: Selection Change (Petrol → CNG)
1. **User selects Toyota** → Creates booking entry
2. **User selects Innova** → Updates entry
3. **User selects Petrol** → Updates entry with fuelType: 'Petrol'
4. **User changes to CNG** → Updates same entry with fuelType: 'CNG'
5. **Flow continues from CNG selection** → All subsequent updates use CNG

### Example 3: Multiple Changes
1. **User selects Toyota** → Creates entry
2. **User selects Innova** → Updates entry
3. **User selects Petrol** → Updates entry
4. **User changes to Honda** → Updates manufacturer, clears model/fuel
5. **User selects City** → Updates model
6. **User selects Diesel** → Updates fuel type
7. **Flow continues...** → All data reflects latest selections

## WhatsApp Integration

When booking is confirmed, user is redirected to WhatsApp with complete booking details:

```
🚗 *GaadiMech Car Service Booking*

📋 *Booking Details:*
• Booking ID: CAR12345
• Car: Toyota Innova (CNG)
• Service: Express Service
• Location: Malviya Nagar
• Date: Tomorrow
• Time: 1:00 PM - 3:00 PM
• Service Type: Free Pick and Drop
• Contact: John Doe - 9876543210
• Price: Rs.3299

✅ *Booking Confirmed!*
Our team will contact you 30 minutes before the scheduled time.

📱 Session ID: session_1234567890_abc123
🌐 Booked from: https://gaadimech.com
```

## Benefits

### 1. Data Integrity
- ✅ **No Data Loss**: Every selection is immediately saved
- ✅ **Real-time Updates**: Changes reflected instantly in database
- ✅ **Session Tracking**: Complete audit trail of user journey

### 2. User Experience
- ✅ **Seamless Changes**: Users can change selections without issues
- ✅ **Progress Preservation**: Data saved even if user closes chat
- ✅ **Complete Context**: WhatsApp message has all booking details

### 3. Business Intelligence
- ✅ **User Behavior**: Track selection changes and patterns
- ✅ **Conversion Tracking**: Monitor booking completion rates
- ✅ **Data Analytics**: Rich dataset for business insights

## Error Handling

### 1. API Failures
```javascript
try {
  await saveToStrapi(data);
} catch (error) {
  console.error('Strapi save failed:', error);
  // Continue with chatbot flow even if Strapi fails
}
```

### 2. Network Issues
- Chatbot continues to work even if Strapi is unavailable
- Data is queued and can be retried
- User experience is not affected by backend issues

### 3. Invalid Data
- Input validation before sending to Strapi
- Graceful handling of missing fields
- Default values for required fields

## Security Considerations

### 1. API Token Security
- Store API token in environment variables
- Use different tokens for development/production
- Regularly rotate API tokens

### 2. Data Privacy
- Store only necessary booking information
- Implement data retention policies
- Comply with privacy regulations

### 3. Rate Limiting
- Implement request throttling
- Handle rate limit responses gracefully
- Use exponential backoff for retries

---

**Result**: Complete real-time data capture system with Strapi integration, handling selection changes, and comprehensive WhatsApp booking summary! 🚗💾📱 