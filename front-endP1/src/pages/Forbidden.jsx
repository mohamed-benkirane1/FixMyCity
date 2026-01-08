/**
 * Forbidden - Page d'accès interdit (403)
 */

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Forbidden() {
  return (
    <div className="page">
      <Header />

      <section className="section">
        <div className="container">
          <div className="error-content">
            <div className="error-icon">
              <i className="fa fa-lock"></i>
            </div>
            <h1>403</h1>
            <h2>Accès interdit</h2>
            <p>
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
            <div className="error-actions">
              <Link to="/" className="btn-primary">
                <i className="fa fa-home"></i> Retour à l'accueil
              </Link>
              <Link to="/login" className="btn-secondary">
                <i className="fa fa-sign-in-alt"></i> Se connecter
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
