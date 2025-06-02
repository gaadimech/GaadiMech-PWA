import axios from 'axios';

// Debug environment variables for API client
console.log('🔧 API Client Environment Variables Debug:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('VITE_API_TOKEN:', import.meta.env.VITE_API_TOKEN ? 'Token loaded ✅' : 'Token missing ❌');
console.log('🔑 API Token length:', import.meta.env.VITE_API_TOKEN ? import.meta.env.VITE_API_TOKEN.length : 0);
console.log('🔑 API Token (first 50 chars):', import.meta.env.VITE_API_TOKEN ? import.meta.env.VITE_API_TOKEN.substring(0, 50) + '...' : 'No token');

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for logging and handling
apiClient.interceptors.request.use(
  (config) => {
    // Log API requests for debugging
    console.log('🌐 API Client Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      tokenLength: config.headers?.Authorization ? String(config.headers.Authorization).length : 0
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
); 