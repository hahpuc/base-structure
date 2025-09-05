import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import { authService } from '@/services/auth.service';
import { ApiResult, ErrorResponse } from '@/services/client/api-result';
import type { LoginRequest, LoginResponse, TokenPayload } from '@/types/auth';

// MARK: Types
export type AuthUser = {
  id: string;
  username: string;
  email: string | null;
  role?: string[];
};

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: ErrorResponse | string | null;
  tokenExpiration: number | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  tokenExpiration: null,
};

// MARK: Functions
// Check if user is authenticated on app load
const checkAuthOnLoad = (): boolean => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('access_token');
  if (!token) return false;

  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// Get user from token
const getUserFromToken = (token: string): AuthUser | null => {
  try {
    const decoded: TokenPayload = jwtDecode(token);
    return {
      id: decoded.claims?.user_id || '',
      username: decoded.claims?.username || '',
      email: decoded.claims?.email || null,
    };
  } catch {
    return null;
  }
};

// MARK: Async Thunks
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    const result: ApiResult<LoginResponse> = await authService.login(credentials);

    if (!result.isSuccess || !result.data) {
      return rejectWithValue(result.error || 'Login failed');
    }

    authService.setTokenStorage(result.data);
    return result.data;
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
    authService.removeTokenStorage();
    return null;
  } catch (error) {
    authService.removeTokenStorage();
    return rejectWithValue(error);
  }
});

export const refreshTokenAsync = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    const result = await authService.refreshToken();

    if (!result.isSuccess || !result.data) {
      authService.removeTokenStorage();
      return rejectWithValue(result.error || 'Token refresh failed');
    }

    authService.setTokenStorage(result.data);
    return result.data;
  }
);

// MARK: Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Initialize auth state on app load
    initializeAuth: state => {
      if (typeof window === 'undefined') return;

      const isAuthenticated = checkAuthOnLoad();
      const token = localStorage.getItem('access_token');

      if (isAuthenticated && token) {
        state.isAuthenticated = true;
        state.accessToken = token;
        state.refreshToken = localStorage.getItem('refresh_token');
        state.user = getUserFromToken(token);

        const expiresAt = localStorage.getItem('expires_at');
        state.tokenExpiration = expiresAt ? parseInt(expiresAt) : null;
      }
    },
    // Clear auth state
    clearAuth: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiration = null;
      state.error = null;
      authService.removeTokenStorage();
    },
    // Clear error
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = {
          id: action.payload.user.id,
          username: action.payload.user.slug,
          email: null,
          role: action.payload.user.roles,
        };
        state.tokenExpiration = new Date(action.payload.accessTokenExpiresAt).getTime();
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      })
      // Logout
      .addCase(logoutAsync.pending, state => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiration = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
        // Still clear auth on logout failure
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiration = null;
      })
      // Refresh Token
      .addCase(refreshTokenAsync.pending, state => {
        state.loading = true;
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.tokenExpiration = new Date(action.payload.accessTokenExpiresAt).getTime();
        state.error = null;
      })
      .addCase(refreshTokenAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiration = null;
      });
  },
});

export const { initializeAuth, clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
