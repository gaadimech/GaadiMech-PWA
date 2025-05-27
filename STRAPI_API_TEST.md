# Strapi API Connection Test

## 🔧 Current Issue
Getting 400 Bad Request with "Invalid key sessionid" error when trying to create chatbot bookings.

## 🧪 Debugging Steps

### 1. Check Environment Variables
Make sure you have created `.env` file with:
```bash
VITE_STRAPI_API_URL=http://localhost:1337/api
VITE_STRAPI_API_TOKEN=your_actual_token_here
```

### 2. Test Basic API Connection
Open browser console and run this test:

```javascript
// Test 1: Check if Strapi is running
fetch('http://localhost:1337/api/chatbot-bookings')
  .then(response => console.log('Strapi status:', response.status))
  .catch(error => console.error('Strapi connection error:', error));

// Test 2: Try creating with minimal data
fetch('http://localhost:1337/api/chatbot-bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  },
  body: JSON.stringify({
    data: {
      manufacturer: "Toyota"
    }
  })
})
.then(response => response.json())
.then(data => console.log('Test result:', data))
.catch(error => console.error('Test error:', error));
```

### 3. Check Your Strapi Content Type
1. Go to **Strapi Admin** → **Content-Types Builder** → **Chatbot Booking**
2. Verify these fields exist:
   - ✅ `manufacturer` (Text)
   - ✅ `model` (Text)
   - ✅ `fueltype` (Text)
   - ✅ `serviceType` (Text)
   - ✅ `servicePreference` (Text)
   - ✅ `timeSlot` (Text)
   - ✅ `fullName` (Text)
   - ✅ `mobileNumber` (Text)
   - ✅ `servicePrice` (Text)

### 4. Check Permissions
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Under **Chatbot-booking**, enable:
   - ✅ `create`
   - ✅ `update`
   - ✅ `find`
   - ✅ `findOne`

### 5. Current Code Changes
The code now:
- ✅ Removes empty/null values before sending
- ✅ Only sends basic fields (no sessionId or booking_status initially)
- ✅ Enhanced logging for debugging
- ✅ Uses exact field names from your Strapi

### 6. What to Look For
In browser console, you should see:
```
Creating Strapi booking with data: {manufacturer: "Toyota"}
Sending to Strapi API: http://localhost:1337/api/chatbot-bookings
Request payload: {"data": {"manufacturer": "Toyota"}}
```

If successful:
```
Strapi booking created: {data: {id: 1, ...}}
```

If failed:
```
Failed to create Strapi booking: 400 Bad Request
Error details: {"error": {...}}
```

## 🎯 Next Steps
1. **Test the chatbot** - select a manufacturer
2. **Check console logs** for detailed error info
3. **Verify Strapi is running** on localhost:1337
4. **Check API token** is correct in .env file

The simplified API calls should now work! 🚗✅ 