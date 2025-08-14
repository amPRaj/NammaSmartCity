/* eslint-disable jsx-a11y/anchor-is-valid */

import { BiBuildingHouse } from "react-icons/bi";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-gray-300 dark:text-slate-200">
      <footer>
        <div className="flex flex-wrap gap-2 max-w-7xl mx-auto px-4">
          <div className="flex-1 basis-[10rem]">
            <Link to="/" className="flex-shrink-0 flex-align-center gap-x-2">
              <img
                src="/images/namma-logo.png"
                alt="Namma Logo"
                className="h-10 w-auto"
              />
              <h1 className="hidden md:block text-lg font-bold text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-green-500 dark:bg-clip-text dark:text-transparent">
                Namma Smart City Properties
              </h1>
            </Link>
            <div className="mt-3">
              <p className="text-sm text-gray-400 dark:text-slate-300">
                Premium real estate platform powered by cutting-edge technology and 360° marketing solutions.
              </p>
              <div className="gap-5 my-6 flex-center-center">
                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FiFacebook />
                </div>

                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FaTwitter />
                </div>

                <a 
                  href="https://www.instagram.com/namma_smartcity_properties/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="icon-box bg-dark-light hover:bg-hover-color-dark"
                >
                  <FaInstagram />
                </a>

                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FaLinkedin />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold text-white dark:text-slate-200">Services</h2>
            <ul>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Premium Listings</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Virtual Tours</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Investment Analysis</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">360° Marketing</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Technology</a>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold text-white dark:text-slate-200">Quick Links</h2>
            <ul>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors"> About Us</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Services</a>
              </li>
              {/* <li className="my-3 text-muted">
                <a href="#">Blog</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Portifolio</a>
              </li> */}
            </ul>
          </div>

          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold text-white dark:text-slate-200">Technology</h2>
            <ul>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Smart Property Management</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Advanced Marketing Solutions</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Virtual Reality Tours</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Terms & Conditions</a>
              </li>
              <li className="my-3 text-gray-400 dark:text-muted">
                <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>


        </div>
      </footer>
      <div className="py-2 mt-3 text-center border-t text-gray-400 dark:text-muted border-gray-600 dark:border-dark">
        <p>
          Created By <span className="text-blue-500 dark:text-primary">VIPRUDH Technologies</span> | All
          Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
