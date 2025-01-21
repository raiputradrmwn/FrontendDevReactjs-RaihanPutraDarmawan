import React, { useEffect, useState } from "react";
import { fetchRestaurants, fetchRestaurantsByName } from "../services/api";
import RestaurantItem from "../components/RestaurantItem";
import FilterBar from "../components/FilterBar";
import { Restaurant } from "../types";

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [visibleCount, setVisibleCount] = useState(8);
  const [filters, setFilters] = useState({
    restaurantsName: "",
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
  const handleFilter = async (restaurantsName: string, rating: number) => {
    setFilters({ restaurantsName, rating });

    let filtered: Restaurant[] = [];

    if (restaurantsName) {
      try {
        filtered = await fetchRestaurantsByName(restaurantsName);
        if (filtered.length === 0) {
          console.warn(`No restaurants found for Name: ${restaurantsName}`);
        }
      } catch (error) {
        console.error("Error fetching data from server:", error);
        filtered = [];
      }
    } else {
      filtered = restaurants;
    }

    // Filter berdasarkan rating di sisi klien
    if (rating > 0) {
      filtered = filtered.filter((restaurant) => restaurant.rating >= rating);
    }

    // Urutkan berdasarkan rating tertinggi ke terendah
    filtered.sort((a, b) => b.rating - a.rating);

    setFilteredRestaurants(filtered);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <a href="/" className="text-4xl font-bold text-gray-900">
        Restaurants
      </a>
      <FilterBar onFilter={handleFilter} />
      <h2 className="text-xl font-semibold text-gray-800 mt-8">
        All Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {!filters.restaurantsName &&
        filters.rating === 0 &&
        visibleCount < restaurants.length && (
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
