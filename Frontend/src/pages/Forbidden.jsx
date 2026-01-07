/**
 * Forbidden - Page d'accès refusé (403)
 */

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Forbidden() {
  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="error-page">
        <div className="error-container">
          <div className="error-icon">
            <i className="fa fa-ban"></i>
          </div>
          <h2>Accès refusé</h2>
          <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          <p className="error-hint">
            Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur.
          </p>
          <div className="error-actions">
            <Link to="/" className="btn-cta">
              <i className="fa fa-home"></i> Retour à l'accueil
            </Link>
            <button onClick={() => window.history.back()} className="btn-secondary">
              <i className="fa fa-arrow-left"></i> Retour
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Forbidden;

