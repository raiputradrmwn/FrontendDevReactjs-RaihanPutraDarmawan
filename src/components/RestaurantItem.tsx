import React from "react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../types";

const RestaurantItem: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition">
      <img
        src={`https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{restaurant.name}</h3>
        <p className="text-gray-600 flex items-center">
          ⭐ {restaurant.rating} | 📍 {restaurant.city}
        </p>
        <button
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
          onClick={() => navigate(`/detail/${restaurant.id}`)}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default RestaurantItem;
    