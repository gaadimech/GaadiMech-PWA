import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    try {
      const { query } = ctx;
      
      // Add debug logging
      strapi.log.debug('Incoming articles query:', query);
      
      // Log slug query specifically if present
      if (query.filters && query.filters.slug && query.filters.slug.$eq) {
        strapi.log.info(`Searching for article with slug: ${query.filters.slug.$eq}`);
      }
      
      const sanitizedQuery = {
        ...query,
        populate: {
          featuredImage: true,
          seo: {
            populate: {
              metaImage: true
            }
          },
        },
      };

      // Use entityService instead of super
      const entries = await strapi.entityService.findMany('api::article.article', sanitizedQuery);

      // Log more details about the search results
      if (entries.length === 0) {
        strapi.log.warn('No articles found for query:', query);
        
        // If searching by slug and no results found, log all available slugs to help debug
        if (query.filters && query.filters.slug && query.filters.slug.$eq) {
          const allArticles = await strapi.entityService.findMany('api::article.article', {
            fields: ['id', 'slug', 'title'],
          });
          
          strapi.log.info('Available article slugs:');
          allArticles.forEach(article => {
            strapi.log.info(`- ${article.id}: ${article.slug} (${article.title})`);
          });
        }
      } else {
        strapi.log.info(`Found ${entries.length} articles`);
        
        // If searching for a specific slug, log the matching article details
        if (query.filters && query.filters.slug && query.filters.slug.$eq) {
          const slugSearched = query.filters.slug.$eq;
          entries.forEach(entry => {
            strapi.log.info(`Match found for slug "${slugSearched}": Article ID ${entry.id}, Title: "${entry.title}"`);
          });
        }
      }

      // Format the response using the transformResponse utility
      const sanitizedEntries = await this.sanitizeOutput(entries, ctx);
      
      return this.transformResponse(sanitizedEntries);
      
    } catch (error) {
      strapi.log.error('Error fetching articles:', error);
      throw error;
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    strapi.log.debug(`Finding article with ID: ${id}, query:`, query);

    const sanitizedQuery = {
      ...query,
      populate: {
        featuredImage: true,
        seo: {
          populate: ['metaImage'],
        },
      },
    };

    ctx.query = sanitizedQuery;
    const response = await super.findOne(ctx);
    
    if (!response.data) {
      strapi.log.warn(`No article found with ID: ${id}`);
    } else {
      strapi.log.info(`Found article with ID: ${id}, Title: "${response.data.attributes.title}"`);
    }
    
    return response;
  },
})); 