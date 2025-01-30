import env from '../config/env';

interface ApiError {
  status: number;
  name: string;
  message: string;
  details?: unknown;
}

interface StrapiError {
  data: null;
  error: ApiError;
}

class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = env.STRAPI_URL;
    
    // Debug log (remove in production)
    console.log('API Token available:', !!env.STRAPI_API_TOKEN);
    
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.STRAPI_API_TOKEN}`,
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      try {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('API Error Response:', errorData); // Debug log
          throw new Error(errorData.error?.message || 'An error occurred');
        } else {
          const textError = await response.text();
          console.error('API Text Error:', textError); // Debug log
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error parsing error response:', error); // Debug log
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    try {
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('API Success Response:', data); // Debug log
        return data;
      }
      throw new Error('Response was not JSON');
    } catch (error) {
      console.error('Error parsing success response:', error); // Debug log
      throw new Error('Failed to parse response');
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`);
      }
      throw new Error('An unknown error occurred');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.headers,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`);
      }
      throw new Error('An unknown error occurred');
    }
  }
}

export const apiClient = new ApiClient(); 