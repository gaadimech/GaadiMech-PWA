# Chatbot API Fix Guide

## Issue Summary
The Express Service page works fine in production, but the Chatbot API calls fail on Vercel deployment. Both work locally.

## Root Cause Analysis

### ✅ **What's Working (Express Service):**
- Endpoint: `/api/express-services` 
- Content Type: `express-service` (singular) → `express-services` (plural)
- Schema: Has required fields with validation
- Uses same API client and environment variables

### ❌ **What's Failing (Chatbot):**
- Endpoint: `/api/chatbot-bookings`
- Content Type: `chatbot-booking` (singular) → `chatbot-bookings` (plural)
- Schema: All fields are optional
- Uses same API client and environment variables

## Key Differences Found

### 1. **Schema Differences**
**Express Service Schema:**
```json
{
  "options": {
    "draftAndPublish": false  // ✅ Disabled
  },
  "attributes": {
    "mobileNumber": {
      "type": "string",
      "required": true,       // ✅ Has required fields
      "minLength": 10,
      "maxLength": 10,
      "regex": "^[6-9]\\d{9}$"
    }
  }
}
```

**Chatbot Booking Schema:**
```json
{
  "options": {
    "draftAndPublish": false  // ✅ Disabled (Good)
  },
  "attributes": {
    "mobileNumber": {
      "type": "string"        // ❌ No validation, not required
    }
  }
}
```

### 2. **API Token Permissions**
Both use the same API token, but permissions might be different for each content type.

## Solutions

### **Solution 1: Fix Environment Variables in Vercel** ⭐ **MOST LIKELY**

1. **Go to Vercel Dashboard:**
   - Navigate to your project
   - Go to Settings → Environment Variables

2. **Verify these variables exist:**
   ```
   Name: VITE_API_URL
   Value: https://your-strapi-backend.com (NO /api suffix)
   Environments: ✅ Production ✅ Preview ✅ Development
   
   Name: VITE_API_TOKEN
   Value: your-256-character-token
   Environments: ✅ Production ✅ Preview ✅ Development
   ```

3. **Redeploy after adding variables**

### **Solution 2: Check Strapi API Token Permissions**

1. **Go to Strapi Admin Dashboard:**
   - Settings → API Tokens → Your Token

2. **Verify Content Type Permissions:**
   ```
   ✅ express-service: Full Access
   ✅ chatbot-booking: Full Access  ← Check this!
   ✅ coupon: Full Access
   ✅ contact: Full Access
   ✅ nps-feedback: Full Access
   ```

3. **If missing, add permissions for:**
   - `chatbot-booking` → Create, Read, Update, Delete

### **Solution 3: Test API Connectivity**

1. **Deploy the debug tool:** Place `debug-api.html` in your `public/` folder

2. **Access:** `https://your-vercel-app.com/debug-api.html`

3. **Check:**
   - Environment variables are loaded
   - Express Services returns 200
   - Chatbot Bookings returns 200 (not 401/403)

### **Solution 4: Add Better Error Handling**

The enhanced error handling has been added to `WatiChatInterface.tsx` to provide more debugging info.

### **Solution 5: Alternative API Endpoint Test**

If `chatbot-bookings` doesn't work, try these in order:
1. `/api/chatbot-bookings` (current)
2. `/api/chatbot-booking` (singular)
3. `/api/chatbotbookings` (no hyphen)
4. `/api/chatbotbooking` (singular, no hyphen)

## Quick Debug Steps

1. **Check browser console in production for:**
   ```
   🔍 VITE_API_URL: should show your Strapi URL
   🔍 VITE_API_TOKEN present: should be true
   ```

2. **If environment variables are missing:**
   - Add them in Vercel dashboard
   - Redeploy the application

3. **If variables are present but API fails:**
   - Check Strapi API token permissions
   - Verify the `chatbot-booking` content type is accessible

## Testing Commands

### Test API endpoints directly:
```bash
# Test Express Services (working)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://your-strapi.com/api/express-services

# Test Chatbot Bookings (failing)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://your-strapi.com/api/chatbot-bookings
```

Both should return 200 status, not 401 (unauthorized) or 403 (forbidden).

## Expected Fix

**Most likely cause:** Environment variables not properly set in Vercel production environment.

**Expected fix:** Adding `VITE_API_URL` and `VITE_API_TOKEN` to all Vercel environments (Production, Preview, Development) and redeploying. 