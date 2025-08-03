-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  area DECIMAL(10,2) DEFAULT 0,
  images JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access to properties
CREATE POLICY "Allow public read access to properties" ON properties
  FOR SELECT USING (true);

-- Allow public insert access to properties (for admin functionality)
CREATE POLICY "Allow public insert access to properties" ON properties
  FOR INSERT WITH CHECK (true);

-- Allow public update access to properties (for admin functionality)
CREATE POLICY "Allow public update access to properties" ON properties
  FOR UPDATE USING (true);

-- Allow public delete access to properties (for admin functionality)
CREATE POLICY "Allow public delete access to properties" ON properties
  FOR DELETE USING (true);

-- Storage policies for property images
CREATE POLICY "Allow public read access to property images" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Allow authenticated users to upload property images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update property images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete property images" ON storage.objects
  FOR DELETE USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');