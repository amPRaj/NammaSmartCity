import { useState } from "react";
import { property } from "../../../data/dummyData";
import { BiSearch, BiBed, BiBath, BiArea } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";

const Featured = () => {
  const [searchFilters, setSearchFilters] = useState({
    wantTo: "Buy",
    propertyType: "Any",
    city: "Any",
    locality: "",
    minBudget: "",
    maxBudget: ""
  });

  const handleInputChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full py-16 bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24">
        {/* Search Properties Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-12 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Search Properties</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* I Want to */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I Want to
              </label>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchFilters.wantTo}
                onChange={(e) => handleInputChange('wantTo', e.target.value)}
              >
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchFilters.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchFilters.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            {/* Locality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Locality
              </label>
              <input
                type="text"
                placeholder="Enter locality"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchFilters.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Min (Lacs)"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={searchFilters.minBudget}
                  onChange={(e) => handleInputChange('minBudget', e.target.value)}
                />
                <span className="flex items-center text-gray-500">to</span>
                <input
                  type="text"
                  placeholder="Max (Lacs)"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={searchFilters.maxBudget}
                  onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <BiSearch className="w-5 h-5" />
                SEARCH
              </button>
            </div>
          </div>
        </div>

        {/* Featured Properties Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">PROPERTY in Bangalore</p>
              <h2 className="text-2xl font-bold text-yellow-600">For Sale</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Our Latest listed properties and check out the facilities on them.
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-gray-600 dark:text-gray-400">‹</span>
              </button>
              <button className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-gray-600 dark:text-gray-400">›</span>
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.slice(0, 6).map((prop) => (
              <div key={prop.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Property Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {prop.name}
                  </h3>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <FiMapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{prop.location}</span>
                  </div>

                  {/* Property Features */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <BiArea className="w-4 h-4" />
                      <span>{prop.dimensions}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BiBed className="w-4 h-4" />
                      <span>{prop.number_of_beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BiBath className="w-4 h-4" />
                      <span>{prop.number_of_bathrooms}</span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{prop.price}
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        View Details
                      </button>
                      <button className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors">
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button className="text-yellow-600 hover:text-yellow-700 font-medium">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;