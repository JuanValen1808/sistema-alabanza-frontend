import axios from 'axios';

const api = axios.create({
  // Si existe la variable de entorno la usa, si no, usa el localhost por defecto
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor opcional para inyectar el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;