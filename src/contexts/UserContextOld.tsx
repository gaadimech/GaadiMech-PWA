import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, userService, carService, addressService, orderService, analyticsService } from '../services/api';

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
}

export interface Order {
  id: string;
  services: string[];
  carDetails: string;
  date: string;
  status: 'completed' | 'ongoing' | 'cancelled';
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
        if (token) {
          const response = await authService.getCurrentUser();
          if (response.data) {
            await transformAndSetUser(response.data);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Clear invalid token
        localStorage.removeItem('strapi_jwt');
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
        cars: carsResponse.data || [],
        addresses: addressesResponse.data || [],
        orders: ordersResponse.data || [],
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

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gaadimech_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addCar = (carData: Omit<Car, 'id'>) => {
    if (user) {
      const newCar: Car = {
        ...carData,
        id: Date.now().toString(),
      };
      
      // If this is the first car, make it primary
      if (user.cars.length === 0) {
        newCar.isPrimary = true;
      }
      
      setUser({
        ...user,
        cars: [...user.cars, newCar],
      });
    }
  };

  const updateCar = (carId: string, updates: Partial<Car>) => {
    if (user) {
      const updatedCars = user.cars.map(car => {
        if (car.id === carId) {
          return { ...car, ...updates };
        }
        return car;
      });

      // If setting a car as primary, remove primary from others
      if (updates.isPrimary) {
        updatedCars.forEach(car => {
          if (car.id !== carId) {
            car.isPrimary = false;
          }
        });
      }

      setUser({
        ...user,
        cars: updatedCars,
      });
    }
  };

  const editCar = (carId: string, updates: Partial<Car>) => {
    if (user) {
      const updatedCars = user.cars.map(car => {
        if (car.id === carId) {
          return { ...car, ...updates };
        }
        return car;
      });
      setUser({
        ...user,
        cars: updatedCars,
      });
    }
  };

  const deleteCar = (carId: string) => {
    if (user) {
      const updatedCars = user.cars.filter(car => car.id !== carId);
      
      // If deleted car was primary and there are other cars, make the first one primary
      const deletedCar = user.cars.find(car => car.id === carId);
      if (deletedCar?.isPrimary && updatedCars.length > 0) {
        updatedCars[0].isPrimary = true;
      }

      setUser({
        ...user,
        cars: updatedCars,
      });
    }
  };

  const setPrimaryCar = (carId: string) => {
    if (user) {
      const updatedCars = user.cars.map(car => ({
        ...car,
        isPrimary: car.id === carId,
      }));
      setUser({
        ...user,
        cars: updatedCars,
      });
    }
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (user) {
      const newAddress: Address = {
        ...addressData,
        id: Date.now().toString(),
      };
      
      // If this is the first address, make it primary
      if (user.addresses.length === 0) {
        newAddress.isPrimary = true;
      }
      
      setUser({
        ...user,
        addresses: [...user.addresses, newAddress],
      });
    }
  };

  const updateAddress = (addressId: string, updates: Partial<Address>) => {
    if (user) {
      const updatedAddresses = user.addresses.map(address => {
        if (address.id === addressId) {
          return { ...address, ...updates };
        }
        return address;
      });

      // If setting an address as primary, remove primary from others
      if (updates.isPrimary) {
        updatedAddresses.forEach(address => {
          if (address.id !== addressId) {
            address.isPrimary = false;
          }
        });
      }

      setUser({
        ...user,
        addresses: updatedAddresses,
      });
    }
  };

  const deleteAddress = (addressId: string) => {
    if (user) {
      const updatedAddresses = user.addresses.filter(address => address.id !== addressId);
      
      // If deleted address was primary and there are other addresses, make the first one primary
      const deletedAddress = user.addresses.find(address => address.id === addressId);
      if (deletedAddress?.isPrimary && updatedAddresses.length > 0) {
        updatedAddresses[0].isPrimary = true;
      }

      setUser({
        ...user,
        addresses: updatedAddresses,
      });
    }
  };

  const value: UserContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    addCar,
    updateCar,
    editCar,
    deleteCar,
    setPrimaryCar,
    cars: user?.cars || [],
    addAddress,
    updateAddress,
    deleteAddress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}; 