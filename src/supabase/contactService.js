import { supabase } from './config';

const CONTACTS_TABLE = 'contacts';

// Create contacts table if it doesn't exist
export const createContactsTable = async () => {
  try {
    const { error } = await supabase.rpc('create_contacts_table');
    if (error && !error.message.includes('already exists')) {
      console.error('Error creating contacts table:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error('Error creating contacts table:', error);
    return { success: false, error: error.message };
  }
};

// Add new contact inquiry
export const addContactInquiry = async (contactData) => {
  console.log("📞 Adding contact inquiry to Supabase...");
  console.log("📊 Contact data:", contactData);

  try {
    // Create the contact document for Supabase
    const contactDoc = {
      first_name: contactData.firstName,
      last_name: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      property_type: contactData.propertyType || null,
      budget: contactData.budget || null,
      location: contactData.location || null,
      message: contactData.message || null,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log("📝 Saving contact to Supabase...");
    const { data, error } = await supabase
      .from(CONTACTS_TABLE)
      .insert([contactDoc])
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log("✅ SUCCESS! Contact inquiry saved to Supabase");
    console.log("🆔 Contact ID:", data.id);

    // Send notification email (optional)
    await sendNotificationEmail(contactDoc);

    return {
      success: true,
      id: data.id,
      message: `Contact inquiry from ${contactData.firstName} ${contactData.lastName} saved successfully`
    };

  } catch (error) {
    console.error("❌ Supabase save failed:", error);

    return {
      success: false,
      error: `Failed to save contact inquiry: ${error.message}`,
      details: error.code || 'unknown-error'
    };
  }
};

// Get all contact inquiries
export const getAllContacts = async () => {
  try {
    const { data: contacts, error } = await supabase
      .from(CONTACTS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    console.log("✅ Loaded", contacts.length, "contact inquiries from Supabase");
    return { success: true, data: contacts };
  } catch (error) {
    console.error("❌ Failed to load contacts:", error.message);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

// Update contact status
export const updateContactStatus = async (id, status) => {
  try {
    const { data, error } = await supabase
      .from(CONTACTS_TABLE)
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error updating contact status:", error);
    return { success: false, error: error.message };
  }
};

// Delete contact inquiry
export const deleteContact = async (id) => {
  try {
    const { error } = await supabase
      .from(CONTACTS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return { success: false, error: error.message };
  }
};

// Send notification email (you can integrate with email service)
const sendNotificationEmail = async (contactData) => {
  try {
    // You can integrate with email services like:
    // - Supabase Edge Functions
    // - EmailJS
    // - SendGrid
    // - Nodemailer
    
    console.log("📧 Notification: New contact inquiry received");
    console.log("👤 From:", contactData.first_name, contactData.last_name);
    console.log("📧 Email:", contactData.email);
    console.log("📱 Phone:", contactData.phone);
    
    // For now, we'll just log the notification
    // You can implement actual email sending here
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send notification email:", error);
    return { success: false, error: error.message };
  }
};

// Real-time subscription for new contacts
export const subscribeToContacts = (callback) => {
  const subscription = supabase
    .channel('contacts')
    .on('postgres_changes', 
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: CONTACTS_TABLE 
      }, 
      (payload) => {
        console.log('🔔 New contact inquiry received!', payload.new);
        callback(payload.new);
      }
    )
    .subscribe();

  return subscription;
};

// Unsubscribe from real-time updates
export const unsubscribeFromContacts = (subscription) => {
  if (subscription) {
    supabase.removeChannel(subscription);
  }
};