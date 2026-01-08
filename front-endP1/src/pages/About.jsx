/**
 * About - Page À propos de FixMyCity
 */

import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Users, Zap, Shield, Camera, Clock, CheckCircle, MapPin, Mail } from 'lucide-react';

function About() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <Header />

      <section className="section about-page">
        <div className="container">
          <div className="about-hero">
            <div className="hero-content">
              <h1>À propos de FixMyCity</h1>
              <p className="about-subtitle">Une plateforme collaborative pour améliorer notre ville</p>
              <div className="hero-cta">
                <Button variant="primary" size="lg" onClick={() => navigate('/report/new')}>Signaler un problème</Button>
                <Link to="/reports" className="link-ghost">Voir tous les signalements</Link>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">1.2k+</div>
                <div className="stat-label">Signalements</div>
              </div>
              <div className="stat">
                <div className="stat-value">78%</div>
                <div className="stat-label">Résolus</div>
              </div>
              <div className="stat">
                <div className="stat-value">Fès</div>
                <div className="stat-label">Local</div>
              </div>
            </div>
          </div>

          <div className="about-grid">
            <div className="card mission">
              <h2>Notre mission</h2>
              <p>
                FixMyCity permet aux citoyens de signaler facilement les problèmes de
                voirie, propreté ou sécurité, puis de suivre leur traitement jusqu'à la
                résolution. Nous rapprochons les habitants et les services pour une ville
                plus vivable et transparente.
              </p>
            </div>

            <div className="card steps">
              <h2>Comment ça marche ?</h2>
              <div className="steps-grid">
                <div className="step">
                  <Camera className="step-icon" />
                  <h3>Signaler</h3>
                  <p>Téléversez une photo et décrivez le problème rencontré.</p>
                </div>
                <div className="step">
                  <Clock className="step-icon" />
                  <h3>Suivre</h3>
                  <p>Suivez l'évolution et recevez des mises à jour en temps réel.</p>
                </div>
                <div className="step">
                  <CheckCircle className="step-icon" />
                  <h3>Résoudre</h3>
                  <p>Les services municipaux interviennent et clôturent le signalement.</p>
                </div>
              </div>
            </div>

            <div className="card values">
              <h2>Nos valeurs</h2>
              <div className="values-grid">
                <div className="value-card">
                  <Users className="value-icon" />
                  <h3>Collaboration</h3>
                  <p>Nous favorisons le travail collectif entre citoyens et administrations.</p>
                </div>
                <div className="value-card">
                  <Zap className="value-icon" />
                  <h3>Rapidité</h3>
                  <p>Des processus clairs et efficaces pour accélérer les résolutions.</p>
                </div>
                <div className="value-card">
                  <Shield className="value-icon" />
                  <h3>Transparence</h3>
                  <p>Suivi visible et communication claire à chaque étape.</p>
                </div>
              </div>
            </div>

            <div className="card contact">
              <h2>Contact</h2>
              <p>Pour toute question ou suggestion, écrivez-nous :</p>
              <ul className="contact-list">
                <li><Mail className="contact-icon" /> <a href="mailto:support@fixmycity.com">support@fixmycity.com</a></li>
                <li><MapPin className="contact-icon" /> Fès, Maroc</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
