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

## Updating Express Service Content Type for Car Selection

Follow these steps to update the Express Service content type in Strapi to support car selection:

1. Log in to your Strapi admin panel
2. Navigate to Content-Type Builder
3. Find and click on "Express Service" content type
4. Click "Add another field"
5. Add the following fields:

### Field 1: Car Brand
- Field type: Text
- Name: carBrand
- Type: Short text
- Advanced Settings:
  - Make sure it's private: No
  - Enable localization: No
  - Required field: No

### Field 2: Car Model
- Field type: Text
- Name: carModel
- Type: Short text
- Advanced Settings:
  - Make sure it's private: No
  - Enable localization: No
  - Required field: No

### Field 3: Service Price
- Field type: Number
- Name: servicePrice
- Type: Integer
- Advanced Settings:
  - Make sure it's private: No
  - Enable localization: No
  - Required field: No

6. Save the changes

### Update API Permissions

1. Navigate to Settings > Roles
2. Select the "Public" role
3. Find "Express Service" in the permissions list
4. Make sure the following permissions are enabled:
   - find
   - findOne
   - create
   - update
5. Under "Fields" permissions, enable:
   - mobileNumber
   - serviceType
   - serviceDate
   - timeSlot
   - carBrand
   - carModel
   - servicePrice
6. Save the changes

### Restart Strapi

After making these changes, restart your Strapi server to apply the changes:

```bash
npm run develop
# or
yarn develop
```

Your Express Service API will now support car brand, model, and pricing information 