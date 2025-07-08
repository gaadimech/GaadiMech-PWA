// Cart functionality for GaadiMech Doorstep Services
import React from 'react';
import { getServiceById, formatPrice } from '../data-doorstep/doorstepServicesData';

// Storage key for cart persistence
const CART_STORAGE_KEY = 'gaaditech_doorstep_cart';

// Cart state management
export class DoorstepCart {
  constructor() {
    this.items = this.loadCartFromStorage();
    this.listeners = [];
  }

  // Load cart from localStorage
  loadCartFromStorage() {
    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  // Save cart to localStorage
  saveCartToStorage() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  // Add listener for cart changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of cart changes
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.items));
  }

  // Add item to cart
  addItem(serviceId, quantity = 1) {
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
  removeItem(serviceId) {
    this.items = this.items.filter(item => item.serviceId !== serviceId);
    this.saveCartToStorage();
  }

  // Update item quantity
  updateQuantity(serviceId, quantity) {
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
  getItemDetails(serviceId) {
    const cartItem = this.items.find(item => item.serviceId === serviceId);
    if (!cartItem) return null;

    const service = getServiceById(serviceId);
    if (!service) return null;

    return {
      ...cartItem,
      service,
      unitPrice: service.discountPrice || service.price,
      totalPrice: (service.discountPrice || service.price) * cartItem.quantity
    };
  }

  // Get all cart items with details
  getCartDetails() {
    return this.items.map(item => this.getItemDetails(item.serviceId)).filter(Boolean);
  }

  // Check if item is in cart
  isInCart(serviceId) {
    return this.items.some(item => item.serviceId === serviceId);
  }

  // Get item quantity
  getItemQuantity(serviceId) {
    const item = this.items.find(item => item.serviceId === serviceId);
    return item ? item.quantity : 0;
  }

  // Get cart summary
  getCartSummary() {
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
  clearCart() {
    this.items = [];
    this.saveCartToStorage();
  }

  // Get cart items for checkout (Razorpay format)
  getCheckoutData() {
    const summary = this.getCartSummary();
    
    return {
      amount: summary.total,
      currency: 'INR',
      items: summary.items.map(item => ({
        name: item.service.title,
        description: item.service.description,
        quantity: item.quantity,
        price: item.unitPrice
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
export const addToCart = (serviceId, quantity = 1) => {
  return doorstepCart.addItem(serviceId, quantity);
};

export const removeFromCart = (serviceId) => {
  doorstepCart.removeItem(serviceId);
};

export const updateCartQuantity = (serviceId, quantity) => {
  doorstepCart.updateQuantity(serviceId, quantity);
};

export const getCartSummary = () => {
  return doorstepCart.getCartSummary();
};

export const isInCart = (serviceId) => {
  return doorstepCart.isInCart(serviceId);
};

export const getCartItemCount = () => {
  const summary = doorstepCart.getCartSummary();
  return summary.itemCount;
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
  getCartSummary,
  isInCart,
  getCartItemCount,
  clearCart,
  useCart
}; 