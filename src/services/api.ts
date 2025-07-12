/**
 * Comprehensive API Service Layer for GaadiMech Strapi Backend
 * Handles all communication between frontend and Strapi CMS
 */

// Types for API responses
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

// Base API configuration
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
    this.token = localStorage.getItem('strapi_jwt');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('strapi_jwt', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('strapi_jwt');
  }

  refreshToken() {
    this.token = localStorage.getItem('strapi_jwt');
  }

  getToken() {
    return this.token || localStorage.getItem('strapi_jwt');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Always get the latest token from localStorage to avoid sync issues
    const currentToken = this.getToken();
    if (currentToken) {
      headers.Authorization = `Bearer ${currentToken}`;
      
      // Debug: Decode JWT token to check its contents
      try {
        const tokenParts = currentToken.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('🔍 JWT Token Payload:', {
            userId: payload.id,
            exp: payload.exp,
            iat: payload.iat,
            isExpired: payload.exp ? (Date.now() / 1000) > payload.exp : false,
            timeUntilExpiry: payload.exp ? Math.round(payload.exp - (Date.now() / 1000)) : null
          });
        }
      } catch (error) {
        console.error('❌ Error decoding JWT token:', error);
      }
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    // Debug logging
    console.log('🔍 API Request:', {
      url,
      method: options.method || 'GET',
      hasToken: !!currentToken,
      tokenLength: currentToken?.length || 0,
      headers: {
        ...headers,
        Authorization: headers.Authorization ? 'Bearer [REDACTED]' : 'None'
      }
    });

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        console.error('❌ API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          endpoint
        });
        throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<StrapiResponse<T>> {
    const queryString = params 
      ? '?' + new URLSearchParams(params).toString()
      : '';
    
    return this.request<T>(`${endpoint}${queryString}`);
  }

  async post<T>(endpoint: string, data?: any): Promise<StrapiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<StrapiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<StrapiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();

// Authentication Service
export const authService = {
  async sendOtp(mobileNumber: string, deviceInfo?: any) {
    return apiClient.post('/auth/send-otp', {
      mobileNumber,
      source: 'website',
      deviceInfo,
    });
  },

  async verifyOtp(sessionId: string, otpCode: string, deviceInfo?: any, location?: any) {
    const response = await apiClient.post<{ jwt?: string; user?: any; isNewUser?: boolean; sessionId?: string }>('/auth/verify-otp', {
      sessionId,
      otpCode,
      deviceInfo,
      location,
    });
    
    // Handle both response structures: response.jwt or response.data.jwt
    const apiResponse = response as any; // Type assertion to handle flexible response structure
    const jwt = apiResponse.jwt || response.data?.jwt;
    if (jwt) {
      console.log('🔧 AuthService: Setting JWT token');
      apiClient.setToken(jwt);
    } else {
      console.warn('⚠️ AuthService: No JWT token found in response');
    }
    
    return response;
  },

  async logout() {
    const response = await apiClient.post('/auth/logout');
    apiClient.clearToken();
    return response;
  },

  async getCurrentUser() {
    // Use the default users-permissions endpoint with population
    return apiClient.get('/users/me?populate[cars][filters][isActive][$eq]=true&populate[addresses][filters][isActive][$eq]=true&populate[orders][sort][0]=createdAt:desc&populate[carts][filters][isActive][$eq]=true&populate[paymentMethods][filters][isActive][$eq]=true');
  },
};

// User Management Service
export const userService = {
  async updateProfile(userId: number, data: any) {
    // For Strapi user-permissions plugin, use /users/me for updating current user
    // This is more secure as it only allows updating the authenticated user
    const payload: Record<string, any> = {};
    if (data.firstName || data.name) payload.firstName = data.firstName || data.name;
    if (data.lastName !== undefined) payload.lastName = data.lastName;
    if (data.email !== undefined) payload.email = data.email;
    if (data.username !== undefined) payload.username = data.username;
    if (data.birthday !== undefined) payload.dateOfBirth = data.birthday;
    if (data.gender !== undefined) payload.gender = data.gender;

    return apiClient.put('/users/me', {
      data: payload,
    });
  },

  async getUserProfile(userId: number) {
    return apiClient.get(`/users/${userId}?populate=*`);
  },

  async updatePreferences(userId: number, preferences: any) {
    return apiClient.put('/users/me', { preferences });
  },

  async getUserActivities(userId: number, params?: any) {
    return apiClient.get(`/user-activities?filters[user][id][$eq]=${userId}&populate=*`, params);
  },
};

