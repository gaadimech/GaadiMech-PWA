import axios from 'axios';

// SECURITY: Only log in development, never in production
if (import.meta.env.DEV) {
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('VITE_API_TOKEN:', import.meta.env.VITE_API_TOKEN ? 'Token loaded ✅' : 'Token missing ❌');
  // REMOVED: Never log token details in any environment
}

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // SECURITY: Only log in development, no sensitive data
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        hasAuth: !!config.headers?.Authorization,
        // REMOVED: Never log token details
      });
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // SECURITY: Only log in development
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', response.status, response.statusText);
    }
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.statusText);
    return Promise.reject(error);
  }
);

export default apiClient; 