interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageFormats {
  large: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  thumbnail: ImageFormat;
}

interface BlogImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface BlogSEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaRobots: string;
  metaImage: BlogImage | null;
}

// Interface for the raw Strapi response
export interface RawBlogPostAttributes {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  pub_at?: string;
  published_at?: string;
  featuredImage: BlogImage | null;
  seo: BlogSEO | null;
}

// Interface for the transformed data used in the application
export interface BlogPostAttributes {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage: {
    url: string;
    // other image properties as needed
  } | null;
  seo: {
    id: number;
    metaTitle: string;
    metaDescription: string;
    metaRobots: string;
    metaImage: null | {
      id: number;
      url: string;
    };
  } | null;
}

export interface StrapiResponse<T> {
  data: Array<T>;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleStrapiResponse<T> {
  data: T;
}