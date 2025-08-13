-- Create contacts table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    property_type VARCHAR(50),
    budget VARCHAR(50),
    location VARCHAR(255),
    message TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON contacts
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policy to allow insert for anonymous users (for contact form)
CREATE POLICY "Allow insert for anonymous users" ON contacts
    FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contacts_updated_at 
    BEFORE UPDATE ON contacts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to create contacts table (for the service)
CREATE OR REPLACE FUNCTION create_contacts_table()
RETURNS void AS $$
BEGIN
    -- This function is just a placeholder since the table is already created above
    -- It's used by the contactService to ensure table exists
    RETURN;
END;
$$ LANGUAGE plpgsql;