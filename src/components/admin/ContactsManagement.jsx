import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiDollarSign, 
  FiHome,
  FiMessageSquare,
  FiClock,
  FiTrash2,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { 
  getAllContacts, 
  updateContactStatus, 
  deleteContact 
} from '../../supabase/contactService';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, new, contacted, qualified, closed

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    const result = await getAllContacts();
    if (result.success) {
      setContacts(result.data);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id, status) => {
    const result = await updateContactStatus(id, status);
    if (result.success) {
      loadContacts(); // Reload contacts
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const result = await deleteContact(id);
      if (result.success) {
        loadContacts(); // Reload contacts
      }
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'qualified': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Contact Inquiries
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track customer inquiries
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'contacted', 'qualified', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 text-xs">
                ({status === 'all' ? contacts.length : contacts.filter(c => c.status === status).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contacts...</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-8">
          <FiUser className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No contacts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {filter === 'all' ? 'No inquiries yet.' : `No ${filter} inquiries.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredContacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Contact Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {contact.first_name} {contact.last_name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {formatDate(contact.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FiMail className="w-4 h-4 text-gray-400" />
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiPhone className="w-4 h-4 text-gray-400" />
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                    {contact.property_type && (
                      <div className="flex items-center gap-2 text-sm">
                        <FiHome className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {contact.property_type}
                        </span>
                      </div>
                    )}
                    {contact.budget && (
                      <div className="flex items-center gap-2 text-sm">
                        <FiDollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {contact.budget}
                        </span>
                      </div>
                    )}
                    {contact.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <FiMapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {contact.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {contact.message && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <FiMessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {contact.message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <div className="flex flex-wrap gap-2">
                    {contact.status !== 'contacted' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id, 'contacted')}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors"
                      >
                        <FiCheck className="w-3 h-3" />
                        Mark Contacted
                      </button>
                    )}
                    {contact.status !== 'qualified' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id, 'qualified')}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                      >
                        <FiCheck className="w-3 h-3" />
                        Mark Qualified
                      </button>
                    )}
                    {contact.status !== 'closed' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id, 'closed')}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900/30 transition-colors"
                      >
                        <FiX className="w-3 h-3" />
                        Close
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <FiTrash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;