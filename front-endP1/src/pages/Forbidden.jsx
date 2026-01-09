/**
 * Forbidden - Page d'accès interdit (403)
 */

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Home, LogIn, Lock } from 'lucide-react';

function Forbidden() {
  return (
    <div className="page">
      <Header />

      <section className="section">
        <div className="container">
          <div className="error-content">
            <div className="error-icon">
              <Lock className="w-12 h-12" />
            </div>
            <h1>403</h1>
            <h2>Accès interdit</h2>
            <p>
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
            <div className="error-actions">
              <Link to="/" className="btn btn-primary">
                <Home className="w-4 h-4 mr-2 inline-block" /> Retour à l'accueil
              </Link>
              <Link to="/login" className="btn btn-secondary">
                <LogIn className="w-4 h-4 mr-2 inline-block" /> Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Forbidden;
