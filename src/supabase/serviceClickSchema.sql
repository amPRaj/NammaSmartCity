-- Service Clicks Table (for tracking service interest)
CREATE TABLE IF NOT EXISTS service_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    service_category VARCHAR(100) NOT NULL, -- 'real_estate' or 'marketing'
    user_ip VARCHAR(45),
    user_agent TEXT,
    click_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_clicks_service_name ON service_clicks(service_name);
CREATE INDEX IF NOT EXISTS idx_service_clicks_category ON service_clicks(service_category);
CREATE INDEX IF NOT EXISTS idx_service_clicks_timestamp ON service_clicks(click_timestamp);
CREATE INDEX IF NOT EXISTS idx_service_clicks_session ON service_clicks(session_id);

-- Enable Row Level Security
ALTER TABLE service_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for service clicks
CREATE POLICY "Enable read access for all users" ON service_clicks
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON service_clicks
    FOR INSERT WITH CHECK (true);

-- Create a view for service analytics
CREATE OR REPLACE VIEW service_analytics AS
SELECT 
    service_name,
    service_category,
    COUNT(*) as total_clicks,
    COUNT(DISTINCT session_id) as unique_sessions,
    DATE_TRUNC('day', click_timestamp) as click_date,
    COUNT(*) FILTER (WHERE click_timestamp >= NOW() - INTERVAL '24 hours') as clicks_last_24h,
    COUNT(*) FILTER (WHERE click_timestamp >= NOW() - INTERVAL '7 days') as clicks_last_7d,
    COUNT(*) FILTER (WHERE click_timestamp >= NOW() - INTERVAL '30 days') as clicks_last_30d
FROM service_clicks 
GROUP BY service_name, service_category, DATE_TRUNC('day', click_timestamp)
ORDER BY total_clicks DESC;