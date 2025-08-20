import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import {
  About,
  Services,
  Property,
  Blog,
  Contact,
  PageNotFound,
  Home,
} from "./pages";
// import NewsLetter from "./components/common/NewsLetter";
import AdminPanel from "./components/admin/AdminPanel";
import PropertyListing from "./components/properties/PropertyListing";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import LeadsPage from "./pages/LeadsPage";
import SupabaseTest from "./components/admin/SupabaseTest";
import PropertyTest from "./components/admin/PropertyTest";

import GlobalActionButtons from "./components/ui/global-action-buttons";
import ServiceEnquiryModal from "./components/modals/ServiceEnquiryModal";
function App() {

  const [isServiceEnquiryOpen, setIsServiceEnquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  // const dispatch = useDispatch();
  const route = useLocation();



  // Handle service enquiry modal
  const handleServiceEnquiry = (service) => {
    setSelectedService(service);
    setIsServiceEnquiryOpen(true);
  };

  const closeServiceEnquiry = () => {
    setIsServiceEnquiryOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/property" element={<Property />} />
          <Route path="/properties" element={<PropertyListing />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/leads" element={<LeadsPage />} />
          <Route path="/test-supabase" element={<SupabaseTest />} />
          <Route path="/test-properties" element={<PropertyTest />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <div className="px-[2%] md:px-[6%] bg-card-dark border border-card-dark">
        <div className="pt-8">
          <Footer />
        </div>
      </div>


      {/* Global Action Buttons - Visible on all pages */}
      <GlobalActionButtons onServiceEnquiry={handleServiceEnquiry} />

      {/* Service Enquiry Modal */}
      <ServiceEnquiryModal
        isOpen={isServiceEnquiryOpen}
        onClose={closeServiceEnquiry}
        service={selectedService}
      />
    </div>
  );
}

export default App;
