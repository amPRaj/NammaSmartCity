import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiSearch, FiGrid, FiList } from "react-icons/fi";
import { getAllProperties, getFeaturedProperties } from "../../supabase/propertyService";
import ModernPropertyCard from "./ModernPropertyCard";

const PropertiesShowcase = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid");
    const [filters, setFilters] = useState({
        type: "all",
        priceRange: "all",
        areaRange: "all",
        location: ""
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadProperties();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [properties, filters, searchTerm]);

    const loadProperties = async () => {
        setLoading(true);
        const result = await getAllProperties();
        if (result.success) {
            setProperties(result.data);
        }
        setLoading(false);
    };

    const applyFilters = () => {
        let filtered = [...properties];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Type filter
        if (filters.type !== "all") {
            filtered = filtered.filter(property => property.type === filters.type);
        }

        // Price range filter
        if (filters.priceRange !== "all") {
            const [min, max] = filters.priceRange.split("-").map(Number);
            filtered = filtered.filter(property => {
                if (max) {
                    return property.price >= min && property.price <= max;
                } else {
                    return property.price >= min;
                }
            });
        }

        // Area range filter
        if (filters.areaRange !== "all") {
            const [min, max] = filters.areaRange.split("-").map(Number);
            filtered = filtered.filter(property => {
                if (max) {
                    return property.area >= min && property.area <= max;
                } else {
                    return property.area >= min;
                }
            });
        }

        // Location filter
        if (filters.location && filters.location !== "all") {
            filtered = filtered.filter(property =>
                property.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        setFilteredProperties(filtered);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };



    const propertyTypes = ["all", "apartment", "villa", "house", "commercial", "plot"];
    const priceRanges = [
        { label: "All Prices", value: "all" },
        { label: "Under ₹50L", value: "0-5000000" },
        { label: "₹50L - ₹1Cr", value: "5000000-10000000" },
        { label: "₹1Cr - ₹2Cr", value: "10000000-20000000" },
        { label: "Above ₹2Cr", value: "20000000" }
    ];
    const areaRanges = [
        { label: "All Areas", value: "all" },
        { label: "Under 1000 sq ft", value: "0-1000" },
        { label: "1000-1500 sq ft", value: "1000-1500" },
        { label: "1500-2000 sq ft", value: "1500-2000" },
        { label: "2000-3000 sq ft", value: "2000-3000" },
        { label: "Above 3000 sq ft", value: "3000" }
    ];
    const locations = ["all", "Azad Nagar", "Bapuji Bazaar", "Basaveshwar Nagar", "Car Street", "Doddapet", "Indira Nagar", "MCC A Block", "MCC B Block", "Nehru Nagar", "P J Extension", "Saraswathi Nagar", "Shamanur Road", "Shanthinagar", "Siddaganga Layout", "Siddganga Badavane", "Vidyanagar", "Vinobanagar"];

    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Premium Properties
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Discover extraordinary homes powered by cutting-edge technology and 360° marketing solutions
                    </motion.p>
                </div>

                {/* Filters and Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
                >
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search properties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Minimal Filters */}
                        <div className="flex flex-wrap gap-4 items-center">
                            {/* Property Type */}
                            <select
                                value={filters.type}
                                onChange={(e) => handleFilterChange("type", e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white min-w-[140px]"
                            >
                                {propertyTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type === "all" ? "Property Type" : type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>

                            {/* Area Range */}
                            <select
                                value={filters.areaRange}
                                onChange={(e) => handleFilterChange("areaRange", e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white min-w-[140px]"
                            >
                                {areaRanges.map(range => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>

                            {/* Price Range */}
                            <select
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white min-w-[140px]"
                            >
                                {priceRanges.map(range => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>

                            {/* Location */}
                            <select
                                value={filters.location}
                                onChange={(e) => handleFilterChange("location", e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white min-w-[140px]"
                            >
                                {locations.map(location => (
                                    <option key={location} value={location}>
                                        {location === "all" ? "Location" : location}
                                    </option>
                                ))}
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-md ${viewMode === "grid"
                                        ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                        : "text-gray-600 dark:text-gray-400"
                                        }`}
                                >
                                    <FiGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md ${viewMode === "list"
                                        ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                        : "text-gray-600 dark:text-gray-400"
                                        }`}
                                >
                                    <FiList className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing {filteredProperties.length} of {properties.length} properties
                    </p>
                </div>

                {/* Properties Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                                <div className="h-64 bg-gray-300 dark:bg-gray-600"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-4"></div>
                                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProperties.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`grid gap-8 ${viewMode === "grid"
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1"
                            }`}
                    >
                        {filteredProperties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ModernPropertyCard
                                    property={property}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No properties found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search criteria or filters
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertiesShowcase;