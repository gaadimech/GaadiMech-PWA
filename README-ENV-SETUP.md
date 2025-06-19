# Environment Variables Setup for Vercel

## Required Environment Variables

Make sure these environment variables are set in your Vercel dashboard:

### Frontend (Vercel) Environment Variables:
1. `VITE_API_URL` - Your Strapi backend URL (e.g., `https://your-strapi-backend.com`)
2. `VITE_API_TOKEN` - Your Strapi API token (256 characters)

### Setting up in Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add both variables:
   - **Name:** `VITE_API_URL` **Value:** `https://your-strapi-backend-url.com`
   - **Name:** `VITE_API_TOKEN` **Value:** `your-256-character-strapi-api-token`
3. Make sure to select **Production**, **Preview**, and **Development** for both variables
4. Redeploy your application after adding environment variables

### Common Issues:
- **Missing VITE_ prefix**: Vite requires the `VITE_` prefix for client-side environment variables
- **Token not in Production**: Make sure the token is added to all environments (Production, Preview, Development)
- **URL format**: Make sure API URL doesn't end with `/api` - the code adds it automatically
- **Token permissions**: Ensure the API token has access to all required content types

### Debugging:
Check the browser console in production to see if environment variables are loaded:
```javascript
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('VITE_API_TOKEN available:', !!import.meta.env.VITE_API_TOKEN);
```

### Strapi Token Permissions:
Make sure your API token has **full access** to these content types:
- `express-services`
- `chatbot-bookings` 
- `coupons`
- `contacts`
- `nps-feedbacks` 