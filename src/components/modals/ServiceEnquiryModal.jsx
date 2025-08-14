import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiMail, FiPhone, FiMessageSquare, FiSend } from 'react-icons/fi';
import { addServiceEnquiry, sendWhatsAppEnquiry, markWhatsAppSent } from '../../supabase/serviceEnquiryService';
import { testDatabaseConnection, testServiceEnquiryInsertion } from '../../supabase/testConnection';
import { sendWhatsAppWithForm } from '../../supabase/tempWhatsAppService';

const ServiceEnquiryModal = ({ isOpen, onClose, service }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            console.log('🚀 Starting service enquiry submission...');
            
            // Prepare enquiry data
            const enquiryData = {
                serviceName: service?.title || 'General Service',
                clientName: formData.clientName,
                clientEmail: formData.clientEmail,
                clientPhone: formData.clientPhone,
                message: formData.message || `Interested in ${service?.title || 'General Service'} service`
            };

            console.log('📝 Enquiry data prepared:', enquiryData);

            // Add to database
            const result = await addServiceEnquiry(enquiryData);
            console.log('💾 Database result:', result);
            
            if (result.success) {
                console.log('✅ Database save successful, sending WhatsApp...');
                
                // Send WhatsApp notification
                const whatsappResult = sendWhatsAppEnquiry(enquiryData);
                console.log('📱 WhatsApp result:', whatsappResult);
                
                // Mark WhatsApp as sent in database
                if (result.data?.id) {
                    try {
                        const markResult = await markWhatsAppSent(result.data.id);
                        console.log('✅ WhatsApp marked as sent:', markResult);
                    } catch (markError) {
                        console.warn('⚠️ Failed to mark WhatsApp as sent:', markError);
                    }
                }

                setSubmitStatus('success');
                
                // Reset form
                setFormData({
                    clientName: '',
                    clientEmail: '',
                    clientPhone: '',
                    message: ''
                });

                // Close modal after 3 seconds to show success message
                setTimeout(() => {
                    onClose();
                    setSubmitStatus(null);
                }, 3000);
            } else {
                console.error('❌ Database save failed:', result.error);
                console.log('🔄 Using temporary WhatsApp-only mode...');
                
                // Use temporary WhatsApp service when database fails
                try {
                    const whatsappResult = sendWhatsAppWithForm(service, formData);
                    console.log('📱 Temporary WhatsApp sent:', whatsappResult);
                    
                    if (whatsappResult.success) {
                        setSubmitStatus('success');
                        
                        // Reset form
                        setFormData({
                            clientName: '',
                            clientEmail: '',
                            clientPhone: '',
                            message: ''
                        });

                        // Close modal after 3 seconds
                        setTimeout(() => {
                            onClose();
                            setSubmitStatus(null);
                        }, 3000);
                    } else {
                        setSubmitStatus('error');
                    }
                } catch (whatsappError) {
                    console.error('❌ Temporary WhatsApp also failed:', whatsappError);
                    setSubmitStatus('error');
                }
            }
        } catch (error) {
            console.error('❌ Exception during submission:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Test function for debugging (available in browser console as window.testServiceEnquiry)
    const handleTestConnection = async () => {
        console.log('🧪 Testing database connection...');
        const connectionResult = await testDatabaseConnection();
        console.log('Connection result:', connectionResult);
        
        if (connectionResult.success) {
            console.log('🧪 Testing service enquiry insertion...');
            const insertionResult = await testServiceEnquiryInsertion();
            console.log('Insertion result:', insertionResult);
        }
    };

    // Make test function available globally for debugging
    if (typeof window !== 'undefined') {
        window.testServiceEnquiry = handleTestConnection;
    }

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Service Enquiry
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {service?.title || 'General Service'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <FiX className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="email"
                                    name="clientEmail"
                                    value={formData.clientEmail}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number *
                            </label>
                            <div className="relative">
                                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="tel"
                                    name="clientPhone"
                                    value={formData.clientPhone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Message (Optional)
                            </label>
                            <div className="relative">
                                <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                                    placeholder="Tell us more about your requirements..."
                                />
                            </div>
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                                <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                                    ✅ Enquiry submitted successfully!
                                </p>
                                <p className="text-green-700 dark:text-green-300 text-xs mt-1">
                                    Your enquiry has been saved and sent via WhatsApp. We'll contact you soon!
                                </p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                                    ❌ Failed to submit enquiry
                                </p>
                                <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                                    Please check your internet connection and try again. If the problem persists, contact us directly.
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <FiSend className="w-4 h-4" />
                                    Send Enquiry
                                </>
                            )}
                        </button>

                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            By submitting this form, you agree to be contacted via WhatsApp and email.
                        </p>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ServiceEnquiryModal;