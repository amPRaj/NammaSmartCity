/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FiDelete, FiMoon, FiSun } from "react-icons/fi";
import { BiSearch, BiMenu, BiUser, BiBuildingHouse } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  closeSidebar,
  openSidebar,
  toggleDarkMode,
  uiStore,
} from "../../features/uiSlice";
import { navLinks } from "../../data/navLinks";
import SingleLink from "./SingleLink";

const Navbar = () => {
  const rootDoc = document.querySelector(":root");
  const { darkMode, isSidebarOpen } = useSelector(uiStore);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // SPA Navigation - scroll to section if on home page
  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 100; // Account for navbar height
        window.scrollTo(0, offsetTop);
      }
    } else {
      // Navigate to home page with section hash
      navigate(`/#${sectionId}`);
    }
  };

  // Handle navigation based on current page
  const handleNavigation = (url, sectionId) => {
    if (sectionId && location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate(url);
    }
    dispatch(closeSidebar());
  };

  // Dark mode toggle
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  // Store darkmode value to localStorage;
  useEffect(() => {
    if (darkMode) rootDoc.classList.add("dark");
    else rootDoc.classList.remove("dark");
    localStorage.setItem("Martvilla-theme-mode", JSON.stringify(darkMode));
  }, [darkMode]);



  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains("mobile-modal")) dispatch(closeSidebar());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <div
      className="navbar fixed w-full z-50 top-0 left-0 py-1 sm:py-2 bg-white/20 backdrop-blur-3xl shadow-2xl border-b border-white/20 dark:border-white/10 dark:bg-gray-900/20 supports-[backdrop-filter]:bg-white/15 dark:supports-[backdrop-filter]:bg-gray-900/15"
      style={{ 
        paddingTop: 'env(safe-area-inset-top)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)'
      }}
    >
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-32 flex-center-between h-12 sm:h-14 max-w-screen-2xl mx-auto">
        <Link to="/" className="flex-shrink-0 flex-align-center gap-x-2 sm:gap-x-3 group">
          <div className="relative">
            <img
              src="/images/namma-logo.png"
              alt="Namma Logo"
              className="h-8 w-auto sm:h-9 md:h-10 lg:h-11 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/15 to-purple-600/15 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="hidden lg:block text-lg xl:text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Namma Smart City
            </h1>
            <h1 className="hidden md:block lg:hidden text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              Namma Properties
            </h1>
            <span className="hidden lg:block text-xs xl:text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Properties
            </span>
          </div>
        </Link>

        <div className="flex-align-center gap-x-4">
          {/*-------------------------------------- Desktop Menu------------------------------------- */}
          {/* Desktop Navigation */}
          <nav className="hidden md:flex-align-center space-x-2 lg:space-x-4 xl:space-x-6">
            {navLinks.map((link) => (
              <SingleLink {...link} key={link.id} />
            ))}
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/*----------------------------- Dark mode toggle-------------------------------------------------- */}
            <button
              className="bg-white/90 backdrop-blur-sm shadow-md border border-gray-200/40 dark:border-gray-700/40 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center dark:bg-gray-800/90 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer group hover:scale-105"
              onClick={handleDarkMode}
            >
              {darkMode ?
                <FiSun className="text-yellow-500 w-5 h-5 group-hover:rotate-180 transition-transform duration-300" /> :
                <FiMoon className="text-gray-600 dark:text-gray-400 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              }
            </button>

            {/*----------------------------- Mobile Menu Toggle-------------------------------------------------- */}
            <button
              className="md:hidden bg-white/90 backdrop-blur-sm shadow-md border border-gray-200/40 dark:border-gray-700/40 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center dark:bg-gray-800/90 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer group hover:scale-105"
              onClick={() => dispatch(openSidebar())}
            >
              <BiMenu className="text-gray-600 dark:text-gray-400 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Sidebar */}
          <div
            className={`md:hidden mobile-modal fixed w-screen h-screen top-0 left-0 bg-white/60 z-50 opacity-0 pointer-events-none transition-all duration-300 ${isSidebarOpen && "opacity-100 pointer-events-auto"}`}
            onClick={handleCloseSidebar}
          >
            <div
              className={`mobile-dialog absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white/30 backdrop-blur-3xl dark:bg-gray-900/30 shadow-2xl transform translate-x-full transition-transform duration-300 border-l border-white/20 dark:border-white/10 ${isSidebarOpen && "translate-x-0"}`}
              style={{ 
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)'
              }}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => dispatch(closeSidebar())}
                >
                  <FiDelete className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="p-6">
                <ul className="space-y-4">
                  {navLinks.map(({ id, linkText, url, sectionId }) => (
                    <li key={id}>
                      <button
                        className="w-full text-left block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-all duration-200"
                        onClick={() => handleNavigation(url, sectionId)}
                      >
                        {linkText}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
