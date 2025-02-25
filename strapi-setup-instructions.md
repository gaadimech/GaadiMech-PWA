# Strapi Setup Instructions for Express Service Lead Capture

To complete the integration with Strapi, you need to create a new content type for Express Service leads. Follow these steps:

## 1. Create Express Service Content Type

1. Log in to your Strapi admin panel
2. Go to "Content-Type Builder" in the sidebar
3. Click on "Create new collection type"
4. Enter "Express Service" as the Display name
5. The API ID will automatically be set to "express-service"
6. Click "Continue"

## 2. Add Fields to Express Service Content Type

Add the following fields:

1. **Mobile Number** (Required)
   - Field type: Text
   - Name: mobileNumber
   - Type: Short text
   - Check "Required field"
   - Advanced Settings: Set validation to match the pattern `^[6-9]\d{9}$` (for Indian mobile numbers)

2. **Service Date** (Optional)
   - Field type: Date
   - Name: serviceDate
   - Type: Date (without time)
   - Leave "Required field" unchecked

3. **Time Slot** (Optional)
   - Field type: Text
   - Name: timeSlot
   - Type: Short text
   - Leave "Required field" unchecked

## 3. Configure Permissions

1. Go to "Settings" → "Roles" → "Public"
2. Find "Express Service" in the list of content types
3. Enable the following permissions:
   - Create: Allow users to submit their mobile number
   - Update: Allow updating records with time slot information

## 4. API Endpoints

After setting up the content type, Strapi will automatically create the following API endpoints:

- **POST /api/express-services**: Create a new lead with mobile number
  ```json
  {
    "data": {
      "mobileNumber": "9876543210"
    }
  }
  ```

- **PUT /api/express-services/:id**: Update a lead with date and time slot
  ```json
  {
    "data": {
      "serviceDate": "2023-06-15",
      "timeSlot": "9:00 AM - 11:00 AM"
    }
  }
  ```

## 5. Testing the Integration

1. After setting up the content type, test the API endpoints using a tool like Postman
2. Verify that leads are being created and updated correctly
3. Check the Strapi admin panel to see if the data is being stored properly

## 6. Additional Considerations

- Consider setting up email notifications in Strapi when a new lead is created
- You may want to add additional fields like "status" to track the progress of each lead
- For production, ensure proper authentication and rate limiting are in place to prevent abuse 