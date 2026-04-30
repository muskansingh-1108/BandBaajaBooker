import axios from 'axios';

// ✅ VITE CORRECT: import.meta.env (NOT process.env)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://humble-bassoon-wr565rwxxxjp2g44q-5000.app.github.dev/api',
  timeout: 10000,
  headers: { 
    'Content-Type': 'application/json',
  },
});

// Request interceptor - auto add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login (works with React Router)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 🔥 AUTH APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

// 🔥 VENDOR APIs
export const vendorAPI = {
  getVendors: (filters = {}) => api.get('/vendors', { params: filters }),
  getVendor: (id) => api.get(`/vendors/${id}`),
  createVendor: (data) => api.post('/vendors', data),
  updateVendor: (id, data) => api.put(`/vendors/${id}`, data),
  deleteVendor: (id) => api.delete(`/vendors/${id}`),
};

// 🔥 EVENT APIs
export const eventAPI = {
  getEvents: (filters = {}) => api.get('/events', { params: filters }),
  getEvent: (id) => api.get(`/events/${id}`),
  createEvent: (data) => api.post('/events', data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  bookEvent: (data) => api.post('/events/book', data),
};

// 🔥 BOOKING APIs
export const bookingAPI = {
  getBookings: (filters = {}) => api.get('/bookings', { params: filters }),
  getBooking: (id) => api.get(`/bookings/${id}`),
  createBooking: (data) => api.post('/bookings', data),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
};

// 🔧 BACKWARD COMPATIBILITY (fixes ALL your old components)
export const apiLogin = authAPI.login;
export const apiRegister = authAPI.register;
export const apiLogout = authAPI.logout;
export const apiGetVendors = vendorAPI.getVendors;
export const apiGetEvents = eventAPI.getEvents;
export const apiGetBookings = bookingAPI.getBookings;

// Default export
export default api;