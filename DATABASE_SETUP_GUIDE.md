# Database Setup Guide - Lead Management System

## Quick Fix for "Failed to add lead: undefined" Error

If you're seeing the error "Failed to add lead: undefined" when trying to add a new lead, it means the database tables haven't been set up yet. Here's how to fix it:

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Open your project: `zgvzinhbcqkfhsililwf`

### Step 2: Run Database Setup Script
1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire contents of `setup-leads-db.sql` file
4. Paste it into the SQL editor
5. Click **Run** button

### Step 3: Verify Setup
1. Go back to your Lead Management page
2. Click the **Test DB** button (orange button in the top toolbar)
3. You should see "✅ Database Connection Successful!"

### Step 4: Test Adding a Lead
1. Click **Add Lead** button
2. Fill in the form with test data:
   - Name: Test User
   - Phone: +91 9876543210
   - Email: test@example.com
   - Location: Davanagere
3. Click **Add Lead**
4. You should see "✅ Lead added successfully!"

## What the Setup Script Does

The `setup-leads-db.sql` script creates:

1. **leads** table - Main table for storing lead information
2. **lead_notes** table - For storing notes/comments about leads
3. **lead_activities** table - For tracking all interactions with leads
4. **Indexes** - For better performance
5. **Row Level Security** - For data protection
6. **Sample data** - Test leads to get you started

## Troubleshooting

### Error: "Table does not exist"
- Make sure you ran the complete `setup-leads-db.sql` script
- Check that all tables were created in the Supabase dashboard under **Table Editor**

### Error: "Database connection failed"
- Check your internet connection
- Verify the Supabase URL and API key in `src/supabase/config.js`
- Make sure your Supabase project is active

### Error: "Missing required field"
- Make sure Name and Phone fields are filled
- Check that the form data matches the database schema

### Still Having Issues?
1. Use the **Test DB** button to diagnose connection issues
2. Check the browser console (F12) for detailed error messages
3. Verify your Supabase project settings

## Database Schema Overview

### Leads Table Fields:
- `name` (required) - Lead's full name
- `phone` (required) - Contact phone number
- `email` - Email address
- `location` - City/area
- `property_type` - Type of property interested in
- `budget` - Budget range
- `source` - How they found you (call, whatsapp, facebook, etc.)
- `message` - Additional notes
- `status` - Lead status (new, contacted, qualified, converted, lost)
- `priority` - Priority level (low, medium, high)
- `lead_type` - buyer or seller
- `assigned_to` - Sales person assigned

## Next Steps

Once the database is set up, you can:
- Add new leads manually
- Import leads from Excel/CSV files
- Track lead activities and notes
- Generate reports and statistics
- Export lead data

The system includes sample data to help you get started immediately!