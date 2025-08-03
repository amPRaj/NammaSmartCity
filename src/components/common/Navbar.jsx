/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FiDelete, FiMoon, FiSun } from "react-icons/fi";
import { BiSearch, BiMenu, BiUser, BiBuildingHouse } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
      className="navbar fixed w-full z-20 top-0 left-0 py-2 bg-white/70 backdrop-blur-2xl shadow-lg border-b border-white/20 dark:border-gray-800/30 dark:bg-gray-900/70 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/50"
    >
      <div className="w-full px-6 lg:px-12 xl:px-16 flex-center-between h-12">
        <Link to="/" className="flex-shrink-0 flex-align-center gap-x-4 group">
          <div className="relative">
            <img
              src="/images/namma-logo.png"
              alt="Namma Logo"
              className="h-8 w-auto md:h-10 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="hidden lg:block text-lg xl:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              Namma Smart City
            </h1>
            <h1 className="hidden md:block lg:hidden text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              Namma Properties
            </h1>
            <span className="hidden lg:block text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Properties
            </span>
          </div>
        </Link>

        <div className="flex-align-center gap-x-4">
          {/*-------------------------------------- Desktop Menu------------------------------------- */}
          {/* Desktop Navigation */}
          <nav className="hidden md:flex-align-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <SingleLink {...link} key={link.id} />
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {/*----------------------------- Dark mode toggle-------------------------------------------------- */}
            <button
              className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50 w-8 h-8 rounded-full flex items-center justify-center dark:bg-gray-800/90 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer group"
              onClick={handleDarkMode}
            >
              {darkMode ?
                <FiSun className="text-yellow-500 w-4 h-4 group-hover:rotate-180 transition-transform duration-300" /> :
                <FiMoon className="text-gray-600 dark:text-gray-400 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              }
            </button>

            {/*----------------------------- Mobile Menu Toggle-------------------------------------------------- */}
            <button
              className="md:hidden bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50 w-8 h-8 rounded-full flex items-center justify-center dark:bg-gray-800/90 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer group"
              onClick={() => dispatch(openSidebar())}
            >
              <BiMenu className="text-gray-600 dark:text-gray-400 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Sidebar */}
          <div
            className={`md:hidden mobile-modal fixed w-screen h-screen top-0 left-0 bg-black/50 z-50 opacity-0 pointer-events-none transition-all duration-300 ${isSidebarOpen && "opacity-100 pointer-events-auto"}`}
            onClick={handleCloseSidebar}
          >
            <div
              className={`mobile-dialog absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl dark:bg-gray-900/95 shadow-2xl transform translate-x-full transition-transform duration-300 ${isSidebarOpen && "translate-x-0"}`}
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
                  {navLinks.map(({ id, linkText, url }) => (
                    <li key={id}>
                      <NavLink
                        to={url}
                        end
                        className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-all duration-200"
                        onClick={() => dispatch(closeSidebar())}
                      >
                        {linkText}
                      </NavLink>
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
