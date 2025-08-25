import { authService } from '@/services/authService';
import { LoginRequest, TokenPayload, User } from '@/types/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  tokenExpiration: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  loading: false,
  error: null,
  tokenExpiration: null,
};

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
        id: decoded.sub ?? decoded.uid ?? '',
        username: decoded.username ?? '',
        email: decoded.email ?? null,
        role: decoded.role ?? '',
      } as any;
      if (!initialState.tokenExpiration && decoded.exp) {
        initialState.tokenExpiration = decoded.exp;
      }
    }
  } catch {
    // Clear invalid token
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token_expires_at');
    initialState.accessToken = null;
    initialState.refreshToken = null;
  }
}

// Async thunks
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (loginData: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(loginData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

export const refreshTokenAsync = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
    }
  }
);

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
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
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
        // Support both snake_case (legacy) and camelCase payloads
        const payload: any = action.payload;
        const accessToken = payload?.accessToken ?? payload?.access_token ?? null;
        const refreshToken = payload?.refreshToken ?? payload?.refresh_token ?? null;
        const accessTokenExpiresAt =
          payload?.accessTokenExpiresAt ?? payload?.access_token_expires_at ?? null;
        const userFromPayload = payload?.user ?? null;

        state.loading = false;
        if (!accessToken) {
          state.error = 'No access token returned from login';
          return;
        }

        state.isAuthenticated = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;

        // If server returned explicit expiresAt ISO string, store it and set tokenExpiration (seconds)
        if (accessTokenExpiresAt) {
          try {
            const expiresMs = Date.parse(accessTokenExpiresAt);
            if (!Number.isNaN(expiresMs)) {
              state.tokenExpiration = Math.floor(expiresMs / 1000);
              localStorage.setItem('access_token_expires_at', new Date(expiresMs).toISOString());
            }
          } catch {
            // ignore bad date
          }
        }

        // If user object provided by server, map it
        if (userFromPayload) {
          state.user = {
            id: userFromPayload.id ?? userFromPayload.user_id ?? '',
            username: userFromPayload.username ?? userFromPayload.user_name ?? '',
            email: userFromPayload.email ?? null,
            role: (userFromPayload.scope ?? userFromPayload.role ?? '') as string,
          } as any;
        }

        // Persist tokens
        localStorage.setItem('access_token', accessToken);
        if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logoutAsync.fulfilled, state => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiration = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      })

      // Refresh Token
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        const payload: any = action.payload;
        const accessToken = payload?.accessToken ?? payload?.access_token ?? null;
        const refreshToken = payload?.refreshToken ?? payload?.refresh_token ?? null;
        const accessTokenExpiresAt =
          payload?.accessTokenExpiresAt ?? payload?.access_token_expires_at ?? null;

        if (!accessToken) {
          state.error = 'No access token returned from refresh';
          return;
        }

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;

        if (accessTokenExpiresAt) {
          const expiresMs = Date.parse(accessTokenExpiresAt);
          if (!Number.isNaN(expiresMs)) {
            state.tokenExpiration = Math.floor(expiresMs / 1000);
            localStorage.setItem('access_token_expires_at', new Date(expiresMs).toISOString());
          }
        }

        localStorage.setItem('access_token', accessToken);
        if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
      })
      .addCase(refreshTokenAsync.rejected, state => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiration = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
