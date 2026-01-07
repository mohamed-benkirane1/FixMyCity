
/**
 * Report Service - Connected to real backend API
 * All endpoints use the centralized endpoints.js definitions
 */

import api from './api';
import { endpoints } from './endpoints';

export const reportService = {
  /**
   * Get all reports (agent/admin only)
   * GET /api/reports
   */
  async getAllReports() {
    const response = await api.get(endpoints.reportsAll);
    return response.data;
  },

  /**
   * Get current user's reports (citizen)
   * GET /api/reports/mine
   */
  async getMyReports() {
    const response = await api.get(endpoints.reportsMine);
    return response.data;
  },

  /**
   * Get a single report by ID
   * GET /api/reports/:id
   */
  async getReportById(id) {
    const response = await api.get(endpoints.reportById(id));
    return response.data;
  },

  /**
   * Create a new report with optional image upload
   * POST /api/reports
   * Content-Type: multipart/form-data
   */
  async createReport(formData) {
    const response = await api.post(endpoints.reportCreate, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  /**
   * Update report status (agent/admin only)
   * PUT /api/reports/:id/status
   */
  async updateStatus(id, status) {
    const response = await api.put(endpoints.reportStatus(id), { status });
    return response.data;
  }
};

/**
 * Status values:
 * - 'recu' (default - new report)
 * - 'en_cours' (being processed)
 * - 'resolu' (completed)
 *
 * Report types:
 * - 'voirie' (road/pavement issues)
 * - 'éclairage' (public lighting)
 * - 'déchets' (waste/cleanliness)
 * - 'espaces_verts' (green spaces)
 * - 'bruit' (noise pollution)
 * - 'autre' (other)
 */

