import { NavLink, useLocation } from "react-router-dom";

const SingleLink = ({ id, linkText, url, sectionId }) => {
  const location = useLocation();

  const handleClick = (e) => {
    // Only handle section scrolling for Home page sections, not for Properties
    if (sectionId && location.pathname === '/' && url === '/') {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 100; // Account for navbar height
        window.scrollTo(0, offsetTop);
      }
    }
    // For Properties and other pages, let NavLink handle normal navigation
  };



  return (
    <div className="relative group">
      <NavLink
        to={url}
        end={url === '/'}
        key={id}
        onClick={handleClick}
        className="navbar-link relative px-3 py-1.5 lg:px-4 lg:py-2 flex-align-center gap-x-1 font-medium transition-all duration-200 rounded-lg text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/20 dark:hover:bg-white/10"
        style={{
          textDecoration: 'none',
          borderBottom: 'none',
          position: 'relative'
        }}
        data-no-active-style="true"
      >
        {linkText}
      </NavLink>
    </div>
  );
};

export default SingleLink;
