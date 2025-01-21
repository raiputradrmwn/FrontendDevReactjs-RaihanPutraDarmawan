const API_URL = "https://restaurant-api.dicoding.dev";

export const fetchRestaurants = async () => {
  const response = await fetch(`${API_URL}/list`);
  const data = await response.json();
  return data.restaurants;
};

export const fetchRestaurantDetails = async (id: string) => {
  const response = await fetch(`${API_URL}/detail/${id}`);
  const data = await response.json();
  return data.restaurant;
};

export const fetchRestaurantsByName = async (restaurantsName: string) => {
  try {
    const response = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(restaurantsName)}`
    );
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    const data = await response.json();

    // API mengembalikan restoran yang cocok dengan query (nama, kategori, menu)
    return data.restaurants || [];
  } catch (error) {
    console.error("Error fetching name data:", error);
    return [];
  }
};
