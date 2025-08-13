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

const PropertyListing = ({
    showFilters = true,
    showSearch = true,
    maxProperties = null,
    featuredOnly = false,
    title = null,
    showViewModeToggle = true
}) => {
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

    const loadProperties = async (forceRefresh = false) => {
        try {
            console.log('🔄 Loading properties...', forceRefresh ? '(force refresh)' : '');

            // Clear cache if force refresh
            if (forceRefresh) {
                localStorage.removeItem('mock_properties');
            }

            const result = await getAllProperties();
            console.log('📊 Properties result:', result);

            if (result.success) {
                const propertyData = result.data || [];
                console.log('✅ Loaded properties:', propertyData.length);
                setProperties(propertyData);
                setFilteredProperties(propertyData);

                if (propertyData.length === 0) {
                    console.log('⚠️ No properties found in database');
                }
            } else {
                console.error('❌ Failed to load properties:', result.error);
            }
        } catch (error) {
            console.error("❌ Error loading properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...properties];

        // Featured only filter (for home page)
        if (featuredOnly) {
            filtered = filtered.filter(property => property.featured);
        }

        // Search filter
        if (searchTerm && showSearch) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Type filter
        if (filters.type !== "all" && showFilters) {
            filtered = filtered.filter(property => property.type === filters.type);
        }

        // Price range filter
        if (filters.priceRange !== "all" && showFilters) {
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
        if (filters.areaRange !== "all" && showFilters) {
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
        if (filters.location && filters.location !== "all" && showFilters) {
            filtered = filtered.filter(property =>
                property.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        // Limit properties if maxProperties is set
        if (maxProperties) {
            filtered = filtered.slice(0, maxProperties);
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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading properties...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${!showFilters ? 'bg-transparent' : 'min-h-screen bg-gray-50 dark:bg-gray-900'}`}>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Optional Title */}
                {title && (
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {title}
                        </h2>
                    </div>
                )}

                {/* Search and Filters */}
                {(showSearch || showFilters) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6"
                    >
                        {/* Search Bar */}
                        {showSearch && (
                            <div className="mb-4">
                                <div className="relative max-w-md mx-auto">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search properties..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Filters */}
                        {showFilters && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                                {/* Property Type */}
                                <select
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange("type", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {propertyTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>

                                {/* Price Range */}
                                <select
                                    value={filters.priceRange}
                                    onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {priceRanges.map(range => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Area Range */}
                                <select
                                    value={filters.areaRange}
                                    onChange={(e) => handleFilterChange("areaRange", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {areaRanges.map(range => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Location */}
                                <select
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange("location", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    {locations.map(location => (
                                        <option key={location} value={location}>
                                            {location === "all" ? "All Locations" : location}
                                        </option>
                                    ))}
                                </select>

                                {/* Clear Filters */}
                                <button
                                    onClick={clearFilters}
                                    className="w-full flex items-center justify-center space-x-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FiX className="w-3 h-3" />
                                    <span>Clear</span>
                                </button>

                                {/* View Mode Toggle */}
                                {showViewModeToggle && (
                                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`px-2 py-1.5 rounded-md transition-colors text-sm ${viewMode === "grid"
                                                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                                }`}
                                        >
                                            <FiGrid className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={`px-2 py-1.5 rounded-md transition-colors text-sm ${viewMode === "list"
                                                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                                }`}
                                        >
                                            <FiList className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Results Count */}
                {showFilters && (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'}
                            </p>
                            {properties.length > 0 && filteredProperties.length !== properties.length && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    of {properties.length} total
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => loadProperties(true)}
                            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                )}

                {/* Properties Grid */}
                <div className={`grid gap-4 ${viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    : "grid-cols-1 max-w-6xl mx-auto"
                    }`}>
                    {filteredProperties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(index * 0.05, 0.3) }}
                            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group ${viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col h-full"
                                }`}
                        >
                            {/* Property Image */}
                            <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-64 h-48" : "h-48"
                                }`}>
                                {property.images?.[0] ? (
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                        <FiHome className="w-12 h-12 text-blue-300 dark:text-gray-500" />
                                    </div>
                                )}

                                {/* Always Visible Action Buttons */}
                                <div className="absolute top-2 right-2 flex flex-col space-y-1 z-30 opacity-100">
                                    <button
                                        onClick={() => handleViewDetails(property)}
                                        className="bg-white text-black p-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-colors shadow-xl border-2 border-black"
                                        title="View Details"
                                    >
                                        <FiEye className="w-4 h-4 stroke-2" />
                                    </button>
                                    <button
                                        onClick={() => toggleFavorite(property.id)}
                                        className={`p-2.5 rounded-full transition-colors shadow-xl border-2 border-black ${favorites.includes(property.id)
                                            ? "bg-red-500 text-white hover:bg-red-600"
                                            : "bg-white text-black hover:bg-red-500 hover:text-white"
                                            }`}
                                        title={favorites.includes(property.id) ? "Remove from Favorites" : "Add to Favorites"}
                                    >
                                        <FiHeart className={`w-4 h-4 stroke-2 ${favorites.includes(property.id) ? "fill-current" : ""}`} />
                                    </button>
                                    <button
                                        className="bg-white text-black p-2.5 rounded-full hover:bg-green-600 hover:text-white transition-colors shadow-xl border-2 border-black"
                                        title="Share Property"
                                    >
                                        <FiShare2 className="w-4 h-4 stroke-2" />
                                    </button>
                                </div>

                                {/* Property Type Badge */}
                                <div className="absolute top-2 left-2 z-10">
                                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium capitalize">
                                        {property.type}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {property.featured && (
                                    <div className="absolute bottom-2 left-2 z-10">
                                        <span className="bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                                            Featured
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Property Info */}
                            <div className={`p-3 flex flex-col flex-1 ${viewMode === "list" ? "md:flex-1" : ""}`}>
                                {/* Title - Fixed Height */}
                                <div className="relative mb-2 h-10 flex items-start">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight overflow-hidden">
                                        <span className="block" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {property.title}
                                        </span>
                                    </h3>
                                    {property.title.length > (featuredOnly ? 25 : 35) && (
                                        <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-white dark:from-gray-800 via-white/80 dark:via-gray-800/80 to-transparent pointer-events-none"></div>
                                    )}
                                </div>

                                {/* Location - Fixed Height */}
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2 h-4">
                                    <FiMapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="text-xs truncate">{property.location}</span>
                                </div>

                                {/* Property Details - Fixed Height */}
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-600 dark:text-gray-400 h-4">
                                    <div className="flex items-center">
                                        <FiMaximize className="w-3 h-3 mr-0.5" />
                                        <span>{property.area}</span>
                                    </div>
                                    {property.bedrooms && (
                                        <div className="flex items-center">
                                            <BiBed className="w-3 h-3 mr-0.5" />
                                            <span>{property.bedrooms}</span>
                                        </div>
                                    )}
                                    {property.bathrooms && (
                                        <div className="flex items-center">
                                            <FiHome className="w-3 h-3 mr-0.5" />
                                            <span>{property.bathrooms}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Spacer to push content to bottom */}
                                <div className="flex-1"></div>

                                {/* Price - Fixed Height */}
                                <div className="mb-3 h-6 flex items-center">
                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {formatPrice(property.price)}
                                    </div>
                                </div>

                                {/* Action Buttons - Fixed Height */}
                                <div className="flex gap-2 h-8">
                                    <button
                                        onClick={() => handleViewDetails(property)}
                                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-1.5 px-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs font-medium"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleSendEnquiry(property)}
                                        className="flex-1 bg-blue-600 text-white py-1.5 px-2 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                                    >
                                        <FiSend className="w-3 h-3" />
                                        <span>Enquire</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty States */}
                {filteredProperties.length === 0 && properties.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <FiSearch className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            No Properties Match Your Filters
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Try adjusting your search criteria or clear filters to see more properties.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                        >
                            Clear All Filters
                        </button>
                    </motion.div>
                )}

                {properties.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="bg-blue-50 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <FiHome className="w-12 h-12 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            No Properties Available
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            We're working on adding new properties. Check back soon for exciting listings!
                        </p>
                        <button
                            onClick={() => loadProperties(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                        >
                            Refresh Properties
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PropertyListing;