import axios from 'axios';
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalAccessToken,
} from './token.service';
import toast from 'react-hot-toast';

const instance = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://zeddit-tqzk.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.defaults = instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/auth/login' && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const res = await axios.post(
            // 'http://localhost:8080/auth/refresh-token',
            'https://zeddit-tqzk.onrender.com/auth/refresh-token',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + getLocalRefreshToken(),
              },
            }
          );

          const { accessToken } = res.data;
          updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          console.log(_error);
          if (_error.response.status === 401) {
            toast.error('Refresh token expired. Please make a new sign in.', {
              duration: 4000,
            });
          } else if (_error.response.status === 429) {
            return;
          }
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
