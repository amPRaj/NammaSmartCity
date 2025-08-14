import { supabase } from './config';

// Add a new service enquiry
export const addServiceEnquiry = async (enquiryData) => {
    try {
        console.log('📝 Adding service enquiry:', enquiryData);
        
        const { data, error } = await supabase
            .from('service_enquiries')
            .insert([{
                service_name: enquiryData.serviceName,
                client_name: enquiryData.clientName,
                client_email: enquiryData.clientEmail,
                client_phone: enquiryData.clientPhone,
                message: enquiryData.message || '',
                status: 'new'
            }])
            .select();

        if (error) {
            console.error('❌ Error adding service enquiry:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Service enquiry added successfully:', data);
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('❌ Exception in addServiceEnquiry:', error);
        return { success: false, error: error.message };
    }
};

// Get all service enquiries
export const getAllServiceEnquiries = async () => {
    try {
        console.log('📊 Fetching all service enquiries...');
        
        const { data, error } = await supabase
            .from('service_enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Error fetching service enquiries:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Service enquiries fetched successfully:', data?.length || 0);
        return { success: true, data: data || [] };
    } catch (error) {
        console.error('❌ Exception in getAllServiceEnquiries:', error);
        return { success: false, error: error.message };
    }
};

// Update service enquiry status
export const updateServiceEnquiryStatus = async (id, status) => {
    try {
        console.log('🔄 Updating service enquiry status:', id, status);
        
        const { data, error } = await supabase
            .from('service_enquiries')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select();

        if (error) {
            console.error('❌ Error updating service enquiry status:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Service enquiry status updated successfully');
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('❌ Exception in updateServiceEnquiryStatus:', error);
        return { success: false, error: error.message };
    }
};

// Mark WhatsApp as sent
export const markWhatsAppSent = async (id) => {
    try {
        console.log('📱 Marking WhatsApp as sent for enquiry:', id);
        
        const { data, error } = await supabase
            .from('service_enquiries')
            .update({ whatsapp_sent: true, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select();

        if (error) {
            console.error('❌ Error marking WhatsApp as sent:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ WhatsApp marked as sent successfully');
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('❌ Exception in markWhatsAppSent:', error);
        return { success: false, error: error.message };
    }
};

// Delete service enquiry
export const deleteServiceEnquiry = async (id) => {
    try {
        console.log('🗑️ Deleting service enquiry:', id);
        
        const { error } = await supabase
            .from('service_enquiries')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('❌ Error deleting service enquiry:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Service enquiry deleted successfully');
        return { success: true };
    } catch (error) {
        console.error('❌ Exception in deleteServiceEnquiry:', error);
        return { success: false, error: error.message };
    }
};

// Generate WhatsApp message for service enquiry
export const generateWhatsAppMessage = (enquiryData) => {
    const message = `🏠 *New Service Enquiry*

📋 *Service:* ${enquiryData.serviceName}
👤 *Name:* ${enquiryData.clientName}
📧 *Email:* ${enquiryData.clientEmail}
📱 *Phone:* ${enquiryData.clientPhone}

💬 *Message:*
${enquiryData.message || 'No additional message'}

⏰ *Enquiry Time:* ${new Date().toLocaleString()}

Please contact the client for further assistance.`;

    return encodeURIComponent(message);
};

// Send WhatsApp notification
export const sendWhatsAppEnquiry = (enquiryData, whatsappNumber = '918951569757') => {
    try {
        const message = generateWhatsAppMessage(enquiryData);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        console.log('📱 Opening WhatsApp with enquiry details');
        window.open(whatsappUrl, '_blank');
        
        return { success: true };
    } catch (error) {
        console.error('❌ Error sending WhatsApp enquiry:', error);
        return { success: false, error: error.message };
    }
};