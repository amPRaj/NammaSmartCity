-- Service Enquiries Table (for storing service enquiry details)
CREATE TABLE IF NOT EXISTS service_enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'closed', 'whatsapp_direct', 'whatsapp_form'
    whatsapp_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_enquiries_service_name ON service_enquiries(service_name);
CREATE INDEX IF NOT EXISTS idx_service_enquiries_status ON service_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_service_enquiries_created_at ON service_enquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_service_enquiries_client_email ON service_enquiries(client_email);

-- Enable Row Level Security
ALTER TABLE service_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for service enquiries
CREATE POLICY "Enable read access for all users" ON service_enquiries
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON service_enquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON service_enquiries
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON service_enquiries
    FOR DELETE USING (true);

-- Create a function to update the updated_at timestamp
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

-- Create a view for service enquiry analytics
CREATE OR REPLACE VIEW service_enquiry_analytics AS
SELECT 
    service_name,
    status,
    COUNT(*) as total_enquiries,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as enquiries_last_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as enquiries_last_7d,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as enquiries_last_30d,
    COUNT(*) FILTER (WHERE whatsapp_sent = true) as whatsapp_sent_count,
    DATE_TRUNC('day', created_at) as enquiry_date
FROM service_enquiries 
GROUP BY service_name, status, DATE_TRUNC('day', created_at)
ORDER BY total_enquiries DESC;