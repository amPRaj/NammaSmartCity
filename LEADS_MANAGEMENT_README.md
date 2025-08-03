# Lead Management System - Namma Smart City Properties

A comprehensive lead management system integrated with Supabase database for tracking sales leads, customer interactions, and managing the sales pipeline.

## Features

### 🎯 Lead Management
- **Complete Lead Tracking**: Capture leads from multiple sources (calls, WhatsApp, Facebook, Instagram, website, referrals)
- **Lead Scoring**: Automatic lead scoring system (0-100) to prioritize high-value prospects
- **Status Management**: Track leads through the sales pipeline (New → Contacted → Qualified → Converted/Lost)
- **Priority Levels**: Assign priority levels (High, Medium, Low) to leads
- **Team Assignment**: Assign leads to specific sales team members

### 📊 Dashboard & Analytics
- **Real-time Statistics**: View total leads, conversion rates, and pipeline metrics
- **Visual Dashboard**: Beautiful cards showing lead distribution by status
- **Monthly Tracking**: Track new leads acquired this month
- **Conversion Analytics**: Monitor conversion rates and sales performance

### 🔍 Advanced Filtering & Search
- **Multi-filter Support**: Filter by status, source, priority, and assigned team member
- **Real-time Search**: Search leads by name, phone, email, or location
- **Bulk Operations**: Select multiple leads for bulk status updates
- **Export Functionality**: Export filtered leads to CSV format

### 💬 Communication Tools
- **One-click Calling**: Direct phone call integration
- **WhatsApp Integration**: Send WhatsApp messages with pre-filled templates
- **Email Integration**: Send emails directly from the system
- **Activity Logging**: Automatic logging of all communication activities

### 📝 Notes & Activities
- **Lead Notes**: Add detailed notes for each lead interaction
- **Activity Timeline**: Track all activities and interactions chronologically
- **Team Collaboration**: Share notes and updates across team members
- **Follow-up Reminders**: Set and track follow-up dates

## Database Schema

### Tables Created:
1. **leads** - Main lead information
2. **lead_notes** - Notes and comments for each lead
3. **lead_activities** - Activity log for all interactions

### Key Fields:
- Lead information (name, phone, email, location)
- Property requirements (type, budget)
- Sales tracking (status, priority, assigned_to, lead_score)
- Timeline tracking (created_at, follow_up_date, last_contact)

## Setup Instructions

### 1. Database Setup
Run the SQL script in your Supabase dashboard:
```bash
# Execute the setup script in Supabase SQL Editor
cat setup-leads-db.sql
```

### 2. Environment Configuration
Ensure your Supabase configuration is properly set in `src/supabase/config.js`:
```javascript
const supabaseUrl = 'your-supabase-url'
const supabaseAnonKey = 'your-supabase-anon-key'
```

### 3. Access the System
Navigate to `/leads` in your application to access the lead management system.

## Usage Guide

### Adding New Leads
1. Click "Add Lead" button
2. Fill in the lead information form
3. Assign to team member and set priority
4. Save the lead

### Managing Leads
1. **View Details**: Click the eye icon to view complete lead information
2. **Quick Actions**: Use phone, WhatsApp, and email icons for instant communication
3. **Status Updates**: Change status directly from the table dropdown
4. **Add Notes**: Click "Add Note" in the lead details modal

### Filtering and Search
1. **Search**: Use the search bar to find specific leads
2. **Filters**: Apply filters by status, source, priority, or team member
3. **Bulk Actions**: Select multiple leads for bulk operations
4. **Export**: Export filtered results to CSV

### Communication Tracking
- All phone calls, WhatsApp messages, and emails are automatically logged
- View complete activity timeline in lead details
- Add manual notes for in-person meetings or other interactions

## Team Members
The system includes these default team members:
- Rajesh Kumar
- Priya Sharma
- Amit Patel
- Sneha Reddy

You can modify the team list in `src/pages/LeadsPage.jsx`.

## Lead Sources
Supported lead sources:
- 📞 Phone Call
- 💬 WhatsApp
- 📘 Facebook
- 📷 Instagram
- 🌐 Website
- 👥 Referral

## Lead Statuses
- 🆕 **New**: Fresh leads that haven't been contacted
- 📞 **Contacted**: Leads that have been reached out to
- ✅ **Qualified**: Leads that meet criteria and show genuine interest
- 🎉 **Converted**: Leads that have become customers
- ❌ **Lost**: Leads that are no longer viable

## Priority Levels
- 🔴 **High**: Urgent leads requiring immediate attention
- 🟡 **Medium**: Standard priority leads
- 🟢 **Low**: Leads that can be followed up later

## Sample Data
The system comes with sample leads for testing:
- Rajesh Kumar (2BHK Apartment inquiry)
- Priya Reddy (3BHK Villa inquiry)
- Suresh Gowda (Residential Plot inquiry)
- Lakshmi Narayana (Converted customer)
- Manjunath Swamy (Commercial Space inquiry)

## Technical Details

### Built With:
- **React 18** - Frontend framework
- **Supabase** - Backend database and authentication
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **React Icons** - Icon library

### Key Components:
- `LeadsPage.jsx` - Main lead management interface
- `leadService.js` - Database operations and API calls
- `leadsSchema.sql` - Database schema and setup

### Performance Features:
- Database indexing for fast queries
- Real-time updates
- Optimized filtering and search
- Responsive design for mobile and desktop

## Customization

### Adding New Team Members:
Update the `salesTeam` array in `LeadsPage.jsx`:
```javascript
const [salesTeam] = useState([
    "Your Team Member Name",
    // ... existing members
]);
```

### Adding New Property Types:
Update the property type options in the Add Lead modal.

### Modifying Lead Sources:
Add new sources in the source dropdown and update the `getSourceIcon` function.

## Support

For technical support or feature requests, please refer to the development team or create an issue in the project repository.

## Security Notes

- All database operations use Row Level Security (RLS)
- Lead data is protected with proper access controls
- Communication logs maintain audit trails
- Export functionality respects user permissions

---

**Happy Selling! 🏠💼**