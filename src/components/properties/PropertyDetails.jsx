import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiX,
    FiMapPin,
    FiMaximize,
    FiHome,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiHeart,
    FiShare2,
    FiPhone,
    FiMail,
    FiSend,
    FiDownload,
    FiUser,
    FiTruck
} from "react-icons/fi";
import { BiBed } from "react-icons/bi";

const PropertyDetails = ({ property, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImageGallery, setShowImageGallery] = useState(false);

    const images = property.images || [];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {property.title}
                        </h2>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                            <FiMapPin className="w-4 h-4 mr-2" />
                            <span>{property.location}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <FiHeart className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <FiShare2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex overflow-hidden max-h-[calc(90vh-80px)]">
                    {/* Left Side - Images */}
                    <div className="w-1/2 relative">
                        {images.length > 0 ? (
                            <>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`Property ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => setShowImageGallery(true)}
                                />

                                {/* Image Navigation */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                                        >
                                            <FiChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                                        >
                                            <FiChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {images.length}
                                </div>

                                {/* Thumbnail Strip */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 left-4 flex space-x-2">
                                        {images.slice(0, 5).map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${index === currentImageIndex
                                                    ? "border-white"
                                                    : "border-transparent opacity-70"
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                        {images.length > 5 && (
                                            <div className="w-12 h-12 bg-black bg-opacity-50 rounded-lg flex items-center justify-center text-white text-xs">
                                                +{images.length - 5}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <FiHome className="w-16 h-16 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Right Side - Details */}
                    <div className="w-1/2 p-6 overflow-y-auto">
                        {/* Price */}
                        <div className="mb-6">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {formatPrice(property.price)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {property.type && (
                                    <span className="capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2">
                                        {property.type}
                                    </span>
                                )}
                                {property.featured && (
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center space-x-2">
                                <FiMaximize className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="font-semibold">{property.area}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">sq ft</div>
                                </div>
                            </div>
                            {property.bedrooms && (
                                <div className="flex items-center space-x-2">
                                    <BiBed className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <div className="font-semibold">{property.bedrooms}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                                    </div>
                                </div>
                            )}
                            {property.bathrooms && (
                                <div className="flex items-center space-x-2">
                                    <FiHome className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <div className="font-semibold">{property.bathrooms}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                                    </div>
                                </div>
                            )}
                            {property.parking && (
                                <div className="flex items-center space-x-2">
                                    <FiTruck className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <div className="font-semibold">{property.parking}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Parking</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Description
                            </h3>
                            <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                                {property.description}
                            </div>
                        </div>

                        {/* Property Specifications */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Property Specifications
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {property.yearBuilt && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Year Built:</span>
                                        <span className="font-medium">{property.yearBuilt}</span>
                                    </div>
                                )}
                                {property.furnishing && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Furnishing:</span>
                                        <span className="font-medium capitalize">{property.furnishing}</span>
                                    </div>
                                )}
                                {property.floors && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Total Floors:</span>
                                        <span className="font-medium">{property.floors}</span>
                                    </div>
                                )}
                                {property.plotFacing && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Plot Facing:</span>
                                        <span className="font-medium">{property.plotFacing}</span>
                                    </div>
                                )}
                                {property.mainDoorFacing && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Main Door Facing:</span>
                                        <span className="font-medium">{property.mainDoorFacing}</span>
                                    </div>
                                )}
                                {property.roadWidth && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Road Width:</span>
                                        <span className="font-medium">{property.roadWidth} ft</span>
                                    </div>
                                )}
                                {property.approvedBy && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Approved By:</span>
                                        <span className="font-medium">{property.approvedBy}</span>
                                    </div>
                                )}
                                {property.monthlyRent && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Monthly Rent:</span>
                                        <span className="font-medium">₹{property.monthlyRent}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Building Features */}
                        {(property.cementUsed || property.mainDoorWood || property.windowsWood || property.paintUsed) && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Building Features
                                </h3>
                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    {property.cementUsed && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Cement Used:</span>
                                            <span className="font-medium">{property.cementUsed}</span>
                                        </div>
                                    )}
                                    {property.mainDoorWood && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Main Door Wood:</span>
                                            <span className="font-medium">{property.mainDoorWood}</span>
                                        </div>
                                    )}
                                    {property.windowsWood && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Windows Wood:</span>
                                            <span className="font-medium">{property.windowsWood}</span>
                                        </div>
                                    )}
                                    {property.paintUsed && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Paint Used:</span>
                                            <span className="font-medium">{property.paintUsed}</span>
                                        </div>
                                    )}
                                    {property.bathroomFittings && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Bathroom Fittings:</span>
                                            <span className="font-medium">{property.bathroomFittings}</span>
                                        </div>
                                    )}
                                    {property.electricCables && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Electric Cables:</span>
                                            <span className="font-medium">{property.electricCables}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Utilities */}
                        {(property.sumpCapacity || property.overheadTankCapacity) && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Utilities
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {property.sumpCapacity && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Sump Capacity:</span>
                                            <span className="font-medium">{property.sumpCapacity} L</span>
                                        </div>
                                    )}
                                    {property.overheadTankCapacity && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Overhead Tank:</span>
                                            <span className="font-medium">{property.overheadTankCapacity} L</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Amenities
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {property.amenities.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Financial Details */}
                        {property.downPayment && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    Financial Details
                                </h3>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Down Payment:</span>
                                        <span className="font-bold text-green-600 dark:text-green-400">
                                            ₹{property.downPayment} Lakhs
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contact Actions */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleEnquiry}
                                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <FiSend className="w-4 h-4" />
                                    <span>Send Enquiry</span>
                                </button>
                                <button
                                    onClick={handleDownloadBrochure}
                                    className="flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    <FiDownload className="w-4 h-4" />
                                    <span>Download</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <button className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <FiPhone className="w-4 h-4" />
                                    <span>Call Now</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <FiMail className="w-4 h-4" />
                                    <span>Email</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Full Screen Image Gallery */}
            <AnimatePresence>
                {showImageGallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-60"
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
                                        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-40 transition-all"
                                    >
                                        <FiChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-40 transition-all"
                                    >
                                        <FiChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}

                            {/* Close Gallery */}
                            <button
                                onClick={() => setShowImageGallery(false)}
                                className="absolute top-8 right-8 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-40 transition-all"
                            >
                                <FiX className="w-6 h-6" />
                            </button>

                            {/* Gallery Counter */}
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-full">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PropertyDetails;