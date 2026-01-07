/**
 * Auth Service - Implémentation FICTIVE pour stabilité frontend
 * AUCUN APPEL API - Simulations locales uniquement
 */

// Données de démonstration
const demoUsers = [
  { _id: '1', name: 'Jean Dupont', email: 'demo@example.com', password: 'demo123', role: 'citoyen' },
  { _id: '2', name: 'Marie Martin', email: 'agent@example.com', password: 'agent123', role: 'agent' },
  { _id: '3', name: 'Pierre Durand', email: 'admin@example.com', password: 'admin123', role: 'admin' }
];

export const authService = {
  /**
   * Inscription fictive - simulation locale
   */
  async register(data) {
    // Simulation de délai API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser = {
      _id: 'user_' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role || 'citoyen',
      createdAt: new Date().toISOString()
    };
    
    return {
      token: 'demo_token_' + Date.now(),
      user: newUser
    };
  },

  /**
   * Connexion fictive - simulation locale
   */
  async login(data) {
    // Simulation de délai API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Recherche dans les utilisateurs démo
    const user = demoUsers.find(u => u.email === data.email);
    
    if (user) {
      return {
        token: 'demo_token_' + user._id,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      };
    }
    
    // Sinon créer un utilisateur fictif
    return {
      token: 'demo_token_' + Date.now(),
      user: {
        _id: 'user_' + Date.now(),
        name: data.email.split('@')[0],
        email: data.email,
        role: 'citoyen'
      }
    };
  },

  saveAuth(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

