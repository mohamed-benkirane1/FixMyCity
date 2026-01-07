/**
 * Service d'authentification
 */

import api from './api';
import { endpoints } from './endpoints';

export const authService = {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} data - { name, email, password, role? }
   */
  async register(data) {
    const response = await api.post(endpoints.AUTH.REGISTER, data);
    return response.data;
  },

  /**
   * Connexion d'un utilisateur
   * @param {Object} data - { email, password }
   */
  async login(data) {
    const response = await api.post(endpoints.AUTH.LOGIN, data);
    return response.data;
  },

  /**
   * Sauvegarde le token et l'utilisateur dans localStorage
   */
  saveAuth(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Récupère le token depuis localStorage
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Récupère l'utilisateur depuis localStorage
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isAuthenticated() {
    return !!this.getToken();
  },

  /**
   * Déconnexion
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

