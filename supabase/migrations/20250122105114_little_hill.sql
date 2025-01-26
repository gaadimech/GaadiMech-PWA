/*
  # Update popup_leads table for service scheduling

  1. Changes
    - Add preferred_date column for scheduling
    - Add service_type column for service selection
    - Add status column for tracking booking status

  2. Security
    - Maintain existing RLS policies
*/

-- First add columns as nullable
ALTER TABLE popup_leads 
ADD COLUMN IF NOT EXISTS preferred_date date,
ADD COLUMN IF NOT EXISTS service_type text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

-- Update any existing rows with default values
UPDATE popup_leads 
SET 
  preferred_date = CURRENT_DATE,
  service_type = 'general',
  status = 'pending'
WHERE 
  preferred_date IS NULL 
  OR service_type IS NULL 
  OR status IS NULL;

-- Now make columns NOT NULL
ALTER TABLE popup_leads 
ALTER COLUMN preferred_date SET NOT NULL,
ALTER COLUMN service_type SET NOT NULL,
ALTER COLUMN status SET NOT NULL;