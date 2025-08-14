-- Service Enquiries Table
CREATE TABLE IF NOT EXISTS service_enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    message TEXT,
    enquiry_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'new',
    whatsapp_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_enquiries_service_name ON service_enquiries(service_name);
CREATE INDEX IF NOT EXISTS idx_service_enquiries_status ON service_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_service_enquiries_date ON service_enquiries(enquiry_date);

-- Enable Row Level Security
ALTER TABLE service_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for service enquiries
CREATE POLICY "Enable read access for all users" ON service_enquiries
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON service_enquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON service_enquiries
    FOR UPDATE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_service_enquiries_updated_at 
    BEFORE UPDATE ON service_enquiries 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();