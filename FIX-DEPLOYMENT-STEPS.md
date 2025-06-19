# Fix Deployment Steps for Chatbot API Issue

## 🔍 **Root Cause Found!**

The 400 error was caused by:
1. ❌ Sending `published: true` field which doesn't exist in chatbot-booking schema
2. ❌ Missing required `submissionTimestamp` field

## ✅ **Fixes Applied:**

### **Frontend Changes (Already Done):**
1. ✅ Removed `published: true` from API request
2. ✅ Added `submissionTimestamp` to data payload
3. ✅ Updated TypeScript interface

### **Backend Changes (Already Done):**
1. ✅ Added `submissionTimestamp` required field to chatbot-booking schema

## 🚀 **Deployment Steps:**

### **Step 1: Deploy Backend Changes**
```bash
# Navigate to Strapi backend
cd ../strapi-cms

# Build and restart Strapi
npm run build
npm run start
```

**OR if using Render/production:**
- Push changes to your Strapi repository
- Redeploy your Strapi instance on Render

### **Step 2: Deploy Frontend Changes**
```bash
# Navigate to frontend (you're already here)
cd website-ui

# Build and deploy to Vercel
git add .
git commit -m "Fix chatbot API: remove published field, add submissionTimestamp"
git push origin main
```

Vercel will auto-deploy the changes.

### **Step 3: Verify Environment Variables**
Make sure these are set in Vercel:
```
VITE_API_URL=https://strapi-cms-8wqv.onrender.com
VITE_API_TOKEN=3d0d8eeda681daeeef25426fd3cd9750788061f1ceb61de8608e4949c5b16d8b22fff67c82bcdf7ec4a94c0ab01f78cf91d4f716d3f68bd2da66337b97ccfdfa712b072102ca6270079cad653cacc17eccfd6a9cecc0f36dee1ed835aed6a0a2e2821035848220a044086801a8b47b4351a531a6819ababa4b6cc8153e68840c
```

### **Step 4: Test the Fix**
1. Open your production site: https://gaadimech.com
2. Open the chatbot
3. Start the booking process
4. Check browser console for:
   ```
   ✅ Creating Strapi booking with data
   ✅ Strapi booking created successfully
   ```

## 🎯 **Expected Results:**

### **Before Fix:**
```
❌ POST https://strapi-cms-8wqv.onrender.com/api/chatbot-bookings
❌ 400 (Bad Request)
❌ Error Response Status: 400
```

### **After Fix:**
```
✅ POST https://strapi-cms-8wqv.onrender.com/api/chatbot-bookings
✅ 201 (Created) or 200 (OK)
✅ Strapi booking created successfully
```

## 🔧 **If Issues Persist:**

1. **Check Strapi Admin:**
   - Go to https://strapi-cms-8wqv.onrender.com/admin
   - Content Manager → Chatbot Booking
   - Verify new entries are being created

2. **Check API Token Permissions:**
   - Settings → API Tokens → Your Token
   - Ensure `chatbot-booking` has Full Access

3. **Debug with Console:**
   - Open browser dev tools
   - Check Network tab for actual request/response
   - Look for detailed error messages

## ⚡ **Quick Test Command:**
```bash
# Test API directly after deployment
curl -X POST https://strapi-cms-8wqv.onrender.com/api/chatbot-bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data":{"submissionTimestamp":"2024-01-19T10:00:00.000Z","sessionId":"test123"}}'
```

Expected response: 200/201 status, not 400.

---

## 📋 **Summary:**
The main issue was a schema mismatch between frontend and backend. The frontend was sending invalid data (`published: true`) and missing required data (`submissionTimestamp`). Both issues are now fixed. 