-- Migration script to add lead_type column to existing leads table
-- Run this in your Supabase SQL editor if you already have the leads table

-- Add the lead_type column to existing leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'buyer' CHECK (lead_type IN ('buyer', 'seller'));

-- Update existing leads to have a default lead_type if they don't have one
UPDATE leads SET lead_type = 'buyer' WHERE lead_type IS NULL;

-- Add comment to the column
COMMENT ON COLUMN leads.lead_type IS 'Type of lead: buyer (looking to purchase) or seller (looking to sell)';

-- Verify the column was added
SELECT column_name, data_type, column_default, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'lead_type';