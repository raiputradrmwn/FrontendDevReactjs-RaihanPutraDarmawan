import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchRestaurantDetails } from "../services/api";
import { Restaurant } from "../types";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Tambahkan navigasi
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    fetchRestaurantDetails(id!).then(setRestaurant);
  }, [id]);

  if (!restaurant)
    return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{restaurant.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={`https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}`}
            alt={restaurant.name}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <p className="text-gray-700 text-lg">{restaurant.description}</p>

          <div className="mt-4">
            <p className="text-xl font-semibold text-gray-800">⭐ {restaurant.rating}</p>
            <p className="text-lg text-gray-600 flex items-center mt-2">
              📍 {restaurant.city}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {restaurant.categories.map((category, index) => (
                <li
                  key={index}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-800"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>    
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
        <div className="mt-4 space-y-4">
          {restaurant.customerReviews?.map((review, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
              <p className="text-gray-600 text-sm">{review.date}</p>
              <p className="text-gray-700 mt-2">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
