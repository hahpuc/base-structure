import { message } from 'antd';
import { AxiosStatic } from 'axios';

import { env } from '../env.service';

const setUpAxios = (axios: AxiosStatic) => {
  axios.defaults.baseURL = env.api.fullUrl;
  axios.defaults.timeout = 10000;
  axios.defaults.headers['Content-Type'] = 'application/json';

  // Request interceptor
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor
  axios.interceptors.response.use(
    response => response,
    async error => {
      //   const originalRequest = error.config;

      //   if (error.response?.status === 401 && !originalRequest._retry) {
      //     originalRequest._retry = true;

      //     try {
      //       const refreshToken = localStorage.getItem('refresh_token');
      //       if (!refreshToken) throw new Error('No refresh token');

      //       const response = await axios.post(`${env.api.fullUrl}/auth/refresh`, null, {
      //         headers: { Authorization: `Bearer ${refreshToken}` },
      //       });

      //       const { access_token, refresh_token } = response.data;
      //       localStorage.setItem('access_token', access_token);
      //       localStorage.setItem('refresh_token', refresh_token);

      //       originalRequest.headers.Authorization = `Bearer ${access_token}`;

      //       return axios(originalRequest);
      //     } catch (refreshError) {
      //       localStorage.removeItem('access_token');
      //       localStorage.removeItem('refresh_token');

      //       window.location.href = '/auth/login';

      //       return Promise.reject(refreshError);
      //     }
      //   }

      const errorMessage = error.response?.data?.message || 'An error occurred';
      message.error(errorMessage);

      return Promise.reject(error);
    }
  );
};

export { setUpAxios };
