const env = {
  STRAPI_URL: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337',
  STRAPI_API_TOKEN: import.meta.env.VITE_STRAPI_API_TOKEN,
  IS_PROD: import.meta.env.PROD,
};

// Validate required env vars
const requiredEnvVars = ['STRAPI_API_TOKEN'] as const;
requiredEnvVars.forEach((envVar) => {
  if (!env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export default env; 