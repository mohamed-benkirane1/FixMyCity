/**
 * Home - Page d'accueil
 */

import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { MapPin, Zap, ShieldCheck } from 'lucide-react';

function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      
      <section className="hero">
        <div className="hero-text">
          <h1>
            <span>Signalez</span><br />
            un problème dans votre ville
          </h1>
          <p>Une plateforme moderne pour améliorer votre environnement urbain.</p>
          <Link to="/report/new" className="btn-cta">
            Créer un signalement
          </Link>
        </div>
        <div className="hero-img">
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop" 
            alt="Ville moderne" 
          />
        </div>
      </section>

      <section className="features">
        <Link to="/report/new" className="feature-card">
          <MapPin className="w-6 h-6" />
          <h3>Localisation précise</h3>
          <p>Sélectionnez l'emplacement exact sur la carte.</p>
        </Link>

        <Link to="/report/new" className="feature-card">
          <Zap className="w-6 h-6" />
          <h3>Signalement rapide</h3>
          <p>Un formulaire simple et rapide.</p>
        </Link>

        <Link to="/about" className="feature-card">
          <ShieldCheck className="w-6 h-6" />
          <h3>Suivi sécurisé</h3>
          <p>Suivez l'état de votre signalement.</p>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
