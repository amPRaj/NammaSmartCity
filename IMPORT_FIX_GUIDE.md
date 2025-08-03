# Import Fix Guide - Lead Management System

## Issue: "Import completed! 0 leads imported successfully. 61 failed."

This error occurs because the database schema doesn't have all the required columns yet. Here's how to fix it:

## Step 1: Update Database Schema (REQUIRED)

1. **Go to Supabase Dashboard**
   - Open [supabase.com](https://supabase.com)
   - Sign in and open your project

2. **Run Schema Update**
   - Go to **SQL Editor** → **New Query**
   - Copy the entire contents of `quick_schema_update.sql`
   - Paste and click **Run**
   - You should see "Success. No rows returned" message

## Step 2: Test Database Connection

1. **Go back to your Lead Management page**
2. **Click the "Test DB" button** (orange button)
3. **You should see**: "✅ Database Connection Successful!"

## Step 3: Import Leads (Choose One Option)

### Option A: Simple Import (Recommended First)
- Use `simple_leads_import.csv` file
- Contains 75+ leads with core fields only
- Guaranteed to work after schema update

### Option B: Complete Import (After Option A works)
- Use `complete_leads_import.csv` file  
- Contains all extended fields (Owner, Size, Direction, etc.)
- More comprehensive data

## Step 4: Verify Import

1. **Import the CSV file**
2. **Check the preview** - should show proper data
3. **Click "Import"** - should show success message
4. **Refresh the page** - leads should appear in the table

## Troubleshooting

### If Test DB Still Fails:
```
❌ Database Connection Failed
```
**Solution**: Make sure you ran the `quick_schema_update.sql` script completely

### If Import Still Fails:
```
❌ Failed to add lead: Database error
```
**Solutions**:
1. Check browser console (F12) for detailed errors
2. Try the `simple_leads_import.csv` first
3. Verify all required fields (name, phone) are present

### If Some Leads Import But Others Fail:
```
✅ 45 leads imported, 16 failed
```
**Common causes**:
- Duplicate phone numbers
- Missing required fields (name or phone)
- Invalid data format

## What the Schema Update Does

The `quick_schema_update.sql` script adds these columns to your leads table:
- `owner` - Property owner name
- `contact` - Contact number
- `plot_no` - Plot number
- `size` - Property size (30*40, etc.)
- `direction` - Facing direction (North, South, etc.)
- `price` - Property price
- `negotiable` - Price negotiation details
- `address` - Detailed address
- `landmark` - Nearby landmark
- `commission` - Commission details
- `age` - Property age
- `water` - Water facility details

## Expected Results After Fix

✅ **Database Test**: "Database connection and table structure verified"
✅ **Import Preview**: Shows all lead data properly formatted
✅ **Import Success**: "Import completed! 75 leads imported successfully. 0 failed."
✅ **Lead Table**: All leads visible with proper data

## Quick Commands Summary

1. **Run in Supabase SQL Editor**:
   ```sql
   -- Copy contents of quick_schema_update.sql
   ```

2. **Test in Lead Management**:
   - Click "Test DB" → Should show ✅
   - Import `simple_leads_import.csv` → Should work

3. **Verify**:
   - Check lead count in dashboard
   - Browse leads in table view
   - Test adding new lead manually

The system should work perfectly after running the schema update!