import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import BackToTopButton from "./components/common/BackToTopButton";
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
import { SmoothScrollProvider } from "./components/ui/smooth-scroll";
function App() {
  const [showButton, setShowButton] = useState(false);
  // const dispatch = useDispatch();
  const route = useLocation();

  // Show/Hide scroll to top button
  window.addEventListener("scroll", () => {
    window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
  });



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <SmoothScrollProvider>
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
            <Route path="/blog" element={<Blog />} />
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
        <BackToTopButton showButton={showButton} />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
