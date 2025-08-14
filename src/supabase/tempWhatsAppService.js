// Temporary WhatsApp-only service (no database required)
export const sendDirectWhatsApp = (service, clientData = null) => {
    try {
        console.log('📱 Sending direct WhatsApp for service:', service.title);
        
        // Generate WhatsApp message
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

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '918951569757'; // Company WhatsApp number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        console.log('📱 Opening WhatsApp...');
        window.open(whatsappUrl, '_blank');
        
        return { success: true };
    } catch (error) {
        console.error('❌ Error sending WhatsApp:', error);
        return { success: false, error: error.message };
    }
};

// Send WhatsApp with form data
export const sendWhatsAppWithForm = (service, formData) => {
    return sendDirectWhatsApp(service, {
        name: formData.clientName,
        email: formData.clientEmail,
        phone: formData.clientPhone,
        message: formData.message
    });
};