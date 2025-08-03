import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAdminAuthStateChanged, adminLogout } from "../../supabase/adminService";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import PropertyForm from "./PropertyForm";
import PropertyCalculator from "./PropertyCalculator";
import LeadsManagement from "./LeadsManagement";
import PropertyEstimation from "./PropertyEstimation";
import { FiLogOut, FiUser, FiUsers, FiGrid } from "react-icons/fi";

const AdminPanel = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState("dashboard");
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showSecretLogin, setShowSecretLogin] = useState(false);
    const [error, setError] = useState(null);

    console.log("AdminPanel rendering, admin:", admin, "loading:", loading);

    useEffect(() => {
        let unsubscribe;

        try {
            unsubscribe = onAdminAuthStateChanged((user) => {
                setAdmin(user);
                if (user) {
                    // Set session storage when admin is authenticated
                    sessionStorage.setItem('admin-session', 'active');
                    localStorage.setItem('last-admin-access', Date.now().toString());
                } else {
                    // Clear session storage when admin logs out
                    sessionStorage.removeItem('admin-session');
                    localStorage.removeItem('last-admin-access');
                }
                setLoading(false);
            });
        } catch (error) {
            console.error("Auth initialization error:", error);
            setLoading(false);
        }

        // Fallback timeout to ensure loading state doesn't persist
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            if (unsubscribe) unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    const handleLogin = (user) => {
        setAdmin(user);
        // Set session storage when admin logs in
        sessionStorage.setItem('admin-session', 'active');
        localStorage.setItem('last-admin-access', Date.now().toString());
    };

    const handleLogout = async () => {
        await adminLogout();
        setAdmin(null);
        setCurrentView("dashboard");
        // Clear session storage when admin logs out
        sessionStorage.removeItem('admin-session');
        localStorage.removeItem('last-admin-access');
    };

    const handleAddProperty = () => {
        setSelectedProperty(null);
        setCurrentView("form");
    };

    const handleEditProperty = (property) => {
        setSelectedProperty(property);
        setCurrentView("form");
    };

    const handleViewCalculator = () => {
        setCurrentView("calculator");
    };

    // const handleViewLeads = () => {
    //     setCurrentView("leads");
    // };

    const handleViewEstimation = () => {
        setCurrentView("estimation");
    };

    // Secret key combination to show admin login
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Press Ctrl + Shift + A to show admin login
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                setShowSecretLogin(true);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const handleCloseModal = () => {
        setCurrentView("dashboard");
        setSelectedProperty(null);
    };

    const handleSaveProperty = () => {
        setCurrentView("dashboard");
        setSelectedProperty(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading Admin Panel...</p>
                </div>
            </div>
        );
    }

    if (!admin) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 md:pt-20">
            {/* Admin Header */}
            <div className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <FiUser className="text-white text-sm" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Welcome, Admin
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {admin?.email || 'admin@nammasmartcity.com'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <FiLogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="fixed top-24 md:top-28 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-4 md:space-x-8 overflow-x-auto">
                        <button
                            onClick={() => setCurrentView("dashboard")}
                            className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${currentView === "dashboard"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                                }`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/admin/leads')}
                            className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${currentView === "leads"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                                }`}
                        >
                            <FiUsers className="w-4 h-4" />
                            <span>Leads</span>
                        </button>
                        <button
                            onClick={handleViewEstimation}
                            className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${currentView === "estimation"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                                }`}
                        >
                            <FiGrid className="w-4 h-4" />
                            <span>Estimation</span>
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-24 md:pt-32">
                {currentView === "dashboard" && (
                    <AdminDashboard
                        onAddProperty={handleAddProperty}
                        onEditProperty={handleEditProperty}
                        onViewCalculator={handleViewCalculator}
                    />
                )}
                {currentView === "leads" && (
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                        <LeadsManagement onClose={() => setCurrentView("dashboard")} />
                    </div>
                )}
                {currentView === "estimation" && (
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                        <PropertyEstimation onClose={() => setCurrentView("dashboard")} />
                    </div>
                )}
            </div>

            {/* Modals */}
            {currentView === "form" && (
                <PropertyForm
                    property={selectedProperty}
                    onClose={handleCloseModal}
                    onSave={handleSaveProperty}
                />
            )}

            {currentView === "calculator" && (
                <PropertyCalculator onClose={handleCloseModal} />
            )}




        </div>
    );
};

export default AdminPanel;