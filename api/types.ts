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

