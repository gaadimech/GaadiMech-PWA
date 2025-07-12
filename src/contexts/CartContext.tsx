import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';
import { apiClient } from '../services/api';

// Define interfaces
export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  duration?: string;
  details?: string[];
}

export interface DoorstepService {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

export interface CartItem {
  id: string;
  serviceId: string;
  type: 'regular' | 'doorstep';
  service: ServiceCard | DoorstepService;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedVehicle?: any;
}

export interface CartSummary {
  items: CartItem[];
  isEmpty: boolean;
  itemCount: number;
  serviceCount: number;
  subtotal: number;
  discount: number;
  total: number;
}

export interface CartContextType {
  cartSummary: CartSummary;
  addRegularService: (serviceId: string, serviceType: string, service: ServiceCard, unitPrice: number, selectedVehicle?: any) => void;
  addDoorstepService: (serviceId: string, service: DoorstepService, unitPrice: number) => void;
  removeItem: (serviceId: string, type: 'regular' | 'doorstep') => void;
  updateQuantity: (serviceId: string, type: 'regular' | 'doorstep', quantity: number) => void;
  clearCart: () => void;
  refreshCartFromStorage: () => void;
  isInCart: (serviceId: string, type: 'regular' | 'doorstep') => boolean;
  getItemQuantity: (serviceId: string, type: 'regular' | 'doorstep') => number;
}

interface BackendCartItem {
  serviceId: string;
  type: 'regular' | 'doorstep';
  service: ServiceCard | DoorstepService;
  quantity: number;
  unitPrice: number;
  selectedVehicle?: any;
}

interface BackendCart {
  id: number;
  user: number;
  items: BackendCartItem[];
  status: 'active' | 'cleared' | 'completed';
  lastModifiedAt: string;
}

interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

interface BackendResponse<T> {
  data: StrapiDataItem<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const CART_STORAGE_KEY = 'gaaditech_cart_v2'; // New key to avoid conflicts

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, isAuthenticated } = useUser();

  // Function to load cart from session storage
  const loadCartFromSession = () => {
    try {
      const savedCart = sessionStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('📦 CartProvider: Loaded cart from session storage:', parsedCart);
        setCartItems(parsedCart);
      } else {
        console.log('📪 CartProvider: No cart found in session storage');
        setCartItems([]);
      }
    } catch (error) {
      console.error('❌ CartProvider: Error loading cart from session storage:', error);
      setCartItems([]);
    }
  };

  // Load cart from backend or session on mount and when user changes
  useEffect(() => {
    const loadCart = async () => {
      console.log('🔄 CartProvider: Loading cart...', {
        isAuthenticated,
        userId: user?.id,
        isLoaded
      });
      
      if (isAuthenticated && user?.id) {
        console.log('👤 CartProvider: User authenticated, loading from backend');
        try {
          const response = await apiClient.get<{ data: any }>(`/carts?filters[user][id][$eq]=${user.id}&filters[isActive][$eq]=true&sort=lastModifiedAt:desc&limit=1&populate=*`);
          // Our custom Strapi controller for /carts returns a *single* cart object (or null)
          // whereas Strapi's default controller returns an array wrapped in data[].
          // To stay future-proof we gracefully handle both possibilities here.

          const backendCartRaw = (response as any).data;

          const backendCart = Array.isArray(backendCartRaw)
            ? backendCartRaw[0] ?? null
            : backendCartRaw;

          if (backendCart) {
            const transformedItems = (backendCart.items || []).map((item: BackendCartItem) => {
              const numericUnit = typeof item.unitPrice === 'string' ? parseFloat(item.unitPrice) : item.unitPrice;
              return {
                ...item,
                unitPrice: numericUnit,
                totalPrice: numericUnit * item.quantity,
              } as CartItem;
            });
            setCartItems(transformedItems);
            console.log('✅ CartProvider: Loaded cart from backend:', transformedItems);
          } else {
            console.log('📭 CartProvider: No active cart found in backend, loading from session');
            loadCartFromSession();
          }
        } catch (error) {
          console.error('❌ CartProvider: Error loading cart from backend, falling back to session:', error);
          loadCartFromSession();
        }
      } else {
        console.log('🔄 CartProvider: User not authenticated, loading from session');
        loadCartFromSession();
      }
      
      setIsLoaded(true);
    };

    if (!isLoaded) {
      loadCart();
    }
  }, [isAuthenticated, user?.id, isLoaded]);

  // Save cart to both session storage and backend whenever items change
  useEffect(() => {
    if (isLoaded) {
      console.log('💾 Saving cart to session storage and backend:', cartItems);
      
      // Always save to session storage for offline access
      try {
        sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        console.log('✅ Cart saved successfully to session storage');
      } catch (error) {
        console.error('❌ Error saving cart to session storage:', error);
      }

      // Save to backend if user is authenticated
      if (isAuthenticated && user?.id && cartItems.length > 0) {
        saveCartToBackend().catch(error => {
          console.error('❌ Error saving cart to backend:', error);
        });
      }
    }
  }, [cartItems, isLoaded, isAuthenticated, user?.id]);

  // Function to save cart to backend
  const saveCartToBackend = async () => {
    if (!user?.id || cartItems.length === 0) return;

    try {
      console.log('🔄 Saving cart to backend...');
      
      const cartData = {
        sessionId: `cart_${user.id}_${Date.now()}`,
        items: cartItems,
        totalItems: cartItems.length,
        totalQuantity: cartItems.reduce((total, item) => total + item.quantity, 0),
        subtotal: cartItems.reduce((total, item) => total + item.totalPrice, 0),
        totalAmount: cartItems.reduce((total, item) => total + item.totalPrice, 0),
        user: user.id,
        isActive: true,
        lastModifiedAt: new Date(),
      };

      // Check if cart exists
      const existingCartResponse = await apiClient.get(`/carts?filters[user][id][$eq]=${user.id}&filters[isActive][$eq]=true&limit=1`);

      const existingCartRaw = (existingCartResponse as any).data;
      const existingCart = Array.isArray(existingCartRaw) ? existingCartRaw[0] : existingCartRaw;

      if (existingCart) {
        // Update existing cart
        await apiClient.put(`/carts/${existingCart.id}`, { data: cartData });
        console.log('✅ Cart updated in backend');
      } else {
        // Create new cart
        await apiClient.post('/carts', { data: cartData });
        console.log('✅ Cart created in backend');
      }
    } catch (error) {
      console.error('❌ Error saving cart to backend:', error);
    }
  };

  // Calculate cart summary
  const cartSummary: CartSummary = React.useMemo(() => {
    console.log('🧮 Calculating cart summary for items:', cartItems);
    
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const serviceCount = cartItems.length;
    const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    
    // Calculate discounts
    let discount = 0;
    if (serviceCount >= 3) {
      discount = Math.floor(subtotal * 0.05); // 5% discount for 3+ services
    }
    
    const total = subtotal - discount;

    const summary = {
      items: cartItems,
      isEmpty: cartItems.length === 0,
      itemCount,
      serviceCount,
      subtotal,
      discount,
      total
    };

    console.log('📊 Cart summary calculated:', summary);
    return summary;
  }, [cartItems]);

  const addRegularService = (
    serviceId: string,
    serviceType: string,
    service: ServiceCard,
    unitPrice: number,
    selectedVehicle?: any
  ) => {
    console.log('➕ Adding regular service:', { serviceId, serviceType, unitPrice });
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.type === 'regular' && item.serviceId === serviceId
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + 1;
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity
        };
        
        console.log('✅ Updated existing item quantity to:', newQuantity);
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${serviceId}_${Date.now()}`,
          serviceId,
          type: 'regular',
          service,
          quantity: 1,
          unitPrice,
          totalPrice: unitPrice,
          selectedVehicle
        };
        
        console.log('✅ Added new item to cart:', newItem);
        return [...prevItems, newItem];
      }
    });
  };

  const addDoorstepService = (serviceId: string, service: DoorstepService, unitPrice: number) => {
    console.log('➕ Adding doorstep service:', { serviceId, unitPrice });
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.type === 'doorstep' && item.serviceId === serviceId
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + 1;
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity
        };
        
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${serviceId}_${Date.now()}`,
          serviceId,
          type: 'doorstep',
          service,
          quantity: 1,
          unitPrice,
          totalPrice: unitPrice
        };
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (serviceId: string, type: 'regular' | 'doorstep') => {
    console.log('🗑️ Removing item:', { serviceId, type });
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.serviceId === serviceId && item.type === type))
    );
  };

  const updateQuantity = (serviceId: string, type: 'regular' | 'doorstep', quantity: number) => {
    console.log('🔄 Updating quantity:', { serviceId, type, quantity });
    
    if (quantity <= 0) {
      removeItem(serviceId, type);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.serviceId === serviceId && item.type === type) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity
          };
        }
        return item;
      })
    );
  };

  const clearCart = async () => {
    console.log('🧹 Clearing cart');
    setCartItems([]);
    
    // Also clear cart in backend if authenticated
    if (isAuthenticated && user?.id) {
      try {
        const response = await apiClient.get(`/carts?filters[user][id][$eq]=${user.id}&filters[isActive][$eq]=true&limit=1`);

        const backendCartRaw = (response as any).data;
        const backendCart = Array.isArray(backendCartRaw) ? backendCartRaw[0] : backendCartRaw;

        if (backendCart) {
          await apiClient.put(`/carts/${backendCart.id}`, {
            data: {
              isActive: false,
              status: 'cleared' as const,
              lastModifiedAt: new Date()
            }
          });
        }
      } catch (error) {
        console.error('❌ Error clearing cart in backend:', error);
      }
    }
  };

  const refreshCartFromStorage = async () => {
    console.log('🔄 Manually refreshing cart...');
    if (isAuthenticated && user?.id) {
      try {
        const response = await apiClient.get(`/carts?filters[user][id][$eq]=${user.id}&filters[isActive][$eq]=true&limit=1&populate=*`);

        const backendCartRaw = (response as any).data;
        const backendCart = Array.isArray(backendCartRaw) ? backendCartRaw[0] : backendCartRaw;

        if (backendCart && backendCart.items) {
          const transformedItems = backendCart.items.map((item: BackendCartItem) => {
            const numericUnit = typeof item.unitPrice === 'string' ? parseFloat(item.unitPrice) : item.unitPrice;
            return {
              serviceId: item.serviceId,
              type: item.type,
              service: item.service,
              quantity: item.quantity,
              unitPrice: numericUnit,
              totalPrice: numericUnit * item.quantity,
              selectedVehicle: item.selectedVehicle,
            } as CartItem;
          });
          setCartItems(transformedItems);
          console.log('✅ Cart refreshed from backend');
        } else {
          setCartItems([]);
          console.log('📭 No active cart found during refresh');
        }
      } catch (error) {
        console.error('❌ Error refreshing cart:', error);
      }
    } else {
      setCartItems([]);
      console.log('👤 User not authenticated, cleared cart');
    }
  };

  const isInCart = (serviceId: string, type: 'regular' | 'doorstep') => {
    return cartItems.some(item => item.serviceId === serviceId && item.type === type);
  };

  const getItemQuantity = (serviceId: string, type: 'regular' | 'doorstep') => {
    const item = cartItems.find(item => item.serviceId === serviceId && item.type === type);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartSummary,
        addRegularService,
        addDoorstepService,
        removeItem,
        updateQuantity,
        clearCart,
        refreshCartFromStorage,
        isInCart,
        getItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 