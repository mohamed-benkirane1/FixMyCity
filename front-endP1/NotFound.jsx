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
          <h1>404</h1>
          <p>Page non trouvée</p>
          <Link to="/" className="btn-cta">Retour à l'accueil</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;