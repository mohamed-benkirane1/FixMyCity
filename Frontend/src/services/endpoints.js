/**
 * Centralized API Endpoints
 * All backend endpoints are defined here
 */

const API_BASE = '/api';

export const endpoints = {
  // Authentication
  register: `${API_BASE}/auth/register`,
  login: `${API_BASE}/auth/login`,

  // Reports
  reportsAll: `${API_BASE}/reports`,
  reportsMine: `${API_BASE}/reports/mine`,
  reportCreate: `${API_BASE}/reports`,
  reportById: (id) => `${API_BASE}/reports/${id}`,
  reportStatus: (id) => `${API_BASE}/reports/${id}/status`
};

/**
 * Note: Some endpoints use functions that accept parameters (e.g., reportById, reportStatus).
 * These functions return the full URL with the parameter inserted.
 * 
 * Usage in services:
 * - endpoints.register
 * - endpoints.login
 * - endpoints.reportsAll
 * - endpoints.reportsMine
 * - endpoints.reportCreate
 * - endpoints.reportById(id)
 * - endpoints.reportStatus(id)
 * 
 * All endpoints are prefixed with /api and will use the baseURL from api.js
 */

