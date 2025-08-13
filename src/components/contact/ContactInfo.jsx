import { BiMap } from "react-icons/bi";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ContactInfo = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "918951569757"; // Your WhatsApp business number
    const message = "Hi! I'm interested in Namma Smart City Properties. Can you help me find the perfect property?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get In Touch With Us
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Ready to find your dream property in Davanagere's growing real estate market? 
          Our expert team is here to guide you through every step of your real estate journey.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="icon-box !h-14 !w-14 !bg-blue-600 text-white mx-auto text-2xl mb-4">
            <FiPhone />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">+91 89515 69757</p>
          <p className="text-gray-600 dark:text-gray-300">+91 89515 69757</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Mon-Sat: 9AM-7PM</p>
        </div>

        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="icon-box !h-14 !w-14 !bg-green-600 text-white mx-auto text-2xl mb-4">
            <FiMail />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">info@nammasmartcity.com</p>
          <p className="text-gray-600 dark:text-gray-300">sales@nammasmartcity.com</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">24/7 Support</p>
        </div>

        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="icon-box !h-14 !w-14 !bg-purple-600 text-white mx-auto text-2xl mb-4">
            <BiMap />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">MCC B Block, Davanagere</p>
          <p className="text-gray-600 dark:text-gray-300">Karnataka 577001, India</p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">By Appointment</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white">
          <div className="icon-box !h-14 !w-14 !bg-white text-green-600 mx-auto text-2xl mb-4">
            <FaWhatsapp />
          </div>
          <h3 className="text-lg font-semibold mb-2">WhatsApp Chat</h3>
          <p className="text-green-100 mb-4">Get instant responses to your property queries</p>
          <button 
            onClick={handleWhatsAppClick}
            className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors duration-200"
          >
            Chat Now
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Why Choose Namma Smart City Properties?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Expert Guidance</h4>
              <p className="text-gray-600 dark:text-gray-300">15+ years of Davanagere real estate expertise</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Smart City Focus</h4>
              <p className="text-gray-600 dark:text-gray-300">Specialized in tech-enabled modern properties</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">End-to-End Service</h4>
              <p className="text-gray-600 dark:text-gray-300">From property search to legal documentation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
