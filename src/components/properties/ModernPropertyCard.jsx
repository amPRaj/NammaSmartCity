import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiHome, FiDroplet, FiMaximize, FiMapPin, FiEye, FiHeart, FiShare2 } from "react-icons/fi";
import { useState } from "react";

const ModernPropertyCard = ({ property }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const formatPrice = (amount) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(1)}Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(0)}L`;
        }
        return `₹${amount}`;
    };

    // Extract clean title (remove long descriptions)
    const getCleanTitle = (title) => {
        if (title.length > 50) {
            return title.substring(0, 50) + '...';
        }
        return title;
    };

    // Get clean description (first line only)
    const getCleanDescription = (description) => {
        if (!description) return '';
        const firstLine = description.split('\n')[0];
        if (firstLine.length > 80) {
            return firstLine.substring(0, 80) + '...';
        }
        return firstLine;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={property.images?.[0] || "/images/property (1).jpg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Always Visible Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-1 z-30 opacity-100">
                    <button
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="bg-white text-black p-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-colors shadow-xl border-2 border-black"
                        title="View Details"
                    >
                        <FiEye className="w-4 h-4 stroke-2" />
                    </button>
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`p-2.5 rounded-full transition-colors shadow-xl border-2 border-black ${isFavorite
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white text-black hover:bg-red-500 hover:text-white"
                            }`}
                        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    >
                        <FiHeart className={`w-4 h-4 stroke-2 ${isFavorite ? "fill-current" : ""}`} />
                    </button>
                    <button 
                        className="bg-white text-black p-2.5 rounded-full hover:bg-green-600 hover:text-white transition-colors shadow-xl border-2 border-black"
                        title="Share Property"
                    >
                        <FiShare2 className="w-4 h-4 stroke-2" />
                    </button>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 right-3">
                    <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                        {formatPrice(property.price * 100000)}
                    </span>
                </div>

                {/* Featured Badge */}
                {property.featured && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                            Featured
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title and Type */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 mr-2">
                        {getCleanTitle(property.title)}
                    </h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium capitalize shrink-0">
                        {property.type}
                    </span>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <FiMapPin className="w-4 h-4 mr-1 shrink-0" />
                    <span className="text-sm">{property.location}</span>
                </div>

                {/* Clean Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {getCleanDescription(property.description)}
                </p>

                {/* Property Features - Clean Layout */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        {property.bedrooms > 0 && (
                            <div className="flex items-center space-x-1">
                                <FiHome className="w-4 h-4" />
                                <span>{property.bedrooms} Beds</span>
                            </div>
                        )}
                        {property.bathrooms > 0 && (
                            <div className="flex items-center space-x-1">
                                <FiDroplet className="w-4 h-4" />
                                <span>{property.bathrooms} Baths</span>
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center space-x-1">
                                <FiMaximize className="w-4 h-4" />
                                <span>{property.area} sq ft</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Key Amenities - Only show 3 most important */}
                {property.amenities && property.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                            <span
                                key={index}
                                className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs"
                            >
                                {amenity}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
                    >
                        View Details
                    </button>
                    <button
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                        Enquire Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ModernPropertyCard;