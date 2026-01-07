
/**
 * Reports - List of reports (public or citizen view)
 * GET /api/reports (agent/admin) or /api/reports/mine (citizen)
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';

function Reports() {
  const { isAuthenticated, user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReports();
  }, [user]);

  const fetchReports = async () => {
    setLoading(true);
    setError('');

    try {
      let data;
      // Get all reports for agent/admin, own reports for citizen
      if (user?.role === 'agent' || user?.role === 'admin') {
        data = await reportService.getAllReports();
      } else {
        data = await reportService.getMyReports();
      }
      setReports(data.reports || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du chargement des signalements');
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.status === filter);

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="reports-page">
        <div className="reports-container">
          <h1>
            <i className="fa fa-list"></i> 
            {user?.role === 'citoyen' ? 'Mes signalements' : 'Tous les signalements'}
          </h1>

          {!isAuthenticated && (
            <div className="alert alert-info">
              <i className="fa fa-info-circle"></i>
              Vous n'êtes pas connecté. Affichez vos signalements en vous 
              <Link to="/login"> connectant</Link>.
            </div>
          )}

          {error && <div className="alert alert-error">{error}</div>}

          {isAuthenticated && (
            <div className="filter-bar">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Tous
              </button>
              <button 
                className={`filter-btn ${filter === 'recu' ? 'active' : ''}`}
                onClick={() => setFilter('recu')}
              >
                Reçus
              </button>
              <button 
                className={`filter-btn ${filter === 'en_cours' ? 'active' : ''}`}
                onClick={() => setFilter('en_cours')}
              >
                En cours
              </button>
              <button 
                className={`filter-btn ${filter === 'resolu' ? 'active' : ''}`}
                onClick={() => setFilter('resolu')}
              >
                Résolus
              </button>
            </div>
          )}

          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <i className="fa fa-inbox"></i>
              <p>Aucun signalement trouvé</p>
              {user?.role === 'citoyen' && (
                <Link to="/report/new" className="btn-cta">
                  Créer un signalement
                </Link>
              )}
            </div>
          ) : (
            <div className="reports-grid">
              {filteredReports.map(report => (
                <ReportCard key={report._id} report={report} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Reports;

