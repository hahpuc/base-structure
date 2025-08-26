import type { LoginRequest, LoginResponse } from '@/types/auth';

import { apiService } from './api.service';

class AuthService {
  private readonly baseUrl = '/auth';

  async login(input: LoginRequest): Promise<LoginResponse> {
    const body = new URLSearchParams(
      Object.entries({ ...input, scope: 'admin', grant_type: 'password' })
    ).toString();
    try {
      return await apiService.post<LoginResponse>(`${this.baseUrl}/token`, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || 'Login failed');
    }
  }

  async logout(): Promise<void> {
    return apiService.post(`${this.baseUrl}/revoke`);
  }

  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      return await apiService.post<LoginResponse>(`${this.baseUrl}/refresh`, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || 'Token refresh failed');
    }
  }

  setTokenStorage(data: LoginResponse) {
    localStorage.setItem('access_token', data.accessToken);
    localStorage.setItem('refresh_token', data.refreshToken);
    localStorage.setItem('user_id', data.user.id);
    localStorage.setItem('expires_at', new Date(data.accessTokenExpiresAt).getTime().toString());
    localStorage.setItem(
      'refresh_token_expires_at',
      new Date(data.refreshTokenExpiresAt).getTime().toString()
    );
  }

  removeTokenStorage() {
    localStorage.removeItem('remember_me');
    localStorage.removeItem('is_change_password');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('refresh_token_expires_at');
  }
}

export const authService = new AuthService();
