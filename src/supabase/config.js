import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://zgvzinhbcqkfhsililwf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpndnppbmhiY3FrZmhzaWxpbHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTAzMDAsImV4cCI6MjA2OTI4NjMwMH0.vVqR7sWOTJ5aXBJlXEF3pZfDIy_jERtAk7nonb08Ge4'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase