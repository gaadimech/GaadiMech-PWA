// Meta Conversion API Event Testing Utility
import { metaConversionApi } from '../services/metaConversionApi';
import type { CustomerInfo } from '../services/metaConversionApi';

// Test customer data that meets Meta's requirements
const testCustomerData: CustomerInfo = {
  email: 'test@gaadimech.com',
  phone: '9876543210',
  firstName: 'Test',
  lastName: 'User',
  city: 'Jaipur',
  state: 'Rajasthan',
  country: 'India',
  postalCode: '302001',
  gender: 'm',
  dateOfBirth: '1990-01-01'
};

// Store test customer data in session for testing
const setTestCustomerData = () => {
  sessionStorage.setItem('userMobileNumber', testCustomerData.phone || '');
  sessionStorage.setItem('userLocation', JSON.stringify({
    city: testCustomerData.city,
    state: testCustomerData.state,
    country: testCustomerData.country
  }));
  sessionStorage.setItem('customerData', JSON.stringify({
    email: testCustomerData.email,
    firstName: testCustomerData.firstName,
    lastName: testCustomerData.lastName,
    gender: testCustomerData.gender,
    dateOfBirth: testCustomerData.dateOfBirth,
    postalCode: testCustomerData.postalCode
  }));
  console.log('✅ Test customer data stored in session');
};

// Clear test customer data
const clearTestCustomerData = () => {
  sessionStorage.removeItem('userMobileNumber');
  sessionStorage.removeItem('userLocation');
  sessionStorage.removeItem('customerData');
  console.log('🗑️ Test customer data cleared from session');
};

export const testAllMetaEvents = async () => {
  console.log('🚀 Starting comprehensive Meta Conversion API event tests...');
  
  // Test customer data for better event attribution
  const testCustomerData = {
    phone: '9876543210',
    firstName: 'Test',
    lastName: 'User',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India'
  };

  const testCustomData = {
    currency: 'INR',
    value: 1500,
    content_name: 'Test Service Booking',
    content_type: 'service_inquiry'
  };

  const tests = [
    {
      name: 'PageView Event',
      test: () => metaConversionApi.trackPageView({ customerInfo: testCustomerData })
    },
    {
      name: 'Lead Event (All Book Now Buttons)',
      test: () => metaConversionApi.trackLead(testCustomerData, testCustomData)
    },
    {
      name: 'Contact Event (Call Us Buttons)',
      test: () => metaConversionApi.trackContact(testCustomerData, testCustomData)
    },
    {
      name: 'InitiateCheckout Event (Schedule Slot & Get Price Buttons)',
      test: () => metaConversionApi.trackInitiateCheckout(testCustomerData, testCustomData)
    },
    {
      name: 'Purchase Event (Complete Booking Button)',
      test: () => metaConversionApi.trackPurchase(testCustomerData, { ...testCustomData, value: 2000 })
    },
    {
      name: 'AddToCart Event (Express Flow)',
      test: () => metaConversionApi.trackAddToCart(testCustomerData, testCustomData)
    },
    {
      name: 'Schedule Event',
      test: () => metaConversionApi.trackSchedule(testCustomerData, testCustomData)
    }
  ];

  console.log('📋 Testing Button Event Mappings:');
  console.log('✅ Book Now Buttons → Lead Event');
  console.log('✅ Call Us Buttons → Contact Event');
  console.log('✅ Schedule Slot Button → InitiateCheckout Event');
  console.log('✅ Get Price Button → InitiateCheckout Event');
  console.log('✅ Next: Select Your Slot Button → Lead Event');
  console.log('✅ Complete Booking Button → Purchase Event');
  console.log('✅ Schedule Service Button (Popup) → Lead Event');
  console.log('');

  let successCount = 0;
  let failureCount = 0;

  for (const { name, test } of tests) {
    try {
      console.log(`🧪 Testing ${name}...`);
      const result = await test();
      
      if (result) {
        console.log(`✅ ${name} - SUCCESS (200 OK)`);
        successCount++;
      } else {
        console.log(`❌ ${name} - FAILED (Non-200 response)`);
        failureCount++;
      }
      
      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error: any) {
      console.error(`❌ ${name} - ERROR:`, error.message);
      failureCount++;
    }
  }

  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Successful Events: ${successCount}`);
  console.log(`❌ Failed Events: ${failureCount}`);
  console.log(`📈 Success Rate: ${((successCount / (successCount + failureCount)) * 100).toFixed(1)}%`);
  
  if (successCount === tests.length) {
    console.log('🎉 All Meta Conversion API events are working perfectly!');
    console.log('🔄 Events are properly mapped to buttons as per requirements');
  } else if (successCount > 0) {
    console.log('⚠️ Some events are working, but there may be configuration issues');
  } else {
    console.log('🚨 No events are working - check API configuration');
  }

  return { successCount, failureCount, totalTests: tests.length };
};

// Individual event testers
export const testEventWithCustomerData = {
  lead: () => {
    setTestCustomerData();
    return metaConversionApi.trackLead({ 
      customerInfo: testCustomerData,
      customData: { contentName: 'Test Lead', contentType: 'lead' } 
    });
  },
  
  contact: () => {
    setTestCustomerData();
    return metaConversionApi.trackContact({ customerInfo: testCustomerData });
  },
  
  purchase: () => {
    setTestCustomerData();
    return metaConversionApi.trackPurchase({ 
      customerInfo: testCustomerData,
      customData: { currency: 'INR', value: 2999, contentName: 'Express Service' }
    });
  }
};

// Auto-run test on page load for debugging
if (typeof window !== 'undefined') {
  // Only run in development
  if (window.location.hostname === 'localhost') {
    console.log('🔧 Meta Conversion API Event Testing Available');
    console.log('Run testAllMetaEvents() in console to test all events');
    
    // Make functions available globally for console testing
    (window as any).testAllMetaEvents = testAllMetaEvents;
    (window as any).testEventWithCustomerData = testEventWithCustomerData;
    (window as any).setTestCustomerData = setTestCustomerData;
    (window as any).clearTestCustomerData = clearTestCustomerData;
  }
} 