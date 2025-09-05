import type { LoginRequest, LoginResponse } from '@/types/auth';

import { ApiClient } from './client/api-client';

class AuthService {
  private readonly baseUrl = '/auth';

  async login(input: LoginRequest) {
    const body = new URLSearchParams(
      Object.entries({ ...input, scope: 'admin', grant_type: 'password' })
    ).toString();

    return await ApiClient.post<LoginResponse>(`${this.baseUrl}/token`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async logout() {
    return await ApiClient.post<unknown>(`${this.baseUrl}/revoke`, {});
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');

    return await ApiClient.post<LoginResponse>(`${this.baseUrl}/refresh`, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
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

  getStoredToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem('expires_at');
    if (!expiresAt) return true;

    return Date.now() >= parseInt(expiresAt);
  }
}

export const authService = new AuthService();
