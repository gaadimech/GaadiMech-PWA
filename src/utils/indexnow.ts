/**
 * IndexNow API Integration
 * Automatically notifies search engines when content is updated
 */

const INDEXNOW_API_KEY = '565584aa33554f82b8ad4a0eb79cc2e5';
const SITE_URL = 'https://www.gaadimech.com';

interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow API for instant indexing
 * @param urls Array of URLs to submit (without domain)
 * @returns Promise<boolean> Success status
 */
export const submitToIndexNow = async (urls: string[]): Promise<boolean> => {
  if (!urls.length) return false;
  
  // Convert relative URLs to absolute
  const fullUrls = urls.map(url => {
    if (url.startsWith('http')) return url;
    return `${SITE_URL}${url.startsWith('/') ? url : '/' + url}`;
  });

  const payload: IndexNowSubmission = {
    host: 'www.gaadimech.com',
    key: INDEXNOW_API_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_API_KEY}.txt`,
    urlList: fullUrls
  };

  try {
    // Submit to Bing IndexNow endpoint
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ IndexNow submission successful:', fullUrls.length, 'URLs');
      return true;
    } else {
      console.warn('⚠️ IndexNow submission failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ IndexNow submission error:', error);
    return false;
  }
};

/**
 * Submit a single URL for indexing
 * @param url Single URL to submit
 * @returns Promise<boolean> Success status
 */
export const submitSingleUrl = async (url: string): Promise<boolean> => {
  return submitToIndexNow([url]);
};

/**
 * Submit homepage and key pages for indexing
 * Useful for initial setup or after major updates
 */
export const submitKeyPages = async (): Promise<boolean> => {
  const keyPages = [
    '/',
    '/services',
    '/about',
    '/contact',
    '/blog',
    '/franchise',
    '/car-service-in-jaipur',
    '/car-ac-service-in-jaipur',
    '/car-repair-service-in-jaipur',
    '/90-minute-car-service-in-jaipur'
  ];

  return submitToIndexNow(keyPages);
};

/**
 * Auto-submit new blog posts or service pages
 * Call this function when new content is published
 * @param contentType Type of content ('blog' | 'service' | 'page')
 * @param slug URL slug of the new content
 */
export const submitNewContent = async (contentType: 'blog' | 'service' | 'page', slug: string): Promise<boolean> => {
  const url = contentType === 'blog' ? `/blog/${slug}` : 
              contentType === 'service' ? `/services/${slug}` : 
              `/${slug}`;
  
  console.log(`📡 Submitting new ${contentType} to IndexNow:`, url);
  return submitSingleUrl(url);
}; 