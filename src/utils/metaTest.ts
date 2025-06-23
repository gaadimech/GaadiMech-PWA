// Meta Conversion API Test Utility
import env from '../config/env';

export const testMetaConversionApi = async () => {
  console.log('🧪 Testing Meta Conversion API Configuration...');
  
  // Test 1: Check environment variables
  console.log('📋 Environment Check:');
  console.log('  Pixel ID:', env.META_PIXEL_ID ? '✅ Set' : '❌ Missing');
  console.log('  Access Token:', env.META_ACCESS_TOKEN ? '✅ Set' : '❌ Missing');
  console.log('  API Version:', env.META_API_VERSION);
  
  // Debug: Show actual values (first few characters only for security)
  console.log('🔍 Debug Values:');
  console.log('  Pixel ID Value:', env.META_PIXEL_ID);
  console.log('  Access Token (first 20 chars):', env.META_ACCESS_TOKEN ? env.META_ACCESS_TOKEN.substring(0, 20) + '...' : 'None');
  console.log('  Access Token Length:', env.META_ACCESS_TOKEN ? env.META_ACCESS_TOKEN.length : 0);
  
  if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN) {
    console.error('❌ Missing required environment variables');
    return false;
  }
  
  // Test 2: Test access token validity with a simple Graph API call
  const testUrl = `https://graph.facebook.com/me?access_token=${env.META_ACCESS_TOKEN}`;
  
  try {
    console.log('🌐 Testing access token validity...');
    const response = await fetch(testUrl);
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Access token is valid');
      console.log('📊 Token info:', result);
      return true;
    } else {
      console.error('❌ Access token validation failed:', {
        status: response.status,
        statusText: response.statusText,
        error: result
      });
      
      // Try alternative test - check if it's a server access token
      if (result.error && result.error.code === 190) {
        console.log('🔄 Trying server access token validation...');
        return await testServerAccessToken();
      }
      
      return false;
    }
  } catch (error) {
    console.error('❌ Network error during token test:', error);
    return false;
  }
};

// Alternative test for server access tokens
const testServerAccessToken = async () => {
  try {
    // For server access tokens, we test by trying to get app info
    const appTestUrl = `https://graph.facebook.com/app?access_token=${env.META_ACCESS_TOKEN}`;
    const response = await fetch(appTestUrl);
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Server access token is valid');
      console.log('📊 App info:', result);
      return true;
    } else {
      console.error('❌ Server access token test failed:', result);
      return false;
    }
  } catch (error) {
    console.error('❌ Server token test error:', error);
    return false;
  }
};

// Test payload structure
export const testEventPayload = () => {
  const samplePayload = {
    data: [{
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: {
        client_user_agent: navigator.userAgent
      }
    }]
  };
  
  console.log('📦 Sample payload structure:', JSON.stringify(samplePayload, null, 2));
  return samplePayload;
}; 