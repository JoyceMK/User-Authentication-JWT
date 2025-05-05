import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adjust your backend base URL
});

// Attach token to every request
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token and attempt refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 error and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem('refresh_token');
        const { data } = await axios.post('http://localhost:8000/api/token/refresh/', { refresh });

        localStorage.setItem('access_token', data.access);
        API.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

        return API(originalRequest); // retry original request
      } catch (err) {
        console.error('Token refresh failed:', err);
        // Optionally redirect to login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default API;
