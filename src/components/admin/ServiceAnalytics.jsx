import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FiTrendingUp, 
    FiUsers, 
    FiMousePointer, 
    FiCalendar,
    FiRefreshCw,
    FiBarChart2,
    FiPieChart,
    FiActivity
} from 'react-icons/fi';
import { 
    getServiceAnalytics, 
    getServiceClicks, 
    getPopularServices 
} from '../../supabase/serviceClickService';

const ServiceAnalytics = () => {
    const [analytics, setAnalytics] = useState([]);
    const [recentClicks, setRecentClicks] = useState([]);
    const [popularServices, setPopularServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [timeFilter, setTimeFilter] = useState('7d');

    useEffect(() => {
        loadAnalytics();
    }, [timeFilter]);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            
            // Load analytics data
            const analyticsResult = await getServiceAnalytics();
            if (analyticsResult.success) {
                setAnalytics(analyticsResult.data);
            }

            // Load recent clicks
            const clicksResult = await getServiceClicks({ limit: 50 });
            if (clicksResult.success) {
                setRecentClicks(clicksResult.data);
            }

            // Load popular services
            const popularResult = await getPopularServices(10);
            if (popularResult.success) {
                setPopularServices(popularResult.data);
            }

        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadAnalytics();
        setRefreshing(false);
    };

    // Calculate summary stats
    const totalClicks = recentClicks.length;
    const uniqueSessions = new Set(recentClicks.map(click => click.session_id)).size;
    const todayClicks = recentClicks.filter(click => 
        new Date(click.click_timestamp).toDateString() === new Date().toDateString()
    ).length;

    // Group clicks by service category
    const categoryStats = recentClicks.reduce((acc, click) => {
        acc[click.service_category] = (acc[click.service_category] || 0) + 1;
        return acc;
    }, {});

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
                        Service Analytics
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track service interest and user engagement
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Time Filter */}
                    <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    >
                        <option value="1d">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="all">All Time</option>
                    </select>

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

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total Clicks
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {totalClicks}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <FiMousePointer className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Unique Sessions
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {uniqueSessions}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <FiUsers className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Today's Clicks
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {todayClicks}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <FiCalendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Avg. Daily Clicks
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {Math.round(totalClicks / 7)}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                            <FiTrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Services */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Popular Services
                        </h3>
                        <FiBarChart2 className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="space-y-4">
                        {popularServices.slice(0, 8).map((service, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {service.service_name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                        {service.service_category.replace('_', ' ')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ 
                                                width: `${(service.count / popularServices[0]?.count) * 100}%` 
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[30px]">
                                        {service.count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Service Categories
                        </h3>
                        <FiPieChart className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="space-y-4">
                        {Object.entries(categoryStats).map(([category, count], index) => (
                            <div key={category} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full ${
                                        category === 'real_estate' ? 'bg-blue-500' : 'bg-green-500'
                                    }`} />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                        {category.replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {Math.round((count / totalClicks) * 100)}%
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Activity
                    </h3>
                    <FiActivity className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {recentClicks.slice(0, 20).map((click, index) => (
                        <div key={click.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {click.service_name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(click.click_timestamp).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    click.service_category === 'real_estate' 
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                }`}>
                                    {click.service_category.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ServiceAnalytics;