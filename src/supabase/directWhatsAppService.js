import { supabase } from './config';
import { trackServiceClick } from './serviceClickService';

// Save service enquiry and redirect to WhatsApp directly
export const saveAndRedirectToWhatsApp = async (service, clientData = null) => {
    try {
        console.log('📱 Processing direct WhatsApp service enquiry:', service.title);
        
        // Track service click
        const category = service.category || 'consultation';
        await trackServiceClick(service.title, category);
        
        // Prepare enquiry data
        const enquiryData = {
            service_name: service.title,
            client_name: clientData?.name || 'Direct WhatsApp User',
            client_email: clientData?.email || '',
            client_phone: clientData?.phone || '',
            message: clientData?.message || `Interested in ${service.title} service`,
            status: 'whatsapp_direct',
            whatsapp_sent: true
        };

        // Save to database
        const { data, error } = await supabase
            .from('service_enquiries')
            .insert([enquiryData])
            .select();

        if (error) {
            console.error('❌ Error saving direct WhatsApp enquiry:', error);
            // Continue with WhatsApp even if database save fails
        } else {
            console.log('✅ Direct WhatsApp enquiry saved successfully:', data);
        }

        // Generate WhatsApp message
        const whatsappMessage = generateDirectWhatsAppMessage(service, clientData);
        
        // Redirect to WhatsApp
        const whatsappNumber = '918951569757'; // Company WhatsApp number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        console.log('📱 Redirecting to WhatsApp...');
        window.open(whatsappUrl, '_blank');
        
        return { success: true, data: data?.[0] };
    } catch (error) {
        console.error('❌ Exception in saveAndRedirectToWhatsApp:', error);
        
        // Even if there's an error, still try to redirect to WhatsApp
        try {
            const whatsappMessage = generateDirectWhatsAppMessage(service, clientData);
            const whatsappNumber = '918951569757';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        } catch (whatsappError) {
            console.error('❌ Failed to redirect to WhatsApp:', whatsappError);
        }
        
        return { success: false, error: error.message };
    }
};

// Generate WhatsApp message for direct service enquiry
const generateDirectWhatsAppMessage = (service, clientData = null) => {
    let message = `🏠 *Service Enquiry*

📋 *Service:* ${service.title}
📝 *Description:* ${service.description}

`;

    if (clientData?.name) {
        message += `👤 *Name:* ${clientData.name}\n`;
    }
    if (clientData?.email) {
        message += `📧 *Email:* ${clientData.email}\n`;
    }
    if (clientData?.phone) {
        message += `📱 *Phone:* ${clientData.phone}\n`;
    }
    if (clientData?.message) {
        message += `💬 *Message:* ${clientData.message}\n`;
    }

    message += `
⏰ *Enquiry Time:* ${new Date().toLocaleString()}

I'm interested in this service. Please provide more details and pricing information.`;

    return encodeURIComponent(message);
};

// Save service enquiry with form data and redirect to WhatsApp
export const saveFormAndRedirectToWhatsApp = async (service, formData) => {
    try {
        console.log('📱 Processing form-based WhatsApp service enquiry:', service.title);
        
        // Track service click
        const category = service.category || 'consultation';
        await trackServiceClick(service.title, category);
        
        // Prepare enquiry data
        const enquiryData = {
            service_name: service.title,
            client_name: formData.clientName,
            client_email: formData.clientEmail,
            client_phone: formData.clientPhone,
            message: formData.message || `Interested in ${service.title} service`,
            status: 'whatsapp_form',
            whatsapp_sent: true
        };

        // Save to database
        const { data, error } = await supabase
            .from('service_enquiries')
            .insert([enquiryData])
            .select();

        if (error) {
            console.error('❌ Error saving form WhatsApp enquiry:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Form WhatsApp enquiry saved successfully:', data);

        // Generate WhatsApp message
        const whatsappMessage = generateFormWhatsAppMessage(service, formData);
        
        // Redirect to WhatsApp
        const whatsappNumber = '918951569757'; // Company WhatsApp number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        console.log('📱 Redirecting to WhatsApp...');
        window.open(whatsappUrl, '_blank');
        
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('❌ Exception in saveFormAndRedirectToWhatsApp:', error);
        return { success: false, error: error.message };
    }
};

// Generate WhatsApp message for form-based service enquiry
const generateFormWhatsAppMessage = (service, formData) => {
    const message = `🏠 *Service Enquiry*

📋 *Service:* ${service.title}
👤 *Name:* ${formData.clientName}
📧 *Email:* ${formData.clientEmail}
📱 *Phone:* ${formData.clientPhone}

💬 *Message:*
${formData.message || `I'm interested in ${service.title} service. Please provide more details and pricing information.`}

⏰ *Enquiry Time:* ${new Date().toLocaleString()}

Please contact me for further assistance.`;

    return encodeURIComponent(message);
};

// Get all direct WhatsApp enquiries for analytics
export const getDirectWhatsAppEnquiries = async () => {
    try {
        console.log('📊 Fetching direct WhatsApp enquiries...');
        
        const { data, error } = await supabase
            .from('service_enquiries')
            .select('*')
            .in('status', ['whatsapp_direct', 'whatsapp_form'])
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Error fetching direct WhatsApp enquiries:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Direct WhatsApp enquiries fetched successfully:', data?.length || 0);
        return { success: true, data: data || [] };
    } catch (error) {
        console.error('❌ Exception in getDirectWhatsAppEnquiries:', error);
        return { success: false, error: error.message };
    }
};