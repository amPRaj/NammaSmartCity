import { BiMap } from "react-icons/bi";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const ContactInfo = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "918951569757"; // Your WhatsApp business number
    const message = "Hi! I'm interested in Namma Smart City Properties. Can you help me find the perfect property?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/namma_smartcity_properties/', '_blank');
  };

  return (
    <div className="py-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
          <span>📍</span>
          <span>Contact Information</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Get In Touch With Us
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Ready to find your dream property in Davanagere's growing real estate market? 
          Our expert team is here to guide you through every step of your real estate journey.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-20">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white mx-auto text-2xl mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <FiPhone />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Call Us</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">+91 89515 69757</p>
          <p className="text-gray-600 dark:text-gray-300 mb-3 font-medium">+91 89515 69757</p>
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
            Mon-Sat: 9AM-7PM
          </div>
        </div>

        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white mx-auto text-2xl mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <FiMail />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Email Us</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">info@nammasmartcity.com</p>
          <p className="text-gray-600 dark:text-gray-300 mb-3 font-medium">sales@nammasmartcity.com</p>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
            24/7 Support
          </div>
        </div>

        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white mx-auto text-2xl mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <BiMap />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Visit Us</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">MCC B Block, Davanagere</p>
          <p className="text-gray-600 dark:text-gray-300 mb-3 font-medium">Karnataka 577001, India</p>
          <div className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
            By Appointment
          </div>
        </div>

        <div className="text-center p-8 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 text-white group hover:-translate-y-2 relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-700 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white text-green-600 mx-auto text-2xl mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaWhatsapp />
            </div>
            <h3 className="text-xl font-bold mb-4">WhatsApp Chat</h3>
            <p className="text-green-100 mb-6 leading-relaxed">Get instant responses to your property queries</p>
            <button 
              onClick={handleWhatsAppClick}
              className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Chat Now
            </button>
          </div>
        </div>

        <div className="text-center p-8 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 text-white group hover:-translate-y-2 relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white text-pink-600 mx-auto text-2xl mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaInstagram />
            </div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <p className="text-pink-100 mb-6 leading-relaxed">See our latest properties and updates on Instagram</p>
            <button 
              onClick={handleInstagramClick}
              className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Follow Now
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-gray-800 dark:to-purple-900/20 rounded-3xl p-12 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Why Choose Namma Smart City Properties?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Expert Guidance</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">15+ years of Davanagere real estate expertise with proven track record</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🏙️</span>
                </div>
                <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">Smart City Focus</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Specialized in tech-enabled modern properties with future-ready amenities</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">End-to-End Service</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">From property search to legal documentation and beyond</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
