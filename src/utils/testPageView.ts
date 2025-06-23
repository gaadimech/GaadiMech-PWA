// Test utility for PageView events with customer data
import { metaConversionApi } from '../services/metaConversionApi';

// Function to simulate user providing phone number (like in booking flow)
export const simulateUserWithPhone = (phoneNumber: string = '9876543210') => {
  sessionStorage.setItem('userMobileNumber', phoneNumber);
  sessionStorage.setItem('userLocation', JSON.stringify({
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India'
  }));
  console.log('✅ Simulated user with phone number and location');
};

// Function to test PageView with customer data
export const testPageViewWithCustomerData = async () => {
  console.log('🧪 Testing PageView with customer data...');
  
  // Simulate user providing phone number
  simulateUserWithPhone();
  
  // Now try PageView tracking
  const success = await metaConversionApi.trackPageView({
    eventSourceUrl: window.location.href
  });
  
  if (success) {
    console.log('✅ PageView event sent successfully with customer data!');
  } else {
    console.log('❌ PageView event failed');
  }
  
  return success;
};

// Function to clear customer data
export const clearCustomerData = () => {
  sessionStorage.removeItem('userMobileNumber');
  sessionStorage.removeItem('userLocation');
  sessionStorage.removeItem('customerData');
  console.log('🗑️ Customer data cleared');
};

// Make functions globally available for console testing
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  (window as any).simulateUserWithPhone = simulateUserWithPhone;
  (window as any).testPageViewWithCustomerData = testPageViewWithCustomerData;
  (window as any).clearCustomerData = clearCustomerData;
  
  console.log('🔧 PageView test functions available:');
  console.log('- simulateUserWithPhone() - Add test customer data');
  console.log('- testPageViewWithCustomerData() - Test PageView with data');
  console.log('- clearCustomerData() - Remove test data');
} 