// Test script to verify token consistency
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });
config({ path: '.env' });

console.log('🔧 Token Consistency Test');
console.log('========================');

const strapiApiUrl = process.env.VITE_STRAPI_API_URL;
const strapiApiToken = process.env.VITE_STRAPI_API_TOKEN;
const apiUrl = process.env.VITE_API_URL;
const apiToken = process.env.VITE_API_TOKEN;

console.log('📋 Environment Variables:');
console.log('VITE_STRAPI_API_URL:', strapiApiUrl);
console.log('VITE_STRAPI_API_TOKEN length:', strapiApiToken ? strapiApiToken.length : 0);
console.log('VITE_API_URL:', apiUrl);
console.log('VITE_API_TOKEN length:', apiToken ? apiToken.length : 0);

console.log('\n🔍 Token Comparison:');
console.log('Strapi token (first 50):', strapiApiToken ? strapiApiToken.substring(0, 50) + '...' : 'Missing');
console.log('API token (first 50):', apiToken ? apiToken.substring(0, 50) + '...' : 'Missing');
console.log('Tokens match:', strapiApiToken === apiToken ? '✅' : '❌');
console.log('Both tokens are 256 chars:', (strapiApiToken?.length === 256 && apiToken?.length === 256) ? '✅' : '❌');

console.log('\n📊 Summary:');
console.log('All variables present:', (strapiApiUrl && strapiApiToken && apiUrl && apiToken) ? '✅' : '❌');
console.log('URLs consistent:', (strapiApiUrl === apiUrl + '/api') ? '✅' : '❌');
console.log('Tokens consistent:', (strapiApiToken === apiToken) ? '✅' : '❌'); 