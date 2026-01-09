import api, { normalizeError, parseResponse } from './api';

const reportService = {
  /**
   * Récupère tous les signalements (agent/admin uniquement)
   */
  getAllReports: async () => {
    try {
      const response = await api.get('/reports');
      return parseResponse(response);
    } catch (error) {
      throw normalizeError(error);
    }
  },

  /**
   * Récupère un signalement par ID
   */
  getReportById: async (id) => {
    try {
      const response = await api.get(`/reports/${id}`);
      const data = parseResponse(response);
      // Si parseResponse retourne un objet direct, on le retourne
      // Sinon on cherche dans response.data.report
      return data || response.data?.report || response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  },

  /**
   * Crée un nouveau signalement (citoyen uniquement)
   * @param {FormData|Object} reportData - Données du signalement (FormData si image)
   */
  createReport: async (reportData) => {
    try {
      const isFormData = reportData instanceof FormData;
      const config = isFormData
        ? {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        : {};

      const response = await api.post('/reports', reportData, config);
      return parseResponse(response);
    } catch (error) {
      throw normalizeError(error);
    }
  },

  /**
   * Récupère les signalements de l'utilisateur connecté (citoyen uniquement)
   */
  getMyReports: async () => {
    try {
      const response = await api.get('/reports/mine');
      return parseResponse(response);
    } catch (error) {
      throw normalizeError(error);
    }
  },

  /**
   * Met à jour le statut d'un signalement (agent/admin uniquement)
   * @param {string} id - ID du signalement
   * @param {string} status - Nouveau statut ('recu', 'en_cours', 'resolu')
   */
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/reports/${id}/status`, { status });
      return response.data?.report || response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  },
};

export { reportService };
