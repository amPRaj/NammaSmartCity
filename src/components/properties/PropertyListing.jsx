import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    FiMapPin,
    FiHome,
    FiMaximize,
    FiEye,
    FiSend,
    FiHeart,
    FiShare2,
    FiSearch,
    FiGrid,
    FiList,
    FiX
} from "react-icons/fi";
import { BiBed } from "react-icons/bi";
import { getAllProperties } from "../../supabase/propertyService";

const PropertyListing = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [viewMode, setViewMode] = useState("grid");

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        type: "all",
        priceRange: "all",
        areaRange: "all",
        location: ""
    });

    useEffect(() => {
        loadProperties();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [properties, filters, searchTerm]);

    const loadProperties = async () => {
        try {
            const result = await getAllProperties();
            if (result.success) {
                setProperties(result.data || []);
                setFilteredProperties(result.data || []);
            }
        } catch (error) {
            console.error("Error loading properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...properties];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.description?.toLowerCase().includes(searchTerm.toLowerCase())
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

    const clearFilters = () => {
        setFilters({
            type: "all",
            priceRange: "all",
            areaRange: "all",
            location: ""
        });
        setSearchTerm("");
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

    const handleViewDetails = (property) => {
        navigate(`/property/${property.id}`);
    };

    const handleSendEnquiry = (property) => {
        // Handle enquiry logic
        alert(`Enquiry sent for ${property.title}`);
    };

    const toggleFavorite = (propertyId) => {
        setFavorites(prev =>
            prev.includes(propertyId)
                ? prev.filter(id => id !== propertyId)
                : [...prev, propertyId]
        );
    };

    const formatPrice = (price) => {
        if (price >= 100) {
            return `₹${(price / 100).toFixed(1)} Cr`;
        } else {
            return `₹${price} L`;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Filters */}
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Premium Properties
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Discover extraordinary homes powered by cutting-edge technology and 360° marketing solutions
                    </motion.p>
                </div>

                {/* Filters and Search - Always Visible */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
                >
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md mx-auto">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search properties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* All Filters and Controls in Single Row */}
                    <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
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

                        {/* Clear Filters */}
                        <button
                            onClick={clearFilters}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <FiX className="w-4 h-4" />
                            <span>Clear</span>
                        </button>

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
                </motion.div>

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing {filteredProperties.length} of {properties.length} properties
                    </p>
                </div>

                {/* Properties Grid */}
                <div className={`grid gap-8 ${viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                    }`}>
                    {filteredProperties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Property Image */}
                            <div className="relative h-64 overflow-hidden">
                                {property.images?.[0] ? (
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                        <FiHome className="w-16 h-16 text-gray-400" />
                                    </div>
                                )}

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleViewDetails(property)}
                                            className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                                        >
                                            <FiEye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => toggleFavorite(property.id)}
                                            className={`p-3 rounded-full transition-colors ${favorites.includes(property.id)
                                                ? "bg-red-500 text-white"
                                                : "bg-white text-gray-900 hover:bg-red-500 hover:text-white"
                                                }`}
                                        >
                                            <FiHeart className="w-5 h-5" />
                                        </button>
                                        <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                                            <FiShare2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Property Type Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                                        {property.type}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {property.featured && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Featured
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Property Info */}
                            <div className="p-6">
                                {/* Title */}
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                    {property.title}
                                </h3>

                                {/* Location */}
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                    <FiMapPin className="w-4 h-4 mr-2" />
                                    <span className="text-sm">{property.location}</span>
                                </div>

                                {/* Property Details */}
                                <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center">
                                        <FiMaximize className="w-4 h-4 mr-1" />
                                        <span>{property.area} sq ft</span>
                                    </div>
                                    {property.bedrooms && (
                                        <div className="flex items-center">
                                            <BiBed className="w-4 h-4 mr-1" />
                                            <span>{property.bedrooms}</span>
                                        </div>
                                    )}
                                    {property.bathrooms && (
                                        <div className="flex items-center">
                                            <FiHome className="w-4 h-4 mr-1" />
                                            <span>{property.bathrooms}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {formatPrice(property.price)}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3 mt-4">
                                    <button
                                        onClick={() => handleViewDetails(property)}
                                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleSendEnquiry(property)}
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
                                    >
                                        <FiSend className="w-4 h-4" />
                                        <span>Send Enquiry</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No Properties Message */}
                {properties.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <FiHome className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Properties Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Check back later for new property listings.
                        </p>
                    </div>
                )}
            </div>


        </div>
    );
};

export default PropertyListing;