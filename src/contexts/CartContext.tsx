import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

const CART_STORAGE_KEY = 'gaaditech_cart_v2'; // New key to avoid conflicts

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    console.log('🔄 CartProvider: Loading cart from localStorage...');
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
        const parsedCart = JSON.parse(savedCart);
        console.log('✅ Loaded cart from storage:', parsedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } else {
        console.log('📭 No saved cart found, starting with empty cart');
        setCartItems([]);
      }
    } catch (error) {
      console.error('❌ Error loading cart from storage:', error);
      setCartItems([]);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      console.log('💾 Saving cart to localStorage:', cartItems);
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        console.log('✅ Cart saved successfully');
      } catch (error) {
        console.error('❌ Error saving cart:', error);
      }
    }
  }, [cartItems, isLoaded]);

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

  const clearCart = () => {
    console.log('🧹 Clearing cart');
    setCartItems([]);
  };

  const refreshCartFromStorage = () => {
    console.log('🔄 Manually refreshing cart from storage...');
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
        const parsedCart = JSON.parse(savedCart);
        console.log('🔄 Refreshed cart data:', parsedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } else {
        console.log('📭 No cart data to refresh');
        setCartItems([]);
      }
    } catch (error) {
      console.error('❌ Error refreshing cart:', error);
      setCartItems([]);
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