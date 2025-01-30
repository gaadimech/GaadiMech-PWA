const env = {
  STRAPI_URL: import.meta.env.VITE_STRAPI_URL || '',
  getImageUrl: (path: string) => {
    const baseUrl = import.meta.env.VITE_STRAPI_URL || '';
    return `${baseUrl}${path}`;
  }
};

export default env; 