// Express Service Management
export const expressService = {
  async submitLead(leadData: any) {
    return apiClient.post('/express-services', {
      data: leadData,
    });
  },

  async updateLead(leadId: number, updateData: any) {
    return apiClient.put(`/express-services/${leadId}`, {
      data: updateData,
    });
  },

  async getUserServices(mobileNumber: string) {
    return apiClient.get(`/express-services?filters[mobileNumber][$eq]=${mobileNumber}&sort=createdAt:desc&populate=*`);
  },

  async getServiceStatus(serviceId: number) {
    return apiClient.get(`/express-services/${serviceId}?populate=*`);
  },
};

// Lead Management Service
export const leadService = {
  async createLead(leadData: any) {
    return apiClient.post('/express-leads', {
      data: leadData,
    });
  },

  async updateLead(leadId: number, updateData: any) {
    return apiClient.put(`/express-leads/${leadId}`, {
      data: updateData,
    });
  },

  async getUserLeads(userId: number) {
    return apiClient.get(`/express-leads?filters[user][id][$eq]=${userId}&sort=createdAt:desc&populate=*`);
  },
};

// Car Management Service
export const carService = {
  async addCar(carData: any) {
    // Ensure all required fields are present
    const formattedCarData = {
      registrationNumber: carData.registrationNumber || `TEMP_${Date.now()}`, // Temporary if not provided
      make: carData.make || carData.brand, // Handle both 'make' and 'brand'
      model: carData.model,
      year: carData.year || new Date().getFullYear(),
      fuelType: carData.fuelType,
      isPrimary: carData.isPrimary || false,
      color: carData.color,
      engineCapacity: carData.engineCapacity,
      transmission: carData.transmission,
      owner: carData.owner,
      isActive: true,
    };

    console.log('🚗 Formatted car data for Strapi:', formattedCarData);

    return apiClient.post('/cars', {
      data: formattedCarData,
    });
  },

  async updateCar(carId: number, carData: any) {
    return apiClient.put(`/cars/${carId}`, {
      data: carData,
    });
  },

  async deleteCar(carId: number) {
    return apiClient.delete(`/cars/${carId}`);
  },

  async getUserCars(userId: number) {
    return apiClient.get(`/cars?filters[owner][id][$eq]=${userId}&populate=*`);
  },
};

// Address Management Service
export const addressService = {
  async addAddress(addressData: any) {
    return apiClient.post('/addresses', {
      data: addressData,
    });
  },

  async updateAddress(addressId: number, addressData: any) {
    return apiClient.put(`/addresses/${addressId}`, {
      data: addressData,
    });
  },

  async deleteAddress(addressId: number) {
    return apiClient.delete(`/addresses/${addressId}`);
  },

  async getUserAddresses(userId: number) {
    return apiClient.get(`/addresses?filters[user][id][$eq]=${userId}&populate=*`);
  },
};

// Order Management Service
export const orderService = {
  async createOrder(orderData: any) {
    return apiClient.post('/orders', {
      data: orderData,
    });
  },

  async updateOrder(orderId: number, orderData: any) {
    return apiClient.put(`/orders/${orderId}`, {
      data: orderData,
    });
  },

  async getUserOrders(userId: number, params?: any) {
    return apiClient.get(`/orders?filters[user][id][$eq]=${userId}&sort=createdAt:desc&populate=*`, params);
  },

  async getOrderDetails(orderId: number) {
    return apiClient.get(`/orders/${orderId}?populate=*`);
  },
};

