import { api, setAuthToken } from '../utils/api';

export const authService = {
  async register(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/sessions', credentials);
    const { token, user } = response.data;
    
    // Store token in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);

    return { token, user };
  },

  async getCurrentUser() {
    const response = await api.get('/users/me');
    return response.data.user;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};