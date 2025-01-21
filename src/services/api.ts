const API_URL = "https://restaurant-api.dicoding.dev";

export const fetchRestaurants = async () => {
  const response = await fetch(`${API_URL}/list`);
  const data = await response.json();
  return data.restaurants; // Sesuai dengan struktur API Dicoding
};

export const fetchRestaurantDetails = async (id: string) => {
  const response = await fetch(`${API_URL}/detail/${id}`);
  const data = await response.json();
  return data.restaurant; // Sesuai dengan struktur API Dicoding
};
