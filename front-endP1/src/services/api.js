import axios from 'axios';

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? (process.env.REACT_APP_API_URL || 'http://localhost:5000/api')
    : '/api', // En dev, utilise le proxy, en prod utilise l'URL complète
  // Supprimer le Content-Type par défaut pour laisser Axios le définir automatiquement (json pour les données, multipart pour FormData)
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
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Gestion des erreurs 429 (Too Many Requests) avec retry
    if (error.response?.status === 429) {
      const config = error.config;
      if (!config._retry) {
        config._retry = true;
        // Exponential backoff: attendre 1s, puis 2s, puis 4s, etc.
        const retryDelay = Math.pow(2, config._retryCount || 0) * 1000;
        config._retryCount = (config._retryCount || 0) + 1;

        // Limiter à 3 tentatives maximum
        if (config._retryCount <= 3) {
          console.warn(`Rate limit exceeded, retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return api(config);
        }
      }
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
