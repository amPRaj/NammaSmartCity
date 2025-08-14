import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiMapPin,
    FiHome,
    FiChevronLeft,
    FiChevronRight,
    FiHeart,
    FiShare2,
    FiPhone,
    FiMail,
    FiSend,
    FiDownload,
    FiX
} from "react-icons/fi";
import { getPropertyById } from "../supabase/propertyService";

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImageGallery, setShowImageGallery] = useState(false);

    useEffect(() => {
        loadProperty();
    }, [id]);

    const loadProperty = async () => {
        try {
            setLoading(true);
            const result = await getPropertyById(id);
            if (result.success) {
                setProperty(result.data);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Failed to load property details");
        } finally {
            setLoading(false);
        }
    };

    const nextImage = () => {
        if (property?.images?.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
        }
    };

    const prevImage = () => {
        if (property?.images?.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
        }
    };

    const formatPrice = (price) => {
        if (price >= 100) {
            return `₹${(price / 100).toFixed(1)} Crore`;
        } else {
            return `₹${price} Lakhs`;
        }
    };

    const handleEnquiry = () => {
        alert("Enquiry form will be implemented here");
    };

    const handleDownloadBrochure = () => {
        alert("Brochure download will be implemented here");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-24 sm:pt-28">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-24 sm:pt-28">
                <div className="text-center">
                    <div className="text-6xl mb-4">🏠</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Property Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error || "The property you're looking for doesn't exist."}
                    </p>
                    <button
                        onClick={() => navigate('/properties')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Properties
                    </button>
                </div>
            </div>
        );
    }

    const images = property.images || [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 sm:pt-28">
            {/* Compact Hero Section */}
            <div className="relative h-[50vh] bg-black">
                {images.length > 0 ? (
                    <>
                        <img
                            src={images[currentImageIndex]}
                            alt={`Property ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setShowImageGallery(true)}
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                        {/* Image Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-40 transition-all backdrop-blur-sm"
                                >
                                    <FiChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-40 transition-all backdrop-blur-sm"
                                >
                                    <FiChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full backdrop-blur-sm text-sm">
                            {currentImageIndex + 1} / {images.length}
                        </div>

                        {/* Back Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute top-4 left-4 bg-white bg-opacity-20 text-white px-3 py-2 rounded-full hover:bg-opacity-40 transition-all backdrop-blur-sm flex items-center space-x-2 text-sm"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            <span>Back</span>
                        </button>

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex items-center space-x-2">
                            <button className="bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-40 transition-all backdrop-blur-sm">
                                <FiHeart className="w-5 h-5" />
                            </button>
                            <button className="bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-40 transition-all backdrop-blur-sm">
                                <FiShare2 className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <FiHome className="w-20 h-20 text-gray-400" />
                    </div>
                )}
            </div>

            {/* Main Content - Full Width & Compact */}
            <div className="px-4 py-4">
                {/* Property Header - Single Row */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">🏡</span>
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                                    {property.dimension || property.type} House for Sale
                                </h1>
                            </div>

                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                                <FiMapPin className="w-4 h-4 mr-2" />
                                <span>{property.location}</span>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                                <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    {formatPrice(property.price)}
                                </div>
                                {property.type && (
                                    <span className="capitalize bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium">
                                        {property.type}
                                    </span>
                                )}
                                {property.featured && (
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Quick Stats - Horizontal */}
                            <div className="flex items-center gap-6 text-sm">
                                <div className="text-center">
                                    <div className="font-bold text-gray-900 dark:text-white">{currentImageIndex + 1} / {images.length}</div>
                                    <div className="text-gray-600 dark:text-gray-400">Images</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900 dark:text-white">{property.area}</div>
                                    <div className="text-gray-600 dark:text-gray-400">sq ft</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900 dark:text-white">{property.bedrooms}</div>
                                    <div className="text-gray-600 dark:text-gray-400">Bedrooms</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900 dark:text-white">{property.bathrooms}</div>
                                    <div className="text-gray-600 dark:text-gray-400">Bathrooms</div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Actions - Compact */}
                        <div className="lg:w-64">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                                    Contact for Details
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={handleEnquiry}
                                        className="flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-700 transition-colors text-xs font-medium"
                                    >
                                        <FiSend className="w-3 h-3" />
                                        <span>Send Enquiry</span>
                                    </button>
                                    <button
                                        onClick={handleDownloadBrochure}
                                        className="flex items-center justify-center space-x-1 bg-green-600 text-white py-2 px-2 rounded hover:bg-green-700 transition-colors text-xs font-medium"
                                    >
                                        <FiDownload className="w-3 h-3" />
                                        <span>Download Brochure</span>
                                    </button>
                                    <button className="flex items-center justify-center space-x-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-xs">
                                        <FiPhone className="w-3 h-3" />
                                        <span>Call Now</span>
                                    </button>
                                    <button className="flex items-center justify-center space-x-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-xs">
                                        <FiMail className="w-3 h-3" />
                                        <span>Email</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Details - Full Width Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Description */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h2>
                            <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                                {property.description}
                            </div>
                        </div>
                    </div>

                    {/* Property Specifications */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Property Specifications</h2>
                            <div className="space-y-1">
                                {property.dimension && (
                                    <div className="flex justify-between items-center py-1 text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">📐 Dimension:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{property.dimension}</span>
                                    </div>
                                )}
                                {property.plotFacing && (
                                    <div className="flex justify-between items-center py-1 text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">➡️ Plot Facing:</span>
                                        <span className="font-medium text-gray-900 dark:text-white capitalize">{property.plotFacing}</span>
                                    </div>
                                )}
                                {property.mainDoorFacing && (
                                    <div className="flex justify-between items-center py-1 text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🚪 Main Door Facing:</span>
                                        <span className="font-medium text-gray-900 dark:text-white capitalize">{property.mainDoorFacing}</span>
                                    </div>
                                )}
                                {property.roadWidth && (
                                    <div className="flex justify-between items-center py-1 text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🛣️ Road Width:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{property.roadWidth} feet</span>
                                    </div>
                                )}
                                {property.approvedBy && (
                                    <div className="flex justify-between items-center py-1 text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">📄 Approved by:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{property.approvedBy}</span>
                                    </div>
                                )}
                                {property.floors && (
                                    <div className="flex justify-between items-center py-1 text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🏢 No. of Floors:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{property.floors}</span>
                                    </div>
                                )}
                                {property.rooms && (
                                    <div className="flex justify-between items-center py-1 text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🛏️ No. of Rooms:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{property.rooms}</span>
                                    </div>
                                )}
                                {property.parking && (
                                    <div className="flex justify-between items-center py-1 text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🚗 Parking Facility:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{property.parking} car</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Building Features */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🏠 Building Features</h2>
                            <div className="space-y-1">
                                {property.cementUsed && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🏗️ Cement Used:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.cementUsed}</span>
                                    </div>
                                )}
                                {property.mainDoorWood && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🚪 Main Door Wood:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.mainDoorWood}</span>
                                    </div>
                                )}
                                {property.windowsWood && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🚪 Windows Wood:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.windowsWood}</span>
                                    </div>
                                )}
                                {property.interiors && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🪟 Interiors:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.interiors}</span>
                                    </div>
                                )}
                                {property.electricCables && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🔌 Electric Cables:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.electricCables}</span>
                                    </div>
                                )}
                                {property.switches && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🔘 Switches:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.switches}</span>
                                    </div>
                                )}
                                {property.sumpCapacity && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🚰 Sump Capacity:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.sumpCapacity} litres</span>
                                    </div>
                                )}
                                {property.overheadTankCapacity && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">💧 Overhead Tank:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.overheadTankCapacity} liters</span>
                                    </div>
                                )}
                                {property.paintUsed && (
                                    <div className="text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">🎨 Paint Used:</span>
                                        <span className="font-medium text-gray-900 dark:text-white ml-1">{property.paintUsed}</span>
                                    </div>
                                )}
                            </div>

                            {/* Amenities */}
                            {property.amenities && property.amenities.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Amenities</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {property.amenities.slice(0, 6).map((amenity, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Financial Details */}
                            {property.downPayment && (
                                <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-3">
                                    <div className="text-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400 block">Down Payment Required</span>
                                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                            ₹{property.downPayment} Lakhs
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Screen Image Gallery */}
            {showImageGallery && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
                    onClick={() => setShowImageGallery(false)}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Property ${currentImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Gallery Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                    className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-4 rounded-full hover:bg-opacity-40 transition-all"
                                >
                                    <FiChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                    className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-4 rounded-full hover:bg-opacity-40 transition-all"
                                >
                                    <FiChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Close Gallery */}
                        <button
                            onClick={() => setShowImageGallery(false)}
                            className="absolute top-8 right-8 bg-white bg-opacity-20 text-white p-4 rounded-full hover:bg-opacity-40 transition-all"
                        >
                            <FiX className="w-8 h-8" />
                        </button>

                        {/* Gallery Counter */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 text-white px-6 py-3 rounded-full text-lg">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default PropertyDetailsPage;