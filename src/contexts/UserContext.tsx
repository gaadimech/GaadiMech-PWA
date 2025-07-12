import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, userService, carService, addressService, orderService, analyticsService } from '../services/api';
import { apiClient } from '../services/api';

export interface Car {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  isPrimary?: boolean;
}

export interface Address {
  id: string;
  address: string;
  isPrimary?: boolean;
  type?: 'home' | 'work' | 'other';
  landmark?: string;
  pincode?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  services: string[];
  carDetails: string;
  date: string;
  status: 'completed' | 'ongoing' | 'cancelled';
  serviceType?: string;
  amount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string;
  gender?: string;
  cars: Car[];
  addresses: Address[];
  orders: Order[];
  // Additional Strapi fields
  username?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  loyaltyPoints?: number;
  totalSpent?: number;
  customerSegment?: string;
  preferences?: any;
  isEmailVerified?: boolean;
  isMobileVerified?: boolean;
  lastLoginAt?: string;
  profilePicture?: any;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  // Authentication methods
  sendOtp: (mobileNumber: string) => Promise<any>;
  verifyOtp: (sessionId: string, otpCode: string) => Promise<any>;
  // Car management
  addCar: (car: Omit<Car, 'id'>) => Promise<void>;
  updateCar: (carId: string, updates: Partial<Car>) => Promise<void>;
  editCar: (carId: string, updates: Partial<Car>) => Promise<void>;
  deleteCar: (carId: string) => Promise<void>;
  setPrimaryCar: (carId: string) => Promise<void>;
  cars: Car[];
  // Address management
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (addressId: string, updates: Partial<Address>) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  // Data refresh
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from Strapi on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('strapi_jwt');
        console.log('🔍 UserContext: Loading user data on app start', {
          hasToken: !!token,
          tokenLength: token?.length || 0
        });
        
