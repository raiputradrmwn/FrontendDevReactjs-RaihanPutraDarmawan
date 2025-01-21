export interface Review {
    name: string;
    review: string;
    date: string;
  }
  
  export interface Restaurant {
    id: string;
    name: string;
    rating: number;
    city: string;
    description: string;
    pictureId: string;
    categories: { name: string }[];
    customerReviews?: Review[]; // Tambahkan ini untuk menangani ulasan pelanggan
  }
  