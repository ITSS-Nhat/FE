import { API_BASE_URL, getAuthToken } from './config';
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  UserInfoResponse,
  ApiError,
  DishListResponse,
  FavoriteListResponse,
} from './types';

/**
 * Generic API fetch function with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      
      try {
        const errorData: ApiError = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        // If response is not JSON, try to get text
        try {
          const text = await response.text();
          if (text) {
            errorMessage = text;
          }
        } catch (textError) {
          // Keep default error message
        }
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      // Log error for debugging
      console.error('API Error:', error.message, { url, options });
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

/**
 * Auth API Functions
 */
export const authApi = {
  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return apiFetch<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Get current user info
   */
  getCurrentUser: async (): Promise<UserInfoResponse> => {
    return apiFetch<UserInfoResponse>('/me', {
      method: 'GET',
    });
  },
};

/**
 * Dish API Functions
 */
export const dishApi = {
  /**
   * Get famous dishes list (top 3 by rate)
   */
  getFamousDishes: async (): Promise<DishListResponse> => {
    return apiFetch<DishListResponse>('/disharmonious', {
      method: 'GET',
    });
  },
};

/**
 * Favorite API Functions
 */
export const favoriteApi = {
  /**
   * Get top 3 favorite dishes for current user
   */
  getTop3Favorites: async (): Promise<FavoriteListResponse> => {
    return apiFetch<FavoriteListResponse>('/favourite-top3', {
      method: 'GET',
    });
  },
};

