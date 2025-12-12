// Request Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  password: string;
  username: string;
  national: string;
}

// Response Types
export interface LoginResponse {
  token: string;
  message: string;
}

export interface RegisterResponse {
  message: string;
}

export interface UserInfoResponse {
  data: {
    name: string;
    national: string;
    email: string;
    avatar?: string;
  };
}

// API Error Response
export interface ApiError {
  error?: string;
  message?: string;
}

// Dish Types
export interface Dish {
  id: number;
  name: string;
  imageUrl: string;
  rate: number;
}

export interface DishListResponse {
  status: string;
  data: Dish[];
  message?: string;
}

// Favorite Types - Based on actual backend API
export interface Favorite {
  id: number;
  dishesname: string;        // Note: backend uses "dishesname" not "dishName"
  restaurantname?: string;   // Only in top3 response
  distance?: number;         // Only in top3 response
  imageUrl: string;
  rate?: number;            // Only in all favorites response
  description?: string;     // Only in all favorites response
  // Frontend-only fields for UI
  likes?: number;
  isFavorited?: boolean;
}

export interface FavoriteListResponse {
  status: string;
  data: Favorite[];
  message?: string;
}

// Add Favorite Types - Both IDs required for backend
export interface AddFavoriteRequest {
  restaurantId: number;  // Required
  dishId: number;        // Required
}

export interface FavoriteResponse {
  status: string;
  message: string;
}

