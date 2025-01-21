import React, { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa"; // Menggunakan ikon dari react-icons

interface FilterProps {
  onFilter: (restaurantsName: string, rating: number) => void;
}

const FilterBar: React.FC<FilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    restaurantsName: "",
    rating: 0,
  });

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-2 gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
      {/* Search by Name */}
      <div className="w-full sm:w-auto relative">
        <input
          type="text"
          placeholder="Search by Name (Server-Side)"
          value={filters.restaurantsName}
          onChange={(e) =>
            setFilters({ ...filters, restaurantsName: e.target.value })
          }
          className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Filter by Rating */}
      <div className="w-full sm:w-auto relative">
        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters({ ...filters, rating: Number(e.target.value) })
          }
          className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="0">All Ratings</option>
          <option value="3">3+ ⭐</option>
          <option value="4">4+ ⭐⭐</option>
          <option value="4.5">4.5+ ⭐⭐⭐</option>
        </select>
        <FaStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
      </div>

      {/* Apply Filter Button */}
      <button
        onClick={() => onFilter(filters.restaurantsName, filters.rating)}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-md w-full sm:w-auto"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default FilterBar;
