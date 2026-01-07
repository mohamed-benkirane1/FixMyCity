/**
 * NotFound - Page 404
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
          <div className="error-code">404</div>
          <h2><i className="fa fa-search"></i> Page non trouvée</h2>
          <p>Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
          <div className="error-actions">
            <Link to="/" className="btn-cta">
              <i className="fa fa-home"></i> Retour à l'accueil
            </Link>
            <button onClick={() => window.history.back()} className="btn-secondary">
              <i className="fa fa-arrow-left"></i> Page précédente
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;

