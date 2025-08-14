import { useState, useCallback } from "react";
import ServiceEnquiryModal from "../components/modals/ServiceEnquiryModal";
import QuickWhatsAppModal from "../components/modals/QuickWhatsAppModal";
import { saveAndRedirectToWhatsApp } from "../supabase/directWhatsAppService";
import HeroSection from "../components/ui/hero-section";
import ServiceSection from "../components/ui/service-section";
import CTASection from "../components/ui/cta-section";
import StatsSection from "../components/ui/stats-section";
import TestimonialsSection from "../components/ui/testimonials-section";
import ProcessSection from "../components/ui/process-section";
import FloatingActionButton from "../components/ui/floating-action-button";
import { realEstateServices, marketingServices, customService, serviceStats, serviceTestimonials, serviceProcess } from "../data/servicesData";

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);

    const handleServiceEnquiry = useCallback(async (service) => {
        // Show form modal for user details
        setSelectedService(service);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedService(null);
    }, []);

    const closeQuickModal = useCallback(() => {
        setIsQuickModalOpen(false);
        setSelectedService(null);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24">
            {/* Hero Section */}
            <HeroSection
                title="🏆 Comprehensive Real Estate Services"
                subtitle="Your Trusted Partner in Premium Property Solutions"
                description="Expert guidance and personalized solutions for all your real estate needs. From buying and selling to investment advisory and cutting-edge digital marketing services."
                backgroundGradient="from-blue-600 via-purple-600 to-indigo-600"
            />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Real Estate Services */}
                <ServiceSection
                    title="Premium Real Estate Services"
                    subtitle="Complete property solutions from buying to investment advisory with expert guidance"
                    services={realEstateServices}
                    onServiceEnquiry={handleServiceEnquiry}
                    variant="default"
                    columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                />

                {/* Marketing Services */}
                <ServiceSection
                    title="Digital Marketing & Promotion"
                    subtitle="Professional marketing solutions to showcase your properties and maximize visibility"
                    services={marketingServices}
                    onServiceEnquiry={handleServiceEnquiry}
                    variant="default"
                    columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
                />
            </div>

            {/* Stats Section */}
            <StatsSection
                title="📊 Why Choose Our Services"
                subtitle="Trusted by thousands of satisfied clients across the country"
                stats={serviceStats}
            />

            {/* Process Section */}
            <ProcessSection
                title="⚡ How It Works"
                subtitle="Simple and streamlined steps to get started with our premium services"
                steps={serviceProcess}
            />

            {/* Testimonials Section */}
            <TestimonialsSection
                title="💬 What Our Clients Say"
                subtitle="Real experiences and success stories from our satisfied customers"
                testimonials={serviceTestimonials}
            />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* CTA Section */}
                <CTASection
                    title="Need a Custom Solution?"
                    description="Can't find what you're looking for? Contact us for a personalized consultation and custom service package tailored to your specific needs."
                    buttonText="Get Custom Quote"
                    onButtonClick={() => handleServiceEnquiry(customService)}
                    backgroundGradient="from-blue-600 to-purple-600"
                />
            </div>

            {/* Floating Action Button */}
            <FloatingActionButton 
                onServiceEnquiry={handleServiceEnquiry}
                customService={customService}
            />

            {/* Service Enquiry Modal */}
            <ServiceEnquiryModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                service={selectedService}
            />

            {/* Quick WhatsApp Modal */}
            <QuickWhatsAppModal 
                isOpen={isQuickModalOpen}
                onClose={closeQuickModal}
                service={selectedService}
            />
        </div>
    );
};

export default Services;