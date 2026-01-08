import axios from 'axios';

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: '/api', // Utilise le proxy configuré dans setupProxy.js
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Fonction pour parser les réponses API
const parseResponse = (response) => {
  // Retourne les données directement si elles existent
  if (response.data) {
    // Si c'est un objet avec une propriété data/reports/etc.
    if (response.data.data) return response.data.data;
    if (response.data.reports) return response.data.reports;
    if (response.data.report) return response.data.report;
    if (response.data.user) return response.data.user;
    // Sinon retourne directement response.data
    return response.data;
  }
  return response;
};

// Fonction pour normaliser les erreurs
const normalizeError = (error) => {
  if (error.response?.data?.message) {
    return new Error(error.response.data.message);
  }
  if (error.message) {
    return new Error(error.message);
  }
  return new Error('Une erreur inattendue s\'est produite');
};

export default api;
export { normalizeError, parseResponse };
