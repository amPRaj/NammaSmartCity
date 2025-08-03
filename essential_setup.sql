-- Essential Lead Management Database Setup
-- Run this in Supabase SQL Editor or via psql

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  location TEXT,
  property_type TEXT,
  budget TEXT,
  source TEXT NOT NULL DEFAULT 'call',
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  lead_type TEXT DEFAULT 'buyer' CHECK (lead_type IN ('buyer', 'seller')),
  assigned_to TEXT,
  lead_score INTEGER DEFAULT 50 CHECK (lead_score >= 0 AND lead_score <= 100),
  follow_up_date TIMESTAMP WITH TIME ZONE,
  last_contact TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Extended fields
  owner TEXT,
  contact TEXT,
  plot_no TEXT,
  size TEXT,
  direction TEXT,
  price TEXT,
  negotiable TEXT,
  address TEXT,
  landmark TEXT,
  commission TEXT,
  age TEXT,
  water TEXT
);

-- Create lead_notes table
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lead_activities table
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('call', 'email', 'whatsapp', 'meeting', 'site_visit', 'status_change', 'note_added')),
  description TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public access to leads" ON leads FOR ALL USING (true);
CREATE POLICY "Allow public access to lead_notes" ON lead_notes FOR ALL USING (true);
CREATE POLICY "Allow public access to lead_activities" ON lead_activities FOR ALL USING (true);

-- Insert a test lead to verify setup
INSERT INTO leads (name, phone, email, location, property_type, budget, source, message, status, lead_type, priority) 
VALUES ('Test Lead', '+91 9999999999', 'test@example.com', 'Test Location', 'House', '50L', 'call', 'Test lead for verification', 'new', 'buyer', 'medium')
ON CONFLICT DO NOTHING;

-- Verify tables were created
SELECT 'leads' as table_name, count(*) as record_count FROM leads
UNION ALL
SELECT 'lead_notes' as table_name, count(*) as record_count FROM lead_notes
UNION ALL
SELECT 'lead_activities' as table_name, count(*) as record_count FROM lead_activities;