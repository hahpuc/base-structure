import { apiService } from './apiService';
import { env } from './envService';
import { LoginRequest, LoginResponse } from '@/types/auth';

class AuthService {
  private readonly baseUrl = '/auth';

  async login(loginData: LoginRequest): Promise<LoginResponse> {
    const body = new URLSearchParams({
      username: loginData.username,
      password: loginData.password,
      scope: 'admin',
      grant_type: 'password',
    }).toString();

    const response = await fetch(`${env.api.fullUrl}${this.baseUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    return apiService.post(`${this.baseUrl}/revoke`);
  }

  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem(env.auth.refreshTokenKey);

    const response = await fetch(`${env.api.fullUrl}${this.baseUrl}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Token refresh failed');
    }

    return response.json();
  }

  async getCurrentUser() {
    return apiService.get(`${this.baseUrl}/me`);
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    return apiService.post(`${this.baseUrl}/change-password`, data);
  }

  async forgotPassword(email: string): Promise<void> {
    return apiService.post(`${this.baseUrl}/forgot-password`, { email });
  }

  async resetPassword(data: { token: string; newPassword: string }): Promise<void> {
    return apiService.post(`${this.baseUrl}/reset-password`, data);
  }
}

export const authService = new AuthService();
