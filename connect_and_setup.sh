#!/bin/bash

# Connect to PostgreSQL and run setup scripts
# Make sure you have psql installed

echo "Connecting to Supabase PostgreSQL database..."

# Connection string
DB_URL="postgresql://postgres:supabase@08@db.zgvzinhbcqkfhsililwf.supabase.co:5432/postgres"

echo "Running setup-leads-db.sql..."
psql "$DB_URL" -f setup-leads-db.sql

echo "Running quick_schema_update.sql..."
psql "$DB_URL" -f quick_schema_update.sql

echo "Database setup complete!"
echo "Now go to your Lead Management page and click 'Test DB' to verify."