import axios from 'axios';

// Simple API configuration - Easy to explain
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simple API functions - Easy to understand
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/profile'),
};

export const tripAPI = {
  createTrip: (tripData) => api.post('/trips/create', tripData),
  getMyTrips: () => api.get('/trips/my-trips'),
  getTripDetails: (tripId) => api.get(`/trips/${tripId}`),
};

export default api;
