-- =====================================================
-- SUPABASE SETUP SQL QUERIES
-- Run these queries in your Supabase SQL Editor
-- =====================================================

-- 1. CREATE PROPERTIES TABLE
-- =====================================================
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

-- 2. CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);

-- 3. CREATE STORAGE BUCKET FOR PROPERTY IMAGES
-- =====================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- 4. ENABLE ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 5. DROP EXISTING RESTRICTIVE POLICIES (IF ANY)
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated users to insert properties" ON properties;
DROP POLICY IF EXISTS "Allow authenticated users to update properties" ON properties;
DROP POLICY IF EXISTS "Allow authenticated users to delete properties" ON properties;

-- 6. CREATE PUBLIC ACCESS POLICIES FOR PROPERTIES
-- =====================================================
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

-- 7. DROP EXISTING STORAGE POLICIES (IF ANY)
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated users to upload property images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update property images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete property images" ON storage.objects;

-- 8. CREATE PUBLIC STORAGE POLICIES FOR PROPERTY IMAGES
-- =====================================================
-- Allow public read access to property images
CREATE POLICY "Allow public read access to property images" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');

-- Allow public upload property images
CREATE POLICY "Allow public upload property images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'property-images');

-- Allow public update property images
CREATE POLICY "Allow public update property images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'property-images');

-- Allow public delete property images
CREATE POLICY "Allow public delete property images" ON storage.objects
  FOR DELETE USING (bucket_id = 'property-images');

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- After running these queries:
-- 1. Your properties table will be created
-- 2. Storage bucket for images will be ready
-- 3. All necessary policies will be in place
-- 4. Your admin panel should work without RLS errors
-- =====================================================