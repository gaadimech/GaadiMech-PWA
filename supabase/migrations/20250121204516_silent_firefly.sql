/*
  # Blog System Schema

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text) - Blog post title
      - `slug` (text) - URL-friendly version of title
      - `excerpt` (text) - Short description for previews
      - `content` (text) - Main blog content in markdown
      - `image_url` (text) - Featured image URL
      - `published` (boolean) - Whether post is public
      - `published_at` (timestamptz) - When post was published
      - `created_at` (timestamptz) - When post was created
      - `updated_at` (timestamptz) - When post was last updated
      - `meta_title` (text) - SEO title
      - `meta_description` (text) - SEO description
      - `author_id` (uuid) - Reference to auth.users

  2. Security
    - Enable RLS on blog_posts table
    - Add policies for public read access to published posts
    - Add policies for author write access
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  image_url text,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  meta_title text,
  meta_description text,
  author_id uuid REFERENCES auth.users(id)
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published posts
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published = true);

-- Policy for authors to manage their own posts
CREATE POLICY "Authors can manage own posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (author_id = auth.uid());

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();