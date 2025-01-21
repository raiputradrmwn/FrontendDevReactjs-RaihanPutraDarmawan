import React, { useEffect, useState } from "react";
import { fetchRestaurants } from "../services/api";
import RestaurantItem from "../components/RestaurantItem";
import FilterBar from "../components/FilterBar";
import { Restaurant } from "../types";

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filters, setFilters] = useState({
    location: "", 
    rating: 0, 
  });

  useEffect(() => {
    fetchRestaurants().then((data) => {
      setRestaurants(data);
      setFilteredRestaurants(data.slice(0, visibleCount));
    });
  }, []);

  useEffect(() => {
    setFilteredRestaurants(restaurants.slice(0, visibleCount));
  }, [visibleCount, restaurants]);

  const handleFilter = (location: string, rating: number) => {
    setFilters({ location, rating });
    let filtered = restaurants;
    if (location) {
      filtered = filtered.filter((restaurant) =>
        restaurant.city.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (rating > 0) {
      filtered = filtered.filter((restaurant) => restaurant.rating >= rating);
    }
    setFilteredRestaurants(filtered);
  };
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <div className="container mx-auto px-6 py-5">
      <h1 className="text-4xl font-bold pb-2 text-gray-900">Restaurants</h1>
      <FilterBar onFilter={handleFilter} />
      <h2 className="text-xl font-semibold text-gray-800 mt-8">All Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {!filters.location && filters.rating === 0 && visibleCount < restaurants.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
