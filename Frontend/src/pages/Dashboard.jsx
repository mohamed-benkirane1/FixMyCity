/**
 * Dashboard - Tableau de bord agent/admin
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import ReportCard from '../components/ReportCard';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    recu: 0,
    en_cours: 0,
    resolu: 0
  });

  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await reportService.getAllReports();
      const reportsList = data.reports || [];
      setReports(reportsList);
      
      // Calculer les statistiques
      setStats({
        total: reportsList.length,
        recu: reportsList.filter(r => r.status === 'recu').length,
        en_cours: reportsList.filter(r => r.status === 'en_cours').length,
        resolu: reportsList.filter(r => r.status === 'resolu').length
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du chargement des signalements');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les rapports
  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.status === filter);

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="dashboard-page">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>
              <i className="fa fa-tachometer-alt"></i> 
              Dashboard {user?.role === 'admin' ? 'Administrateur' : 'Agent'}
            </h1>
            <p>Gestion des signalements de la plateforme</p>
          </div>

          {/* Statistiques */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fa fa-flag"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
            
            <div className="stat-card stat-pending">
              <div className="stat-icon">
                <i className="fa fa-clock"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">{stats.recu}</span>
                <span className="stat-label">Reçus</span>
              </div>
            </div>
            
            <div className="stat-card stat-progress">
              <div className="stat-icon">
                <i className="fa fa-spinner"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">{stats.en_cours}</span>
                <span className="stat-label">En cours</span>
              </div>
            </div>
            
            <div className="stat-card stat-resolved">
              <div className="stat-icon">
                <i className="fa fa-check-circle"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">{stats.resolu}</span>
                <span className="stat-label">Résolus</span>
              </div>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {/* Filtres */}
          <div className="filter-bar">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Tous ({stats.total})
            </button>
            <button 
              className={`filter-btn ${filter === 'recu' ? 'active' : ''}`}
              onClick={() => setFilter('recu')}
            >
              <span className="status-dot pending"></span>
              Reçus ({stats.recu})
            </button>
            <button 
              className={`filter-btn ${filter === 'en_cours' ? 'active' : ''}`}
              onClick={() => setFilter('en_cours')}
            >
              <span className="status-dot progress"></span>
              En cours ({stats.en_cours})
            </button>
            <button 
              className={`filter-btn ${filter === 'resolu' ? 'active' : ''}`}
              onClick={() => setFilter('resolu')}
            >
              <span className="status-dot resolved"></span>
              Résolus ({stats.resolu})
            </button>
          </div>

          {/* Liste des signalements */}
          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <i className="fa fa-inbox"></i>
              <p>Aucun signalement à traiter</p>
            </div>
          ) : (
            <div className="reports-grid">
              {filteredReports.map(report => (
                <div key={report._id} className="report-item">
                  <ReportCard report={report} />
                  <div className="report-actions">
                    <Link to={`/dashboard/reports/${report._id}`} className="btn-action">
                      <i className="fa fa-eye"></i> Détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;

