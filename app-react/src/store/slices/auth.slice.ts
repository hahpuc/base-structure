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
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  loading: false,
  error: null,
  tokenExpiration: null,
};

// MARK: Functions
// Check if user is authenticated on app load
const checkAuthOnLoad = (): boolean => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  // Prefer explicit stored expiration (set by server: accessTokenExpiresAt)
  const expiresAt = localStorage.getItem('access_token_expires_at');
  if (expiresAt) {
    const expiresMs = Date.parse(expiresAt);
    if (!Number.isNaN(expiresMs)) {
      return Date.now() < expiresMs;
    }
  }

  // Fallback: try to decode JWT and check `exp` if present
  try {
    const decoded: TokenPayload = jwtDecode(token as string);
    const currentTime = Date.now() / 1000;
    const exp = decoded.exp ?? 0;
    return exp > currentTime;
  } catch {
    return false;
  }
};

// Initialize auth state
if (initialState.accessToken && checkAuthOnLoad()) {
  // Try to populate from stored expiresAt or decode as a fallback.
  try {
    const expiresAt = localStorage.getItem('access_token_expires_at');
    if (expiresAt) {
      const expiresMs = Date.parse(expiresAt);
      if (!Number.isNaN(expiresMs)) {
        initialState.isAuthenticated = true;
        initialState.tokenExpiration = Math.floor(expiresMs / 1000);
      }
    }

    // If we didn't get user/token info from stored expiresAt, try decoding
    if (!initialState.user) {
      const decoded: TokenPayload = jwtDecode(initialState.accessToken as string);

      initialState.isAuthenticated = true;
      initialState.user = {
        id: decoded.claims?.user_id ?? '',
        username: decoded.claims?.username ?? '',
        email: decoded.claims?.email ?? null,
      };
      if (!initialState.tokenExpiration && decoded.exp) {
        initialState.tokenExpiration = decoded.exp;
      }
    }
  } catch {
    initialState.isAuthenticated = false;
    initialState.user = null;
    initialState.accessToken = null;
    initialState.refreshToken = null;
    initialState.tokenExpiration = null;
    authService.removeTokenStorage();
  }
}

// MARK: Async thunks
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (loginData: LoginRequest, { rejectWithValue }) => {
    const resultApi: ApiResult<LoginResponse> = await authService.login(loginData);

    if (resultApi.isSuccess) {
      return resultApi.data;
    }

    return rejectWithValue(resultApi.error || 'Login failed');
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  const resultApi: ApiResult<unknown> = await authService.logout();

  if (resultApi.isSuccess) {
    return;
  }

  return rejectWithValue(resultApi.error || 'Logout failed');
});

export const refreshTokenAsync = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    const resultApi: ApiResult<LoginResponse> = await authService.refreshToken();

    if (resultApi.isSuccess) {
      return resultApi.data;
    }

    return rejectWithValue(resultApi.error || 'Token refresh failed');
  }
);

// MARK: Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiration = null;
      authService.removeTokenStorage();
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        if (payload) {
          authService.setTokenStorage(payload);
        }

        state.loading = false;
        if (!payload || !payload.accessToken) {
          state.error = 'No access token returned from login';
          return;
        }
        state.isAuthenticated = true;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.tokenExpiration = payload.accessTokenExpiresAt
          ? Math.floor(new Date(payload.accessTokenExpiresAt).getTime() / 1000)
          : null;
        state.user = payload.user
          ? {
              id: payload.user.id,
              username: payload.user.slug,
              email: '',
              role: payload.user.roles,
            }
          : null;
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })

      // Refresh Token
      .addCase(refreshTokenAsync.fulfilled, (state, { payload }) => {
        if (!payload?.accessToken) {
          state.error = 'No access token returned from refresh';
          return;
        }
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.tokenExpiration = payload.accessTokenExpiresAt
          ? Math.floor(new Date(payload.accessTokenExpiresAt).getTime() / 1000)
          : null;
        localStorage.setItem('access_token', payload.accessToken);
        if (payload.refreshToken) localStorage.setItem('refresh_token', payload.refreshToken);
        if (payload.accessTokenExpiresAt) {
          localStorage.setItem(
            'access_token_expires_at',
            new Date(payload.accessTokenExpiresAt).toISOString()
          );
        }
      })
      .addCase(refreshTokenAsync.rejected, state => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiration = null;
        authService.removeTokenStorage();
      })

      // Logout
      .addCase(logoutAsync.fulfilled, state => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiration = null;
        authService.removeTokenStorage();
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
