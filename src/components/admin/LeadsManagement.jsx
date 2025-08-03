import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FiUser,
    FiPhone,
    FiMail,
    FiMapPin,
    FiCalendar,
    FiEye,
    FiEdit,
    FiTrash2,
    FiFilter,
    FiDownload,
    FiX,
    FiPlus,
    FiMessageSquare,
    FiClock,
    FiUserCheck,
    FiTrendingUp,
    FiTarget,
    FiStar,
    FiPhoneCall,
    FiSend
} from "react-icons/fi";

const LeadsManagement = ({ onClose }) => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [currentView, setCurrentView] = useState('table'); // 'table' or 'kanban'
    const [filters, setFilters] = useState({
        status: "all",
        source: "all",
        dateRange: "all",
        assignedTo: "all"
    });
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        conversionRate: 0
    });
    const [newLead, setNewLead] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        propertyType: "",
        budget: "",
        source: "call",
        message: "",
        assignedTo: ""
    });
    const [leadNotes, setLeadNotes] = useState("");
    const [salesTeam] = useState([
        { id: 1, name: "Rajesh Kumar", role: "Senior Sales Executive" },
        { id: 2, name: "Priya Sharma", role: "Sales Executive" },
        { id: 3, name: "Amit Patel", role: "Lead Sales Manager" },
        { id: 4, name: "Sneha Reddy", role: "Sales Executive" }
    ]);

    // Enhanced mock data with more realistic lead information
    useEffect(() => {
        const mockLeads = [
            {
                id: 1,
                name: "Rajesh Kumar",
                email: "rajesh@email.com",
                phone: "+91 9876543210",
                location: "Davanagere, Karnataka",
                propertyType: "2BHK Apartment",
                budget: "45-60 Lakhs",
                status: "new",
                source: "call",
                message: "Called inquiring about 2BHK apartment in Vidyanagar area. Interested in ready-to-move properties.",
                createdAt: new Date("2024-01-15"),
                followUpDate: new Date("2024-01-20"),
                assignedTo: "Priya Sharma",
                priority: "high",
                notes: [],
                lastContact: null,
                leadScore: 85
            },
            {
                id: 2,
                name: "Priya Reddy",
                email: "priya.reddy@email.com",
                phone: "+91 9876543211",
                location: "Davanagere, Karnataka",
                propertyType: "3BHK Villa",
                budget: "80-1.2 Crores",
                status: "contacted",
                source: "whatsapp",
                message: "WhatsApp inquiry about luxury villa with garden. Looking for properties in Saraswathi Nagar.",
                createdAt: new Date("2024-01-14"),
                followUpDate: new Date("2024-01-18"),
                assignedTo: "Amit Patel",
                priority: "high",
                notes: [
                    { date: new Date("2024-01-16"), note: "Called and discussed requirements. Very interested.", by: "Amit Patel" }
                ],
                lastContact: new Date("2024-01-16"),
                leadScore: 92
            },
            {
                id: 3,
                name: "Suresh Gowda",
                email: "suresh.gowda@email.com",
                phone: "+91 9876543212",
                location: "Davanagere, Karnataka",
                propertyType: "Residential Plot",
                budget: "25-40 Lakhs",
                status: "qualified",
                source: "facebook",
                message: "Facebook message about residential plot for construction. Needs DTCP approved plot.",
                createdAt: new Date("2024-01-13"),
                followUpDate: new Date("2024-01-19"),
                assignedTo: "Rajesh Kumar",
                priority: "medium",
                notes: [
                    { date: new Date("2024-01-15"), note: "Site visit scheduled for weekend", by: "Rajesh Kumar" },
                    { date: new Date("2024-01-17"), note: "Visited site, very interested in Plot #15", by: "Rajesh Kumar" }
                ],
                lastContact: new Date("2024-01-17"),
                leadScore: 78
            },
            {
                id: 4,
                name: "Lakshmi Narayana",
                email: "lakshmi@email.com",
                phone: "+91 9876543213",
                location: "Davanagere, Karnataka",
                propertyType: "1BHK Apartment",
                budget: "25-35 Lakhs",
                status: "converted",
                source: "call",
                message: "Called about budget-friendly 1BHK apartment for investment purpose.",
                createdAt: new Date("2024-01-10"),
                followUpDate: null,
                assignedTo: "Sneha Reddy",
                priority: "low",
                notes: [
                    { date: new Date("2024-01-12"), note: "Showed multiple properties", by: "Sneha Reddy" },
                    { date: new Date("2024-01-15"), note: "Finalized apartment in Nehru Nagar", by: "Sneha Reddy" },
                    { date: new Date("2024-01-18"), note: "Documentation completed, deal closed!", by: "Sneha Reddy" }
                ],
                lastContact: new Date("2024-01-18"),
                leadScore: 100
            },
            {
                id: 5,
                name: "Manjunath Swamy",
                email: "manju@email.com",
                phone: "+91 9876543214",
                location: "Davanagere, Karnataka",
                propertyType: "Commercial Space",
                budget: "60-80 Lakhs",
                status: "new",
                source: "instagram",
                message: "Instagram DM about commercial space for restaurant business near Car Street.",
                createdAt: new Date("2024-01-16"),
                followUpDate: new Date("2024-01-21"),
                assignedTo: "Priya Sharma",
                priority: "medium",
                notes: [],
                lastContact: null,
                leadScore: 70
            }
        ];

        setLeads(mockLeads);
        setFilteredLeads(mockLeads);
        calculateStats(mockLeads);
        setLoading(false);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, leads]);

    const calculateStats = (leadsData) => {
        const total = leadsData.length;
        const statusCounts = leadsData.reduce((acc, lead) => {
            acc[lead.status] = (acc[lead.status] || 0) + 1;
            return acc;
        }, {});

        const converted = statusCounts.converted || 0;
        const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;

        setStats({
            total,
            new: statusCounts.new || 0,
            contacted: statusCounts.contacted || 0,
            qualified: statusCounts.qualified || 0,
            converted,
            conversionRate
        });
    };

    const applyFilters = () => {
        let filtered = [...leads];

        if (filters.status !== "all") {
            filtered = filtered.filter(lead => lead.status === filters.status);
        }

        if (filters.source !== "all") {
            filtered = filtered.filter(lead => lead.source === filters.source);
        }

        if (filters.assignedTo !== "all") {
            filtered = filtered.filter(lead => lead.assignedTo === filters.assignedTo);
        }

        setFilteredLeads(filtered);
        calculateStats(filtered);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "new": return "bg-blue-100 text-blue-800";
            case "contacted": return "bg-yellow-100 text-yellow-800";
            case "qualified": return "bg-green-100 text-green-800";
            case "converted": return "bg-purple-100 text-purple-800";
            case "lost": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getSourceIcon = (source) => {
        switch (source) {
            case "website": return "🌐";
            case "referral": return "👥";
            case "social_media": return "📱";
            case "advertisement": return "📢";
            default: return "📝";
        }
    };

    const handleViewLead = (lead) => {
        setSelectedLead(lead);
        setShowModal(true);
    };

    const handleUpdateStatus = (leadId, newStatus) => {
        setLeads(leads.map(lead =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
        ));
    };

    const handleDeleteLead = (leadId) => {
        const lead = leads.find(l => l.id === leadId);
        if (window.confirm(`Are you sure you want to delete lead "${lead?.name}"?`)) {
            setLeads(leads.filter(lead => lead.id !== leadId));
        }
    };

    const handleAddLead = () => {
        if (!newLead.name || !newLead.phone) {
            alert("Please fill in at least name and phone number");
            return;
        }

        const leadToAdd = {
            ...newLead,
            id: Date.now(),
            status: "new",
            createdAt: new Date(),
            followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            priority: "medium",
            notes: [],
            lastContact: null,
            leadScore: 50
        };

        setLeads([leadToAdd, ...leads]);
        setNewLead({
            name: "",
            email: "",
            phone: "",
            location: "",
            propertyType: "",
            budget: "",
            source: "call",
            message: "",
            assignedTo: ""
        });
        setShowAddModal(false);
        alert(`✅ Lead "${leadToAdd.name}" added successfully!`);
    };

    const handleAddNote = () => {
        if (!leadNotes.trim()) return;

        const updatedLeads = leads.map(lead => {
            if (lead.id === selectedLead.id) {
                const newNote = {
                    date: new Date(),
                    note: leadNotes,
                    by: "Current User" // Replace with actual user
                };
                return {
                    ...lead,
                    notes: [...(lead.notes || []), newNote],
                    lastContact: new Date()
                };
            }
            return lead;
        });

        setLeads(updatedLeads);
        setSelectedLead({
            ...selectedLead,
            notes: [...(selectedLead.notes || []), {
                date: new Date(),
                note: leadNotes,
                by: "Current User"
            }]
        });
        setLeadNotes("");
        alert("✅ Note added successfully!");
    };

    const handleCallLead = (phone) => {
        window.open(`tel:${phone}`, '_self');
    };

    const handleWhatsAppLead = (phone, name) => {
        const message = `Hi ${name}, Thank you for your interest in Namma Smart City Properties. How can we help you today?`;
        const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const exportLeads = () => {
        const csvContent = [
            ['Name', 'Phone', 'Email', 'Location', 'Property Type', 'Budget', 'Status', 'Source', 'Assigned To', 'Created Date'],
            ...filteredLeads.map(lead => [
                lead.name,
                lead.phone,
                lead.email,
                lead.location,
                lead.propertyType,
                lead.budget,
                lead.status,
                lead.source,
                lead.assignedTo,
                lead.createdAt.toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
        
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Sales Lead Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Manage calls, DMs, and track your sales pipeline
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <FiPlus className="w-4 h-4" />
                                Add Lead
                            </motion.button>
                            <button
                                onClick={onClose}
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <FiX className="w-4 h-4" />
                                Back to Dashboard
                            </button>
                        </div>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Total Leads</p>
                                    <p className="text-2xl font-bold mt-1">{stats.total}</p>
                                </div>
                                <FiTarget className="text-3xl text-white/80" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">New</p>
                                    <p className="text-2xl font-bold mt-1">{stats.new}</p>
                                </div>
                                <FiStar className="text-3xl text-white/80" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-2xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Contacted</p>
                                    <p className="text-2xl font-bold mt-1">{stats.contacted}</p>
                                </div>
                                <FiPhoneCall className="text-3xl text-white/80" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-2xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Qualified</p>
                                    <p className="text-2xl font-bold mt-1">{stats.qualified}</p>
                                </div>
                                <FiUserCheck className="text-3xl text-white/80" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Converted</p>
                                    <p className="text-2xl font-bold mt-1">{stats.converted}</p>
                                </div>
                                <FiTrendingUp className="text-3xl text-white/80" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 rounded-2xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Conversion</p>
                                    <p className="text-2xl font-bold mt-1">{stats.conversionRate}%</p>
                                </div>
                                <FiTarget className="text-3xl text-white/80" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Filters and Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <FiFilter className="text-gray-500" />
                                    <select
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="new">🆕 New</option>
                                        <option value="contacted">📞 Contacted</option>
                                        <option value="qualified">✅ Qualified</option>
                                        <option value="converted">🎉 Converted</option>
                                        <option value="lost">❌ Lost</option>
                                    </select>
                                </div>

                                <select
                                    value={filters.source}
                                    onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                >
                                    <option value="all">All Sources</option>
                                    <option value="call">📞 Phone Call</option>
                                    <option value="whatsapp">� WhantsApp</option>
                                    <option value="facebook">📘 Facebook</option>
                                    <option value="instagram">� Instagramo</option>
                                    <option value="website">🌐 Website</option>
                                    <option value="referral">👥 Referral</option>
                                </select>

                                <select
                                    value={filters.assignedTo}
                                    onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                >
                                    <option value="all">All Team Members</option>
                                    {salesTeam.map(member => (
                                        <option key={member.id} value={member.name}>{member.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={exportLeads}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <FiDownload className="w-4 h-4" />
                                    <span>Export CSV</span>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-auto">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading leads...</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Lead Info
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Requirements
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                                        <span className="text-white font-medium text-sm">
                                                            {lead.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {lead.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                                        <span className="mr-1">{getSourceIcon(lead.source)}</span>
                                                        {lead.source.replace('_', ' ')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                <div className="flex items-center mb-1">
                                                    <FiPhone className="w-3 h-3 mr-2 text-gray-400" />
                                                    {lead.phone}
                                                </div>
                                                <div className="flex items-center">
                                                    <FiMail className="w-3 h-3 mr-2 text-gray-400" />
                                                    {lead.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                <div className="flex items-center mb-1">
                                                    <FiMapPin className="w-3 h-3 mr-2 text-gray-400" />
                                                    {lead.location}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {lead.propertyType} • {lead.budget}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                                                className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${getStatusColor(lead.status)}`}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="qualified">Qualified</option>
                                                <option value="converted">Converted</option>
                                                <option value="lost">Lost</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleCallLead(lead.phone)}
                                                    className="p-2 bg-green-100 text-green-700 hover:text-white hover:bg-green-600 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-600 rounded-lg transition-all duration-200 border-2 border-green-300 dark:border-green-700 hover:border-green-600 shadow-md hover:shadow-lg"
                                                    title="Call Lead"
                                                >
                                                    <FiPhone className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleWhatsAppLead(lead.phone, lead.name)}
                                                    className="p-2 bg-emerald-100 text-emerald-700 hover:text-white hover:bg-emerald-600 dark:bg-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-600 rounded-lg transition-all duration-200 border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-600 shadow-md hover:shadow-lg"
                                                    title="WhatsApp"
                                                >
                                                    <FiMessageSquare className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleViewLead(lead)}
                                                    className="p-2 bg-blue-100 text-blue-700 hover:text-white hover:bg-blue-600 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-600 rounded-lg transition-all duration-200 border-2 border-blue-300 dark:border-blue-700 hover:border-blue-600 shadow-md hover:shadow-lg"
                                                    title="View Details"
                                                >
                                                    <FiEye className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDeleteLead(lead.id)}
                                                    className="p-2 bg-red-100 text-red-700 hover:text-white hover:bg-red-600 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-600 rounded-lg transition-all duration-200 border-2 border-red-300 dark:border-red-700 hover:border-red-600 shadow-md hover:shadow-lg"
                                                    title="Delete Lead"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Lead Details Section - Inline */}
            {selectedLead && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-6">
                    <div className="p-6">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        {selectedLead.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {selectedLead.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Lead Score: {selectedLead.leadScore}/100
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Lead Information */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h4>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <FiPhone className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{selectedLead.phone}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCallLead(selectedLead.phone)}
                                            className="ml-auto p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                        >
                                            <FiPhoneCall className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <FiMail className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{selectedLead.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <FiMapPin className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{selectedLead.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h5>
                                    <div className="space-y-2">
                                        <p><span className="text-gray-600 dark:text-gray-400">Property Type:</span> <span className="font-medium">{selectedLead.propertyType}</span></p>
                                        <p><span className="text-gray-600 dark:text-gray-400">Budget:</span> <span className="font-medium">{selectedLead.budget}</span></p>
                                        <p><span className="text-gray-600 dark:text-gray-400">Source:</span> <span className="font-medium capitalize">{selectedLead.source}</span></p>
                                        <p><span className="text-gray-600 dark:text-gray-400">Assigned To:</span> <span className="font-medium">{selectedLead.assignedTo}</span></p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Initial Message</h5>
                                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                        {selectedLead.message}
                                    </p>
                                </div>
                            </div>

                            {/* Notes and Activity */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Notes & Activity</h4>
                                    <button
                                        onClick={() => setShowNotesModal(true)}
                                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                                    >
                                        <FiPlus className="w-4 h-4" />
                                        <span>Add Note</span>
                                    </button>
                                </div>

                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {selectedLead.notes && selectedLead.notes.length > 0 ? (
                                        selectedLead.notes.map((note, index) => (
                                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{note.by}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {note.date.toLocaleDateString()} {note.date.toLocaleTimeString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">{note.note}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No notes yet</p>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                                        <span className="text-sm font-medium">{selectedLead.createdAt.toLocaleDateString()}</span>
                                    </div>
                                    {selectedLead.lastContact && (
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Last Contact:</span>
                                            <span className="text-sm font-medium">{selectedLead.lastContact.toLocaleDateString()}</span>
                                        </div>
                                    )}
                                    {selectedLead.followUpDate && (
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Follow Up:</span>
                                            <span className="text-sm font-medium text-orange-600">{selectedLead.followUpDate.toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleCallLead(selectedLead.phone)}
                                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                >
                                    <FiPhone className="w-4 h-4" />
                                    <span>Call</span>
                                </button>
                                <button
                                    onClick={() => handleWhatsAppLead(selectedLead.phone, selectedLead.name)}
                                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                                >
                                    <FiMessageSquare className="w-4 h-4" />
                                    <span>WhatsApp</span>
                                </button>
                            </div>
                            <select
                                value={selectedLead.status}
                                onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value)}
                                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                            >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="converted">Converted</option>
                                <option value="lost">Lost</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Lead Form - Inline */}
            {showAddModal && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-6">
                    <div className="p-6">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Lead</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newLead.name}
                                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                        placeholder="Enter lead name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={newLead.phone}
                                        onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={newLead.email}
                                        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={newLead.location}
                                        onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                        placeholder="Davanagere, Karnataka"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Property Type
                                    </label>
                                    <select
                                        value={newLead.propertyType}
                                        onChange={(e) => setNewLead({ ...newLead, propertyType: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="1BHK Apartment">1BHK Apartment</option>
                                        <option value="2BHK Apartment">2BHK Apartment</option>
                                        <option value="3BHK Apartment">3BHK Apartment</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Plot">Residential Plot</option>
                                        <option value="Commercial">Commercial Space</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Budget
                                    </label>
                                    <input
                                        type="text"
                                        value={newLead.budget}
                                        onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                        placeholder="25-40 Lakhs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Source
                                    </label>
                                    <select
                                        value={newLead.source}
                                        onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                    >
                                        <option value="call">📞 Phone Call</option>
                                        <option value="whatsapp">💬 WhatsApp</option>
                                        <option value="facebook">📘 Facebook</option>
                                        <option value="instagram">📸 Instagram</option>
                                        <option value="website">🌐 Website</option>
                                        <option value="referral">👥 Referral</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Assign To
                                </label>
                                <select
                                    value={newLead.assignedTo}
                                    onChange={(e) => setNewLead({ ...newLead, assignedTo: e.target.value })}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                >
                                    <option value="">Select Team Member</option>
                                    {salesTeam.map(member => (
                                        <option key={member.id} value={member.name}>{member.name} - {member.role}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message/Requirements
                                </label>
                                <textarea
                                    value={newLead.message}
                                    onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                                    rows={3}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                    placeholder="Enter lead requirements or initial message..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddLead}
                                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-medium"
                            >
                                <FiPlus className="w-4 h-4" />
                                <span>Add Lead</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Note Form - Inline */}
            {showNotesModal && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-6">
                    <div className="p-6">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Note</h3>
                            <button
                                onClick={() => setShowNotesModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            <textarea
                                value={leadNotes}
                                onChange={(e) => setLeadNotes(e.target.value)}
                                rows={4}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                                placeholder="Enter your note about this lead..."
                            />
                        </div>

                        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setShowNotesModal(false)}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddNote}
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                <FiSend className="w-4 h-4" />
                                <span>Add Note</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
               
            </div>

    );
};

export default LeadsManagement;
