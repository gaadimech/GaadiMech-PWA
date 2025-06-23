const env = {
  STRAPI_URL: import.meta.env.VITE_API_URL || 'http://localhost:1337',
  STRAPI_API_TOKEN: import.meta.env.VITE_API_TOKEN,
  IS_PROD: import.meta.env.PROD,
  // Meta Conversion API Configuration
  META_PIXEL_ID: import.meta.env.VITE_META_PIXEL_ID || '676578768042046',
  META_ACCESS_TOKEN: import.meta.env.VITE_META_ACCESS_TOKEN || 'EAAOTjy7ZBOysBO628LxD8FoWmmRHJkOfQdO8HqZC16BmFIsn4NO8uSIlVVslVBOYpUsr2R7ZCOYbaWPgeUv4p53rVVbmiJEDXKsbzi9BMcxmysIn9gMsz1Lb9eUOvmsRiOIcIybZAoyZBaikMiTkdCZAWYRZBzOc3kZCrRtHFkxViXo4LcroEu9mTuxzd95VMwZDZD',
  META_API_VERSION: import.meta.env.VITE_META_API_VERSION || 'v21.0',
};

// Validate required env vars
const requiredEnvVars = ['STRAPI_API_TOKEN'] as const;
requiredEnvVars.forEach((envVar) => {
  if (!env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export default env; 