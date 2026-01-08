/**
 * NotFound - Page 404 - Page non trouvée
 */

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="error-page">
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">
              <i className="fa fa-exclamation-triangle"></i>
            </div>
            <h1>404</h1>
            <h2>Page non trouvée</h2>
            <p>
              La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <div className="error-actions">
              <Link to="/" className="btn-primary">
                <i className="fa fa-home"></i> Retour à l'accueil
              </Link>
              <Link to="/reports" className="btn-secondary">
                <i className="fa fa-list"></i> Voir les signalements
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