// Cart Management Service
export const cartService = {
  async getCart(userId: number) {
    return apiClient.get(`/carts?filters[user][id][$eq]=${userId}&populate=*`);
  },

  async updateCart(cartId: number, cartData: any) {
    return apiClient.put(`/carts/${cartId}`, {
      data: cartData,
    });
  },

  async createCart(cartData: any) {
    return apiClient.post('/carts', {
      data: cartData,
    });
  },

  async clearCart(cartId: number) {
    return apiClient.delete(`/carts/${cartId}`);
  },
};

// Analytics Service
export const analyticsService = {
  async trackEvent(eventData: any) {
    return apiClient.post('/analytics-events', {
      data: eventData,
    });
  },

  async trackUserActivity(activityData: any) {
    return apiClient.post('/user-activities', {
      data: activityData,
    });
  },

  async getUserAnalytics(userId: number, params?: any) {
    return apiClient.get(`/analytics-events?filters[user][id][$eq]=${userId}&sort=createdAt:desc`, params);
  },
};

// Review Service
export const reviewService = {
  async createReview(reviewData: any) {
    return apiClient.post('/reviews', {
      data: reviewData,
    });
  },

  async getServiceReviews(serviceType: string, params?: any) {
    return apiClient.get(`/reviews?filters[serviceType][$eq]=${serviceType}&populate=*`, params);
  },

  async getUserReviews(userId: number) {
    return apiClient.get(`/reviews?filters[user][id][$eq]=${userId}&populate=*`);
  },
};

// Contact & Enquiry Service
export const contactService = {
  async submitContact(contactData: any) {
    return apiClient.post('/contacts', {
      data: contactData,
    });
  },

  async submitEnquiry(enquiryData: any) {
    return apiClient.post('/enquiries', {
      data: enquiryData,
    });
  },

  async getEnquiryStatus(enquiryId: number) {
    return apiClient.get(`/enquiries/${enquiryId}?populate=*`);
  },
};

// Coupon Service
export const couponService = {
  async validateCoupon(code: string, amount: number) {
    return apiClient.post('/coupons/validate', {
      code,
      amount,
    });
  },

  async applyCoupon(userId: number, couponCode: string, orderId?: number) {
    return apiClient.post('/coupons/apply', {
      userId,
      couponCode,
      orderId,
    });
  },

  async getUserCoupons(userId: number) {
    return apiClient.get(`/coupons?filters[assignedTo][id][$eq]=${userId}&populate=*`);
  },
};

// Notification Service
export const notificationService = {
  async getUserNotifications(userId: number, params?: any) {
    return apiClient.get(`/notifications?filters[user][id][$eq]=${userId}&sort=createdAt:desc&populate=*`, params);
  },

  async markNotificationRead(notificationId: number) {
    return apiClient.put(`/notifications/${notificationId}`, {
      data: { isRead: true },
    });
  },

  async updateNotificationPreferences(userId: number, preferences: any) {
    return userService.updatePreferences(userId, {
      notifications: preferences,
    });
  },
};

// Session Management Service
export const sessionService = {
  async createSession(sessionData: any) {
    return apiClient.post('/user-sessions', {
      data: sessionData,
    });
  },

  async updateSession(sessionId: number, sessionData: any) {
    return apiClient.put(`/user-sessions/${sessionId}`, {
      data: sessionData,
    });
  },

  async getUserSessions(userId: number) {
    return apiClient.get(`/user-sessions?filters[user][id][$eq]=${userId}&sort=createdAt:desc&populate=*`);
  },
};

// Service Types and Categories
export const serviceTypeService = {
  async getServiceTypes() {
    return apiClient.get('/service-types?populate=*');
  },

  async getServiceCategories() {
    return apiClient.get('/service-categories?populate=*');
  },

  async getDoorstepServices(params?: any) {
    return apiClient.get('/doorstep-services?populate=*', params);
  },
};

// City and Location Service
export const locationService = {
  async getCities() {
    return apiClient.get('/cities');
  },

  async getCityBySlug(slug: string) {
    return apiClient.get(`/cities?filters[slug][$eq]=${slug}&populate=*`);
  },

  async checkServiceAvailability(location: any) {
    return apiClient.post('/cities/check-availability', location);
  },
};

// Export the main API client for direct usage if needed
export default apiClient; 