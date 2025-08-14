import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FiMail, 
    FiPhone, 
    FiUser, 
    FiMessageSquare, 
    FiCalendar, 
    FiTrash2,
    FiExternalLink,
    FiRefreshCw,
    FiFilter
} from 'react-icons/fi';
import { 
    getAllServiceEnquiries, 
    updateServiceEnquiryStatus, 
    deleteServiceEnquiry,
    sendWhatsAppEnquiry 
} from '../../supabase/serviceEnquiryService';

const ServiceEnquiriesManagement = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadEnquiries();
    }, []);

    const loadEnquiries = async () => {
        try {
            setLoading(true);
            const result = await getAllServiceEnquiries();
            if (result.success) {
                setEnquiries(result.data);
            } else {
                console.error('Failed to load enquiries:', result.error);
            }
        } catch (error) {
            console.error('Error loading enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadEnquiries();
        setRefreshing(false);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const result = await updateServiceEnquiryStatus(id, newStatus);
            if (result.success) {
                setEnquiries(prev => 
                    prev.map(enquiry => 
                        enquiry.id === id 
                            ? { ...enquiry, status: newStatus }
                            : enquiry
                    )
                );
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                const result = await deleteServiceEnquiry(id);
                if (result.success) {
                    setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id));
                }
            } catch (error) {
                console.error('Error deleting enquiry:', error);
            }
        }
    };

    const handleWhatsAppContact = (enquiry) => {
        const enquiryData = {
            serviceName: enquiry.service_name,
            clientName: enquiry.client_name,
            clientEmail: enquiry.client_email,
            clientPhone: enquiry.client_phone,
            message: enquiry.message
        };
        sendWhatsAppEnquiry(enquiryData);
    };

    const filteredEnquiries = enquiries.filter(enquiry => 
        statusFilter === 'all' || enquiry.status === statusFilter
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'qualified': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
            case 'whatsapp_direct': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'whatsapp_form': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Service Enquiries
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage and track service enquiries from clients
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <FiFilter className="w-4 h-4 text-gray-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="closed">Closed</option>
                            <option value="whatsapp_direct">WhatsApp Direct</option>
                            <option value="whatsapp_form">WhatsApp Form</option>
                        </select>
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: 'Total Enquiries', value: enquiries.length, color: 'blue' },
                    { label: 'New', value: enquiries.filter(e => e.status === 'new').length, color: 'blue' },
                    { label: 'Contacted', value: enquiries.filter(e => e.status === 'contacted').length, color: 'yellow' },
                    { label: 'WhatsApp Direct', value: enquiries.filter(e => e.status === 'whatsapp_direct' || e.status === 'whatsapp_form').length, color: 'green' },
                    { label: 'Qualified', value: enquiries.filter(e => e.status === 'qualified').length, color: 'green' }
                ].map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Enquiries List */}
            <div className="space-y-4">
                {filteredEnquiries.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                        <FiMessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No enquiries found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {statusFilter === 'all' 
                                ? 'No service enquiries have been submitted yet.'
                                : `No enquiries with status "${statusFilter}" found.`
                            }
                        </p>
                    </div>
                ) : (
                    filteredEnquiries.map((enquiry, index) => (
                        <motion.div
                            key={enquiry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                {/* Main Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {enquiry.service_name}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <FiUser className="w-4 h-4" />
                                                    {enquiry.client_name}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FiCalendar className="w-4 h-4" />
                                                    {new Date(enquiry.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                                            {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FiMail className="w-4 h-4 text-gray-400" />
                                            <a 
                                                href={`mailto:${enquiry.client_email}`}
                                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                            >
                                                {enquiry.client_email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiPhone className="w-4 h-4 text-gray-400" />
                                            <a 
                                                href={`tel:${enquiry.client_phone}`}
                                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                            >
                                                {enquiry.client_phone}
                                            </a>
                                        </div>
                                    </div>

                                    {enquiry.message && (
                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                            <div className="flex items-start gap-2">
                                                <FiMessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    {enquiry.message}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 min-w-[200px]">
                                    {/* Status Update */}
                                    <select
                                        value={enquiry.status}
                                        onChange={(e) => handleStatusUpdate(enquiry.id, e.target.value)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="closed">Closed</option>
                                        <option value="whatsapp_direct">WhatsApp Direct</option>
                                        <option value="whatsapp_form">WhatsApp Form</option>
                                    </select>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleWhatsAppContact(enquiry)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                        >
                                            <FiExternalLink className="w-4 h-4" />
                                            WhatsApp
                                        </button>
                                        <button
                                            onClick={() => handleDelete(enquiry.id)}
                                            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ServiceEnquiriesManagement;