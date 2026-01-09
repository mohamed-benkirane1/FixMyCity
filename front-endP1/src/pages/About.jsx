/**
 * About - Page À propos de FixMyCity
 */

import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Users, Zap, Shield, Camera, Clock, CheckCircle, MapPin, Mail, Heart, Star, Award } from 'lucide-react';

function About() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <Header />

      {/* Hero Section with Enhanced Design */}
      <section className="hero-section">
        <div className="container">
          <div className="about-hero">
            <div className="hero-content animate-fade-in-up">
              <div className="hero-badge">
                <Award className="badge-icon" />
                <span>Plateforme Citoyenne</span>
              </div>
              <h1>À propos de FixMyCity</h1>
              <p className="about-subtitle">
                Une plateforme collaborative pour améliorer notre ville ensemble.
                Connectons les citoyens et les services municipaux pour une Fès plus belle.
              </p>
              <div className="hero-cta">
                <Button variant="primary" size="lg" onClick={() => navigate('/report/new')}>
                  <Camera className="btn-icon" />
                  Signaler un problème
                </Button>
                <Link to="/reports" className="link-ghost">
                  <Star className="link-icon" />
                  Voir tous les signalements
                </Link>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <div className="mission-showcase">
            <div className="mission-content">
              <h2 className="section-title">Notre Mission</h2>
              <p className="mission-text">
                FixMyCity révolutionne la façon dont les citoyens interagissent avec leur ville.
                Nous créons un pont entre les habitants et les services municipaux, permettant
                un suivi transparent et efficace des problèmes urbains.
              </p>
              <div className="mission-highlights">
                <div className="highlight">
                  <Heart className="highlight-icon" />
                  <span>Engagement citoyen</span>
                </div>
                <div className="highlight">
                  <Zap className="highlight-icon" />
                  <span>Rapidité d'action</span>
                </div>
                <div className="highlight">
                  <Shield className="highlight-icon" />
                  <span>Transparence totale</span>
                </div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="visual-placeholder">
                <Users size={64} />
                <p>Communauté active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works-section">
        <div className="container">
          <h2 className="section-title text-center">Comment ça marche ?</h2>
          <p className="section-subtitle text-center">
            Simple, rapide et efficace - 3 étapes pour améliorer votre ville
          </p>
          <div className="how-it-works-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <Camera className="step-icon" />
              <h3>Signaler</h3>
              <p>Prenez une photo et décrivez le problème en quelques mots. Notre système intelligent catégorise automatiquement votre signalement.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <Clock className="step-icon" />
              <h3>Suivre</h3>
              <p>Recevez des notifications en temps réel sur l'évolution de votre signalement. Suivez chaque étape du processus.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <CheckCircle className="step-icon" />
              <h3>Résoudre</h3>
              <p>Les services municipaux interviennent rapidement. Vous êtes informé de la résolution et pouvez évaluer la qualité du service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title text-center">Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card">
              <Users className="value-icon" />
              <h3>Collaboration</h3>
              <p>Nous croyons en la force du collectif. Citoyens et administrations travaillent main dans la main pour le bien commun.</p>
            </div>
            <div className="value-card">
              <Zap className="value-icon" />
              <h3>Rapidité</h3>
              <p>Chaque signalement est traité dans les meilleurs délais. La réactivité est au cœur de notre engagement.</p>
            </div>
            <div className="value-card">
              <Shield className="value-icon" />
              <h3>Transparence</h3>
              <p>Suivi visible, communication claire et données ouvertes. La confiance se construit par la transparence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-card">
            <h2>Contactez-nous</h2>
            <p>Des questions ? Des suggestions ? Nous sommes là pour vous aider.</p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <strong>Email</strong>
                  <a href="mailto:support@fixmycity.com">support@fixmycity.com</a>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <strong>Localisation</strong>
                  <span>Fès, Maroc</span>
                </div>
              </div>
            </div>
            <Button variant="secondary" onClick={() => navigate('/report/new')}>
              Commencer maintenant
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
