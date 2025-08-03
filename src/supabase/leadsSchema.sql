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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lead_notes table for tracking interactions
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lead_activities table for tracking all interactions
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('call', 'email', 'whatsapp', 'meeting', 'site_visit', 'status_change', 'note_added')),
  description TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up_date ON leads(follow_up_date);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score DESC);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_created_at ON lead_notes(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_at ON lead_activities(created_at DESC);

-- Set up Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

-- Allow public access to leads (for admin functionality)
CREATE POLICY "Allow public read access to leads" ON leads
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to leads" ON leads
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to leads" ON leads
  FOR DELETE USING (true);

-- Allow public access to lead_notes
CREATE POLICY "Allow public read access to lead_notes" ON lead_notes
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to lead_notes" ON lead_notes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to lead_notes" ON lead_notes
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to lead_notes" ON lead_notes
  FOR DELETE USING (true);

-- Allow public access to lead_activities
CREATE POLICY "Allow public read access to lead_activities" ON lead_activities
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to lead_activities" ON lead_activities
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to lead_activities" ON lead_activities
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to lead_activities" ON lead_activities
  FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for development
INSERT INTO leads (name, email, phone, location, property_type, budget, source, message, status, assigned_to, lead_score, follow_up_date) VALUES
('Rajesh Kumar', 'rajesh@email.com', '+91 9876543210', 'Davanagere, Karnataka', '2BHK Apartment', '45-60 Lakhs', 'call', 'Called inquiring about 2BHK apartment in Vidyanagar area. Interested in ready-to-move properties.', 'new', 'Priya Sharma', 85, NOW() + INTERVAL '2 days'),
('Priya Reddy', 'priya.reddy@email.com', '+91 9876543211', 'Davanagere, Karnataka', '3BHK Villa', '80-1.2 Crores', 'whatsapp', 'WhatsApp inquiry about luxury villa with garden. Looking for properties in Saraswathi Nagar.', 'contacted', 'Amit Patel', 92, NOW() + INTERVAL '1 day'),
('Suresh Gowda', 'suresh.gowda@email.com', '+91 9876543212', 'Davanagere, Karnataka', 'Residential Plot', '25-40 Lakhs', 'facebook', 'Facebook message about residential plot for construction. Needs DTCP approved plot.', 'qualified', 'Rajesh Kumar', 78, NOW() + INTERVAL '3 days'),
('Lakshmi Narayana', 'lakshmi@email.com', '+91 9876543213', 'Davanagere, Karnataka', '1BHK Apartment', '25-35 Lakhs', 'call', 'Called about budget-friendly 1BHK apartment for investment purpose.', 'converted', 'Sneha Reddy', 100, NULL),
('Manjunath Swamy', 'manju@email.com', '+91 9876543214', 'Davanagere, Karnataka', 'Commercial Space', '60-80 Lakhs', 'instagram', 'Instagram DM about commercial space for restaurant business near Car Street.', 'new', 'Priya Sharma', 70, NOW() + INTERVAL '2 days')
ON CONFLICT DO NOTHING;