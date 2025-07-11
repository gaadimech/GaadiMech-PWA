import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (carId: string, updates: Partial<Car>) => void;
  editCar: (carId: string, updates: Partial<Car>) => void;
  deleteCar: (carId: string) => void;
  setPrimaryCar: (carId: string) => void;
  cars: Car[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (addressId: string, updates: Partial<Address>) => void;
  deleteAddress: (addressId: string) => void;
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

  // Load user data from localStorage on app start
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem('gaadimech_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('gaadimech_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Save user data to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('gaadimech_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gaadimech_user');
    }
  }, [user]);

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