/**
 * MyReports - Liste des signalements de l'utilisateur connecté (citoyen)
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import { reportService } from '../services/report.service';

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMyReports();
  }, []);

  const fetchMyReports = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await reportService.getMyReports();
      setReports(data.reports || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du chargement de vos signalements');
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
      
      <main className="my-reports-page">
        <div className="reports-container">
          <div className="page-header">
            <h1>
              <i className="fa fa-list"></i> Mes signalements
            </h1>
            <Link to="/report/new" className="btn-cta">
              <i className="fa fa-plus"></i> Nouveau signalement
            </Link>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="filter-bar">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Tous ({reports.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'recu' ? 'active' : ''}`}
              onClick={() => setFilter('recu')}
            >
              Reçus ({reports.filter(r => r.status === 'recu').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'en_cours' ? 'active' : ''}`}
              onClick={() => setFilter('en_cours')}
            >
              En cours ({reports.filter(r => r.status === 'en_cours').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'resolu' ? 'active' : ''}`}
              onClick={() => setFilter('resolu')}
            >
              Résolus ({reports.filter(r => r.status === 'resolu').length})
            </button>
          </div>

          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <i className="fa fa-clipboard"></i>
              <p>Vous n'avez pas encore créé de signalement</p>
              <Link to="/report/new" className="btn-cta">
                Créer votre premier signalement
              </Link>
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

export default MyReports;

