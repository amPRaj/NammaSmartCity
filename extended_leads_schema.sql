-- Extended Lead Management Database Schema
-- Add additional fields to support comprehensive lead data

-- Add new columns to existing leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS owner TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS contact TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS plot_no TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS direction TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS price TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS negotiable TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS landmark TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS commission TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS age TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS water TEXT;

-- Create indexes for the new fields
CREATE INDEX IF NOT EXISTS idx_leads_owner ON leads(owner);
CREATE INDEX IF NOT EXISTS idx_leads_price ON leads(price);
CREATE INDEX IF NOT EXISTS idx_leads_size ON leads(size);
CREATE INDEX IF NOT EXISTS idx_leads_direction ON leads(direction);
CREATE INDEX IF NOT EXISTS idx_leads_address ON leads(address);

-- Update the existing sample data with extended fields
UPDATE leads SET 
    owner = name,
    contact = phone,
    address = location
WHERE owner IS NULL;

-- Insert comprehensive sample data with all fields
INSERT INTO leads (
    name, phone, email, location, property_type, budget, source, message, 
    status, lead_type, assigned_to, lead_score, priority,
    owner, contact, plot_no, size, direction, price, negotiable, 
    address, landmark, commission, age, water
) VALUES 
(
    'Ravi Kumar', '+91 9964544999', '', 'Shiv Sai Layout', 'House', '2600 Thousand', 'call',
    'Looking for house in Shiv Sai Layout near GMIT', 'new', 'buyer', 'Priya Sharma', 75, 'medium',
    'Ravi', '9964544999', '', '', '', '2600 Thousand', '', 
    'Shiv Sai Layout', 'Near GMIT', '', '', ''
),
(
    'Rakshith Reddy', '+91 8050896124', '', 'Harding Road', 'Site', '2300 Sft', 'call',
    'Looking for 14*50*50 site on Harding Road near Highway', 'new', 'buyer', 'Amit Patel', 80, 'medium',
    'Rakshith Reddy', '8050896124', '', '14*50*50', 'SOUTH', '2300 Sft', '', 
    'Harding Road', 'Near Highway', '1', '', ''
),
(
    'Arun Sharma', '+91 9945008713', '', 'SS Layout 3 block', 'Site', '4500 Sft max', 'call',
    'Looking for 30*45 site in SS Layout near building', 'new', 'buyer', 'Rajesh Kumar', 85, 'medium',
    'Arun', '9945008713', '', '30*45', 'SOUTH', '4500 Sft max', '', 
    'SS Layout 3 block', 'Beside Building', '', '', ''
),
(
    'Sunil Reddy', '+91 8722207754', '', 'Vinayak Nagar', 'House', 'N.L 1.5lacs to 1.L', 'call',
    'Looking for 15*50 house in Vinayak Nagar near BSNL Office', 'new', 'buyer', 'Sneha Reddy', 70, 'medium',
    'Sunil', '8722207754', '', '15*50', 'House-B (Semi) E-corner', 'N.L 1.5lacs to 1.L', '', 
    'Vinayak Nagar', 'Near BSNL Office', '2', 'G+2 2BHK 2010s 2.1BHK 2 years old', 'Borewell'
),
(
    'Vilas Kumar', '', '', 'Shimmer', 'Site', '3800(3600)', 'call',
    'Looking for final approved site in Shimmer area', 'new', 'buyer', 'Priya Sharma', 90, 'high',
    'Vilas', '', '', 'Site - Final Approved', 'West', '3800(3600)', '', 
    'Shimmer', 'above 80 lakhs profit', '', '', ''
),
(
    'Chidananda', '+91 9740654546', '', 'Belakeri', 'House', 'Shakira (70)', 'call',
    'Looking for final approved house in Belakeri beside area', 'new', 'buyer', 'Amit Patel', 75, 'medium',
    'Chidananda house owner', '9740654546', '', 'House - Final Approved', 'East', 'Shakira (70)', '', 
    'Belakeri beside', '', '', '', ''
),
(
    'Manoj Patel', '+91 8892314698', '', 'Ashokpagar', 'House', '5% alike (32)', 'call',
    'Looking for 15*40 duplex house in Ashokpagar', 'new', 'buyer', 'Rajesh Kumar', 65, 'medium',
    'Manoj', '8892314698', '', '15*40', 'House - B Duplex', '5% alike (32)', '', 
    'Ashokpagar', 'near devangere gas 6', '1', 'duplex', '4 years old'
)
ON CONFLICT DO NOTHING;

-- Create a view for comprehensive lead information
CREATE OR REPLACE VIEW comprehensive_leads AS
SELECT 
    l.*,
    CASE 
        WHEN l.price IS NOT NULL AND l.price != '' THEN l.price
        ELSE l.budget
    END as display_price,
    CASE 
        WHEN l.address IS NOT NULL AND l.address != '' THEN l.address
        ELSE l.location
    END as display_location,
    CASE 
        WHEN l.owner IS NOT NULL AND l.owner != '' THEN l.owner
        ELSE l.name
    END as display_owner
FROM leads l;

-- Add comments to document the new fields
COMMENT ON COLUMN leads.owner IS 'Property owner name';
COMMENT ON COLUMN leads.contact IS 'Contact number for the property';
COMMENT ON COLUMN leads.plot_no IS 'Plot number or property identifier';
COMMENT ON COLUMN leads.size IS 'Property size (e.g., 30*40, 15*50)';
COMMENT ON COLUMN leads.direction IS 'Property facing direction (North, South, East, West)';
COMMENT ON COLUMN leads.price IS 'Property price or rate';
COMMENT ON COLUMN leads.negotiable IS 'Price negotiation details';
COMMENT ON COLUMN leads.address IS 'Detailed property address';
COMMENT ON COLUMN leads.landmark IS 'Nearby landmark for reference';
COMMENT ON COLUMN leads.commission IS 'Commission details';
COMMENT ON COLUMN leads.age IS 'Property age or construction details';
COMMENT ON COLUMN leads.water IS 'Water facility details (Borewell, etc.)';