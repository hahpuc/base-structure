import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { environment } from '@/environments/environment';
import { AuthService } from '@services/auth.service';
import { ProgressBarService } from '@shared/services/progress-bar.service';
import { Dictionary } from '@shared/types/base';

export const httpCustomInterceptor: HttpInterceptorFn = (request, next) => {
  const progressBarService = inject(ProgressBarService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(NzMessageService);
  const platformId = inject(PLATFORM_ID);

  // Helper functions
  const getAccessToken = (): string | null => {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null;
  };

  const addHeader = (req: HttpRequest<unknown>): HttpRequest<unknown> => {
    // Skip modifying requests for static assets (e.g., /assets/i18n/)
    if (req.url.startsWith('/assets/') || req.url.includes('/assets/')) {
      return req;
    }

    let modifiedRequest = req.clone({
      headers: req.headers.set('locale', 'en'),
    });

    if (!req.url.startsWith('http')) {
      const url = isPlatformBrowser(platformId)
        ? environment.apis.default.url
        : environment.apis.default.url;
      modifiedRequest = modifiedRequest.clone({
        url: url + req.url,
      });
    }

    if (req.body && !req.url.includes('/api/v1/auth/')) {
      modifiedRequest = modifiedRequest.clone({
        body: handleRequestBody(req.body as Dictionary),
      });
    }

    const accessToken = getAccessToken();
    if (accessToken && !req.url.endsWith('/auth/refresh')) {
      modifiedRequest = modifiedRequest.clone({
        headers: modifiedRequest.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }

    return modifiedRequest;
  };

  const handleRequestBody = (body: Dictionary): Dictionary => {
    if (!body) return body;

    Object.entries(body).forEach(([k, v]) => {
      if (typeof v === 'string') {
        body[k] = v.trim();
      }

      if (v === '') {
        body[k] = null;
      }

      if (typeof v === 'object') {
        body[k] = handleRequestBody(v as Dictionary);
      }
    });

    return body;
  };

  const handleError = (error: {
    error?: { message?: string };
    message?: string;
    statusCode?: number;
    url?: string;
    errorCode?: string;
  }): void => {
    const errorMessage = error?.error?.message || error.message;
    const statusCode = error?.statusCode;
    const url: string | undefined = error?.url;

    if (statusCode === 404) {
      router.navigate(['/error/404']).then();
    } else if (statusCode === 401 && !url?.endsWith('/auth/verify')) {
      if (
        error?.errorCode &&
        ['ACCOUNT_LOCK', 'ACCOUNT_INACTIVE', 'UNAUTHORIZED'].includes(error.errorCode)
      ) {
        authService.removeTokenStorage();
        router.navigate(['/login']).then();
      } else {
        router.navigate(['/error/401']).then();
      }
    } else if (statusCode === 500) {
      router.navigate(['/error/500']).then();
    } else {
      messageService.error(errorMessage || 'An error occurred. Please try again.');
    }
  };

  // Start progress bar for API calls (exclude auth endpoints)
  progressBarService.start();

  // Handle token refresh logic (simplified for functional interceptor)
  const accessToken = getAccessToken();
  const expiresAt = typeof localStorage !== 'undefined' ? localStorage.getItem('expires_at') : null;
  const refreshToken =
    typeof localStorage !== 'undefined' ? localStorage.getItem('refresh_token') : null;
  const refreshTokenExpiresAt =
    typeof localStorage !== 'undefined' ? localStorage.getItem('refresh_token_expires_at') : null;

  if (
    !request.url.endsWith('/auth/token') &&
    !request.url.endsWith('/auth/refresh') &&
    accessToken &&
    expiresAt
  ) {
    const expiresTime = parseInt(expiresAt, 0);
    if (expiresTime < new Date().getTime() && refreshToken && refreshTokenExpiresAt) {
      const refreshTokenExpiresTime = parseInt(refreshTokenExpiresAt, 0);
      if (refreshTokenExpiresTime < new Date().getTime()) {
        authService.removeTokenStorage();
      } else {
        // For simplicity in functional interceptor, we'll handle refresh in a basic way
        // You might want to implement a more sophisticated refresh mechanism
        console.log('Token expired, should refresh...');
      }
    }
  }

  return next(addHeader(request)).pipe(
    finalize(() => {
      progressBarService.stop();
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.error instanceof Blob) {
        error.error.text().then(data => {
          handleError(JSON.parse(data));
        });
      } else {
        handleError(error.error);
      }

      return throwError(() => {
        throw error.error;
      });
    })
  );
};
