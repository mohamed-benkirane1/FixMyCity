import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Camera, Users, CheckCircle, ArrowRight, Clock, Shield } from 'lucide-react';
import { reportService } from '../services/report.service';

function Home() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    inProgress: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await reportService.getAllReports();
      const reports = Array.isArray(data) ? data : (data?.reports || []);

      setStats({
        total: reports.length,
        resolved: reports.filter(r => r.status === 'resolu').length,
        inProgress: reports.filter(r => r.status === 'en_cours').length
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="hero-content animate-fade-in-up">
              <h1 className="mb-6">
                Améliorez votre environnement urbain
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                Signalez les problèmes de votre quartier et contribuez à rendre votre ville plus propre, plus sûre et plus agréable à vivre.
              </p>

              <div className="flex gap-4 flex-wrap mb-8">
                {user ? (
                  <Link to="/report/new" className="btn btn-primary btn-lg">
                    <Camera className="w-5 h-5" />
                    Créer un signalement
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg">
                      <Users className="w-5 h-5" />
                      S'inscrire gratuitement
                    </Link>
                    <Link to="/login" className="btn btn-secondary btn-lg">
                      Se connecter
                    </Link>
                  </>
                )}
              </div>

              <div className="hero-features">
                <div className="hero-feature">
                  <CheckCircle className="w-5 h-5 hero-feature-icon" />
                  <span className="font-medium">Gratuit et anonyme</span>
                </div>
                <div className="hero-feature">
                  <Clock className="w-5 h-5 hero-feature-icon" />
                  <span className="font-medium">Traitement rapide</span>
                </div>
                <div className="hero-feature">
                  <Shield className="w-5 h-5 hero-feature-icon" />
                  <span className="font-medium">Sécurisé</span>
                </div>
              </div>
            </div>

            <div className="card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Signalement récent</h3>
                    <p className="text-sm text-neutral-500">Résolu il y a 2 jours</p>
                  </div>
                </div>
                <p className="text-neutral-700 mb-4 line-clamp-3">
                  "Lampadaire cassé rue de la Paix. Merci pour l'intervention rapide !"
                </p>
                <div className="flex items-center gap-2">
                  <span className="badge badge-success">Résolu</span>
                  <span className="text-xs text-neutral-500">Paris 15ème</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-neutral-600">
              En 3 étapes simples, transformez votre quartier
            </p>
          </div>

          <div className="how-it-works-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Signalez</h3>
              <p className="text-neutral-600">
                Prenez une photo et décrivez le problème rencontré dans votre quartier.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Nous traitons</h3>
              <p className="text-neutral-600">
                Nos agents municipaux analysent et priorisent les signalements.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Résolution</h3>
              <p className="text-neutral-600">
                Les problèmes sont résolus et vous êtes tenu informé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section section">
        <div className="container stats-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-item">
              <div className="stat-number">
                {loading ? '...' : stats.total}+
              </div>
              <div className="stat-label">Signalements actifs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {loading ? '...' : stats.resolved}
              </div>
              <div className="stat-label">Problèmes résolus</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {loading ? '...' : stats.inProgress}
              </div>
              <div className="stat-label">En cours</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container text-center cta-content">
          <h2 className="mb-4">
            Prêt à améliorer votre quartier ?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Rejoignez des milliers de citoyens qui font la différence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {user ? (
              <Link to="/report/new" className="btn btn-primary btn-lg">
                <Camera className="w-5 h-5" />
                Créer un signalement
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  <Users className="w-5 h-5" />
                  Commencer maintenant
                </Link>
                <Link to="/reports" className="btn btn-ghost btn-lg">
                  Voir les signalements
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
