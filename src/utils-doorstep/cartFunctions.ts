// Cart functionality for GaadiMech Doorstep Services
import React from 'react';
import { getServiceById, formatPrice, DoorstepService } from '../data-doorstep/doorstepServicesData';

// Storage key for cart persistence
const CART_STORAGE_KEY = 'gaaditech_doorstep_cart';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

interface CartItem {
  serviceId: string;
  quantity: number;
  addedAt: string;
}

interface CartSummaryItem {
  serviceId: string;
  service: DoorstepService;
  quantity: number;
  totalPrice: number;
  addedAt: string;
}

interface CartSummary {
  items: CartSummaryItem[];
  itemCount: number;
  serviceCount: number;
  subtotal: number;
  discount: number;
  total: number;
  isEmpty: boolean;
}

type CartListener = (items: CartItem[]) => void;

// Cart state management
export class DoorstepCart {
  private items: CartItem[];
  private listeners: CartListener[];
  private sessionId: string;

  constructor() {
    this.items = this.loadCartFromStorage();
    this.listeners = [];
    this.sessionId = this.generateSessionId();
    this.syncWithBackend(); // Initial sync
  }

  // Generate a unique session ID
  private generateSessionId(): string {
    return 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Load cart from localStorage
  public loadCartFromStorage(): CartItem[] {
    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  // Save cart to localStorage and sync with backend
  private async saveCartToStorage(): Promise<void> {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      await this.syncWithBackend();
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // Sync cart with backend
  public async syncWithBackend(): Promise<void> {
    try {
      const token = localStorage.getItem('strapi_jwt');
      if (!token) return; // Don't sync if not authenticated

      const cartSummary = this.getCartSummary();
      
      const response = await fetch(`${API_URL}/api/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            sessionId: this.sessionId,
            cartType: 'doorstep_services',
            items: this.items,
            totalItems: cartSummary.itemCount,
            totalQuantity: cartSummary.serviceCount,
            subtotal: cartSummary.subtotal,
            discountAmount: cartSummary.discount,
            totalAmount: cartSummary.total,
            status: 'active',
            isActive: true,
            lastModifiedAt: new Date(),
            source: 'website'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to sync cart with backend');
      }
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  }

  // Load cart from backend
  public async loadFromBackend(): Promise<any> {
    try {
      const token = localStorage.getItem('strapi_jwt');
      if (!token) return null;

      const response = await fetch(`${API_URL}/api/carts?filters[isActive][$eq]=true`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load cart from backend');
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const backendCart = data.data[0];
        this.items = backendCart.attributes.items || [];
        this.sessionId = backendCart.attributes.sessionId;
        this.saveCartToStorage(); // Update local storage
        return backendCart;
      }
      return null;
    } catch (error) {
      console.error('Error loading cart from backend:', error);
      return null;
    }
  }

  // Add listener for cart changes
  public addListener(callback: CartListener): void {
    this.listeners.push(callback);
  }

  // Remove listener
  public removeListener(callback: CartListener): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of cart changes
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.items));
  }

  // Add item to cart
  public addItem(serviceId: string, quantity = 1): CartSummaryItem | null {
    const service = getServiceById(serviceId);
    if (!service) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }

    const existingItemIndex = this.items.findIndex(item => item.serviceId === serviceId);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      this.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      this.items.push({
        serviceId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCartToStorage();
    return this.getItemDetails(serviceId);
  }

  // Remove item from cart
  public removeItem(serviceId: string): void {
    this.items = this.items.filter(item => item.serviceId !== serviceId);
    this.saveCartToStorage();
  }

  // Update item quantity
  public updateQuantity(serviceId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(serviceId);
      return;
    }

    const itemIndex = this.items.findIndex(item => item.serviceId === serviceId);
    if (itemIndex >= 0) {
      this.items[itemIndex].quantity = quantity;
      this.saveCartToStorage();
    }
  }

  // Get item details with service information
  public getItemDetails(serviceId: string): CartSummaryItem | null {
    const cartItem = this.items.find(item => item.serviceId === serviceId);
    if (!cartItem) return null;

    const service = getServiceById(serviceId);
    if (!service) return null;

    return {
      ...cartItem,
      service,
      totalPrice: service.price * cartItem.quantity
    };
  }

  // Get all cart items with details
  public getCartDetails(): CartSummaryItem[] {
    return this.items
      .map(item => this.getItemDetails(item.serviceId))
      .filter((item): item is CartSummaryItem => item !== null);
  }

  // Check if item is in cart
  public isInCart(serviceId: string): boolean {
    return this.items.some(item => item.serviceId === serviceId);
  }

  // Get item quantity
  public getItemQuantity(serviceId: string): number {
    const item = this.items.find(item => item.serviceId === serviceId);
    return item ? item.quantity : 0;
  }

  // Get cart summary
  public getCartSummary(): CartSummary {
    const cartDetails = this.getCartDetails();
    
    const subtotal = cartDetails.reduce((total, item) => total + item.totalPrice, 0);
    const itemCount = cartDetails.reduce((total, item) => total + item.quantity, 0);
    const serviceCount = cartDetails.length;

    // Calculate discounts (if any promotional logic needed)
    let discount = 0;
    
    // Apply bulk discount for multiple services
    if (serviceCount >= 3) {
      discount = Math.floor(subtotal * 0.05); // 5% discount for 3+ services
    }

    const total = subtotal - discount;

    return {
      items: cartDetails,
      itemCount,
      serviceCount,
      subtotal,
      discount,
      total,
      isEmpty: cartDetails.length === 0
    };
  }

  // Clear entire cart
  public clearCart(): void {
    this.items = [];
    this.saveCartToStorage();
  }

  // Get cart items for checkout (Razorpay format)
  public getCheckoutData(): any {
    const summary = this.getCartSummary();
    
    return {
      amount: summary.total,
      currency: 'INR',
      items: summary.items.map(item => ({
        name: item.service.name,
        description: item.service.description,
        quantity: item.quantity,
        price: item.service.price
      })),
      notes: {
        service_type: 'doorstep_services',
        item_count: summary.itemCount,
        service_count: summary.serviceCount
      }
    };
  }
}

// Singleton instance
export const doorstepCart = new DoorstepCart();

// Helper functions for components
export const addToCart = (serviceId: string, quantity = 1) => {
  return doorstepCart.addItem(serviceId, quantity);
};

export const removeFromCart = (serviceId: string) => {
  doorstepCart.removeItem(serviceId);
};

export const updateCartQuantity = (serviceId: string, quantity: number) => {
  doorstepCart.updateQuantity(serviceId, quantity);
};

export const isInCart = (serviceId: string) => {
  return doorstepCart.isInCart(serviceId);
};

export const getCartItemCount = () => {
  return doorstepCart.getCartSummary().itemCount;
};

export const clearCart = () => {
  doorstepCart.clearCart();
};

// Hook for React components to listen to cart changes
export const useCart = () => {
  const [cartSummary, setCartSummary] = React.useState(doorstepCart.getCartSummary());

  React.useEffect(() => {
    const updateCart = () => {
      setCartSummary(doorstepCart.getCartSummary());
    };

    doorstepCart.addListener(updateCart);
    
    return () => {
      doorstepCart.removeListener(updateCart);
    };
  }, []);

  return {
    ...cartSummary,
    addItem: addToCart,
    removeItem: removeFromCart,
    updateQuantity: updateCartQuantity,
    clearCart: clearCart,
    isInCart: isInCart
  };
};

export default {
  DoorstepCart,
  doorstepCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCartSummary: doorstepCart.getCartSummary,
  isInCart,
  getCartItemCount,
  clearCart,
  useCart
}; 