        if (token) {
          // Set token in API client before making request
          apiClient.setToken(token);
          
          const response = await authService.getCurrentUser();
          console.log('🔍 UserContext: getCurrentUser response:', response);
          
          if (response.data) {
            await transformAndSetUser(response.data);
            console.log('✅ UserContext: User data loaded successfully from token');
          } else {
            console.warn('⚠️ UserContext: No user data in response, clearing token');
            localStorage.removeItem('strapi_jwt');
            apiClient.clearToken();
          }
        } else {
          console.log('ℹ️ UserContext: No JWT token found, user not logged in');
        }
      } catch (error) {
        console.error('❌ UserContext: Error loading user data:', error);
        // Clear invalid token
        localStorage.removeItem('strapi_jwt');
        apiClient.clearToken();
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Transform Strapi user data to match our User interface
  const transformAndSetUser = async (strapiUser: any) => {
    try {
      // Fetch user's cars, addresses, and orders
      const [carsResponse, addressesResponse, ordersResponse] = await Promise.all([
        carService.getUserCars(strapiUser.id).catch(() => ({ data: [] as Car[] })),
        addressService.getUserAddresses(strapiUser.id).catch(() => ({ data: [] as Address[] })),
        orderService.getUserOrders(strapiUser.id).catch(() => ({ data: [] as Order[] }))
      ]);

      const transformedUser: User = {
        id: strapiUser.id.toString(),
        name: strapiUser.firstName || strapiUser.username || '',
        email: strapiUser.email || '',
        phone: strapiUser.mobileNumber || '',
        birthday: strapiUser.dateOfBirth || '',
        gender: strapiUser.gender || '',
        cars: Array.isArray(carsResponse.data) ? carsResponse.data : [],
        addresses: Array.isArray(addressesResponse.data) ? addressesResponse.data : [],
        orders: Array.isArray(ordersResponse.data) ? ordersResponse.data : [],
        username: strapiUser.username,
        firstName: strapiUser.firstName,
        lastName: strapiUser.lastName,
        mobileNumber: strapiUser.mobileNumber,
        loyaltyPoints: strapiUser.loyaltyPoints,
        totalSpent: strapiUser.totalSpent,
        customerSegment: strapiUser.customerSegment,
        preferences: strapiUser.preferences,
        isEmailVerified: strapiUser.isEmailVerified,
        isMobileVerified: strapiUser.isMobileVerified,
        lastLoginAt: strapiUser.lastLoginAt,
        profilePicture: strapiUser.profilePicture,
      };

      setUser(transformedUser);

      // Track user login analytics
      await analyticsService.trackUserActivity({
        user: strapiUser.id,
        activityType: 'login',
        timestamp: new Date().toISOString(),
        source: 'web_app',
      }).catch(console.error);

    } catch (error) {
      console.error('Error transforming user data:', error);
    }
  };

  // Authentication methods
  const sendOtp = async (mobileNumber: string) => {
    try {
      const response = await authService.sendOtp(mobileNumber);
      return response;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  const verifyOtp = async (sessionId: string, otpCode: string) => {
    try {
      console.log('🔍 UserContext: Starting OTP verification', { sessionId, otpCode });
      
      const response = await authService.verifyOtp(sessionId, otpCode);
      
      console.log('🔍 UserContext: Raw API response:', response);
      
      // The response structure is: { success: true, jwt: '...', user: {...}, isNewUser: true }
      // NOT nested under response.data
      const responseData = response.data || response; // Handle both cases
      
      console.log('🔍 UserContext: Extracted response data:', {
        responseData,
        hasUser: !!responseData.user,
        hasJwt: !!responseData.jwt,
        isNewUser: responseData.isNewUser
      });
      
      // Store JWT token if present
      if (responseData.jwt) {
        console.log('🔍 UserContext: Storing JWT token');
        localStorage.setItem('strapi_jwt', responseData.jwt);
        apiClient.setToken(responseData.jwt);
      }
      
      if (responseData.user) {
        console.log('🔍 UserContext: Transforming and setting user', responseData.user);
        await transformAndSetUser(responseData.user);
        
        // Wait for user state to be set before returning
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('🔍 UserContext: User state updated successfully', {
          userSet: !!responseData.user,
          isAuthenticated: !!responseData.jwt
        });
      } else {
        console.warn('⚠️ UserContext: No user data in response');
      }
      
      return response;
    } catch (error) {
      console.error('❌ UserContext: OTP verification failed', error);
      throw error;
    }
  };

  const login = async (userData: User) => {
    try {
      setUser(userData);
      
      // Track login analytics
      await analyticsService.trackUserActivity({
        user: userData.id,
        activityType: 'login',
        timestamp: new Date().toISOString(),
        source: 'web_app',
      }).catch(console.error);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (user) {
        // Track logout analytics
        await analyticsService.trackUserActivity({
          user: user.id,
          activityType: 'logout',
          timestamp: new Date().toISOString(),
          source: 'web_app',
        }).catch(console.error);
      }

      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      // Still clear user data even if API call fails
      setUser(null);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      console.log('🔄 UserContext: Updating user profile', {
        userId: user.id,
        updates,
        currentToken: localStorage.getItem('strapi_jwt') ? 'Present' : 'Missing'
      });
      
      const response = await userService.updateProfile(parseInt(user.id), updates);
      
      console.log('✅ UserContext: Profile update response', response);
      
      if (response.data) {
        await transformAndSetUser(response.data);
        console.log('✅ UserContext: User profile updated successfully');
      }
    } catch (error) {
      console.error('❌ UserContext: Error updating user profile:', error);
      throw error;
    }
  };

  const refreshUserData = async () => {
    if (!user) return;

    try {
      const response = await authService.getCurrentUser();
      if (response.data) {
        await transformAndSetUser(response.data);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
      throw error;
    }
  };

  // Car management methods
  const addCar = async (carData: Omit<Car, 'id'>) => {
    if (!user) return;

    try {
      console.log('🚗 UserContext: Adding car to Strapi', {
        carData,
        userId: user.id,
        currentToken: localStorage.getItem('strapi_jwt') ? 'Present' : 'Missing'
      });
      
      const response = await carService.addCar({
        ...carData,
        owner: user.id, // Use 'owner' instead of 'user' to match schema
      });
      
      console.log('✅ UserContext: Car added successfully', response);

      if (response.data) {
        await refreshUserData();
        console.log('✅ UserContext: User data refreshed after adding car');
      }
    } catch (error) {
      console.error('❌ UserContext: Error adding car:', error);
      throw error;
    }
  };

  const updateCar = async (carId: string, updates: Partial<Car>) => {
    if (!user) return;

    try {
      const response = await carService.updateCar(parseInt(carId), updates);
      if (response.data) {
        await refreshUserData();
      }
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  };

  const editCar = async (carId: string, updates: Partial<Car>) => {
    return updateCar(carId, updates);
  };

  const deleteCar = async (carId: string) => {
    if (!user) return;

    try {
      await carService.deleteCar(parseInt(carId));
      await refreshUserData();
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  };

  const setPrimaryCar = async (carId: string) => {
    if (!user) return;

    try {
      // First, set all cars as non-primary
      const updatePromises = user.cars.map(car => 
        carService.updateCar(parseInt(car.id), { isPrimary: false })
      );
      await Promise.all(updatePromises);

      // Then set the selected car as primary
      await carService.updateCar(parseInt(carId), { isPrimary: true });
      await refreshUserData();
    } catch (error) {
      console.error('Error setting primary car:', error);
      throw error;
    }
  };

  // Address management methods
  const addAddress = async (addressData: Omit<Address, 'id'>) => {
    if (!user) return;

    try {
      const response = await addressService.addAddress({
        ...addressData,
        user: user.id,
      });

      if (response.data) {
        await refreshUserData();
      }
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };

  const updateAddress = async (addressId: string, updates: Partial<Address>) => {
    if (!user) return;

    try {
      const response = await addressService.updateAddress(parseInt(addressId), updates);
      if (response.data) {
        await refreshUserData();
      }
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };

  const deleteAddress = async (addressId: string) => {
    if (!user) return;

    try {
      await addressService.deleteAddress(parseInt(addressId));
      await refreshUserData();
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  };

  const value: UserContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    sendOtp,
    verifyOtp,
    addCar,
    updateCar,
    editCar,
    deleteCar,
    setPrimaryCar,
    cars: user?.cars || [],
    addAddress,
    updateAddress,
    deleteAddress,
    refreshUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 