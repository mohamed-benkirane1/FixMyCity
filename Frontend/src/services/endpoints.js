/**
 * Endpoints du backend
 * Adapter ici si les routes du backend changent
 */

export const endpoints = {
  // Auth
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login'
  },
  
  // Reports
  REPORTS: {
    // Liste tous les signalements (agent/admin)
    LIST: '/api/reports',
    // Liste les signalements de l'utilisateur connecté (citoyen)
    MINE: '/api/reports/mine',
    // Créer un signalement (citoyen)
    CREATE: '/api/reports',
    // Détail d'un signalement
    DETAIL: (id) => `/api/reports/${id}`,
    // Mettre à jour le statut (agent/admin)
    UPDATE_STATUS: (id) => `/api/reports/${id}/status`
  }
};

/**
 * NOTE: Si votre backend utilise des chemins différents,
 * modifiez simplement les valeurs ci-dessus.
 * 
 * Exemple:
 * REGISTER: '/auth/register'  // si pas de préfixe /api
 */

