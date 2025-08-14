import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiExternalLink, FiHeart } from "react-icons/fi";

const SocialMediaSection = () => {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/namma_smartcity_properties/', '_blank');
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "918951569757";
    const message = "Hi! I saw your Instagram page and I'm interested in Namma Smart City Properties. Can you help me find the perfect property?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-8"
          >
            <FaInstagram className="w-4 h-4" />
            <span>Follow Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Stay Connected With
            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Our Latest Properties
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Follow us on Instagram to see our latest property listings, virtual tours, and exclusive updates from Davanagere's premier real estate market.
          </motion.p>
        </div>

        {/* Social Media Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {/* Instagram Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FaInstagram className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <FiHeart className="w-4 h-4" />
                  <span className="text-sm font-medium">Follow for Updates</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 break-all">
                @namma_smartcity_properties
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                🏠 Premium Properties in Davanagere<br />
                📸 Virtual Tours & Property Showcases<br />
                💼 Expert Real Estate Guidance<br />
                🌟 Your Dream Home Awaits
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Active</span>
                  </div>
                  <div>Daily Updates</div>
                </div>

                <button
                  onClick={handleInstagramClick}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Follow Now</span>
                  <FiExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Integration Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FaWhatsapp className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Online Now</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Direct WhatsApp Support
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                💬 Instant Property Queries<br />
                📱 Share Instagram Posts Directly<br />
                🏡 Schedule Property Visits<br />
                ⚡ Quick Response Guaranteed
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div className="font-medium text-gray-900 dark:text-white">+91 89515 69757</div>
                  <div>Available: Mon-Sat, 9AM-7PM</div>
                </div>

                <button
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Chat Now</span>
                  <FaWhatsapp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Never Miss a Property Update!
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Be the first to see new listings, virtual tours, and exclusive property deals in Davanagere's growing real estate market.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleInstagramClick}
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Follow Instagram</span>
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaSection;