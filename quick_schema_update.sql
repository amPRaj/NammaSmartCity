-- Quick schema update to add extended fields to existing leads table
-- Run this in Supabase SQL Editor

-- Add new columns to existing leads table (using IF NOT EXISTS to avoid errors)
DO $$ 
BEGIN
    -- Add owner column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='owner') THEN
        ALTER TABLE leads ADD COLUMN owner TEXT;
    END IF;
    
    -- Add contact column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='contact') THEN
        ALTER TABLE leads ADD COLUMN contact TEXT;
    END IF;
    
    -- Add plot_no column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='plot_no') THEN
        ALTER TABLE leads ADD COLUMN plot_no TEXT;
    END IF;
    
    -- Add size column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='size') THEN
        ALTER TABLE leads ADD COLUMN size TEXT;
    END IF;
    
    -- Add direction column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='direction') THEN
        ALTER TABLE leads ADD COLUMN direction TEXT;
    END IF;
    
    -- Add price column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='price') THEN
        ALTER TABLE leads ADD COLUMN price TEXT;
    END IF;
    
    -- Add negotiable column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='negotiable') THEN
        ALTER TABLE leads ADD COLUMN negotiable TEXT;
    END IF;
    
    -- Add address column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='address') THEN
        ALTER TABLE leads ADD COLUMN address TEXT;
    END IF;
    
    -- Add landmark column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='landmark') THEN
        ALTER TABLE leads ADD COLUMN landmark TEXT;
    END IF;
    
    -- Add commission column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='commission') THEN
        ALTER TABLE leads ADD COLUMN commission TEXT;
    END IF;
    
    -- Add age column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='age') THEN
        ALTER TABLE leads ADD COLUMN age TEXT;
    END IF;
    
    -- Add water column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='water') THEN
        ALTER TABLE leads ADD COLUMN water TEXT;
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_owner ON leads(owner);
CREATE INDEX IF NOT EXISTS idx_leads_price ON leads(price);
CREATE INDEX IF NOT EXISTS idx_leads_size ON leads(size);
CREATE INDEX IF NOT EXISTS idx_leads_direction ON leads(direction);
CREATE INDEX IF NOT EXISTS idx_leads_address ON leads(address);

-- Verify the schema update
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position;