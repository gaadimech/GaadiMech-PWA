// Test script to verify token consistency
const { config } = require('dotenv');

// Load environment variables from .env files
config({ path: '.env.local' });
config({ path: '.env' });

console.log('Testing environment variables loading...\n');

// Use unified environment variables
const apiUrl = process.env.VITE_API_URL;
const apiToken = process.env.VITE_API_TOKEN;

console.log('📋 Environment Variables:');
console.log('VITE_API_URL:', apiUrl);
console.log('VITE_API_TOKEN length:', apiToken ? apiToken.length : 0);

console.log('\n🔍 Token Analysis:');
if (apiToken) {
  console.log('✅ Token is loaded');
  console.log('🔑 Token length:', apiToken.length);
  console.log('🔑 Expected length (256):', apiToken.length === 256 ? '✅' : '❌');
  console.log('🔑 First 50 characters:', apiToken.substring(0, 50) + '...');
} else {
  console.log('❌ Token is missing');
}

console.log('\n🌐 API URL Analysis:');
if (apiUrl) {
  console.log('✅ API URL is loaded');
  console.log('🔗 URL:', apiUrl);
  console.log('🔗 Is production URL:', apiUrl.includes('onrender.com') ? '✅' : '❌');
} else {
  console.log('❌ API URL is missing');
}

console.log('\n📊 Summary:');
console.log('All variables present:', (apiUrl && apiToken) ? '✅' : '❌');
console.log('URLs consistent:', (apiUrl.includes('onrender.com') || apiUrl.includes('localhost')) ? '✅' : '❌');
console.log('Tokens consistent:', (apiToken && apiToken.length === 256) ? '✅' : '❌'); 