# Firebase to Supabase Migration Guide

## Overview
This project has been migrated from Firebase to Supabase for database and authentication services.

## Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### 2. Environment Variables
1. Copy `.env.example` to `.env.local`
2. Update the values with your Supabase credentials:
```env
REACT_APP_SUPABASE_URL=https://your-project-ref.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Database Setup
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `src/supabase/schema.sql`

This will create:
- `properties` table with all necessary columns
- Indexes for better performance
- Row Level Security (RLS) policies
- Storage bucket for property images
- Storage policies for image uploads

### 4. Authentication Setup
The admin authentication is already configured to work with Supabase Auth.

Default admin credentials:
- Email: `admin@nammasmartcity.com`
- Password: `NammaSmart2024!`

## What Changed

### File Structure
```
src/
├── supabase/           # New Supabase services
│   ├── config.js       # Supabase client configuration
│   ├── propertyService.js  # Property CRUD operations
│   ├── adminService.js     # Admin authentication
│   └── schema.sql          # Database schema
└── firebase/           # Old Firebase files (can be deleted)
```

### Updated Components
All components have been updated to import from `supabase/` instead of `firebase/`:
- `src/components/admin/AdminPanel.jsx`
- `src/components/admin/AdminLogin.jsx`
- `src/components/admin/AdminDashboard.jsx`
- `src/components/admin/PropertyForm.jsx`
- `src/components/properties/PropertiesShowcase.jsx`
- `src/components/properties/PropertyListing.jsx`

### Key Differences

#### Database
- **Firebase Firestore** → **Supabase PostgreSQL**
- Collections → Tables
- Documents → Rows
- `createdAt` → `created_at` (snake_case)
- `updatedAt` → `updated_at` (snake_case)

#### Authentication
- **Firebase Auth** → **Supabase Auth**
- Same API patterns, different client
- Better integration with PostgreSQL RLS

#### Storage
- **Firebase Storage** → **Supabase Storage**
- Similar API for file uploads
- Better integration with database

## Benefits of Migration

1. **Cost Effective**: Supabase is generally more cost-effective
2. **PostgreSQL**: Full SQL database with advanced features
3. **Real-time**: Built-in real-time subscriptions
4. **Open Source**: Self-hostable if needed
5. **Better Developer Experience**: Unified dashboard and tools

## Testing the Migration

1. Start the development server: `npm start`
2. Test admin login functionality
3. Test property creation, editing, and deletion
4. Test image uploads
5. Verify all data displays correctly

## Rollback Plan

If you need to rollback to Firebase:
1. Restore the Firebase dependency in `package.json`
2. Update all import statements back to `firebase/`
3. Restore the original Firebase configuration

## Support

If you encounter any issues during migration:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure the database schema was created successfully
4. Check Supabase dashboard for any configuration issues