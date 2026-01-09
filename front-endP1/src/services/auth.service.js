import authAPI from '../api/auth';
import { normalizeError } from './api';

const authService = {
  login: async (credentials) => {
    try {
      return await authAPI.login(credentials);
    } catch (error) {
      throw normalizeError(error);
    }
  },

  register: async (userData) => {
    try {
      return await authAPI.register(userData);
    } catch (error) {
      throw normalizeError(error);
    }
  },

  getProfile: async () => {
    try {
      return await authAPI.getProfile();
    } catch (error) {
      throw normalizeError(error);
    }
  },

  saveAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  getAuth: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export { authService };
