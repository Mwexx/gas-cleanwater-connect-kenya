import axios from 'axios';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export const api = axios.create({ baseURL: apiBaseUrl });
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});