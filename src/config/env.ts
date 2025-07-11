const env = {
  IS_PROD: import.meta.env.PROD,
  // Meta Conversion API Configuration
  META_PIXEL_ID: import.meta.env.VITE_META_PIXEL_ID || '676578768042046',
  // SECURITY CRITICAL: Remove hardcoded token! This should ONLY come from environment variables
  META_ACCESS_TOKEN: import.meta.env.VITE_META_ACCESS_TOKEN || '',
  META_API_VERSION: import.meta.env.VITE_META_API_VERSION || 'v21.0',
};

// SECURITY WARNING: Check for hardcoded sensitive values
if (env.IS_PROD && !import.meta.env.VITE_META_ACCESS_TOKEN) {
  console.error('🚨 SECURITY ERROR: META_ACCESS_TOKEN not set in production environment!');
}

export default env; 