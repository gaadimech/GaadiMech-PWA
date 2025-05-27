# Strapi Setup Guide for Car Service Booking Chatbot

## ✅ Content Type Created Successfully!

I can see you've already created the "Chatbot Booking" content type in Strapi. The chatbot is now configured to work with your exact field structure.

## 🔧 Configuration Steps

### 1. Get Your Strapi API Token

1. In your Strapi admin panel, go to **Settings** → **API Tokens**
2. Click **"Create new API Token"**
3. Configure the token:
   - **Name**: `Car Service Booking Chatbot`
   - **Description**: `Token for car service booking data capture`
   - **Token duration**: `Unlimited`
   - **Token type**: `Full access`
4. Click **Save** and copy the generated token

### 2. Create Environment File

Create a `.env` file in your project root with:

```bash
# Strapi Configuration (Vite Environment Variables)
VITE_STRAPI_API_URL=http://localhost:1337/api
VITE_STRAPI_API_TOKEN=paste_your_token_here

# Replace 'paste_your_token_here' with the actual token from step 1
```

### 3. Configure Strapi Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Under **Chatbot-booking**, enable:
   - ✅ `create`
   - ✅ `update`
   - ✅ `find`
   - ✅ `findOne`
4. Click **Save**

## 📊 Field Mapping

Your Strapi content type fields are mapped as follows:

| Chatbot Data | Strapi Field | Type | Description |
|--------------|--------------|------|-------------|
| manufacturer | manufacturer | Text | Car manufacturer (Toyota, Honda, etc.) |
| model | model | Text | Car model (Innova, City, etc.) |
| fuelType | fueltype | Text | Fuel type (Petrol, Diesel, CNG, etc.) |
| location | location | Text | City/Location (Jaipur) |
| area | area | Text | Area within city (Malviya Nagar, etc.) |
| address | address | Text | Custom address if "Other Area" selected |
| serviceType | serviceType | Text | Service type (Express Service, etc.) |
| servicePreference | servicePreference | Text | Service preference (Pick & Drop, etc.) |
| date | date | Text | Booking date (Today, Tomorrow, etc.) |
| timeSlot | timeSlot | Text | Time slot (9:00 AM - 11:00 AM, etc.) |
| fullName | fullName | Text | Customer's full name |
| mobileNumber | mobileNumber | Text | Customer's mobile number |
| bookingId | bookingid | Text | Generated booking ID (CAR12345) |
| servicePrice | servicePrice | Text | Service price (Rs.3299, etc.) |
| status | booking_status | Text | Booking status (in_progress, completed) |
| sessionId | sessionid | Text | Unique session identifier |

## 🚀 How It Works

### Real-time Data Capture
1. **User selects manufacturer** → Creates new entry in Strapi
2. **User selects model** → Updates same entry with model
3. **User selects fuel type** → Updates same entry with fuel type
4. **User continues...** → Progressive updates to same entry
5. **User confirms booking** → Final update with status: 'completed'

### Selection Changes Handled
- User selects **Petrol** → Saves to Strapi
- User changes to **CNG** → Updates same entry with new fuel type
- Flow continues with **CNG** selection

### API Endpoints Used
- **Create**: `POST /api/chatbot-bookings`
- **Update**: `PUT /api/chatbot-bookings/{id}`

## 🧪 Testing the Integration

### 1. Start Your Development Server
```bash
npm start
```

### 2. Open Browser Console
- Press F12 → Console tab
- Look for Strapi-related logs:
  - `Strapi booking created: {data: {...}}`
  - `Strapi booking updated: {data: {...}}`

### 3. Test the Flow
1. Open the chatbot
2. Select manufacturer (should create entry)
3. Select model (should update entry)
4. Continue through flow
5. Check Strapi admin panel for the booking entry

### 4. Check Strapi Admin
1. Go to **Content Manager** → **Chatbot Booking**
2. You should see entries being created and updated in real-time
3. Each entry will have a unique `sessionid`

## 🔍 Troubleshooting

### Common Issues

#### 1. "Failed to create Strapi booking"
- ✅ Check if Strapi is running on `localhost:1337`
- ✅ Verify API token is correct in `.env` file
- ✅ Check permissions are set correctly

#### 2. "Authorization error"
- ✅ Ensure API token has correct permissions
- ✅ Check token is not expired
- ✅ Verify token format in `.env` file

#### 3. "Field validation errors"
- ✅ Check field names match exactly
- ✅ Ensure required fields are not empty
- ✅ Verify data types are correct

### Debug Mode
The chatbot includes console logging for debugging:
```javascript
console.log('Strapi booking created:', result);
console.log('Strapi booking updated:', result);
```

## 📱 WhatsApp Integration

When booking is confirmed, the user gets redirected to WhatsApp with:

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

## 🎯 Next Steps

1. ✅ **Content Type Created** (Done!)
2. ✅ **Code Updated** (Done!)
3. 🔄 **Get API Token** (Your turn)
4. 🔄 **Create .env file** (Your turn)
5. 🔄 **Set Permissions** (Your turn)
6. 🔄 **Test Integration** (Your turn)

Once you complete steps 3-5, the chatbot will start capturing all booking data in real-time to your Strapi database!

---

**Ready to capture every booking detail! 🚗💾📱** 