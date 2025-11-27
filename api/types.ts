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
  userId: number;
  message: string;
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

// Favorite Types
export interface Favorite {
  id: number;
  dishesname: string;
  restaurantname: string;
  distance: number;
  imageUrl: string;
}

export interface FavoriteListResponse {
  status: string;
  data: Favorite[];
  message?: string;
}

