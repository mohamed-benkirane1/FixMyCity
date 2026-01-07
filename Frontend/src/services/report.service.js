/**
 * Service de gestion des signalements (reports)
 */

import api from './api';
import { endpoints } from './endpoints';

export const reportService = {
  /**
   * Récupère tous les signalements (agent/admin)
   * @param {Object} params - { status?, type? }
   */
  async getAllReports(params = {}) {
    const response = await api.get(endpoints.REPORTS.LIST, { params });
    return response.data;
  },

  /**
   * Récupère les signalements de l'utilisateur connecté (citoyen)
   */
  async getMyReports() {
    const response = await api.get(endpoints.REPORTS.MINE);
    return response.data;
  },

  /**
   * Récupère le détail d'un signalement
   * @param {string} id - ID du signalement
   */
  async getReportById(id) {
    const response = await api.get(endpoints.REPORTS.DETAIL(id));
    return response.data;
  },

  /**
   * Crée un nouveau signalement (avec upload d'image)
   * @param {FormData} formData - Contient: title, description, type, latitude, longitude, image?
   * 
   * NOTE: Si votre backend attend un nom de champ différent pour l'image,
   * modifiez le nom du fichier dans le FormData.
   * Par défaut: 'image'
   */
  async createReport(formData) {
    // Headers spécifiques pour multipart/form-data
    const response = await api.post(endpoints.REPORTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  /**
   * Met à jour le statut d'un signalement (agent/admin)
   * @param {string} id - ID du signalement
   * @param {string} status - Nouveau statut: 'recu', 'en_cours', 'resolu'
   */
  async updateStatus(id, status) {
    const response = await api.put(endpoints.REPORTS.UPDATE_STATUS(id), { status });
    return response.data;
  }
};

/**
 * NOTE: Statuts possibles selon le backend:
 * - 'recu' (par défaut)
 * - 'en_cours'
 * - 'resolu'
 * 
 * Types de problèmes常见:
 * - 'voirie'
 * - 'éclairage'
 * - 'déchets'
 * - 'espaces_verts'
 * - 'bruit'
 * - 'autre'
 */

