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
    if (!response.ok) {
      const error: StrapiError = await response.json();
      throw new Error(error.error.message || 'An error occurred');
    }
    return response.json();
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
}

export const apiClient = new ApiClient(); 