import React, { useState } from "react";

interface FilterProps {
  onFilter: (location: string, rating: number) => void;
}

const FilterBar: React.FC<FilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    location: "",
    rating: 0,
  });

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
      {/* Search by Location */}
      <input
        type="text"
        placeholder="Search by Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        className="px-4 py-2 border rounded-md w-full sm:w-auto focus:outline-none focus:ring focus:ring-blue-300"
      />

      {/* Filter by Rating */}
      <select
        value={filters.rating}
        onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
        className="px-4 py-2 border rounded-md w-full sm:w-auto focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="0">All Ratings</option>
        <option value="3">3+ ⭐</option>
        <option value="4">4+ ⭐</option>
        <option value="4.5">4.5+ ⭐</option>
      </select>

      {/* Filter Button */}
      <button
        onClick={() => onFilter(filters.location, filters.rating)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Filter
      </button>
    </div>
  );
};

export default FilterBar;
