import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiPhone, FiMessageSquare } from 'react-icons/fi';
import { saveFormAndRedirectToWhatsApp } from '../../supabase/directWhatsAppService';

const QuickWhatsAppModal = ({ isOpen, onClose, service }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientPhone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        try {
            // Save and redirect to WhatsApp
            await saveFormAndRedirectToWhatsApp(service, {
                clientName: formData.clientName,
                clientPhone: formData.clientPhone,
                clientEmail: '', // Optional for quick form
                message: formData.message
            });

            // Close modal
            onClose();
            
            // Reset form
            setFormData({
                clientName: '',
                clientPhone: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting quick WhatsApp form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSkipForm = async () => {
        try {
            // Redirect to WhatsApp without form data
            const { saveAndRedirectToWhatsApp } = await import('../../supabase/directWhatsAppService');
            await saveAndRedirectToWhatsApp(service);
            onClose();
        } catch (error) {
            console.error('Error with direct WhatsApp:', error);
        }
    };

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
                                Quick WhatsApp Contact
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {service?.title || 'Service Enquiry'}
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
                                Your Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter your name (optional)"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="tel"
                                    name="clientPhone"
                                    value={formData.clientPhone}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter your phone number (optional)"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Quick Message
                            </label>
                            <div className="relative">
                                <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={2}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                                    placeholder="Any specific requirements? (optional)"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleSkipForm}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors"
                            >
                                Skip & Continue
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Opening...
                                    </>
                                ) : (
                                    <>
                                        💬 WhatsApp
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            You'll be redirected to WhatsApp to continue the conversation
                        </p>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickWhatsAppModal;