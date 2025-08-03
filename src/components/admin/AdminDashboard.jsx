import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
    FiPlus,
    FiEdit,
    FiTrash2,
    FiEye,
    FiBarChart2,
    FiHome,
    FiDollarSign,
    FiTrendingUp,
    FiUsers,
    FiUserCheck
} from "react-icons/fi";
import { getAllProperties, deleteProperty } from "../../supabase/propertyService";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ onAddProperty, onEditProperty, onViewCalculator }) => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProperties: 0,
        totalValue: 0,
        avgPrice: 0,
        featuredCount: 0
    });

    const loadProperties = useCallback(async () => {
        setLoading(true);
        const result = await getAllProperties();
        if (result.success) {
            setProperties(result.data);
            calculateStats(result.data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadProperties();
    }, [loadProperties]);

    const calculateStats = (propertiesData) => {
        const totalProperties = propertiesData.length;
        const totalValue = propertiesData.reduce((sum, prop) => sum + (prop.price || 0), 0);
        const avgPrice = totalProperties > 0 ? totalValue / totalProperties : 0;
        const featuredCount = propertiesData.filter(prop => prop.featured).length;

        setStats({
            totalProperties,
            totalValue,
            avgPrice,
            featuredCount
        });
    };

    const handleDeleteProperty = async (id) => {
        const property = properties.find(p => p.id === id);
        const propertyName = property?.title || 'this property';

        if (window.confirm(`⚠️ Are you sure you want to delete "${propertyName}"?\n\nThis action cannot be undone.`)) {
            const result = await deleteProperty(id);
            if (result.success) {
                alert(`✅ Property "${propertyName}" has been deleted successfully.`);
                loadProperties();
            } else {
                alert(`❌ Failed to delete property: ${result.error}`);
            }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${color} p-6 rounded-2xl text-white shadow-lg`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <Icon className="text-3xl text-white/80" />
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 lg:mb-8 space-y-4 lg:space-y-0">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage your smart city properties
                        </p>
                        <div
                            onClick={() => {
                                // Set session storage to indicate admin access
                                sessionStorage.setItem('admin-session', 'active');
                                localStorage.setItem('last-admin-access', Date.now().toString());
                                navigate('/admin/leads');
                            }}
                            className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                💡 <strong>Lead Management:</strong> Click here or use the buttons below to access the lead management system
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons - Mobile Responsive */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                // Set session storage to indicate admin access
                                sessionStorage.setItem('admin-session', 'active');
                                localStorage.setItem('last-admin-access', Date.now().toString());
                                navigate('/admin/leads');
                            }}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                        >
                            <FiUserCheck className="w-4 h-4" />
                            <span>Manage Leads</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onViewCalculator}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                        >
                            <FiBarChart2 className="w-4 h-4" />
                            <span>Calculator</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onAddProperty}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                        >
                            <FiPlus className="w-4 h-4" />
                            <span>Add Property</span>
                        </motion.button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={FiHome}
                        title="Total Properties"
                        value={stats.totalProperties}
                        color="from-blue-500 via-blue-600 to-indigo-600"
                    />
                    <StatCard
                        icon={FiDollarSign}
                        title="Total Value"
                        value={formatCurrency(stats.totalValue)}
                        color="from-emerald-500 via-green-600 to-teal-600"
                    />
                    <StatCard
                        icon={FiTrendingUp}
                        title="Average Price"
                        value={formatCurrency(stats.avgPrice)}
                        color="from-purple-500 via-violet-600 to-purple-600"
                    />
                    <StatCard
                        icon={FiUsers}
                        title="Featured Properties"
                        value={stats.featuredCount}
                        color="from-orange-500 via-amber-600 to-yellow-600"
                    />
                </div>

                {/* Properties Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Properties Management
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading properties...</p>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="text-gray-400 mb-4">
                                <FiHome className="w-16 h-16 mx-auto mb-4" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No Properties Yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Get started by adding your first property to the system.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onAddProperty}
                                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium mx-auto shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <FiPlus className="w-4 h-4" />
                                Add Your First Property
                            </motion.button>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Property
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-32">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {properties.map((property) => (
                                            <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img
                                                            className="h-12 w-12 rounded-lg object-cover"
                                                            src={property.images?.[0] || "/images/property (1).jpg"}
                                                            alt={property.title}
                                                        />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {property.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {property.location}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {formatCurrency(property.price)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {property.type}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${property.featured
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                        }`}>
                                                        {property.featured ? 'Featured' : 'Regular'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => window.open(`/property/${property.id}`, '_blank')}
                                                            className="p-2 text-emerald-600 hover:text-white hover:bg-emerald-600 dark:text-emerald-400 dark:hover:text-white dark:hover:bg-emerald-500 rounded-lg transition-all duration-200 border border-emerald-200 dark:border-emerald-600 shadow-sm hover:shadow-md"
                                                            title="View Property"
                                                        >
                                                            <FiEye className="w-4 h-4" />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => onEditProperty(property)}
                                                            className="p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 dark:text-indigo-400 dark:hover:text-white dark:hover:bg-indigo-500 rounded-lg transition-all duration-200 border border-indigo-200 dark:border-indigo-600 shadow-sm hover:shadow-md"
                                                            title="Edit Property"
                                                        >
                                                            <FiEdit className="w-4 h-4" />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleDeleteProperty(property.id)}
                                                            className="p-2 text-rose-600 hover:text-white hover:bg-rose-600 dark:text-rose-400 dark:hover:text-white dark:hover:bg-rose-500 rounded-lg transition-all duration-200 border border-rose-200 dark:border-rose-600 shadow-sm hover:shadow-md"
                                                            title="Delete Property"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden space-y-4">
                                {properties.map((property) => (
                                    <motion.div
                                        key={property.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <img
                                                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                                                src={property.images?.[0] || "/images/property (1).jpg"}
                                                alt={property.title}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {property.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                    {property.location}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <div className="flex flex-col space-y-1">
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {formatCurrency(property.price)}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {property.type}
                                                        </span>
                                                    </div>
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${property.featured
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                        }`}>
                                                        {property.featured ? 'Featured' : 'Regular'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-end space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => window.open(`/property/${property.id}`, '_blank')}
                                                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                                            >
                                                <FiEye className="w-3 h-3" />
                                                <span>View</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => onEditProperty(property)}
                                                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                                            >
                                                <FiEdit className="w-3 h-3" />
                                                <span>Edit</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleDeleteProperty(property.id)}
                                                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
                                            >
                                                <FiTrash2 className="w-3 h-3" />
                                                <span>Delete</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;