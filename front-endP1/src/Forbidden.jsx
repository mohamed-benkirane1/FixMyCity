/**
 * Forbidden - Page d'accès refusé (403)
 */

import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function Forbidden() {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="error-page">
        <div className="error-container">
          <i className="fa fa-ban"></i>
          <h2>Accès refusé</h2>
          <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          <Link to="/" className="btn-cta">Retour à l'accueil</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Forbidden;
