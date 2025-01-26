/*
  # Lead Capture Tables

  1. New Tables
    - `popup_leads`
      - `id` (uuid, primary key)
      - `name` (text)
      - `mobile` (text)
      - `car` (text)
      - `created_at` (timestamptz)
      
    - `contact_leads`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for inserting data
*/

-- Popup Leads Table
CREATE TABLE IF NOT EXISTS popup_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mobile text NOT NULL,
  car text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE popup_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert popup leads
CREATE POLICY "Allow anonymous insert to popup_leads"
  ON popup_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Contact Leads Table
CREATE TABLE IF NOT EXISTS contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert contact leads
CREATE POLICY "Allow anonymous insert to contact_leads"
  ON contact_leads
  FOR INSERT
  TO public
  WITH CHECK (true);