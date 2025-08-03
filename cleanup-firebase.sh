#!/bin/bash

echo "🧹 Cleaning up Firebase files..."

# Remove Firebase directory
if [ -d "src/firebase" ]; then
    echo "Removing src/firebase directory..."
    rm -rf src/firebase
    echo "✅ Firebase directory removed"
else
    echo "ℹ️  Firebase directory not found"
fi

# Remove Firebase rules file
if [ -f "firestore.rules" ]; then
    echo "Removing firestore.rules..."
    rm firestore.rules
    echo "✅ Firestore rules removed"
else
    echo "ℹ️  Firestore rules file not found"
fi

# Uninstall Firebase package
echo "Uninstalling Firebase package..."
npm uninstall firebase

echo "🎉 Firebase cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Set up your Supabase project"
echo "2. Update your .env.local file with Supabase credentials"
echo "3. Run the SQL schema in your Supabase dashboard"
echo "4. Test the application"