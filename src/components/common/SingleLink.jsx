import { NavLink } from "react-router-dom";

const SingleLink = ({ id, linkText, url }) => {
  return (
    <div className="relative group">
      <NavLink
        to={url}
        end
        key={id}
        className="relative px-4 py-3 lg:px-6 lg:py-3 flex-align-center gap-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 group-hover:scale-105"
      >
        {linkText}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </NavLink>
    </div>
  );
};

export default SingleLink;
