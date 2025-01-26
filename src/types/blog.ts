export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  author_id: string;
}