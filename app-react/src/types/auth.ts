export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  // legacy snake_case
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;

  // new camelCase response from backend
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: string; // ISO datetime
  refreshTokenExpiresAt?: string; // ISO datetime
  user?: {
    id?: string;
    scope?: string;
    roles?: string[];
    username?: string;
    email?: string | null;
    is_change_password?: boolean;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  name?: string;
}

export interface TokenPayload {
  // Tokens vary between backends. Keep fields optional and permissive.
  sub?: string;
  uid?: string;
  username?: string;
  email?: string | null;
  role?: string;
  iat?: number;
  exp?: number;
  // allow nested claims
  claims?: any;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
