import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiHome, FiTrendingUp, FiAward, FiUsers, FiMapPin } from "react-icons/fi";

// Import all components for the SPA
import { Hero, Invest } from "../components/home/home-1";
import { AboutUs, Team } from "../components/common/page-componets";
import PropertiesShowcase from "../components/properties/PropertiesShowcase";
import MarketingAgency from "../components/marketing/MarketingAgency";
import { ContactInfo, Form } from "../components/contact";

// Services components
import HeroSection from "../components/ui/hero-section";
import ServiceSection from "../components/ui/service-section";
import CTASection from "../components/ui/cta-section";
import StatsSection from "../components/ui/stats-section";
import TestimonialsSection from "../components/ui/testimonials-section";
import ProcessSection from "../components/ui/process-section";
import SocialMediaSection from "../components/ui/social-media-section";
import ResponsiveGrid from "../components/ui/responsive-grid";

// Modals
import ServiceEnquiryModal from "../components/modals/ServiceEnquiryModal";

// Data
import { realEstateServices, marketingServices, customService, serviceStats, serviceTestimonials, serviceProcess } from "../data/servicesData";

const Home = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceEnquiry = useCallback(async (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedService(null);
  }, []);

  const achievements = [
    {
      icon: FiHome,
      number: "250+",
      label: "Properties Sold",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiUsers,
      number: "500+",
      label: "Happy Families",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FiTrendingUp,
      number: "98%",
      label: "Client Satisfaction",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: FiAward,
      number: "15+",
      label: "Years Experience",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="home" className="pb-4 md:pb-0">
        <Hero />
        <Invest />
      </section>

      {/* About Section - Mobile Optimized */}
      <section id="about" className="bg-gray-50 dark:bg-gray-900 pt-4 md:pt-0">
        {/* Mobile About */}
        <div className="block md:hidden py-6 px-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">About Us</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Davanagere's trusted real estate experts with 5+ years of experience
            </p>
          </div>
          {/* Mobile Stats - Using Existing Components & Data */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-4">
            <ResponsiveGrid columns={{ sm: 2 }} gap={4}>
              {serviceStats.slice(0, 2).map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </ResponsiveGrid>
          </div>

          {/* Mobile Team Section - Using Existing Component */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <Team />
          </div>
        </div>

        {/* Desktop About */}
        <div className="hidden md:block max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <Team />
          <AboutUs />
        </div>
      </section>

      {/* Properties Section - Mobile Optimized */}
      <section id="properties" className="bg-white dark:bg-gray-800 pt-2 md:pt-0">
        {/* Mobile Properties - Database Driven */}
        <div className="block md:hidden py-4 px-4">
          {/* <div className="text-center mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Featured Properties</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium properties in Davanagere's prime locations
            </p>
          </div> */}
          <PropertiesShowcase />
        </div>

        {/* Desktop Properties */}
        <div className="hidden md:block max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <PropertiesShowcase />
        </div>
      </section>

      {/* Services Section - Mobile Optimized */}
      <section id="services" className="bg-gray-50 dark:bg-gray-900 pt-2 md:pt-0">
        {/* Compact Services Hero - Mobile Only */}
        <div className="block md:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
          <div className="px-4 text-center">
            <h2 className="text-2xl font-bold mb-2">Our Services</h2>
            <p className="text-sm opacity-90">Expert real estate solutions</p>
          </div>
        </div>

        {/* Desktop Hero */}
        <div className="hidden md:block">
          <HeroSection
            title="Comprehensive Real Estate Services"
            subtitle="Your Trusted Partner in Premium Property Solutions"
            description="Expert guidance and personalized solutions for all your real estate needs. From buying and selling to investment advisory and cutting-edge digital marketing services."
            backgroundGradient="from-blue-600 via-purple-600 to-indigo-600"
          />
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16">
          {/* Mobile Compact Services */}
          <div className="block md:hidden mb-6">
            <ServiceSection
              title="Real Estate Services"
              services={realEstateServices.slice(0, 3)}
              onServiceEnquiry={handleServiceEnquiry}
              variant="compact"
              columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            />
            
            <ServiceSection
              title="Marketing Services"
              services={marketingServices.slice(0, 2)}
              onServiceEnquiry={handleServiceEnquiry}
              variant="compact"
              columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
            />
          </div>

          {/* Desktop Full Services */}
          <div className="hidden md:block">
            <ServiceSection
              title="Premium Real Estate Services"
              subtitle="Complete property solutions from buying to investment advisory with expert guidance"
              services={realEstateServices}
              onServiceEnquiry={handleServiceEnquiry}
              variant="default"
              columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            />

            <ServiceSection
              title="Digital Marketing & Promotion"
              subtitle="Professional marketing solutions to showcase your properties and maximize visibility"
              services={marketingServices}
              onServiceEnquiry={handleServiceEnquiry}
              variant="default"
              columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
            />
          </div>
        </div>

        {/* Mobile Compact Stats */}
        <div className="block md:hidden">
          <div className="bg-white dark:bg-gray-800 py-8">
            <div className="px-4">
              <div className="grid grid-cols-2 gap-4">
                {serviceStats.slice(0, 4).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Full Sections */}
        <div className="hidden md:block">
          <StatsSection
            title="Why Choose Our Services"
            subtitle="Trusted by thousands of satisfied clients across the country"
            stats={serviceStats}
          />

          <ProcessSection
            title="⚡ How It Works"
            subtitle="Simple and streamlined steps to get started with our premium services"
            steps={serviceProcess}
          />

          <TestimonialsSection
            title="What Our Clients Say"
            subtitle="Real experiences and success stories from our satisfied customers"
            testimonials={serviceTestimonials}
          />

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <CTASection
              title="Need a Custom Solution?"
              description="Can't find what you're looking for? Contact us for a personalized consultation and custom service package tailored to your specific needs."
              buttonText="Get Custom Quote"
              onButtonClick={() => handleServiceEnquiry(customService)}
              backgroundGradient="from-blue-600 to-purple-600"
            />
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="block md:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 mx-4 rounded-lg mb-8">
          <div className="text-center px-4">
            <h3 className="text-lg font-bold mb-2">Need Help?</h3>
            <p className="text-sm mb-4 opacity-90">Get personalized consultation</p>
            <button 
              onClick={() => handleServiceEnquiry(customService)}
              className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-semibold"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Marketing Agency Section - Commented Out */}
      {/* <section id="marketing" className="bg-white dark:bg-gray-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <MarketingAgency />
        </div>
      </section> */}

      {/* Social Media Section */}
      <section id="social" className="bg-white dark:bg-gray-800 pt-2 md:pt-0">
        <SocialMediaSection />
      </section>

      {/* Contact Section - Mobile Optimized */}
      <section id="contact" className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Mobile Contact Header */}
          <div className="block md:hidden py-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span>📞</span>
                <span>Contact Us</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Connect With
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Davanagere's Premier
                </span>
                Real Estate Experts
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Your trusted partner for smart city properties in Davanagere.
              </p>
            </div>

            {/* Mobile Compact Achievements */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {achievements.slice(0, 4).map((achievement, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${achievement.color} p-4 rounded-xl text-white text-center shadow-lg`}
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                    <achievement.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-lg font-bold mb-1">{achievement.number}</div>
                  <div className="text-xs text-white/90">{achievement.label}</div>
                </div>
              ))}
            </div>

            {/* Mobile Why Choose Us */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                Why Choose Us
              </h2>
              <div className="space-y-4">
                {[
                  { icon: FiHome, title: "Local Expertise", desc: "Deep market knowledge" },
                  { icon: FiTrendingUp, title: "Smart Investments", desc: "High-growth properties" },
                  { icon: FiAward, title: "Trusted Service", desc: "15+ years experience" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Full Contact Section */}
          <div className="hidden md:block">
            {/* Background Decorations */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
            </div>

            <div className="py-20">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-8"
                >
                  <span>📞</span>
                  <span>Contact Us</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
                >
                  Connect With
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Davanagere's Premier
                  </span>
                  Real Estate Experts
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
                >
                  Your trusted partner for smart city properties in Davanagere.
                  We turn your property dreams into reality with expert guidance and personalized service.
                </motion.p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -10,
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    className={`bg-gradient-to-br ${achievement.color} p-6 lg:p-8 rounded-2xl lg:rounded-3xl text-white text-center shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group`}
                  >
                    <div className="relative z-10">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <achievement.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <div className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">{achievement.number}</div>
                      <div className="text-sm lg:text-base xl:text-lg text-white/90 font-medium">{achievement.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-2xl mb-20 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-center mb-8 lg:mb-12">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Why Davanagere Trusts Us
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {[
                      {
                        icon: FiHome,
                        title: "Local Expertise",
                        description: "Deep knowledge of Davanagere's real estate market and growth areas",
                        color: "blue"
                      },
                      {
                        icon: FiTrendingUp,
                        title: "Smart Investments",
                        description: "Focus on high-growth potential properties with modern amenities",
                        color: "green"
                      },
                      {
                        icon: FiAward,
                        title: "Trusted Service",
                        description: "15+ years of reliable service with complete transparency",
                        color: "purple"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center group"
                      >
                        <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <item.icon className={`w-8 h-8 lg:w-10 lg:h-10 text-${item.color}-600 dark:text-${item.color}-400`} />
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <ContactInfo />
          <Form />
        </div>
      </section>

      {/* Service Enquiry Modal */}
      <ServiceEnquiryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />
    </div>
  );
};

export default Home;
