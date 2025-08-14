import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SingleLink = ({ id, linkText, url, sectionId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (sectionId && location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 100; // Account for navbar height
        window.scrollTo(0, offsetTop);
      }
    }
  };

  return (
    <div className="relative group">
      <NavLink
        to={url}
        end
        key={id}
        onClick={handleClick}
        className="relative px-4 py-3 lg:px-6 lg:py-4 flex-align-center gap-x-1 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all duration-300 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-900/30 group-hover:scale-105 text-sm lg:text-base"
      >
        {linkText}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </NavLink>
    </div>
  );
};

export default SingleLink;
