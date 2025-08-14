import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
    FiUser,
    FiPhone,
    FiMail,
    FiMapPin,
    FiCalendar,
    FiEye,
    FiTrash2,
    FiFilter,
    FiDownload,
    FiX,
    FiPlus,
    FiMessageSquare,
    FiUserCheck,
    FiTrendingUp,
    FiTarget,
    FiStar,
    FiPhoneCall,
    FiSend,
    FiSearch,
    FiRefreshCw,
    FiUpload,
    FiFileText,
    FiAlertCircle,
    FiCheckCircle,
    FiSettings,
    FiArrowLeft
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
    getLeads,
    createLead,
    updateLead,
    deleteLead,
    addLeadNote,
    getLeadStats,
    logLeadActivity,
    searchLeads,
    bulkUpdateLeads,
    testDatabaseConnection
} from "../supabase/leadService";
import { onAdminAuthStateChanged } from "../supabase/adminService";

const LeadsPage = () => {
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    // const [currentView, setCurrentView] = useState('table');
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // const [importFile, setImportFile] = useState(null);
    const [importData, setImportData] = useState([]);
    const [duplicateLeads, setDuplicateLeads] = useState([]);
    const [importLoading, setImportLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: "all",
        source: "all",
        priority: "all",
        assignedTo: "all"
    });
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        lost: 0,
        conversionRate: 0,
        thisMonth: 0
    });
    const [newLead, setNewLead] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        property_type: "",
        budget: "",
        source: "call",
        message: "",
        assigned_to: "",
        priority: "medium",
        lead_type: "buyer"
    });
    const [leadNotes, setLeadNotes] = useState("");
    const [salesTeam] = useState([
        "Rajesh Kumar",
        "Priya Sharma",
        "Amit Patel",
        "Sneha Reddy"
    ]);

    useEffect(() => {
        let unsubscribe;

        const checkAuth = () => {
            // Check if user came from admin dashboard (simple session check)
            const adminSession = sessionStorage.getItem('admin-session');
            const lastAdminAccess = localStorage.getItem('last-admin-access');
            const now = Date.now();

            // If accessed within last 30 minutes, consider authenticated
            if (lastAdminAccess && (now - parseInt(lastAdminAccess)) < 30 * 60 * 1000) {
                console.log('Admin session found via localStorage');
                setIsAdmin(true);
                setAuthLoading(false);
                return;
            }

            // Check if coming directly from admin dashboard
            if (adminSession === 'active') {
                console.log('Admin session found via sessionStorage');
                setIsAdmin(true);
                setAuthLoading(false);
                return;
            }

            // Try Supabase auth as fallback
            try {
                unsubscribe = onAdminAuthStateChanged((user) => {
                    console.log('Admin auth state changed:', user);
                    if (user) {
                        // Store session info for future access
                        sessionStorage.setItem('admin-session', 'active');
                        localStorage.setItem('last-admin-access', Date.now().toString());
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                    setAuthLoading(false);
                });
            } catch (error) {
                console.error("Auth initialization error:", error);
                setIsAdmin(false);
                setAuthLoading(false);
            }
        };

        checkAuth();

        // Fallback timeout to ensure loading state doesn't persist
        const timeout = setTimeout(() => {
            setAuthLoading(false);
        }, 3000);

        return () => {
            if (unsubscribe) unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (isAdmin) {
            loadLeads();
            loadStats();
        }
    }, [isAdmin]);



    const loadLeads = async () => {
        try {
            console.log('Loading leads...');
            setLoading(true);
            const result = await getLeads();
            if (result.success) {
                console.log('Leads loaded successfully:', result.data.length);
                setLeads(result.data);
            } else {
                console.error('Failed to load leads:', result.error);
                // Set sample data as fallback for testing
                setLeads([
                    {
                        id: 1,
                        name: "Test Lead",
                        phone: "+91 9876543210",
                        email: "test@example.com",
                        location: "Davanagere, Karnataka",
                        property_type: "2BHK Apartment",
                        budget: "45-60 Lakhs",
                        status: "new",
                        source: "call",
                        priority: "medium",
                        assigned_to: "Test User",
                        created_at: new Date().toISOString(),
                        message: "Test lead for development"
                    }
                ]);
            }
        } catch (error) {
            console.error('Error in loadLeads:', error);
            setLeads([]);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            console.log('Loading stats...');
            const result = await getLeadStats();
            if (result.success) {
                console.log('Stats loaded successfully:', result.data);
                setStats(result.data);
            } else {
                console.error('Failed to load stats:', result.error);
                // Set default stats as fallback
                setStats({
                    total: 0,
                    new: 0,
                    contacted: 0,
                    qualified: 0,
                    converted: 0,
                    lost: 0,
                    conversionRate: 0,
                    thisMonth: 0
                });
            }
        } catch (error) {
            console.error('Error in loadStats:', error);
            setStats({
                total: 0,
                new: 0,
                contacted: 0,
                qualified: 0,
                converted: 0,
                lost: 0,
                conversionRate: 0,
                thisMonth: 0
            });
        }
    };

    const applyFilters = useCallback(() => {
        let filtered = [...leads];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(lead =>
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.phone.includes(searchTerm) ||
                lead.location?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply other filters
        if (filters.status !== "all") {
            filtered = filtered.filter(lead => lead.status === filters.status);
        }
        if (filters.source !== "all") {
            filtered = filtered.filter(lead => lead.source === filters.source);
        }
        if (filters.priority !== "all") {
            filtered = filtered.filter(lead => lead.priority === filters.priority);
        }
        if (filters.assignedTo !== "all") {
            filtered = filtered.filter(lead => lead.assigned_to === filters.assignedTo);
        }

        setFilteredLeads(filtered);
    }, [leads, searchTerm, filters]);

    useEffect(() => {
        if (isAdmin) {
            applyFilters();
        }
    }, [isAdmin, applyFilters]);

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            setLoading(true);
            const result = await searchLeads(searchTerm);
            if (result.success) {
                setLeads(result.data);
            }
            setLoading(false);
        } else {
            loadLeads();
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "new": return "bg-blue-100 text-blue-800 border-blue-200";
            case "contacted": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "qualified": return "bg-green-100 text-green-800 border-green-200";
            case "converted": return "bg-purple-100 text-purple-800 border-purple-200";
            case "lost": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high": return "bg-red-100 text-red-800";
            case "medium": return "bg-yellow-100 text-yellow-800";
            case "low": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getSourceIcon = (source) => {
        switch (source) {
            case "call": return "📞";
            case "whatsapp": return "💬";
            case "facebook": return "📘";
            case "instagram": return "📷";
            case "website": return "🌐";
            case "referral": return "👥";
            default: return "📝";
        }
    };

    const handleViewLead = (lead) => {
        setSelectedLead(lead);
        setShowModal(true);
    };

    const handleUpdateStatus = async (leadId, newStatus) => {
        const result = await updateLead(leadId, { status: newStatus });
        if (result.success) {
            loadLeads();
            loadStats();
        }
    };

    const handleDeleteLead = async (leadId) => {
        const lead = leads.find(l => l.id === leadId);
        if (window.confirm(`Are you sure you want to delete lead "${lead?.name}"?`)) {
            const result = await deleteLead(leadId);
            if (result.success) {
                loadLeads();
                loadStats();
            }
        }
    };

    const handleAddLead = async () => {
        if (!newLead.name || !newLead.phone) {
            alert("Please fill in at least name and phone number");
            return;
        }

        console.log('Adding lead with data:', newLead);

        // Test database connection first
        const dbTest = await testDatabaseConnection();
        if (!dbTest.success) {
            console.error('Database test failed:', dbTest);
            alert(`❌ Database Connection Failed: ${dbTest.error}\n\n🔧 QUICK FIX:\n1. Open Supabase Dashboard (supabase.com)\n2. Go to SQL Editor\n3. Run the setup-leads-db.sql script\n4. Click "Test DB" button to verify\n\n📖 See DATABASE_SETUP_GUIDE.md for detailed instructions\n\nError details: ${dbTest.details?.message || 'Unknown error'}`);
            return;
        }

        const result = await createLead(newLead);
        console.log('Create lead result:', result);

        if (result.success) {
            setNewLead({
                name: "",
                email: "",
                phone: "",
                location: "",
                property_type: "",
                budget: "",
                source: "call",
                message: "",
                assigned_to: "",
                priority: "medium",
                lead_type: "buyer"
            });
            setShowAddModal(false);
            loadLeads();
            loadStats();
            alert(`✅ Lead "${result.data.name}" added successfully!`);
        } else {
            console.error('Failed to add lead:', result.error);
            alert(`❌ Failed to add lead: ${result.error}\n\n🔧 QUICK FIX:\n1. Open Supabase Dashboard (supabase.com)\n2. Go to SQL Editor → New Query\n3. Copy & run setup-leads-db.sql script\n4. Try adding the lead again\n\n📖 See DATABASE_SETUP_GUIDE.md for step-by-step instructions\n\nCommon causes:\n• Database tables not created yet\n• Missing required fields (Name, Phone)\n• Database connection issue`);
        }
    };

    const handleAddNote = async () => {
        if (!leadNotes.trim()) return;

        const result = await addLeadNote(selectedLead.id, leadNotes, "Current User");
        if (result.success) {
            setLeadNotes("");
            loadLeads();
            alert("✅ Note added successfully!");
        } else {
            alert(`❌ Failed to add note: ${result.error}`);
        }
    };

    const handleCallLead = async (lead) => {
        window.open(`tel:${lead.phone}`, '_self');
        await logLeadActivity(lead.id, 'call', `Phone call initiated to ${lead.phone}`, 'Current User');
        loadLeads();
    };

    const handleWhatsAppLead = async (lead) => {
        const message = `Hi ${lead.name}, Thank you for your interest in Namma Smart City Properties. How can we help you today?`;
        const whatsappUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        await logLeadActivity(lead.id, 'whatsapp', `WhatsApp message sent to ${lead.name}`, 'Current User');
        loadLeads();
    };

    const handleEmailLead = async (lead) => {
        const subject = "Thank you for your interest in Namma Smart City Properties";
        const body = `Dear ${lead.name},\n\nThank you for your interest in our properties. We would love to help you find your dream property.\n\nBest regards,\nNamma Smart City Properties Team`;
        window.open(`mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
        await logLeadActivity(lead.id, 'email', `Email sent to ${lead.email}`, 'Current User');
        loadLeads();
    };

    const toggleLeadSelection = (leadId) => {
        setSelectedLeads(prev =>
            prev.includes(leadId)
                ? prev.filter(id => id !== leadId)
                : [...prev, leadId]
        );
    };

    const handleBulkStatusUpdate = async (newStatus) => {
        if (selectedLeads.length === 0) return;

        const result = await bulkUpdateLeads(selectedLeads, { status: newStatus });
        if (result.success) {
            setSelectedLeads([]);
            loadLeads();
            loadStats();
            alert(`✅ Updated ${selectedLeads.length} leads to ${newStatus}`);
        }
    };

    const handleTestDatabase = async () => {
        console.log('Testing database connection...');
        const result = await testDatabaseConnection();

        if (result.success) {
            alert(`✅ Database Connection Successful!\n\n${result.message}\nRecord count: ${result.recordCount}`);
        } else {
            alert(`❌ Database Connection Failed!\n\nError: ${result.error}\n\nDetails: ${result.details?.message || 'Unknown error'}\n\nPlease:\n1. Check internet connection\n2. Verify Supabase is running\n3. Run database setup script`);
        }
    };

    const exportLeads = () => {
        const csvContent = [
            ['Name', 'Phone', 'Email', 'Location', 'Property Type', 'Budget', 'Lead Type', 'Status', 'Source', 'Priority', 'Assigned To', 'Created Date'],
            ...filteredLeads.map(lead => [
                lead.name,
                lead.phone,
                lead.email || '',
                lead.location || '',
                lead.property_type || '',
                lead.budget || '',
                lead.lead_type || 'buyer',
                lead.status,
                lead.source,
                lead.priority,
                lead.assigned_to || '',
                new Date(lead.created_at).toLocaleDateString()
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

    // Excel Import Functions
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log('File selected:', file);

        if (!file) {
            alert('No file selected');
            return;
        }

        // Check file type
        const validTypes = ['.csv', 'text/csv', 'application/vnd.ms-excel', 'text/plain', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        const fileExtension = file.name.toLowerCase().split('.').pop();

        if (!['csv', 'xlsx', 'xls'].includes(fileExtension) && !validTypes.includes(file.type)) {
            alert('Please select a CSV or Excel file (.csv, .xlsx, .xls)');
            return;
        }

        if (file.size === 0) {
            alert('File is empty');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('File is too large. Please use a file smaller than 5MB');
            return;
        }

        console.log('File validation passed, processing...');

        // Determine file type and process accordingly
        if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            processExcelFile(file, 'excel');
        } else {
            processExcelFile(file, 'csv');
        }

        // Clear the input so the same file can be selected again
        event.target.value = '';
    };

    const processExcelFile = (file, fileType = 'csv') => {
        console.log('🔄 Starting file processing:', file.name, file.type, file.size, 'Type:', fileType);
        setImportLoading(true);

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                let data;

                if (fileType === 'excel') {
                    // For Excel files, we'll try to parse as binary and convert to CSV-like format
                    console.log('📄 Processing Excel file...');

                    // Simple Excel parsing - this is a basic approach
                    // For production, you'd want to use a library like xlsx
                    const arrayBuffer = e.target.result;
                    const uint8Array = new Uint8Array(arrayBuffer);

                    // Convert to string and try to extract readable text
                    let textContent = '';
                    for (let i = 0; i < uint8Array.length; i++) {
                        const char = uint8Array[i];
                        // Only include printable ASCII characters and common separators
                        if ((char >= 32 && char <= 126) || char === 9 || char === 10 || char === 13) {
                            textContent += String.fromCharCode(char);
                        } else if (char === 0) {
                            // Null bytes often separate cells in Excel
                            textContent += ',';
                        }
                    }

                    // Clean up the extracted text
                    data = textContent
                        .replace(/\r\n/g, '\n')
                        .replace(/\r/g, '\n')
                        .replace(/,+/g, ',') // Replace multiple commas with single comma
                        .replace(/,\n/g, '\n') // Remove trailing commas
                        .replace(/\n+/g, '\n') // Replace multiple newlines with single
                        .trim();

                    console.log('📄 Extracted Excel data length:', data.length);
                    console.log('📄 First 300 characters:', data.substring(0, 300));
                } else {
                    // CSV file processing
                    data = e.target.result;
                    console.log('📄 CSV file read successfully, length:', data.length);
                    console.log('📄 First 200 characters:', data.substring(0, 200));
                }

                if (!data || data.trim().length === 0) {
                    throw new Error('File is empty');
                }

                // Simple line splitting
                const lines = data.split(/\r?\n/).filter(line => line.trim().length > 0);
                console.log('📄 Total lines:', lines.length);

                if (lines.length < 2) {
                    throw new Error('File needs header + data rows');
                }

                // Get headers from first line
                const headerLine = lines[0];
                console.log('📋 Header line:', headerLine);

                // Simple comma split for headers
                const headers = headerLine.split(',').map(h => h.replace(/['"]/g, '').trim().toLowerCase());
                console.log('📋 Headers:', headers);

                // Find required columns
                let nameCol = -1, phoneCol = -1, emailCol = -1, locationCol = -1;
                let propertyCol = -1, budgetCol = -1, sourceCol = -1, messageCol = -1;
                let leadTypeCol = -1, statusCol = -1, priorityCol = -1, assignedCol = -1;
                
                // Extended fields
                let ownerCol = -1, contactCol = -1, plotNoCol = -1, sizeCol = -1;
                let directionCol = -1, priceCol = -1, negotiableCol = -1, addressCol = -1;
                let landmarkCol = -1, commissionCol = -1, ageCol = -1, waterCol = -1;

                headers.forEach((header, index) => {
                    const cleanHeader = header.toLowerCase().trim();
                    // Core fields
                    if (cleanHeader.includes('name') || cleanHeader.includes('customer') || cleanHeader.includes('client')) nameCol = index;
                    else if (cleanHeader.includes('phone') || cleanHeader.includes('mobile')) phoneCol = index;
                    else if (cleanHeader.includes('email') || cleanHeader.includes('mail')) emailCol = index;
                    else if (cleanHeader.includes('location') || cleanHeader.includes('city')) locationCol = index;
                    else if (cleanHeader.includes('property type') || cleanHeader.includes('propertytype')) propertyCol = index;
                    else if (cleanHeader.includes('budget') || cleanHeader.includes('amount')) budgetCol = index;
                    else if (cleanHeader.includes('source') || cleanHeader.includes('channel')) sourceCol = index;
                    else if (cleanHeader.includes('message') || cleanHeader.includes('note') || cleanHeader.includes('comment')) messageCol = index;
                    else if (cleanHeader.includes('lead type') || cleanHeader.includes('leadtype') || cleanHeader.includes('seller') || cleanHeader.includes('buyer') || cleanHeader.includes('category')) leadTypeCol = index;
                    else if (cleanHeader.includes('status') || cleanHeader.includes('stage')) statusCol = index;
                    else if (cleanHeader.includes('priority') || cleanHeader.includes('importance')) priorityCol = index;
                    else if (cleanHeader.includes('assigned') || cleanHeader.includes('sales')) assignedCol = index;
                    
                    // Extended fields
                    else if (cleanHeader.includes('owner')) ownerCol = index;
                    else if (cleanHeader.includes('contact') && !cleanHeader.includes('phone')) contactCol = index;
                    else if (cleanHeader.includes('plot') || cleanHeader.includes('plot no')) plotNoCol = index;
                    else if (cleanHeader.includes('size')) sizeCol = index;
                    else if (cleanHeader.includes('direction') || cleanHeader.includes('facing')) directionCol = index;
                    else if (cleanHeader.includes('price') && !cleanHeader.includes('budget')) priceCol = index;
                    else if (cleanHeader.includes('negotiable')) negotiableCol = index;
                    else if (cleanHeader.includes('address')) addressCol = index;
                    else if (cleanHeader.includes('landmark')) landmarkCol = index;
                    else if (cleanHeader.includes('commission')) commissionCol = index;
                    else if (cleanHeader.includes('age')) ageCol = index;
                    else if (cleanHeader.includes('water')) waterCol = index;
                });

                console.log('📋 Column mapping:', { nameCol, phoneCol, emailCol, locationCol, propertyCol, budgetCol, sourceCol, messageCol, leadTypeCol, statusCol, priorityCol, assignedCol });

                if (nameCol === -1 || phoneCol === -1) {
                    throw new Error('Could not find Name and Phone columns. Headers found: ' + headers.join(', '));
                }

                const processedData = [];
                const duplicates = [];
                const skippedRows = [];

                // Process each data row
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;

                    console.log(`📝 Processing row ${i}: ${line}`);

                    // Simple CSV parsing
                    const values = [];
                    let current = '';
                    let inQuotes = false;

                    for (let j = 0; j < line.length; j++) {
                        const char = line[j];
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                            values.push(current.trim().replace(/^["']|["']$/g, ''));
                            current = '';
                        } else {
                            current += char;
                        }
                    }
                    values.push(current.trim().replace(/^["']|["']$/g, ''));

                    console.log(`📝 Values:`, values);

                    // Extract core lead data
                    const name = values[nameCol] ? values[nameCol].trim() : '';
                    const phone = values[phoneCol] ? values[phoneCol].trim().replace(/[^\d+\-\s()]/g, '') : '';
                    const email = values[emailCol] ? values[emailCol].trim() : '';
                    const location = values[locationCol] ? values[locationCol].trim() : '';
                    const property_type = values[propertyCol] ? values[propertyCol].trim() : '';
                    const budget = values[budgetCol] ? values[budgetCol].trim() : '';
                    const source = values[sourceCol] ? values[sourceCol].trim().toLowerCase() : 'call';
                    const message = values[messageCol] ? values[messageCol].trim() : '';

                    // Extract status fields
                    const leadType = values[leadTypeCol] ? values[leadTypeCol].trim().toLowerCase() : '';
                    const status = values[statusCol] ? values[statusCol].trim().toLowerCase() : 'new';
                    const priority = values[priorityCol] ? values[priorityCol].trim().toLowerCase() : 'medium';
                    const assigned_to = values[assignedCol] ? values[assignedCol].trim() : '';
                    
                    // Extract extended fields
                    const owner = values[ownerCol] ? values[ownerCol].trim() : '';
                    const contact = values[contactCol] ? values[contactCol].trim() : '';
                    const plot_no = values[plotNoCol] ? values[plotNoCol].trim() : '';
                    const size = values[sizeCol] ? values[sizeCol].trim() : '';
                    const direction = values[directionCol] ? values[directionCol].trim() : '';
                    const price = values[priceCol] ? values[priceCol].trim() : '';
                    const negotiable = values[negotiableCol] ? values[negotiableCol].trim() : '';
                    const address = values[addressCol] ? values[addressCol].trim() : '';
                    const landmark = values[landmarkCol] ? values[landmarkCol].trim() : '';
                    const commission = values[commissionCol] ? values[commissionCol].trim() : '';
                    const age = values[ageCol] ? values[ageCol].trim() : '';
                    const water = values[waterCol] ? values[waterCol].trim() : '';

                    console.log(`📝 Extracted:`, { name, phone, email, location, property_type, budget, source, message, leadType, status, priority, assigned_to });

                    // Validate required fields
                    if (name && phone && phone.length >= 10) {
                        // Determine lead type (seller/buyer)
                        let finalLeadType = 'buyer'; // default
                        if (leadType.includes('sell') || leadType.includes('seller')) {
                            finalLeadType = 'seller';
                        } else if (leadType.includes('buy') || leadType.includes('buyer')) {
                            finalLeadType = 'buyer';
                        }

                        const leadData = {
                            // Core fields
                            name: name || owner,
                            phone: phone || contact,
                            email: email && email.includes('@') ? email.toLowerCase() : '',
                            location: location || address,
                            property_type,
                            budget: budget || price,
                            source: ['call', 'whatsapp', 'facebook', 'instagram', 'website', 'referral'].includes(source) ? source : 'call',
                            message,
                            lead_type: finalLeadType,
                            status: ['new', 'contacted', 'qualified', 'converted', 'lost'].includes(status) ? status : 'new',
                            priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
                            assigned_to,
                            
                            // Extended fields
                            owner,
                            contact,
                            plot_no,
                            size,
                            direction,
                            price,
                            negotiable,
                            address,
                            landmark,
                            commission,
                            age,
                            water
                        };

                        // Check duplicates
                        const isDuplicate = leads.some(existingLead =>
                            existingLead.phone === phone ||
                            (existingLead.email && email && existingLead.email === email)
                        );

                        if (isDuplicate) {
                            duplicates.push({ ...leadData, rowNumber: i + 1 });
                            console.log(`⚠️ Duplicate: ${name}`);
                        } else {
                            processedData.push({ ...leadData, rowNumber: i + 1 });
                            console.log(`✅ Valid: ${name}`);
                        }
                    } else {
                        const reason = !name ? 'No name' : !phone ? 'No phone' : 'Phone too short';
                        skippedRows.push({ rowNumber: i + 1, reason, data: { name, phone } });
                        console.log(`❌ Skipped row ${i + 1}: ${reason}`);
                    }
                }

                console.log('✅ Final results:');
                console.log('- Valid leads:', processedData.length);
                console.log('- Duplicates:', duplicates.length);
                console.log('- Skipped:', skippedRows.length);

                setImportData(processedData);
                setDuplicateLeads(duplicates);
                setImportLoading(false);

                if (processedData.length === 0 && duplicates.length === 0) {
                    alert(`❌ No valid leads found!\n\nHeaders: ${headers.join(', ')}\nSkipped: ${skippedRows.length} rows\nReasons: ${skippedRows.map(r => `Row ${r.rowNumber}: ${r.reason}`).join(', ')}`);
                    return;
                }

                // Show success and next step
                if (duplicates.length > 0) {
                    setShowDuplicateModal(true);
                } else if (processedData.length > 0) {
                    setShowImportModal(true);
                }

            } catch (error) {
                console.error('❌ Error:', error);
                alert(`❌ Error: ${error.message}\n\nPlease check:\n• File is CSV format\n• Has Name and Phone columns\n• Contains valid data`);
                setImportLoading(false);
            }
        };

        reader.onerror = () => {
            alert('❌ Could not read file');
            setImportLoading(false);
        };

        // Read file based on type
        if (fileType === 'excel') {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file, 'UTF-8');
        }
    };

    const handleImportLeads = async () => {
        setImportLoading(true);
        let successCount = 0;
        let errorCount = 0;

        for (const leadData of importData) {
            const result = await createLead(leadData);
            if (result.success) {
                successCount++;
            } else {
                errorCount++;
            }
        }

        setImportLoading(false);
        setShowImportModal(false);
        setImportData([]);

        loadLeads();
        loadStats();

        alert(`Import completed! ${successCount} leads imported successfully. ${errorCount} failed.`);
    };

    const handleDuplicateAction = async (action) => {
        if (action === 'import_all') {
            const allData = [...importData, ...duplicateLeads];
            setImportData(allData);
            setDuplicateLeads([]);
            setShowDuplicateModal(false);
            setShowImportModal(true);
        } else if (action === 'skip_duplicates') {
            setDuplicateLeads([]);
            setShowDuplicateModal(false);
            if (importData.length > 0) {
                setShowImportModal(true);
            } else {
                alert('No new leads to import after removing duplicates.');
            }
        } else if (action === 'cancel') {
            setImportData([]);
            setDuplicateLeads([]);
            setShowDuplicateModal(false);
        }
    };

    const downloadExcelTemplate = () => {
        const templateContent = [
            // Header row with all supported column variations
            ['Name', 'Phone', 'Email', 'Location', 'Property Type', 'Budget', 'Lead Type', 'Source', 'Message', 'Status', 'Priority', 'Assigned To'],
            // Sample data rows
            ['John Doe', '+91 9876543210', 'john@example.com', 'Davanagere, Karnataka', '2BHK Apartment', '45-60 Lakhs', 'buyer', 'call', 'Interested in ready-to-move properties', 'new', 'medium', 'Priya Sharma'],
            ['Jane Smith', '+91 9876543211', 'jane@example.com', 'Davanagere, Karnataka', '3BHK Villa', '80-1.2 Crores', 'buyer', 'whatsapp', 'Looking for luxury villa with garden', 'contacted', 'high', 'Amit Patel'],
            ['Mike Johnson', '+91 9876543212', 'mike@example.com', 'Davanagere, Karnataka', 'Residential Plot', '30-45 Lakhs', 'seller', 'facebook', 'Needs DTCP approved plot for construction', 'qualified', 'low', 'Rajesh Kumar'],
            // Instructions row
            ['', '', '', '', '', '', '', '', '', '', ''],
            ['INSTRUCTIONS:', 'Required field', 'Optional', 'Optional', 'Optional', 'Optional', 'buyer/seller', 'call/whatsapp/facebook/instagram/website/referral', 'Optional', 'new/contacted/qualified/converted/lost', 'low/medium/high', 'Optional'],
            ['Supported column names:', 'Name, Full Name, Customer Name', 'Phone, Mobile, Contact, Phone Number', 'Email, Email ID, Email Address', 'Location, City, Address', 'Property Type, Property, Requirement', 'Budget, Price Range, Budget Range', 'Source, Lead Source', 'Message, Notes, Comments', 'Status', 'Priority', 'Assigned To, Assigned, Sales Person']
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([templateContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leads_import_template.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const exportLeadsExcel = () => {
        // Enhanced Excel export with additional fields and formatting
        const excelContent = [
            [
                'ID', 'Name', 'Phone', 'Email', 'Location', 'Property Type', 'Budget',
                'Status', 'Source', 'Priority', 'Assigned To', 'Lead Score',
                'Created Date', 'Last Contact', 'Follow Up Date', 'Message'
            ],
            ...filteredLeads.map(lead => [
                lead.id,
                lead.name,
                lead.phone,
                lead.email || '',
                lead.location || '',
                lead.property_type || '',
                lead.budget || '',
                lead.status,
                lead.source,
                lead.priority,
                lead.assigned_to || '',
                lead.lead_score || 50,
                new Date(lead.created_at).toLocaleDateString(),
                lead.last_contact ? new Date(lead.last_contact).toLocaleDateString() : '',
                lead.follow_up_date ? new Date(lead.follow_up_date).toLocaleDateString() : '',
                lead.message || ''
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([excelContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads_detailed_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
                        <FiSettings className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Admin Access Required</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Please login to the admin panel to access the Lead Management System.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/admin')}
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Go to Admin Login
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                You will be redirected to the admin login page
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 sm:pt-28 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                >
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 lg:mb-8 space-y-4 lg:space-y-0">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                                    <FiSettings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                        Lead Management System
                                    </h1>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                                        Admin Dashboard - Manage your sales pipeline
                                    </p>
                                </div>
                            </div>
                            
                            {/* Quick Stats - Mobile Responsive */}
                            <div className="mt-4 grid grid-cols-2 lg:flex lg:items-center lg:space-x-6 gap-2 lg:gap-0 text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400">Total: {stats.total}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400">Converted: {stats.converted}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400">Rate: {stats.conversionRate}%</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400">Month: {stats.thisMonth}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Buttons - Mobile Responsive */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => navigate('/admin')}
                                className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600 w-full sm:w-auto"
                            >
                                <FiArrowLeft className="w-4 h-4" />
                                <span>Back to Admin</span>
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                            >
                                <FiPlus className="w-4 h-4" />
                                <span>Add Lead</span>
                            </motion.button>

                            <div className="relative w-full sm:w-auto">
                                <input
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    disabled={importLoading}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 w-full"
                                    disabled={importLoading}
                                >
                                    <FiUpload className="w-4 h-4" />
                                    <span>{importLoading ? 'Processing...' : 'Import Excel'}</span>
                                </motion.button>
                            </div>

                            {/* Secondary Actions - Hidden on mobile, shown in dropdown */}
                            <div className="hidden sm:flex gap-2">
                                <button
                                    onClick={downloadExcelTemplate}
                                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    <FiFileText className="w-4 h-4" />
                                    <span className="hidden lg:inline">Template</span>
                                </button>

                                <button
                                    onClick={handleTestDatabase}
                                    className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    <FiSettings className="w-4 h-4" />
                                    <span className="hidden lg:inline">Test DB</span>
                                </button>

                                <button
                                    onClick={loadLeads}
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FiRefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                            
                            {/* Mobile Secondary Actions */}
                            <div className="flex sm:hidden gap-2">
                                <button
                                    onClick={downloadExcelTemplate}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex-1"
                                >
                                    <FiFileText className="w-4 h-4" />
                                    <span>Template</span>
                                </button>

                                <button
                                    onClick={handleTestDatabase}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex-1"
                                >
                                    <FiSettings className="w-4 h-4" />
                                    <span>Test DB</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-xs font-medium">Total</p>
                                    <p className="text-xl font-bold mt-1">{stats.total}</p>
                                </div>
                                <FiTarget className="text-2xl text-white/80" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-xs font-medium">New</p>
                                    <p className="text-xl font-bold mt-1">{stats.new}</p>
                                </div>
                                <FiStar className="text-2xl text-white/80" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-xs font-medium">Contacted</p>
                                    <p className="text-xl font-bold mt-1">{stats.contacted}</p>
                                </div>
                                <FiPhoneCall className="text-2xl text-white/80" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-xs font-medium">Qualified</p>
                                    <p className="text-xl font-bold mt-1">{stats.qualified}</p>
                                </div>
                                <FiUserCheck className="text-2xl text-white/80" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-xs font-medium">Converted</p>
                                    <p className="text-xl font-bold mt-1">{stats.converted}</p>
                                </div>
                                <FiTrendingUp className="text-2xl text-white/80" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-xs font-medium">Lost</p>
                                    <p className="text-xl font-bold mt-1">{stats.lost}</p>
                                </div>
                                <FiX className="text-2xl text-white/80" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-xs font-medium">Conversion</p>
                                    <p className="text-xl font-bold mt-1">{stats.conversionRate}%</p>
                                </div>
                                <FiTarget className="text-2xl text-white/80" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-xl text-white shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-xs font-medium">This Month</p>
                                    <p className="text-xl font-bold mt-1">{stats.thisMonth}</p>
                                </div>
                                <FiCalendar className="text-2xl text-white/80" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            {/* Search */}
                            <div className="flex items-center space-x-2 flex-1 min-w-64">
                                <div className="relative flex-1">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search leads..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg border border-blue-500"
                                >
                                    Search
                                </button>
                            </div>

                            {/* Filters */}
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
                                    <option value="whatsapp">💬 WhatsApp</option>
                                    <option value="facebook">📘 Facebook</option>
                                    <option value="instagram">📷 Instagram</option>
                                    <option value="website">🌐 Website</option>
                                    <option value="referral">👥 Referral</option>
                                </select>

                                <select
                                    value={filters.priority}
                                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="high">🔴 High</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="low">🟢 Low</option>
                                </select>

                                <select
                                    value={filters.assignedTo}
                                    onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                >
                                    <option value="all">All Team Members</option>
                                    {salesTeam.map(member => (
                                        <option key={member} value={member}>{member}</option>
                                    ))}
                                </select>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={exportLeads}
                                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500"
                                    >
                                        <FiDownload className="w-4 h-4" />
                                        <span>Export CSV</span>
                                    </button>
                                    <button
                                        onClick={exportLeadsExcel}
                                        className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl border border-green-500"
                                    >
                                        <FiFileText className="w-4 h-4" />
                                        <span>Export Excel</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bulk Actions */}
                        {selectedLeads.length > 0 && (
                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-800 dark:text-blue-200 font-medium">
                                        {selectedLeads.length} leads selected
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleBulkStatusUpdate('contacted')}
                                            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded text-sm shadow-md hover:shadow-lg border border-yellow-500"
                                        >
                                            Mark Contacted
                                        </button>
                                        <button
                                            onClick={() => handleBulkStatusUpdate('qualified')}
                                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-bold rounded text-sm shadow-md hover:shadow-lg border border-green-500"
                                        >
                                            Mark Qualified
                                        </button>
                                        <button
                                            onClick={() => setSelectedLeads([])}
                                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
                                        >
                                            Clear Selection
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

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
                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedLeads(filteredLeads.map(lead => lead.id));
                                                    } else {
                                                        setSelectedLeads([]);
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </th>
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
                                            Status & Priority
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLeads.includes(lead.id)}
                                                    onChange={() => toggleLeadSelection(lead.id)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </td>
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
                                                            {lead.assigned_to && (
                                                                <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                                    {lead.assigned_to}
                                                                </span>
                                                            )}
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
                                                    {lead.email && (
                                                        <div className="flex items-center">
                                                            <FiMail className="w-3 h-3 mr-2 text-gray-400" />
                                                            {lead.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {lead.location && (
                                                        <div className="flex items-center mb-1">
                                                            <FiMapPin className="w-3 h-3 mr-2 text-gray-400" />
                                                            {lead.location}
                                                        </div>
                                                    )}
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {lead.property_type && `${lead.property_type} • `}
                                                        {lead.budget}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-2">
                                                    <select
                                                        value={lead.status}
                                                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                                                        className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(lead.status)}`}
                                                    >
                                                        <option value="new">🆕 New</option>
                                                        <option value="contacted">📞 Contacted</option>
                                                        <option value="qualified">✅ Qualified</option>
                                                        <option value="converted">🎉 Converted</option>
                                                        <option value="lost">❌ Lost</option>
                                                    </select>
                                                    <div className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(lead.priority)}`}>
                                                        {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)} Priority
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleCallLead(lead)}
                                                        className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-lg hover:shadow-md transition-all duration-200 border border-green-500"
                                                        title="Call Lead"
                                                    >
                                                        <FiPhone className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleWhatsAppLead(lead)}
                                                        className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-lg hover:shadow-md transition-all duration-200 border border-green-500"
                                                        title="WhatsApp"
                                                    >
                                                        <FiMessageSquare className="w-4 h-4" />
                                                    </button>
                                                    {lead.email && (
                                                        <button
                                                            onClick={() => handleEmailLead(lead)}
                                                            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg hover:shadow-md transition-all duration-200 border border-blue-500"
                                                            title="Send Email"
                                                        >
                                                            <FiMail className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleViewLead(lead)}
                                                        className="text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg hover:shadow-md transition-all duration-200 border border-indigo-500"
                                                        title="View Details"
                                                    >
                                                        <FiEye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLead(lead.id)}
                                                        className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-lg hover:shadow-md transition-all duration-200 border border-red-500"
                                                        title="Delete Lead"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Empty State */}
                    {!loading && filteredLeads.length === 0 && (
                        <div className="p-8 text-center">
                            <FiUser className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No leads found</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {searchTerm || Object.values(filters).some(f => f !== 'all')
                                    ? 'Try adjusting your search or filters.'
                                    : 'Get started by adding your first lead.'}
                            </p>
                            {!searchTerm && Object.values(filters).every(f => f === 'all') && (
                                <div className="mt-6">
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="inline-flex items-center px-4 py-2 border border-blue-500 shadow-lg text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                    >
                                        <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                                        Add Lead
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Add Lead Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Lead</h2>
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={newLead.name}
                                            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter full name"
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
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={newLead.email}
                                            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="City, State"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Property Type
                                        </label>
                                        <select
                                            value={newLead.property_type}
                                            onChange={(e) => setNewLead({ ...newLead, property_type: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select Property Type</option>
                                            <option value="1BHK Apartment">1BHK Apartment</option>
                                            <option value="2BHK Apartment">2BHK Apartment</option>
                                            <option value="3BHK Apartment">3BHK Apartment</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Residential Plot">Residential Plot</option>
                                            <option value="Commercial Space">Commercial Space</option>
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
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="call">Phone Call</option>
                                            <option value="whatsapp">WhatsApp</option>
                                            <option value="facebook">Facebook</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="website">Website</option>
                                            <option value="referral">Referral</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Priority
                                        </label>
                                        <select
                                            value={newLead.priority}
                                            onChange={(e) => setNewLead({ ...newLead, priority: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="low">Low Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="high">High Priority</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Lead Type
                                        </label>
                                        <select
                                            value={newLead.lead_type}
                                            onChange={(e) => setNewLead({ ...newLead, lead_type: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="buyer">🏠 Buyer</option>
                                            <option value="seller">💰 Seller</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Assign To
                                        </label>
                                        <select
                                            value={newLead.assigned_to}
                                            onChange={(e) => setNewLead({ ...newLead, assigned_to: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select Team Member</option>
                                            {salesTeam.map(member => (
                                                <option key={member} value={member}>{member}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Message/Notes
                                        </label>
                                        <textarea
                                            value={newLead.message}
                                            onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter any additional information..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddLead}
                                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl border border-emerald-500"
                                    >
                                        Add Lead
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* View Lead Modal */}
                {showModal && selectedLead && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {selectedLead.name}
                                        </h2>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                                                {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedLead.priority)}`}>
                                                {selectedLead.priority.charAt(0).toUpperCase() + selectedLead.priority.slice(1)} Priority
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Lead Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <FiPhone className="text-gray-400" />
                                                <span className="text-gray-900 dark:text-white">{selectedLead.phone}</span>
                                                <button
                                                    onClick={() => handleCallLead(selectedLead)}
                                                    className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-100"
                                                >
                                                    <FiPhoneCall className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {selectedLead.email && (
                                                <div className="flex items-center space-x-3">
                                                    <FiMail className="text-gray-400" />
                                                    <span className="text-gray-900 dark:text-white">{selectedLead.email}</span>
                                                    <button
                                                        onClick={() => handleEmailLead(selectedLead)}
                                                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                                                    >
                                                        <FiSend className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}

                                            {selectedLead.location && (
                                                <div className="flex items-center space-x-3">
                                                    <FiMapPin className="text-gray-400" />
                                                    <span className="text-gray-900 dark:text-white">{selectedLead.location}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center space-x-3">
                                                <FiCalendar className="text-gray-400" />
                                                <span className="text-gray-900 dark:text-white">
                                                    Created: {new Date(selectedLead.created_at).toLocaleDateString()}
                                                </span>
                                            </div>

                                            {selectedLead.assigned_to && (
                                                <div className="flex items-center space-x-3">
                                                    <FiUser className="text-gray-400" />
                                                    <span className="text-gray-900 dark:text-white">
                                                        Assigned to: {selectedLead.assigned_to}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Requirements</h3>
                                        <div className="space-y-2">
                                            {selectedLead.property_type && (
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    <strong>Property Type:</strong> {selectedLead.property_type}
                                                </p>
                                            )}
                                            {selectedLead.budget && (
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    <strong>Budget:</strong> {selectedLead.budget}
                                                </p>
                                            )}
                                            <p className="text-gray-600 dark:text-gray-400">
                                                <strong>Source:</strong> {getSourceIcon(selectedLead.source)} {selectedLead.source.replace('_', ' ')}
                                            </p>
                                        </div>

                                        {selectedLead.message && (
                                            <>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Initial Message</h3>
                                                <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                                    {selectedLead.message}
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    {/* Notes and Activities */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notes & Activities</h3>
                                            <button
                                                onClick={() => setShowNotesModal(true)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Add Note
                                            </button>
                                        </div>

                                        <div className="max-h-96 overflow-y-auto space-y-3">
                                            {/* Notes */}
                                            {selectedLead.lead_notes?.map((note) => (
                                                <div key={note.id} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-500">
                                                    <p className="text-gray-900 dark:text-white text-sm">{note.note}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        By {note.created_by} • {new Date(note.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            ))}

                                            {/* Activities */}
                                            {selectedLead.lead_activities?.map((activity) => (
                                                <div key={activity.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                                    <p className="text-gray-900 dark:text-white text-sm">{activity.description}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {activity.activity_type} • By {activity.created_by} • {new Date(activity.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            ))}

                                            {(!selectedLead.lead_notes?.length && !selectedLead.lead_activities?.length) && (
                                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                                    No notes or activities yet. Add the first note to start tracking interactions.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleCallLead(selectedLead)}
                                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl border border-green-500"
                                        >
                                            <FiPhone className="w-4 h-4" />
                                            <span>Call</span>
                                        </button>
                                        <button
                                            onClick={() => handleWhatsAppLead(selectedLead)}
                                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl border border-green-500"
                                        >
                                            <FiMessageSquare className="w-4 h-4" />
                                            <span>WhatsApp</span>
                                        </button>
                                        {selectedLead.email && (
                                            <button
                                                onClick={() => handleEmailLead(selectedLead)}
                                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl border border-blue-500"
                                            >
                                                <FiMail className="w-4 h-4" />
                                                <span>Email</span>
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Add Note Modal */}
                {showNotesModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Note</h3>
                                    <button
                                        onClick={() => setShowNotesModal(false)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>
                                <textarea
                                    value={leadNotes}
                                    onChange={(e) => setLeadNotes(e.target.value)}
                                    placeholder="Enter your note here..."
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="flex justify-end space-x-3 mt-4">
                                    <button
                                        onClick={() => setShowNotesModal(false)}
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddNote}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl border border-blue-500"
                                    >
                                        Add Note
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Import Preview Modal */}
                {showImportModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Import Preview</h2>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                                            Review {importData.length} leads before importing
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowImportModal(false)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="max-h-96 overflow-y-auto overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <table className="w-full min-w-max">
                                        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Phone</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Location</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Property Type</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Budget/Price</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Size</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Direction</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Landmark</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {importData.map((lead, index) => (
                                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{lead.name || lead.owner || '-'}</td>
                                                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{lead.phone || lead.contact || '-'}</td>
                                                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{lead.location || lead.address || '-'}</td>
                                                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{lead.property_type || lead['Property Type'] || '-'}</td>
                                                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{lead.budget || lead.price || lead['Budget'] || lead['Price'] || '-'}</td>
                                                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{lead.size || lead['Size'] || '-'}</td>
                                                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{lead.direction || lead['Direction'] || '-'}</td>
                                                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{lead.landmark || lead['Landmark'] || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-between items-center mt-6">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <FiCheckCircle className="inline w-4 h-4 mr-1 text-green-500" />
                                        {importData.length} leads ready to import
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setShowImportModal(false)}
                                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleImportLeads}
                                            disabled={importLoading}
                                            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl border border-emerald-500 disabled:opacity-50"
                                        >
                                            {importLoading ? 'Importing...' : `Import ${importData.length} Leads`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Duplicate Leads Modal */}
                {showDuplicateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Duplicate Leads Found</h2>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                                            {duplicateLeads.length} duplicate leads found. Choose how to handle them.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDuplicateAction('cancel')}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                        <div className="flex items-center mb-2">
                                            <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                            <h3 className="font-semibold text-green-800 dark:text-green-200">New Leads</h3>
                                        </div>
                                        <p className="text-green-700 dark:text-green-300 text-sm">
                                            {importData.length} leads will be imported
                                        </p>
                                    </div>

                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                        <div className="flex items-center mb-2">
                                            <FiAlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Duplicates</h3>
                                        </div>
                                        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                                            {duplicateLeads.length} leads already exist (matched by phone/email)
                                        </p>
                                    </div>
                                </div>

                                <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Phone</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {duplicateLeads.map((lead, index) => (
                                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{lead.name}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{lead.phone}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{lead.email || '-'}</td>
                                                    <td className="px-4 py-2">
                                                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                                            Duplicate
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Choose how to handle duplicate leads
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleDuplicateAction('cancel')}
                                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            Cancel Import
                                        </button>
                                        <button
                                            onClick={() => handleDuplicateAction('skip_duplicates')}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl border border-blue-500"
                                        >
                                            Skip Duplicates
                                        </button>
                                        <button
                                            onClick={() => handleDuplicateAction('import_all')}
                                            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl border border-emerald-500"
                                        >
                                            Import All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadsPage;